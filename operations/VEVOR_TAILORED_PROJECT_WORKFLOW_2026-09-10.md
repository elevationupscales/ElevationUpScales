# Elevation UpScales — VEVOR Tailored Project Workflow

**Project:** VEVOR Supplier / Catalog / Shopify / Fulfillment  
**Owner:** Casey Young  
**Project Operations Manager:** VEVOR Project Operations Manager — existing VEVOR project management function, not an added competing top-level manager  
**Project Specialist:** VEVOR Reconciliation & Price-Control Specialist  
**Human Ecommerce Oversight:** Peter Torres  
**Status:** ACTIVE  
**Controlling SOP:** `VEVOR_VENDOR_MASTER_SOP.md`

## Project outcome

Operate VEVOR as a controlled direct-site supplier lane that turns verified VEVOR source data into customer-ready Shopify products, proves real supplier fulfillment, and scales only from live sell-through while preserving source separation and current VEVOR pricing/channel rules.

## Verified starting state

- VEVOR PRO/direct relationship is active.
- Supplier feed has been received.
- Direct VEVOR and Doba-sourced VEVOR are separate source lanes.
- Direct VEVOR is authorized for ElevationUpScales.com / Shopify direct-site sales; third-party marketplaces remain blocked absent separate written authorization.
- The supplier rule requires Elevation's selling price not be below VEVOR's current selling price; the feed also contains a MAP field.
- Planning floor is only a screening aid. Live price and current sellability must be reverified before supplier purchase.
- No verified paid direct-VEVOR preorder/backorder path exists; genuinely unavailable SKUs pause individually.
- First A-tier launch is complete: 19 VEVOR Direct products and the VEVOR Direct collection are active/published in Shopify Admin.
- Current proof remains incomplete until public storefront/checkout and one real paid order are proven end to end.

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

## Tailored operating sequence

### 1 — GIT / PROJECT STATE

Resolve current `main`; read this workflow, `VEVOR_VENDOR_MASTER_SOP.md`, current VEVOR launch receipt, and the VEVOR work-board row.

Do not restart PRO registration, feed intake or the completed 19-product launch.

### 2 — SOURCE / SKU CONTROL

For every candidate or ordered SKU preserve:

**EXACT VEVOR SKU/MODEL → VEVOR-DIRECT SOURCE → APPROVED PRODUCT FACTS/MEDIA → FEED MAP → LIVE VEVOR SELLING PRICE → LIVE SELLABILITY → NORMAL FULFILLMENT → APPROVED DIRECT-SITE CHANNEL**

Doba-sourced VEVOR stays separate unless a deliberate exact-SKU source merge is independently verified.

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

Favor products aligned to off-grid, RV/mobile, restoration/field-service and outdoor/support demand.

### 6 — SHOPIFY BUILD / PUBLIC ACCEPTANCE

Project Operations Manager may directly complete routine Shopify execution if authorized and capable; otherwise use the Shopify Operations Worker.

For each direct VEVOR record preserve source identity, exact SKU, price-control state, sellability marker and collection/lane.

Current immediate acceptance sequence:

**PUBLIC STOREFRONT ACCESS → VEVOR DIRECT COLLECTION → PRODUCT PAGE → CART → CHECKOUT**

If Shopify storefront password protection remains enabled, remove that exact gate using authenticated Shopify owner/admin access, then rerun unauthenticated acceptance. Do not rebuild the 19 products.

### 7 — FIRST REAL ORDER PROOF

Use:

**CUSTOMER ORDER → SHOPIFY CHECKOUT → EXACT SKU REVERIFY → LIVE STOCK/SELLABILITY → LIVE PRICE/MAP CHECK → VEVOR PURCHASE → SUPPLIER ACCEPTANCE → TRACKING → CUSTOMER COMPLETION → ACTUALS / RECEIPT**

A real paid order must enter the Elevation order operating flow before VEVOR integration is considered proven.

### 8 — B-TIER EXPANSION

After public acceptance and clean first-order proof, expand B-tier products using the same SKU/price/sellability controls. Scale from sell-through rather than catalog size alone.

## Waiting behavior

If one VEVOR sub-item waits, continue another safe VEVOR sub-item such as:

- verified B-tier preparation;
- source cleanup;
- product/media normalization;
- returns/tracking-process qualification;
- order-receipt preparation;
- direct-vs-Doba reconciliation.

Do not leave the VEVOR project to take unrelated company work.

## Real gates

Block only the exact affected SKU/action for:

- unverifiable MAP/live VEVOR price;
- uncertain SKU/source identity;
- unavailable/unverified supplier order path;
- unverified sellability;
- unauthorized marketplace/channel;
- payment/customer obligation;
- binding supplier-policy exception.

## Owner gates

Return to Casey for:

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

**VEVOR GIT CHECK → RESUME VEVOR WORKTREE → MANAGER EXECUTES ROUTINE VEVOR WORK OR ROUTES BOUNDED TASK → SPECIALIST VERIFIES SKU/PRICE/SOURCE → RECORD → CONTINUE VEVOR**

## Return

**VEVOR COMPLETED:**  
**VEVOR CURRENT:**  
**VEVOR WAITING/BLOCKED:**  
**VEVOR OWNER GATE:**  
**VEVOR NEXT:**  
**ROUTE REQUIRED:**
