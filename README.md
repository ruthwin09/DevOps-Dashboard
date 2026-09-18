# DevOps Command Center

DevOps Command Center is a future-facing operations dashboard for service health, delivery activity, incidents, observability, and security posture. Phase 1 establishes the local monorepo foundation only.

## Architecture

The repository is an npm-workspaces monorepo. `apps/web` is the React dashboard, `apps/api` is the Express and Socket.IO service, and `packages/shared` contains cross-application TypeScript contracts. PostgreSQL and Prisma live under `database`; deployable and operational configuration lives under `infrastructure`.

```text
React web client -- REST / Socket.IO --> Express API --> PostgreSQL (Prisma)
```

## Technology stack

- Frontend: React, Vite, TypeScript, Tailwind CSS, React Router, Recharts, Lucide React
- Backend: Node.js, Express, TypeScript, Socket.IO, Pino logging
- Data: PostgreSQL and Prisma
- Delivery foundation: Docker, Docker Compose, GitHub Actions

## Local setup

1. Copy `.env.example` to `.env` and adjust non-production local values if necessary.
2. Copy `apps/api/.env.example` to `apps/api/.env` when running the API outside Docker.
3. Install dependencies with `npm install`.
4. Start dependencies and applications with `docker compose up --build`, or run `npm run dev` alongside a local PostgreSQL instance.

## Development commands

- `npm run dev` — start web and API development servers
- `npm run lint` — run ESLint
- `npm run typecheck` — run TypeScript checks
- `npm run build` — build all workspace applications
- `npm run prisma:validate` — validate the Prisma schema
- `npm run prisma:generate` — generate Prisma client files

The API health endpoint is available at `GET /api/health` and returns the service status.

## Environment variables

`DATABASE_URL` configures PostgreSQL for Prisma. `API_PORT`, `WEB_PORT`, `CORS_ORIGIN`, and `LOG_LEVEL` control local services. Use only `.env.example` files as templates; never commit populated `.env` files.

## Current implementation status

Phase 1 is limited to project structure, developer tooling, application shells, local containers, a health endpoint, and a minimal Prisma schema. Dashboard content and non-dashboard navigation routes are placeholders.

## Future phases

Later phases will add authentication and RBAC, service catalogues, DevOps integrations, live operational dashboards, observability, security scanning, delivery automation, and AI-assisted incident analysis. Those capabilities are intentionally not implemented yet.
