/**
 * Dashboard types are defined in @devops-command-center/shared so both the
 * API response and the frontend hook share a single source of truth.
 * This file re-exports them for backward compatibility with existing imports.
 */
export type {
  ActivityItem,
  AlertItem,
  AlertSeverity,
  DashboardOverviewData,
  Deployment,
  DeploymentStatus,
  HealthCheck,
  InfrastructureItem,
  Metric,
  ResourcePoint,
  ServiceStatus,
} from '@devops-command-center/shared';

