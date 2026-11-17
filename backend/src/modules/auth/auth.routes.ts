import { Router } from 'express';
import { login, registerMember, getMe } from './auth.controller.js';
import { authenticateJWT } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', login);
router.post('/register', registerMember);
router.get('/me', authenticateJWT, getMe);

export default router;

