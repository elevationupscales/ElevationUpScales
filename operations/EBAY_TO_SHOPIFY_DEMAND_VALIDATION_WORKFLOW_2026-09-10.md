# Elevation UpScales — eBay → Shopify Demand Validation Workflow

**Date:** 2026-09-10  
**Owner:** Casey Young  
**Status:** ACTIVE / OPERATING RULE  
**Reports through:** Operating System Project Manager → Company Operations → Peter Torres / Catalog & Storefront Worker

## Owner Direction

Elevation will use eBay as a low-cost product test market to identify products with real customer demand before expanding them into the primary Elevation storefront.

When an item demonstrates repeated sell-through on eBay, it should be evaluated for Shopify / elevationupscales.com rather than left isolated on the test channel.

This does **not** mean every eBay seller becomes a live Shopify product automatically.

The storefront merchandising identity is:

**OFF-GRID & LITHIUM — PRIMARY**  
**OUTDOOR & CAMPING — COMPLEMENTARY**

Outdoor and camping products should support the core lithium/off-grid customer rather than make the store read like a generic marketplace.

## Standard Flow

**EBAY TEST → REPEATED SELL-THROUGH → SOURCE/SKU VERIFY → CURRENT COST VERIFY → SHOPIFY DRAFT → MEDIA / COPY → NET-MARGIN CHECK → FULFILLMENT CHECK → MASTER CATALOG / CHANNEL MAPPING → ACTIVATE IF CLEAN → MONITOR SELL-THROUGH**

The existing business rules remain controlling:

- Checkout and payment are priorities.
- Do not fabricate supplier inventory.
- Hold only the unsafe/unverified lane.
- Supplier/source identity must remain attached to the product.
- Margin must be evaluated from current landed economics, not historical assumptions.
- Do not publish a product merely because it sold well elsewhere if the current economics are not acceptable.
- Doba exports are snapshots, not a live inventory feed; current source state must be rechecked before activation.

## Shopify Collection Structure

### Off-Grid & Lithium — PRIMARY

Existing Shopify collection was reconciled from `Solar & Off-Grid` to **Off-Grid & Lithium** while preserving the existing handle `solar-off-grid` for URL continuity.

Shopify Collection GID:
`gid://shopify/Collection/709093949809`

Current structure contains:
- all 9 active SOK LiFePO4 listings;
- the existing solar/charging product drafts;
- 14 products total at the time of reconciliation.

This is the primary storefront collection and should visibly lead the commerce experience.

### Outdoor & Camping — COMPLEMENTARY

Shopify Collection GID:
`gid://shopify/Collection/709348032881`

Current initial products:
1. Heavy Duty Folding Camping Cot with Flip-Up Mattress — DRAFT
2. 360° Swivel Tripod Folding Camping Chair / Stool — DRAFT

This collection exists to complement off-grid/mobile/RV/lithium customers with practical camp and outdoor products.

## Current Validated Product — Folding Camping Cot

Owner email to Peter identified the Portable Heavy Duty Folding Bed / high-end camping cot as a proven demand item coming into holiday and family-travel season.

Verified source/order evidence:

- Supplier/source: Doba
- Doba Item No.: `D0102X33W6W`
- Supplier SKU Code: `C01-12261`
- Product: Heavy duty folding camping bed / cot with flip-up mattress
- Current Sep. 7 Doba snapshot inventory: `385`
- Snapshot shipping: UPS / Lower 48; excludes AK/HI
- Snapshot dropshipping price: `$62.59`
- Recent actual Doba order total observed: `$43.16` before later shipment update
- Later shipped-order total observed: `$44.46`
- Repeated eBay sale price band observed: approximately `$50–55`
- One verified eBay sale: `$50.66`

The source-cost records conflict materially. The snapshot `$62.59` and actual recent fulfilled-order `$43.16–44.46` evidence must be reconciled before activation.

Shopify action completed:

- Product created in Shopify as **DRAFT**
- Shopify Product GID: `gid://shopify/Product/16000618135921`
- Current title: `Heavy Duty Folding Camping Cot with Flip-Up Mattress`
- SKU: `D0102X33W6W`
- Current provisional draft price: `$64.99`
- Six Doba supplier product images uploaded to Shopify CDN and attached
- Copy prepared for camping / RV / guest / travel use
- Tags include: `eBay-Tested`, `Demand-Validated`, `Margin-Review`

### Profitability gate

At the recent actual `$43.16` order cost, `$64.99` is about 33.6% gross margin before Shopify/payment costs and may be workable after final fee and landed-cost review.

At the Sep. 7 snapshot `$62.59` source price, `$64.99` is not commercially viable under the current margin rule.

Therefore:

**COT = MEDIA/COPY COMPLETE / DRAFT / COST RECON REQUIRED BEFORE ACTIVATION**

Do not select the lower cost merely because it produces the desired margin.

## Complementary Product — Tripod Folding Camping Chair / Stool

Verified current Doba source:

- Doba SPU: `D01007HPAR8`
- Doba Item No.: `D01027EGYVX`
- Supplier: GT
- Supplier SKU Code: `A-AC022_camouflage`
- Product: 360° Quiet Swivel Folding Camping Stool
- Current Sep. 7 snapshot dropshipping price: `$29.00`
- Snapshot inventory: `100`
- Seller-selected U.S. shipping
- Stated capacity: 220 lb
- Product weight: approximately 2.6 lb
- Powder-coated steel tripod frame
- Reinforced 600D Oxford seat
- Wide anti-sink feet
- Carry strap and storage pocket

Shopify action completed:

- Product GID: `gid://shopify/Product/16000640680305`
- Current title: `360° Swivel Tripod Folding Camping Chair / Stool`
- Status: **DRAFT**
- SKU: `D01027EGYVX`
- Draft price: `$44.99`
- Six Doba supplier images uploaded to Shopify CDN and attached
- Added to Outdoor & Camping collection

State:

**TRIPOD CHAIR = MEDIA/COPY COMPLETE / DRAFT / LIVE DOBA RECHECK REQUIRED BEFORE ACTIVATION**

## Additional Cot Rule

The current full Sep. 7 Doba exports were searched for cot / folding-bed / camping-bed products. They currently support only the `D0102X33W6W` cot above as an exact cot/bed listing.

Do not invent additional cot SKUs merely because older working lists or eBay history may contain similar products.

If another cot is recovered from an older shortlist, it must enter through the same current-source/SKU/margin/fulfillment verification flow before Shopify activation.

## eBay Portfolio Rule

Peter / Order & Fulfillment / Catalog workers should use eBay performance as demand evidence, especially for:

- products with repeated sales;
- items selling quickly after listing;
- categories with several independent orders;
- seasonal demand signals;
- products with low cancellation/return risk and manageable fulfillment.

Conversely, eBay products with weak margin, high capital exposure, unreliable supplier fulfillment, or repeated customer-service problems should be repriced, paused, or removed rather than promoted into Shopify.

## Current eBay Cleanup Direction

The owner's linked Peter email also directs a Doba/eBay profitability comb-through:

- review Doba-linked eBay listings;
- target approximately 30% margin under the active rule;
- remove/hold items Elevation cannot reasonably cover or fulfill;
- avoid letting large low-margin/high-cash-requirement listings create customer obligations that working capital cannot support.

This cleanup is part of the same commerce workflow and should not be treated as a separate project.

## SOK Media Boundary

The nine active SOK Shopify products all currently carry supplier-authorized featured imagery and the `Brand-Media-Authorized` control tag.

The newly delivered SOK product-image archive is much larger than the existing per-product Shopify galleries. Current product detail checks show the products still have only a single product image each, so the **full new asset archive must not be represented as completely applied yet**.

Continue the existing SOK asset/catalog lane for gallery enrichment. Do not create a separate media project, and do not delay normal SOK checkout/order work solely for gallery expansion.

## Reporting

Return material product moves as:

**COMPLETED / HELD / NEXT / NEEDS CASEY**

A product is only CLOSED for Shopify migration after its source, economics, fulfillment, and live channel state are verified.
