import prisma from '../prisma/client';
import { hashPassword } from '../utils/hash';
import { sendVerificationEmail } from '../utils/email';
import redis from '../utils/redis';
import { v4 as uuidv4 } from 'uuid';
import logger from './logger.service';

export async function signup(email: string, password: string, role: string) {
  try {
    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      logger.warn({ event: 'signup_failed', reason: 'user_exists', email });
      throw new Error('User already exists');
    }

    // Hash password
    const hashed = await hashPassword(password);
    const verificationToken = uuidv4();

    // Create user in database
    const user = await prisma.user.create({
      data: { email, password: hashed, role: role as any },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    logger.info({
      event: 'user_created',
      userId: user.id,
      email: user.email,
      role,
    });

    // Cache verification token in Redis
    await redis.set(
      `email_verif_${verificationToken}`,
      JSON.stringify({ user_id: user.id, email: user.email }),
      'EX',
      24 * 60 * 60,
    );
    logger.debug({ event: 'verification_token_cached', userId: user.id });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);
    logger.info({ event: 'verification_email_sent', email });

    return user;
  } catch (err) {
    throw err;
  }
}
