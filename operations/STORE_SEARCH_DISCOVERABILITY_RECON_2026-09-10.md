# Elevation UpScales — Store Search Discoverability Recon

**Date:** 2026-09-10  
**Owner:** Casey Young  
**Scope:** Public search visibility for the Elevation universal store and active vendor catalog routes  
**Status:** RECONCILED / DEVELOPMENT ACCEPTANCE INPUT

## Boundary

This is public web-search reconnaissance, not Google Search Console or Google Merchant Center verification.

Public search results can prove that a route is discoverable. Failure to appear in one targeted search does not prove a route is permanently unindexed.

Google-owned indexing, crawl, Merchant Center/feed approval, Shopping eligibility and search-performance data must be verified through the relevant Google account/property when that access is available.

## Public discoverability confirmed

Current public search recon can find:

- `https://elevationupscales.com/` — Elevation homepage/store positioning;
- `https://elevationupscales.com/store` — universal store route showing the one-store / one-catalog / one-checkout architecture;
- `https://elevationupscales.com/sok-batteries` — dedicated SOK catalog route;
- `https://elevationupscales.com/sok/sk12v100pc/` — exact SOK product page;
- `https://elevationupscales.com/lithium-batteries` — public lithium catalog route;
- `https://elevationupscales.com/solar-project` — public Solar Builder route containing Renogy planning/component references.

## Vendor coverage finding

### SOK

**PUBLIC VENDOR CATALOG DISCOVERABILITY PROVEN.**

SOK has a dedicated catalog route and exact product pages that are publicly discoverable.

### Renogy

**BRAND/BUILDER VISIBILITY EXISTS; LIVE RETAIL CATALOG VISIBILITY NOT YET PROVEN.**

Renogy appears publicly in the Solar Builder/system-planning experience, but the connected Shopify catalog currently contains no Renogy products and no Renogy collection. Therefore there is not yet a customer-facing Renogy retail catalog/product route to expect from search.

### VEVOR

**LIVE SHOPIFY PRODUCT DATA EXISTS; DISTINCT ELEVATION PUBLIC-SEARCH VENDOR/PRODUCT VISIBILITY NOT YET PROVEN IN THIS RECON.**

The connected Shopify store contains active VEVOR products, but targeted public web searches during this recon did not return a distinct Elevation VEVOR vendor catalog/product destination comparable to SOK.

This is a discoverability/route-integration residual, not proof that individual URLs can never be indexed.

### Kingboss

**STORE NAVIGATION/BRAND ROUTE REFERENCE EXISTS; FULL LIVE CATALOG DISCOVERABILITY NOT YET PROVEN.**

The universal store publicly references Kingboss, but the vendor remains onboarding/waiting and should not be treated as a completed public catalog until verified current supplier-backed catalog facts support that state.

## Developer acceptance implication

For each active vendor intended to be a public retail supplier, completion should eventually produce:

**UNIVERSAL STORE DISCOVERY → VENDOR/CATEGORY DISCOVERY → EXACT PRODUCT PAGE → CORRECT PURCHASE/ASSISTED PATH → SEARCH-ENGINE DISCOVERABILITY**

Do not create a separate visual store for each vendor unless explicitly authorized. Use the existing universal-store architecture and approved vendor routes.

## Search/index technical recon items

The developer lane should verify, without changing approved design/copy unless separately authorized:

- canonical public vendor/product URLs;
- current HTTP success behavior;
- no accidental password/authentication wall for intended public pages;
- no accidental `noindex`/robots block on intended public vendor/product pages;
- internal links from the existing store/navigation/collections where appropriate;
- stable product/vendor identity in existing page metadata/data;
- sitemap inclusion where the site architecture uses a sitemap;
- structured product/vendor data where already supported by the current architecture and technically justified;
- canonical-domain consistency between `elevationupscales.com` and Cloudflare Pages origins;
- Search Console property/index status when account access is available;
- Google Merchant Center/feed readiness only when product/channel policy and account setup authorize it.

## No-design / no-copy rule

This recon does not authorize:

- changing approved page design;
- rewriting homepage/store/product marketing copy;
- changing brand voice;
- inventing vendor claims;
- adding unsupported dealer/authorized language;
- adding unsupported shipping, warranty, stock or price promises.

Technical discoverability fixes should preserve existing approved presentation whenever possible.

## Current conclusion

Elevation itself is publicly discoverable and the universal store is indexed/discoverable. SOK is the current strongest example of a vendor catalog that is both customer-operational and publicly discoverable.

The completion target is to bring every active vendor that is meant for public direct retail into the same universal-catalog functional/search state, subject to its exact supplier authorization and readiness.
