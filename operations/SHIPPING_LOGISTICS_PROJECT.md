# Elevation UpScales — Shipping & Logistics Project

**Owner:** Casey Young  
**Parent Management:** Company Operations Manager  
**Status:** ACTIVE / PROJECT ESTABLISHED / V1.0-ALIGNED  
**Primary Worker State:** ACTIVE  
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

## Current shared Worktree — 2026-09-11

The email catch-up RECON has produced executable logistics work. The Shipping & Logistics Partner Worker is therefore `ACTIVE`; ordinary external waiting on one partner does not stop independent partner work.

| Partner / Route | Type | Relationship State | Current State / Completed Step | OPEN TASK / Exact Close Condition | Next Action | Owner Gate |
|---|---|---|---|---|---|---|
| **DHX / DGX — Hawaii** | Freight / Logistics | **PENDING PARTNER** | Direct contact established; DHX requested one complete shipment-detail packet and will route it to operations/senior pricing. Routine acknowledgment sent. | Verified shipment-detail packet must be completed and returned; pricing/capability outcome remains pending. | Reconstruct/verify one factual packet from current SOK packaging/compliance/logistics evidence; dedupe prior sends; transmit only verified shipment facts. | Rate acceptance, booking, liability, payment or material volume commitment remains owner-gated. |
| **Logistics Plus — Hawaii storage / DG** | Freight / Logistics + Storage | **PENDING PARTNER** | SOK safety documents have been routed by Logistics Plus to dangerous-goods and operations teams for review. | DG/operations review and resulting pricing/capability response remain external wait. | Do not resend the safety packet. Continue other work and incorporate the next provider response when received. | Any rate/storage/freight-liability acceptance or booking remains owner-gated. |
| **H2O / Pasha backup route** | Freight / Logistics | **PENDING PARTNER** | H2O confirmed it will coordinate directly with Pasha under H2O's account; exact priority-SKU profiles remain the operating evidence requirement. | Exact verified model/profile recovery and route pricing/acceptance remain incomplete. | Recover existing exact supplier profile data through an authorized source path; send only exact model facts; never generalize one battery profile to another. | Rate acceptance, booking and liability remain owner-gated. |
| **Matson — Hawaii lithium route** | Freight / Logistics | **PENDING PARTNER** | Matson supplied its lithium-battery review/approval process and route-capability limitation information. Routine receipt acknowledgment sent. | Shipment profile must be compared to Matson's review requirements and any required review submission prepared. | Reconcile current SOK shipment profile against the supplied process; prepare but do not submit any signed/representational form without applicable approval. | Signed/representational submission, booking, rate or liability commitment remains protected. |
| **Span Alaska — Alaska lithium route** | Freight / Logistics | **PENDING PARTNER** | Updated shipment-weight guidance and additional quote evidence received; routine acknowledgment sent. | Route economics/capability need comparison; no quote accepted. | Compare the verified route/profile and protected economics in the private logistics lane; preserve public Git as status-only. | Rate acceptance, booking, insurance or shipment commitment remains owner-gated. |
| **Approved Freight Forwarders — Hawaii/terminal route** | Freight / Logistics | **PENDING PARTNER** | Terminal-to-terminal quote evidence received for a defined SOK battery profile; routine acknowledgment sent. | Compare capability/economics against current route requirements; no quote accepted. | Reconcile privately with exact battery profile and other route options; keep protected quote terms outside public Git. | Rate acceptance, booking, liability or payment commitment remains owner-gated. |

### Shared Worktree control

- `ONE TASK = ONE PRIMARY ACTIVE WORKER` applies to each active partner action.
- A provider waiting on external review remains an OPEN item, not a global stop-work gate.
- Protected quote/rate/economic details stay outside public Git.
- No worker may infer lithium/DG acceptance from ordinary freight capability.
- No worker may accept a quote, place a booking, commit volume, accept freight/storage liability, submit protected representations, or create a payment obligation without the applicable owner gate.
- Vendor-specific shipment facts remain controlled by the applicable Vendor Project; Shipping & Logistics receives bounded verified handoffs rather than taking over vendor management.

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

**PROJECT:** ESTABLISHED / ACTIVE  
**WORKER ROLE:** ESTABLISHED  
**WORKER EXECUTION STATE:** `ACTIVE` — current DHX packet reconciliation plus bounded provider-review/quote evidence Worktree  
**NEXT EXECUTABLE ACTION:** verify/reconstruct DHX shipment-detail packet while Logistics Plus remains on external review; continue independent Matson / Span Alaska / Approved Freight Forwarders evidence reconciliation without accepting protected terms.  
**NEXT WAIT TRIGGERS:** Logistics Plus DG/operations response; provider quote/capability responses; verified vendor shipment-profile inputs where currently incomplete.

If unfinished work exists but execution is stopped by an inaccessible dependency, unresolved external result, timeout/crash or exhausted safe retries, preserve it as `OPEN TASK` and set the worker `OPEN TASK / STANDBY` rather than ordinary STANDBY.

## Scale-up rule

Do not split the Project merely because multiple partners exist.

Company Operations may create additional workers/lane specialization when the shared Worktree becomes too large, time-sensitive, geographically complex or specialized to manage cleanly with one worker.

The Project remains the common Shipping & Logistics operating home unless Casey/MPM explicitly restructures it.

## Control phrase

**ONE SHIPPING & LOGISTICS PROJECT → ONE PARTNER WORKER FOR NOW → MANY PARTNER RECORDS → SPLIT WORKERS ONLY WHEN SCALE REQUIRES IT.**