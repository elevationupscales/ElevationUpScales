# ELEVATION UPSCALES, INC. — 4.5 PRODUCTION RECONCILIATION RECEIPT

**Local production date:** September 2, 2026 (America/Denver)  
**Status:** PRODUCTION DEPLOYED / VERIFIED / CLOSED  

## Source and rollback

- Approved application source: `687f1b7d9f24a85f3ada83df06c52edde872d8b6`
- Previous production source: `cc5f59fa8d7374d41d51ec56a0e91e20198cb612`
- Rollback baseline: `baseline-2026-09-02-pre-production-reconciliation`
- Production workflow run: `33710684996`
- Cloudflare Pages production deployment: `https://1f608ad3.elevationupscales.pages.dev`
- Canonical production domain: `https://elevationupscales.com`

## Approved reconciliation scope

1. Reconcile shared and static Hawaii customer navigation with the accepted **Hawaii Lithium Shipping & Freight** architecture.
2. Enforce the authorized Labor Day promotion window without changing approved pricing constants.
3. Remove customer-visible RV checkout `ebay=` metadata while preserving server-authoritative fallback resolution.
4. Reverify Lithium Catalog production state rather than recreating or duplicating Catalog architecture.
5. Repair stale permanent deployment assertions that referenced superseded RV/eBay compatibility markers.

## Production verification

The approved source was checked out from `main` at the exact SHA above before deployment. Source lineage, JavaScript syntax, and repaired invariants passed before Cloudflare was allowed to publish.

Cloudflare production deployment completed successfully at `https://1f608ad3.elevationupscales.pages.dev`.

### Route smoke — PASS

The deployment URL returned HTTP 200 for:

- `/`
- `/store`
- `/rv-store`
- `/lithium-batteries`
- `/hawaii-lithium-batteries`
- `/checkout`
- `/start-a-project`
- `/solar-project`
- `/marketplace`
- `/terms`
- `/admin`
- `/admin-catalog`
- `/admin-store-orders`
- `/admin-lithium-shipping`

The canonical domain returned HTTP 200 for the tested public routes, including the homepage, stores, checkout, intake, Solar Builder, Marketplace, and Terms.

### Lithium — PASS

- Public Lithium Catalog API: **38 products**
- Server-prerendered Lithium cards: **38**
- All checked products retained positive customer pricing.
- Canonical domain also returned **38 Catalog products** and **38 prerendered cards**.

### Hawaii navigation and freight truth — PASS

- Shared runtime navigation uses **Hawaii Lithium Shipping & Freight**.
- Apparel Store and RV Store static HTML use the same current wording.
- Obsolete customer-facing **Hawaii Lithium Program / Coming Soon** navigation was not present in the verified surfaces.
- Existing accepted Hawaii freight pricing/disclosures were preserved; this reconciliation did not redesign Hawaii logistics.

### RV checkout cleanup — PASS

- Direct RV customer URLs no longer expose `&ebay=` metadata.
- Checkout no longer accepts browser-supplied raw eBay fallback URL data.
- Legitimate fallback mapping is resolved server-side from authoritative product/Catalog records.
- PayPal pricing and Catalog ownership architecture were not redesigned.

### Labor Day timing — PASS

Authorized campaign window enforced by application runtime:

- Start: `2026-09-03T06:00:00.000Z` — September 3, 2026 at 12:00 AM America/Denver
- End: `2026-09-08T06:00:00.000Z` — September 8, 2026 at 12:00 AM America/Denver

At production verification time the promotion reported:

- `manualActive: true`
- `active: false`
- `windowState: scheduled`

This confirmed that the prior manual-active state could no longer activate the public promotion before the authorized start time.

Approved pricing constants remained unchanged, including the 25% coupon structure and `$27.99` Lower-48 lithium shipping setting.

## Final production state

The customer-facing application deployed from `687f1b7d9f24a85f3ada83df06c52edde872d8b6` is accepted as the production application baseline for this reconciliation. This receipt commit contains documentation only and does not change the deployed `site/` tree.

**Disposition:** CLOSED / ACCEPTED.
