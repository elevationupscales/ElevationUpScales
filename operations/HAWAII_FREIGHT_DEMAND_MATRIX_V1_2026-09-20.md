# HAWAII FREIGHT & DEMAND MATRIX — V1

Status: ACTIVE WORKING MATRIX
Owner: Casey Young
Company: Elevation UpScales, Inc.
Program: Hawaii Commerce V1
Updated: 2026-09-20

## Rules

- Checkout stays open. No payment gate.
- Destination pricing is by ZIP/island.
- Shipment release waits for carrier/DG acceptance.
- Freight overage requires customer approval.
- Multi-pack economics must eventually use consolidated freight, not single-unit freight multiplied by quantity.
- Actual shipment data replaces estimates as soon as it exists.

## Active / Proof Lanes

| Destination | ZIP | SKU | Qty | Battery Price/Subtotal | Freight Allowance | Customer Total | Actual Freight | Carrier | Terminal / Final Mile | Status | Notes |
|---|---:|---|---:|---:|---:|---:|---:|---|---|---|---|
| Hilo, Hawaii Island | 96721 | SK12V100PC | 1 | $319.00 | $254.70 | $573.70 | TBD | TBD | TBD | LIVE / PROOF | Customer inquiry validated demand |
| Hilo, Hawaii Island | 96721 | SK12V100PC | 3 | $957.00 | $256.07 working allowance | $1,213.07 | TBD | TBD | TBD | LIVE / PROOF | Strong consolidation-value test |
| Hilo, Hawaii Island | 96721 | SK24V100 | 1 | $751.00 | $254.70 reservation allowance | $1,005.70 | TBD | TBD | TBD | LIVE / PROOF | 48 lb battery; freight pending exact route |
| Hilo, Hawaii Island | 96721 | SK24V100 | 3 | $2,253.00 | $764.10 conservative reservation | $3,017.10 | TBD | TBD | TBD | LIVE / NEEDS CONSOLIDATION RATE | Do not market as savings until consolidated rate verified |

## Destination Expansion Queue

| Priority | Market | Initial ZIP/Area | Status | Next Requirement |
|---:|---|---|---|---|
| 1 | Hilo / Hawaii Island | 96721 | ACTIVE PROOF | First paid shipment + actual landed economics |
| 2 | Honolulu / Oahu | Honolulu terminal/service area | PREP | Current carrier/DG rate |
| 3 | Kona / Hawaii Island | Kailua-Kona area | PREP | Current outer-island rate |
| 4 | Maui | Kahului area | PREP | Current carrier/DG rate |
| 5 | Kauai | Lihue area | PREP | Current carrier/DG rate |

## SKU Expansion Queue

| Priority | SKU | Product | Hawaii Listing Plan | Gate |
|---:|---|---|---|---|
| 1 | SK12V100PC | 12V 100Ah Bluetooth LiFePO4 | 1-pack + 3-pack | Active |
| 2 | SK24V100 | 24V 100Ah LiFePO4 | 1-pack + 3-pack | Active; correct 3-pack consolidation |
| 3 | SK24V150PH | 24V 150Ah Heated / Victron CAN | 1-pack + 3-pack | Get exact packed weight + freight |
| 4 | SK48V100N | 48V 100Ah rack battery | 1-pack / rack bundle | Freight + handling economics |
| 5 | SK12V314PH | 12V 314Ah | 1-pack | Freight + handling economics |

## Per-Order Capture

Record for every Hawaii inquiry/order:

- inquiry date;
- source (Google / Facebook / direct / referral / other);
- customer ZIP;
- island;
- requested SKU;
- requested quantity;
- customer-facing total;
- freight allowance;
- checkout started;
- paid order;
- carrier;
- DG acceptance;
- terminal vs final-mile;
- actual freight;
- packaging / overpack;
- supplier cost;
- payment/platform fees;
- landed cost;
- gross contribution;
- ship date;
- delivery date;
- transit days;
- cancellation/loss reason if applicable.

## Conversion Loop

INQUIRY
→ ZIP / ISLAND
→ SKU + QUANTITY
→ DESTINATION PRICE
→ CHECKOUT OPEN
→ PAYMENT
→ FREIGHT CONFIRMATION
→ RELEASE
→ DELIVERY
→ ACTUAL ECONOMICS
→ MATRIX UPDATE
→ STRONGER NEXT OFFER
