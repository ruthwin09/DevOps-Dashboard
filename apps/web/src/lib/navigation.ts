import {
  Activity,
  BellRing,
  Boxes,
  ChartNoAxesCombined,
  Container,
  Gauge,
  GitBranch,
  Logs,
  Settings,
  ShieldCheck,
} from 'lucide-react';

import type { NavigationEntry } from '../types/navigation';

export const navigationItems: NavigationEntry[] = [
  { label: 'Dashboard', path: '/', icon: Gauge },
  { label: 'Pipelines', path: '/pipelines', icon: GitBranch },
  { label: 'Deployments', path: '/deployments', icon: Activity },
  { label: 'Containers', path: '/containers', icon: Container },
  { label: 'Kubernetes', path: '/kubernetes', icon: Boxes },
  { label: 'Monitoring', path: '/monitoring', icon: ChartNoAxesCombined },
  { label: 'Security', path: '/security', icon: ShieldCheck },
  { label: 'Logs', path: '/logs', icon: Logs },
  { label: 'Alerts', path: '/alerts', icon: BellRing },
  { label: 'Settings', path: '/settings', icon: Settings },
];
