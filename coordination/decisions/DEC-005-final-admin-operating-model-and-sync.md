# DEC-005 — Final Admin Operating Model + Listing Sync Architecture

**Date:** 2026-08-28  
**Updated:** 2026-09-07  
**Status:** ACCEPTED / CONTROLLING

## Decision
Elevation Admin will be organized around stable business objects instead of additional disconnected pages.

Permanent owner model:

- **Overview / Mission Control** = what needs attention today
- **Orders & Fulfillment** = what customers bought and what must be fulfilled
- **Leads** = customer leads plus clearly separated Supplier Growth, Solar, Work With Us, and Portal-ready views
- **Products & Listings** = what Elevation sells and what is live, including pricing review and promotions as secondary tools
- **Inventory** = whether Elevation can source it and what it costs
- **Channels & Sync** = whether source/channel state agrees with Elevation, including supplier/channel/provider setup as secondary tools
- **Shipping & Logistics** = how difficult/special shipments move
- **Analytics** = read-only decision support
- **System / QA** = automation, sync and deployment health

## 2026-09-07 consolidation update
Marketplace is retired from active owner operations because it has produced no active listing usage while carrying avoidable Admin query, navigation, follow-up, moderation, and public seller-intake overhead. Historical Marketplace D1/R2 records are preserved during soft retirement; retirement does not authorize destructive data deletion.

Marketplace is removed from the permanent owner model. Public Marketplace and seller-entry routes may redirect to the active Elevation Store / RV Store. Marketplace-specific Admin aggregation, follow-up and moderation surfaces should not run in the normal Command Center path.

The Admin rail is limited to the nine permanent areas above. The following are not permanent top-level destinations and must be nested under their owning systems instead of competing as separate managers:

- Supplier Growth, Solar, Work With Us, and Portal-ready state → **Leads**
- Commerce Pricing and Promotions → **Products & Listings**
- Commerce Logistics / source-provider setup and advanced checkout mapping → **Channels & Sync**
- legacy lithium technical controls → **Shipping & Logistics → Advanced / Historical**

`Lithium Shipping Matrix` remains retired as the normal owner-facing concept. Existing Hawaii backend controls remain mandatory and are exposed through simplified Shipping & Logistics with progressive disclosure.

## Release workflow
Admin consolidation releases follow:

**current main → focused work branch → code → QA → diff check → isolated preview when available → management approval → merge → production deploy → live verification → receipt → new accepted baseline**

Release A retires Marketplace active operations and simplifies Command Center / Leads navigation. Release B consolidates commerce navigation and presentation without changing protected commerce business rules. Shipping/SOK simplification and destructive dead-code cleanup remain later releases.

## Catalog / sync rule
Catalog remains the product master. Sync-state records are relationship/health records and must not become a second product database.

## Auto Upload vs Auto Sync
- **Upload/Publish** creates a listing that does not yet exist.
- **Sync** reconciles an existing product/listing/source relationship and keeps it current.

Auto upload must not duplicate an existing mapped listing. Auto sync must not auto-publish an unknown product.

## One-writer rule
Each externally synchronized field has one authoritative writer. Doba/source owns supplier cost/availability; Elevation Catalog owns commercial authorization/merchandising; channels own observed external listing state; Orders owns customer fulfillment. If Doba is already writing inventory to eBay/TikTok, Elevation must monitor rather than create a second writer unless ownership is deliberately transferred.

## Safety
Sync may safely update source observations, stock/cost snapshots, external state and timestamps. Material identity, SKU, margin, shipping, duplicate, supplier-error or compliance changes become REVIEW/HOLD instead of being blindly mirrored.

This consolidation does not authorize changes to product truth, prices, MAP protections, inventory values, checkout, PayPal, SOK product rules, Hawaii/Alaska freight gates, customer/Solar lead routing, Supplier Growth data, Cloudflare bindings, or secrets.

## eBay
An earlier Elevation release implemented scheduled eBay inventory refresh. Rebuild the useful pattern against the current Catalog/Inventory architecture rather than restoring the old branch wholesale. Existing legacy/Seller Hub listings are monitor-only until exact mapping is verified and deliberate API management/migration is approved.

## Doba
Use Doba API/feed/store integration only when the actual account capability is verified. Never show `Auto Sync` if the current source is manual. Doba direct channel connections may remain the inventory writer for supported stores.

## Listing recovery
After the final Admin release is verified, reconcile current Catalog + current supplier/source data + live eBay + legacy eBay candidate records + Fourthwall mappings. Stage missing valid products as Draft/Review; publish only readiness-passing products. Retired Marketplace records are excluded.

## Supersedes
This decision expands and supersedes the narrower implementation scope of `DEC-004` for the final Admin build. DEC-004 remains valid specifically for preserving Hawaii backend controls while simplifying the owner UI.

## Controlling handoff
`coordination/handoffs/2026-08-28-final-admin-operating-system-listing-sync.md`
