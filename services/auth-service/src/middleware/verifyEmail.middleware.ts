import { Request, Response, NextFunction } from 'express';
import redis from '../utils/redis';
import { AuthRequest } from './auth.middleware';
import logger from '../services/logger.service';

export async function checkEmailVerified(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const userId = req.user?.userId;

  if (!userId) {
    logger.warn({
      event: 'check_email_verified_failed',
      reason: 'unauthorized',
      path: req.path,
      method: req.method,
    });
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const keys = await redis.keys(`email_verif_*`);
    const tokenExists = await Promise.all(
      keys.map(async (key) => {
        const data = await redis.get(key);
        if (!data) return false;
        const parsed = JSON.parse(data);
        return parsed.user_id === userId;
      }),
    );

    if (tokenExists.includes(true)) {
      logger.warn({
        event: 'check_email_verified_failed',
        reason: 'email_not_verified',
        userId,
        path: req.path,
        method: req.method,
      });
      return res.status(403).json({ error: 'Please verify your email first' });
    }

    logger.info({
      event: 'check_email_verified_passed',
      userId,
      path: req.path,
      method: req.method,
    });
    next();
  } catch (err) {
    logger.error({
      event: 'check_email_verified_error',
      userId,
      error: (err as Error).message,
      stack: (err as Error).stack,
      path: req.path,
      method: req.method,
    });
    res.status(500).json({ error: 'Internal server error' });
  }
}
