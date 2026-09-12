# Elevation UpScales — VEVOR Vendor Master SOP

**Status: ACTIVE / CONTROLLING VEVOR LANE**  
**Version: 1.4**  
**Effective: 2026-09-10**  
**Last reconciled: 2026-09-11**  
**Owner: Casey Young**  
**Human Ecommerce Manager: Peter Torres**  
**Parent:** `MASTER_SOP_V1_0.md`, `MASTER_OS_GLOSSARY_V1_0.md`, `MANAGEMENT_OPERATING_SOP.md`, and `VENDOR_ONBOARDING_AND_CATALOG_MERGE_SOP.md`

## Purpose

Establish one controlled operating source for the active VEVOR direct-account supplier, catalog, pricing/MAP, Shopify, profitability and fulfillment lane without creating a second company priority system or competing VEVOR project.

VEVOR is beyond prospecting and generic onboarding. The operating objective is:

**VERIFY SOURCE → CONTROL MAP / PRICE → VERIFY LIVE SELLABILITY → VERIFY POSITIVE CONTRIBUTION → PROMOTE → SELL → FULFILL → RECORD ACTUALS → SCALE**

This SOP is public-safe. Protected supplier costs, raw inventory, tax documents/identifiers, private correspondence, credentials, payment terms, private margin and other confidential commercial evidence stay outside the public repository.

## 1. Authority and role fit

Use the existing company authority chain:

**CASEY → OPERATING SYSTEM PROJECT MANAGER → COMPANY OPERATIONS → VEVOR PROJECT / PETER TORRES → DIRECT FUNCTIONAL MANAGERS / ROUTED WORKERS**

- Casey's newest explicit direction controls.
- `MASTER_SOP_V1_0.md` and `MASTER_OS_GLOSSARY_V1_0.md` control OS behavior/terminology.
- `CURRENT_WORK_BOARD.md` controls current global routing/priority after higher authority.
- Company Operations owns company-operational execution and routing.
- Peter Torres remains Human Ecommerce & Vendor Operations Manager for VEVOR execution.
- The existing VEVOR Supplier / Catalog / Shopify / Fulfillment Project is the single VEVOR project. Do not create another top-level VEVOR manager or competing master state.
- Direct functional managers below are narrow workstream owners. They may maintain VEVOR-specific controls but may not override shared company SOPs or another manager's ownership.
- Workers execute routed actions and return evidence/state. They do not self-approve policy changes outside their assigned lane.
- `ONE TASK = ONE PRIMARY ACTIVE WORKER` remains controlling.

## 2. Direct VEVOR functional managers

### VEVOR MAP & Pricing Control Manager / Price-Control Specialist

Owns the VEVOR advertising-price control lane.

Responsibilities:

- identify exact VEVOR SKU/model;
- verify supplier-feed MAP reference;
- verify VEVOR's current public selling price immediately before publication/material price change and when current promotion/order controls require it;
- apply the higher applicable advertised-price floor;
- record public-safe verification date/source without exposing protected supplier cost;
- route approved Shopify price instructions;
- reopen only affected SKUs when current VEVOR price/MAP evidence changes.

This function does **not** waive VEVOR MAP, invent extra MAP restrictions, expose wholesale cost, or self-authorize unrelated Shopify changes.

### VEVOR SOP & Change-Control Manager

Owns VEVOR-specific operating-procedure maintenance and change reconciliation.

Responsibilities:

- maintain this Master SOP and public-safe change history;
- reconcile verified VEVOR policy, fulfillment, channel, returns, tracking, profitability-routing and operational facts;
- identify downstream impact on Shopify, catalog, fulfillment, customer support and promotion workstreams;
- route company-wide conflicts to Company Operations / Operating System Project Manager;
- route genuine owner gates to Casey;
- prevent duplicate VEVOR SOPs or parallel priority boards.

Routine factual updates may be reconciled without rebuilding the full SOP. Material changes to channel authorization, MAP interpretation, contractual commitments, financing, exclusivity, major inventory investment, strategic loss-leading or other owner-level commercial commitments remain owner-gated.

### Shopify Store Operations Worker — VEVOR execution lane

The Shopify Store Operations Worker is the bounded execution layer for direct VEVOR catalog/merchandising work under Peter / Company Operations.

Responsibilities:

- create/update direct VEVOR Shopify products after required source/MAP/sellability controls;
- organize approved products into collections;
- apply authorized selling prices and public-safe facts/media;
- verify product status, presentation, publication and checkout behavior;
- preserve direct VEVOR vs Doba source identity;
- consume only profit-qualified `PROMOTE` targets for active first-sale merchandising;
- return completion evidence, blockers and exceptions.

The Shopify worker does **not** self-approve MAP policy, change supplier/channel authorization, invent preorder/backorder authority, expose protected economics, or treat Shopify access as authority for unrelated changes.

## 3. Shared-worker concurrency rule

When another worker is actively editing the same VEVOR Shopify records:

1. resolve current Git and Shopify state before writing;
2. preserve valid product records, exact SKUs, prices and media;
3. do not duplicate/delete records merely to regain control;
4. do not enter repeated status-write races;
5. record the conflicting action and defer only the conflicting write while the other write stream remains active;
6. after the other worker stops, reconcile once against Casey's newest direction and current VEVOR SOP;
7. technical ability to activate/deactivate a product is not itself VEVOR policy authority.

Historical note: a shared Shopify worker previously reactivated the 17 B-tier records after VEVOR management restored them to DRAFT. That event established this concurrency control. The current live state is now 17/17 `VEVOR-B` ACTIVE after the storefront gate closed; do not restart the historical tug-of-war or bulk-roll the qualified set back without newer authority.

## 4. Source separation — direct VEVOR vs Doba VEVOR

Direct VEVOR and Doba-sourced VEVOR are separate sourcing/authorization lanes even when the product brand is the same.

For Shopify/catalog control:

- preserve exact source lane for every SKU;
- use sufficient public-safe identifiers/tags to distinguish `VEVOR-Direct` from `Doba`;
- do not convert a Doba VEVOR listing into direct VEVOR merely because a similar product exists in the VEVOR feed;
- do not assume direct VEVOR authorization extends to eBay, Amazon, Walmart, TikTok Shop or other marketplaces;
- merge/reuse customer-facing records only when exact SKU identity, channel authorization, pricing, source and fulfillment ownership are safely reconciled.

Existing Doba/legacy Stock-Hold VEVOR records remain separate unless deliberately reconciled.

## 5. VEVOR MAP / pricing control

The VEVOR supplier feed contains `MAP (Minimum Advertised Price)`. VEVOR also instructed Elevation that Elevation's selling price must not be below VEVOR's current selling price.

Controlling rule:

**LIVE VEVOR SELLING PRICE CHECK + FEED MAP CHECK → USE THE HIGHER APPLICABLE FLOOR**

The working catalog's planning floor is only a screening aid.

### Price-release sequence

For each applicable SKU before first publication/material price change and when current promotion/order controls require a refresh:

1. confirm exact VEVOR SKU/model;
2. read feed MAP reference;
3. check current VEVOR public selling price from approved live source;
4. set applicable advertised floor to the higher valid control;
5. set/retain Elevation customer price at or above that floor using protected internal economics outside public Git;
6. record verification date/source pointer;
7. verify Shopify variant price after any authorized change.

If live price or MAP cannot be verified reliably, hold only that SKU/price action and continue other verified products.

Do not use coupons, compare-at pricing, automatic discounts, bundle mechanics, gifts or other promotions to bypass MAP.

## 6. Inventory and sellability

The supplier feed is a source snapshot, not a permanent customer promise.

Before active first-sale promotion and before supplier purchase, verify current supplier sellability using the approved VEVOR source.

Use customer-safe states:

- AVAILABLE
- MANUAL CONFIRMATION
- UNAVAILABLE
- DISCONTINUED / RETIRED

Do not represent supplier inventory as Elevation On Hand.

VEVOR-specific rule: there is no verified blanket paid preorder/backorder authority. If an exact direct VEVOR SKU is unavailable and no authorized alternate source/order path exists, pause only that SKU.

Supplier delivery guidance may be used for planning but not converted into an unsupported guarantee.

## 7. Catalog activation state

Use the catalog sequence:

**A — CORE LAUNCH → B — STRONG EXPANSION → C — SUPPORTING**

Current state:

- A-tier Core Launch: **complete — 19 / 19** direct VEVOR products established.
- B-tier Strong Expansion preparation: **complete — 17 / 17**.
- B-tier live qualification: **complete — 17 / 17** exact source/SKU/current public price-feed MAP alignment at check/source-backed media/Shopify identity.
- B-tier Shopify records: **complete — 17 / 17**.
- B-tier Shopify-hosted hero media: **complete — 17 / 17**.
- Live Shopify sweep on 2026-09-11: **17 / 17 `VEVOR-B` ACTIVE; 0 `VEVOR-B` DRAFT**.
- Do not recreate or duplicate the B-tier queue/products/media.
- Current active state is preserved. Existing publication no longer depends on the now-closed storefront password gate.

A new direct VEVOR SKU is ready for implementation when the applicable minimum is verified:

**EXACT SKU/MODEL + APPROVED FACTS/MEDIA + PRICE/MAP SOURCE + LIVE SELLABILITY + NORMAL FULFILLMENT + APPROVED DIRECT-SITE CHANNEL**

Do not expand merely because a product exists in the supplier feed. Favor products aligned to Elevation's off-grid, RV/mobile, restoration/field-service and outdoor/support customer lanes.

## 8. Shopify / public checkout state

The prior storefront-password gate is **CLOSED** by owner action.

Public native Shopify checkout was subsequently verified on a VEVOR product. This task is protected from recreation unless a new defect appears.

Current rule:

**PRESERVE WORKING PUBLIC CHECKOUT → DO NOT RECREATE PASSWORD REMOVAL → TEST ONLY MATERIAL NEW/CHANGED BUY PATHS**

Current active VEVOR records may remain active. Publication is not the same as promotion approval: active promotion still requires fresh sellability/price-MAP/profitability checks.

## 9. Direct-site profitability gate

`DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md` is a current owner-directed revenue control.

Elevation's startup objective is not sales volume alone. It is a repeatable profitable direct-site order path.

Before an item is actively promoted, establish enough current evidence to show expected **positive order contribution**:

**CUSTOMER PRODUCT REVENUE**  
**+ CUSTOMER-PAID SHIPPING REVENUE, IF ANY**  
**− CURRENT SUPPLIER PRODUCT COST**  
**− SUPPLIER SHIPPING / FREIGHT PAID BY ELEVATION**  
**− PAYMENT / CHECKOUT FEES**  
**− APPLICABLE PLATFORM PER-ORDER FEES**  
**− ELEVATION-FUNDED DISCOUNTS / CREDITS**  
**− OTHER KNOWN ORDER-SPECIFIC VARIABLE COSTS**  
**= EXPECTED ORDER CONTRIBUTION**

Sales tax collected for remittance is not product revenue/profit. Paid-ad acquisition cost must be considered if a paid campaign is ever used.

Protected costs/margins remain outside public Git.

Public-safe decision states:

- `PROMOTE` — all controls clean and expected contribution > $0;
- `HOLD — ECONOMICS UNKNOWN` — material current cost unknown;
- `HOLD — NEGATIVE CONTRIBUTION` — contribution $0 or below;
- `OWNER REVIEW — STRATEGIC EXCEPTION` — deliberate loss leader/subsidy requires Casey approval.

Do not create a discount just to force the first sale if it violates MAP or makes expected contribution non-positive.

## 10. First-sale promotion shortlist

`VEVOR_FIRST_SALE_PROMOTION_SHORTLIST_2026-09-11.md` is the current bounded preliminary queue for startup revenue work.

It is **not** authorization to promote blindly, change pricing, spend on ads or buy inventory.

Required sequence:

**EXACT SKU → LIVE VEVOR SELLABILITY → CURRENT VEVOR SELLING PRICE / MAP FLOOR → CURRENT PROTECTED SUPPLIER COST → SHIPPING / VARIABLE COST → APPLICABLE FEES → POSITIVE CONTRIBUTION → WORKING SHOPIFY BUY PATH → PROMOTE**

Re-rank candidates using:

**CUSTOMER DEMAND / PURCHASE FRICTION + EXPECTED DOLLAR CONTRIBUTION + EXPECTED CONTRIBUTION RATE + BRAND FIT + FULFILLMENT RELIABILITY + SUPPORT/RETURN RISK**

Route the first 3–5 clean `PROMOTE` products into free/owned traffic and existing Shopify merchandising. Paid acquisition requires separate economic approval and inclusion of acquisition cost.

## 11. Normal order / fulfillment flow

Use:

**CUSTOMER ORDER → PAYMENT CONFIRMATION → EXACT SKU REVERIFY → LIVE SELLABILITY → LIVE PRICE/MAP → VEVOR ORDER VALIDATION / PLACEMENT → SUPPLIER FULFILLMENT → PRO TRACKING → CUSTOMER COMPLETION → ACTUAL ORDER ECONOMICS / RECEIPT**

Verified fulfillment baseline:

- direct dropship path is PRO-account ordering through VEVOR after customer order;
- supplier correspondence confirms U.S.-warehouse fulfillment for normal direct lane;
- ~3–7 working days is planning guidance, not a customer guarantee;
- tracking is available through Elevation's VEVOR PRO account;
- product packaging carries VEVOR branding;
- supplier states invoice/pricing paperwork is not included;
- customer contacts Elevation first and Elevation coordinates supplier-side issues with VEVOR.

The generic fulfillment questionnaire is answered/closed. Do not recreate it.

Transactional proof still required:

- first actual supplier acceptance/ship timing;
- actual tracking handoff/customer completion;
- first applicable return/RMA label and shipping-cost behavior;
- actual order contribution state and any variance from expected economics.

Current Shopify order sweep on 2026-09-11 returned **0 orders**. First real paid VEVOR order remains an external trigger, not a reason to stop other finishable VEVOR work.

## 12. Returns / warranty baseline

Use current VEVOR policy/supplier support process subject to exact product/order applicability.

Current operating baseline:

- customer contacts Elevation first;
- Elevation opens/coordinates supplier-side support/return/warranty case;
- exact eligibility, label cost, shipping-cost treatment, replacement/refund timing and case disposition remain order-specific.

Do not promise free return shipping, automatic approval or exact resolution timing without order-specific support.

For a real return/warranty event:

**ORDER + EXACT SKU → CUSTOMER ISSUE → VEVOR POLICY / ACCOUNT ELIGIBILITY CHECK → REQUIRED EVIDENCE → RMA / RETURN / REPLACEMENT PATH → CUSTOMER UPDATE → ACTUALS**

## 13. Change control

Use the smallest safe revision.

When a verified VEVOR fact changes:

1. identify exact affected rule/SKU/channel;
2. preserve protected source/evidence outside public Git;
3. update only the affected VEVOR procedure/workstream;
4. note effective/reconciliation date;
5. identify affected Shopify/catalog/order/promotion actions;
6. route implementation to responsible worker;
7. verify implementation;
8. return material delta to Company Operations / Operating System Project Manager.

Do not create a new VEVOR SOP for every update. This file remains the Master VEVOR operating SOP.

## 14. Owner gates

Routine direct-site source verification, compliant pricing, catalog maintenance, profit qualification and normal VEVOR fulfillment are Operations work.

Return to Casey for genuine owner commitments including:

- material bulk-purchase/inventory commitments;
- unusual financing or credit obligations;
- exclusivity/contracts;
- material marketplace/channel-policy expansion;
- intentional exceptions to established supplier pricing/channel rules;
- strategic loss-leading / below-zero-contribution promotion;
- significant inventory investment;
- other material legal/commercial commitments.

The Shopify storefront-password gate is closed and is not a current owner task.

## 15. Public-repository protection

This repository is public. Never commit:

- dealer/wholesale costs or private price sheets;
- raw supplier inventory counts;
- private supplier correspondence;
- signed tax documents/private identifiers;
- payment credentials/private payment terms;
- private carrier quotes;
- non-public compliance packets;
- customer personal information;
- credentials/secrets/tokens;
- internal margin details or protected commercial terms.

Public Git may store policy, state, public-safe SKU identifiers, customer-facing/public prices, verification status, workflow and evidence pointers.

## 16. Current VEVOR work state

Current global priority remains governed by `CURRENT_WORK_BOARD.md`.

Durable VEVOR records include:

- `VEVOR_SHOPIFY_LAUNCH_RECEIPT_2026-09-10.md`;
- `VEVOR_B_TIER_PREPARATION_2026-09-10.md`;
- `VEVOR_B_TIER_LIVE_QUALIFICATION_2026-09-10.md`;
- `VEVOR_FULFILLMENT_QUALIFICATION_2026-09-10.md`;
- `vendor-project-sources/VEVOR_PROJECT_SOURCE.md`;
- `VEVOR_TAILORED_PROJECT_WORKFLOW_2026-09-10.md`;
- `DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md`;
- `VEVOR_FIRST_SALE_PROMOTION_SHORTLIST_2026-09-11.md`.

Verified current state:

- A-tier launch complete;
- 17/17 B-tier live qualification complete;
- 17/17 B-tier Shopify records + hero media complete;
- live B-tier current state = 17/17 ACTIVE, 0 DRAFT;
- storefront password gate closed;
- public native Shopify checkout verified;
- fulfillment tracking/packaging/no-price-paperwork/support route verified enough for first order;
- generic supplier fulfillment follow-up answered/closed;
- first real Shopify order not yet received at latest sweep;
- current execution = profit-qualify shortlist → promote clean candidates → first real profitable order proof.

Immediate sequence:

**FRESH-CHECK SHORTLIST SKU/SOURCE/SELLABILITY/PRICE-MAP → VERIFY PROTECTED ORDER ECONOMICS → PROMOTE/HOLD → ROUTE TOP CLEAN PRODUCTS TO FREE/OWNED TRAFFIC → FIRST REAL ORDER → REVERIFY → VEVOR PURCHASE → SUPPLIER ACCEPTANCE / TRACKING → CUSTOMER COMPLETION → ACTUALS → MOVE NORMAL ORDER LANE TO CONTROLLED**

## 17. Worktree pickup / no-repeat control

At every VEVOR RUN/resume:

1. resolve current `main`;
2. read Master SOP/Glossary and VEVOR row on `CURRENT_WORK_BOARD.md`;
3. read Project Source, tailored workflow, this SOP and latest VEVOR receipts/active revenue controls;
4. identify last verified action and exact next executable action;
5. do not repeat completed onboarding/catalog/media/password/fulfillment-research work;
6. if another worker is editing the same records, do not race it;
7. execute next safe VEVOR action;
8. record only material state change;
9. continue within VEVOR until true gate/natural lane stop.

Current no-repeat set:

- PRO registration — complete;
- supplier feed receipt/intake — complete;
- A-tier 19-product build — complete;
- VEVOR Direct collection creation — complete;
- direct-vs-Doba source control — established;
- B-tier 17-SKU queue preparation — complete;
- B-tier 17-SKU live price/source/media qualification — complete;
- B-tier Shopify record creation — complete;
- B-tier hero media — complete 17/17;
- storefront password removal — complete;
- public native Shopify checkout proof — complete;
- fulfillment/returns baseline qualification — complete;
- generic supplier fulfillment follow-up — answered/closed.

## 18. Return format

Functional managers and routed workers return concise state:

**DONE:** completed and verified change.  
**BLOCKED:** only the exact blocked item, otherwise `NONE`.  
**NEXT:** next executable action.  
**NEEDS CASEY:** only a genuine owner gate.

## Operating result

**ONE VEVOR PROJECT → ONE MASTER VEVOR SOP → ONE DURABLE VEVOR WORKTREE → MAP/SOURCE VERIFIED PER SKU → PROFIT GATE BEFORE PROMOTION → SHOPIFY EXECUTES APPROVED DELTAS → SHARED WORKERS DO NOT CREATE POLICY BY TECHNICAL ACCESS → PETER / COMPANY OPERATIONS RETAIN MANAGEMENT AUTHORITY → CASEY RETAINS TRUE OWNER GATES**
