import Redis from 'ioredis';
import dotenv from 'dotenv';
import path from 'path';
import logger from '../services/logger.service';

dotenv.config({ path: path.resolve(__dirname, '../../.env') }); // points to auth-service/.env

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
});

redis.on('connect', () => {
  logger.info({
    event: 'redis_connected',
    host: redis.options.host,
    port: redis.options.port,
  });
});

redis.on('error', (err) => {
  logger.error({
    event: 'redis_connection_error',
    error: (err as Error).message,
    stack: (err as Error).stack,
  });
});

export default redis;
