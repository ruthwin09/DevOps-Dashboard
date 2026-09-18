export type ServiceStatus = 'operational' | 'degraded' | 'incident';
export type DeploymentStatus = 'success' | 'failed' | 'running' | 'pending';
export type AlertSeverity = 'critical' | 'high' | 'medium';

export interface Metric {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendDirection: 'up' | 'down';
  description: string;
  status: ServiceStatus;
}
export interface ResourcePoint {
  time: string;
  cpu: number;
  memory: number;
  network: number;
}
export interface Deployment {
  application: string;
  version: string;
  environment: string;
  status: DeploymentStatus;
  duration: string;
  commit: string;
  deployedAt: string;
}
export interface HealthCheck {
  name: string;
  status: ServiceStatus;
  latency: string;
  lastChecked: string;
}
export interface ActivityItem {
  id: string;
  type: 'deployment' | 'restart' | 'security' | 'alert' | 'pipeline';
  title: string;
  service: string;
  timestamp: string;
  status: DeploymentStatus | ServiceStatus;
}
export interface AlertItem {
  id: string;
  severity: AlertSeverity;
  message: string;
  service: string;
  triggeredAt: string;
}
export interface InfrastructureItem {
  name: string;
  primary: string;
  detail: string;
  status: ServiceStatus;
}
export interface DashboardOverviewData {
  metrics: Metric[];
  resourceUsage: Record<'1H' | '6H' | '24H' | '7D', ResourcePoint[]>;
  deployments: Deployment[];
  healthChecks: HealthCheck[];
  activities: ActivityItem[];
  alerts: AlertItem[];
  infrastructure: InfrastructureItem[];
}
