# Elevation UpScales — Current Worker Handoff

Updated: 2026-09-08

Repository: `elevationupscales/ElevationUpScales`

Verified source `main`: `aaba50212b7243325db3207b5be35d05fb0da15a`

Active release branch: `release/sok-stock-management-sop-0908`

Release direction: owner authorized direct production deployment after efficiency sweep and explicitly authorized publishing the public-safe management SOP/release fixes to the currently public repository.

## Fast takeover

1. Read `/AGENTS.md`, `/CODING-WORKFLOW.md`, `/operations/README.md`, `/operations/MANAGEMENT_OPERATING_SOP.md`, and this file.
2. Fetch current `main`; current Git wins over the recorded SHA above.
3. Inspect the active branch and compare it to current `main` before continuing.
4. Continue only the owner's newest explicit scope.
5. Use permanent repository preview/deploy workflows; do not create a one-off deployment workflow.

## Current accepted state

- The simplified Command Center foundation is released: six primary destinations are Today, Orders, Products, Leads, Logistics, and System.
- Leads are separated into Customer Leads, Supplier Growth, Solar, Work With Us, and Portal-ready. Supplier, customer, Solar, and lithium activity must not be mixed.
- Commerce Logistics is released. Doba is the primary inventory/supplier source for TikTok Shop and eBay; CJ Dropshipping remains a separate supplier.
- Shopify, eBay, and TikTok are sales channels. Printful and SpreadConnect are fulfillment providers. Fourthwall is a hybrid storefront/provider.
- Catalog remains the product master. Supplier stock is not physical Elevation On Hand.
- SOK dropship/order controls are released. Current Shopify operating truth is in `/operations/shopify-manager/SHOPIFY_MANAGER.md`.
- Current Shopify records report nine active SOK Online Store products with MAP controls; do not hardcode that count into stock tooling.
- SOK preorder/backorder, MAP, quantity review, Hawaii/Alaska, payment, lithium and fulfillment controls remain independent from supplier-stock verification.
- `/operations/MANAGEMENT_OPERATING_SOP.md` is the shared management execution/efficiency standard. Manager-specific SOPs remain subordinate to the owner and shared operating rules.
- Gmail management feeds/drafts are retired as an active control system. GitHub `/operations/` remains the active management source.
- The repository is currently public. A future plan to make it private does not relax present public-data protection.

## Release candidate — SOK Stock Intake V1 + Management SOP

Branch: `release/sok-stock-management-sop-0908`

Parent: `aaba50212b7243325db3207b5be35d05fb0da15a`

Scope implemented:

- Products → SOK Stock workspace with search and freshness filter.
- Dynamic roster from current exact-match SOK operating records; no hardcoded product count.
- Internal supplier quantity, verification date, freshness/status and next action.
- Missing quantity displays as `Unverified`; verified zero remains distinct from missing.
- Protected CSV template, upload/paste, server-side validation and before/after preview.
- Explicit confirmed apply limited to `eus_sok_product_ops.supplier_inventory` and `last_supplier_verified`.
- Preview fingerprint plus `updated_at` optimistic guard prevents stale-preview overwrites.
- Older evidence and same-date conflicting quantity are rejected.
- Each successful stock-field mutation and its `supplier_stock_verified` audit event execute in one D1 batch transaction so an audit failure cannot leave an unaudited stock mutation.
- `eus_sok_events` stores import receipts; repeated confirmed apply returns the existing receipt instead of duplicating writes.
- Partial imports leave omitted SKUs unchanged.
- Canonical route registry now owns `/api/admin/sok-stock` and its protected child routes.
- Shared management SOP adds source-of-truth order, commercial priority, manager separation, reuse-first execution, proportional QA, public-data protection and efficiency rules.
- No schema, binding, secret, auth/session, checkout, PayPal, public availability, pricing, MAP, freight, Shopify inventory-writer, Doba, leads, supplier-ordering or Portal changes.

## Verification before production workflow

SOK stock behavior tests: **9 cases defined** covering:

- unauthorized/cross-origin mutation policy;
- missing quantity versus explicit zero;
- bounded input size;
- unknown/duplicate SKU and invalid quantity/date rejection;
- preview purity and partial-import omission behavior;
- older/same-date conflicting evidence protection;
- stale preview fingerprinting and duplicate-apply idempotency;
- freshness states;
- accurate partial-write failure result.

Route-registry parity test now includes the protected SOK stock route and `sok-stock` domain.

The permanent production workflow is the release gate for this direct-deployment instruction. It runs full `npm run qa`, `git diff --check`, secret/artifact checks, deploys Cloudflare Pages, runs deployment smoke checks and then checks the canonical production domain.

## Exact release action

1. Reconfirm current `main` still equals or cleanly precedes this release candidate with no conflicting commerce code.
2. Fast-forward `main` to the release candidate only if lineage remains clean.
3. Advance `production-deploy` to the exact same SHA to trigger the permanent **Deploy Elevation UpScales** workflow.
4. Require the workflow's QA, Cloudflare deployment, deployed-app smoke and canonical-domain smoke to PASS.
5. Do not apply real supplier stock counts during release verification.
6. Record the resulting production SHA/receipt and continue normal management work from the deployed `main`.

## Permanent boundaries

- No database schema or production-data changes without separate approval.
- Preserve checkout, PayPal, pricing, freight, Cloudflare bindings, secrets, auth and sessions.
- Preserve SOK MAP, availability, purchase-mode, lithium, Hawaii and Alaska controls.
- Do not promise ordinary parcel delivery for Hawaii lithium.
- Catalog remains the product master; supplier inventory is not physical On Hand; Marketplace remains separate from Elevation Catalog.
- Portal handoff remains manual export only unless separately authorized.
- Never commit raw supplier inventory, dealer cost, private correspondence, private freight terms, customer data, credentials or non-public compliance packets while this repository remains public.

## Required finish receipt

Return:

- parent `main` SHA;
- release branch and production SHA;
- changed files;
- targeted/full QA and deployment results;
- schema/protected-boundary status;
- blocker or deferred item;
- exact next action;
- merge/deployment state.
