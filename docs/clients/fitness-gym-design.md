# Client Design Spec — Fitness Gym (`iron-pulse-gym`)

## 1. Visual Identity & Mood

- **Theme Tone:** High-energy athletic industrial — deep charcoal surfaces, crisp typography, bold amber/orange momentum accents, and clear capacity meters.
- **Brand Tokens (`tenants.theme`):**
  - `--tenant-primary`: `#f97316` (Orange 500 — primary CTAs, Join Plan, Book Slot)
  - `--tenant-accent`: `#facc15` (Yellow 400 — featured tier badge, PR highlights)
  - `--tenant-surface`: `#09090b` (Zinc 950 — canvas) / `#18181b` (Zinc 900 — cards)
- **Typography:** Bold uppercase/tight-tracked display headers for athletic punch; clean readable body text and tabular numbers for times, prices, and slot counts.

## 2. Layout & Key Screens

### A. Public Gym Subpage (`/iron-pulse-gym`)
- **Top Bar:** Brand mark ("Iron Pulse Fitness"), section jump links (`Memberships`, `Schedule`), subtle **Client Portal** link (`/iron-pulse-gym/admin`), and **← Void Portfolio** breadcrumb.
- **Hero Banner:** Confident gym headline, operating hours, and two jump actions (`View Memberships`, `Book a Session`).
- **Membership Plans Grid (3-column):**
  - Tier cards with price, billing cycle badge, perk checklist, highlighted border on popular plan, and `Apply for Membership` CTA triggering a clean enrollment drawer/modal.
- **Upcoming Sessions Schedule:**
  - Chronological session cards/rows showing: Session Title, Coach Name, Date & Time, Duration pill, **Live Capacity Bar & Spots Left Badge** (e.g., `"4 of 12 spots left"`, or `"Full"` when `0`), and `Book Spot` button opening a quick 2-field reservation form.

### B. Client Admin Portal (`/iron-pulse-gym/admin`)
- **Top Metric Row:** Active Plans, Pending Member Applications, Active Members, Upcoming Sessions & Total Bookings.
- **Three Clean Tabs:**
  - **Plans Tab:** Add Plan form + plan cards with `Active` toggle.
  - **Members Tab:** Member applications table with quick status actions (`Activate`, `Pause`, `Expire`).
  - **Sessions & Bookings Tab:** Schedule New Session form + expandable session list showing booked attendees with `Mark Attended` / `Cancel Booking` actions.
