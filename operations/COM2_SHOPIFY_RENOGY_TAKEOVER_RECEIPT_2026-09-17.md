# COM2 — Shopify Renogy Takeover Receipt — 2026-09-17

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Lane:** Company Operations / Shopify Renogy conversion  
**Scope:** bounded Shopify lane only  
**Starting resolved `main`:** `66f85f6de6a2529293883a10a449e6660898358f`

## Result

COM2 took control at the requested Renogy handoff point and completed the bounded priority sequence through current blockers.

No global OS controls, vendor master SOPs, theme/deployment code, eBay, TikTok, payment architecture, or unrelated channels were changed.

Private dealer costs, raw dealer inventory, private correspondence, and protected commercial terms are intentionally excluded from this public repository receipt.

## Real-order priority gate

- Shopify non-test order check: **CLEAR**
- Rechecked during the work and again before final draft-state updates: **no non-test order returned**
- No fulfillment routing was required during this run.

## Launched Renogy 10W smoke

Product: **Renogy 10W Solar Battery Trickle Charger Maintainer**  
SKU: `RSP10TC-G1-US`

Verified live Shopify state before smoke:

- ACTIVE
- $39.99
- inventory policy CONTINUE
- quantity 0
- available for sale
- three product media assets

Customer-path smoke result:

`PDP → CART INSERTION → CART → CHECKOUT → CARD → PAYPAL = PASS`

The cart contained exactly one unit at $39.99. No payment credentials were entered, no PayPal authorization was started, and no real order was placed.

## Next-five prep result

All five requested SKUs remain **DRAFT** with inventory policy **DENY** and quantity **0**. No duplicate product was created and no SKU was bulk-published.

### 1. Renogy 200W RV Solar Kit

SKU: `RKIT200RV-A30DT1-US`  
Current canonical Shopify product: `gid://shopify/Product/16002363720049`

**HOLD**

Open gates:

- exact-SKU identity / current dealer orderability
- approved exact-SKU media
- direct-site/channel authorization

A newer Renogy kit exists under a different SKU; the records must not be treated as interchangeable without exact confirmation.

### 2. Renogy 400W 12V Solar Premium Kit

SKU: `RNG-KIT-PREMIUM400D-RVR40-G4-US`  
Current canonical Shopify product: `gid://shopify/Product/16002364014961`

**HOLD**

Open gates:

- exact G4 identity / current dealer orderability
- approved exact-SKU media
- direct-site/channel authorization

Current public price reference matched the staged Shopify price during this review, but the exact G4 mapping still requires confirmation.

### 3. Renogy REGO 60A MPPT Controller

SKU: `RCC60REGO-G2-US`  
Current canonical Shopify product: `gid://shopify/Product/16002364244337`

**HOLD**

Open gates:

- exact G2-to-current-public-product price mapping
- current dealer orderability
- approved exact-SKU media
- direct-site/channel authorization

The current public retail reference is below the staged Shopify price for the base public SKU. The product was not silently repriced because exact G2/public alias equivalence has not been proven.

### 4. Renogy REGO 30A Bidirectional DC-DC Battery Charger

SKU: `RBC2115DS-21W-G1-US`  
Current canonical Shopify product: `gid://shopify/Product/16002364375409`

**HOLD**

Open gates:

- current dealer orderability
- approved exact-SKU media
- current U.S. warranty/current retail-price confirmation
- direct-site/channel authorization

### 5. Renogy 400W Compact Suitcase Portable Solar Panel

SKU: `RSP400LSC-G1-US`  
Current canonical Shopify product: `gid://shopify/Product/16002364211569`

**HOLD — one remaining activation class:** direct-site/channel authorization.

Cleared during prep:

- exact supplier SKU
- dealer-orderability evidence
- price/profit review
- three approved dealer-media assets already attached
- current public price check
- warranty check
- Lower-48 standard-shipping check
- Shopify record/copy/SEO preparation

Shopify currently exposes Shopify-hosted web presences only. Existing Renogy channel guidance supports Elevation's ecommerce store while also prohibiting third-party ecommerce platforms/marketplaces. COM2 did not infer that the current Shopify-hosted surface satisfies that distinction. Written vendor clarification or an authorized direct-site resolution is required before activation.

The stale `Shipping Economics Pending` tag was removed from this SKU and replaced with `Shipping Verified Lower 48`.

## Shopify record updates

All five drafts received a `Prep Reviewed 2026-09-17` marker plus specific HOLD tags matching the unresolved gates above. The tag mutation returned no user errors.

No price, status, publication, inventory quantity, inventory policy, theme, checkout, or payment configuration was changed on these five drafts.

## Control state

- Active 10W SKU smoke: **PASS**
- Real paid order priority gate: **CLEAR at final check**
- Next five: **PREPPED / HELD ONLY AT EXPLICIT UNRESOLVED GATES**
- Newly activated SKUs in this run: **0**
- Real test orders placed: **0**

## Next action

Keep the five drafts staged. Resolve exact SKU/orderability/media/price/warranty gates individually as identified above. Resolve the Renogy direct-site/channel authorization distinction before activating additional Renogy products on the current Shopify-hosted storefront. If a real paid Shopify order appears first, payment/SKU/vendor-source verification and fulfillment routing supersede catalog work.
