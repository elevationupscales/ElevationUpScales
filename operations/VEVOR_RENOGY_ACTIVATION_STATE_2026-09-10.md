# VEVOR + RENOGY ACTIVATION STATE — 2026-09-10

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Status:** ACTIVE / CONTROLLING SUPPLIER-STATE DELTA  
**Source of truth:** GitHub `/operations/`

This dated state reconciles current owner direction and Company Operations execution. Where it conflicts with older VEVOR or Renogy language in `ACTIVE_FOLLOWUPS_2026-09-08.md`, this file controls until that tracker is refreshed.

## 1. VEVOR — DIRECT-WEBSITE DROPSHIPPING

**State:** ACTIVE / CURATED 40 CATALOG ACTIVATION COMPLETE / LIVE-ORDER READINESS ACTIVE  
**Priority:** #1 ACTIVE PETER / ECOMMERCE-VENDOR WORKTREE  
**Classification:** APPROVED TO PROCEED — DIRECT-WEBSITE DROPSHIPPING

VEVOR is not a prospect or qualification lead. Owner approval remains granted for routine direct-site onboarding, catalog, compliant pricing, merchandising and fulfillment execution without another owner gate. Individual blocked SKUs are isolated rather than stopping the supplier lane.

### Completed baseline

- VEVOR PRO registration/onboarding baseline: COMPLETE.
- Direct supplier product feed: RECEIVED and reconciled.
- Direct VEVOR and Doba VEVOR source lanes: separated.
- Curated working set: 40 products.
- Tier A — Core Launch: **19/19 catalog activation gate CLOSED**.
- Tier B — Strong Expansion: **17/17 catalog activation gate CLOSED**.
- Tier C — Supporting: **4/4 catalog activation gate CLOSED** after exact SKU, live price/MAP, selected-SKU purchase-state, Shopify duplicate, status, collection and publication verification.
- Curated 40 activation: **40/40 complete**.
- Legacy direct-source reconciliation: completed for source/SKU/tag identity; individually unavailable legacy records remain isolated in DRAFT/HOLD rather than blocking VEVOR.

### Shopify verification / concurrency findings

Shopify creation/write responses are not final proof of state. Authoritative readback is mandatory after material writes.

During B-tier activation:
- the creation surface reported ACTIVE while authoritative Shopify reads returned DRAFT;
- all affected B-tier records were explicitly corrected to ACTIVE and publication was rerun;
- a later concurrent-workflow regression returned the 17 B-tier records to DRAFT;
- all 17 were restored to ACTIVE and persistence was verified again;
- exact SKU, price and both intended publication IDs remained intact;
- B-tier media enrichment subsequently reached 17/17 through the concurrent media workflow.

During C-tier activation:
- another concurrent worker created the same four verified SKUs first;
- the later creation-response GIDs were therefore not canonical and resolved to null on authoritative readback;
- exact-SKU search identified the existing canonical records instead;
- those four canonical records were verified ACTIVE with exact price/SKU, both intended publications and membership in the `VEVOR Direct` collection;
- duplicate records were not retained as the controlling records.

**Control:** exact SKU identity + authoritative Shopify readback controls over transient create responses, search indexing or noncanonical GIDs.

### Current VEVOR operating controls

Channel control:
- approved now: ElevationUpScales.com / Shopify direct-site sales;
- Amazon, Walmart, eBay, TikTok Shop and other third-party marketplaces remain blocked unless VEVOR later provides written authorization for that channel;
- Doba permissions do not transfer to direct VEVOR.

Pricing control:

**LIVE VEVOR SELLING PRICE CHECK + FEED MAP CHECK → USE THE HIGHER APPLICABLE FLOOR**

Inventory / sellability control:
- feed inventory is a snapshot, not a customer promise;
- identify the exact selected SKU/model;
- use the exact selected SKU's actual VEVOR purchase-state block as the live sellability source;
- a variant-selector `Out of Stock` label does not override an exact selected SKU purchase block that says `In Stock` and exposes normal purchase actions;
- genuine ambiguity holds only that SKU as MANUAL CONFIRMATION;
- do not assume a paid VEVOR preorder/backorder path exists.

Special C-tier control:
- roof-rack water tank SKU `CDJSXZTK8GALWQSO7V0` is controlled as utility/shower/cleaning water equipment only;
- do **not** market it as potable/drinking-water storage because VEVOR does not recommend that use.

### Fulfillment-detail closeout — CLOSED

Direct supplier guidance confirms the normal operating model:
- direct dropship delivery to the customer is supported;
- normal product packaging carries VEVOR branding; no blind/unbranded packaging promise is authorized;
- parcel packaging does not include customer-visible invoice/price details;
- supplier tracking is obtained through the VEVOR PRO account and handed from Elevation to the customer;
- Elevation remains the first-line customer-facing support contact and coordinates supplier issues with VEVOR;
- returns, defects and supplier-side exceptions are initiated through VEVOR's return/support process; customers should not be instructed to ship merchandise back outside that controlled return path.

Normal order path:

**CUSTOMER PAID ORDER → ELEVATION SHOPIFY → LIVE SKU/PRICE/STOCK RECHECK → VEVOR PURCHASE → SUPPLIER TRACKING → ELEVATION CUSTOMER UPDATE → COMPLETION / ACTUALS**

### Current active work

1. Complete/verify any remaining C-tier supplier-media enrichment without duplicating concurrent worker writes.
2. Keep the curated 40 under targeted live price/MAP/sellability maintenance; do not restart wholesale catalog activation.
3. Execute the first live paid VEVOR order proof when a real customer order triggers the lane.
4. Expand beyond the curated 40 only when a business need or verified merchandising opportunity justifies it; SKU count alone is not a reason to expand.

### Waiting / nonblocking

- Final VEVOR tax-exemption review result. Protected tax documents and account identifiers remain outside public Git.
- First live paid-order proof is event-triggered and cannot be closed until an actual VEVOR customer order exists.

### Wider VEVOR close condition

The VEVOR integration remains ACTIVE until a real paid direct-site order proves:

**CUSTOMER PAID ORDER → ELEVATION SHOPIFY / OPERATING SYSTEM → LIVE SKU/PRICE/STOCK RECHECK → VEVOR PURCHASE → SUPPLIER TRACKING → CUSTOMER TRACKING / FULFILLMENT UPDATE → COMPLETION / ACTUALS**

### Current VEVOR RUN pointer

**C-TIER MEDIA CHECK → FIRST LIVE ORDER TRIGGER CHECK → ROUTINE PRICE/STOCK/MAP MAINTENANCE → LIVE ORDER PROOF WHEN TRIGGERED**

Do not restart PRO onboarding, feed intake or Tier A/B/C activation unless a specific changed fact reopens the affected lane.

## 2. RENOGY — DEALER APPLICATION

**State:** WAITING  
**Priority:** PARKED / EXTERNAL REVIEW  
**Classification:** APPLICATION UNDER RENOGY REVIEW

The Renogy application, required company materials, owner-signed W-9, and requester-specific W-9 follow-through are complete. Current supplier guidance indicates a normal review period of approximately 1–3 business days.

There is no current internal blocker and no owner blocker. Do not duplicate the application, resend documents, or chase Renogy during the normal review window unless a materially new request arrives.

### Post-approval activation lane — PREPARED, NOT YET EXECUTED

Upon Renogy approval:
- capture partner-account access;
- document dealer pricing/MAP without placing private commercial terms in public Git;
- identify catalog/inventory source;
- identify approved product media/specification source;
- establish/refresh the Renogy supplier record;
- build the initial curated solar/RV/off-grid product group;
- confirm direct-site and other channel controls from written Renogy terms;
- validate checkout → Renogy dropship → tracking → Elevation completion workflow.

### Close condition

Renogy remains WAITING until the approval/decline or another material request arrives. Activation begins only from the resulting verified Renogy terms and account state.

## 3. OPERATIONS PRIORITY

Current sequence:

**#1 VEVOR → CURATED 40 ACTIVE / C-MEDIA CHECK + LIVE-ORDER READINESS**  
**RENOGY → PREPARED / WAIT FOR EXTERNAL APPROVAL**

Routine eBay/account maintenance does not displace VEVOR unless a real customer fulfillment issue needs immediate action.

No new supplier project, duplicate application, repeated supplier outreach, or owner escalation is required for routine execution. Escalate only for binding terms, unusual financial commitments, material channel/policy changes, or another genuine owner-level decision.
