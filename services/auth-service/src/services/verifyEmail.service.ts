import redis from '../utils/redis';
import { sendWelcomeEmail } from '../utils/email';
import axios from 'axios';
import logger from './logger.service';

export async function verifyEmail(token: string) {
  try {
    const key = `email_verif_${token}`;
    const data = await redis.get(key);

    if (!data) {
      logger.error({
        event: 'email_verification_failed',
        reason: 'invalid_or_expired_token',
        token,
      });
      throw new Error('Invalid or expired token');
    }

    const { user_id, email } = JSON.parse(data) as {
      user_id: number;
      email: string;
    };

    await redis.del(key);
    logger.info({ event: 'verification_token_deleted', userId: user_id });

    await sendWelcomeEmail(email);
    logger.info({ event: 'welcome_email_sent', email, userId: user_id });

    try {
      await axios.post('http://user-service:4001/user/profile', {
        user_id,
        email,
        full_name: '',
        phone: '',
        location: '',
        preferences: '',
      });
      logger.info({ event: 'user_profile_created', userId: user_id, email });
    } catch (err) {
      logger.error({
        event: 'user_profile_creation_failed',
        userId: user_id,
        email,
        error: (err as Error).message,
        stack: (err as Error).stack,
      });
    }

    return email;
  } catch (err) {
    throw err;
  }
}
