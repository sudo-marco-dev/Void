# Client Design Spec — Vape Shop (`vape-shop`)

## 1. Visual Identity & Mood

- **Theme Tone:** Crisp dark street-boutique — matte obsidian backgrounds, subtle glass borders, high-contrast stock status badges, and electric emerald/teal accents.
- **Brand Tokens (`tenants.theme`):**
  - `--tenant-primary`: `#10b981` (Emerald 500 — primary CTAs, add-to-cart buttons, active filters)
  - `--tenant-accent`: `#22d3ee` (Cyan 400 — subtle highlights, category tags)
  - `--tenant-surface`: `#09090b` (Zinc 950 — base canvas) / `#18181b` (Zinc 900 — product cards)
- **Typography:** Clean geometric sans-serif (`Geist` / `Inter`) for scannable titles, tabular numbers (`tabular-nums`) for prices and live stock counts.

## 2. Layout & Key Screens

### A. Age Gate Modal (Pre-Entry)
- Centered dark card over blurred backdrop, bold `21+ Verification Required` badge, concise legal notice, **I am 21 or older (Enter Store)** primary button, and **Exit to Portfolio** secondary link.

### B. Public Storefront (`/vape-shop`)
- **Top Bar:** Brand mark ("Cloud District Vapor"), quick anchor links (`Catalog`, `Order Cart`), subtle **Client Portal** link (`/vape-shop/admin`), and **← Void Portfolio** breadcrumb.
- **Hero Strip:** Compact store tagline, live SKU count, pickup/same-day delivery indicator.
- **Split Workspace (Desktop) / Stacked (Mobile):**
  - **Left/Main (8 cols):** Category filter pills + search bar above a responsive 2–3 column product grid.
    - Each Product Card shows: Thumbnail/placeholder, Category pill, Product Name, short flavor/spec note, bold Price, **Live Stock Badge** (Emerald when `> 5`, Amber `"Only X left"` when `1–5`, Rose `"Sold Out"` when `0`), and `+ Add to Order` button.
  - **Right/Sticky (4 cols):** Live Order Summary & Checkout Drawer/Panel with item quantity steppers (`- / +`), server-matched subtotal, fulfillment toggle (`Pickup` / `Delivery`), payment selector (`COD` / `GCash` / `Bank Transfer`), and `Place Order` button.

### C. Client Admin Portal (`/vape-shop/admin`)
- **Top Metric Row:** Total Active SKUs, Low Stock Alerts (`<= 5`), Pending Orders, Total Revenue/Confirmed Orders.
- **Two Clean Tabs:**
  - **Inventory Tab:** Quick "Add Product" collapsible/inline form + searchable table with instant `-1` / `+1` stock steppers, `Available` switch, edit modal/row, and delete action.
  - **Orders Tab:** Filterable order cards showing Order ID, timestamp, customer contact, line items, total, and one-click status dropdown (`pending`, `confirmed`, `fulfilled`, `cancelled`).
