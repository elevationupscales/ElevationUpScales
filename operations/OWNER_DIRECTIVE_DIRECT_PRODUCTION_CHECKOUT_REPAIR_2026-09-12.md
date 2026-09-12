# OWNER DIRECTIVE — DIRECT PRODUCTION CHECKOUT REPAIR

**Date:** 2026-09-12  
**Owner:** Casey Young  
**Applies To:** ElevationUpScales.com cart / checkout / PayPal repair  
**Status:** ACTIVE OWNER OVERRIDE

## OWNER DIRECTION

Too many release gates are slowing the website repair. For the current Elevation cart / secure-checkout repair, use a direct production path.

**Newest owner payment-method direction (2026-09-12): Elevation does not want Shop Pay offered. Preserve PayPal and standard card payment where available, but remove Shop Pay from the customer checkout experience and from Elevation checkout copy. This newest direction supersedes the earlier requirement to preserve Card / Shop Pay together.**

## RELEASE PATH

**DEV CODE → SMOKE TEST → PRODUCTION → LIVE SMOKE → CLOSE / FIX FORWARD IF NEEDED**

No separate MASTER RECON acceptance gate, no COM2 pre-production approval gate, no separate preview-approval loop, and no additional MPM release approval are required for this bounded repair.

## REQUIRED MINIMUM SAFETY

The direct path still must preserve these controls because they protect active customer payment capability:

- preserve the currently working PayPal path;
- preserve standard credit/debit card payment where available;
- do not offer or promote Shop Pay;
- do not remove standard card acceptance merely to remove Shop Pay unless no clean separation is available;
- do not touch the protected homepage top;
- do not expose secrets, raw card data or CVV;
- do not submit a real payment as part of QA;
- do not bulk-deploy unrelated catalog/operations work;
- use the existing production-deploy lineage rather than replacing it with stale `main` wholesale;
- if the production smoke breaks checkout, roll back or fix forward immediately.

## CURRENT PRODUCTION TRUTH

The live `production-deploy` branch is currently at `4da62160a5d9250a1d977a42052644798fac0b40`, which added Card / Shop Pay alongside PayPal as a P0 fallback. That behavior is now partially superseded by owner direction: PayPal and standard card may remain, but Shop Pay is not approved as a customer payment option.

The current cart/checkout repair implementation has not yet landed as a newer code commit. Therefore the next production deployment must contain the actual repair code, preserve the working PayPal path, preserve standard card where cleanly separable, and remove Shop Pay exposure.

## EXECUTION BRANCH

Use:

`work/cart-checkout-direct-production-20260912`

for the bounded repair unless MASTER DEVELOPER has already created a newer exact repair branch.

## ACTIVE REPAIR SCOPE

- real Elevation cart;
- richer checkout item review and exact product-detail return path;
- canonical server-side product / price / shipping validation;
- hardened PayPal capture / local-order reconciliation / retry behavior;
- retain PayPal;
- retain standard card payment where available;
- remove Shop Pay from customer-facing checkout and checkout copy;
- mobile + desktop smoke.

## HOLD

- new item listings;
- new sales-channel expansion;
- unrelated redesign;
- unrelated website feature work.

## CONTROL PHRASE

**BUILD IT → SMOKE IT → DEPLOY IT → VERIFY LIVE → MOVE ON.**
