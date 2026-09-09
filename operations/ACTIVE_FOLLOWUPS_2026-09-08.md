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

A Hawaii-side receiving/storage partner has responded positively and described a prior comparable receiving/storage/release model. Elevation has now sent a follow-up to qualify the current operating structure for new standalone LiFePO4 inventory, inbound receiving, storage, customer/installer release, delivery, documentation, handling limits, claims procedure, and account/onboarding requirements.

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

## 3. Hawaii low-voltage handling / sample-forwarder path

**Status:** ACTIVE QUALIFICATION / REPLY DRAFT PENDING OWNER REVIEW  
**Priority:** High

A separate Hawaii commercial partner has expressed interest in storing and handling Elevation's low-voltage consumer inventory, potentially supporting walk-in retail from Elevation-owned stock, and exploring sample-shipment cost through an established battery forwarder.

Do not treat this as confirmed standalone-LiFePO4 acceptance or as carrier approval. The partner's established 48V / high-voltage supplier relationships are outside the intended scope and should not be disrupted.

**Correspondence control:** one current reply draft exists and remains unsent pending owner review. Do not create or send a second partner reply in parallel. If management changes the response, update or supersede the existing draft rather than creating a duplicate-send risk.

Next action:
- confirm whether standalone low-voltage LiFePO4 batteries are included in the handling offer;
- identify the accepting forwarder/carrier path for a narrow SOK sample shipment;
- obtain exact receiving, packaging, labeling, documentation, signer/responsibility and tender requirements;
- confirm receiving/storage/customer-release commercial structure outside public Git;
- reconcile qualified route facts into `SOK_HAWAII_FIRST_ORDER_READINESS.md`.

Close when:
- standalone-lithium scope is confirmed or rejected;
- a sample forwarder path is qualified or rejected;
- the partner's operating role is documented;
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

**Status:** MULTI-ROUTE REVIEW ACTIVE / NO FINAL ACCEPTANCE  
**Priority:** High

Current carrier/forwarder qualification advanced on multiple paths:

- a fresh exact single-unit terminal-to-terminal quote was received for one current SOK rack-battery profile;
- another provider is reviewing the battery details with its logistics team and will return corrected hazardous-material charges;
- a separate ocean/FCL inquiry was routed internally to the provider's Hawaii team for review.

Private carrier identities, rates, quote references, and protected route details remain outside public Git.

**A quote, internal routing, or hazmat-charge review does not by itself establish dangerous-goods acceptance or shipment release.**

Next action:
- obtain current written exact-SKU acceptance on the best candidate route;
- obtain the route-specific packaging, marking, labeling, paperwork, signer/responsibility and tender requirements;
- reconcile only qualified route facts into `SOK_HAWAII_FIRST_ORDER_READINESS.md`;
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

The Renogy partner application has been filled in internally to the extent possible and returned for Casey to review. Required supporting business documents and owner-level attestations still need final review before anything is submitted externally.

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

**Status:** EXECUTION PREP  
**Priority:** High

Current first-wave publishing order:

1. Solar panel cable connectors
2. 20W 12V solar battery charger with MPPT
3. 50W mono solar battery charger with MPPT

Primary remaining gates:
- current supplier stock/freshness;
- actual dropship shipping cost/service;
- returns/fulfillment details;
- final spec/compatibility verification;
- complete product descriptions where needed;
- adequate product media/images.

Lower-margin candidate products remain draft-only until shipping/fees are proven workable.

Close each SKU only after its supplier, shipping, content, media, spec, and margin checks are complete.

## 10. SOK product media expansion

**Status:** REQUEST SENT / WAITING ON SOK  
**Priority:** High

Elevation sent SOK a dedicated marketing-media request for a broader manufacturer-approved media set and channel-use guidance. Most current SOK catalog listings still have only one primary usable product image, so the objective remains to improve presentation without scraping, inventing, or using unapproved media.

Request covers, where available:
- multiple high-resolution product angles;
- connection/terminal/detail photos;
- installation/application/lifestyle imagery;
- 48V rack/cabinet/system imagery;
- approved feature/spec graphics;
- current brochures, spec sheets, and manuals;
- SOK logos/brand assets;
- short product videos or dealer-approved video assets;
- a dealer media folder/feed if one exists;
- clear channel-use permission or restrictions for Elevation website, Shopify, social media, eBay, TikTok Shop, and other marketplaces.

Public SOK storefront reference:
`https://elevationupscales.com/sok-batteries`

Close when:
- SOK replies;
- approved media is received/linked;
- channel-use boundaries are documented;
- media is assigned SKU-by-SKU without unsupported claims or duplication.

## Control rule

**TRACK UNTIL CLOSED.** New email facts become active management state only after reconciliation into Git. Gmail remains correspondence-only; Git remains the management source of truth.

**NO DOUBLE SEND.** Before any external send, verify the current thread for already-sent correspondence and current unsent drafts. When a response has already been sent, stale drafts for the same response must not be sent. When a valid draft is pending owner review, update or supersede that draft rather than creating a parallel outbound response.
