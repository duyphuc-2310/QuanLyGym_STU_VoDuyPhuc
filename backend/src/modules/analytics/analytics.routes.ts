import { Router } from 'express';
import { getDashboardStats } from './analytics.controller.js';
import { authenticateJWT, requireRoles } from '../../middlewares/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

router.get('/stats', authenticateJWT, requireRoles(Role.ADMIN, Role.STAFF), getDashboardStats);

export default router;

