# Elevation UpScales — eBay Store Operations Current Worktree

**Status:** ACTIVE WORKTREE / PRIMARY WORKER NOT YET STARTED  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Parent:** Company Operations / Ecommerce & Vendor Operations  
**Reporting Manager:** Peter Torres — Ecommerce & Vendor Operations Manager  
**Primary Worker:** eBay Store Operations Worker  
**Worker State Until Startup:** OPEN TASK / STANDBY  
**Lane SOP:** `EBAY_STORE_OPERATIONS_SOP_V1_0.md`  
**Worker Prompt:** `EBAY_STORE_OPERATIONS_WORKER_PROMPT_V1_0.md`  
**Recovery RECON:** `EBAY_RECOVERY_RECON_2026-09-11.md`

## Objective

Recover current eBay customer/order issues, then overhaul the live eBay catalog into a repeatable profitable sales channel.

**RECOVER CUSTOMERS → PROTECT SELLER ACCOUNT → AUDIT LISTINGS → VERIFY SOURCE/PERMISSION → VERIFY PROFIT → IMPROVE OR END → SELL → FULFILL → RECORD ACTUALS.**

## Priority queue

| Priority | Work Item | State | Blocker / Input | Next Action | Close Condition |
|---|---|---|---|---|---|
| P0 | Seller Hub live recovery recon | OPEN TASK / AUTHENTICATED EBAY REQUIRED | Need live Seller Hub access; email RECON complete enough to route | Read current awaiting-shipment/cancellation/refund/tracking state and reconcile against email evidence | Every open/recent order has one current verified state |
| P0 | Weed wacker order `10-15134-90489` | CANCEL REQUESTED / LATE / BUYER APOLOGY SENT / CANCEL ACTION STILL OPEN | Must prove unshipped before cancellation | Buyer apology sent through the existing eBay member-relay thread on Sep. 11. Next: verify Seller Hub; if still unshipped, approve cancellation/refund; if shipped, preserve order and update tracking | Buyer request resolved and eBay state verified |
| P0 | Folding bed order `25-15104-41137` | LATE / VERIFY | No exact shipment evidence in email RECON; no buyer-relay thread located in Gmail | Verify Seller Hub + supplier; if no executable fulfillment path, cancel/refund + apologize in Seller Hub; if shipped, post tracking + apologize for delay | Order reaches shipped/tracked or canceled/refunded verified state |
| P0 | VEVOR flashlight order `20-15123-05140` | SHIP-BY SEP 11 / STATUS UNKNOWN | No later shipment evidence in email RECON; no buyer-relay thread located in Gmail | Verify Seller Hub/source now; fulfill if executable, otherwise resolve truthfully and communicate through Seller Hub | Order has verified shipped/tracked or appropriate cancellation/refund state |
| P0 | Back-seat organizer `02-15170-43443` | PAID / CURRENT / SHIP-BY SEP 16 | Need profitable source + fulfillment confirmation | Verify source/cost/availability now; place/route fulfillment before deadline | Supplier acceptance/tracking recorded with positive expected contribution |
| P0 | Doba cot order `12-15143-03510` | SHIPPED / DO NOT CANCEL | Need eBay tracking confirmation | Verify FedEx tracking is posted/visible in eBay; update buyer only if needed | eBay reflects correct shipment/tracking |
| P0 | Refunded cot order `23-15100-64483` | CLOSED / REFUNDED | None | Do not reopen; buyer already confirmed refund credit | No unresolved customer action |
| P1 | Affected-buyer apology sweep | PARTIAL / SELLER HUB REQUIRED | Weed-wacker apology sent; other affected buyers lack usable member-relay threads in current Gmail recon | Send one concise in-platform message to each remaining affected buyer after exact order state is verified | Every materially affected current buyer has one accurate update/apology |
| P1 | Full active-listing metrics audit | QUEUED | Need Seller Hub active listings + views/watchers/sales | Export/read all active listings and classify with sales/views/watchers/source/economics | Every active listing has one keep/rebuild/end state |
| P1 | Dead listing cleanup | QUEUED | Metrics audit first | End/drop items with effectively no demand + weak economics/source fit | Dead capital/attention listings removed without destroying valuable history |
| P1 | Proven listing rebuild/reprice | QUEUED | Need protected cost + current market/source facts | Improve proven listings in place; prioritize cots and other demand-proven categories when profitable | Strong listings meet source, presentation and profit standards |
| P1 | Doba/source-by-product reconciliation | QUEUED | Need exact Doba/current supplier data + channel authorization | Keep Doba only where best authorized/profitable/reliable; evaluate alternatives per SKU | Every retained listing has a verified current source and channel permission |
| P1 | eBay profit loop | QUEUED | Recovery + source economics | Measure revenue, eBay fees, source cost, shipping, refunds/returns and contribution by SKU/category | eBay produces repeatable positive contribution, not just gross sales |

## Current demand evidence

Recent sale history captured from eBay email shows:

- repeated Portable Heavy Duty Folding Bed / camping cot purchases;
- VEVOR boot/shoe dryer purchases;
- VEVOR rechargeable flashlight purchase;
- back-seat organizer purchase;
- weed-wacker purchase followed by cancellation/fulfillment failure;
- historical 12V 100Ah lithium battery purchase.

Use demand evidence to prioritize investigation, not to bypass channel/source/profit controls.

## Listing classification standard

- `KEEP + REPRICE`
- `KEEP + REBUILD IN PLACE`
- `END + REBUILD`
- `END / DROP`

Metrics required where available:

**views → watchers → sales → conversion → returns/cancellations → source → availability → margin → contribution → fulfillment reliability.**

## Profit screen

Working target from prior Ecommerce Manager recommendation:

- ~30% pre-fee gross margin = minimum working screen;
- 35%+ preferred.

Then require positive expected contribution after eBay fees, supplier shipping/freight, promoted-listing fees, discounts and other variable order costs.

## Source control

Doba is superseded as blanket eBay inventory authority.

Current rule:

**DEMAND → EBAY CHANNEL AUTHORIZATION → BEST VERIFIED SOURCE → FULL ECONOMICS → RELIABLE FULFILLMENT → LIST/KEEP.**

Doba remains valid when it wins that comparison.

Do not migrate listings to direct VEVOR/Renogy/SOK/Kingboss merely because direct relationships exist. Marketplace permission is vendor-specific and must be verified.

## Browser/access state

- eBay has been reported logged into the user's browser.
- Current available TinyFish automation route could not start because its wallet balance is below zero.
- No current installed eBay-native seller plugin is available in the plugin registry.
- One customer communication was still possible through eBay's member-relay email thread and was sent for order `10-15134-90489`.
- **No Seller Hub cancellation/refund/listing change has been claimed executed from this Worktree yet.**

The worker must adopt the authenticated browser/connector route that is actually available in its execution session and verify live state before any consequential action.

## Startup checklist

- [ ] GIT FIRST
- [ ] Read Master SOP / Glossary / Current Work Board
- [ ] Read `EBAY_RECOVERY_RECON_2026-09-11.md`
- [ ] Read eBay Store Operations SOP
- [ ] Read this Worktree
- [ ] Read Worker Registry
- [ ] Verify authenticated eBay Seller Hub
- [ ] Verify no competing eBay worker owns recovery task
- [ ] Self-register ACTIVE
- [ ] Execute P0 recovery queue
- [ ] Record recovery receipt before catalog overhaul

## Control phrase

**RECOVER CUSTOMERS → SELL WHAT PEOPLE WANT → SOURCE IT RIGHT → PRICE FOR PROFIT → FULFILL ON TIME → CUT WHAT DOESN'T WORK.**