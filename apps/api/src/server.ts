import http from 'node:http';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';
import { Server } from 'socket.io';

import { errorHandler } from './api/middleware/error-handler.js';
import { notFoundHandler } from './api/middleware/not-found.js';
import { dashboardRouter } from './api/routes/dashboard.routes.js';
import { healthRouter } from './api/routes/health.routes.js';
import { env } from './config/env.js';
import { logger } from './observability/logger.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: env.corsOrigin,
    methods: ['GET', 'POST'],
  },
});

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: '1mb' }));
app.use(pinoHttp({ logger }));

app.use('/api', healthRouter);
app.use('/api', dashboardRouter);
app.use(notFoundHandler);
app.use(errorHandler);

io.on('connection', (socket) => {
  logger.info({ socketId: socket.id }, 'Socket.IO client connected');
});

server.listen(env.port, () => {
  logger.info({ port: env.port }, 'API server listening');
});
