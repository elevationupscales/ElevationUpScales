# Elevation UpScales — Website Rebuild Workload Split

## Status

`FINAL CLEAN-BASELINE REVIEW / PRODUCTION UNCHANGED`

This document completes the non-code coordination work needed to split the remaining review, validation and release workload across multiple workers without overlapping ownership.

## Controlling source

- Repository: `elevationupscales/ElevationUpScales`
- Accepted production `main`: `995ddef117be2ba5b26e154ea43409271fc938a9`
- Final non-production clean-baseline candidate: `84003f12aee2dce0f9ffc808e8c2a5c8f38e14c2`
- Final validation workflow: `33970456341`
- Final isolated preview: `https://72508c71.elevationupscales.pages.dev`
- Production: **UNCHANGED**

The candidate already passed Worker decomposition, static/parity validation, runtime-source protection, public/Admin route smoke, SOK commercialization/full-line smoke, website-integrity smoke, accepted degraded-health behavior, and conditional retirement of `admin-command-center-pass1.css`.

## Global operating rule

The website is already working. The remaining work is independent verification, release preparation and exception handling — not a redesign.

All workers must:

1. start from the exact candidate above or from the coordination branch derived from it;
2. treat review as read-only unless a failing gate is proven;
3. never push directly to `main`;
4. never deploy production;
5. never fix-forward an unrelated issue;
6. never change DB/schema/migrations, Cloudflare bindings/secrets, production data, checkout/PayPal server contracts, SOK/Hawaii business rules, supplier ownership, Marketplace/Catalog separation or Technician Portal ownership without escalation;
7. if a real defect is found, isolate the smallest repair on that worker's own review branch and record the exact failing gate, changed files and rollback;
8. do not modify another lane's owned files without handing the issue to that lane.

## Parallel lanes

### Lane A — Frontend + Admin presentation

**Branch:** `review/clean-baseline-frontend-admin-2026-09-05`

**Primary responsibility:** browser-shell and Admin presentation parity.

Owned review surfaces:

- `site/site-shell.js`
- `site/admin-command-center.js`
- `site/admin-overview.js`
- `site/admin-command-center.css`
- public navigation/support/contact presentation
- Admin navigation, Situation → Priority → Action, responsive presentation

Validation responsibilities:

- desktop/mobile navigation;
- Start a Project remains primary CTA;
- call/SMS routes use `208-813-4998`;
- no active Elevation `719` route;
- `casey@elevationupscales.com` preserved;
- no duplicate analytics listeners/events;
- Admin login page/UI rendering;
- Orders, Leads, Catalog, Inventory, Channels, Shipping/Hawaii, Marketplace, Solar, Analytics/System pages render;
- unknown/unavailable remains `N/A`/unknown;
- canonical Admin stylesheet renders after retirement of `admin-command-center-pass1.css`.

Do not change Worker routes, server business logic or commerce behavior from this lane.

**Completion response:** `LANE A PASS` or `LANE A HOLD — <exact failing contract>`.

---

### Lane B — Worker runtime + security contracts

**Branch:** `review/clean-baseline-worker-runtime-2026-09-05`

**Primary responsibility:** verify decomposed Worker ownership and runtime/security parity.

Owned review surfaces:

- `site/worker-core.js`
- `site/worker/core-context.js`
- `site/worker/domains/*.js`
- `site/_worker.js`
- `site/_routes.json`
- `src/core-route-registry.js`
- shared validation/response utilities

Route ownership domains:

- system;
- admin-auth;
- admin-overview;
- analytics;
- analytics-reporting;
- leads;
- opportunities;
- marketplace;
- inventory;
- solar;
- compatibility.

Validation responsibilities:

- route registry matches dispatcher behavior;
- cross-domain graph remains acyclic;
- Admin unauthorized APIs return expected `401`;
- protected runtime source returns expected `404`;
- `/worker/*` remains protected;
- public health contract accepts the current intentional degraded state only when core services are healthy and optional notification configuration explains degradation;
- auth/session/rate-limit/same-origin semantics remain unchanged;
- no secret/binding value exposure;
- no new D1/R2 owner or duplicate source of truth;
- `/api/store-products` remains explicit compatibility behavior until separately retired.

Do not alter customer pricing, SOK/Hawaii rules, checkout, PayPal or supplier ownership from this lane.

**Completion response:** `LANE B PASS` or `LANE B HOLD — <exact failing contract>`.

---

### Lane C — Customer + commerce behavior validation

**Branch:** `review/clean-baseline-customer-commerce-2026-09-05`

**Primary responsibility:** independent behavior verification. This lane is **review-first and should normally make no code changes**.

Validation surfaces:

- `/`
- `/start-a-project`
- `/store`
- `/rv-store`
- `/marketplace`
- `/solar-project`
- `/sok-batteries`
- SOK product pages
- `/sok-order.html`
- `/lithium-batteries`
- `/hawaii-lithium-batteries`
- `/checkout/`

Required contracts:

- normal customer shopping remains simple;
- SOK Purchase Options flow remains short;
- qty 1–3 remains normal/manual review where eligible;
- qty 4+ remains commercial review;
- commercial-only products remain commercial;
- non-battery products do not expose Hawaii battery qualification;
- Hawaii island field is hidden for non-Hawaii, visible/required only when applicable, and hides again after switching away;
- no payment is collected by the SOK inquiry form;
- no guessed SK48 specs;
- checkout/PayPal behavior unchanged;
- MAP/Purchase Options safeguards unchanged;
- no retired fixed `$99/battery` SOK Hawaii freight;
- no unsupported SOK manufacturer/master-distributor/exclusive claim;
- Marketplace remains separate from Catalog;
- supplier cost/margin/private data remains private;
- Technician Portal remains separate after handoff;
- compatibility redirects continue to work.

If a defect is found, report it to Lane A or Lane B according to ownership rather than editing across domains.

**Completion response:** `LANE C PASS` or `LANE C HOLD — <exact failing customer/business contract>`.

---

### Lane D — Release control + final acceptance

**Branch:** `review/clean-baseline-release-control-2026-09-05`

**Primary responsibility:** lineage, manifests, rollback and release readiness. No feature/code cleanup.

Validation responsibilities:

- confirm production `main` has not moved unexpectedly;
- confirm candidate descends from accepted production base;
- verify final changed-file manifest against candidate;
- verify Worker route ownership receipt;
- verify binding-name inventory contains names only;
- verify no DB/schema/migration/binding/secret/production-data changes;
- verify `_redirects` disposition;
- verify final preview URL and workflow receipt;
- verify rollback to accepted production base is explicit;
- collect Lane A/B/C PASS records;
- if any lane created a repair commit, require a new integrated candidate and repeat the full preview regression before release readiness;
- never promote an untested merge of independent lane fixes.

**Completion response:**

`STATUS: CLEAN-BASELINE RELEASE READY — A/B/C/D PASS — PRODUCTION UNCHANGED`

or

`STATUS: HOLD — <exact blocking gate>`.

## Conflict rules

- Lane A owns browser/Admin presentation.
- Lane B owns Worker/runtime/security implementation.
- Lane C owns independent customer/commerce validation, not implementation.
- Lane D owns integration evidence and release control, not feature implementation.
- No worker edits another lane's owned files to make its own test pass.
- Cross-lane defect = handoff, not opportunistic patching.

## Integration order if fixes are required

1. Keep `84003f12aee2dce0f9ffc808e8c2a5c8f38e14c2` as the validated reference candidate.
2. Apply the smallest Lane A fix first if any.
3. Rebase Lane B fix onto that exact integrated candidate if any.
4. Lane C reruns customer/commerce behavior against the integrated candidate.
5. Lane D reruns full static/parity + isolated-preview regression.
6. Generate a new final candidate SHA, manifest and rollback receipt.
7. Only that exact revalidated candidate becomes release-ready.

If no lane finds a defect, do not create a new application commit merely to record review results; keep the validated candidate SHA and store review receipts separately.

## Shared stop conditions

Escalate instead of modifying when a proposed fix would change:

- checkout/PayPal behavior;
- public pricing/MAP;
- DB/schema/migrations/production data;
- Cloudflare bindings/secrets;
- authentication/session semantics;
- SOK/Hawaii qualification or freight rules;
- supplier/source-of-truth ownership;
- customer/private-data handling;
- route/redirect contract without proven parity;
- Marketplace/Catalog separation;
- Technician Portal ownership.

## Final acceptance checklist

All must be true before production authorization is requested:

- [ ] Lane A PASS
- [ ] Lane B PASS
- [ ] Lane C PASS
- [ ] Lane D PASS
- [ ] exact candidate SHA recorded
- [ ] exact production parent/base recorded
- [ ] current `main` re-resolved
- [ ] changed-file manifest verified
- [ ] route ownership verified
- [ ] binding names inventory verified (names only)
- [ ] no DB/schema/migration/data change
- [ ] no binding/secret change
- [ ] no checkout/PayPal server change
- [ ] no SOK/Hawaii server-rule change
- [ ] Admin unauthorized `401` contracts PASS
- [ ] protected runtime `404` contracts PASS
- [ ] public/Admin route smoke PASS
- [ ] SOK full-line/commercialization PASS
- [ ] customer/commerce regression PASS
- [ ] canonical CSS parity PASS
- [ ] compatibility routing PASS
- [ ] rollback proven
- [ ] isolated preview receipt recorded
- [ ] production still unchanged before explicit authorization

## Worker prompt — universal

> Inspect only your assigned lane against candidate `84003f12aee2dce0f9ffc808e8c2a5c8f38e14c2`. The site is working and this is final independent verification, not a redesign. Do not touch `main` or production. Begin read-only. If every assigned contract passes, return the lane PASS record without creating code churn. If a real defect is proven, isolate the smallest repair on your lane branch, document the failing gate and rollback, and do not edit another lane's ownership area. Never broaden scope to make a cleanup test pass.

## Project finish condition

The split review work is complete when all four lane records are PASS and Lane D has issued:

`STATUS: CLEAN-BASELINE RELEASE READY — A/B/C/D PASS — PRODUCTION UNCHANGED`

Production promotion remains a separate explicit authorization step.