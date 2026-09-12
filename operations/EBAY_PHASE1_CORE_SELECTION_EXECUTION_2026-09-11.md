# Elevation UpScales — eBay Phase 1 Profitable Core Selection Execution

**Date:** 2026-09-11 MDT  
**Owner:** Casey Young  
**State:** ACTIVE / LIVE SELLER HUB SIGNAL CAPTURED / CONSEQUENTIAL ACTIONS PARTIALLY BROWSER-GATED  
**Parent:** `EBAY_STORE_CONTRACTION_AND_DIRECT_SOURCE_REBUILD_2026-09-11.md`  
**Execution Lane:** eBay Store Operations  
**Oversight:** Company Operations / Operating System Project Manager (PM4)

## Purpose

Convert the owner-directed eBay contraction from a general directive into an executable profitable-core selection queue using the authenticated Seller Hub evidence captured during the PM4 RUN.

This file does **not** claim any listing was ended or repriced unless Seller Hub later confirms the action. During this RUN the Opera Browser Connector authenticated successfully, live Seller Hub evidence was captured, and then the connector disconnected before consequential listing edits could be completed. Per OS control, only the browser-dependent action is held; the rest of the eBay recovery continues.

## Live commercial baseline captured

Authenticated Seller Hub Performance showed for the current 31-day window:

- Total sales: **$485.29**
- Net sales: **$386.53** before supplier/product cost
- Net eBay selling costs: approximately **$66.39**, about **14% of gross sales**
- Listing impressions: **104,797**
- Listing page views: **900**
- Click-through rate: **0.8%**
- Sales conversion rate: **1.6%**
- Seller level: **Above Standard**
- Next evaluation: **2026-09-20**
- Transaction defects: **2 of 7 transactions**
- Tracking uploaded on time and validated: **7 of 7 transactions**
- Cases closed without seller resolution: **0 of 7 transactions**

Commercial conclusion:

**The store is not demand-dead. It is over-broad and under-controlled on unit economics and fulfillment.**

## Phase 1 advertising rule

During profitability recovery, do **not** activate promoted listings merely because eBay displays a suggested ad rate.

Live rows showed suggested ad rates commonly around **9–14%**. With current eBay selling costs already running around 14% of gross sales, a product sitting near the 30% pre-fee gross-margin floor can lose most of its remaining contribution if another 9–14% advertising charge is added.

Therefore:

**NO PROMOTED LISTING DURING PHASE 1 UNLESS THE EXACT SKU CONTRIBUTION MODEL EXPLICITLY ABSORBS THE AD RATE AND REMAINS POSITIVE.**

The existing source/economics gate remains controlling:

- ~30% pre-fee gross margin = hard working minimum;
- 35%+ preferred;
- final decision requires positive expected contribution after eBay fees, shipping/freight, ads, discounts and all other variable costs.

## Immediate disposition queue

### END / DROP after customer obligation is closed

1. **Cordless Electric Weed Wacker** — item `168634712408`
   - Live order `10-15134-90489` was verified in authenticated Seller Hub with **Cancellation in progress** / cancellation processing.
   - Known source candidate cost exceeds sale price before eBay fees.
   - **Disposition:** `END / DROP` immediately after cancellation/refund reaches terminal confirmed state.
   - Do not place a rescue supplier order.

2. **VEVOR Rechargeable Spotlight** — item `168631043193`
   - Live listing snapshot: **$34.98**, **18 views / 30 days**, no watcher signal captured.
   - Current order `20-15123-05140` remains an unresolved paid customer obligation.
   - Historical sale was below known MAP and known source paths are negative/thin before eBay fees.
   - **Disposition:** `TEMP ORDER-PROTECTION HOLD → END / REBUILD AFTER SOURCE APPROVAL`.

3. **RV Screen Door Protector** — item `168633285491`
   - Live demand snapshot: approximately **2 views / 30 days**.
   - Known Doba economics are negative/thin at the current historical selling band.
   - **Disposition:** `END / REBUILD AFTER SOURCE APPROVAL`, subject to one final open-order dependency check before ending.

4. **Ordinary-parcel lithium listings without verified route + source + contribution control**
   - Live Seller Hub showed multiple battery listings with meaningful views, but prior operations evidence proves ordinary parcel battery offers can create unsupported AK/HI / dangerous-goods obligations and thin economics.
   - **Disposition:** `END / HOLD` unless the exact listing has verified eBay permission, exact source, lower-48 routing control, compliant dangerous-goods fulfillment and profitable economics.
   - Hawaii lithium remains in the controlled freight program, not generic parcel fulfillment.

## Proven demand — preserve history, but not automatically core

These listings have useful demand signal but currently fail or lack the profit gate.

### VEVOR Boot / Shoe Dryer — item `168633017846`

- Live: **$17.89**, **42 views / 30 days**, **2 watchers**.
- Historical known landed fulfillment: about **$14.00**.
- Current/historical selling economics remain below the operating margin screen.
- **Disposition:** `KEEP HISTORY / REPRICE OR RESOURCE`; not a Phase 1 core listing until a verified source/price combination passes.

### VEVOR 21-Inch Lawn Sweeper — item `168637439895`

- Live demand: **36 views / 30 days**.
- Historical actual landed cost: **$63.36**.
- Historical selling band around $69.99–$75.50 fails the margin screen.
- **Disposition:** `KEEP HISTORY / MAJOR REPRICE OR RESOURCE`; not core at current economics.

### Back-Seat Organizer — item `168634275726`

- Live demand: approximately **6 views / 30 days** plus a current paid order `02-15170-43443`.
- Exact Doba source identity is known but current authenticated source cost remains unresolved.
- Current customer obligation comes first.
- **Disposition:** `TEMP ORDER-PROTECTION HOLD`; after order resolution, retain only if exact landed economics pass.

### Folding Bed / Camping Cot — item `168634722813`

- Repeated real sales history exists.
- One actual fulfilled order landed at $44.46; known historical selling band is too thin after eBay costs.
- Two current late-order recovery rows remain in the cash-release queue.
- **Disposition:** `KEEP HISTORY / SOURCE REBUILD`; do not scale current configuration.

## High-signal candidate queue for the profitable core

These products earned a source/economics verification pass because authenticated Seller Hub showed stronger current buyer attention. They are **CANDIDATES, NOT APPROVED CORE LISTINGS** until exact source/channel/cost/handling economics pass.

| Candidate | Live 30-day demand signal | Current status |
|---|---:|---|
| VEVOR 12V Car Refrigerator / Freezer | **32 views** | `VERIFY SOURCE + COST + EBAY AUTHORIZATION` |
| RV Mattress, full size | **28 views / 1 watcher** | `VERIFY SOURCE + COST + FULFILLMENT` |
| 3 x 3m Waterproof Tent | **21 views** | `VERIFY SOURCE + COST` |
| Pure Sine Wave Inverter Charger, 6000W 48V→120V | **15 views** | `VERIFY EXACT SOURCE + ROUTING + COST` |
| 95L ATV Cargo Box & Lounger | **13 views** | `VERIFY SOURCE + COST` |
| VEVOR Portable Walk-In Greenhouse 20 x 10 | **12 views** | `VERIFY SOURCE + COST` |
| Patio Gazebo 10 x 20 Waterproof Tent | **12 views** | `VERIFY SOURCE + COST` |
| VEVOR 1000LM LED Camping Lantern | **9 views** | `VERIFY SOURCE + COST` |
| VEVOR Heavy-Duty 5.3 Gal Metal Fuel Can | **8 views** | `VERIFY SOURCE + HAZMAT/SHIPPING + COST` |
| Battery Box Group 24/27 | **7 views** | `VERIFY SOURCE + COST` |
| VEVOR 50W Mono Solar Battery Charger + MPPT | **6 views** | `VERIFY SOURCE + COST` |
| VEVOR Portable 5 Gallon Fuel Container | **6 views / 1 watcher captured on row** | `VERIFY SOURCE + HAZMAT/SHIPPING + COST` |

This is a **verification queue**, not a quota. If fewer than 12 pass, the Phase 1 core will be smaller than 12.

## Listings that do not earn management time during contraction

Authenticated Seller Hub exposed a large set of listings at **0–3 views / 30 days**, often with zero watchers and no proven sales signal.

Examples observed include multiple low-signal RV accessories, storage items, solar accessories, portable fans, tools and generic outdoor products.

During Phase 1 these should default toward `END / DROP` when all are true:

- no unresolved paid order;
- zero/near-zero views;
- zero watchers;
- no useful sales history;
- no strategic approved source advantage;
- economics are weak or unverified.

Do not spend supplier-recon time rescuing low-demand items ahead of the high-signal queue.

## Exact execution sequence from here

1. Reconnect authenticated Opera Browser Connector.
2. Recheck the weed-wacker cancellation reaches terminal canceled/refunded state; do not submit a duplicate cancellation while processing.
3. Reconcile the spotlight and two late cot orders against any supplier shipment/tracking evidence; resolve customer obligations before ending their listings.
4. Obtain exact organizer source cost before Sep. 16 ship-by; fulfill only if executable under the customer-recovery rule.
5. Apply `END / DROP` and `END / REBUILD` dispositions to named listings once open-order dependencies are clear.
6. Purge zero/near-zero demand listings without strategic source advantage.
7. Run protected source/economics verification on the high-signal candidate queue above.
8. Keep only candidates that pass exact eBay channel permission + source + landed cost + shipping/handling + contribution.
9. Verify active revenue listing count at or below the temporary Phase 1 cap of approximately 12.
10. Record the new live active-catalog baseline and actual contribution after every new sale.

## Control

**CUSTOMER FIRST → CASH RELEASE → END LOSERS → VERIFY HIGH-SIGNAL PRODUCTS → KEEP ONLY PROFITABLE SOURCE-CONTROLLED LISTINGS → NO ADS UNTIL SKU ECONOMICS SUPPORT THEM → SCALE ONLY AFTER ACTUAL PROFIT.**
