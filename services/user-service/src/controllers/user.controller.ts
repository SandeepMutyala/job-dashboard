import { Request, Response } from 'express';
import { createProfile } from '../services/profile.service';

export async function handleCreateProfile(req: Request, res: Response) {
  try {
    const { user_id, email, full_name, phone, location, preferences } =
      req.body;
    if (!user_id) return res.status(400).json({ error: 'user_id is required' });

    const profile = await createProfile(
      user_id,
      email,
      full_name || '',
      phone || '',
      location || '',
      preferences || '',
    );
    res.status(201).json(profile);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create profile' });
  }
}
