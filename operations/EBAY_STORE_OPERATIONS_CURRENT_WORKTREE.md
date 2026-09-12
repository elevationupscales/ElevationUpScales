# Elevation UpScales — eBay Store Operations Current Worktree

**Status:** ACTIVE WORKTREE / RECOVERY + SOURCE ECONOMICS RECON ADVANCED / AUTHENTICATED SELLER HUB STILL REQUIRED  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Parent:** Company Operations / Ecommerce & Vendor Operations  
**Reporting Manager:** Peter Torres — Ecommerce & Vendor Operations Manager  
**Primary Worker:** eBay Store Operations Worker  
**Worker State:** OPEN TASK / STANDBY — P0 consequential actions require authenticated Seller Hub evidence  
**Lane SOP:** `EBAY_STORE_OPERATIONS_SOP_V1_0.md`  
**Worker Prompt:** `EBAY_STORE_OPERATIONS_WORKER_PROMPT_V1_0.md`  
**Recovery RECON:** `EBAY_RECOVERY_RECON_2026-09-11.md`  
**Source Economics RECON:** `EBAY_SOURCE_ECONOMICS_RECON_2026-09-11.md`

## Objective

Recover current eBay customer/order issues, then overhaul the live eBay catalog into a repeatable profitable sales channel.

**RECOVER CUSTOMERS → PROTECT SELLER ACCOUNT → AUDIT LISTINGS → VERIFY SOURCE/PERMISSION → VERIFY PROFIT → IMPROVE OR END → SELL → FULFILL → RECORD ACTUALS.**

## Priority queue

| Priority | Work Item | State | Blocker / Input | Next Action | Close Condition |
|---|---|---|---|---|---|
| P0 | Seller Hub live recovery recon | OPEN TASK / AUTHENTICATED EBAY REQUIRED | Backup web/browser route reached eBay Seller Hub URL but redirected to eBay sign-in; it did not inherit the user's authenticated browser session. Owner directed not to use TinyFish for this run. | Resume from an authenticated eBay Seller Hub / approved browser session. Read current awaiting-shipment/cancellation/refund/tracking state and reconcile against email evidence before any consequential action. | Every open/recent order has one current verified state |
| P0 | Weed wacker order `10-15134-90489` | CANCEL REQUESTED / LATE / BUYER APOLOGY SENT / ECONOMIC FAIL CONFIRMED / CANCEL ACTION STILL OPEN | Must prove unshipped before cancellation. Sep. 11 eBay late-shipment reminder still says buyer is waiting and offers Add Tracking. Doba source candidate `D0102X316EA` is $62.59 against a $49.98 eBay sale, a negative pre-fee spread. | Verify Seller Hub; if still unshipped, approve cancellation/refund; if shipped, preserve order and update tracking. Do not send a duplicate apology and do not place an uneconomic rescue supplier order. | Buyer request resolved and eBay state verified |
| P0 | Folding bed order `25-15104-41137` | LATE / NO SUPPLIER CONFIRMATION FOUND / ECONOMIC FAIL CONFIRMED / VERIFY | eBay sale was $50.66, sold Sep. 6, ship-by Sep. 10. Current Gmail recon found no Doba confirmation/shipment record. Doba SKU `D0102X33W6W` is $62.59 dropship / $45.80 pickup-with-label, leaving negative to ~9.6% pre-fee margin at the sale price. | Verify Seller Hub + supplier. If still unshipped and no already-paid supplier shipment exists, cancel/refund + apologize instead of initiating an uneconomic late fulfillment; if shipped, post tracking + apologize for delay. | Order reaches shipped/tracked or canceled/refunded verified state |
| P0 | VEVOR flashlight order `20-15123-05140` | LATE / NO SUPPLIER CONFIRMATION FOUND / MAP + ECONOMIC FAIL / STATUS UNKNOWN | eBay sale was $34.98, ship-by Sep. 11. Doba `D010277TCB2` shows MAP $35.90, $41.65 dropship and $33.53 pickup-with-label. Sale was below MAP; both source paths fail the operating margin screen. | Verify Seller Hub/source. If a valid authorized source has already shipped, post tracking; if unfulfilled/non-executable, cancel/refund + buyer update. Then correct/end the listing economics before another sale. | Order resolved and listing no longer creates the same MAP/economics failure |
| P0 | Back-seat organizer `02-15170-43443` | PAID / CURRENT / EXACT SOURCE FOUND / COST LOGIN-GATED / SHIP-BY SEP 16 | eBay sale was $24.33. Exact Doba public source `D01027H21KW` / AL AUTO is currently in stock, U.S. ship-from, estimated 2-business-day processing, but exact account price is authentication-gated. Sep. 7 exports and historical Doba mail contain no usable cost row. | Obtain exact Doba account cost. Fulfill only if landed source cost and variable fees support positive contribution; 30% screen requires landed source cost ≤ **$17.03**, 35% preferred ≤ **$15.81**. Control live listing if economics fail. | Supplier acceptance/tracking recorded with positive expected contribution and live listing disposition controlled |
| P0 | Doba cot order `12-15143-03510` | SHIPPED / DO NOT CANCEL / THIN ECONOMICS CONFIRMED | Doba shipment email confirms order `26091017391956` shipped. eBay sale $55.66 vs final Doba shipped total $44.46 = ~20.1% pre-fee margin, below operating screen. eBay tracking display remains unverified. | Verify FedEx tracking is posted/visible in eBay; update buyer only if needed. Reprice/rebuild the listing before scaling further sales at this cost structure. | eBay reflects correct shipment/tracking and listing economics are controlled |
| P0 | Refunded cot order `23-15100-64483` | CLOSED / REFUNDED | eBay refund email plus buyer confirmation support closure. | Do not reopen; buyer already confirmed refund credit. | No unresolved customer action |
| P1 | Affected-buyer apology sweep | PARTIAL / SELLER HUB REQUIRED | Weed-wacker apology sent; targeted Gmail searches found no usable member-relay buyer thread for `laidaleffall12` or `zuc-9588`; routine eBay notification mail is not a buyer-message channel. | Send one concise in-platform message to each remaining affected buyer after exact order state is verified. | Every materially affected current buyer has one accurate update/apology |
| P1 | Full active-listing metrics audit | PARTIAL PUBLIC + ECONOMICS RECON / SELLER HUB REQUIRED | Public eBay indexing and historical email now provide a strong audit seed, but public search is not authoritative for complete active inventory, private views/watchers or current Seller Hub state. | Use `EBAY_SOURCE_ECONOMICS_RECON_2026-09-11.md` as the source/economics decision seed, then read the complete Seller Hub active list and finalize every listing with views/watchers/sales/source/contribution. | Every active listing has one keep/rebuild/end state |
| P1 | Dead listing cleanup | QUEUED | Seller Hub metrics audit first. | End/drop items with effectively no demand + weak economics/source fit; do not destroy valuable history blindly. | Dead capital/attention listings removed without destroying valuable history |
| P1 | Proven listing rebuild/reprice | IN PROGRESS / ECONOMICS CANDIDATES CLASSIFIED | Economics receipt now identifies multiple proven-demand but underpriced listings including cot, boot dryer and lawn sweeper. | Once Seller Hub metrics are available, preserve useful history and reprice/rebuild only where a verified authorized source can produce positive contribution. | Strong listings meet source, presentation and profit standards |
| P1 | Doba/source-by-product reconciliation | IN PROGRESS / ECONOMICS RECEIPT ACTIVE | Exact source/economics now reconciled for multiple products; organizer and camping fan still have price/SKU authentication gaps. Direct vendor marketplace authorization still controls source switching. | Continue exact source mapping; keep Doba only where it is the best authorized/profitable/reliable source. Use `EBAY_SOURCE_ECONOMICS_RECON_2026-09-11.md` as the current decision receipt. | Every retained listing has a verified current source and channel permission |
| P1 | eBay profit loop | IN PROGRESS / ACTUALS RECOVERED FOR MULTIPLE SKUS | Historical actuals now prove negative/thin contribution on weed wacker, cot, flashlight, boot dryer, lawn sweeper, battery and RV guard source/price combinations. | Use actual landed cost + eBay fees to set corrected pricing or cut/rebuild listings; record actual contribution on every new order. | eBay produces repeatable positive contribution, not just gross sales |

## Current demand evidence

Recent sale history captured from eBay email shows:

- repeated Portable Heavy Duty Folding Bed / camping cot purchases;
- VEVOR boot/shoe dryer purchases;
- VEVOR rechargeable flashlight purchase;
- back-seat organizer purchase;
- VEVOR lawn sweeper purchase;
- weed-wacker purchase followed by cancellation/fulfillment failure;
- historical 12V 100Ah lithium battery purchases including failed Hawaii parcel routing.

Use demand evidence to prioritize investigation, not to bypass channel/source/profit controls.

## Economics control snapshot

The durable economics decisions are maintained in `EBAY_SOURCE_ECONOMICS_RECON_2026-09-11.md`.

Current high-value conclusions:

- **Weed wacker:** $49.98 sale vs $62.59 source candidate → negative before fees → `END / DROP` unless a better authorized source is proven.
- **Flashlight:** $34.98 sale below $35.90 MAP; $41.65 dropship / $33.53 pickup → MAP + economics failure → rebuild/reprice/end after recovery.
- **Cot:** repeated demand, but actual shipped order was $55.66 sale vs $44.46 landed (~20.1% pre-fee); another late sale at $50.66 cannot economically support the known source → preserve history but reprice/rebuild.
- **Organizer:** exact Doba source found/in stock; exact cost remains login-gated. Current $24.33 sale requires landed cost ≤ $17.03 for the 30% screen.
- **Boot dryer:** sales/watchers exist, but a known $10.89 sale cost $14.00 shipped. Later ~$17.89 pricing still misses the 30% screen at that historical cost.
- **Lawn sweeper:** $69.99 sale vs $63.36 final Doba shipped total (~9.5% pre-fee); later ~$73.50–$75.50 pricing still misses the screen.
- **Kingboss 12V 100Ah Doba SKU `D01027HH7BV`:** $169 historical sale vs $159.50 source (~5.6% pre-fee), and Doba parcel source excludes AK/HI. Hawaii sale was canceled. Ordinary listing flow must not create another unsupported Hawaii parcel order.
- **VEVOR RV screen-door guard:** $37.66 listing vs $41.65 dropship / $32.37 pickup → negative to ~14% pre-fee; current issue is price economics, not availability.
- **Camping fan `168647434992`:** active at $46.85; source-family inventory exists but exact Doba item/cost is not yet proven. 30% source-cost ceiling is $32.80.

## Public listing recon — provisional only

Public eBay search/index evidence currently surfaces the following Elevation seller listings/candidates. This is a **seed list**, not the full catalog and not a substitute for authenticated Seller Hub metrics:

| Product / Listing Signal | Public / Historical Evidence | Provisional Audit Priority |
|---|---|---|
| Universal Tactical Vehicle Back Seat Organizer with Detachable Molle Pouches | Elevation listing indexed at $24.33; fresh Sep. 11 sale | **P0 source-cost check** — exact Doba source found but cost is login-gated |
| VEVOR Fast-Drying Electric Boot & Shoe Dryer | Indexed around $17.89 with watchers; repeat sales | **P1 preserve-history / reprice candidate** — known historical economics fail screen |
| VEVOR 21-Inch Lawn Sweeper | Sale at $69.99; later listing $73.50; public index around $75.50 | **P1 preserve-history / major reprice-source audit** |
| Camping Fan with Lantern 10000mAh Rechargeable Battery Powered Portable Tripod | Listing `168647434992` at $46.85 | **P1 exact-SKU/source-cost audit** |
| 12V 100Ah LiFePO4 / Kingboss battery family | Real sales and multiple historical listings; exact SKU `D01027HH7BV` source excludes HI | **HIGH-RISK routing + economics audit** |
| Adjustable RV Screen Door Guard / Protector | Listing `168633285491` at $37.66; exact Doba source `D01027RQMT2` | **P1 reprice/rebuild candidate** |

Public indexing also surfaced additional Elevation listings with inconsistent crawl ages. Do not treat it as the complete current active set until Seller Hub is available.

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

- eBay has been reported logged into the user's normal browser, but that authentication has not been inherited by the available backup web/browser route in this worker session.
- Owner directed this worker not to use TinyFish for this run.
- Backup web/browser access to `https://www.ebay.com/sh/ord` reaches eBay but redirects to the sign-in page, so it is not an authenticated Seller Hub execution path.
- Public eBay/Doba web indexing can be used only for non-destructive provisional discovery/availability observations. It cannot prove current Seller Hub order state, complete listing inventory, seller analytics, private watchers, or authenticated Doba account price.
- No current installed eBay-native seller or Doba-native operations plugin was found in the plugin registry.
- One customer communication was possible through eBay's member-relay email thread and was sent for order `10-15134-90489` before this worker startup.
- **No Seller Hub cancellation/refund/listing change has been claimed executed from this Worktree.**

The worker must adopt an authenticated browser/connector route that is actually available in its execution session and verify live state before any consequential action.

## Startup execution receipt — 2026-09-11 MDT

- GIT FIRST completed. Startup initially resolved `main` at `55c4aa50cfdab0ffa8c30c7213f4b1df2610057f`; before the startup write, `main` was refreshed and had advanced to `d024a56a63637016b9ca9709957759655653fb9b` from a VEVOR workflow sync.
- Read controlling Master S.O.P., Master OS Glossary, Current Work Board, eBay Recovery RECON, eBay Store Operations SOP, eBay Current Worktree, eBay Parallel Revenue Recovery Directive and Master Worker Registry.
- Registry showed no competing active eBay Store Operations Worker; the assigned worker row remained `OPEN TASK / STANDBY` pending startup/authentication.
- Owner directed use of the backup browser route instead of TinyFish.
- Backup browser/web route was tested read-only against Seller Hub and redirected to eBay sign-in; no authenticated Seller Hub session was obtained.
- Fresh Gmail recovery recon confirmed: weed-wacker cancellation request still requires resolution and Sep. 11 late-shipment reminder exists; folding-bed order still has Sep. 11 late-shipment reminders; Doba cot order `12-15143-03510` is supplier-confirmed shipped; cot order `23-15100-64483` is refunded/closed; back-seat organizer sale is current; flashlight has no later exact-order email evidence beyond the original sale.
- No cancellation, refund, tracking edit, listing edit, or duplicate buyer apology was executed without authenticated Seller Hub evidence.

## RUN execution receipt — recovery/public recon

- GIT FIRST rerun against moving `main`; intervening non-eBay commits did not supersede the lane.
- Checked current eBay/Doba/member-relay mail; no newer eBay order-state email superseded the recorded recovery states.
- Exact-order recon completed for `25-15104-41137`, `20-15123-05140` and `02-15170-43443`.
- Current evidence contains no Doba order/shipment confirmation for those three orders; this strengthens the fulfillment-risk classification but is not treated as platform proof of non-shipment.
- Targeted member-relay searches for folding-bed buyer `laidaleffall12` and flashlight buyer `zuc-9588` found only ordinary eBay notification mail, not a usable buyer-message relay thread.
- `12-15143-03510` remains protected as SHIPPED / DO NOT CANCEL; `23-15100-64483` remains CLOSED / REFUNDED.
- Public eBay indexing was used for a non-destructive provisional catalog seed.
- No consequential eBay action was repeated or guessed while Seller Hub authentication remains unavailable.

## RUN execution receipt — source economics expansion

- Created `EBAY_SOURCE_ECONOMICS_RECON_2026-09-11.md` at commit `7609861333061118dfd6a7b49d5cbbdd42193d49` and expanded it at commit `8d588d9f63f658d56d82ffb28e23d1c085745e92`.
- Recovered Sep. 7 Doba inventory/export facts plus historical actual order totals from company Gmail.
- Proved negative/thin pre-fee economics on the weed wacker, flashlight, cot, boot dryer, lawn sweeper, Kingboss 100Ah battery source, and RV screen-door guard at their known listing/sale prices.
- Exact organizer source `D01027H21KW` is current/in stock, but current Doba account price is not exposed publicly and was not present in the Sep. 7 exports or historical order mail. No guessed cost was used.
- Exact historical Kingboss battery SKU `D01027HH7BV` was tied to eBay order `08-15101-45641`; source export excludes AK/HI, and the Honolulu order was canceled/refunded. Battery destination controls are therefore part of the listing correction, not merely a pricing issue.
- Camping fan `168647434992` remains cost/SKU unresolved despite public in-stock source-family evidence; no source substitution was assumed.
- Next consequential execution remains Seller Hub authentication. In parallel, exact Doba account cost for the organizer is the highest-value source-side unresolved input because its Sep. 16 ship-by deadline has not yet passed.

## Startup checklist

- [x] GIT FIRST
- [x] Read Master SOP / Glossary / Current Work Board
- [x] Read `EBAY_RECOVERY_RECON_2026-09-11.md`
- [x] Read eBay Store Operations SOP
- [x] Read this Worktree
- [x] Read Worker Registry
- [x] Establish source/economics decision receipt
- [ ] Verify authenticated eBay Seller Hub — backup browser reached sign-in only
- [x] Verify no competing eBay worker owns recovery task
- [ ] Self-register ACTIVE — correctly withheld because authenticated Seller Hub startup gate is not satisfied
- [ ] Execute P0 recovery queue — live consequential actions gated by Seller Hub authentication; non-destructive order/source/economics recon advanced
- [x] Record recovery/economics receipts before catalog overhaul

## Control phrase

**RECOVER CUSTOMERS → SELL WHAT PEOPLE WANT → SOURCE IT RIGHT → PRICE FOR PROFIT → FULFILL ON TIME → CUT WHAT DOESN'T WORK.**