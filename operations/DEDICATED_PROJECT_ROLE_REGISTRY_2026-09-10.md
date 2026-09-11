# Elevation UpScales — Dedicated Project Role Registry

**Owner:** Casey Young  
**Effective:** 2026-09-10  
**Status:** ACTIVE / PROJECT-ROLE ROUTING  
**Parent Standard:** `PROJECT_LANE_MANAGER_SPECIALIST_STANDARD_2026-09-10.md`

## Purpose

Record the current manager/specialist pair, Project Source and tailored workflow for each established dedicated project so workers have one clear project lane and do not interpret company SOPs or the global work board as a broadcast assignment list.

This registry defines project-role routing only. `CURRENT_WORK_BOARD.md` remains the global unresolved-work state, vendor Project Sources remain the public-safe onboarding/readiness indexes for vendor lanes, and each project's Project Source/master SOP/current state remains the project rule source.

### Role-label reconciliation rule

For **project role assignment only**, this registry and the newer owner directive `OWNER_PROJECT_WORKFLOW_DIRECTIVE_2026-09-10.md` supersede older manager/worker labels in supplier/project SOPs that predate this architecture. The underlying supplier facts, commercial controls, safety gates and project procedures in those SOPs remain controlling unless separately changed by verified evidence or Casey.

This prevents an older label such as `Project Worker`, `functional manager`, or a generic vendor-manager owner from creating a second project-management chain. It does not delete useful specialist functions; those functions are routed under the project pair below.

## Current dedicated projects

| Project | Project Operations Manager | Project Specialist | Project Source | Oversight / Parent Routing | Tailored Workflow | Current Project State |
|---|---|---|---|---|---|---|
| Renogy | **Renogy Branch Operations Manager** | **Renogy Project Specialist** — source/MAP/catalog/media/fulfillment verification & reconciliation | [`vendor-project-sources/RENOGY_PROJECT_SOURCE.md`](./vendor-project-sources/RENOGY_PROJECT_SOURCE.md) | Peter Torres → Company Operations → OS Project Manager | `RENOGY_TAILORED_PROJECT_WORKFLOW_2026-09-10.md` | APPROVED DEALER / PORTAL ACTIVE / DATA & COMMERCE INTEGRATION IN PROGRESS |
| VEVOR | **VEVOR Project Operations Manager** — consolidated existing VEVOR project-management function, not an added competing top-level manager | **VEVOR Reconciliation & Price-Control Specialist** | [`vendor-project-sources/VEVOR_PROJECT_SOURCE.md`](./vendor-project-sources/VEVOR_PROJECT_SOURCE.md) | Peter Torres → Company Operations → OS Project Manager | `VEVOR_TAILORED_PROJECT_WORKFLOW_2026-09-10.md` | DIRECT-SITE CATALOG LIVE / PUBLIC ACCEPTANCE + FIRST-ORDER PROOF OPEN |
| SOK | **SOK Project Operations Manager** | **SOK RECON OS** — supplier/warranty/logistics/economics reconciliation specialist | [`vendor-project-sources/SOK_PROJECT_SOURCE.md`](./vendor-project-sources/SOK_PROJECT_SOURCE.md) | Company Operations + OS Project Manager | `SOK_TAILORED_PROJECT_WORKFLOW_2026-09-10.md` | ACTIVE PRIMARY AUTHORIZED BATTERY SUPPLIER / COMMERCE + HAWAII WARRANTY-LOGISTICS DEVELOPMENT |
| Kingboss | **Kingboss Project Operations Manager** | **Kingboss Project Specialist** — source/compliance/product/commercial verification | [`vendor-project-sources/KINGBOSS_PROJECT_SOURCE.md`](./vendor-project-sources/KINGBOSS_PROJECT_SOURCE.md) | Ecommerce & Vendor Operations → Company Operations → OS Project Manager | `KINGBOSS_TAILORED_PROJECT_WORKFLOW_2026-09-10.md` | B2B APPROVED / ONBOARDING PACKAGE-DATA WAITING |
| Recon Damage Report | **Recon Damage Report Manager** | **Systems Integrity & Regression Specialist** — evidence, regression forensics, stale-control reconciliation and closure verification | [`recon-damage-report/RECON_DAMAGE_REPORT_PROJECT_SOURCE.md`](./recon-damage-report/RECON_DAMAGE_REPORT_PROJECT_SOURCE.md) | Company Operations → OS Project Manager → Casey / Owner | `recon-damage-report/RECON_DAMAGE_REPORT_WORKFLOW_2026-09-11.md` | ACTIVE / INITIAL BASELINE ESTABLISHED / FIRST RECOVERY PASS OPEN |

## Project Source requirement

Every dedicated vendor project must maintain the linked Project Source required by `VENDOR_PROJECT_SOURCE_STANDARD_2026-09-10.md`. Non-vendor dedicated projects maintain an equivalent project-specific source/current-state file appropriate to their lane.

The Project Source supplies the public-safe/current-state index needed by the Project Operations Manager and Project Specialist. Vendor sources include reusable Elevation onboarding data, protected-document availability, supplier account/source/MAP/channel/inventory/fulfillment/warranty/compliance readiness, missing inputs, first-order proof and maturity state. Non-vendor projects use the same continuity principle for their own evidence/state.

A prospect in `SUPPLIER_LEADS_LIVE_MAP.md` does not require a Project Source until a dedicated project/manager is established.

## Project Operations Manager authority

Within the assigned project, the Project Operations Manager may directly execute routine, safe, already-authorized work instead of creating unnecessary worker handoffs.

The manager still owns:

- the project worktree;
- routing;
- current state;
- Project Source maintenance for material readiness/state changes;
- receipts;
- next action;
- close condition.

Direct execution does not authorize the manager to cross projects, bypass the specialist when dedicated verification is materially required, or make owner-level commitments.

## Specialist role

The dedicated Project Specialist provides the project's independent depth: verification, reconciliation, source inspection, research, exact-fact recovery, exception analysis and execution-ready findings.

The Specialist does not become a second Project Manager.

## Shared workers

A shared Catalog, Developer, Fulfillment, Logistics, Communications, Compliance, Research or other worker may enter a dedicated project only through a bounded handoff that identifies task, allowed actions, prohibited actions, close condition and return-to lane.

## Worktree continuity

Managers and specialists use the linked Project Source + tailored workflow + current work-board row to pick up interrupted work from the last durable verified state. Worker/chat loss, priority change, external waiting or a new owner instruction does not silently close the previous worktree.

## Control

**ONE DEDICATED PROJECT → ONE OPERATIONS MANAGER → ONE SPECIALIST → ONE PROJECT SOURCE → ONE TAILORED WORKFLOW → ASSIGNED WORKERS → BOUNDED SHARED HANDOFFS → ONE CURRENT PROJECT STATE**

Out-of-project work is returned upward as `ROUTE REQUIRED`.
