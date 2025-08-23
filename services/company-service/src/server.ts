import app from './index';
import logger from './services/logger.service';

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  logger.info({
    event: 'service_started',
    message: `Company service running on port ${PORT}`,
    port: PORT,
    service: process.env.SERVICE_NAME || 'company-service',
    env: process.env.NODE_ENV,
  });
});
