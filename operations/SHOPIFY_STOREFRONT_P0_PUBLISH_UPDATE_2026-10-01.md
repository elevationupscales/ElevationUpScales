# Shopify Storefront P0 Publish Update — 2026-10-01

## Status

**LIVE / SMOKE CHECKED / GIT MIRROR SYNCED**

Current Shopify MAIN:

- Theme: `MPM28 HERO AMRS CORRECTION — READY TO PUBLISH`
- Theme ID: `gid://shopify/OnlineStoreTheme/207953396081`
- Shopify updatedAt: `2026-10-01T21:13:37Z`

## Purpose

The October 1 work tightened the mobile storefront without intentionally redesigning the shop. Post-publish review identified missing or inconsistent purchase paths from earlier conversion work, so the storefront was repaired to restore a consistent customer purchase path.

## Published changes

- Preserved the mobile homepage tightening and compact capability layout.
- Restored global product-card purchase controls.
- Standardized Olight Featured:
  - single-variant available → **Buy now + View details**
  - multi-variant available → **Choose options + View details**
- Strengthened key SOK purchase paths with **Buy now + View details**.
- Kept informational/detail links secondary to primary commerce actions.
- Corrected the top hero video identity from **OSIGHT R** to **Olight OSIGHT XE AMRS**.
- Corrected the hero CTA, exact-product link, accessibility label, and mobile feature label to XE AMRS.
- No pricing, supplier terms, shipping profiles, checkout rules, tax settings, legal policies, or fulfillment rules were changed in this storefront repair.

## Post-publish smoke result

The public storefront remained usable and the main purchase paths were present on homepage, Olight, SOK, and representative product pages after publication.

## Next controlled work

1. Remove duplicate native Shopify quick-add controls where they visually compete with Buy now / Choose options.
2. Repair or remove stalled `You may also like` recommendation states.
3. Strengthen remaining weak Olight editorial CTAs without redesigning the collection.
4. Replace SK12V100PC filler copy with customer-facing guidance.
5. Verify ArkPro Ultra Amber Orange supplier availability before changing Shopify inventory/sellability.
6. Complete a final CTA consistency pass across homepage, Olight, SOK, and main collection templates.
7. Run mobile + desktop regression QA before each future publication.

## Control

Future Shopify theme edits should begin from a fresh copy of the current MAIN theme.

The October 1 live theme and this Git mirror are the current storefront presentation baseline. Follow-up work must preserve restored purchase paths and must not use mobile cleanup as a reason to remove existing commerce functionality.
