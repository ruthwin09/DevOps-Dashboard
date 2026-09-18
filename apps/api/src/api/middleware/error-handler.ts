import type { NextFunction, Request, Response } from 'express';

import { logger } from '../../observability/logger.js';

export function errorHandler(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void {
  void _next;
  logger.error({ err: error }, 'Unhandled request error');
  response.status(500).json({ error: 'Internal server error' });
}
