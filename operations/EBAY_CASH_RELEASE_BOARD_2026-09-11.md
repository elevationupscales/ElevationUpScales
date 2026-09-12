# Elevation UpScales — eBay Cash Release Board

**Date:** 2026-09-11  
**Owner:** Casey Young  
**Priority:** P0 FINANCIAL RECOVERY  
**Primary Execution:** eBay Store Operations Worker  
**Parent Directive:** `EBAY_PAYOUT_HOLD_RECOVERY_DIRECTIVE_2026-09-11.md`  
**State:** ACTIVE / SELLER HUB ROW-LEVEL CONFIRMATION REQUIRED

## Live owner-reported payment state

- Payments → All transactions: **On hold (8)**
- Aggregate held funds: **$242.79**
- Owner-reported page reason: shipping confirmation, disputes, or sale finalization.

On 2026-09-05 eBay restored seller privileges but stated that funds would remain available for payout only within **7 days after delivery confirmation**, including previously undistributed funds tied to undelivered orders, until a pattern of successful deliveries is re-established.

## Recovery diagnosis

Current Gmail reconciliation found **no new active payment-dispute, item-not-received, return-request, or account-restriction notice after seller privileges were restored**. The current evidence therefore points primarily to transaction-level fulfillment/delivery holds plus refunded/canceled rows that may still be unwinding.

The eight live Payments rows still must be read directly in authenticated Seller Hub before their individual held amounts/release dates can be treated as authoritative.

## Cash-release board

| Priority | Order | Sale | Current Evidence State | Root Cause / Risk | Required Seller Hub Action | Expected Hold Path |
|---|---|---:|---|---|---|---|
| P0-1 | `12-15143-03510` | $55.66 | **SUPPLIER-CONFIRMED SHIPPED / DO NOT CANCEL**. Doba `26091017391956`; FedEx `876997666368`; final Doba total $44.46. | Shipment exists but eBay tracking visibility remains unverified. | **Add/verify FedEx tracking immediately.** If already present, verify carrier + delivery state. Never cancel this order. | Delivery confirmation should start the post-restoration release clock; eBay stated funds are available within 7 days after delivery confirmation. |
| P0-2 | `10-15134-90489` | $49.98 | **BUYER CANCELLATION REQUEST OPEN / LATE**. Buyer response deadline Sep. 13. Buyer apology already sent. No supplier shipment evidence found. | Late + cancellation requested + known source economics are negative. | Prove shipped vs unshipped. **If unshipped, approve cancellation/refund. If shipped, do not cancel; add tracking.** Do not send duplicate apology. | Closed refund should unwind any residual hold; shipped path requires delivery confirmation. |
| P0-3 | `25-15104-41137` | $50.66 | **LATE / BUYER WAITING / NO SUPPLIER CONFIRMATION FOUND**. Ship-by Sep. 10. Sep. 11 eBay reminder offers Add Tracking. | No supplier evidence; known cot source is negative/thin at this sale price. | Prove shipment state. **If unshipped/no already-paid supplier shipment, cancel/refund + one in-platform apology. If shipped, add tracking + apologize for delay.** | Refund unwind or delivery-confirmation release. |
| P0-4 | `07-15141-13062` | $50.66 | **LATE / BUYER WAITING / NO SUPPLIER CONFIRMATION FOUND**. Ship-by Sep. 10. Sep. 11 eBay reminder offers Add Tracking. | Previously missing from the P0 worktree; same cot economics failure as other $50.66 cot sale. | Prove shipment state. **If unshipped/no already-paid supplier shipment, cancel/refund + one in-platform apology. If shipped, add tracking + apologize for delay.** | Refund unwind or delivery-confirmation release. |
| P0-5 | `20-15123-05140` | $34.98 | **SHIP-BY SEP. 11 / NO LATER SUPPLIER OR SHIPMENT EVIDENCE FOUND**. | Known Doba source was below MAP at sale price and economically unacceptable. | Prove current state. **If unshipped/no supplier shipment, cancel/refund + buyer update. If shipped, add tracking.** | Refund unwind or delivery-confirmation release. |
| P0-6 | `02-15170-43443` | $24.33 | **CURRENT / SHIP-BY SEP. 16**. Exact Doba source `D01027H21KW` found in stock; authenticated price remains unresolved. | Avoid creating another late hold; source economics must be proven before ordering. | Verify exact Doba account cost now. Fulfill only if source path is executable and contribution is acceptable; at the working screen, landed source cost must be ≤ $17.03 for 30% pre-fee gross margin. | Proper tracked fulfillment → delivery-confirmation release. If source fails, resolve customer exception before deadline. |
| CLOSED | `03-15160-05408` | $50.66 | **CANCELED / REFUNDED CONFIRMED BY EBAY** on Sep. 10, Cancel ID `5453036060`. | Candidate hold row may be residual settlement only. | **DO NOT REFUND AGAIN.** If present in On hold, verify row is marked refunded/settling and record expected unwind date. | Residual hold should unwind through eBay settlement. |
| CLOSED | `23-15100-64483` | $50.66 | **REFUNDED / BUYER CONFIRMED CREDIT**. | Candidate residual hold row only. | **DO NOT REOPEN OR REFUND AGAIN.** If present in On hold, record settlement/release state only. | Residual hold should unwind through eBay settlement. |

## Aggregate reconciliation note

The six still-live post-restoration sale amounts listed above total **$266.27**. The owner-reported held balance is **$242.79**, a difference of **$23.48**. This is consistent with the held figure being net transaction proceeds after selling costs/adjustments, but it is **not proof of the eight row-level mappings**. Seller Hub Payments → On hold remains authoritative for each held transaction.

## Immediate execution order

1. `12-15143-03510` — post/verify FedEx tracking first because a real shipment exists and delivery confirmation is the cleanest cash-release signal.
2. `10-15134-90489` — resolve the open buyer cancellation request before Sep. 13 after shipment-state proof.
3. `25-15104-41137` — resolve late cot truth: tracking if shipped, otherwise cancel/refund + apology.
4. `07-15141-13062` — same late cot resolution.
5. `20-15123-05140` — resolve flashlight truth immediately; do not initiate an uneconomic late rescue order.
6. `02-15170-43443` — verify Doba cost/source and fulfill cleanly before Sep. 16 or resolve exception before it becomes late.
7. For `03-15160-05408` and `23-15100-64483`, verify settlement only; no duplicate refunds.
8. Read all eight live On hold rows and add per-row held amount, hold reason, and expected release date to this board.

## Stop-new-holds control

Until these obligations are stabilized:

- do not scale eBay listing volume;
- do not permit another sale from a listing whose source cost/availability is not controlled;
- every shipped order must have carrier + tracking posted promptly;
- every cancellation/refund must be receipt-verified before any repeat action;
- preserve demand history only where the listing can be repriced/rebuilt profitably.

**FULFILL CLEANLY → POST TRACKING → CONFIRM DELIVERY → RELEASE CASH → THEN SCALE PROFITABLE LISTINGS.**
