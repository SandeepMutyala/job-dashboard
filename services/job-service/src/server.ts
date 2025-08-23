import app from './index';
import logger from './services/logger.service';

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  logger.info({
    event: 'service_started',
    message: `Job service running on port ${PORT}`,
    port: PORT,
    service: process.env.SERVICE_NAME || 'job-service',
    env: process.env.NODE_ENV,
  });
});
