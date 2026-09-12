# PM4 → Renogy Team — Activation Handoff

**Date:** 2026-09-11 MDT  
**Owner:** Casey Young  
**From:** Operating System Project Manager — PM4  
**To:** Renogy Branch Operations Manager / Renogy Project Specialist / assigned Renogy catalog-commerce workers  
**State:** HANDOFF / RENOGY TEAM OWNS NEXT EXECUTION  
**Priority:** P1-C supporting P0 first profitable direct-site sale

## Git-first reconciliation

PM4 rechecked current `main` before this handoff. No newer Renogy execution commit supersedes `PM4_RENOGY_ACTIVATION_RECHECK_2026-09-11.md` at the time of routing.

Do not recreate dealer onboarding, supplier source intake, the five existing Shopify drafts, or previously accepted alias recon.

## New verified delta

### 1. Partner Portal session restored

The Renogy Partner Portal is currently authenticated for Elevation UpScales, Inc. The earlier session-expired blocker is no longer current.

Use the authenticated portal read-only for exact current sellability/orderability/inventory and generation/variant verification. Do not expose credentials or protected account data.

### 2. Supplier item source recon remains valid

Renogy's current supplier item workbook was re-read from the supplier email attachment. The already accepted alias mappings remain supported:

- `RSP100DCT-US` → `RSP100DCT-G1-US`
- `RBM500-US` → `RBM500-G3-US`

Protected dealer pricing exists in the supplier source but is intentionally not reproduced in public Git. Recheck current protected dealer economics immediately before activation/order execution.

### 3. Approved media authority confirmed

Renogy Sales Support explicitly supplied the Marketing Toolkit as the approved media packet for dealer partners. The toolkit states that the product/lifestyle visuals are ready to support partner websites, social media and in-store displays.

The supplier-shared Renogy Product Assets library was opened successfully and is organized by product category with images, videos, datasheets, manuals and tutorials.

### 4. Exact approved media path found for first launch candidate

For `RSP100DCT-US` / supplier item `RSP100DCT-G1-US`, the approved Renogy Product Assets library contains:

`1. Solar Panels → Bifacial N-Type Solar Panel → 100 & 200 Watts → 100Watt`

The same approved source contains:

`Datasheet-RSP100-200DCT-G1.pdf`

This materially clears the prior generic-media-source uncertainty for the 100W bifacial launch candidate. The Renogy team should select the exact product image(s) from that approved 100W folder, attach them to the existing Shopify draft, and preserve Renogy brand-use rules.

### 5. RBM500 media search not yet completed

`RBM500-US` remains an accepted launch candidate with supplier alias `RBM500-G3-US`, but PM4 did not complete an exact product-asset-folder identification before handoff.

Do not substitute a nearby monitor image. Locate the exact RBM500 asset folder/file in the approved Renogy Product Assets source or current Renogy product source before activation.

## Required next execution — Renogy team

1. PICK UP the existing five-product Renogy draft wave; do not recreate products.
2. Use the currently authenticated Partner Portal to verify current dealer sellability/orderability for `RSP100DCT-G1-US` and `RBM500-G3-US` first.
3. For `RSP100DCT-US`, select and attach exact approved media from the verified `100Watt` Bifacial N-Type asset folder.
4. Locate and bind exact approved `RBM500-G3-US` media before any RBM500 activation.
5. Reverify customer-facing price control against current Renogy retail reference and protected dealer economics immediately before activation.
6. Activate each clean SKU individually only after exact identity + current sellability/backorder authority + approved media + price control are all clean.
7. Run public product → cart → checkout QA after each activation.
8. Record the activation receipt and continue first-real-order proof.
9. Keep the three existing exact holds isolated: `RBC2125DS-21W-US`, `RNG-INVT-2000-12V-P2-US`, and `RNG-CTRL-RVR40` must not block cleaner SKU activation.

## PM4 boundary

PM4 is handing this execution back to the dedicated Renogy team. PM4 should not duplicate product edits or activation work while the Renogy team owns this lane unless the team escalates a blocker or management routing decision.

**CONTROL:** `PORTAL RESTORED → ALIAS MAP PRESERVED → RSP100 APPROVED MEDIA PATH VERIFIED → RENOGY TEAM FINISHES EXACT MEDIA + SELLABILITY QA → ACTIVATE CLEAN SKUS INDIVIDUALLY → PUBLIC QA → FIRST ORDER PROOF.`
