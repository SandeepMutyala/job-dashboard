import prisma from '../prisma/client';
import logger from './logger.service';

export async function createProfile(
  user_id: number,
  email: string,
  full_name: string,
  phone: string,
  location: string,
  preferences: string,
) {
  try {
    const profile = await prisma.user_profile.create({
      data: {
        user_id,
        email,
        full_name,
        phone,
        location,
        preferences,
      },
    });

    logger.info({
      event: 'profile_created',
      userId: user_id,
      profileId: profile.id,
      message: 'User profile created successfully',
    });

    return profile;
  } catch (err) {
    throw err;
  }
}
