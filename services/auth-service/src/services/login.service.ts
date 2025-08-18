import prisma from '../prisma/client';
import { comparePassword } from '../utils/hash';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import redis from '../utils/redis';

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid credentials');

  const valid = await comparePassword(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

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
    throw new Error('Please verify your email first');
  }

  const accessToken = generateAccessToken(user.id, user.role);
  const refreshToken = generateRefreshToken(user.id);

  await redis.set(`refresh_${user.id}`, refreshToken, 'EX', 7 * 24 * 60 * 60);

  return { accessToken, refreshToken, user };
}
