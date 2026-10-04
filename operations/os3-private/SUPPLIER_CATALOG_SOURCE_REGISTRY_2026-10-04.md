# OS3 Supplier Catalog Source Registry

**Date:** 2026-10-04  
**Status:** INTERNAL / OWNER-DIRECTED  
**Purpose:** Define which supplier catalog, SKU, pricing, inventory, and portal sources OS3 may use for sourcing, POS/pricing, product recon, and catalog control.

## Source classes

- **API-LIVE** — supplier/API data that can be queried programmatically.
- **PORTAL-LIVE-MANUAL** — supplier portal data that must be checked manually and timestamped.
- **SUPPLIER-FEED** — supplier-supplied catalog/SKU/price file.
- **CURATED-CATALOG** — Elevation-selected sellable subset.
- **STOREFRONT-CATALOG** — current Shopify/eBay product records; not supplier inventory truth by themselves.
- **HISTORICAL-ONLY** — retained for mapping/research; not valid for current price/stock decisions.

Every manual or file-based supplier fact must retain a verified-at date and source file/message reference.

---

## CJdropshipping

**Primary source class:** API-LIVE

Available capability:
- product discovery/search
- exact SKU / variant / VID lookup
- stock-by-VID
- CJ warehouse vs factory inventory
- freight calculation
- route qualification
- product/order reads through existing bridge/specialist

Catalog strategy:
- no static master file required
- treat CJ API search as the source catalog
- exact stock and freight must be refreshed before publish/order

Current important records:
- sports bag SKU CJJT167029603CX
- power-bank candidate SKU CJJT156376004DW

---

## VEVOR

**Primary source classes:** SUPPLIER-FEED + PORTAL-LIVE-MANUAL + CURATED-CATALOG

Recovered supplier source:
- full product/inventory feed: **20,999 products**
- source packet: `ELEVATION_VEVOR_DEDICATED_PROJECT_STARTER_2026-09-10.zip`
- package contained a lightweight all-product CSV plus curated workbook
- curated initial working set: **40 strongest Elevation-fit products**
- A-tier verified set: **19 products**
- A-tier source workbooks:
  - `VEVOR_A_TIER_LIVE_VERIFIED_2026-09-10.xlsx`
  - `VEVOR_A_TIER_RUN_COMPLETE_2026-09-10.xlsx`

Later storefront evidence also showed a VEVOR Direct assortment larger than the original 19-item A-tier, including a 25-product Shopify price-list snapshot.

Operating rule:
- preserve the large 20,999-item feed as a sourcing universe
- OS3 should use a smaller controlled live catalog
- current price and availability must be refreshed in the VEVOR PRO/dealer portal before consequential pricing/order decisions
- portal/manual checks must be timestamped
- no public API is currently treated as available

---

## Renogy

**Primary source classes:** PORTAL-LIVE-MANUAL + SUPPLIER-FEED + CURATED-CATALOG

Supplier-confirmed operating sources:
- Renogy Partner Portal provides dealer pricing
- Renogy confirmed inventory/catalog data and marketing assets are available to approved partners
- vendor catalog work packet includes the supplier-issued **`Item List (with UPC Code).xlsx` + marketing toolkit**
- recovered supplier list contains **204 current items** (rows 0–203) with exact SKU, description, dealer price, MSRP, status, and UPC

Current supplier/POS scale:
- **204 supplier-issued Renogy items** recovered from the September 11 dealer file
- recent internal recon described the Shopify Renogy collection as roughly **80 products**
- this is storefront scope, not real-time supplier inventory

Recovered curated exact SKUs from Peter's 92-product index include:
- RSP10TC-G1-US
- RSP400LSC-G1-US
- RBM500-G3-US
- RBC2125DS-21W-G3-US
- RNG-CTRL-ADV30-LI-US
- RSHST-B02P300-G1-US
- RBC2115DS-21W-G1-US

Additional high-ticket Renogy package SKUs exist in Shopify/drafts and should be reconciled against portal truth before promotion.

Operating rule:
- Renogy portal is current commerce truth for dealer price/availability
- current catalog can be materially larger than the Shopify promoted set
- U.S./Canada eligibility must be checked per SKU/order
- public Renogy device API must not be treated as dealer-commerce catalog truth

---

## Olight

**Primary source class:** SUPPLIER-FEED

Strongest retained source:
- `olight_FULL_itemized_stockable_catalog_2026-10-01.xlsx`
- **189 exact stockable/orderable SKU variants**
- 18 supplier-confirmed sufficient-inventory variants
- 171 dealer-sheet eligible / not marked sold out
- 32 supplier-recommended SKU variants

Underlying supplier files:
- `Dealer Price Sheet.pdf`
- `Hot-Selling Picks-Olight.pdf`
- `Olight New Arrivals in 2026.09.10.xlsx`

Operating rule:
- exact SKU/UPC is required
- dealer-sheet eligibility is not a real-time quantity guarantee
- recheck older items or larger buys
- preserve Olight territory/channel restrictions

---

## SOK Energy

**Primary source classes:** SUPPLIER-FEED + CURATED-CATALOG

Supplier source:
- `SOK-USA Price(Free-shipping)-080326.pdf`
- supporting product/spec source packets and battery documentation
- supplier provided exact carton/pallet and lithium compliance documents for qualified products

Verified historical inventory examples from supplier correspondence:
- SK12V100PC — 815 units reported on 2026-09-04
- SK48V100N — 291 units reported on 2026-09-04

Peter's 92-product catalog index contains SOK exact products and pack structures including:
- SK12V100H
- SK12V206H
- SK12V280H
- SK24V100
- SK24V150PH
- SK12V206PH
- SK12V100PC
- SK48V100N
- related chargers, kits, Lower-48 offers, and Hawaii pack offers

Operating rule:
- SOK remains controlled freight / battery lane
- old inventory counts are historical until refreshed
- exact SKU, quantity, freight, DG documents, and destination must be verified before customer commitment

---

## SunGoldPower

**Primary source class:** SUPPLIER-FEED

Supplier source:
- `Silver Dealer Price List from SunGoldPower (20260915).pdf`
- sent after Elevation passed distributor review
- supplier explicitly authorized product listing on Elevation's website
- file is the wholesale/dealer price source

Additional catalog/source evidence:
- vendor catalog packet includes SunGoldPower dealer/brochure source
- curated current system example: SGR-6510E
- current storefront includes inverter/system families beyond the single brochure example

Operating rule:
- treat dealer price list as protected internal pricing
- availability/dropship/freight must still be refreshed by exact SKU
- do not infer live inventory from the price list alone

---

## Signature Solar / EG4

**Primary source classes:** SUPPLIER-FEED + PORTAL-LIVE-MANUAL

Supplier sources:
- `S2 Price List- INSTALLER (24).pdf`
- `S2 Price List - PANELS - 2026-09-16T153214.017.pdf`
- installer-tier pricing is also visible through the approved account/portal
- kits, bundles, and panels may require custom quote for partner-tier pricing
- supplier rep can provide current inventory insight and B2B promotions

Catalog scope:
- EG4 and other solar-panel, battery, inverter, kit and balance-of-system products
- broad catalog; exact source-list count not yet recovered

Operating rule:
- use attached price sheets as supplier-feed evidence
- use portal/rep quote for current inventory and consequential pricing
- MAP must be respected
- project/BOM items require exact SKU and destination review

---

## EPOCH Batteries

**Primary source class:** PORTAL-LIVE-MANUAL

Recovered supplier state:
- wholesale/dealer portal access was issued
- direct sales manager relationship exists
- no retained static supplier SKU/price attachment has been recovered in the current search

Operating rule:
- treat EPOCH portal as the primary source for available SKU, dealer price and inventory
- portal values must be timestamped when copied into OS3
- do not invent a catalog count from public-site breadth

---

## Kingboss

**Primary source class:** SUPPLIER-FEED

Direct supplier source:
- `Kingboss-SKU.xlsx`
- corrected version superseded an earlier `Kingboss-SKU.csv`
- supplier states the mapping covers **38 products** supplied by Elevation for reconciliation

Supplier grouping notes:
- 12V100-prefix SKUs can be mixed within one order
- PB1-prefix SKUs can be mixed within one order
- PB2 / PB3 / PB4 are separate product lines

Operating rule:
- use the direct 38-product supplier mapping over older Doba intermediary mappings
- current direct cost, MOQ, fulfillment and live inventory remain separate verification fields

---

## Doba

**Primary source class:** HISTORICAL-ONLY

Retained exports:
- multiple `US_Dropshipping_Product_Data_with_45%_Markup_20260907_*.csv/.xlsx` files

Useful historical evidence:
- contains historical supplier/product mappings, including Kingboss-attributed rows
- one recovered analysis found 40 Kingboss-attributed rows / 16 distinct title patterns

Operating rule:
- Doba is no longer an authorized live dependency unless owner explicitly reverses the exit
- do not use Doba price, stock or shipping snapshots as current supplier truth
- retain only for lineage/mapping research

---

## Phocos

**Primary source class:** SUPPLIER PRODUCT/DATASHEET SOURCE

Recovered files include:
- CX-N-MPPT 30A datasheet
- CX-N-MPPT 60A datasheet
- PSW-B inverter source
- PSW-H 3K source
- CIS-N-MPPT source
- warranty conditions

No current full dealer SKU/price master was recovered in this pass.

Operating rule:
- treat as a qualified product/spec source, not a complete catalog feed until a price/SKU list or portal source is captured

---

## Winegard / Hughes Autoformers / PowerMax

Current records confirm supplier/dealer relationships or sourcing lanes, but this pass did **not** recover a supplier-authoritative complete SKU/price master for these vendors.

Operating rule:
- classify as **RELATIONSHIP EXISTS / MASTER SKU SOURCE NOT YET CAPTURED**
- do not treat public website breadth as internal dealer inventory
- capture portal, price sheet, or direct SKU feed when available

---

## Peter 92-product curated index

Retained current-source artifact:
- `BROCHURE_INDEX.csv`
- paired with `Elevation_InStock_Product_Brochures_Master_92_Products.pdf`

Purpose:
- curated sellable/near-sellable layer across vendors
- exact product title, vendor, SKU, retail price and Shopify handle
- useful OS3 current-catalog index
- NOT a replacement for supplier master feeds or live supplier inventory

Includes products from:
- SOK
- Renogy
- Olight
- SunGoldPower
- VEVOR
- Portable Sun sourced products
- Dark Energy
- Elevation multi-vendor bundles

---

## OS3 precedence rule

For pricing, launch and fulfillment decisions use this source order:

1. API-LIVE supplier truth
2. current dealer/partner portal truth
3. newest supplier-issued feed / price / SKU file
4. curated Elevation catalog
5. Shopify/eBay storefront record
6. historical intermediary data

A lower-level source must never silently override a newer higher-authority supplier source.

For every product OS3 should maintain:
- supplier
- exact SKU / variant SKU
- supplier source class
- source file / portal / API reference
- verified-at date
- dealer/source cost
- inventory state
- fulfillment state
- market eligibility
- shipping/freight evidence
- MAP/territory restrictions
- stale/recheck status
