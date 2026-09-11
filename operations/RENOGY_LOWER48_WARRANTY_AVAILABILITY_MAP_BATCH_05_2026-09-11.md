# Renogy Lower-48 Warranty & Availability Map — Batch 05

**Date:** 2026-09-11  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Role:** Renogy Project Specialist  
**Reports To:** Renogy Branch Operations Manager  
**Controlling SOP:** `RENOGY_VENDOR_MASTER_SOP.md`  
**Parent:** `RENOGY_LOWER48_BACKORDER_WARRANTY_PROGRAM_2026-09-10.md`  
**Status:** PUBLIC-SAFE / BATCH 05

## Recon result

Current `main` has moved to a sales-first Renogy catalog activation model. Batches 03–04 are already present on `main`; this batch continues independent exact-SKU monitoring/communications mapping while protected MAP, dealer availability and media gates remain attached only to the affected publish/order action.

## Batch 05 map

| SKU | Product / family | Public availability finding | Backorder status | Warranty finding | Classification / action | Public source |
|---|---|---|---|---|---|---|
| `RCM-HUB-US` | Renogy Communication Hub | Current U.S. page identifies exact storefront SKU, renders unavailable, explicitly states the Communication Hub is backordered, and retains Add to Cart / Buy Now. | `BACKORDER_AUTHORIZED_PUBLIC` for the exact storefront SKU; Partner Portal/current dealer source still controls fulfillment acceptance. | Same current product page states **1-year material/workmanship warranty** for the accessory. | Availability `EXACT`; warranty `EXACT`. | https://www.renogy.com/products/communication-hub |
| `RSHST-B02P300-US` | Renogy Battery Shunt 300 — shunt-only variant | Current U.S. page identifies exact storefront SKU and the selected shunt-only variant as unavailable/backordered while purchase controls remain exposed. | `BACKORDER_AUTHORIZED_PUBLIC` for exact shown variant; dealer source recheck required before fulfillment. | Current product page states **1-year material/workmanship warranty**. | Availability `EXACT`; warranty `EXACT`; model name `RSHST-B02P300-G1` retained as technical-model evidence. | https://www.renogy.com/products/renogy-battery-shunt-300 |
| `KIT-B02P300-W02W-US` | Battery Shunt 300 + Renogy ONE Core bundle variant | Current U.S. product variant identifies exact bundle SKU and explicitly states the selected “Yes” bundle is backordered with purchase controls exposed. | `BACKORDER_AUTHORIZED_PUBLIC` for exact bundle SKU/variant. | Component warranty must remain component-specific: Battery Shunt 300 page states 1 year; Renogy ONE Core G3 page/spec states 2 years. Do not flatten bundle warranty into one unsupported term. | Availability `EXACT`; warranty `COMPONENT_SPECIFIC` — customer listing must preserve separate component terms unless Renogy provides bundle-specific written warranty. | https://www.renogy.com/products/renogy-battery-shunt-300 ; https://www.renogy.com/products/renogy-one-core-g3-version |
| `RSHGWSN-W02W-US` | Renogy ONE Core (G3 Version) | Current Renogy U.S. power-management page identifies exact storefront SKU and explicitly states the product is backordered with Add to Cart exposed. | `BACKORDER_AUTHORIZED_PUBLIC` for exact storefront SKU; current dealer source still controls supplier fulfillment. | Current U.S. product page and current G3 specification both state **2-year material/workmanship warranty**; technical model is `RSHGWSN-W02W-G3`. | Availability `EXACT`; warranty `MODEL_BRIDGE_VERIFIED / EXACT TERM`. | https://www.renogy.com/products/renogy-one-core-g3-version ; current Renogy G3 specification |

## New recon findings

### 1. Monitoring/communications is a strong public-backorder cluster, not blanket authority

Batch 05 adds exact current paid-backorder evidence for `RCM-HUB-US`, `RSHST-B02P300-US`, `KIT-B02P300-W02W-US`, and reconfirms `RSHGWSN-W02W-US`. This improves launch readiness for the monitoring/power-management lane, but does not authorize paid backorder for adjacent Renogy communications products unless their exact current state supports it.

### 2. Bundle warranties must remain component-aware

The Battery Shunt 300 + Renogy ONE Core bundle shows why exact-SKU warranty handling cannot stop at the bundle title. Current Renogy evidence gives the shunt a 1-year warranty and ONE Core G3 a 2-year warranty. Elevation must not advertise the bundle as uniformly 2 years or uniformly 1 year unless Renogy publishes a controlling bundle-specific term.

### 3. Same-page technical model bridging can close suffix ambiguity

For `RSHGWSN-W02W-US`, the current U.S. product/specification identifies the G3 technical model `RSHGWSN-W02W-G3` and the same 2-year warranty term. That is enough to treat the current U.S. listing warranty term as exact without relying solely on unsuffixed historical warranty tables.

## Sales-first use

These records improve customer-ready staging but do not independently clear public activation. Before publication/order, still verify the exact SKU's current MAP/customer price, dealer sellability/orderability, approved media/source identity, Lower-48 fulfillment treatment and direct-site channel state under the Renogy Master SOP.

A missing protected fact blocks only the affected activation step. Continue independent SKU mapping and listing preparation for other products.

## Next executable work

Continue into additional monitoring, communications, DC distribution, cable, connector, fuse/protection and mounting products that improve the sales-first universal catalog. Prioritize exact U.S. storefront SKUs where current availability and warranty can be verified cleanly, then hand clean launch candidates back to the catalog/Shopify activation lane.