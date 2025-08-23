import app from './index';
import { initEmail } from './utils/email';
import logger from './services/logger.service';

const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await initEmail();

    app.listen(PORT, () => {
      logger.info({
        event: 'service_started',
        message: `Auth service running on port ${PORT}`,
        port: PORT,
        service: process.env.SERVICE_NAME || 'auth-service',
        env: process.env.NODE_ENV,
      });
    });
  } catch (err) {
    logger.error({
      event: 'service_startup_failed',
      message: 'Failed to initialize email transporter',
      error: (err as Error).message,
      stack: (err as Error).stack,
    });
    process.exit(1);
  }
})();
