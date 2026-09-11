# ELEVATION UPSCALES — VEVOR SOP MASTER SOURCE

**Version:** 1.0  
**Effective Date:** 2026-09-10  
**Owner / Final Decision Maker:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Supplier:** VEVOR  
**Project:** VEVOR Dedicated Project  
**State:** ACTIVE / GOVERNING SOURCE

## 1. AUTHORITY

This file is the governing VEVOR operating SOP source for Elevation UpScales unless Casey explicitly changes direction.

Use this precedence when VEVOR records conflict:

1. Casey's current explicit direction.
2. This VEVOR SOP Master Source.
3. Current written VEVOR supplier terms / account instructions.
4. Original supplier master feed `vevor-533.xlsx` for supplier-provided catalog fields.
5. `06_VEVOR_All_Products_Light.csv` as the working full-feed derivative.
6. `04_Elevation_VEVOR_Curated_Catalog_Working_Set_2026-09-10.xlsx` and `05_VEVOR_Curated_40.csv` as curated working derivatives.
7. Shopify live product records as the current storefront execution state.

The original supplier feed remains untouched. Working files do not replace the supplier source.

## 2. RELATIONSHIP STATE

VEVOR is ACTIVE. Do not restart prospecting, qualification, or onboarding.

Current verified project state:
- VEVOR PRO registration: COMPLETE.
- Product / inventory feed: RECEIVED.
- Direct-site dropship lane: ACTIVE.
- Colorado tax-exempt request: SUBMITTED / PENDING VEVOR REVIEW.
- VEVOR Tax Exempt ID: `1789082260`.
- Supplier feed rows: 20,999.
- Curated launch set: 40 products.

## 3. APPROVED COMMERCE CHANNEL

Shopify is approved as the commerce engine for Elevation's independent direct storefront and may host direct VEVOR inventory for `ElevationUpScales.com`.

This does NOT automatically authorize syndication of direct VEVOR inventory to eBay, Amazon, Walmart, TikTok Shop, Shopify Shop, or another marketplace/channel. Marketplace authorization remains separate.

Doba-sourced VEVOR listings and direct-account VEVOR listings are separate sourcing lanes. Never silently convert a Doba identifier into a direct VEVOR identifier without a verified product match.

## 4. PRICING CONTROL

Supplier feed fields include:
- `after coupon price`
- `MAP (Minimum Advertised Price)`

VEVOR also instructed Elevation that selling price cannot be below VEVOR's current selling price.

For publication and active selling:

**APPLICABLE VEVOR FLOOR = MAX(feed MAP, current live VEVOR selling price)**

The curated workbook's `Planning Ad Floor` is the higher of feed MAP and feed after-coupon reference and is a planning control only.

Rules:
- Never advertise below the applicable VEVOR floor.
- A feed price is a snapshot, not a permanent customer price.
- Recheck live VEVOR price before a draft becomes ACTIVE.
- Recheck live VEVOR price again when operationally necessary before supplier purchase.
- If exact product identity is not verified, use a conservative higher safe floor and HOLD publication until SKU identity is reconciled.
- Price updates do not by themselves authorize publication.

## 5. INVENTORY CONTROL

Feed inventory is a snapshot, not a promise.

Before activation and before fulfillment:
- verify exact SKU;
- verify current VEVOR stock;
- verify shipping availability to the customer destination when relevant.

An unavailable SKU blocks only that SKU. It does not block the VEVOR program.

Do not apply SOK's paid-backorder/preorder authorization to VEVOR unless VEVOR separately authorizes it.

## 6. PRODUCT IDENTITY / SKU CONTROL

Every active VEVOR product must retain enough source data to trace:
- Shopify product ID;
- Shopify variant ID;
- current Shopify SKU;
- VEVOR direct SKU when verified;
- any Doba SKU when the record originated through Doba;
- VEVOR product URL;
- price source date;
- stock verification date.

Never guess a direct VEVOR SKU from a Doba SKU.

If a product title matches multiple supplier-feed variants, keep the product DRAFT until the exact variant is resolved. A conservative price may be staged while DRAFT, but publication requires exact identity.

## 7. SHOPIFY CONTROL

VEVOR Shopify work is owned operationally by the VEVOR Shopify Manager file in this project.

Hard rules:
- Touch VEVOR products only when performing VEVOR catalog work.
- Do not change unrelated Elevation products.
- Use Shopify live records as the execution source before and after any write.
- Verify every pricing/status write after execution.
- Keep unresolved product identity in DRAFT.
- Do not activate a product solely because a price was updated.
- Do not use zero-price placeholders for sellable products.

## 8. ORDER FLOW

Normal direct-site flow:

**CUSTOMER ORDER → ELEVATION CHECKOUT → VEVOR ORDER PLACEMENT → SUPPLIER FULFILLMENT → TRACKING → CUSTOMER COMPLETION**

Checkout should not be blocked by unrelated internal onboarding notes.

## 9. FULFILLMENT

Current planning guidance: VEVOR products ship from U.S. warehouse inventory and approximately 3–7 working days may be used only as a planning range.

Do not promise delivery without order/SKU-level support.

Operational details still to confirm where relevant:
- blind shipping;
- packing slips;
- return routing;
- customer-service ownership;
- exact tracking handoff.

These open details do not stop unrelated safe catalog work.

## 10. TAX

Colorado tax-exempt request remains PENDING REVIEW.

VEVOR Tax Exempt ID: `1789082260`.

Verify tax treatment on the first actual direct VEVOR supplier order and record final VEVOR approval when received.

## 11. CATALOG PRIORITY

Priority order:
1. A — Core Launch
2. B — Strong Expansion
3. C — Supporting

Primary catalog lanes:
- Power & Off-Grid
- RV & Mobile
- Restoration & Field Service
- Outdoor & Support

Do not bulk-publish the 20,999-row feed. Build a controlled Elevation catalog from verified products.

## 12. CHANGE / RECEIPT CONTROL

Every material VEVOR catalog change should leave a receipt containing:
- date;
- product/SKU;
- previous value;
- new value;
- source used;
- verification state;
- unresolved exceptions.

Execution loop:

**VERIFY → EXECUTE → RE-VERIFY → RECORD → CLOSE / HOLD ONLY THE BLOCKED ITEM → CONTINUE**

This file remains governing until superseded by a later Casey-approved VEVOR SOP Master Source.
