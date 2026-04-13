# WeSocializeU — Influencer Marketing Agency

## Overview

Full-stack influencer marketing agency website built on a pnpm monorepo. Features a public-facing marketing site with React + Vite and a full admin dashboard backed by Express.js + PostgreSQL.

## Stack

- **Monorepo**: pnpm workspaces
- **Node.js**: 24, **TypeScript**: 5.9, **Package manager**: pnpm
- **Frontend**: React 19, Vite, Tailwind CSS v4, shadcn/ui, Wouter (routing), Framer Motion
- **Backend**: Express 5, Pino logger
- **Database**: PostgreSQL + Drizzle ORM
- **API codegen**: Orval (OpenAPI → React Query hooks + Zod schemas)
- **Auth**: bcryptjs + express-session (admin only)

## Architecture

```
artifacts/
  wesocializeu/     — React + Vite frontend (public site + admin)
  api-server/       — Express.js REST API
lib/
  api-spec/         — OpenAPI spec (source of truth for codegen)
  api-client/       — Generated Zod schemas
  api-client-react/ — Generated React Query hooks
  db/               — Drizzle schema + migrations
```

## Public Pages

- `/` — Homepage (hero, services grid, creator grid, case studies, CTA)
- `/services` — All services
- `/services/:id` — Service detail
- `/creators` — Creator network with category filters
- `/case-studies` — Case studies list
- `/case-studies/:id` — Case study detail with metrics
- `/blog` — Blog listing with category filters
- `/blog/:id` — Blog post detail
- `/contact` — Contact form
- `/join/brand` — Brand partnership application
- `/join/creator` — Creator network application

## Admin Pages (protected, requires login)

- `/admin/login` — Admin login (credentials: admin / admin123)
- `/admin` — Dashboard with stats and charts
- `/admin/services` — CRUD services
- `/admin/creators` — CRUD creators
- `/admin/case-studies` — CRUD case studies
- `/admin/blog` — CRUD blog posts (draft/published)
- `/admin/enquiries` — View and manage enquiries (filter by type/status)
- `/admin/settings` — Settings page

## Theme

- Dark background (`hsl(240 10% 4%)`)
- Primary: Magenta/Pink (`hsl(320 80% 60%)`)
- Secondary: Cyan (`hsl(190 90% 50%)`)
- Accent: Gold (`hsl(45 95% 55%)`)
- Font Display: Space Grotesk, Font Body: Inter
- Sharp/brutalist edges (border-radius: 0)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes

## Seed Data

Admin: `admin` / `admin123` (bcryptjs hashed)
6 services, 6 creators (3 featured), 3 case studies, 3 blog posts, 3 enquiries

## Environment Variables

- `SESSION_SECRET` — required for express-session (set as a secret)
- `DATABASE_URL` — PostgreSQL connection (auto-provided by Replit)
- `PORT` — auto-assigned per workflow by Replit
