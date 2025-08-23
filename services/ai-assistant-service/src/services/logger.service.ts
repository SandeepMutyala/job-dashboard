import { createLogger, format, transports, Logger } from 'winston';
import { TransformableInfo } from 'logform';

const serviceName = process.env.SERVICE_NAME;
const environment = process.env.NODE_ENV;

const logger: Logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf((info: TransformableInfo) => {
      return JSON.stringify({
        timestamp: info.timestamp,
        level: info.level,
        message: info.message,
        service: serviceName,
        env: environment,
      });
    }),
  ),
  transports: [new transports.Console()],
});

export default logger;
