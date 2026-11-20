# Project Context — Void Portfolio & Multi-Client Subpage Platform

> **Current Status:** Phase 4 active (Next.js 15 portfolio integrated with Hero portrait, 6 interactive 3D CAD `.glb` assemblies, real print/wiring/POS captures, and Workshops/Awards/Cipher Lab community showcase); verifying before Vercel deployment.

## 1. Core Concept

**Void** is a monorepo platform where:
- **Root (`/`)** serves as **Marco Rye S. Dela Serna**'s public developer portfolio and live showcase hub.
- **Semi-Private Client Sites (`<client>.yourdomain` / unlisted `/clients/<client-slug>`):** Live, isolated websites for real clients (e.g., vape shop, fitness gym) that are **never linked on the public portfolio `/`**, carry `noindex, nofollow` metadata, and are shared directly by each client via their own subdomain or link.
- **Client Admin Portals (`/admin` on the client's subdomain):** Give each client an authenticated, isolated workspace to self-manage their own catalog, stock levels, orders, memberships, or bookings without touching the portfolio or other clients.

## 2. Strategic Goals

1. **Generalized Client Template:** Avoid rebuilding auth, layout chrome, database plumbing, and admin shells from scratch for every new client.
2. **Composable Business Modules:** Clients enable only the vertical modules they need:
   - **Inventory & Ordering Module** (retail stores like the vape shop)
   - **Bookings & Memberships Module** (service businesses like the fitness gym)
   - Future modules (e.g., menus, appointments, invoicing) plug into the same core shell.
3. **Zero-Cost Hosting Footprint ($0/mo Baseline):**
   - **1 Vercel Hobby deployment** (with optional path to split high-growth clients onto dedicated subdomains/apps later).
   - **1 Supabase Free Tier project** using PostgreSQL + Auth + Row-Level Security (RLS) + atomic RPC transactions.
   - **1 Custom Domain** claimed through the **GitHub Student Developer Pack** (e.g., `.me`, `.tech`, `.live`, or `.studio`).

## 3. Planned Monorepo Architecture

```text
Void/
├── docs/                       # Living project, client, design, and stack docs
├── apps/
│   └── web/                    # Unified landing portfolio + dynamic /[client] host (or microfrontends)
├── packages/
│   ├── config/                 # Shared TypeScript, ESLint, and Tailwind presets
│   ├── supabase/               # Typed DB client, auth session helpers, and demo/seed data
│   ├── client-core/            # Generalized tenant shell, theming, age gate, admin layout
│   ├── module-inventory/       # Public product/stock storefront + inventory/order admin
│   └── module-bookings/        # Public memberships/schedule + booking/member admin
└── supabase/
    ├── migrations/             # Schema, RLS policies, and atomic SQL functions
    └── seed.sql                # Idempotent starter tenants for demo & local testing
```

> **Future Scale Option:** Because each module and client boundary is isolated in `packages/`, any client that outgrows a subpath can later be promoted into its own `apps/<client>/` app on a custom client domain or Vercel Microfrontends group with minimal code rewrite.

## 4. Multi-Tenancy, Security & Data Integrity Rules

1. **Tenant Isolation (RLS):**
   - Every business table carries a `tenant_id` foreign key.
   - Public visitors (`anon`) can read only active tenants, available products (`is_available = true`), active membership plans, and open sessions.
   - Private customer orders, bookings, and member applications are readable and mutable **only** by authenticated users mapped to that specific tenant in `tenant_members`.
2. **Race-Free Stock & Capacity Mutations:**
   - **Orders:** Placing an order executes inside an atomic PostgreSQL transaction (`FOR UPDATE` row lock) that checks `stock_qty >= requested_qty`, calculates totals server-side, and deducts stock immediately. Cancelling an order restores stock atomically.
   - **Bookings:** Booking a gym session locks the session row, confirms `booked_count < capacity`, and increments atomically so double-booking cannot happen.
3. **Environment Safety:**
   - Never commit `.env.local` or secret keys.
   - Support a local **Preview/Demo Mode** fallback when Supabase credentials are not yet configured, transitioning seamlessly to live Supabase Auth + Postgres once env vars are provided.
