# Elevation UpScales — Master Worker Registry V1.0

**Version:** 1.0  
**Status:** CONTROLLING REGISTRY STANDARD / LIVE TABLE  
**GOD MODE Session:** ACTIVE / OWNER-AUTHORIZED 2026-09-11 / PM3 session only / expires automatically when authorized scope completes or this session ends

## Purpose

Maintain one lightweight index of who exists, where they belong, current worker state, active Worktree and last meaningful timestamp.

Detailed task state remains inside Project Worktrees.

A GOD MODE activation routes established workers into their verified existing Worktrees; it does not create new authority, duplicate Projects, restart completed tasks, or claim an external action succeeded without evidence.

## Mandatory fields

| Worker | Parent Project | Reporting Manager | Lane | Status | Current Worktree | Last Timestamp |
|---|---|---|---|---|---|---|
| MPM / Operating System Project Manager (PM3) | Operating System | Casey | Master Management | ACTIVE | GOD MODE master coordination / V1.0 transition + OS continuation | 2026-09-11 |
| Company Project Manager | Company Project Management | MPM | Project Coordination | ACTIVE | Cross-Project continuity / placement / handoffs | 2026-09-11 |
| Company Operations Manager | Company Operations | MPM | Operations | ACTIVE | Company Operations execution / vendor oversight / logistics / communication routing | 2026-09-11 |
| MASTER RECON OS | Operating System | MPM | OS Integrity / RECON | ACTIVE | MASTER RECON V1.0 first integrity SWEEP | 2026-09-11 |
| MASTER DEVELOPER / Deployment Developer | Operating System / Technical Lane | MPM / authorized management | Development / Deployment | OPEN TASK / STANDBY | Exact-SHA release + technical catalog/checkout residuals; execution requires available deployment lane and applicable production gate | 2026-09-11 |
| Peter Torres — Ecommerce & Vendor Operations Manager | Company Operations / Ecommerce & Vendor Operations | Company Operations Manager | Ecommerce / Vendor Operations | ACTIVE | VEVOR priority oversight + active approved-vendor commerce work; retired Google identity excluded | 2026-09-11 |
| SOK Project Operations Manager | SOK Supplier / Commerce / Hawaii Logistics / Warranty | Company Operations / MPM | Vendor Operations | ACTIVE | Lower-48 controlled commerce + Hawaii/warranty/logistics proving | 2026-09-11 |
| SOK RECON OS | SOK Supplier / Commerce / Hawaii Logistics / Warranty | SOK Project Operations Manager | Project RECON / Evidence | ACTIVE | SOK source/media/Hawaii economics and exact-state reconciliation | 2026-09-11 |
| VEVOR Project Operations Manager | VEVOR Supplier / Catalog / Shopify / Fulfillment | Company Operations / MPM | Vendor Operations | ACTIVE | Public storefront/first-order activation + catalog continuation | 2026-09-11 |
| VEVOR Reconciliation & Price-Control Specialist | VEVOR Supplier / Catalog / Shopify / Fulfillment | VEVOR Project Operations Manager | Project RECON / Price Control | ACTIVE | Current VEVOR price/source/catalog reconciliation and first-order controls | 2026-09-11 |
| Renogy Branch Operations Manager | Renogy Dealer / Catalog / Commerce Integration | Company Operations / MPM | Vendor Operations | ACTIVE | Sales-first catalog activation / exact-SKU commerce integration | 2026-09-11 |
| Renogy Project Specialist | Renogy Dealer / Catalog / Commerce Integration | Renogy Branch Operations Manager | Project Specialist / RECON | ACTIVE | Exact-SKU availability/warranty/source mapping + launch support | 2026-09-11 |
| Kingboss Project Operations Manager | Kingboss B2B Supplier Onboarding / Catalog / Commerce | Company Operations / MPM | Vendor Operations | OPEN TASK / STANDBY | Approved B2B onboarding; waiting supplier onboarding/package data | 2026-09-11 |
| Kingboss Project Specialist | Kingboss B2B Supplier Onboarding / Catalog / Commerce | Kingboss Project Operations Manager | Project Specialist / RECON | OPEN TASK / STANDBY | Preserve approved state; resume exact supplier-data intake when package arrives | 2026-09-11 |
| Shipping & Logistics Partner Worker | Shipping & Logistics Project | Company Operations Manager | Shipping / Logistics Partners | OPEN TASK / STANDBY | Shared Shipping & Logistics Worktree; waiting/external and technical-access dependencies preserved | 2026-09-11 |

## Canonical statuses

- `ACTIVE`
- `STANDBY`
- `OPEN TASK / STANDBY`
- `PLACEMENT REQUIRED`
- `CLOSED / RETIRED`

## GOD MODE activation rule

During an owner-authorized GOD MODE session:

1. `GIT FIRST` remains mandatory for Git-aware roles.
2. Existing Project Worktrees are resumed from last verified state; completed onboarding/setup is not recreated.
3. `ACTIVE` is used only where an executable verified Worktree exists within current authority.
4. External waits, inaccessible platform actions, unavailable deployment/browser lanes, and uncertain prior results remain `OPEN TASK / STANDBY` with their triggers preserved.
5. `ONE TASK = ONE PRIMARY ACTIVE WORKER` still applies inside each Worktree.
6. Protected owner/legal/payment/security/production gates remain gates unless Casey explicitly clears the exact gate.
7. GOD MODE does not survive session rollover/crash and must be re-authorized by Casey in a replacement session.

## Registration rule

New workers self-register after completing startup orientation. Self-registration does not enlarge authority.

## Automatic stop-state rule

A qualifying timeout, repeated safe-retry failure, crash, catastrophic stop or unresolved external result automatically changes the worker to `OPEN TASK / STANDBY` while the Project Worktree preserves:

**task → worker → timestamp → completed work → stop reason → last verified state → UNKNOWN actions → retries → resume requirement → next trigger/owner → owner action required yes/no**
