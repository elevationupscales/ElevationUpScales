# Elevation UpScales — eBay Profitability Streamline Upper-Management RECON

**Date:** 2026-09-11 MDT  
**Owner:** Casey Young  
**Prepared by:** eBay Store Operations Specialist  
**For review by:** Peter Torres / Company Operations / Operating System Management  
**State:** UPPER-MANAGEMENT REVIEW REQUIRED / NO NEW POLICY CREATED  
**Git baseline re-resolved before report:** `2393a431e49261f46355dc5ccc6b6ab47e936446`

## Executive conclusion

eBay has demonstrated real buyer demand, but the current store is materially over-broad and several proven-demand listings are structurally unprofitable at their existing source/price combinations.

The profitability problem is not primarily lack of traffic. It is the combination of:

- source cost exceeding or nearly consuming sale price;
- eBay selling costs already consuming roughly 14% of gross sales in the current 31-day view;
- suggested promoted-listing rates commonly adding another ~9–14% if enabled;
- weak source-to-order execution causing late/untracked orders and payout holds;
- 149 active listings creating operational complexity far beyond the current Phase 1 profitable-core model;
- stale lower-level Worktree language that no longer reflects authenticated Seller Hub access or the Owner/President Doba sourcing directive.

**Recommended management posture:**

**RECOVER CASH → STOP NEW LOSS-MAKING ORDERS → CONTRACT TO A SMALL VERIFIED CORE → PRESERVE PROVEN DEMAND HISTORY → REPRICE/RESOURCE WINNERS → RECORD ACTUAL CONTRIBUTION → SCALE ONLY AFTER CLEAN FULFILLMENT.**

## 1. Current live Seller Hub baseline

Authenticated Seller Hub was rechecked during this RECON.

### Catalog

- **Manage active listings: 149**.
- Existing Phase 1 direction is approximately **12 active revenue listings maximum**, with 12 as a cap rather than a quota.
- The live catalog is therefore more than 12x larger than the intended recovery core and requires substantial contraction.

### Cash / payout state

Seller Hub Payments currently shows:

- **Available funds (15)**
- **Processing (0)**
- **On hold (8)**
- **Payouts (2)**
- **Total on hold: $242.79**

No improvement in held-row count or held total was observed during this RECON.

### Current awaiting-shipment exposure

Seller Hub currently shows **Awaiting shipment (4)**.

Known current obligations remain:

- back-seat organizer `02-15170-43443` — ship by Sep. 16;
- folding bed `25-15104-41137` — shipping overdue / ship by Sep. 10;
- folding bed `07-15141-13062` — shipping overdue / ship by Sep. 10;
- VEVOR spotlight `20-15123-05140` — no validated supplier fulfillment evidence in the current recovery record.

Weed-wacker order `10-15134-90489` is outside this four-order awaiting-shipment queue because its buyer cancellation was accepted and Seller Hub shows cancellation processing.

### Seller performance

Current PM4 authenticated Performance receipt records:

- total sales: **$485.29** current 31-day view;
- net sales: **$386.53** before supplier/product cost;
- eBay selling costs: approximately **$66.39**, or **~14% of gross sales**;
- impressions: **104,797**;
- listing page views: **900**;
- click-through rate: **0.8%**;
- sales conversion rate: **1.6%**;
- seller level: **Above Standard**;
- next evaluation: **Sep. 20, 2026**;
- transaction defects: **2 of 7 transactions**;
- tracking uploaded on time and validated: **7 of 7**;
- cases closed without seller resolution: **0 of 7**.

Management implication: the account is still operationally viable, but the current defect/customer-recovery period is too fragile to justify broad catalog growth.

## 2. Profitability gate — current controlling economics

The existing eBay profitability recovery work establishes:

- **30% pre-fee gross margin = hard working minimum**;
- **35%+ preferred**;
- final authorization requires **positive contribution after eBay fees, source shipping/freight, promoted listing fees, discounts/credits, and other variable costs**.

Operating formula:

`EXPECTED CONTRIBUTION = ITEM REVENUE + BUYER-PAID SHIPPING - LANDED SOURCE COST - EBAY FEES - PROMOTED LISTING FEES - ELEVATION-FUNDED DISCOUNTS/CREDITS - OTHER VARIABLE ORDER COSTS`

Because current eBay selling costs are already around 14% of gross sales, a listing sitting only at the 30% pre-fee floor has limited room for promotion or additional operational leakage.

### Advertising control

During Phase 1:

**PROMOTED LISTINGS SHOULD REMAIN OFF BY DEFAULT.**

Live Seller Hub commonly displays suggested ad rates around 9–14%. Adding that to existing ~14% eBay selling costs can erase the remaining contribution of listings that only barely pass the pre-fee margin screen.

Promotion should be authorized only when an exact SKU contribution model explicitly absorbs the ad rate and remains positive.

## 3. Current known loss / rebuild listings

### Immediate order-protection controls already approved

Authenticated Active Listings still shows these listings with saleable quantity even though existing control directs temporary quantity zero:

| Listing | Item ID | Live price | Live quantity | 30-day views | Current control |
|---|---|---:|---:|---:|---|
| Weed wacker | `168634712408` | $49.98 | **1** | 22 | **TEMP QTY 0 / DO NOT DELETE** until cancellation settles; known source cost exceeds sale price |
| Folding bed / cot | `168634722813` | $65.00 | **1** | 113 | **TEMP QTY 0 / PRESERVE HISTORY** while late orders are resolved and source/price are rebuilt |
| VEVOR spotlight | `168631043193` | $34.98 | **1** | 18 | **TEMP QTY 0 / DO NOT DELETE**; current sale/source/MAP structure fails |
| Back-seat organizer | `168634275726` | $24.33 | **0** | 6 | Already blocked; exact Doba account cost remains the fulfillment gate |

**Management risk:** the first three can still produce another order until the quantity-zero changes are actually executed and receipt-verified.

### Proven demand but current economics fail

- **Folding bed / cot:** repeated sales and 113 current 30-day views; actual fulfilled cost $44.46. Historical selling band is too thin after eBay costs. Preserve history; reprice/resource.
- **Boot dryer `168633017846`:** 42 views / 2 watchers; known $14.00 historical landed cost. Current $17.89 listing remains below the 30% screen. Preserve history; reprice/resource.
- **Lawn sweeper `168637439895`:** 36 views; $63.36 actual historical landed cost. Current $75.50 remains below the operating screen. Preserve demand; major reprice/resource.
- **RV screen guard `168633285491`:** only 2 views; current $37.66 against best known $32.37 pickup path is too thin before eBay fees. Reprice/rebuild or exit.

## 4. Phase 1 candidate screen — critical finding

PM4 exact-matched **9 high-signal active candidates** against the preserved Sep. 7 Doba export.

**Result: 9 of 9 fail the current 30% pre-fee gross-margin floor at current live eBay prices, even when using the cheaper known Doba pickup-with-prepaid-label path.**

| Candidate | Current disposition |
|---|---|
| VEVOR Car Refrigerator `D0102HQ4SWG` | `END / REBUILD` |
| 3x3m Waterproof Tent `D0102HHVH7A` | `END / REBUILD` |
| 6000W 48V Inverter `D01027RQ3N2` | `END / HOLD` |
| 95L ATV Cargo Box `D01027RSVIP` | `END / HOLD` |
| Walk-In Greenhouse `D0102HRMZW6` | `END / HOLD` |
| 1000LM Camping Lantern `D0102HS0G3P` | `END / HOLD` |
| 5.3 Gal Metal Fuel Can `D01027HX25W` | `END / REBUILD` |
| Group 24/27 Battery Box `D010277UEBX` | `END / REBUILD` |
| Portable 5 Gal Fuel Container `D01027HHGCG` | `END / HOLD` |

Several also fell below preserved Sep. 7 MAP values. Because MAP can change, those old MAP values should be treated as a hold/reverification signal rather than a claim of current MAP.

### Remaining unscreened candidate rows

Only three high-signal rows from the PM4 queue still require exact source/economics reconciliation:

1. RV Mattress — item `168633077471`, live $38.00, 28 views / 1 watcher.
2. Patio Gazebo 10x20 — item `168633889386`, live $115.00, 12 views.
3. VEVOR 50W Solar Charger + MPPT — item `168634158033`, live $59.00, 6 views, quantity 0.

These are **HOLD / VERIFY**, not approved core listings.

## 5. Owner/President Doba rule — must remain controlling

The September 11 Owner/President directive separates Doba sourcing from direct-manufacturer authorization.

For an exact SKU sourced through Doba, separate Elevation direct-manufacturer eBay authorization is not required solely because the underlying brand is VEVOR, Kingboss, Renogy, SOK, or another manufacturer.

The Doba path remains controlled by:

**EXACT SKU → EBAY ALLOWED → MAP/PRICE COMPLIANT → INVENTORY → DESTINATION → LANDED COST → POSITIVE CONTRIBUTION → FULFILLMENT RELIABILITY.**

Direct-manufacturer sourcing remains a separate path and still requires its own direct eBay authorization.

**Management correction required:** stale lower-level Worktree text saying Doba is “superseded as blanket eBay inventory authority” can be retained only if interpreted as “Doba is not an automatic blanket keep/list decision.” It must not be used to override the Owner/President rule or force removal of otherwise valid Doba-backed products merely because direct manufacturer permission is absent.

## 6. Documentation reconciliation required

`operations/EBAY_STORE_OPERATIONS_CURRENT_WORKTREE.md` is stale in two important places:

1. it still states authenticated Seller Hub is unavailable / required;
2. it contains older source-control wording that predates the Owner/President Doba-source clarification.

Current truth is:

- Opera Browser Connector can access authenticated Seller Hub read/navigation surfaces;
- consequential Seller Hub controls still require owner/manual clicks because the connector does not expose a generic submit/edit action;
- Doba product-level marketplace authority remains valid under the Owner/President directive;
- current order/cash truth is maintained in the later cash-release and PM4 handoff receipts.

Recommendation: after upper-management review, reconcile the Worktree into one current operating document rather than continuing to layer contradictory receipts.

## 7. Lithium / Hawaii listings — separate management review

Live Seller Hub contains multiple active Hawaii freight lithium listings, including:

- `168661406192` — 3 Pack KINGBOSS 12V 100Ah HAWAII FREIGHT — $914.99;
- `168661406193` — 1 Pack KINGBOSS 12V 100Ah HAWAII FREIGHT — $304.99;
- `168661652355` — 3 Pack KINGBOSS 12V 100Ah HAWAII FREIGHT — $931.99;
- `168661652359` — 1 Pack KINGBOSS 12V 100Ah HAWAII FREIGHT — $314.99.

These should **not** be evaluated as ordinary Doba parcel listings or swept into the generic catalog purge without Hawaii Lithium / Shipping & Logistics management review.

This RECON does not certify their current freight economics, compliance package, batch route, inventory, or production-release status. Upper management should explicitly confirm whether these four remain authorized live offers before the eBay specialist changes them.

## 8. Recommended streamlined eBay operating model

### Phase 0 — protect cash and seller account

1. Resolve the four awaiting-shipment obligations record by record.
2. Verify weed cancellation reaches terminal canceled/refunded state.
3. Never cancel a verified shipped/tracked order.
4. Re-read Payments after each recovery action.
5. Drive the current **8 / $242.79** held bucket toward release/settlement.

### Phase 1 — stop new losses

1. Execute and verify quantity zero for weed, cot, spotlight.
2. Keep organizer blocked until exact cost passes.
3. Do not activate promoted listings by default.
4. End/hold known unprofitable configurations after final open-order dependency check.
5. Hold ordinary parcel lithium unless exact source + lower-48 routing + DG handling + contribution pass.

### Phase 2 — contract to profitable core

1. Screen the 3 remaining high-signal candidates.
2. Purge 0–3-view / zero-watcher listings with no sales history or strategic source advantage.
3. Preserve useful sales/watchers history where a profitable rebuild is plausible.
4. Final active revenue core may be **fewer than 12**.
5. Every retained listing must have a named source, current cost, MAP/channel status, handling window, destination rules, and expected contribution.

### Phase 3 — scale only verified winners

After each sale:

**ORDER → SOURCE VERIFY → PLACE SUPPLIER ORDER IMMEDIATELY → POST TRACKING → CONFIRM DELIVERY → RECORD ACTUAL LANDED COST + EBAY FEES → CALCULATE ACTUAL CONTRIBUTION → KEEP/REPRICE/RESOURCE.**

Do not expand catalog count until the existing core demonstrates clean fulfillment and positive actual contribution.

## 9. Upper-management decisions requested

### APPROVE / REVISE

1. **Approve Phase 1 contraction:** target no more than ~12 active revenue listings; fewer is acceptable.
2. **Approve strict profitability gate:** 30% pre-fee minimum, 35%+ preferred, plus positive post-fee contribution.
3. **Approve advertising hold:** no promoted listings unless exact contribution remains positive after the ad rate.
4. **Approve immediate stop-new-loss controls:** quantity zero for weed, cot, spotlight; organizer remains zero until cost passes.
5. **Approve execution of the 9 failed candidate dispositions** after final open-order dependency checks.
6. **Approve stale Worktree reconciliation** after review so current Seller Hub access and Owner/President Doba sourcing language become the single operational truth.
7. **Confirm separate disposition of the four live Hawaii freight lithium listings** through Hawaii Lithium / Shipping & Logistics management before any eBay specialist action.

## Management control phrase

**DO NOT CHASE GROSS SALES. CONTROL SOURCE → CONTROL PRICE → CONTROL FULFILLMENT → RELEASE CASH → KEEP ONLY POSITIVE-CONTRIBUTION LISTINGS → SCALE WINNERS.**
