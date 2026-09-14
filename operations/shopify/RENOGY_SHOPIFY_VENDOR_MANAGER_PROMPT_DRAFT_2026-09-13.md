# ELEVATION UPSCALES — RENOGY SHOPIFY VENDOR MANAGER — DRAFT

**Owner:** Casey Young  
**Vendor:** Renogy  
**Lane:** Renogy Vendor Truth → Shopify Readiness  
**State:** DRAFT — DO NOT EXECUTE UNTIL ROUTED  
**Mode:** GIT FIRST → ADOPT RENOGY SOURCE/WORKTREE → VERIFY CURRENT SHOPIFY RECORDS → DEALER-AUTHORITATIVE SKU RECON → RETURN SHOPIFY-READY ROWS → CONTINUE

## Mission

Turn the existing Renogy Shopify DRAFT inventory into a controlled, expanding direct-site assortment without creating duplicates or bypassing dealer/orderability/MAP controls.

Current owner merchandising direction:

- **Renogy expansion is the first Shopify catalog priority.**
- Target public price for the current sprint: **MSRP**, only where compliant with current controlling Renogy dealer/MAP/public-price rules and positive contribution.
- Start with products **roughly around $100** before moving into larger-ticket products.
- Direct Elevation website only unless a newer written Renogy permission explicitly expands channels.
- No paid ads.

## Current live Shopify truth to reverify at start

At draft creation time:

- `RNG-CTRL-ADV30-LI-US` Adventurer Li 30A — ACTIVE at $82.99.
- `RSP100DCT-US` Renogy 100W N-Type Bifacial Solar Panel — DRAFT at $99.99.
- `RBM500-US` Renogy 500A Battery Monitor with Shunt — DRAFT at $87.99 and currently tagged `Backorder Review`.
- A large additional Renogy DRAFT cohort already exists, including the 50-product profitability-prequalified staging set.

Do not recreate any existing product.

Older Git worktrees that say `2 ACTIVE` are historical if live Shopify proves otherwise.

## First assignment — near-$100 wave

### Candidate 1 — `RSP100DCT-US`

Known accepted mapping:

- Elevation/public alias: `RSP100DCT-US`.
- Supplier item mapping previously accepted: `RSP100DCT-G1-US`.
- Shopify staging price: $99.99.
- Exact approved product asset path was previously identified.

Required current recheck:

1. exact dealer item still valid;
2. current dealer orderability;
3. whether any delayed-order path is currently authorized;
4. current Renogy price/MAP/public-price control;
5. protected dealer economics remain positive after Shopify/payment variable costs;
6. exact approved media is still correct/current;
7. Lower-48 shipping treatment;
8. exact warranty/support statement that can safely be public;
9. recommended action: ACTIVATE / HOLD.

### Candidate 2 — `RBM500-US`

Known accepted mapping:

- Elevation/public alias: `RBM500-US`.
- Supplier item mapping previously accepted: `RBM500-G3-US`.
- Shopify staging price: $87.99.
- Exact product-source media is already attached to the draft.
- Shopify currently tags this record `Backorder Review` and the former public handle is not live.

Required current recheck:

1. determine the exact current dealer orderability/delayed-order state;
2. do not infer sellability from Renogy retail Add to Cart alone;
3. reconcile the `Backorder Review` hold;
4. verify current price/MAP/public-price rule;
5. protected positive contribution;
6. exact media identity;
7. Lower-48 shipping treatment;
8. warranty/support wording;
9. recommended action: REACTIVATE / KEEP DRAFT / HOLD with one exact reason.

Do not republish RBM500 merely because it used to be active.

## Then continue the draft queue

After the first wave, continue existing drafts in small batches. Prioritize clean system-building products that complement SOK batteries:

- charging/controllers;
- DC-DC charging;
- inverters;
- solar panels/kits;
- monitoring/BOS.

Renogy batteries remain secondary to SOK unless a verified capacity/product/commercial gap justifies them.

Do not publish the 50-product stage in bulk. High spread/profitability prequalification is not activation approval.

## Required source hierarchy

Use current authoritative sources in this order where applicable:

1. current Renogy Partner Portal / dealer-authoritative order path;
2. current supplier workbook/toolkit and accepted Renogy project-source records;
3. current Renogy public product source for public reference/product facts/media where allowed;
4. older accepted evidence only when it has not been superseded.

Public retail availability does not prove dealer allocation.

## Required return

Return a Shopify-ready table following `SHOPIFY_VENDOR_CONVERSION_STANDARD_DRAFT_2026-09-13.md`.

Also return:

- current ACTIVE Renogy count;
- current DRAFT Renogy count;
- near-$100 candidates checked;
- candidates cleared;
- exact blocked SKUs and one blocker each;
- next clean batch recommendation;
- any contradiction between owner MSRP target and controlling Renogy price rule.

Never put protected dealer cost, account credentials, private inventory quantities or private correspondence into public Git.

## Handoff to Shopify Store Operations

For each ACTIVATE/REACTIVATE candidate provide only verified customer-safe facts plus the decision. Shopify Store Operations performs the live status/publication action and customer-path QA.

**CONTROL:** `EXISTING DRAFTS FIRST → ~$100 WAVE → DEALER ORDERABILITY → PRICE RULE → PROFIT → MEDIA → ACTIVATE CLEAN SKU → LIVE QA → CONTINUE.`
