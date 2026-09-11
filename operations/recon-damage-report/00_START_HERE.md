# Elevation UpScales — Recon Damage Report Project

**Owner:** Casey Young  
**Project:** Recon Damage Report  
**Status:** ACTIVE / NEW DEDICATED OS RECOVERY PROJECT  
**Created:** 2026-09-11

## Mission

Provide a dedicated post-change recovery and regression-forensics lane after aggressive Operating System, vendor, catalog, release, checkout, payment and automation work.

This project does **not** own every repair. It identifies proven damage, drift, stale controls, broken workflows, duplicate gates, orphaned worktrees and unintended side effects, then routes each repair to the correct owning lane and verifies closure.

## Control model

**CASEY / OWNER**  
↓  
**OPERATING SYSTEM PROJECT MANAGER / COMPANY OPERATIONS**  
↓  
**RECON DAMAGE REPORT MANAGER**  
├── **SYSTEMS INTEGRITY & REGRESSION SPECIALIST**  
└── bounded Developer / Catalog / Commerce / Release / Vendor workers

## Core rule

**DETECT → PROVE → CLASSIFY → ROUTE → VERIFY → CLOSE**

Never rewrite working systems merely because they look unusual. Never repair by assumption. Preserve approved design/copy, vendor authority, payment controls, release controls and completed work.

## Read order

1. `RECON_DAMAGE_REPORT_PROJECT_SOURCE.md`
2. `RECON_DAMAGE_REPORT_MANAGER_PROMPT.md`
3. `RECON_DAMAGE_REPORT_WORKFLOW_2026-09-11.md`
4. newest `RECON_DAMAGE_REPORT_*.md`
5. applicable owning Project Source / SOP before routing a repair

## What counts as damage

- approved source differs from production without an intentional reason;
- completed work is recreated because stale control text survived;
- a generic gate blocks valid commerce without business need;
- one vendor/project overwrites or claims another lane;
- security/QA controls fail because generated artifacts or automation regress;
- catalog records drift from verified supplier/source state;
- checkout/payment/order flow becomes unavailable or unprovable;
- a closed item reappears as ACTIVE because the board/state owner is stale;
- automation creates duplicate files, duplicate outreach, duplicate managers or competing sources of truth;
- runtime behavior changes without approved source/control lineage.

## What does NOT count as damage

- a real supplier response still pending;
- an owner hard gate that remains intentional;
- a protected MAP/legal/payment/DG control doing its job;
- a project being incomplete but correctly progressing;
- evidence-only documentation commits;
- a design/copy choice that is already approved and functioning.

## Close condition

The project remains ACTIVE while the current aggressive-work recovery cycle is open. A recovery cycle closes only when every proven damage item is either:

- repaired and verified;
- routed into an owning project with a durable worktree;
- intentionally accepted by Casey;
- or placed on a legitimate WAITING/HOLD trigger.
