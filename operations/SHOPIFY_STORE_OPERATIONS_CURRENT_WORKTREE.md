# Elevation UpScales — Shopify Store Operations Current Worktree

**Status:** ACTIVE WORKTREE / PRIMARY WORKER NOT YET STARTED  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Parent:** Company Operations / Ecommerce & Vendor Operations  
**Reporting Manager:** Peter Torres — Ecommerce & Vendor Operations Manager  
**Primary Worker:** Shopify Store Operations Worker  
**Worker State Until Startup:** OPEN TASK / STANDBY  
**Lane SOP:** `SHOPIFY_STORE_OPERATIONS_SOP_V1_0.md`  
**Worker Prompt:** `SHOPIFY_STORE_OPERATIONS_WORKER_PROMPT_V1_0.md`

## Current objective

Build repeatable profitable direct-site commerce through the existing Shopify store without duplicating vendor management or development work.

Current startup close target:

**FIRST PROFITABLE ELEVATION DIRECT-SITE ORDER → CORRECT FULFILLMENT → ACTUAL PROFITABILITY RECEIPT → REPEATABLE PROFITABLE SALES FLOW**

## Current verified baseline

- Shopify password protection is lifted.
- Native Shopify storefront is public.
- Native Shopify cart/checkout has been proven through payment-entry on a representative VEVOR product.
- Current management state reports custom Elevation PayPal checkout live acceptance after the trusted-origin repair.
- No synthetic paid order should be manufactured.
- Current direct-site traffic is extremely low; recent Shopify analytics showed 8 sessions in the 7-day window at the measurement point, 1 cart addition, 1 checkout reached and 0 completed checkout.
- Current referral traffic was direct/unknown; no measurable social-referral traffic was present at the measurement point.
- `DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md` is controlling for active product promotion.

## Work queue

| Priority | Work Item | State | Primary Owner | Blocker / Input | Next Action | Close Condition |
|---|---|---|---|---|---|---|
| P0 | First profitable Elevation direct-site order | ACTIVE | Shopify Store Operations Worker + Vendor/Marketing/Operations handoffs | Needs profit-qualified products + qualified traffic + real customer event | Keep working buy paths stable; consume `PROMOTE` candidates; route free/owned traffic; detect first real order; route fulfillment; record actual contribution | Real direct-site paid order completes through correct vendor fulfillment with positive actual contribution or a documented owner-approved strategic exception |
| P0 | VEVOR first-sale profitability qualification | ACTIVE / VENDOR INPUT REQUIRED | VEVOR Manager + Price-Control Specialist; Shopify worker consumes result | Protected current supplier cost, live sellability/MAP and variable order costs | Use `VEVOR_FIRST_SALE_PROMOTION_SHORTLIST_2026-09-11.md`; return `PROMOTE / HOLD — ECONOMICS UNKNOWN / HOLD — NEGATIVE CONTRIBUTION`; Shopify worker merchandises only `PROMOTE` items | First 3–5 profitable VEVOR candidates are confirmed and routed to direct-site merchandising/traffic |
| P0 | Preserve native Shopify + Elevation/PayPal buy paths | ACTIVE / MONITOR | Shopify worker for store operations; MASTER DEVELOPER for code defects | Only a verified live defect | Run bounded representative product/cart/checkout checks when needed; do not rewrite working checkout | No material store/cart/checkout defect blocks valid purchase |
| P1 | Renogy five-draft activation | ACTIVE / CONTROLLED | Shopify worker + Renogy Manager/Specialist | Three exact SKU/orderability holds; exact media/current price/current sellability before activation | Preserve five DRAFT records; advance `RSP100DCT-US` and `RBM500-US`; consume portal/vendor results for other three; activate clean SKUs individually | Clean Renogy launch products are ACTIVE and pass universal store QA without ambiguous SKU publication |
| P1 | Universal Catalog Shopify-side acceptance | ACTIVE | Shopify worker + Universal Catalog/Developer + Vendor managers | Vendor-by-vendor verified source facts | Normalize verified vendor outputs into product/collection/filter/order-source flow; preserve source identity; run representative QA | SOK/VEVOR/Renogy/Kingboss participate in intended Shopify/store path as each vendor becomes activation-ready |
| P1 | Qualified traffic handoff | ACTIVE / TRAFFIC BOTTLENECK | Shopify worker → Marketing/Social lane | Need profit-qualified product targets | Return 3–5 promotion-ready products with exact product identity, verified price, core value proposition and working buy path; Marketing executes traffic | Measurable qualified referral sessions/cart/checkout activity begins and is attributable enough to learn from |
| P1 | Store conversion analytics loop | ACTIVE | Shopify worker | Real traffic/order sample | Track sessions → cart → checkout → order → order value → actual contribution → referrer/product; do not overinterpret tiny samples | Repeatable conversion and profitability reporting influences merchandising priority |
| P1 | Paid Shopify order routing | EVENT-DRIVEN | Shopify worker → Vendor/Shipping fulfillment owner | Trigger = real paid direct-site order | Verify payment/order/source; route fulfillment; protect PII; trigger vendor recheck; record receipt | Order reaches responsible fulfillment lane with clean source/payment state |
| P2 | Product/collection cleanup and enrichment | QUEUED / NON-BLOCKING | Shopify worker | P0/P1 work takes precedence | Improve only source-backed tags/media/organization/data that materially helps discoverability or conversion | No meaningful catalog hygiene issue impairs selling or routing |

## Renogy protected draft state

Do not recreate these records.

| Staged SKU | State | Shopify action |
|---|---|---|
| `RSP100DCT-US` | ADVANCED / ACTIVATION QA | Preserve DRAFT until exact final media/price/sellability QA clears; may then activate individually |
| `RBM500-US` | ADVANCED / ACTIVATION QA | Preserve DRAFT until exact final media/price/sellability QA clears; warranty language may remain bounded |
| `RBC2125DS-21W-US` | HOLD | Hold only current dealer orderability/delayed-order authority |
| `RNG-INVT-2000-12V-P2-US` | HOLD | Hold exact current supplier generation/order-source identity |
| `RNG-CTRL-RVR40` | HOLD | Hold exact current variant identity |

## VEVOR first-sale lane

The current preliminary shortlist is in:

`VEVOR_FIRST_SALE_PROMOTION_SHORTLIST_2026-09-11.md`

Do not promote based on price alone.

Required sequence:

**LIVE SELLABILITY → CURRENT MAP/PRICE FLOOR → CURRENT SUPPLIER COST → SHIPPING/VARIABLE COST → PAYMENT/PLATFORM FEES → POSITIVE CONTRIBUTION → PROMOTE**

Shopify worker must not write protected raw supplier cost to public Git.

## Universal Catalog control

Shopify-side flow:

**VENDOR PROJECT SOURCE → VERIFIED/NORMALIZED PRODUCT → SHOPIFY PRODUCT → COLLECTION/FILTER/TAGS → PRODUCT PAGE → CART/CHECKOUT OR APPROVED ASSISTED PATH → ORDER SOURCE → FULFILLMENT ROUTE**

Current vendor high-level state:

- **SOK:** strongest/reference direct-site battery lane; exact source rules remain SOK-controlled.
- **VEVOR:** large live catalog / checkout proven / first profitable direct order still open.
- **Renogy:** five DRAFT Shopify products / source package received / individual activation QA.
- **Kingboss:** approved relationship / supplier/compliance reconciliation active / Shopify catalog wave not yet activation-ready.

## Store analytics baseline

At the latest measurement point:

- 7-day sessions: 8
- current-day sessions: 7
- sessions with cart additions: 1
- sessions reaching checkout: 1
- completed checkout: 0
- device mix: 8 desktop sessions in the measured 7-day data
- referral source: 7 direct / 1 unknown
- measurable social-referral sessions: 0

Interpretation:

**WORKING PURCHASE PATH EXISTS → TRAFFIC SAMPLE IS TOO SMALL → PROFIT QUALIFICATION FIRST → THEN DRIVE QUALIFIED TRAFFIC.**

Do not treat this tiny sample as a durable conversion rate.

## Routing rules

### Route to Vendor Project Manager

- cost / MAP / price floor;
- availability/orderability;
- exact SKU identity;
- supplier media/source rights;
- backorder/preorder rules;
- warranty/returns/fulfillment facts.

### Route to MASTER DEVELOPER

- live code/theme defect;
- custom checkout backend/frontend defect;
- PayPal/custom payment code;
- API/backend/deployment issue.

### Route to Company Operations

- refunds/credits/material order remedy;
- fulfillment exception spanning projects;
- account/platform exception;
- cross-worker conflict.

### Route to Marketing/Social

- profit-qualified product promotion;
- organic/free traffic execution;
- social content/campaign work.

### Route to Casey

- loss-leader/negative-contribution strategy;
- material pricing exception;
- bank/payment/payout identity change;
- binding financial/legal commitment.

## Worker startup checklist

When the new worker chat starts:

- [ ] GIT FIRST
- [ ] Read Master SOP + Glossary
- [ ] Read Current Work Board
- [ ] Read Shopify Store Operations SOP
- [ ] Read this Current Worktree
- [ ] Read Master Worker Registry
- [ ] Verify live Shopify Admin/store state
- [ ] Verify no competing worker owns the selected first task
- [ ] Self-register / update Registry to ACTIVE
- [ ] Start P0 from last verified state

## Control phrase

**PROFIT-QUALIFIED PRODUCT → SHOPIFY BUY PATH → QUALIFIED TRAFFIC → SALE → CORRECT FULFILLMENT → ACTUAL PROFIT → SCALE.**