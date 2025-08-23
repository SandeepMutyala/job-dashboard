import jwt from 'jsonwebtoken';
import logger from '../services/logger.service';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export function generateAccessToken(userId: number, role: string) {
  try {
    return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1h' });
  } catch (err) {
    logger.error({
      event: 'generate_access_token_error',
      userId,
      role,
      error: (err as Error).message,
      stack: (err as Error).stack,
    });
    throw err;
  }
}

export function generateRefreshToken(userId: number) {
  try {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
  } catch (err) {
    logger.error({
      event: 'generate_refresh_token_error',
      userId,
      error: (err as Error).message,
      stack: (err as Error).stack,
    });
    throw err;
  }
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    logger.error({
      event: 'verify_token_error',
      error: (err as Error).message,
      stack: (err as Error).stack,
    });
    throw err;
  }
}
