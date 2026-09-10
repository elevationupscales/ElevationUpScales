# Elevation UpScales — Cross-GPT Communication, Priority & Approval SOP

**Status:** ACTIVE / CONTROLLING EXTENSION  
**Effective:** 2026-09-10  
**Owner:** Casey Young  
**Parent SOP:** `operations/MANAGEMENT_OPERATING_SOP.md`

## Purpose

Keep Casey / Company Operations and Peter / Ecommerce & Vendor Operations on one operating baseline while allowing Peter's AI team to work independently inside its assigned lane without gaining uncontrolled website-development or repository write authority.

This SOP does not replace the Shared Management Operating SOP. It standardizes the communication bridge between the two AI work environments.

## Shared baseline

Both sides use the same authority order:

1. Casey / Owner's newest explicit direction.
2. `operations/MANAGEMENT_OPERATING_SOP.md`.
3. Current controlling `/operations/` records for the assigned lane.
4. Verified live business/platform/vendor state.
5. Historical handoffs only when needed to resolve an actual gap.

Peter's team must not rebuild or fork company policy. Company Operations must not restart work Peter has already verified and returned cleanly.

## Communication loop

Use this loop for normal cross-GPT coordination:

**OWNER / COMPANY OPERATIONS BASELINE → PETER AI EXECUTION → PETER DELTA / SYNC RECEIPT → COMPANY OPERATIONS RECONCILE → UPDATED BASELINE → PETER CONTINUES**

Peter's AI team should report only what changed from the shared baseline. Company Operations should reconcile only the delta rather than asking Peter to repeat the entire lane.

### Standard Peter sync receipt

Return:

- `BASELINE USED:` controlling file / date / commit when known;
- `COMPLETED:` what changed;
- `CURRENT STATE:` READY / IN_PROGRESS / WAITING / BLOCKED / VERIFYING / COMPLETE / HOLD;
- `EVIDENCE:` source file, platform screen, vendor reply, order ID, or other non-secret reference;
- `PROPOSED SOP DELTA:` only if Peter's team learned something that should change its working SOP;
- `BLOCKER:` exact blocker, if any;
- `NEXT UNBLOCKED ACTION:` next action Peter's team can actually perform;
- `OWNER GATE:` only when a genuine owner decision or approval is required.

Do not send long historical recaps unless Company Operations specifically requests recovery.

## Peter SOP delta model

Peter's AI team may maintain and improve its own working SOP based on verified execution results, but those edits are **proposed/working deltas**, not authority over company website code or company-wide policy.

When Peter's team changes its own SOP:

1. preserve the shared Management SOP and this Cross-GPT SOP as the parent baseline;
2. record only lane-specific additions, clarifications, or lessons learned;
3. return the changed section or concise delta to Company Operations;
4. Company Operations reconciles any material company-wide rule into the controlling `/operations/` state when appropriate;
5. Peter continues from the updated shared baseline rather than creating a competing policy system.

## Website / development / Git approval boundary

Peter and Peter's AI workers are **READ / PROPOSE by default** for the Elevation website-development repository state.

Without an explicit approval issued from Casey's owner-side chat, Peter's AI team must not:

- modify website/runtime source files;
- modify checkout, auth, payment, shipping, deployment, Worker, Pages, bindings, or production behavior;
- create or merge website-development branches or pull requests;
- commit application/runtime changes to `main`;
- deploy or authorize production releases;
- treat public Git visibility as development-write authorization.

Peter's team may:

- read public-safe `/operations/` policy and current state;
- read public website/source information needed to understand its assigned work;
- prepare proposed changes, annotations, acceptance criteria, product/catalog data, screenshots, or patch instructions;
- update its own working SOP/project knowledge;
- return proposed website changes to Company Operations / OS PM / Developer Manager for reconciliation.

### Owner-side development approval gate

Website-editing Git authority exists only when Casey's owner-side chat explicitly states the approved scope.

A valid approval should identify, as applicable:

- exact feature/problem or file scope;
- whether Peter's team may only prepare a patch or may actually write code;
- allowed branch/repository path;
- test/preview requirement;
- production/deployment authority, if any.

Approval for one scope does not become standing development access.

## Priority synchronization

Peter's worktree must follow the same priority behavior as Company Operations.

### P0 — interrupt only for immediate operating risk

Examples:
- paid customer order requiring immediate fulfillment action;
- checkout/payment outage affecting revenue;
- time-sensitive security/access event;
- same-day customer/vendor deadline with material consequence.

P0 interrupts the current task only long enough to resolve or isolate the immediate risk.

### P1 — current owner-declared active priority

Current P1 supplier lane:

**VEVOR — direct-site dropship onboarding / account verification / direct supplier feed / first catalog set.**

Keep P1 moving while it has an executable next action.

### P2 — active unblocked revenue / activation work

Use for work that directly advances catalog readiness, supplier activation, fulfillment readiness, sales-channel health, or a live revenue path and is not superseded by P0/P1.

### P3 — routine support / enrichment

Examples include non-urgent cleanup, documentation enrichment, future research, and convenience improvements.

### WAITING / HOLD — move to the end

A task that cannot move because of an external reply, unavailable account access, missing document, future trigger, or other real dependency does **not** occupy the active top of Peter's queue.

Use:

**VERIFY BLOCKER → RECORD TRIGGER → MOVE TO WAITING/HOLD END → CONTINUE NEXT UNBLOCKED PRIORITY**

Return to a WAITING/HOLD item only when:

- the required reply/file/access arrives;
- a defined date/deadline is reached;
- a material state change occurs; or
- Casey / Company Operations explicitly promotes it.

Do not repeatedly re-check or re-email a waiting lane merely because it remains open.

## Current synchronized priority board

1. **P0 customer/order/security exceptions** — only when a live immediate exception exists.
2. **P1 VEVOR** — ACTIVE / IN_PROGRESS; verify VEVOR PRO state, tax/account state, direct supplier feed, then 20–40-product direct-site working set.
3. **P2 other active unblocked commerce/vendor execution** — continue only when it does not displace VEVOR.
4. **Renogy** — WAITING / APPLICATION UNDER REVIEW; parked until approval/decline/material request.
5. **Other vendor/logistics lanes in WAITING/HOLD** — end of queue until their trigger occurs.

Within each priority level, choose the highest-value **unblocked** action rather than the oldest open item.

## Scheduled Peter-side SOP synchronization task

Peter's AI team should create one recurring **flexible evening** task inside Peter's own AI/project environment named:

**Peter SOP Sync**

Task instruction:

> Review the newest owner-approved Company Operations baseline and the current Peter execution deltas. Update Peter's working Ecommerce & Vendor Operations SOP only with verified lane-specific changes. Preserve the Shared Management Operating SOP and Cross-GPT Communication SOP as parent controls. Move genuinely WAITING/HOLD items to the end of the worktree and continue the highest-priority unblocked action. Do not modify website/runtime Git or deployment state unless Casey's owner-side chat has explicitly approved that exact development scope. Return a concise sync receipt with COMPLETED / CURRENT STATE / SOP DELTA / BLOCKER / NEXT / OWNER GATE.

The task is a Peter-side project hygiene/sync task, not authorization for website development, vendor sends, financial commitments, or owner-level actions.

## Protected data

The repository is public. Never place credentials, customer PII, private vendor pricing, signed tax forms, banking records, owner identification, private freight rates, API keys, authentication artifacts, or other protected records into Git or cross-GPT handoffs.

## Operating result

**ONE BASELINE → TWO AI WORK ENVIRONMENTS → DELTA-BASED SYNC → PRIORITY BY UNBLOCKED VALUE → HOLD MOVES TO END → WEBSITE GIT REMAINS OWNER-GATED**
