# Elevation UpScales — Fourthwall Startup-Capital Revenue Program

**Status:** ACTIVE / CASH-LIGHT REVENUE LANE  
**Date:** 2026-09-12  
**Owner:** Casey Young  
**Parent:** Company Operations / Ecommerce & Vendor Operations  
**Provider:** Fourthwall  
**Operating objective:** Turn Fourthwall from a legacy merch storefront into a repeatable profitable revenue lane that does not require Elevation to buy inventory before the customer pays.

## Owner direction

Fourthwall was the original ecommerce startup lane because Elevation could sell produced-to-order merchandise without fronting product inventory. Rebuild it into a meaningful revenue contributor.

## Why Fourthwall matters now

Fourthwall is structurally useful to Elevation's startup-capital model:

- no inventory purchase is required before a Fourthwall catalog product sale;
- products are produced on demand;
- customers pay shipping through Fourthwall checkout;
- Fourthwall can fulfill provider-backed catalog products;
- Fourthwall operates the checkout/payment/tax layer for native orders;
- native provider orders reduce fulfillment ambiguity compared with unsupported manual dropship paths;
- the existing Elevation storefront and 29-product catalog already exist, so no catalog-from-zero build is required.

This lane is therefore treated as **capital-efficient revenue**, not merely brand merchandise.

## Verified authenticated account state

- Dashboard device verification: **CLEARED**.
- Current products: **29**.
- Fourthwall native order history visible: **1 delivered order**.
- Current profit balance: **$1.77**.
- Payout configuration: **NOT YET ACTIVATED** (`Set up your payouts` remains available).
- Fourthwall pays monthly once the applicable minimum payout threshold is met; account-side payout setup must still be completed before revenue can release normally.
- TikTok Shop app: **CONNECTED**, but Fourthwall currently surfaces a stuck TikTok Shop sync recommendation. Do not use that as authority to reopen the already-submitted TikTok seller-verification appeal.
- Instagram & Facebook Shop: **CONNECTED**.
- Fourthwall developer controls are available: Open API, Webhooks, Storefront API, Platform Apps.

## Proven real order

**Order:** `#P0CU240D`  
**Product:** Signature Collection Emblem Tee — Black / XL  
**Placed:** 2026-08-07  
**Delivered:** 2026-08-12  
**Customer total:** `$32.37`  
**Product subtotal:** `$24.40`  
**Shipping:** `$5.09`  
**Tax:** `$2.88`  
**Final Fourthwall profit shown:** `+$1.77`  
**Fulfillment:** Shipped by Fourthwall; Amazon tracking; delivered successfully.

This proves the end-to-end native path:

**CUSTOMER ORDER → FOURTHWALL PAYMENT → FOURTHWALL PRODUCTION/FULFILLMENT → TRACKING → DELIVERY → ELEVATION PROFIT.**

The historical `$1.77` realized profit is not an acceptable scale target, but the fulfillment model itself is proven.

## Current hero-candidate economics

### 1. Mountain Patch Baseball Cap | Classic Outdoor Hat

- Public
- On demand / unlimited
- Provider method: Otto Cap / Printful embroidery
- Current selling price: `$19.77`
- Dashboard displayed profit: `$5.07` per sale
- Approximate displayed product margin: `25.6%`
- Sales to date: `0`

**Classification:** `PROMOTE TEST / ENTRY HERO`

Reason: accessible sub-$20 price, customer-paid shipping, healthy relative displayed margin, outdoor brand fit.

### 2. Signature Collection Emblem Tee

- Public
- On demand / unlimited
- Provider method: Comfort Colors / Printful DTG
- Proven delivered order: `1`
- Current displayed economics:
  - S/M/L: `$26.40` sale / `$5.00` profit
  - XL: `$29.40` sale / `$8.00` profit
  - 2XL: `$29.40` sale / `$6.00` profit
  - 3XL: `$31.40` sale / `$6.00` profit
  - 4XL: `$33.40` sale / `$6.00` profit

**Classification:** `PROMOTE AFTER MARGIN NORMALIZATION / PROVEN HERO`

Reason: only product with verified real customer demand and completed fulfillment. Smaller-size economics remain thin relative to the preferred contribution target.

### 3. Elevation Essentials Women's Crop Tee

- Public
- Signature on demand / unlimited
- Provider method: AS Colour / PF Signature embroidery
- Current selling price: `$23.55`
- Dashboard displayed profit: `$4.00` per sale
- Approximate displayed product margin: `17.0%`
- Sales to date: `0`

**Classification:** `HOLD PROMOTION / REPRICE FIRST`

Reason: strategically useful for the existing women/creator lane, but current contribution is too low to spend promotion capacity on it.

### 4. Elevation Essential Hoodie | White

- Public
- On demand / unlimited
- Provider method: Cotton Heritage / Printful embroidery
- Current selling price: `$36.68`
- Dashboard displayed profit: `$6.38` per sale
- Approximate displayed product margin: `17.4%`
- Sales to date: `0`

**Classification:** `HOLD PROMOTION / REPRICE FIRST`

Reason: strong brand product and higher ticket, but current displayed contribution percentage is too thin for a startup-capital hero.

## Profitability control

Fourthwall's dashboard `profit per sale` is useful for screening, but **realized order profit is the final source of truth** because processing/payment effects can change the final contribution.

Use this hierarchy:

1. realized Fourthwall order profit;
2. displayed Fourthwall profit per sale;
3. selling price;
4. conversion rate / units sold;
5. traffic source;
6. refund/support outcome.

### Promotion gate

Do not spend paid-ad money or creator incentives on a Fourthwall product unless it passes all applicable gates:

- provider-backed on-demand fulfillment is active;
- public/in-stock state is verified;
- native Fourthwall checkout works;
- no owner cash is required to buy inventory first;
- displayed product profit is preferably **at least $5 AND approximately 25%+ of selling price**;
- any promo code leaves a positive contribution after discount and payment processing;
- no negative-balance or owner-card subsidy is required for the sale.

Owner-approved exceptions may be used for deliberate acquisition/sample campaigns, but must be labeled as marketing spend rather than profit.

## Revenue architecture

### Phase A — Cash-light core

Concentrate organic traffic on a small hero set instead of all 29 products:

1. **Mountain Patch Baseball Cap** — entry-price acquisition hero.
2. **Signature Collection Emblem Tee** — proven-demand core hero after margin normalization.
3. **One hoodie** — premium AOV hero after margin normalization.
4. **Women's Crop Tee** — creator/ambassador hero only after margin normalization.

All other products remain catalog depth until they earn traffic through demand or strong economics.

### Phase B — Organic distribution first

Use zero/low-cash channels before paid acquisition:

- ElevationUpScales.com apparel discovery → exact Fourthwall product → Fourthwall native checkout;
- Fourthwall native storefront;
- connected Instagram & Facebook Shop;
- organic Facebook/Instagram/TikTok/YouTube content;
- creator showcase/affiliate use only where contribution remains positive;
- TikTok Shop Fourthwall integration remains connected but execution must respect the separate TikTok seller-account terminal/waiting state.

### Phase C — Payout readiness

Complete Fourthwall payout activation before meaningful scaling. Current profit balance is only `$1.77`; nevertheless, the payout rail must be ready before the store produces larger volume.

### Phase D — API / automation

Fourthwall authenticated settings expose Open API, Webhooks, Storefront API and Platform Apps.

Developer objective:

**VERIFY WHETHER A PAID ELEVATION CUSTOM-CHECKOUT ORDER CAN CREATE A FOURTHWALL FULFILLMENT ORDER AUTOMATICALLY BEFORE CHANGING PRODUCTION CHECKOUT ROUTING.**

Until that is proven:

**ELEVATION DISCOVERY → FOURTHWALL PRODUCT → FOURTHWALL NATIVE CHECKOUT → FOURTHWALL FULFILLMENT.**

## Immediate execution order

1. Activate Fourthwall payouts.
2. Audit all 29 products into `PROMOTE / REPRICE / HOLD / RETIRE` using live Fourthwall displayed economics.
3. Normalize the Emblem Tee, one hoodie and Women's Crop Tee to the profitability gate before promotion.
4. Keep the Mountain Patch Cap as the current low-price hero candidate unless final realized economics disprove it.
5. Verify Instagram/Facebook Shop product sync and catalog health.
6. Leave TikTok Shop connected but do not reopen the seller-verification appeal from Fourthwall sync messaging.
7. Route the hero set through ElevationUpScales.com using exact Fourthwall URLs/native checkout.
8. Launch organic content around the small hero set; measure product-level clicks, Fourthwall orders and realized profit.
9. Scale only products that produce repeatable positive realized contribution.

## Cash discipline

Fourthwall may charge the saved payment method when promos, giveaways or intentionally underpriced products create a negative balance. Therefore:

**NO UNBOUNDED DISCOUNTS → NO LOSS-LEADER GIVEAWAYS WITHOUT OWNER APPROVAL → NO PAID ADS UNTIL ORGANIC PRODUCT ECONOMICS ARE PROVEN.**

## Success condition

Fourthwall is considered recovered when:

- payout rail is active;
- 3–4 hero products meet the profit gate;
- ElevationUpScales.com routes apparel safely to Fourthwall native checkout;
- connected social-commerce channels point to the same exact products;
- at least three new real customer orders complete without owner inventory cash;
- realized contribution remains positive and is recorded per order;
- only then is paid acquisition considered.

## Control phrase

**NO INVENTORY CASH FIRST → SELL THE PRODUCT → FOURTHWALL PRODUCES/FULFILLS → REALIZE PROFIT → REINVEST → SCALE ONLY WINNERS.**
