import { Request, Response } from 'express';
import prisma from '../../config/db.js';
import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const createPTBooking = async (req: AuthRequest, res: Response) => {
  try {
    const memberId = req.user!.id;
    const { membershipId, ptId, bookingDate, startTime, endTime } = req.body;

    const dateObj = new Date(bookingDate);

    // Sử dụng Database Transaction để ngăn chặn Race Condition (2 người đặt cùng lúc 1 giờ PT)
    const newBooking = await prisma.$transaction(async (tx) => {
      // 1. Kiểm tra gói tập có còn buổi không
      const membership = await tx.membership.findFirst({
        where: {
          id: parseInt(membershipId),
          memberId,
          status: 'ACTIVE',
        },
      });

      if (!membership || membership.remainingSessions < 1) {
        throw new Error('Gói tập không tồn tại hoặc đã hết số buổi tập kèm PT.');
      }

      // 2. Kiểm tra PT có bị trùng lịch trong khung giờ này không
      const conflictPT = await tx.pTBooking.findFirst({
        where: {
          ptId: parseInt(ptId),
          bookingDate: dateObj,
          startTime: String(startTime),
          status: 'SCHEDULED',
        },
      });

      if (conflictPT) {
        throw new Error('Huấn luyện viên đã có lịch dạy trong khung giờ này. Vui lòng chọn giờ khác.');
      }

      // 3. Kiểm tra Hội viên có bị trùng lịch cá nhân không
      const conflictMember = await tx.pTBooking.findFirst({
        where: {
          memberId,
          bookingDate: dateObj,
          startTime: String(startTime),
          status: 'SCHEDULED',
        },
      });

      if (conflictMember) {
        throw new Error('Bạn đã có lịch tập khác trong khung giờ này.');
      }

      // 4. Tạo lịch tập
      return tx.pTBooking.create({
        data: {
          membershipId: membership.id,
          memberId,
          ptId: parseInt(ptId),
          bookingDate: dateObj,
          startTime: String(startTime),
          endTime: String(endTime || '19:00'),
          status: 'SCHEDULED',
        },
        include: {
          trainer: { select: { fullName: true, phone: true } },
          member: { select: { fullName: true, phone: true } },
        },
      });
    });

    return res.status(201).json({
      success: true,
      message: 'Đặt lịch tập cùng Huấn luyện viên thành công!',
      data: newBooking,
    });
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const completePTBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { ptNote } = req.body;

    const booking = await prisma.pTBooking.findUnique({
      where: { id: parseInt(id) },
      include: { membership: true },
    });

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Lịch tập không tồn tại.' });
    }

    if (booking.status === 'COMPLETED') {
      return res.status(400).json({ success: false, message: 'Buổi tập này đã được xác nhận hoàn thành trước đó.' });
    }

    // Trừ 1 buổi tập trong hợp đồng khi hoàn thành
    const updated = await prisma.$transaction(async (tx) => {
      // 1. Cập nhật trạng thái buổi tập
      const completed = await tx.pTBooking.update({
        where: { id: booking.id },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          ...(ptNote && { ptNote }),
        },
      });

      // 2. Trừ 1 buổi tập còn lại
      await tx.membership.update({
        where: { id: booking.membershipId },
        data: {
          remainingSessions: {
            decrement: 1,
          },
        },
      });

      return completed;
    });

    return res.json({
      success: true,
      message: 'Xác nhận hoàn thành buổi tập thành công và đã trừ 1 buổi tập của học viên!',
      data: updated,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getPTBookings = async (req: AuthRequest, res: Response) => {
  try {
    const { ptId, memberId, date, status } = req.query;

    const bookings = await prisma.pTBooking.findMany({
      where: {
        ...(ptId && { ptId: parseInt(String(ptId)) }),
        ...(memberId && { memberId: parseInt(String(memberId)) }),
        ...(status && { status: status as any }),
        ...(date && { bookingDate: new Date(String(date)) }),
      },
      include: {
        trainer: { select: { id: true, fullName: true, phone: true } },
        member: { select: { id: true, fullName: true, phone: true } },
        membership: { include: { package: true } },
      },
      orderBy: [{ bookingDate: 'asc' }, { startTime: 'asc' }],
    });

    return res.json({ success: true, data: bookings });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

