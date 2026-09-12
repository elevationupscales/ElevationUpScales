# Elevation UpScales — VEVOR First-Sale Promotion Shortlist

**Status:** ACTIVE / P0 REVENUE SUPPORT / FRESH SUPPLIER + PROFITABILITY RECHECK REQUIRED BEFORE PROMOTION  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Project:** VEVOR Supplier / Catalog / Shopify / Fulfillment  
**Parent:** `vendor-project-sources/VEVOR_PROJECT_SOURCE.md`  
**Profitability Gate:** `DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md`  
**Global Priority:** first verified **profitable** Elevation direct-site order

## Purpose

Select a small set of low-friction VEVOR products from the live Elevation Shopify catalog for first-sale promotion once the VEVOR manager completes a fresh exact-SKU sellability / MAP / full order-contribution recheck.

This is a promotion shortlist, not an authorization to change price, create discounts, buy inventory, spend ad funds, or represent stale supplier inventory as current.

A low ticket price is not enough. Every promoted SKU must pass the Direct-Site Profitability Gate.

## Live Shopify candidate pool

Connected Shopify Admin was queried for `vendor:VEVOR AND status:active AND price:<=100`.

These are the strongest **preliminary** first-sale candidates before current cost/contribution re-ranking:

| Preliminary Priority | Shopify product | Exact VEVOR SKU | Current Shopify price | Why it is a first-sale candidate | Required final recheck |
|---|---|---|---:|---|---|
| 1 | VEVOR Camper Levelers — 2-Pack, Up to 4 in | `XXKLJT124INCLJF0QV0` | $33.90 | Low-friction RV utility item; simple use case; strong impulse/need-based purchase | live sellability; VEVOR price/MAP; supplier cost; shipping/fees; positive order contribution |
| 2 | VEVOR 50A RV Power Outlet Box — NEMA 14-50R | `DGNRV50A1450RJD0NV0` | $34.90 | Low-ticket RV electrical product; native Shopify checkout already proven on this listing | live sellability; VEVOR price/MAP; supplier cost; shipping/fees; positive order contribution |
| 3 | VEVOR 5000 lb A-Frame Trailer Jack — 15 in Travel | `AXLSTCQJDSYKAZ99C001V0` | $47.90 | Clear trailer/RV need; lower purchase friction | live sellability; VEVOR price/MAP; supplier cost; shipping/fees; positive order contribution |
| 4 | VEVOR RV Slide-Out Support Jacks — 5000 lb Each, 2-Pack | `RVHCWDQ2J500GHGAFV0` | $49.90 | RV-specific problem/solution product | live sellability; VEVOR price/MAP; supplier cost; shipping/fees; positive order contribution |
| 5 | VEVOR 2.6-Gal Wet/Dry Vac — 2.5 HP | `SYGSZK10L110VIU03V1` | $50.90 | Broad cleanup/restoration/RV utility; strong Elevation brand fit | live sellability; VEVOR price/MAP; supplier cost; shipping/fees; positive order contribution |
| 6 | VEVOR 1HP Submersible Utility Pump — 4000 GPH | `QSSZBSL10HP08XUGUV1` | $54.90 | Water-removal/restoration use case; strong fit with Elevation expertise | live sellability; VEVOR price/MAP; supplier cost; shipping/fees; positive order contribution |
| 7 | VEVOR 60W Foldable Solar Panel — 24% N-Type | `BXZDTYNB160W36PFJ001Y3` | $55.90 | Direct fit with off-grid/RV positioning; accessible solar entry point | live sellability; VEVOR price/MAP; supplier cost; shipping/fees; positive order contribution |
| 8 | VEVOR 12V 25-ft Electric Drain Auger — Auto Feed | `D25FT14IN20AHOGLOV1` | $59.90 | Useful home/RV service tool; easy problem/solution merchandising | live sellability; VEVOR price/MAP; supplier cost; shipping/fees; positive order contribution |
| 9 | VEVOR 12V RV Water Pump — 5 GPM / 70 PSI | `DDGMSBCGK12VVRA9W001V9` | $61.90 | Direct RV replacement/upgrade need; fits existing RV audience | live sellability; VEVOR price/MAP; supplier cost; shipping/fees; positive order contribution |
| 10 | VEVOR 100W Monocrystalline Solar Panel — Off-Grid / RV | `GDSTYNB1100W5GVA8001V1` | $63.90 | Entry solar panel aligned to Elevation solar/off-grid positioning | live sellability; VEVOR price/MAP; supplier cost; shipping/fees; positive order contribution |

## Current evidence already present

These products are currently ACTIVE in Shopify and have customer-facing media. Most carry current VEVOR-direct tags indicating the prior verification state, including combinations of:

- `Source-VEVOR-Direct`
- `Dropship`
- `MAP-Controlled`
- `MAP-Live-Verified-2026-09-10`
- `Live-Stock-Verified-2026-09-10`

Those tags are evidence of the previous verification pass, not a substitute for the fresh pre-promotion / pre-order recheck required by the VEVOR Project Source.

Shopify `totalInventory=0` is not treated as proof that VEVOR is out of stock because supplier inventory is intentionally not represented as Elevation physical On Hand.

## Protected Shopify cost-field check — 2026-09-11

A live Shopify Admin GraphQL check was run against all 10 exact shortlist SKUs using the protected `InventoryItem.unitCost` field. All 10 returned `unitCost = null`.

This is not evidence that supplier cost is zero. It means Shopify does not currently contain the protected supplier unit cost needed to clear contribution for these candidates.

Therefore:

- Shopify price, active status, media and product identity remain useful launch evidence;
- Shopify alone cannot clear the profitability gate for any of the 10 shortlist SKUs;
- no shortlist SKU is authorized for promotion from this check alone;
- the next valid trigger is a protected current supplier-cost / landed-order-cost source, followed by the existing full contribution calculation;
- public Git must record only the resulting `PROMOTE / HOLD` state, not protected supplier costs.

## Merchandising ranking rule

The preliminary order above favors low purchase friction and strong brand fit. **It must be re-ranked after protected current supplier costs and order economics are known.**

Final ranking must consider:

**CUSTOMER DEMAND / PURCHASE FRICTION + EXPECTED DOLLAR CONTRIBUTION + EXPECTED CONTRIBUTION RATE + BRAND FIT + FULFILLMENT RELIABILITY + SUPPORT/RETURN RISK.**

A cheaper item with weak contribution does not outrank a slightly higher-priced item with better conversion economics and materially better profit.

## Promotion controls

Before any item is actively promoted:

**EXACT SKU → LIVE VEVOR SELLABILITY → CURRENT VEVOR SELLING PRICE / MAP FLOOR → CURRENT SUPPLIER COST → SHIPPING / FULFILLMENT COST → PAYMENT / PLATFORM FEES → POSITIVE ORDER CONTRIBUTION → SHOPIFY BUY PATH → PROMOTE**

Do not:

- create a discount that violates MAP;
- create a discount that makes order contribution non-positive;
- advertise supplier stock based only on the Sep. 10 tag;
- promise 3–7 working day delivery as a guarantee;
- call VEVOR fulfillment fully blind/unbranded;
- move direct VEVOR listings to unauthorized marketplaces;
- promote a product whose material current cost is unknown;
- promote a product whose expected contribution is $0 or negative;
- spend paid-ad money unless the campaign economics are separately approved and the acquisition cost is included in profitability analysis.

## Next action

VEVOR Project Operations Manager / Price-Control Specialist:

1. fresh-check the 10 exact SKUs against current VEVOR direct sellability and price/MAP;
2. use protected current supplier cost plus shipping, processor/platform fees and other known variable order costs to calculate expected order contribution;
3. re-rank the candidates by demand **and** profitability;
4. return `PROMOTE / HOLD — ECONOMICS UNKNOWN / HOLD — NEGATIVE CONTRIBUTION` per SKU;
5. immediately route the first 3–5 profitable `PROMOTE` items into free/owned traffic and Elevation direct-site merchandising;
6. on first real order, reverify exact SKU once more, place through VEVOR PRO, capture supplier acceptance/tracking, record actual order economics and close the first-order proof only as a profitable path when supported by actuals.

**Control phrase:**

**LOW-FRICTION PRODUCT → FRESH VEVOR CHECK → FULL COST CHECK → POSITIVE CONTRIBUTION → PROMOTE → PROFITABLE DIRECT-SITE ORDER → RECORD ACTUALS → SCALE.**