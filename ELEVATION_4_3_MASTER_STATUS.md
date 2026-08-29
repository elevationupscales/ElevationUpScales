# Elevation UpScales, Inc. — Elevation 4.3 Master Status

**Purpose:** Canonical cross-worker coordination record for the Elevation 4.3 project.

**Operating rule:** Every worker must read this file before beginning work and update the appropriate section when completing or handing off work. This file answers **what is true right now**. Detailed instructions live in handoffs; completed evidence lives in receipts; durable business/architecture choices live in decisions.

**Authority:** Newest accepted production state + explicit owner/management decisions control. Do not revive superseded plans because an older chat or handoff contains them.

**Last status update:** 2026-08-28 — Admin Portal Pass 2 Shipping & Logistics simplification authorized for Deployment.

---

## Worker Start Protocol

1. Read this file.
2. Confirm the current repository `main` SHA and the current accepted production application SHA.
3. Read the controlling handoff/decision for the relevant workstream.
4. Confirm scope boundaries and parked work.
5. Work only inside the approved scope.
6. Use preview/staging before production when required.

## Worker Finish Protocol

Before handing work back, record or report parent SHA, resulting SHA/branch/PR, files changed, deployment/preview URL, tests, regressions, blockers, deferred work, production state, rollback reference, and next action. Update this status file or provide an exact status block for Master Coordination.

---

# Current Project Status

## Website / Deployment

**State:** ACTIVE / CONTROLLED RELEASES

**Current accepted production application SHA:** `d4476ca43760930bf759d470931665a94b3d063c`

**Latest production deployment:** `https://9755cd4f.elevationupscales.pages.dev`

**Latest verified preview:** `https://111e887b.elevationupscales.pages.dev`

**Verification run:** GitHub Actions `33232727325` — PASS.

**Rollback baseline:** `baseline-2026-08-28-admin-portal-pass1`

**Active deployment handoff:** `coordination/handoffs/2026-08-28-admin-portal-pass2-shipping-logistics-simplification.md`

**Release rule:** small controlled patch → preview → verify → production → verify → baseline → stop. Management gates still apply when a controlling handoff explicitly requires one.

**Do not:** stack unrelated fixes, reopen completed repairs, or mix Portal code into Website.

---

## Hawaii Lithium Program

**State:** PHASE 2 PRODUCTION / COST + LOGISTICS HARDENED / COMMERCIAL PILOT ACTIVE

**Foundation:** Phase 1 CLOSED; Phase 1.2 integrated; Phase 2 controls deployed to production.

**Current controls include:** exact Catalog/SKU/supplier identity; manufacturer/model and origin fields; supplier inventory confirmation/recheck states; UN 38.3/document/packaging review controls; server-side route approval blockers; reservation aging/contact/reconfirmation; batch-line compatibility checks; READY TO COMMIT / BOOKED no-go gates; landed direct-cost/gross-contribution fields; demand-quality separation; conservative public Hawaii status language; supplier cost > $0 requirement; non-zero Hawaii freight economics requirement; and incomplete economics returning null/incomplete rather than artificial profit.

**Owner-interface decision:** preserve the backend controls, but retire `Lithium Shipping Matrix` as the primary owner-facing concept. Shipping operations move to a simplified `Shipping & Logistics` owner workflow while Catalog, Inventory, Orders, and Mission Control retain their natural responsibilities.

**Decision:** `coordination/decisions/DEC-004-retire-lithium-matrix-owner-ui.md`

**Business objective:** prove a repeatable, financially sensible, customer-safe exact-SKU Hawaii lithium lane with real delivered costs and customer outcome.

**Next action:** simplify the Admin owner workflow without weakening any shipping/no-go gates; continue commercial pilot after Pass 2.

---

## Elevation Commerce

**State:** PRIMARY SCALE ENGINE

**Public retail lanes:** RV & Outdoor, Lithium, Hawaii Lithium Program, Apparel, Collector.

**Permanent boundary:** Elevation Store products are company retail inventory. Marketplace items are independent/community seller listings. Never merge the two systems or use “Marketplace” as a generic synonym for store catalog.

**Catalog rule:** Catalog Manager remains the commerce product source of truth. Do not create duplicate inventory/catalog databases for Hawaii, Solar Builder, or other storefronts.

---

## Inventory / Catalog Operations

**State:** PASS / SUPPLIER-COST TRUTH HARDENED

**Owner-view baseline:** 11 total Catalog records: 8 published and 3 HOLD. Supplier-managed/dropship products correctly keep physical `On Hand`, `Reserved`, and `Available` separate from supplier availability.

**2026-08-28 production repair:** known Doba records with stored `cost_cents <= 0` received an idempotent backfill from the last-known 2026-08-28 supplier snapshot. Existing non-zero costs are never overwritten.

**Freshness rule:** backfilled values are last-known supplier costs, not a promise of current Doba pricing. Recheck supplier price and inventory before supplier purchase/commitment.

**Prevention:** active Doba Inventory items cannot be created/edited with zero supplier cost; Doba Catalog imports cannot stay published with missing/zero supplier cost; Catalog upserts preserve existing supplier cost when omitted; Inventory summary is `Physical Inventory Cost`; supplier-managed products are never converted into fake physical stock.

**Current Catalog state from owner view:**
- 8 published products
- 3 HOLD products
- Gazebo HOLD — conflicting prior inventory snapshots
- Lawn Sweeper HOLD — SKU mismatch + prior inventory sync failure
- 3×3 Tent HOLD — price mismatch
- all 11 rows now show non-zero supplier cost
- Catalog audit records the supplier cost backfill

**Next action:** normal operations. Resolve HOLD items only from current supplier evidence; recheck supplier cost/stock at purchase time.

---

## Marketplace

**State:** ACTIVE / SEPARATE FROM STORE

**Role:** independent seller listings, audience, buyer/seller signals, and lead generation.

**Do not:** present Marketplace seller inventory as Elevation-owned retail stock.

---

## Solar Builder

**State:** HEALTHY / PRESERVE

**Current role:** education, system planning, and lead generation.

**Near-term rule:** preserve current calculations/caveats. Use stable Catalog IDs/SKUs for future-facing hooks only when needed.

**Do not:** create a separate product database.

---

## Mission Control / Admin

**State:** PASS 1 DEPLOYED / PASS 2 AUTHORIZED

**Accepted Admin application baseline:** `d4476ca43760930bf759d470931665a94b3d063c`

**Pass 1:** global Admin navigation reorganized into `Daily Operations`, `Commerce`, `Shipping`, `Marketplace`, and `Insights & System`; existing routes/data models preserved; black/gold visual layer added; oversized headers/actions compacted; stronger section/table/filter hierarchy introduced; Marketplace remains separate from Elevation Store/Commerce.

**Pass 2 controlling handoff:** `coordination/handoffs/2026-08-28-admin-portal-pass2-shipping-logistics-simplification.md`

**Pass 2 owner direction:**
- replace the owner-facing `Lithium Shipping Matrix` concept with `Shipping & Logistics`;
- preserve `/admin-lithium-shipping` route compatibility;
- preserve all Hawaii backend gates/data;
- Catalog = product identity;
- Inventory = supplier cost/stock/origin;
- Store Orders = paid customer order/fulfillment;
- Shipping & Logistics = route/freight/reservations/batches/blockers;
- Mission Control = action-required summary only;
- use progressive disclosure for technical/compliance fields instead of giant default forms.

**Decision:** `coordination/decisions/DEC-004-retire-lithium-matrix-owner-ui.md`

**Next action:** Deployment implements Pass 2 from the accepted Pass 1 baseline/current `main`, verifies preview + production, creates a receipt/baseline, and stops.

---

## Technician Portal

**State:** SEPARATE SYSTEM

**Boundary:** Portal remains separate from Website/Admin public-site code and deployment scope unless explicitly named.

---

## Business Plan / Strategy

**State:** ELEVATION 4.3 — REVENUE & OPERATIONS PHASE

**Current strategic posture:** protect working infrastructure, consolidate systems, prioritize revenue, improve fulfillment, reduce workload, track actual results, and scale only where demand proves the opportunity.

**Hawaii commercialization rule:** software completion does not prove the market. Commercial proof is a completed exact-SKU lane with actual delivered cost, customer outcome, transit time, operating burden, and gross contribution reconciled after delivery.

---

# Cross-Worker Rules

- One source of truth per business object.
- Current accepted production beats old handoff intent.
- Newest explicit owner/management decision beats superseded instructions.
- Public copy must not expose internal workflow/deployment language.
- Planned capability must not be represented as already operational.
- Marketplace remains separate from Elevation-owned Store commerce.
- Exact-SKU shipping eligibility must never be generalized to an entire battery class or all Hawaii destinations.
- Supplier-managed inventory must not be represented as physically on hand.
- Missing/zero supplier cost must never be interpreted as free inventory, zero landed cost, or valid margin.
- Last-known supplier cost is not a current supplier quote; recheck before ordering.
- Future Admin work builds forward from the accepted Pass 1 organization/visual baseline.
- Simplifying the Shipping & Logistics UI must never weaken Hawaii backend/no-go controls.
- When a task is complete, produce evidence and stop; do not automatically continue into adjacent work.

---

# Coordination File Structure

- `ELEVATION_4_3_MASTER_STATUS.md` — current truth / active work / next actions
- `coordination/WORKER_PROTOCOL.md` — required start/finish behavior
- `coordination/handoffs/` — approved detailed work instructions
- `coordination/receipts/` — completed verification/deployment/audit receipts
- `coordination/decisions/` — durable strategic/architecture decisions

Master Coordination owns conflict resolution and updates to this control plane.
