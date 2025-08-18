import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter;

/**
 * Initialize the email transporter.
 * Call this once at service startup.
 */
export async function initEmail() {
  //   if (process.env.ETHEREAL_USER && process.env.ETHEREAL_PASS) {
  //     transporter = nodemailer.createTransport({
  //       host: 'smtp.ethereal.email',
  //       port: 587,
  //       auth: {
  //         user: process.env.ETHEREAL_USER,
  //         pass: process.env.ETHEREAL_PASS,
  //       },
  //     });
  //     console.log('Using Ethereal account from .env');
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

  console.log('Created temporary Ethereal test account:');
  console.log(`   User: ${testAccount.user}`);
  console.log(`   Pass: ${testAccount.pass}`);
}

/**
 * Send welcome email
 */
export async function sendWelcomeEmail(to: string) {
  if (!transporter)
    throw new Error(
      'Email transporter not initialized. Call initEmail() first.',
    );

  const info = await transporter.sendMail({
    from: '"Job Dashboard" <noreply@jobdashboard.com>',
    to,
    subject: 'Welcome to Job Dashboard!',
    text: `Welcome! Thank you for signing up.`,
    html: `<h3>Welcome to Job Dashboard!</h3><p>Thank you for signing up.</p>`,
  });

  console.log('Welcome email preview URL:', nodemailer.getTestMessageUrl(info));
}

/**
 * Send verification email
 */
export async function sendVerificationEmail(to: string, token: string) {
  if (!transporter)
    throw new Error(
      'Email transporter not initialized. Call initEmail() first.',
    );

  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:4000';
  const url = `${FRONTEND_URL}/auth/verify?token=${token}`;

  const info = await transporter.sendMail({
    from: '"Job Dashboard" <noreply@jobdashboard.com>',
    to,
    subject: 'Verify your email',
    text: `Click to verify: ${url}`,
    html: `<a href="${url}">Verify your email</a>`,
  });

  console.log(
    'Verification email preview URL:',
    nodemailer.getTestMessageUrl(info),
  );
}
