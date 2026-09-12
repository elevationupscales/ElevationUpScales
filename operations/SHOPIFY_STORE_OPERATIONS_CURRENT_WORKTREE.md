# Elevation UpScales — Shopify Store Operations Current Worktree

**Status:** ACTIVE / CURRENT STATE RECONCILED / FIRST PROFITABLE DIRECT-SITE ORDER OPEN  
**Date:** 2026-09-12  
**Owner:** Casey Young  
**Parent:** Company Operations / Ecommerce & Vendor Operations  
**Reporting Manager:** Peter Torres — Ecommerce & Vendor Operations Manager  
**Primary Worker:** Shopify Store Operations Worker  
**Worker State:** ACTIVE  
**Lane SOP:** `SHOPIFY_STORE_OPERATIONS_SOP_V1_0.md`  
**Worker Prompt:** `SHOPIFY_STORE_OPERATIONS_WORKER_PROMPT_V1_0.md`  
**P0 Coding/Deployment Control:** `MANAGEMENT_CODING_REPAIR_PLAN_2026-09-12.md` + `CODING_STABILIZATION_CURRENT_WORKTREE_2026-09-12.md`  
**Owner Paid-Acquisition Control:** `OWNER_DIRECTIVE_NO_PAID_ADS_UNTIL_CAPITAL_RECOVERY_2026-09-12.md`

## Current objective

Build repeatable profitable direct-site commerce through the existing Shopify store without duplicating vendor management, marketing or development work.

Current commercial target:

**FIRST PROFITABLE ELEVATION DIRECT-SITE ORDER → CORRECT FULFILLMENT → ACTUAL CONTRIBUTION RECEIPT → REPEATABLE PROFITABLE SALES FLOW**

## Current verified control state

- Shopify storefront is public.
- Native Shopify cart/checkout is working from the latest verified acceptance state.
- Custom Elevation/PayPal checkout remains an accepted working purchase path.
- No synthetic paid order should be manufactured.
- First real direct-site paid order remains open.
- Checkout availability is not the primary current blocker; qualified traffic/conversion to economically cleared offers remains the operating bottleneck from the latest connected evidence.
- `DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md` remains mandatory for traffic assignment.
- Paid acquisition is **HOLD company-wide** until the verified capital-recovery hole is closed and Casey explicitly reopens paid acquisition.
- Website code is under the active P0 coding/deployment stabilization freeze. Shopify operations may continue; required website-code mutations route to PM4 and the coding-stabilization Worktree rather than directly to MASTER DEVELOPER.

## Current vendor truth consumed by Shopify

### SOK

- protected reference direct-site battery lane;
- existing SOK Project/workflow remains controlling;
- no sweep-driven rebuild/reprice/deactivation;
- Shopify consumes current SOK source truth rather than recreating it.

### VEVOR

Current controlling pickup: `VEVOR_CURRENT_WORKTREE.md`.

- 19 A-tier products live;
- 17/17 qualified B-tier records ACTIVE/media-complete;
- current 10-SKU first-sale fresh-check is COMPLETE;
- seven shortlist SKUs remain sellability/stock holds;
- **three exact SKUs are already `PROMOTE — FREE/OWNED TRAFFIC ONLY`:**
  - `XXKLJT124INCLJF0QV0` — Camper Levelers — $39.90;
  - `AXLSTCQJDSYKAZ99C001V0` — A-Frame Trailer Jack — $54.90;
  - `D25FT14IN20AHOGLOV1` — 25-ft Electric Drain Auger — $66.90;
- `XXHGJFRSZWXDOY5PFV1` — Portable Shoe Dryer — ACTIVE at $19.90 but **HOLD TRAFFIC — ECONOMICS UNKNOWN**;
- supplier economics email reply is not a WAIT state;
- do not rerun the completed 10-SKU current-window check without a material refresh trigger.

Shopify action:

**PRESERVE THREE RELEASED PRODUCTS → SUPPORT EXISTING FREE/OWNED TRAFFIC → DO NOT PROMOTE SHOE DRYER UNTIL ECONOMICS CLEAR → FIRST REAL ORDER TRIGGERS LIVE VEVOR ORDER-TIME RECHECK.**

### Renogy

Current controlling pickup: `RENOGY_CURRENT_WORKTREE.md` plus live Shopify evidence.

Current state is **2 ACTIVE / 4 DRAFT**.

ACTIVE:

1. `RNG-CTRL-ADV30-LI-US` — Adventurer Li 30A PWM — $82.99 — strong organic/owned hero.
2. `RBM500-US` — 500A Battery Monitor with Shunt — $87.99 — thinner free/owned test.

DRAFT:

- `RSP100DCT-US` — $99.99;
- `RBC2125DS-21W-US` — $299.99;
- `RNG-INVT-2000-12V-P2-US` — $285.99;
- `RNG-CTRL-RVR40` — $152.44.

Controls:

- historical `5 DRAFT / 0 ACTIVE` and `1 ACTIVE / 5 DRAFT` states are superseded;
- do not recreate/deactivate active products because of stale receipts or older Project Source text;
- existing Metricool Adventurer/RBM500 organic posts own the current tests; do not duplicate them;
- first real Renogy order triggers exact dealer SKU/orderability/backorder/cost/shipping/contribution recheck before supplier purchase;
- resolve four DRAFT products independently.

### Kingboss

- approved Stage-1 proving lane;
- exact catalog/SKU mapping, protected pricing/MAP/channel, warranty/RMA and model-specific compliance remain owning-lane controls;
- do not create speculative broad Shopify catalog or a 100-unit commitment from this Worktree.

## Work queue

| Priority | Work Item | State | Primary Owner | Next Action | Close Condition |
|---|---|---|---|---|---|
| P0 | First profitable Elevation direct-site order | ACTIVE | Shopify Store Operations + Vendor/Marketing/Operations handoffs | Preserve working purchase paths; consume current `PROMOTE` candidates; support allowed free/owned traffic; detect first real order; route fulfillment; record actual contribution | Real direct-site paid order completes through correct vendor fulfillment with positive/reconciled actual contribution or owner-approved strategic exception |
| P0 | Preserve native Shopify + Elevation/PayPal buy paths | ACTIVE / MONITOR | Shopify Store Operations; PM4/P0 coding recovery only for code defects | Run bounded representative QA only when needed; do not rebuild working checkout; route verified code defects to PM4 | No material store/cart/checkout defect blocks valid purchase |
| P1 | VEVOR first profitable order | ACTIVE / THREE RELEASED | VEVOR Project owns source/economics; Shopify consumes | Preserve three released heroes in allowed traffic; do not replay completed fresh-check; hold shoe dryer traffic; first order triggers exact live VEVOR recheck | First VEVOR paid order fulfills cleanly and records actual contribution |
| P1 | Renogy exact-SKU revenue proof | ACTIVE / 2 ACTIVE + 4 DRAFT | Renogy Project owns dealer facts; Shopify consumes | Preserve current 2/4 state; existing organic tests run; first order triggers exact dealer recheck; continue four drafts independently | First Renogy paid order fulfills cleanly and launch set remains source-safe |
| P1 | Qualified traffic handoff | ACTIVE / TRAFFIC BOTTLENECK | Shopify → Marketing/Social | Return exact promotion-ready products with current URL/price/value proposition; organic/owned/performance traffic only under current owner controls | Measurable attributable product/cart/checkout/order evidence accumulates |
| P1 | Store conversion analytics loop | ACTIVE | Shopify Store Operations | Measure sessions → product → cart → checkout → order → actual contribution; record sample size | Conversion/profit evidence influences hero ranking without overreading tiny samples |
| P1 | Paid Shopify order routing | EVENT-DRIVEN | Shopify → Vendor/Shipping fulfillment owner | On real order verify payment/source/SKU; route exact vendor fulfillment; trigger required supplier recheck; record receipt | Order reaches responsible fulfillment lane with clean payment/source state |
| P1 | Universal Catalog Shopify-side acceptance | ACTIVE / NON-CODE FACT WORK CONTINUES | Shopify + Vendor managers | Verify source-backed product/collection/filter/order-source behavior; any required code mutation becomes a PM4/P0 coding-recovery input | Representative current vendor products pass intended purchase/assisted path without bypassing P0 code controls |
| P2 | Product/collection cleanup and enrichment | QUEUED / NON-BLOCKING | Shopify Store Operations | Improve only source-backed Shopify data that materially helps selling and does not require frozen website code | No meaningful catalog hygiene issue impairs selling/routing |

## Store / traffic control

No product is traffic-cleared merely because it is ACTIVE.

Use:

**EXACT SKU → AUTHORIZED SOURCE → CURRENT SELLABILITY / AUTHORIZED DELAYED-ORDER PATH → CURRENT PRICE/MAP → LANDED VARIABLE COST → EXPECTED CONTRIBUTION → WORKING CHECKOUT → FULFILLMENT RELIABILITY → PROMOTE.**

Traffic states remain:

- `PROMOTE — FREE/OWNED TRAFFIC ONLY` while owner paid-ad lock is active;
- `HOLD — ECONOMICS UNKNOWN`;
- `HOLD — NEGATIVE CONTRIBUTION`;
- `OWNER REVIEW — STRATEGIC EXCEPTION`.

Shopify `unitCost:null` or blank unit cost is a **data-quality gap, not zero cost**.

## Website-code boundary during P0 stabilization

Shopify Store Operations does not route code directly to MASTER DEVELOPER while the P0 coding freeze is active.

For a verified Shopify technical defect:

**SHOPIFY LIVE EVIDENCE → EXACT CUSTOMER/ORDER/REVENUE IMPACT → PM4 → P0 CHANGE-ADMISSION CLASSIFICATION → `CODING_STABILIZATION_CURRENT_WORKTREE_2026-09-12.md` → MASTER DEVELOPER IF ADMITTED.**

Classification:

- customer/order emergency → PM4/P0 immediately;
- verified revenue blocker → PM4 decides recovery admission/order;
- feature/cosmetic/nice-to-have → HOLD;
- protected-top change → HOLD + exact Casey approval;
- unclear → hold only that mutation and continue non-code Shopify work.

No parallel developer Worktree may be created from this lane.

## Current analytics interpretation

Historical and recent analytics receipts show a very small traffic sample with cart/checkout reach but no completed Shopify order at the latest verified checkpoint.

Do not carry an old session count forward as live truth. When conversion measurement is needed, use a fresh Shopify analytics read and record the time window.

Current operating interpretation remains:

**WORKING PURCHASE PATH EXISTS → QUALIFIED TRAFFIC SAMPLE IS SMALL → USE ECONOMICALLY CLEARED OFFERS → MEASURE → DO NOT REBUILD CHECKOUT WITHOUT A VERIFIED DEFECT.**

## Routing rules

### Vendor Project Manager

Route supplier cost, MAP/floor, availability/orderability, exact SKU identity, source media, backorder/preorder, warranty/returns and fulfillment facts to the owning Vendor Project.

### PM4 / P0 coding recovery

Route verified code/theme/custom-checkout/API/backend/deployment defects with exact customer/order/revenue impact to PM4. During the active freeze, PM4 controls admission into the coding-stabilization Worktree; Shopify does not directly assign MASTER DEVELOPER.

### Company Operations

Route refunds/credits/material order remedy, fulfillment exceptions spanning Projects, account/platform exceptions and cross-worker operating conflict.

### Marketing / Social

Route only exact profit-qualified products for organic/free/permitted performance traffic. Paid acquisition remains blocked by owner rule.

### Casey

Route loss-leader/negative-contribution strategy, material pricing exception, bank/payment/payout identity changes, binding financial/legal commitments and protected-top exceptions.

## Replay guards

The following are historical/superseded and may not route current work:

- `VEVOR vendor input required / no PROMOTE result` — superseded by three released VEVOR products;
- `Renogy five DRAFT / zero active` — superseded by **2 ACTIVE / 4 DRAFT**;
- direct Shopify → MASTER DEVELOPER routing during P0 freeze — superseded by PM4/P0 coding recovery;
- old exact analytics counts — historical measurement only unless freshly re-read;
- an older Worktree/receipt may not undo a newer owning Vendor Worktree or canonical Work Board state.

## Historical startup execution receipt — 2026-09-11

The prior Sept. 11 receipt remains historical evidence of the state at that time: Shopify was public, checkout paths were proven, VEVOR promotion economics had not yet returned, and Renogy then showed five drafts. Those facts **must not be replayed as current routing state** after the Sept. 12 vendor/management reconciliation.

## Worker RUN

**GIT FIRST → CURRENT WORK BOARD → THIS CURRENT WORKTREE → CURRENT OWNING VENDOR WORKTREE FOR ACTIVE SKU → LIVE SHOPIFY STATE AS NEEDED → CHECK REAL ORDERS → EXECUTE NEXT AUTHORIZED SHOPIFY OPERATION → ROUTE CODE DEFECTS TO PM4/P0 → RECORD MATERIAL DELTA → CONTINUE.**

## Control phrase

**CURRENT VENDOR TRUTH → PROFIT CHECK → SHOPIFY EXECUTION → ALLOWED TRAFFIC → REAL ORDER → CORRECT FULFILLMENT → ACTUAL CONTRIBUTION; WEBSITE CODE ROUTES THROUGH PM4/P0 RECOVERY.**
