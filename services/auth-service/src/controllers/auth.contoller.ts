import { Request, Response } from 'express';
import * as signupService from '../services/signup.service';
import * as loginService from '../services/login.service';
import * as verifyService from '../services/verifyEmail.service';
import * as resendService from '../services/resendVerification.service';
import logger from '../services/logger.service';

export async function signup(req: Request, res: Response) {
  const { email, password, role } = req.body;

  logger.info({ event: 'signup_request_received', email, role });

  try {
    if (!email) {
      logger.warn({
        event: 'signup_validation_failed',
        reason: 'email_missing',
      });
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!password) {
      logger.warn({
        event: 'signup_validation_failed',
        reason: 'password_missing',
        email,
      });
      return res.status(400).json({ error: 'Password is required' });
    }

    const user = await signupService.signup(email, password, role);
    logger.info({ event: 'signup_response', email, userId: user.id });
    res.status(201).json({ message: 'User created', user });
  } catch (err: any) {
    logger.error({
      event: 'signup_error',
      email,
      error: err.message,
      stack: err.stack,
    });
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  logger.info({ event: 'login_request_received', email });

  try {
    const result = await loginService.login(email, password);
    logger.info({ event: 'login_response', email, userId: result.user.id });
    res.json(result);
  } catch (err: any) {
    logger.error({
      event: 'login_error',
      email,
      error: err.message,
      stack: err.stack,
    });
    res.status(401).json({ error: err.message });
  }
}

export async function verifyEmail(req: Request, res: Response) {
  const { token } = req.query;

  logger.info({ event: 'verify_email_request_received', token });

  try {
    if (!token || typeof token !== 'string') {
      logger.warn({
        event: 'verify_email_validation_failed',
        reason: 'token_missing',
      });
      return res.status(400).json({ error: 'Token is required' });
    }

    const email = await verifyService.verifyEmail(token);
    logger.info({ event: 'verify_email_response', token, email });
    res.json({ message: 'Email verified successfully!', email });
  } catch (err: any) {
    logger.error({
      event: 'verify_email_error',
      token,
      error: err.message,
      stack: err.stack,
    });
    res.status(400).json({ error: err.message });
  }
}

export async function resendVerification(req: Request, res: Response) {
  const { email } = req.body;
  logger.info({ event: 'resend_verification_request_received', email });

  try {
    const token = await resendService.resendVerification(email);
    logger.info({ event: 'resend_verification_response', email, token });
    res.json({ message: 'Verification email resent', token });
  } catch (err: any) {
    logger.error({
      event: 'resend_verification_error',
      email,
      error: err.message,
      stack: err.stack,
    });
    res.status(400).json({ error: err.message });
  }
}
