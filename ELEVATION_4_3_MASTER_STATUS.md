# Elevation UpScales, Inc. — Elevation 4.3 Master Status

**Purpose:** Canonical cross-worker coordination record for the Elevation 4.3 project.

**Operating rule:** Every worker must read this file before beginning work and update the appropriate section when completing or handing off work. This file answers **what is true right now**. Detailed instructions live in handoffs; completed evidence lives in receipts; durable business/architecture choices live in decisions.

**Authority:** Newest accepted production state + explicit owner/management decisions control. Do not revive superseded plans because an older chat or handoff contains them.

**Last status update:** 2026-08-28 — supplier-cost / logistics production repair completed.

---

## Worker Start Protocol

1. Read this file.
2. Confirm the current repository `main` SHA and the current accepted production application SHA.
3. Read the controlling handoff/decision for the relevant workstream.
4. Confirm scope boundaries and parked work.
5. Work only inside the approved scope.
6. Use preview/staging before production when required.

## Worker Finish Protocol

Before handing work back, record or report:

- parent SHA
- resulting SHA / branch / PR
- files changed
- deployment/preview URL when applicable
- tests run and results
- regressions checked
- blockers/anomalies
- deferred work
- production state
- rollback reference
- next action

Update this status file or provide an exact status block for Master Coordination to merge into it.

---

# Current Project Status

## Website / Deployment

**State:** ACTIVE / CONTROLLED RELEASES

**Current accepted production application SHA:** `0c4d4c5131aeb68f6afcd2967973ebababbfa0fa`

**Production deployment for latest application repair:** `https://22b7f943.elevationupscales.pages.dev`

**Latest verified preview:** `https://259ff273.elevationupscales.pages.dev`

**Verification run:** GitHub Actions `33232283625` — PASS.

**Release rule:** small controlled patch → preview → verify → production → verify → baseline → stop. Management gates still apply when a controlling handoff explicitly requires one.

**Do not:** stack unrelated fixes, reopen completed repairs, or mix Portal code into Website.

---

## Hawaii Lithium Program

**State:** PHASE 2 PRODUCTION / COST + LOGISTICS HARDENED / COMMERCIAL PILOT ACTIVE

**Foundation:** Phase 1 CLOSED; Phase 1.2 integrated; Phase 2 controls deployed to production before this latest repair.

**Latest production hardening:** supplier-cost truth and logistics economics repair at application SHA `0c4d4c5131aeb68f6afcd2967973ebababbfa0fa`.

**Current controls include:**
- exact Catalog/SKU/supplier identity
- manufacturer/model and origin fields
- supplier inventory confirmation/recheck states
- UN 38.3/document/packaging review controls
- server-side route approval blockers
- reservation aging/contact/reconfirmation
- batch-line compatibility checks
- READY TO COMMIT / BOOKED no-go gates
- landed direct-cost / gross-contribution fields
- demand quality separation
- conservative public Hawaii status language
- supplier cost > $0 requirement before a route can become APPROVED
- non-zero Hawaii freight quote/ocean freight requirement before route approval
- batch commitment blocked when Catalog or route supplier cost is missing/zero
- batch economics return incomplete/null rather than artificial profit when cost/freight data is missing

**Business objective:** prove a repeatable, financially sensible, customer-safe exact-SKU Hawaii lithium lane with real delivered costs and customer outcome.

**Next action:** operate the pilot and prove one exact-SKU lane. Do not broaden Hawaii claims merely because the software is complete.

---

## Elevation Commerce

**State:** PRIMARY SCALE ENGINE

**Public retail lanes:** RV & Outdoor, Lithium, Hawaii Lithium Program, Apparel, Collector.

**Permanent boundary:** Elevation Store products are company retail inventory. Marketplace items are independent/community seller listings. Never merge the two systems or use “Marketplace” as a generic synonym for store catalog.

**Catalog rule:** Catalog Manager remains the commerce product source of truth. Do not create duplicate inventory/catalog databases for Hawaii, Solar Builder, or other storefronts.

---

## Inventory / Catalog Operations

**State:** PASS / SUPPLIER-COST TRUTH HARDENED

**Owner-view baseline:** 11 total Inventory records; current Active filter previously showed 8 active Doba dropship records. Supplier-managed/dropship products correctly keep physical `On Hand`, `Reserved`, and `Available` separate from supplier availability.

**2026-08-28 production repair:** known Doba records with stored `cost_cents <= 0` now receive an idempotent backfill from the last-known 2026-08-28 supplier snapshot. Existing non-zero costs are never overwritten by this repair.

**Important freshness rule:** backfilled values are last-known supplier costs, not a promise of current Doba pricing. Recheck supplier price and inventory before supplier purchase/commitment.

**Prevention:**
- an active Doba Inventory item can no longer be created/edited with a zero supplier cost;
- a Doba Catalog import/upsert cannot remain `published` with missing/zero supplier cost — it is forced to HOLD/review;
- Catalog upserts preserve an existing supplier cost when an update payload omits cost;
- the Inventory summary label is now `Physical Inventory Cost`, meaning tracked available units × unit cost;
- supplier-managed items are not converted into fake physical stock.

**Auditability:** cost backfill records a Catalog event and attempts an Inventory event using actor `system-cost-reconcile` and a note that supplier cost must be rechecked before purchase.

**Production verification:** RV public Catalog remained healthy with 8 published RV/Outdoor products after the cost backfill trigger.

**Next action:** normal operations. Recheck supplier cost/stock at purchase time; do not treat stored supplier cost as permanently current.

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

**Future direction:** education + system planning + compatible Elevation products + quote/cart/pro review.

**Do not:** create a separate product database.

---

## Mission Control / Admin

**State:** PHASE 3 COMMAND CENTER DEPLOYED / FURTHER BROAD EXPANSION CONTROLLED

**Current role:** action-required summaries, leads, commerce/admin visibility, seller/fulfillment/analytics coordination.

**Hawaii rule:** Mission Control shows actionable Hawaii summaries; detailed lithium records remain in Lithium Shipping Matrix / Hawaii Shipping Batches.

**Do not:** start additional broad Admin/Seller/Fulfillment/Analytics redesign work unless explicitly authorized as a new phase.

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
- Exact-SKU shipping eligibility must never be generalized to an entire battery class or all Hawaii destinations.
- Supplier-managed inventory must not be represented as physically on hand.
- Missing/zero supplier cost must never be interpreted as free inventory, zero landed cost, or valid margin.
- Last-known supplier cost is not a current supplier quote; recheck before ordering.
- Hawaii route approval requires real supplier cost plus real Hawaii freight economics and required compliance/provider controls.
- When a task is complete, produce evidence and stop; do not automatically continue into adjacent work.

---

# Coordination File Structure

- `ELEVATION_4_3_MASTER_STATUS.md` — current truth / active work / next actions
- `coordination/WORKER_PROTOCOL.md` — required start/finish behavior
- `coordination/handoffs/` — approved detailed work instructions
- `coordination/receipts/` — completed verification/deployment/audit receipts
- `coordination/decisions/` — durable strategic/architecture decisions

Master Coordination owns conflict resolution and updates to this control plane.
