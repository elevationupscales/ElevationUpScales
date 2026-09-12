# ELEVATION UPSCALES — OWNER DIRECTIVE: PAYPAL / SHOPIFY LANE SEPARATION

**Owner:** Casey Young  
**Date:** 2026-09-12  
**Status:** CONTROLLING / IMMEDIATE  
**Applies to:** ElevationUpScales.com checkout, Shopify Store Operations, MPM5, MASTER RECON OS, MASTER DEVELOPER, COM2

## OWNER DECISION

Stop combining ElevationUpScales.com checkout with Shopify.

### Elevation website lane

**ElevationUpScales.com uses the Elevation-owned PayPal Checkout tool.**

Payment architecture:

**ELEVATION PRODUCT → ELEVATION CHECKOUT → PAYPAL ORDERS V2 → ELEVATION LOCAL ORDER RECORD → PAYPAL CAPTURE / RECONCILIATION → ELEVATION FULFILLMENT ROUTING**

Controls:

- PayPal Orders v2 create/capture remains server-side.
- PayPal credentials/secrets remain in environment bindings only.
- Stable `PayPal-Request-Id` is used for idempotent retries.
- Capture requires matching local Elevation order/state.
- Amount, currency and PayPal status must reconcile before paid-state transition.
- PayPal order/capture evidence is retained for reconciliation.
- Webhooks may be used for recovery only with verified PayPal signatures.
- QA must not submit a live payment.

The Elevation website checkout must not route a customer into Shopify for card, Shop Pay, PayPal Wallet, or any other Shopify payment method.

## Shopify lane

**Shopify is a separate commerce lane.**

Shopify products, Shopify Checkout, Shopify Payments, Shopify payout behavior and Shopify-supported payment methods are owned by Shopify Store Operations and remain independent of the Elevation website PayPal checkout.

Shopify configuration must not be used as a fallback or dependency for the Elevation website checkout.

## IMMEDIATE WORK STOP / ROUTING

Pause all unrelated website payment architecture, catalog expansion, new listings and cross-channel checkout work until the lane-separation repair is deployed and verified.

Do not:

- add another payment fallback to Elevation checkout;
- route Elevation products to Shopify checkout;
- restart Shopify configuration as part of the Elevation checkout incident;
- merge broad `main` state into production;
- alter the protected homepage top;
- submit a live payment during QA.

## EXACT REPAIR CANDIDATE

Branch: `recon/elevation-paypal-only-separation-20260912`  
Base production SHA: `dfb0dc2683035dd9e06f667aaabc04fc6eed3a0b`  
Candidate SHA: `84af23ec814baa73718e33ec052044ce4706534d`

Candidate delta:

- one commit ahead;
- zero behind;
- one file changed: `site/checkout/index.html`;
- removes Shopify direct-buy/card fallback script loading;
- removes Shopify card fallback UI from Elevation checkout;
- preserves Elevation PayPal checkout and core `store-checkout.js` path.

## MASTER RECON OS — FINISH INTERRUPTED DEPLOYMENT

MASTER RECON OS owns completion of the interrupted deployment sequence for this exact candidate.

Required sequence:

**VERIFY EXACT SHA → CONFIRM PAYPAL-ONLY ELEVATION CHECKOUT → CONFIRM NO SHOPIFY CROSS-ROUTE → QA/SMOKE → MOVE SAME SHA TO PRODUCTION → LIVE VERIFY → RECORD RECEIPT → RETURN CONTROL TO MPM5.**

Do not reopen broader development during this deployment.

## CONTROL PHRASE

**ELEVATION = PAYPAL CHECKOUT. SHOPIFY = SHOPIFY LANE. DO NOT COMBINE THEM. RECON FINISHES THE DEPLOYMENT.**
