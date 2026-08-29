# Elevation UpScales — Doba CSV Sync Production Receipt

**Date:** 2026-08-28  
**Status:** PRODUCTION PASS / DEPLOYMENT CLOSED  
**Decision:** DEC-006 — Doba CSV Sync Is the Primary Doba Source Refresh

## Lineage

- Doba follow-on parent: `4b1d358da862bb620b6e2df06d6ba1a0b10c5d3f`
- Preview-verified application candidate: `0226aea3abf9c0f8a02aaa35dc7661562e08dd5e`
- Production merge: `e1e09a5f1bbbfc51726f565e2d1e8b51208951d1`
- Production workflow source: `90183d5a0186119b52cc1d952feab8698ed86d5c`
- Post-cleanup production application baseline: `0d1d17487a934119f0f8e9a044f636b8fe142784`
- Rollback branch: `baseline-2026-08-28-doba-csv-sync`

## Cloudflare

- Hardened preview run: `33235493691` — PASS
- Production run: `33235575403` — PASS
- Production deployment: `https://76ad440e.elevationupscales.pages.dev`
- Production domain: `https://elevationupscales.com`

## Official operating model

Doba supplier truth is refreshed through:

`Download Doba CSV → Admin / Channels & Sync → Upload Doba CSV → Preview Diff → Approve Sync → Catalog / Inventory reconciliation → Ready-to-Publish queue → channel publishing/reconciliation`

Doba API/feed integration is **not a prerequisite** for the current Elevation website. Admin terminology is **Doba — CSV Sync**.

## Implemented controls

- CSV upload inside the existing Channels & Sync page; no disconnected Doba management application.
- Saved import profile: `Doba Download Center — 25% Markup`.
- For that profile, base supplier cost is derived as `Dropshipping Price / 1.25`.
- Import profile and markup percentage are stored with each run.
- Partial Snapshot is the default.
- Full Snapshot can mark missing source records stale for review; it does not silently delete/unpublish them.
- Preview Diff is mandatory before Apply.
- Preview stores staging/audit data only; Catalog/Inventory product fields are not changed by Preview.
- SHA-256 file fingerprint + profile + scope provide idempotency against duplicate Apply.
- Item No. match and exact supplier SKU match are separate gates.
- Supplier SKU mismatch becomes `REVIEW — SUPPLIER SKU CHANGED`; no substitution.
- Unknown Item No. becomes DRAFT / NEEDS REVIEW; it is never auto-published.
- Zero supplier stock is unavailable/HOLD-safe.
- Supplier stock 1–10 is flagged for conservative review.
- Existing HOLD state is not automatically cleared by a CSV row.
- Supplier-managed stock stays separate from physical On Hand.
- Source shipping/restriction/content data is stored as supplier snapshot metadata.
- Doba Ship-to data does not override Hawaii exact-product/route qualification.
- Row-level audit events and import-run receipts are stored.
- Full-snapshot missing products become source-stale review items, not destructive deletes.
- New Doba CSV source tables initialize idempotently on first authenticated use of the Doba CSV Admin endpoint.

## New/extended storage

The Doba CSV runtime defines the following idempotent D1 tables/indexes:

- `eus_doba_csv_profiles`
- `eus_doba_csv_runs`
- `eus_doba_csv_rows`
- `eus_doba_source_state`
- `eus_doba_csv_events`
- supporting indexes for runs, fingerprints, source mapping, and events

It also reuses/ensures the existing sync tables:

- `eus_sync_runs`
- `eus_channel_sync_state`

**Deployment data result:** no customer/product mutation and no raw 32-row import were performed during deployment. Unauthenticated verification returns before schema initialization. These Doba tables initialize only when an authenticated owner first opens/uses Doba CSV Sync.

## Production verification

PASS:

- `/admin`
- `/admin-channels`
- `/admin-catalog`
- `/admin-inventory`
- `/admin-store-orders`
- `/admin-lithium-shipping`
- `/admin-analytics`
- `/store`
- `/marketplace`
- `/checkout`
- `/start-a-project`
- `/solar-project`
- `/hawaii-lithium-batteries`
- `/doba-csv-sync.js`

Security verification:

- unauthenticated `/api/admin/doba-csv-sync` → `401`
- direct `/doba-csv-sync-runtime.js` → `404`
- existing protected Catalog, Inventory, Orders, Lithium and Sync Admin APIs → `401`

Public Hawaii regression check also passed; the Doba source workflow does not create blanket Hawaii shipping claims.

## Sample audit acceptance state

The supplied audit workbook/addendum establishes the expected first-upload baseline:

- 32 source rows
- 10 existing Catalog Item No. matches
- 22 new Item No. candidates
- 3 zero-stock rows
- 3 additional low-stock rows
- 10/10 overlapping cost derivations reproduce stored supplier costs within normal rounding tolerance
- missing movie-screen row must remain untouched in Partial mode

The production UI encodes this baseline and flags a materially different 32-row result for investigation before Apply.

**Important:** the raw source file `US_Dropshipping_Product_Data_with_25%_Markup_20260829_5188491.csv` was not provided to the Deployment Manager in this deployment turn, so the exact production Preview/Apply of those 32 raw rows was not performed. The first owner upload remains preview-first and should not be Applied unless the expected baseline passes or differences are investigated.

## Anomaly resolved during preview

The first preview exposed that `doba-csv-sync-runtime.js` could bypass the Worker 404 guard because the path was missing from `_routes.json`. The route was added, the preview was rerun, and the hardened preview passed with direct runtime access returning `404`.

## Next action

Owner/Admin:

1. Open **Admin → Channels & Sync → Doba — CSV Sync**.
2. Upload the actual Doba Download Center CSV.
3. Keep **Partial Snapshot** unless the file is explicitly the full managed Doba set.
4. Use `Doba Download Center — 25% Markup` for the audited file.
5. Run **Preview Diff**.
6. Confirm expected `32 / 10 / 22 / 3 / 3 / 10-of-10` acceptance result and investigate any material difference.
7. Only then choose **Apply Sync**.

Deployment stops here. Listing backlog recovery is a separate follow-on after the first verified Doba source snapshot.
