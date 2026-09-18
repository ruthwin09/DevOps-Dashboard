import { Octokit } from '@octokit/rest';
import { env } from '../../config/env.js';

/**
 * Authenticated Octokit instance.
 * `null` when GITHUB_MOCK_MODE=true — no GitHub network traffic is ever made
 * in mock mode.
 */
export const octokit: Octokit | null = env.githubMockMode
  ? null
  : new Octokit({
      auth: env.githubToken,
    });
