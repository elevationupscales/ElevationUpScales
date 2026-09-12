# Elevation UpScales — eBay Phase 1 Cost Screen Batch

**Date:** 2026-09-11 MDT  
**Owner:** Casey Young  
**State:** EXECUTED SOURCE-ECONOMICS SCREEN / 9 OF 9 MATCHED CANDIDATES FAIL CURRENT CORE GATE  
**Parent:** `EBAY_PHASE1_LIVE_CANDIDATE_SKU_SNAPSHOT_2026-09-11.md`  
**Source Evidence:** Sep. 7 Doba U.S. dropshipping exports preserved in company mail + live authenticated eBay Seller Hub rows captured during PM4 RUN

## Executive result

Nine of the live high-signal eBay candidates were matched exactly to the preserved Sep. 7 Doba inventory exports.

**Result: 9 / 9 fail the current 30% pre-fee gross-margin floor at the existing live eBay price even when the cheaper known Doba pickup-with-prepaid-label path is used.**

Several also appear below the Sep. 7 supplier MAP record and therefore require immediate hold/end pending fresh source verification.

This confirms the owner-directed contraction is necessary. High views alone do not make the current listings commercially viable.

## Exact screen

| Product / SKU | Live eBay price | Doba dropship | Doba pickup + prepaid label | Best known pre-fee margin | Sep. 7 MAP | 30% price needed using best known cost | Decision |
|---|---:|---:|---:|---:|---:|---:|---|
| VEVOR Car Refrigerator `D0102HQ4SWG` | $350.00 | $359.49 | $330.49 | **5.6%** | $309.90 | **$472.13** | `END / REBUILD` — strong views but economics fail |
| 3x3m Waterproof Tent `D0102HHVH7A` | $35.98 | $51.57 | $33.80 | **6.1%** | none in export | **$48.29** | `END / REBUILD` |
| 6000W 48V Inverter `D01027RQ3N2` | $499.00 | $626.29 | $591.49 | **-18.5%** | **$539.90** | **$844.99** | `END / HOLD` — negative + live price below Sep. 7 MAP |
| 95L ATV Cargo Box `D01027RSVIP` | $265.99 | $347.89 | $263.21 | **1.0%** | **$299.90** | **$376.01** | `END / HOLD` — near-zero margin + below Sep. 7 MAP |
| Walk-In Greenhouse `D0102HRMZW6` | $134.55 | $170.51 | $134.55 | **0.0%** | **$146.99** | **$192.21** | `END / HOLD` — zero margin + below Sep. 7 MAP |
| 1000LM Camping Lantern `D0102HS0G3P` | $14.77 | $20.87 | $11.59 | **21.5%** | **$17.99** | **$16.56** | `END / HOLD` — below floor + below Sep. 7 MAP; low ticket worsens fee load |
| 5.3 Gal Metal Fuel Can `D01027HX25W` | $46.76 | $46.29 | $38.17 | **18.4%** | $39.90 | **$54.53** | `END / REBUILD` — margin fails before eBay fees |
| Group 24/27 Battery Box `D010277UEBX` | $52.55 | $59.05 | $47.45 | **9.7%** | $50.90 | **$67.79** | `END / REBUILD` |
| Portable 5 Gal Fuel Container `D01027HHGCG` | $65.00 | $78.87 | $69.59 | **-7.1%** | **$67.99** | **$99.41** | `END / HOLD` — negative + below Sep. 7 MAP |

## Inventory / routing evidence from preserved Doba export

The matched rows were all U.S.-inventory records in the Sep. 7 export. Known inventory at that snapshot included:

- car refrigerator: 55;
- tent: 814;
- inverter: 63;
- ATV cargo box: 108;
- greenhouse: 554;
- camping lantern: 1,048;
- metal fuel can: 2,152;
- battery box: 475;
- portable fuel container: 31.

Most matched VEVOR/Doba rows listed `United States: excluding AK, HI`, 3-business-day processing, and `Amazon; Temu; Walmart` as prohibited marketplaces; eBay was not named in that preserved prohibited-marketplace field.

Inventory does **not** rescue bad economics.

## MAP risk

At the current live eBay prices captured during this RUN, these listings are below the preserved Sep. 7 MAP value:

- 6000W inverter: live $499.00 vs Sep. 7 MAP $539.90;
- ATV cargo box: live $265.99 vs MAP $299.90;
- greenhouse: live $134.55 vs MAP $146.99;
- camping lantern: live $14.77 vs MAP $17.99;
- portable 5-gallon fuel container: live $65.00 vs MAP $67.99.

Because MAP can change, this evidence is used as a **hold/end trigger pending fresh supplier verification**, not as a claim that Sep. 7 MAP is necessarily still current.

## Current customer-dependency check

Authenticated Seller Hub currently shows **Awaiting shipment (4)** tied to:

- back-seat organizer `02-15170-43443`;
- spotlight `20-15123-05140`;
- folding bed `07-15141-13062`;
- folding bed `25-15104-41137`.

None of the nine cost-screened candidate SKUs above appeared in that current Awaiting Shipment (4) queue.

Therefore these nine are not being preserved because of a current awaiting-shipment customer obligation.

A final Seller Hub dependency check is still required immediately before ending each listing because the browser execution surface can change.

## Remaining unscreened candidate rows

Three live candidate rows from the initial high-signal queue were not found in the three preserved Sep. 7 Doba export segments available during this RUN:

- RV Mattress — item `168633077471`, custom label `81705331-523642`, live $38.00, 28 views / 1 watcher;
- Patio Gazebo 10x20 — item `168633889386`, custom label `D0102H93K7V-588191`, live $115.00, 12 views;
- VEVOR 50W Solar Charger + MPPT — item `168634158033`, custom label `D01027RQ4GP-171040`, live $59.00, 6 views, live quantity 0.

These remain `HOLD / VERIFY`, not `CORE KEEP`.

## Core-store consequence

The Phase 1 core may currently be **well below 12 listings**. Twelve is a cap, not a quota.

Do not retain a listing merely to reach 12.

Current core selection should now focus on:

1. resolving the four customer/order obligations;
2. ending known losing / MAP-risk configurations;
3. finding a small number of products with materially better source economics;
4. using actual contribution after eBay fees as the scale gate;
5. leaving promoted listings OFF unless the SKU has enough margin to absorb the ad rate.

## Execution disposition

Ready for Seller Hub execution when the browser action surface supports consequential controls:

- `D0102HQ4SWG` → END / REBUILD
- `D0102HHVH7A` → END / REBUILD
- `D01027RQ3N2` → END / HOLD
- `D01027RSVIP` → END / HOLD
- `D0102HRMZW6` → END / HOLD
- `D0102HS0G3P` → END / HOLD
- `D01027HX25W` → END / REBUILD
- `D010277UEBX` → END / REBUILD
- `D01027HHGCG` → END / HOLD

No listing-end action is falsely claimed in this record. The available Opera connector provides navigation/read access but does not currently expose a supported click/submit action for Seller Hub listing termination.

## Control

**VIEWS DO NOT OVERRIDE MARGIN → INVENTORY DOES NOT OVERRIDE MARGIN → MAP RISK GETS HELD → NO CUSTOMER DEPENDENCY MEANS LOSING LISTINGS CAN EXIT → REBUILD ONLY FROM VERIFIED PROFITABLE SOURCES.**
