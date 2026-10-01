# Shopify Theme Mirror

This directory is a versioned Git mirror of selected Shopify storefront theme, navigation, and purchase-control files.

- Shopify remains the runtime/source platform for `shop.elevationupscales.com`.
- This mirror exists because the owner requires Shopify storefront changes to be preserved in Git as well.
- Do not deploy these files through the Cloudflare/Git website pipeline as Shopify storefront code.
- Current live Shopify theme ID: `gid://shopify/OnlineStoreTheme/207953396081`
- Current live theme name: `MPM28 HERO AMRS CORRECTION — READY TO PUBLISH`
- Shopify role at sync: `MAIN`
- Shopify updatedAt: `2026-10-01T21:13:37Z`
- Synced: 2026-10-01

## Current storefront standard

This mirror includes the October 1 mobile + purchasability repair and the OSIGHT XE AMRS hero correction.

Customer-facing purchase actions follow this standard:

- available single-variant product → **Buy now**
- available multi-variant product → **Choose options**
- unavailable product → **View product / View details**
- informational links remain secondary to the primary commerce action
- hero/product media must link to the exact product actually shown

The current live baseline also:
- preserves the tightened mobile homepage layout,
- restores global product-card purchase controls,
- standardizes Olight Featured actions,
- strengthens SOK purchase paths,
- and correctly identifies the top feature video as **Olight OSIGHT XE AMRS**.

## Next controlled cleanup

1. Remove duplicate native Shopify quick-add controls where they compete with the authoritative Buy now / Choose options control.
2. Repair or cleanly remove stalled `You may also like` recommendation states.
3. Strengthen remaining weak editorial/product CTAs without redesigning the storefront.
4. Replace remaining SOK filler copy with customer-facing guidance.
5. Verify ArkPro Ultra Amber Orange availability before changing its Shopify sellable state.
6. Run mobile + desktop regression QA after each follow-up theme change.

Future theme work must begin from a fresh copy of the current live Shopify theme and must not overwrite this mirror with an older staging baseline.
