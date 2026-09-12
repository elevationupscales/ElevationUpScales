# Elevation UpScales — eBay Cash Release Board

**Date:** 2026-09-11  
**Owner:** Casey Young  
**Priority:** P0 FINANCIAL RECOVERY  
**Primary Execution:** eBay Store Operations Worker  
**Parent Directive:** `EBAY_PAYOUT_HOLD_RECOVERY_DIRECTIVE_2026-09-11.md`  
**State:** ACTIVE / AUTHENTICATED SELLER HUB ROW-LEVEL RECONCILIATION COMPLETE

## Live authenticated payment state

Authenticated Seller Hub Payments → All transactions now verifies:

- **Available funds (15)**
- **Processing (0)**
- **On hold (8)**
- **Payouts (2)**
- **Fees (23)**
- **Charges and payments (0)**
- **Repayment (0)**
- **Total on-hold bucket: $242.79**

On 2026-09-05 eBay restored seller privileges but stated that funds would remain available for payout only within **7 days after delivery confirmation**, including previously undistributed funds tied to undelivered orders, until a pattern of successful deliveries is re-established.

## Exact eight held transactions — authenticated Seller Hub

The eight rows reconcile exactly to **$242.79**:

| Order | Product | Held / pending proceeds | Live Seller Hub state | Required action |
|---|---|---:|---|---|
| `02-15170-43443` | Back-seat organizer | **$20.42** | **Funds on Hold** | Verify exact Doba account cost and fulfill only if executable/profitable before Sep. 16. |
| `12-15143-03510` | Folding bed | **$47.24** | **Funds on Hold** | **SHIPPED / TRACKING VERIFIED.** eBay already contains FedEx `876997666368`. Delivery monitor only; never cancel or duplicate tracking. |
| `20-15123-05140` | VEVOR spotlight | **$29.49** | **Funds on Hold** | Seller Hub shows ship-by Sep. 11 at 11:59 PM PDT and **Add tracking**; no uploaded tracking. Do not initiate known uneconomic late rescue without proven shipment/source. |
| `07-15141-13062` | Folding bed | **$42.89** | **Funds on Hold** | Seller Hub shows **Shipping overdue — Ship by Sep. 10** and **Add tracking**; no uploaded tracking. Resolve under late-order recovery control. |
| `10-15134-90489` | Weed wacker | **$42.29** | **Funds on Hold** | **UNSHIPPED / BUYER CANCELLATION OPEN.** Cancellation form has Accept selected; full refund $49.98; eBay fee credit $7.69. Submit cancellation/refund through a surface that supports the final Submit action. |
| `25-15104-41137` | Folding bed | **$42.70** | **Funds on Hold** | Seller Hub shows **Shipping overdue — Ship by Sep. 10** and **Add tracking**; no uploaded tracking. Resolve under late-order recovery control. |
| `19-15086-26754` | VEVOR boot/shoe dryer | **$8.85** | **On-hold bucket / Estimated release Sep. 12** | Monitor eBay release; no duplicate customer action. |
| `23-15073-41151` | VEVOR boot/shoe dryer | **$8.91** | **On-hold bucket / Estimated release Sep. 16** | Monitor eBay release; no duplicate customer action. |

**Exact total:** $20.42 + $47.24 + $29.49 + $42.89 + $42.29 + $42.70 + $8.85 + $8.91 = **$242.79**.

## Candidate-set correction

The prior provisional candidate set incorrectly treated refunded folding-bed orders `03-15160-05408` and `23-15100-64483` as possible live hold rows.

Authenticated Seller Hub now proves they are **not part of the eight-row $242.79 on-hold bucket**.

Therefore:

- `03-15160-05408` remains **CANCELED / REFUNDED / DO NOT REFUND AGAIN**.
- `23-15100-64483` remains **REFUNDED / CLOSED / DO NOT REFUND AGAIN**.
- The two additional live on-hold rows are the boot-dryer orders `19-15086-26754` and `23-15073-41151`.

## P0 order truth

### `12-15143-03510` — shipped cot

Authenticated Order Details verifies:

- order marked **Shipped**;
- FedEx tracking **876997666368** is already present in eBay;
- buyer-facing estimated delivery window: **Sep. 12–18, 2026**.

**Control:** delivery monitor only. Do not cancel and do not post duplicate tracking.

### `10-15134-90489` — weed wacker

Authenticated Seller Hub verifies:

- cancellation request genuinely open;
- cancellation ID `5453088317`;
- reason: `Won't arrive in time`;
- order detail shows **Add tracking**, not an existing tracking record;
- no shipped event is present;
- cancellation form has **Accept selected** and **Decline unselected**;
- full customer refund: **$49.98**;
- eBay fee credit: **$7.69**;
- final **Submit** action is required.

The current Opera Browser Connector exposes read/navigation capability but not a supported click/submit action, so no refund is falsely claimed as executed.

### `25-15104-41137` — late cot

Authenticated Order Details:

- **Shipping overdue**;
- **Ship by Sep. 10**;
- **Add tracking** present;
- no uploaded tracking found.

No supplier shipment confirmation is present in the current recovery evidence. Do not place a known uneconomic late rescue order merely to avoid cancellation.

### `07-15141-13062` — late cot

Authenticated Order Details:

- **Shipping overdue**;
- **Ship by Sep. 10**;
- **Add tracking** present;
- no uploaded tracking found.

No supplier shipment confirmation is present in the current recovery evidence. Resolve under the same late-order recovery control as the other cot.

### `20-15123-05140` — spotlight

Authenticated Order Details:

- **Ship by Sep. 11 at 11:59 PM PDT**;
- **Add tracking** present;
- no uploaded tracking found.

Known source economics are unacceptable at the sale price. Do not initiate a late uneconomic rescue without separately proven shipment/source execution.

### `02-15170-43443` — organizer

Still current with Sep. 16 ship-by. Exact Doba source is identified and public availability exists, but authenticated source cost remains the decisive fulfillment gate.

Working economics screen at the $24.33 sale price:

- 30% pre-fee landed-cost ceiling: **$17.03**;
- 35% preferred landed-cost ceiling: **$15.81**.

## Immediate execution order

1. **Manual eBay submission required:** on the open weed-wacker Cancel Details page, keep **Accept** selected and press **Submit**. Then receipt-verify the refund before any repeat action.
2. Preserve `12-15143-03510` as shipped/tracking-verified and monitor delivery.
3. Resolve `25-15104-41137` and `07-15141-13062` as late/untracked orders using the existing no-uneconomic-rescue recovery rule unless a real already-paid shipment is proven.
4. Resolve `20-15123-05140` before it becomes another overdue untracked order; do not create a negative-contribution rescue shipment.
5. Verify exact Doba economics for `02-15170-43443` and fulfill cleanly before Sep. 16 only if source economics pass.
6. Monitor `19-15086-26754` for estimated Sep. 12 release and `23-15073-41151` for estimated Sep. 16 release.

## Stop-new-holds control

Until these obligations are stabilized:

- do not scale eBay listing volume;
- do not permit another sale from a listing whose source cost/availability is not controlled;
- every shipped order must have carrier + tracking posted promptly;
- every cancellation/refund must be receipt-verified before any repeat action;
- preserve demand history only where the listing can be repriced/rebuilt profitably;
- the owner Doba-source rule remains controlling: lack of direct manufacturer eBay authorization alone does **not** require removal of a valid Doba-backed SKU.

**FULFILL CLEANLY → POST TRACKING → CONFIRM DELIVERY → RELEASE CASH → THEN SCALE PROFITABLE LISTINGS.**
