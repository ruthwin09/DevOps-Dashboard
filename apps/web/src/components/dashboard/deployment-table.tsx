import type { Deployment } from '../../features/dashboard/types/dashboard.types';
import { StatusBadge } from '../status-badge';

export function DeploymentTable({ deployments }: { deployments: Deployment[] }) {
  return (
    <section className="border border-slate-800 bg-slate-900/45">
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <div>
          <h2 className="font-semibold text-white">Deployment overview</h2>
          <p className="mt-1 text-xs text-slate-500">
            Latest delivery activity across environments
          </p>
        </div>
        <button className="text-sm font-medium text-sky-300 hover:text-sky-200">
          View deployments
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] text-left text-sm">
          <thead className="bg-slate-950/50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {[
                'Application',
                'Version',
                'Environment',
                'Status',
                'Duration',
                'Commit',
                'Deployed at',
              ].map((label) => (
                <th key={label} className="px-5 py-3 font-medium">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {deployments.map((deployment) => (
              <tr
                key={deployment.application}
                className="text-slate-300 transition hover:bg-slate-800/30"
              >
                <td className="px-5 py-4 font-medium text-slate-100">{deployment.application}</td>
                <td className="px-5 py-4 text-slate-400">{deployment.version}</td>
                <td className="px-5 py-4">
                  <span className="rounded bg-slate-800 px-2 py-1 text-xs text-slate-300">
                    {deployment.environment}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={deployment.status} />
                </td>
                <td className="px-5 py-4 text-slate-400">{deployment.duration}</td>
                <td className="px-5 py-4 font-mono text-xs text-sky-300">{deployment.commit}</td>
                <td className="px-5 py-4 text-slate-400">{deployment.deployedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
