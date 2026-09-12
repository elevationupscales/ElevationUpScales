# ELEVATION UPSCALES — MASTER DEVELOPER PHASE B PRODUCTION ↔ MAIN DELTA LEDGER

**Date:** 2026-09-12 MDT  
**Owner:** Casey Young  
**Incident:** GitHub Issue #65  
**Phase:** B — production ↔ `main` delta ledger  
**Execution Owner:** MASTER DEVELOPER  
**Status:** DEV RETURNED / RECON AUDIT PENDING  

## 1. Baseline and comparison

- Accepted production / recovery baseline: `89912be657d7e92c3582619005c0a110ad843577`
- `production-deploy`: `89912be657d7e92c3582619005c0a110ad843577`
- `recovery/coding-stabilization-20260912`: `89912be657d7e92c3582619005c0a110ad843577`
- Comparison target `main`: `f6033ec05936b9f5533fe6c88b05376b03af1c45`
- Common merge base: `c4126b819d2ddcd9b61ade955528b74cec24a161`
- Directional comparison: `main` side 139 commits / accepted-production side 12 commits.

The lineages remain intentionally diverged.

**NO BULK MERGE / NO WHOLESALE MAIN DEPLOY / NO BLIND FAST-FORWARD / NO FORCE UPDATE.**

This Phase B run classified the production-affecting file union. It did not mutate production, checkout, catalog runtime, homepage runtime, or the recovery branch.

## 2. Method

The ledger was built from both directional Git comparisons between accepted production and current `main`, then direct file inspection for the customer/runtime deltas that control catalog exposure, product routing, homepage protection, store rendering, and regression coverage.

Classification meanings:

- **OPERATIONS ONLY** — documentation/state/data artifacts with no customer runtime effect in this recovery decision.
- **REQUIRED RECOVERY** — must be preserved or selectively ported to satisfy customer trust, product truth, protected-top, route or regression safety.
- **BUSINESS-VALID / DEFERRED** — legitimate work, but not required to close the current P0 recovery phase and therefore held by the feature freeze.
- **REJECT / RETIRE** — stale, superseded, unsafe or regression-producing implementation that must not be admitted to recovery.

## 3. Production-affecting file ledger

| File | Classification | Phase B decision / required treatment |
|---|---|---|
| `site/_routes.json` | **REQUIRED RECOVERY** | Preserve accepted-production exclusions for `/api/store-catalog`, `/api/store/catalog`, and `/api/store/featured`. Main's empty exclusion list would reopen the quarantined legacy generic catalog endpoints and is **REJECT / RETIRE** for recovery. |
| `site/_redirects` | **REQUIRED RECOVERY + DEFERRED split** | Preserve accepted-production fail-close redirects for `/product`, `/product.html`, and `/product/` to `/store` until Phase D deliberately maps trusted detail routes. Main's generic `/product` reopen is **REJECT / RETIRE**. The `/report-an-issue` → help/contact change is **BUSINESS-VALID / DEFERRED**. |
| `site/universal-store.js` | **REQUIRED RECOVERY** | Preserve accepted-production SOK handling that honors trusted `/sok/...` detail URLs and API-provided purchase URLs. Main's generic SOK `/product?id=...` detail route and generic checkout construction are **REJECT / RETIRE** until the public contract and route map are accepted. Customer-copy cleanup may be selectively reviewed later without losing the trusted route behavior. |
| `site/home-commerce.js` | **REQUIRED RECOVERY — SELECTIVE PORT** | Main correctly removes runtime rewriting of the protected homepage hero lead and primary CTA. Port only that protection into recovery; do not wholesale adopt unrelated homepage changes. Accepted production's `MISSION`/hero mutation behavior is superseded by the owner homepage lock. |
| `site/store.html` | **REQUIRED RECOVERY — SELECTIVE PORT** | Main contains cleaner customer-facing store copy, but accepted production carries the required cache-busted `universal-store.js?v=1.0.2-p0`. Selectively reconcile copy while preserving the P0 cache version and runtime safety. Main's regression to `v=1.0.0` is **REJECT / RETIRE**. |
| `package.json` | **REQUIRED RECOVERY — MERGE TEST CONTRACTS** | Recovery must run all three relevant guards: P0 catalog containment, protected-homepage-top, and public-copy firewall. Main currently adds the two newer tests but drops the P0 containment test; that omission is **REJECT / RETIRE**. |
| `tests/p0-catalog-trust-containment.test.mjs` | **REQUIRED RECOVERY** | Preserve. This is the accepted-production regression contract for API quarantine, blocked media defense, trusted SOK detail/purchase routing, and store cache busting. |
| `tests/homepage-protected-top.test.mjs` | **REQUIRED RECOVERY** | Port. Verifies protected hero copy/CTA stay authored in `index.html` and are not rewritten by commerce runtime. |
| `tests/public-copy-firewall.test.mjs` | **REQUIRED RECOVERY** | Port after review. Prevents internal OS/developer/operations terminology from leaking to customer-facing HTML/renderers. |
| `tests/universal-store.test.cjs` | **REQUIRED RECOVERY + REJECT split** | Preserve route/checkout/inventory assertions that agree with accepted recovery. Retire the stale `full locked mission is installed on homepage runtime` assertion; it conflicts with the owner protected-top rule and the newer dedicated homepage regression test. |
| `site/product.html` | **BUSINESS-VALID / DEFERRED** | Main adds `catalog-trust-guard.js`, but the legacy generic product route remains intentionally fail-closed in accepted production. Do not reopen the route merely because a client-side guard exists. Revisit in Phase D only after trusted detail routing is mapped. |
| `site/catalog-trust-guard.js` | **BUSINESS-VALID / DEFERRED** | Useful defense in depth, but it is client-side filtering and cannot replace the server/public eligibility contract required by Phase C. Hold until Phase C/D admits it deliberately. |
| `site/catalog-admin-runtime.js` | **BUSINESS-VALID / DEFERRED** | Admin/internal catalog runtime delta. Customer-facing P0 surfaces outrank it; hold until public contract/route work is classified and accepted. |
| `site/other-ways-we-can-help.html` | **BUSINESS-VALID / DEFERRED** | Customer-help/navigation wording change, not required for P0 source-of-truth/checkout stabilization. |
| `deployment/qa/web-com-navigation-static.mjs` | **BUSINESS-VALID / DEFERRED** | Its current delta follows the non-P0 `/report-an-issue` redirect change. Hold with that route decision; do not let it drive recovery routing. |
| `tests/catalog-migration-source.test.cjs` | **BUSINESS-VALID / DEFERRED** | Migration/source test delta is not required to preserve the current accepted containment baseline. Re-evaluate when Phase C public-contract work begins. |

## 4. Non-runtime / operations-only compare families

All remaining compare-listed records under the following families are classified **OPERATIONS ONLY for Phase B production admission** unless a later phase identifies an explicit runtime import or deployment dependency:

- `operations/**` management plans, Worktrees, receipts, vendor/project source records, profitability controls and reconciliation records;
- `media/social/**` campaign manifests;
- `operations/vendor-source/**` supplier working data, CSV/XLSX snapshots and public-safe manifests.

These files remain valid company operating evidence on `main`; their presence does not authorize a website deployment or change the accepted production lineage.

## 5. Checkout / payment / order-persistence delta finding

The production-affecting file comparison did **not** surface a divergent checkout/payment/order-persistence source file, PayPal runtime, order-persistence runtime, or `.github/workflows/**` release-workflow file in the Phase B union.

Classification: **NO FILE-LEVEL DELTA DETECTED in these categories during Phase B.**

This is not a behavioral certification. Phase D must still smoke/test the working checkout/payment/order-record paths without submitting payment, and Phase F must still prove branch-aware release behavior.

## 6. Unknowns

**Unresolved UNKNOWN production-affecting files: NONE identified at the file-inventory level.**

Behavioral acceptance remains intentionally open for Phases C–F. Phase B classifies the source divergence; it does not pre-authorize those later repairs.

## 7. Recommended REQUIRED RECOVERY sequence

1. **Route containment first** — preserve `site/_routes.json` API quarantine and legacy `/product` fail-close redirects.
2. **Trusted SOK/product routing** — preserve accepted `site/universal-store.js` dedicated SOK detail/purchase behavior; reject the generic main regression.
3. **Regression contract reconciliation** — combine P0 containment + protected-top + public-copy tests in `package.json`; retire the stale mission rewrite assertion.
4. **Protected homepage runtime** — selectively port main's removal of hero/CTA mutation from `home-commerce.js`.
5. **Customer-safe Store copy** — selectively reconcile `store.html` wording while retaining accepted P0 asset/cache version and runtime safety.
6. **Phase C/D defense in depth** — only after authorization, evaluate `catalog-trust-guard.js` and trusted generic detail routing behind one authoritative public eligibility contract.
7. **Deferred admin/help/navigation/migration changes** — remain held until the P0 recovery sequence no longer blocks them.

## 8. Phase gate return

MASTER DEVELOPER has completed the Phase B ledger deliverable and stops here.

**Next state:**

**DEV RETURNED → MASTER RECON AUDITS → PM4 ACCEPTS OR RETURNS → ONLY THEN PHASE C MAY OPEN.**

Production and recovery remain pinned to `89912be657d7e92c3582619005c0a110ad843577` during this return.

**CONTROL:** CLASSIFY FIRST → PORT ONLY REQUIRED RECOVERY → QA → ACCEPT → NEXT PHASE. NO WHOLESALE MAIN DEPLOY.
