# Elevation UpScales — TikTok Affiliate Live Open Collaboration Recon

**Status:** LIVE RECON / PROFITABILITY EXPOSURE CONTROL  
**Date:** 2026-09-12 MDT  
**Owner:** Casey Young  
**Lane:** Company Operations → Ecommerce & Vendor Operations → TikTok execution / Apparel creator engine  
**Parent control:** `operations/TIKTOK_AFFILIATE_PROFITABILITY_EXECUTION_2026-09-12.md`

## Git-first state

This RUN re-resolved `main` before recording state. The profitability control already exists on `main`; stale PR #142 was closed because its exact control file had already landed through commit `20b7e18e2ed5631e5622c6290df419164b2aa038`.

No duplicate operating system, manager, or worker was created.

## Live Seller Center finding

Authenticated TikTok Shop Seller Center for **Elevation Upscales Shop** currently states that products were auto-added to Open Collaboration and that creators can discover and promote them for commission.

This creates a profitability-control requirement: apparel products must not be assumed safe for creator promotion merely because TikTok auto-enrolled them.

Current Seller Center state observed:

- Open Collaboration is active as a platform surface for the shop;
- products may be auto-added by default;
- commission is paid when creator content generates a sale;
- Target Collaboration remains available for creator-specific custom commission offers;
- actual current per-product commission rates were not exposed by the connected browser surface during this RUN.

## Current TikTok commission-control implications

TikTok's current U.S. Seller University guidance confirms:

- sellers can manage product-level Open Collaboration commission rates;
- Auto-add can add future products to Open Collaboration;
- commission decreases for creators already promoting a product can remain protected for up to 30 days;
- sellers should therefore treat a high commission already exposed to a creator as a real temporary liability rather than assuming a lower rate becomes immediate.

**Control:** never raise or broaden creator commission until the exact SKU contribution ceiling is validated. If an unsafe rate is discovered, reduce/remove exposure as the live account permits and record the 30-day protected-rate tail for already-promoting creators.

## Live Fourthwall public price recon

Current public Fourthwall storefront prices observed during this RUN:

| Product | Public price observed | Profitability state |
|---|---:|---|
| Mountain Patch Baseball Cap \| Classic Outdoor Hat | $19.77 | `PRIORITY 1 / COST GATE OPEN` |
| Elevation Essentials Women's Crop Tee | $23.55 | `HOLD / NORMALIZE ECONOMICS` |
| Elevation Essential Hoodie \| White | $36.68 | `HOLD / NORMALIZE ECONOMICS` |
| Signature Collection Emblem Tee | $26.40 | `HARD HOLD / REPRICE-REROUTE` |

The Signature Collection Emblem Tee control packet previously modeled a $30 retail reference. The live public storefront is now lower at $26.40. Until provider cost is freshly revalidated, this price drift makes the existing profitability concern **more restrictive, not less**; it does not authorize affiliate promotion.

## Mountain Patch Baseball Cap gate

Exact public retail is now verified at **$19.77**.

The following material inputs are still not verified in the currently accessible source set:

1. exact provider/base cost by live variant;
2. any seller-funded shipping/subsidy applied to the TikTok order path;
3. actual current TikTok standard commission already assigned to this product;
4. any Shop Ads commission rate;
5. promo/discount collision;
6. return/refund/replacement reserve;
7. sample acquisition allocation.

Therefore the cap remains:

**`PROVISIONAL HERO / DO NOT SET OR INCREASE AFFILIATE RATE YET`.**

No commission ceiling will be invented from retail price alone.

## Immediate execution queue

1. Open Seller Center → Affiliate Center → Open Collaboration.
2. Record every currently added Elevation apparel SKU and its standard commission / Shop Ads commission.
3. Turn off Auto-add for future products if it cannot be made profitability-safe by default.
4. For known low-margin or unvalidated SKUs, reduce/remove Open Collaboration exposure where the live account permits; record any 30-day protected commission tail already owed to active creators.
5. Obtain exact Fourthwall/provider base cost for Mountain Patch Baseball Cap.
6. Calculate safe Open and Target commission ceilings from all-in contribution.
7. Activate one profit-validated hero SKU first; do not mass-enable apparel.
8. Use refundable samples only after the hero SKU sample economics pass.
9. Record realized contribution by creator + SKU after first attributable sale and scale only winners.

## Live execution limitation

The connected Opera browser can read the authenticated Seller Center affiliate landing page but does not currently expose a press/click executor for the visible **Go to Open Collaboration** control, and direct navigation did not reveal the product settings page during this RUN.

No commission, sample, Auto-add, advertising, order, payment, or fulfillment setting was claimed as changed.

This blocker applies only to the live settings mutation. Profitability recon and routing continue.

## Control phrase

**AUTO-ENROLLED DOES NOT MEAN PROFIT-VALIDATED → VERIFY RATE + TRUE COST → PROTECT MARGIN → SCALE ONE HERO AT A TIME.**
