# Elevation UpScales — eBay Cash Release Board

**Date:** 2026-09-11  
**Owner:** Casey Young  
**Priority:** P0 FINANCIAL RECOVERY  
**Primary Execution:** eBay Store Operations Worker  
**Parent Directive:** `EBAY_PAYOUT_HOLD_RECOVERY_DIRECTIVE_2026-09-11.md`  
**State:** ACTIVE / AUTHENTICATED SELLER HUB ROW-LEVEL RECONCILIATION COMPLETE / WEED CANCELLATION PROCESSING

## Live authenticated payment state

Authenticated Seller Hub Payments → All transactions verified:

- **Available funds (15)**
- **Processing (0)**
- **On hold (8)**
- **Payouts (2)**
- **Fees (23)**
- **Charges and payments (0)**
- **Repayment (0)**
- **Total on-hold bucket: $242.79**

On 2026-09-05 eBay restored seller privileges but stated that funds would remain available for payout only within **7 days after delivery confirmation**, including previously undistributed funds tied to undelivered orders, until a pattern of successful deliveries is re-established.

The browser disconnected before a post-cancellation Payments bucket reread, so the $242.79 / eight-row state remains the last authenticated payment snapshot until rechecked. Do not infer that the held total has already changed merely because the weed-wacker cancellation entered processing.

## Exact eight held transactions — authenticated Seller Hub

The last authenticated eight rows reconcile exactly to **$242.79**:

| Order | Product | Held / pending proceeds | Live Seller Hub state | Required action |
|---|---|---:|---|---|
| `02-15170-43443` | Back-seat organizer | **$20.42** | **Funds on Hold / Buyer paid / ship by Sep. 16 / Add tracking** | Verify exact Doba account cost and fulfill only if executable/profitable before Sep. 16. |
| `12-15143-03510` | Folding bed | **$47.24** | **Funds on Hold / SHIPPED / TRACKING VERIFIED** | eBay already contains FedEx `876997666368`. Delivery monitor only; never cancel or duplicate tracking. |
| `20-15123-05140` | VEVOR spotlight | **$29.49** | **Funds on Hold / ship by Sep. 11 11:59 PM PDT / Add tracking** | No uploaded tracking and no Doba order/confirmation/shipment evidence. Do not initiate known uneconomic rescue; customer recovery is the safe path unless a real shipment is separately proven. |
| `07-15141-13062` | Folding bed | **$42.89** | **Funds on Hold / Shipping overdue — Ship by Sep. 10 / Add tracking** | No uploaded tracking and no Doba order/confirmation/shipment evidence. Resolve as late unfulfilled order; do not place a new uneconomic rescue order. |
| `10-15134-90489` | Weed wacker | **$42.29** | **Funds on Hold / CANCELLATION PROCESSING** | Buyer cancellation was accepted. Seller Hub now states `Cancellation is in progress` / `The cancellation is processing.` Monitor until refund/settlement receipt; do not submit or refund again while processing. |
| `25-15104-41137` | Folding bed | **$42.70** | **Funds on Hold / Shipping overdue — Ship by Sep. 10 / Add tracking** | No uploaded tracking and no Doba order/confirmation/shipment evidence. Resolve as late unfulfilled order; do not place a new uneconomic rescue order. |
| `19-15086-26754` | VEVOR boot/shoe dryer | **$8.85** | **On-hold bucket / Estimated release Sep. 12** | Monitor eBay release; no duplicate customer action. |
| `23-15073-41151` | VEVOR boot/shoe dryer | **$8.91** | **On-hold bucket / Estimated release Sep. 16** | Monitor eBay release; no duplicate customer action. |

**Exact last-authenticated total:** $20.42 + $47.24 + $29.49 + $42.89 + $42.29 + $42.70 + $8.85 + $8.91 = **$242.79**.

## Candidate-set correction

Refunded folding-bed orders `03-15160-05408` and `23-15100-64483` are **not** part of the eight-row $242.79 on-hold bucket.

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

Authenticated Seller Hub now verifies:

- buyer cancellation was accepted;
- order remains unshipped with no tracking record;
- Seller Hub states **`Cancellation is in progress.`**;
- Seller Hub also states **`The cancellation is processing.`**;
- prior cancellation path showed full customer refund **$49.98** and eBay fee credit **$7.69**.

**Control:** do not submit again and do not issue a second refund. Monitor until eBay posts completed cancellation/refund/settlement evidence, then reconcile the hold bucket.

### `25-15104-41137` — late cot

Authenticated Order Details:

- **Shipping overdue**;
- **Ship by Sep. 10**;
- **Add tracking** present;
- no uploaded tracking found.

Fresh Gmail supplier recon finds **no Doba order confirmation or shipment record for this eBay order**. The only matching recent Doba cot fulfillment is order `12-15143-03510`, which is already mapped and shipped.

**Control:** treat as verified late/unfulfilled unless new supplier shipment evidence appears. Do not place a new known-uneconomic rescue order. Use eBay cancellation/refund recovery through a supported execution surface and receipt-verify before any repeat action.

### `07-15141-13062` — late cot

Authenticated Order Details:

- **Shipping overdue**;
- **Ship by Sep. 10**;
- **Add tracking** present;
- no uploaded tracking found.

Fresh Gmail supplier recon finds **no Doba order confirmation or shipment record for this eBay order**.

**Control:** same recovery path as `25-15104-41137`: verified late/unfulfilled absent new shipment evidence; no new uneconomic rescue order; cancel/refund through a supported execution surface and receipt-verify.

### `20-15123-05140` — spotlight

Authenticated Order Details:

- **Ship by Sep. 11 at 11:59 PM PDT**;
- **Add tracking** present;
- no uploaded tracking found.

Fresh Gmail supplier recon finds **no Doba order confirmation or shipment record for this eBay order**. Known Doba source economics are unacceptable at the sale price and the historical sale was below the recorded Doba MAP.

**Control:** do not place a late negative-contribution rescue order. If no real shipment appears, resolve the customer/order exception through eBay and receipt-verify the outcome.

### `02-15170-43443` — organizer

Authenticated Order Details verifies:

- **Buyer paid**;
- **Ship by Sep. 16 at 11:59 PM PDT**;
- **Add tracking** present;
- no tracking posted yet.

Exact Doba source is identified and public availability exists, but authenticated source cost remains the decisive fulfillment gate.

Working economics screen at the $24.33 sale price:

- 30% pre-fee landed-cost ceiling: **$17.03**;
- 35% preferred landed-cost ceiling: **$15.81**.

## Immediate execution order

1. **Weed wacker:** monitor cancellation processing to completed refund/settlement; do not resubmit.
2. Preserve `12-15143-03510` as shipped/tracking-verified and monitor delivery.
3. `25-15104-41137`: verified late + untracked + no Doba order/shipment evidence → cancel/refund recovery through supported eBay controls; receipt-verify.
4. `07-15141-13062`: verified late + untracked + no Doba order/shipment evidence → cancel/refund recovery through supported eBay controls; receipt-verify.
5. `20-15123-05140`: untracked + no Doba order/shipment evidence + bad economics → resolve customer/order exception rather than start a loss-making rescue shipment.
6. `02-15170-43443`: verify exact Doba economics and fulfill cleanly before Sep. 16 only if source economics pass.
7. Re-read Payments → On hold after the weed cancellation settles and after each additional recovery action; record the actual bucket change rather than estimating it.
8. Monitor `19-15086-26754` for estimated Sep. 12 release and `23-15073-41151` for estimated Sep. 16 release.

## Execution-surface limitation

The current Opera Browser Connector can read authenticated Seller Hub and navigate to exact order/detail URLs, but it does not expose a supported generic button-press/submit action for Seller Hub cancellation controls. Consequential eBay cancellation/refund submissions therefore require the owner to press the final eBay control in the authenticated browser, after which this worker can verify the result and continue automatically.

## Stop-new-holds control

Until these obligations are stabilized:

- do not scale eBay listing volume;
- do not permit another sale from a listing whose source cost/availability is not controlled;
- every shipped order must have carrier + tracking posted promptly;
- every cancellation/refund must be receipt-verified before any repeat action;
- preserve demand history only where the listing can be repriced/rebuilt profitably;
- the owner Doba-source rule remains controlling: lack of direct manufacturer eBay authorization alone does **not** require removal of a valid Doba-backed SKU.

**FULFILL CLEANLY → POST TRACKING → CONFIRM DELIVERY → RELEASE CASH → THEN SCALE PROFITABLE LISTINGS.**
