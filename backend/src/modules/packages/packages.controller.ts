import { Request, Response } from 'express';
import prisma from '../../config/db.js';

export const getPackages = async (req: Request, res: Response) => {
  try {
    const { type } = req.query;

    const packages = await prisma.package.findMany({
      where: {
        isActive: true,
        ...(type && { packageType: type as any }),
      },
      orderBy: { price: 'asc' },
    });

    return res.json({
      success: true,
      data: packages,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createPackage = async (req: Request, res: Response) => {
  try {
    const { code, name, packageType, durationDays, ptSessions, price, maxFreezeDays, description } = req.body;

    const newPkg = await prisma.package.create({
      data: {
        code,
        name,
        packageType,
        durationDays: parseInt(durationDays),
        ptSessions: parseInt(ptSessions || '0'),
        price: parseFloat(price),
        maxFreezeDays: parseInt(maxFreezeDays || '0'),
        description,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Tạo gói tập mới thành công!',
      data: newPkg,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await prisma.package.update({
      where: { id: parseInt(id) },
      data,
    });

    return res.json({
      success: true,
      message: 'Cập nhật gói tập thành công!',
      data: updated,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

