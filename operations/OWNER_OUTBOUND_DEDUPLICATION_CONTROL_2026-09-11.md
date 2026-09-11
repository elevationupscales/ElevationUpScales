# Elevation UpScales — Owner Outbound Deduplication Control

**Status:** ACTIVE / OWNER DIRECTIVE
**Effective:** 2026-09-11
**Owner:** Casey Young
**Applies To:** all managers, specialists, workers, GPTs, Gmail actions, supplier/application forms, dealer forms, reseller forms, account forms, contact forms, follow-ups and other outbound submissions

## Owner direction

Do **not** double-send emails, forms, applications, dealer requests, reseller requests, account requests, support requests, quote requests or other outbound submissions.

A second send/resubmission is prohibited unless the need for resubmission has been **verified** from current evidence.

## Required pre-send dedupe check

Before every outbound send or form submission:

1. **GIT FIRST** — check current supplier/project state and current source-of-truth records.
2. Search the active Gmail account for the supplier/company/domain, subject, existing thread, sent message, draft, confirmation, acknowledgement or bounce.
3. Check the applicable supplier/project map for `CONTACTED / WAITING`, `ACKNOWLEDGED / CASE OPEN`, `APPLICATION SUBMITTED`, `DRAFT ONLY`, or other evidence that the action already exists.
4. If a current browser/form workflow is already running, do not start a second one.
5. If prior submission state cannot be proven either way, classify `DEDUPLICATION HOLD` and move to the next executable worktree rather than guessing.

## Resubmission allowed only when verified

A resend/resubmission may occur only when current evidence proves one of the following:

- supplier/platform explicitly requests resubmission;
- prior submission failed or bounced;
- prior submission was rejected as incomplete/invalid and a corrected submission is required;
- prior submission expired or was closed and a new submission is explicitly required;
- owner Casey explicitly directs a verified resend after reviewing current evidence.

Record the reason before resubmitting.

## Existing relationship/thread rule

When correspondence already exists:

**USE EXISTING THREAD / CASE / APPLICATION PATH — DO NOT CREATE A SECOND COLD INTRODUCTION.**

## Running form rule

If another GPT/worker/browser automation has an active form submission in progress, that active run is the only current submission attempt. Other workers must not start the same form.

## Blockage behavior

A deduplication uncertainty is not a company-wide blocker.

Use:

**RECORD DEDUPLICATION HOLD → MOVE ITEM TO END OF ITS WORKFLOW → CONTINUE NEXT EXECUTABLE WORKTREE → RECHECK LATER**

## Control phrase

**VERIFY BEFORE SEND — ONE THREAD / ONE FORM / ONE CURRENT ATTEMPT — RESUBMIT ONLY WITH VERIFIED REASON.**
