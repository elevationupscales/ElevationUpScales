# Elevation UpScales — Shipping & Logistics Project

**Owner:** Casey Young  
**Parent Management:** Company Operations Manager  
**Status:** ACTIVE / PROJECT ESTABLISHED / V1.0-ALIGNED  
**Primary Worker State:** STANDBY  
**Effective:** 2026-09-11

**Controlling authority:** `MASTER_SOP_V1_0.md` + `MASTER_OS_GLOSSARY_V1_0.md`, then this Project's applicable subordinate standards and Worktree. The Project remains the established shared operating home for freight/logistics/storage partners.

## Project Purpose

Provide one shared Company Operations Project for current freight, carrier, forwarder, warehouse/storage, receiving, staging, consolidation, pickup-node and related shipping/logistics partner management.

Do not create a separate Project for each freight, storage or logistics partner at the current scale.

## Operating structure

**CASEY / OWNER**  
↓  
**MPM / COMPANY OPERATIONS MANAGEMENT**  
↓  
**SHIPPING & LOGISTICS PROJECT**  
↓  
**SHIPPING & LOGISTICS PARTNER WORKER**

One worker handles the partner lane for now. Company Operations may split the Worktree into additional workers later when volume, geography, specialization or risk justifies it.

## Scope

The Project may manage:

- freight carriers;
- freight forwarders;
- parcel/ground shipping options when managed as operating partners;
- lithium/DG shipping partners and route capability;
- warehouses and storage partners;
- receiving/staging/consolidation partners;
- pickup or local transfer nodes;
- related logistics service providers;
- partner lifecycle state from LEAD through PENDING PARTNER through PARTNER;
- quotes/rates capability status without publishing protected commercial terms;
- partner paperwork, applications, qualification, operational follow-through and current state.

Product-vendor commercial management remains in the applicable Vendor Project or vendor lead lane unless a bounded logistics handoff is assigned here.

## Relationship classification

Use `PARTNER_RELATIONSHIP_CLASSIFICATION_STANDARD_2026-09-11.md` beneath Master S.O.P. V1.0.

Canonical lifecycle:

**LEAD → PENDING PARTNER → PARTNER**

A Pending Partner must have a known close condition, next action and timestamp.

## Worktree model

This Project maintains one shared Shipping & Logistics Worktree covering all current partner records.

Each partner record should identify at minimum:

- partner name;
- partner type;
- relationship state;
- assigned worker;
- current task/state;
- completed steps;
- OPEN TASKS and reason;
- close condition;
- next action;
- latest meaningful timestamp;
- authoritative source/pointer;
- RECON NOTE when applicable.

## Command behavior

Use `MASTER_OS_GLOSSARY_V1_0.md` as controlling terminology and `OS_COMMAND_GLOSSARY_AND_SWEEP_STANDARD_2026-09-11.md` as the detailed subordinate implementation.

Examples:

- `SCOUT SHIPPING & LOGISTICS` — discover current partner/project state without changing it by default.
- `AUDIT SHIPPING & LOGISTICS` — test current records/processes against the standard and report findings.
- `SYNC SHIPPING & LOGISTICS` — reconcile objective Project state to verified reality.
- `RECON SHIPPING & LOGISTICS` — run targeted discovery + reconciliation.
- `SWEEP SHIPPING & LOGISTICS` — perform the full controlled pass across the Project Scope.

## RECON rule

Any specialist or RECON worker operating in this Project follows `PROJECT_RECON_WORKER_STANDARD_2026-09-11.md` and remains Project-contained unless given a bounded handoff.

If a correction cannot be made remotely, place a timestamped RECON NOTE in the affected partner/work item or Project Worktree and identify the worker/manager responsible for correction.

## Worker startup

Use `WORKER_STARTUP_REGISTRATION_PROTOCOL_2026-09-11.md` beneath the Master S.O.P./Glossary.

The Shipping & Logistics Partner Worker must orient/register before execution and must not create another Project or management hierarchy.

## Current state

**PROJECT:** ESTABLISHED  
**WORKER ROLE:** ESTABLISHED  
**WORKER EXECUTION STATE:** `STANDBY` unless an executable Shipping & Logistics Worktree is assigned/verified at RUN  
**NEXT TRIGGER:** `RUN`, assigned Worktree, or new authorized Company Operations directive.

If unfinished work exists but execution is stopped by an inaccessible dependency, unresolved external result, timeout/crash or exhausted safe retries, preserve it as `OPEN TASK` and set the worker `OPEN TASK / STANDBY` rather than ordinary STANDBY.

## Scale-up rule

Do not split the Project merely because multiple partners exist.

Company Operations may create additional workers/lane specialization when the shared Worktree becomes too large, time-sensitive, geographically complex or specialized to manage cleanly with one worker.

The Project remains the common Shipping & Logistics operating home unless Casey/MPM explicitly restructures it.

## Control phrase

**ONE SHIPPING & LOGISTICS PROJECT → ONE PARTNER WORKER FOR NOW → MANY PARTNER RECORDS → SPLIT WORKERS ONLY WHEN SCALE REQUIRES IT.**
