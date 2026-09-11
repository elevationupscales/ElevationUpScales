# Elevation UpScales — Renogy Workflow Completion Gate

**Date:** 2026-09-10  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Owner:** Casey Young  
**Project Manager:** Renogy Branch Operations Manager  
**Specialist:** Renogy Project Specialist  
**Status:** RUN-TO-BLOCK / EXTERNAL-AUTHORITY GATES REMAIN

## Purpose

Record the furthest safe state reached by the Renogy warranty/backorder specialist workflow and prevent repeated public recon from being mistaken for completion of protected dealer-account work.

## Completed and accepted

- Dealer relationship approved.
- Partner Portal active.
- Lower-48 direct-site channel rule established.
- Direct-to-customer dropship capability established.
- Lower-48 preorder/backorder rule locked as exact-SKU controlled, not blanket.
- Lower-48 warranty/RMA operating framework locked into `RENOGY_VENDOR_MASTER_SOP.md`.
- Exact-SKU Warranty & Availability Map Batches 01 and 02 accepted.
- Exact public paid-backorder examples established for `RSP100DCT-US` and `RBM500-US` only.
- Narrow `WARRANTY_CONFLICT_HOLD` established for `RIV4835CSH1S` because current Renogy public sources disagree on warranty duration.
- Exact-suffix holds established where a storefront `-US` SKU cannot safely be collapsed into an unsuffixed warranty-table identity.

## Remaining protected/external gates

The specialist cannot truthfully close the full Renogy project from public product pages alone. The following require current Renogy Partner Portal, supplier-provided source package, current dealer correspondence, or a real customer order:

1. **MAP / price-control source** for each launch SKU.
2. **Structured catalog/SKU source** and current dealer sellability/inventory source.
3. **Exact preorder/backorder acceptance** inside the dealer order path for unavailable launch SKUs unless an exact current public state already proves it.
4. **Approved media/spec/manual source** for launch-wave publication.
5. **Dropship order/tracking handoff** proven through the dealer account.
6. **Authoritative warranty resolution for `RIV4835CSH1S`** and any future source conflict.
7. **Exact suffix reconciliation** for held `-US` storefront SKUs where warranty evidence uses a different identifier.
8. **First real paid Renogy order proof:** customer order → exact SKU reverify → MAP/price check → supplier availability → Partner Portal purchase → supplier acceptance → tracking → delivery → receipt.

## No-guess rule

Do not manufacture completion by:

- treating public retail availability as protected dealer inventory;
- treating one SKU's public backorder state as blanket dealer backorder authority;
- inventing or inferring MAP;
- choosing the longer warranty when Renogy sources conflict;
- collapsing `-US` and unsuffixed SKUs without exact identity evidence;
- claiming first-order proof before a real paid order exists;
- copying retail return/warranty promises into Elevation customer terms without checking the applicable dealer/product rule.

## Run behavior from this point

When RUN is issued:

1. resolve current `main` and Renogy Project Source;
2. inspect current Partner Portal/supplier package/current dealer correspondence if available to the executing worker;
3. execute any newly available exact-SKU MAP/catalog/media/sellability/warranty fact;
4. hold only facts that remain unavailable;
5. publish only SKUs that satisfy the minimum safe publication set in the Master SOP;
6. on the first real paid order, execute and document the first-order proof path;
7. once source refresh + compliant live catalog + first order + warranty/returns routes are repeatable, move Renogy from Stage 1 PROVING to Stage 2 CONTROLLED.

If no new protected source or real order is available, return:

**RENOGY: WAITING ON CURRENT PARTNER-PORTAL / SUPPLIER-SOURCE / FIRST-ORDER EVIDENCE — NO SAFE ADDITIONAL COMPLETION CLAIM.**

## Current project state

**RENOGY COMPLETED:** public-safe Lower-48 backorder/warranty policy and first two exact-SKU mapping batches.  
**RENOGY CURRENT:** source/MAP/media/catalog integration and launch-wave verification.  
**RENOGY WAITING/BLOCKED:** protected dealer source inputs, exact conflict resolution, and first real order proof.  
**RENOGY MATURITY:** Stage 1 — PROVING.  
**RENOGY OWNER GATE:** none for routine source intake; owner approval remains required for material inventory/bulk, unusual credit/financing, contracts/exclusivity, channel expansion, supplier-policy exception, or special-route liability commitments.  
**RENOGY NEXT:** resume immediately when current protected source evidence or a real Renogy order becomes available; do not recreate completed Batches 01–02.