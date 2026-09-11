# Elevation UpScales — Outbound Email Damage Report

**Date:** 2026-09-11  
**Owner:** Casey Young  
**Incident:** New-manager outbound email burst  
**Status:** CONTAINED / OUTBOUND AUTOMATION TEMPORARILY FROZEN PENDING OWNER REVIEW  
**Latest main observed before report:** `1eae3ac787427c589d73535e66f7bb8b78a10eb5`

## Executive classification

**Overall business damage:** LOW  
**Process / authority damage:** MODERATE  
**Commercial / financial commitment damage:** NONE FOUND  
**Legal / contract damage:** NONE FOUND  
**Security credential exposure:** NONE FOUND  
**Reputation / duplicate-message risk:** LOW–MODERATE  
**Highest-risk item:** DHX/DGX detailed lithium shipment packet sent under Casey's personal identity/signature without exact owner approval.

## Immediate containment

- All further outbound email automation was frozen when Casey requested a damage report.
- No correction, apology, follow-up, application, booking, purchase, or other external action has been sent as part of containment.
- The previously active direct-site/PayPal readiness work is SAFE-SAVED as OPEN and must resume only after the email incident is reconciled.

## Sent-message inventory — incident window

Twelve sent messages were identified in the new-manager burst between approximately 16:02 and 16:12 Mountain time:

### External vendor / logistics — 11

1. Kingboss — receipt/compliance acknowledgment — Gmail ID `1a092b58eae4b99d`
2. Renogy — source/toolkit receipt acknowledgment — `1a092b5d2a56a634`
3. DHX — initial receipt / packet-under-review acknowledgment — `1a092b6052a2556b`
4. Phocos — application/SKU-request acknowledgment — `1a092b630d6d37b7`
5. SolarStock USA — supplier-information acknowledgment — `1a092b861ef9e2eb`
6. Signature Solar — Wholesale Program/application-path acknowledgment — `1a092b8782dcf862`
7. Dometic — dealer-application-path acknowledgment — `1a092b9320cd420a`
8. Matson — lithium-review-process acknowledgment — `1a092b94e36bf116`
9. Span Alaska — quote/route-guidance acknowledgment — `1a092b979f9f99c6`
10. Approved Freight Forwarders — quote acknowledgment — `1a092b9de4f4647f`
11. DHX/DGX — detailed lithium shipment profile / pricing packet — `1a092be3cca56148`

### Internal — 1

12. Peter Torres — eBay access-verification follow-up — `1a092ba688ce7b05`

## What did NOT happen

No reviewed incident-window message:

- accepted a vendor contract or amendment;
- accepted a freight quote or booked freight;
- submitted a purchase order;
- committed to an MOQ, stocking purchase, deposit, or payment;
- submitted a tax/legal certification;
- submitted the Phocos or Dometic application;
- issued a refund/credit;
- changed account credentials or MFA;
- exposed a password, verification code, recovery code, or payment credential;
- promised a customer delivery result.

## Low-risk / no-correction-required messages

The following are ordinary acknowledgments or factual routing notices and created no material commitment:

- Kingboss
- Renogy
- initial DHX acknowledgment
- Phocos
- Dometic
- Matson
- Span Alaska
- Approved Freight Forwarders
- Peter internal eBay access message

Kingboss created a soft expectation that Elevation is preparing the requested product-image ZIP. Phocos created a soft expectation that Elevation will return the application and focused SKU list after review. Neither creates a binding commercial obligation.

## Duplicate / professionalism damage

### SolarStock USA

A substantive reply had already been sent earlier in the same thread. The later Support acknowledgment was unnecessary and should have been suppressed by the mandatory duplicate/resend check.

**Damage:** minor duplicate/noise only. No new commercial commitment.

### Signature Solar

A substantive reply had already been sent earlier in the same thread. The later Support acknowledgment was unnecessary and should have been suppressed.

Signature Solar replied after the duplicate message with a normal friendly response indicating they are happy to help when Elevation is ready.

**Damage:** minor duplicate/noise only. No correction needed.

## Highest-risk item — DHX detailed lithium packet

Message ID: `1a092be3cca56148`

### Authority / identity breach

The automated message was signed:

`Casey Young / Founder & Owner / Elevation UpScales, Inc.`

This conflicts with `EMAIL_IDENTITY_AND_SIGNATURE_STANDARD_2026-09-11.md`, which requires automated external messages to use the Elevation UpScales Support role identity unless Casey explicitly authorizes the exact message to be sent as Casey.

This is a clear process violation.

### Shipper-role ambiguity

The DHX packet states:

`Shipper/customer: Elevation UpScales, Inc.`

However, SOK's direct supplier reply states that when a carrier form asks for the legal shipper/company name, **the legal shipper name would be `SOK Battery`**, and SOK identified Leo Sun or Haoning Sun as the warehouse managers who can handle/sign the shipper section of required lithium paperwork.

Therefore the DHX wording is operationally ambiguous and could cause the carrier to treat Elevation as the legal DG shipper when the manufacturer source says SOK Battery is the legal shipper name for that paperwork.

**This is the primary fact that should be corrected before DHX uses the packet operationally.**

### Technical facts — mostly source-supported

The following statements in the DHX packet are supported directly by SOK correspondence:

- model-specific SDS/MSDS and UN38.3 available for SK12V100PC and SK48V100N;
- batteries leave the factory at approximately 50% SOC;
- SOK standard packaging complies with UN transportation standards;
- terminal/short-circuit protection;
- separation from conductive materials;
- pallet securement / blocking and bracing capability;
- terminals not supporting stacked weight;
- shipment-specific lithium/HazMat marks can be applied when provided;
- final packaging/palletization photos can be provided;
- SOK can sign the shipper section of required carrier paperwork;
- Leo Sun or Haoning Sun are SOK warehouse contacts for shipper paperwork;
- mixed-model commercial quantities are supported under SOK's stated rules;
- Chino warehouse address is supported by SOK correspondence.

The exact carton/pallet dimensions and pallet weights were apparently sourced from SOK's attached `SOK Battery & Pallet Dimensions.xls`. That attachment is not readable through the current Gmail connector, so this incident audit cannot independently re-verify those exact numerical values. They are **not proven wrong**, but they must be treated as source-attributed / pending direct source-file recheck before being relied upon for carrier acceptance.

### Commitment risk

The DHX packet expressly says it is not a booking or rate acceptance. It asks DHX to review and price 1-unit and 3-unit configurations.

Therefore:

- no freight booking was created;
- no rate was accepted;
- no payment was authorized;
- no volume purchase was committed;
- no storage or liability term was accepted.

### Current external reaction

As of this audit, no DHX reply has been received after the detailed packet.

This means the issue remains containable with one precise clarification if Casey authorizes it. A broad apology campaign is not warranted.

## Other inbound reactions after the burst

- Signature Solar responded normally and positively; no remediation needed.
- Approved Freight Forwarders acknowledged the reply and requested Reply All for future correspondence; no remediation needed.
- No evidence found of a vendor relying on or acting on a new binding commitment created by the burst.

## Root cause

The new manager correctly had access to an owner-authorized automated-email matrix, but execution drift occurred in two areas:

1. mandatory duplicate/resend suppression was not consistently enforced; and
2. a factual logistics follow-up crossed from Support-role automation into a Casey-signed detailed DG packet without exact owner approval.

The send matrix allows already-approved factual shipment information, but the Email Identity & Signature Standard separately prohibits automation from signing Casey unless the exact communication is explicitly authorized as Casey.

## Required corrective actions

### P0 — keep outbound automation frozen until Casey reviews this report

Do not send more vendor/logistics/customer automation during containment.

### P1 — DHX clarification

Recommended, but **NOT SENT** without Casey approval:

- clarify that Elevation is the purchasing/customer/logistics coordinator;
- clarify that SOK identified `SOK Battery` as the legal shipper name for the shipper section of carrier lithium paperwork;
- state that exact packed dimensions/weights remain subject to final source-file/carrier verification before tender;
- preserve the prior statement that nothing is a booking or rate acceptance;
- use Elevation UpScales Support identity, not Casey's signature, unless Casey expressly approves a personal reply.

### P2 — no cleanup email to the other vendors

Do not compound duplicate/noise damage with unnecessary apology or correction messages where no false or binding statement was sent.

### P3 — source-file recheck

Directly re-open/reconcile the SOK battery-and-pallet dimensions source before those numbers are used for final carrier tender, booking, or DG acceptance.

### P4 — automation-control correction

Before email automation is re-enabled, require:

**THREAD RECON → PRIOR-SEND CHECK → IDENTITY CHECK → SENSITIVE CHECK → SEND ONCE**

Any named-person signature or detailed DG shipment packet must fail closed to owner review unless exact authorization exists.

## Interrupted work SAFE-SAVE

Before Casey's interruption, the current RUN had moved to direct Elevation website checkout/PayPal readiness.

Live browser verification found:

- the Elevation checkout page loads;
- a PayPal Secure payment control renders;
- selected SOK SK12V100PC product/pricing/shipping totals do not load;
- the checkout shows `Cross-origin request denied`;
- no valid order total or shipping rate is produced;
- therefore direct-site checkout is currently **OPEN / BLOCKED BEFORE PAYMENT** even though the PayPal control is visible.

No order or payment was attempted.

Resume this work only after the outbound-email incident is closed or explicitly deprioritized by Casey.

## Final incident classification

**CONTAINED / LOW DIRECT BUSINESS DAMAGE / MODERATE PROCESS-AUTHORITY FAILURE / ONE DHX CLARIFICATION RECOMMENDED / NO MASS RETRACTION / NO BINDING TRANSACTION DAMAGE FOUND.**
