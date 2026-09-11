# Elevation UpScales — VEVOR Tailored Project Workflow

**Project:** VEVOR Supplier / Catalog / Shopify / Fulfillment  
**Owner:** Casey Young  
**Project Operations Manager:** VEVOR Project Operations Manager — existing VEVOR project management function, not an added competing top-level manager  
**Project Specialist:** VEVOR Reconciliation & Price-Control Specialist  
**Human Ecommerce Oversight:** Peter Torres  
**Status:** ACTIVE — STAGE 1 PROVING  
**Last reconciled:** 2026-09-10  
**Project Source:** `vendor-project-sources/VEVOR_PROJECT_SOURCE.md`  
**Controlling SOP:** `VEVOR_VENDOR_MASTER_SOP.md`  
**B-Tier Receipt:** `VEVOR_B_TIER_PREPARATION_2026-09-10.md`  
**Fulfillment Receipt:** `VEVOR_FULFILLMENT_QUALIFICATION_2026-09-10.md`

## Project outcome

Operate VEVOR as a controlled direct-site supplier lane that turns verified VEVOR source data into customer-ready Shopify products, proves real supplier fulfillment, and scales only from live sell-through while preserving source separation and current VEVOR pricing/channel rules.

## Verified current state

- VEVOR PRO/direct relationship is active.
- Supplier feed has been received.
- Direct VEVOR and Doba-sourced VEVOR are separate source lanes.
- Direct VEVOR is authorized for ElevationUpScales.com / Shopify direct-site sales; third-party marketplaces remain blocked absent separate written authorization.
- The supplier rule requires Elevation's selling price not be below VEVOR's current selling price; the feed also contains a MAP field.
- Planning floor is only a screening aid. Live price and current sellability must be reverified before supplier purchase.
- No verified paid direct-VEVOR preorder/backorder path exists; genuinely unavailable SKUs pause individually.
- First A-tier launch is complete: 19 VEVOR Direct products and the `VEVOR Direct` collection are ACTIVE/published in Shopify Admin.
- Live source reconciliation shows 19 direct VEVOR ACTIVE products and 4 Doba-sourced VEVOR DRAFT products with source separation intact.
- A 17-SKU B-tier Strong Expansion queue is prepared with zero current Shopify SKU collisions. Preparation is complete; publication is not yet authorized.
- VEVOR public order-status/tracking baseline is verified through My Orders / Tracking after shipment.
- Current public VEVOR returns/warranty baseline is qualified: most original-condition items may be returned/exchanged within 30 days and the standard official-site manufacturer warranty is 12 months. Exact PRO-account RMA, return-label/shipping-cost handling and support ownership remain supplier-detail items.
- A focused supplier follow-up covering blind shipping/packing slips, tracking handoff, RMA/return-label procedure and customer-support ownership has been sent. Waiting on that answer does not block the verified normal-order path.
- Current customer-facing proof remains incomplete because Shopify Online Store password protection is enabled.
- No real paid VEVOR Direct Shopify order existed in the most recent launch-window check, so first-order proof has not started.

## Current worktree

**LAST VERIFIED:** A-tier launch complete; live direct-vs-Doba reconciliation clean; B-tier 17-SKU queue prepared; fulfillment/returns qualification recorded; supplier-detail follow-up sent.  
**CURRENT EXACT GATE:** Shopify Online Store password protection requires authenticated Shopify owner/admin action before public storefront/cart/checkout acceptance can be proven.  
**DO NOT REBUILD:** PRO registration, supplier-feed intake, 19-product A-tier launch, VEVOR Direct collection, B-tier queue preparation, direct-vs-Doba reconciliation, or fulfillment qualification receipt.  
**NEXT EXECUTABLE AFTER GATE:** unauthenticated `VEVOR Direct` collection → product → cart → checkout acceptance.  
**FIRST REAL ORDER TRIGGER:** reverify exact SKU + live sellability + live VEVOR selling price/feed MAP → place supplier order → capture acceptance/tracking/customer completion → record actuals.  
**EXPANSION CONTROL:** B-tier may remain staged/prepared while Stage 1 is open; publish only after the current publication gate permits expansion and each SKU receives fresh exact-SKU source, MAP/live-price, sellability, media and fulfillment checks.

## Unified project team

### Project Operations Manager

The VEVOR Project Operations Manager owns the VEVOR worktree and may directly perform routine in-scope execution, including:

- feed/source organization;
- live supplier price/sellability checks;
- routine Shopify product/collection work when the required facts are already verified and the manager has authorized access/capability;
- routine VEVOR account/source verification;
- project receipts/current-state updates;
- first-order coordination and follow-through.

The manager must not self-waive VEVOR MAP/price controls or expand channels.

### Project Specialist

The VEVOR Reconciliation & Price-Control Specialist owns:

- exact SKU/model/source reconciliation;
- direct VEVOR vs Doba source separation;
- feed MAP interpretation;
- live VEVOR selling-price verification;
- sellability/source verification;
- policy/change-control research;
- identification of product/order exceptions;
- execution-ready findings returned to the Project Operations Manager.

Existing VEVOR MAP/pricing and SOP/change-control functions are specialist/control functions inside this one project; they do not create additional competing project managers.

### Assigned/shared workers

The Shopify Operations Worker is the normal bounded execution worker when dedicated storefront work is needed. Catalog, Developer, Fulfillment, Research or Communications may enter only through a bounded VEVOR handoff and return afterward.

The Shopify Operations Worker may execute already-approved VEVOR product, price, collection, source-control and publication changes, but may not invent supplier policy, expand channels or bypass the storefront-owner authentication gate.

## Tailored operating sequence

### 1 — GIT / PROJECT SOURCE / WORKTREE PICKUP

Resolve current `main`; read the VEVOR row on `CURRENT_WORK_BOARD.md`, `vendor-project-sources/VEVOR_PROJECT_SOURCE.md`, this workflow, `VEVOR_VENDOR_MASTER_SOP.md`, and the current VEVOR launch/preparation/fulfillment receipts.

Identify the last verified VEVOR action and next executable VEVOR action before doing new work.

Do not restart PRO registration, feed intake, the completed 19-product launch, B-tier preparation, or already-qualified fulfillment research.

If a prior worker/chat/branch was interrupted, resume only the unfinished VEVOR action from durable state.

### 2 — SOURCE / SKU CONTROL

For every candidate or ordered SKU preserve:

**EXACT VEVOR SKU/MODEL → VEVOR-DIRECT SOURCE → APPROVED PRODUCT FACTS/MEDIA → FEED MAP → LIVE VEVOR SELLING PRICE → LIVE SELLABILITY → NORMAL FULFILLMENT → APPROVED DIRECT-SITE CHANNEL**

Doba-sourced VEVOR stays separate unless a deliberate exact-SKU source merge is independently verified.

Update the VEVOR Project Source when a material onboarding/readiness fact changes.

### 3 — PRICE RELEASE

Before first publication and before a material price change:

1. verify exact SKU;
2. read the applicable feed MAP;
3. check VEVOR's current public selling price;
4. use the higher applicable advertised-price floor;
5. set Elevation's customer price using protected economics outside public Git;
6. verify the live Shopify price after change.

If price evidence is missing, hold only that SKU/price action.

### 4 — SELLABILITY / STOCK CHECK

Supplier feed stock is not a permanent promise.

Use customer-safe states:

- AVAILABLE;
- MANUAL CONFIRMATION;
- UNAVAILABLE;
- DISCONTINUED / RETIRED.

Before supplier purchase, reverify current sellability. Do not invent preorder/backorder authorization.

### 5 — CURATED CATALOG

Use launch priority:

**A CORE LAUNCH → B STRONG EXPANSION → C SUPPORTING**

A-tier is complete.

B-tier preparation is complete for the current 17-SKU queue. Do not recreate that queue. Keep it staged until the public storefront Stage-1 gate permits expansion, then run fresh per-SKU checks before publication.

Favor products aligned to off-grid, RV/mobile, restoration/field-service and outdoor/support demand.

### 6 — SHOPIFY BUILD / PUBLIC ACCEPTANCE

Project Operations Manager may directly complete routine Shopify execution if authorized and capable; otherwise use the Shopify Operations Worker.

For each direct VEVOR record preserve source identity, exact SKU, price-control state, sellability marker and collection/lane.

Current immediate acceptance sequence:

**AUTHENTICATED OWNER/ADMIN REMOVES STOREFRONT PASSWORD → PUBLIC STOREFRONT ACCESS → VEVOR DIRECT COLLECTION → PRODUCT PAGE → CART → CHECKOUT**

The 19 direct products and VEVOR Direct collection already exist and are published in Shopify Admin. If Shopify storefront password protection remains enabled, remove only that exact gate using authenticated Shopify owner/admin access, then rerun unauthenticated acceptance. Do not rebuild products or create duplicate collections.

### 7 — FIRST REAL ORDER PROOF

Use:

**CUSTOMER ORDER → SHOPIFY CHECKOUT → EXACT SKU REVERIFY → LIVE STOCK/SELLABILITY → LIVE PRICE/MAP CHECK → VEVOR PURCHASE → SUPPLIER ACCEPTANCE → TRACKING → CUSTOMER COMPLETION → ACTUALS / RECEIPT**

The supplier's normal direct-order path is verified as PRO-account ordering through VEVOR's website with U.S.-warehouse fulfillment. Tracking/order status is publicly supported through VEVOR's account flow after shipment.

Do not promise blind shipping, packing-slip treatment, exact return-label costs or support ownership until supplier detail is confirmed.

A real paid order must enter the Elevation order operating flow before VEVOR integration is considered proven.

### 8 — B-TIER EXPANSION

The current 17-SKU B-tier queue is already prepared and collision-free.

After the Stage-1 publication gate permits expansion, process each SKU through the same exact source/price/sellability/media/fulfillment controls. First-order proof remains the maturity trigger for moving the normal VEVOR order lane to CONTROLLED.

Scale from sell-through rather than catalog size alone.

## Worktree continuity + documentation

Material VEVOR state must be recoverable from the Work Board + VEVOR Project Source + this workflow/master SOP.

Document material changes such as:

- source/account status changes;
- new/changed MAP/channel rules;
- catalog wave completion;
- public storefront/checkout acceptance;
- first-order proof;
- supplier fulfillment/returns exceptions;
- a real gate being added, removed, narrowed or reopened.

Do not create management records for every routine Shopify edit.

After COMPLETE / WAITING / VERIFYING / HOLD, automatically select the next safe unresolved VEVOR item. If none exists, return capacity upward rather than taking another project.

## Gate maturity

### Stage 1 — PROVING — CURRENT

Current VEVOR project remains PROVING for public storefront and first real paid direct-VEVOR order.

Current exact customer-facing gate: Shopify Online Store password protection.

Keep first-path verification for exact SKU/source, live MAP/VEVOR price, sellability, checkout and supplier fulfillment.

Supplier-detail waiting for blind shipping/packing slips, exact RMA mechanics and support ownership is an SOP-maturity item, not a blanket checkout blocker.

### Stage 2 — CONTROLLED

After public checkout + clean first-order proof:

- do not reapprove the already-completed PRO/feed/onboarding setup;
- execute routine direct-site catalog/order work using targeted live SKU/price/sellability checks;
- use exception/change-driven review rather than repeating the launch checklist.

### Stage 3 — MATURE / EXCEPTION-BASED

After repeatable clean orders/source refresh:

- normal already-authorized VEVOR work proceeds by default;
- manager attention focuses on supplier price changes, stock/source failures, MAP/channel changes, returns/fulfillment exceptions and material economics changes.

If one SKU or one order fails, reopen only that affected control unless evidence proves a broader source/process failure.

## Waiting behavior

If one VEVOR sub-item waits, continue another safe VEVOR sub-item such as:

- source cleanup;
- product/media normalization;
- direct-vs-Doba reconciliation when new SKUs appear;
- order-receipt preparation;
- B-tier per-SKU verification after the publication gate permits it;
- processing supplier fulfillment-detail replies when received.

Do not recreate already-complete B-tier preparation or fulfillment qualification.

Do not leave the VEVOR project to take unrelated company work.

## Real gates

Block only the exact affected SKU/action for:

- unverifiable MAP/live VEVOR price;
- uncertain SKU/source identity;
- unavailable/unverified supplier order path;
- unverified sellability;
- unauthorized marketplace/channel;
- payment/customer obligation;
- binding supplier-policy exception;
- public storefront password protection when public checkout acceptance is the action being tested.

Do not preserve completed PRO registration, feed receipt, A-tier build, B-tier preparation, fulfillment research or ordinary internal manager review as permanent gates.

## Owner gates

Return to Casey for:

- authenticated Shopify owner/admin action that cannot be performed through available authorized tooling, including clearing the current storefront password gate;
- material bulk/inventory commitment;
- unusual financing/credit;
- exclusivity/contracts;
- material marketplace/channel expansion;
- intentional exception to supplier price/channel rules;
- significant inventory investment;
- other binding legal/commercial commitments.

## Close / proof condition

VEVOR reaches repeatable operating state when:

1. public storefront/cart/checkout acceptance passes;
2. one real VEVOR Direct order completes supplier purchase through customer completion;
3. exact SKU/source/price/sellability controls are repeatable;
4. expansion can proceed without recreating onboarding.

## RUN

**VEVOR GIT CHECK → READ VEVOR PROJECT SOURCE + CURRENT RECEIPTS → PICK UP UNFINISHED VEVOR WORKTREE → MANAGER EXECUTES ROUTINE VEVOR WORK OR ROUTES BOUNDED TASK → SPECIALIST VERIFIES SKU/PRICE/SOURCE → DOCUMENT MATERIAL DELTA → CONTINUE NEXT VEVOR ITEM**

Current RUN pickup:

**CHECK STOREFRONT PASSWORD → IF ENABLED, REPORT AUTHENTICATED OWNER/ADMIN GATE → CONTINUE ONLY SAFE NON-DUPLICATIVE VEVOR PREP → WHEN CLEARED, RUN PUBLIC COLLECTION/PRODUCT/CART/CHECKOUT ACCEPTANCE → WAIT FOR FIRST REAL ORDER TRIGGER**

## Return

**VEVOR COMPLETED:**  
**VEVOR CURRENT:**  
**VEVOR WAITING/BLOCKED:**  
**VEVOR MATURITY / GATE CHANGE:**  
**VEVOR OWNER GATE:**  
**VEVOR NEXT:**  
**ROUTE REQUIRED:**
