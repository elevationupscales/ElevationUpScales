# Shopify Storefront Smoke Gate

Applies to Shopify storefront changes mirrored under `shopify-theme-mirror/`.

## Required before publication

1. Re-resolve the current Shopify MAIN theme before making a staging copy.
2. Create an unpublished copy and make theme-file edits there; do not write directly against MAIN.
3. Preserve existing purchase paths when performing mobile/layout cleanup.
4. Directly purchasable single-variant products should expose a clear **Buy now** path where appropriate.
5. Products requiring a customer selection should use **Choose options**; do not guess a variant.
6. Product hero/media CTAs must link to the exact product being shown.
7. Avoid competing duplicate card controls. One purchase action should be visually authoritative.
8. Do not place a collection in primary navigation when it has **0 active Online Store products**.
9. Prefer **2+ active purchasable products** for a primary category. A thinner category needs a deliberate landing experience or must remain secondary.
10. Every internal CTA anchor must resolve to a real element on the rendered page.
11. Customer-intake pages must render page-specific content, not a generic template that discards the page body.
12. Product launch checks: active status, media, vendor, product type, SKU, purchasable variant, SEO, shipping profile, and channel publication.
13. Mirror every Shopify theme/navigation/customer-facing repair to Git after the final published state is verified.
14. Perform a rendered browser smoke pass of homepage → brand collection → product → cart → contact/system-review → policies after publication.

## Current live baseline — 2026-10-01

Shopify theme: `gid://shopify/OnlineStoreTheme/207953396081` — `MPM28 HERO AMRS CORRECTION — READY TO PUBLISH`  
Role at sync: `MAIN`  
Shopify updatedAt: `2026-10-01T21:13:37Z`

Verified live changes:
- mobile homepage tightening preserved,
- homepage and collection purchase controls restored,
- Olight Featured standardized to Buy now / Choose options + View details,
- SOK key cards expose Buy now + View details,
- top feature video corrected from OSIGHT R to **OSIGHT XE AMRS** and linked to the exact XE AMRS product page.

## Open follow-up checks

- duplicate native quick-add controls,
- stalled product recommendations,
- remaining weak/editorial CTA treatments,
- SK12V100PC filler-copy cleanup,
- ArkPro Ultra Amber Orange availability recon,
- mobile + desktop regression QA.

Do not treat those follow-ups as permission to redesign the storefront or alter pricing, shipping, checkout, tax, policy, supplier, or fulfillment rules.
