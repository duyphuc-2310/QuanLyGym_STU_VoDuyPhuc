import { Router } from 'express';
import { createMembership, freezeMembership, unfreezeMembership, getMemberships } from './memberships.controller.js';
import { authenticateJWT, requireRoles } from '../../middlewares/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticateJWT);

router.get('/', requireRoles(Role.ADMIN, Role.STAFF, Role.PT), getMemberships);
router.post('/', requireRoles(Role.ADMIN, Role.STAFF), createMembership);
router.post('/:id/freeze', requireRoles(Role.ADMIN, Role.STAFF), freezeMembership);
router.post('/:id/unfreeze', requireRoles(Role.ADMIN, Role.STAFF), unfreezeMembership);

export default router;

