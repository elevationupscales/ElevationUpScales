# Git Drift Recovery Lock — 2026-09-27

**Owner direction:** repair massive Git drift and worker execution errors.

## Current technical baseline

- Current accepted source: `main`
- Recovery baseline SHA at relock: `14baab89c9decd7ef68bca6500edb365869a8bca`
- This SHA is a recovery checkpoint only. Before any new task, re-resolve the latest `main`; never pin future work to this SHA after `main` advances.

## Incident findings

The repo accumulated multiple long-lived worker branches that continued after `main` advanced. Confirmed examples at recovery:

- `work/home-shopify-media-visual-rebuild-2026-09-25`: 78 ahead / 38 behind; mixed website, SEO, launch, routing, and redesign files.
- `work/property-opportunity-engine-phase1-2026-09-24`: 20 ahead / 51 behind.
- `work/seo-preview-domain-indexing-2026-09-23`: 4 ahead / 162 behind.
- `work/seo-preview-domain-indexing-r2-2026-09-23`: 38 ahead / 104 behind.
- `work/seo-preview-refresh-current-main-2026-09-25`: 23 ahead / 38 behind.
- `work/os-recon5-clean-commerce-vendor-2026-09-22`: 27 ahead / 196 behind.
- `work/sok-media-phase2-2026-09-23`: 0 ahead / 106 behind.

Open PRs #242, #244 and #245 were closed during this recovery. Their branches remain as historical evidence only.

## Emergency worker rule

Until explicitly superseded:

1. **Never resume an old work branch by default.**
2. Resolve current `main` first.
3. Compare the proposed branch to current `main`.
4. If the branch is behind `main` and contains unresolved work, treat it as **QUARANTINED**, not active.
5. Create a fresh focused branch from current `main`.
6. Port only the still-authorized in-scope changes. Do not merge the old branch wholesale.
7. One owner objective = one branch = one PR.
8. A branch containing unrelated website, SEO, commerce, launch, operations, or redesign changes is invalid and must be split/rebuilt.
9. Passing QA does not make a drifted branch mergeable.
10. Never use a closed PR branch as the base for new work.

## Worker bookkeeping rule

Worker state, catalog notes, handoff prose, and operations receipts must not generate repetitive commit chains that obscure actual application changes.

- Commit durable material state only.
- Consolidate micro-status updates into the owning worktree/handoff record.
- Do not create multiple same-purpose commits solely to restate availability, recon, or worker status.
- Product/store actions belong in Shopify; Git records only durable public-safe control/evidence when required.
- Git website workers must not represent Shopify mutations as website code work.

## Branch acceptance gate

Before any PR can be considered READY:

- branch was created from a current-main resolution;
- branch objective matches the newest owner instruction;
- compare against current `main` shows only the expected scoped files;
- no unrelated worker or historical commits are carried forward;
- `npm run qa` passes when code changed;
- `git diff --check` passes;
- owner deployment gate remains separate.

## Quarantine policy

Existing historical `work/*` branches are not being force-deleted during recovery because some may contain evidence or unmerged work. Their existence does not grant authority.

A worker must not reuse one unless:
- owner explicitly reauthorizes that exact objective, and
- the work is rebuilt/reconciled from current `main`.

## Current active exception

`work/marauder-hero-nav-2026-09-27` was confirmed at recovery as 2 commits ahead / 0 behind current `main`, touching only:
- `site/clean-commerce-v1.css`
- `site/index.html`

It may remain a bounded candidate subject to normal QA and owner release control. This statement does not authorize merge or production deployment.

## Control statement

**CURRENT MAIN FIRST. OLD BRANCHES ARE EVIDENCE, NOT AUTHORITY. REBUILD STALE WORK; DO NOT MERGE DRIFT.**
