# Elevation UpScales — Commerce Vendor Pricing Rules

**Owner:** Casey Young  
**Date:** 2026-09-16  
**Status:** ACTIVE / CATALOG PRICING CONTROL  
**Applies to:** Web V2 universal catalog, direct-site pricing, vendor catalog normalization

## Control principle

Every customer sell price must resolve from current supplier truth, channel rules, and Elevation's approved pricing policy. Supplier cost, MAP, MSRP/public reference, shipping, and Elevation sell price are separate fields and must never be conflated.

## Global rules

1. Never infer supplier cost from retail price.
2. Never treat marketplace prices, old Doba records, old eBay listings, or stale Shopify prices as supplier truth.
3. MAP is a floor/control where applicable, not supplier cost.
4. Supplier cost is private and must not appear in public catalog output.
5. One vendor's pricing rule must not be applied to another vendor.
6. Shipping must remain separate from merchandise price unless the supplier's verified program explicitly bundles shipping into dealer cost.
7. If current cost, MAP/floor, or orderability cannot be verified, hold that SKU rather than inventing a price.
8. Price changes must be normalized into the universal catalog from the current vendor source before publication.

## SOK

Current public SOK catalog pricing remains the approved existing direct-site baseline already encoded in Web V2 for the active 9-SKU cohort.

Source controls:
- exact SOK SKU;
- current supplier/dealer terms;
- current MAP requirement;
- current direct-site authorization;
- current delayed-order rules.

Do not overwrite current SOK sell prices with generic markup logic unless Casey explicitly reopens SOK pricing.

## SunGoldPower

The 2026-09-15 Silver Dealer Price List is the current commercial source for the initial SunGoldPower catalog ingestion.

For each SKU, store separately:
- dealer cost;
- MAP;
- UPC;
- product URL;
- certification text;
- source stock state;
- customer sell price.

Initial pricing rule:

**CUSTOMER SELL PRICE = CURRENT SUNGOLDPOWER MAP**

unless Casey later approves another compliant price at or above MAP.

This rule deliberately uses MAP as the initial retail price rather than applying a generic markup percentage, because the supplier supplied explicit MAP values and they are the cleanest current customer-price authority.

Dealer cost remains private and is used internally for margin analysis only.

## VEVOR

Use the current approved VEVOR direct/vendor price source and its channel-specific price-floor controls.

Customer sell price must be the approved current Elevation/VEVOR price after checking:
- exact SKU;
- current direct cost/reference;
- current VEVOR public/MAP floor where applicable;
- stock/sellability;
- direct website authorization.

Do not fall back to Doba-derived cost or old marketplace listing prices.

## Renogy

Renogy pricing remains **PENDING CURRENT DEALER PRICE SOURCE** except for already-approved pilot pricing currently encoded in Web V2.

Do not expand Renogy pricing from public retail price, old Shopify price, or a guessed discount. Once Partner Portal dealer pricing is available, reconcile exact dealer price against current MAP/public pricing and update the universal catalog.

## Kingboss

Kingboss remains **HOLD / NO STANDARD DIRECT-SITE PRICING EXPANSION** until exact direct commercial terms, exact product identity, current cost, fulfillment structure, and channel authority are verified.

Do not use Doba cost as Kingboss direct supplier cost.

## Pricing normalization chain

**CURRENT VENDOR SOURCE → EXACT SKU → PRIVATE SUPPLIER COST → MAP/FLOOR → APPROVED CUSTOMER SELL PRICE → STOCK/ROUTE CHECK → UNIVERSAL CATALOG → CHECKOUT**

## Change control

A pricing update may change the affected vendor/SKU only. It does not authorize unrelated catalog, checkout, payment, shipping, tax, or visual redesign work.
