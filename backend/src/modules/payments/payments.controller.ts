import { Request, Response } from 'express';
import prisma from '../../config/db.js';
import { getIO } from '../../config/socket.js';

export const createVietQROrder = async (req: Request, res: Response) => {
  try {
    const { membershipId, amount } = req.body;

    const paymentCode = `PAY-${Date.now()}`;
    const bankId = process.env.VIETQR_BANK_ID || '970422'; // MBBank
    const accountNo = process.env.VIETQR_ACCOUNT_NO || '0901234567';
    const accountName = process.env.VIETQR_ACCOUNT_NAME || 'CITYGYM FITNESS';

    // Link tạo mã VietQR QuickLink chuẩn NAPAS 24/7
    const qrUrl = `https://img.vietqr.io/image/${bankId}-${accountNo}-compact2.png?amount=${amount}&addInfo=${paymentCode}&accountName=${encodeURIComponent(accountName)}`;

    return res.json({
      success: true,
      data: {
        paymentCode,
        amount,
        bankId,
        accountNo,
        accountName,
        qrUrl,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const handlePaymentWebhook = async (req: Request, res: Response) => {
  try {
    const { paymentCode, amount, gatewayTransId } = req.body;

    if (!paymentCode) {
      return res.status(400).json({ success: false, message: 'Thiếu mã thanh toán.' });
    }

    const payment = await prisma.payment.findUnique({
      where: { paymentCode },
      include: { membership: true },
    });

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Giao dịch không tồn tại.' });
    }

    // Đảm bảo tính lũy đẳng (Idempotency) - Nếu đã thanh toán rồi thì không làm lại
    if (payment.status === 'PAID') {
      return res.json({ success: true, message: 'Giao dịch đã được ghi nhận trước đó.' });
    }

    // Cập nhật trạng thái thanh toán & kích hoạt hợp đồng
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: 'PAID',
          paidAt: new Date(),
          gatewayTransId: gatewayTransId || `TRANS-${Date.now()}`,
        },
      }),
      prisma.membership.update({
        where: { id: payment.membershipId },
        data: {
          status: 'ACTIVE',
          paidAmount: payment.amount,
        },
      }),
    ]);

    // Bắn socket báo cho Frontend người dùng đang chờ
    try {
      const io = getIO();
      io.emit('payment_success', {
        paymentCode,
        membershipId: payment.membershipId,
        amount: payment.amount,
        message: 'Thanh toán thành công! Gói tập đã được kích hoạt.',
      });
    } catch (e) {}

    return res.json({
      success: true,
      message: 'Đối soát Webhook thành công và đã kích hoạt hợp đồng.',
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

