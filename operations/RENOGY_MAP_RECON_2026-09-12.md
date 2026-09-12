# ELEVATION UPSCALES — RENOGY MAP / PUBLIC-PRICE RECON

**Date:** 2026-09-12  
**Owner:** Casey Young  
**State:** COMPLETE — PRICE CONTROL RECONCILED  
**Lane:** Renogy Vendor Operations / Direct-Site Commerce

## PURPOSE

Close the Renogy advertised-price review using the supplier's current written pricing rule, Renogy's current U.S. retail website, and live Shopify product state without weakening separate SKU identity, inventory, orderability, backorder, fulfillment, or contribution gates.

## CONTROLLING RENOGY PRICE RULE

Renogy Sales Support advised Elevation UpScales that Renogy products cannot be advertised at a price higher than the pricing currently listed on the Renogy retail website and that the Renogy retail website is the reference for current public-facing pricing.

Operational interpretation for Elevation:

**CURRENT RENOGY RETAIL PRICE = PUBLIC ADVERTISED-PRICE CEILING.**

Dealer cost and other protected commercial economics remain private and must not be exposed in public Git or storefront copy.

## LIVE RECON RESULT

| SKU | Shopify Price | Renogy Current Public Retail | Result | Shopify State |
|---|---:|---:|---|---|
| `RSP100DCT-US` | $99.99 | $99.99 | PASS | DRAFT |
| `RBM500-US` | $87.99 | $87.99 | PASS | ACTIVE |
| `RBC2125DS-21W-US` | $299.99 | $299.99 | PASS | DRAFT |
| `RNG-INVT-2000-12V-P2-US` | $285.99 | $285.99 | PASS | DRAFT |
| `RNG-CTRL-RVR40` | $152.44 | $152.44 | PASS | DRAFT |
| `RNG-CTRL-ADV30-LI-US` | $82.99 | $82.99 | PASS | ACTIVE |

**No price change was required.**

## SHOPIFY CONTROL CLEANUP EXECUTED

Live Shopify verification after mutation confirms:

- removed `MAP Review Required` from all affected Renogy products;
- removed `Price Refresh Required` from `RBC2125DS-21W-US` and `RNG-CTRL-RVR40`;
- added `Renogy Price Verified 2026-09-12` to all six current Renogy products;
- no DRAFT product was activated merely because the price review passed;
- no product price was changed during this recon.

## REMAINING NON-PRICE GATES

Price clearance does **not** clear the following separate operational gates:

- `RBC2125DS-21W-US` — current dealer orderability / authorized delayed-order path still requires exact verification before activation where applicable.
- `RNG-INVT-2000-12V-P2-US` — exact generation / dealer order-source identity remains an activation gate.
- `RNG-CTRL-RVR40` — exact current variant identity remains an activation gate.
- `RSP100DCT-US` — inventory/orderability/backorder and contribution controls remain SKU-specific before activation or promotion.
- `RBM500-US` — active direct-site status does not waive inventory/orderability, customer-protection, or realized-contribution monitoring.
- `RNG-CTRL-ADV30-LI-US` — active profitability-hero status remains subject to current inventory/orderability and positive-contribution controls.

A missing fact on one SKU must hold only that SKU and must not stop cleaner Renogy SKUs.

## CHANNEL CONTROL

Renogy's written dealer guidance prohibits selling Renogy products through third-party ecommerce websites or marketplaces. Renogy items remain **DIRECT SITE ONLY** unless Renogy later supplies written authorization changing that rule.

## PROFITABILITY CONTROL

MAP/public-price compliance is necessary but not sufficient for promotion.

Before traffic or activation, each SKU still follows:

**EXACT SKU → AUTHORIZED SOURCE → CURRENT ORDERABILITY / INVENTORY OR AUTHORIZED DELAYED-ORDER PATH → CURRENT PUBLIC PRICE → DESTINATION ELIGIBILITY → LANDED VARIABLE COST → EXPECTED CONTRIBUTION → WORKING CHECKOUT → FULFILLMENT RELIABILITY → PROMOTE.**

## CONTROL PHRASE

**PRICE RECON COMPLETE → KEEP CURRENT VERIFIED PUBLIC PRICE → DO NOT ACTIVATE HELD SKUS UNTIL SOURCE / ORDERABILITY / CONTRIBUTION GATES PASS.**
