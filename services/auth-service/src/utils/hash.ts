import bcrypt from 'bcryptjs';
import logger from '../services/logger.service';

export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (err) {
    logger.error({
      event: 'hash_password_error',
      error: (err as Error).message,
      stack: (err as Error).stack,
    });
    throw err;
  }
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    logger.error({
      event: 'compare_password_error',
      error: (err as Error).message,
      stack: (err as Error).stack,
    });
    throw err;
  }
}
