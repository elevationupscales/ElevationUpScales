# Renogy Backorder + Profitability RUN Recon — 2026-09-12

**Owner:** Casey Young  
**Project:** Renogy Vendor Operations  
**Mode:** RUN / GIT FIRST / PROFIT-FIRST / DIRECT-SITE ONLY  
**Controlling profitability gate:** `operations/DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md`

## Live Shopify state

Live Shopify recon shows six Renogy products in the connected Elevation store.

- One product is currently ACTIVE: `RNG-CTRL-ADV30-LI-US` — Renogy Adventurer Li 30A PWM Solar Charge Controller with LCD — customer price $82.99.
- Five previously controlled Renogy launch products remain DRAFT, including `RSP100DCT-US` and `RBM500-US`.
- The Renogy Branch Operations Manager did not activate the Adventurer listing during this RUN. Treat it as a cross-worker/store delta and reconcile rather than recreate or duplicate it.

## Adventurer exact-SKU reconciliation

Supplier source mapping:

- Shopify/customer SKU: `RNG-CTRL-ADV30-LI-US`
- Current Renogy dealer workbook source item: `RNG-CTRL-ADV30-LI-G2-US`
- Supplier workbook status: `In Use`
- Protected dealer economics exist and show positive pre-fee contribution at the current customer price. Protected dealer pricing is intentionally not reproduced in Git.

Current Renogy US public product page verifies:

- customer-facing price: $82.99;
- exact Adventurer Li 30A PWM flush-mount controller identity;
- current public availability language: **backordered and will ship when back in stock**.

The Shopify price therefore currently matches Renogy's public retail reference. Public backorder status does **not** by itself prove Elevation's dealer portal can place the exact SKU as a dealer backorder.

## Profitability decision

The Adventurer listing is not a negative-contribution candidate based on the protected supplier economics already available. Ordinary Shopify/PayPal fee scenarios reviewed in the Renogy profitability lane do not erase the protected positive contribution buffer.

Current commercial state:

**ACTIVE / PRICE-CLEAN / PROFIT-BUFFER VERIFIED / PUBLICLY BACKORDERED / DEALER BACKORDER AUTHORITY NOT YET PROVEN**

Do not mark it `PROMOTE` as normal in-stock inventory until exact dealer backorder/orderability authority is verified. Do not deactivate solely because Renogy's public site is backordered if the direct-site workflow is intentionally preserving checkout while the exact fulfillment path is being confirmed.

## Backorder control rule for Renogy

Until explicit dealer-portal evidence is captured:

1. Renogy public backorder language may be used as evidence that Renogy itself supports a customer backorder state for the product.
2. It is **not** sufficient evidence that Elevation can submit the same exact SKU as a dealer backorder.
3. Any Elevation listing kept sellable while dealer backorder authority is pending must not represent the item as physically on hand or immediately shippable.
4. Before the first paid Renogy backorder is fulfilled, reverify exact dealer SKU, dealer orderability/backorder acceptance, protected current cost, Lower-48 shipping treatment, and resulting contribution.
5. If dealer backorder is not allowed, correct the exact listing's availability state without blocking unrelated Renogy catalog work.

## Original launch wave

`RSP100DCT-US` and `RBM500-US` remain DRAFT.

Their protected supplier economics remain positive before final order-specific checks. The remaining launch gates are:

- exact dealer orderability/backorder authority;
- exact Lower-48 shipping/freight treatment at order time;
- exact approved RBM500 media for `RBM500-US`;
- final order contribution using actual checkout/fulfillment treatment.

The three older isolated Renogy holds remain isolated and do not block cleaner SKUs.

## Current RUN decision states

- `RNG-CTRL-ADV30-LI-US`: **ACTIVE / BACKORDER CONTROL REVIEW / PROFIT BUFFER VERIFIED**
- `RSP100DCT-US`: **DRAFT / HOLD — ORDERABILITY + FINAL CONTRIBUTION CHECK**
- `RBM500-US`: **DRAFT / HOLD — ORDERABILITY + MEDIA + FINAL CONTRIBUTION CHECK**

## Tooling note

Opera was authenticated earlier in this worktree, but the Opera Browser Connector disconnected during this RUN. This is a tooling-state issue and is not treated as evidence that the Renogy account is unavailable.

## Next executable action

When authenticated Partner Portal interaction is available, resume directly at exact-SKU dealer orderability/backorder checks for:

1. `RNG-CTRL-ADV30-LI-G2-US`;
2. `RSP100DCT-G1-US`;
3. `RBM500-G3-US`.

Then classify each exact SKU:

**PROMOTE / ACTIVE-BACKORDER / HOLD — ECONOMICS UNKNOWN / HOLD — NOT ORDERABLE / HOLD — NEGATIVE CONTRIBUTION**

without exposing protected dealer cost in public Git.

**Control phrase:**

**KEEP CHECKOUT POSSIBLE WHEN FULFILLMENT IS REAL → DO NOT FAKE STOCK → VERIFY DEALER BACKORDER AUTHORITY → VERIFY CONTRIBUTION → FULFILL → RECORD ACTUALS.**
