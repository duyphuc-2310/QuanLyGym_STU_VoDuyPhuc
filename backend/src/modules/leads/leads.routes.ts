import { Router } from 'express';
import { createTrialLead, getLeads, updateLeadStatus } from './leads.controller.js';
import { authenticateJWT, requireRoles } from '../../middlewares/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

// Public: khách vãng lai đăng ký từ Landing Page
router.post('/trial', createTrialLead);

// Nội bộ: Lễ tân & Admin quản lý Lead
router.get('/', authenticateJWT, requireRoles(Role.ADMIN, Role.STAFF), getLeads);
router.patch('/:id/status', authenticateJWT, requireRoles(Role.ADMIN, Role.STAFF), updateLeadStatus);

export default router;

