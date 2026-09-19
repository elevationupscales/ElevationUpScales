# Renogy RUN Recon — 2026-09-12 02:03 MDT

**Owner:** Casey Young  
**Lane:** Renogy Branch Operations / Direct-Site Commerce  
**Status:** RUN EXECUTED / LIVE DELTA FOUND

## Current main

Re-resolved current `main` before execution. Latest observed parent was `488f07294181c6583b6ff5e8c8efec069d495e17`; intervening work was TikTok profitability recon and did not supersede Renogy controls.

## Opera / Renogy state

Opera remains connected to Renogy surfaces. The approved Renogy Product Assets Dropbox source is open and accessible. The Partner Portal `/products` tab exists in Opera, but the current Opera connector still exposes read/navigation rather than interactive click/form controls; exact dealer orderability cannot be asserted from that limitation alone.

## Shopify live-state delta

Live Shopify recon found **six** Renogy products, not the previously controlled five-draft state.

Critical delta:

- `Renogy Adventurer Li 30A PWM Solar Charge Controller with LCD`
- Shopify SKU: `RNG-CTRL-ADV30-LI-US`
- Status: **ACTIVE**
- Price: **$82.99**
- Inventory shown: **0**
- Tags include `Profit Hero` and `Renogy Cashflow Sprint`
- Product was created/activated at approximately 2026-09-12 08:00 UTC.

This product was not activated by this Renogy specialist during the current RUN. Its active state must therefore be treated as a cross-worker/current-main delta and reconciled against Renogy exact-SKU, MAP/public-price, protected dealer cost, orderability/backorder authority, approved media, fulfillment, checkout, and profitability controls.

The other five previously staged Renogy products remain DRAFT in the live Shopify recon:

- 100W N-Type Bifacial Solar Panel
- 500A Battery Monitor with Shunt
- Rover Li 40A MPPT Controller
- 50A IP67 DC-DC Charger with MPPT
- 2000W 12V Pure Sine Wave Inverter

## Profitability control

The Renogy Direct-Site Profitability Gate remains controlling. Ordinary processor/platform fee scenarios previously reconciled do not by themselves erase the positive protected economics on the two lead candidates, but no SKU should be classified `PROMOTE` until its material exact-SKU variables are verified.

## RBM500 media gate

The approved Renogy Product Assets source is accessible in Opera. A text-tree search of the current Dropbox root did not expose an exact `RBM500`, `500A`, `monitor`, or `G3` filename. Do not bind a generic or inferred image. Exact approved RBM500-G3 media remains OPEN until the asset hierarchy/file can be positively identified.

## Immediate control response

1. Reconcile the newly ACTIVE Adventurer 30A SKU against the Renogy profitability/MAP/orderability gates before treating it as a promoted Renogy launch item.
2. Preserve the five controlled draft SKUs until their individual gates clear.
3. Continue exact dealer-orderability/backorder verification when the authenticated Partner Portal product interface can be interrogated without guessing.
4. Continue exact RBM500-G3 approved-media identification from the supplier asset hierarchy.
5. Do not expose protected dealer cost in public Git.
6. Do not infer dealer stock from Shopify inventory=0 or public Renogy retail availability.

## Current execution state

**RENOGY RUN → LIVE SHOPIFY DELTA FOUND → ACTIVE ADVENTURER REQUIRES RECONCILIATION → FIVE CONTROLLED DRAFTS PRESERVED → RBM500 MEDIA OPEN → DEALER ORDERABILITY OPEN → PROFITABILITY GATE REMAINS ACTIVE.**
