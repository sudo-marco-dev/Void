# Void — Portfolio & Semi-Private Client Platform

Monorepo built by **Marco Rye S. Dela Serna** (`sudo-marco-dev`) with **npm workspaces + Turborepo**, **Next.js 15 (App Router)**, and **Tailwind CSS v4**.

- **Public Portfolio (`/`):** Showcases BSIT college work, deployed Vercel projects with live previews, ESP32/hardware builds, Onshape + Flashforge Creator 3 prototyping, and direct contact links.
- **Semi-Private Client Workspaces:** Client apps run via subdomain routing in [apps/web/src/middleware.ts](./apps/web/src/middleware.ts) (`robots: noindex, nofollow`) and remain strictly unlinked from the public portfolio landing page.

## Structure

```text
Void/
├── apps/
│   └── web/               # Next.js 15 portfolio + subdomain middleware host
├── packages/
│   ├── config/            # Shared TypeScript base configuration
│   └── ui/                # Shared Void Drafting Canvas UI primitives
└── docs/                  # Project context, roadmap, client specs & design blueprints
```

## Quickstart

```bash
npm install
npm run dev
```

Verify types and production build:

```bash
npm run typecheck
npm run build
```

## Deployment (Vercel Hobby)

- **Root Directory:** `apps/web`
- **Required Env Vars for Initial Portfolio Deploy:** None (metadataBase, OpenGraph, `robots.txt`, and `sitemap.xml` automatically resolve from Vercel system URLs; add `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_ROOT_DOMAIN` later when connecting a custom domain).

See [docs/deployment-and-domains.md](./docs/deployment-and-domains.md) and [docs/README.md](./docs/README.md) for the full planning, design, client, and Vercel deployment documentation.
