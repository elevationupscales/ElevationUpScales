# Elevation UpScales — eBay → Shopify Demand Validation Workflow

**Date:** 2026-09-10  
**Owner:** Casey Young  
**Status:** ACTIVE / OPERATING RULE  
**Reports through:** Operating System Project Manager → Company Operations → Peter Torres / Catalog & Storefront Worker

## Owner Direction

Elevation will use eBay as a low-cost product test market to identify products with real customer demand before expanding them into the primary Elevation storefront.

When an item demonstrates repeated sell-through on eBay, it should be evaluated for Shopify / elevationupscales.com rather than left isolated on the test channel.

This does **not** mean every eBay seller becomes a live Shopify product automatically.

## Standard Flow

**EBAY TEST → REPEATED SELL-THROUGH → SOURCE/SKU VERIFY → CURRENT COST VERIFY → SHOPIFY DRAFT → NET-MARGIN CHECK → FULFILLMENT CHECK → MASTER CATALOG / CHANNEL MAPPING → ACTIVATE IF CLEAN → MONITOR SELL-THROUGH**

The existing business rules remain controlling:

- Checkout and payment are priorities.
- Do not fabricate supplier inventory.
- Hold only the unsafe/unverified lane.
- Supplier/source identity must remain attached to the product.
- Margin must be evaluated from current landed economics, not historical assumptions.
- Do not publish a product merely because it sold well elsewhere if the current economics are not acceptable.

## Current Validated Product — Folding Camping Bed / Cot

Owner email to Peter identified the Portable Heavy Duty Folding Bed / high-end camping cot as a proven demand item coming into holiday and family-travel season.

Verified current source/order evidence:

- Supplier/source: Doba
- Doba Item No.: `D0102X33W6W`
- Product: Heavy duty folding bed / camping bed with flip-up mattress
- Recent Doba order cost observed: `$43.16`
- Repeated eBay sale price band observed: approximately `$50–55`
- One verified eBay sale: `$50.66`

Shopify action completed:

- Product created in Shopify as **DRAFT**
- Shopify Product GID: `gid://shopify/Product/16000618135921`
- SKU: `D0102X33W6W`
- Draft price used for evaluation: `$54.99`
- Tags include: `eBay-Tested`, `Demand-Validated`, `Margin-Review`

## Profitability Gate

At the observed `$43.16` supplier cost, a `$54.99` selling price produces only about **21.5% gross margin before Shopify payment/transaction costs**.

Therefore the product is **NOT authorized for live activation at $54.99 yet**.

Before activation, Operations must verify:

1. current Doba product cost;
2. current shipping/landed cost;
3. Shopify payment/transaction cost applicable to the connected store;
4. target customer selling price;
5. resulting net contribution and whether it meets the active margin rule;
6. supplier availability / normal fulfillment path;
7. shipping-zone eligibility.

If the item cannot meet the current margin floor at a marketable price, leave it DRAFT/HOLD rather than forcing the listing live.

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

## Reporting

Return material product moves as:

**COMPLETED / HELD / NEXT / NEEDS CASEY**

A product is only CLOSED for Shopify migration after its source, economics, fulfillment, and live channel state are verified.
