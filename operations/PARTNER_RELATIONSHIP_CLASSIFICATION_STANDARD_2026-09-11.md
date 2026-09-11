# Elevation UpScales — Partner Relationship Classification Standard

**Owner:** Casey Young  
**Effective:** 2026-09-11  
**Status:** ACTIVE / V1.0-ALIGNED SUBORDINATE STANDARD

**Controlling authority:** `MASTER_SOP_V1_0.md` + `MASTER_OS_GLOSSARY_V1_0.md`. This standard remains the detailed partner-classification implementation beneath those controls. If any conflict appears, Master S.O.P. V1.0 controls and this file is SYNCed forward.

## Purpose

Give Company Operations one standard way to distinguish prospects from relationships that are being finalized and relationships that are already established.

This standard applies across vendor/supplier, freight/logistics, storage/warehouse, sales/channel/referral, and other approved partner lanes.

## Canonical lifecycle

**LEAD → PENDING PARTNER → PARTNER**

A relationship may also move backward to **LEAD / HOLD** or close as **NOT PURSUING** when facts change.

## LEAD

**Short Definition:** A possible relationship that has not yet reached a defined finalization process.

**OS Function:** Keeps research, outreach, qualification, and early follow-up visible without incorrectly representing the relationship as approved or operational.

Typical Lead states include researched prospect, outreach sent, waiting on first meaningful response, or qualification still uncertain.

## PENDING PARTNER

**Short Definition:** A Lead that has advanced into a defined closing/finalization process but is not yet fully approved or activated.

**OS Function:** Protects near-complete relationships from being treated like cold leads while keeping the exact remaining close condition visible to Company Operations, RECON, and the responsible worker.

A Pending Partner may include:

- vendor/dealer approval being finalized;
- quote/rate being finalized;
- application under review;
- paperwork/forms being completed;
- account setup pending;
- carrier/freight qualification nearing completion;
- warehouse/storage agreement being finalized;
- sales/channel/referral terms being finalized;
- required documents awaiting final exchange;
- final commercial or operating confirmation pending.

**Qualification test:** There is a defined relationship being finalized and a known close condition.

Simply sending outreach does not create Pending Partner status.

### Required Pending Partner control fields

- partner type;
- current state;
- assigned manager/lane;
- completed steps;
- remaining OPEN TASKS;
- exact close condition;
- next action;
- last meaningful timestamp;
- existing thread/application/case reference when applicable.

### Pending Partner operating rules

- Continue the established application, quote, case, form, or correspondence path.
- Do not restart cold outreach.
- Do not duplicate applications/forms/submissions without a verified reason.
- Keep the close condition visible.
- Block only the missing requirement; safe parallel preparation may continue.
- Do not represent approval, authorization, rates, channel rights, or service capability as final until verified.

## PARTNER

**Short Definition:** An established/approved operating relationship with a defined way of doing business together.

**OS Function:** Moves the relationship from prospect management into durable operating management, using the correct project/lane, partner profile, source records, Worktree, and ongoing controls.

## Partner Types

Use the applicable type without creating a separate operating system:

- **Vendor / Supplier Partner** — products, catalog, warranty, purchasing and fulfillment.
- **Freight / Logistics Partner** — carrier, forwarder, DG/lithium route, freight and transport capability.
- **Storage / Warehouse Partner** — receiving, staging, storage, consolidation, pickup or local node capability.
- **Sales / Channel Partner** — referral, reseller, retail/channel, commercial-sales or introduced-account relationship.
- **Other Approved Partner Type** — only when an existing type genuinely does not fit.

## Project rule

Approved product vendors may receive dedicated vendor projects under the Vendor Project standards.

Freight/logistics, storage, and related shipping partners do **not** automatically receive individual projects. They are managed through the shared **Shipping & Logistics Project** under Company Operations unless scale/complexity later justifies a split.

## Control phrase

**LEAD = MAY DO BUSINESS → PENDING PARTNER = FINALIZING HOW WE WILL DO BUSINESS → PARTNER = ESTABLISHED WAY OF DOING BUSINESS.**
