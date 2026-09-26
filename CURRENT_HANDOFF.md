# Elevation UpScales — Current Worker Handoff

Updated: 2026-09-26
Control mode: MPM 25 MASTER S.O.P. RELOCK
Repository: `elevationupscales/ElevationUpScales`

## Read first

1. `MASTER-SOP.md`
2. `AGENTS.md`
3. `CODING-WORKFLOW.md`
4. task-specific files explicitly required by the owner

Do not use older handoff content, old PR descriptions, or dated baselines as current authority.

## Control baseline

Accepted `main` at relock:

`f8b55f928f28b8f3087980576158bab286dc022d`

That SHA contains the merged PR #247 navigation-only patch:
`Direct Shop navigation to Shopify storefront`.

Always re-resolve `main` before beginning new work. The SHA above records the MPM 25 relock checkpoint; it is not permission to roll back newer owner-approved work.

## Platform boundary

### Git website
`elevationupscales.com`

Source/deployment:
GitHub → Cloudflare Pages

### Shopify storefront
`shop.elevationupscales.com`
`store.elevationupscales.com`

Source/deployment:
Shopify

Workers must not cross these systems by assumption.

## Current owner state

The immediate website direction preceding this relock was navigation-only:
- make the Shopify storefront easy to reach;
- obsolete Git-site "Shop All Products" behavior must not be restored;
- destination is the Shopify storefront;
- no collection rebuild;
- no wording edits;
- no marketing additions.

PR #247 is merged and represents that completed Git patch.

## HOLD — preserved, not authorized

These pre-existing open PRs are not active work until the owner explicitly reauthorizes them:

- PR #242 — SEO preview-domain indexing
- PR #244 — Property Opportunity Engine Phase 1
- PR #245 — SEO preview refresh

Do not merge, deploy, stack on, or treat these PRs as current requirements.

## Worker operating rule

One task. One branch. One owner-approved objective.

Before editing:
- resolve current `main`;
- restate the exact objective;
- identify which platform owns it;
- create a focused branch from current `main`.

Before merge:
- inspect changed files;
- confirm no scope expansion;
- run required QA;
- compare against current `main`.

Before deployment:
- require explicit deployment authority;
- use exact-SHA preview;
- production must use the same SHA;
- verify canonical production after release.

## Stop rule

If owner says STOP / HOLD / FREEZE / NO MORE EDITS:
- stop mutations;
- preserve branch;
- do not merge;
- do not deploy;
- report state only.

## Current handoff status

**MPM 25 CONTROL RELOCK IN PROGRESS**

Scope of the relock branch:
- add `MASTER-SOP.md`;
- point `AGENTS.md` to master control;
- replace this stale handoff with current MPM 25 state.

No website content, routing, Shopify content, product data, pricing, checkout logic, or deployment is authorized by this control update.
