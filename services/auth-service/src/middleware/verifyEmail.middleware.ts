import { Request, Response, NextFunction } from 'express';
import redis from '../utils/redis';
import { AuthRequest } from './auth.middleware';

export async function checkEmailVerified(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user?.userId;
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const keys = await redis.keys(`email_verif_*`);
  const tokenExists = await Promise.all(
    keys.map(async (key) => (await redis.get(key)) === userId.toString()),
  );

  if (tokenExists.includes(true)) {
    return res.status(403).json({ error: 'Please verify your email first' });
  }

  next();
}
