import pino from 'pino';

import { env } from '../config/env.js';

export const logger = pino({
  level: env.logLevel,
  base: { service: 'devops-dashboard-api' },
  ...(env.nodeEnv === 'development'
    ? { transport: { target: 'pino/file', options: { destination: 1 } } }
    : {}),
});
