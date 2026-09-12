# PM4 → eBay Store Operations Specialist Handoff

**Date:** 2026-09-11 MDT  
**Owner:** Casey Young  
**From:** Operating System Project Manager — PM4  
**To:** eBay Store Operations Worker / Specialist  
**Status:** ACTIVE HANDOFF — PM4 STOPPED / EBAY SPECIALIST OWNS EXECUTION

## Owner direction

Casey directed PM4 to **STOP, SAVE, AND PASS WORK TO THE LOWER EBAY SPECIALIST**.

PM4 is therefore ending direct execution in the eBay lane and will not duplicate specialist actions.

## Required controlling reads

Adopt these current records before acting:

1. `operations/EBAY_STORE_OPERATIONS_CURRENT_WORKTREE.md`
2. `operations/EBAY_RECOVERY_RECON_2026-09-11.md`
3. `operations/PM4_EBAY_AUTHENTICATED_RECOVERY_DELTA_2026-09-11.md`
4. current latest eBay specialist reconciliation on `main`

## PM4 verified state to inherit

Authenticated Seller Hub was successfully reached through the Opera Browser Connector during PM4's run.

### Awaiting shipment — verified

Seller Hub reported **4 awaiting-shipment orders**:

- `02-15170-43443` — SKU `D01027H21KW-411229` — ship by Sep. 16 — Add Tracking available.
- `20-15123-05140` — SKU `D010277TCB2-470279` — ship by Sep. 11 — Add Tracking available.
- `25-15104-41137` — SKU `D0102X33W6W-489631` — overdue; ship by Sep. 10.
- `07-15141-13062` — SKU `D0102X33W6W-489631` — overdue; ship by Sep. 10.

`07-15141-13062` is the additional second folding-bed order discovered during PM4 recon and must remain its own transaction row.

### Weed-wacker cancellation — verified

Order `10-15134-90489`:

- buyer paid;
- no shipped event was present;
- Seller Hub showed `Cancellation is in progress` / `Cancellation requested`;
- `Add tracking` was still available;
- cancellation reason: `Won't arrive in time`;
- full refund path shown: `$49.98`;
- cancel ID recorded in PM4 delta: `5453088317`.

PM4 did not accept/decline or submit the refund because the available Opera connector was read/navigation only for this control.

### Shipped cot — verified

Order `12-15143-03510`:

- marked shipped Sep. 11, 2026;
- eBay tracking present: `876997666368`;
- buyer delivery window shown: Sep. 12–18, 2026.

Disposition: **SHIPPED / TRACKING VERIFIED / DELIVERY MONITOR ONLY**. Do not duplicate tracking or cancel.

### Supplier evidence pass

Fresh Gmail reconciliation found **no Doba order confirmation or shipment confirmation** for the unresolved flashlight, either folding-bed order, or organizer SKU set above.

Do not invent tracking and do not create a known uneconomic rescue order merely to preserve a failed sale.

## Specialist execution priority

1. Reconcile the specialist's latest eight-transaction recovery state against the PM4 authenticated delta.
2. Execute the weed-wacker cancellation/refund through an action-capable authenticated eBay surface.
3. Resolve the flashlight and both folding-bed orders from exact supplier evidence and economics; if there is no valid fulfillment path, follow customer-recovery controls rather than guessing shipment.
4. Preserve the organizer until exact landed cost/source economics clear.
5. Monitor the shipped cot only.
6. After customer recovery, continue listing/economics cleanup so the same low-margin or unsupported listings do not create repeat failures.

## Control rules

- **CUSTOMER RECOVERY FIRST.**
- **AUTHENTICATED FACTS FIRST.**
- **DO NOT GUESS TRACKING.**
- **DO NOT PLACE UNECONOMIC RESCUE ORDERS.**
- **DO NOT DUPLICATE PM4 OR ANOTHER EBAY WORKER'S ACTIONS.**
- Record every completed mutation and final order state back to Git.

## PM4 state after handoff

**STOPPED BY OWNER DIRECTION.**

No additional Kingboss, Renogy, VEVOR, supplier, storefront, or broader Operating System execution is authorized under this RUN after this handoff file is committed.
