# Elevation UpScales — Renogy Profitability RUN Receipt

**Status:** ACTIVE / PROFITABILITY GATE APPLIED  
**Date:** 2026-09-12 MDT  
**Owner:** Casey Young  
**Manager:** Renogy Branch Operations Manager Specialist  
**Parent Control:** `DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md`  
**Renogy Profit Control:** `RENOGY_DIRECT_SITE_PROFITABILITY_APPLICATION_2026-09-12.md`

## Git-first reconciliation

Current `main` was re-resolved before this RUN at `93f518db0303dc22cfb3e786205849605c126019`.

The newest repository delta is unrelated VEVOR worker/feed work and does not supersede the Renogy profitability controls.

## Profitability workflow now controlling Renogy

Renogy activation and promotion requires:

**EXACT SKU → CURRENT RENOGY PRICE CONTROL → CURRENT PROTECTED DEALER ECONOMICS → CURRENT DEALER ORDERABILITY → APPROVED MEDIA → CURRENT SHIPPING/FREIGHT TREATMENT → CURRENT PROCESSOR/PLATFORM FEES → POSITIVE ORDER CONTRIBUTION → ACTIVATE/PROMOTE → CUSTOMER ORDER → ORDER-TIME RECHECK → FULFILL → RECORD ACTUAL PROFITABILITY.**

Protected dealer prices, private supplier economics, credentials, and account-only data must not be written into public Git.

## Checkout-fee recon

Current official Shopify and PayPal public fee schedules were reviewed for the intended US direct-site checkout paths.

The two lead Renogy candidates retain positive protected pre-shipping contribution under the currently published ordinary Shopify/PayPal fee scenarios reviewed during this RUN. Exact protected amounts are intentionally omitted from Git.

This narrows the remaining economics gate: transaction fees alone do not currently eliminate the positive contribution buffer on either lead candidate, but shipping/freight and exact order-level treatment must still be verified before `PROMOTE`.

## Lead SKU states

### `RSP100DCT-US` / supplier alias `RSP100DCT-G1-US`

- exact SKU mapping: VERIFIED
- current public price-control reference: VERIFIED in prior Renogy RUN
- protected dealer economics: AVAILABLE / POSITIVE PRE-SHIPPING CONTRIBUTION UNDER CURRENT FEE RECON
- approved media path: VERIFIED
- authenticated Partner Portal session: VERIFIED through Opera
- exact dealer orderability/backorder authority: OPEN
- exact order-level shipping/freight treatment: OPEN

**Decision:** `HOLD — ECONOMICS / ORDERABILITY FINALIZATION`.

Do not discount. This SKU has less protected economic room than the RBM500 launch candidate, so freight or promotional discounting can materially change profitability.

### `RBM500-US` / supplier alias `RBM500-G3-US`

- exact SKU mapping: VERIFIED
- current public price-control reference: VERIFIED in prior Renogy RUN
- protected dealer economics: AVAILABLE / POSITIVE PRE-SHIPPING CONTRIBUTION UNDER CURRENT FEE RECON
- authenticated Partner Portal session: VERIFIED through Opera
- exact dealer orderability/backorder authority: OPEN
- exact approved product media: OPEN
- exact order-level shipping/freight treatment: OPEN

**Decision:** `HOLD — ORDERABILITY / MEDIA / SHIPPING FINALIZATION`.

The protected economics provide a stronger contribution buffer than the 100W panel under the current launch-wave comparison, so RBM500 remains the stronger profitability candidate once its media and supplier-state gates clear.

## Portal execution state

Opera proves the Renogy Partner Portal is authenticated for Elevation UpScales, Inc. The current Opera connector can read the authenticated page and navigate explicit URLs, but it does not expose a click/press action for the portal SPA Products menu. Guessed `/product` and `/products` URLs are not valid portal routes.

Therefore, this RUN does not claim exact SKU orderability from the authenticated session. No password/security changes, cart mutation, order placement, payment change, or tax-setting change was performed.

## Promotion control

Neither lead SKU is authorized for active promotion yet.

The next clean promotion decision requires the remaining exact supplier facts only; the broader Renogy program is not blocked.

### Required next proof

1. resolve exact Partner Portal product route or interactive control for `RSP100DCT-G1-US` and `RBM500-G3-US`;
2. verify dealer orderability/backorder authority;
3. verify exact Lower-48 shipping/freight charged to Elevation for each SKU/order path;
4. locate/bind exact approved RBM500 media;
5. run final protected contribution calculation;
6. return `PROMOTE` only when expected contribution remains greater than $0;
7. activate each clean SKU individually;
8. run public product → cart → checkout QA;
9. on first paid Renogy order, reverify supplier cost/orderability/shipping and record actual contribution.

## Catalog expansion application

The Lower-48 Renogy catalog should now be prioritized by:

**DEMAND / PURCHASE FRICTION + EXPECTED DOLLAR CONTRIBUTION + CONTRIBUTION RATE + BRAND FIT + FULFILLMENT RELIABILITY + SUPPORT / RETURN RISK.**

Do not use low ticket price alone as launch priority. Do not publish/promote a Renogy SKU whose material economics can still become non-positive.

**CONTROL:** `VERIFY CONTRIBUTION → CLEAR EXACT SUPPLIER STATE → PROMOTE PROFITABLE RENOGY PRODUCTS → RECORD ACTUALS → SCALE WINNERS.`
