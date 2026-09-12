# Elevation UpScales — eBay Payout Hold Recovery Directive

**Date:** 2026-09-11  
**Owner:** Casey Young  
**Priority:** P0 FINANCIAL RECOVERY EXCEPTION  
**Primary Execution:** eBay Store Operations Worker  
**Oversight:** Peter Torres / Company Operations / MPM  
**State:** ACTIVE / LIVE SELLER HUB ROW-LEVEL RECON REQUIRED

## Owner-reported live state

Payments → All transactions currently shows:

- `On hold (8)`
- total held funds: **$242.79**
- eBay page states these funds are on hold while shipping details are confirmed, disputes are resolved, or a sale is finalized.

This is a material cash-flow issue and supersedes nonessential eBay listing expansion until the eight held transactions are reconciled.

## Key account-history evidence

On 2026-09-05 eBay confirmed that Elevation's seller privileges and listings were restored, but stated that funds from sales would remain available for payout only within **7 days after delivery confirmation**, including previously undistributed funds tied to undelivered orders. eBay further stated that faster normal payouts would resume only after ongoing successful delivery confirmations.

Therefore the current working diagnosis is:

**RECENT ACCOUNT RECOVERY + UNDELIVERED / UNTRACKED / UNRESOLVED ORDERS → TRANSACTION HOLDS.**

Do not treat this as a payout-card/bank failure unless Seller Hub shows an account-level payout/compliance hold separately.

## eBay hold-release controls

Current eBay guidance distinguishes:

- transaction holds tied to individual sales/order completion;
- dispute/case holds tied to buyer cases or payment disputes;
- account-level payout holds tied to account/compliance/performance issues.

For transaction holds, tracking/delivery confirmation is a primary release signal. Current sale notices in Elevation's mailbox state that:

- using an eBay tracked label can accelerate release after delivery;
- externally purchased tracked shipments are typically available within 7 days after delivery confirmation;
- without delivery confirmation, release may take materially longer and sale notices currently state funds are usually released about 14 days from the order date.

## Candidate eight-order set — RECON SEED ONLY

The count of eight owner-reported held transactions closely matches one pre-restoration undelivered sale plus seven post-restoration sales currently present in eBay email evidence. This is a **candidate map**, not authoritative until the Payments → On hold rows are read live.

Candidate order IDs:

1. `23-15100-64483` — folding bed — later refunded/closed; verify whether any residual hold row remains.
2. `25-15104-41137` — folding bed — late / no supplier confirmation found.
3. `10-15134-90489` — weed wacker — late / cancellation requested / economic failure.
4. `07-15141-13062` — folding bed — Sep. 10 ship-by; exact current fulfillment state requires Seller Hub reconciliation.
5. `20-15123-05140` — VEVOR flashlight — late / source economics + MAP failure / status unknown.
6. `12-15143-03510` — folding bed — supplier-confirmed shipped / eBay tracking visibility must be verified.
7. `03-15160-05408` — folding bed — Sep. 14 ship-by; exact current supplier/shipping state must be verified.
8. `02-15170-43443` — back-seat organizer — current paid order / ship-by Sep. 16 / exact source cost unresolved.

Do not assume this candidate set equals the eight live hold rows until Seller Hub confirms each row.

## Recovery workflow

### Step 1 — Read the eight live hold rows

For every On hold transaction capture:

**order ID → held amount → transaction type → hold reason → estimated release date → tracking status → delivery status → dispute/case state → buyer action needed.**

Do not rely only on email or public listing evidence when the live Payments row is available.

### Step 2 — Classify each hold

Use one state:

- `DELIVERED / WAITING RELEASE`
- `SHIPPED / TRACKING MISSING IN EBAY`
- `SHIPPED / TRACKING PRESENT / DELIVERY PENDING`
- `LATE UNFULFILLED / CANCEL-REFUND`
- `BUYER CANCELLATION REQUEST OPEN`
- `DISPUTE / CASE OPEN`
- `REFUNDED / RELEASE-CLOSE PENDING`
- `ACCOUNT-LEVEL HOLD / SUPPORT REQUIRED`

### Step 3 — Fix order truth before catalog work

**SHIPPED + TRACKING NOT POSTED** → add correct carrier/tracking immediately and verify visible.

**DELIVERED** → verify tracking shows delivered in eBay; record expected release date.

**LATE + UNFULFILLED + NON-ECONOMIC / NON-EXECUTABLE** → cancel/refund accurately rather than creating a worse late fulfillment; notify buyer once.

**BUYER CANCELLATION REQUEST** → respond within the eBay deadline after proving shipment state.

**DISPUTE / CASE** → respond in Seller Hub within the platform deadline with truthful supporting evidence.

**REFUNDED/CLOSED** → do not duplicate refund; confirm transaction hold is unwinding.

### Step 4 — Cash-release board

Maintain one short table:

| Order | Held Amount | Root Cause | Fix Executed | Delivery/Refund State | Expected Release | Actual Release |
|---|---:|---|---|---|---|---|

Close each line only when the hold is `Released` or the transaction is fully refunded/settled with no remaining company obligation.

## Priority order

1. Any dispute/case with a response deadline.
2. Any shipped/delivered order missing tracking in eBay.
3. Late unfulfilled/cancellation-requested orders.
4. Current orders still inside ship window.
5. Hold rows already delivered and merely waiting release.
6. Listing overhaul only after current held-order obligations are stabilized.

## Commercial control

Do not attempt to create new sales volume while existing fulfillment defects are preventing cash release.

Current company rule:

**FULFILL CLEANLY → POST TRACKING → CONFIRM DELIVERY → RELEASE CASH → THEN SCALE PROFITABLE LISTINGS.**

The eBay profitability overhaul remains active, but payout recovery comes first.

## Close condition

This P0 exception closes when:

- all eight live On hold rows are mapped to exact orders/reasons;
- every actionable shipping/cancellation/dispute defect is resolved;
- all delivered/shipped orders show correct tracking in eBay;
- held balance is reduced/released according to the verified transaction states;
- no account-level payout/compliance banner remains unresolved;
- the eBay lane has a repeatable shipment/tracking process that prevents new avoidable holds.