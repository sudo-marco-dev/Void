# Portfolio Design & Integration Blueprint — Void (`Marco Rye S. Dela Serna`)

> **Aesthetic Direction:** Stylish, ultra-minimal, modern, and uncommon — inspired by **architectural drafting sheets + Onshape CAD precision** rather than typical neon-gradient or cliché terminal portfolios.

---

## 1. Visual Identity, Design Tokens & Initial Look

### Concept: **"Void Drafting Canvas"**
A stylish, ultra-minimal aesthetic inspired by **architectural drafting sheets and Onshape CAD precision**—replacing loud SaaS gradients and heavy card shadows with generous negative space, crisp `1px` structural hairlines, corner crosshairs (`+`), and numbered editorial indices (`01`–`04`).

### Color Palette & Dual-Theme CSS Tokens
Defaults to **Dark Void (`#09090b`)**, with an **Architectural Paper Light (`#f8f8f7`)** mode toggled via a `750ms` circular radial View Transition expanding from the navbar button and persisted in `localStorage`:

```css
:root {
  --void-bg: #09090b;           /* Deep Void canvas */
  --void-surface: #111113;      /* Elevated card / drawer surface */
  --void-border: #27272a;       /* Standard 1px structural hairline */
  --void-ink: #fafafa;          /* Primary headings */
  --void-ink-muted: #a1a1aa;    /* Body copy */
  --void-accent: #38bdf8;       /* Ice Cyan highlight */
  --void-live: #10b981;         /* Live status dot */
}

:root.light {
  --void-bg: #f8f8f7;           /* Architectural Paper canvas */
  --void-surface: #ffffff;      /* Crisp card surface */
  --void-border: #e4e4e7;       /* Clean 1px paper hairline */
  --void-ink: #09090b;          /* High-contrast ink */
  --void-ink-muted: #52525b;    /* Secondary ink */
  --void-accent: #0284c7;       /* Deep drafting cyan */
  --void-live: #059669;
}
```

### Typography System
- **Display & Body (`--font-sans`):** `Geist` (`next/font/google`), tight display tracking (`-0.03em`) on `h1`/`h2`, relaxed `1.6` line-height on copy.
- **Technical Specs & Indices (`--font-mono`):** `Geist Mono`, `tabular-nums`, uppercase `11px`–`12px` labels (`tracking-[0.14em]`) for section indices, tech tags, and CAD/hardware metrics.

### Initial Viewport Look & Background Styling (First Load)
- **Background Layer:** Deep `#09090b` canvas overlaid with an ultra-subtle `32px` architectural hairline grid (`--void-grid`) masked with a radial gradient so it gently fades out toward the edges—plus a faint top ambient radial wash (`rgba(56, 189, 248, 0.05)`), keeping 90%+ of the viewport clean and distraction-free.
- **Above-the-Fold Composition:** Sticky minimal top bar (`VOID // MARCO`, 4 anchor links, GitHub) over an asymmetric 2-column hero: bold 2–3 line positioning statement + 2 crisp buttons on the left, paired with a compact **CAD-style System Spec Plate** (with subtle `+` corner markers) on the right.

---

## 2. Animation & Library Stack (Tweaked for Minimalism)

Rather than inventing everything from raw CSS or overloading the site with flashy effects, Void uses proven portfolio libraries **dialed down and customized** to stay fast and distinct:

| Library / Source | Role in Void | How We Tweak It for Your Style |
| :--- | :--- | :--- |
| **`motion` (`motion/react`)** *(Framer Motion)* | Entrance reveals, `layoutId` shared active indicator, Live Preview drawer slide | Replace bouncy springs with crisp architectural easing (`cubic-bezier(0.22, 1, 0.36, 1)`, `0.35s`), subtle `8px` vertical fade-in, and full `prefers-reduced-motion` support. |
| **Tailwind CSS v4 + `@theme`** | Responsive grid, `1px` hairlines, `tabular-nums`, radial-masked background | Strict monochrome discipline; zero drop-shadow bloat; subtle glass header (`backdrop-blur-md`). |
| **Spotlight / Grid Patterns** *(inspired by Aceternity / Magic UI — lightweight custom CSS/React)* | Cursor-tracked border sheen & subtle grid fade | **Dialed back ~80%**: skip neon rainbow borders and heavy particles; keep only a clean `4%` radial spotlight along `1px` card borders on hover. |
| **`shadcn/ui` + Radix UI** | `Dialog` / `Sheet`, `Tabs`, `Tooltip` for the Live Preview inspection drawer | Stripped to razor-thin flat monochrome surfaces matching `PSU-SportsTrack` & `RTNHS` consistency. |
| **`lucide-react`** | UI & hardware/domain icons | Uniform `1.5px` stroke weight, monochrome by default, zero multi-color icon clutter. |
| **Intentionally Skipped** | Full-screen Three.js blobs, GSAP scroll-jacking, fake typing terminals, neon blobs | Avoided so the portfolio loads instantly, feels original, and lets your live projects speak for themselves. |
| **Optional Phase 3+ Accent** | `@react-three/fiber` / interactive CAD viewer *(Optional)* | Only considered inside a small contained card in Section 03 (`3D & Hardware`)—never as a heavy full-page hero background. |

---

## 3. Section-by-Section Layout & Integration Blueprint (`/`)

### 00 · Minimal Floating Header
- **Left:** Wordmark `MARCO // DEV` with live emerald status indicator (real-name-first public branding, reserving `Void` for the `nRFBox VOID Version` repo).
- **Right:** Anchor links (`Work`, `Craft`, `Stack`, `Community`, `Journey`, `Contact`), `GitHub` link, and the circular-reveal **Light/Dark Theme Toggle** (also kept visible on mobile right next to the menu button).

### 01 · Asymmetric Hero (Above the Fold)
- **Left (7 cols):** Name badge, plain-English headline, balanced bio, and two buttons (`Preview Featured Work ↓`, `Contact & Inquiries →`).
- **Right (5 cols):** Minimal **"Profile Spec"** card (`2026`) featuring Marco's crisp square portrait (`/profile/headshot.jpg`), plain-English rows, and 3 quick stats (`4+ LIVE VERCEL`, `ESP32 HARDWARE & IOT`, `DUAL-NOZZLE 3D PRINT`).

### 02 · Interactive Project Showcase (`Selected Works`)
- **Flagship 2×2 Grid:**
  - `01` **PSU-SportsTrack** (`https://psusportstrack.tech/`) — *Live Preview Card*
  - `02` **RTNHS QR Attendance + SMS & ESP32-CAM** (`https://rtnhs-qr-code-attendace-system-with.vercel.app`) — *Live Preview Card*
  - `03` **PSU Sales & Inventory System (POS)** *(ADS Finals)* — *Captured Sales & Profit Analytics Card + `Screenshots (3)` Tab*
  - `04` **CODM Camo Tracker** (`https://codm-camo-tracker.vercel.app`) — *Live Preview Card*
- **More Builds Strip:** Includes `D.R.O.P. Drop-Box Digital Twin` (with Live Preview), `Electricity Tracker`, `PSUSphere Dockerized`, and `nRFBox VOID Version`.
- **Bounded Card Architecture:** Desktop frames use CSS containment (`contain: strict`, `clip-path: inset(0)`) and unmount when scrolling past the sticky navbar or while the inspection drawer is open.

### 03 · What I Can Build, Maker Craft & Interactive 3D / Visual Showcase
- **Plain-English Offerings + Pipeline:** 3 service pillars paired with the `Onshape (Cipher Lab) → Flashforge Creator 3 (PITBI @ PSU) → Soldered ESP32` pipeline.
- **Filterable Visual Showcase Gallery & Lazy 3D CAD Inspector:** Category tabs (`All (17)`, `3D Models (6)`, `3D Prints (4)`, `Wiring & Hardware (4)`, `Offline Apps (3)`) populated completely with real `.glb` CAD models and real photos—zero remaining placeholders. Clicking any 3D card lazy-loads the **Three.js + React Three Fiber** inspector (`next/dynamic(..., { ssr: false })`) supporting unified multi-GLB assemblies, model-specific presets (`Roof Off`, `Floor Plan`, `Open Covers`, `Remove Panel`, `See Inside`, `X-Ray`), CAD edges, theme-synced studio lighting, click-to-hide parts, and a collapsible named Parts Tree.

### 04 · Tech Stack (`03`), Workshops & Certificates (`04`) & BSIT Progression (`05`)
- **`03` Toolkit Grid:** Ultra-clean 4-column monospaced spec table (`Frontend & UI`, `Backend & Data`, `Hardware & IoT`, `CAD, 3D & Ops`).
- **`04` Workshops, Awards & Credentials:** 3-card showcase (**Sui Builders Program · Palawan**, **Project Nexus: 3D Printing Beginner Course**, **Cipher Lab**) paired with the dedicated **Certificates & Verified Credentials** subsection featuring a watermarked view-only Sui Builders Certificate preview and in-page inspection lightbox (no public PDF download).
- **`05` BSIT Progression:** Milestone timeline (`Python & Sui Builders 2nd Place` → `Django + Docker` → `Next.js + Prisma POS` → `RTNHS, Cipher Lab & PITBI` → `PSU-SportsTrack & Client Web Systems`).

### 05 · Minimal Footer & Contact Directory (`06 / Get in Touch`)
- *(Note: Client sites are strictly semi-private on shareable subdomains/unlisted routes and are intentionally omitted from the public portfolio `/`.)*
- Clean bottom hairline band featuring **Marco Rye S. Dela Serna** (`4th-Year BSIT · Palawan State University`) and a direct, scannable contact bar:
  - **Messenger:** `https://m.me/marcorye255` (primary quick-chat CTA)
  - **Email:** `mailto:mrcrye@gmail.com` + one-click copy-email action
  - **GitHub:** `https://github.com/sudo-marco-dev`
- Sub-footer note: `© 2026 Void · Marco Rye S. Dela Serna` alongside `Palawan State University`.

---

## 4. Mobile-First Responsive Strategy (`375px` Baseline)

Clients frequently open portfolio links on smartphones (often inside Facebook Messenger's in-app browser), so every layout starts from a `375px–430px` phone viewport and scales up cleanly:

- **Above-the-Fold Phone Priority:** Single-column stacked Hero putting Marco's name, plain-English headline, and primary CTAs (**Preview Work ↓** / **Contact**) immediately on screen, followed by the compact Spec Plate—zero horizontal overflow (`overflow-x-hidden`), `15px–16px` readable body text, and `>= 44px×44px` touch targets.
- **Slim Mobile Header:** Single-line sticky bar (`VOID // MARCO` + clean compact menu sheet or horizontal snap-scroll anchor pills) so navigation never wraps awkwardly on narrow screens.
- **Mobile-Smart Live Project Previews:**
  - **Desktop (`lg:`+):** Lazy-mounted scaled `1280×800` `<iframe>` thumbnails inside cards (`pointer-events-none`).
  - **Mobile (`< 768px`):** Avoids auto-loading 4 heavy desktop iframes at once on mobile data. Instead, cards render a crisp mobile-proportioned preview header + **Tap to Preview** CTA that opens a full-height **Bottom Sheet (`h-[92dvh]`)** defaulting to the **Mobile (`390px`)** view, plus a prominent **Open in Browser ↗** link for in-app browsers.
- **Thumb-Friendly Footer Contact Bar:** Full-width stacked touch buttons on mobile (`Messenger` primary CTA, `Email` with one-tap copy, `GitHub`) so local clients can message Marco in one tap.
