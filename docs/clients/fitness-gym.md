# Client Spec — Fitness Gym (`iron-pulse-gym`)

- **Client Name (Sample):** Iron Pulse Fitness
- **Subpage Route:** `/iron-pulse-gym`
- **Admin Portal Route:** `/iron-pulse-gym/admin`
- **Login Route:** `/iron-pulse-gym/login`
- **Enabled Modules:** `bookings`
- **Currency:** `PHP` (configurable per tenant via `settings.currency`)

---

## 1. Business Goals

Give a local gym or strength studio a public subpage where prospective and current members can compare membership tiers, submit membership sign-ups, view upcoming coach-led classes or personal training slots with **live remaining capacity**, and book a slot—while the gym owner manages plans, member statuses, schedules, and attendance from `/iron-pulse-gym/admin`.

## 2. Public Subpage Features (`/iron-pulse-gym`)

1. **Membership Plans Showcase:**
   - Displays active tiers (`membership_plans` where `is_active = true`), e.g., *Day Pass*, *Monthly Open Gym*, *Coaching Pro*.
   - Lists billing cycle (`daily`, `monthly`, `quarterly`) and bulleted perks.
   - Selecting a plan opens an enrollment form (Full Name, Email, Phone) that submits a `pending` membership application (`member_subscriptions`) for front-desk activation/payment.
2. **Live Class & Session Schedule:**
   - Displays open upcoming sessions (`gym_sessions` where `is_open = true`) with coach name, start date/time, duration, and **live remaining spots** (`capacity - booked_count` left).
   - **Book Slot Flow:** Collects customer name and contact info, then runs an atomic `book_session` transaction that verifies capacity is still open and increments `booked_count` safely.

## 3. Client Admin Features (`/iron-pulse-gym/admin`)

1. **Authentication:**
   - Protected by Supabase Auth + `tenant_members` verification scoped strictly to `iron-pulse-gym`.
2. **Membership Plans Management:**
   - Create new membership plans (name, price, billing cycle, perks list).
   - Toggle active/inactive visibility for seasonal promos.
3. **Member Applications & Subscriptions:**
   - Review incoming `pending` membership sign-ups and approve (`active`), pause (`paused`), or expire (`expired`) members with start/end dates.
4. **Sessions & Bookings Management:**
   - Create upcoming classes/PT slots (title, coach, date/time, duration, capacity).
   - Open or close booking availability (`is_open`).
   - View attendee list per session and update booking statuses (`confirmed`, `attended`, `cancelled`). Cancelling a booking automatically frees up 1 slot in `gym_sessions.booked_count`.

## 4. Future Extension Note

Because the template is modular, if the gym later sells protein tubs, straps, or merch alongside bookings, simply add `'inventory'` to `tenants.enabled_modules` (`['bookings', 'inventory']`) to unlock the storefront module on the same subpage.
