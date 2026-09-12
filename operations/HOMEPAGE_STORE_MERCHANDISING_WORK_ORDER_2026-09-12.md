# ELEVATION UPSCALES — HOMEPAGE COMMERCE WORK ORDER

**Date:** 2026-09-12 MDT  
**Owner:** Casey Young  
**State:** SYNC CORRECTED / COMMERCE FUNCTIONALITY ONLY / PROTECTED TOP EXCLUDED  
**Parent:** `COMMERCIAL_REVENUE_ACCELERATION_DIRECTIVE_2026-09-12.md` + `COMPANY_OPS_COMMERCIAL_SWEEP_WORKTREE_2026-09-12.md` + `OWNER_DIRECTIVE_HOMEPAGE_LOCK_2026-09-12.md`  
**Execution Lane:** MASTER DEVELOPER when technical work is required  
**Management:** PM4 / Company Operations

## Correction

The earlier interpretation of this work order as broad permission to change homepage store merchandising is superseded by Casey's newer explicit clarification and the Master SOP authority hierarchy.

The authorized scope is **commerce functionality**. The carefully built top homepage experience is not part of this work order.

## Authorized commerce work

Developer and commerce workers may perform bounded work on:

- catalog/product/item records;
- store/category/collection pages;
- commerce navigation and browse paths;
- exact product/store links and routes;
- shopability, Buy Now and checkout routing;
- source, availability and fulfillment bindings;
- store search/filter behavior;
- approved commerce APIs and integrations;
- backend/catalog logic needed for store operation when protected top output is unchanged.

Use existing Project/vendor source authority for product economics and promotion classification.

## Protected top homepage — excluded from this work order

No direct or indirect change is authorized to the protected top homepage experience, including:

- layout/structure;
- images/backgrounds;
- copy/headlines/printed wording;
- CTAs, CTA destinations or CTA behavior;
- typography/colors/spacing/styles;
- animations/slides/rotation/timing;
- product bindings, product ordering or selection;
- data bindings and top links;
- responsive visibility/placement;
- runtime behavior;
- shared API/data changes that alter what the protected top renders.

## `/api/store/featured` correction

The previous work order identified `/api/store/featured` as a preferred target. That is **not blanket authorization to change that endpoint**.

Before modifying `/api/store/featured`, `site/_worker.js`, catalog ordering, a shared data source or any related dependency:

1. identify every current consumer of the proposed change;
2. determine whether the protected top homepage consumes it directly or indirectly;
3. verify the proposed change leaves the protected top rendered/runtime output unchanged;
4. if protected top output would change, HOLD the exact mutation and route it to Casey for explicit approval;
5. continue unrelated commerce work through product/store/collection/channel surfaces.

A technically backend-only change is still a protected-top mutation if its effect changes the protected top.

## Product promotion gate

Before concentrated traffic, a candidate still requires its owning lane to resolve material commercial facts:

**EXACT SOURCE/SKU → CURRENT ORDERABILITY → PRICE/MAP → SOURCE COST → SHIPPING/FREIGHT → PAYMENT/CHANNEL COST → POSITIVE EXPECTED CONTRIBUTION → CONTROLLED WORKING-CAPITAL EXPOSURE → RELIABLE FULFILLMENT → WORKING PURCHASE PATH.**

Use `PROMOTE / VERIFY / REPRICE / HOLD / RETIRE` as appropriate.

Do not infer `PROMOTE` from catalog presence, product title, supplier name, update recency or gross selling price.

## Approved revenue surfaces without touching protected top

Revenue acceleration can continue through:

- product pages;
- Shopify store and collections;
- Universal Catalog/store routes;
- Elevation Gear/Apparel surfaces;
- Fourthwall native store/product checkout;
- vendor/category pages;
- TikTok/creator/social deep links;
- direct/email links;
- store navigation/search/browse improvements;
- checkout/payment/fulfillment fixes;
- other approved commerce channels.

## SOK carve-out

SOK remains protected under `OWNER_DIRECTIVE_SOK_PROTECTION_2026-09-12.md`.

Do not use this work order to reprice, rebuild, deactivate, contract or restart protected SOK listings/current Project work.

## Acceptance tests

Any technical work under this order must prove:

1. protected top homepage rendered/runtime behavior unchanged;
2. protected top copy/images/CTA/layout/product selection unchanged;
3. no indirect shared-data/API effect changes protected top output;
4. the exact intended commerce path is improved or repaired;
5. source/product identity remains correct;
6. checkout/Buy Now routing remains correct;
7. mobile/desktop commerce behavior passes for the exact changed surface;
8. canonical QA passes;
9. isolated preview is used for code changes before production under normal deployment control.

## Deployment rule

**CURRENT MAIN → FOCUSED CHANGE → QA → ISOLATED PREVIEW → VERIFY PROTECTED TOP UNCHANGED → NORMAL RELEASE GATE → PRODUCTION → LIVE SMOKE.**

If protected top changes at all, do not release under this work order.

## Control phrase

**COMMERCE FUNCTIONALITY CAN MOVE → PROTECTED TOP IS OUT OF SCOPE → CHECK SHARED DEPENDENCIES → SELL THROUGH STORE / PRODUCT / COLLECTION / CREATOR PATHS → OWNER APPROVAL REQUIRED FOR ANY TOP-HOMEPAGE DELTA.**