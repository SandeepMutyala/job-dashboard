import app from './index';
import logger from './services/logger.service';

const PORT = process.env.PORT || 4006;

app.listen(PORT, () => {
  logger.info({
    event: 'service_started',
    message: `AI Assistant service running on port ${PORT}`,
    port: PORT,
    service: process.env.SERVICE_NAME || 'ai-assistant-service',
    env: process.env.NODE_ENV,
  });
});
