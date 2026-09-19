# ELEVATION UPSCALES — P0 CHECKOUT REPAIR PRODUCTION RECEIPT

**Date:** 2026-09-12 / deployment completed 2026-09-13 UTC  
**Owner:** Casey Young  
**Status:** CLOSED / PRODUCTION VERIFIED  
**Control issue:** #65  

## Owner decision executed

The catastrophic-failure emergency build hold and generic pre-build RECON stop were released for the bounded ElevationUpScales.com cart / checkout / PayPal repair after the fault source and transaction-lane boundaries were isolated.

Those emergency gates are now **RETIRED** for this repaired path and must not be recreated from stale incident state.

Separate standing safeguards remain separate: protected homepage no-touch, stale-candidate replay prevention, no secrets/raw-card handling, current catalog/listing sequencing controls, and the paid-acquisition capital-recovery hold.

## Accepted payment architecture

### Elevation direct site

**ELEVATION PRODUCT/CART → ELEVATION CHECKOUT → PAYPAL ORDERS V2 → ELEVATION LOCAL ORDER RECORD → GUARDED PAYPAL CAPTURE → ELEVATION FULFILLMENT**

### Shopify

**SHOPIFY PRODUCT → SHOPIFY CHECKOUT → SHOPIFY PAYMENTS / SUPPORTED METHODS → SHOPIFY ORDER → SHOPIFY PAYOUT**

No Elevation direct-site order may use Shopify as a payment fallback.

## Repair contents

- removed the SOK direct-site → Shopify card fallback;
- preserved Elevation + PayPal as the direct-site transaction owner;
- require a matching local Elevation order before PayPal capture;
- use a stable PayPal capture request ID;
- prevent repeat capture when the local order is already complete;
- reconcile PayPal order ID, capture ID, order status, capture status, exact amount, and USD currency before marking the local order paid;
- route mismatched successful PayPal capture responses to `RECONCILIATION_HOLD` rather than paid state;
- added checkout item-verification context and a route back to full product details before payment;
- added non-charging regression coverage for missing-order, duplicate-capture, exact-match, and amount-mismatch cases.

## Release evidence

- Production parent before repair: `dfb0dc2683035dd9e06f667aaabc04fc6eed3a0b`
- Repair branch: `repair/direct-checkout-paypal-20260912`
- Final repair branch head: `dbff80dbc4caecf758e2435849b17ff3ff0b7bdd`
- PR: #151 — merged successfully
- Accepted production merge/deploy source: **`894b15cb12bf75a6a8e81b916e2a9bc2de858f88`**
- Production workflow: **34728179817 — SUCCESS**
- Cloudflare deployment receipt: `https://8d20d6f9.elevationupscales.pages.dev`
- Isolated deployed-app smoke: **PASS**
- Canonical `https://elevationupscales.com` smoke: **PASS**
- `/checkout` and `/checkout/`: **200 / PASS**
- SOK direct-dropship preview QA: **PASS**
- SOK A2 checkout activation preview: **PASS**
- Website integrity preview smoke: **PASS**
- No live customer charge was submitted during QA.

The production workflow checked out and deployed the exact source SHA `894b15cb12bf75a6a8e81b916e2a9bc2de858f88`; canonical QA passed before deployment and both deployed-app and canonical-domain smoke checks passed afterward.

## Post-close routing

- MASTER DEVELOPER returns to **STANDBY / VERIFY-FIX ONLY** after this bounded repair.
- MASTER RECON returns to **TRIGGERED INTEGRITY GATE**, not a standing duplicate executor or generic pre-build stop.
- Shopify payment configuration remains **PRESERVE**.
- New-listing/catalog-expansion work is **not automatically reopened by this receipt**; management should continue the current-store/vendor-channel intake audit and release listing work only through its owning sequencing rule.
- Paid acquisition remains locked until the separate owner capital-recovery gate is satisfied and explicitly reopened.

## Control phrase

**FAULT SOURCED → EMERGENCY BUILD HOLD RELEASED → BUILD → TEST → DEPLOY → LIVE VERIFY → RECEIPT → CLOSED.**
