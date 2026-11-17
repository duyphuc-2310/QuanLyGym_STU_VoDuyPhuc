import { Request, Response } from 'express';
import prisma from '../../config/db.js';
import { AuthRequest } from '../../middlewares/auth.middleware.js';

export const logBodyMetric = async (req: AuthRequest, res: Response) => {
  try {
    const ptId = req.user!.role === 'PT' ? req.user!.id : null;
    const { memberId, height, weight, bodyFatPct, muscleMassKg, activityFactor, recommendations } = req.body;

    const h = parseFloat(height);
    const w = parseFloat(weight);

    // 1. BMI = W / (H_m ^ 2)
    const hm = h / 100;
    const bmi = parseFloat((w / (hm * hm)).toFixed(1));

    // Lấy tuổi và giới tính của hội viên để tính BMR
    const member = await prisma.user.findUnique({
      where: { id: parseInt(memberId) },
      include: { memberProfile: true },
    });

    let age = 23;
    if (member?.memberProfile?.dob) {
      age = new Date().getFullYear() - new Date(member.memberProfile.dob).getFullYear();
    }
    const isMale = member?.memberProfile?.gender !== 'female';

    // 2. BMR (Mifflin-St Jeor)
    let bmr = Math.round(10 * w + 6.25 * h - 5 * age + (isMale ? 5 : -161));

    // 3. TDEE
    const factor = parseFloat(activityFactor || '1.375');
    const tdee = Math.round(bmr * factor);

    const metric = await prisma.bodyMetric.create({
      data: {
        memberId: parseInt(memberId),
        ptId,
        height: h,
        weight: w,
        bodyFatPct: bodyFatPct ? parseFloat(bodyFatPct) : null,
        muscleMassKg: muscleMassKg ? parseFloat(muscleMassKg) : null,
        bmi,
        bmr,
        tdee,
        recommendations: recommendations || null,
      },
    });

    return res.status(201).json({
      success: true,
      message: 'Ghi nhận chỉ số thể trạng InBody thành công!',
      data: metric,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMemberMetrics = async (req: AuthRequest, res: Response) => {
  try {
    const { memberId } = req.params;

    const metrics = await prisma.bodyMetric.findMany({
      where: { memberId: parseInt(memberId) },
      orderBy: { measuredAt: 'asc' },
      include: {
        trainer: { select: { fullName: true } },
      },
    });

    return res.json({ success: true, data: metrics });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

