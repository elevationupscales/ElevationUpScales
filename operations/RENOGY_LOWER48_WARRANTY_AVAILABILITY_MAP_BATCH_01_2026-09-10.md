# Renogy Lower-48 Warranty & Availability Map — Batch 01

**Date:** 2026-09-10  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Role:** Renogy Project Specialist  
**Reports To:** Renogy Branch Operations Manager  
**Controlling SOP:** `RENOGY_VENDOR_MASTER_SOP.md`  
**Parent program:** `RENOGY_LOWER48_BACKORDER_WARRANTY_PROGRAM_2026-09-10.md`  
**Status:** PUBLIC-SAFE / BATCH 01

## Purpose

Begin the exact-SKU Lower-48 mapping required by the controlling Renogy SOP without waiting for optional enrichment. This batch uses only current public Renogy sources. Partner Portal evidence remains controlling for dealer-order acceptance, private inventory, dealer cost and any broader preorder/backorder authority.

## Classification rules

- `EXACT` = exact SKU/model and warranty/availability fact is directly supported by a current Renogy source.
- `PUBLIC_PAGE_UNAVAILABLE` = current public page/catalog renders the product unavailable; this does **not** by itself mean dealer stock is zero.
- `BACKORDER_AUTHORIZED_PUBLIC` = the exact public Renogy variant explicitly states it is backordered and accepts Add to Cart / Buy Now.
- `NO_PUBLIC_BACKORDER_EVIDENCE` = no exact current public Renogy source was found authorizing backorder for that SKU in this batch.
- Dealer Partner Portal availability must still be rechecked before supplier placement.

## Batch 01 map

| SKU | Product / family | Public availability finding | Backorder status | Warranty finding | Confidence | Source |
|---|---|---|---|---|---|---|
| `RSP100DCT-US` | 100W N-Type Bifacial Solar Panel variant | Exact product page currently renders the 100W / 1-piece variant as backordered and states it will ship when back in stock; Add to Cart / Buy Now are presented. | `BACKORDER_AUTHORIZED_PUBLIC` for the exact shown variant; dealer portal still must confirm supplier-order acceptance before fulfillment | Product page states 10-year warranty and 25-year output guarantee. | `EXACT` public page | https://www.renogy.com/products/100-200w-n-type-bifacial-solar-panel |
| `RSP100DC-US` | 100W variant in 100/175/200W N-Type Solar Panel family | Current public product page renders unavailable. | `NO_PUBLIC_BACKORDER_EVIDENCE` in this batch | Current Renogy warranty sources must be mapped to the exact SKU before customer-facing warranty publication; older/current Renogy warranty tables include `RSP100DC` family references but suffix identity must not be inferred without exact-source confirmation. | Availability `EXACT`; warranty `HOLD_EXACT_SUFFIX` | https://www.renogy.com/products/renogy-n-type-solar-panel |
| `RSP100DL-36-US` | 100W Lightweight Flexible Solar Panel — Black Division | Current public product page renders unavailable. | `NO_PUBLIC_BACKORDER_EVIDENCE` in this batch | Renogy warranty tables list `RSP100DL-36` with a 5-year 90% output warranty; customer-facing mapping to the `-US` storefront SKU requires exact suffix reconciliation before publication. | Availability `EXACT`; warranty `HOLD_EXACT_SUFFIX` | https://www.renogy.com/products/100-watt-12-volt-black-division-lightweight-monocrystalline-solar-panel |
| `RNG-CTRL-RVR20` | Rover Li 20A MPPT Solar Charge Controller | Exact SKU is published by Renogy's charge-controller source. Current supplier availability must be checked separately at order time. | No blanket backorder authority; use current SKU availability / portal evidence. | Current Renogy limited-warranty table maps `RNG-CTRL-RVR20` to a 3-year material and workmanship warranty. | `EXACT` warranty | https://www.renogy.com/pages/charge-controllers ; current Renogy Limited Warranty for All |
| `RNG-CTRL-RVR30` | Rover Li 30A MPPT Solar Charge Controller | Exact SKU is published by Renogy's charge-controller source. | No blanket backorder authority; use current SKU availability / portal evidence. | Current Renogy limited-warranty table maps `RNG-CTRL-RVR30` to a 3-year material and workmanship warranty. | `EXACT` warranty | https://www.renogy.com/pages/charge-controllers ; current Renogy Limited Warranty for All |
| `RNG-CTRL-RVR40` | Rover Li 40A MPPT Solar Charge Controller | Exact SKU is published by Renogy's charge-controller source. | No blanket backorder authority; use current SKU availability / portal evidence. | Current Renogy product/warranty sources state a 3-year material and workmanship warranty. | `EXACT` warranty | https://www.renogy.com/products/rover-li-40-amp-mppt-solar-charge-controller ; current Renogy Limited Warranty for All |
| `RNG-CTRL-RVR60` | Rover 60A MPPT Solar Charge Controller | Exact SKU is published by Renogy's charge-controller source. | No blanket backorder authority; use current SKU availability / portal evidence. | Current Renogy limited-warranty table maps `RNG-CTRL-RVR60` to a 3-year material and workmanship warranty. | `EXACT` warranty | https://www.renogy.com/pages/charge-controllers ; current Renogy Limited Warranty for All |
| `RNG-CTRL-RVR100` | Rover 100A MPPT Solar Charge Controller | Exact SKU is published by Renogy's charge-controller source. | No blanket backorder authority; use current SKU availability / portal evidence. | Current Renogy limited-warranty table maps `RNG-CTRL-RVR100` to a 3-year material and workmanship warranty. | `EXACT` warranty | https://www.renogy.com/pages/charge-controllers ; current Renogy Limited Warranty for All |
| `RCC20RVRE` | Rover Elite 20A MPPT Solar Charge Controller | Exact SKU is published by Renogy's charge-controller source. | No blanket backorder authority; use current SKU availability / portal evidence. | Current Renogy warranty tables list this SKU in a different warranty class than the Rover Li family; preserve exact current term from the controlling warranty document before publication. | SKU `EXACT`; warranty term `VERIFY_CURRENT_DOC` | https://www.renogy.com/pages/charge-controllers ; current Renogy Limited Warranty for All |
| `RCC40RVRE` | Rover Elite 40A MPPT Solar Charge Controller | Exact SKU is published by Renogy's charge-controller source. | No blanket backorder authority; use current SKU availability / portal evidence. | Current Renogy warranty tables list this SKU in a different warranty class than the Rover Li family; preserve exact current term from the controlling warranty document before publication. | SKU `EXACT`; warranty term `VERIFY_CURRENT_DOC` | https://www.renogy.com/pages/charge-controllers ; current Renogy Limited Warranty for All |

## Backorder proof established in Batch 01

The exact public Renogy variant `RSP100DCT-US` provides direct evidence that Renogy intentionally supports a backordered purchase state on selected products. The page simultaneously identifies the SKU, identifies the selected 100W / 1-piece variant as backordered, states shipment will occur after restock, and exposes purchase controls.

This is **proof of SKU/variant-specific backorder support only**. It does not authorize Elevation to convert every unavailable Renogy item to a paid backorder.

## Warranty proof established in Batch 01

Renogy's current warranty materials separate warranty classes at exact SKU level. The Rover Li family `RNG-CTRL-RVR20`, `RNG-CTRL-RVR30`, `RNG-CTRL-RVR40`, `RNG-CTRL-RVR60`, and `RNG-CTRL-RVR100` currently map to a 3-year material and workmanship warranty in the current limited-warranty source. Product pages may also expose SKU-specific warranty wording and should be retained as a second source when available.

Do not apply that 3-year term to adjacent Rover Elite, PWM, REGO, Bluetooth-suffixed, or other controller SKUs unless the exact current warranty source maps them to the same class.

## Operational use

For a real Lower-48 order involving any SKU in this batch:

1. reverify exact storefront SKU/variant;
2. reverify current MAP/price control;
3. reverify Partner Portal availability;
4. if unavailable, allow paid preorder/backorder only when the exact current supplier/portal state supports it;
5. preserve the supplier ETA verbatim or leave ETA blank;
6. attach the exact warranty class/source to the customer record/product data;
7. route warranty claims through Renogy's current technical/warranty process and preserve RMA authorization requirements.

## Batch 01 unresolved items

- Exact dealer-portal availability for the controller SKUs remains protected/current supplier data and must be checked inside the Partner Portal.
- `-US` storefront suffixes must not be silently collapsed into unsuffixed warranty-table SKUs unless exact product/warranty identity is confirmed.
- Rover Elite exact current warranty term should be lifted from the current controlling warranty document before customer-facing publication.
- This batch does not establish availability, warranty or backorder status for unlisted Renogy SKUs.

## Next batch

Prioritize the next complementary-system SKUs:

- DC-DC chargers;
- inverter / inverter-chargers;
- monitoring / battery monitors;
- additional N-Type rigid / flexible solar panels;
- wiring / BOS products where warranty terms exist.

Return each batch to the Renogy Branch Operations Manager for acceptance into the live Renogy catalog/source worktree.
