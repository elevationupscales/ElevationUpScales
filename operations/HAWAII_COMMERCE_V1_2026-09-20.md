# ELEVATION UPSCALES — HAWAII COMMERCE V1

Owner: Casey Young
Company: Elevation UpScales, Inc.
Date: 2026-09-20
Status: ACTIVE BASELINE
Parent main: 28b1d1220d4d9333741e4657c7e68e6b297118be

## PURPOSE

Turn Hawaii lithium demand into a repeatable, destination-priced Shopify sales workflow while preserving checkout availability and controlling freight risk after payment.

## HARD OWNER RULE — NO PAYMENT GATES

Customer payment must NOT be blocked by freight operations.

**PAYMENT OPEN → ORDER CAPTURED → FREIGHT CONFIRMED → SHIPMENT RELEASED**

Do not require carrier confirmation before checkout.
Do not disable Buy Now because freight is pending.
Do not convert a purchasable product to quote-only solely because the final carrier routing is not yet confirmed.

If the customer can select a valid destination-priced Hawaii offer, they are allowed to pay.

The operational gate applies only to shipment release / fulfillment.

## CUSTOMER FLOW

1. Customer identifies battery/model and Hawaii ZIP.
2. Elevation maps destination to island/region.
3. Elevation selects or creates a destination-specific Shopify purchase option.
4. Listing contains:
   - exact battery model;
   - quantity;
   - destination ZIP/region;
   - customer-facing total;
   - included freight allowance;
   - clear freight reconciliation terms.
5. Product remains ACTIVE and purchasable.
6. Customer pays normally through Shopify.
7. Paid order enters Hawaii Freight Confirmation.
8. Operations confirms exact carrier route, DG acceptance, final freight and receiving method.
9. If final freight is within allowance:
   - release shipment.
10. If final freight is below allowance:
   - reconcile according to the listing/customer commitment.
11. If final freight exceeds allowance:
   - contact customer before charging any additional amount.
   - customer may approve overage or cancel for refund.
12. Once accepted:
   - supplier order / pickup / freight tender;
   - tracking / BOL recorded;
   - customer updated.
13. After delivery:
   - record actual landed freight and margin;
   - update destination matrix.

## PAYMENT / CHECKOUT CONTROL

### MUST REMAIN OPEN
- Add to Cart
- Buy Now / accelerated checkout
- Shopify payment methods
- Backorder / continue-selling logic where supplier inventory is fulfilled after sale

### MUST NOT BLOCK PAYMENT
- pending carrier quote;
- pending DG confirmation;
- pending final-mile determination;
- pending terminal assignment;
- internal freight review;
- supplier order not yet placed.

### MAY BLOCK SHIPMENT RELEASE
- carrier declines lithium;
- route not accepted;
- DG tender requirements unresolved;
- customer refuses required freight overage;
- supplier cannot fulfill exact SKU;
- legal/compliance condition prevents shipment.

## DESTINATION PRICING MODEL

Maintain destination-specific lanes rather than one generic Hawaii shipping price.

Initial lanes:
- Oahu / Honolulu
- Hawaii Island / Hilo
- Hawaii Island / Kona
- Maui
- Kauai

Each lane tracks:
- ZIP / destination;
- battery SKU;
- quantity;
- battery subtotal;
- freight allowance;
- quoted customer total;
- terminal pickup vs final mile;
- actual freight;
- DG/handling/overpack cost;
- carrier;
- transit time;
- gross contribution;
- variance between allowance and actual.

## PACK SIZE RULE

Support at minimum:
- 1-pack
- 3-pack

Add larger packs only when economics and demand justify them.

**Multi-pack freight must use consolidated-shipment economics.**
Do not calculate a 3-pack by simply multiplying the 1-pack freight allowance if the carrier can consolidate the shipment.
The purpose of multi-pack pricing is to pass through part of the freight efficiency while preserving margin.

If no consolidated carrier number is available yet:
- customer may still pay;
- use a conservative reservation allowance;
- clearly state that final carrier cost is reconciled after order;
- do not market the multi-pack as a freight-saving offer until consolidation economics are verified.

## LISTING STANDARD

Naming:
`SOK <MODEL> <VOLTAGE> <AH> — <DESTINATION> Freight Purchase`
`3 Pack SOK <MODEL> <VOLTAGE> <AH> — <DESTINATION> Freight Purchase`

Required fields:
- exact SOK model;
- exact quantity;
- destination;
- purchase total;
- freight allowance basis;
- authorized dealer statement;
- shipment-release terms;
- no additional charge without customer approval;
- cancellation/refund path if route cannot be fulfilled at acceptable terms.

Do not mix Lower-48 supplier-direct shipping language into Hawaii purchase listings.

## HILO PROOF LANE — 96721

First active proof destination:
**Hilo, HI 96721**

Current models used to validate workflow:
- SOK SK12V100PC 12V 100Ah
- SOK SK24V100 24V 100Ah

This Hilo lane is the first operating baseline for:
- destination-priced checkout;
- paid-order freight confirmation;
- carrier reconciliation;
- first real landed-cost measurement.

## ORDER STATUS WORKFLOW

Customer Paid
→ Hawaii Freight Confirmation
→ Carrier / DG Accepted
→ Supplier Order Prepared
→ Supplier Released
→ Freight Tendered
→ In Transit
→ Hilo / Destination Received
→ Complete
→ Economics Reconciled

Payment is the START of operations, not a gate after operations.

## CUSTOMER COMMUNICATION RULE

After checkout:
- acknowledge order quickly;
- tell customer freight routing is being finalized;
- provide expected transit window only as an estimate;
- update when carrier/release is confirmed;
- never charge a freight overage without explicit customer approval.

## METRICS

Track:
- Hawaii inquiries;
- ZIP;
- island;
- source;
- requested SKU;
- requested quantity;
- listing created;
- checkout started;
- paid order;
- quoted total;
- actual freight;
- freight variance;
- delivered date;
- actual gross contribution;
- reason lost/cancelled.

## LEARNING LOOP

Every completed Hawaii shipment updates the matrix.

QUOTE
→ PAYMENT
→ ROUTE
→ RELEASE
→ DELIVERY
→ ACTUAL COST
→ MARGIN
→ MATRIX UPDATE
→ BETTER NEXT QUOTE

## CURRENT PRIORITY

1. Keep Hilo purchase options live.
2. Confirm first paid Hawaii order when it posts.
3. Correct SK24V100 3-pack with true consolidated freight once obtained.
4. Preserve no-payment-gate policy.
5. Build Hawaii collection / ZIP quote entry path after proof-order economics are captured.
