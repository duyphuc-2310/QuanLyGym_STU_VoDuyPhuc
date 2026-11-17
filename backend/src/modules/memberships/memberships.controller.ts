import { Request, Response } from 'express';
import prisma from '../../config/db.js';
import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const createMembership = async (req: AuthRequest, res: Response) => {
  try {
    const { memberId, packageId, assignedPtId, startDate, totalAmount, paidAmount, paymentMethod } = req.body;

    const pkg = await prisma.package.findUnique({ where: { id: parseInt(packageId) } });
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Gói tập không tồn tại.' });
    }

    const start = startDate ? new Date(startDate) : new Date();
    const end = new Date(start);
    end.setDate(end.getDate() + pkg.durationDays);

    const contractCode = `HD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const result = await prisma.$transaction(async (tx) => {
      const membership = await tx.membership.create({
        data: {
          contractCode,
          memberId: parseInt(memberId),
          packageId: pkg.id,
          assignedPtId: assignedPtId ? parseInt(assignedPtId) : null,
          startDate: start,
          endDate: end,
          remainingSessions: pkg.ptSessions,
          status: 'ACTIVE',
          totalAmount: parseFloat(totalAmount || String(pkg.price)),
          paidAmount: parseFloat(paidAmount || String(pkg.price)),
          createdBy: req.user!.id,
        },
        include: {
          package: true,
          member: { select: { fullName: true, phone: true } },
        },
      });

      // Tạo hóa đơn thu tiền
      await tx.payment.create({
        data: {
          membershipId: membership.id,
          paymentCode: `PAY-${Date.now()}`,
          amount: membership.paidAmount,
          paymentMethod: paymentMethod || 'CASH',
          status: 'PAID',
          paidAt: new Date(),
          processedBy: req.user!.id,
          note: `Thanh toán hợp đồng ${contractCode}`,
        },
      });

      return membership;
    });

    return res.status(201).json({
      success: true,
      message: 'Kích hoạt hợp đồng hội viên thành công!',
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const freezeMembership = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { freezeStart, freezeEnd, reason } = req.body;

    const membership = await prisma.membership.findUnique({
      where: { id: parseInt(id) },
      include: { package: true, freezes: { where: { status: 'COMPLETED' } } },
    });

    if (!membership) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy hợp đồng.' });
    }

    if (membership.status !== 'ACTIVE') {
      return res.status(400).json({
        success: false,
        message: `Hợp đồng đang ở trạng thái ${membership.status}, không thể bảo lưu.`,
      });
    }

    const start = new Date(freezeStart);
    const end = new Date(freezeEnd);
    const requestedDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    // Tính tổng số ngày đã bảo lưu trước đó
    const previouslyFrozenDays = membership.freezes.reduce((sum, f) => sum + f.daysCount, 0);
    const allowedDays = membership.package.maxFreezeDays - previouslyFrozenDays;

    if (requestedDays > allowedDays) {
      return res.status(400).json({
        success: false,
        message: `Gói tập chỉ còn được bảo lưu tối đa ${allowedDays} ngày (Yêu cầu: ${requestedDays} ngày).`,
      });
    }

    const freezeRecord = await prisma.$transaction(async (tx) => {
      // Đổi trạng thái hợp đồng sang FROZEN
      await tx.membership.update({
        where: { id: membership.id },
        data: { status: 'FROZEN' },
      });

      return tx.membershipFreeze.create({
        data: {
          membershipId: membership.id,
          freezeStart: start,
          freezeEnd: end,
          daysCount: requestedDays,
          reason: reason || 'Hội viên yêu cầu',
          approvedBy: req.user!.id,
          status: 'ACTIVE',
        },
      });
    });

    return res.json({
      success: true,
      message: `Đã bảo lưu gói tập thành công ${requestedDays} ngày.`,
      data: freezeRecord,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const unfreezeMembership = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const membership = await prisma.membership.findUnique({
      where: { id: parseInt(id) },
      include: {
        freezes: { where: { status: 'ACTIVE' }, orderBy: { createdAt: 'desc' }, take: 1 },
      },
    });

    if (!membership || membership.status !== 'FROZEN' || membership.freezes.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Hợp đồng không ở trạng thái bảo lưu hoặc không có đợt bảo lưu khả dụng.',
      });
    }

    const currentFreeze = membership.freezes[0];
    const today = new Date();
    const freezeStartDate = new Date(currentFreeze.freezeStart);

    // Số ngày bảo lưu thực tế
    let actualDays = Math.ceil((today.getTime() - freezeStartDate.getTime()) / (1000 * 60 * 60 * 24));
    if (actualDays < 1) actualDays = 1;

    // Cộng bù ngày vào endDate
    const currentEndDate = new Date(membership.endDate);
    const newEndDate = new Date(currentEndDate);
    newEndDate.setDate(newEndDate.getDate() + actualDays);

    const updated = await prisma.$transaction(async (tx) => {
      await tx.membershipFreeze.update({
        where: { id: currentFreeze.id },
        data: {
          status: 'COMPLETED',
          actualUnfreezeDate: today,
          daysCount: actualDays,
        },
      });

      return tx.membership.update({
        where: { id: membership.id },
        data: {
          status: 'ACTIVE',
          endDate: newEndDate,
        },
        include: { package: true, member: true },
      });
    });

    return res.json({
      success: true,
      message: `Mở lại hợp đồng thành công! Đã cộng bù ${actualDays} ngày vào hạn gói (Hạn mới: ${newEndDate.toLocaleDateString('vi-VN')}).`,
      data: updated,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMemberships = async (req: AuthRequest, res: Response) => {
  try {
    const { status, memberId, search } = req.query;

    const memberships = await prisma.membership.findMany({
      where: {
        ...(status && { status: status as any }),
        ...(memberId && { memberId: parseInt(String(memberId)) }),
        ...(search && {
          OR: [
            { contractCode: { contains: String(search) } },
            { member: { fullName: { contains: String(search) } } },
            { member: { phone: { contains: String(search) } } },
          ],
        }),
      },
      include: {
        package: true,
        member: { select: { id: true, fullName: true, phone: true } },
        assignedPt: { select: { id: true, fullName: true } },
        freezes: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ success: true, data: memberships });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

