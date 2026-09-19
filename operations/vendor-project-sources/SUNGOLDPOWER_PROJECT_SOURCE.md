# SunGoldPower Project Source

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Vendor:** Sun Gold Power Inc. / SunGoldPower  
**Status:** ACTIVE APPROVED DISTRIBUTOR / DIRECT-SITE CATALOG INGESTION  
**Current commercial source:** Silver Dealer Price List dated 2026-09-15

## Verified relationship facts

- SunGoldPower approved Elevation UpScales as a distributor.
- SunGoldPower expressly authorized Elevation to begin listing its products on Elevation's company website.
- SunGoldPower supplied a Silver Dealer Price List dated 2026-09-15.
- The supplied price list includes private dealer pricing, MAP, UPC, product URL, certification information, and stock availability for the listed products.
- The price list states payment terms including PayPal or T/T on the cited product sections, with some kit sections also referencing check.
- The price list states a general handling time of 3 days and normally 3-7 days after shipping for the cited sections.

## Current pricing control

Initial customer sell price for SunGoldPower direct-site catalog activation is the supplier-provided MAP for each exact SKU, unless a later owner-approved compliant price replaces it.

Dealer cost is private internal commercial information and must not be written into public/customer catalog source.

See `operations/COMMERCE_VENDOR_PRICING_RULES_2026-09-16.md`.

## Current catalog scope

SunGoldPower is a first-class vendor in the Elevation universal catalog.

Initial ingestion should prioritize exact SKUs with:
- verified private dealer price in the supplier source;
- explicit MAP;
- exact UPC where supplied;
- explicit source availability;
- direct product URL;
- sufficient product identity to avoid model ambiguity.

## Initial catalog cohort

The first bounded cohort is intentionally limited to products marked in stock in the current price list and with unambiguous product identity.

Initial cohort selected for Web V2:

1. `LFP12-100A` — 12V 100Ah LiFePO4 Deep Cycle Lithium Battery / Bluetooth / Self-heating / IP65 — MAP $295 — in stock.
2. `SG48100P` — 51.2V 100Ah Server Rack LiFePO4 Battery — MAP $1,090 — UL1973 / UL9540A — in stock.
3. `SPH8048P` — 8KW 48V Split Phase Solar Inverter — MAP $1,450 — UL 1741 by ETL for off-grid solar system — in stock.
4. `SPH10048P` — 10KW 48V Split Phase Solar Inverter — MAP $1,580 — UL 1741 by ETL for off-grid solar system — in stock.
5. `SGS-12K18MAX` — 12KW 48V All-in-One Hybrid Solar Inverter / Whole Home Backup — MAP $2,990 — supplier-listed certifications include UL1741 and IEEE1547.1-2020 / CEC / Rule 21 / HECO — in stock.
6. `SG560WBGx2` — 2 × 560W Bifacial N-Type Solar Panels — MAP $980 — in stock.
7. `SGH-11N2E` — Hybrid Solar Kit 11.4KW 48V Split Phase / 20.48kWh Lithium / 16 × 450W panels — MAP $11,950 — in stock.
8. `SGR-10K25S` — Off-Grid Solar Kit / 10KW inverter / 25.6kWh lithium / 12 × 550W panels — MAP $10,350 — in stock.

## Holds / unresolved operational details

Website listing authorization is verified, but the following broader operating details are still being collected and must not be invented:

- exact direct-to-customer dropship procedure and fees, if any;
- live inventory-update/feed mechanism;
- full warranty/RMA operating procedure;
- brand/media-library access and explicit media-use terms beyond the website-listing authorization already provided;
- official marketing/social collaboration workflow;
- Hawaii/Alaska exact-SKU shipping authorization;
- commercial freight/project-order operating contact and process.

These missing enrichment/operating details must not erase verified distributor status or website listing authorization, but any transaction field that materially depends on an unresolved fact must remain fail-closed.

## Control phrase

**SUNGOLDPOWER IS APPROVED FOR ELEVATION WEBSITE LISTING. USE THE SUPPLIER PRICE SHEET AS CURRENT COMMERCIAL SOURCE, MAP AS INITIAL CUSTOMER PRICE, KEEP PRIVATE DEALER COST OUT OF PUBLIC CATALOG SOURCE, AND DO NOT INVENT UNVERIFIED FULFILLMENT OR SPECIAL-ROUTE TERMS.**
