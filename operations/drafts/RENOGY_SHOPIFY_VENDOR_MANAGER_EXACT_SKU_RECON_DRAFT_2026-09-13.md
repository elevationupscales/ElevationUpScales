# DRAFT — RENOGY SHOPIFY VENDOR MANAGER EXACT-SKU RECON

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Lane:** Renogy Vendor Management → Shopify Store Operations handoff  
**Status:** DRAFT / NOT CONTROLLING / DO NOT PUBLISH FROM THIS FILE ALONE  
**Priority:** FIRST vendor expansion after SOK purchaseability recovery  

## Mission

Reconcile Renogy's current dealer-authoritative product truth against the existing Shopify Renogy draft catalog, then return a bounded activation sheet to Shopify Store Operations.

Do not bulk-publish. Do not create duplicates when a correct existing record can be repaired. Do not normalize or shorten supplier SKUs. Exact current Renogy item identity controls.

## Current controlling vendor evidence

Renogy dealer approval is active. Renogy Sales Support supplied a current item workbook on 2026-09-11 containing SKU, description, dealer price, MSRP and UPC, and directed Elevation to use the Partner Portal for current inventory/orderability. Renogy also directed Elevation to use the current Renogy retail site as the public-facing price reference, and stated normal dropship lead time is approximately 7–10 business days once an item is in stock, ordered and paid.

Do not copy confidential dealer cost into public storefront copy or public-facing receipts.

## Owner Shopify rule

- Price Renogy at current verified MSRP / Renogy retail reference.
- Start with products roughly around the $100 price point.
- MAP/current retail rule remains a hard gate.
- Direct Elevation Shopify website only unless a separate channel is explicitly authorized.
- Hold only the blocked SKU; keep moving through clean candidates.

## Critical drift already found

Two existing Shopify drafts fail exact-current-SKU identity against the current dealer workbook and must NOT be activated as-is:

1. Shopify draft `RSP100DCT-US` — current workbook item is `RSP100DCT-G1-US`.
2. Shopify draft `RBM500-US` — current workbook item is `RBM500-G3-US`.

The first draft also lacks approved product media. The Battery Monitor remains held for current orderability/backorder and warranty presentation review.

## First reconciliation cohort — around $100 MSRP

Check these exact current workbook SKUs first in Partner Portal and current Renogy retail source. Return current orderability plus exact approved media/warranty/shipping facts:

| Priority | Exact current Renogy SKU | Product role | Workbook MSRP reference |
|---|---|---|---:|
| 1 | `RSP100DC-G1-US` | 100W rigid solar panel | $100.99 |
| 2 | `RSP100DC-ZB-G1-US` | 100W solar panel + ZB | $105.99 |
| 3 | `RSP100DCT-G1-US` | 100W N-Type bifacial rigid panel | $109.99 |
| 4 | `RNG-100D-SS-G3-US` | 100W rigid solar panel | $87.99 |
| 5 | `RSHST-B02P300-G1-US` | Battery Shunt 300 with Bluetooth | $120.99 |
| 6 | `RSP120DC-ASR-G1-US` | 120W ShadowFlux rigid panel | $128.99 |
| 7 | `RPP100EF-SE-G2-US` | E.FLEX-SE 100W portable panel | $124.99 |
| HOLD | `RBM500-G3-US` | 500A Battery Monitor | $87.99 |

MSRP values above are reconciliation references from the official item workbook and must still be checked against Renogy's current retail price before activation.

## Required per-SKU return

For every candidate, return:

- exact current Renogy SKU;
- exact product title / model identity;
- Partner Portal orderability: IN STOCK / BACKORDER-ORDERABLE / NOT ORDERABLE / UNKNOWN;
- current Renogy retail price / MSRP reference;
- dealer economics reviewed privately and contribution disposition: PASS / HOLD;
- current direct-site authorization: PASS / HOLD;
- exact approved media source and image count;
- warranty owner and exact published warranty facts;
- dropship eligibility;
- customer shipping class and verified customer-safe timing;
- Shopify match: exact existing product ID / stale existing product ID / no existing record;
- required Shopify action: UPDATE EXISTING / ACTIVATE EXISTING / CREATE ONLY IF NO RECORD / HOLD;
- blocker if held.

## Activation gate

A SKU is READY only when all are PASS:

**EXACT SKU → CURRENT RETAIL/MSRP → CONTRIBUTION → PARTNER PORTAL ORDERABILITY → APPROVED MEDIA → WARRANTY → SHIPPING → DIRECT-SITE AUTHORIZATION → SHOPIFY RECORD MATCH**

Then hand to Shopify Store Operations for:

**UPDATE EXISTING RECORD IF NEEDED → ACTIVE → ONLINE STORE ONLY → LIVE PDP → ADD TO CART → CART RETENTION → CHECKOUT → CARD + PAYPAL REACHABILITY → RECEIPT**

No payment should be submitted during QA.

## Store positioning

Renogy should lead Elevation's solar-generation, charging, controller, inverter/charger and monitoring assortment. Do not use Renogy expansion to displace SOK's primary lithium-battery role.

## Stop conditions

- Do not activate stale/normalized SKUs.
- Do not guess Partner Portal inventory.
- Do not promise unsupported ship dates.
- Do not use third-party marketplace publication.
- Do not create duplicates as a workaround.
- Do not publish the held Battery Monitor until its exact current SKU, orderability and warranty presentation are resolved.

## Required handoff headline

`RENOGY EXACT-SKU RECON → READY [N] / HOLD [N] → SHOPIFY ACTIVATION WAVE [exact SKUs]`
