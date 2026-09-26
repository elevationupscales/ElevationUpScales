# MASTER S.O.P. — MPM 25 CONTROL LOCK

Effective: 2026-09-26
Owner authority: President, Elevation UpScales, Inc.
Repository: `elevationupscales/ElevationUpScales`

## 1. Purpose

This file is the single active control document for workers operating in this repository.

Its purpose is to stop branch, worker, deployment, scope, and source-of-truth drift.

If another handoff, dated baseline, old prompt, historical README, worker note, PR description, or prior workflow conflicts with this file, this file controls unless the owner gives a newer direct instruction.

## 2. Authority order

Workers must resolve instructions in this order:

1. Current direct owner instruction.
2. This `MASTER-SOP.md`.
3. Current accepted `main`.
4. Task-specific source documents explicitly named by the owner.
5. `AGENTS.md` and `CODING-WORKFLOW.md`.
6. Current operations SOPs under `/operations/` for their own workstream.
7. Historical handoffs, old baselines, old prompts, old PR descriptions, and archived notes.

Historical files never override current owner direction or current accepted `main`.

## 3. MPM 25 control baseline

Control baseline at relock:

`f8b55f928f28b8f3087980576158bab286dc022d`

This is the accepted `main` state immediately after PR #247:
`Direct Shop navigation to Shopify storefront`.

Do not treat an older branch, preview, PR, recovery branch, or historical baseline as current production truth.

The baseline above is a control checkpoint, not permission to revert newer owner-approved work. After new work is accepted, re-resolve current `main` and use that exact SHA.

## 4. Platform boundary — DO NOT CROSS

### elevationupscales.com
- Source: this GitHub repository.
- Deployment model: Git / Cloudflare Pages.
- Workers may edit only when the owner explicitly authorizes a website change.

### shop.elevationupscales.com / store.elevationupscales.com
- Source: Shopify.
- Store catalog, product pages, collections, inventory-facing merchandising, and Shopify theme/storefront work are Shopify work.
- Do not rebuild, duplicate, or replace Shopify store functions in the Git website unless the owner explicitly requests that architecture.

### Navigation rule
The Git website may link visitors to the Shopify storefront.
Do not recreate obsolete "Shop All Products" Git-site behavior when the intended destination is the Shopify storefront.

## 5. Scope lock

Every worker must state the requested scope internally before editing.

Allowed:
- the exact requested change;
- a directly required repair that is necessary for that change to function;
- required QA for that change.

Not allowed without new owner authorization:
- adjacent redesign;
- copy rewrites;
- new marketing language;
- new collections;
- product changes;
- pricing changes;
- checkout changes;
- unrelated SEO edits;
- unrelated cleanup;
- dependency upgrades;
- workflow rewrites;
- speculative architecture work.

"No extra improvements" is the default.

## 6. Branch discipline

1. Re-resolve current `main` before starting.
2. Create one focused branch from that exact SHA.
3. One branch = one owner-approved objective.
4. Do not stack unrelated worker changes.
5. Do not use another worker's branch as a base unless the owner explicitly combines the work.
6. Do not force-push over another worker's active branch.
7. Do not merge stale work because it once passed QA.
8. If `main` moves, compare the branch against current `main` before merge.
9. If lineage is unclear, STOP the merge and reconcile first.

## 7. Open-PR hold rule

At the time of this relock, the following pre-existing PRs are not active authority and are on HOLD until the owner explicitly reauthorizes them:

- PR #242 — SEO preview-domain indexing work.
- PR #244 — Property Opportunity Engine Phase 1.
- PR #245 — SEO preview refresh on current site baseline.

HOLD means:
- preserve the work;
- do not deploy it;
- do not merge it;
- do not use it as a base for new work;
- do not assume its content is still wanted.

New owner direction may reauthorize any of them.

## 8. Worker handoff rule

Workers do not create competing master plans.

A worker handoff may record only:
- task objective;
- branch;
- base SHA;
- files changed;
- QA performed;
- unresolved blocker;
- exact next action.

A worker handoff cannot redefine:
- business strategy;
- source of truth;
- platform architecture;
- release authority;
- owner-approved scope.

## 9. QA rule

During iteration:
`npm run qa:fast`

Before preview or merge:
`npm run qa`
`git diff --check`

Also inspect the actual changed-file diff.

Passing QA does not authorize merge or deployment if scope is wrong.

## 10. Merge rule

Before merge:
- confirm branch objective still matches the latest owner instruction;
- confirm current `main`;
- confirm no unrelated files changed;
- confirm QA pass;
- confirm no conflicting newer work.

Merge only the approved task.

After merge:
- re-resolve exact `main` SHA;
- that SHA becomes the only release candidate.

## 11. Deployment rule

No worker may infer deployment authorization from:
- a successful merge;
- a successful preview;
- a passing workflow;
- an old instruction;
- a prior deployment pattern.

Normal release path:
APPROVED MAIN SHA → EXACT-SHA PREVIEW → VERIFY → SAME-SHA PRODUCTION → CANONICAL SMOKE → CLOSEOUT RECEIPT

Use the permanent Worker Exact-SHA Release workflow defined in `CODING-WORKFLOW.md`.

Never substitute a stale branch or different SHA between preview and production.

## 12. Freeze / stop command

If the owner says STOP, HOLD, FREEZE, NO MORE EDITS, or equivalent:
- stop code changes immediately;
- preserve current work;
- do not merge;
- do not deploy;
- report current branch/SHA/status only.

A later task does not silently unfreeze the prior task.

## 13. Drift detection

Treat any of these as DRIFT:
- worker using an older baseline as current truth;
- Git-site worker editing Shopify-owned commerce surfaces;
- Shopify worker assuming Git deploys the store;
- unrelated edits in a focused patch;
- stale PR merged without reauthorization;
- deployment from a SHA different from approved preview;
- worker inventing requirements;
- old handoff overriding owner instruction;
- worker changing wording when only navigation/routing was requested.

When drift is detected:
1. stop mutation;
2. re-resolve `main`;
3. identify the owner-approved objective;
4. compare worker branch to current `main`;
5. keep only in-scope work;
6. resume only under this SOP.

## 14. Sensitive information

This repository is public.

Never commit:
- credentials;
- tokens;
- private customer data;
- private supplier correspondence;
- confidential pricing;
- private freight quotes;
- non-public compliance packets;
- payment or banking information.

## 15. Closeout format

Every completed Git task must end with one concise receipt:

- Objective
- Base SHA
- Branch
- PR
- Merge SHA
- QA result
- Deployment status
- Canonical verification status
- Remaining HOLD items

Do not bury status in long narrative.

## 16. Current MPM 25 state

At relock:
- `main` control baseline: `f8b55f928f28b8f3087980576158bab286dc022d`
- Store-navigation-only patch is merged.
- Git website and Shopify storefront are separate deployment systems.
- Existing PRs #242, #244, #245 are HOLD.
- This SOP changes control/worker behavior only. It does not authorize a website redesign, product edit, Shopify edit, or production deployment.
