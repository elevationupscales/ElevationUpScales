# Elevation UpScales — Inbox Operations Routing SOP

**Status: ACTIVE / CONTROLLING**  
**Effective: 2026-09-09**  
**Owner: Casey Young**

## Purpose

Use automated inbox workers as an **operations sensor and dispatcher**, not as a replacement management system and not as an autonomous commercial decision-maker.

The operating model is:

**INBOX WORKER FINDS → CLASSIFIES → ROUTES → COMPANY OPERATIONS MANAGER DECIDES / ROUTES WHEN A DECISION IS ACTUALLY NEEDED → SPECIALIST EXECUTES → WORKER WATCHES FOR REPLY → COMPANY OPERATIONS RECORDS RESULT**

Throughout this SOP, references to **Operations** or **OPERATIONS DECIDES** mean the **Company Operations Manager decides / routes** within company-operational scope.

Gmail remains correspondence. GitHub `/operations/` and current workstream issues remain the public-safe management/source-of-truth layer.

## Priority detection

Inbox workers should surface material business email in this order:

1. customer/order problems and money-at-risk issues;
2. supplier/vendor approvals, pricing/MAP, stock, portal, media, order-flow or fulfillment changes;
3. Hawaii/Alaska/freight/receiving/DG changes that unlock or block movement;
4. B2B, installer, retailer, project or strategic partnership opportunities;
5. website/deployment consequences created by a verified operational change;
6. routine mail only when action is actually required.

Do not summarize or escalate routine newsletters, automated notices or low-value correspondence merely to create activity.

## Classification before action

Classify each material message into the narrowest applicable lane:

- CUSTOMER / ORDER
- SUPPLIER / VENDOR ONBOARDING
- FREIGHT / LOGISTICS
- HAWAII / ALASKA PROOF MOVEMENT
- B2B / PARTNERSHIP
- WEBSITE / DEPLOYMENT CONSEQUENCE
- ROUTINE / NO ACTION

The inbox worker should not jump directly from a detected email to a code, Shopify, checkout, pricing, logistics or commercial change unless that authority has been explicitly delegated.

## Fast path — do not create unnecessary decisions

Not every material email requires a Company Operations Manager decision or a new GitHub issue.

Use **NO DECISION NEEDED — WORKSTREAM UPDATE** when the message only supplies expected factual progress and does not require a new commercial, safety, payment, customer-resolution, shipment, pricing or production decision.

Examples include:

- a vendor sends an expected catalog, media packet, portal link or stock file;
- a freight partner supplies requested documentation without changing the approved lane;
- a supplier confirms an already-approved operational detail;
- a workstream receives routine progress that can be recorded and executed under an existing SOP.

For these cases:

**ROUTE TO THE EXISTING WORKSTREAM → UPDATE PUBLIC-SAFE STATE → CONTINUE EXECUTION UNDER EXISTING AUTHORITY.**

Do not create a new `OPS INTAKE` item merely to acknowledge progress.

Create a Company Operations intake only when there is a real decision, blocker, exception, conflict, risk, commitment or missing authority.

Customer/order money-at-risk issues should be escalated immediately to the owning customer/order lane and owner as needed; do not delay urgent resolution by waiting for a generic Company Operations intake cycle.

Once a thread has an exact active workstream, keep future material updates on that workstream until it closes unless the issue genuinely moves into a different ownership lane.

## Routing rule

**Reuse an existing active issue only when it is the exact workstream.**

Do not turn old coordination/review issues into permanent catch-all Operations inboxes.

If no correct active issue exists **and a decision is actually required**, create a narrow public-safe Company Operations intake item using:

`OPS INTAKE — <Company / Topic> — <Decision Needed>`

The intake should contain only:

**WHO → WHAT CHANGED → WHY IT MATTERS → EVIDENCE STATE → DECISION REQUESTED → NEXT ACTION**

Do not place raw correspondence, customer PII, supplier costs, private pricing, carrier rates, private documents, credentials, inventory snapshots or negotiated terms in public GitHub.

## Decision vocabulary

Use a small, lane-appropriate decision set.

For shipment / proof-movement qualification:

- **APPROVE FOR PROOF MOVEMENT**
- **HOLD**
- **REJECT**

For general operational intake:

- **APPROVE TO PROCEED**
- **NEED MORE INFO**
- **HOLD**
- **REJECT**

For material updates that need routing but no new approval:

- **NO DECISION NEEDED — WORKSTREAM UPDATE**

Approval authorizes only the stated lane. It does not automatically authorize unrelated website, pricing, checkout, supplier, freight or production changes.

## Inbox worker authority

Inbox workers may:

- read current correspondence;
- identify what materially changed;
- compare the message with current public-safe operating state;
- gather already-known facts needed to frame the decision;
- route the item to the correct active workstream;
- record a public-safe workstream update when no new decision is needed;
- create a narrow intake only when a decision is actually required and no correct active workstream exists;
- prepare a draft when drafting authority exists;
- monitor the thread for the next reply;
- report a concise management alert.

Inbox workers may not, without explicit authority:

- approve lithium/DG acceptance;
- approve commercial pricing or supplier terms;
- approve refunds or payment actions;
- commit vendor/customer relationships;
- change Shopify/site/checkout behavior;
- change production configuration;
- expose protected commercial information;
- send external business email merely because the worker detected a message.

## Recipient and MIP safety

Before every external draft or send, verify:

**TO → CC → THREAD HISTORY → ATTACHMENTS → BODY → WHO CAN SEE WHAT**

Do not reply into a mixed thread with information intended for only one materially interested party. Prefer a clean external thread when separation is commercially safer.

Never expose another vendor's pricing, supplier costs, private freight rates, customer information, internal margins, negotiation positions or protected partner information.

## Management alert format

Keep owner/manager alerts short enough to understand quickly:

**WHO | WHAT CHANGED | BUSINESS IMPACT | NEXT ACTION / DECISION NEEDED**

Example:

`R&R | confirmed receiving capability for the proposed low-voltage proof movement | removes one destination blocker | Company Operations Manager decision: APPROVE FOR PROOF MOVEMENT / HOLD / REJECT.`

For no-decision updates:

`Kingboss | sent approved media/catalog data | catalog onboarding can continue | NO DECISION NEEDED — routed to vendor onboarding.`

Do not make Casey review every detected message. Surface only material changes, missed actions, risks, opportunities or decisions.

## Execution handoff

After the Company Operations Manager decides / routes, send the decision to the correct execution lane.

Examples:

**EMAIL DETECTED → COMPANY OPERATIONS REVIEW → APPROVE FOR PROOF MOVEMENT → LOGISTICS EXECUTES → ACTUALS RECORDED → WORKSTREAM CLOSED / ADVANCED**

**SUPPLIER APPROVAL EMAIL → VENDOR ONBOARDING REVIEW → APPROVE TO PROCEED → CATALOG / DEV EXECUTES VERIFIED INTAKE → STORE STATE UPDATED**

**EXPECTED VENDOR DATA ARRIVES → NO DECISION NEEDED → EXISTING VENDOR WORKSTREAM UPDATED → CATALOG / DEV CONTINUES UNDER EXISTING AUTHORITY**

**CUSTOMER ORDER PROBLEM → CUSTOMER/ORDER OPERATIONS → APPROVED RESOLUTION → CUSTOMER COMMUNICATION → ORDER RECORD UPDATED**

Website/deployment changes require their own approved development/deployment handoff; an inbox detection alone is not deployment authority.

## Issue #35 boundary

GitHub issue #35 is a historical Website Rebuild Lane C review issue and is **not** the permanent Operations intake destination.

Existing public-safe status already recorded there may remain as historical evidence, but new unrelated Operations escalations should route to the exact active workstream or to a new narrow `OPS INTAKE` issue only when a decision is required.

## Closing principle

**CATCH IMPORTANT EMAIL → ROUTE IT ONCE → ASK FOR THE SMALLEST NECESSARY DECISION ONLY WHEN NEEDED → EXECUTE IN THE CORRECT LANE → KEEP WATCHING THE THREAD.**

The goal is a quiet operational safety net that catches missed business-critical correspondence without recreating management-email bureaucracy.