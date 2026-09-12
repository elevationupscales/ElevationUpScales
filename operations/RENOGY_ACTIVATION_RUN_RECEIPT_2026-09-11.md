# Elevation UpScales — Renogy Activation RUN Receipt

**Date:** 2026-09-11 MDT  
**Owner:** Casey Young  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Project Operations Manager:** Renogy Branch Operations Manager  
**State:** RUN EXECUTED / ACTIVATION QA ADVANCED / PORTAL VERIFICATION TOOL-BLOCKED

## Git-first reconciliation

Current `main` was re-resolved before execution. The newest Renogy-specific control delta is `PM4_TO_RENOGY_TEAM_ACTIVATION_HANDOFF_2026-09-11.md`, which returns the Renogy activation lane to the dedicated Renogy team.

That handoff preserves the existing five Shopify drafts, accepted supplier alias mappings, the authenticated Partner Portal as the dealer orderability source, and the approved Renogy Marketing Toolkit / Product Assets library as the public-media authority.

## Live Shopify verification

The connected Elevation Shopify store currently contains exactly five Renogy products and all five remain `DRAFT`:

- `RSP100DCT-US` — Renogy 100W N-Type Bifacial Solar Panel — DRAFT
- `RBM500-US` — Renogy 500A Battery Monitor with Shunt — DRAFT
- `RBC2125DS-21W-US` — Renogy 50A IP67 DC-DC Battery Charger with MPPT — DRAFT
- `RNG-CTRL-RVR40` — Renogy Rover Li 40A MPPT Solar Charge Controller — DRAFT
- `RNG-INVT-2000-12V-P2-US` — Renogy 2000W 12V Pure Sine Wave Inverter — DRAFT

No accidental Renogy activation was found. Existing draft records were preserved and were not recreated.

## Supplier pricing rule reverified

Current Renogy Sales Support correspondence states that Renogy products should use the pricing currently listed on the Renogy retail website as the reference for current public-facing pricing. Protected dealer economics remain private.

Current Renogy US retail checks on the two clean launch candidates show:

- `RSP100DCT-US` — current public retail reference: `$99.99`; existing Shopify draft price: `$99.99` — PUBLIC PRICE REFERENCE MATCH
- `RBM500-US` — current public retail reference: `$87.99`; existing Shopify draft price: `$87.99` — PUBLIC PRICE REFERENCE MATCH

This receipt does not expose protected dealer cost or margin.

## Public availability observation

The current Renogy US retail product pages show both `RSP100DCT-US` and `RBM500-US` as `Unavailable` at the time of this check.

Public retail availability is not the dealer inventory/orderability source and does not independently cancel previously accepted SKU-specific backorder evidence. The current Partner Portal remains the controlling dealer orderability/sellability verification source immediately before activation/order execution.

## Approved media authority

The supplier-provided Renogy Marketing Toolkit was re-read. It explicitly states that its product and lifestyle visuals are ready to support partner websites, social media and in-store displays.

The toolkit's `DOWNLOAD VISUALS` link resolves to the supplier-shared Dropbox Marketing Toolkit, which exposes the `Renogy Product Assets (Images, Videos, Datasheet, Manual, Toturials)` library.

The PM4 handoff already verified the exact first-candidate media path:

`1. Solar Panels → Bifacial N-Type Solar Panel → 100 & 200 Watts → 100Watt`

and the corresponding datasheet:

`Datasheet-RSP100-200DCT-G1.pdf`

No nearby or substitute product image is authorized for `RBM500-G3-US`; exact RBM500 media remains to be located before activation.

## Partner Portal execution result

The current Git state says the Partner Portal authenticated session is available. The attempted read-only portal verification in this RUN could not start because the external browser-automation wallet had insufficient funds.

This is a tooling-access blocker, not evidence that the Renogy session is invalid or that the supplier account is unavailable.

Because the controlling Renogy Project Source requires current dealer orderability/sellability verification immediately before activation, neither clean candidate was activated during this RUN.

## Activation state after RUN

### `RSP100DCT-US`

- alias mapping to `RSP100DCT-G1-US`: ACCEPTED
- Shopify draft: VERIFIED / PRESERVED
- public retail price reference: MATCH
- exact approved media path: VERIFIED
- current dealer orderability/sellability: PORTAL CHECK STILL REQUIRED
- activation: HELD ONLY ON CURRENT PORTAL ORDERABILITY + FINAL EXACT MEDIA ATTACHMENT

### `RBM500-US`

- alias mapping to `RBM500-G3-US`: ACCEPTED
- Shopify draft: VERIFIED / PRESERVED
- public retail price reference: MATCH
- exact approved media authority: VERIFIED GENERALLY
- exact RBM500 approved asset: STILL TO LOCATE
- current dealer orderability/sellability: PORTAL CHECK STILL REQUIRED
- activation: HELD ONLY ON CURRENT PORTAL ORDERABILITY + EXACT MEDIA BINDING

### Existing exact holds

Remain isolated and do not block the cleaner two candidates:

- `RBC2125DS-21W-US` — current dealer orderability / delayed-order authority
- `RNG-INVT-2000-12V-P2-US` — exact current generation / order-source identity
- `RNG-CTRL-RVR40` — exact current variant identity

## Next executable action

1. Restore the read-only browser-automation path and run the authenticated Partner Portal exact-item checks.
2. Clear `RSP100DCT-G1-US` and `RBM500-G3-US` current dealer sellability/orderability independently.
3. Attach the exact approved 100W panel media to the existing Shopify draft.
4. Locate and bind the exact approved RBM500-G3 media.
5. Refresh public-facing price reference immediately before activation.
6. Activate each clean SKU individually only when its full publication set is clean.
7. Run public product → cart → checkout QA after each activation.
8. Continue first-real-order proof and Tier B mapping.

## Control

**DO NOT ACTIVATE FROM PUBLIC RETAIL AVAILABILITY ALONE. DO NOT RECREATE THE FIVE DRAFTS. DO NOT SUBSTITUTE MEDIA. BLOCK ONLY THE EXACT UNVERIFIED SKU ACTION.**
