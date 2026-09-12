# Elevation UpScales — eBay Recovery RECON

**Status:** COMPLETE ENOUGH TO ROUTE / SELLER-HUB LIVE VERIFICATION REQUIRED BEFORE CONSEQUENTIAL ACTIONS  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Parent:** Company Operations / Ecommerce & Vendor Operations  
**Purpose:** Reconcile current eBay customer/order damage and establish the evidence base for a dedicated eBay Store Operations Worker.

## Owner direction

- Apologize to affected eBay customers through eBay.
- Cancel late/unfulfilled orders that should no longer remain open.
- Do not cancel an order that has already shipped.
- Rebuild eBay into a profitable revenue engine in parallel with Shopify/PayPal.
- Doba is no longer the default catalog authority. Source selection is product-by-product and must preserve marketplace/channel authorization.
- Remove or rebuild stale listings only after checking views, watchers, sales history, economics, source quality and fulfillment reliability.

## RECON sources used

- Current eBay order/sale/cancellation/refund emails in the connected company Gmail.
- Current Doba shipment/order emails in the connected company Gmail.
- Peter Torres's 2026-09-09 eBay cleanup strategy.
- Current Operating System / ecommerce controls in Git.

The authenticated eBay Seller Hub could not be inspected through the current browser-automation route because the connected TinyFish wallet is below balance. Therefore, views/watchers/current Seller Hub status and any action such as cancel/refund/message remain **UNVERIFIED IN PLATFORM** until the dedicated worker obtains authenticated Seller Hub access.

## Current customer/order recovery queue

| Order / Item | Evidence state | Current classification | Required Seller Hub action |
|---|---|---|---|
| `10-15134-90489` — Cordless Electric Weed Wacker | eBay shows shipping due Sep. 10; buyer formally requested cancellation; no shipment evidence found in current email recon | **CANCEL-REQUESTED / LATE / ACTION REQUIRED** | First verify no shipment/tracking. If still unshipped, approve buyer cancellation/refund through eBay and send concise apology. If already shipped, do not cancel; update buyer with verified tracking/status. |
| `25-15104-41137` — Portable Heavy Duty Folding Bed | eBay sent repeated late-shipment reminders; shipping due Sep. 10; no Doba shipment evidence found for this exact order in current email recon | **LATE / ACTION REQUIRED** | Verify current Seller Hub + supplier state. If no executable fulfillment path remains, cancel/refund and apologize. If supplier has already shipped, add/verify tracking and apologize for communication delay. |
| `20-15123-05140` — VEVOR rechargeable LED flashlight | Sold for $34.98; ship-by Sep. 11; no later shipment evidence found in current email recon | **DUE / STATUS UNKNOWN** | Verify exact fulfillment/source immediately. Do not cancel merely from lack of email evidence. If unfulfilled and now non-executable, cancel/refund + apologize; if executable/shipped, complete tracking/customer update. |
| `02-15170-43443` — Universal Tactical Vehicle Back Seat Organizer | Fresh paid sale; ship-by Sep. 16 | **CURRENT / NOT LATE** | Preserve. Verify profitable source and fulfillment now; do not wait until Sep. 16. Customer apology only if a real delay/problem exists. |
| `12-15143-03510` — Heavy duty folding bed / camping bed | Doba order `26091017391956` is confirmed shipped; FedEx tracking was previously routed internally | **SHIPPED / DO NOT CANCEL** | Verify tracking is posted in eBay and customer sees shipment state. Send apology only if tracking/customer update was delayed. |
| `23-15100-64483` — Portable Heavy Duty Folding Bed | eBay refund confirmed; buyer later confirmed $55.09 credit received | **CLOSED / REFUNDED** | No cancellation action. Optional closing courtesy message only if Seller Hub shows an unresolved customer thread; do not reopen economics/order state. |

## Demand evidence from recent eBay sales

Recent eBay sale emails show repeated demand for:

- Portable Heavy Duty Folding Bed / camping cot products — multiple sales across Sep. 4, Sep. 6, Sep. 7 and Sep. 9.
- VEVOR boot/shoe dryer — at least two recent sales in late August.
- VEVOR rechargeable LED flashlight — sale Sep. 8.
- Universal tactical vehicle back-seat organizer — sale Sep. 11.
- Cordless weed wacker — sold, but fulfillment/customer experience failed and cancellation followed.
- 12V 100Ah LiFePO4 battery — sold in late August; this does not establish a safe/current eBay battery program by itself.

**Conclusion:** eBay has real demand signal and should be optimized, not abandoned. Demand history must be separated from profitability and fulfillment quality.

## Listing-overhaul classification

Every active listing must enter one of four buckets after live Seller Hub views/watchers/sales and current source economics are reconciled:

### KEEP + REPRICE

Use when the listing has sales/watchers/useful traffic and the economics can meet the current eBay profit target.

### KEEP + REBUILD IN PLACE

Use when traffic/watchers/sales history are valuable but conversion, title, media, item specifics, shipping promise or price need improvement.

### END + REBUILD

Use when the current listing has little useful history but the underlying product remains demand- and profit-worthy with a better source/listing structure.

### END / DROP

Use when economics are poor, source/availability is unreliable, channel authorization is absent, or buyer interest is effectively zero.

Do not delete/relist merely because a listing is old. Preserve useful eBay sales history/watchers where commercially valuable.

## Profit standard

Peter's prior operating recommendation is adopted as the working eBay target unless Casey supersedes it:

- **approximately 30% pre-fee gross margin = minimum working target**;
- **35%+ pre-fee gross margin = preferred**.

This is a screening target, not final profit. The final decision must also account for eBay fees, promoted-listing fees if any, supplier shipping/freight, refunds/returns, discounts and other order-specific variable costs.

A sale that creates negative contribution is not success.

## Doba supersession rule

The prior broad statement that Doba is the primary inventory source for eBay is superseded for operating decisions.

New rule:

**PRODUCT DEMAND → EBAY CHANNEL AUTHORIZATION → BEST VERIFIED SOURCE → FULL COST / PROFIT CHECK → RELIABLE FULFILLMENT → LIST/KEEP**

Doba remains a connected supplier / source adapter where it provides the best authorized, profitable and reliable fulfillment path.

Do not assume direct VEVOR, Renogy, SOK or another vendor may replace a Doba eBay source merely because Elevation has a direct relationship. The vendor's marketplace authorization controls. Renogy currently remains direct-site only; direct VEVOR marketplace use is not authorized by the current VEVOR Project Source absent explicit approval. Each source must be verified before eBay use.

## Customer recovery message standard

Affected customers should receive one concise in-platform message after exact order state is verified:

> Hi [buyer name], we apologize for the delay and the lack of a timely update on your order. We have been correcting our fulfillment process and reviewing your order directly. [Verified resolution: your order has shipped and the tracking is ___ / we have approved the cancellation and refund because we cannot meet the promised handling time.] We appreciate your patience and are sorry we did not meet the service standard we expect from Elevation UpScales.

Do not promise shipment, delivery, refund completion or timing until the exact eBay/order state supports it.

## Dedicated worker handoff

RECON is complete enough to create the dedicated worker.

The worker's startup sequence must be:

**GIT FIRST → READ THIS RECON → AUTHENTICATED EBAY SELLER HUB → ORDER RECOVERY FIRST → CUSTOMER APOLOGIES → VERIFIED CANCELLATIONS / TRACKING → LISTING METRICS RECON → PROFIT/SOURCE RECON → CATALOG OVERHAUL → PROFITABLE SALES LOOP**

## Close condition for recovery phase

Recovery closes when:

- every currently late/cancel-requested eBay order is verified and resolved in Seller Hub;
- shipped orders are not mistakenly canceled;
- affected customers receive appropriate in-platform communication;
- current open paid orders have an executable fulfillment owner;
- current listing inventory is classified using views/watchers/sales + economics + source reliability;
- the eBay Store Operations Worker has adopted the ongoing profitable-sales Worktree.
