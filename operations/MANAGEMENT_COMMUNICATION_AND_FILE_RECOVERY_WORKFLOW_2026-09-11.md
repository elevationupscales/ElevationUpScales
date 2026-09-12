# Elevation UpScales — Management Communication & File Recovery Workflow

**Owner:** Casey Young  
**Effective:** 2026-09-11  
**Status:** ACTIVE / STREAMLINE CONTROL  
**Authority:** `MASTER_SOP_V1_0.md`; `GMAIL_EMAIL_NETWORK_SOP_V1_0.md`; `FILE_AVAILABILITY_INCIDENT_STANDARD_2026-09-11.md`

## 1. Management communication surface

Internal management control is Git/Worktree based.

**CASEY DIRECTION → MASTER MANAGEMENT / WORKBOARD → PROJECT SOURCE / CURRENT_WORKTREE → WORKER EXECUTION → RECEIPT → MANAGEMENT RECONCILIATION**

Do not use Gmail drafts, internal emails, or old management-feed messages as current manager-to-manager control.

Historical internal emails may be used only as factual evidence when needed.

## 2. Gmail's current role

The active company Gmail remains authorized for:

- external vendor/partner/customer/logistics correspondence;
- thread history and send/receipt verification;
- original attachments and source-file recovery;
- invoices, quotes, price sheets, catalogs and forms;
- SDS/MSDS, UN38.3 and other compliance documents;
- warranty/returns/RMA evidence;
- customer/order/shipping evidence;
- supplier media/toolkit files;
- factual historical evidence.

Gmail is not the durable management source of truth.

`elevationlithium@gmail.com` remains retired / DO NOT USE.

## 3. File availability incident trigger

Trigger this workflow when a worker reports that a required file is:

- expired from a chat/session;
- missing from current attachments;
- inaccessible through the expected connector;
- wrong version;
- unreadable/corrupt;
- referenced in Git/Worktree but not retrievable;
- available only through an old email/thread;
- uncertain as to source/version.

## 4. Mandatory incident handoff

Worker records:

**FILE INCIDENT → FILE NAME / DESCRIPTION → EXPECTED SOURCE → TASK AFFECTED → WHY REQUIRED → LAST KNOWN VERSION/DATE → CURRENT RECOVERY ATTEMPTS → WORK BLOCKED YES/NO → ROUTE TO MANAGER**

The worker does not silently replace the source.

## 5. Recovery owner

### Project-contained source issue
Project Manager / Project RECON owns recovery coordination.

### Cross-Project, unknown-source, version-conflict or repeated source-loss issue
MASTER RECON OS owns truth/source reconciliation.

### Operational file needed for a live order, customer, shipping or vendor action
Company Operations coordinates the recovery timeline and keeps unrelated work moving.

## 6. Recovery order

Use the shortest valid path and stop when the exact required source/version is recovered:

1. **Current Project / conversation file surface**
2. **Git repository / accepted source packet / Project Source references**
3. **Active company Gmail attachment/thread**
4. **Google Drive / connected company storage where exact identity is known**
5. **Authorized supplier/vendor portal or platform record**
6. **Other authorized company connector/source**
7. **Owner re-upload/request** only when recovery from existing company sources genuinely fails

Do not ask Casey to upload a file again before the available recovery paths have been tried when the Operating System can recover it itself.

## 7. Version verification

Before restoring a recovered source, verify as applicable:

- exact filename/document identity;
- sender/origin;
- date/version;
- SKU/model/project relationship;
- whether the file supersedes or is superseded by another source;
- whether the file contains protected/private information;
- whether it is safe for public Git.

Do not put private supplier costs, credentials, tax IDs, signatures, bank/card data, private addresses or protected correspondence into public Git.

Public Git should record the existence/status/source path without exposing protected content.

## 8. Recovery result states

- `RECOVERED / VERIFIED` — exact source restored and usable.
- `RECOVERED / VERSION HOLD` — file found but version/authority conflict unresolved.
- `SOURCE EXISTS / ACCESS BLOCKED` — source known but connector/login/tool access unavailable.
- `SOURCE NOT RECOVERED` — all authorized routes checked without success.
- `OWNER RE-UPLOAD REQUIRED` — exact source cannot be recovered internally and Casey's bytes are actually required.

## 9. Workflow continuation rule

A missing source blocks only the task that depends on it.

**PRESERVE FILE INCIDENT → HOLD AFFECTED TASK → CONTINUE UNRELATED CLEAN WORK → RESUME IMMEDIATELY WHEN SOURCE IS RECOVERED.**

## 10. Durable-storage improvement

When a recovered file is business-critical and permitted to be retained:

- keep the authoritative original in its approved private company source;
- record the source/version pointer in the applicable Project Source/Worktree;
- preserve a safe public metadata receipt in Git when useful;
- avoid relying on one ephemeral chat attachment as the sole company copy.

## Control phrase

**GIT MANAGES THE COMPANY → GMAIL HOLDS COMMUNICATION/EVIDENCE → RECON RECOVERS SOURCE TRUTH → OPERATIONS KEEPS WORK MOVING → OWNER RE-UPLOAD IS LAST RESORT.**