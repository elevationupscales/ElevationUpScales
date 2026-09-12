# ELEVATION UPSCALES — OWNER DIRECTIVE: WEBSITE CODING P0 STABILIZATION

**Date:** 2026-09-12
**Owner:** Casey Young
**State:** ACTIVE / P0 STABILIZATION
**Applies To:** Public website code, public commerce APIs, catalog presentation, deployment/release control, shared public runtime dependencies

## OWNER DIRECTION

The website coding/deployment portion of the Elevation Operating System is not currently operating in sync with the company Operating System.

This is not a single-page defect and is not a request for another redesign. The coding lane has accumulated deployment drift, duplicated product truth, public/internal-language leakage, legacy routes, stale runtime behavior and client-side guard logic that should be enforced closer to authoritative source data.

Effective immediately:

**MASTER DEVELOPER = P0 STABILIZATION**
**MASTER RECON OS = ACTIVE OVERSIGHT**
**NONESSENTIAL WEBSITE FEATURE WORK = HOLD**
**CUSTOMER-TRUST / CHECKOUT / SOURCE-OF-TRUTH / DEPLOYMENT-CONTROL REPAIRS = AUTHORIZED**
**PRODUCTION = CHANGE ONLY THROUGH VERIFIED RECOVERY LINEAGE**

This directive works with the existing Master SOP, current Work Board, public-copy firewall, owner homepage lock and vendor Project controls. It does not create a new manager or duplicate Operating System.

## 1. FREEZE RULE

Until this stabilization closes, do not spend website-development capacity on nonessential feature expansion, cosmetic redesign, experimental navigation, new dashboard concepts, new public catalog architecture or speculative integrations.

Exceptions are limited to work that directly restores or protects:

- accurate customer-facing product truth;
- checkout/payment correctness;
- fulfillment/source ownership;
- public copy quality and trust;
- security/compliance;
- required revenue functionality;
- production/deployment integrity;
- owner-authorized vendor commerce already in progress.

A vendor Project may continue its business/product work. This freeze applies to unnecessary public website-code expansion, not to company operations as a whole.

## 2. RECOVERY BASELINE RULE

Do not assume newest `main` equals safe production.

Do not assume current production equals desired final state.

Recovery sequence:

**VERIFY ACTUAL PRODUCTION → IDENTIFY DEPLOYED SOURCE LINEAGE → PRESERVE VERIFIED WORKING CUSTOMER BEHAVIOR → RECONCILE MAIN DELTAS → SELECT INTENDED CHANGES → PREVIEW → QA → OWNER/RELEASE GATE WHERE REQUIRED → PRODUCTION → CANONICAL VERIFICATION → RECEIPT**

The current verified production lineage becomes the recovery reference for customer behavior while reconciliation is performed. `main` remains the development/source-control history, but changes are not blindly promoted merely because they exist on `main`.

## 3. MAIN ↔ PRODUCTION RECONCILIATION

MASTER DEVELOPER + MASTER RECON must establish one explicit reconciliation ledger covering:

- production deployed SHA/build identifier if available;
- current `main` SHA;
- commits/deltas between them;
- customer-visible vs internal-only changes;
- known good / known bad / unknown classification;
- shared dependency impact;
- homepage protected-top impact;
- commerce/catalog impact;
- required preview/QA evidence;
- final disposition: KEEP / FIX / DROP / REBUILD / VERIFY.

Do not resolve a large lineage gap by bulk-promoting unreviewed `main`.

## 4. ONE PUBLIC COMMERCE SOURCE OF TRUTH

The website must converge on one authoritative public commerce contract for each product:

**PRODUCT IDENTITY → BRAND/SUPPLIER → SKU → PUBLIC TITLE → PUBLIC DESCRIPTION → PUBLIC PRICE → AVAILABILITY → PURCHASE ELIGIBILITY → CHECKOUT DESTINATION → FULFILLMENT OWNER → SHIPPING/Destination LIMITS**

Supplier Projects remain authoritative for vendor-specific facts. The website must not invent a second vendor truth.

Duplicate or legacy public catalog/API routes must be inventoried and either:

- mapped to the canonical contract; or
- retired cleanly.

Do not continue indefinitely layering browser filters around contradictory upstream records.

## 5. SERVER-SIDE TRUST / SELLABILITY GATE

Bad or unresolved records should not reach customer discovery merely to be hidden later in browser JavaScript.

Where technically practical, customer-visible catalog APIs must fail closed before public response for:

- unpublished/held products;
- unresolved product identity;
- missing or nonpositive price where direct sale requires a price;
- disallowed/untrusted primary imagery;
- supplier/source mismatch;
- known unsafe checkout target;
- missing required fulfillment owner;
- other exact conditions defined by the owning commerce contract.

Browser-side checks may remain as defense in depth, not as the primary source-of-truth enforcement layer.

## 6. PUBLIC COPY FIREWALL

`OWNER_DIRECTIVE_PUBLIC_COPY_FIREWALL_2026-09-12.md` is a P0 companion control.

Internal software/OS wording must not appear as customer copy.

Terms/concepts such as worktree, lane, gate, source-of-truth, revenue-first, activation state, reconciliation state, trust-review, quarantine, retail state, authoritative controls, source-state, workflow state, developer/QA language and similar internal implementation wording are prohibited from normal customer-facing copy unless the phrase has a legitimate ordinary customer meaning in context.

Raw supplier titles/descriptions are source material, not finished Elevation merchandising copy.

## 7. PROTECTED HOMEPAGE TOP

The existing owner homepage lock remains fully active.

The carefully built top homepage experience is not unlocked by this stabilization directive.

Technical stabilization may inspect dependencies that affect the protected top. Any mutation that changes its rendered/runtime output requires the existing owner boundary/verification process.

Lower commerce/catalog/shopability/navigation surfaces may be repaired when they stay inside the authorized boundary.

## 8. SOK PROTECTION

This stabilization does not authorize reworking current live SOK battery listings, pricing or completed SOK operating work.

SOK remains under its existing Project controls. Shared technical repairs may support SOK only when they preserve the established SOK behavior and do not restart settled business decisions.

## 9. AUTOMATED RELEASE GATES REQUIRED

The stabilized release path must include automated checks, at minimum, for:

- prohibited third-party retailer imagery on public product cards;
- missing/garbage/truncated supplier-feed titles presented publicly;
- unpublished/hold products leaking publicly;
- bad or dead checkout routes;
- stale/missing product-detail targets;
- incorrect supplier/brand attribution;
- public internal/AI/OS/developer terminology leakage;
- protected homepage-top mutation from shared dependencies;
- asset/cache version mismatch where versioned assets are required;
- canonical route smoke tests for store, product, checkout and owner-protected surfaces.

Tests must fail closed when a trust-critical public defect is detected.

## 10. RELEASE RECEIPT STANDARD

Every production release during and after stabilization must produce a durable receipt containing:

- source/base SHA;
- candidate/deployed SHA;
- intended scope;
- QA/test result;
- preview verification result when applicable;
- production deployment result;
- canonical-domain verification result;
- protected homepage verification result when shared dependencies are involved;
- known holds/anomalies that remain;
- resulting accepted production baseline.

**SOURCE SHA → QA RESULT → DEPLOYED SHA → CANONICAL VERIFICATION → ACCEPTED BASELINE**

A Git commit is not proof of production. A production deploy is not complete until canonical verification passes.

## 11. STABILIZATION PHASES

### Phase 0 — Freeze + Inventory

- freeze nonessential website features;
- identify actual production lineage/build;
- resolve current `main`;
- inventory public catalog/API/runtime/deployment surfaces;
- identify duplicate/legacy paths.

### Phase 1 — Trust Containment

- remove public internal/AI/OS terminology;
- fail closed on untrusted product records;
- prevent legacy/bad product cards from customer discovery;
- protect checkout and vendor attribution.

### Phase 2 — Source-of-Truth Consolidation

- choose canonical public product contract;
- migrate/bridge required active records;
- retire duplicate legacy public routes/APIs;
- move primary trust/sellability logic server-side.

### Phase 3 — Release Control

- establish deterministic preview + QA + production process;
- establish asset/cache/version discipline;
- require production receipt and canonical verification.

### Phase 4 — Reopen Development

Normal website feature velocity resumes only after stabilization acceptance is recorded.

## 12. CLOSE CONDITIONS

P0 stabilization is not closed until all are proven:

1. actual production lineage is known and reconciled against current `main`;
2. one canonical public commerce product contract is documented and operating;
3. duplicate/legacy public commerce routes are retired or explicitly mapped;
4. trust/sellability failures are blocked before public presentation where technically appropriate;
5. public copy firewall has automated regression coverage;
6. protected homepage-top cannot be silently rewritten by ordinary commerce code;
7. canonical store/product/checkout smoke tests pass;
8. deployment receipts prove source → QA → deploy → canonical verification;
9. production accepted baseline is recorded;
10. MASTER RECON reports no unresolved P0 coding/deployment drift.

## CONTROL PHRASE

**STOP FEATURE DRIFT → VERIFY PRODUCTION → RECONCILE MAIN → RESTORE ONE PRODUCT TRUTH → ENFORCE TRUST SERVER-SIDE → TEST THE CUSTOMER PATH → DEPLOY FROM VERIFIED LINEAGE → VERIFY CANONICAL → RECORD THE BASELINE → THEN REOPEN FEATURES.**