# Elevation UpScales — Morning Recovery Sweep

**Date:** 2026-09-11  
**Mode:** Post-aggressive-worktree recovery / live-site integrity check  
**Owner:** Casey Young  
**Starting main:** `5dd63782e66a99f1c8879580b0c76ab61afbbff6`  
**Status:** RECORDED — SOURCE CLEAN / PRODUCTION DEPLOYMENT DRIFT IDENTIFIED

## Purpose

Record the first-morning reconciliation after the overnight vendor/catalog/Operating System work stretch, preserve the completed worktree state, and separate real regressions from stale production so already-correct work is not rebuilt.

This is an evidence/recovery receipt. `operations/CURRENT_WORK_BOARD.md` remains the canonical global work board and should absorb the material deltas below during its next normal reconciliation.

## 1. Overnight worktree state preserved

Material overnight progress already completed and protected from recreation:

- Renogy Shopify Stage 01 exists: smart `Renogy` collection with five launch products staged as **DRAFT**.
- Those five Renogy drafts remain intentionally non-public until exact MAP/dealer sellability/approved-media/warranty activation facts clear SKU by SKU.
- SOK has nine ACTIVE Shopify products and a smart `SOK Battery` collection.
- VEVOR has the `VEVOR Direct` collection with 40 current products; the public Shopify storefront remains password-gated.
- Kingboss remains correctly at zero Shopify products while the supplier onboarding/source package is external-waiting.
- PR #119 merged the Renogy Stage 01 receipt.
- PR #120 merged the universal-catalog live RUN receipt.
- Repository-wide credential QA was restored by removing only the redundant VEVOR public-safe ZIP; the extracted/readable VEVOR source files remain in Git.

Do not recreate these completed setup actions.

## 2. Approved website design/copy source check

PR #94 (`3ee835f0d31e7f69922972358e68b1e22cdf1fdf`) is the approved bounded homepage/lithium presentation repair.

Approved target includes:

- homepage eyebrow: `AUTHORIZED SOK ENERGY DEALER`;
- flagship heading: `Lithium Power` / `for RV, Solar & Backup`;
- simplified lead focused on SOK lithium batteries and power systems;
- freight/commercial emphasis removed from the flagship hero while the dedicated logistics page remains intact;
- clean standalone 12V + 48V SOK presentation;
- deferred hero carousel hidden;
- approved blue `Elevation UpScales, Inc.` lithium-shop brand asset used on lithium/SOK purchase surfaces and Hawaii lithium header;
- non-lithium storefront branding preserved;
- no checkout, payment, pricing, MAP, shipping, inventory or order-behavior change.

### Source integrity result

**PASS — current `main` still contains the approved PR #94 source.**

Comparison from PR #94 merge through morning `main` shows that the PR #94 runtime presentation files were not overwritten during the aggressive overnight work stretch. Later `site/` runtime activity in that range is limited to `site/admin-catalog.html`; the approved homepage/Hawaii/site-shell presentation work remains present in source.

Therefore:

**DO NOT REWRITE OR REPAIR THE HOMEPAGE SOURCE TO FIX THE CURRENT LIVE APPEARANCE.**

## 3. Live production website sweep

Live production does **not** match current approved source.

### Homepage — FAIL / stale production

Live `https://elevationupscales.com/` still serves the prior presentation:

- old header treatment instead of the approved blue lithium-shop wordmark;
- `LITHIUM BATTERY SUPPLY | HAWAII & ALASKA SHIPPING LOGISTICS`;
- `Lithium Power Solutions / Supply Logistics & Ocean Freight`;
- freight/commercial-heavy lead copy;
- old storefront wordmark asset.

This is the pre-PR-94 presentation and is not the current approved source state.

### Hawaii lithium page — PARTIAL / stale header branding

The Hawaii lithium purchase-flow wording is current and product-aware, but the live page header still uses the old `storefront-wordmark.webp` branding instead of the approved blue lithium-shop asset from PR #94.

### Dedicated logistics page — PASS / preserve

The dedicated logistics page remains intact and appropriately contains the product-aware freight/destination-review messaging.

This confirms the approved design intent:

**REMOVE FREIGHT EMPHASIS FROM THE FLAGSHIP HERO — DO NOT REMOVE THE LOGISTICS SERVICE.**

## 4. Root cause classification

**DEPLOYMENT DRIFT — NOT SOURCE REGRESSION.**

The approved code is merged and still present on current `main`, while canonical production is serving an older site build.

The permanent release control is `.github/workflows/worker-release-deploy.yml`:

1. resolve exact current `main` SHA;
2. run same-SHA **preview**;
3. require preview PASS;
4. run same SHA to **production** with exact `DEPLOY` confirmation;
5. smoke the exact deployment URL and canonical `https://elevationupscales.com`.

No automatic deployment from `main` exists.

## 5. Release execution gate encountered this morning

An authenticated GitHub Actions browser session was attempted for `Worker Exact-SHA Release` using current morning `main`.

Result:

**BLOCKED — no authenticated GitHub browser session/profile was available to press Run workflow.**

The connected GitHub repository tool can read/write Git and manage PRs, but the currently exposed connector surface does not provide workflow-dispatch execution.

No release-control bypass was used. In particular:

- `production-deploy` was not advanced to bypass preview-first control;
- no workflow file was altered to force deployment;
- no Cloudflare credentials or deployment secrets were exposed or changed;
- no second homepage implementation was created.

## 6. Exact next release action

When an authenticated GitHub Actions session or workflow-dispatch-capable connection is available:

1. re-resolve current `main` SHA;
2. review that no new conflicting website runtime change has landed;
3. dispatch `Worker Exact-SHA Release` → `preview` for that SHA;
4. verify preview displays:
   - `AUTHORIZED SOK ENERGY DEALER`;
   - `Lithium Power / for RV, Solar & Backup`;
   - approved blue Elevation lithium-shop wordmark;
   - standalone 12V + 48V SOK presentation;
   - hidden deferred carousel;
   - correct blue header branding on Hawaii lithium;
   - dedicated logistics page preserved;
5. after preview PASS, dispatch the **same SHA** to `production` with `DEPLOY` confirmation;
6. smoke canonical production on desktop/mobile and record the release receipt.

If preview does not match current source, investigate build/cache/deployment output before changing design code.

## 7. Morning state corrections to carry into canonical board

The following older board wording is now stale and must not drive recreation:

- Renogy is no longer `zero live Renogy Shopify products at recon` as an implementation state; five products are now staged DRAFT in the Renogy Shopify collection.
- Universal-catalog state now includes SOK smart collection, VEVOR 40-product collection and Renogy five-draft collection.
- Homepage PR #94 remains source-complete but **production stale**; the current blocker is authenticated release dispatch, not code merge or design approval.
- Shopify public storefront password protection remains a separate authenticated Shopify Admin gate and must not be confused with the Elevation Pages website deployment issue.

## 8. Morning repair decision

No visual redesign or wording rewrite is authorized or required from this sweep.

The correct repair is:

**DEPLOY THE ALREADY-APPROVED CURRENT SOURCE THROUGH THE EXISTING PREVIEW → PRODUCTION RELEASE CONTROL.**

Until that authenticated release action can execute, preserve current source, continue unrelated safe worktrees, and do not let stale production cause duplicate implementation.
