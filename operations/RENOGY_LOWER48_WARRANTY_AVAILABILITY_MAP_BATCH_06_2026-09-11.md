# Renogy Lower-48 Warranty & Availability Map — Batch 06

**Date:** 2026-09-11  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Role:** Renogy Project Specialist  
**Reports To:** Renogy Branch Operations Manager  
**Controlling SOP:** `RENOGY_VENDOR_MASTER_SOP.md`  
**Parent:** `RENOGY_LOWER48_BACKORDER_WARRANTY_PROGRAM_2026-09-10.md`  
**Status:** PUBLIC-SAFE / BATCH 06

## Recon result

Batch 05 is accepted. This batch continues the sales-first worktree into DC protection and balance-of-system products using current Renogy U.S. storefront evidence. Protected MAP, dealer inventory, approved-media and fulfillment acceptance remain attached only to the affected activation/order action.

## Batch 06 map

| SKU | Product / family | Public availability finding | Backorder status | Warranty finding | Classification / action | Public source |
|---|---|---|---|---|---|---|
| `RDCCBBMN5PMC2P-US` | DC Circuit Breaker Box | Current U.S. page identifies exact storefront SKU, renders unavailable, explicitly states the box is backordered, and retains Add to Cart / Buy Now. | `BACKORDER_AUTHORIZED_PUBLIC` for exact storefront SKU; Partner Portal/current dealer source still controls fulfillment acceptance. | Current product page states **1-year material/workmanship warranty**. | Availability `EXACT`; warranty `EXACT`. | https://www.renogy.com/products/dc-circuit-breaker-box |
| `RPD350BS-US` | 350A Battery Switch | Current U.S. page identifies exact storefront SKU, renders unavailable, explicitly states it is backordered, and retains purchase controls. | `BACKORDER_AUTHORIZED_PUBLIC` for exact storefront SKU. | Current page states **1-year material/workmanship warranty**. | Availability `EXACT`; warranty `EXACT`. | https://www.renogy.com/products/350abattery-switch |
| `RNG-SET-ANL60-US` | ANL Fuse Set w/ Fuse — 60A variant | Current U.S. page identifies exact selected storefront SKU, renders unavailable, explicitly states the 60A variant is backordered, and retains Add to Cart / Buy Now. | `BACKORDER_AUTHORIZED_PUBLIC` for exact selected 60A storefront SKU; do not generalize to every amperage variant. | Current product specifications state **1-year material/workmanship warranty** for the ANL fuse set family. | Availability `EXACT` for selected SKU; warranty `EXACT_TERM / VARIANT_FAMILY_SOURCE`. | https://www.renogy.com/products/20a-30a-40a-60a-80a-100a-200a-300a-400a-anl-fuse-set-w-fuse |
| `RPD150CTF-SET-US` | Class T Fuse with Set — 150A variant | Current U.S. page identifies exact selected storefront SKU, renders unavailable, explicitly states the 150A variant is backordered, and retains Add to Cart / Buy Now. | `BACKORDER_AUTHORIZED_PUBLIC` for exact selected 150A SKU; adjacent 250A/350A variants require their own current state verification. | Current product page states **1-year material/workmanship warranty** for the Class T fuse set. | Availability `EXACT`; warranty `EXACT_TERM / SELECTED_VARIANT`. | https://www.renogy.com/products/150a-250a-350a-class-t-fuse-with-set |

## New recon findings

### 1. DC protection products are strong sales-first candidates

All four mapped products are system-support components rather than primary generation/storage products. Their exact current pages provide clean U.S. SKU identity and customer-facing warranty terms, improving readiness for the universal catalog and system-builder/BOS cross-sell lane.

### 2. Variant-level backorder remains mandatory

The ANL and Class T pages contain multiple amperage variants. Batch 06 proves paid backorder only for the exact selected storefront SKU/variant captured here. Do not promote a family-level `backorder_allowed=true` flag across every amperage simply because one variant is backordered.

### 3. Public retail delivery text is not a supplier ETA promise

Some Renogy pages display ordinary delivery-method language while the selected product is simultaneously backordered. Elevation must not convert generic retail delivery text into a promised backorder ship date. Use a supplier-provided ETA only when the exact current source provides one.

## Sales-first use

These mappings support customer-ready product staging and BOS cross-sell preparation. Before public activation/order, verify the exact SKU's current MAP/customer price, dealer sellability/orderability, approved media/source identity, Lower-48 fulfillment treatment and direct-site channel state under the Renogy Master SOP.

A protected-data gap for one product blocks only that activation step. Continue other exact-SKU work independently.

## Next executable work

Continue into additional DC distribution, breaker/protection, cable, connector, mounting and monitoring products with exact U.S. SKU/warranty evidence. Return clean launch candidates to the catalog/Shopify activation lane as their MAP/media/dealer-orderability set clears.