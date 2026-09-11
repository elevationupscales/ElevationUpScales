# Elevation UpScales — Company Operations RUN Delta

**Timestamp:** 2026-09-10 23:45 MDT  
**Owner:** Casey Young  
**Role:** Company Operations Manager  
**Mode:** RUN / GIT FIRST / BLOCKED TO BACK / CONTINUE FINISHABLE WORK

## VEVOR customer-facing activation

The current Shopify store connection was verified as **Elevation Upscales** on `elevation-upscales.myshopify.com`.

Company Operations attempted the exact current work-board action: reach authenticated Shopify Admin and remove Online Store password protection only, with no theme/product/pricing/payment/shipping/app changes authorized.

Result: the authenticated browser route was blocked by a Cloudflare verification challenge before Shopify Admin could be reached. No store setting was changed.

Current classification:

- **WORK ITEM:** VEVOR direct-site storefront activation
- **STATE:** BLOCKED / DEFERRED TO END OF CURRENT FINISHABLE QUEUE
- **BLOCKER:** TECHNICAL ACCESS / authenticated Shopify Admin browser blocked by Cloudflare challenge
- **TRIGGER TO RESUME:** owner/admin session capable of reaching Shopify Admin Online Store password setting without challenge
- **NEXT ACTION ON RESUME:** disable only storefront password protection, save, then immediately re-run unauthenticated VEVOR Direct collection/product/cart/checkout acceptance
- **CLOSE CONDITION:** public storefront/checkout acceptance passes

The connected Shopify Admin API remains available for supported commerce reads, but the current connected action set does not expose the Online Store password setting.

Current Shopify order check returned **no orders**; therefore no new paid-customer P0 interrupt was identified in this RUN pass.

## Complementary vendor activation — next qualified queue

### BayWa r.e. Solar Systems

Current official U.S. webstore-registration route was inspected without submission.

Verified initial form characteristics:

- required applicant identity/contact and company address fields;
- required job-function field;
- required question: **Are you a US-based solar installer or contractor?**;
- required business-type classification centered on residential/commercial solar installer status;
- no document-upload field visible on the initial registration form;
- no terms-acceptance checkbox visible on the initial registration form;
- BayWa positions the account/webstore around U.S. solar installers, contractors and distributors.

**State:** QUALIFIED / OWNER-FACTUAL-ATTESTATION GATE BEFORE APPLICATION SUBMISSION.

Do not submit an installer/contractor answer by inference. If Elevation should proceed as a distributor/commercial buyer rather than affirming installer status, use BayWa's current Connect With Us / account-manager route rather than misrepresenting the company.

### Winegard

Official Winegard current rule states authorization is required to sell Winegard products effective 2025-10-01. The Authorized Seller application includes a United States Authorized Internet Retailer Agreement and current UMAP acknowledgement/controls.

**State:** QUALIFIED / APPLICATION + AGREEMENT OWNER REVIEW REQUIRED.

Do not submit or accept the agreement without owner review of the current application/terms.

### Micro-Air

Official Dealer Central states:

- dealer candidates create an account first;
- an automated **Micro-Air, LLC. – Dealer Application** email follows;
- business documents are required for approval.

**State:** QUALIFIED / ACCOUNT-APPLICATION OWNER REVIEW REQUIRED.

Do not create/submit the dealer account until the owner-review application step is approved.

### KISAE Technology

A dealer/ecommerce partnership inquiry has already been sent from Elevation. Do not duplicate outreach.

**State correction:** CONTACTED / WAITING.

### Solarflexion

Official site exposes a customer account-registration path and current contact route. Current public evidence does not yet establish that generic customer registration equals reseller/dealer authorization.

**State:** RESEARCH / COMMERCIAL-ACCOUNT ROUTE VERIFY.

Do not treat ordinary account creation as reseller authorization without confirmation.

### Airxcel

Airxcel's current dealer/service guidance routes dealer/stocking inquiries to the individual brands rather than a single generic corporate dealer program. Relevant Elevation categories include RV climate/HVAC, ventilation, electrical/surge, appliances and chassis/support products.

**State:** QUALIFIED / BRAND-SPECIFIC ROUTING REQUIRED.

Do not send a generic Airxcel-wide dealer inquiry until the intended brand/category route is selected.

## Current execution order after this delta

1. VEVOR storefront-password action remains OPEN but deferred behind finishable work until authenticated Shopify Admin access clears.
2. Complementary vendor queue continues without duplicate outreach.
3. KISAE moves to CONTACTED / WAITING.
4. BayWa, Winegard and Micro-Air remain owner-review application gates, not generic cold-email tasks.
5. Solarflexion stays route-verification before reseller claims.
6. Airxcel requires brand-level routing.
7. Renogy and other dedicated vendor projects continue under their assigned project managers; Company Operations does not take over their specialist worktrees.

**CONTROL:** BLOCKED GOES TO THE BACK — FINISHABLE WORK MOVES FORWARD — NOTHING DISAPPEARS.
