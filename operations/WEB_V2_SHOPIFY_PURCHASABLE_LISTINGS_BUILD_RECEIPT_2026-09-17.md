# WEB V2 — SHOPIFY-ALIGNED PURCHASABLE LISTINGS BUILD RECEIPT

**Date:** 2026-09-17
**Owner:** Casey Young
**Branch:** `work/web-v2-shopify-purchasable-listings-2026-09-17`
**Base:** `6ffe0eed331556652230fc0ec086f4bed9270459`
**Candidate head:** `ea070cf69abee5922101553f40e64f9cd6c307b0`

## BUILT

- Added a dedicated Renogy purchase section to `/store`.
- Added six currently ACTIVE/published Shopify Renogy products with exact current prices, SKUs and Shopify product destinations.
- Added customer discovery paths for:
  - Shop Renogy
  - Hawaii & Alaska Renogy
  - Canada Renogy Supply
- Updated homepage commerce navigation to expose the same Renogy paths.
- Replaced the homepage logistics Kingboss CTA with Shop Renogy so an isolated HOLD vendor is not the promoted commerce action.
- Preserved existing Elevation checkout architecture; Renogy Buy/View actions hand off to the verified Shopify storefront rather than creating a second payment/cart system.
- Preserved 400W suitcase restriction copy: Lower-48/direct-site route only; not automatic AK/HI air eligible.

## SHOPIFY LIVE-STATE VERIFICATION

All six referenced products were verified through live Shopify Admin state as:
- status: ACTIVE;
- publishedAt: non-null;
- availableForSale: true;
- exact price matches branch copy.

Products:
- `RSP10TC-G1-US` — $39.99
- `RNG-CTRL-ADV30-LI-US` — $82.99
- `RBM500-G3-US` — $87.99
- `RSHST-B02P300-G1-US` — $120.99
- `RNG-INVT-3000-12V-P2-G3-US` — $414.99
- `RSP400LSC-G1-US` — $495.99

## BOUNDED DIFF

Compared with approved base:
- `site/store.html`
- `site/home-commerce.js`

No other production/site files changed.

## STATIC QA

PASS:
- Renogy section exists.
- All six exact SKUs are present.
- Shopify domain and exact product handles are present.
- Hawaii/Alaska and Canada discovery paths are present.
- Store/home commerce no longer uses Kingboss as the promoted hero/logistics CTA.
- Store HTML closes correctly.

## HOLD

No automatic GitHub CI/workflow run was attached to the branch head at verification time.
An immutable preview/live browser smoke has not yet been produced from this candidate.

**READY TO PREVIEW: YES — PR QA RE-RUN AFTER CANONICAL TEST ALIGNMENT**
**READY TO DEPLOY: NO — PREVIEW/SMOKE REQUIRED**

Production remains behind Casey's separate deployment approval gate.


## BRANDED SHOP DOMAIN REMEDIATION — 2026-09-17

Live Shopify domain verification:
- primary storefront: `https://shop.elevationupscales.com`;
- SSL enabled;
- public Renogy, Alaska/Hawaii and Canada collection paths resolve on the branded domain.

Branch correction:
- replaced all 19 hard-coded `https://elevationupscalesinc.myshopify.com` customer destinations in `site/store.html` with `https://shop.elevationupscales.com`;
- corrected stale 3000W inverter Alaska/Hawaii shipping copy from **$89.99** to the verified live **$119.95** launch rate;
- correction commit: `945f3a4ba0d093296c0c9c715ca4b4ecfd1e8ff1`.

Shopify delivery-profile verification:
- Renogy small parcel: AK/HI **$34.95**, Canada **$29.95**;
- Renogy medium parcel / inverter: AK/HI **$119.95**, Canada **$79.95**;
- Lower-48 rates remain separately configured;
- AK/HI and supported Canada province zones are active.

Interactive payment-screen re-smoke was not re-run in this receipt because the connected metered browser wallet lacked funds. Existing payment-stack verification is not reopened absent new evidence of failure.

**READY TO DEPLOY: NO — CURRENT MAIN RECONCILIATION + IMMUTABLE PREVIEW/SMOKE STILL REQUIRED.**
