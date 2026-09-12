# Elevation UpScales — eBay Store Operations SOP V1.1

**Version:** 1.1  
**Status:** ACTIVE LANE SOP / STORE CONTRACTION ACTIVE  
**Owner:** Casey Young  
**Parent:** Company Operations / Ecommerce & Vendor Operations  
**Reporting Manager:** Peter Torres — Ecommerce & Vendor Operations Manager  
**Primary Worker:** eBay Store Operations Worker  
**Recovery Source:** `EBAY_RECOVERY_RECON_2026-09-11.md`  
**Contraction Directive:** `EBAY_STORE_CONTRACTION_AND_DIRECT_SOURCE_REBUILD_2026-09-11.md`

## Mission

Operate eBay as a **profitable marketplace revenue engine** while protecting customer obligations, supplier/channel rules, cash and seller-account health.

The lane is not a dumping ground for supplier catalogs.

During the current repair phase, the objective is a **small, manageable, profitable catalog**, not maximum listing count.

**DEMAND → CHANNEL AUTHORIZATION → SOURCE → PROFIT → LISTING → SALE → FULFILLMENT → ACTUALS → SCALE / CUT.**

## Authority hierarchy

1. Casey's newest explicit direction.
2. Master Operating System SOP / Glossary.
3. Current Work Board.
4. `EBAY_STORE_CONTRACTION_AND_DIRECT_SOURCE_REBUILD_2026-09-11.md` while contraction is active.
5. This eBay Store Operations SOP.
6. `EBAY_STORE_OPERATIONS_CURRENT_WORKTREE.md`.
7. Applicable Vendor Project Source / SOP.
8. Current eBay Seller Hub, supplier platform and correspondence evidence.

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
- execution of the approved contraction batch;
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
- active-listing cap/expansion decisions;
- material customer remedies outside the recovery directive;
- escalation of seller-account risk.

### MASTER DEVELOPER owns

- eBay/API integration code;
- Command Center/channel-sync code;
- automated ingestion/deployment defects.

## Recovery + cash-release first rule

At lane startup, current customer/order damage and held-funds recovery come before listing growth.

Use:

- `EBAY_RECOVERY_RECON_2026-09-11.md`
- `EBAY_PAYOUT_HOLD_RECOVERY_DIRECTIVE_2026-09-11.md`
- `EBAY_PAYOUT_HOLD_CASH_RELEASE_QUEUE_2026-09-11.md`

Sequence:

**SELLER HUB CURRENT ORDERS → VERIFY SHIPPED/CANCELED/REFUNDED/OPEN → POST/VERIFY TRACKING → DO NOT CANCEL SHIPPED ORDERS → RESOLVE LATE/CANCEL-REQUESTED ORDERS → VERIFY HOLD UNWIND/DELIVERY → THEN CATALOG CONTRACTION.**

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

## Store contraction rule

The store is under an owner-directed controlled contraction because current catalog breadth has produced poor economics and fulfillment complexity.

Temporary Phase 1 target:

**ABOUT 12 ACTIVE REVENUE LISTINGS MAXIMUM**

until fulfillment, tracking, payouts and actual contribution stabilize.

A temporary listing tied to an unresolved paid order may remain until that customer obligation is safely closed.

Do not preserve listing count for its own sake.

## New-listing freeze

During contraction, do not create a new eBay listing without:

**DEMAND CASE → EBAY CHANNEL AUTHORIZATION → EXACT SOURCE → CURRENT LANDED COST → PROFIT CHECK → SHIPPING/HANDLING PLAN → MANAGER PASS.**

No supplier-feed bulk listing.

No Doba catalog expansion.

No speculative listing merely because inventory exists.

## Listing classification

Every current listing enters one state after live metrics + economics recon:

- `CORE KEEP — DIRECT/APPROVED + PROFITABLE`
- `KEEP HISTORY / REPRICE`
- `END / REBUILD AFTER SOURCE APPROVAL`
- `END / DROP`
- `TEMP ORDER-PROTECTION HOLD`

### CORE KEEP — DIRECT/APPROVED + PROFITABLE

Useful demand + verified eBay authorization + controlled source + executable fulfillment + positive contribution.

### KEEP HISTORY / REPRICE

Useful sales/watchers/traffic, but current economics need correction. Keep active only when the source and profitable corrected price are verified; otherwise end until rebuilt.

### END / REBUILD AFTER SOURCE APPROVAL

Product demand may be worthwhile, but current source economics, channel permission or fulfillment path are unacceptable.

### END / DROP

Weak/no demand plus poor economics/source reliability/channel permission, or another hard commercial defect.

### TEMP ORDER-PROTECTION HOLD

Listing state is temporarily constrained because an unresolved paid customer order still depends on it. Resolve the order first, then classify normally.

## Demand controls

Do not remove a listing simply because it is old.

Preserve useful history in the audit record:

- completed sales;
- watchers;
- meaningful views;
- search ranking / item history;
- conversion signal.

However, owner direction now favors aggressive decluttering. A listing with useful history may still be ended if it cannot be made profitable and reliably sourceable.

A listing with zero/near-zero views/watchers/sales and no strategic source advantage should normally be ended during contraction.

## Profitability controls

Working eBay screening target:

- **30% pre-fee gross margin minimum working target**;
- **35%+ preferred**.

Then calculate expected order contribution including:

**SALE REVENUE + BUYER-PAID SHIPPING − SUPPLIER COST − SUPPLIER SHIPPING/FREIGHT − EBAY FEES − PROMOTED LISTING FEES − ELEVATION-FUNDED DISCOUNTS/CREDITS − OTHER VARIABLE ORDER COSTS.**

A product should not be active merely because it sells.

A listing with strong watchers is not commercially healthy if every sale loses money.

## Doba control — superseded posture

Doba is **retired as the default / blanket eBay catalog source**.

Effective during contraction:

- no new Doba-derived eBay catalog growth;
- no listing stays active merely because Doba can technically fulfill it;
- no automatic Doba order placement after a sale without exact economics and customer-obligation review;
- Doba may finish an already-committed current order where that is the correct customer-protection action;
- Doba may remain a fallback evidence/source option for a specific item, but it is not the merchandising strategy.

Removing Doba as middleman does **not** authorize an unapproved direct-vendor marketplace switch.

Direct vendor marketplace permission must be verified first. Current known examples:

- Renogy: direct website only under current terms; do not publish direct Renogy source to eBay.
- VEVOR Direct: current Project Source does not authorize direct VEVOR marketplace selling absent explicit approval; keep Doba-VEVOR and direct VEVOR source identities separate until authorization changes.
- SOK / Kingboss / future vendors: verify exact marketplace permission before eBay use.

If a Doba-dependent listing has no authorized profitable replacement source, end/hold the listing rather than source-switching without permission.

## Source-by-product rule

**PRODUCT → EBAY DEMAND → MARKETPLACE PERMISSION → CURRENT SELLABILITY → FULL COST → MARGIN/CONTRIBUTION → FULFILLMENT RELIABILITY → LIST/KEEP.**

Never source-switch silently after customer purchase unless the exact substitution is commercially and product-identically approved by the responsible Vendor Project/Operations owner.

## Current first-pass contraction candidates

Use `EBAY_SOURCE_ECONOMICS_RECON_2026-09-11.md` as the evidence base.

Highest-priority end/hold candidates include:

- weed wacker — known negative source economics + customer recovery failure;
- VEVOR spotlight/flashlight — below MAP at historical sale and negative/thin known source economics;
- ordinary parcel lithium listings with unresolved direct-source, route or dangerous-goods controls;
- RV screen-door guard at known losing/thin source economics;
- any zero/near-zero demand listing with weak economics or no direct-source advantage.

Demand-bearing products such as camping cots, boot dryers, lawn sweepers, camping fan and organizer may preserve history only if they can be rebuilt with authorized source + profitable pricing + reliable fulfillment.

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
- payout/transaction hold escalation;
- abnormal defect/late-shipment metrics;
- unresolved chargeback/payment dispute;
- unauthorized access/security event;
- high cancellation/refund concentration;
- eBay policy violation.

## Destructive-action rule during contraction

Owner has authorized a material active-listing reduction, but still avoid blind mass deletion.

Use a classified batch:

1. read complete Seller Hub active list;
2. capture views/watchers/sales/open-order dependency;
3. protect unresolved-order listings;
4. apply economics/source evidence;
5. classify;
6. end `END / DROP`;
7. end `END / REBUILD` where no current order depends on the listing;
8. verify remaining active count and core economics.

The objective is aggressive cleanup with traceability, not uncontrolled deletion.

## RUN command

When Casey/management says `RUN`:

**GIT FIRST → CURRENT EBAY WORKTREE → SELLER HUB → PAYOUT/ORDER RECOVERY → TRACKING/HOLD RELEASE → ACTIVE LISTING EXPORT → CLASSIFY CONTRACTION BATCH → END BAD LISTINGS → VERIFY CORE COUNT → SOURCE/ECONOMICS → RECORD → CONTINUE.**

## Close condition

The lane becomes CONTROLLED when:

- all current recovery orders are resolved;
- held-funds incident is substantially resolved or clearly aging toward documented release;
- seller metrics/order queue contain no unmanaged late items;
- active listings are reduced to a manageable core around the Phase 1 target;
- every retained listing is source-mapped and channel-authorized;
- dead/unprofitable listings are ended;
- proven listings are improved only where profitable;
- no new listing bypasses the source/profit/fulfillment gate;
- new eBay orders enter fulfillment immediately and record actual contribution;
- eBay produces repeatable profitable cash rather than unmanaged gross sales.

## Control phrase

**FEWER LISTINGS → BETTER SOURCES → HIGHER PROFIT → CLEAN FULFILLMENT → CASH RELEASE → THEN SCALE.**