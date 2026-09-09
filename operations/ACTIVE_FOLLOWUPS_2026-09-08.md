# Active Commerce & Supplier Follow-Ups — 2026-09-08

**Owner:** Elevation UpScales Management  
**Status:** ACTIVE  
**Source of truth:** GitHub `/operations/`

This file tracks current action items that must remain visible until closed. It intentionally excludes private identity documents, supplier costs, carrier rates, private partner pricing, customer PII, credentials, and other protected commercial/logistics details.

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

**Status:** POSITIVE OPERATIONS RESPONSE / OWNER DECISION + DOCUMENT PACKAGE PENDING  
**Priority:** High

An additional logistics provider reports that its operations team believes it can generally support Elevation's Hawaii program. Lithium battery storage may require additional warehouse safety measures.

The provider asked whether Elevation would consider either a longer-term/minimum commercial commitment if facility investment is required or use of an approved third-party warehouse if the current facility is not suitable. It also requested the SDS and UN38.3 summaries for both starter battery models for operational review.

This is **not final warehouse acceptance** and no commercial commitment has been authorized.

Next action:
- owner review of the proposed commercial/warehouse paths before any commitment;
- determine whether to provide the exact-model SDS/UN38.3 review package;
- obtain written confirmation of the actual receiving/storage scope, site, safety requirements, release process, and commercial structure;
- keep any private rates, minimums, facility details, and contract terms outside public Git.

Close when:
- a specific receiving/storage site is accepted or rejected;
- lithium handling scope and document requirements are confirmed;
- any commercial commitment receives owner approval;
- the option is activated or removed from active qualification.

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
