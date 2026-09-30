# Elevation UpScales — Current Worker Handoff

Updated: 2026-09-29
Control mode: **OS 1 / MPM 27 CONTINUITY**
Repository: `elevationupscales/ElevationUpScales`

## Read first

1. `MASTER-SOP.md`
2. `operations/CURRENT_WORK_BOARD.md`
3. `AGENTS.md`
4. `CODING-WORKFLOW.md`
5. task-specific files explicitly required by the owner

Do not use older handoff content, old PR descriptions, dated baselines, OS 2 records, or beta OS 3 work as current authority.

## Current control

- **OS 1 / Operating System = CURRENT / CONTROLLING.**
- **MPM 27 = current manager continuity inside OS 1.**
- MPM numbers are continuity/session labels, not separate authority layers.
- **OS 2 / Operating System 2.0 = NON-CONTROLLING legacy/transitional evidence.**
- **OS 3 / Agent Manager = BETA / DEVELOPMENT ONLY.**
- Casey's newest direct instruction is highest authority.
- `MASTER-SOP.md` is the repository control document.
- Current accepted `main` is technical state truth.

## Git baseline

Current `main` at the start of this alignment:

`7040bdc873739162cd163d4d741041f93f672ef0`

Latest accepted Git work at that baseline is PR #264:
`Mirror Shopify storefront repairs and smoke gate`.

Always re-resolve `main` before beginning new work. This SHA records the alignment starting point; it is not permission to roll back newer owner-approved work.

## Current accepted direction

The recent MPM 26 storefront work is inherited, not reopened as a redesign project.

Current accepted direction includes:
- store-first customer routing;
- SOK remains the primary lithium/battery brand;
- Olight remains the premium lighting/optics vendor lane;
- solar/off-grid remains a core commercial lane;
- accepted homepage/storefront visual direction is locked unless Casey explicitly reopens design;
- remaining storefront work is bounded defect repair, customer-path QA, and purchaseability verification.

Recent Git merges include:
- PR #256 — store-first homepage retail experience;
- PR #260/#261 — approved hero-copy lock and QA alignment;
- PR #262 — SOK heading contrast repair;
- PR #263 — external-send authorization hardening;
- PR #264 — Shopify storefront repair mirror + smoke gate.

## Shopify boundary

`shop.elevationupscales.com` and `store.elevationupscales.com` remain Shopify-owned runtime surfaces.

The Shopify repair theme mirrored by PR #264 was recorded as:
- `SMOKE P1 REPAIRS — READY TO REVIEW`
- **UNPUBLISHED at mirror time**

Therefore Git proves the staged/mirrored repair state, not publication to the live Shopify theme. Verify Shopify live state directly before claiming those staged repairs are live.

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

## Worker operating rule

**ONE TASK → ONE CURRENT-MAIN BRANCH → ONE OWNER-APPROVED OBJECTIVE → VERIFY → PR/MERGE → RECORD RESULT**

Before editing:
- resolve current `main`;
- restate the exact objective;
- identify which platform owns it;
- create a focused branch from current `main`.

Before merge:
- inspect changed files;
- confirm no scope expansion;
- run applicable QA;
- compare against current `main`.

Production deployment remains a separate owner gate under `MASTER-SOP.md`.

## Stop rule

If owner says STOP / HOLD / FREEZE / NO MORE EDITS:
- stop mutations;
- preserve branch;
- do not merge;
- do not deploy;
- report state only.

## Current handoff status

**OS 1 CONTROL ALIGNED / MPM 27 CONTINUITY ACTIVE**

This handoff alignment changes control documentation only.

It does **not** authorize:
- website redesign;
- Shopify publication;
- product changes;
- pricing changes;
- checkout changes;
- customer/order mutation;
- production deployment.
