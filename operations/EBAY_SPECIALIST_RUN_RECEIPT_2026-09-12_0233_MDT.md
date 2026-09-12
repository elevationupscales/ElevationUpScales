# Elevation UpScales — eBay Specialist RUN Receipt

**Date:** 2026-09-12 02:33 MDT  
**Owner:** Casey Young  
**Lane:** eBay Store Operations  
**State:** ACTIVE / GIT RE-RESOLVED / OPERA TEMPORARILY DISCONNECTED / SOURCE RECON CONTINUED

## Git control adopted

Current `main` was re-resolved repeatedly during this RUN because other lanes were committing concurrently. The newest eBay-relevant control adopted from `main` is the owner-level no-paid-acquisition rule applied to the eBay Worktree:

- `OWNER_DIRECTIVE_NO_PAID_ADS_UNTIL_CAPITAL_RECOVERY_2026-09-12.md` is controlling;
- no Promoted Listings or other paid marketplace acquisition is authorized until the capital-recovery hole is closed and Casey explicitly reopens paid acquisition;
- organic/free marketplace exposure remains allowed under existing profitability controls.

Existing eBay recovery/contraction rules remain unchanged:

- approximately 12 active revenue listings maximum, fewer acceptable;
- 30% pre-fee hard working minimum / 35%+ preferred;
- positive expected contribution after all variable costs required;
- customer obligations and cash release first;
- Doba-backed eBay sourcing follows exact-SKU product-level controls and does not require separate direct-manufacturer eBay authorization solely because of brand;
- four Hawaii freight lithium listings remain excluded from generic eBay purge.

## Browser execution state

Opera Browser Connector was tested twice under the normal safe-retry rule.

Both attempts returned `Browser not connected`.

Therefore this RUN did not claim any Seller Hub mutation, cancellation, refund, quantity change, listing end, tracking update, or payout change.

The blocker is bounded to the authenticated browser surface. It does not block Git, source, economics, Gmail, or supplier follow-up work.

No TinyFish use was authorized or attempted.

## Customer / order evidence refresh

Fresh Gmail search of eBay and Doba correspondence produced no new shipment, cancellation, refund, payout, or supplier-order receipt superseding the last authenticated Seller Hub truth.

Until a new authenticated Seller Hub read proves otherwise, the controlling queue remains:

- weed wacker `10-15134-90489` — cancellation processing; do not duplicate refund/cancellation;
- cot `25-15104-41137` — overdue / no verified tracking;
- cot `07-15141-13062` — overdue / no verified tracking;
- spotlight `20-15123-05140` — unresolved awaiting shipment / no verified supplier shipment;
- organizer `02-15170-43443` — paid, ship-by Sep. 16, exact current Doba economics unresolved;
- shipped cot `12-15143-03510` — protected / do not cancel / do not duplicate tracking;
- last authenticated held-funds state remains 8 rows / $242.79 until Payments is re-read.

## Organizer source gate — `D01027H21KW`

Doba account manager follow-up is already outstanding to Carl Ramos with Ivy Guo copied requesting exact current:

- dropship item cost;
- lower-48 shipping charge;
- inventory;
- handling time;
- confirmation that the exact Doba item may fulfill an eBay order.

No supplier reply has arrived yet.

Public Doba evidence identifies exact item `D01027H21KW`, supplier AL AUTO, U.S. ship-from and estimated 2-business-day processing, but account price and live inventory are gated behind Doba authentication.

**Control:** do not place the organizer supplier order from public evidence alone. Keep listing quantity zero until exact account-level landed economics pass.

## Solar charger source gate — `D01027RQ4GP`

Public Doba evidence identifies exact SKU `D01027RQ4GP`, U.S. ship-from, estimated 3-business-day processing, with prohibited marketplace field naming Amazon / Temu / Walmart and not naming eBay. Price/inventory remain account-gated.

Historical exact fulfillment remains:

- Doba confirmation total: $39.92;
- shipped total: $41.12;
- current preserved eBay listing price: $59.00;
- historical pre-fee spread at $41.12 vs $59.00 is approximately 30.3%, barely above the hard floor before eBay fees.

**Control:** remain quantity zero / HOLD. Historical actuals are not sufficient to reactivate without current account cost and positive post-fee contribution.

## Remaining candidate state

- Patio Gazebo `168633889386` / `D0102H93K7V-588191` remains `HOLD / VERIFY EXACT CURRENT SOURCE + COST`.
- RV Mattress `168633077471` / custom label `81705331-523642` remains `HOLD / VERIFY EXACT SOURCE + COST + FULFILLMENT`.
- Nine previously screened high-signal candidates remain approved for their recorded END/REBUILD or END/HOLD dispositions once immediate live open-order dependency checks and an action-capable Seller Hub surface are available.

## Next executable sequence

**RECONNECT OPERA → VERIFY AUTHENTICATED SELLER HUB → CUSTOMER ORDERS FIRST → PAYMENTS RE-READ → APPLY QTY-0 STOP-LOSS CONTROLS → EXECUTE APPROVED FAILED-CANDIDATE DISPOSITIONS → CURRENT-COST REVERIFY ORGANIZER + SOLAR CHARGER → VERIFY GAZEBO + MATTRESS → PURGE TRUE ZERO-DEMAND / NO-ADVANTAGE LISTINGS → VERIFY ACTIVE CORE COUNT → RECORD REALIZED CONTRIBUTION.**

## Control phrase

**CUSTOMER FIRST → CASH RELEASE → STOP NEW LOSSES → NO PAID ACQUISITION UNTIL OWNER REOPENS → CURRENT SOURCE + CURRENT COST → POSITIVE CONTRIBUTION → CLEAN FULFILLMENT → SCALE ONLY WINNERS.**
