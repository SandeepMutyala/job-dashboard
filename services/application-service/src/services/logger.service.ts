import { createLogger, format, transports, Logger } from 'winston';

const serviceName = process.env.SERVICE_NAME || 'unknown-service';
const environment = process.env.NODE_ENV || 'development';

const logger: Logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // capture error.stack
    format.json(), // output structured JSON
  ),
  defaultMeta: { service: serviceName, env: environment },
  transports: [new transports.Console()],
});

export default logger;
