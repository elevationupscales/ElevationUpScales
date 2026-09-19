# SunGoldPower Catalog Ingestion — 2026-09-16

**Status:** ACTIVE / BOUNDED INITIAL INGESTION

## Objective

Add SunGoldPower as a first-class vendor in the Web V2 universal catalog using the supplier-provided Silver Dealer Price List dated 2026-09-15 as the initial commercial source.

## Initial pricing rule

For the initial SunGoldPower cohort:

**customer sell price = supplier-provided MAP**

Dealer cost remains private and is recorded only in protected/internal commercial data, not public catalog source.

## Initial customer-facing cohort

- LFP12-100A — MAP $295
- SG48100P — MAP $1,090
- SPH8048P — MAP $1,450
- SPH10048P — MAP $1,580
- SGS-12K18MAX — MAP $2,990
- SG560WBGx2 — MAP $980
- SGH-11N2E — MAP $11,950
- SGR-10K25S — MAP $10,350

## Publication state

The current supplier email verifies distributor approval and website listing permission, but direct-to-customer fulfillment procedure is still being confirmed. Therefore the bounded initial Web V2 implementation may publish SunGoldPower vendor/product records and prices, but **must not claim direct dropship fulfillment, free shipping, Hawaii shipping, or live checkout readiness unless those exact transaction facts are separately verified.**

Products may be customer-visible while held from checkout if fulfillment/shipping remains unresolved.

## Next gate

Once SunGoldPower confirms direct ordering/dropship/shipping procedure, update the exact affected products from catalog-visible/held to direct-buy-ready without rebuilding the vendor catalog.
