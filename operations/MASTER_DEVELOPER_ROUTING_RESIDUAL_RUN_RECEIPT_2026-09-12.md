# Elevation UpScales — MASTER DEVELOPER Routing Residual RUN Receipt

**Date:** 2026-09-12  
**Owner:** Casey Young  
**Lane:** MASTER DEVELOPER / Website Routing & Commerce Integrity  
**Status:** SOURCE RESIDUALS COMPLETE / SHARED-SHELL HOLD / PRODUCTION DEPLOYMENT NOT CLAIMED

## Scope

Execute the smallest safe website routing/content-integrity residuals from the current Work Board while preserving:

- the owner-protected top homepage experience;
- current SOK listings, pricing and active SOK work;
- working checkout and store behavior;
- retired Marketplace architecture rather than recreating it.

## Completed

### 1. Retired Report-an-Issue route corrected

Prior state:

`/report-an-issue*` redirected customers to `/store`, even though the shared support dialog presented the destination as website help.

Current source state:

- `/report-an-issue` → `/other-ways-we-can-help` (`301`)
- `/report-an-issue/` → `/other-ways-we-can-help` (`301`)
- `/report-an-issue.html` → `/other-ways-we-can-help` (`301`)

Reason: the old Marketplace issue-report APIs are intentionally retired in the Worker and return `410 Gone`; rebuilding the retired issue-report backend would recreate dead architecture. The existing help/contact surface is the safe active destination.

Source commit: `e4f98e33ec3bc1bd5ece2528f0093083475731ec` — `Dev: route retired issue path to active help surface`

### 2. Stale Marketplace/Create Listing language removed from help surface

`site/other-ways-we-can-help.html` no longer presents retired Marketplace/Create Listing actions as live customer options.

The page now routes customers toward the active Elevation Store, Apparel, RV/Outdoor, Solar Builder, Work With Us and direct follow-up/contact paths.

Source commit: `4216c60860ee8d179f1445eedf7c86de1a0ad495` — `Dev: retire stale Marketplace copy on help surface`

### 3. `/universal/local-products.js` disposition

Source recon found no active reference to `local-products.js` in the current universal-store path, including:

- `site/store.html`
- `site/universal-store.js`
- `site/store-catalog-resilience.js`
- `site/script.js`

The current store uses the normalized commerce catalog/API path and resilience loader. Therefore the observed `/universal/local-products.js` 404 is classified as a **LEGACY ARTIFACT / NOT AN ACTIVE STOREFRONT DEFECT** unless a future current-source reference proves otherwise.

Do **not** recreate a dead `local-products.js` file merely to eliminate a historical 404.

### 4. Hawaii pre-payment freight gate source verification — PASS

The current commerce source already prevents unsafe Hawaii lithium payment:

- `quoteStoreItem()` identifies actual lithium shipping to `HI` and resolves the exact Hawaii customer/route state.
- `createStoreOrder()` rejects `review_required` with `409 Freight Review Required` before PayPal order creation.
- `createStoreOrder()` rejects `unavailable` with `409 Currently Unavailable for Hawaii Shipping` before PayPal order creation.
- Hawaii payment is allowed only when `customerState === "shipping_available"`.
- `customerState === "shipping_available"` requires the lithium shipping record to be `INTERNAL REQUIREMENTS SATISFIED` and at least one destination route to be `APPROVED`.
- destination `APPROVED` state passes through `routeApprovalBlockers()` before it can be written.
- the active HI shipping rule is consolidated freight to Honolulu pickup, `pickupOnly=true`, with preferred consolidation of 3 compatible batteries.
- final-mile/address delivery is a separate quote-required rule and is not silently bundled into the standardized Honolulu-pickup price.

Disposition: **SOURCE-LEVEL PASS / NO GENERIC CHECKOUT MUTATION REQUIRED.**

This verification did not change SOK product listings, pricing, source records or active SOK operating work.

## Protected dependency hold

The current shared `site/site-shell.js` still contains Marketplace references in global Company navigation/footer and the support-dialog `Report an Issue` label.

`site/site-shell.js` is a shared runtime dependency and can affect homepage-rendered output. Under the current owner homepage boundary, this shared-shell mutation is **HOLD — PROTECTED TOP DEPENDENCY** until the change can be previewed and proven not to alter the protected top homepage experience or Casey explicitly authorizes the exact output change.

This hold does not block unrelated commerce work.

## Deployment state

The repository deployment workflow does **not** automatically deploy from `main`. `deploy-pages.yml` deploys on manual workflow dispatch or push to the dedicated `production-deploy` branch, with production authorization and canonical QA gates.

Therefore:

- Git source updates: **COMPLETE**
- production deployment: **NOT CLAIMED / NOT TRIGGERED BY THESE COMMITS**
- production live verification: **PENDING AUTHORIZED DEPLOYMENT**

Do not equate Git commit with production release.

## Remaining exact Dev residuals

1. Preview/prove any shared-shell Marketplace cleanup against the protected-top homepage boundary before mutation/release.
2. Run canonical preview/live smoke through the controlled deployment path when authorized.
3. Continue only the smallest remaining Issue #65 / catalog acceptance residuals; do not rebuild already-merged architecture.
4. Exact Renogy delayed-order checkout proof remains product-triggered: test only when the owning Renogy lane provides an activation-ready delayed-order SKU.
5. Shopify/SOK paid-order OS bridge remains real-order-triggered; do not manufacture an order.

## Guardrails verified

- **SOK listings/work: UNTOUCHED**
- **Protected top homepage files/output: NO INTENTIONAL MUTATION**
- No retired Marketplace backend recreated.
- No dead local catalog asset recreated.
- Hawaii pre-payment gate source behavior remains fail-closed for unapproved freight.
- No production deployment claimed without evidence.

## Control state

**ROUTING SOURCE FIXED → STALE HELP COPY FIXED → LEGACY 404 CLASSIFIED → HAWAII PRE-PAYMENT GATE SOURCE PASS → SHARED-SHELL DELTA HELD AT PROTECTED DEPENDENCY → DEPLOYMENT REMAINS SEPARATELY GATED.**
