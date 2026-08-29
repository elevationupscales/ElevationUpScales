# Elevation UpScales, Inc. — Elevation 4.3 Master Status

**Purpose:** Canonical cross-worker coordination record. Every worker reads this before work and returns a receipt when finished.

**Authority:** newest accepted production state + newest explicit owner/management decision. Older handoffs are historical when superseded.

**Last status update:** 2026-08-28 — Final Admin Operating System remains active; Doba CSV Sync is queued as the mandatory immediate post-deployment follow-on.

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

**State:** FINAL ADMIN STRUCTURAL BUILD ACTIVE / DO NOT INTERRUP

**Accepted production Admin application before final build:** `d4476ca43760930bf759d470931665a94b3d063c`

**Accepted production deployment:** `https://9755cd4f.elevationupscales.pages.dev`

**Accepted rollback:** `baseline-2026-08-28-admin-portal-pass1`

**Controlling current handoff:** `coordination/handoffs/2026-08-28-final-admin-operating-system-listing-sync.md`

**Controlling current decision:** `coordination/decisions/DEC-005-final-admin-operating-model-and-sync.md`

**Important:** finish the current Admin release first: build → preview → verify → production → verify → receipt/baseline. Do not widen the active deployment to implement the newly discovered Doba CSV workflow before that production pass completes.

---

# Immediate Post-Deployment Queue — Doba CSV Sync

**State:** AUTHORIZED / BEGIN IMMEDIATELY AFTER CURRENT FINAL ADMIN DEPLOYMENT PASSES

**Queued handoff:** `coordination/handoffs/2026-08-28-doba-csv-sync-post-deployment.md`

**Decision:** `coordination/decisions/DEC-006-doba-csv-sync-source-of-truth.md`

Owner decision: Doba Download Center CSV upload is now the primary Doba source-refresh process for Elevation's custom website.

Workflow:

`Download Doba CSV → Upload in Admin → Preview Diff → Approve → Catalog/Inventory reconciliation → Ready-to-Publish queue → Auto Upload → channel reconciliation`

Admin terminology: **Doba — CSV Sync**.

This is manual supplier snapshot retrieval + automatic Admin reconciliation, not a live Doba API connection.

### Accepted sample audit
Sample: `US_Dropshipping_Product_Data_with_25%_Markup_20260829_5188491.csv`

- 32 source rows
- 10 current Catalog Doba Item No. matches
- 22 new Item No. candidates
- 3 zero-stock rows
- 3 additional low-stock rows (1–10)
- 24 rows exclude AK/HI
- 8 rows list all 50 states
- current movie-screen Catalog item is absent from the file, proving imports need Partial vs Full snapshot scope
- all 10 overlapping current products validate the 25% export rule: `Dropshipping Price ≈ current supplier cost × 1.25`

Critical pricing rule: for saved profile `Doba Download Center — 25% Markup`, derive base supplier cost as:

`Dropshipping Price / 1.25`

Never map the marked-up export price directly to supplier cost. Store the selected markup profile with every import run.

Default upload mode: **Partial Snapshot**. Missing rows in a partial export do nothing to existing products. Full Snapshot may mark missing source records stale for review, never silently delete them.

---

# Final Admin Operating Model

**State:** FINAL STRUCTURAL BUILD AUTHORIZED

Permanent owner model:

- **Overview / Mission Control** = what needs attention today
- **Products & Listings** = what Elevation sells and what is live
- **Inventory** = whether Elevation can source it and what it costs
- **Channels & Sync** = source/channel relationship + synchronization health
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

Do not add more disconnected owner-facing Admin pages to solve ordinary operations.

---

# Listing / Sync Operations

**State:** AUTO-UPLOAD EXISTS / Doba CSV SYNC QUEUED / LISTING BACKLOG RECONCILIATION FOLLOWS

Core distinction:

- **Upload/Publish** creates a missing channel listing after readiness gates pass.
- **Sync** reconciles an existing product/source/channel relationship and keeps it correct.

Doba source sync now uses CSV upload/reconciliation. External channels such as eBay remain separately monitored/managed according to verified integration capability.

**One-writer rule:** Doba CSV/source owns supplier truth; Catalog owns Elevation commercial authorization; channels own observed external state; Orders owns customer fulfillment. Do not create competing stock/price writers.

After the current Admin deployment and Doba CSV Sync follow-on are verified, run listing recovery against current Catalog, current Doba CSV/source snapshot, live eBay, legacy eBay candidates, Fourthwall mappings and verified TikTok state. Marketplace is excluded.

---

# Inventory / Catalog

**State:** PASS / SUPPLIER COST TRUTH HARDENED

Owner-confirmed baseline before CSV reconciliation:
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
- `coordination/handoffs/2026-08-28-final-admin-operating-system-listing-sync.md` — active current deployment
- `coordination/handoffs/2026-08-28-doba-csv-sync-post-deployment.md` — immediate follow-on
- `coordination/decisions/DEC-006-doba-csv-sync-source-of-truth.md` — Doba CSV decision
- `coordination/receipts/` — completed evidence

Master Coordination owns conflict resolution.
