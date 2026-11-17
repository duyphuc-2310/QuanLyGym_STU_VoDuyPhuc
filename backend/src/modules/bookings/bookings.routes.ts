import { Router } from 'express';
import { createPTBooking, completePTBooking, getPTBookings } from './bookings.controller.js';
import { authenticateJWT, requireRoles } from '../../middlewares/auth.middleware.js';
import { Role } from '@prisma/client';

const router = Router();

router.use(authenticateJWT);

router.post('/', requireRoles(Role.MEMBER, Role.STAFF, Role.ADMIN), createPTBooking);
router.patch('/:id/complete', requireRoles(Role.PT, Role.STAFF, Role.ADMIN), completePTBooking);
router.get('/', getPTBookings);

export default router;

