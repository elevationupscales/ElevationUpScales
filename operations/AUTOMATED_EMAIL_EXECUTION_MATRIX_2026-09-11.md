# Elevation UpScales — Automated Email Execution Matrix

**Owner:** Casey Young  
**Effective:** 2026-09-11  
**Status:** ACTIVE OWNER-AUTHORIZED SEND-CLASS STANDARD  
**Parent controls:** `MASTER_SOP_V1_0.md` → `GMAIL_EMAIL_NETWORK_SOP_V1_0.md` → `EMAIL_IDENTITY_AND_SIGNATURE_STANDARD_2026-09-11.md`

## Purpose

Define which routine external emails may be sent automatically without separate per-message Casey approval so company work keeps moving, while preserving all protected owner gates.

This standard applies to **email only**. It does not authorize SMS/text-message automation.

## Mandatory pre-send controls for every automated external email

Before a message can use an automated/pre-authorized send class:

**IDENTIFY PROJECT/WORKTREE → THREAD RECON → VERIFY CURRENT FACTS → DUPLICATE/RESEND CHECK → VERIFY RECIPIENT → CLASSIFY ORDINARY vs SENSITIVE → APPLY APPROVED SUPPORT IDENTITY/SIGNATURE → SEND ONCE → VERIFY SEND → RECORD RECEIPT / ROUTE MATERIAL UPDATE**

If any step is uncertain, stop the automated send and route the item for review.

The message must stay inside an established Project/Worktree or an already-authorized outreach lane. Automation does not create a new Project, relationship, commercial promise, or authority.

## PRE-AUTHORIZED — may send automatically

The following classes are owner-authorized for routine automated execution when all pre-send controls pass:

### 1. Receipt / acknowledgment
- acknowledge receipt of a vendor, partner, logistics, website, or customer message;
- confirm a document/application/update was received;
- state that the matter has been routed or is being reviewed;
- do not promise approval, pricing, payment, delivery outcome, or other unverified result.

### 2. Existing vendor / partner factual follow-up
Inside an existing authorized vendor/partner Project or active relationship:
- request missing catalog/SKU/UPC/specification/media information;
- request factual availability, inventory, lead-time, warranty, RMA, shipping, fulfillment, blind-shipping, tracking, portal, MAP-policy, compliance-document, or support-process information;
- request a status update on an already-submitted application/onboarding item;
- transmit an already-approved routine packet or factual operating information;
- clarify nonbinding operational facts.

Automation may ask for facts. It may not accept or create new binding terms.

### 3. Existing logistics / fulfillment factual follow-up
Inside an authorized Shipping/Logistics or Vendor Worktree:
- request shipment specifications, packaging data, routing capability, storage capability, handling requirements, tracking, status, or documentary evidence;
- follow up on an already-requested quote or capability review;
- provide already-approved factual shipment data.

Do not automatically accept a quote, book freight, commit volume, create liability, or agree to storage/payment terms.

### 4. Website / direct Elevation customer support
For ElevationUpScales.com inquiries and direct website orders:
- acknowledge an inquiry/order/support request;
- provide factual order/payment receipt status already proven by the platform;
- provide verified processing/shipping/tracking status;
- request missing customer information needed to complete an existing order/support case;
- provide ordinary support instructions already approved in the relevant workflow;
- provide factual checkout/support follow-up.

Do not automatically issue refunds/credits, promise compensation, change material order terms, or make an unverified delivery promise.

### 5. Routine existing-thread operational status
- report a verified project/account/application/order/logistics status already present in the controlling Worktree or platform evidence;
- tell a counterpart what information is still needed;
- tell a counterpart that an exact item is pending external review;
- close a routine thread when the verified close condition is met.

### 6. Pre-approved outreach lane execution
A first-contact or follow-up outreach message may send automatically only when:
- the target is already explicitly approved/qualified/queued in a controlling Project/Worktree; AND
- the outreach class/template is already authorized by that Project/Worktree; AND
- dedupe confirms the message/application has not already been sent/submitted.

Automation may not create its own prospect list and begin new external outreach without an authorized lane.

### 7. Internal company routing
Internal management/worker messages, handoffs, receipts, reminders, and routing notices may be automated within existing authority and use the internal Operating System identity/signature.

## OWNER APPROVAL REQUIRED — never auto-send

The following remain protected even when a routine thread exists:

- contracts, amendments, exclusivity, legal commitments or acceptance of terms;
- binding prices, discounts, rebates, customer-specific quotes, margin commitments, or price exceptions not already approved by a controlling pricing rule;
- purchases, purchase orders, inventory buys, deposits, payments, financing, credit applications, bank/payment changes;
- refunds, credits, chargeback concessions, settlements, compensation, or material customer remedies;
- commitments to MOQ, volume, stocking, delivery guarantees, freight/storage liability, insurance, or commercial minimums;
- tax/legal certifications, signed forms, representations, attestations, or government filings;
- security credentials, password/MFA/recovery changes, admin ownership changes, access grants, account recovery, or identity changes;
- any SYSTEM SENSITIVE or BUSINESS SENSITIVE message;
- any message that materially changes a previously owner-approved sensitive draft;
- any message signed as Casey, Peter, or another named person unless authorized under the Email Identity & Signature Standard;
- any automated email using a retired/disallowed identity;
- any uncertain resend, duplicate application, or message whose prior execution result is UNKNOWN.

## Priority / continuity rule

Routine email automation exists to keep work moving; it must not become another management gate.

**SEND CLEAN ROUTINE WORK → ROUTE MATERIAL UPDATES → HOLD ONLY THE SENSITIVE/UNCERTAIN ITEM → CONTINUE THE REST OF THE WORKTREE.**

During the startup revenue phase, non-Elevation-website marketplace/customer issues remain lower-priority parallel work under `STARTUP_REVENUE_PHASE_NONBLOCKING_ORDER_STANDARD_2026-09-11.md`.

## Sender / signature rule

For automated vendor/partner and website/customer external mail:
- technical sender: `elevationupscales@gmail.com`;
- public role identity/contact: `Elevation UpScales Support` / `support@elevationupscales.com`;
- use the appropriate Vendor & Partner Support or Customer & Website Support signature defined in `EMAIL_IDENTITY_AND_SIGNATURE_STANDARD_2026-09-11.md`;
- never falsify the actual From header;
- never silently impersonate Casey, Peter, or another person.

## Material inbound/outbound state

If an automated exchange creates a meaningful operating update, it must enter the Email Commerce Update bridge:

**EMAIL / REPLY → THREAD RECON → VERIFIED CHANGE → PROJECT ROUTE → WORKTREE INCORPORATION → CLOSE**

Routine sends do not need to clutter the Master Workboard unless they create a material cross-Project state change.

## Control phrase

**AUTOMATE FACTUAL CONTINUATION → NEVER AUTOMATE NEW OBLIGATIONS → SUPPORT SIGNS → VERIFY ONCE → RECORD → KEEP MOVING.**
