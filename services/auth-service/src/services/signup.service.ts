import prisma from '../prisma/client';
import { hashPassword } from '../utils/hash';
import { sendVerificationEmail } from '../utils/email';
import redis from '../utils/redis';
import { v4 as uuidv4 } from 'uuid';

export async function signup(email: string, password: string, role: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('User already exists');

  const hashed = await hashPassword(password);
  const verificationToken = uuidv4();

  const user = await prisma.user.create({
    data: { email, password: hashed, role: role as any },
  });

  await redis.set(
    `email_verif_${verificationToken}`,
    JSON.stringify({ user_id: user.id, email: user.email }),
    'EX',
    24 * 60 * 60,
  );

  await sendVerificationEmail(email, verificationToken);

  return user;
}
