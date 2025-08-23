import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../services/logger.service';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export interface AuthRequest extends Request {
  user?: { userId: number; role: string };
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    logger.warn({
      event: 'auth_token_missing',
      path: req.path,
      method: req.method,
    });
    return res.status(401).json({ error: 'Access token missing' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      role: string;
    };
    req.user = payload;

    logger.info({
      event: 'auth_token_validated',
      userId: payload.userId,
      role: payload.role,
      path: req.path,
    });
    next();
  } catch (err) {
    logger.error({
      event: 'auth_token_invalid',
      path: req.path,
      error: (err as Error).message,
      stack: (err as Error).stack,
    });
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}
