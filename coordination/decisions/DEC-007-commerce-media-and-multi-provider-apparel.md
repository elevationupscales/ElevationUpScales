# DEC-007 — Commerce Admin Media + Multi-Provider Apparel Architecture

**Date:** 2026-08-28  
**Status:** ACCEPTED

## Decision

Elevation Commerce will keep one Master Catalog while supporting multiple supplier/fulfillment providers.

Admin product rows must become visually scannable with product thumbnails, normalized store/category views, and provider status without creating separate supplier catalogs.

## Store/Admin views

Products & Listings remains the product master and gains filtered views for:

- RV & Outdoor
- Apparel
- Lithium
- Other / Review

Thumbnails use the Catalog primary image/provider thumbnail and are lazy-loaded/fallback-safe.

## Apparel suppliers

The Apparel lane must support these provider identities:

- Fourthwall
- Printful
- Spreadconnect
- Self / Other

Provider relationships are attached to Catalog products/variants; they do not become independent product databases.

## Fourthwall

Fourthwall is the first provider to receive an active read/reconcile integration. Use official Storefront API product/collection data to reconcile Fourthwall IDs, slugs, variants, prices and thumbnails with Catalog apparel records while preserving existing checkout links.

Platform API credentials, if later used, remain server-side. Unmatched products stage for review instead of creating duplicates.

## Printful and Spreadconnect

Prepare provider adapters/configuration states now, but do not show either as Connected until real credentials and a successful API test exist.

## Doba launch

The current owner-supplied Doba CSV must be launched through DEC-006 CSV Sync first. Products are staged/reconciled and only readiness-passing in-stock products are published.

## Categories

RV/Outdoor public merchandising is normalized around:

- RV Essentials & Water
- Solar & Off-Grid
- Camping & Shelter
- Automotive, ATV & Towing
- Tools & Workshop
- Outdoor Lighting & Power
- Travel & Organization
- Other / Review

Categories are Catalog metadata, not another database.

## Performance

Admin/store table thumbnails must use a single small lazy image; provider details should load only when relevant views open; avoid loading full galleries/legacy catalogs on unrelated pages; large product lists should progressively render or paginate.

## Boundary

Marketplace remains independent. Technician Portal remains separate. Supplier API secrets never appear in public code or repository content.
