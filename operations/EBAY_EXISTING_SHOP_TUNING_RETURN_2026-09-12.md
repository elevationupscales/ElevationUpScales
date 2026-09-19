# ELEVATION UPSCALES — EBAY EXISTING-SHOP TUNING RETURN

**Date:** 2026-09-12  
**Parent control:** `MPM5_EXISTING_SHOPS_TUNING_DIRECTIVE_2026-09-12.md`  
**Owning Worktree:** `EBAY_STORE_OPERATIONS_CURRENT_WORKTREE.md`  
**State:** P0 CUSTOMER/CASH + REPEAT-LOSS TUNING / LIVE AUTHENTICATED EVIDENCE

## Live authenticated Seller Hub state

### Awaiting shipment

Seller Hub currently shows **4 awaiting shipment** with total order value **$173.06**.

| Order | Item | Listing | Live state | Current action |
|---|---|---|---|---|
| `02-15170-43443` | Back-seat organizer | `168634275726` / `D01027H21KW-411229` | CURRENT / ship by Sep 16 / no tracking | Verify exact landed cost and fulfill only if contribution/source execution is clean; otherwise customer-protect. Listing quantity is already 0. |
| `20-15123-05140` | VEVOR spotlight | `168631043193` / `D010277TCB2-470279` | **OVERDUE / ship by Sep 11 / no tracking** | Customer recovery first. Listing remains live at quantity 1 despite approved stop-loss. |
| `07-15141-13062` | Folding bed | `168634722813` / `D0102X33W6W-489631` | **OVERDUE / ship by Sep 10 / no tracking** | Customer recovery first. Same failed listing remains live at quantity 1. |
| `25-15104-41137` | Folding bed | `168634722813` / `D0102X33W6W-489631` | **OVERDUE / ship by Sep 10 / no tracking** | Treat separately from the other folding-bed transaction. Same failed listing remains live at quantity 1. |

The folding-bed active-listing row also shows an unread buyer message. Customer communication therefore remains part of the immediate obligation queue.

## Weed-wacker cancellation

Seller Hub Cancellations currently shows exactly **1 open cancellation**:

- item `168634712408`;
- Cancel ID `5453088317`;
- status **Cancellation requested**;
- requested Sep 10, 2026;
- reason **Won't arrive in time**;
- refund amount shown **$49.98**.

This cancellation is **not terminal**. Do not resubmit cancellation and do not issue a duplicate refund.

## Financial / held-cash state

Seller Hub Payments currently reports:

- **Your total funds: $242.79**;
- **On hold: $242.79**;
- **Available funds: $0.00**;
- no upcoming payout;
- recent completed payout: $47.93 to the account's existing payout method on Sep 10.

Visible held order amounts reconcile to the $242.79 total when current and older pending-release rows are included:

- organizer `02-15170-43443`: $20.42;
- shipped cot `12-15143-03510`: $47.24;
- spotlight `20-15123-05140`: $29.49;
- folding bed `07-15141-13062`: $42.89;
- weed wacker `10-15134-90489`: $42.29;
- folding bed `25-15104-41137`: $42.70;
- earlier VEVOR shoe-dryer pending release rows: $8.85 + $8.91.

Total = **$242.79**.

## Live active-listing exposure

Seller Hub currently shows **149 ACTIVE listings**.

Exact approved stop-loss products were rechecked:

| Listing | Product | Current live quantity | Tuning disposition |
|---|---|---:|---|
| `168634275726` | Back-seat organizer | **0** | PASS — stop-new-loss control already applied; preserve while open order is resolved. |
| `168634722813` | Folding bed | **1** | **FAIL — REPEAT-LOSS EXPOSURE. Set quantity 0 / preserve listing history while customer obligations are resolved, then rebuild source/price before any new sale.** |
| `168631043193` | VEVOR spotlight | **1** | **FAIL — REPEAT-LOSS EXPOSURE. Set quantity 0; no new sale under failed economics.** |
| `168634712408` | Weed wacker | **1** | **FAIL — REPEAT-LOSS EXPOSURE. Set quantity 0 immediately while cancellation is pending; after cancellation is terminal, end/drop failed configuration.** |

All three failed listings are currently capable of taking another order. This is the highest current eBay tuning defect because it can create additional customer obligations and cash loss before older obligations are closed.

Seller Hub also presents Promoted Listings eligibility/rates on these products. **Do not activate promotion.** Company-wide paid-acquisition lock remains controlling.

## Execution-surface boundary

The authenticated Opera browser connection proves current state and can navigate/read Seller Hub, but the available connector does not expose a supported action method for consequential listing edits, cancellation approval/refund, tracking submission or buyer-message mutation.

Therefore the following exact actions are:

**OPEN TASK / ACTION-CAPABLE SELLER HUB SURFACE REQUIRED**

1. set weed-wacker `168634712408` quantity → 0;
2. set folding-bed `168634722813` quantity → 0;
3. set spotlight `168631043193` quantity → 0;
4. read/respond to the folding-bed unread buyer message under customer-recovery controls;
5. resolve the three overdue shipment obligations through the correct cancel/refund/fulfillment outcome;
6. monitor weed-wacker cancellation `5453088317` to terminal state without duplicate action.

The organizer listing already passes the quantity-zero stop-loss gate and must not be needlessly edited.

## Management disposition

**EBAY REMAINS P0.**

Current sequence:

**STOP THE 3 LIVE REPEAT-LOSS LISTINGS → CUSTOMER MESSAGES / OVERDUE ORDERS → WEED-WACKER TERMINAL CANCELLATION → RELEASE/ISOLATE $242.79 HELD CASH → CONTRACT 149 ACTIVE LISTINGS TOWARD THE VERIFIED PROFITABLE CORE → THEN TUNE THE REMAINING STORE.**

Do not bulk purge Hawaii freight lithium listings; they remain protected through Shipping/Hawaii Lithium controls.

No DEV role exists in these Seller Hub actions.
