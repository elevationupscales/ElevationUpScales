# Elevation UpScales, Inc. — Storefront First-Pass Production Receipt

**Project:** Elevation 4.4 (handoff issued under Elevation 4.3)  
**Date:** 2026-08-31  
**Scope:** Lithium Shop + RV & Outdoor Shop storefront merchandising / crawler-readable Catalog output  
**Apparel:** Preserved / regression reference only  
**Final disposition:** PASS

## Release lineage

- Accepted shop application baseline at intake: `9cf4d28e83a50ea1a7cb8c745ee2e4fd73eb1e0c`
- Repo `main` reconciled before work: `ea26349c836fe8389a7170ca618fa3ccbb4b75e7`
- Verified storefront site SHA: `03c83ef6e4b9deae5610c0d4bd29ac606060dff4`
- Release branch: `release/storefront-first-pass-2026-08-31`
- Intended final rollback/baseline branch: `baseline-2026-08-31-storefront-first-pass`

The release branch was reconciled with the current `main` record before preview. The storefront production gate independently reconfirmed that `main` remained at `ea26349c836fe8389a7170ca618fa3ccbb4b75e7` and that the deployed `site/` tree was byte-equivalent to the successfully previewed site tree before production deployment.

## Preview evidence

- Final accepted preview workflow run: `33428246549` — PASS
- Verified preview site SHA: `03c83ef6e4b9deae5610c0d4bd29ac606060dff4`
- Full site JavaScript syntax sweep: PASS
- Scoped-delta / current-main lineage: PASS
- Public route smoke: PASS
- Admin authentication boundaries: PASS
- Apparel regression check: PASS
- Required non-JavaScript / crawler-style Catalog acceptance: PASS

An earlier preview run (`33427400990`) correctly failed the new crawler acceptance requirement because the static storefront pages were not included in the Pages Worker route set. Production was not touched. The release was repaired by routing only `/lithium-batteries` and `/rv-store` through the existing Worker so current published Catalog data could be prerendered into the initial HTML. The corrected candidate was then fully reverified before production.

## Production evidence

- Production workflow run: `33428438869` — PASS
- Production Pages deployment: `https://8bcf6235.elevationupscales.pages.dev`
- Canonical production site: `https://elevationupscales.com`
- Production evidence artifact ID: `9771659098`
- Production evidence artifact SHA-256: `6596fff52cec4c48dee294811c88bfcd22c57faba3529bae1723a4d5c56414f1`
- Automatic rollback was prepared but not invoked because all production verification passed.

HTTP 200 was verified on both the direct Pages deployment and canonical production site for:

- `/`
- `/store`
- `/rv-store`
- `/lithium-batteries`
- `/hawaii-lithium-batteries`
- `/checkout`
- `/marketplace`
- `/start-a-project`
- `/solar-project`
- `/admin`

Unauthenticated production Admin APIs remained protected with HTTP 401 for:

- `/api/admin/catalog`
- `/api/admin/inventory`
- `/api/admin/store-orders`
- `/api/admin/lithium-shipping`

Checkout configuration remained live and verified:

- `configured=true`
- `checkoutEnabled=true`
- `liveCheckoutApproved=true`
- `environment=live`

## Required crawler / non-JavaScript acceptance

The crawler-visible HTML is generated from the same current public Catalog handler used by the storefront APIs. Counts are not hard-coded and no second product source was created. Client-side JavaScript enhances filtering, sorting, categories, shopping-list behavior and live refresh after the initial Catalog-backed HTML is served.

### Lithium Shop — PASS

- Canonical crawler-visible published product count: **38**
- Initial HTML includes rendered product cards before JavaScript runs.
- Initial HTML does not contain `0 current products` or `Loading products…` as the published-inventory state.
- Example rendered names observed in production:
  - `RV & Solar Lithium Battery`
  - `Portable Solar Power Bank`
  - `Lithium Battery`
- Response includes `X-EUS-Storefront-Prerender: lithium:38`.

### RV & Outdoor Shop — PASS

- Canonical crawler-visible published/readiness-passing product count: **19**
- Initial HTML includes rendered product cards before JavaScript runs.
- Initial HTML does not contain `0 current products` or `Loading products…` as the published-inventory state.
- Example rendered names observed in production:
  - `Rechargeable 200,000 Lumens LED Spotlight`
  - `8L Hot Water Heater Tankless Instant Boiler Outdoor`
  - `Portable Walk-In Greenhouse 20' x 10' Hot House with Steel Hoops & Windows`
  - `12V Electric Scissor Car Jack & Impact Wrench`
  - `12V Water Diaphragm Pump - 5.5 GPM & 70 PSI Adjustable`
- Response includes `X-EUS-Storefront-Prerender: rv:19`.

The production verifier compared the crawler-visible counts directly against the current public Catalog API sets on both the direct Pages deployment and canonical domain.

## Storefront changes

### Lithium

- Reorganized product cards around human display title, supported use-case subtitle, technical spec line, price, factual shipping state and CTA.
- Removed visible raw supplier SKU from primary cards.
- Removed raw supplier taxonomy and supplier-style title presentation from primary cards.
- Reduced internal / implementation-oriented copy.
- Added shopper-oriented sizing-help path.
- Added only non-empty shopper categories derived from current published products.
- Preserved exact Catalog ID / SKU / source title internally for checkout and operational identity.
- Lower-48 shipping copy is now tied to the current Catalog `shippingStatus` rather than assumed:
  - `verified` → `Ships to the Lower 48`
  - `quote_required` → `Shipping quote required`
  - otherwise → `Check shipping availability`
- Hawaii eligibility logic remains separate and conservative.

### RV & Outdoor

- Removed the legacy static eBay catalog script from deciding the public product set.
- Uses current published/readiness-passing Elevation Catalog products for both crawler output and browser rendering.
- Shortened supplier-style titles for shopper display without overwriting source titles.
- Normalized shopper-facing categories at render time.
- Added concise use-case subtitles when the source title supports them.
- Preserved search, sorting, category filtering and shopping-list behavior.
- Preserved checkout/source IDs and current shipping state.
- Browser-side filtering was aligned with the same product set used for crawler prerendering.

### Apparel

- No Apparel source files were changed.
- Production regression check confirmed the Apparel Store remained available and the `True Grit Trucker Hat` product remained rendered.

## Data / commerce boundaries

- No Catalog source records were deleted.
- No supplier SKU identity was changed.
- No source title/category was overwritten as source truth.
- No schema migration was performed.
- No mass publication was performed.
- DRAFT/HOLD/out-of-stock records were not promoted merely to populate crawler output.
- Marketplace separation was preserved.
- Existing checkout and PayPal configuration remained live.
- Existing Hawaii lithium controls remained in place.
- Solar Builder, Start a Project, Admin and Portal architecture were not rebuilt.

## Files changed in storefront application

- `site/_routes.json`
- `site/_worker.js`
- `site/lithium-batteries.html`
- `site/lithium-shop.js`
- `site/lithium-shop.css`
- `site/rv-store.html`
- `site/rv-store.js`
- `site/rv-store.css`

One-time preview/production workflow files are release tooling only and are removed during closeout before the accepted source baseline is promoted.

## Rollback

- Pre-release source rollback: repo `main` at `ea26349c836fe8389a7170ca618fa3ccbb4b75e7`
- Previous shop application baseline remains available at `baseline-2026-08-29-kingboss-live-shop`.
- New accepted restore baseline is established during closeout as `baseline-2026-08-31-storefront-first-pass`.

**FINAL STATUS: PASS — STOREFRONT FIRST PASS DEPLOYED AND VERIFIED**
