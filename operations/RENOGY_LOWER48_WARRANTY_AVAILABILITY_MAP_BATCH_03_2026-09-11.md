# Renogy Lower-48 Warranty & Availability Map — Batch 03

**Date:** 2026-09-11  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Role:** Renogy Project Specialist  
**Reports To:** Renogy Branch Operations Manager  
**Controlling SOP:** `RENOGY_VENDOR_MASTER_SOP.md`  
**Parent:** `RENOGY_LOWER48_BACKORDER_WARRANTY_PROGRAM_2026-09-10.md`  
**Status:** PUBLIC-SAFE / BATCH 03

## Recon result

Batches 01–02 remain accepted and were not reopened. This batch follows the owner blockage-deferral rule: unresolved MAP/media/portal enrichment remains attached to the affected SKU/action, while independent exact-SKU availability and warranty mapping continues.

This batch expands into larger inverter/inverter-charger families, REGO, Renogy ONE Core and N-Type rigid panels. Partner Portal/current dealer source remains controlling for actual dealer-order acceptance and private dealer pricing.

## Batch 03 map

| SKU | Product / family | Public availability finding | Backorder status | Warranty finding | Classification / action | Public source |
|---|---|---|---|---|---|---|
| `RNG-INVT-2000-12V-P2-US` | 2000W 12V Pure Sine Wave Inverter | Current U.S. product page identifies the exact storefront SKU, renders unavailable, and states the inverter-only variant is backordered while purchase controls remain exposed. | `BACKORDER_AUTHORIZED_PUBLIC` for this exact storefront SKU; Partner Portal acceptance still required before supplier fulfillment. | The same current product page states **1-year material/workmanship warranty**. | Availability `EXACT`; warranty `EXACT`. | https://www.renogy.com/products/2000w-12v-pure-sine-wave-inverter |
| `RNG-INVT-3000-12V-P2-US` | 3000W 12V Pure Sine Wave Inverter | Current U.S. product page identifies exact storefront SKU and states the inverter-only variant is backordered with Add to Cart / Buy Now exposed. | `BACKORDER_AUTHORIZED_PUBLIC` for exact shown storefront SKU; dealer acceptance still requires Portal/current source check. | Current master warranty maps base `RNG-INVT-3000-12V-P2` to **1-year material/workmanship**. | Backorder `EXACT`; warranty `HOLD_EXACT_SUFFIX` until current dealer/source identity confirms `-US` equivalence or the exact page exposes the term. | https://www.renogy.com/products/3000w-12v-pure-sine-wave-inverter ; current Renogy Limited Warranty for All |
| `RIV1230P2-126-US` | 3000W 12V Pro Pure Sine Wave Inverter with EcoSleep Mode | Current product page identifies exact storefront SKU and explicitly states inverter-only is backordered while purchase controls remain available. | `BACKORDER_AUTHORIZED_PUBLIC` for exact storefront SKU. | Current master warranty maps base `RIV1230P2-126` to **3-year material/workmanship**. | Backorder `EXACT`; warranty `HOLD_EXACT_SUFFIX` pending exact dealer/source bridge for `-US`. | https://www.renogy.com/collections/battery-inverters/products/3000w-12v-pro-pure-sine-wave-inverter-with-ecosleep-mode ; current Renogy Limited Warranty for All |
| `RIV1230RCL-1SS-US` | REGO 12V 3000W Pure Sine Wave Inverter Charger w/ LCD Display | Current exact U.S. product page states inverter-only is backordered with purchase controls available. The same page's specification section identifies base model `RIV1230RCL-1SS`. | `BACKORDER_AUTHORIZED_PUBLIC` for exact storefront SKU. | Current master warranty maps base `RIV1230RCL-1SS` to **2-year material/workmanship**; the live U.S. page itself bridges storefront `-US` SKU to base model in specifications. | Backorder `EXACT`; warranty `MODEL_BRIDGE_VERIFIED` pending ordinary dealer-source recheck before publication. | https://www.renogy.com/products/rego-12v-3000w-pure-sine-wave-inverter-charger-w-lcd-display ; current Renogy Limited Warranty for All |
| `RIV1230RCH-SPS-US` | REGO 3000W 12V Pure Sine Wave HF Inverter Charger — split-phase | Current U.S. product page identifies exact storefront SKU and currently renders unavailable. | No exact public backorder statement captured in this batch; do not infer paid backorder from adjacent REGO products. | Current exact product page states **5-year material/workmanship warranty** and **1-year accessories warranty**. | Availability `OUT_OF_STOCK_NOT_ORDERABLE_PUBLIC` unless Portal/current source says otherwise; warranty `EXACT`. | https://www.renogy.com/products/rego-3000w-12v-pure-sine-wave-hf-inverter-charger-split-phase-design |
| `RSHGWSN-W02W-US` | Renogy ONE Core (G3 Version) | Current U.S. power-management/product pages identify exact storefront SKU and state it is backordered with Add to Cart exposed. | `BACKORDER_AUTHORIZED_PUBLIC` for exact storefront SKU. | Current warranty source maps base `RSHGWSN-W02W` to **2-year material/workmanship**. | Backorder `EXACT`; warranty `HOLD_EXACT_SUFFIX` until current dealer/source bridge confirms exact U.S. suffix. | https://www.renogy.com/pages/power-management ; https://www.renogy.com/products/renogy-one-m1 ; current Renogy Limited Warranty |
| `RSP100DC-US` | 100W N-Type rigid solar panel variant | Current N-Type product page identifies exact storefront SKU and renders unavailable. | No exact paid-backorder statement captured on this exact variant during Batch 03. | Current Renogy warranty sources map base `RSP100DC` to **10-year material/workmanship warranty**; current Renogy kit specifications also state 10 years for `RSP100DC`. | Availability recheck required; warranty `HOLD_EXACT_SUFFIX` before customer-facing duration for `-US`. | https://www.renogy.com/products/renogy-n-type-solar-panel ; https://www.renogy.com/products/200-watt-12-volt-solar-rv-kit ; current Renogy Limited Warranty for All |
| `RSP200DC-US` | 200W N-Type rigid solar panel variant | Current N-Type product page identifies exact storefront SKU and renders unavailable. | No exact paid-backorder statement captured on this exact variant during Batch 03. | Current master warranty maps base `RSP200DC` to **10-year material/workmanship warranty** plus its separate performance-warranty schedule. | Availability recheck required; warranty `HOLD_EXACT_SUFFIX` before customer-facing duration for `-US`. | https://www.renogy.com/products/renogy-n-type-solar-panel ; current Renogy Limited Warranty for All |

## New recon findings

### 1. Public paid-backorder behavior is broader but remains exact-SKU controlled

Batch 03 adds exact current public backorder evidence for:

- `RNG-INVT-2000-12V-P2-US`
- `RNG-INVT-3000-12V-P2-US`
- `RIV1230P2-126-US`
- `RIV1230RCL-1SS-US`
- `RSHGWSN-W02W-US`

These are additional examples of Renogy intentionally preserving a paid purchase path while the exact shown variant is unavailable/backordered. They **do not** create blanket paid-backorder authority for adjacent models or all Renogy zero-stock items.

### 2. REGO availability must remain product-specific

`RIV1230RCL-1SS-US` is publicly backorderable, while the current `RIV1230RCH-SPS-US` page is unavailable without an exact backorder statement captured in this batch. Therefore REGO itself is not a blanket backorder class.

### 3. Product-page model bridging can resolve some suffix ambiguity without guessing

The exact `RIV1230RCL-1SS-US` U.S. storefront page identifies base model `RIV1230RCL-1SS` in the technical specifications. That live same-product bridge supports use of the current warranty table's base-model term, subject to ordinary current dealer-source recheck before publication.

Where the live product page does **not** establish that bridge, `HOLD_EXACT_SUFFIX` remains the safe state.

### 4. Owner blockage-deferral rule applied

Pending MAP/media/Portal enrichment did not stop this independent evidence batch. Those missing inputs remain attached to the affected launch/publish action and return at the end of the executable project queue.

## Lower-48 order use

Before any real order from this batch:

1. reverify exact storefront/dealer SKU;
2. verify current MAP/price-control source;
3. verify Partner Portal/current supplier sellability;
4. preserve paid backorder only where the exact SKU still supports it;
5. copy supplier ETA exactly or leave ETA unpromised;
6. attach exact warranty source/classification;
7. leave suffix/warranty conflicts held only on the affected statement;
8. route warranty/RMA through current Renogy support/dealer process.

## Next executable batch

Continue without waiting on blocked enrichment into:

- additional Renogy ONE / communications devices;
- REGO/DC distribution and power-management products;
- BOS, cable, connector and protection products where exact warranty/source mapping materially improves launch support;
- additional N-Type/flexible panels only where exact SKU suffix and availability can be verified.

MAP/media/Portal gaps remain in the deferred-blockage queue and must be rechecked before publication/order, not used to halt independent mapping work.
