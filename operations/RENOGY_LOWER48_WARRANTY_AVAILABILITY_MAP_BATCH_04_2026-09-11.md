# Renogy Lower-48 Warranty & Availability Map — Batch 04

**Date:** 2026-09-11  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Role:** Renogy Project Specialist  
**Reports To:** Renogy Branch Operations Manager  
**Controlling SOP:** `RENOGY_VENDOR_MASTER_SOP.md`  
**Parent:** `RENOGY_LOWER48_BACKORDER_WARRANTY_PROGRAM_2026-09-10.md`  
**Status:** PUBLIC-SAFE / BATCH 04

## Recon result

Batches 01–03 remain accepted. This batch continues into monitoring and balance-of-system products while deferred MAP/media/Portal enrichment remains attached only to the affected publish/order action.

## Batch 04 map

| SKU | Product / family | Public availability finding | Backorder status | Warranty finding | Classification / action | Public source |
|---|---|---|---|---|---|---|
| `RCM-BT2-US` | BT-2 Bluetooth Module | Current U.S. product page identifies exact storefront SKU `RCM-BT2-US`, renders unavailable, explicitly states the selected BT-2 variant is backordered, and retains Add to Cart / Buy Now. Product specifications identify base model `RCM-BT2`. | `BACKORDER_AUTHORIZED_PUBLIC` for exact storefront SKU; Partner Portal/current dealer source still controls fulfillment acceptance. | Current product page states **1-year material/workmanship warranty**; current master warranty also maps `RCM-BT2` to **1 year**. | Availability `EXACT`; warranty `MODEL_BRIDGE_VERIFIED / EXACT TERM`. | https://www.renogy.com/products/bt-2-bluetooth-module ; current Renogy Limited Warranty |
| `RNG-AK-10FT-12-US` | Solar Panel to Charge Controller Adaptor Kit — 10FT / 12AWG | Current U.S. page identifies exact storefront SKU and marks the selected variant unavailable/backordered while purchase controls remain exposed. | `BACKORDER_AUTHORIZED_PUBLIC` for exact storefront SKU. | Current master warranty lists base `RNG-AK-10FT-12` under **1-year material/workmanship warranty**. | Backorder `EXACT`; warranty `HOLD_EXACT_SUFFIX` until current dealer/source bridges `-US` to base SKU. | https://www.renogy.com/products/solar-panel-to-charge-controller-adaptor-kit ; current Renogy Limited Warranty |
| `RNG-MTS-ZB-US` | Solar Panel Mounting Z Bracket — Set of 4 | Current U.S. product page identifies exact storefront SKU `RNG-MTS-ZB-US` and renders it unavailable. | No exact public paid-backorder statement captured for this SKU in Batch 04. | Current master warranty maps base `RNG-MTS-ZB` to **1-year material/workmanship warranty**. | Availability `OUT_OF_STOCK_NOT_ORDERABLE_PUBLIC` unless Portal/current source says otherwise; warranty `HOLD_EXACT_SUFFIX`. | https://www.renogy.com/products/solar-panel-mounting-z-bracket-set-of-4 ; current Renogy Limited Warranty |
| `RNG-CNCT-FUSE20` | 20A Solar Connector Waterproof Fuse | Current Renogy accessory-pack and wire/fuse guidance identify the exact base SKU as an active Renogy BOS component. Batch 04 did not establish a standalone current storefront orderability state. | `UNKNOWN_HOLD` for delayed-order status; do not infer backorder from adjacent BOS products. | Current master warranty maps exact `RNG-CNCT-FUSE20` to **1-year material/workmanship warranty**. | Warranty `EXACT`; availability/orderability recheck required before publish/order. | https://www.renogy.com/products/complete-accessory-pack-for-rv-solution-1-2kwh ; https://www.renogy.com/blogs/learn-center/wire-and-fuse-sizing-guide ; current Renogy Limited Warranty |
| `RNG-SET-ANL30` | 30A ANL Fuse Set w/ Fuse | Current Renogy wire/fuse guidance and ANL fuse documentation identify exact SKU `RNG-SET-ANL30`. Batch 04 did not rely on non-U.S. storefront availability for U.S. orderability. | `UNKNOWN_HOLD` for U.S. delayed-order status pending current U.S. storefront/Portal source. | Current master warranty maps exact `RNG-SET-ANL30` to **1-year material/workmanship warranty**. | Warranty `EXACT`; U.S. availability/orderability recheck required. | https://www.renogy.com/blogs/learn-center/wire-and-fuse-sizing-guide ; current Renogy ANL Fuse manual; current Renogy Limited Warranty |

## New recon findings

### 1. BT-2 provides a clean model-bridge example

The current U.S. storefront identifies `RCM-BT2-US`, while the same live page's technical specification identifies the product as `RCM-BT2`. The live page also states a 1-year material/workmanship warranty, matching the current master warranty. This is sufficient to keep the public warranty term exact for the U.S. storefront SKU while still requiring ordinary dealer-source availability verification before fulfillment.

### 2. BOS availability must not be inferred from warranty/source presence

`RNG-CNCT-FUSE20` and `RNG-SET-ANL30` are exact current Renogy BOS SKUs with verified warranty classes, but source presence alone does not prove current U.S. orderability. Their warranty mapping can be completed while availability remains `UNKNOWN_HOLD` until the storefront/Portal source is checked.

### 3. Owner outbound deduplication control does not slow internal source work

No supplier form/email/application was sent in this batch. Internal verified mapping continues independently while any uncertain outbound/application state is deferred under `OWNER_OUTBOUND_DEDUPLICATION_CONTROL_2026-09-11.md`.

## Lower-48 order use

Before any real order from this batch:

1. verify the exact current dealer/storefront SKU;
2. verify current MAP/price-control source;
3. verify Partner Portal/current supplier sellability;
4. preserve paid backorder only where the exact SKU still shows/supports it;
5. do not infer availability from warranty-table presence;
6. attach the exact warranty classification;
7. leave suffix/orderability holds only on the affected SKU/action;
8. route warranty/RMA through current Renogy support/dealer process.

## Next executable batch

Continue into additional Renogy monitoring, communication, power-management, cable, connector, protection and mounting products where exact SKU/warranty/source mapping materially improves direct-site launch readiness. Keep outbound supplier/application actions under the global deduplication control.
