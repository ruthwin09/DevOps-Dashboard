# Architecture

## Foundation boundaries

The project uses npm workspaces to keep independently deployable applications together while sharing contracts and tooling.

- `apps/web`: browser-facing React single-page application.
- `apps/api`: REST and real-time API boundary.
- `packages/shared`: shared, dependency-light TypeScript contracts.
- `database/prisma`: PostgreSQL schema and migrations.
- `infrastructure`: Docker, Compose, Kubernetes, Helm, monitoring, and security configuration boundaries.

## Communication model

The web application will call versioned REST routes for reads and commands, and Socket.IO for live updates. The API owns validation, authorization, orchestration, and persistence through Prisma. PostgreSQL is not accessed directly from the browser.

## Deployment model

Local development uses Docker Compose for the web, API, and PostgreSQL. Future Kubernetes and Helm assets will package the same services for cluster deployment. Monitoring and security folders are established as ownership boundaries only; they have no active Phase 1 services.

## Data model

The initial data model deliberately contains only `User`, `Role`, and `AuditLog`. Migrations will be introduced with the first database-backed feature.
