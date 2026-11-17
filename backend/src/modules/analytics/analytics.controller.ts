import { Request, Response } from 'express';
import prisma from '../../config/db.js';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Tổng số hội viên đang hoạt động
    const activeMembersCount = await prisma.membership.count({
      where: { status: 'ACTIVE' },
    });

    // 2. Số lượt check-in hôm nay
    const todayCheckinsCount = await prisma.checkIn.count({
      where: {
        checkinTime: { gte: today },
        status: 'SUCCESS',
      },
    });

    // 3. Doanh thu tháng này
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const paymentsThisMonth = await prisma.payment.aggregate({
      where: {
        paidAt: { gte: firstDayOfMonth },
        status: 'PAID',
      },
      _sum: { amount: true },
    });

    const totalRevenueThisMonth = paymentsThisMonth._sum.amount || 0;

    // 4. Tỷ lệ chuyển đổi Lead từ Landing Page
    const totalLeads = await prisma.lead.count();
    const convertedLeads = await prisma.lead.count({ where: { status: 'CONVERTED' } });
    const conversionRate = totalLeads > 0 ? ((convertedLeads / totalLeads) * 100).toFixed(1) : '0';

    // 5. Phân tích khung giờ cao điểm (Peak Hours Heatmap) từ check_ins
    const allCheckins = await prisma.checkIn.findMany({
      where: { status: 'SUCCESS' },
      select: { checkinTime: true },
    });

    const hourlyDistribution: Record<number, number> = {};
    for (let h = 5; h <= 22; h++) {
      hourlyDistribution[h] = 0;
    }

    allCheckins.forEach((c) => {
      const hour = new Date(c.checkinTime).getHours();
      if (hourlyDistribution[hour] !== undefined) {
        hourlyDistribution[hour]++;
      }
    });

    const peakHoursData = Object.entries(hourlyDistribution).map(([hour, count]) => ({
      hour: `${hour}:00`,
      count,
    }));

    // 6. Hiệu suất & hoa hồng PT
    const trainers = await prisma.user.findMany({
      where: { role: 'PT' },
      include: {
        ptProfile: true,
        ptBookings: { where: { status: 'COMPLETED' } },
      },
    });

    const trainerPerformance = trainers.map((t) => {
      const completedSessions = t.ptBookings.length;
      const rate = Number(t.ptProfile?.commissionRate || 0.2);
      // Giả định mỗi buổi dạy nhận 150k hoa hồng cơ sở
      const totalCommission = completedSessions * 150000;

      return {
        id: t.id,
        fullName: t.fullName,
        specialty: t.ptProfile?.specialty || 'Huấn luyện viên',
        rating: Number(t.ptProfile?.ratingAvg || 5.0),
        completedSessions,
        totalCommission,
      };
    });

    return res.json({
      success: true,
      data: {
        kpi: {
          activeMembersCount,
          todayCheckinsCount,
          totalRevenueThisMonth,
          totalLeads,
          convertedLeads,
          conversionRate: `${conversionRate}%`,
        },
        peakHoursData,
        trainerPerformance,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

