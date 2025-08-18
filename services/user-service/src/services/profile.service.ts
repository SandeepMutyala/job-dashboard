import prisma from '../prisma/client';

export async function createProfile(
  user_id: number,
  email: string,
  full_name: string,
  phone: string,
  location: string,
  preferences: string,
) {
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
  return profile;
}
