import { Request, Response } from 'express';
import { createProfile } from '../services/profile.service';
import logger from '../services/logger.service';

export async function handleCreateProfile(req: Request, res: Response) {
  try {
    const { user_id, email, full_name, phone, location, preferences } =
      req.body;

    if (!user_id) {
      logger.warn({
        event: 'create_profile_failed',
        reason: 'missing_user_id',
        body: req.body,
      });
      return res.status(400).json({ error: 'user_id is required' });
    }

    const profile = await createProfile(
      user_id,
      email,
      full_name || '',
      phone || '',
      location || '',
      preferences || '',
    );

    logger.info({
      event: 'create_profile_success',
      userId: user_id,
      profileId: profile.id,
    });

    res.status(201).json(profile);
  } catch (err: any) {
    logger.error({
      event: 'profile_creation_failed',
      error: err.message,
      stack: err.stack,
      body: req.body,
    });
    res.status(500).json({ error: 'Failed to create profile' });
  }
}
