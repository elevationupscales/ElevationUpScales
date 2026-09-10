# Active Commerce & Supplier Follow-Ups — 2026-09-08

**Owner:** Elevation UpScales Management  
**Status:** ACTIVE  
**Source of truth:** GitHub `/operations/`

This file tracks current action items that must remain visible until closed. It intentionally excludes private identity documents, supplier costs, carrier rates, private partner pricing, customer PII, credentials, and other protected commercial/logistics details.

## Owner review override — 2026-09-09

**Status:** OWNER REVIEWED  
**Priority:** LOW

The following inbox-derived items were reviewed by Casey and are explicitly moved to the low-priority owner-reviewed backlog. They must not interrupt the current active work tree unless a materially new event changes the state:

- Stripe account-information / verification tasks;
- TikTok Shop fulfillment-risk and account-verification/appeal items identified in the inbox sweep;
- Doba downstream customer / sales-channel cleanup for the already closed/refunded PO-box order;
- PayPal consultant correspondence;
- Dometic dealer-application follow-through;
- Logistics Plus Hawaii warehouse/document-package follow-through;
- Lippert routing-form follow-through;
- Contractor T-Shirts order Q-001803 design-change follow-through.

Related inbox threads that are already legitimately waiting remain WAITING / HOLD and are not to be chased merely because they are visible in Gmail. This owner-review override supersedes any older priority label in this file for the specific items above unless Casey or current Company Operations direction explicitly promotes one again.

## 1. Doba order / verification control

**Status:** ORDER CLOSED / REFUND ISSUED / NO CURRENT VERIFICATION REPLY REQUIRED  
**Priority:** High

The affected Doba order is no longer pending release. Doba confirmed that the supplier closed the order because the destination address type could not be serviced and that the paid amount was refunded.

Separately, Doba's verification team confirmed that previously requested verification materials had already been submitted and instructed Elevation not to send another response at this time.

**Do not place identity, EIN, billing-address evidence, order/customer details, or other verification documents in this repository. Do not resend verification documents unless Doba specifically requests them.**

Next action:
- confirm the refund is reflected in the commerce/payment workflow;
- make sure the downstream customer/order record is closed or otherwise handled correctly;
- preserve a future-order address-serviceability check before submitting Doba orders;
- monitor account verification status and respond only if Doba requests additional action.

Close when:
- refund and downstream order closure are confirmed;
- no unresolved customer obligation remains;
- any continuing Doba account-verification requirement is separately identified and controlled.

## 2. Hawaii receiving / fulfillment partner

**Status:** FOLLOW-UP SENT / AWAITING OPERATING QUALIFICATION  
**Priority:** High

A Hawaii-side receiving/storage partner has responded positively and described a prior comparable receiving/storage/release model. Elevation has sent a follow-up to qualify the current operating structure for new standalone LiFePO4 inventory, inbound receiving, storage, customer/installer release, delivery, documentation, handling limits, claims procedure, and account/onboarding requirements.

Protected commercial pricing and partner-specific terms remain outside public Git.

**Correspondence control:** the current follow-up has already been sent. Any earlier unsent draft for the same response is stale and must not be sent. Await the partner's reply before sending another follow-up unless materially new information requires a new response.

Next action:
- receive confirmation of current capability for new standalone LiFePO4 inventory;
- confirm receiving/documentation and release procedures;
- confirm account/onboarding requirements;
- internally evaluate protected commercial terms;
- hold the planned discussion with the partner if needed to close operating gaps.

Close when:
- current capability is confirmed for new lithium inventory;
- commercial terms are accepted internally;
- first-order receiving/release workflow is documented;
- the partner is either activated or rejected.

## 3. Hawaii low-voltage retail / sample-forwarder path

**Status:** SOK COMMERCIAL BOUNDARY CONFIRMED / PARTNER + FORWARDER QUALIFICATION PENDING  
**Priority:** High

A Hawaii commercial partner has expressed interest in storing and handling Elevation's low-voltage consumer inventory, potentially supporting walk-in retail from Elevation-owned stock, purchasing selected units from Elevation, and exploring sample-shipment cost through an established battery forwarder.

SOK has now confirmed the upstream commercial rules needed for this path:

- Elevation may wholesale SOK products to a downstream Hawaii retailer;
- the retailer may buy through Elevation without a separate SOK approval for this structure;
- downstream advertised pricing must remain at or above SOK MAP;
- the preferred warranty/RMA relationship path is retailer → Elevation → SOK;
- appropriate Hawaii referrals continue to come to Elevation even when a local partner holds inventory;
- SOK can release a single low-voltage starter unit from Chino for the planned proof movement under its current small-quantity pickup structure.

This means the upstream SOK resale-permission gate is no longer blocking the partner conversation.

Do not treat the Hawaii partner as confirmed standalone-LiFePO4 acceptance or as carrier approval. The partner's established 48V / high-voltage supplier relationships are outside the intended scope and should not be disrupted.

**Correspondence control:** one current R&R reply draft exists, has been updated with the verified SOK rules and one-unit proof-release status, and remains unsent pending owner review. Do not create or send a second partner reply in parallel.

Next action:
- confirm whether new standalone low-voltage LiFePO4 batteries are included in the partner's handling offer;
- confirm fulfillment-only vs reseller-only vs hybrid preference;
- identify an accepting forwarder/carrier path for 1 × SK12V100PC;
- obtain exact receiving, packaging, labeling, documentation, signer/responsibility and tender requirements;
- confirm receiving/storage/customer-release commercial structure outside public Git;
- build the protected landed-cost/vendor-pricing model from verified actual inputs;
- reconcile qualified route facts into `SOK_HAWAII_FIRST_ORDER_READINESS.md`.

Close when:
- standalone-lithium scope is confirmed or rejected;
- a sample forwarder path is qualified or rejected;
- the partner's operating role and commercial structure are documented;
- the lane is either activated for a first-order test or removed from active qualification.

## 4. Additional Hawaii lithium storage / warehouse option

**Status:** PROVIDER READY TO PRICE / PROOF-STAGE INPUTS + DOCUMENT PACKAGE REQUIRED / NO COMMITMENT  
**Priority:** High — reactivated by materially new provider response

Logistics Plus Hawaii reports that its operations team believes it can generally support Elevation's Hawaii lithium program, while noting that lithium battery storage may require additional warehouse safety measures. The provider has now followed up specifically asking Elevation to advise on the open operating questions so it can prepare pricing.

The provider asked whether Elevation would consider a longer-term agreement or minimum monthly commitment if facility investment is required, whether an approved third-party Hawaii warehouse would be acceptable if the current facility is unsuitable, and requested the exact-model SDS and UN38.3 summaries for both starter battery models.

Current Elevation operating boundary for the next response:
- center the immediate qualification on **1 × SOK SK12V100PC** as the proof-stage unit;
- allow **SK48V100N** to be reviewed in parallel as a secondary/future model without holding the one-unit proof decision;
- Elevation is open to an approved third-party Hawaii warehouse if that is the cleaner qualified operating solution;
- Elevation may discuss a longer-term agreement or minimum commitment only after the exact storage requirements, operating scope, facility investment and economics are known;
- **no standing minimum, long-term commitment or facility investment has been authorized**;
- exact-model SDS and UN38.3 packages are available for both starter models for operational review.

This remains **operating qualification, not final warehouse acceptance, carrier acceptance, shipment authorization, or a commercial commitment**.

**Correspondence control:** the latest Cara/Logistics Plus message is a material new event and promotes this lane from the prior owner-reviewed low-priority backlog into active qualification. One current reply draft exists but is unsent. Reconcile the provider state and factual quote inputs into Git first, then use the existing Cara thread only; do not create or send a parallel response.

Next action:
- assemble the exact proof-stage quote inputs for 1 × SK12V100PC, including packed dimensions/weight and the requested receiving/storage/release service scope;
- provide or attach the exact-model SDS/UN38.3 review material through the existing correspondence path when the response is cleared;
- ask Logistics Plus to identify the specific lithium-safety measures or facility investment that would be required, if any;
- obtain the proposed commercial structure and any minimum term, minimum volume, storage commitment or investment recovery requirement before Elevation agrees to anything;
- confirm whether the current Honolulu facility or an approved third-party facility is the recommended path;
- confirm receiving, storage, customer will-call/release, fulfillment, local-delivery and Neighbor Island capability and pricing structure;
- confirm whether a one-unit SK12V100PC proof movement can be received before any long-term commitment;
- keep private rates, minimums, facility-specific protected details and contract terms outside public Git.

Close when:
- a specific receiving/storage site is accepted or rejected;
- exact lithium handling and safety requirements are confirmed;
- pricing and service scope are received and evaluated internally;
- any required commercial commitment is defined and receives owner approval before acceptance;
- the option is activated for a controlled proof or removed from active qualification.

## 5. Hawaii freight-route qualification

**Status:** MULTI-ROUTE REVIEW ACTIVE / LOW-VOLTAGE PROOF SUPPLIER RELEASE CONFIRMED / NO FINAL CARRIER ACCEPTANCE  
**Priority:** High

Current carrier/forwarder qualification has advanced on multiple paths:

- a fresh exact single-unit terminal-to-terminal hazardous-goods quote was received for a current SOK rack-battery profile;
- another provider is reviewing the battery details with its logistics team and will return corrected hazardous-material charges;
- a separate ocean/FCL inquiry was routed internally to the provider's Hawaii team for review;
- SOK has confirmed supplier-side release for the selected one-unit low-voltage proof candidate.

Private carrier identities, rates, quote references, and protected route details remain outside public Git.

**A supplier release, quote, internal routing, or hazmat-charge review does not by itself establish dangerous-goods acceptance or shipment release.**

Next action:
- obtain current written exact-SKU acceptance for 1 × SK12V100PC on the best candidate proof route;
- obtain route-specific packaging, marking, labeling, paperwork, signer/offeror responsibility and tender requirements;
- confirm Hawaii receiving/release destination for the proof;
- build actual landed-cost economics before owner approval;
- do not double-send to providers that have already acknowledged and are actively reviewing the request.

Close when:
- primary, secondary and backup route roles are either qualified or rejected for the intended shipment profiles;
- the first-order route has written acceptance and executable instructions.

## 6. Additional battery supplier B2B qualification

**Status:** B2B CHANNEL APPROVED / TRANSPORT DOCUMENTATION STILL OPEN  
**Priority:** Medium-High

An additional battery supplier reports that Elevation's business application is approved for its B2B wholesale channel and that U.S. warehouse inventory is available for wholesale fulfillment.

The supplier also described broader certification-package availability under bulk-order conditions. This does **not** answer Elevation's exact transport-document request for the specific battery SKU under review and does not establish shipment readiness.

Next action:
- obtain exact manufacturer/model linkage for the intended SKU;
- obtain model-specific SDS/MSDS and UN38.3 documentation;
- confirm dangerous-goods packaging and shipping data for the exact product;
- confirm applicable wholesale/MOQ/fulfillment structure outside public Git before any order;
- do not infer transport compliance from unrelated product certifications.

Close when:
- exact product identity and transport documents are verified;
- commercial terms are internally acceptable;
- the supplier is activated for a defined gap or kept as a backup/rejected.

## 7. Renogy dealer onboarding

**Status:** APPLICATION PREP / OWNER REVIEW REQUIRED  
**Priority:** High

The Renogy partner application has been filled in internally and returned for Casey to review. Required supporting business documents and owner-level attestations still need final review before anything is submitted externally.

Known channel boundary: the proposed relationship is for Elevation's own website/direct channel and must preserve Renogy's stated third-party-marketplace restriction.

**Correspondence control:** do not send a duplicate introduction or application. The existing Renogy relationship thread is the active correspondence path.

Next action:
- Casey reviews and completes remaining application fields/attestations;
- verify required supporting business documents are current and appropriate;
- owner approves the final application package before external submission;
- after approval, document dealer pricing, dropship, media, warranty/return and channel rules without exposing private commercial terms.

Close when:
- application is submitted with owner approval;
- Renogy approves or declines the account;
- resulting operating/channel rules are reconciled into Git.

## 8. PayPal business onboarding / checkout support

**Status:** ACTIVE  
**Priority:** High

PayPal assigned Elevation a business consultant who offered support for account readiness and website payment integration.

Operational goal:
- preserve working checkout/payment capability;
- use the consultant to resolve integration/account-readiness questions that could affect payment acceptance;
- do not allow non-payment operational blockers to unnecessarily disable checkout.

Close when:
- PayPal integration/account-readiness questions are resolved;
- checkout remains verified healthy;
- any required follow-up is documented in Git.

## 9. Shopify first-wave product publishing

**Status:** EXECUTION PREP / FOUR CLEANUP SKUS REMAIN DRAFT / ONE SOURCE VERIFICATION OPEN  
**Priority:** High

Peter reports that four of the current five cleanup products have updated titles, descriptions, supplier images, and pricing while remaining safely in draft.

One current product remains blocked because the exact supplier record, supplier SKU/product match, verified images/specifications, current cost/shipping, and applicable pricing rules have not yet been verified.

Primary publishing gates remain:
- current supplier stock/freshness;
- actual dropship shipping cost/service;
- returns/fulfillment details;
- final spec/compatibility verification;
- complete product descriptions where needed;
- adequate product media/images;
- exact supplier/source mapping before publishing supplier-specific claims.

Lower-margin or source-uncertain products remain draft-only until shipping/fees and source truth are proven workable.

Close each SKU only after its supplier, shipping, content, media, spec, and margin checks are complete.

## 10. SOK product media expansion

**Status:** PARTIAL MEDIA RECEIVED / PRODUCT IMAGE COLLECTION PENDING  
**Priority:** High

SOK responded to Elevation's marketing-media request and supplied approved brand/logo material plus current manual/spec resources. SOK also stated that it is collecting the requested product images and will send them separately.

The remaining objective is to improve SKU presentation without scraping, inventing, or using unapproved media.

Still needed where available:
- multiple high-resolution product angles;
- connection/terminal/detail photos;
- installation/application/lifestyle imagery;
- 48V rack/cabinet/system imagery;
- approved feature/spec graphics;
- short product videos or dealer-approved video assets;
- clear channel-use restrictions where they differ by website, Shopify, social, eBay, TikTok Shop, or other marketplace.

Public SOK storefront reference:
`https://elevationupscales.com/sok-batteries`

Do not chase the product-image request while SOK is actively collecting the material.

Close when:
- the image/media set is received or SOK confirms no additional assets are available;
- channel-use boundaries are documented;
- media is assigned SKU-by-SKU without unsupported claims or duplication.

## 11. VEVOR direct-channel supplier qualification

**Status:** COMMERCIAL OPTIONS RECEIVED / CHANNEL BOUNDARY CONFIRMED / VOLUME RESPONSE PENDING  
**Priority:** Medium-High

VEVOR's business-development team provided current dropship and bulk-purchase collaboration options and stated that U.S.-warehouse fulfillment is available.

Current public-safe channel boundary:
- Elevation may develop the relationship for its own independent website/direct channel;
- VEVOR is not currently granting authorization for major third-party marketplaces identified in its response;
- tax-exempt purchasing requires the applicable exemption documentation;
- VEVOR asked Elevation to indicate anticipated purchasing volume before choosing the commercial path.

Private discount percentages, commercial thresholds, and other supplier terms remain outside public Git.

Next action:
- do not invent or commit purchasing volume;
- determine whether the first use case is direct-site dropship or a defined bulk purchase;
- verify exact SKU/source mapping for any VEVOR-branded product before publishing or repricing;
- keep marketplace-restricted VEVOR products off unauthorized channels;
- provide tax-exemption documentation only through the appropriate verified VEVOR relationship path when required.

Close when:
- the approved direct-channel operating model is selected;
- tax/account setup is complete where needed;
- SKU/source mapping, fulfillment, returns, pricing rules, and inventory workflow are verified;
- first controlled order proves the process or VEVOR is kept as a backup/rejected.

## 12. Paid marketplace order tracking exception

**Status:** CUSTOMER ESCALATION / TRACKING NOT YET VERIFIED  
**Priority:** Immediate

A paid marketplace customer reported that several days have passed without tracking progress on an order.

A Gmail search did not surface a matching supplier shipment/tracking confirmation from the information presently available in correspondence.

Do not place the customer name, address, order number, or other PII in this repository.

Next action:
- identify the exact supplier/source order tied to the marketplace sale;
- verify whether the order was actually submitted, accepted, shipped, delayed, canceled, or otherwise blocked;
- obtain valid tracking or an accurate fulfillment status;
- respond to the customer promptly through the marketplace once the status is verified;
- if fulfillment has failed, use the applicable recovery/refund process rather than allowing the order to age silently.

Close when:
- verified fulfillment/tracking status is known;
- the customer has been accurately updated;
- the order is moving or has been properly recovered/refunded;
- the root cause is captured in the order workflow if a process failure occurred.

## Control rule

**TRACK UNTIL CLOSED.** New email facts become active management state only after reconciliation into Git. Gmail remains correspondence-only; Git remains the management source of truth.

**NO DOUBLE SEND.** Before any external send, verify the current thread for already-sent correspondence and current unsent drafts. When a response has already been sent, stale drafts for the same response must not be sent. When a valid draft is pending owner review, update or supersede that draft rather than creating a parallel outbound response.
