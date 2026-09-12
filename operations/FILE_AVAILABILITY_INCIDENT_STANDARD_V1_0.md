# Elevation UpScales — File Availability Incident Standard V1.0

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Effective:** 2026-09-11  
**Status:** OWNER-DIRECTED OPERATING STANDARD / ACTIVE  
**Parent Authority:** `MASTER_SOP_V1_0.md`

## Purpose

Prevent missing, expired, inaccessible, corrupted, detached or otherwise unavailable source files from silently degrading the Operating System's evidence base.

A worker must never replace a required missing file with memory, assumption, an unrelated newer document or a guessed value merely to keep a task moving.

## Core rule

**FILE FAILURE IS AN OPERATING INCIDENT, NOT A PRIVATE WORKER PROBLEM.**

When a worker discovers that a required source file is missing, expired, inaccessible, unreadable, detached, corrupted, unavailable through the current connector, or otherwise cannot be relied upon:

**DETECT → PRESERVE TASK → REPORT MANAGEMENT → RECOVER SOURCE → VERIFY VERSION → RESUME AFFECTED TASK → RECORD RECEIPT**

The affected file blocks only the exact task that depends on it. Unrelated executable work continues.

## Worker responsibility

The discovering worker must immediately:

1. identify the exact required source, including filename/title, expected version/date and why it is needed when known;
2. record the affected task and last verified state in the Project Worktree;
3. classify the source problem using one of the incident states below;
4. notify the reporting manager / Company Operations through the normal management routing path;
5. avoid guessing or substituting unsupported facts;
6. continue unrelated safe work.

A worker may perform a lightweight recovery attempt inside already-authorized sources, but may not conceal the incident or endlessly retry.

## Incident states

Use one of:

- `FILE SOURCE DEGRADED` — source is known but current access is partial or unreliable.
- `FILE SOURCE UNAVAILABLE` — expected source cannot currently be opened/read/retrieved.
- `FILE VERSION UNCERTAIN` — a file exists, but the worker cannot prove it is the controlling version.
- `FILE RECOVERY IN PROGRESS` — RECON/Operations is actively locating/restoring the source.
- `FILE RECOVERED / VERIFIED` — exact or accepted source/version is restored and verified.
- `OWNER RE-UPLOAD REQUIRED` — all authorized recovery routes were exhausted and the owner must supply the missing source again.

`OWNER RE-UPLOAD REQUIRED` is a last-resort state, not the default response to a missing attachment.

## Recovery ownership

### MASTER RECON OS

Owns source-state reconciliation when the problem affects OS truth, historical evidence, cross-Project continuity, version identity or source-of-truth conflicts.

MASTER RECON must determine:

- what exact file/source was expected;
- whether another valid copy already exists;
- whether Git, a Project source, Project file surface, Library, Gmail/Drive/other connected app, vendor correspondence or another authoritative source contains the same evidence;
- whether the recovered copy is the correct version;
- what downstream records may have been affected by the missing source.

### Company Operations Manager

Owns operational source recovery when the missing file is needed for active fulfillment, vendor operations, customer orders, logistics, compliance packets, warranty, platform operations or another operating worktree.

Operations may route an assigned specialist/worker to retrieve the source from the correct authorized system.

### Project Manager / Vendor Manager

Owns in-project continuity and must preserve the task, exact missing input, current workaround limits and next recovery trigger.

### Owner / Casey

Casey is asked to re-upload/re-supply only after reasonable authorized recovery has failed or when the source exists only in an owner-controlled location that workers cannot access.

## Authorized recovery sequence

Use the shortest valid route for the source:

1. **Current Project / current conversation file surface** — search existing Project-backed files before declaring the upload lost.
2. **Known Project/Git source** — check whether the source, extracted facts, checksum, packet, handoff or accepted derivative is already preserved in Git.
3. **Connected system of origin** — Gmail attachment, Google Drive file, vendor portal, Shopify export, eBay/Doba source, or other authorized connector when the file originated there.
4. **Permitted persistent Library / earlier saved-file surface** when the requested source belongs there and current Project access rules permit it.
5. **Accepted derivative or source-equivalent evidence** only if RECON verifies it preserves the required fact/version and the task does not specifically require original bytes.
6. **Owner re-upload** only after the above routes fail or access is genuinely owner-only.

Do not use public web search as a substitute for a private company file unless the task explicitly permits an external public source and RECON confirms it is equivalent for that fact.

## Original-bytes rule

Some tasks require the actual original file, not merely extracted facts. Examples include:

- signed agreements/forms;
- SDS/MSDS/UN38.3 or other compliance packets required for external tender;
- source spreadsheets needed for exact packed dimensions/weights;
- images/media requiring original resolution or license/source proof;
- legal/tax/account documents;
- deployment packages/checksums;
- files that must be attached or forwarded externally.

For these tasks, an extracted summary, memory, screenshot, Git note or prior quoted value does not close the incident unless the receiving Project's rules explicitly allow it.

## Version-control rule

When multiple copies exist:

**IDENTIFY REQUESTED VERSION → COMPARE TITLE/DATE/SHA/CHECKSUM/SOURCE → ACCEPT CONTROLLING COPY → RECORD WHY → REJECT STALE/UNVERIFIED COPIES**

A current file with a similar name does not automatically replace an older requested source.

## Management notification payload

The worker's management notice must contain:

**FILE AVAILABILITY INCIDENT → PROJECT → AFFECTED TASK → EXPECTED FILE/SOURCE → EXPECTED VERSION/DATE IF KNOWN → FAILURE MODE → LAST VERIFIED FACTS → RECOVERY ATTEMPTS → OWNER ACTION REQUIRED YES/NO → NEXT RECOVERY OWNER → UNRELATED WORK CONTINUES YES/NO → TIMESTAMP**

Do not send management a vague note such as “files expired.” Name the affected source/task whenever the platform makes that information available.

## Worktree behavior

When a required file becomes unavailable:

- preserve the dependent item as `OPEN TASK — FILE SOURCE...`;
- do not close the task;
- do not mark the entire Project blocked unless the file truly blocks all executable work;
- continue other clean Project tasks;
- update the item to `FILE RECOVERED / VERIFIED` after recovery;
- record the recovery source/version/receipt.

## Proactive durability rule

When a file is materially important to future operations, the owning Project should preserve a durable reference before the source becomes ephemeral. Depending on the file and privacy classification, this may include:

- accepted public-safe facts in the Project Source;
- exact filename/version/date/checksum in Git;
- protected original retained in the authorized private system of record;
- durable Project/Library/Drive copy where permitted;
- attachment/message ID or connector identity needed for later retrieval;
- a manifest showing which source files are required for continuation.

Do not put protected credentials, private commercial pricing, tax identifiers, private customer data or restricted documents into public Git merely to satisfy durability.

## Current incident application — 2026-09-11

A platform warning reported that some prior uploaded-file backing sources may have expired. Operations checked the current Project file surface rather than immediately requesting re-upload.

Verified currently available Project sources include:

- `ELEVATION_OS_PM3_V1_0_TAKEOVER_2026-09-11(1).zip`;
- `RENOGY Marketing Toolkit main.pdf`;
- `Item List (with UPC Code).xlsx`;
- current extracted/rendered Renogy working assets.

Therefore the present state is:

**PROJECT FILE SURFACE: PARTIALLY VERIFIED AVAILABLE / NO BLANKET LOSS PROVEN.**

Any future task that hits a specific unavailable historical source must create a bounded File Availability Incident and run the recovery sequence above before asking Casey to upload it again.

## Control phrase

**DON'T LOSE THE SOURCE → DON'T GUESS THE SOURCE → REPORT THE INCIDENT → RECOVER FROM AUTHORIZED SYSTEMS → VERIFY THE VERSION → RESUME THE TASK.**
