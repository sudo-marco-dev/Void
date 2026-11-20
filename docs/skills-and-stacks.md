# Skills, Stack Decisions & Tech Comparison

## 1. Marco Rye S. Dela Serna — Verified Technical Profile (`sudo-marco-dev`)

### Web & Full-Stack
- **Frameworks:** Next.js (14 & 16 App Router), React (18 & 19), Vite (8), Django (Python)
- **Languages:** TypeScript, JavaScript, Python, SQL / PLpgSQL, PHP, HTML/CSS/SCSS
- **Styling & UI:** Tailwind CSS (v3 & v4), shadcn/ui, Radix UI, Lucide Icons, Recharts
- **State, Forms & Utilities:** React Router v7, Zustand, React Hook Form, Zod, jsPDF, PDF.js, ExcelJS / SheetJS, QRCode / jsQR, MediaPipe Vision, Web Audio API

### Backend, Databases & Cloud
- **BaaS & Databases:** Supabase (Auth, PostgreSQL, PLpgSQL, Realtime CDC, Storage), Prisma ORM, PostgreSQL, Google Sheets API
- **Deployment & DevOps:** Vercel, Docker & Docker Compose (Docker Hub), Git / GitHub
- **Testing & Quality:** Playwright E2E Testing, ESLint, Oxlint

### Embedded, IoT & Hardware
- **Microcontrollers & Firmware:** ESP32, ESP32-CAM, C / C++
- **Electronics & Prototyping:** Soldering, microcontroller integration & wiring, hardware prototyping
- **Hardware Integrations:** Sensors (lid, weight, tilt), servo lock actuators, 16x2 LCD & SSD1306 OLED displays, matrix keypads, SMS gateways (`httpSMS`), Discord Webhooks, digital twin simulation, 2.4GHz/BLE/Wi-Fi RF tooling (`nRFBox_VOID_version`)

### 3D Modeling, 3D Printing & Maker Skills
- **3D Modeling / CAD:** **Onshape** (cloud-based parametric CAD — accessible remotely from any browser/device)
- **3D Printing & Fabrication:** **Flashforge Creator 3** (dual-nozzle / Independent Dual Extruder — IDEX) accessed via **PITBI (Palawan International Technology Business Incubator)** at Palawan State University for student prototyping
- **Hardware & Maker Workflow:** Soldering, microcontroller integration, custom functional parts & hardware enclosures

---

## 2. Void Monorepo Confirmed Platform Stack

| Layer | Choice | Why It Fits |
| :--- | :--- | :--- |
| **Frontend / Full-Stack** | **Next.js (App Router) + TypeScript + Tailwind CSS** | Locked in — proven in `My_Electricity_Tracker`, `DROP_Realtime_web`, and `psu-sales-inventory-system`; best SEO and unified `/`, `/[client]`, and `/[client]/admin` architecture on Vercel. |
| **Monorepo Orchestration** | **npm workspaces + Turborepo** | Fast incremental builds/typechecks across `apps/*` and `packages/*`; native Windows & Vercel support. |
| **Backend & Database** | **Supabase (PostgreSQL + Auth + RLS)** | Already used heavily in `PSU-SportsTrack`, `RTNHS`, and `DROP_Realtime_web`; free tier covers relational tables, RLS, and atomic RPCs. |
| **Hosting & Compute** | **Vercel (Hobby Plan)** | Already hosts 5+ of Marco's live projects; supports Node.js 24 LTS via Fluid Compute and custom domains. |
| **Domain** | **GitHub Student Developer Pack** | Free 1-year domain pointed to Vercel DNS. |

---

## 3. Frontend Framework Candidates for Void (Under Evaluation)

| Stack | Pros | Cons | Fit for Marco & Void |
| :--- | :--- | :--- | :--- |
| **Next.js (App Router)** *(Recommended)* | Already proven in `My_Electricity_Tracker` (Next 16), `DROP_Realtime_web`, and `psu-sales-inventory-system`; best SEO for portfolio & client subpages; built-in API routes + Middleware on Vercel. | App Router Server vs. Client boundaries require clean discipline. | **Best overall** for unified `/`, `/[client]`, and `/[client]/admin`. |
| **Vite + React 19 + Hono API** | Matches `PSU-SportsTrack` and `RTNHS` React/Vite muscle memory; zero Next.js SSR rules; Hono runs cleanly on Vercel Node.js functions. | Weaker initial SEO for public client storefronts and extra SPA/API wiring. | **Strongest runner-up** if Vite ergonomics are preferred over SSR. |
| **Astro + React Islands** | Near-zero JS portfolio landing page with selective React islands; SSR/ISR on Vercel. | Client admin CRUD feels less cohesive across islands. | Best only if portfolio is heavily editorial/static. |
| **SvelteKit** | Lean bundles and clean form actions on Vercel. | Introduces a new framework outside Marco's proven React/TypeScript stack. | Optional exploration only. |

### Selected Stack
- **Status:** Locked in — **Next.js (App Router)** + TypeScript + Tailwind CSS + Supabase + Turborepo on Vercel.
