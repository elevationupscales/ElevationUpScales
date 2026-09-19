# Elevation UpScales — Shopify / Spreadconnect Elevation Gear Execution Return

**Date:** 2026-09-12 MDT  
**Owner:** Casey Young  
**Lane:** Apparel Vendor Operations / Shopify Store Operations  
**Parent:** Company Operations Commercial Sweep / PM4  
**State:** RETURN READY / SPREADCONNECT RECONNECTION REQUIRED / HERO MATRIX BUILT  
**Observed main before this return:** `3bb716ebfe8cea92ad58c322c38f9f016ebd247f`

## Executive result

Shopify is the correct owned-brand commerce surface for Elevation Gear, but Spreadconnect is **not currently connected** to the live Elevation Shopify store.

The right operating model remains:

**SHOPIFY OWNS THE BRAND + CUSTOMER + CHECKOUT → ONE POD PROVIDER OWNS EACH SKU → PROVIDER FULFILLS → SHOPIFY OWNS CUSTOMER COMMUNICATION/ANALYTICS → REALIZED CONTRIBUTION DECIDES SCALE.**

Fourthwall remains a separate zero-inventory capsule/creator fulfillment lane and should not be duplicated blindly inside Spreadconnect.

## Live Shopify integration verification

Authenticated Shopify Admin GraphQL was queried for installed apps and all locations, including fulfillment-service locations.

### Installed apps observed

1. Shopify Messaging
2. Matrixify
3. Shopify ChatGPT MCP App

**Spreadconnect was not present.**

### Locations observed

- owner location — active / fulfills online orders / not a fulfillment-service location;
- Colorado Warehouse — active / not currently fulfilling online orders / not a fulfillment-service location.

No Spreadconnect-created fulfillment location or fulfillment service exists in the live store.

### Classification

**SPREADCONNECT ↔ SHOPIFY = DISCONNECTED / INSTALL + AUTHENTICATED ACCOUNT LINK REQUIRED.**

This is not a catalog problem and not a Shopify checkout defect.

## What a clean Spreadconnect install must produce

Current Spreadconnect documentation states that a successful Shopify installation creates a Spreadconnect fulfillment service. Spreadconnect-specific products/orders are then handled by that integration, while other suppliers can coexist in the same Shopify store.

Post-install verification must therefore confirm:

1. Spreadconnect appears in Shopify installed apps.
2. Spreadconnect fulfillment-service location exists and is active.
3. The account is the intended North America account.
4. A test/draft Spreadconnect SKU preserves exact provider SKU identity in Shopify.
5. Valid Spreadconnect-SKU orders import to Spreadconnect.
6. Shipping/tracking returns to Shopify.
7. Non-Spreadconnect SOK / VEVOR / Renogy / other SKUs remain isolated from Spreadconnect fulfillment.

Do not publish a live Spreadconnect apparel SKU before items 1–4 are verified.

## Current branded-blank discovery

Public current US assortment evidence shows the broader Spread production catalog contains recognizable brands including Adidas, Champion, Bella + Canvas, Under Armour, A4, Independent Trading, Gildan, Comfort Colors, Stanley/Stella, Yupoong and others.

Examples currently visible in the US public catalog include:

- Adidas Performance Polo;
- Adidas blended T-shirts and fleece layers;
- Champion Unisex Powerblend Hoodie;
- Champion Unisex T-Shirt;
- Bella + Canvas Women's Cropped T-Shirt;
- Under Armour Men's Athletic 2.0 T-Shirt;
- A4 moisture-wicking performance tees;
- Independent Trading hoodies/sweatshirts;
- Yupoong headwear.

**Control:** public consumer-catalog visibility is discovery evidence only. Exact Spreadconnect North America business-account availability, product ID/SKU, production method, print area, base cost and shipping must be verified inside the authenticated Spreadconnect account before a product becomes `PROMOTE`.

Public retail/customizer prices are **not** supplier cost and are not used as Elevation contribution economics.

## Proposed 10-SKU Elevation Gear comparison core

| # | Proposed role | Provider / candidate | Current evidence | Customer price | Provider/source cost | Contribution state | Fulfillment owner | Classification |
|---|---|---|---|---:|---|---|---|---|
| 1 | Entry headwear hero | Mountain Patch Baseball Cap | Fourthwall public / on-demand / unlimited; current displayed profit `$5.07` | `$19.77` | Fourthwall native | displayed ~`$5.07`; realized not yet proven | Fourthwall | **PROMOTE TEST** |
| 2 | Proven core tee | Signature Collection Emblem Tee | Fourthwall public / on-demand; 1 delivered real order; current displayed variant profit `$5–$8` | `$26.40–$33.40` | Fourthwall native | one historical realized order was only `$1.77`; current economics improved but need new realized proof | Fourthwall | **PROMOTE / VERIFY REALIZED** |
| 3 | Women's existing candidate | Elevation Essentials Women's Crop Tee | Fourthwall public / on-demand / unlimited | `$23.55` | Fourthwall native | displayed `$4.00` / ~17% | Fourthwall unless displaced | **REPRICE / CHALLENGED BY SPREADCONNECT** |
| 4 | Existing hoodie candidate | Elevation Essential Hoodie — White | Fourthwall public / on-demand / unlimited | `$36.68` | Fourthwall native | displayed `$6.38` / ~17% | Fourthwall unless displaced | **REPRICE / CHALLENGED BY SPREADCONNECT** |
| 5 | Premium branded hoodie | Champion Unisex Powerblend Hoodie | current US public branded catalog evidence | TBD | `UNKNOWN / VERIFY` authenticated Spreadconnect NA | `UNKNOWN / VERIFY` | Spreadconnect after connection | **VERIFY** |
| 6 | Corporate/work premium | Adidas Performance Polo | current US public branded catalog evidence | TBD | `UNKNOWN / VERIFY` authenticated Spreadconnect NA | `UNKNOWN / VERIFY` | Spreadconnect after connection | **VERIFY** |
| 7 | Performance/work tee | Under Armour Men's Athletic 2.0 T-Shirt | current US public branded catalog evidence | TBD | `UNKNOWN / VERIFY` authenticated Spreadconnect NA | `UNKNOWN / VERIFY` | Spreadconnect after connection | **VERIFY** |
| 8 | Women's branded hero challenger | Bella + Canvas Women's Cropped T-Shirt | current US public branded catalog evidence | TBD | `UNKNOWN / VERIFY` authenticated Spreadconnect NA | `UNKNOWN / VERIFY` | Spreadconnect after connection | **VERIFY / COMPARE TO FOURTHWALL CROP** |
| 9 | Lower-cost performance challenger | A4 Men's Moisture Wicking Performance T-Shirt | current US public branded catalog evidence | TBD | `UNKNOWN / VERIFY` authenticated Spreadconnect NA | `UNKNOWN / VERIFY` | Spreadconnect after connection | **VERIFY** |
| 10 | Headwear challenger | Yupoong Trucker / Snapback family | current US public branded catalog evidence | TBD | `UNKNOWN / VERIFY` authenticated Spreadconnect NA | `UNKNOWN / VERIFY` | Spreadconnect after connection | **VERIFY / COMPARE TO FOURTHWALL CAP** |

This is a comparison core, not authorization to publish all ten.

## First intended launch shape after authenticated economics

Target **6–8 actual live Elevation Gear heroes**, not all candidates automatically:

1. one headwear winner;
2. one proven/core Elevation tee;
3. one women's hero;
4. one premium branded hoodie/layer;
5. one work/performance tee;
6. one premium/corporate piece;
7. optional second lifestyle layer only if contribution passes;
8. optional accessory only if it materially improves AOV/contribution.

### Competitive decisions built into the matrix

- Fourthwall Mountain Patch Cap vs Spreadconnect/Yupoong: choose one primary headwear hero after exact Spreadconnect economics.
- Fourthwall Women's Crop vs Spreadconnect/Bella + Canvas: choose the stronger combination of perceived value, price and contribution; do not duplicate the same design ambiguously across providers.
- Fourthwall White Hoodie vs Spreadconnect/Champion branded hoodie: Fourthwall can remain a lower-price Elevation basic while Champion becomes a premium tier only if both have clearly distinct merchandising roles and both pass contribution.

## One fulfillment owner per SKU

Required provider identity:

- `fourthwall` — existing Fourthwall native products remain native Fourthwall checkout/fulfillment until direct-order automation is proven;
- `spreadconnect` — only products created/mapped through the authenticated Spreadconnect Shopify integration with valid Spreadconnect SKU identity;
- never route the same Shopify variant to multiple POD providers;
- never copy a Fourthwall source identity into a Spreadconnect Shopify SKU merely because the design art is similar.

## Proposed Shopify collection architecture

Do not create/publish until the first source-qualified products exist.

- `Elevation Gear` — parent merchandising collection
- `Core Gear`
- `Premium Brand Blanks`
- `Work & Performance`
- `Women's Gear`
- `Headwear & Accessories`
- `Limited Drops`
- later: `Customize Your Gear` only after Spreadconnect Customizer and economics are verified

The existing power/RV/vendor collections remain separate. Apparel should become a branded shop layer, not another supplier dump.

## Cash / fulfillment logic

Spreadconnect is attractive because the current integration model is POD/customer-order driven rather than owner inventory first. However Shopify payout timing versus provider charge timing must be treated as working-capital exposure until observed on a real order.

Required exact economics per proposed Spreadconnect hero after connection:

`CUSTOMER ITEM REVENUE + CUSTOMER-PAID SHIPPING - SPREADCONNECT PRODUCT/PRINT COST - SPREADCONNECT SHIPPING - SHOPIFY/PAYMENT FEES - DISCOUNT - CREATOR COMMISSION - OTHER VARIABLE COST = EXPECTED CONTRIBUTION`

No commission ceiling is authorized until exact provider cost/shipping and applicable Shopify/payment costs are known.

## Immediate next executable sequence

1. **CONNECT SPREADCONNECT TO THE LIVE SHOPIFY STORE** using the intended existing/new North America Spreadconnect account.
2. Verify the new Shopify fulfillment service/location exists.
3. Open the authenticated Spreadconnect NA product catalog.
4. Resolve exact product IDs/SKUs, base costs, print methods, shipping and availability for candidates 5–10.
5. Return `PROMOTE / REPRICE / HOLD` independently for each candidate.
6. Select the first 3–5 Spreadconnect launch products and compare them to the retained Fourthwall heroes.
7. Create only those Shopify apparel products that pass exact source identity + fulfillment + contribution.
8. Create/publish the `Elevation Gear` collections only when they contain source-qualified product.
9. Route owned/creator traffic to the final hero set.
10. Record realized contribution from every real order before scaling.

## Current gate / owner handoff

The Shopify/Spreadconnect connection cannot be completed through the current read/query tool surface. Installation requires the merchant-authorized Spreadconnect Shopify app/account connection flow.

Once the app is connected, the remaining catalog/economics recon is immediately executable.

## RUN result

**SHOPIFY LIVE → SPREADCONNECT DEFINITIVELY NOT CONNECTED → FULFILLMENT SERVICE ABSENT → CURRENT US BRANDED CANDIDATES IDENTIFIED → FOURTHWALL VS SPREADCONNECT 10-SKU COMPARISON CORE BUILT → EXACT SPREADCONNECT COST HELD INSTEAD OF GUESSED → INSTALL/AUTH LINK IS THE NEXT GATE.**

## Control phrase

**SHOPIFY OWNS THE BRAND → ONE PROVIDER OWNS EACH SKU → POD BEFORE INVENTORY → EXACT COST BEFORE PROMOTION → TRAFFIC TO HEROES → REALIZED CONTRIBUTION DECIDES SCALE.**