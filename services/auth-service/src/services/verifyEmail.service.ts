import redis from '../utils/redis';
import { sendWelcomeEmail } from '../utils/email';
import axios from 'axios';

export async function verifyEmail(token: string) {
  const key = `email_verif_${token}`;
  const data = await redis.get(key);
  if (!data) {
    throw new Error('Invalid or expired token');
  }
  const { user_id, email } = JSON.parse(data) as {
    user_id: number;
    email: string;
  };
  await redis.del(key);
  await sendWelcomeEmail(email);

  try {
    await axios.post('http://user-service:4001/user/profile', {
      user_id: user_id,
      email: email,
      full_name: '',
      phone: '',
      location: '',
      preferences: '',
    });
  } catch (err) {
    console.error('Failed to create user profile after verification:', err);
  }

  return email;
}
