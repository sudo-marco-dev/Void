# Portfolio Plan & Roadmap — Marco Rye S. Dela Serna (`sudo-marco-dev`)

> **Role & Positioning:** Marco Rye S. Dela Serna — 4th-Year BSIT Student (Palawan State University) — Full-Stack Web Developer, IoT/Hardware Prototyper, and 3D Maker.

---

## 1. Multi-Phase Portfolio Development Roadmap

| Phase | Name | Goal & Key Deliverables | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Planning & Content Discovery** | Audit public GitHub projects, gather 3D modeling/printing & maker skills, lock in BSIT story, select featured builds, and confirm the Void frontend stack. | **Complete** |
| **Phase 2** | **Architecture & Detailed Integration Blueprint** | Finalize monorepo folder structure, lock aesthetic direction (`portfolio-design.md`), design the Live Preview drawer (Desktop/Mobile iframe + screenshot/spec fallback), and enforce semi-private client subdomain isolation (unlinked from `/`). | **Complete** |
| **Phase 3** | **Build & Portfolio Integration** | Scaffold Turborepo + Next.js 15 monorepo and build the `/` portfolio landing page: Hero, Selected Works with Live Scaled Previews, Maker Craft, Tech & Maker Toolkit, BSIT Timeline, Contact Footer, and semi-private subdomain middleware foundation. | **Complete** |
| **Phase 4** | **Testing & Polish** | Verify mobile/desktop responsiveness, test interactive Live Preview frames and fallbacks, run Lighthouse/performance & accessibility checks, and run Playwright smoke tests. | **Up Next** |
| **Phase 5** | **Vercel Deployment & Custom Domain** | Deploy to Vercel Hobby, verify production metadata & OG tags, connect the GitHub Student Developer Pack custom domain, and transition to live client subpages with Supabase. | Pending |

---

## 2. Portfolio Page Section Plan (`/`)

| # | Section | Goal | Key Content |
| :--- | :--- | :--- | :--- |
| 1 | **Hero & Identity** | Hook visitors in 5 seconds | **Void / Marco Rye S. Dela Serna** · 4th-year BSIT student building **Web Systems + IoT/ESP32 Hardware + 3D Prototypes**, with CTAs for `Preview Featured Work` and `Contact Me`. |
| 2 | **Specialties (3 Pillars)** | Stand out beyond web-only resumes | **1) Full-Stack Web & Databases** (Next.js, React, Vite, Supabase, Prisma/PostgreSQL) · **2) IoT & Embedded Hardware** (soldering, microcontrollers — ESP32, ESP32-CAM, sensors, SMS & Realtime dashboards) · **3) 3D Modeling & 3D Printing** (**Onshape** cloud CAD + **Flashforge Creator 3** dual-nozzle IDEX via **PITBI @ PSU** for custom enclosures & functional prototypes). |
| 3 | **Featured Projects (With Live Previews)** | Prove real-world delivery | Showcase cards with **Live Preview** / **Screenshots** modal drawer (Desktop/Mobile viewport switcher + local POS gallery + `Open Live Site` fallback) + architecture & stack tags. |
| 4 | **Tech Stack & Maker Toolkit** | Scannable skills matrix | Grouped by **Frontend & UI**, **Backend & Data**, **Hardware & IoT**, and **CAD, 3D & Ops**. |
| 5 | **Workshops, Awards & Credentials (`04`)** | Credibility beyond solo apps | **Sui Builders Program · Palawan (2nd Place)**, **Project Nexus 3D Printing Beginner Course (PITBI Live Demonstrator)**, **Cipher Lab (Co-Founder)**, plus the dedicated **Certificates** subsection (watermarked view-only Sui Builders certificate preview + lightbox; expandable for upcoming Cisco cert). |
| 6 | **BSIT College Journey (`05`)** | Show progression across 4 years | Foundations + Sui Builders 2nd Place → Django/Docker (`PSUSphere`) → ADS POS (`psu-sales-inventory-system`) → Real school client + Cipher Lab + PITBI → Capstone (`PSU-SportsTrack`). |
| 7 | **Footer & Contact Bar (`06`)** | Convert recruiters & clients | Full name (**Marco Rye S. Dela Serna**), OJT/freelance availability, **Messenger** (`https://m.me/marcorye255`), **Email** (`mrcrye@gmail.com` + copy button), and **GitHub** (`sudo-marco-dev`). *(Client sites stay semi-private on dedicated subdomains and are never linked publicly from `/`.)* |

---

## 3. Verified GitHub Projects to Showcase (`github.com/sudo-marco-dev`)

### Flagship Projects

1. **PSU SportsTrack** *(College Capstone — Live Card Embed Verified)*
   - **Live URL:** https://psusportstrack.tech/ *(redirects cleanly from `psu-sports-track.vercel.app`)*
   - **Repo:** https://github.com/sudo-marco-dev/PSU-SportsTrack
   - **Summary:** Official Palawan State University multi-sport tournament, athlete COR verification, and live courtside scoring arena portal.
   - **Highlights:** Courtside Stream-Deck-style kiosk mode (`h-dvh`), stadium jumbotron display with Screen Wake Lock API, procedural Web Audio FX synthesizer, Picture-in-Picture canvas scoreboard, 9 sport profiles, in-browser PDF.js COR verification, 5-role RBAC, and Playwright E2E tests.
   - **Stack:** React 19, Vite 8, TypeScript, Tailwind CSS, shadcn/ui + Radix, Supabase + PLpgSQL, React Router v7, Zod, jsPDF, PDF.js, Playwright, Vercel.

2. **RTNHS QR Code Attendance System with SMS & ESP32-CAM** *(School Client Project — Live Preview Ready)*
   - **Live URL:** https://rtnhs-qr-code-attendace-system-with.vercel.app
   - **Repo:** https://github.com/sudo-marco-dev/RTNHS-QR-code-attendace-system-with-SMS
   - **Summary:** Production attendance system built for **Rio Tuba National High School** featuring Admin, Teacher, and Scanner portals, `ESPCAM` C++ firmware, QR scanning, and automated parent SMS alerts.
   - **Highlights:** Real client handover (`CLIENT_HANDOVER.md`), hardware + web bridge, Excel/PDF attendance reports, and `httpSMS` parent notifications.
   - **Stack:** React 19, Vite, TypeScript/JavaScript, C++ (ESP32-CAM), Supabase + PLpgSQL, Zustand, MediaPipe Vision, jsQR, ExcelJS, jsPDF, Tailwind CSS, Radix UI, Vercel.

3. **PSU Sales & Inventory Management System (POS)** *(ADS Final Project)*
   - **Repo:** https://github.com/sudo-marco-dev/psu-sales-inventory-system
   - **Live URL:** *(Not deployed yet — plan screenshots, architecture diagram, or a demo deploy for the preview modal)*
   - **Summary:** Full-stack Point-of-Sale, sales tracking, and real-time inventory system built for PSU's Advanced Database Systems finals.
   - **Highlights:** Relational Prisma + PostgreSQL schema, bcrypt auth, product/inventory CRUD, sales reporting, and PDF/Excel export.
   - **Stack:** Next.js 14 (App Router), React 18, TypeScript, Prisma ORM, PostgreSQL, Tailwind CSS, Radix UI, bcryptjs, jsPDF, SheetJS.

4. **CODM Camo Tracker** *(Interactive Web App — Live Preview Verified)*
   - **Live URL:** https://codm-camo-tracker.vercel.app
   - **Repo:** https://github.com/sudo-marco-dev/CODM-camo-tracker
   - **Summary:** Dark-mode progress tracker for Call of Duty: Mobile weapon challenges—tracking all 6 base camo sets per weapon, Gold weapons, and Platinum category unlocks directly in the browser.
   - **Stack:** Next.js 14, React 18, TypeScript, QRCode, Vercel.

### Additional Builds & Hardware Lab

- **D.R.O.P. Smart Parcel Drop-Box Digital Twin** (`https://drop-realtime-web.vercel.app`) — Next.js 14 + Supabase Realtime CDC digital twin dashboard emulating an ESP32 parcel drop-box state machine with remote mobile CCTV and Discord alerts *(Live Preview available)*.
- **Electricity Tracker** (`https://my-electricity-tracker.vercel.app`) — Next.js 16, React 19, Tailwind v4, Recharts, and Google Sheets API for billing-cycle kWh tracking and printable recap slips.
- **PSUSphere (Dockerized)** (`https://github.com/sudo-marco-dev/PSUShere_Docker`) — Containerized Python/Django app with Docker Compose and published Docker Hub image (`sudomarcodev/psusphere-app:latest`).
- **Hardware & Security Lab** — `nRFBox_VOID_version` (ESP32 2.4GHz/BLE/Wi-Fi RF tooling), `CTF-IT6-drill` (Python security drills), and `my_fist_coin` (Sui Move experiments).

---

## 4. Live Preview UX & Embed Verification Strategy

| Project | Live URL | Verified HTTP / Frame Status | Card Integration |
| :--- | :--- | :--- | :--- |
| **PSU-SportsTrack** | `https://psusportstrack.tech/` | `200 OK` (no `X-Frame-Options` / `CSP` block) | **Live Scaled Card Preview** + Interactive Drawer |
| **RTNHS QR Attendance + SMS** | `https://rtnhs-qr-code-attendace-system-with.vercel.app` | `200 OK` (no frame block) | **Live Scaled Card Preview** + Interactive Drawer |
| **D.R.O.P. Realtime Web** | `https://drop-realtime-web.vercel.app` | `200 OK` (no frame block) | **Live Scaled Card Preview** + Interactive Drawer |
| **CODM Camo Tracker** | `https://codm-camo-tracker.vercel.app` | `200 OK` (no frame block) | **Live Scaled Card Preview** + Interactive Drawer |
| **My_Electricity_Tracker** | `https://my-electricity-tracker.vercel.app` | `401 Unauthorized` (Vercel protection on) | Static preview/case-study fallback *(or disable Vercel protection on prod to enable live card)* |
| **PSU Sales & Inventory (POS)** | *(Local build)* | Reference captures integrated | Real POS card preview + **Screenshots (`3`)** & **Specs** tabs inside `ProjectDrawer` |

### Technical Implementation Pattern
1. **Scaled 1440×900 Monitor Card Preview:** Each embeddable card renders an `aspect-[16/10]` browser-chrome window containing a lazy-mounted (`IntersectionObserver` + `loading="lazy"`) `1440×900` `<iframe>` scaled cleanly to card width (`ResizeObserver`) with CSS containment (`contain: strict`, `clip-path: inset(0)`, `isolation: isolate`) and `pointer-events-none`. Card previews automatically pause and unmount when scrolling under the sticky navbar (`y < 68`) or while the inspection drawer is open.
2. **Interactive 3D CAD & Visual Craft Showcase:** Filterable 4-category showcase grid (`3D Models (6)`, `3D Prints (4)`, `Wiring & Hardware (4)`, `Offline Apps (3)`) with **zero remaining placeholders**. Every interactive `.glb` card displays theme-synced Dark/Light studio 3D renders immediately on load and lazy-loads the **Three.js + React Three Fiber** 3D CAD Inspector (`next/dynamic` with `ssr: false`) on tap featuring model-specific presets (`Roof Off`, `Floor Plan`, `Open Covers`, `Remove Panel`, `See Inside`, `X-Ray`), unified multi-GLB assemblies (`D.R.O.P. V2`), CAD edges, click-to-hide parts, and a collapsible named Parts Tree.
3. **Interactive Inspection Drawer & Community Lightbox:** Clicking any project card opens a full-size preview drawer (`h-[92dvh]` on mobile) with Desktop/Mobile live iframe or **Screenshots** gallery, **Specs & Architecture** tab, and **Open Live Site ↗**; clicking any Workshop/Award photo opens an accessible Lightbox, and **View Certificate** / **Inspect Certificate** opens the watermarked view-only Certificate Lightbox.

---

## 5. Locked Design & Content Decisions

- **Identity & Footer Contact:** `VOID` brand paired with **Marco Rye S. Dela Serna** (`sudo-marco-dev`) · Clean footer credit (`© 2026 Void · Marco Rye S. Dela Serna`) + links for **Messenger** (`https://m.me/marcorye255`), **Email** (`mrcrye@gmail.com`), and **GitHub** (`https://github.com/sudo-marco-dev`) — Facebook omitted by preference.
- **Theme Switcher:** Defaults to **Dark Void (`#09090b`)** with an **Architectural Paper Light (`#f8f8f7`)** mode expanding radially over `750ms` from the navbar toggle via the View Transitions API (`localStorage` persisted).
- **Headshot & Plain-English Spec Plate:** Embedded headshot portrait slot inside the Hero Profile Spec card (`2026`, `HARDWARE & IOT`, `DUAL-NOZZLE` — replacing `REV 04`, `IOT & CAM`, and `IDEX`).
- **3D Modeling / CAD:** **Onshape** (cloud-based parametric CAD — usable remotely from any browser/device)
- **3D Printer & Lab:** **Flashforge Creator 3** (dual-nozzle / IDEX) via **PITBI (Palawan International Technology Business Incubator, PSU)**
- **Hardware & Electronics:** Soldering, microcontrollers (ESP32, ESP32-CAM), sensors & actuators
- **Void Main Stack:** **Next.js (App Router)** + TypeScript + Tailwind CSS + Supabase + Turborepo on Vercel
- **Visual Direction:** Stylish, ultra-minimal, modern, and uncommon — **"Void Drafting Canvas"** aesthetic documented in [portfolio-design.md](./portfolio-design.md)
- **Audience & Tone (Balanced):** Plain-English business/user outcomes up front so **non-technical clients & school/business decision-makers** understand what you offer immediately, paired with technical stack badges, live scaled previews, and deep **Specs / Architecture** tabs for **engineers & OJT recruiters**
- **Mobile-First Requirement:** Designed first for `375px–430px` mobile screens (including Messenger's in-app browser) with `>= 44px` touch targets, a mobile bottom-sheet live preview drawer (`h-[92dvh]`), and thumb-friendly Messenger/Email footer CTAs
- **Phase 4 Testing Focus:** Verify desktop & mobile views locally (`npm run dev`), check interactive preview drawers & fallbacks, and decide whether `My_Electricity_Tracker` stays a fallback card or opens public access on Vercel before deploying
