# Elevation UpScales — Morning Management Recon

**Date:** 2026-09-11 MDT  
**Owner:** Casey Young  
**Prepared for:** Owner / Operating System / Company Operations / Ecommerce & Vendor Operations  
**Source baseline before this record:** `5dd63782e66a99f1c8879580b0c76ab61afbbff6`  
**Mode:** GIT FIRST / RECONCILE CURRENT FACTS / BLOCKED TO BACK / CONTINUE FINISHABLE WORK / DEDUPE BEFORE SEND

## Morning control

**ONE CURRENT STATE → ONE OWNER → ONE NEXT ACTION → ONE CLOSE CONDITION**

Outbound control remains:

**VERIFY BEFORE SEND → ONE THREAD / ONE FORM / ONE CURRENT ATTEMPT → RESUBMIT ONLY WITH VERIFIED REASON.**

## Material morning changes

### SOK

The outstanding SOK Hawaii warranty operating-input request has received a supplier response. The prior `WAITING ON SOK RESPONSE` state for that specific input is superseded.

Current management state:

- core SOK supplier relationship and Lower-48 commerce remain controlled;
- supplier warranty operating inputs are now available for internal modeling;
- supplier supports a replenishment-oriented warranty workflow and provided the evidence needed to advance the internal Hawaii warranty/economics model;
- supplier also raised shipping/disposition operating proposals that remain **nonbinding** until Elevation completes internal economics/compliance review and any required owner approval;
- no duplicate supplier request is authorized;
- Logistics Plus pricing/terms, the existing shipment-profile extraction task, and first-real-order proof remain independent open items.

**NEXT:** model true warranty/logistics cost and value from the received supplier inputs; add Logistics Plus terms when returned; preserve owner gates before any standing commercial commitment.

### Kingboss

The prior blanket `WAITING ON SUPPLIER ONBOARDING PACKAGE` state is superseded by a substantive supplier response.

Current verified direction:

- B2B/wholesale relationship remains approved;
- supplier provided U.S. fulfillment, product/order-process and lithium-compliance support information;
- supplier identified an existing Kingboss product mapping and requested a **single ZIP containing one image of each Kingboss product currently listed by Elevation** so it can map those listings to internal SKUs and return consolidated product data;
- no inventory purchase, wholesale batch, reserve-stock or financing commitment is approved by this recon.

**NEXT:** inspect Elevation's current Kingboss listings → gather one image per exact listed Kingboss product → create one mapping ZIP → send once in the existing Kingboss thread → receive supplier SKU/data mapping.

### VEVOR

VEVOR A-tier remains live and the current direct catalog continues to advance. Supplier fulfillment details received from VEVOR confirm branded product packaging, no supplier invoice/price details in the customer package, tracking through the VEVOR PRO account and VEVOR-coordinated returns/defects through Elevation.

Owner has approved the current **safe record-quality workflow** on existing VEVOR records: formatting/readability cleanup, image alt text and obvious title/vendor/product-type/SKU/description consistency corrections that do not invent product claims.

Still gated separately:

- Shopify storefront password removal requires legitimate authenticated owner/admin access;
- price/MAP, sellability, publication/status, inventory, routing, shipping/warranty/return claims and unverified media remain consequential controls.

**NEXT:** continue safe record-quality cleanup and media-gap identification; keep storefront-authentication blocker at the back until legitimate access is available.

### Renogy

Renogy remains an approved dealer with Partner Portal access. Five sales-first products are staged in Shopify as **DRAFT**. The existing MAP/catalog/media/source request remains active; do not duplicate it.

**NEXT:** continue exact-SKU source clearing and staging SKU by SKU; one blocked SKU does not stop safe work on another. Do not activate a product until its consequential source gates are clean.

### Universal catalog / shared commerce

Latest shared-catalog RUN receipt is merged. Current working matrix:

- SOK: 9 active products;
- VEVOR: VEVOR Direct collection at 40 products across active/staged states;
- Renogy: 5 staged draft products;
- Kingboss: no Shopify product creation until exact supplier mapping/source evidence is clean.

The shared customer-facing storefront password remains a real authentication gate but must not block independent catalog/source work.

## Complementary vendor queue

Current durable states:

- BayWa — contacted / waiting; no resubmission;
- Winegard — application submitted / waiting authorization; no resubmission;
- KISAE — contacted / waiting; no duplicate outreach;
- Solarflexion — contacted / waiting; no duplicate outreach;
- SolarStock USA — current quote/capability request pending; no chase while pending;
- other already-sent qualified suppliers remain waiting unless a reply/bounce/verified new trigger arrives;
- Micro-Air — owner-review application-start gate;
- Coleman-Mach / Airxcel — owner-review external-contact gate.

## Customer / platform exception

The eBay cancellation request for order `10-15134-90489` remains a real customer exception, but the current browser attempt could not authenticate. No duplicate cancellation/refund attempt is authorized. Resume only when a legitimate authenticated eBay session is available, then inspect the existing request before any action.

## Release lane

Homepage / lithium branding release remains open. At the actual release window:

**RESOLVE LATEST REVIEWED MAIN → PREVIEW → PASS → SAME SHA PRODUCTION WITH `DEPLOY` → CANONICAL SMOKE → RECEIPT**

Do not freeze ordinary Git work before the actual preview-to-production release window.

## Owner decisions / gates

1. **Peter operations-account identity:** choose one company-controlled operating identity before changing VEVOR/Shopify security or account email. Current correspondence references more than one possible mailbox identity. No platform-security migration should occur until Casey selects the controlling identity and second-factor plan.
2. **Kingboss:** no wholesale/reserve inventory commitment is required to complete the requested product-mapping ZIP.
3. **SOK:** no immediate reserve-stock purchase decision is required to model the newly received warranty inputs.
4. **Micro-Air / Coleman-Mach:** optional owner-review outbound gates remain available after the morning high-value executable work.

## Morning execution priority

1. **Kingboss product-mapping ZIP** — finishable supplier unblock, no inventory commitment required.
2. **SOK warranty/logistics economics model** — supplier response received; process internally, do not resend.
3. **VEVOR approved safe catalog-quality work** — continue; storefront authentication remains deferred.
4. **Renogy five-draft source clearing** — continue SKU by SKU; no duplicate supplier source request.
5. **Universal catalog acceptance** — keep source/catalog/customer-path matrix reconciled while the shared password gate waits.
6. **Homepage exact-SHA release** — execute when the active release window can be controlled end to end.
7. Keep already-contacted complementary vendors in WAITING unless a real trigger arrives.
8. Resume eBay cancellation only with legitimate authenticated access.

## Management instruction

Peter / Vendor Operations should continue only verified, assigned project work and the owner-approved VEVOR safe-cleanup scope. Do not change product publication/status, price/MAP, inventory, routing, storefront password, platform security identity, shipping/warranty/return promises or unverified media without the applicable gate.

**CONTROL:** FINISHABLE WORK FORWARD → BLOCKED ITEMS BACK → NO DUPLICATE OUTBOUND → OWNER GATES STAY OWNER GATES.