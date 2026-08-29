# Elevation UpScales, Inc. — Elevation 4.3 Master Status

**Purpose:** Canonical cross-worker coordination record. Every worker reads this before work and returns a receipt when finished.

**Authority:** newest accepted production state + newest explicit owner/management decision. Older handoffs are historical when superseded.

**Last status update:** 2026-08-28 — Final Admin Operating System is accepted in production and Doba CSV Sync is deployed/verified as the official Doba source-refresh process.

---

## Worker Start
1. Read this file.
2. Confirm current repo `main` and accepted production SHA separately.
3. Read the controlling handoff/decision.
4. Confirm scope/boundaries.
5. Build from current accepted lineage; preview before production.

## Worker Finish
Return parent/result SHA, changed files/schema, preview/production URLs, tests/regressions, anomalies/deferred work, data-migration result, rollback baseline and next action. Update Master Status or provide an exact merge block.

---

# Website / Deployment

**State:** PRODUCTION ACCEPTED / CONTROLLED RELEASES

**Accepted Doba CSV Sync production application baseline:** `0d1d17487a934119f0f8e9a044f636b8fe142784`

**Accepted production deployment:** `https://76ad440e.elevationupscales.pages.dev`

**Production domain:** `https://elevationupscales.com`

**Accepted rollback:** `baseline-2026-08-28-doba-csv-sync`

**Doba production receipt:** `coordination/receipts/2026-08-28-doba-csv-sync-production.md`

Release rule remains: controlled patch → preview → verify → production → verify → receipt/baseline → stop.

---

# Doba CSV Sync

**State:** PRODUCTION PASS / OFFICIAL DOBA SOURCE REFRESH

**Decision:** `coordination/decisions/DEC-006-doba-csv-sync-source-of-truth.md`

**Handoff:** `coordination/handoffs/2026-08-28-doba-csv-sync-post-deployment.md`

Owner decision: Doba Download Center CSV upload is the primary Doba source-refresh process for Elevation's custom website.

Workflow:

`Download Doba CSV → Upload in Admin → Preview Diff → Approve → Catalog/Inventory reconciliation → Ready-to-Publish queue → Auto Upload → channel reconciliation`

Admin terminology: **Doba — CSV Sync**.

This is manual supplier snapshot retrieval + automatic Admin reconciliation, not a live Doba API connection. Doba API/feed capability is not a prerequisite for the current website.

### Production controls

- Doba CSV Sync lives inside **Commerce → Channels & Sync**.
- Saved profile `Doba Download Center — 25% Markup` derives supplier cost as `Dropshipping Price / 1.25`.
- The selected markup profile/percentage is stored with the import run.
- **Partial Snapshot** is the default; missing rows do nothing to existing products.
- **Full Snapshot** may mark missing source records stale/review; it does not silently delete or unpublish.
- Preview Diff occurs before Catalog/Inventory product mutation.
- File fingerprint + profile + scope make Apply idempotent against duplicate runs.
- Exact Item No. and supplier SKU are separate identity gates.
- SKU mismatch becomes review; no silent variant substitution.
- New Item No. stages DRAFT / NEEDS REVIEW and never auto-publishes.
- Zero stock is unavailable/HOLD-safe; stock 1–10 is flagged for conservative review.
- Existing HOLD records are not automatically cleared by source CSV evidence.
- Supplier-managed stock remains separate from physical On Hand.
- Shipping restrictions and marketplace restrictions are source metadata/readiness gates.
- Doba Ship-to data does not override Hawaii exact-product/route qualification.
- Row-level audit events and import-run receipts are recorded.
- Doba internal runtime is Worker-protected; direct access returns 404.

### Accepted sample audit

Sample: `US_Dropshipping_Product_Data_with_25%_Markup_20260829_5188491.csv`

- 32 source rows
- 10 current Catalog Doba Item No. matches
- 22 new Item No. candidates
- 3 zero-stock rows
- 3 additional low-stock rows (1–10)
- 24 rows exclude AK/HI
- 8 rows list all 50 states
- 23 rows prohibit Amazon
- 22 rows prohibit Walmart
- 20 rows prohibit Temu
- current movie-screen Catalog item is absent, proving Partial vs Full scope is mandatory
- all 10 overlapping current products validate `Dropshipping Price ≈ stored supplier cost × 1.25`

The raw CSV itself was not provided to Deployment during the production release, so no 32-row production Apply occurred. The first owner upload must run Preview Diff and should produce the expected `32 / 10 / 22 / 3 / 3 / 10-of-10` acceptance result before Apply. A material difference blocks Apply pending investigation.

---

# Final Admin Operating Model

**State:** PRODUCTION ACCEPTED

Permanent owner model:

- **Overview / Mission Control** = what needs attention today
- **Products & Listings** = what Elevation sells and what is live
- **Inventory** = whether Elevation can source it and what it costs
- **Channels & Sync** = source/channel relationship + synchronization health, including Doba CSV Sync
- **Store Orders** = paid customer order and fulfillment truth
- **Shipping & Logistics** = routes/freight/Hawaii reservations/batches/blockers
- **Marketplace** = independent seller listings only
- **Leads** = service/project opportunities
- **Analytics** = read-only decision support
- **System / QA** = deployment/automation/sync health

Final navigation:

**Daily Operations:** Overview · Orders & Fulfillment · Leads  
**Commerce:** Products & Listings · Inventory · Channels & Sync  
**Shipping:** Shipping & Logistics  
**Marketplace:** Marketplace Operations  
**Insights & System:** Analytics · System / QA

Do not add disconnected owner-facing Admin pages to solve ordinary operations.

---

# Listing / Sync Operations

**State:** AUTO-UPLOAD EXISTS / DOBA CSV SYNC LIVE / FIRST SOURCE SNAPSHOT NEXT / LISTING BACKLOG RECOVERY FOLLOWS

Core distinction:

- **Upload/Publish** creates a missing channel listing after readiness gates pass.
- **Sync** reconciles an existing product/source/channel relationship and keeps it correct.

**One-writer rule:** Doba CSV/source owns supplier truth; Catalog owns Elevation commercial authorization; channels own observed external state; Orders owns customer fulfillment. Do not create competing stock/price writers.

Next operational sequence:

1. Owner uploads the current Doba CSV as Partial Snapshot.
2. Preview must pass expected audit/reconciliation checks.
3. Owner approves Apply.
4. Doba source state becomes the current supplier snapshot.
5. Only after that run listing recovery against current Catalog, current Doba source snapshot, live eBay, legacy eBay candidates, Fourthwall mappings and verified TikTok state. Marketplace is excluded.

---

# Inventory / Catalog

**State:** PASS / SUPPLIER COST TRUTH HARDENED / NO DOBA RAW APPLY YET

Owner-confirmed baseline before first Doba CSV Apply:
- Total 11
- Published 8
- HOLD 3
- all 11 have non-zero stored supplier cost

Current HOLD items:
- `D0102HPBE86-428316` Gazebo — conflicting inventory snapshots
- `D0102HGKRVV-521042` Lawn Sweeper — SKU mismatch / prior sync failure
- `D0102HHVH7A-285520` 3×3 Tent — price mismatch

CSV source data may help resolve evidence, but does not automatically clear a separate channel/SKU/price HOLD.

Supplier-managed stock is never physical On Hand.

---

# Hawaii Lithium

**State:** PHASE 2 BACKEND CONTROLS PRESERVED / COMMERCIAL PILOT

Exact-SKU, supplier cost/inventory, document, route/provider, quote, customer confirmation, compatibility, HOLD and batch no-go controls remain mandatory.

Owner UI uses **Shipping & Logistics** with progressive disclosure. `/admin-lithium-shipping` may remain for compatibility.

Doba CSV Ship-to data must not create blanket Hawaii eligibility. Existing Hawaii exact-product/route gates remain authoritative.

---

# Marketplace

**State:** ACTIVE / SEPARATE

Independent/community seller listings only. Never merge into Catalog/Doba listing recovery.

---

# Solar Builder

**State:** HEALTHY / PRESERVE

Education/planning/lead generation. Do not create another product DB or rebuild during Admin/sync work.

---

# Technician Portal

**State:** SEPARATE SYSTEM

Do not mix Portal code/auth/deployment into Website/Admin scope unless explicitly authorized.

---

# Cross-Worker Rules

- One source of truth per business object.
- Current production beats stale handoff intent.
- Newest explicit owner decision wins conflicts.
- Marketplace stays separate from Store.
- Supplier-managed stock is not physical On Hand.
- Missing/zero cost is never free inventory or valid margin.
- Doba marked-up CSV price is not raw supplier cost; use the saved import profile.
- CSV imports require Preview Diff and audit before mutation.
- Partial CSV absence never means discontinued.
- Auto upload must not duplicate mapped listings.
- Auto sync must not auto-publish unknown products.
- Material SKU/identity/cost/margin/shipping/compliance changes become review/HOLD rather than blind sync.
- One authoritative writer per external field.
- Public capability claims must match verified operational state.
- When authorized work is complete: verify, receipt, baseline, stop.

---

# Coordination Files

- `ELEVATION_4_3_MASTER_STATUS.md` — current truth
- `coordination/WORKER_PROTOCOL.md` — worker start/finish
- `coordination/handoffs/2026-08-28-final-admin-operating-system-listing-sync.md` — accepted Admin architecture lineage
- `coordination/handoffs/2026-08-28-doba-csv-sync-post-deployment.md` — Doba CSV implementation handoff
- `coordination/decisions/DEC-006-doba-csv-sync-source-of-truth.md` — durable Doba CSV decision
- `coordination/receipts/2026-08-28-doba-csv-sync-production.md` — production closeout evidence
- `coordination/receipts/` — completed evidence

Master Coordination owns conflict resolution.
