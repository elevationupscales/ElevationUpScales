# Elevation UpScales — eBay Phase 1 Live Candidate SKU Snapshot

**Date:** 2026-09-11 MDT  
**Owner:** Casey Young  
**State:** VERIFIED LIVE SELLER HUB SNAPSHOT / SOURCE ECONOMICS STILL REQUIRED  
**Parent:** `EBAY_PHASE1_CORE_SELECTION_EXECUTION_2026-09-11.md`

## Purpose

Preserve the exact live Seller Hub item/SKU/price/demand snapshot recovered during PM4 RUN so source-cost verification can proceed without repeating the browser audit.

These rows are **not approved core listings**. They are the highest-value verification queue after removing known losing/recovery items.

## Live candidate rows

| Product | eBay item | Custom label / source SKU | Live price | Available qty | 30-day views | Watchers captured | Current disposition |
|---|---:|---|---:|---:|---:|---:|---|
| VEVOR 12V Car Refrigerator Freezer | `168634183922` | `D0102HQ4SWG-380325` | **$350.00** | 1 | **32** | 0 | VERIFY source cost + eBay eligibility + contribution |
| RV Mattress, Full size | `168633077471` | `81705331-523642` | **$38.00** | 1 | **28** | **1** | VERIFY exact source + cost + fulfillment |
| 3 x 3m Waterproof Tent with Spiral Tubes | `168631041650` | `D0102HHVH7A-285520` | **$35.98** | 1 | **21** | **1** | VERIFY source cost + contribution |
| Pure Sine Wave Inverter Charger 6000W 48V→120V | `168634908211` | `D01027RQ3N2-211375` | **$499.00** | 1 | **15** | 0 | VERIFY source + routing + cost + contribution |
| 95L ATV Cargo Box & Lounger | `168633901217` | `D01027RSVIP-131365` | **$265.99** | 1 | **13** | **1** | VERIFY source cost + fulfillment |
| VEVOR Portable Walk-In Greenhouse 20 x 10 | `168631036536` | `D0102HRMZW6-224407` | **$134.55** | 1 | **12** | **1** | VERIFY source cost; exact Doba product publicly matched |
| Patio Gazebo 10 x 20 Waterproof Tent | `168633889386` | `D0102H93K7V-588191` | **$115.00** | 1 | **12** | 0 | VERIFY source cost + contribution |
| VEVOR Powerful 1000LM LED Camping Lantern | `168634342983` | `D0102HS0G3P-620454` | **$14.77** | 1 | **9** | not captured | VERIFY source cost; low ticket requires strict fee screen |
| VEVOR Heavy-Duty 5.3 Gallon Metal Fuel Can | `168631006501` | `D01027HX25W-351940` | **$46.76** | 0 | **8** | 0 | HOLD zero qty; verify source + shipping/hazmat + economics before any reactivation |
| Battery Box Group 24/27 | `168639989005` | `D010277UEBX-329545` | **$52.55** | 1 | **7** | **1** | VERIFY source cost + contribution |
| VEVOR 50W Mono Solar Battery Charger + MPPT | `168634158033` | `D01027RQ4GP-171040` | **$59.00** | 0 | **6** | 0 | HOLD zero qty; verify source + cost before reactivation |
| VEVOR Portable 5 Gallon Fuel Container | `168631001484` | `D01027HHGCG-645458` | **$65.00** | 1 | **6** | **1** | VERIFY source + shipping/hazmat + cost |

## Exact Doba public-source verification completed

### Walk-In Greenhouse — `D0102HRMZW6`

Public Doba product evidence matched the exact SKU and showed:

- product: VEVOR Walk-In Tunnel Greenhouse, 20 x 10 x 7 ft;
- item number: `D0102HRMZW6`;
- ship-from: United States;
- estimated processing: 3 business days;
- prohibited marketplace field: **Amazon; Temu; Walmart** — eBay is not named;
- current inventory quantity and retailer account price remain login-gated.

Therefore the greenhouse advances from identity/channel uncertainty to:

`EXACT SOURCE MATCHED / EBAY NOT PUBLICLY PROHIBITED / COST + LIVE INVENTORY STILL REQUIRED`.

## Profit ceilings at current live prices

For rapid source screening, the maximum landed source cost at the existing 30% pre-fee floor is:

- Car refrigerator $350.00 → **$245.00 max landed cost**
- RV mattress $38.00 → **$26.60 max landed cost**
- 3x3m tent $35.98 → **$25.19 max landed cost**
- 6000W inverter $499.00 → **$349.30 max landed cost**
- ATV cargo box $265.99 → **$186.19 max landed cost**
- Greenhouse $134.55 → **$94.19 max landed cost**
- Patio gazebo $115.00 → **$80.50 max landed cost**
- Camping lantern $14.77 → **$10.34 max landed cost**
- Metal fuel can $46.76 → **$32.73 max landed cost**
- Battery box $52.55 → **$36.79 max landed cost**
- 50W solar charger $59.00 → **$41.30 max landed cost**
- Portable fuel container $65.00 → **$45.50 max landed cost**

These ceilings are only the first screen. Final keep decisions must also absorb actual eBay selling fees, any ad fee, supplier shipping/freight, discounts, and other variable order cost.

## Browser execution note

The Opera Browser Connector successfully authenticated Seller Hub and produced the exact rows above, but the connection became intermittent during the subsequent Doba account-price attempt. Do not revert to the historical "Seller Hub not authenticated" state. Treat the browser issue as an intermittent execution-surface blocker only; the Seller Hub evidence above is already verified and durable.

## Next pass

Run exact source economics in this order:

1. car refrigerator;
2. RV mattress;
3. 3x3m tent;
4. inverter;
5. ATV cargo box;
6. greenhouse;
7. patio gazebo;
8. battery box;
9. fuel containers only if shipping policy is clean;
10. low-ticket lantern only if source cost leaves meaningful contribution after fixed eBay fee effects.

Zero-quantity rows do not qualify for the core until inventory/source is refreshed.

## Control

**LIVE DEMAND SIGNAL → EXACT SKU → SOURCE / EBAY ELIGIBILITY → LANDED COST → 30% FLOOR / 35% PREFERRED → ACTUAL EBAY FEE LOAD → POSITIVE CONTRIBUTION → CORE KEEP OR END.**
