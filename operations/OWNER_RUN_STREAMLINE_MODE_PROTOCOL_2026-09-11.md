# Elevation UpScales — Owner RUN STREAMLINE MODE Protocol

**Status:** ACTIVE / OWNER-DIRECTED CONTROL MODE  
**Effective:** 2026-09-11  
**Owner:** Casey Young  
**Parent controls:** `MANAGEMENT_OPERATING_SOP.md`, `OWNER_RUN_COMMAND_EXECUTION_PROTOCOL_2026-09-10.md`, `CURRENT_WORK_BOARD.md`  
**Command:** `RUN STREAMLINE MODE`

## Purpose

`RUN STREAMLINE MODE` keeps the speed and continuity proven by the existing RUN system while returning consequential decisions to the Owner at deliberate checkpoints.

It is the preferred operating mode when the bulk setup/reconciliation work is already complete and management is moving from brute-force buildout into controlled daily execution.

**STREAMLINE = HIGH INTERNAL AUTONOMY + LOW APPROVAL FRICTION + OWNER CONTROL OF CONSEQUENTIAL ACTIONS.**

This is not a second work board, project hierarchy, or manager. It is an execution mode layered on the existing Operating System.

## Precedence

When Casey issues the exact command **RUN STREAMLINE MODE** or clearly invokes Streamline Mode, this protocol controls the level of execution authority for that work cycle.

The normal `RUN` protocol continues to govern ordinary RUN commands.

Where the normal RUN protocol would automatically carry a consequential action through completion, Streamline Mode may instead require one consolidated Owner checkpoint as defined below.

Newest explicit Casey direction always overrides this file.

## Core operating loop

**GIT FIRST → RECONCILE CURRENT STATE → BUILD TODAY'S EXECUTABLE QUEUE → EXECUTE GREEN WORK → GROUP AMBER DECISIONS → OWNER CHECKPOINT → EXECUTE APPROVED AMBER WORK → KEEP GREEN WORK MOVING → RECORD MATERIAL DELTAS → CLOSE / WAIT / HOLD → BRIEF OWNER**

Do not stop the whole worktree because one Amber or Red item is waiting.

## Three execution zones

### GREEN — execute without asking again

Managers/workers may execute Green work immediately inside their assigned lane.

Green includes:

- Git/source-of-truth reconciliation;
- reading supplier/platform/source records;
- dedupe checks before outbound action;
- internal analysis and economics modeling;
- internal SOP/workflow reconciliation;
- preparing packets, ZIPs, worksheets and evidence bundles;
- drafting supplier/customer messages without sending;
- catalog normalization and safe record-quality cleanup already within approved scope;
- staging products as drafts when publication is not implied;
- exact-SKU research and source verification;
- code inspection, repair, testing and branch work that does not itself publish/deploy production;
- QA, smoke preparation, preview work and evidence gathering;
- identifying media/spec/data gaps without inventing facts;
- documenting receipts and closing completed internal steps;
- moving blocked sub-items to the back while continuing independent work.

Green work should not generate approval chatter.

### AMBER — one consolidated Owner checkpoint

Amber actions are prepared fully, grouped together, and presented to Casey for **APPROVE / HOLD / ADJUST** before execution unless Casey has already explicitly approved that exact action in the current work cycle.

Amber includes:

- sending a new supplier/vendor outreach or substantive follow-up;
- submitting an external dealer/vendor/application form;
- publishing or activating a product/listing;
- changing customer-facing product status or availability;
- price/MAP changes or other consequential commercial presentation changes;
- storefront-password/settings changes;
- production deployment under Streamline Mode;
- customer-facing cancellation/refund/exception actions;
- customer communications involving a material commitment, refund, cancellation, delivery promise or dispute position;
- supplier/account/platform security-email or identity migration;
- material changes to shipping, warranty, return or fulfillment promises;
- creation of a new external relationship lane not already owner-approved;
- any action that is reversible but meaningfully changes an external party's state or the public/customer-facing business state.

Do not ask Casey item-by-item when several Amber actions can be grouped into one checkpoint.

### RED — always explicit Owner decision

Red actions require explicit Casey authorization at the point of decision even if earlier work was run under Streamline Mode.

Red includes:

- inventory purchases, reserve-stock buys or material spend;
- contracts, financing, credit, exclusivity or binding commercial commitments;
- warehouse minimums, recurring storage commitments or guaranteed SLAs;
- bank/payment-account/security-recovery changes;
- legal/compliance commitments or liability assumptions;
- material lithium/DG/freight liability decisions;
- destructive deletion or irreversible bulk operations;
- disclosure of protected/private commercial or credential information;
- any owner-only action identified in an existing supplier/project SOP.

## Owner checkpoint format

Use one compact queue, normally no more than five grouped decisions:

**OWNER CHECKPOINT**

1. **ACTION** — what will happen.
   **WHY NOW** — current trigger/value.
   **RISK / COMMITMENT** — what changes externally.
   **RECOMMENDATION** — approve / hold / adjust.

Casey may answer with:

- `APPROVE ALL`
- `APPROVE 1, 2, 4`
- `HOLD 3`
- `ADJUST 5: ...`
- or ordinary natural-language direction.

Once approved, do not ask again for the same bounded action unless the facts materially change.

## Daily owner-regulation pattern

### Start-of-day

OS Project Manager:

1. resolves current main;
2. reads the latest recon and canonical work board;
3. builds the day's small priority queue;
4. identifies Green / Amber / Red actions;
5. recommends the order to Casey.

If Casey says `RUN STREAMLINE MODE`, execute all Green work immediately and treat the approved daily plan as authority for the Amber actions Casey specifically approves.

### During execution

- finish Green work without interruption;
- when a newly discovered Amber action appears, add it to the next consolidated Owner checkpoint;
- do not stop unrelated Green work while waiting;
- Red items remain explicit owner gates;
- do not silently reprioritize owner-selected lanes; recommend changes when evidence justifies them.

### End-of-cycle brief

Return only:

**COMPLETED** — finished work.  
**OWNER-APPROVED ACTIONS EXECUTED** — consequential steps completed under approval.  
**WAITING / HELD** — real blockers only.  
**NEXT GREEN WORK** — what can continue automatically.  
**OWNER CHECKPOINT** — only unresolved Amber/Red decisions.  
**RECORDED** — source-of-truth updates/receipts.

## Production release behavior under Streamline Mode

Normal RUN may carry an already-approved routine repair through production under its direct-deployment rule.

`RUN STREAMLINE MODE` intentionally restores an Owner checkpoint before **production** unless Casey has already approved production for that exact release batch in the current cycle.

Allowed without a new checkpoint:

- inspect current source/live drift;
- run QA/security checks;
- prepare/review the candidate;
- execute preview/staging verification where safe and available;
- prepare exact release inputs.

Production deployment is Amber unless explicitly pre-approved in the daily Streamline plan.

After Casey approves that exact production release, execute through live verification without asking again.

## External communication behavior

Internal drafting and packet preparation are Green.

Sending/submitting externally is Amber unless:

- Casey has already approved that exact bounded send in the current Streamline cycle; or
- an existing owner directive explicitly classifies that recurring action as Green.

Supplier-requested follow-ups should be prepared fully before the checkpoint so Owner approval results in immediate execution rather than another planning loop.

## Dedupe / continuity

Before any external send or form submission:

**GIT CHECK → GMAIL/THREAD CHECK → CURRENT FORM/ATTEMPT CHECK → ONE CURRENT ACTION ONLY**

Silence is not a reason to resend.

A new Casey command interrupts the worktree; it does not erase prior open work.

## Worker and manager routing

Dedicated vendor/project managers stay inside their project unless OS Project Manager / Company Operations explicitly reroutes work.

OS Project Manager may coordinate across projects under the canonical board but may not convert an Owner checkpoint into self-approval.

Workers may prepare and execute Green work. Amber/Red approval belongs to Casey unless an existing current-cycle approval already covers the action.

## Efficiency rule

**ASK LESS OFTEN, BUT ASK AT THE RIGHT MOMENT.**

Streamline Mode is successful when:

- internal work keeps moving;
- Casey sees only consequential choices;
- approvals are grouped;
- no duplicated outreach occurs;
- owner gates remain real;
- waiting work does not stall independent work;
- source-of-truth state stays current.

## Control phrase

**PREPARE FAST → EXECUTE GREEN → GROUP CONSEQUENCES → OWNER DECIDES → EXECUTE ONCE → RECORD → CONTINUE**
