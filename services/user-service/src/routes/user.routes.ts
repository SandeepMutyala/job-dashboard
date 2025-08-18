import { Router } from 'express';
import { handleCreateProfile } from '../controllers/user.controller';

const router = Router();

router.post('/profile', handleCreateProfile);

export default router;
