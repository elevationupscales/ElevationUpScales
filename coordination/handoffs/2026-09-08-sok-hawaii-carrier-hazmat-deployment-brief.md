# Deployment Brief — SOK Hawaii Carrier Packaging / HazMat Requirements

**Date:** 2026-09-08  
**Branch:** `plan/sok-order-first-growth-workflow-0908`  
**Status:** DEPLOYMENT INPUT / DO NOT DEPLOY BY THIS FILE ALONE

## Deployment manager — required read

The Hawaii order-first build now has a verified carrier-requirements source:

- `operations/SOK_HAWAII_CARRIER_PACKAGING_HAZMAT_REQUIREMENTS.md`
- `operations/SOK_ORDER_FIRST_GROWTH_WORKFLOW_PLAN.md`

These requirements were extracted from actual freight-company correspondence and the June 2026 Pasha Hawaii Lithium Battery Shipment Checklist supplied to Elevation through the freight forwarder, plus SOK-specific forwarder quote stipulations.

## Material build additions

Release B — Hawaii Order-First Foundation must be able to represent these carrier-specific gates:

- carrier checklist current;
- exact SDS ready;
- UN38.3 / 38.3 report ready;
- UN number / Wh / battery data ready;
- state of charge confirmed for the selected route;
- battery condition accepted;
- strong outer packaging confirmed;
- non-metallic inner packaging confirmed where required;
- short-circuit protection confirmed;
- separation from conductive materials confirmed;
- securement / blocking / bracing confirmed;
- packaging and blocking/bracing photos ready;
- high-capacity additional-carrier review complete where required;
- SOK preparation package sent;
- SOK warehouse confirmation received;
- booking documents ready;
- freight accepted / handoff ready.

## Verified route-specific details that must not be lost

For the supplied Pasha Hawaii container-service checklist:

- SOC must be 20%–50%; outside that range is a terminal rejection condition.
- Damaged, defective, recalled, and unsealed lithium batteries are not accepted under the normal route.
- Packaging must prevent short circuit and movement.
- Strong outer packaging is required.
- Non-metallic inner packaging completely enclosing batteries is required by the supplied checklist.
- Batteries must be separated from conductive materials.
- Packages must be blocked/braced within the container.
- Packaging and blocking/bracing photos must accompany the checklist.
- Lithium-ion batteries above 5 kWh per battery require additional review and written carrier approval before booking.
- The freight-forwarder SOK quotes additionally require SDS + lithium checklist at booking and require freight to be safe for ocean transport/forklift handling.

## Privacy boundary

Do not place private freight rates, quote totals, payment terms, customer PII, or protected commercial correspondence in the deployment UI or public Git.

## Deployment interpretation

These are not universal lithium rules. The build must bind the requirements to the selected route/carrier profile and allow the checklist to be refreshed when carrier policy changes.

**Do not hard-code one carrier's rules globally across every Hawaii/Alaska lithium route.**

## Acceptance impact

Release B should not be considered operationally complete if the owner still needs to reopen historical freight emails/PDFs to determine whether an exact shipment is packaging/HazMat ready.
