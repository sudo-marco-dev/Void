# Deployment, Supabase & Student Domain Checklist

Reference guide for taking **Void** from local development to production at **$0/month**.

## 1. Supabase Free Tier Setup

1. Create **1 project** in the Supabase Dashboard (free tier gives 2 active projects; using 1 multi-tenant project keeps room for another sandbox project).
2. Run the initial migration SQL (`supabase/migrations/0001_init_multitenant.sql`) in the **SQL Editor**.
3. Run the starter seed SQL (`supabase/seed.sql`) to populate the demo tenants (`vape-shop`, `iron-pulse-gym`).
4. Create client admin accounts in **Authentication → Users** (one user per client owner).
5. Link each user to their tenant in `public.tenant_members`:
   ```sql
   insert into public.tenant_members (tenant_id, user_id, role)
   select id, '<USER_UUID>', 'owner'
   from public.tenants
   where slug = 'vape-shop';
   ```
6. Copy **Project URL** and **Anon / Publishable Key** into local `.env.local` (never commit `.env.local` to Git).

## 2. Vercel Hobby Initial Deployment (Day 1 · Zero Required Env Vars)

1. Push your repository (`sudo-marco-dev/Void`, branch `main`) to GitHub.
2. Import the repository in the Vercel Dashboard (or run `vercel login` then `vercel --prod` from repo root after linking).
3. Set **Root Directory** to `apps/web` (the monorepo includes `apps/web/vercel.json`, and Turborepo automatically installs workspaces from the root `package-lock.json`).
4. Leave **Environment Variables** empty for the initial `.vercel.app` portfolio launch — `layout.tsx`, `robots.ts`, and `sitemap.ts` automatically resolve `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL` (and fall back to `http://localhost:3000` locally).
5. Deploy and verify `/`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, and interactive 3D models.
6. Optional later overrides in **Project Settings → Environment Variables** once a custom domain and Supabase client modules are connected:
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://yourdomain.me`)
   - `NEXT_PUBLIC_ROOT_DOMAIN` (e.g. `yourdomain.me`)
   - `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Phase 6+)

## 3. GitHub Student Developer Pack — Free Domain

1. Claim a free domain offer from the **GitHub Student Developer Pack** (commonly Namecheap `.me`, Name.com, or `.tech`).
2. In Vercel, add the domain under **Project Settings → Domains** (or via CLI: `vercel domains add <yourdomain> <project>`).
3. Copy the **exact DNS records** (`A` / `CNAME` / verification `TXT`) shown by Vercel for that specific project and enter them in your registrar's DNS dashboard.
4. Wait for DNS propagation and verify HTTPS is active (`vercel domains verify <yourdomain>`).
5. Update **Supabase Authentication → URL Configuration** (`Site URL` and `Redirect URLs`) to include `https://<yourdomain>/**`.
