# ELEVATION UPSCALES — MPM 5 SHOPIFY SALES-CHANNEL RECON

**Date:** 2026-09-12  
**Role:** MPM 5 / Operating System Project Manager  
**State:** RECONCILED — SALES-CHANNEL / PUBLICATION REPAIR IS PRIMARY ITEM-PURCHASABILITY LANE  
**Observed `main` at recon:** `e985b1f0ecae7f0d20b69c5f524f890be19a13a0`

## Owner clarification

Casey clarified that the suspected Shopify problem is not primarily checkout itself; the likely item-purchasability defect is the Shopify sales-channel/publication state.

MPM 5 accepts this distinction and reconciles the operating truth accordingly.

## Reconciled truth

There are two separate P0 Shopify concerns and they must not be conflated.

### A. Product purchasability / visibility — SALES CHANNEL / PUBLICATION

Current COM2 Shopify evidence recorded:

- 103 products in ACTIVE status;
- 53 ACTIVE + published;
- 50 ACTIVE + unpublished.

An ACTIVE Shopify product is not automatically available to customers through the Online Store sales channel. The 50 ACTIVE + unpublished records therefore represent a direct upstream product-purchasability/publication gap.

**Primary lane owner:** Shopify Store Operations Manager / Worker.

**Current state:** IN EXECUTION / REPAIR RECEIPT PENDING.

Required lane return:

1. classify each affected ACTIVE + unpublished product as `INTENDED PUBLIC`, `INTENTIONAL HOLD`, or `RETIRE`;
2. publish only intended customer-facing products to the correct Shopify sales channel(s), especially Online Store where applicable;
3. verify exact product + variant availability on the published channel;
4. verify public product URL and Add-to-Cart/Buy path for representative repaired items;
5. return exact before/after counts and tested URLs;
6. preserve vendor-specific source, MAP, legal/compliance and fulfillment holds.

Do not bulk-publish blindly.

This work is already owned by Shopify Store Operations. MPM 5, COM2, MASTER DEVELOPER and other workers must not create a duplicate product-publication sweep while that lane is executing.

### B. Card / Shop Pay acceptance — SHOPIFY PAYMENTS ACCOUNT SETUP

Separate evidence shows Shopify Payments currently presents `Complete setup` in Shopify Admin.

This does **not** explain why an ACTIVE product is unpublished or missing from the Online Store sales channel. It is a separate downstream payment-method readiness issue.

Until setup is verified active:

- preserve PayPal as the established fallback path;
- do not claim Card / Shop Pay is production-payment-ready merely because the UI renders it;
- Shopify Store Operations / owner completes any required account onboarding directly in Shopify;
- after activation, perform an authorized end-to-end payment verification.

## Customer failure attribution

A real customer reported checkout/purchase failure, but the exact attempted product was not yet identified in the current COM2 audit.

Therefore MPM 5 does **not** conclusively attribute that customer's failure to Shopify Payments or to sales-channel publication yet.

Once the exact product is known:

**EXACT PRODUCT → PRODUCT STATUS → SALES-CHANNEL PUBLICATION → VARIANT AVAILABILITY → PUBLIC URL → CART → CHECKOUT → PAYMENT METHOD**

Use that order to locate the actual break point.

## Developer boundary

MASTER DEVELOPER does not own Shopify product publication or sales-channel assignment.

Developer work remains limited to verified website-code defects such as the homepage live-product feed inconsistency, malformed duplicate heading, public-copy defects, and preservation of trusted purchase/exception routing under the P0 coding-recovery controls.

If the homepage says products are unavailable because its code/API ignores valid Shopify publication truth, that is a developer defect. The underlying Shopify publication repair remains Shopify Store Operations.

## MPM 5 disposition

**PRIMARY ITEM-PURCHASABILITY HYPOTHESIS: SALES-CHANNEL / PUBLICATION GAP — SUPPORTED BY CURRENT EVIDENCE.**

**CHECKOUT/PAYMENT: SEPARATE DOWNSTREAM VERIFICATION — NOT THE SAME DEFECT.**

**SHOPIFY PUBLICATION REPAIR: OWNED / IN EXECUTION / RECEIPT PENDING.**

**NO DUPLICATE REPAIR LANE AUTHORIZED.**

Control phrase:

**ACTIVE PRODUCT ≠ CUSTOMER-PURCHASABLE PRODUCT → VERIFY SALES CHANNEL FIRST → VERIFY VARIANT/PUBLIC URL → THEN CART/CHECKOUT → THEN PAYMENT.**
