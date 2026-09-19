# Elevation UpScales — Shopify Renogy Controlled Launch Directive

**Date:** 2026-09-14  
**Owner:** Casey Young  
**System:** Elevation OS 1.1  
**Primary Worker:** Shopify Store Operations Worker  
**Supplier Owner:** Renogy Project  
**Mode:** OWNER OVERRIDE → EXACT-SKU GATE → LAUNCH CLEAN PRODUCTS → HOLD ONLY BLOCKED PRODUCTS → QA → CONTINUE

## Owner direction

Casey has explicitly authorized the Shopify worker to launch the next planned Renogy listings that clear current source-truth, economics, media, shipping, and purchaseability gates.

This directive supersedes the stale Sept. 12 `NO NEW LISTINGS` Shopify preserve-mode instruction only for this bounded Renogy controlled-launch lane. It does not authorize bulk catalog publication or unrelated Shopify expansion.

## Channel control

For this lane:

- Elevation's merchant-operated Shopify storefront is treated as the company's direct ecommerce sales channel.
- Renogy third-party marketplace restrictions remain enforced for eBay, TikTok Shop, Amazon Marketplace, and similar marketplace surfaces unless Renogy gives separate written authorization.
- eBay remains SOK-only under the current owner directive.
- Paid acquisition remains OFF.

## Fresh Renogy supplier truth

The latest Renogy Sales Support reply confirms the following exact SKUs/orderability:

| Exact SKU | Product | Supplier state | Shopify action |
|---|---|---|---|
| `RBC2125DS-21W-G3-US` | 50A DC-DC MPPT Charger G3 | IN STOCK | HOLD — economics/shipping contribution not yet clean |
| `RBM500-G3-US` | 500A Battery Monitor G3 | IN STOCK | Already public; do not duplicate |
| `RNG-INVT-3000-12V-P2-G3-US` | 3000W 12V Pure Sine Wave Inverter | IN STOCK | LAUNCH / QA |
| `RSP400LSC-G1-US` | 400W Solar Suitcase | IN STOCK | HOLD — approved product media + exact shipping economics required |
| `RSP100DCT-G1-US` | 100W N-Type Bifacial Panel | OOS; dealer-paid backorder/preorder allowed | HOLD — delayed-order presentation + economics required |
| `RNG-KIT-RV200D-ADV30-US` | Canonical 200W RV Kit | OOS; dealer-paid backorder/preorder allowed | HOLD — exact canonical product record + delayed-order/economics proof required |

Renogy also confirms U.S. dropship fulfillment is available. Continental-U.S. delivery guidance is 7–10 business days once items are in stock. Alaska/Hawaii/freight-sensitive fulfillment remains a separate verification gate.

## Live launch receipt — 3000W inverter

Product: **Renogy 3000W 12V Pure Sine Wave Inverter**  
Exact dealer SKU: `RNG-INVT-3000-12V-P2-G3-US`  
Shopify Product ID: `gid://shopify/Product/16002364408177`

Verified before/publication:

- supplier exact SKU: PASS;
- supplier orderability: IN STOCK;
- dealer cost: **$305.99**;
- current Shopify/public selling price: **$414.99**;
- gross spread before payment/fulfillment costs: **$109.00**;
- product media present: PASS;
- Shopify status: **ACTIVE**;
- Online Store publication: **PASS**;
- Shopify published timestamp: `2026-09-14T21:36:50Z`;
- Add to Cart visible: PASS;
- checkout handoff: PASS;
- checkout order summary: correct product / quantity 1 / $414.99: PASS;
- standard checkout shipping presented as FREE for the test Lower-48 Colorado address: PASS as storefront behavior; supplier-side fulfillment cost still governs actual contribution;
- credit-card payment option visible: PASS;
- PayPal payment option visible: PASS;
- PayPal express checkout visible: PASS;
- Google Pay / Venmo express options visible: PASS.

Shopify primary domain is currently `ggwt0c-41.myshopify.com`. The product is live and purchaseable there. The equivalent `elevationupscales.com/products/...` path returned a 404 because the corporate site is not the Shopify primary domain; treat branded-domain/store linking as a separate integration follow-up, not a product-publication failure.

## Remaining worker queue

Execute in this order:

1. Preserve the 3000W inverter public state and do not duplicate it.
2. Reconcile the 500A monitor to exact `RBM500-G3-US` supplier truth without creating a duplicate listing.
3. Clear the 400W suitcase only after approved media is installed and direct-fulfillment shipping economics are verified; then publish and run the same PDP → cart → checkout QA.
4. Clear the 50A charger only if current contribution remains positive after payment and supplier fulfillment costs; do not publish merely because it is in stock.
5. Keep the 100W panel and canonical 200W RV kit on controlled backorder/preorder hold until delayed-order customer presentation, exact economics, and fulfillment truth are complete.
6. Do not substitute the stale `RKIT200RV-A30DT1-US` record for canonical `RNG-KIT-RV200D-ADV30-US`.
7. Do not activate unrelated draft Renogy products without current supplier orderability proof.

## Launch gate

Every Renogy publication must clear:

**EXACT SKU → RENOGY SOURCE TRUTH → CURRENT ORDERABILITY / AUTHORIZED BACKORDER → CURRENT SELLING PRICE → DEALER COST → SUPPLIER FULFILLMENT / SHIPPING → WARRANTY/RETURNS → APPROVED MEDIA → POSITIVE EXPECTED CONTRIBUTION → SHOPIFY PDP → ADD TO CART → CHECKOUT HANDOFF.**

If one item fails a gate, hold only that item and continue the next clean item.

## Worker RUN

**GIT FIRST → READ THIS DIRECTIVE → RE-READ LIVE RENOGY SOURCE TRUTH → VERIFY CURRENT SHOPIFY PRODUCT → LAUNCH ONLY CLEAN NEXT LISTING → PDP QA → CART QA → CHECKOUT QA → RECORD RECEIPT → CONTINUE.**

## Control phrase

**DIRECT SHOPIFY RENOGY SALES ARE APPROVED → MARKETPLACES STAY BLOCKED → EXACT-SKU/TRUTH/ECONOMICS GATES CONTROL → HOLD ONLY THE BLOCKED SKU → KEEP REVENUE WORK MOVING.**
