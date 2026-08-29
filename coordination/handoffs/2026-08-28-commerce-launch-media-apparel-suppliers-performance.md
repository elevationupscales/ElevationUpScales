# Elevation UpScales, Inc. — Commerce Launch + Admin Media + Apparel Supplier + Performance Patch

**Project:** Elevation 4.3  
**Date:** 2026-08-28  
**Status:** AUTHORIZED NEXT BUILD / DEPLOYMENT INSTRUCTION  
**Parent:** accepted Doba CSV Sync production baseline `0d1d17487a934119f0f8e9a044f636b8fe142784` or accepted descendant  
**Current repo main at authorization:** `771c3821cad2fa09b4dc145cf4bf7ab021d8685a` or accepted descendant

---

# 1. OWNER DIRECTION

This next work has two goals:

1. **Launch/reconcile the new Doba downloaded list using the production CSV Sync system.**
2. **Make Store/Admin easier to operate visually and prepare Apparel for multiple POD suppliers without adding disconnected systems.**

This handoff also includes the requested performance, navigation, shop categorization and organization patch.

Do not reopen the finished Doba CSV Sync architecture. Use it.

---

# 2. STAGE 0 — LAUNCH THE NEW DOBA DOWNLOADED LIST FIRST

Input artifact:

`US_Dropshipping_Product_Data_with_25%_Markup_20260829_5188491.csv`

Use:

- profile: `Doba Download Center — 25% Markup`
- scope: **Partial Snapshot**

Production flow:

`Upload CSV → Preview Diff → verify acceptance → Apply Sync → listing readiness review → publish eligible products`

Expected Preview baseline:

- 32 source rows
- 10 existing Catalog Item No. matches
- 22 new Item No. candidates
- 3 zero-stock rows
- 3 additional low-stock rows (1–10)
- 10/10 overlapping cost derivations reproduce stored supplier cost within rounding tolerance
- the existing movie-screen Catalog record is absent from this CSV and must remain unchanged in Partial mode

If the preview differs materially, STOP before Apply and investigate.

After a matching Preview, **Apply Sync is authorized**.

After Apply:

- exact existing products update source/cost/stock/shipping/restriction snapshot only according to DEC-006 rules;
- new Doba items become Catalog Draft/Needs Review first;
- then publish only products that pass readiness, stock, price/margin, identity, shipping and fulfillment gates;
- do not publish zero-stock products;
- do not silently clear the three existing HOLD records;
- do not publish duplicate-title variant families until the public title/variant distinction is clear.

Current existing HOLDs remain controlled:

- `D0102HPBE86-428316` Gazebo — existing blocker must be reconciled, not blindly cleared
- `D0102HGKRVV-521042` Lawn Sweeper — existing SKU/channel mismatch must be reconciled
- `D0102HHVH7A-285520` 3×3 Tent — existing price/channel mismatch must be reconciled

Do not let the CSV's absence of the movie-screen item change that existing product in Partial mode.

---

# 3. NEW DOBA CANDIDATE ORGANIZATION

Use the source file to stage/review the 22 new Doba Item No. candidates.

Normalize the RV/Outdoor storefront into these owner/customer-facing categories:

1. **RV Essentials & Water**
2. **Solar & Off-Grid**
3. **Camping & Shelter**
4. **Automotive, ATV & Towing**
5. **Tools & Workshop**
6. **Outdoor Lighting & Power**
7. **Travel & Organization**
8. **Other / Review**

Do not create a new product database for categories. Reuse Catalog product/category metadata.

Suggested classification for the new file:

### Tools & Workshop
- `D01027R30RP` Mechanics Tool Set
- `D01027HX2YY` 96-pc Impact Socket Set
- `D0102HLHR4G` Refrigerant Recovery Tank
- `D01027R8U0P` 65A Plasma Cutter
- `D010275E6ZT` Fuse Assortment Kit — may also surface under Electrical/Solar accessories

### Solar & Off-Grid
- `D01027RQ4Q2` 20W Solar Battery Charger
- `D0102HAHP97` Solar Panel Connector Pairs
- `D01027753G8` MPPT family — stock 0, do not publish
- `D01027753GP` MPPT family — low stock, review before publishing
- `D0102775326` MPPT family — stock 0, do not publish

### RV Essentials & Water
- `D0102HSVG66` RV Tire Pressure Monitoring System
- `D01027R99ZP` Portable Propane Water Heater — stock 0, do not publish

### Automotive, ATV & Towing
- `D01027RSVIP` ATV Rear Storage Box / Lounger
- `D0102HGJY6W` ATV Dump Trailer

### Outdoor Lighting & Power
- `D0101HIT65W`
- `D0101HIU317`
- `D0101HIT6R7`
- `D0101HIUPBA`

These four solar-camping-light rows share the same source title. Stage all exact Item No./SKU records, but do not display four indistinguishable public cards. Determine distinguishing variant information from source SKU/images/specs, or hold the duplicate-title family for merchandising review.

### Travel & Organization
- `D010275S8IJ` Portable Laptop/Lap Desk
- `D0102HAHR6G` Seat Gap / Cup Holder Organizer — low stock, review

### Other / Review
- `D010277UK36` Heavy-Duty Nano Mounting Tape
- `D0102HG47FW` Moonshine Still / Distiller

Do not automatically publish `Other / Review` merely because stock exists. Owner/store fit is part of listing readiness.

---

# 4. ADMIN PRODUCT THUMBNAILS — REQUIRED

The owner needs to visually identify products quickly.

Add a compact product thumbnail to Store/Admin product rows wherever the product identity is central:

- Products & Listings
- Inventory
- Channels & Sync product relationship table
- Store Orders line items where available
- Shipping & Logistics product/reservation rows where practical

Required behavior:

- use existing `primaryImage` / Catalog primary image first;
- Doba CSV already captures source image URLs;
- Fourthwall/Printful/Spreadconnect adapters may supply provider thumbnails;
- thumbnail should be roughly 48–64px square, `object-fit: cover`, lazy-loaded;
- never allow a broken image to stretch the row;
- fallback to a small neutral product placeholder/icon;
- clicking image/title should open the internal Catalog detail first, not send the owner away from Admin;
- supplier/source URL remains a separate action.

Performance rule: do not load full-resolution galleries in table rows. One small lazy thumbnail only.

---

# 5. STORE VIEWS IN ADMIN — RV + APPAREL

Do not create another disconnected Admin application.

Extend **Products & Listings** with persistent filtered store views:

- `All Products`
- `RV & Outdoor`
- `Apparel`
- `Lithium`
- `Other / Review`

Preferred deep-link pattern:

- `/admin-catalog?store=rv-outdoor`
- `/admin-catalog?store=apparel`
- `/admin-catalog?store=lithium-batteries`

If friendly aliases are useful, they may redirect to those views, but the Catalog remains one system.

Within Apparel view add supplier filter:

- All Apparel Suppliers
- Fourthwall
- Printful
- Spreadconnect
- Self / Other

Each row should show:

`thumbnail | product | provider | provider product/variant ID | storefront state | provider state | price | fulfillment | last sync | blocker | action`

---

# 6. FOURTHWALL — PREPARE FIRST APPAREL INTEGRATION

Current public apparel page is partly hard-coded to Fourthwall product URLs. Replace that operational dependency over controlled releases with provider data feeding the Catalog/Apparel view.

Fourthwall officially supports a Storefront API for custom storefronts and a Platform API/Webhooks for deeper integrations.

Reference URLs:

- Developer docs: `https://docs.fourthwall.com/`
- Storefront overview: `https://docs.fourthwall.com/storefront/overview`
- Product fetching: `https://docs.fourthwall.com/storefront/products`
- Platform API overview: `https://docs.fourthwall.com/guides/overview`
- Webhooks: `https://docs.fourthwall.com/webhooks/getting-started`

Current Elevation Fourthwall public shop:

`https://elevationupscales-shop.fourthwall.com`

Public product URL pattern already in use:

`https://elevationupscales-shop.fourthwall.com/products/{slug}`

Useful Storefront API URL options:

- all public products: `https://storefront-api.fourthwall.com/v1/collections/all/products?storefront_token={TOKEN}`
- one product by slug: `https://storefront-api.fourthwall.com/v1/products/{slug}?storefront_token={TOKEN}`

Platform API base:

`https://api.fourthwall.com/open-api/v1.0`

Proposed Elevation webhook receiver for a future controlled release:

`https://elevationupscales.com/api/webhooks/fourthwall`

## Fourthwall build scope for this release

Implement **read/reconcile first**, not a risky fulfillment rewrite:

1. Add Fourthwall provider configuration state to Channels & Sync.
2. Add server-side/proxied product fetch or another secure implementation appropriate to the token type.
3. Fetch `all` collection products and map:
   - Fourthwall product ID
   - slug
   - product name
   - primary image
   - variants
   - variant SKU
   - price
   - stock state when provided
   - updated timestamp
4. Reconcile exact Fourthwall IDs/SKUs with existing Catalog apparel records.
5. Show thumbnails and source/public product links in Apparel Admin.
6. Stage unmatched Fourthwall products for review instead of creating duplicates.
7. Do not break current Fourthwall checkout/fulfillment links.
8. Do not expose a Platform API key in browser code or GitHub.

Platform write operations and order webhooks may be activated in a later release only after credentials and exact product mapping are verified.

---

# 7. MULTI-SUPPLIER APPAREL ARCHITECTURE — PREP NOW

Apparel must support multiple POD suppliers without creating separate product catalogs.

Add/normalize supplier adapter identities:

- `fourthwall`
- `printful`
- `spreadconnect`
- `self-stock`
- `other`

One Catalog product may have one active fulfillment provider per variant unless a future explicit routing rule says otherwise.

Required generic provider fields:

- `provider`
- `provider_product_id`
- `provider_variant_id`
- `provider_sku`
- `provider_product_url`
- `provider_thumbnail_url`
- `provider_state`
- `provider_stock_state`
- `provider_cost` where supplied/meaningful
- `last_provider_sync_at`
- `last_provider_error`
- `fulfillment_mode=pod`

Do not add provider secrets to Catalog rows.

---

# 8. PRINTFUL — NEXT-BUILD ADAPTER PREP

Official API docs:

`https://developers.printful.com/docs/`

Relevant Printful concepts:

- Products/Sync Products API
- `GET https://api.printful.com/store/products`
- product response includes `thumbnail_url`
- private token / OAuth scopes such as `sync_products`, `orders`, and `webhooks`
- product/order webhooks supported

Prepare a disabled provider adapter and Admin configuration card.

Do not enable or claim Printful sync until a token/store is actually configured and tested.

Proposed future webhook receiver:

`https://elevationupscales.com/api/webhooks/printful`

Keep all private tokens server-side.

---

# 9. SPREADCONNECT — NEXT-BUILD ADAPTER PREP

Official Spreadconnect Help Center confirms its API integration is enabled from **Integrations → Spreadconnect API**, which generates a private API key. The API can be used to create/manage products and submit orders.

References:

- `https://faq.spreadconnect.app/hc/en-us/articles/360020927339-How-do-I-get-started-with-the-API`
- `https://faq.spreadconnect.app/hc/en-us/sections/360005512680-Setting-up-the-API`

Prepare a disabled provider adapter and Admin configuration card.

Do not expose the API key client-side or in GitHub.

Do not mark Spreadconnect `Connected` until a real API request passes.

Keep CSV/manual import as a possible fallback path if useful for product staging, but provider fulfillment state must still be explicit.

---

# 10. PUBLIC RV SHOP — CATEGORY / NAVIGATION PATCH

The current RV public store has search/sort but no strong category navigation.

Add a compact category rail/chips above the product grid using the normalized categories in §3.

Recommended customer labels:

- All Gear
- RV Essentials
- Solar & Off-Grid
- Camping & Shelter
- Automotive & Towing
- Tools & Workshop
- Outdoor Lighting
- Travel & Organization

Only show a category chip when at least one published product belongs to it.

Requirements:

- category filters work without page reload;
- URL/hash/query can preserve category state where practical;
- search and category filters combine correctly;
- mobile rail is horizontally scrollable;
- do not merge RV Store with Marketplace;
- Lithium remains its own store lane but Solar/Off-Grid accessories may appear in RV Store as appropriate.

---

# 11. PUBLIC APPAREL SHOP — ORGANIZATION PREP

Preserve the current public `/store` route.

The public Apparel Store should ultimately render from normalized Catalog/provider records rather than a permanently hard-coded Fourthwall product block.

For this release:

- preserve current live purchase paths;
- reconcile Fourthwall data into Catalog/Apparel Admin;
- prepare the public rendering layer so provider source can be Fourthwall, Printful or Spreadconnect without changing the public route;
- keep customer-facing categories such as Apparel, Hats, Wall Art, Stickers and Digital where still valid;
- supplier/provider names are internal operational metadata and do not need to dominate the customer UI.

Do not switch checkout/fulfillment providers for an existing product without an exact provider/variant mapping and a tested order path.

---

# 12. ADMIN NAVIGATION / ORGANIZATION PATCH

Keep the accepted final Admin structure.

Do not add more top-level systems.

Improve within the existing structure:

## Products & Listings
- store view tabs
- thumbnail column
- category filter
- supplier/provider filter
- clearer readiness and blocker
- compact bulk actions

## Inventory
- thumbnail
- supplier/provider
- stock/source freshness
- compact cost/margin view

## Channels & Sync
- thumbnail in product relationship table
- Doba CSV Sync remains first-class
- provider cards for Fourthwall / Printful / Spreadconnect
- explicit states: Connected / Monitor Only / Not Configured / Error

## Orders
- product thumbnail where possible
- provider/fulfillment badge

## Mission Control
Only add action cards that are backed by actual counts, such as:
- Doba import review
- Products Ready to Publish
- Provider Sync Error
- Apparel Mapping Needed
- Missing Thumbnail

---

# 13. PERFORMANCE PATCH

This release must improve Admin/store performance as the catalog grows.

Required:

- lazy-load table thumbnails and public product images;
- use only primary thumbnails in list rows;
- defer provider/API detail requests until the relevant view opens;
- do not fetch full product galleries for Admin table rendering;
- preserve browser/server caching rules appropriate to public images while keeping Admin data `no-store`;
- debounce product search/filter input;
- avoid full-page rerender when only one filter changes;
- paginate or progressively render large Admin result sets before they become unwieldy;
- avoid loading legacy eBay catalog data on pages that do not need it;
- remove duplicate scripts/data fetches discovered during the pass;
- keep image width/height/aspect-ratio set to reduce layout shift;
- verify mobile Admin responsiveness after thumbnail addition.

Do not trade data freshness for cached Admin supplier state.

---

# 14. ACCEPTANCE — DOBA LAUNCH

Before continuing to UI/provider work, receipt the Doba launch:

- exact CSV file name/fingerprint
- 32 rows
- 10 matches
- 22 new candidates
- 3 zero stock
- 3 low stock
- 10/10 cost checks
- Partial Snapshot
- Apply successful
- current movie-screen unchanged
- three previous HOLDs not silently cleared
- count of new Catalog Draft/Review records
- count actually published after readiness review
- count held/reviewed with reason

---

# 15. ACCEPTANCE — ADMIN / STORE PATCH

PASS requires:

1. Product thumbnails visible in Products & Listings.
2. Product thumbnails visible in Inventory.
3. Product thumbnails visible in Channels & Sync.
4. Broken/missing image fallback works.
5. RV and Apparel filtered Admin views work.
6. Apparel supplier filter supports Fourthwall / Printful / Spreadconnect states.
7. Fourthwall read integration returns real products or clearly reports Not Configured/Error.
8. Fourthwall IDs/slugs/images/variants can reconcile without duplicate Catalog creation.
9. Existing Fourthwall purchase links still work.
10. Printful is prepared but not falsely shown connected.
11. Spreadconnect is prepared but not falsely shown connected.
12. RV public category chips work with search/sort.
13. Categories do not expose empty sections.
14. Marketplace remains separate.
15. Doba CSV Sync remains functional.
16. Catalog remains the single product master.
17. Admin navigation remains the accepted final model.
18. Store/Admin thumbnail loading does not materially degrade performance.
19. Store, RV Store, Checkout, Marketplace, Start a Project, Solar Builder, Hawaii page and Admin core routes regress PASS.
20. No supplier API secret is present in public JS, HTML, repo source, logs or receipts.

---

# 16. DEPLOYMENT ORDER

1. Confirm current production/main lineage.
2. **Perform the Doba CSV Preview + Apply + eligible listing launch first.**
3. Record the Doba launch receipt/counts.
4. Build the thumbnail/category/organization/performance/provider patch from the accepted production descendant.
5. Preview.
6. Verify all acceptance tests.
7. Promote production.
8. Verify production.
9. Create rollback baseline.
10. Update Master Status / return receipt.
11. STOP.

Suggested rollback baseline:

`baseline-2026-08-28-commerce-media-apparel-providers`

---

# 17. REQUIRED FINAL RECEIPT

Return:

- parent SHA
- resulting application SHA
- preview/production URLs
- workflow/run IDs
- Doba import run ID/fingerprint
- Doba Apply counts
- new Catalog count
- published/hold/review count
- normalized RV categories
- thumbnails PASS/FAIL by Admin workspace
- Fourthwall configuration/mapping result
- Fourthwall product count observed
- Printful state
- Spreadconnect state
- public RV category/navigation tests
- performance changes and any measured regressions/improvements
- Store/RV Store/Checkout/Marketplace/Solar/Start Project/Hawaii/Admin regression results
- secrets scan result
- rollback baseline
- deferred items

---

# FINAL DIRECTION

**Launch the new Doba list through the system we just built, then make the commerce Admin visual, category-driven and provider-ready.**

Do not build separate Catalogs for Doba, Fourthwall, Printful or Spreadconnect.

The target operating model is:

`Supplier/source → one Elevation Catalog → visual Admin → readiness → public store/channel → fulfillment provider → reconciliation`.
