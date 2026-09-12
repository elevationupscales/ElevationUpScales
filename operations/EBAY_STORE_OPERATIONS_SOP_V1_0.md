# Elevation UpScales — eBay Store Operations SOP V1.0

**Version:** 1.0  
**Status:** ACTIVE LANE SOP  
**Owner:** Casey Young  
**Parent:** Company Operations / Ecommerce & Vendor Operations  
**Reporting Manager:** Peter Torres — Ecommerce & Vendor Operations Manager  
**Primary Worker:** eBay Store Operations Worker  
**Recovery Source:** `EBAY_RECOVERY_RECON_2026-09-11.md`

## Mission

Operate eBay as a **profitable marketplace revenue engine** while protecting customer obligations, supplier/channel rules, cash and seller-account health.

The lane is not a dumping ground for supplier catalogs.

**DEMAND → CHANNEL AUTHORIZATION → SOURCE → PROFIT → LISTING → SALE → FULFILLMENT → ACTUALS → SCALE / CUT.**

## Authority hierarchy

1. Casey's newest explicit direction.
2. Master Operating System SOP / Glossary.
3. Current Work Board.
4. This eBay Store Operations SOP.
5. `EBAY_STORE_OPERATIONS_CURRENT_WORKTREE.md`.
6. Applicable Vendor Project Source / SOP.
7. Current eBay Seller Hub, supplier platform and correspondence evidence.

## Role separation

### eBay Store Operations Worker owns

- eBay Seller Hub operational audit;
- order-status reconciliation;
- routine buyer communication inside eBay;
- approved cancellation/refund execution for owner-directed recovery when exact order state proves the action is correct;
- tracking/status verification;
- listing views/watchers/sales-history audit;
- listing title/item-specific/media/shipping/presentation cleanup from verified facts;
- listing keep/rebuild/end classification;
- seller analytics and demand feedback;
- eBay-side profitable-sales loop;
- routing vendor/source questions to the correct Vendor Project.

### Vendor Project Managers own

- exact supplier/source identity;
- supplier cost;
- marketplace/channel authorization;
- live availability/orderability;
- MAP / price floors;
- warranty/returns/fulfillment rules;
- supplier media/source authority.

### Company Operations / Peter owns

- cross-vendor/source conflicts;
- commercial priority;
- protected supplier economics;
- account exceptions;
- material customer remedies outside the recovery directive;
- escalation of seller-account risk.

### MASTER DEVELOPER owns

- eBay/API integration code;
- Command Center/channel-sync code;
- automated ingestion/deployment defects.

## Recovery-first rule

At lane startup, current customer/order damage comes before listing optimization.

Use `EBAY_RECOVERY_RECON_2026-09-11.md`.

Sequence:

**SELLER HUB CURRENT ORDERS → VERIFY SHIPPED/CANCELED/REFUNDED/OPEN → DO NOT CANCEL SHIPPED ORDERS → RESOLVE LATE/CANCEL-REQUESTED ORDERS → APOLOGIZE TO AFFECTED BUYERS → VERIFY RECEIPTS → THEN CATALOG OVERHAUL.**

Owner has explicitly directed cancellation of late/unfulfilled orders that should no longer remain open. This is not blanket permission to cancel any late-looking order without checking shipment/tracking first.

## Customer communication rule

Use eBay's in-platform buyer communication whenever available.

Recovery message should be short, factual and resolution-specific.

Do not:

- blame eBay, Doba or the buyer;
- promise shipping before supplier/order verification;
- promise refund timing not shown by eBay;
- expose internal supplier problems;
- send repeated apology messages to the same buyer.

## Listing classification

Every current listing enters one state after live metrics + economics recon:

- `KEEP + REPRICE`
- `KEEP + REBUILD IN PLACE`
- `END + REBUILD`
- `END / DROP`

### KEEP + REPRICE

Useful sales/watchers/traffic + viable product/source + price/economics need correction.

### KEEP + REBUILD IN PLACE

Useful history exists, but conversion/presentation needs title, image, item-specific, description, shipping or pricing improvement.

### END + REBUILD

Little valuable listing history, but the product has enough demand and economics to justify a clean replacement listing.

### END / DROP

Weak/no demand plus poor economics/source reliability/channel permission, or another hard commercial defect.

## Demand controls

Do not remove a listing simply because it is old.

Preserve useful:

- completed sales;
- watchers;
- meaningful views;
- search ranking / item history;
- conversion signal.

A listing with zero/near-zero views/watchers/sales may be a removal candidate, but source profitability and market fit still control the final decision.

## Profitability controls

Working eBay screening target:

- **30% pre-fee gross margin minimum working target**;
- **35%+ preferred**.

Then calculate expected order contribution including:

**SALE REVENUE + BUYER-PAID SHIPPING − SUPPLIER COST − SUPPLIER SHIPPING/FREIGHT − EBAY FEES − PROMOTED LISTING FEES − ELEVATION-FUNDED DISCOUNTS/CREDITS − OTHER VARIABLE ORDER COSTS.**

A product should not be scaled when expected contribution is non-positive.

A listing with strong watchers is not commercially healthy if every sale loses money.

## Doba control

Doba is a **connected supplier/source**, not automatic eBay catalog authority.

Use Doba where current evidence shows:

- eBay channel use is allowed;
- supplier item is orderable;
- shipping/handling promise is executable;
- full economics are profitable;
- historical fulfillment is sufficiently reliable.

Doba may remain the best source for some products.

Do not automatically replace Doba with direct vendor sources.

Direct vendor marketplace permission must be verified first. Current known examples:

- Renogy: direct website only under current terms; do not publish direct Renogy source to eBay.
- VEVOR Direct: current Project Source does not authorize direct VEVOR marketplace selling absent explicit approval; keep Doba-VEVOR and direct VEVOR source identities separate.
- SOK / Kingboss / future vendors: verify exact marketplace permission before eBay use.

## Source-by-product rule

**PRODUCT → EBAY DEMAND → MARKETPLACE PERMISSION → CURRENT SELLABILITY → FULL COST → MARGIN/CONTRIBUTION → FULFILLMENT RELIABILITY → LIST/KEEP.**

Never source-switch silently after customer purchase unless the exact substitution is commercially and product-identically approved by the responsible Vendor Project/Operations owner.

## Listing overhaul fields

For every retained/rebuilt listing, verify:

- exact product identity/SKU;
- source/vendor;
- title/search terms;
- item specifics;
- photos/media rights;
- condition;
- current price;
- shipping/handling time;
- returns;
- quantity/inventory presentation;
- marketplace authorization;
- expected gross margin;
- expected contribution;
- views;
- watchers;
- sales history;
- return/cancellation/late-shipment history;
- source reliability.

## Sales-history learning

Current RECON indicates real demand for camping cots/folding beds and some lower-ticket utility items.

Treat historical sales as demand evidence, not automatic keep authority.

Products that sell but create cancellations/refunds/negative economics must be fixed or removed.

## Order execution

On every new paid eBay order:

**VERIFY PAYMENT → EXACT LISTING/SKU → SOURCE → CURRENT SUPPLIER COST/SELLABILITY → EXPECTED CONTRIBUTION → PLACE/VERIFY SUPPLIER ORDER → TRACKING → EBAY UPDATE → BUYER UPDATE IF NEEDED → ACTUAL ECONOMICS → CLOSE.**

Do not wait until the ship-by date to find out whether source fulfillment is executable.

## Seller-account protection

Escalate immediately if current evidence shows:

- account suspension/restriction risk;
- abnormal defect/late-shipment metrics;
- unresolved chargeback/payment dispute;
- unauthorized access/security event;
- high cancellation/refund concentration;
- eBay policy violation.

## No destructive bulk action without recon

Do not mass-end listings before obtaining current views/watchers/sales-history and source economics.

Do not mass-cancel orders.

Recovery and cleanup operate record by record or through a verified classified batch.

## RUN command

When Casey/management says `RUN`:

**GIT FIRST → CURRENT EBAY WORKTREE → SELLER HUB → ORDER RECOVERY QUEUE → CUSTOMER COMMUNICATION → LISTING METRICS → SOURCE/ECONOMICS → EXECUTE NEXT CLEAN BATCH → VERIFY → RECORD → CONTINUE.**

## Close condition

The lane becomes CONTROLLED when:

- all current recovery orders are resolved;
- seller metrics/order queue contain no unmanaged late items;
- all active listings are classified and source-mapped;
- dead/unprofitable listings are ended;
- proven listings are improved in place where valuable;
- new listings use verified profitable sources;
- new eBay orders enter fulfillment immediately and record actual contribution;
- eBay produces repeatable profitable cash rather than unmanaged gross sales.

## Control phrase

**DON'T LIST EVERYTHING → SELL WHAT PEOPLE WANT → SOURCE IT RIGHT → PRICE FOR PROFIT → FULFILL ON TIME → CUT WHAT DOESN'T WORK.**