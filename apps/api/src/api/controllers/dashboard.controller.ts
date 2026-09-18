import type { Request, Response } from 'express';
import type { DashboardOverviewData } from '@devops-command-center/shared';
import { assembleDashboard } from '../../modules/dashboard/index.js';
import { logger } from '../../observability/logger.js';

export async function getDashboardOverview(
  _request: Request,
  response: Response<DashboardOverviewData | { error: string }>,
): Promise<void> {
  try {
    const data = await assembleDashboard();
    response.status(200).json(data);
  } catch (err) {
    logger.error({ err }, 'Failed to assemble dashboard overview');
    response.status(502).json({ error: 'Failed to fetch dashboard data' });
  }
}
