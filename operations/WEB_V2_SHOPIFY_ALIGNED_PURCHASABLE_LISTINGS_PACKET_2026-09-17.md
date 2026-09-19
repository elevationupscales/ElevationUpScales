# WEB V2 — SHOPIFY-ALIGNED PURCHASABLE LISTINGS PACKET

**Owner:** Casey Young
**Company:** Elevation UpScales, Inc.
**Date:** 2026-09-17
**Status:** ROUTED / READY FOR WEB V2 DEVELOPMENT
**Canonical controls:** CURRENT_WORK_BOARD.md + WEB_V2_CURRENT_WORKTREE.md

## OBJECTIVE

Upgrade elevationupscales.com so the home store can convert current verified products into purchases using Shopify as the merchandising reference model without creating a second commerce source of truth.

Use Shopify as the operational reference for:
- product identity;
- price;
- image;
- category;
- availability/orderability state;
- geographic eligibility;
- CTA behavior;
- collection grouping.

Do **not** copy Shopify theme code or create a second independent inventory/pricing system.

## ARCHITECTURE

**ElevationUpScales.com = customer-facing discovery / brand / catalog surface.**

**Shopify = canonical commerce operating source for live product data and checkout/payment execution unless an existing Elevation checkout path is already verified for that exact product.**

Customer path target:

**HOME / STORE → PRODUCT CARD → PRODUCT DETAIL → BUY / PURCHASE CTA → EXISTING VERIFIED CHECKOUT/PAYMENT PATH**

Do not build a second payment engine.

## FIRST PURCHASABLE RENOGY SET

Only expose products already ACTIVE and currently reconciled.

1. `RSP10TC-G1-US`
   - Renogy 10W Solar Battery Trickle Charger Maintainer
   - $39.99
   - strongest entry product
   - AK/HI eligible under current route
   - Canada pilot eligible

2. `RNG-CTRL-ADV30-LI-US`
   - Renogy Adventurer Li 30A PWM Solar Charge Controller
   - $82.99
   - active
   - geographic eligibility controlled by current route/orderability state

3. `RBM500-G3-US`
   - Renogy 500A Battery Monitor with Shunt
   - $87.99
   - supplier orderability verified
   - AK/HI eligible

4. `RSHST-B02P300-G1-US`
   - Renogy Battery Shunt 300
   - $120.99
   - active
   - AK/HI eligible

5. `RNG-INVT-3000-12V-P2-G3-US`
   - Renogy 3000W 12V Pure Sine Wave Inverter
   - $414.99
   - active
   - backorder authorized
   - Hawaii current estimated heavy-electronics shipping class $89.99

6. `RSP400LSC-G1-US`
   - Renogy 400W Compact Suitcase Portable Solar Panel
   - $495.99
   - live for direct-site/normal route
   - **do not represent as AK/HI air eligible**

Do not expose draft/held Renogy SKUs as purchasable.

## STORE UX — COPY SHOPIFY'S PROVEN STRUCTURE, NOT ITS CODE

Cards should show:
- strong product image;
- brand;
- clean title;
- current selling price;
- one short use-case line;
- geographic badge only when verified (e.g. "AK/HI Eligible");
- clear CTA: **View Product** or **Buy Now**;
- no internal operations labels.

Product detail should show:
- exact SKU/model;
- price;
- primary media;
- customer-use summary;
- key specs;
- destination/shipping note;
- warranty/returns summary when verified;
- strong purchase CTA;
- related products from same use case.

## COLLECTION / NAVIGATION

Add or expose customer paths for:
- Renogy
- Solar & Charging
- Battery Monitoring
- RV & Mobile Power
- Hawaii & Alaska Eligible Renogy
- Canada Renogy Supply

Do not bury the expansion collections.

The homepage/store section may feature:
- **Shop Renogy**
- **Ships to Hawaii & Alaska**
- **Canada Supply**
- **Solar & Charging**
- **Battery Monitoring**

This is merchandising, not a homepage redesign.

## PURCHASE ACTION CONTROL

Before any product receives a live purchase CTA on elevationupscales.com:

**ACTIVE/LIVE PRODUCT → CURRENT PRICE → MEDIA → PURCHASEABILITY → DESTINATION RULE → CTA TARGET VERIFIED**

If Shopify owns live checkout for the SKU, the CTA should route cleanly into the verified Shopify product/cart/checkout path rather than reconstructing payment logic on Web V2.

If an existing Elevation checkout is already the authoritative path for that SKU and is verified, preserve it.

Do not create two parallel checkout truths for the same SKU.

## MARKET EXPANSION

Hawaii / Alaska / Canada presentation must follow the canonical Renogy expansion control.

Current starter classes:
- Hawaii small eligible parcel: $24.99 estimate
- Hawaii heavy electronics: $89.99 estimate
- Alaska small eligible parcel: $34.99 estimate
- Canada small eligible parcel: $39.99 estimate

Hard exclusions remain:
- AK/HI batteries: no blanket automatic shipping
- AK/HI solar >320W: no automatic air route
- Canada Yukon/Nunavut/NWT: blocked under current route
- unresolved DG/freight: quote/review

## CONVERSION OBJECTIVE

The website change exists to improve:

**STORE IMPRESSION → PRODUCT CLICK → PRODUCT DETAIL → PURCHASE CTA → CHECKOUT → PAID ORDER**

Do not add decorative sections unless they improve one of those steps.

## DEVELOPMENT BOUNDS

Allowed:
- store product cards;
- product detail presentation;
- collections/navigation;
- geographic availability badges;
- CTA routing;
- existing checkout integration;
- mobile readability;
- product media placement;
- sales-first copy.

Not allowed:
- broad homepage redesign;
- new payment stack;
- duplicated Shopify inventory/pricing database;
- speculative tax/shipping engine;
- unrelated services redesign;
- activation of held SKUs;
- production deployment without Casey approval.

## QA REQUIRED

For each first-wave product verify:
1. card visible;
2. image correct;
3. title/SKU identity correct;
4. price correct;
5. detail route works;
6. CTA works;
7. cart/checkout target works;
8. destination restrictions are not misrepresented;
9. no blocked SKU promoted as purchasable;
10. mobile path remains usable.

## RELEASE RULE

Development may build/test/preview and return:

**READY TO DEPLOY: YES/NO**

Production deployment remains:

**CASEY APPROVAL REQUIRED.**

## CONTROL PHRASE

**USE SHOPIFY AS COMMERCE TRUTH. USE ELEVATIONUPScALES.COM TO SELL IT BETTER. ONE PRODUCT TRUTH. ONE PURCHASE PATH.**
