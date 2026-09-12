# Elevation UpScales — eBay Payout Hold Cash Release Queue

**Date:** 2026-09-11  
**Owner:** Casey Young  
**State:** ACTIVE / LIVE SELLER HUB CONFIRMATION REQUIRED  
**Parent:** `EBAY_PAYOUT_HOLD_RECOVERY_DIRECTIVE_2026-09-11.md`

## Live owner-reported payment state

- On hold transactions: **8**
- Total held: **$242.79**

The live Payments → On hold rows remain authoritative for exact held amount and release date per order.

## Current recovery queue

| Order | Current evidence state | Cash-release classification | Immediate action |
|---|---|---|---|
| `23-15100-64483` | Refunded; buyer confirmed refund credited | `REFUNDED / HOLD-UNWIND VERIFY` | Verify On hold row is released/closed; no duplicate refund or buyer contact |
| `25-15104-41137` | Late; ship-by Sep. 10; no supplier confirmation found | `LATE UNFULFILLED / RESOLUTION REQUIRED` | Verify Seller Hub live state; if unshipped and no paid supplier shipment exists, cancel/refund + buyer update rather than late uneconomic fulfillment |
| `10-15134-90489` | Weed wacker; late; buyer requested cancellation; apology already sent; economics fail | `BUYER CANCELLATION REQUEST / RESOLUTION REQUIRED` | Verify unshipped state; approve cancellation/refund if still unshipped; do not place rescue order |
| `07-15141-13062` | Folding bed; ship-by Sep. 10; no current source/shipment evidence recovered in payout sweep | `STATUS UNKNOWN / LIVE VERIFY` | Read Seller Hub + supplier source; ship/tracking if already validly fulfilled, otherwise resolve truthfully |
| `20-15123-05140` | VEVOR flashlight; ship-by Sep. 11; no later shipment confirmation; economics/MAP fail | `LATE OR AT-RISK / LIVE VERIFY` | Verify Seller Hub/source; if already shipped post tracking, otherwise cancel/refund if non-executable; correct listing afterward |
| `12-15143-03510` | Doba-confirmed shipped; FedEx `876997666368`; eBay tracking visibility not proven | `SHIPPED / TRACKING-IN-EBAY VERIFY` | Highest-value hold-release action: confirm FedEx tracking is visibly attached in eBay and monitor delivery/release date |
| `03-15160-05408` | Successfully canceled/refunded Sep. 10 | `CANCELED / HOLD-UNWIND VERIFY` | Verify Payments hold row is unwinding/closed; no further fulfillment |
| `02-15170-43443` | Back-seat organizer; paid; ship-by Sep. 16; source in stock but protected exact cost unresolved | `CURRENT / PROFIT + FULFILLMENT VERIFY` | Resolve exact source cost and fulfill only if executable/profitable; post tracking immediately when shipped |

## Priority sequence

1. `12-15143-03510` — ensure tracking is actually in eBay now.
2. `10-15134-90489` — cancellation request must be resolved before deadline / further account damage.
3. `25-15104-41137` — late unfulfilled status must be resolved.
4. `20-15123-05140` — ship-by reached; resolve now.
5. `07-15141-13062` — exact current shipment state.
6. `02-15170-43443` — current paid order; prevent another late hold.
7. `23-15100-64483` + `03-15160-05408` — verify hold release/unwind only.

## Release logic

From eBay account-history evidence:

- after the Sep. 5 seller-privilege restoration, proceeds were placed under a performance-style delivery-confirmation hold;
- eBay stated funds would become available within 7 days after delivery confirmation during this recovery period;
- current sale notices also state that tracked delivery can accelerate funds release, while missing delivery confirmation extends the hold timeline.

Therefore the operating focus is:

**POST VALID TRACKING → GET DELIVERY CONFIRMATION → RESOLVE LATE/CANCELED ORDERS → LET CLOSED REFUNDS UNWIND → WATCH ON-HOLD → RELEASED.**

## Required live capture

When authenticated Seller Hub is available, add for each of the 8 actual On hold rows:

- held amount;
- exact hold reason;
- estimated release date;
- tracking carrier/number shown by eBay;
- delivery status;
- open case/dispute yes/no;
- resolution action;
- actual Released timestamp.

Do not assume the candidate order set equals the eight live rows until the Payments filter confirms it.