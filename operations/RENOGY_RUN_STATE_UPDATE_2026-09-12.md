# Renogy RUN State Update — 2026-09-12

**Owner:** Casey Young  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Manager:** Renogy Branch Operations Manager  
**State:** ACTIVE / RESUMABLE  
**Git-first baseline checked:** `63771a0564dcfc40d515aa9e509bf0a92aa92ddc`

## Reconciliation

Current `main` was re-resolved immediately before this RUN. The controlling Renogy handoff remains `PM4_TO_RENOGY_TEAM_ACTIVATION_HANDOFF_2026-09-11.md`, with `RENOGY_DIRECT_SITE_PROFITABILITY_APPLICATION_2026-09-12.md` now applying the company profitability gate to the launch wave.

The Renogy activation sequence remains:

**PORTAL READ-ONLY ORDERABILITY CHECK → EXACT APPROVED MEDIA → CURRENT PUBLIC PRICE / PROTECTED ECONOMICS CHECK → FULL VARIABLE COST CHECK → ACTIVATE CLEAN SKU INDIVIDUALLY → PUBLIC PRODUCT/CART/CHECKOUT QA → FIRST REAL ORDER PROOF**

## Preserved verified state

- Five Renogy Shopify records already exist as DRAFT. Do not recreate them.
- `RSP100DCT-US` maps to supplier item `RSP100DCT-G1-US`.
- `RBM500-US` maps to supplier item `RBM500-G3-US`.
- Exact approved Renogy media path for `RSP100DCT-US` is established in the supplied Product Assets library under the 100W Bifacial N-Type panel folder.
- Current protected supplier economics are maintained outside public Git.
- The three isolated exact holds remain isolated and must not block the cleaner launch candidates:
  - `RBC2125DS-21W-US`
  - `RNG-INVT-2000-12V-P2-US`
  - `RNG-CTRL-RVR40`

## Opera authenticated Partner Portal recon

Owner directed use of the connected Opera browser.

Opera reconfirmed an active authenticated Renogy Partner Portal session for Elevation UpScales, Inc. The portal home still exposes Products, Shopping Cart, My Orders, My Invoices and Customer Support navigation and Renogy Sales Support contact information.

The current Opera connector can read the authenticated accessibility tree and navigate directly to URLs, but it still does not expose a click/press action for the portal SPA `Products` list item. A direct `/#/products` navigation was also tested and returned the authenticated portal home rather than a product catalog. It is not treated as orderability evidence.

Therefore exact current dealer orderability/backorder authority for `RSP100DCT-G1-US` and `RBM500-G3-US` remains **OPEN / HOLD** until the authenticated Products action can actually be invoked or an equivalent dealer-authoritative source is obtained.

No password reset, password creation, account-security change, order placement, payment-method change, tax-setting change, address change or other Renogy account mutation was attempted.

## Public Renogy product-state delta — live Opera check

The live customer-facing Renogy pages materially changed from the previously recorded public-unavailable state.

### `RSP100DCT-US`

- Exact current public SKU displayed: `RSP100DCT-US`.
- Current public reference displayed: **$99.99**.
- Live Opera accessibility tree exposes **Add to Cart** and **Buy Now** controls.
- Page displays delivery-time language of **1–3 business days**.
- This is a public retail/customer surface only. It does **not** prove current dealer allocation, dealer backorder authority, or supplier acceptance for `RSP100DCT-G1-US`.

### `RBM500-US`

- Exact current public SKU displayed: `RBM500-US`.
- Current public reference displayed: **$87.99**.
- Live Opera accessibility tree exposes **Add to Cart** and **Buy Now** controls.
- Page displays delivery-time language of **1–3 business days**.
- This is a public retail/customer surface only. It does **not** prove current dealer allocation, dealer backorder authority, or supplier acceptance for `RBM500-G3-US`.

The former blanket statement that both public launch candidates are currently unavailable is retired. Public retail order controls are live at this check, while the dealer-orderability gate remains separate and unresolved.

## RBM500 exact-media recon

The approved supplier-shared Product Assets library remains accessible in Opera.

- `7.Accessory` exposes exact SKU-named folders but does not expose an exact `RBM500-G3-US` folder in its current top-level contents.
- `0. Smart Power Management` also does not expose an exact `RBM500-G3-US` folder in its current top-level contents.
- No nearby Renogy ONE monitor, smart shunt, or generic monitor asset is accepted as a substitute.

The controlling PM4 handoff permits exact RBM500 media to come from either the approved Product Assets source **or the current Renogy product source**. The exact current Renogy `RBM500-US` product page was therefore inspected in Opera and exposes a product-specific gallery including:

- `RBM500-_01_` through `RBM500-_07_` image assets;
- an exact Renogy 500A Battery Monitor wiring image;
- `RBM500--600_08_` supporting image;
- an additional exact Renogy 500A Battery Monitor product image.

Because the supplier alias `RBM500-US` → `RBM500-G3-US` is already accepted in the controlling handoff, the **exact-media identification gate is now CLEARED at the current Renogy product-source level**. Media still must be bound to the existing Shopify draft before activation. Do not infer any additional G3-specific product difference beyond the accepted supplier alias.

## Profitability / activation control

No Renogy SKU was activated during this recon RUN.

Current launch-candidate state:

- `RSP100DCT-US` / `RSP100DCT-G1-US`: exact identity clean; approved media path clean; public price/control surface current; **dealer orderability + applicable checkout/platform fee treatment remain open**.
- `RBM500-US` / `RBM500-G3-US`: exact identity clean; exact product-source media identified; public price/control surface current; **dealer orderability + applicable checkout/platform fee treatment remain open; media binding remains an activation step**.

Do not convert public retail Add to Cart / Buy Now controls into dealer availability. Do not activate from the public page alone.

Resume directly at the first available dealer-authoritative route:

1. invoke Products inside the existing authenticated Partner Portal session, or obtain an equivalent dealer-authoritative exact-SKU response;
2. verify `RSP100DCT-G1-US` exact dealer orderability / delayed-order state;
3. verify `RBM500-G3-US` exact dealer orderability / delayed-order state;
4. resolve applicable Shopify/PayPal checkout fee treatment and final protected contribution privately;
5. bind exact approved/current Renogy media to each existing draft as required;
6. activate each positive-contribution clean SKU individually;
7. run public product → cart → checkout QA;
8. record activation receipt and continue first-real-order proof.

## State

**RENOGY: ACTIVE / OPERA AUTHENTICATION VERIFIED / PUBLIC RETAIL CONTROLS LIVE FOR BOTH LAUNCH CANDIDATES / EXACT MEDIA IDENTIFIED FOR BOTH / DEALER ORDERABILITY REMAINS THE PRIMARY SUPPLIER GATE.**
