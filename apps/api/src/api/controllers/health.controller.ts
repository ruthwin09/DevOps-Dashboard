import type { Request, Response } from 'express';

import type { HealthResponse } from '@devops-command-center/shared';

export function getHealth(_request: Request, response: Response<HealthResponse>): void {
  response.status(200).json({
    status: 'ok',
    service: 'devops-dashboard-api',
  });
}
