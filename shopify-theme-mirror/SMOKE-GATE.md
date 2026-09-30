# Shopify Storefront Smoke Gate

Applies to Shopify storefront changes mirrored under `shopify-theme-mirror/`.

## Required before publication

1. Re-resolve the current Shopify MAIN theme before making a staging copy.
2. Do not place a collection in primary navigation when it has **0 active Online Store products**.
3. Prefer **2+ active purchasable products** for a primary category. A thinner category needs a deliberate landing experience or must remain secondary.
4. A published zero-product collection must have one of:
   - an intentional recovery/route hub,
   - an approved redirect,
   - or Online Store publication removed.
5. Every internal CTA anchor must resolve to a real element on the rendered page.
6. Customer-intake pages must render page-specific content, not a generic template that discards the page body.
7. Product launch checks: active status, media, vendor, product type, SKU, purchasable variant, SEO, shipping profile, and channel publication.
8. Mirror every Shopify theme/navigation/customer-facing repair to Git before release.
9. Run Git QA on the mirror PR.
10. Perform a rendered browser smoke pass of header → collection → product → cart → contact/system-review → policies before production publication.

## Current P1 repair baseline

Staged Shopify theme: `gid://shopify/OnlineStoreTheme/207872917873` — `SMOKE P1 REPAIRS — READY TO REVIEW`  
Role at sync: `UNPUBLISHED`  
Shopify updatedAt: `2026-09-30T01:28:12Z`  
Git main baseline at sync: `5f1335de1903b6f4ff9627e83ffe126d6ddb9fd5`

This staging pass adds:
- zero-product collection recovery routing,
- corrected System Review rendering and intake,
- repaired Solar & Charging results CTA,
- cleaned primary navigation using active destinations,
- OSIGHT XE AMRS SEO completion.
