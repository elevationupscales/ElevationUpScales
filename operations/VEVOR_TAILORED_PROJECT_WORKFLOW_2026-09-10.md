# Elevation UpScales — VEVOR Tailored Project Workflow

**Project:** VEVOR Supplier / Catalog / Shopify / Fulfillment  
**Owner:** Casey Young  
**Project Operations Manager:** VEVOR Project Operations Manager — existing VEVOR project management function, not an added competing top-level manager  
**Project Specialist:** VEVOR Reconciliation & Price-Control Specialist  
**Human Ecommerce Oversight:** Peter Torres  
**Status:** ACTIVE — STAGE 1 PROVING / PUBLIC CHECKOUT VERIFIED / FIRST PROFITABLE ORDER OPEN  
**Last reconciled:** 2026-09-12  
**Project Source:** `vendor-project-sources/VEVOR_PROJECT_SOURCE.md`  
**Controlling SOP:** `VEVOR_VENDOR_MASTER_SOP.md`  
**B-Tier Preparation Receipt:** `VEVOR_B_TIER_PREPARATION_2026-09-10.md`  
**B-Tier Live Qualification Receipt:** `VEVOR_B_TIER_LIVE_QUALIFICATION_2026-09-10.md`  
**Fulfillment Receipt:** `VEVOR_FULFILLMENT_QUALIFICATION_2026-09-10.md`  
**Profitability Control:** `DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md`  
**First-Sale Shortlist:** `VEVOR_FIRST_SALE_PROMOTION_SHORTLIST_2026-09-11.md`  
**First-Sale Fresh Check:** `VEVOR_FIRST_SALE_FRESH_CHECK_2026-09-12.md`

## Project outcome

Operate VEVOR as a controlled direct-site supplier lane that turns verified VEVOR source data into customer-ready Shopify products, proves profitable real supplier fulfillment, and scales from live sell-through while preserving source separation, current VEVOR pricing/channel rules and Elevation cash protection.

Current operating objective:

**VERIFY SOURCE → VERIFY LIVE SELLABILITY → CONTROL MAP / PRICE → VERIFY ORDER CONTRIBUTION → PROMOTE → SELL → FULFILL → RECORD ACTUALS → SCALE WINNERS**

## Verified current state

- VEVOR PRO/direct relationship is active and generic onboarding is complete enough for operations.
- Supplier feed has been received; the original/full supplier feed remains the source and curated derivatives do not replace it.
- Direct VEVOR and Doba-sourced VEVOR are separate source lanes.
- Direct VEVOR is authorized for ElevationUpScales.com / Shopify direct-site sales; third-party marketplaces remain blocked absent separate written authorization.
- The supplier rule requires Elevation's selling price not be below VEVOR's current selling price; the feed also contains a MAP field. Use the higher applicable live-price/MAP floor.
- Supplier inventory is not represented as Elevation physical On Hand.
- No verified blanket paid direct-VEVOR preorder/backorder path exists; genuinely unavailable SKUs pause individually.
- A-tier launch is complete: 19 VEVOR Direct products and the `VEVOR Direct` collection are established in Shopify.
- B-tier live qualification is complete: all 17 exact B-tier SKUs were checked against current public VEVOR source pages; exact SKU identity, public price/feed-MAP alignment at the qualification check, source-backed media, Shopify records and Shopify-hosted hero media were verified.
- Current live Shopify reconciliation on 2026-09-11 found **17 / 17 `VEVOR-B` products ACTIVE and 0 `VEVOR-B` products DRAFT**. Preserve this live state unless Casey or a newer controlling VEVOR rule explicitly changes it. Do not recreate or bulk-roll back the qualified B-tier set.
- The earlier shared-worker DRAFT/ACTIVE write conflict is historical evidence and remains a concurrency-control lesson. It is not a current instruction to start another status tug-of-war.
- Shopify storefront password protection is **CLOSED** by owner action. Public native Shopify checkout has been verified on a VEVOR product. Do not recreate the password-removal task.
- VEVOR fulfillment questions are closed enough for first-order operation: product packaging remains VEVOR branded; supplier states invoice/pricing paperwork is not included; tracking is available through the PRO account; customers contact Elevation first; Elevation coordinates supplier-side return/warranty/support through VEVOR's current process.
- Generic supplier fulfillment follow-up is answered/closed. Do not resend it.
- Current Shopify order sweep on 2026-09-11 returned **0 orders**, so first-real-order proof remains open.
- Current first-sale execution is governed by `DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md`: a product is not a promotion target until current economics support positive expected order contribution.
- The 10-item first-sale shortlist received a fresh exact-SKU public VEVOR check on 2026-09-12. **Three SKUs are currently orderable; seven are currently out of stock.**
- Current orderable candidates are `XXKLJT124INCLJF0QV0`, `AXLSTCQJDSYKAZ99C001V0`, and `D25FT14IN20AHOGLOV1`. Their public VEVOR selling prices matched their feed MAP references at the fresh check and each page exposed Buy Now / Add to Cart.
- The seven unavailable candidates are sellability holds and return to the back of the source-refresh queue. Do not spend promotion-economics capacity on them during the current source window.
- A focused supplier request for exact current PRO net unit price and normal continental-U.S. dropship shipping treatment for the three orderable SKUs has been sent. Protected cost values remain outside public Git.

## Current worktree

**LAST VERIFIED:** public Shopify checkout is open; A-tier is established; B-tier 17/17 is live-qualified, ACTIVE and media-complete; fulfillment baseline is answered; the 10-SKU first-sale fresh check is complete; 3 exact SKUs are orderable and 7 are currently out of stock.  
**CURRENT ACTIVE TASK:** obtain/reconcile exact protected PRO economics for the three orderable SKUs and assign `PROMOTE`, `HOLD — ECONOMICS UNKNOWN`, or `HOLD — NEGATIVE CONTRIBUTION`.  
**CURRENT EXTERNAL TRIGGERS:** supplier economics reply for the three viable SKUs; first real paid VEVOR order.  
**DO NOT REBUILD / REPEAT THIS SOURCE WINDOW:** PRO registration, supplier-feed intake, A-tier launch, VEVOR Direct collection, B-tier queue preparation, B-tier live qualification, B-tier product/media creation, direct-vs-Doba source separation, storefront-password removal, generic fulfillment inquiry, or the completed 10-SKU fresh public sellability/price pass.  
**NEXT EXECUTABLE:** reconcile exact current PRO unit cost + supplier shipping for the three viable SKUs; calculate expected order contribution using protected economics outside public Git; route clean `PROMOTE` items into free/owned traffic and existing Shopify merchandising.  
**FIRST REAL ORDER TRIGGER:** reverify exact SKU + live sellability + current VEVOR selling price/feed MAP + supplier-order path → place supplier order → capture supplier acceptance/tracking/customer completion → record actual contribution and exceptions.

## Unified project team

### Project Operations Manager

The VEVOR Project Operations Manager owns the VEVOR worktree and may directly perform routine in-scope execution, including:

- feed/source organization;
- live supplier public-price/sellability checks;
- routine Shopify product/collection work when required facts are verified and access/capability is authorized;
- routine VEVOR account/source verification;
- project receipts/current-state updates;
- first-order coordination and follow-through;
- routing protected cost/economics checks without placing those protected values in public Git.

The manager must not self-waive VEVOR MAP/price controls, expand channels, invent blanket backorder authority, or normalize a loss-making promotion.

### Project Specialist

The VEVOR Reconciliation & Price-Control Specialist owns:

- exact SKU/model/source reconciliation;
- direct VEVOR vs Doba source separation;
- feed MAP interpretation;
- live VEVOR selling-price verification;
- sellability/source verification;
- policy/change-control research;
- identification of product/order exceptions;
- public-safe `PROMOTE` / HOLD disposition after protected economics are evaluated by the authorized lane.

Existing VEVOR MAP/pricing and SOP/change-control functions remain specialist/control functions inside this one project; they do not create additional competing project managers.

### Assigned/shared workers

The Shopify Store Operations Worker / Shopify Operations Worker is the bounded execution layer when dedicated storefront work is needed. Catalog, Developer, Fulfillment, Research, Marketing or Communications may enter only through a bounded VEVOR handoff and return afterward.

Shared workers must not override VEVOR source/MAP/channel/profitability controls. When another worker is changing the same Shopify records, use the concurrency rule: verify current state, preserve valid records, avoid write races, and reconcile once against current authority.

## Tailored operating sequence

### 1 — GIT / PROJECT SOURCE / WORKTREE PICKUP

Resolve current `main`; read `MASTER_SOP_V1_0.md`, `MASTER_OS_GLOSSARY_V1_0.md`, the VEVOR row on `CURRENT_WORK_BOARD.md`, `vendor-project-sources/VEVOR_PROJECT_SOURCE.md`, this workflow, `VEVOR_VENDOR_MASTER_SOP.md`, the latest VEVOR receipts, and the current profitability/first-sale controls.

Identify the last verified VEVOR action and next executable VEVOR action before doing new work.

Do not restart completed onboarding, catalog, media, password, fulfillment-research or current-window shortlist-freshness work.

### 2 — SOURCE / SKU CONTROL

For every candidate or ordered SKU preserve:

**EXACT VEVOR SKU/MODEL → VEVOR-DIRECT SOURCE → APPROVED PRODUCT FACTS/MEDIA → FEED MAP → LIVE VEVOR SELLING PRICE → LIVE SELLABILITY → NORMAL FULFILLMENT → APPROVED DIRECT-SITE CHANNEL**

Doba-sourced VEVOR stays separate unless a deliberate exact-SKU source merge is independently verified.

Update the Project Source when a material readiness fact changes.

### 3 — PRICE / MAP RELEASE

Before first publication, material price change, active promotion and supplier-order placement when required:

1. verify exact SKU;
2. read the applicable feed MAP;
3. check VEVOR's current public selling price;
4. use the higher applicable advertised-price floor;
5. use protected internal economics outside public Git to determine an acceptable Elevation customer price;
6. verify the Shopify variant price after any authorized change.

If price evidence is missing, hold only that SKU/price action.

Never use discounts, compare-at pricing, automatic promotions, bundles or gifts to bypass VEVOR MAP.

### 4 — SELLABILITY / STOCK CHECK

Supplier feed stock is not a permanent promise.

Use customer-safe states:

- AVAILABLE;
- MANUAL CONFIRMATION;
- UNAVAILABLE;
- DISCONTINUED / RETIRED.

Before active promotion and before supplier purchase, reverify current sellability. Do not invent preorder/backorder authorization.

For the current first-sale source window, the 10-SKU fresh check is already complete: **3 orderable / 7 unavailable**. Do not re-run all 10 until a later refresh trigger exists.

### 5 — PROFITABILITY GATE / FIRST-SALE SHORTLIST

The current startup objective is the first **profitable** Elevation direct-site order.

For every promotion candidate apply:

**CUSTOMER PRODUCT REVENUE + CUSTOMER-PAID SHIPPING, IF ANY − SUPPLIER PRODUCT COST − SUPPLIER SHIPPING/FREIGHT − PAYMENT/PLATFORM FEES − ELEVATION-FUNDED DISCOUNTS/CREDITS − OTHER KNOWN VARIABLE ORDER COSTS = EXPECTED ORDER CONTRIBUTION**

Protected supplier costs, margins and private commercial terms stay outside public Git.

Disposition each candidate as:

- `PROMOTE` — expected order contribution > 0 and all source/fulfillment/checkout controls are clean;
- `HOLD — ECONOMICS UNKNOWN` — a material current cost is not known;
- `HOLD — NEGATIVE CONTRIBUTION` — expected contribution is $0 or below;
- `OWNER REVIEW — STRATEGIC EXCEPTION` — deliberate loss leader/subsidy or other strategic exception.

Current bounded economics queue is the three orderable SKUs only:

- `XXKLJT124INCLJF0QV0` — Camper Levelers
- `AXLSTCQJDSYKAZ99C001V0` — A-Frame Trailer Jack
- `D25FT14IN20AHOGLOV1` — 25-ft Electric Drain Auger

All three remain `HOLD — ECONOMICS UNKNOWN` until exact current PRO unit cost, normal supplier shipping treatment and applicable order variable costs are known enough to calculate positive contribution.

The seven out-of-stock shortlist SKUs are not current economics candidates; re-enter them only after a later sellability refresh clears the exact SKU.

### 6 — CATALOG / SHOPIFY CONTROL

Use launch sequence:

**A — CORE LAUNCH → B — STRONG EXPANSION → C — SUPPORTING**

A-tier is complete.

B-tier qualification and build are complete for 17 exact SKUs. Current live Shopify state is 17/17 `VEVOR-B` ACTIVE with media; preserve it. Publication itself is no longer the immediate gate because the storefront password gate is closed and public checkout is verified.

Existing active products are not automatically promotion-approved. Active promotion still requires fresh source/sellability/price-MAP and positive-contribution checks.

Do not rebuild products or duplicate collections. Preserve direct-source tags/identity and keep legacy Doba/Stock-Hold records separate.

### 7 — PUBLIC ACCEPTANCE

The prior immediate acceptance sequence is complete:

**STOREFRONT PASSWORD CLOSED → PUBLIC STOREFRONT ACCESS VERIFIED → VEVOR PRODUCT → NATIVE SHOPIFY CART/CHECKOUT VERIFIED**

Do not recreate password-removal or generic checkout proof unless a new defect appears.

If a new product/path is materially different, test only that affected path.

### 8 — PROMOTION HANDOFF

After a candidate earns `PROMOTE`:

1. verify the current Shopify buy path remains valid;
2. preserve MAP/customer-price controls;
3. route the bounded product target to Shopify Store Operations / authorized Marketing lane;
4. prefer free/owned traffic during startup unless paid acquisition is separately approved and included in economics;
5. do not invent a discount simply to create the first sale;
6. preserve the first-order fulfillment handoff.

### 9 — FIRST REAL ORDER PROOF

Use:

**CUSTOMER ORDER → SHOPIFY/PAYPAL PAYMENT CONFIRMATION → EXACT SKU REVERIFY → LIVE SELLABILITY → LIVE PRICE/MAP → SUPPLIER ORDER PATH → VEVOR PURCHASE → SUPPLIER ACCEPTANCE → PRO TRACKING → CUSTOMER COMPLETION → ACTUAL ORDER ECONOMICS / RECEIPT**

Verified fulfillment baseline:

- normal direct dropship path uses the VEVOR PRO account after the customer order;
- U.S.-warehouse fulfillment is the normal direct lane;
- approximately 3–7 working days is planning guidance, not a customer guarantee;
- tracking is obtained through the PRO account;
- VEVOR branding remains on product packaging;
- supplier states invoice/pricing paperwork is not included;
- customer contacts Elevation first and Elevation coordinates supplier-side support/returns/warranty.

A real paid order must complete the Elevation operating flow before the VEVOR order lane moves to CONTROLLED.

### 10 — RETURNS / WARRANTY ACTUALS

Use current VEVOR policy/support process subject to exact order/product applicability.

On the first applicable case capture actual label/cost, shipping treatment, refund/replacement timing and supplier disposition. Do not promise free return shipping, automatic approval or exact resolution timing without order-specific support.

## Concurrency control

When multiple workers touch the same VEVOR Shopify records:

1. resolve current Git and current Shopify state first;
2. preserve valid records/SKUs/prices/media;
3. do not delete/recreate records merely to regain control;
4. do not enter repeated status-write races;
5. record the conflicting worktree and defer only the conflicting write when another active worker controls it;
6. reconcile once after the conflicting worker stops or authority changes;
7. current live state after the Stage-1 password gate closed is preserved unless a newer authorized decision requires a change.

## Worktree continuity + documentation

Material VEVOR state must be recoverable from the Work Board + Project Source + this workflow + Master SOP.

Document material changes such as:

- source/account status changes;
- MAP/channel rules;
- catalog wave qualification/build completion;
- public storefront/checkout acceptance;
- profit-gate dispositions when they materially affect promotion routing;
- first-order proof and actual economics state without exposing protected amounts;
- supplier fulfillment/returns exceptions;
- a real gate added, removed, narrowed or reopened.

Do not create management records for every routine Shopify edit.

After COMPLETE / WAITING / VERIFYING / HOLD, automatically select the next safe unresolved VEVOR item. If none exists, return capacity upward rather than taking another project without routing.

## Gate maturity

### Stage 1 — PROVING — CURRENT

Public Shopify access/checkout is proven, but first profitable real VEVOR order remains open.

Keep exact SKU/source, live price/MAP, sellability, positive contribution and supplier-order verification for promoted/order-bound products.

### Stage 2 — CONTROLLED

After a clean profitable first-order proof:

- do not reapprove completed PRO/feed/catalog setup;
- execute routine direct-site catalog/order work using targeted live SKU/price/sellability/economics checks;
- use exception/change-driven review rather than repeating launch checklists;
- record actual fulfillment and support exceptions.

### Stage 3 — MATURE / EXCEPTION-BASED

After repeatable clean profitable orders/source refresh:

- normal already-authorized VEVOR work proceeds by default;
- manager attention focuses on supplier price changes, stock/source failures, MAP/channel changes, returns/fulfillment exceptions and material economics changes.

If one SKU/order fails, reopen only that affected control unless evidence proves a broader source/process failure.

## Waiting behavior

If one VEVOR sub-item waits, continue another safe VEVOR sub-item such as:

- source cleanup;
- protected economics processing for any viable candidate whose current cost evidence arrives;
- product/media normalization where not already complete;
- direct-vs-Doba reconciliation when new SKUs appear;
- first-order receipt preparation;
- supplier/account evidence processing if new information arrives;
- a later sellability refresh only when a real refresh trigger exists.

Do not recreate completed B-tier preparation/live qualification, password work, generic fulfillment inquiry or the current-window 10-SKU fresh check.

Do not leave the VEVOR project to take unrelated company work without routing.

## Real gates

Block only the exact affected SKU/action for:

- unverifiable MAP/live VEVOR price;
- uncertain SKU/source identity;
- unavailable/unverified supplier order path;
- unverified sellability;
- unauthorized marketplace/channel;
- unknown material economics when the action is active promotion;
- non-positive expected contribution when the action is active promotion;
- payment/customer obligation;
- binding supplier-policy exception.

The closed storefront-password gate is not a current blocker.

## Owner gates

Return to Casey for:

- material bulk/inventory commitment;
- unusual financing/credit;
- exclusivity/contracts;
- material marketplace/channel expansion;
- intentional exception to supplier price/channel rules;
- strategic loss-leader or below-zero-contribution promotion;
- significant inventory investment;
- other binding legal/commercial commitments.

## Close / proof condition

VEVOR reaches repeatable CONTROLLED operating state when:

1. public storefront/cart/checkout remains functional;
2. one real VEVOR Direct order completes payment through supplier purchase to customer completion;
3. the order demonstrates an executable profitable path or any variance is corrected before repeat;
4. exact SKU/source/price/sellability controls are repeatable;
5. expansion proceeds without recreating onboarding.

## RUN

**VEVOR GIT CHECK → READ PROJECT SOURCE + CURRENT RECEIPTS + PROFITABILITY CONTROL → VERIFY LIVE SHOPIFY/ORDER STATE → PICK UP UNFINISHED VEVOR WORKTREE → SPECIALIST VERIFIES SKU/PRICE/SOURCE/SELLABILITY → AUTHORIZED LANE VERIFIES PROTECTED ECONOMICS → DISPOSITION PROMOTE/HOLD → ROUTE CLEAN PROMOTION → DOCUMENT MATERIAL DELTA → CONTINUE NEXT VEVOR ITEM**

Current RUN pickup:

**PRESERVE LIVE CATALOG → DO NOT RECREATE CLOSED PASSWORD/FULFILLMENT/FRESH-CHECK TASKS → 3 ORDERABLE SKUS WAIT ON EXACT PRO ECONOMICS → 7 UNAVAILABLE SKUS STAY AT BACK OF REFRESH QUEUE → WHEN ECONOMICS ARRIVE, CALCULATE CONTRIBUTION + DISPOSITION PROMOTE/HOLD → ROUTE CLEAN PROMOTE ITEMS → FIRST REAL ORDER → REVERIFY + FULFILL + RECORD ACTUALS**

## Return

**VEVOR COMPLETED:**  
**VEVOR CURRENT:**  
**VEVOR WAITING/BLOCKED:**  
**VEVOR MATURITY / GATE CHANGE:**  
**VEVOR OWNER GATE:**  
**VEVOR NEXT:**  
**ROUTE REQUIRED:**