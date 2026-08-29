# Elevation UpScales, Inc.
## Admin Portal Pass 2 — Simplified Shipping & Logistics + Continued Organization
**Project:** Elevation 4.3  
**Date:** 2026-08-28  
**Prepared by:** Master Coordination  
**Status:** AUTHORIZED FOR DEPLOYMENT BUILD

## Authoritative baseline
- Current repository `main` at preparation: `e04f7ceb1757d32280a4455e676d24e058969aff`
- Accepted production application baseline: `d4476ca43760930bf759d470931665a94b3d063c`
- Pass One production: `https://9755cd4f.elevationupscales.pages.dev`
- Verification run: `33232727325` — PASS
- Rollback baseline: `baseline-2026-08-28-admin-portal-pass1`

Build forward from current `main`. Do not undo Pass One.

## Owner direction
Retire `Lithium Shipping Matrix` as the primary owner-facing concept. Preserve the backend Hawaii Lithium Phase 2 protections, but fold their owner workflow into the systems where they naturally belong.

The owner should not need to understand the database/compliance architecture to operate Elevation.

## Permanent operating model
- **Catalog Manager** — what the product is: product identity, Elevation SKU, supplier SKU/variant, manufacturer/model, chemistry, product-level document references, publish/HOLD state, Hawaii readiness summary.
- **Inventory** — whether Elevation can source it and what it costs: supplier, supplier-managed state, supplier cost, supplier stock, last supplier check, origin/warehouse, lead time, recheck-needed state.
- **Store Orders** — what the customer bought and what must be fulfilled: payment, customer shipping info, supplier purchase, fulfillment, tracking, hold/refund.
- **Shipping & Logistics** — how the product/order moves: Hawaii reservations requiring action, products awaiting shipping review, route/provider, freight quote, shipment batch, batch readiness, blocker, next action.
- **Mission Control** — what needs attention today: reservation follow-up, stock recheck, quote/route blocker, batch blocker, reconfirmation, paid order awaiting purchase, ready-to-book shipment.

## Do not delete or weaken
Preserve exact SKU/Catalog links, supplier SKU/variant, manufacturer/model, supplier cost, inventory rechecks, origin, UN 38.3/document references, packaging/terminal review, destination route records, provider review, freight quotes, landed-cost fields, reservations, reconfirmation, shipment batches, compatibility, READY TO COMMIT/BOOKED no-go gates, HOLD controls, audit history, public Hawaii gates, demand metrics, and cost-completeness controls.

## Owner-facing UI change
Rename/reframe `/admin-lithium-shipping` as **Shipping & Logistics**. Keep the existing route for bookmark/API compatibility. Do not display `Lithium Shipping Matrix` as the main navigation label.

Suggested page subhead: `Manage Hawaii reservations, shipping readiness, freight quotes, shipment batches, and blockers.`

### Default Shipping & Logistics view
Top summary:
- Reservations Waiting
- Products Needing Review
- Supplier Rechecks
- Quote / Route Needed
- Open Shipment Batches
- Ready to Commit
- Blocked

Primary sections:
1. **Needs Attention** — customer/product, destination, state, blocker, next action, age/due state, Open.
2. **Hawaii Reservations** — customer, island/ZIP, battery/interest, qty, exact SKU, status, batch, last contact, next action, Open.
3. **Shipment Batches** — batch, destination, status, reservations, units, quote, gross contribution, readiness, blocker, Open.

## Product shipping detail
Use progressive disclosure instead of a giant default form.

Group data into:
- Product
- Supplier
- Documents
- Hawaii Shipping
- Economics

Put unusual/technical fields behind `Advanced Shipping Details` where practical. Full backend data must remain available.

## Natural source-of-truth routing
Where safe in this pass:
- supplier cost/stock/origin edits → Inventory
- product identity/document edits → Catalog/product shipping detail
- payment/fulfillment edits → Store Orders
- freight/batch/route edits → Shipping & Logistics

Avoid duplicate editable truth. If temporary duplication is unavoidable, identify one authoritative source and use read-only/synchronized copies elsewhere.

## Admin navigation
Preserve Pass One hierarchy:
- **Daily Operations:** Overview, Orders & Fulfillment, Leads
- **Commerce:** Products / Import Center, Inventory, Channels / Stores
- **Shipping:** Shipping & Logistics
- **Marketplace:** Marketplace Operations
- **Insights & System:** Analytics, System / QA

No separate top-level Hawaii nav item.

## Visual Pass 2 goals
Reduce page height, giant forms, repeated explanations, competing buttons, and audit-log clutter. Improve whitespace, section hierarchy, primary-action clarity, table scanning, blocker visibility, responsive behavior, and progressive disclosure. Preserve black/gold Pass One styling; do not perform a brand redesign.

## Owner-friendly state labels
The backend enums may remain unchanged, but owner-visible labels should be simplified where safe:
- `FULL REVIEW REQUIRED` → `Shipping Review Needed`
- `DOCS NEEDED` → `Documents Needed`
- `CARRIER REVIEW` → `Provider Review Needed`
- `RECHECK REQUIRED` → `Supplier Recheck Needed`
- `READY TO COMMIT` → `Ready to Book Shipment`

## Safety rule
UI simplification must not weaken server-side no-go gates for exact SKU, Catalog linkage, supplier cost, current supplier inventory, required documents, HOLD, route/provider acceptance, freight quote validity, customer reconfirmation, batch compatibility, or complete economics.

## Public Hawaii
No material public Hawaii redesign in this Admin pass. Preserve conservative Coming Soon/readiness language, reservation without automatic charge, exact destination/SKU logic, and no blanket Hawaii claims.

## Current Catalog state — preserve
- Total 11
- Published 8
- HOLD 3
- all 11 supplier costs populated

Remain HOLD unless current supplier evidence resolves them:
- Gazebo — conflicting inventory snapshots
- Lawn Sweeper — SKU mismatch / prior sync failure
- 3×3 Tent — price mismatch

Do not publish them during Admin cleanup.

## Expected file scope
Primary: `site/admin-command-center.js`, `site/admin-command-center.css`, `site/admin-command-center-pass1.css`, `site/admin-lithium-shipping.html`, `site/admin-lithium-shipping.js`, `site/admin-lithium-shipping.css`.

Conditional only: Catalog/Inventory/Orders/Mission Control UI files for links/read-only summaries; `_worker.js` only for asset versioning or strictly necessary compatibility work.

Avoid PayPal, checkout, Marketplace backend, Solar Builder, Start a Project, Portal, and destructive Hawaii schema changes.

## Acceptance
Must verify:
- Pass One stays intact.
- Admin nav says Shipping & Logistics.
- `/admin-lithium-shipping` still resolves.
- default shipping screen is action-oriented rather than giant-form-first.
- reservation/review/recheck/quote/batch/blocked counts are visible.
- reservation, product shipping detail, and batch detail can open.
- Catalog/Inventory/Orders/Shipping remain their proper sources of truth.
- all Phase 2 no-go gates still block invalid states.
- Catalog remains 11 total / 8 published / 3 HOLD.
- supplier costs remain populated.
- supplier-managed Inventory semantics remain unchanged.
- `/admin`, Catalog, Inventory, Orders, Shipping, Analytics, Channels, Store, Marketplace, Checkout, Start a Project, Solar Builder, and public Hawaii routes all return 200.

## Deployment
Small controlled Pass 2 patch → source validation → preview → acceptance/regression tests → production → production verification → receipt → rollback baseline → remove one-time automation → STOP.

Suggested rollback baseline: `baseline-2026-08-28-admin-portal-pass2-shipping-simplification`

## Final direction
**Simplify the owner experience without simplifying away the controls.**

Catalog tells us what it is. Inventory tells us whether we can source it. Orders tells us what the customer bought. Shipping & Logistics tells us how it moves. Mission Control tells us what needs attention.
