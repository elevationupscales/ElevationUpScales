# Active Commerce & Supplier Follow-Ups — 2026-09-08

**Owner:** Elevation UpScales Management  
**Status:** ACTIVE  
**Source of truth:** GitHub `/operations/`

This file tracks current action items that must remain visible until closed. It intentionally excludes private identity documents, supplier costs, carrier rates, private partner pricing, customer PII, credentials, and other protected commercial/logistics details.

## 1. Doba order verification hold

**Status:** ACTION REQUIRED / ORDER AT RISK  
**Priority:** Highest

A current Doba order is under a security/verification hold. Required verification materials must be handled outside Git and submitted only through the appropriate Doba support/verification channel.

**Do not place identity, EIN, billing-address evidence, or other verification documents in this repository.**

Close when:
- verification is accepted or Doba confirms no further submission is required;
- the affected order is released for normal processing;
- fulfillment status is confirmed in the commerce workflow.

## 2. Hawaii receiving / fulfillment partner

**Status:** ACTIVE PARTNER QUALIFICATION  
**Priority:** High

A Hawaii-side receiving/storage partner has responded positively and is confirming its current operating/pricing structure for receiving, short-term storage, customer release/pickup, Oahu delivery, and inter-island movement.

Protected commercial pricing and partner-specific terms remain outside public Git.

Close when:
- current capability is confirmed for new lithium inventory;
- commercial terms are accepted internally;
- first-order receiving/release workflow is documented;
- the partner is either activated or rejected.

## 3. Hawaii low-voltage handling / sample-forwarder path

**Status:** ACTIVE QUALIFICATION  
**Priority:** High

A separate Hawaii commercial partner has expressed interest in storing and handling Elevation's low-voltage consumer inventory, potentially supporting walk-in retail from Elevation-owned stock, and exploring sample-shipment cost through an established battery forwarder.

Do not treat this as confirmed standalone-LiFePO4 acceptance or as carrier approval. The partner's established 48V / high-voltage supplier relationships are outside the intended scope and should not be disrupted.

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

## 4. PayPal business onboarding / checkout support

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

## 5. Shopify first-wave product publishing

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

## 6. SOK product media expansion

**Status:** OUTREACH PREP  
**Priority:** High

Most current SOK catalog listings have only one primary usable product image. Elevation needs a broader manufacturer-approved media set so the SOK line can be presented professionally without scraping, inventing, or using unapproved media.

Request from SOK should cover, where available:
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
