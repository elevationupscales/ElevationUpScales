# Elevation UpScales — eBay Store Operations Current Worktree

**Status:** ACTIVE WORKTREE / P0 PARALLEL CUSTOMER + CASH RECOVERY / PROFITABILITY CONTRACTION APPROVED  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Parent:** Company Operations / Ecommerce & Vendor Operations  
**Reporting Manager:** Peter Torres — Ecommerce & Vendor Operations Manager  
**Primary Worker:** eBay Store Operations Worker / Specialist  
**Worker State:** ACTIVE — authenticated Seller Hub read/recon is verified; consequential Seller Hub mutations require an action-capable authenticated surface  
**Lane SOP:** `EBAY_STORE_OPERATIONS_SOP_V1_0.md`  
**Worker Prompt:** `EBAY_STORE_OPERATIONS_WORKER_PROMPT_V1_0.md`  
**Recovery RECON:** `EBAY_RECOVERY_RECON_2026-09-11.md`  
**Source Economics RECON:** `EBAY_SOURCE_ECONOMICS_RECON_2026-09-11.md`  
**Authenticated PM4 Delta:** `PM4_EBAY_AUTHENTICATED_RECOVERY_DELTA_2026-09-11.md`  
**PM4 Specialist Handoffs:** `PM4_TO_EBAY_SPECIALIST_HANDOFF_2026-09-11.md`; `EBAY_PM4_TO_STORE_SPECIALIST_HANDOFF_2026-09-11.md`  
**Profitability Decision:** `PM4_EBAY_PROFITABILITY_STREAMLINE_MANAGEMENT_DECISION_2026-09-11.md`  
**Company Profitability Control:** `PROFITABILITY_RECOVERY_WORKFLOW_V1_0.md`

## Reconciliation note

This Current Worktree supersedes the earlier startup state that said authenticated Seller Hub was unavailable. PM4 subsequently verified authenticated Seller Hub through the Opera Browser Connector and handed active execution back to the dedicated eBay specialist.

The available Opera connection supports authenticated reading/navigation and verified Seller Hub evidence. It did not expose a supported click/submit control for consequential cancellation/refund/listing mutations during PM4's run. Therefore:

**AUTHENTICATED EVIDENCE IS AVAILABLE → DECISIONS MAY ADVANCE → ONLY THE UNSUPPORTED MUTATION IS GATED.**

Do not turn that bounded execution-surface gate back into a blanket eBay authentication blocker.

## Objective

Recover current customer obligations and held cash first, stop new loss-making orders, contract the store to a small verified profitable core, preserve useful demand history, and scale only after actual positive contribution and clean fulfillment.

**CUSTOMER FIRST → CASH RELEASE → STOP NEW LOSSES → VERIFY SOURCE + ECONOMICS → KEEP ONLY EXECUTABLE POSITIVE-CONTRIBUTION LISTINGS → RECORD ACTUALS → SCALE WINNERS.**

## Current authenticated account state

PM4's authenticated Seller Hub recon established the following current management evidence:

- Total sales: **$485.29** in the then-current 31-day view.
- Net sales: **$386.53** before supplier/product cost.
- eBay selling costs: approximately **$66.39 / 14% of gross sales**.
- Impressions: **104,797**.
- Listing views: **900**.
- CTR: **0.8%**.
- Sales conversion: **1.6%**.
- Seller level: **Above Standard**.
- Next evaluation shown: **2026-09-20**.
- Transaction defects: **2 of 7**.
- Tracking uploaded on time/validated: **7 of 7**.
- Cases closed without seller resolution: **0 of 7**.
- Payments showed **8 held rows**, previously reconciled at **$242.79** total.

These figures are a dated operational snapshot, not permanent metrics. Refresh Seller Hub before using them for a new consequential decision.

## P0 customer / cash recovery queue

| Order | Current verified state | Economic / source state | Next action |
|---|---|---|---|
| `10-15134-90489` — weed wacker | **CANCELLATION PROCESSING / TERMINAL REFUND VERIFICATION OPEN** | Known Doba source candidate exceeds the $49.98 sale before fees. No rescue order. | Recheck terminal canceled/refunded state through authenticated Seller Hub. If a supported action remains required, use an action-capable authenticated eBay surface. Then end/drop the failed listing configuration. |
| `25-15104-41137` — folding bed | **AWAITING SHIPMENT / OVERDUE / NO TRACKING VISIBLE IN AUTHENTICATED RECON** | Known source economics fail the operating screen; no Doba order/shipment confirmation found in the fresh correspondence pass. | Reverify exact source once at execution time. If no valid already-executed shipment exists, follow customer-recovery controls rather than placing an uneconomic late rescue order. |
| `07-15141-13062` — folding bed | **AWAITING SHIPMENT / OVERDUE / NO TRACKING VISIBLE IN AUTHENTICATED RECON** | Same listing/SKU family as the other folding-bed order; no Doba order/shipment confirmation found. | Maintain this as its own transaction row. Reverify exact source; resolve customer obligation without inventing tracking or creating known negative economics. |
| `20-15123-05140` — VEVOR spotlight/flashlight | **AWAITING SHIPMENT / NO TRACKING VISIBLE IN AUTHENTICATED RECON** | Historical sale/source economics fail; preserved MAP evidence was also unfavorable. No Doba order/shipment confirmation found. | Resolve customer obligation first. If no valid shipment/source execution exists, follow cancellation/refund/customer-update controls through an action-capable surface, then end/hold the failed listing configuration. |
| `02-15170-43443` — back-seat organizer | **PAID / CURRENT / SHIP-BY SEP 16 / ADD TRACKING AVAILABLE** | Exact Doba source is known; current authenticated account cost remained unresolved in PM4. 30% source-cost ceiling at the sale is **$17.03**; 35% preferred **$15.81**. | Obtain exact current Doba landed/account cost. Fulfill only if expected contribution is positive and source execution is clean; otherwise protect the customer and control the listing. |
| `12-15143-03510` — cot | **SHIPPED / TRACKING VERIFIED / DELIVERY MONITOR ONLY** | Shipped economics were thin (~20.1% pre-fee from recovered actuals), below the Phase 1 screen. | Do not cancel or duplicate tracking. Monitor delivery/payout only and rebuild/reprice before further sales at the same economics. |
| `23-15100-64483` — refunded cot | **CLOSED / REFUNDED** | Customer refund evidence supports closure. | Do not reopen absent a genuine new customer/payment exception. |

No tracking, shipment, cancellation, refund, listing mutation, or supplier purchase may be invented from absence of evidence.

## Phase 1 profitability controls — approved

PM4 accepted the profitability streamline and returned execution to this specialist lane.

1. Use **approximately 12 active revenue listings as a Phase 1 maximum, not a quota**. Fewer is acceptable.
2. **30% pre-fee gross margin is the hard working minimum**; **35%+ preferred**.
3. Final keep/list/scale authorization also requires **positive expected contribution after eBay fees, supplier shipping/freight, promoted-listing fees, discounts/credits and other variable order costs**.
4. Promoted listings are **OFF BY DEFAULT**. An exact listing may be promoted only when the modeled ad rate is included and contribution remains positive.
5. Preserve useful sales/watchers/history where a profitable rebuild is plausible; do not keep a failed configuration merely to preserve listing count.
6. Customer obligations outrank catalog cleanup.
7. Do not cancel a verified shipped/tracked order and do not duplicate tracking.

## Approved stop-new-loss controls

After checking the exact open-order dependency:

- weed wacker listing `168634712408` → quantity zero/preserve until cancellation is terminal, then end/drop current configuration;
- folding bed/cot listing `168634722813` → quantity zero while customer obligations are resolved, then rebuild source/price before new sales;
- VEVOR spotlight listing `168631043193` → quantity zero / no new order under failed economics;
- back-seat organizer listing `168634275726` → remain quantity zero until exact landed cost and contribution pass.

The nine exact-screened Phase 1 candidates recorded in `EBAY_PHASE1_COST_SCREEN_BATCH_2026-09-11.md` are approved for their recorded `END / REBUILD` or `END / HOLD` dispositions after checking immediate open-order dependencies.

Three high-signal candidates remain `HOLD / VERIFY` until exact source/economics clear:

- RV Mattress — item `168633077471`;
- Patio Gazebo 10x20 — item `168633889386`;
- VEVOR 50W Solar Charger + MPPT — item `168634158033`.

## Doba and direct-vendor source control

Current Owner/PM4 rule:

**Doba-backed marketplace sourcing does not require separate direct-manufacturer eBay authorization solely because of the underlying brand.**

A Doba-backed eBay offer still requires:

**EXACT SKU → EBAY ALLOWED → MAP/PRICE COMPLIANT → INVENTORY → DESTINATION → LANDED COST → POSITIVE CONTRIBUTION → FULFILLMENT RELIABILITY.**

Doba is not blanket inventory authority and is not automatically the best source. Keep it where it wins the verified economic/reliability comparison.

Direct-manufacturer sourcing is a separate path. Do not silently switch a listing from Doba to direct VEVOR, Renogy, SOK, Kingboss, or another manufacturer without the applicable direct marketplace/channel authority and exact source controls.

## Hawaii / freight lithium protection

The four Hawaii freight lithium listings identified by the eBay profitability recon are **excluded from generic parcel-listing purge or modification solely under this contraction work**.

Route their disposition through Hawaii Lithium / Shipping & Logistics for exact verification of source, inventory, DG/compliance package, freight route/batch economics, customer-facing configuration, live authorization and expected contribution.

Do not treat those listings as ordinary Doba parcel products.

## Current execution sequence

**GIT FIRST → CUSTOMER ORDERS FIRST → CASH RELEASE → APPLY APPROVED STOP-LOSS CONTROLS → EXECUTE APPROVED FAILED-CANDIDATE DISPOSITIONS → VERIFY 3 REMAINING HIGH-SIGNAL CANDIDATES → PURGE TRUE ZERO-DEMAND/NO-ADVANTAGE LISTINGS → VERIFY ACTIVE CORE COUNT → RECORD NEW BASELINE.**

Where an eBay mutation cannot be executed through the currently available authenticated connector:

- preserve the exact action, order/listing ID, current evidence and required outcome;
- mark only that mutation `OPEN TASK / ACTION SURFACE REQUIRED`;
- continue every non-destructive authenticated/source/economics action that remains executable;
- do not route PM4 back into duplicate operational execution.

## Historical evidence preserved

Earlier startup/public-recon statements that said Seller Hub authentication was unavailable are **historical only** and are superseded by PM4's authenticated Seller Hub receipts and active specialist handoff.

Use these records for chronology/evidence rather than replaying old blockers:

- `EBAY_RECOVERY_RECON_2026-09-11.md`
- `EBAY_SOURCE_ECONOMICS_RECON_2026-09-11.md`
- `PM4_EBAY_AUTHENTICATED_RECOVERY_DELTA_2026-09-11.md`
- `EBAY_PROFITABILITY_RECOVERY_RECON_2026-09-11.md`
- `EBAY_PHASE1_CORE_SELECTION_EXECUTION_2026-09-11.md`
- `EBAY_PHASE1_LIVE_CANDIDATE_SKU_SNAPSHOT_2026-09-11.md`
- `EBAY_PHASE1_COST_SCREEN_BATCH_2026-09-11.md`
- `EBAY_CASH_RELEASE_BOARD_2026-09-11.md`
- `EBAY_CONTRACTION_BATCH_01_2026-09-11.md`
- `EBAY_STORE_CONTRACTION_AND_DIRECT_SOURCE_REBUILD_2026-09-11.md`
- `PM4_TO_EBAY_SPECIALIST_HANDOFF_2026-09-11.md`
- `EBAY_PM4_TO_STORE_SPECIALIST_HANDOFF_2026-09-11.md`
- `PM4_EBAY_PROFITABILITY_STREAMLINE_MANAGEMENT_DECISION_2026-09-11.md`

## Close / maturity condition

Phase 1 eBay recovery is complete when:

- every current customer obligation is terminally resolved or cleanly shipped/tracked;
- held-cash blockers are cleared or isolated as true external waits;
- known failed-economics configurations cannot create another order;
- active revenue listings are contracted to a small exact-source, executable, positive-contribution core;
- actual contribution is recorded on new orders;
- profitable listings fulfill cleanly enough to scale from evidence rather than gross sales.

## Control phrase

**CUSTOMER FIRST → CASH RELEASE → STOP NEW LOSSES → KEEP ONLY EXECUTABLE POSITIVE-CONTRIBUTION LISTINGS → PRESERVE USEFUL DEMAND HISTORY → SCALE AFTER ACTUAL PROFIT.**