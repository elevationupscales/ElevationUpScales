# Elevation UpScales — Fourthwall Commerce Integration Current Worktree

**Status:** ACTIVE / STARTUP-CAPITAL REVENUE EXECUTION  
**Date:** 2026-09-12  
**Owner:** Casey Young  
**Parent:** Company Operations / Ecommerce & Vendor Operations  
**Reporting Manager:** Peter Torres — Ecommerce & Vendor Operations Manager  
**Primary Execution Lane:** Shopify Store Operations Worker + MASTER DEVELOPER only for code changes  
**Fourthwall Role:** Apparel / creator-merch catalog + capital-efficient fulfillment provider; not a new vendor Project or duplicate store-management hierarchy

## Owner direction

Fourthwall was Elevation's original ecommerce startup path because products could be sold without buying inventory first. Turn the existing Fourthwall operation into a meaningful, repeatable profit-producing lane.

## Verified live baseline

- Existing Fourthwall storefront is live at `https://elevationupscales-shop.fourthwall.com/`.
- Dashboard new-device verification is **CLEARED** and authenticated owner access is working.
- Current Fourthwall product count: **29**.
- Current visible native order history: **1 delivered order**.
- Current Fourthwall profit balance: **$1.77**.
- Payout setup is **OPEN / NOT YET ACTIVATED**; dashboard still shows `Set up your payouts`.
- Fourthwall billing method exists for negative-balance/promotional charges; do not use it as working capital.
- Fourthwall TikTok Shop app is **CONNECTED**; dashboard currently warns that TikTok sync is stuck. This does not reopen the already-submitted TikTok seller-verification appeal.
- Instagram & Facebook Shop is **CONNECTED**.
- Fourthwall developer surface is available: Open API, Webhooks, Storefront API, Platform Apps.
- Current `main` already contains Fourthwall commerce integration code; this is not a greenfield build.
- `site/store-config.js` identifies Fourthwall as the store provider and storefront.
- `site/store-catalog-resilience.js` fetches the Fourthwall catalog and routes `Buy Now` to Fourthwall product URLs.
- `site/store-checkout-server.js` can resolve/quote Fourthwall-backed apparel, but current verified code does **not** prove automatic Fourthwall fulfillment-order creation after Elevation PayPal capture.

## Proven native fulfillment

Real delivered order `#P0CU240D` proves the native fulfillment path:

- Signature Collection Emblem Tee — Black / XL
- placed 2026-08-07
- delivered 2026-08-12
- customer total `$32.37`
- product subtotal `$24.40`
- shipping `$5.09`
- tax `$2.88`
- final Fourthwall profit shown `+$1.77`
- shipped by Fourthwall and delivered with carrier tracking

Control lesson:

**FOURTHWALL FULFILLMENT MODEL = PROVEN. HISTORICAL PROFIT LEVEL = TOO LOW TO SCALE.**

## Current hero candidates

### Mountain Patch Baseball Cap | Classic Outdoor Hat
- Public / on demand / unlimited
- current price `$19.77`
- displayed profit `$5.07`
- approximate displayed margin `25.6%`
- classification: **PROMOTE TEST / ENTRY HERO**

### Signature Collection Emblem Tee
- Public / on demand / unlimited
- one verified delivered sale
- S/M/L `$26.40 / $5.00 profit`
- XL `$29.40 / $8.00 profit`
- 2XL `$29.40 / $6.00 profit`
- 3XL `$31.40 / $6.00 profit`
- 4XL `$33.40 / $6.00 profit`
- classification: **PROVEN HERO / NORMALIZE THIN VARIANTS BEFORE SCALE**

### Elevation Essentials Women's Crop Tee
- Public / on demand / unlimited
- current price `$23.55`
- displayed profit `$4.00`
- approximate displayed margin `17.0%`
- classification: **REPRICE BEFORE PROMOTION**

### Elevation Essential Hoodie | White
- Public / on demand / unlimited
- current price `$36.68`
- displayed profit `$6.38`
- approximate displayed margin `17.4%`
- classification: **REPRICE BEFORE PROMOTION**

## Profitability control

Fourthwall dashboard profit is the screening signal; realized per-order profit is the final truth.

Preferred promotion gate:

- Fourthwall-backed on-demand fulfillment active;
- public/in-stock state verified;
- native Fourthwall checkout functional;
- no inventory cash required before the sale;
- displayed product profit preferably at least `$5` **and** approximately `25%+` of selling price;
- discounts/promos remain positive after payment processing;
- no owner-card subsidy or negative-balance financing required.

Owner-approved samples/acquisition exceptions must be labeled marketing spend, not profit.

## Integration safety decision

Until an authenticated Fourthwall fulfillment/order API path is verified end-to-end:

**FOURTHWALL-BACKED APPAREL → ELEVATION DISCOVERY / CATALOG → EXACT FOURTHWALL PRODUCT → FOURTHWALL NATIVE CHECKOUT → FOURTHWALL ORDER / FULFILLMENT / SUPPORT.**

Do not intentionally promote Fourthwall-backed products through Elevation custom PayPal checkout unless the Fourthwall order-creation/fulfillment step is explicitly proven or an owner-approved manual fulfillment workflow exists for that exact product/order.

## Active integration objectives

1. Complete Fourthwall payout activation.
2. Audit all 29 products into `PROMOTE / REPRICE / HOLD / RETIRE` using live displayed economics.
3. Reconcile exact Fourthwall product/variant IDs against the Universal Catalog without duplicates.
4. Normalize provider identity as `fourthwall` for Fourthwall-backed apparel/merch records.
5. Preserve exact product URL and native checkout routing.
6. Keep Mountain Patch Baseball Cap as current entry-hero test unless realized economics disprove it.
7. Normalize Emblem Tee, one hoodie and Women's Crop Tee to the profit gate before concentrated promotion.
8. Verify Instagram/Facebook Shop catalog sync and use organic social before paid advertising.
9. Keep Fourthwall TikTok integration connected but obey the separate TikTok account terminal/waiting state.
10. Verify whether Fourthwall Open API / Webhooks / Storefront API can support automatic order creation and fulfillment from Elevation checkout; test in isolation before any production routing change.
11. Measure product-level clicks, Fourthwall orders and realized profit; scale only proven winners.

## Durable profitability program

See:

`operations/FOURTHWALL_STARTUP_CAPITAL_REVENUE_PROGRAM_2026-09-12.md`

## Immediate next action

**PAYOUT READINESS → 29-PRODUCT PROFIT AUDIT → HERO SET NORMALIZATION → META/WEBSITE ORGANIC TRAFFIC → REAL ORDER PROFIT VERIFICATION.**

No paid advertising, broad discounts, giveaway subsidy, product deletion, integration disconnect, payout mutation, or production checkout reroute is authorized merely by this Worktree update.

## Close condition

Fourthwall is considered recovered when:

- payout rail is active;
- 3–4 hero products meet the contribution gate;
- Universal Catalog mapping is duplicate-free;
- ElevationUpScales.com routes Fourthwall-backed apparel through proven checkout/fulfillment;
- at least three new real customer orders complete without owner inventory cash;
- realized profit remains positive and is recorded per order;
- only then is paid acquisition considered.

## Control phrase

**NO INVENTORY CASH FIRST → SELL → FOURTHWALL PRODUCES/FULFILLS → REALIZE PROFIT → REINVEST → SCALE ONLY WINNERS.**
