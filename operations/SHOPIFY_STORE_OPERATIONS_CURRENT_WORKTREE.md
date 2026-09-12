# Elevation UpScales — Shopify Store Operations Current Worktree

> **CURRENT RECON OVERRIDE — 2026-09-12**  
> **Status:** ACTIVE / PRESERVE WORKING SHOPIFY PAYMENTS + EXISTING PUBLIC CATALOG / OWNER-DRIFT RECOVERY SUPPORT  
> **Current routing:** `CURRENT_WORK_BOARD.md` + `MPM5_OWNER_PAYMENT_DRIFT_RECOVERY_WORKFLOW_2026-09-12.md` + `MPM5_EXISTING_SHOPS_TUNING_DIRECTIVE_2026-09-12.md`
>
> Current verified Shopify truth:
>
> - Shopify has **103 ACTIVE / 53 ACTIVE+ONLINE-STORE-PUBLISHED / 50 ACTIVE+ONLINE-STORE-UNPUBLISHED**;
> - the complete 50-product unpublished cohort is VEVOR staging tagged `VEVOR-Profit-50-2026-09-12`;
> - all 50 are classified **INTENTIONAL HOLD / VEVOR STAGING COHORT — DO NOT BULK PUBLISH**;
> - the 50-product group is **not** a general Shopify publication outage;
> - current public Online Store catalog = **53 products: 42 VEVOR / 2 Renogy / 9 SOK**;
> - Shop remains an existing-surface configuration/eligibility hold, not a new-channel expansion trigger;
> - Microsoft Copilot remains an already-installed surface with 103 ACTIVE product exposure; preserve/tune, do not convert this into channel expansion;
> - **Shopify Payments is now verified `Accepting payments` / `Receiving payouts`; older `Complete setup` pointers are stale and may not route current work**;
> - PayPal presented inside the current U.S. Shopify checkout is **PayPal Wallet in the Shopify Payments lane** and is not a direct-PayPal-payout bypass;
> - an independent Elevation PayPal Orders v2 checkout outside Shopify is a different architecture and must not be conflated with Shopify PayPal Wallet;
> - the final replacement Elevation payment architecture is owned by MPM under `MPM5_OWNER_PAYMENT_DRIFT_RECOVERY_WORKFLOW_2026-09-12.md`;
> - Shopify Store Operations must **preserve the currently working Shopify configuration** while that recovery runs; do not mutate payment architecture merely to satisfy stale owner instructions;
> - MASTER DEVELOPER is **STANDBY** until MPM records the replacement flow and MASTER RECON passes it;
> - paid acquisition remains blocked; new listings remain paused during recovery.
>
> **Current Shopify execution order:**  
> `PRESERVE WORKING SHOPIFY PAYMENTS → KEEP 50 VEVOR STAGING PRODUCTS HIDDEN → NO NEW LISTINGS → PROVIDE CURRENT SHOPIFY FACTS TO MPM/RECON → PRESERVE REPRESENTATIVE GUEST CHECKOUT → WAIT FOR PAYMENT-ARCHITECTURE RECOVERY → FIRST REAL ORDER → FULFILLMENT → ACTUAL CONTRIBUTION.`
>
> Older detailed content below remains useful vendor/catalog history, but any statement that Shopify Payments still requires `Complete setup`, that Shopify PayPal Wallet bypasses Shopify Payments, or that the stale PayPal-only deployment is active is superseded by this override.

**Status:** ACTIVE / CURRENT STATE RECONCILED / SHOPIFY PRESERVE MODE DURING PAYMENT-ARCHITECTURE RECOVERY  
**Date:** 2026-09-12  
**Owner:** Casey Young  
**Parent:** Company Operations / Ecommerce & Vendor Operations  
**Reporting Manager:** Peter Torres — Ecommerce & Vendor Operations Manager  
**Primary Worker:** Shopify Store Operations Worker  
**Worker State:** ACTIVE / PRESERVE  
**Lane SOP:** `SHOPIFY_STORE_OPERATIONS_SOP_V1_0.md`  
**Worker Prompt:** `SHOPIFY_STORE_OPERATIONS_WORKER_PROMPT_V1_0.md`  
**Current Recovery Control:** `MPM5_OWNER_PAYMENT_DRIFT_RECOVERY_WORKFLOW_2026-09-12.md`  
**Current RECON Correction:** `OS_RECON_OWNER_PAYMENT_DRIFT_CORRECTION_2026-09-12.md`  
**Owner Paid-Acquisition Control:** `OWNER_DIRECTIVE_NO_PAID_ADS_UNTIL_CAPITAL_RECOVERY_2026-09-12.md`

## Current objective

Preserve a working, payout-capable Shopify commerce lane while MPM and MASTER RECON repair the owner-created payment-architecture drift. Shopify Store Operations supplies objective Shopify facts and does not design or deploy the replacement Elevation checkout architecture.

Current commercial target after recovery:

**FIRST PROFITABLE ELEVATION DIRECT-SITE ORDER → CORRECT FULFILLMENT → ACTUAL CONTRIBUTION RECEIPT → REPEATABLE PROFITABLE SALES FLOW**

## Current verified control state

The current override at the top of this file controls where it differs from older snapshots below.

- Shopify storefront is public.
- 53 ACTIVE products are public on Online Store; the 50 hidden VEVOR records are intentional staging holds, not a publication outage.
- Native Shopify cart/checkout is reachable.
- Shopify Payments is **Accepting payments / Receiving payouts**.
- PayPal Wallet inside Shopify remains a Shopify Payments payment method, not an independent payout bypass.
- Historical/custom Elevation PayPal Orders v2 code remains evidence of a separate direct architecture, but it is not automatically the accepted final architecture.
- No synthetic paid order should be manufactured.
- First real direct-site paid order remains open.
- Current P0 is **MPM/RECON payment-architecture recovery**, not Shopify Payments onboarding.
- `DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md` remains mandatory for later traffic assignment.
- Paid acquisition is **HOLD company-wide** until the verified capital-recovery hole is closed and Casey explicitly reopens paid acquisition.
- New Shopify listings/publication expansion remain paused during recovery.
- Website development remains standby until MPM replacement flow + RECON PASS creates one bounded build packet.

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
- the separate 50-product VEVOR staging cohort remains hidden and **DO NOT BULK PUBLISH**;
- supplier economics email reply is not a WAIT state;
- do not rerun the completed 10-SKU current-window check without a material refresh trigger.

Shopify action during recovery:

**KEEP STAGING COHORT HIDDEN → PRESERVE RELEASED PUBLIC PRODUCTS → NO NEW LISTINGS → NO PAYMENT-ARCHITECTURE EXPERIMENTS → RESUME NORMAL TRAFFIC/ORDER PROOF AFTER RECOVERY CLOSES.**

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
- no new public activation during the payment-architecture recovery hold;
- first real Renogy order triggers exact dealer SKU/orderability/backorder/cost/shipping/contribution recheck before supplier purchase.

### Kingboss

- approved Stage-1 proving lane;
- exact catalog/SKU mapping, protected pricing/MAP/channel, warranty/RMA and model-specific compliance remain owning-lane controls;
- do not create speculative broad Shopify catalog or a 100-unit commitment from this Worktree.

## Work queue

| Priority | Work Item | State | Primary Owner | Next Action | Close Condition |
|---|---|---|---|---|---|
| P0 | Owner payment-architecture recovery support | **ACTIVE / FACT SOURCE ONLY** | MPM + MASTER RECON; Shopify supplies facts | Preserve Shopify payment configuration; report exact current payment/payout/checkout facts; do not design replacement flow | MPM replacement flow recorded and RECON PASS returned without Shopify factual conflict |
| P0 | Shopify Payments setup | **CLOSED / VERIFIED — ACCEPTING PAYMENTS + RECEIVING PAYOUTS** | Shopify Store Operations + Owner | Preserve configuration; reopen only on genuine platform hold/error/new verification request | Shopify remains payout-capable with no active setup blocker |
| P0 | VEVOR hidden staging cohort | **RESOLVED CLASSIFICATION / INTENTIONAL HOLD** | Shopify + VEVOR Project | Keep 50 staging-tagged products hidden; no bulk publish | No staging product is bulk-published outside exact VEVOR authorization |
| P0 | Existing public catalog purchase verification | **PRESERVE / NO NEW EXPANSION** | Shopify Store Operations | Preserve representative guest checkout and current 53-public-product state; no new listing campaign during recovery | Existing paths remain stable through recovery and are revalidated after release if needed |
| P0 | First profitable Elevation direct-site order | **HOLD UNTIL PAYMENT-ARCHITECTURE RECOVERY CLOSES** | Shopify Store Operations + Vendor/Marketing/Operations handoffs | Do not manufacture an order; resume event-driven proof after architecture recovery | Real paid order completes through accepted lane and records actual contribution |
| P0 | Shopify vs independent Elevation checkout boundary | **MPM DECISION PENDING / DO NOT INFER** | MPM + MASTER RECON | Shopify preserves its lane; MPM defines replacement architecture; RECON validates | One unambiguous checkout/payment/payout/order model is accepted |
| P1 | VEVOR first profitable order | HOLD FOR NEW TRAFFIC / THREE RELEASED PRESERVED | VEVOR Project owns source/economics; Shopify consumes | Preserve released heroes; no new publication; order-time recheck on first real order after recovery | First VEVOR paid order fulfills cleanly and records actual contribution |
| P1 | Renogy exact-SKU revenue proof | HOLD FOR NEW ACTIVATION / 2 ACTIVE + 4 DRAFT PRESERVED | Renogy Project owns dealer facts; Shopify consumes | Preserve current 2/4 state; no new activation during recovery | First Renogy paid order fulfills cleanly and launch set remains source-safe |
| P1 | Store conversion analytics loop | HOLD FOR INTERPRETATION UNTIL RECOVERY CLOSES | Shopify Store Operations | Preserve data; do not diagnose architecture from tiny samples during active drift recovery | Post-recovery conversion/profit evidence influences ranking |
| P1 | Paid Shopify order routing | EVENT-DRIVEN | Shopify → Vendor/Shipping fulfillment owner | On real order verify payment/source/SKU; route exact vendor fulfillment | Order reaches responsible fulfillment lane with clean payment/source state |
| P1 | Universal Catalog Shopify-side acceptance | PRESERVE / NON-CODE FACT WORK ONLY | Shopify + Vendor managers | Verify source-backed product/collection/filter/order-source facts without new publication | Representative current vendor products remain source-safe |
| P2 | Product/collection cleanup and enrichment | HOLD / NON-BLOCKING | Shopify Store Operations | Resume after payment-architecture recovery | No meaningful catalog hygiene issue impairs selling/routing |

## Store / traffic control

No product is traffic-cleared merely because it is ACTIVE or public.

Use:

**EXACT SKU → AUTHORIZED SOURCE → CURRENT SELLABILITY / AUTHORIZED DELAYED-ORDER PATH → CURRENT PRICE/MAP → LANDED VARIABLE COST → EXPECTED CONTRIBUTION → WORKING PURCHASE PATH → FULFILLMENT RELIABILITY → PROMOTE.**

Traffic states remain:

- `PROMOTE — FREE/OWNED TRAFFIC ONLY` after the current recovery hold is released;
- `HOLD — ECONOMICS UNKNOWN`;
- `HOLD — NEGATIVE CONTRIBUTION`;
- `OWNER REVIEW — STRATEGIC EXCEPTION`.

Shopify `unitCost:null` or blank unit cost is a **data-quality gap, not zero cost**.

## Website-code boundary under MPM5 recovery routing

Shopify Store Operations does not route code directly to MASTER DEVELOPER.

During owner-drift recovery:

**SHOPIFY FACTS → MPM REPLACEMENT FLOW → MASTER RECON VALIDATION → ONE BOUNDED DEV PACKET IF NEEDED.**

Classification:

- platform/account/payment/channel configuration → Shopify Store Operations / Casey as required;
- payment-architecture decision → MPM;
- control-plane/lineage conflict → MASTER RECON;
- verified residual code defect after architecture acceptance → MPM DEV admission;
- protected-top change → HOLD + exact Casey approval;
- unclear → hold only that mutation and continue fact preservation.

No parallel developer Worktree may be created from this lane.

## Current analytics interpretation

Historical and recent analytics receipts show a small traffic sample with cart/checkout reach but no completed Shopify order at earlier checkpoints.

Do not carry an old session count forward as live truth. When conversion measurement is needed after recovery, use a fresh Shopify analytics read and record the time window.

Current operating interpretation:

**SHOPIFY PAYMENTS ACTIVE / RECEIVING PAYOUTS → 50 HIDDEN VEVOR = INTENTIONAL STAGING HOLD → PRESERVE 53 PUBLIC PRODUCTS → OWNER PAYMENT-ARCHITECTURE RECOVERY IN MPM/RECON → NO NEW LISTINGS/TRAFFIC EXPANSION → RESUME MEASUREMENT AFTER ACCEPTED FLOW.**

## Routing rules

### Vendor Project Manager

Route supplier cost, MAP/floor, availability/orderability, exact SKU identity, source media, backorder/preorder, warranty/returns and fulfillment facts to the owning Vendor Project.

### MPM5 / developer trigger

MPM owns the replacement checkout/payment/payout/order architecture. DEV remains standby until RECON passes one bounded MPM packet.

### MASTER RECON OS

Route control-plane drift, payment-architecture source conflict, production/recovery lineage, stale candidate replay, and exact-SHA release verification here.

### Company Operations

Route refunds/credits/material order remedy, fulfillment exceptions spanning Projects, account/platform exceptions and cross-worker operating conflict. COM2 does not design a parallel payment architecture.

### Marketing / Social

No new product promotion campaign during the recovery hold. Paid acquisition remains blocked by owner rule.

### Casey

Route material pricing exception, bank/payment/payout identity changes, binding financial/legal commitments and protected-top exceptions. New owner direction that changes payment architecture must be reconciled through MPM/RECON before execution.

## Replay guards

The following are historical/superseded and may not route current work:

- `Shopify Payments latest verified state = Complete setup` — **superseded; current state is Accepting payments / Receiving payouts**;
- `PayPal inside Shopify bypasses Shopify Payments or pays out directly outside Shopify` — false for the current U.S. Shopify lane;
- `84af23ec... is a cleared PayPal-only production candidate` — false / DO NOT DEPLOY;
- `50 ACTIVE + unpublished = broken publication queue requiring classification/bulk publication` — superseded; all 50 are VEVOR staging **INTENTIONAL HOLD / DO NOT BULK PUBLISH**;
- `VEVOR vendor input required / no PROMOTE result` — superseded by three released VEVOR products;
- `Renogy five DRAFT / zero active` — superseded by **2 ACTIVE / 4 DRAFT**;
- direct Shopify → MASTER DEVELOPER routing — superseded by MPM5/RECON recovery routing;
- old exact analytics counts — historical measurement only unless freshly re-read;
- an older Worktree/receipt may not undo a newer owning Vendor Worktree or canonical Work Board state.

## Historical startup execution receipt — 2026-09-11

The prior Sept. 11 receipt remains historical evidence of the state at that time. Those facts **must not be replayed as current routing state** after the Sept. 12 owner-drift correction.

## Worker RUN

**GIT FIRST → CURRENT WORK BOARD → THIS CURRENT WORKTREE → PAYMENT-DRIFT RECOVERY WORKFLOW → PRESERVE WORKING SHOPIFY PAYMENTS → KEEP 50 VEVOR STAGING PRODUCTS HIDDEN → NO NEW LISTINGS → REPORT CURRENT SHOPIFY FACTS TO MPM/RECON → DO NOT INFER REPLACEMENT ARCHITECTURE → RESUME NORMAL SHOPIFY TUNING ONLY AFTER RECOVERY RELEASE.**

## Control phrase

**SHOPIFY PAYMENTS = ACTIVE / RECEIVING PAYOUTS → SHOPIFY PAYPAL WALLET STAYS IN SHOPIFY PAYMENTS LANE → PRESERVE CURRENT SHOPIFY → MPM DEFINES REPLACEMENT FLOW → RECON VALIDATES → NO STALE PAYPAL-ONLY REPLAY.**