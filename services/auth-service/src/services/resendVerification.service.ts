import prisma from '../prisma/client';
import { v4 as uuidv4 } from 'uuid';
import redis from '../utils/redis';
import { sendVerificationEmail } from '../utils/email';
import logger from './logger.service';

export async function resendVerification(email: string) {
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      logger.warn({
        event: 'resend_verification_failed',
        reason: 'user_not_found',
        email,
      });
      throw new Error('User not found');
    }

    // Generate verification token and save in Redis
    const verificationToken = uuidv4();
    await redis.set(
      `email_verif_${verificationToken}`,
      JSON.stringify({ user_id: user.id, email: user.email }),
      'EX',
      24 * 60 * 60,
    );
    logger.debug({ event: 'verification_token_generated', userId: user.id });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);
    logger.info({ event: 'verification_email_sent', email });

    return verificationToken;
  } catch (err) {
    throw err;
  }
}
