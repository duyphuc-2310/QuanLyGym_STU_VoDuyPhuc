import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../../config/db.js';
import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const login = async (req: Request, res: Response) => {
  try {
    const { loginId, password } = req.body; // loginId có thể là phone hoặc email hoặc username

    if (!loginId || !password) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập tài khoản (SĐT/Email) và mật khẩu.',
      });
    }

    // Tìm kiếm theo số điện thoại hoặc email (hoặc demo 'admin', 'staff', 'pt', 'member')
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { phone: loginId },
          { email: loginId },
        ],
      },
      include: {
        memberProfile: true,
        ptProfile: true,
      },
    });

    // Hỗ trợ demo username
    if (!user) {
      if (loginId.toLowerCase() === 'admin') {
        user = await prisma.user.findFirst({ where: { role: 'ADMIN' }, include: { memberProfile: true, ptProfile: true } });
      } else if (loginId.toLowerCase() === 'staff') {
        user = await prisma.user.findFirst({ where: { role: 'STAFF' }, include: { memberProfile: true, ptProfile: true } });
      } else if (loginId.toLowerCase() === 'pt') {
        user = await prisma.user.findFirst({ where: { role: 'PT' }, include: { memberProfile: true, ptProfile: true } });
      } else if (loginId.toLowerCase() === 'member') {
        user = await prisma.user.findFirst({ where: { role: 'MEMBER' }, include: { memberProfile: true, ptProfile: true } });
      }
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Tài khoản không tồn tại trên hệ thống.',
      });
    }

    if (user.status === 'BLOCKED') {
      return res.status(403).json({
        success: false,
        message: 'Tài khoản này đã bị khóa. Vui lòng liên hệ quản trị viên.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Mật khẩu không chính xác.',
      });
    }

    const secret = process.env.JWT_SECRET || 'CITYGYM_SECRET_KEY_SUPER_SECURE_2026_STU_THESIS';
    const token = jwt.sign(
      {
        id: user.id,
        phone: user.phone,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      secret,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Đăng nhập thành công!',
      data: {
        token,
        user: {
          id: user.id,
          phone: user.phone,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          avatarUrl: user.avatarUrl,
          memberProfile: user.memberProfile,
          ptProfile: user.ptProfile,
        },
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const registerMember = async (req: Request, res: Response) => {
  try {
    const { phone, password, fullName, email, gender, dob, address } = req.body;

    if (!phone || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ số điện thoại, mật khẩu và họ tên.',
      });
    }

    const existingUser = await prisma.user.findUnique({ where: { phone } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Số điện thoại này đã được đăng ký tài khoản.',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        phone,
        email: email || null,
        passwordHash,
        fullName,
        role: 'MEMBER',
        memberProfile: {
          create: {
            gender: gender || null,
            dob: dob ? new Date(dob) : null,
            address: address || null,
          },
        },
      },
      include: {
        memberProfile: true,
      },
    });

    const secret = process.env.JWT_SECRET || 'CITYGYM_SECRET_KEY_SUPER_SECURE_2026_STU_THESIS';
    const token = jwt.sign(
      {
        id: newUser.id,
        phone: newUser.phone,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
      },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Đăng ký tài khoản Hội viên thành công!',
      data: {
        token,
        user: {
          id: newUser.id,
          phone: newUser.phone,
          fullName: newUser.fullName,
          role: newUser.role,
          memberProfile: newUser.memberProfile,
        },
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: {
        memberProfile: true,
        ptProfile: true,
        memberships: {
          where: { status: 'ACTIVE' },
          include: { package: true, assignedPt: true },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Người dùng không tồn tại.' });
    }

    return res.json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

