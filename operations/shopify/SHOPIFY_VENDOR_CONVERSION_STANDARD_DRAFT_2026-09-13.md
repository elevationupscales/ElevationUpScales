# Elevation UpScales — Shopify Vendor Conversion Standard — DRAFT

**Date:** 2026-09-13  
**Owner:** Casey Young  
**State:** DRAFT / SHARED HANDOFF STANDARD  
**Applies To:** SOK, Renogy, VEVOR, Kingboss and future approved Shopify vendors

## Purpose

Create one clean interface between vendor-specific truth and Shopify execution.

Vendor managers own supplier truth. Shopify Store Operations owns the live Shopify action and customer-path verification.

**VENDOR TRUTH IN → SHOPIFY ACTION → LIVE QA → ORDER → FULFILLMENT → ACTUAL CONTRIBUTION.**

## Vendor manager owns

For each candidate SKU, verify and return:

1. exact supplier SKU/model;
2. exact Elevation Shopify SKU mapping;
3. channel permission;
4. current supplier orderability;
5. in-stock / preorder / backorder / unavailable state;
6. exact preorder/backorder authority if applicable;
7. protected supplier cost checked privately;
8. current MSRP / MAP / public-price rule;
9. fulfillment source and method;
10. shipping treatment and realistic customer delivery guidance;
11. warranty/support source;
12. approved exact-SKU media source;
13. specification source;
14. known route/market limitations;
15. recommended Shopify action.

Vendor managers do not change payment settings, theme structure or another vendor's records.

## Shopify Store Operations owns

After a vendor-manager row clears:

1. confirm the existing Shopify record before creating anything;
2. prevent duplicates;
3. set/confirm exact price within controlling vendor rule;
4. preserve exact SKU identity;
5. bind approved product media;
6. set product status/publication only after gates clear;
7. set inventory/preorder behavior only as authorized by the vendor lane;
8. verify collections/tags/customer-facing availability language;
9. run live PDP → Add to Cart → cart retention → checkout → payment-page reachability QA;
10. record activation receipt;
11. on the first real order, route fulfillment back to the exact vendor source and record realized economics.

## Standard Shopify-ready vendor handoff

Return one row per exact SKU:

| Field | Required output |
|---|---|
| Vendor | Exact vendor name |
| Supplier SKU / item | Exact supplier-side identity |
| Elevation Shopify SKU | Exact existing/planned Shopify SKU |
| Existing Shopify product ID | ID if present; `NEW` only if verified absent |
| Product title | Verified customer-facing title |
| Channel permission | DIRECT SITE / OTHER VERIFIED / HOLD |
| Current orderability | IN_STOCK / PREORDER_AUTHORIZED / BACKORDER_AUTHORIZED / OUT_OF_STOCK_NOT_ORDERABLE / UNKNOWN_HOLD |
| Supplier inventory timestamp | Timestamp/source, without exposing protected raw account data publicly |
| Public price target | Owner target subject to controlling supplier rule |
| MAP / price-control check | PASS / FAIL / HOLD |
| Profitability screen | POSITIVE / NEGATIVE / HOLD; no protected cost in public Git |
| Fulfillment | Vendor/location/process |
| Shipping treatment | Verified customer-safe summary |
| Delivery guidance | Verified range or OMIT/HOLD |
| Warranty/support | Exact source or OMIT/HOLD |
| Approved media | Exact asset/source path |
| Product facts/specs | Source identified |
| Preorder/backorder copy | Exact approved customer-safe wording or N/A |
| Shopify recommendation | ACTIVATE / KEEP ACTIVE / UPDATE / HOLD / RETIRE |
| Hold reason | One exact blocker only |

## Activation gate

A product can go public only when the minimum safe set is clean:

**EXACT IDENTITY + CHANNEL PERMISSION + PRICE/MAP + ORDERABILITY OR AUTHORIZED DELAYED-ORDER PATH + POSITIVE CONTRIBUTION + APPROVED MEDIA + FULFILLMENT/SHIPPING + CUSTOMER-SAFE SUPPORT/WARRANTY LANGUAGE.**

A missing enrichment field does not automatically block publication if the customer-facing claim can safely be omitted. A missing fact that affects whether Elevation can lawfully/safely sell and fulfill the item is a gate.

## Delayed-order rule

Do not translate Shopify quantity into supplier inventory.

- SOK: use SOK's controlling preorder/backorder authority.
- Renogy: exact-SKU delayed-order authority only; no blanket inference.
- VEVOR: no blanket backorder/preorder; exact current source controls.
- Kingboss: use only accepted Kingboss source rules once established.

Never say supplier stock is reserved unless the supplier has actually accepted/released the order.

## Pricing rule

Owner merchandising targets do not override supplier contractual/MAP controls.

For Renogy current sprint, owner target is **MSRP**, beginning around the **$100 product range**. Vendor manager must reconcile that target against current Renogy dealer/public-price controls before returning PASS.

For SOK, current live prices are controlled by the accepted SOK MAP schedule.

Do not expose protected dealer cost in public Git.

## Media rule

Exact vendor product only. Do not substitute another vendor, generic battery/solar imagery or AI-redrawn supplier product photography.

## Customer-path QA

Every newly activated SKU must pass:

**LIVE PDP → CORRECT SKU/PRICE → ADD TO CART → CART RETAINS → CHECKOUT OPENS → SHIPPING/ELIGIBILITY DOES NOT CREATE AN UNEXPECTED BLOCK → CARD/PAYPAL REMAIN AVAILABLE AS APPLICABLE.**

No real payment is required for activation QA.

## Hold-only-blocked-item rule

One unresolved SKU does not freeze the vendor catalog.

**VERIFY → ACTIVATE CLEAN SKU → HOLD ONLY BLOCKED SKU → CONTINUE.**

## Order trigger

First real paid order for any vendor:

**VERIFY PAYMENT → EXACT SKU → CURRENT VENDOR SELLABILITY/COST → SUPPLIER ORDER → ACCEPTANCE/RELEASE → TRACKING → CUSTOMER UPDATE → DELIVERY → ACTUAL CONTRIBUTION RECEIPT.**

## Control

**NO DUPLICATES → NO GUESSED INVENTORY → NO UNSUPPORTED BACKORDER → NO MAP VIOLATION → NO WRONG-SKU MEDIA → NO CHECKOUT BLOCKER CREATED BY INTERNAL WORKFLOW.**
