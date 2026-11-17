import { Router } from 'express';
import { logBodyMetric, getMemberMetrics } from './metrics.controller.js';
import { authenticateJWT, requireRoles } from '../../middlewares/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticateJWT);

router.post('/', requireRoles(Role.PT, Role.STAFF, Role.ADMIN), logBodyMetric);
router.get('/:memberId', getMemberMetrics);

export default router;

