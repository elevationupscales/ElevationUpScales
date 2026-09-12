# Elevation UpScales — eBay Specialist Post-Approval RUN Receipt

**Date:** 2026-09-12 MDT  
**Owner:** Casey Young  
**Lane:** eBay Store Operations  
**Reporting Manager:** Peter Torres — Ecommerce & Vendor Operations Manager  
**State:** ACTIVE / MANAGEMENT APPROVAL RECEIVED / AUTHENTICATED READS LIVE / MUTATION CLICKS GATED ONLY

## Management approval adopted

PM4 approved the eBay profitability streamline and returned operational execution to this specialist lane in `PM4_EBAY_PROFITABILITY_STREAMLINE_MANAGEMENT_DECISION_2026-09-11.md`.

Approved controls remain:

- approximately 12 active revenue listings maximum during Phase 1; fewer is acceptable;
- 30% pre-fee gross-margin hard working minimum, 35%+ preferred;
- positive expected contribution after eBay fees and all other variable order costs required;
- promoted listings OFF by default unless exact modeled contribution remains positive after the ad rate;
- weed wacker, folding-bed/cot and spotlight stop-new-loss controls approved; organizer remains quantity zero until cost passes;
- nine failed screened candidates approved for their recorded END/REBUILD or END/HOLD dispositions after immediate open-order dependency checks;
- four Hawaii freight lithium listings excluded from generic eBay purge and routed to Hawaii Lithium / Shipping & Logistics review.

The Sep. 12 `COMMERCIAL_REVENUE_ACCELERATION_DIRECTIVE_2026-09-12.md` was checked before this receipt. It explicitly leaves the existing dedicated eBay recovery lane intact.

## Current execution-surface state

Opera Browser Connector initially returned `Browser not connected` during this RUN, then reconnected on the allowed retry. Authenticated Seller Hub read/navigation access is again working.

The available connector still does not expose a supported generic click/edit/submit action for the consequential listing and cancellation mutations. Therefore the remaining gate is narrow:

**AUTHENTICATED LIVE EVIDENCE IS AVAILABLE → DECISIONS CONTINUE → ONLY UNSUPPORTED SELLER HUB MUTATION CLICKS ARE GATED.**

No TinyFish use is authorized for this eBay lane.

## Live customer-order recheck

Authenticated Seller Hub was re-read after Opera reconnected.

### Weed wacker `10-15134-90489`

Live order detail still states:

- **Cancellation requested**;
- **Cancellation is in progress.**;
- **The cancellation is processing.**;
- **Add tracking** is present rather than a shipped/tracking record.

**Control:** do not resubmit cancellation and do not issue a duplicate refund. Wait for terminal canceled/refunded settlement, then end/drop the failed listing configuration.

### Folding bed `25-15104-41137`

Live order detail verifies:

- **Buyer paid**;
- **Shipping overdue — Ship by Sep 10**;
- **Add tracking** present;
- no tracking record surfaced in the authenticated recheck.

Current source/economics evidence still does not support a new uneconomic rescue order.

### Folding bed `07-15141-13062`

Live order detail independently verifies:

- **Buyer paid**;
- **Shipping overdue — Ship by Sep 10**;
- **Add tracking** present;
- no tracking record surfaced in the authenticated recheck.

Treat this as its own transaction; do not infer fulfillment from the separate cot that already shipped.

### Aggregate Awaiting Shipment queue

Authenticated Orders continues to show **Awaiting shipment (4)** consisting of:

- organizer `02-15170-43443` — ship by Sep. 16;
- spotlight `20-15123-05140` — ship by Sep. 11;
- cot `07-15141-13062` — overdue / ship by Sep. 10;
- cot `25-15104-41137` — overdue / ship by Sep. 10.

Fresh Gmail/eBay correspondence produced no newer supplier shipment or terminal eBay outcome that supersedes these live states.

Shipped cot `12-15143-03510` remains protected: do not cancel and do not duplicate tracking.

The last authenticated Payments snapshot remains **8 held rows / $242.79** until a new Payments read proves a change.

## Remaining high-signal candidate screen

### VEVOR 50W Solar Battery Charger + MPPT — item `168634158033`

**Live Seller Hub snapshot:**

- custom label / exact source SKU: `D01027RQ4GP-171040`;
- price: **$59.00**;
- quantity: **0**;
- 30-day views: **6**;
- 30% landed-cost ceiling at $59 sale: **$41.30**.

Fresh exact source evidence:

- historical Doba order confirmation for exact SKU `D01027RQ4GP`: **$39.92** total;
- corresponding shipped Doba order total: **$41.12**;
- exact historical store order: `16-15070-39144`;
- public Doba product evidence still identifies exact SKU `D01027RQ4GP`, ship-from United States, estimated 3-business-day processing, and prohibited marketplace field `Amazon; Temu; Walmart` — eBay not named;
- public Doba category evidence shows the exact product in stock with prepaid-label support, but current account price/inventory quantity remain login-gated.

Historical pre-fee screen at $41.12 landed vs $59 current listing = approximately **30.3% pre-fee gross margin**, only barely above the Phase 1 hard floor before eBay fees.

**Disposition:** `HOLD QTY 0 / PRIORITY CURRENT-COST REVERIFY`. Do not promote or reactivate solely from historical actuals. This is the strongest of the three unscreened rows because exact identity, historical fulfillment and current public availability are all proven, but current authenticated landed cost must still be refreshed before `CORE KEEP`.

### Patio Gazebo 10x20 — item `168633889386`

- custom label / source SKU: `D0102H93K7V-588191`;
- live price: **$115.00**;
- 30-day views: **12**;
- 30% landed-cost ceiling: **$80.50**;
- no exact Doba account-cost evidence was recovered from current Gmail/Git sources;
- external retail indexing matches product/SKU family `D0102H93K7V`, but third-party retail price is not a supplier landed-cost receipt and cannot authorize the eBay listing.

**Disposition:** `HOLD / VERIFY EXACT CURRENT SOURCE + COST`. Not approved core.

### RV Mattress, Full Size — item `168633077471`

- custom label: `81705331-523642`;
- live price: **$38.00**;
- 30-day views: **28**;
- watchers captured: **1**;
- 30% landed-cost ceiling: **$26.60**;
- no exact current source identity/cost/fulfillment receipt was recovered from current company sources.

**Disposition:** `HOLD / VERIFY EXACT SOURCE + COST + FULFILLMENT`. Demand signal alone does not qualify it for core status.

## Approved listing mutations still open

The following approved changes remain `OPEN TASK / ACTION SURFACE REQUIRED` because the connector can read/navigate but cannot press the consequential Seller Hub mutation controls:

1. weed wacker item `168634712408` → temporary quantity 0 now; end/drop only after cancellation becomes terminal;
2. folding-bed/cot item `168634722813` → temporary quantity 0 / preserve history while customer obligations resolve;
3. spotlight item `168631043193` → temporary quantity 0;
4. verify organizer item `168634275726` remains quantity 0;
5. execute the nine PM4-approved failed-candidate END/REBUILD or END/HOLD dispositions after immediate live open-order dependency check;
6. re-read Payments after customer/order actions and record the actual held-funds change.

Do not interpret this mutation-surface gate as permission to stop source/economics work or to send duplicate cancellations/refunds.

## Next RUN sequence

**CUSTOMER ORDER MUTATIONS THROUGH ACTION-CAPABLE SELLER HUB → CASH RELEASE → APPLY QTY-0 STOP-LOSS CONTROLS → EXECUTE NINE APPROVED DISPOSITIONS → CURRENT-COST REVERIFY SOLAR CHARGER → VERIFY GAZEBO + MATTRESS SOURCE → ZERO-DEMAND PURGE → VERIFY ACTIVE CORE COUNT → RECORD NEW BASELINE.**

## Control phrase

**CUSTOMER FIRST → CASH RELEASE → STOP NEW LOSSES → CURRENT SOURCE + CURRENT COST → POSITIVE CONTRIBUTION → CLEAN FULFILLMENT → SCALE ONLY WINNERS.**