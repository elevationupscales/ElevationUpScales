# Elevation UpScales — PM4 → eBay Store Operations Specialist Handoff

**Date:** 2026-09-11 MDT  
**Owner:** Casey Young  
**From:** Operating System Project Manager — PM4  
**To:** eBay Store Operations Worker / Specialist  
**State:** HANDOFF ACTIVE / PM4 EXECUTION STOPPED BY OWNER  
**Instruction:** ADOPT CURRENT EBAY WORKTREE → READ PM4 RECEIPTS → CONTINUE EXECUTION IN EBAY LANE

## Owner direction

Casey directed PM4 to **STOP, SAVE, AND PASS WORK TO THE LOWER EBAY SPECIALIST**.

PM4 must not continue operational eBay execution after this handoff unless re-directed by the owner.

The dedicated eBay Store Operations Specialist now owns the next executable eBay recovery/contraction actions under Peter Torres / Company Operations oversight.

## Read these new PM4 receipts first

1. `operations/EBAY_PROFITABILITY_RECOVERY_RECON_2026-09-11.md`
2. `operations/EBAY_PHASE1_CORE_SELECTION_EXECUTION_2026-09-11.md`
3. `operations/EBAY_PHASE1_LIVE_CANDIDATE_SKU_SNAPSHOT_2026-09-11.md`
4. `operations/EBAY_PHASE1_COST_SCREEN_BATCH_2026-09-11.md`
5. `operations/EBAY_CASH_RELEASE_BOARD_2026-09-11.md`
6. `operations/EBAY_CONTRACTION_BATCH_01_2026-09-11.md`
7. `operations/EBAY_STORE_CONTRACTION_AND_DIRECT_SOURCE_REBUILD_2026-09-11.md`
8. `operations/EBAY_STORE_OPERATIONS_CURRENT_WORKTREE.md`

## Important PM4 commits

- `4be52997398c6cad12217eefe8d78ef3c27aa9b3` — eBay profitability recovery recon
- `4529d5768393b81fa4371082f16fa95be6e9dcd2` — exact eight held transactions reconciled
- `3c2f0fd69305d92be5e4d2cc319c83de90c9ea70` — Phase 1 profitable-core selection execution
- `c09d2a609acba41292d3be45419cf7c62d48e4fa` — live candidate SKU snapshot
- `5b5ac89036fefaa62ccd742daff5dca0351f5cda` — live candidate Doba economics screen

## Live authenticated Seller Hub truth captured by PM4

### Account / performance

Authenticated Seller Hub showed:

- Total sales: **$485.29** current 31-day view
- Net sales: **$386.53** before supplier/product cost
- eBay selling costs: approximately **$66.39 / 14% of gross sales**
- Impressions: **104,797**
- Listing views: **900**
- CTR: **0.8%**
- Sales conversion: **1.6%**
- Seller level: **Above Standard**
- Next evaluation: **2026-09-20**
- Transaction defects: **2 of 7**
- Tracking uploaded on time/validated: **7 of 7**
- Cases closed without seller resolution: **0 of 7**

### Held funds

Payments still showed:

- **On hold (8)**
- prior reconciled total: **$242.79**

No reduction in the held-row count was observed during the PM4 handoff run.

## Current order truth

### `10-15134-90489` — weed wacker

- Seller Hub showed **Cancellation is in progress / cancellation processing**.
- Known Doba source candidate cost exceeds the eBay sale price before fees.
- **Do not place a rescue supplier order.**
- Recheck terminal canceled/refunded state, then end/drop the listing.

### `25-15104-41137` — folding bed

- Seller Hub verified **Shipping overdue — Ship by Sep. 10**.
- **Add tracking** is present.
- No uploaded tracking was visible.
- Existing source economics fail the operating screen.
- Resolve customer obligation before ending/rebuilding listing.

### `07-15141-13062` — folding bed

- Seller Hub verified **Shipping overdue — Ship by Sep. 10**.
- **Add tracking** is present.
- No uploaded tracking was visible.
- Existing source economics fail the operating screen.
- Resolve customer obligation before ending/rebuilding listing.

### `20-15123-05140` — VEVOR spotlight

- Seller Hub showed **Ship by Sep. 11 at 11:59 PM PDT**.
- **Add tracking** is present.
- No uploaded tracking was visible.
- Historical sale/source economics fail and prior MAP evidence was unfavorable.
- Resolve customer obligation, then end/hold current listing configuration.

### `02-15170-43443` — back-seat organizer

- Seller Hub showed **Ship by Sep. 16 at 11:59 PM PDT**.
- **Add tracking** is present.
- Current customer obligation remains active.
- Exact Doba source is known; current authenticated cost remained unresolved in PM4.
- 30% source-cost ceiling at current sale = **$17.03**; 35% preferred ceiling = **$15.81**.

### `12-15143-03510` — shipped cot

- Prior authenticated recon verified shipped with FedEx tracking already present.
- **DO NOT CANCEL / DO NOT DUPLICATE TRACKING.**
- Delivery-monitor / payout-release only.

## Store-contraction result

Owner-directed control remains:

**NO MORE THAN ~12 ACTIVE REVENUE LISTINGS DURING PHASE 1.**

Twelve is a cap, not a quota.

### Nine live high-signal candidate listings were exact-matched against the Sep. 7 Doba export

**All 9 fail the 30% pre-fee gross-margin floor at current live eBay prices.**

Current dispositions:

- `D0102HQ4SWG` VEVOR car refrigerator → `END / REBUILD`
- `D0102HHVH7A` 3x3m waterproof tent → `END / REBUILD`
- `D01027RQ3N2` 6000W inverter → `END / HOLD`
- `D01027RSVIP` ATV cargo box → `END / HOLD`
- `D0102HRMZW6` VEVOR greenhouse → `END / HOLD`
- `D0102HS0G3P` camping lantern → `END / HOLD`
- `D01027HX25W` metal fuel can → `END / REBUILD`
- `D010277UEBX` group 24/27 battery box → `END / REBUILD`
- `D01027HHGCG` portable fuel container → `END / HOLD`

Several were also below the preserved Sep. 7 MAP values. Use fresh supplier verification before making a current MAP claim, but treat the mismatch as a hold/end trigger.

## Remaining unscreened high-signal rows

These still require exact source/economics verification:

1. RV Mattress — eBay item `168633077471`, custom label `81705331-523642`, live $38.00, 28 views / 1 watcher.
2. Patio Gazebo 10x20 — eBay item `168633889386`, custom label `D0102H93K7V-588191`, live $115.00, 12 views.
3. VEVOR 50W Solar Charger + MPPT — eBay item `168634158033`, custom label `D01027RQ4GP-171040`, live $59.00, 6 views, live quantity 0.

Historical Gmail confirms a 50W solar charger order existed in August, but do not assume it is the exact current listing/source without exact SKU reconciliation.

## Advertising control

During Phase 1 recovery:

**NO PROMOTED LISTING UNLESS THE EXACT SKU CONTRIBUTION MODEL ABSORBS THE AD RATE AND REMAINS POSITIVE.**

Live Seller Hub commonly showed suggested ad rates around **9–14%**. Current eBay selling costs are already around 14% of gross sales, so ads can erase the residual margin on thin items.

## Direct-vendor authorization state

Do not silently replace Doba with direct vendor supply.

Current PM4 mailbox check found no new direct eBay-marketplace authorization from SOK or Kingboss during this run.

VEVOR has provided current reseller/PRO information and price-floor guidance, but use the dedicated VEVOR project/source-of-truth to determine whether direct eBay marketplace use is currently authorized before switching any listing.

Renogy direct remains separately controlled and is not an automatic eBay source.

## Next executable eBay specialist sequence

**GIT FIRST → READ THIS HANDOFF → AUTHENTICATED SELLER HUB → CUSTOMER ORDERS FIRST → CASH RELEASE → END KNOWN LOSERS → VERIFY 3 REMAINING CANDIDATES → ZERO-DEMAND PURGE → VERIFY ACTIVE COUNT → RECORD NEW BASELINE.**

Specifically:

1. Recheck the four current Awaiting Shipment obligations and resolve them record-by-record.
2. Recheck weed-wacker cancellation reaches terminal canceled/refunded state.
3. Do not cancel any order with verified shipment/tracking.
4. Execute approved `END / DROP` / `END / HOLD` listing dispositions only after immediate open-order dependency check.
5. Screen the 3 remaining unscreened candidate rows.
6. Purge zero/near-zero-demand listings with no strategic source advantage.
7. Reduce active revenue listings toward the Phase 1 cap; the final core may be fewer than 12.
8. Keep only exact source + channel-authorized + profitable + executable listings.
9. Record actual order contribution after every future sale.
10. Do not turn promoted listings back on by default.

## PM4 stop condition

PM4 has stopped eBay execution per owner direction.

The lower eBay Store Operations Specialist is now the active execution owner for this lane.

**CONTROL PHRASE:**

**CUSTOMER FIRST → CASH RELEASE → END LOSERS → VERIFY SOURCES → KEEP ONLY PROFITABLE LISTINGS → SCALE AFTER ACTUAL PROFIT.**
