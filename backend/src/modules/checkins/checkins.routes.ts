import { Router } from 'express';
import { getDynamicQR, scanQR, getCheckinLogs } from './checkins.controller.js';
import { authenticateJWT, requireRoles } from '../../middlewares/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticateJWT);

// Hội viên lấy mã QR động (hạn 60s)
router.get('/dynamic-qr', requireRoles(Role.MEMBER), getDynamicQR);

// Lễ tân quét mã QR tại quầy
router.post('/scan', requireRoles(Role.ADMIN, Role.STAFF), scanQR);

// Xem nhật ký check-in
router.get('/logs', requireRoles(Role.ADMIN, Role.STAFF), getCheckinLogs);

export default router;

