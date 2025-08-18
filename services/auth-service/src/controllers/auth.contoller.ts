import { Request, Response } from 'express';
import * as signupService from '../services/signup.service';
import * as loginService from '../services/login.service';
import * as verifyService from '../services/verifyEmail.service';
import * as resendService from '../services/resendVerification.service';

export async function signup(req: Request, res: Response) {
  try {
    const { email, password, role } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
    const user = await signupService.signup(email, password, role);
    res.status(201).json({ message: 'User created', user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const result = await loginService.login(email, password);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
}

export async function verifyEmail(req: Request, res: Response) {
  try {
    const { token } = req.query;
    if (!token || typeof token !== 'string') {
      return res.status(400).json({ error: 'Token is required' });
    }
    const email = await verifyService.verifyEmail(token);
    res.json({ message: 'Email verified successfully!', email });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function resendVerification(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const token = await resendService.resendVerification(email);
    res.json({ message: 'Verification email resent', token });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
