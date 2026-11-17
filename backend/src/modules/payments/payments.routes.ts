import { Router } from 'express';
import { createVietQROrder, handlePaymentWebhook } from './payments.controller.js';

const router = Router();

router.post('/vietqr-order', createVietQROrder);
router.post('/webhook', handlePaymentWebhook);

export default router;

