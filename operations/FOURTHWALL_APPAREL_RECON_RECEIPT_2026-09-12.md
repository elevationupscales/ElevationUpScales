# Elevation UpScales — Fourthwall Apparel Recon Receipt

**Date:** 2026-09-12  
**Owner:** Casey Young  
**Classification:** Elevation UpScales Apparel  
**Management:** Company Operations / Ecommerce; no dedicated Fourthwall manager

## Control update

Authenticated Fourthwall recon is complete enough to close the prior device-verification blocker.

The durable operating source is now:

`FOURTHWALL_APPAREL_OPERATING_PROFILE.md`

The earlier `FOURTHWALL_COMMERCE_INTEGRATION_CURRENT_WORKTREE.md` remains useful for existing code/integration context, but its device-verification-open marker is stale after this receipt.

## Verified current state

- Established production Fourthwall store: admin slug `elevationupscales`.
- Public Apparel storefront: `https://elevationupscales-shop.fourthwall.com/`.
- Current catalog: 29 products.
- A second `elevation-upscales` container exists and was observed empty/new; do not use or delete it without Owner approval.
- Real Fourthwall order history proves native order → fulfillment → tracking → delivery works.
- Historical verified realized profit on the proven order was only `$1.77`, so margin recovery is required before aggressive promotion.
- Fourthwall payout setup remains incomplete.
- TikTok Shop and Instagram/Facebook Shop integrations are connected; Fourthwall reports a TikTok sync issue that must be reconciled with the dedicated TikTok lane rather than blindly reconnected.
- Google Analytics connection currently reports an access issue; this does not block commerce.
- Fourthwall exposes supported API, webhook and Storefront API surfaces for bounded future integration.

## Immediate route

1. Audit Apparel economics and select 3–5 margin-safe lead products.
2. Review live promotions before campaign traffic.
3. Complete protected payout setup through the authenticated Fourthwall account.
4. Keep Fourthwall native checkout as the fulfillment-safe production path while custom order creation remains unproven.
5. Reconcile exact Fourthwall product identity into Universal Catalog without duplicates.
6. Route read/sync integration work to MASTER DEVELOPER only where code changes are needed.
7. Reconcile the Fourthwall TikTok sync with the dedicated TikTok Shop lane.
8. Use owned/free traffic first and measure actual realized contribution on the next Apparel order.

## Control phrase

**ELEVATION APPAREL → PRICE FOR REAL PROFIT → FOURTHWALL FULFILLS → PAYOUT BECOMES CASH → SCALE ONLY WHAT EARNS.**
