# Deployment Brief — SOK Hawaii Packaging / HazMat Workflow

**Date:** 2026-09-08  
**Branch:** `plan/sok-order-first-growth-workflow-0908`  
**Status:** DEPLOYMENT INPUT / PROTECTED LOGISTICS BOUNDARY

## Deployment manager — required read

The Hawaii order-first build has verified route-specific carrier requirements behind the operating model.

Required source files:

- `operations/SOK_HAWAII_CARRIER_PACKAGING_HAZMAT_REQUIREMENTS.md`
- `operations/SOK_ORDER_FIRST_GROWTH_WORKFLOW_PLAN.md`

The deployment manager should implement the **workflow gates and protected data model**, not reproduce Elevation's carrier network or carrier-specific playbook in public source code.

## Material build additions

Release B — Hawaii Order-First Foundation must represent these protected readiness gates:

- internal route qualified;
- carrier checklist current;
- exact SDS ready;
- UN38.3 / 38.3 report ready;
- UN number / Wh / battery data ready;
- state of charge verified against selected route profile;
- battery condition accepted;
- outer packaging confirmed;
- inner packaging confirmed where required;
- short-circuit protection confirmed;
- conductive-material separation confirmed where required;
- securement / blocking / bracing confirmed where required;
- packaging evidence ready where required;
- additional-carrier review complete where required;
- SOK preparation package sent;
- SOK warehouse confirmation received;
- booking documents ready;
- freight accepted / handoff ready.

## Protected route-profile principle

Exact carrier-specific acceptance values and documents are intentionally omitted from this public deployment brief.

The system should support protected route profiles capable of holding or referencing current requirements without publishing them in source code. Examples include:

- route-specific state-of-charge acceptance;
- capacity/configuration review thresholds;
- packaging details;
- evidence/photo requirements;
- booking-document requirements;
- container/load limits;
- carrier-specific marks or labels;
- current written-approval requirements.

Carrier acceptance remains controlling and must be revalidated before a real shipment.

## Supplier information boundary

SOK should receive only the preparation information needed to execute the specific shipment at origin:

- manufacturer-document requests needed for the exact SKU;
- battery condition requirements;
- state-of-charge requirement when applicable;
- physical packaging/securement requirements SOK is being asked to perform;
- required origin-side marks/labels or paperwork for that shipment;
- required preparation evidence/photos when applicable.

Do not disclose the broader Elevation carrier network, alternate routes, quote references, rate structure, receiving network, route-selection logic, or other internal logistics intelligence unless a specific operational need requires it.

## Privacy / commercial-asset boundary

Do not place in public Git, deployment UI visible to unauthorized users, customer-facing pages, or routine supplier outreach:

- carrier identities tied to Elevation's working route network;
- private carrier checklists/documents;
- exact carrier-specific thresholds that reveal the working route playbook;
- freight rates or accessorial structures;
- quote / booking references;
- origin terminal or detailed handoff routing;
- Hawaii receiving/storage partner identities and private terms;
- backup carrier identities;
- internal route-comparison or carrier-selection logic;
- customer PII.

## Deployment interpretation

The application should make the owner's next action obvious without revealing protected logistics intelligence.

**Do not hard-code one carrier's rules globally. Do not expose the carrier playbook merely to make the workflow self-contained.**

Release B should instead know that an exact order is:

**ROUTE QUALIFIED → REQUIREMENTS CURRENT → SOK PREP READY → SOK CONFIRMED → BOOKING READY → FREIGHT ACCEPTED**

with detailed requirements stored/referenced only inside the protected operational boundary.
