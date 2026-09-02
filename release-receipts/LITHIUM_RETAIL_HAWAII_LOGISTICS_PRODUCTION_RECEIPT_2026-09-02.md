# Lithium Retail + Hawaii Logistics — Production Receipt

Date: 2026-09-02
Status: PRODUCTION DEPLOYED / CLOSED

## Lineage
- Previous accepted production/main: `c05b245bfa2af8e759507e8d78995f2819600936`
- Deployed application SHA: `8267d94a6b27ea950c2ef3869598ae3c83189dee`
- Release branch: `release/lithium-retail-hawaii-logistics-2026-09-02`
- Rollback baseline: `baseline-2026-09-02-pre-lithium-retail-hawaii-production`

## Deployment
- Targeted preview: `https://90fa678b.elevationupscales.pages.dev`
- Production deployment: `https://fd236b52.elevationupscales.pages.dev`
- Final successful verification/deployment workflow run: `33692521397`
- Final targeted verification result: PASS
- Live lithium Catalog products observed during targeted verification: 38

## Verified customer freight rules
- Lower-48 actual lithium battery shipping remains `$27.99 per actual battery`.
- Hawaii Consolidated Freight is `$99 per actual battery`, separate from merchandise.
- 1 actual battery: `$99` Hawaii freight.
- 2 actual batteries: `$198` Hawaii freight.
- 3 actual batteries: `$297` Hawaii freight.
- Three compatible batteries is the preferred consolidated-shipment target, not a guaranteed departure trigger.
- Orders below the preferred compatible quantity may remain Awaiting Consolidation.
- Hawaii fulfillment is warehouse / freight-terminal pickup only; residential lithium delivery is not offered through this program.
- Shipment and pickup timing is estimated and not guaranteed.
- Hawaii freight checkout is server-authoritative and routes into reservation/freight coordination before PayPal capture rather than bypassing the existing logistics gates.

## Licensed retail identity
`LICENSED LITHIUM BATTERY RETAILER` is presented on the Lithium Battery Shop, Hawaii Lithium Shipping & Freight page, actual lithium Product Detail, and lithium checkout. The public Terms disclosure explains that the designation refers to Elevation UpScales, Inc.'s licensed retail status and product category and does not imply manufacturer authorization, carrier approval, hazardous-materials qualifications, transportation certification, regulator status, testing-laboratory status, manufacturer status, or carrier status.

## Terms / business disclosure
- Public Terms route: `/terms`
- Terms is linked beside Privacy on the lithium, Hawaii, product-detail, checkout/legal, Privacy, and Terms surfaces touched by this release.
- Terms preserves the statement that Elevation UpScales, Inc. is a Colorado corporation and holds a Colorado sales-tax license.

## Data/source-of-truth protection
No duplicate Hawaii Catalog, inventory source, battery store, fulfillment database, or Hawaii-only product SKU was created. Existing Catalog products, lithium shipping records, destination/route records, Hawaii reservations, and shipment-batch records continue to be reused.

## Changed application files
1. `site/checkout/index.html`
2. `site/hawaii-lithium-batteries.html`
3. `site/hawaii-lithium-program.css`
4. `site/hawaii-lithium-program.js`
5. `site/hawaii-lithium-runtime.js`
6. `site/lithium-batteries.html`
7. `site/lithium-shop.js`
8. `site/privacy.html`
9. `site/product-detail.css`
10. `site/product-detail.js`
11. `site/product.html`
12. `site/store-checkout-server.js`
13. `site/store-checkout.css`
14. `site/store-checkout.js`
15. `site/terms.html`

## Verification note
The initial test harness could not resolve Playwright when its verifier was executed from `/tmp`. After that harness-only issue was corrected, rendered CSS text-transform caused one case-sensitive `innerText` assertion to report the Hawaii heading as missing even though the deployed HTML contained it. The final verifier used DOM text content for wording assertions while retaining real desktop/mobile browser, overflow, Catalog, Product Detail, checkout, API, and freight-math checks. Final run `33692521397` passed and deployed the unchanged application SHA above.

## Remaining external-data dependency
Exact Hawaii freight route, current consolidation/batch state, carrier scheduling, and pickup timing remain dependent on the applicable supplier, documentation, carrier, packaging, packed-weight, terminal, and active shipment records. The storefront exposes those values only when existing records support them and does not fabricate a guaranteed route or date.

## Closeout
Lithium retail identity and Hawaii consolidated-freight work is deployed and closed. No subsequent feature or weekly work sweep was started in this deployment run.
