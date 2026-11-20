# Client Spec — Vape Shop (`vape-shop`)

- **Client Name (Sample):** Cloud District Vapor
- **Subpage Route:** `/vape-shop`
- **Admin Portal Route:** `/vape-shop/admin`
- **Login Route:** `/vape-shop/login`
- **Enabled Modules:** `inventory`
- **Currency:** `PHP` (configurable per tenant via `settings.currency`)

---

## 1. Business Goals

Provide a clean public storefront where customers can browse available vape hardware, pods, and e-liquids with **live public stock counts**, submit purchase orders without account friction, and give the shop owner a self-service admin portal to control listings, stock quantities, and order fulfillment.

## 2. Public Subpage Features (`/vape-shop`)

1. **Age Verification Gate (`18+` / `21+`):**
   - Fullscreen verification prompt shown before product browsing; remembered per browser session (`sessionStorage`) for the tenant slug.
2. **Product Catalog & Live Public Stock Visibility:**
   - Filter by category (e.g., `Pod Systems`, `E-Liquids`, `Disposables`, `Coils & Pods`, `Accessories`) and search by keyword.
   - Only shows items where `is_available = true`.
   - Displays exact remaining stock publicly (`14 in stock`, `Only 3 left`, `Out of stock`) so customers see real availability.
3. **Cart & Order Placement:**
   - Add/update item quantities capped strictly by current `stock_qty`.
   - Customer checkout form collects: Name, Phone/Messenger handle, Fulfillment Method (`pickup` or `delivery`), Payment Method (`COD`, `GCash / E-Wallet`, `Bank Transfer`), and optional delivery notes.
   - Submitting calls an atomic server/DB transaction (`place_order`) that re-verifies stock, deducts quantities, calculates total server-side, and returns an Order Reference ID.

## 3. Client Admin Features (`/vape-shop/admin`)

1. **Authentication:**
   - Protected by Supabase Auth + `tenant_members` verification; owner only sees and edits `vape-shop` rows.
2. **Inventory Management:**
   - Add new products (name, category, description, price, initial stock, image URL).
   - Quick `+1` / `-1` stock adjustments and inline price/stock editing.
   - Toggle `is_available` visibility to hide seasonal/discontinued items without deleting order history.
   - Delete unused products.
3. **Order Management:**
   - View incoming orders with itemized line items, customer contact, fulfillment choice, and payment method.
   - Transition order status: `pending` → `confirmed` → `fulfilled` or `cancelled`.
   - Marking an order `cancelled` automatically returns its item quantities back into `products.stock_qty`.

## 4. Compliance & Operational Caveats

- **Online Payment Gateways:** Mainstream card processors (such as Stripe) heavily restrict or prohibit nicotine/vape sales. Default to offline/manual settlement (`COD`, e-wallet reference, bank transfer) with order confirmation status tracking.
- **Zero Overselling:** Never trust client-side cart totals or stock math; always enforce stock checks and deductions inside a PostgreSQL transaction.
