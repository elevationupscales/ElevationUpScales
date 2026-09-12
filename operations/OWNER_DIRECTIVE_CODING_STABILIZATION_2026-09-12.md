# ELEVATION UPSCALES — OWNER DIRECTIVE: P0 CODING STABILIZATION

**Date:** 2026-09-12
**State:** ACTIVE / P0 CODING + DEPLOYMENT RECOVERY
**Owner:** Casey Young

## Trigger

Customer-trust failure exposed structural degradation in the website coding/deployment lane, not merely one bad listing.

At stabilization start:

- `main` and `production-deploy` are **diverged**, not simply ahead/behind;
- their merge base is `c4126b819d2ddcd9b61ade955528b74cec24a161`;
- `main` carries more than 100 unique commits beyond that merge base;
- `production-deploy` carries emergency trust-containment commits not present on `main`;
- live customer-facing catalog paths have shown inconsistent product truth, legacy supplier-feed presentation, and stale-cache behavior.

## Owner control

**NONESSENTIAL WEBSITE FEATURE DEVELOPMENT IS FROZEN UNTIL CODING STABILIZATION IS VERIFIED.**

This freeze applies to website/application code, not ordinary company/vendor/order operations that do not mutate the degraded website code path.

### Authorized during stabilization

- P0 customer-trust containment;
- checkout/payment/order-record integrity repairs;
- catalog/product source-of-truth reconciliation;
- deployment/release-lineage repair;
- cache/versioning corrections;
- security, legal, privacy, payment and customer-order critical fixes;
- automated regression tests, smoke tests and observability required to prove the repairs;
- public-copy cleanup where internal/AI/ops text is leaking to customers;
- removal/quarantine of unsafe legacy public records while preserving internal evidence.

### Held during stabilization

- new website features;
- visual redesign;
- broad refactors unrelated to the P0 recovery;
- new public catalog modules or duplicated product systems;
- speculative catalog expansion on the degraded Elevation web catalog;
- cosmetic work that does not repair trust, checkout, source truth or deployment integrity;
- direct merge/fast-forward/force of all `main` into `production-deploy`;
- treating either divergent branch as automatically authoritative for the other.

The existing owner homepage protected-top lock remains in force.

## Recovery-lineage rule

The currently verified production lineage is the recovery anchor.

**DO NOT DEPLOY `main` WHOLESALE.**

Use:

**VERIFIED PRODUCTION → RECOVERY BRANCH → CLASSIFY/PORT ONLY REQUIRED CHANGES → QA → PREVIEW/SMOKE → CONTROLLED PRODUCTION → LIVE CANONICAL VERIFY → RECEIPT**

Every promoted technical change must state:

1. source commit/file;
2. why it is required;
3. whether it affects customer trust, product truth, checkout or protected homepage output;
4. tests run;
5. deployed SHA;
6. live canonical-domain verification.

## Catalog architecture recovery target

Customer-visible product truth must converge on one authoritative retail contract for:

- product identity / supplier SKU;
- vendor/brand attribution;
- customer-safe title and description;
- approved media provenance;
- sell price and MAP/price-control state;
- availability/orderability;
- checkout eligibility;
- fulfillment owner;
- shipping/destination constraints.

A record that does not satisfy the public contract must **fail closed from customer discovery** while remaining available internally for review/history.

Browser-side hiding is defense-in-depth only. Public APIs/server responses must eventually enforce the same contract before records reach the browser.

## Release acceptance

A code test passing is not enough.

A stabilization release is accepted only after:

**QA PASS → DEPLOY PASS → CANONICAL DOMAIN PASS → CUSTOMER-FACING RENDER PASS → CHECKOUT/GOOD-PRODUCT PATH PASS → RECEIPT.**

## Authority / routing

**CASEY → PM4 / MPM → MASTER RECON OS + MASTER DEVELOPER**

- MASTER RECON protects lineage/state and prevents stale/replay drift.
- MASTER DEVELOPER owns the technical recovery execution.
- COM 2 consolidates the result but does not rewrite technical truth.
- Vendor managers continue vendor truth; they do not independently patch the recovery architecture.

## Exit gate

Feature development may reopen only after all of the following are verified:

1. customer-trust P0 is closed from live evidence;
2. production and recovery lineage are unambiguous;
3. public product/API truth is fail-closed and consistent;
4. known checkout paths are verified;
5. stale legacy public surfaces are retired or explicitly controlled;
6. cache/versioning behavior is deterministic;
7. regression tests cover the incident class;
8. Casey explicitly releases the stabilization freeze.

**CONTROL:** PROTECT CUSTOMERS → STABILIZE PRODUCTION → RECONCILE CODE → PROVE LIVE → THEN RESUME FEATURES.
