import 'dotenv/config';

function readPort(value: string | undefined, fallback: number): number {
  const parsed = Number(value ?? fallback);

  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    throw new Error('API_PORT must be a valid port number.');
  }

  return parsed;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: readPort(process.env.API_PORT, 3001),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  logLevel: process.env.LOG_LEVEL ?? 'info',

  // GitHub Integration
  githubToken: process.env.GITHUB_TOKEN ?? '',
  githubRepoOwner: process.env.GITHUB_REPO_OWNER ?? 'ruthwin09',
  githubRepoName: process.env.GITHUB_REPO_NAME ?? 'DevOps-Dashboard',
  githubMockMode: (process.env.GITHUB_MOCK_MODE ?? 'true') === 'true',
};

