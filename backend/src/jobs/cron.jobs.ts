import cron from 'node-cron';
import prisma from '../config/db.js';

export const startCronJobs = () => {
  console.log('⏰ [Cron Jobs] Khởi động các tác vụ nền định kỳ...');

  // Chạy lúc 00:01 mỗi ngày
  cron.schedule('1 0 * * *', async () => {
    console.log('🔄 [Cron Job] Đang kiểm tra hợp đồng hết hạn và tự động mở bảo lưu...');
    const today = new Date();

    try {
      // 1. Tự động chuyển các hợp đồng quá hạn sang EXPIRED
      const expiredCount = await prisma.membership.updateMany({
        where: {
          status: 'ACTIVE',
          endDate: { lt: today },
        },
        data: {
          status: 'EXPIRED',
        },
      });

      if (expiredCount.count > 0) {
        console.log(`📦 [Cron Job] Đã cập nhật ${expiredCount.count} hợp đồng hết hạn.`);
      }

      // 2. Tự động mở lại các hợp đồng bảo lưu đến ngày kết thúc bảo lưu
      const dueFreezes = await prisma.membershipFreeze.findMany({
        where: {
          status: 'ACTIVE',
          freezeEnd: { lte: today },
        },
        include: { membership: true },
      });

      for (const freeze of dueFreezes) {
        const freezeStartDate = new Date(freeze.freezeStart);
        let actualDays = Math.ceil((today.getTime() - freezeStartDate.getTime()) / (1000 * 60 * 60 * 24));
        if (actualDays < 1) actualDays = 1;

        const currentEndDate = new Date(freeze.membership.endDate);
        const newEndDate = new Date(currentEndDate);
        newEndDate.setDate(newEndDate.getDate() + actualDays);

        await prisma.$transaction([
          prisma.membershipFreeze.update({
            where: { id: freeze.id },
            data: {
              status: 'COMPLETED',
              actualUnfreezeDate: today,
              daysCount: actualDays,
            },
          }),
          prisma.membership.update({
            where: { id: freeze.membershipId },
            data: {
              status: 'ACTIVE',
              endDate: newEndDate,
            },
          }),
        ]);

        console.log(`❄️ [Cron Job] Đã tự động mở lại hợp đồng ${freeze.membership.contractCode} (cộng bù ${actualDays} ngày).`);
      }
    } catch (error) {
      console.error('❌ [Cron Job Error]:', error);
    }
  });
};

