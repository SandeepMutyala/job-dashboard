import { Router } from 'express';
import {
  signup,
  login,
  verifyEmail,
  resendVerification,
} from '../controllers/auth.contoller';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', verifyEmail);
router.post('/resend-verification', resendVerification);

export default router;
