import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import prisma from '../../config/db.js';
import { getIO } from '../../config/socket.js';
import { AuthRequest } from '../../middlewares/auth.middleware.js';

const QR_SECRET = process.env.QR_JWT_SECRET || 'CITYGYM_DYNAMIC_QR_SECRET_60S';

// 1. Hội viên lấy mã QR động (Token 60 giây tự làm mới)
export const getDynamicQR = async (req: AuthRequest, res: Response) => {
  try {
    const memberId = req.user!.id;
    const profile = await prisma.memberProfile.findUnique({ where: { userId: memberId } });

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Hồ sơ hội viên không tồn tại.' });
    }

    // Token chứa userId, qrSecret và hết hạn sau 60 giây
    const qrToken = jwt.sign(
      {
        userId: memberId,
        qrSecret: profile.qrSecret,
        timestamp: Date.now(),
      },
      QR_SECRET,
      { expiresIn: '60s' }
    );

    return res.json({
      success: true,
      data: {
        qrToken,
        expiresInSeconds: 60,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Lễ tân quét mã QR tại quầy (Xác thực Realtime & Socket.io)
export const scanQR = async (req: AuthRequest, res: Response) => {
  try {
    const { qrData } = req.body;
    const staffId = req.user!.id;

    if (!qrData) {
      return res.status(400).json({ success: false, message: 'Dữ liệu mã QR không được để trống.' });
    }

    const io = getIO();

    // A. XỬ LÝ NẾU LÀ VÉ TẬP THỬ (Khách vãng lai từ Landing Page)
    if (typeof qrData === 'string' && qrData.includes('TRIAL-')) {
      let code = qrData;
      try {
        const parsed = JSON.parse(qrData);
        if (parsed.code) code = parsed.code;
      } catch (e) {}

      const trial = await prisma.trialBooking.findFirst({
        where: { ticketCode: code },
        include: { lead: true },
      });

      if (!trial) {
        await prisma.checkIn.create({
          data: {
            checkType: 'TRIAL_GUEST',
            status: 'DENIED',
            denyReason: 'Mã vé tập thử không tồn tại trên hệ thống.',
            staffId,
          },
        });

        io.emit('checkin_event', {
          status: 'DENIED',
          reason: 'Mã vé tập thử không tồn tại!',
          customerType: 'TRIAL_GUEST',
          timestamp: new Date(),
        });

        return res.status(400).json({ success: false, message: 'Mã vé tập thử không tồn tại!' });
      }

      // Đánh dấu đã check-in tập thử
      await prisma.$transaction([
        prisma.trialBooking.update({
          where: { id: trial.id },
          data: { status: 'CHECKED_IN', checkedInAt: new Date() },
        }),
        prisma.lead.update({
          where: { id: trial.leadId },
          data: { status: 'TRIAL_CHECKED_IN' },
        }),
        prisma.checkIn.create({
          data: {
            trialBookingId: trial.id,
            checkType: 'TRIAL_GUEST',
            status: 'SUCCESS',
            staffId,
          },
        }),
      ]);

      const emitData = {
        status: 'SUCCESS',
        customerType: 'TRIAL_GUEST',
        fullName: trial.lead.fullName,
        phone: trial.lead.phone,
        ticketCode: trial.ticketCode,
        service: trial.lead.interestService,
        message: 'Khách tập thử 3 ngày Check-in hợp lệ! Chúc quý khách có buổi trải nghiệm tuyệt vời.',
        timestamp: new Date(),
      };

      io.emit('checkin_event', emitData);
      return res.json({ success: true, data: emitData });
    }

    // B. XỬ LÝ NẾU LÀ HỘI VIÊN CHÍNH THỨC (Quét JWT 60 giây)
    let decoded: any;
    try {
      decoded = jwt.verify(qrData, QR_SECRET);
    } catch (err: any) {
      await prisma.checkIn.create({
        data: {
          checkType: 'MEMBER',
          status: 'DENIED',
          denyReason: 'Mã QR đã hết hạn (quá 60s) hoặc không hợp lệ.',
          staffId,
        },
      });

      io.emit('checkin_event', {
        status: 'DENIED',
        reason: 'Mã QR đã hết hạn (quá 60s) hoặc không hợp lệ. Vui lòng mở lại ứng dụng!',
        customerType: 'MEMBER',
        timestamp: new Date(),
      });

      return res.status(400).json({
        success: false,
        message: 'Mã QR đã hết hạn (quá 60s). Vui lòng yêu cầu hội viên làm mới mã!',
      });
    }

    const { userId, qrSecret } = decoded;

    // Tìm kiếm hội viên & gói tập
    const member = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        memberProfile: true,
        memberships: {
          where: { status: { in: ['ACTIVE', 'FROZEN'] } },
          include: { package: true },
          orderBy: { endDate: 'desc' },
        },
      },
    });

    if (!member || member.memberProfile?.qrSecret !== qrSecret) {
      io.emit('checkin_event', {
        status: 'DENIED',
        reason: 'Xác thực bảo mật hội viên thất bại!',
        customerType: 'MEMBER',
        timestamp: new Date(),
      });
      return res.status(403).json({ success: false, message: 'Mã QR không khớp với tài khoản.' });
    }

    // Kiểm tra hợp đồng
    const activeMembership = member.memberships[0];

    if (!activeMembership) {
      await prisma.checkIn.create({
        data: {
          memberId: member.id,
          checkType: 'MEMBER',
          status: 'DENIED',
          denyReason: 'Hội viên chưa đăng ký gói tập hoặc tất cả gói đã hết hạn.',
          staffId,
        },
      });

      io.emit('checkin_event', {
        status: 'DENIED',
        fullName: member.fullName,
        phone: member.phone,
        reason: 'Hội viên không có gói tập đang hoạt động!',
        customerType: 'MEMBER',
        timestamp: new Date(),
      });

      return res.status(400).json({ success: false, message: 'Hội viên không có gói tập nào đang hoạt động!' });
    }

    // Nếu đang bảo lưu
    if (activeMembership.status === 'FROZEN') {
      await prisma.checkIn.create({
        data: {
          memberId: member.id,
          membershipId: activeMembership.id,
          checkType: 'MEMBER',
          status: 'DENIED',
          denyReason: 'Gói tập đang trong thời gian bảo lưu (tạm ngưng).',
          staffId,
        },
      });

      io.emit('checkin_event', {
        status: 'DENIED',
        fullName: member.fullName,
        phone: member.phone,
        packageName: activeMembership.package.name,
        reason: 'Gói tập đang tạm ngưng bảo lưu! Vui lòng mở lại gói trước khi vào tập.',
        customerType: 'MEMBER',
        timestamp: new Date(),
      });

      return res.status(400).json({
        success: false,
        message: 'Gói tập đang trong trạng thái bảo lưu.',
      });
    }

    // Kiểm tra ngày hết hạn
    const today = new Date();
    if (today > new Date(activeMembership.endDate)) {
      await prisma.checkIn.create({
        data: {
          memberId: member.id,
          membershipId: activeMembership.id,
          checkType: 'MEMBER',
          status: 'DENIED',
          denyReason: 'Gói tập đã hết hạn sử dụng.',
          staffId,
        },
      });

      io.emit('checkin_event', {
        status: 'DENIED',
        fullName: member.fullName,
        phone: member.phone,
        packageName: activeMembership.package.name,
        reason: 'Gói tập đã hết hạn sử dụng! Vui lòng tư vấn gia hạn.',
        customerType: 'MEMBER',
        timestamp: new Date(),
      });

      return res.status(400).json({ success: false, message: 'Gói tập đã hết hạn sử dụng.' });
    }

    // CHECK-IN THÀNH CÔNG HỢP LỆ!
    await prisma.checkIn.create({
      data: {
        memberId: member.id,
        membershipId: activeMembership.id,
        checkType: 'MEMBER',
        status: 'SUCCESS',
        staffId,
      },
    });

    const daysRemaining = Math.ceil(
      (new Date(activeMembership.endDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    const emitData = {
      status: 'SUCCESS',
      customerType: 'MEMBER',
      fullName: member.fullName,
      phone: member.phone,
      packageName: activeMembership.package.name,
      daysRemaining,
      remainingSessions: activeMembership.remainingSessions,
      avatarUrl: member.avatarUrl,
      timestamp: new Date(),
    };

    io.emit('checkin_event', emitData);

    return res.json({
      success: true,
      message: 'Check-in thành công!',
      data: emitData,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCheckinLogs = async (req: AuthRequest, res: Response) => {
  try {
    const logs = await prisma.checkIn.findMany({
      take: 50,
      orderBy: { checkinTime: 'desc' },
      include: {
        member: { select: { fullName: true, phone: true } },
        membership: { include: { package: true } },
        trialBooking: { include: { lead: true } },
        staff: { select: { fullName: true } },
      },
    });

    return res.json({ success: true, data: logs });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

