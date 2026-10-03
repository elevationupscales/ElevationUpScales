# MASTER S.O.P. — OS 1 CONTROL / MPM 28 CONTINUITY

Original relock effective: 2026-09-26  
Current control alignment: 2026-10-02
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

## 3. OS 1 control baseline and continuity

**Current operating control:** OS 1 / Operating System.  
**Current manager continuity:** MPM 28.  
**MPM numbers are continuity/session labels, not separate authority layers.**

Project boundaries:
- **OS 1 / Operating System:** ACTIVE / CONTROLLING MANAGEMENT SYSTEM.
- **MPM 28:** current management continuity inside OS 1.
- **Operating System 2.0 / OS 2:** RETIRED. Do not route new work through it.
- **OS 3 / Agent Manager:** ACTIVE API EXECUTION / CONTROL SYSTEM used alongside MPM 28 for bounded API execution, acceptance, verification, and audited workflows. OS 3 does not replace OS 1 management authority and may not infer broader business, production, payment, communication, or deployment authority from API capability.

Current OS 3 accepted baseline is maintained in the separate repository `elevationupscales/elevationupscales-elevation-agent-manager`. At this alignment the accepted OS 3 main baseline is `1e6970dd1fb59b82ae7e5adbf92b58c681794969`. Workers must re-resolve that repository before relying on a newer OS 3 state.

The MPM 25 relock remains a valid historical control checkpoint and its anti-drift rules remain inherited where not superseded by newer owner direction.

## 3A. Waiting-external queue rule

A blocked lane waiting on an external party is not a global blocker.

```
BLOCKED LANE
↓
WAITING EXTERNAL
↓
REMOVE FROM ACTIVE WORK QUEUE
↓
CONTINUE OTHER INDEPENDENT WORK
```

A WAITING EXTERNAL lane returns to active work only when:
- a new external reply arrives;
- materially new evidence is obtained; or
- Casey explicitly reactivates it.

Current application at this control transition:
- **PayPal:** WAITING EXTERNAL. No repeated recon, escalation, or global blocking without new evidence.
- **Signature Solar EG4 freight package:** WAITING EXTERNAL.
- Work that specifically requires PayPal restoration remains HOLD, while independent fulfillment, commerce, OS 3, Shopify/CJ, Google Merchant, Hawaii, and Olight work continues.

Control baseline at initial MPM25 relock:

`f8b55f928f28b8f3087980576158bab286dc022d`

Git drift recovery checkpoint established 2026-09-27:

`30a161feef32bacccea1f0f043ea1bc0cf03d528`

That recovery checkpoint added `operations/GIT_DRIFT_RECOVERY_2026-09-27.md`. Current `main` may advance after this checkpoint; workers must always re-resolve current `main` before work.

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

As of the 2026-09-27 Git drift recovery, the following stale/diverged PRs are CLOSED / QUARANTINED:

- PR #242 — SEO preview-domain indexing work.
- PR #244 — Property Opportunity Engine Phase 1.
- PR #245 — SEO preview refresh on current site baseline.

CLOSED / QUARANTINED means:
- preserve the branch for evidence only;
- do not deploy it;
- do not merge it;
- do not use it as a base for new work;
- if the objective is reauthorized, create a fresh branch from current `main` and port only the still-approved scoped changes.

See `operations/GIT_DRIFT_RECOVERY_2026-09-27.md` for the current recovery rule.

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
5. if the branch is behind or carries unrelated history, quarantine it instead of resuming it;
6. create a fresh focused branch from current `main`;
7. port only the still-authorized in-scope changes;
8. resume only under this SOP.

Do not repair drift by wholesale-merging a stale branch back into `main`.

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

## 15. External communication approval and signature authority

All external communication must follow:

**DRAFT / PREPARE → SHOW CASEY → CASEY EXPLICITLY APPROVES THE SPECIFIC SEND → SEND ONCE → VERIFY SENT.**

Rules:
- Do not send any external communication without Casey's explicit approval of that specific send.
- This applies to email, vendor/partner messages, customer messages, freight/logistics communications, marketplace messages, platform support messages, social direct messages, and any other outbound company communication.
- Internal workflow authorization is not external-send authorization.
- Commands such as RUN, DO IT, EXECUTE, CONTINUE, FINISH THE WORKFLOW, GO, PROCEED, or equivalent authorize only the internal workflow unless Casey separately and explicitly authorizes the external send.
- Drafting, researching, reconciling, preparing, or completing a workflow does not authorize transmission.
- Valid send approval must be message-specific and unmistakable, such as SEND, CLEAR TO SEND, SEND THIS, or equally explicit wording referring to the exact prepared communication.
- If approval is ambiguous, stop at the send gate and ask for approval; do not infer permission from urgency, workflow context, or connected-account access.
- Drafting permission is not sending permission.
- A prior approval for another communication, thread, recipient, vendor, customer, or send class does not authorize a new send unless Casey explicitly says so.
- If any external communication is transmitted without Casey's explicit approval, it must **not** be signed as Casey Young.
- An unapproved-send exception must not use Casey's personal signature, title, phone number, personal closing, or wording that implies Casey personally authored or approved the message.
- Do not represent an unapproved communication as owner-approved after the fact.
- Do not send a correction, apology, follow-up, or retraction for an unauthorized send unless Casey separately approves that exact remediation send.
- If send state is uncertain, verify before retrying; never duplicate-send because of uncertainty.

Control phrases:

**WORKFLOW AUTHORIZATION ≠ SEND AUTHORIZATION.**

**NO CASEY APPROVAL → NO SEND. NO APPROVAL → NO CASEY SIGNATURE OR PERSONAL AUTHORITY IMPLIED.**

---

## 16. Closeout format

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

## 16. Current MPM 28 state

Current management state:
- **OS 1 / MPM 28 = ACTIVE management control.**
- **OS 2 = RETIRED.**
- **OS 3 = ACTIVE bounded API execution/control system alongside MPM 28.**
- **PayPal = WAITING EXTERNAL; not a global blocker.**
- initial MPM25 control baseline: `f8b55f928f28b8f3087980576158bab286dc022d`
- Git drift recovery checkpoint: `30a161feef32bacccea1f0f043ea1bc0cf03d528`
- PRs #242, #244 and #245 are CLOSED / QUARANTINED.
- Git website and Shopify storefront remain separate deployment systems.
- Existing historical `work/*` branches are evidence, not authority, unless explicitly reauthorized and rebuilt/reconciled from current `main`.
- This SOP changes control/worker behavior only. It does not authorize a website redesign, product edit, Shopify edit, merge, or production deployment.
