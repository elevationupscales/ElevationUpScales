# ELEVATION UPSCALES — WEBSITE CODING P0 STABILIZATION — CURRENT WORKTREE

**Date:** 2026-09-12
**Owner:** Casey Young
**Execution Owner:** MASTER DEVELOPER
**Oversight:** Operating System Project Manager + MASTER RECON OS
**State:** ACTIVE / P0 STABILIZATION
**Controlling Owner Directive:** `OWNER_DIRECTIVE_WEBSITE_CODING_P0_STABILIZATION_2026-09-12.md`
**Companion Controls:** `OWNER_DIRECTIVE_PUBLIC_COPY_FIREWALL_2026-09-12.md`; `OWNER_DIRECTIVE_HOMEPAGE_LOCK_2026-09-12.md`

## Mission

Restore the public website coding/deployment lane to the Operating System's control standard without redesigning the site, restarting vendor Projects, or blindly promoting development history to production.

## Current Recovery Position

- Nonessential website feature work: **HOLD**.
- Customer-trust, catalog-source, checkout, routing, public-copy and deployment-control repairs: **AUTHORIZED**.
- Protected top homepage: **HARD LOCKED**.
- Current live SOK battery work/listings: **PROTECTED**.
- Current `main`: resolve before every write or release action.
- Production must be treated as a separately verified state; Git `main` is not production proof.

## P0 Queue

### P0.1 — Production Lineage Recon

**State:** OPEN

Determine and record:

- exact canonical production build/deployed SHA if exposed;
- current `main` SHA;
- deployment workflow/Cloudflare Pages source and branch relationship;
- release artifact/build identifiers available from public/runtime or deployment records;
- delta count and commit range between production and `main`;
- whether production contains code not represented by the expected current lineage.

**Close:** production lineage is explicit enough to compare against `main` without guessing.

### P0.2 — Main ↔ Production Delta Ledger

**State:** WAITING ON P0.1

Create one ledger of customer-impacting deltas, classified:

- KEEP
- FIX
- DROP
- REBUILD
- VERIFY

Include homepage protected-top impact and shared-dependency impact.

**Close:** no bulk merge/deploy is required to understand intended state.

### P0.3 — Public Copy Contamination

**State:** ACTIVE / OWNER FIREWALL ESTABLISHED

Existing public-copy audit/receipt work is part of this stabilization, not a separate architecture.

Immediate defects include customer-visible implementation/OS language and supplier-feed copy that reads like internal code/state explanation.

Required prevention:

- automated public-copy firewall test;
- protected homepage top regression check preventing commerce scripts from silently rewriting hero copy/CTA;
- customer-copy normalization on Store/product/logistics/service surfaces as bounded cleanup.

**Close:** current contamination removed from prioritized customer paths and automated regression exists.

### P0.4 — Canonical Commerce Contract

**State:** OPEN

Inventory public commerce inputs/outputs, including at minimum:

- catalog admin storage/runtime;
- `/api/store/catalog`;
- `/api/store-catalog`;
- SOK catalog path;
- product detail reads;
- featured/home commerce reads;
- checkout eligibility routing;
- Shopify-native Renogy path where applicable;
- vendor source identity/fulfillment owner fields.

Select one canonical public product contract and explicitly classify other paths as adapter / vendor-specific / legacy-retire.

**Close:** one product truth reaches public discovery and checkout per exact SKU.

### P0.5 — Server-Side Trust Gate

**State:** OPEN / CLIENT GUARDS EXIST

Move primary customer-trust/sellability rejection toward authoritative API/runtime boundaries. Browser filters remain defense in depth.

Minimum rejects/holds before public output where applicable:

- unpublished/hold;
- invalid/missing title;
- invalid or missing required price;
- untrusted primary media;
- supplier/source mismatch;
- bad checkout target;
- unresolved fulfillment owner.

**Close:** known bad records do not rely on browser-side hiding to protect customers.

### P0.6 — Legacy/Duplicate Route Retirement

**State:** OPEN

Inventory and disposition legacy store/catalog/product routes. Do not restore dead architecture merely because an old route exists.

**Close:** duplicate public commerce routes are mapped to canonical behavior or retired with a deliberate redirect/410/adapter decision.

### P0.7 — Automated Release Gates

**State:** OPEN

Required automated checks:

- third-party retailer imagery;
- garbage/raw supplier titles;
- unpublished/hold leakage;
- dead checkout/product-detail routes;
- supplier attribution;
- public AI/OS/dev terminology;
- protected homepage-top mutation;
- asset/cache/version mismatch;
- canonical store/product/checkout smoke.

**Close:** trust-critical failures break QA before production.

### P0.8 — Verified Release Receipt

**State:** OPEN

Every recovery deploy must record:

`SOURCE SHA → QA/PREVIEW RESULT → DEPLOYED SHA → CANONICAL DOMAIN VERIFICATION → ACCEPTED BASELINE`

**Close:** production baseline is durable and reproducible.

## Execution Rule

**VERIFY → FIX SMALLEST AUTHORITATIVE LAYER → TEST → RECORD → CONTINUE.**

Do not patch presentation repeatedly if the source/API contract is wrong.

Do not change business/vendor policy to solve a software defect.

Do not let one blocked P0 item stop other independent stabilization work.

## Reopen Criteria

Normal feature development remains held until the owner directive close conditions are satisfied and the Work Board records stabilization as accepted.

## Current Next Action

**P0.1 PRODUCTION LINEAGE RECON → P0.3 PREVENTION GATE IN PARALLEL → P0.4 CATALOG/API CONTRACT INVENTORY.**
