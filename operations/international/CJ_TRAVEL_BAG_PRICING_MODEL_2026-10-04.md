# CJ GLOBAL TRAVEL BAG — INTERNAL PRICING & LANE PROFIT MODEL

**Date:** 2026-10-04  
**Authority:** Casey Young direct instruction  
**System:** OS 1 / MPM 28  
**Product:** Waterproof Sports & Travel Gear Bag with Shoe Compartment  
**SKU:** `CJJT167029603CX`  
**Purpose:** Preserve the internal economics behind the first 11-country / 12-lane CJ launch and establish a reusable pricing gate for future international listings.

## Current live customer offer

- Shopify retail price: **$45.99**
- Customer-facing shipping: **FREE / $0** across all 12 configured lanes
- Delivery profile: **CJ Global — Travel Gear Bag**
- Product remains supplier fulfilled through the assigned CJ fulfillment-service location.
- Market coverage and delivery estimates remain unchanged.
- The free-shipping change is a presentation/pricing change only. The true lane freight cost still applies internally.

## Cost assumptions

| Input | Working value | Evidence class |
|---|---:|---|
| Retail price | $45.99 | LIVE SHOPIFY |
| Supplier unit cost | $4.19 | VERIFIED PRIOR CJ / OS3 RECON |
| Payment percentage fee | 2.9% | WORKING ASSUMPTION — replace when processor rate is verified |
| Payment fixed fee | $0.30 | WORKING ASSUMPTION — replace when processor rate is verified |
| Returns / FX / chargeback reserve | $0.00 | NOT YET APPLIED |

At $45.99, the working payment-fee estimate is **$1.63/order**.

## Historical lane freight baseline

These are the real customer-facing lane rates that existed immediately before the approved conversion to free shipping. They are now retained as the internal freight-cost baseline.

| Lane | Internal freight baseline | Freight % of $45.99 retail | Est. contribution after supplier cost + freight + working payment fee | Est. contribution margin |
|---|---:|---:|---:|---:|
| Australia | $10.98 | 23.9% | $29.19 | 63.5% |
| Canada | $10.22 | 22.2% | $29.95 | 65.1% |
| France | $10.38 | 22.6% | $29.79 | 64.8% |
| Germany | $9.87 | 21.5% | $30.30 | 65.9% |
| Ireland | $16.14 | 35.1% | $24.03 | 52.2% |
| Mexico | $11.76 | 25.6% | $28.41 | 61.8% |
| Netherlands | $12.20 | 26.5% | $27.97 | 60.8% |
| New Zealand | $11.88 | 25.8% | $28.29 | 61.5% |
| Puerto Rico | $28.17 | 61.3% | $12.00 | 26.1% |
| Spain | $9.52 | 20.7% | $30.65 | 66.6% |
| United Kingdom | $6.78 | 14.7% | $33.39 | 72.6% |
| United States — Lower 48 | $10.86 | 23.6% | $29.31 | 63.7% |

## Portfolio-level economics

- Average freight — all 12 lanes: **$12.40**
- Median freight: **$10.92**
- Average freight excluding Puerto Rico: **$10.96**
- Estimated average contribution — all lanes: **$27.77/order**
- Estimated average contribution margin — all lanes: **60.4%**
- Estimated average contribution excluding Puerto Rico: **$29.20/order**
- Best modeled lane: **United Kingdom — $33.39 contribution / 72.6%**
- Worst modeled lane: **Puerto Rico — $12.00 contribution / 26.1%**
- Highest-friction international-country lane after Puerto Rico: **Ireland — $16.14 freight / 52.2% modeled margin**

## What changed operationally

The physical / logical shipping lanes did **not** change when free shipping was enabled.

What changed:

1. Shopify customer-facing shipping rate changed to $0 for every existing bag lane.
2. Retail increased to $45.99.
3. True freight remains an internal cost assigned to the order by destination.
4. The lane table is now required to judge profitability instead of looking only at checkout shipping charges.

This means **FREE SHIPPING is not zero freight**. It means freight is embedded in retail and absorbed internally.

## Internal pricing rules for the next international item

Before publishing a new international general-merchandise item:

1. Capture the exact supplier unit cost.
2. Capture the live freight quote/rate for every intended market or territory.
3. Calculate mean freight, median freight, and a normal-lane mean excluding obvious outliers.
4. Add payment-processing assumptions and any returns / FX / chargeback reserve.
5. Calculate contribution dollars and margin percentage per lane.
6. Identify the worst lane before setting the retail price.
7. Do not let one structural outlier determine the retail price for every market.
8. Prefer embedded freight / free shipping where all intended lanes still pass the minimum margin floor.
9. Treat high-cost specialty lanes separately when needed.
10. Re-run the model after early checkout / abandonment evidence appears.

## Freight-friction control bands

Use freight as a percentage of retail:

- **<30%:** low / normal freight burden; good candidate for embedded free shipping.
- **30–40%:** watch lane; free shipping can work but monitor conversion and contribution.
- **40–50%:** elevated lane; price or market treatment requires review.
- **>=50%:** high-friction / specialty lane; explicit lane-level review required before launch.

Also flag a lane when its freight is more than **1.5× the normal-lane average**.

## Current bag lane decisions

- **Puerto Rico:** structural outlier / margin-watch. Do not use it to price the entire global offer.
- **Ireland:** highest non-PR freight lane; monitor.
- **Netherlands / New Zealand / Mexico:** next watch group.
- **UK:** strongest freight economics.
- **US Lower 48 / Canada / Australia / France / Germany / Spain:** normal-band lanes under the current $45.99 free-shipping model.

## Publish gate for future international products

**NO INTERNATIONAL PUBLISH** until the product has:

- verified supplier cost,
- lane-by-lane freight table,
- customer-facing shipping strategy,
- payment-fee assumption,
- average contribution,
- worst-lane contribution,
- average margin,
- worst-lane margin,
- explicit outlier treatment,
- owner-approved price.

## Workbook companion

A reusable workbook was created from this model:

`Elevation_International_Item_Pricing_Profit_Model.xlsx`

The workbook contains:

- Inputs
- Lane Profitability
- Next Listing Template
- Pricing Rules
- Sources & Notes

The workbook is the working calculator; this Markdown document is the Git-controlled operating baseline.
