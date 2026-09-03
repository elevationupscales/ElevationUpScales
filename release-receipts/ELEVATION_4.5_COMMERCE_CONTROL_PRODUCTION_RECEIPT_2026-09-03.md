# Elevation UpScales, Inc. — Elevation 4.5 Commerce Control Production Receipt

**Production date:** September 3, 2026  
**Status:** PRODUCTION DEPLOYED / VERIFIED / CLOSED / ACCEPTED  
**Canonical:** https://elevationupscales.com  

## Release control

- Previous accepted repository main: `9ed1a64479f6c1949cfef7b6c40494c6ab9c934a`
- Deployed application SHA: `5ddb4e369f19017471bd8439044cd02ecee64806`
- Deployed application tree: `22b99d63e9de47db56c4a568bb1601149f606f46`
- Pre-release rollback branch: `baseline-2026-09-02-pre-45-commerce-control`
- Accepted post-release baseline: `baseline-2026-09-03-elevation-45-commerce-control-production`
- Clean release branch: `release/4.5-commerce-control-clean-final-2026-09-03`
- Owner authorized completion without additional deployment approval gates for this defined release.

The application candidate was cleaned before promotion so temporary 4.5 build/diagnostic workflows and repair scripts were not included in the production application tree.

## Final isolated preview proof

- GitHub Actions run: `33765768458`
- Exact application SHA tested: `5ddb4e369f19017471bd8439044cd02ecee64806`
- Preview deployment: `https://414c3932.elevationupscales.pages.dev`
- Result: **PASS**

Verified in preview:

- Core customer routes returned HTTP 200.
- Lithium Catalog: **38 products**.
- RV & Outdoor Catalog: **20 products**.
- Homepage featured Commerce feed: **4 Lithium + 4 RV**.
- Server prerender: **38 Lithium / 38 Hawaii Lithium / 19 RV cards**.
- Hawaii exact-SKU customer states at verification: **0 Shipping Available / 38 Freight Review Required / 0 Currently Unavailable**.
- Labor Day promotion: **active**, manual flag active, **25%** eligible merchandise coupon, authorized Sep. 3–Sep. 8 window, battery shipping value unchanged at **$27.99**.
- Known 12V 100Ah LiFePO4 product `cat-01e78438-5fb8-4e0d-aaab-ffbe86f5cf77` classified as an actual lithium battery.
- Known battery Lower-48 checkout: **$27.99 shipping per actual battery**.
- Known battery Hawaii checkout: **Freight Review Required**, no shipping charge added before eligibility approval, payment not allowed while review is required.
- Hawaii review-required order creation rejected before payment-provider readiness could permit collection.
- Alaska lithium path remained Freight Review Required.
- Hawaii checkout showed the Hawaii state immediately in browser verification, with irrelevant street-address fields and PayPal hidden while exact-SKU eligibility loaded. Immediate state observed at approximately **293 ms** in final preview.

## Shipping Rules production truth

- Lower 48 lithium: **$27.99 per actual battery**.
- Hawaii lithium: **$99 per actual battery** to the Honolulu warehouse / freight-terminal pickup location.
- Hawaii residential/address delivery is **not included** in the $99 freight amount and remains an additional quote-required service.
- Hawaii preferred consolidation quantity: **3 batteries**; this is not a guaranteed departure trigger.
- Alaska lithium: **Freight Review Required / quote required**.
- Hawaii pickup-only and no-residential-delivery controls remained enforced.

## Performance / request-flow proof

Hawaii Lithium was changed from per-product status hydration to batched status resolution and server prerender.

| Hawaii storefront measure | Before | Verified after |
| --- | ---: | ---: |
| Browser requests | 57 | **22** |
| API requests | 41 | **3** |
| DOM nodes | 1,613 | **1,262** |
| Individual Hawaii status calls | 38 | **0** |
| Batched Hawaii status calls | 0 | **1** |

Final browser verification retained all **38** Hawaii product cards while removing duplicate Catalog hydration and the 38-request status fan-out.

## Production deployment proof

- GitHub Actions production run: `33766029901`
- Exact application SHA deployed: `5ddb4e369f19017471bd8439044cd02ecee64806`
- Cloudflare Pages production deployment: `https://c8a1cf86.elevationupscales.pages.dev`
- Result: **PASS**

The immutable Pages deployment URL returned HTTP 200 for the tested core routes and verified:

- Lithium: **38**
- RV: **20**
- Homepage featured: **4 + 4**
- Lithium/Hawaii prerender: **38 / 38**
- Hawaii states: **0 / 38 / 0** (Shipping Available / Review Required / Unavailable)
- Labor Day: **active / 25%**
- Shipping Rules and pickup controls unchanged from approved production truth.

## Canonical production verification

Direct post-deploy checks against `https://elevationupscales.com` passed for:

- `/`
- `/store`
- `/rv-store`
- `/lithium-batteries`
- `/hawaii-lithium-batteries`
- `/checkout`
- `/what-we-do`
- `/start-a-project`
- `/solar-project`
- `/marketplace`
- `/terms`
- `/privacy`

Canonical runtime proof:

- Lithium Catalog: **38**
- RV & Outdoor: **20**
- Homepage featured: **4 + 4**
- Lithium/Hawaii prerender: **38 / 38**
- Hawaii current states: **0 Shipping Available / 38 Freight Review Required / 0 Unavailable**
- Labor Day promotion: **active, 25%**
- Known 12V 100Ah battery Lower-48 checkout: **PASS at $27.99 battery shipping**
- Known battery Hawaii review/payment boundary: **PASS**
- Canonical Hawaii browser checkout: **PASS**
- Hidden Hawaii address-field repair: **PASS**
- Shared navigation contained **Hawaii Lithium Shipping & Freight** and did not contain the superseded **Hawaii Lithium Program** wording.
- RV customer checkout assets contained no public `&ebay=` fallback parameter.

## Material defects closed in this release

1. Hawaii page omitted from Worker routing, causing missing server prerender — repaired.
2. Hawaii storefront generated per-product status request fan-out — replaced with batched status resolution.
3. Checkout could evaluate payment-provider readiness before Hawaii eligibility — reordered so freight eligibility blocks payment first.
4. Broad supplier category text containing “Chargers” caused a real 12V 100Ah LiFePO4 battery to be misclassified — battery identity classifier repaired.
5. Hawaii checkout lacked immediate destination context during a cold exact-SKU quote — immediate Honolulu/Hawaii checking state added.
6. Checkout form CSS overrode native `hidden` behavior and visually exposed address fields during Hawaii pickup flow — repaired with checkout-scoped hidden-state enforcement.
7. Shipping Rules now expose Lower 48, Hawaii pickup, Hawaii optional address-delivery quote, and Alaska review lanes from the approved architecture.

## Final disposition

**ELEVATION 4.5 COMMERCE CONTROL: CLOSED / ACCEPTED.**

No rollback was required. The deployed application SHA is the stable production application baseline. Any repository commit above this application SHA for receipts/documentation must not be treated as a new application deployment unless the `site/` tree changes and is separately verified.
