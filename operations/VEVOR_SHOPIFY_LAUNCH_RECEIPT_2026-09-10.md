# Elevation UpScales — VEVOR Shopify Direct Launch Receipt

**Status:** COMPLETE / VERIFIED CATALOG LAUNCH  
**Date:** 2026-09-10 MDT  
**Owner:** Casey Young  
**Execution lane:** Peter Torres / Ecommerce & Vendor Operations → Shopify Operations Worker  
**Parent control:** `VEVOR_VENDOR_MASTER_SOP.md`

## Result

The first curated VEVOR Direct Shopify catalog wave is live at the channel-publication layer.

- **19 / 19 A-tier VEVOR Direct SKUs are ACTIVE in Shopify.**
- **19 / 19 are published to Shopify's Online Store publication.**
- The **`VEVOR Direct`** smart collection is published and contains **19 products**.
- Each product carries its exact VEVOR source SKU, customer selling price, VEVOR-direct source control, MAP/live-price verification marker, live-stock verification marker, and one Shopify-hosted hero image.
- Supplier inventory is **not** represented as Elevation physical On Hand. Shopify inventory tracking remains off for this launch wave rather than copying supplier quantity into Elevation inventory.
- Existing Doba-sourced VEVOR drafts remain a separate source lane and were not converted into VEVOR Direct products.
- Verification markers for this launch use **2026-09-10**.

Publication proves catalog readiness. It does **not** close the VEVOR first-order workstream. A real customer order still needs to prove the operating path:

**CUSTOMER ORDER → ELEVATION VALIDATION → VEVOR PURCHASE → SUPPLIER ACCEPTANCE / FULFILLMENT → TRACKING → CUSTOMER COMPLETION → ACTUALS**

## Published A-tier set

| VEVOR SKU | Shopify customer price |
|---|---:|
| `DCDCDDY12V24PZD1S001V9` | $114.90 |
| `DCDCSDY12V24BEYZ9001V9` | $96.90 |
| `LWGPNKYTJ1204ZG5LV6` | $319.90 |
| `NBQCDQ1200W15EZHY001V1` | $239.90 |
| `GDSTYNB1200WLJQ4J001V1` | $209.90 |
| `FCCDQ12V20A05C7H3001V1` | $64.90 |
| `DGNRV50A1450RJD0NV0` | $34.90 |
| `DGNCRV203050AY3ZNV0` | $109.90 |
| `ZCJRQLS12V8KWCO9JV9` | $135.90 |
| `MG12V570PSI12969RV0` | $64.90 |
| `12VFCJZB12V1JPF4RV9` | $79.90 |
| `KQXDQJ3800CFMYP0KV1` | $413.90 |
| `SYCSQJS35PTL11246001V1` | $339.90 |
| `FXZXDMGFJ1800S8XLV1` | $144.90 |
| `FYHWRXYWWWIFINPTKV0` | $247.90 |
| `QXNKT35055000ENIOV0` | $84.90 |
| `D25FT14IN20AHOGLOV1` | $59.90 |
| `SDCZQGJTG-02-1.2MV0` | $121.90 |
| `SYGSZK10L110VIU03V1` | $50.90 |

## Price / stock control used

Before launch, the A-tier set was worked under the VEVOR control sequence:

**EXACT SKU → FEED MAP REFERENCE → CURRENT VEVOR SELLING PRICE → HIGHER APPLICABLE FLOOR → LIVE STOCK CHECK → SHOPIFY EXECUTION → POST-CHANGE VERIFICATION**

The launch record intentionally stores customer-facing price and verification state only. Protected supplier cost, private price sheets, raw supplier stock quantities, tax records, credentials, payment terms, and private correspondence remain outside this public repository.

## Shopify controls

The direct products use the VEVOR source lane and public-safe control tags including:

- `VEVOR`
- `VEVOR-Direct`
- `Source-VEVOR-Direct`
- `Dropship`
- `MAP-Controlled`
- `MAP-Live-Verified-2026-09-10`
- `Live-Stock-Verified-2026-09-10`

The smart collection is driven by the `VEVOR-Direct` tag so direct-account products remain distinct from Doba-sourced VEVOR records.

## Verified Shopify state

At final catalog verification:

- Online Store publication ID: `gid://shopify/Publication/363213750641`;
- all 19 tagged VEVOR Direct products reported `publishedOnPublication = true`;
- all 19 reported `ACTIVE` status;
- all 19 reported one media item;
- all 19 reported supplier inventory tracking disabled;
- all 19 variants reported `availableForSale = true` during the 2026-09-10 RUN storefront check;
- `VEVOR Direct` collection reported `publishedOnPublication = true` and `productsCount = 19`.

## Customer storefront verification — 2026-09-10 RUN

Customer-side verification identified one exact storefront-level gate after the catalog launch:

- Shopify Admin GraphQL reports Online Store password protection `enabled = true`;
- unauthenticated requests to the `VEVOR Direct` collection and representative VEVOR product URLs redirect to Shopify's `/password` page and display **Opening soon**;
- this prevents normal public browsing and checkout even though the VEVOR product records themselves are active, published, and internally sellable;
- the connected Shopify Admin GraphQL surface exposes the password-protection state for verification but no supported write path was available in the connected toolset to disable it;
- an authenticated Shopify Admin browser attempt was made under the Owner `RUN` command, but the available browser profile/vault has no Shopify Admin credentials and could not authenticate.

**Exact current blocker:** `SHOPIFY STOREFRONT PASSWORD PROTECTION ENABLED — AUTHENTICATED SHOPIFY ADMIN ACCESS REQUIRED TO DISABLE`.

This is a storefront-access gate, not a product-data failure. Do **not** rebuild, reprice, duplicate, unpublish, or otherwise recreate the 19 VEVOR Direct products to address it.

## Next

1. Using authenticated Shopify owner/admin access, disable the Online Store storefront password / **Opening soon** protection.
2. Immediately re-run unauthenticated customer acceptance on the `VEVOR Direct` collection, representative product pages, cart and checkout entry.
3. On the first real VEVOR Direct order, reverify the exact SKU, current supplier sellability, price/MAP condition, and VEVOR order path before supplier placement.
4. Record supplier acceptance, tracking, delivery, exceptions, and actual operating observations.
5. After the core path is proven, continue B-tier expansion under the VEVOR master SOP.

## Closure boundary

**A-TIER SHOPIFY CATALOG LAUNCH: COMPLETE.**  
**PUBLIC STOREFRONT ACCEPTANCE: BLOCKED ONLY BY SHOPIFY PASSWORD PROTECTION / ADMIN AUTHENTICATION.**  
**VEVOR FIRST-ORDER OPERATING PROOF: OPEN.**
