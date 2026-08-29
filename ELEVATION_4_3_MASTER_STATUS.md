# Elevation UpScales, Inc. — Elevation 4.3 Master Status

**Purpose:** Canonical cross-worker coordination record for the Elevation 4.3 project.

**Operating rule:** Every worker must read this file before beginning work and update the appropriate section when completing or handing off work. This file answers **what is true right now**. Detailed instructions live in handoffs; completed evidence lives in receipts; durable business/architecture choices live in decisions.

**Authority:** Newest accepted production state + explicit owner/management decisions control. Do not revive superseded plans because an older chat or handoff contains them.

**Last coordination reset:** 2026-08-28

---

## Worker Start Protocol

1. Read this file.
2. Confirm the current authoritative SHA before touching code.
3. Read the controlling handoff named in the relevant workstream.
4. Confirm scope boundaries and parked work.
5. Work only inside the approved scope.
6. Use preview/staging before production when the controlling handoff requires it.

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

**Current authoritative application baseline before coordination-only commits:** `893877b4d2d36d6c7de66837ea1b784e2486f5cf`

**Coordination commits after that baseline do not by themselves authorize a production application promotion.** Workers must confirm the current repository SHA and the current accepted production SHA separately before deployment.

**Release rule:** small controlled patch → preview → verify → management gate when required → production → verify → baseline → stop.

**Do not:** stack unrelated fixes, reopen completed repairs, or mix Portal code into Website.

**Next action:** Hawaii Lithium Phase 2 closeout preview/build under its controlling handoff.

---

## Hawaii Lithium Program

**State:** PHASE 2 BUILD AUTHORIZED / PRODUCTION PROMOTION HOLD

**Foundation:** Phase 1 CLOSED; Phase 1.2 integrated.

**Authoritative application parent:** `893877b4d2d36d6c7de66837ea1b784e2486f5cf` or accepted application descendant. Coordination-only commits do not change the production gate.

**Controlling handoff:** `Elevation_UpScales_Hawaii_Lithium_Phase2_FINAL_CLOSEOUT_DEPLOYMENT_INSTRUCTIONS_2026-08-28.md`

**Supporting management overlay:** current Business Plan Manager 20 consolidated Hawaii Lithium Phase 2 handoff.

**Business objective:** prove a repeatable, financially sensible, customer-safe exact-SKU Hawaii lithium lane.

**Current scope:**
- exact SKU / origin controls
- supplier inventory truth
- evidence / route gates
- reservation aging and reconfirmation
- batch compatibility / no-go controls
- landed direct cost / gross contribution
- clean public copy and factual education
- Mission Control action summaries only
- Solar Builder regression / minor company-language cleanup only

**Production:** HOLD until the pre-production verification receipt is accepted by Master Coordination / management.

**Parked:** full Admin overhaul, Seller overhaul, Fulfillment overhaul, broad Analytics overhaul, full Solar Builder commerce engine.

**Next action:** Deployment builds remaining closeout scope → preview → complete pre-production receipt → STOP for management review.

---

## Elevation Commerce

**State:** PRIMARY SCALE ENGINE

**Public retail lanes:** RV & Outdoor, Lithium, Hawaii Lithium Program, Apparel, Collector.

**Permanent boundary:** Elevation Store products are company retail inventory. Marketplace items are independent/community seller listings. Never merge the two systems or use “Marketplace” as a generic synonym for store catalog.

**Catalog rule:** Catalog Manager remains the commerce product source of truth. Do not create duplicate inventory/catalog databases for Hawaii, Solar Builder, or other storefronts.

---

## Inventory / Catalog Operations

**State:** OPERATIONAL UI / DATA-QUALITY FOLLOW-UP REQUIRED

**Owner-view audit evidence — 2026-08-28:** Inventory page shows 11 total records, with the current Active filter displaying 8 active Doba dropship records. All 8 active displayed items are supplier-managed/dropship, so physical `On Hand`, `Reserved`, and `Available` totals of 0 are expected and should not be interpreted as the supplier having zero stock.

**Important distinction:** Inventory `On Hand` represents Elevation-physically-tracked stock. Supplier-managed availability is a separate concept and must not be inferred from the physical stock counters.

**Open data-quality issue:** the 8 displayed Doba rows currently show `Unit Cost $0.00`. This does not match prior supplier cost snapshots for these products and must be reconciled from current supplier/source records before cost, landed-cost, margin, or Hawaii batch economics rely on Inventory cost data.

**Inventory Cost summary:** the top `Inventory Cost` metric is defined as physically available tracked units × unit cost. Because the visible items are supplier-managed, `$0.00` for this summary is structurally expected even after supplier unit-cost fields are corrected. If management needs supplier-managed catalog cost exposure, add a separate metric rather than changing the meaning of physical inventory value.

**Audit trail:** owner view currently shows `No inventory changes yet.` Treat as informational until verified whether the existing records were seeded/imported outside the Inventory mutation event path. Do not call it a production defect without confirming the backend event history.

**Next action:** reconcile current Doba supplier costs for the 8 active records, preserve supplier-managed mode, and verify that Catalog/Hawaii landed-cost calculations do not consume zero/missing supplier cost as if it were a real cost.

**Do not:** convert supplier-managed dropship items into fake physical stock merely to make On Hand/Available counters nonzero.

---

## Marketplace

**State:** ACTIVE / SEPARATE FROM STORE

**Role:** independent seller listings, audience, buyer/seller signals, and lead generation.

**Do not:** present Marketplace seller inventory as Elevation-owned retail stock.

**Next action:** no broad rebuild unless explicitly authorized.

---

## Solar Builder

**State:** HEALTHY / PRESERVE

**Current role:** education, system planning, and lead generation.

**Near-term rule:** regression-test and preserve current calculations/caveats. Use stable Catalog IDs/SKUs for future-facing hooks only when needed.

**Future direction:** education + system planning + compatible Elevation products + quote/cart/pro review.

**Do not:** rebuild the Builder or create a separate product database during Hawaii Phase 2 closeout.

---

## Mission Control / Admin

**State:** OPERATIONAL / BROAD OVERHAUL PARKED

**Role:** action-required summaries, leads, operations, commerce/admin visibility.

**Hawaii rule:** Mission Control shows actionable Hawaii summaries only; detailed lithium records stay in Lithium Shipping Matrix / Hawaii Shipping Batches.

**Do not:** begin full Admin/Seller/Fulfillment/Analytics overhaul without explicit authorization.

---

## Technician Portal

**State:** SEPARATE SYSTEM

**Boundary:** Portal remains separate from Website/Admin public-site code and deployment scope unless explicitly named.

---

## Business Plan / Strategy

**State:** ELEVATION 4.3 — REVENUE & OPERATIONS PHASE

**Current strategic posture:** protect working infrastructure, consolidate systems, prioritize revenue, improve fulfillment, reduce workload, track actual results, and scale only where demand proves the opportunity.

**Hawaii commercialization rule:** software completion does not prove the market. The commercial proof is a completed exact-SKU lane with actual delivered cost, customer outcome, transit time, operating burden, and gross contribution reconciled after delivery.

---

# Cross-Worker Rules

- One source of truth per business object.
- Current accepted production beats old handoff intent.
- Newest explicit owner/management decision beats superseded instructions.
- Public copy must not expose internal workflow/deployment language.
- Planned capability must not be represented as already operational.
- Exact-SKU shipping eligibility must never be generalized to an entire battery class or all Hawaii destinations.
- Production promotion requires the gate defined by the controlling handoff.
- Supplier-managed inventory must not be represented as physically on hand.
- Missing/zero supplier cost must not be interpreted as free inventory or zero landed cost.
- When a task is complete, produce evidence and stop; do not automatically continue into adjacent parked work.

---

# Coordination File Structure

- `ELEVATION_4_3_MASTER_STATUS.md` — current truth / active work / next actions
- `coordination/WORKER_PROTOCOL.md` — required start/finish behavior
- `coordination/handoffs/` — approved detailed work instructions
- `coordination/receipts/` — completed verification/deployment/audit receipts
- `coordination/decisions/` — durable strategic/architecture decisions

Master Coordination owns conflict resolution and updates to this control plane.
