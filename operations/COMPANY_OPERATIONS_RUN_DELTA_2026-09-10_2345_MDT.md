# Elevation UpScales — Company Operations RUN Delta

**Timestamp:** 2026-09-11 00:14 MDT  
**Owner:** Casey Young  
**Role:** Company Operations Manager  
**Mode:** RUN / GIT FIRST / BLOCKED TO BACK / CONTINUE FINISHABLE WORK / DEDUPE BEFORE SEND

## VEVOR customer-facing activation

The current Shopify store connection remains verified as **Elevation Upscales** on `elevation-upscales.myshopify.com`.

The exact storefront-password action remains unresolved because the authenticated browser route is blocked by a Cloudflare verification challenge before Shopify Admin can be reached. No store setting was changed.

Current classification:

- **WORK ITEM:** VEVOR direct-site storefront activation
- **STATE:** BLOCKED / DEFERRED TO END OF CURRENT FINISHABLE QUEUE
- **BLOCKER:** TECHNICAL ACCESS / authenticated Shopify Admin browser blocked by Cloudflare challenge
- **TRIGGER TO RESUME:** owner/admin session capable of reaching Shopify Admin Online Store password setting without challenge
- **NEXT ACTION ON RESUME:** disable only storefront password protection, save, then immediately re-run unauthenticated VEVOR Direct collection/product/cart/checkout acceptance
- **CLOSE CONDITION:** public storefront/checkout acceptance passes

The connected Shopify Admin API remains available for supported commerce reads, but the current connected action set does not expose the Online Store password setting.

## Complementary vendor activation — current verified queue

### BayWa r.e. Solar Systems

A single commercial-contact submission was completed through BayWa's **Connect with our team** route using Elevation's verified company identity and positioning as a distributor/commercial solar-off-grid business. The submission received an on-page confirmation.

**State:** CONTACTED / WAITING.

**Deduplication control:** do not resubmit the form or open a second BayWa application unless BayWa explicitly requests a new submission or current evidence proves the first attempt failed.

### Winegard

A single Winegard Authorized Seller Program application was completed and submitted. The form returned a **Thank you** confirmation page and did not indicate a prior existing application.

Verified submission facts:

- Elevation UpScales, Inc.
- Casey Young
- `casey@elevationupscales.com`
- `(720) 773-0110`
- `https://elevationupscales.com`
- sales channel: website
- currently sells Winegard products: no
- ordering method: through a distributor
- current Authorized Internet Retailer Agreement was acknowledged as part of the application

No paid service, financing, exclusivity, minimum-purchase commitment or unrelated commercial commitment was added.

**State:** APPLICATION SUBMITTED / WAITING FOR WINEGARD AUTHORIZATION.

**Deduplication control:** do not submit a second Winegard application or reseller request unless Winegard explicitly requests resubmission, the first submission is rejected/expired, or another current verified reason exists.

### Micro-Air

Official Dealer Central still requires dealer-account creation followed by the **Micro-Air, LLC. – Dealer Application** and business-document review.

Current dedupe check found no supplier-directed Micro-Air outreach/application thread; the only current Gmail hit was the internal Operations handoff instructing no duplicate outreach.

**State:** QUALIFIED / OWNER-REVIEW APPLICATION GATE.

**Next safe action:** keep the application/document checklist ready. Do not create/submit the dealer account until that owner-review gate is intentionally cleared.

### KISAE Technology

A dealer/ecommerce partnership inquiry has already been sent from Elevation.

**State:** CONTACTED / WAITING.

**Control:** do not duplicate outreach.

### Solarflexion

Current official Solarflexion source states that it services both **B2C and B2B inquiries** and provides project procurement, stock checks, project quotes, freight shipment support and a direct sales contact route.

A Gmail dedupe check found no prior direct `@solarflexion.com` correspondence. One bounded commercial/B2B inquiry was therefore sent to `sales@solarflexion.com` asking only for the correct commercial-account path, project/business pricing, reseller terms if offered, job-site/direct shipping, freight, inventory checks, data/media, warranty/RMA and channel rules.

Sent message ID: `1a08f19a1049d012`.

The message explicitly stated that Elevation is **not assuming reseller authorization** and will follow Solarflexion's required account/channel structure.

**State:** CONTACTED / WAITING.

**Deduplication control:** do not send another Solarflexion introduction or account inquiry unless the current message fails/bounces, Solarflexion requests resubmission, or another verified reason exists.

### Airxcel / Coleman-Mach

The first brand-specific dealer route has been prepared through Coleman-Mach rather than a generic Airxcel-wide inquiry.

**State:** QUALIFIED / OWNER-REVIEW EXTERNAL CONTACT READY.

Do not misroute dealer onboarding to a support inbox and do not duplicate a brand inquiry once submitted.

## eBay real-customer exception

Order **10-15134-90489** has a verified buyer cancellation request in eBay email. Company Operations attempted one idempotent browser action limited to that order: inspect current status and cancel/refund only if still unshipped.

Result: the browser workflow could not authenticate to eBay because no saved eBay credentials were available. No order, refund, listing, message or account setting was changed.

Current classification:

- **WORK ITEM:** eBay order `10-15134-90489` cancellation request
- **STATE:** AUTHENTICATION BLOCK / DEFERRED TO END OF CURRENT FINISHABLE QUEUE
- **BLOCKER:** authenticated eBay account access unavailable to current browser run
- **TRIGGER TO RESUME:** legitimate authenticated eBay session available
- **NEXT ACTION ON RESUME:** inspect the existing cancellation request only; if already canceled/refunded, stop; if still open and unshipped, approve the existing cancellation and issue the normal full refund; if shipped, preserve shipment and do not cancel
- **DUPLICATION CONTROL:** do not start another cancellation/refund attempt while an existing action or completed cancellation exists

## Outbound deduplication control

All managers, specialists, workers, GPTs and browser/Gmail actions follow:

**VERIFY BEFORE SEND → ONE THREAD / ONE FORM / ONE CURRENT ATTEMPT → RESUBMIT ONLY WITH VERIFIED REASON.**

Before any new supplier/application send:

1. check current Git state;
2. search Gmail for prior sent thread/application/confirmation/bounce;
3. verify no browser/form attempt is already running;
4. if state is uncertain, place only that item on `DEDUPLICATION HOLD` and continue the next finishable worktree.

## Current execution order after this delta

1. VEVOR storefront-password action remains OPEN but deferred until authenticated Shopify Admin access clears.
2. eBay order `10-15134-90489` remains a real customer exception but is deferred only because authenticated eBay access is unavailable; resume immediately when legitimate access exists.
3. BayWa is CONTACTED / WAITING — no resubmission.
4. Winegard is APPLICATION SUBMITTED / WAITING — no resubmission.
5. KISAE is CONTACTED / WAITING — no duplicate outreach.
6. Solarflexion is CONTACTED / WAITING — no duplicate outreach.
7. Micro-Air remains an owner-review application gate; prep only until cleared.
8. Coleman-Mach is the prepared Airxcel brand-specific route and remains at owner-review external-contact gate.
9. Renogy and other dedicated vendor projects continue under their assigned project managers; Company Operations does not take over their specialist worktrees.

**CONTROL:** BLOCKED GOES TO THE BACK — FINISHABLE WORK MOVES FORWARD — NOTHING DISAPPEARS — NO DOUBLE SEND WITHOUT VERIFIED RESUBMISSION CAUSE.
