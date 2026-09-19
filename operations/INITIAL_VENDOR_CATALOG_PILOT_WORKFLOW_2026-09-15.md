# Elevation UpScales — Initial Vendor Catalog Pilot Workflow

**Owner:** Casey Young  
**Date:** 2026-09-15  
**State:** ACTIVE / OWNER-DIRECTED INITIAL LAUNCH  
**Applies to:** Shopify catalog truth → Universal Catalog → Web V2 direct-site catalog

## Authority / amendment

This file records Casey Young's 2026-09-15 owner direction and amends the current catalog-publication portions of:

- `CURRENT_WORK_BOARD.md`;
- `SHOPIFY_STORE_OPERATIONS_CURRENT_WORKTREE.md`;
- prior broad `NO NEW LISTINGS` / `DO NOT EXPAND CATALOG` language where that language would block this bounded pilot.

It does **not** reopen paid acquisition, third-party marketplace expansion, payment-architecture mutation, unsupported vendor claims, or bulk publication.

## Owner direction

Reduce initial launch workload.

Use the existing Shopify product records as the practical listing baseline instead of rebuilding every vendor catalog before launch.

Initial direct-site catalog scope:

1. **SOK — FULL INITIAL LAUNCH**
   - SOK remains Elevation's primary battery supplier.
   - Launch the complete current 9-SKU SOK Shopify baseline into the Web V2 Universal Catalog.
   - Preserve exact SKU, current Shopify sell price, approved media, MAP/floor controls, direct-site channel authority, and current delayed-order rules.
   - Mainland / Lower-48 truth remains separate from Hawaii freight activation.

2. **RENOGY — ONE-SKU PILOT**
   - Use one already-live, commercially clean Shopify product for the first Web V2 test listing.
   - Pilot SKU: `RNG-INVT-3000-12V-P2-G3-US` — Renogy 3000W 12V Pure Sine Wave Inverter.
   - Do not bulk-stage or publish the remaining Renogy catalog during this pilot.

3. **VEVOR — ONE-SKU PILOT**
   - Use one already-live, direct-VEVOR Shopify product for the first Web V2 test listing.
   - Pilot SKU: `XXKLJT124INCLJF0QV0` — VEVOR Camper Levelers.
   - Current VEVOR price-floor / source / stock truth must remain controlled; no bulk publication of the hidden VEVOR staging cohort.

4. **KINGBOSS — ONE-SKU VERIFICATION PILOT**
   - Carry one Kingboss candidate into the Universal Catalog as the vendor test record.
   - Candidate: Doba SKU `D01027HH7BV`.
   - Supplier attribution to Kingboss is supported, but exact manufacturer-model mapping is not yet locked.
   - Keep checkout disabled until exact manufacturer SKU/model, direct commercial terms, shipping, warranty/RMA, approved media, channel authorization, and fulfillment source are verified.
   - Do not invent a manufacturer model or activate a broad Kingboss catalog.

## Pilot size

**Initial catalog target: 12 records total**

- SOK: 9
- Renogy: 1
- VEVOR: 1
- Kingboss: 1 verification-hold record

This replaces the prior approach of trying to reconcile every staged vendor SKU before the first usable Web V2 catalog launch.

## Shopify baseline rule

Shopify is the practical staging baseline for what Elevation has already built.

For each pilot product:

**SHOPIFY RECORD → VERIFY AGAINST VENDOR SOURCE → NORMALIZE INTO UNIVERSAL CATALOG → WEB V2 LISTING → CART/ORDERABILITY ONLY WHEN GATES PASS**

Shopify status alone is not supplier truth. Supplier truth still controls identity, price/MAP, sellability/backorder, shipping, warranty/returns, fulfillment, and channel authorization.

## Required SKU states

Every pilot record is classified as one of:

- `LIVE / ORDERABLE`
- `LIVE / PREORDER OR BACKORDER AUTHORIZED`
- `VERIFICATION HOLD / NOT ORDERABLE`

No missing fact may be converted into an affirmative claim merely to make the pilot green.

## Expansion rule

Do not expand the pilot merely because additional Shopify drafts exist.

Expansion occurs vendor-by-vendor after the pilot proves:

**PRODUCT RENDERS → PRODUCT DETAIL RENDERS → CART RESOLVES → SOURCE IDENTITY SURVIVES → HOLD STATES FAIL CLOSED → NO DUPLICATE PRODUCT → CUSTOMER PATH REMAINS STABLE**

Then add the next verified SKU or bounded batch.

## RUN sequence

**GIT FIRST → RE-RESOLVE CURRENT MAIN → RECORD THIS OWNER AMENDMENT → INGEST 9 SOK SHOPIFY RECORDS → SELECT 1 RENOGY LIVE SKU → SELECT 1 VEVOR LIVE SKU → CARRY 1 KINGBOSS HOLD RECORD → UPDATE CATALOG TESTS → QA → PR → MERGE ONLY IF GREEN → BUILD/VERIFY IMMUTABLE CANDIDATE UNDER NORMAL WEB V2 RELEASE CONTROL.**

## Guardrails

- No paid ads.
- No broad VEVOR 50-product release.
- No remaining 145 Renogy SKU bulk import.
- No Kingboss broad storefront activation.
- No third-party marketplace authorization inference.
- No Hawaii promise inferred from Lower-48 orderability.
- No payment architecture changes in this pilot.
- No visual redesign outside product-card/media data required by the catalog records.

## Close condition

Pilot is complete when the current Web V2 catalog contains the 12-record initial scope, all tests pass, the exact commit is available as an immutable candidate, SOK is fully represented, Renogy and VEVOR each have one clean direct-site pilot record, and the Kingboss record visibly remains fail-closed until its missing source facts are verified.
