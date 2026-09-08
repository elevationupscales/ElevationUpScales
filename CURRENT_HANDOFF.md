# Elevation UpScales — Current Worker Handoff

Updated: 2026-09-08

Repository: `elevationupscales/ElevationUpScales`

Verified source `main`: `aaba50212b7243325db3207b5be35d05fb0da15a`

Active handoff branch: `work/sok-stock-intake-v1`

Production promotion: deployment worker only

## Fast takeover

1. Read `/AGENTS.md`, `/CODING-WORKFLOW.md`, and this file only.
2. Fetch current `main`; current Git wins over the recorded SHA above.
3. Inspect the active branch and compare it to current `main` before continuing.
4. Continue only the owner's newest explicit scope.
5. Do not merge or deploy a build-worker branch without the separate release step.

## Current accepted state

- The simplified Command Center foundation is released: six primary destinations are Today, Orders, Products, Leads, Logistics, and System.
- Leads are separated into Customer Leads, Supplier Growth, Solar, Work With Us, and Portal-ready. Supplier, customer, Solar, and lithium activity must not be mixed.
- Commerce Logistics is released. Doba is the primary inventory/supplier source for TikTok Shop and eBay; CJ Dropshipping remains a separate supplier.
- Shopify, eBay, and TikTok are sales channels. Printful and SpreadConnect are fulfillment providers. Fourthwall is a hybrid storefront/provider.
- Catalog remains the product master. Supplier stock is not physical Elevation On Hand.
- SOK dropship/order controls are released. Current Shopify operating truth is in `/operations/shopify-manager/SHOPIFY_MANAGER.md`.
- Current Shopify records report nine active SOK Online Store products with MAP controls; do not hardcode that count into stock tooling.
- SOK preorder/backorder, MAP, quantity review, Hawaii/Alaska, payment, lithium and fulfillment controls remain independent from supplier-stock verification.
- Never commit raw supplier inventory, dealer cost, private correspondence, private freight terms, customer data, credentials or compliance packets.

## Current candidate — SOK Stock Intake V1

Branch: `work/sok-stock-intake-v1`

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
- `eus_sok_events` stores row events and import receipts; repeated confirmed apply returns the existing receipt instead of duplicating writes.
- Partial imports leave omitted SKUs unchanged.
- No schema, binding, secret, auth/session, checkout, PayPal, public availability, pricing, MAP, freight, Shopify inventory-writer, Doba, leads, supplier-ordering or Portal changes.

## Candidate verification

Targeted behavior tests: **PASS — 8/8**.

Covered:

- unauthorized/cross-origin mutation policy;
- missing quantity versus explicit zero;
- unknown/duplicate SKU and invalid quantity/date rejection;
- preview purity and partial-import omission behavior;
- older/same-date conflicting evidence protection;
- stale preview fingerprinting and duplicate-apply idempotency;
- freshness states;
- accurate partial-write failure result.

JavaScript syntax checks: **PASS** for new/modified development modules checked locally.

Changed-file whitespace check: **PASS** on the locally authored candidate files.

Full `npm run qa`: **PENDING RC WORKFLOW**.

Isolated preview: **PENDING RC WORKFLOW**.

Reason: the available GitHub connection can inspect Actions and re-run existing jobs but does not expose `workflow_dispatch`, so the permanent `.github/workflows/release-candidate-gate.yml` cannot be started from this worker without changing protected workflow behavior. Do not create or modify a deployment workflow to bypass that gate.

## Exact next action

1. Reconfirm current `main` still descends from `aaba50212b7243325db3207b5be35d05fb0da15a` with no conflicting SOK stock code.
2. Dispatch the existing **Release Candidate Preview** workflow with `candidate_ref=work/sok-stock-intake-v1`.
3. Require full `npm run qa`, `git diff --check`, isolated Cloudflare preview and preview regression checks to PASS.
4. Review the SOK Stock form on desktop/mobile using synthetic test input only; do not apply real supplier counts during release QA.
5. If all RC gates pass, hand to the separate release worker for merge/deployment authorization.

## Permanent boundaries

- No database schema or production-data changes without separate approval.
- Preserve checkout, PayPal, pricing, freight, Cloudflare bindings, secrets, auth and sessions.
- Preserve SOK MAP, availability, purchase-mode, lithium, Hawaii and Alaska controls.
- Do not promise ordinary parcel delivery for Hawaii lithium.
- Catalog remains the product master; supplier inventory is not physical On Hand; Marketplace remains separate from Elevation Catalog.
- Portal handoff remains manual export only unless separately authorized.
- Build workers stop before production merge/deployment. Deployment is owned by another worker.

## Required finish receipt

Return:

- parent `main` SHA;
- branch and candidate SHA;
- changed files;
- targeted/full QA and preview results;
- schema/protected-boundary status;
- blocker or deferred item;
- exact next action;
- merge/deployment state.
