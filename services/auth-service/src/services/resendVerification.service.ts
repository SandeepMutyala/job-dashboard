import prisma from '../prisma/client';
import { v4 as uuidv4 } from 'uuid';
import redis from '../utils/redis';
import { sendVerificationEmail } from '../utils/email';

export async function resendVerification(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const verificationToken = uuidv4();
  await redis.set(
    `email_verif_${verificationToken}`,
    JSON.stringify({ user_id: user.id, email: user.email }),
    'EX',
    24 * 60 * 60,
  );

  await sendVerificationEmail(email, verificationToken);

  return verificationToken;
}
