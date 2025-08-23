import prisma from '../prisma/client';
import { comparePassword } from '../utils/hash';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import redis from '../utils/redis';
import logger from './logger.service';

export async function login(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      logger.warn({ event: 'login_failed', reason: 'user_not_found', email });
      throw new Error('Invalid credentials');
    }

    const valid = await comparePassword(password, user.password);
    if (!valid) {
      logger.warn({
        event: 'login_failed',
        reason: 'wrong_password',
        email,
        userId: user.id,
      });
      throw new Error('Invalid credentials');
    }

    // check verification status
    const emailKeys = await redis.keys('email_verif_*');
    const verified = await Promise.all(
      emailKeys.map(async (key) => {
        const data = await redis.get(key);
        if (!data) return false;

        const parsed = JSON.parse(data);
        return parsed.user_id === user.id && parsed.email === user.email;
      }),
    );

    if (verified.includes(true)) {
      logger.warn({
        event: 'login_failed',
        reason: 'email_not_verified',
        email,
        userId: user.id,
      });
      throw new Error('Please verify your email first');
    }

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    await redis.set(`refresh_${user.id}`, refreshToken, 'EX', 7 * 24 * 60 * 60);

    logger.info({
      event: 'login_success',
      email,
      userId: user.id,
      role: user.role,
    });

    return { accessToken, refreshToken, user };
  } catch (err) {
    throw err;
  }
}
