import nodemailer from 'nodemailer';
import logger from '../services/logger.service';

let transporter: nodemailer.Transporter;

/**
 * Initialize the email transporter.
 * Call this once at service startup.
 */
export async function initEmail() {
  try {
    //   if (process.env.ETHEREAL_USER && process.env.ETHEREAL_PASS) {
    //     // Use Ethereal account from .env
    //     transporter = nodemailer.createTransport({
    //       host: 'smtp.ethereal.email',
    //       port: 587,
    //       auth: {
    //         user: process.env.ETHEREAL_USER,
    //         pass: process.env.ETHEREAL_PASS,
    //       },
    //     });

    //     logger.info({
    //       event: 'email_transporter_initialized',
    //       message: 'Using Ethereal account from .env',
    //       user: process.env.ETHEREAL_USER,
    //     });
    //     return;
    //   }

    // Create a temporary test account for dev
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    logger.info({
      event: 'email_transporter_initialized',
      message: 'Created temporary Ethereal test account',
      user: testAccount.user,
    });
  } catch (err) {
    logger.error({
      event: 'email_transporter_init_failed',
      error: (err as Error).message,
      stack: (err as Error).stack,
    });
    throw err;
  }
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(to: string) {
  if (!transporter) {
    const errorMsg =
      'Email transporter not initialized. Call initEmail() first.';
    logger.error({ event: 'send_welcome_email_failed', to, error: errorMsg });
    throw new Error(errorMsg);
  }

  try {
    const info = await transporter.sendMail({
      from: '"Job Dashboard" <noreply@jobdashboard.com>',
      to,
      subject: 'Welcome to Job Dashboard!',
      text: `Welcome! Thank you for signing up.`,
      html: `<h3>Welcome to Job Dashboard!</h3><p>Thank you for signing up.</p>`,
    });

    logger.info({
      event: 'welcome_email_sent',
      to,
      previewUrl: nodemailer.getTestMessageUrl(info),
    });
  } catch (err) {
    logger.error({
      event: 'send_welcome_email_error',
      to,
      error: (err as Error).message,
      stack: (err as Error).stack,
    });
    throw err;
  }
}

/**
 * Send verification email
 */
export async function sendVerificationEmail(to: string, token: string) {
  if (!transporter) {
    const errorMsg =
      'Email transporter not initialized. Call initEmail() first.';
    logger.error({
      event: 'send_verification_email_failed',
      to,
      error: errorMsg,
    });
    throw new Error(errorMsg);
  }

  try {
    const FRONTEND_URL = process.env.FRONTEND_URL;
    const url = `${FRONTEND_URL}/auth/verify?token=${token}`;

    const info = await transporter.sendMail({
      from: '"Job Dashboard" <noreply@jobdashboard.com>',
      to,
      subject: 'Verify your email',
      text: `Click to verify: ${url}`,
      html: `<a href="${url}">Verify your email</a>`,
    });

    logger.info({
      event: 'verification_email_sent',
      to,
      token,
      previewUrl: nodemailer.getTestMessageUrl(info),
    });
  } catch (err) {
    logger.error({
      event: 'send_verification_email_error',
      to,
      token,
      error: (err as Error).message,
      stack: (err as Error).stack,
    });
    throw err;
  }
}
