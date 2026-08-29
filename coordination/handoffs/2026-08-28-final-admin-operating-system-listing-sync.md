# Elevation UpScales — FINAL Admin Operating System + Listing Recovery / Auto-Sync Handoff

**Date:** 2026-08-28  
**Status:** AUTHORIZED FOR DEPLOYMENT BUILD  
**Repository:** `elevationupscales/ElevationUpScales`

## Authority
Current `main` when this handoff was prepared: `eb0e85d81159151bb1796cc99ca084564a48e138` or accepted descendant.

Accepted production Admin baseline remains Pass One application SHA `d4476ca43760930bf759d470931665a94b3d063c`, production deployment `https://9755cd4f.elevationupscales.pages.dev`, rollback `baseline-2026-08-28-admin-portal-pass1`.

Pass Two candidate `release/admin-portal-pass2-shipping-simplification@ec808444d921e21af56aae7ebc8dcecabfa47e3f` is reference material only. Its preview verification failed and it is not the accepted production parent. This handoff supersedes the narrower Pass Two handoff.

## Final owner model
Build one Admin operating system around these responsibilities:

### Daily Operations
- Overview
- Orders & Fulfillment
- Leads

### Commerce
- Products & Listings
- Inventory
- Channels & Sync

### Shipping
- Shipping & Logistics

### Marketplace
- Marketplace Operations

### Insights & System
- Analytics
- System / QA

### Permanent boundaries
- Catalog = product master / what Elevation may sell.
- Inventory = physical or supplier availability + cost/origin/freshness.
- Channels & Sync = external relationships and sync health, not another product DB.
- Orders = paid customer order and fulfillment truth.
- Shipping & Logistics = route/freight/reservations/batches/blockers.
- Marketplace = independent seller listings only.
- Leads = service/project opportunity system.
- Portal remains separate.

## Overview / Mission Control
Action-required home page only. Surface paid orders needing supplier purchase, tracking, refund/HOLD, products ready to publish, product review, out-of-sync listings, supplier sync errors, stale supplier data, Hawaii reservations/rechecks/blockers/batches, lead follow-up and Marketplace review. Every card opens the source queue.

## Products & Listings
Reframe Catalog owner UI as `Products & Listings` while keeping Catalog as source of truth.

Views: `All`, `Live`, `Ready to Publish`, `Needs Review`, `HOLD`, `Draft`, `Stale`, `Sync Error`.

Each row should show product/SKU, supplier, supplier cost, retail price, supplier state, Website/eBay/TikTok/Fourthwall state, shipping/readiness, blocker/next action.

A normal Doba product becomes READY only with exact supplier SKU, non-zero source cost, valid source relationship, usable content/image, selling price, safe margin, valid fulfillment/shipping path, checkout mapping, and no HOLD/mismatch. Lithium/Hawaii retains stricter existing gates.

## Inventory
Keep physical inventory distinct from supplier managed. Add/retain supplier cost, stock state/qty, origin, last checked, freshness and recheck-needed. Never fake physical On Hand for dropship products.

## Channels & Sync
Replace relationship-only channel reporting with real sync health.

For Website, Doba, eBay, TikTok, Fourthwall display: configured state, monitor/managed mode, last attempt, last success, age, item count, changed/review/error counts, last error, manual `Sync Now`, auto-sync enabled/disabled.

Do not infer healthy external sync merely because Catalog contains a channel name.

## Auto Upload vs Auto Sync
**Upload/Publish** creates a missing external listing after readiness gates pass and captures the external listing ID.

**Sync** reconciles an existing source/product/channel relationship: source snapshot → normalize → compare → safe update or review/HOLD → external state reconciliation → audit.

Auto upload must detect an existing mapping and avoid duplicates. Auto sync must never auto-publish an unknown product.

## One-writer rule
One authoritative writer per synchronized field:
- Doba/source = supplier cost, source availability, source identity/origin.
- Elevation Catalog = commercial authorization, chosen channels, Elevation merchandising/retail policy.
- External channel = observed listing/order IDs/status.
- Store Orders = customer payment/fulfillment.

If Doba is directly connected to eBay/TikTok and already writes inventory there, Elevation Admin monitors that state rather than becoming a second writer unless ownership is explicitly transferred.

## Sync state foundation
Inspect/reuse any accepted existing schema first. If needed, add idempotent state tables equivalent to:

`eus_sync_runs`: source/channel, trigger, mode, timestamps, status, discovered/matched/changed/updated/review/error counts, cursor/ref, error summary.

`eus_channel_sync_state`: catalog_product_id, sku, channel, external_id, desired/observed state, sync status, attempt/success/observed timestamps, last error, external quantity/price where meaningful.

These are relationship/health tables only, not a product DB.

Standard sync states: `SYNCED`, `CHANGED`, `REVIEW REQUIRED`, `ERROR`, `STALE`, `DISABLED`, `NOT CONFIGURED`.

Product-channel states: `NOT LISTED`, `READY TO PUBLISH`, `PUBLISHING`, `LIVE`, `UPDATE PENDING`, `OUT OF SYNC`, `ENDED`, `ERROR`, `HOLD`.

## Automatic safe updates
May update audited supplier/source observations: availability, quantity, cost snapshot, last-seen timestamp, source active/inactive state, external listing observed state/ID/quantity/status and sync timestamps.

## Changes requiring review/HOLD
Never blindly mirror: SKU/variant/identity change, source disappearance, supplier error, unavailable stock without approved backorder, significant cost jump, unsafe margin, channel ID/SKU mismatch, unexpected listing end, shipping path change, lithium exact-product change, required evidence invalidation, content identity mismatch, duplicate listing.

## Price guard
Never auto-publish/update into a known loss. If direct costs are incomplete, show contribution incomplete. Material supplier-cost changes trigger price review according to configured tolerance; do not silently absorb them.

## eBay
An earlier Elevation release contained an automatic 15-minute eBay inventory refresh pattern. Rebuild the useful pattern against current Catalog/Inventory rather than restoring the old release branch wholesale.

Stage A is monitor/reconcile: exact SKU + external ID, live/ended/out-of-stock/error, price/qty observation, mismatch flags. No destructive eBay writes.

Stage B managed writes only for explicitly approved mappings/listings. Existing Seller Hub/legacy listings remain monitor-only until deliberately migrated/managed. Do not bulk migrate them merely to enable sync.

## Doba
Verify actual account capability. Doba documents store-connection inventory/order/tracking sync and provides Retailer API/FTP on eligible plan tiers. For the custom Elevation storefront use actual supported API/feed access when available. If not available, show `Manual Source`/`Not Configured`; do not fake auto-sync.

For Doba-connected eBay/TikTok, avoid a dual writer.

## TikTok
Current API sync is not verified. Display the real configured/monitor state. Do not claim healthy automatic sync until authorization and behavior pass verification.

## Fourthwall
Preserve current Apparel/POD fulfillment. Track mapping/source health without inventing stock semantics for POD.

## Scheduler
Use a controlled scheduled-job pattern. Do not mutate through an unauthenticated GET. Scheduled sync uses authenticated/signed POST, idempotent run ID, concurrency control, retries and audit. Admin gets authorized `Sync Now`.

Suggested cadence subject to provider limits: stock/source 15–60 min; price/cost 1–6h; full metadata/reconciliation daily.

## Shipping & Logistics
Integrate the useful Pass Two simplification. Owner default shows reservations waiting, products needing shipping review, supplier rechecks, route/quote needed, open batches, ready/blocked. Detailed lithium fields are progressive disclosure. Preserve all exact-SKU, supplier-cost, inventory, document, provider, quote, customer confirmation, compatibility and batch no-go gates. `/admin-lithium-shipping` remains compatible.

## System / QA
Add scheduler/sync health: last run/success by source, failures, stale count, configured state (never secrets), current app SHA/deployment, last sync error, audit link.

# Listing Recovery After Deployment
After final Admin production verification, run one reconciliation across:
1. current Master Catalog,
2. current Doba/source records,
3. live eBay seller inventory,
4. legacy `rv-ebay-catalog.js` candidates,
5. Fourthwall mappings,
6. TikTok only when actual connection can be verified.

Marketplace is excluded.

Current known Catalog baseline: 11 total, 8 published, 3 HOLD. Preserve the three current holds until exact current evidence resolves them:
- `D0102HPBE86-428316` Gazebo — conflicting inventory snapshots.
- `D0102HGKRVV-521042` Lawn Sweeper — SKU mismatch / prior sync failure.
- `D0102HHVH7A-285520` 3×3 Tent — price mismatch.

Legacy eBay/static records are discovery candidates only; they are not current inventory truth.

For each candidate classify: `LIVE + HEALTHY`, `READY TO PUBLISH`, `NEEDS COST`, `NEEDS STOCK`, `PRICE MISMATCH`, `SKU MISMATCH`, `SHIPPING REVIEW`, `IMAGE/CONTENT REVIEW`, `SUPPLIER ERROR`, `DUPLICATE`, `DISCONTINUED`, `HOLD`.

Missing valid products may be staged to Catalog as Draft/Review. Publish only after readiness passes. Never publish solely to increase listing count.

## Reconciliation UI
Products & Listings should support Candidate / Live / Ready / Review / Duplicate / Discontinued / Sync Error views with preview-before-mutation actions: Stage, Publish, Hold, Ignore/Historical, Open Source, Open Channel Listing, Recheck, Sync Now.

# Deployment sequence
1. Confirm current main.
2. Create final release branch from current main.
3. Integrate/fix useful Pass Two owner-layer work; do not trust the failed preview candidate wholesale.
4. Finish final Admin shell and workspaces.
5. Add/reuse sync-state foundation.
6. Implement eBay monitor/reconcile.
7. Implement actual supported Doba source mode or clearly mark manual/not configured.
8. Preserve Fourthwall; expose truthful TikTok state.
9. Add listing reconciliation tooling.
10. Preview and verify all Admin + safety regressions.
11. Promote production only after preview passes.
12. Verify production.
13. Create baseline `baseline-2026-08-28-admin-operating-system-sync`.
14. Run listing recovery/reconciliation.
15. Produce Admin deployment receipt + listing recovery receipt.
16. STOP.

## Critical acceptance
- One consistent Admin shell/navigation.
- Overview action-first.
- Products & Listings statuses clear.
- Physical vs supplier inventory preserved.
- Channels & Sync reports actual sync-run health.
- Shipping & Logistics simplified without weakening backend gates.
- Marketplace separate.
- Sync mutation authenticated/idempotent/audited.
- Auto upload avoids duplicate external listing.
- Auto sync does not publish unknown products.
- No dual-writer Doba/eBay/TikTok conflict.
- eBay legacy listings monitor-only until explicit managed migration.
- Current 11/8/3 Catalog state preserved before reconciliation.
- Current three HOLD products remain held until evidence resolves them.
- PayPal, RV checkout guards, Hawaii gates, Fourthwall, Marketplace, Start Project, Solar Builder and Admin auth regressions PASS.

## Required receipts
Deployment receipt must include parent/application SHA, preview/production URLs, run ID, files/schema/migration, Admin tests, sync-mode truth per source/channel, scheduler/manual sync result, sync error/duplicate/price guard tests, all regressions, rollback baseline.

Listing recovery receipt must include source discovery counts, exact matches, staged, ready, published, duplicate, price/SKU mismatch, supplier unavailable, shipping review, discontinued/unresolved, final Website/eBay/TikTok (if verified) live counts, remaining HOLD count and next sync state.

## Final direction
Do not solve future Admin problems with more disconnected pages.

**Overview tells us what needs attention. Products & Listings tells us what we sell and what is live. Inventory tells us whether we can source it. Channels & Sync tells us whether external systems agree. Orders tells us what customers bought. Shipping & Logistics tells us how difficult shipments move. Marketplace stays independent.**

Then reconcile every legitimate non-live listing and keep it synchronized.

**Upload creates the listing. Sync keeps it correct.**
