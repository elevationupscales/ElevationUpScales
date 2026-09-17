# COM 2 — RENOGY HAWAII OPENING ASSIST
Date: 2026-09-17
Owner: Casey Young
Store: Elevation Upscales Shopify
Mode: SUPPORT COM 2 → VERIFY → OPEN SAFE SKUS → PROTECT MARGIN

## LIVE SHOPIFY TRUTH

The current default Shopify delivery profile already includes Hawaii inside the Domestic zone.

Current Domestic checkout rates:
- Standard: $8.00
- Standard: FREE at order subtotal >= $70.00
- Express: $15.00

This means Hawaii is technically included today for products left in the General profile. Do NOT interpret this as a correct Hawaii launch. The current rates are generic Lower-48-style rates and can undercharge Hawaii shipping.

## CURRENT ACTIVE RENOGY SKUS

### Hawaii-eligible by current Elevation tags + Renogy published policy
1. Renogy 10W Solar Battery Trickle Charger Maintainer
   SKU: RSP10TC-G1-US
   Shopify: ACTIVE
   Tag: AK-HI Eligible / Renogy AK-HI Air Eligible
   Inventory policy: CONTINUE

2. Renogy Adventurer Li 30A PWM Solar Charge Controller with LCD
   SKU: RNG-CTRL-ADV30-LI-US
   Shopify: ACTIVE
   Tag: AK-HI Eligible / Renogy AK-HI Air Eligible
   Inventory policy: DENY at qty 0

3. Renogy 500A Battery Monitor with Shunt
   SKU: RBM500-G3-US
   Shopify: ACTIVE
   Tag: AK-HI Eligible / Renogy AK-HI Air Eligible
   Inventory policy: DENY at qty 0

4. Renogy Battery Shunt 300
   SKU: RSHST-B02P300-G1-US
   Shopify: ACTIVE
   Tag: AK-HI Eligible / Renogy AK-HI Air Eligible
   Inventory policy: DENY at qty 0

5. Renogy 3000W 12V Pure Sine Wave Inverter
   SKU: RNG-INVT-3000-12V-P2-G3-US
   Shopify: ACTIVE
   Tag: AK-HI Eligible / Renogy AK-HI Air Eligible
   Inventory policy: CONTINUE

### DO NOT OPEN TO HAWAII
Renogy 400W compact suitcase portable solar panel
SKU: RSP400LSC-G1-US
Shopify: ACTIVE
Tag: AK-HI Blocked / Renogy AK-HI Solar >320W Block

## RENOGY CURRENT PUBLISHED SHIPPING RULE

Renogy's current U.S. shipping policy states that Alaska and Hawaii can be served by air, except batteries and solar panels exceeding 320W, and that AK/HI shipments typically carry a surcharge.

Source:
https://www.renogy.com/pages/shipping-rules

## IMMEDIATE EXECUTION PATH FOR COM 2

1. Keep the 400W suitcase blocked from Hawaii.
2. Treat all Renogy batteries as Hawaii-direct blocked unless routed through a separately approved Elevation Hawaii freight workflow.
3. Prioritize the five active non-battery Hawaii-eligible products above.
4. Do NOT rely on the current General-profile $8 / $15 / free-over-$70 rates for Hawaii.
5. Build or use a Hawaii-specific Renogy shipping treatment before calling the lane fully open.
6. Exact surcharge must come from Renogy checkout/dealer order truth or an owner-approved conservative flat/tiered rate. Do not invent shipping cost.
7. Preserve existing inventory/backorder controls. Do not flip DENY → CONTINUE unless dealer orderability is verified for that SKU.
8. Smoke-test a Hawaii address through checkout after the rate treatment is installed.
9. Record receipt with: SKU, Hawaii eligibility, shipping rate shown, purchaseability, and blocked exceptions.

## FASTEST SAFE LAUNCH ORDER

Wave 1:
- RSP10TC-G1-US
- RNG-CTRL-ADV30-LI-US
- RBM500-G3-US
- RSHST-B02P300-G1-US

Wave 2:
- RNG-INVT-3000-12V-P2-G3-US after surcharge/margin check due size/weight.

Blocked:
- RSP400LSC-G1-US (>320W solar)
- Renogy batteries
- Any draft SKU carrying unresolved orderability/media/price/inventory HOLD tags

## CURRENT BLOCKER

Exact Hawaii surcharge has not yet been resolved. TinyFish browser automation is currently unavailable because the connected wallet balance is negative, so live Renogy checkout-rate extraction cannot be automated from this worker at this moment.

Do not wait on broad catalog cleanup. Open the verified Hawaii-eligible Renogy accessory lane first once shipping cost protection is installed.
