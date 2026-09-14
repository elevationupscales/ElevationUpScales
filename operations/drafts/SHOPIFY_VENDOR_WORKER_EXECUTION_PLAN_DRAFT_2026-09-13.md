# DRAFT — SHOPIFY STOREFRONT + VENDOR WORKER EXECUTION PLAN

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Status:** DRAFT / NOT CONTROLLING  
**Primary execution priority:** Renogy first  

## Objective

Turn Shopify from a generic mixed catalog into a trusted Elevation commerce surface while each vendor manager owns the exact commercial/product truth for its own catalog.

Do not create another management layer. This plan connects existing vendor managers to Shopify Store Operations through one shared activation standard.

## Workstreams

### A. Shopify Storefront Visual Design Worker

Controlling design handoff already exists on `main`:

`operations/SHOPIFY_STOREFRONT_VISUAL_DESIGN_HANDOFF_2026-09-13.md`

Current candidate state at preparation time:

- theme candidate: `Elevation Hero Conversion Candidate 2026-09-13`;
- approved exact hero asset installed in candidate;
- candidate processing PASS;
- candidate remains UNPUBLISHED pending merchant-final Publish click;
- current live theme remains `Horizon` until that click;
- rollback: `Horizon Pre-Hero Backup 2026-09-13` — preserve and do not publish accidentally.

After merchant publish, visual worker / Shopify manager should verify candidate is MAIN, smoke desktop/mobile/navigation/cart, then implement only real theme-native CTA controls such as `Shop Batteries` and `Shop Solar & RV` with tested destinations. Do not modify the hero artwork merely to fake buttons.

### B. Vendor Manager → Shopify lane

Every vendor manager uses:

`operations/drafts/SHOPIFY_VENDOR_TO_STORE_ACTIVATION_STANDARD_DRAFT_2026-09-13.md`

Vendor managers return exact-SKU commercial truth. Shopify handles record reconciliation, activation and live checkout QA.

## Execution order

### 1. RENOGY — ACTIVE FIRST PRIORITY

Use:

`operations/drafts/RENOGY_SHOPIFY_VENDOR_MANAGER_EXACT_SKU_RECON_DRAFT_2026-09-13.md`

Immediate reason: current Shopify has only one ACTIVE Renogy product and the near-$100 staged records show exact-SKU drift against Renogy's current dealer workbook. Do not bulk-publish stale DRAFT records.

First output required:

**RENOGY EXACT-SKU RECON → READY cohort → Shopify bounded activation wave → live smoke.**

### 2. SOK — PURCHASE PATH ALREADY GREEN

Use:

`operations/drafts/SOK_SHOPIFY_VENDOR_MANAGER_WORKFLOW_DRAFT_2026-09-13.md`

Do not reopen checkout. Improve exact-SKU media, shipping/warranty confidence and availability presentation while preserving the nine-SKU working purchase path.

### 3. VEVOR — CLEAN EXISTING DIRECT-SITE CATALOG

Use:

`operations/drafts/VEVOR_SHOPIFY_VENDOR_MANAGER_WORKFLOW_DRAFT_2026-09-13.md`

Focus on exact SKU/orderability, official media depth, customer-safe copy and current shipping truth. No blanket publication of hidden/staged inventory and no inference of marketplace permission.

### 4. KINGBOSS — PREPARED / DOWNSTREAM

Use:

`operations/drafts/KINGBOSS_SHOPIFY_VENDOR_MANAGER_WORKFLOW_DRAFT_2026-09-13.md`

Activate only after current direct-site commercial truth is returned. Never substitute Kingboss identity into SOK/Renogy listings.

## Parallelism rule

The storefront visual worker may continue safe presentation work while vendor managers recon their own catalogs, provided neither changes price, supplier truth, payment configuration, shipping truth or fulfillment logic outside its lane.

Shopify publication remains serialized by bounded activation wave so customer-path QA can attribute failures to one change set.

## Current sequence

**HERO CANDIDATE WAITING FOR MERCHANT PUBLISH**  
**+ RENOGY EXACT-SKU VENDOR RECON ACTIVE**  
→ **RENOGY WAVE 1**  
→ **VERIFY LIVE STORE + CHECKOUT**  
→ **SOK TRUST/MEDIA ENRICHMENT**  
→ **VEVOR CLEANUP/READY COHORTS**  
→ **KINGBOSS READY COHORT**  
→ **STORE-WIDE VISUAL/TRUST QA**  
→ **FIRST REAL ORDER / ACTUAL PROFIT RECEIPT**

## Final acceptance target

The workflow is not complete because files exist. It is complete when the final storefront:

- no longer presents as a generic stock Shopify store;
- uses the approved Elevation hero and functional native CTAs;
- presents vendor authorization accurately;
- has curated, exact-SKU product pages with official media and verified facts;
- carries supplier-specific availability/shipping/warranty confidence;
- preserves card + PayPal purchaseability;
- has no stale/normalized SKU identity errors in active products;
- live-smokes cleanly from PDP through payment-page reachability;
- converts a real order and records actual contribution.
