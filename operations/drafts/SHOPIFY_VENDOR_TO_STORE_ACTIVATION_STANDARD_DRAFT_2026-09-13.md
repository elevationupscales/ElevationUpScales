# DRAFT — SHOPIFY VENDOR-TO-STORE ACTIVATION STANDARD

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Lane:** Vendor Management → Shopify Store Operations  
**Status:** DRAFT / NOT CONTROLLING / WORKFLOW PREP ONLY  

## Purpose

Create one repeatable handoff between each vendor manager and Shopify Store Operations without creating another management layer.

Vendor managers own supplier truth. Shopify Store Operations owns the Shopify execution and customer-path verification.

## Control sequence

**GIT FIRST → VENDOR TRUTH → PROFIT CHECK → SHOPIFY RECORD RECONCILIATION → ACTIVATION → LIVE STOREFRONT SMOKE → ORDER WATCH → FULFILLMENT HANDOFF → ACTUAL CONTRIBUTION RECEIPT**

## Vendor-manager responsibility

For each candidate SKU, return only verified facts:

- exact current supplier SKU / model identity;
- current supplier orderability;
- current stock state where authoritative;
- preorder/backorder permission and customer-safe wording;
- supplier/dealer cost for private profitability work;
- current MSRP / MAP / advertised-price rule;
- direct-site channel permission;
- shipping class, destination restrictions and verified customer-safe timing;
- warranty owner and exact published warranty facts;
- approved exact-SKU media source;
- fulfillment source/process;
- return restrictions where vendor-controlled;
- any special hazardous/lithium/freight rule.

Do not guess. Use `UNKNOWN / HOLD` when the source does not support a fact.

## Shopify Store Operations responsibility

Shopify receives a vendor-manager READY line and then:

1. re-resolves current Shopify state;
2. matches exact SKU to an existing product before creating anything;
3. corrects stale existing records rather than creating duplicate workarounds;
4. verifies contribution remains positive under the intended selling price;
5. verifies product status, variant state and physical/shipping configuration;
6. publishes only to the owner-authorized Shopify sales surface;
7. preserves authorized preorder/backorder purchaseability where applicable;
8. verifies customer-facing title, copy, media, price, availability, shipping, warranty and support presentation;
9. live-smokes PDP → variant → Add to Cart → cart retention → checkout → card/PayPal reachability;
10. submits no real payment during QA;
11. records the activation receipt;
12. watches for the first real order and routes fulfillment from exact SKU/vendor truth.

## Hard gates

A listing is READY only when all applicable gates pass:

**EXACT SKU → ORDERABILITY → PRICE / MAP → POSITIVE CONTRIBUTION → CHANNEL PERMISSION → SHIPPING → WARRANTY → APPROVED MEDIA → SHOPIFY RECORD MATCH**

If one SKU fails:

**HOLD ONLY THE BLOCKED SKU → KEEP THE REST OF THE VERIFIED COHORT MOVING.**

## Never do

- no duplicate products as a shortcut;
- no generic supplier substitution;
- no AI-redrawn factual product photography;
- no normalized/shortened SKU identity when the supplier controls a different exact SKU;
- no invented inventory, ETA, warranty, freight or shipping claim;
- no MAP violation;
- no marketplace publication without channel permission;
- no use of Shopify quantity as supplier inventory truth;
- no operational hold that unnecessarily blocks checkout when the vendor explicitly permits preorder/backorder and Elevation can fulfill manually;
- no bulk activation simply because records exist in DRAFT.

## Required vendor-manager handoff format

| Field | Required value |
|---|---|
| Vendor | Exact vendor |
| Exact SKU | Supplier-controlled identifier |
| Product | Exact model/title |
| Orderability | IN STOCK / BACKORDER-ORDERABLE / PREORDER / NOT ORDERABLE / UNKNOWN |
| Price control | Current MSRP/MAP/retail rule |
| Contribution | PASS / HOLD |
| Direct Shopify permission | PASS / HOLD |
| Shipping | Verified scope/restrictions/timing |
| Warranty | Owner + verified facts |
| Media | Approved exact-SKU source / count |
| Shopify match | Existing exact product / stale product / none |
| Shopify action | ACTIVATE / UPDATE EXISTING / CREATE ONLY IF NONE / HOLD |
| Blocker | Exact reason if held |

## Required Shopify activation receipt

For every activated SKU return:

- exact SKU;
- Shopify product ID/handle;
- selling price;
- price/MAP PASS;
- vendor orderability state;
- media count/source disposition;
- customer-facing shipping/warranty state;
- Online Store publication state;
- Add to Cart PASS/FAIL;
- Cart PASS/FAIL;
- Checkout PASS/FAIL;
- payment-page reachability PASS/FAIL;
- correction made;
- remaining blocker if any.

## Current owner priority

Renogy is the first catalog-expansion execution lane. SOK purchaseability is already recovered; its next work is trust/media/vendor-truth enrichment. VEVOR and Kingboss remain downstream of the Renogy first wave unless Casey changes priority.
