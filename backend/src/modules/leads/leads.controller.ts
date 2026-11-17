import { Request, Response } from 'express';
import prisma from '../../config/db.js';
import { getIO } from '../../config/socket.js';
import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const createTrialLead = async (req: Request, res: Response) => {
  try {
    const { fullName, phone, email, interestService, goal, initialBmi, initialTdee, scheduledDate, timeSlot } = req.body;

    if (!fullName || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Họ tên và số điện thoại là bắt buộc.',
      });
    }

    // Sinh mã vé ngẫu nhiên duy nhất
    const ticketCode = 'TRIAL-' + Math.floor(100000 + Math.random() * 900000);
    const dateObj = scheduledDate ? new Date(scheduledDate) : new Date();

    const newLead = await prisma.lead.create({
      data: {
        fullName,
        phone,
        email: email || null,
        interestService: interestService || 'gym',
        goal: goal || null,
        initialBmi: initialBmi ? parseFloat(initialBmi) : null,
        initialTdee: initialTdee ? parseInt(initialTdee) : null,
        status: 'NEW',
        trialBookings: {
          create: {
            ticketCode,
            scheduledDate: dateObj,
            timeSlot: timeSlot || 'evening',
            status: 'VALID',
          },
        },
      },
      include: {
        trialBookings: true,
      },
    });

    // Thông báo Realtime cho quầy Lễ tân
    try {
      const io = getIO();
      io.emit('new_lead_registered', {
        id: newLead.id,
        fullName: newLead.fullName,
        phone: newLead.phone,
        ticketCode,
        interestService: newLead.interestService,
        createdAt: newLead.createdAt,
      });
    } catch (err) {
      // socket chưa kết nối thì bỏ qua
    }

    return res.status(201).json({
      success: true,
      message: 'Đăng ký tập thử 3 ngày thành công!',
      data: {
        ticketCode,
        fullName: newLead.fullName,
        phone: newLead.phone,
        scheduledDate: newLead.trialBookings[0].scheduledDate,
        timeSlot: newLead.trialBookings[0].timeSlot,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getLeads = async (req: AuthRequest, res: Response) => {
  try {
    const { status, search } = req.query;

    const leads = await prisma.lead.findMany({
      where: {
        ...(status && { status: status as any }),
        ...(search && {
          OR: [
            { fullName: { contains: String(search) } },
            { phone: { contains: String(search) } },
          ],
        }),
      },
      include: {
        trialBookings: true,
        assignedStaff: { select: { id: true, fullName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({
      success: true,
      data: leads,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateLeadStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, assignedStaffId } = req.body;

    const updated = await prisma.lead.update({
      where: { id: parseInt(id) },
      data: {
        ...(status && { status }),
        ...(assignedStaffId && { assignedStaffId: parseInt(assignedStaffId) }),
      },
      include: { trialBookings: true },
    });

    return res.json({
      success: true,
      message: 'Cập nhật trạng thái khách tiềm năng thành công!',
      data: updated,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

