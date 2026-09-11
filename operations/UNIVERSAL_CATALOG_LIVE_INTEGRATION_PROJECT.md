# Elevation UpScales — Universal Catalog Live Integration Project

**Owner:** Casey Young  
**Project Manager:** Operating System Project Manager / Company Operations routing  
**Execution Lane:** Developer / Catalog Integration  
**Status:** ACTIVE / CROSS-VENDOR ACCEPTANCE LANE  
**Acceptance Baseline:** `UNIVERSAL_CATALOG_VENDOR_INTEGRATION_ACCEPTANCE_BASELINE_2026-09-10.md`  
**Search Recon:** `STORE_SEARCH_DISCOVERABILITY_RECON_2026-09-10.md`

## Purpose

Provide one developer acceptance worktree for the shared universal catalog so vendor projects can finish independently without leaving the company with four incompatible storefront implementations.

This project does **not** own vendor commercial onboarding. It consumes verified vendor facts from the dedicated Project Sources and tests/implements the shared catalog/store behavior needed to make those vendors customer-operational.

## Current vendor inputs

### SOK

Project Source: `vendor-project-sources/SOK_PROJECT_SOURCE.md`

State: active primary supplier; public catalog/product visibility already exists; Lower-48 commerce controlled; special Hawaii/logistics work remains separate.

### VEVOR

Project Source: `vendor-project-sources/VEVOR_PROJECT_SOURCE.md`

State: direct Shopify catalog materially launched; public storefront/accessibility + universal-store representation + first-order proof remain acceptance work.

### Renogy

Project Source: `vendor-project-sources/RENOGY_PROJECT_SOURCE.md`

Sales Scope: `RENOGY_SALES_FIRST_CATALOG_SCOPE_2026-09-10.md`

Launch Batch: `RENOGY_CATALOG_LAUNCH_BATCH_01_2026-09-10.md`

State: approved dealer, Batches 01–02 accepted, zero Renogy Shopify products at the sales-first recon, launch-wave construction/readiness now active.

### Kingboss

Project Source: `vendor-project-sources/KINGBOSS_PROJECT_SOURCE.md`

State: B2B approved / waiting on supplier onboarding data; public navigation reference is not proof of live catalog completion.

## Worktree

### 1. Reconcile vendor source readiness

Read each dedicated vendor Project Source. Do not re-onboard vendors or independently redefine supplier rules.

Classify the launch state for each vendor:

- SOURCE READY
- CATALOG MAPPING ACTIVE
- PRODUCT STAGING ACTIVE
- LIVE / FIRST ORDER OPEN
- CONTROLLED
- WAITING ON SUPPLIER SOURCE

### 2. Verify universal catalog data model

Confirm each vendor/product can retain:

- vendor/source;
- exact supplier SKU/model;
- product/category identity;
- public price/MAP state;
- availability/preorder/backorder state;
- fulfillment mode;
- destination controls;
- warranty/reference state;
- source provenance;
- order-source identity.

Repair only confirmed integration gaps.

### 3. Verify universal storefront behavior

Using the existing approved design/copy:

- store search;
- department/category filters;
- vendor/product discoverability;
- product detail routing;
- direct-buy state;
- assisted-purchase/freight state;
- cart/checkout;
- mobile/desktop behavior;
- legacy URL continuity where required.

Do not redesign the store while doing integration QA.

### 4. Vendor-by-vendor live acceptance

For each active vendor, verify a representative product set against the universal acceptance baseline.

Do not block one clean vendor because another is WAITING.

### 5. Search/discoverability acceptance

Confirm intended public vendor/product routes are crawlable/discoverable. Use public search recon as evidence; use Google Search Console/Merchant Center as authority when account access exists.

### 6. First-order proof

Capture the first real direct-commerce order proof per vendor when demand produces it. Lack of an order does not stop safe catalog publication, but Stage 2 CONTROLLED requires order proof.

### 7. Company-wide completion gate

Only claim **UNIVERSAL CATALOG LIVE INTEGRATION SATISFIED** when every current active dedicated vendor meets its intended universal-catalog path and the shared store passes the acceptance baseline.

Future vendor additions do not invalidate the old proof; they enter the same acceptance lane as a new vendor integration.

## Current priority

1. Finish Renogy sales-first launch-wave construction/readiness while protected publication facts are reconciled.
2. Finish VEVOR public-store/universal-catalog acceptance and first-order proof.
3. Preserve SOK as the working reference implementation while closing only true residual defects.
4. Hold Kingboss catalog activation until its verified onboarding source arrives; do not fabricate a catalog to satisfy the matrix.
5. Verify cross-vendor universal search/filter/cart/order-source behavior.
6. Verify public search discoverability for intended live vendor/product routes.

## Gate rule

A supplier-specific missing fact gates only that vendor/SKU action.

A shared universal-store defect gates all affected vendors only when evidence proves the defect is shared.

Do not use vendor onboarding status, project-manager review, optional enrichment, or absence of a first order as a blanket reason to stop safe catalog construction.

## No unauthorized design/copy changes

Developer lane may not, under this project alone:

- redesign storefront pages;
- change approved navigation style;
- rewrite approved marketing copy;
- change brand positioning;
- add unsupported supplier/dealer claims;
- alter product promises beyond verified source facts.

Any necessary customer-facing copy correction caused by a factual/safety defect should be routed for the appropriate bounded approval unless it is a direct correction of an objectively incorrect operational fact already authorized by controlling SOP/source evidence.

## Return format

**UNIVERSAL CATALOG CURRENT:**  
**SOK ACCEPTANCE:**  
**VEVOR ACCEPTANCE:**  
**RENOGY ACCEPTANCE:**  
**KINGBOSS ACCEPTANCE:**  
**SHARED STORE FUNCTION:**  
**SEARCH/DISCOVERABILITY:**  
**BLOCKERS BY EXACT LANE:**  
**NEXT DEVELOPER ACTION:**  
**COMPANY-WIDE ACCEPTANCE READY:** YES / NO
