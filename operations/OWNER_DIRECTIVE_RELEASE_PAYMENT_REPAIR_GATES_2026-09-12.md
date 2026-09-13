# ELEVATION UPSCALES — OWNER DIRECTIVE: RELEASE PAYMENT-REPAIR EMERGENCY GATES

**Date:** 2026-09-12  
**Owner:** Casey Young  
**Status:** ACTIVE / IMMEDIATE OVERRIDE  
**Scope:** Bounded ElevationUpScales.com cart / checkout / PayPal repair only

## Owner decision

The catastrophic-failure containment gates were appropriate while the payment-architecture fault was unknown. The source issue and replacement lane boundaries are now sufficiently identified to resume the bounded repair.

**REMOVE THE GATES THAT STOP THE BUILD. BUILD → TEST → SMOKE CHECK → DEPLOY THE SAME SHA.**

This directive supersedes any current control sentence that requires MASTER DEVELOPER to remain STANDBY or requires a separate pre-build MASTER RECON PASS before work may begin on the already-defined bounded direct-site payment repair.

## Gates released for this repair

Effective immediately:

- production-wide emergency freeze is lifted **only for the bounded direct-site cart / checkout / PayPal repair**;
- MASTER DEVELOPER moves from STANDBY to **ACTIVE — BOUNDED PAYMENT REPAIR**;
- MASTER RECON PASS is **not a pre-build blocker**;
- MPM replacement architecture is accepted as build authority for this bounded repair;
- DEV may build from the exact approved production lineage now;
- RECON may validate the candidate/integrity in parallel and must not recreate the retired pre-build hold;
- after tests and non-charging smoke pass, the **same tested candidate SHA** is authorized to deploy without another architecture-design gate.

## Required execution sequence

**PRODUCTION PARENT → BOUNDED BUILD → AUTOMATED TESTS → NON-CHARGING SMOKE → SAME-SHA DEPLOY → LIVE NON-CHARGING VERIFY → RECEIPT.**

If the candidate fails tests or smoke, fix forward on the bounded repair branch and repeat tests/smoke. Do not promote an untested SHA.

## Architecture remains fixed

### Elevation direct site

**ELEVATION PRODUCT/CART → ELEVATION CHECKOUT → PAYPAL ORDERS V2 → ELEVATION LOCAL ORDER RECORD → PAYPAL CAPTURE → ELEVATION FULFILLMENT ROUTING**

- Elevation owns the direct checkout.
- PayPal Orders v2 create/capture remains server-side.
- Product, price, variant, shipping and amount are revalidated server-side from canonical product truth.
- A valid local order intent exists before capture.
- Stable idempotency is required for create/capture retries.
- Paid transition requires amount/currency/order/capture reconciliation.
- No direct-site order may fall through to Shopify as a payment fallback.

### Shopify

**SHOPIFY PRODUCT → SHOPIFY CHECKOUT → SHOPIFY PAYMENTS / SUPPORTED METHODS → SHOPIFY ORDER → SHOPIFY PAYOUT**

Shopify is working and is **PRESERVE**. Do not modify Shopify payment configuration to solve the Elevation direct-site repair.

## Safeguards that remain in force

These are not blockers to the build; they are release safety controls:

- stale candidate `84af23ec814baa73718e33ec052044ce4706534d` remains **DO NOT DEPLOY**;
- do not wholesale-deploy `main`;
- build from the exact approved production lineage, not a stale branch;
- no secret or PayPal credential may be committed to Git;
- no raw card handling is added;
- no protected-homepage-top change;
- no Shopify-native checkout rewrite;
- no new product listings/catalog expansion as part of this repair;
- no paid-acquisition change;
- no live customer charge is required for QA;
- only the exact SHA that passed the required test/smoke sequence may be released.

## RECON role after this directive

MASTER RECON remains ACTIVE as an **integrity and release-evidence validator**, not a stop-work gate.

RECON should verify:

1. the repair stayed inside the bounded transaction path;
2. direct-site and Shopify payment ownership remain separated;
3. no duplicate-capture/order-authority path was introduced;
4. stale `84af23ec...` was not replayed;
5. the deployed SHA is the same SHA that passed tests/smoke;
6. production/live verification matches the intended flow.

A newly discovered material safety defect may stop the exact unsafe release, but RECON must not reimpose the retired generic pre-build hold merely because the prior incident existed.

## Control phrase

**FAULT SOURCED → EMERGENCY BUILD HOLD RELEASED → DEV ACTIVE → BUILD → TEST → SMOKE → SAME-SHA DEPLOY → VERIFY → CLOSE.**