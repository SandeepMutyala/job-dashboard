import app from './index';
import { initEmail } from './utils/email'; // import the init function

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    // Initialize email transporter first
    await initEmail();

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Auth service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize email transporter', err);
    process.exit(1);
  }
})();
