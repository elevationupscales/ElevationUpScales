# Renogy Lower-48 Warranty & Availability Map — Batch 02

**Date:** 2026-09-10  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Role:** Renogy Project Specialist  
**Reports To:** Renogy Branch Operations Manager  
**Controlling SOP:** `RENOGY_VENDOR_MASTER_SOP.md`  
**Parent:** `RENOGY_LOWER48_BACKORDER_WARRANTY_PROGRAM_2026-09-10.md`  
**Status:** PUBLIC-SAFE / BATCH 02

## Recon result

Batch 01 was reconciled against current `main`, found mergeable with no competing Renogy PR, and accepted before this batch began.

This batch expands exact-source mapping into battery chargers, inverters/inverter-chargers and monitoring products. Partner Portal evidence remains controlling for actual dealer availability/order acceptance.

## Batch 02 map

| SKU | Product / family | Public availability finding | Backorder status | Warranty finding | Classification / action | Public source |
|---|---|---|---|---|---|---|
| `RBC40D1U-US` | 12V 20A/40A DC-to-DC Battery Charger storefront 40A variant | Current product page renders unavailable. | No public backorder statement found on exact page during this batch. | Current Renogy master warranty lists unsuffixed `RBC40D1U` at **2-year material/workmanship**. | `HOLD_EXACT_SUFFIX` for customer warranty publication; portal recheck before order. | https://www.renogy.com/products/12v-40a-dc-to-dc-battery-charger ; current Renogy Limited Warranty for All |
| `RBC40D1S-US` | 40A DC-DC Battery Charger with MPPT | Current product page renders unavailable. | No public backorder statement found on exact page during this batch. | Current master warranty lists unsuffixed `RBC40D1S` at **2-year material/workmanship**. | `HOLD_EXACT_SUFFIX`; do not silently collapse `-US`. | https://www.renogy.com/products/renogy-40a-dc-dc-battery-charger-with-mppt ; current Renogy Limited Warranty for All |
| `RBC30D1S` | 30A dual-input DC-DC charger family | Renogy charger FAQ identifies exact base SKU; order-time availability remains separate. | No blanket backorder authority. | Current master warranty maps `RBC30D1S` to **3-year material/workmanship**. | `EXACT` warranty; availability recheck required. | https://www.renogy.com/pages/battery-chargers ; current Renogy Limited Warranty for All |
| `RNG-DCC1212-20` | 12V 20A DC-to-DC On-Board Battery Charger | Renogy charger FAQ identifies exact SKU. | No blanket backorder authority. | Current master warranty maps exact SKU to **1-year material/workmanship**. | `EXACT` warranty; availability recheck required. | https://www.renogy.com/pages/battery-chargers ; current Renogy Limited Warranty for All |
| `RNG-DCC1212-40` | 12V 40A DC-to-DC On-Board Battery Charger | Renogy charger FAQ identifies exact SKU. | No blanket backorder authority. | Current master warranty maps exact SKU to **1-year material/workmanship**. | `EXACT` warranty; availability recheck required. | https://www.renogy.com/pages/battery-chargers ; current Renogy Limited Warranty for All |
| `RNG-DCC1212-60` | 12V 60A DC-to-DC On-Board Battery Charger | Renogy charger FAQ identifies exact SKU. | No blanket backorder authority. | Current master warranty maps exact SKU to **1-year material/workmanship**. | `EXACT` warranty; availability recheck required. | https://www.renogy.com/pages/battery-chargers ; current Renogy Limited Warranty for All |
| `RNG-INVT-1000-12V-P2-US` | 1000W 12V Pure Sine Wave Inverter | Current product page renders unavailable. | No exact public backorder statement found during this batch. | Current master warranty maps unsuffixed `RNG-INVT-1000-12V-P2` to **1-year material/workmanship**. | `HOLD_EXACT_SUFFIX` for public warranty statement; do not infer suffix identity. | https://www.renogy.com/products/1000w-12v-pure-sine-wave-inverter ; current Renogy Limited Warranty for All |
| `RIV4835CSH1S` | 3500W 48V Solar Inverter Charger | Renogy inverter FAQ identifies this exact SKU for the 48V 3500W solar inverter charger. | No blanket backorder authority. | **SOURCE CONFLICT:** current product page states **2-year material/workmanship**, while current master warranty table lists `RIV4835CSH1S` under **1-year material/workmanship**. | `WARRANTY_CONFLICT_HOLD` — do not publish either term until Renogy resolves/current authoritative source is established. | https://www.renogy.com/products/48v-3500w-pure-sine-wave-solar-inverter-charger ; https://www.renogy.com/pages/inverters ; current Renogy Limited Warranty for All |
| `RBM500-US` | 500A Battery Monitor With Shunt | Current exact storefront SKU is unavailable and explicitly states it is **backordered**; Add to Cart / Buy Now remain exposed. | `BACKORDER_AUTHORIZED_PUBLIC` for exact shown storefront SKU; Partner Portal acceptance still required before supplier fulfillment. | Current master warranty maps unsuffixed `RBM500` to **2-year material/workmanship**. | Backorder `EXACT`; warranty `HOLD_EXACT_SUFFIX`. | https://www.renogy.com/products/500a-battery-monitor-with-shunt ; current Renogy Limited Warranty for All |
| `RMS-LFPS` | Monitoring Screen for Smart Lithium Battery Series | Exact base SKU is published by Renogy IoT monitoring FAQ. | No blanket backorder authority. | Product page and current master warranty both state **1-year material/workmanship** for this monitoring product/class. | `EXACT` warranty. | https://www.renogy.com/products/monitoring-screen-for-smart-lithium-battery-series ; https://www.renogy.com/pages/iot-monitoring-faqs ; current Renogy Limited Warranty for All |
| `RMS-DCDC` | Monitoring Screen for DC-DC MPPT Battery Charger Series | Exact SKU appears in current master warranty. | No blanket backorder authority. | Product page states **1-year material/workmanship**; current master warranty also maps `RMS-DCDC` to **1 year**. | `EXACT` warranty. | https://www.renogy.com/products/monitoring-screen-for-dc-dc-mppt-battery-charger-series ; current Renogy Limited Warranty for All |

## New recon findings

### 1. Second independent public backorder proof

`RBM500-US` currently provides a second exact storefront example of Renogy intentionally accepting a paid backordered purchase state. The page identifies the SKU, marks the item unavailable, explicitly says it is backordered and will ship when restocked, and retains purchase controls.

This strengthens the controlling rule: **backorder is a deliberate SKU/variant state, not a generic response to zero stock.**

### 2. Warranty-source conflict gate is now proven necessary

`RIV4835CSH1S` demonstrates that Renogy public sources can conflict. The live product page states 2 years while the current master warranty table places the exact SKU in a 1-year class.

Operational rule for conflicts:

1. mark `WARRANTY_CONFLICT_HOLD`;
2. do not advertise the longer term merely because it is customer-favorable;
3. retain both source pointers;
4. resolve through the current Partner Portal/dealer warranty source or Renogy Warranty/Technical Support;
5. publish only after one current authoritative term is established.

A warranty conflict blocks the warranty claim/promise for that SKU, not unrelated Renogy catalog work.

## Lower-48 order use

Before any real order from this batch:

1. exact storefront SKU/variant check;
2. current MAP/price-control check;
3. Partner Portal sellability/availability check;
4. paid backorder only if the exact current supplier state supports it;
5. supplier ETA copied exactly or left blank;
6. exact warranty class attached to the product/order record;
7. any conflict remains held until reconciled;
8. warranty/RMA claims route through Renogy's current support process.

## Next batch

Continue with:

- 2000W/3000W inverter and inverter-charger SKUs;
- REGO inverter/charger family;
- additional monitoring/communications devices;
- N-Type rigid and flexible panels with exact suffix reconciliation;
- BOS/accessory products where warranty mapping materially improves customer support.
