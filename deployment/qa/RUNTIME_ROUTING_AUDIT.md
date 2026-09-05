# Website Rebuild — Runtime Routing Audit

## Disposition

- `_routes.json` remains the Cloudflare Pages interception contract.
- Added `/worker/*` solely so decomposed runtime source modules remain non-public.
- `_worker.js` returns 404 for `/worker/*` before customer/API dispatch.
- Existing customer, checkout, SOK, Hawaii, Marketplace and API route includes are retained.
- `_redirects` is not rewritten by Worker decomposition.

## Current includes

- `/api/*`
- `/marketplace/listing/*`
- `/checkout`
- `/checkout/*`
- `/lithium-batteries`
- `/lithium-batteries/*`
- `/hawaii-lithium-batteries`
- `/hawaii-lithium-batteries/*`
- `/rv-store`
- `/rv-store/*`
- `/worker-core.js`
- `/worker/*`
- `/store-checkout-server.js`
- `/store-orders-admin-server.js`
- `/catalog-admin-server.js`
- `/catalog-admin-runtime.js`
- `/hawaii-lithium-runtime.js`
- `/sok-operations-runtime.js`
- `/sync-admin-runtime.js`
- `/doba-csv-sync-runtime.js`
- `/apparel-provider-runtime.js`
- `/commerce-schema-migrations.js`
- `/shipping-rules-runtime.js`
- `/commerce-pricing-runtime.js`
- `/promotion-runtime.js`
- `/sok-availability-runtime.js`
- `/sok/*`
- `/sok-full-line-runtime.js`
- `/sok-full-line-data.js`
