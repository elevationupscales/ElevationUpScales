# OS3 POS Master Inventory Gap Audit

**Date:** 2026-10-04  
**Status:** INTERNAL / MANAGEMENT ACTION  
**Purpose:** Convert Elevation's vendor relationships into a complete OS3-ready POS product master.

## Executive state

Elevation now has a strong supplier-data foundation. The remaining work is not "find vendors." It is to finish the structured SKU, price, availability, restrictions, and refresh sources for the vendor relationships already in place.

### POS-ready or near-ready sources

| Vendor | Current source | Current depth | Remaining gap |
|---|---|---:|---|
| VEVOR | Supplier product/inventory feed + VEVOR PRO portal | 20,999 feed products | Normalize full feed; keep smaller approved POS/live assortment; timestamp portal price/stock refreshes |
| Renogy | Supplier-issued Item List (with UPC Code).xlsx + Partner Portal | 204 current items | Normalize sheet into POS; portal supplies current in-stock status; establish refresh cadence for updated item list |
| Olight | Dealer Price Sheet + full normalized workbook | 189 stockable/orderable variants | Current quantity is not continuously live; retain recheck flag for larger/older buys |
| SOK | Supplier price sheet + specs/compliance | 9 core battery SKUs on retained Aug 3 sheet | Obtain newest complete product/price list + current inventory/availability source and cadence |
| Kingboss | Direct Kingboss SKU mapping | 38 mapped products | Ask for full current manufacturer product master if catalog exceeds the 38 mapped products; add dealer cost/live stock/fulfillment fields |
| SunGoldPower | Silver Dealer Price List (2026-09-15) | Broad 13-page supplier price list | Prefer CSV/XLS export; current inventory/lead time/dropship fields need structured refresh |
| Signature Solar / EG4 | Installer price list + panel price list + partner portal | Broad 21-page multi-brand installer list plus panel sheet | Need machine-readable export/current inventory/lead time; track MAP/discontinued status and custom-quote exceptions |

## Incomplete POS master sources — follow-up required

### EPOCH Batteries — P1

**What we have**
- approved wholesale/dealer relationship
- partner/dealer portal
- direct sales contact Nick Motsinger
- no recovered supplier-issued complete SKU/price file

**What POS needs**
- full current SKU/model list
- UPC/MPN where available
- dealer/Tier 1 cost
- MSRP/MAP
- availability/in-stock state
- product status/discontinued flag
- fulfillment/drop-ship eligibility
- shipping rules
- warranty/RMA metadata
- refresh method or export cadence

**Next action**
Peter should first inspect the EPOCH portal for a CSV/XLS/export. If none exists, prepare a request to Nick for a current dealer product master. Casey approves/sends.

---

### Phocos — P1

**What we have**
- dealer/reseller relationship
- product datasheets for selected controller/inverter families
- warranty document
- no recovered complete dealer SKU/price master

**What POS needs**
- full dealer SKU list
- dealer price
- MSRP/MAP if applicable
- UPC/MPN
- current orderable status
- inventory/lead time
- drop-ship/direct fulfillment rules
- product category and key dimensions/weight
- refresh method

**Next action**
Peter inventories the currently retained Phocos models. Casey/Peter request the full current dealer price/SKU sheet from Youssef Akazdir.

---

### Winegard — P1

**What we have**
- authorized reseller/dealer relationship in prior supplier catalog
- product-family relationship
- no supplier-authoritative complete current SKU/price master recovered in this recon

**What POS needs**
- complete dealer product/SKU catalog
- dealer price/MSRP/MAP
- UPC/MPN
- stock/availability
- drop-ship eligibility
- shipping class/weight/dimensions
- warranty/RMA
- channel restrictions
- refresh/export method

**Next action**
Peter checks the dealer portal/account for export or downloadable price list. If unavailable, draft request for the complete reseller SKU/price catalog.

---

### Hughes Autoformers — P1

**What we have**
- dealer relationship recorded in prior sourcing catalog
- no current complete SKU/price master recovered

**What POS needs**
- full dealer item list
- exact SKU/UPC
- dealer price/MSRP/MAP
- current availability
- fulfillment/shipping
- product status
- warranty/RMA
- refresh cadence

**Next action**
Peter recovers portal/account source first. If no structured export exists, request the current dealer product master.

---

### PowerMax Converters — P1

**What we have**
- wholesale customer/vendor relationship recorded
- no current supplier-authoritative complete SKU/price master recovered

**What POS needs**
- converter/charger/inverter/RV power-center SKU catalog
- wholesale cost
- MSRP/MAP if any
- UPC/MPN
- stock/lead time
- fulfillment/shipping
- warranty
- product status
- refresh/export method

**Next action**
Peter checks existing account materials and portal. If incomplete, draft request for a complete wholesale SKU and pricing file.

---

## Strong source, but completeness/freshness follow-up still needed

### Renogy

**Recovered**
Supplier email of 2026-09-11 explicitly supplied:
- latest product catalog link
- `Item List (with UPC Code).xlsx`
- SKU
- description
- dealer price
- MSRP
- status
- UPC
- 204 current item rows

Renogy explicitly states:
- current inventory status is available in Partner Portal
- exact quantity is supplied on request
- inventory changes too frequently for a continuously updated quantity feed

**Follow-up**
No new SKU-list request is needed immediately. Normalize the 204-row file and establish:
- `source_date`
- `last_inventory_check`
- `portal_status`
- `exact_qty_verified_at` when requested
- `channel_eligible` (direct Elevation website only)
- `drop_ship_eligible`
- `lead_time`

Ask Renogy only whether there is a newer replacement file or recurring export cadence.

---

### SOK Energy

**Recovered**
Retained 2026-08-03 supplier sheet contains 9 core SKUs:
- SK12V100PC
- SK12V100H
- SK12V206H
- SK12V206PH
- SK24V100
- SK12V280H
- SK12V314PH
- SK24V150PH
- SK48V100N

**Follow-up**
Request the newest complete SOK dealer SKU/price sheet because:
- new SK48V392/20kWh product has since been introduced
- August pricing is no longer sufficient as the permanent POS source
- inventory should be a separate current field, not inferred from old correspondence

Needed fields:
SKU, title, dealer/drop-ship cost, MAP, orderable status, inventory, warehouse, packed weight/dimensions, UN38.3/SDS reference, destination restrictions.

---

### SunGoldPower

**Recovered**
The 13-page Silver Dealer price list is supplier-authored and includes:
- product name
- SKU
- dealer price
- MAP
- UPC on many items
- product URL
- certification notes
- an availability-in-stock column

**Follow-up**
This is strong supplier truth but awkward for automated POS use. Ask Joyce for:
- CSV/XLS version of the current dealer list
- current stock/lead-time method
- shipping/drop-ship fields by SKU
- update cadence / replacement-file method

Do not rely indefinitely on a static September PDF's "Yes" stock field.

---

### Signature Solar / EG4

**Recovered**
- 21-page installer price list
- separate panel price list
- exact SKU, MAP and installer pricing across EG4 and other brands
- portal/account access
- James can provide inventory insight and custom B2B pricing
- kits, bundles and panels can require custom quotes

**Follow-up**
Ask James for:
- machine-readable CSV/XLS export if available
- current inventory/lead-time export or portal report
- current discontinued/status flags
- panel MAP source
- refresh cadence
- explicit flags for items requiring custom quote instead of sheet pricing

This is needed before OS3 treats the full Signature catalog as automated POS data.

---

### Kingboss

**Recovered**
Direct corrected supplier mapping covers the 38 products Elevation supplied for reconciliation.

**Follow-up**
Ask whether the 38 mapped products are:
- the full current U.S. dealer assortment, or
- only the subset Elevation originally supplied.

If partial, request:
- full current U.S. item master
- exact manufacturer SKU
- UPC
- dealer price
- MOQ
- inventory
- warehouse
- fulfillment eligibility
- shipping cost/terms
- product-line grouping

---

## Secondary / derived catalog sources

### Peter 92-product index
Useful curated current sellable layer. Not supplier master truth.

### Shopify catalog
Useful for products Elevation currently exposes. Not supplier inventory truth.

### Doba
Historical only. Never use for current supplier price/stock without explicit owner reversal.

### Portable Sun / Dark Energy / other Shopify-sourced vendors
Treat as separate sourcing lanes. If Elevation intends them to become direct POS suppliers, obtain supplier-authoritative SKU/cost/availability terms first. Shopify listing presence alone is insufficient.

## Standard POS master schema

Every supplier item should normalize to:

- vendor
- brand
- supplier_product_id
- supplier_sku
- variant_sku
- UPC/EAN/MPN
- title
- category
- description_short
- dealer_cost
- MSRP
- MAP
- currency
- status
- inventory_state
- inventory_qty
- inventory_source
- inventory_verified_at
- source_date
- source_type
- source_file_or_portal
- fulfillment_method
- dropship_eligible
- warehouse/origin
- processing_time
- shipping_class
- packed_weight
- dimensions
- battery/DG flag
- SDS/UN38.3 reference
- U.S. eligibility
- Canada eligibility
- other market eligibility
- channel restrictions
- warranty
- return/RMA path
- price_verified_at
- recheck_required
- notes

## Follow-up ownership

### Peter — data/recon first
1. Normalize existing VEVOR, Renogy, Olight, SOK, Kingboss, SunGoldPower, and Signature Solar files into the POS schema.
2. Check EPOCH, Winegard, Hughes Autoformers, PowerMax and Phocos portals/account files for export/download capability.
3. Produce one missing-field report per vendor.
4. Draft supplier requests only where an export/source is genuinely absent.
5. Do not send vendor outreach without the normal Casey approval gate.

### Casey — relationship/outreach gate
1. Approve/send missing-master requests.
2. Prioritize SOK, EPOCH, Phocos, Winegard, Hughes and PowerMax.
3. Ask SunGoldPower and Signature Solar for machine-readable replacements rather than PDFs.
4. Ask Kingboss whether 38 items is the full dealer assortment.
5. Ask Renogy only for a newer/recurring replacement list, not a redundant catalog request.

## Completion definition

A vendor is **POS MASTER READY** when OS3 has:
1. exact item identity
2. current sellable status
3. protected source cost
4. public pricing/MAP rule
5. inventory source + freshness
6. fulfillment/shipping method
7. channel/market eligibility
8. warranty/returns metadata
9. source provenance
10. refresh method

Until all ten are present, OS3 may use the vendor for controlled/manual sales but must not represent the vendor as a fully automated master catalog.
