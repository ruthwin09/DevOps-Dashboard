export interface HealthResponse {
  status: 'ok';
  service: 'devops-dashboard-api';
}

export type NavigationItem =
  | 'Dashboard'
  | 'Pipelines'
  | 'Deployments'
  | 'Containers'
  | 'Kubernetes'
  | 'Monitoring'
  | 'Security'
  | 'Logs'
  | 'Alerts'
  | 'Settings';
