import { Router } from 'express';
import { getPackages, createPackage, updatePackage } from './packages.controller.js';
import { authenticateJWT, requireRoles } from '../../middlewares/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

// Public: xem danh sách gói tập
router.get('/', getPackages);

// Admin: quản trị gói tập
router.post('/', authenticateJWT, requireRoles(Role.ADMIN), createPackage);
router.put('/:id', authenticateJWT, requireRoles(Role.ADMIN), updatePackage);

export default router;

