# Elevation UpScales — Gmail Email Network S.O.P. V1.0

**Version:** 1.0  
**Reports through:** Company Operations / Hybrid Management  
**Status:** CONTROLLING COMMUNICATION-LANE S.O.P.

## Role

The Gmail Email Network is a complementary communication Project/lane supporting authorized Leads, Prospector, Gmail Specialists and related communication workers.

It does not replace the affected Vendor, Logistics, Sales, Customer, Warranty or other Project.

## Incoming classification

Gmail Specialists perform first-pass classification:

### ORDINARY EMAIL
No material OS state change.

### OS UPDATE REQUIRED
Material change to vendor/partner status, order, quote, approval, shipping condition, warranty state, catalog/account state, customer obligation, gate or another meaningful operating fact.

Flow:

**EMAIL RECEIVED → THREAD RECON → CLASSIFY → RECORD SOURCE/TIMESTAMP → MANAGEMENT COMMUNICATION LANE → HYBRID MANAGEMENT ROUTES → PROJECT RECEIVES → PROJECT INCORPORATES → CLOSED**

Gmail identifies/verifies the update but does not become the Project Manager.

## Email Commerce Update fields

**SOURCE THREAD → TIMESTAMP → VERIFIED CHANGE → AFFECTED PROJECT/LANE → PRIOR STATE → NEW STATE → REQUIRED ACTION → ROUTED TO → ACKNOWLEDGED/CLOSED**

Unrouted/unincorporated material email remains OPEN.

## Outbound control

Workers may read/search, reconcile threads, identify follow-up, draft, prepare attachments, fill forms, verify prior sends/applications and prepare execution-ready send-offs.

Before any external send:

**IDENTIFY PROJECT/WORKTREE → THREAD RECON → VERIFY CURRENT FACTS → SENT/DRAFT/CASE/APPLICATION CHECK → RESEND JUSTIFICATION CHECK → NO-DUPLICATE VERIFICATION → CLASSIFY ORDINARY vs SENSITIVE → VERIFY RECIPIENT → APPLY APPROVED IDENTITY/SIGNATURE**

No external email send or form submission occurs without Casey authorization **unless the communication falls inside an owner-pre-authorized send class**.

The controlling routine send classes and protected exceptions are defined in:

`AUTOMATED_EMAIL_EXECUTION_MATRIX_2026-09-11.md`

Owner-authorized routine classes may execute without separate per-message approval only when every matrix pre-send control passes. After execution, verify the send, record the receipt in the applicable Worktree when material, and route any OS state change through the Email Commerce Update bridge.

If classification, recipient, facts, prior-send state, authority, or outcome is uncertain, do not auto-send. Preserve the item OPEN and route for review while unrelated clean work continues.

For ordinary communications outside a pre-authorized send class, one Casey approval is enough to execute once, verify, record receipt and update the Worktree.

## Automated email continuity rule

Routine automated email is intended to keep authorized Projects moving; it must not become another management gate.

Pre-authorized automation may:
- acknowledge receipt;
- continue an existing authorized vendor/partner/logistics thread with factual questions or factual status;
- request missing catalog, SKU, availability, warranty, shipping, fulfillment, compliance or onboarding facts;
- follow up on an already-submitted application/packet/quote request;
- provide verified routine Elevation website inquiry/order/support status;
- perform explicitly authorized/queued outreach using an already-authorized lane/template after dedupe;
- send internal routing/handoff/receipt messages.

Pre-authorized automation may **not** create new legal, financial, commercial, security, pricing, inventory, refund, liability, identity, access, or other protected obligations. The full boundary is controlled by `AUTOMATED_EMAIL_EXECUTION_MATRIX_2026-09-11.md`.

This automated-send authority applies to **email only**. It does not authorize SMS/text-message automation.

## Email identity and signature control

All outbound email under this lane must follow `EMAIL_IDENTITY_AND_SIGNATURE_STANDARD_2026-09-11.md`.

Current approved identity model:

- `elevationupscales@gmail.com` = verified technical/system sending mailbox and Google-connected backend identity.
- `support@elevationupscales.com` = default automated public contact / reply identity for vendor, partner, ecommerce, catalog, website and customer-support automation.
- `sales@elevationupscales.com` = sales-specific business identity when the communication belongs to Sales.
- `casey@elevationupscales.com` = owner/executive business identity and Casey-specific reply path.
- `elevationlithium@gmail.com` = `DISABLED / DO NOT USE`.

Do not claim a domain address was the technical sender unless outbound `Send As` capability for that address is actually verified.

Automated/system-generated vendor/website/customer messages represent **Elevation UpScales Support**, not a named person. They use the applicable Support signature from the Email Identity & Signature Standard.

**MAIN GMAIL SENDS → SUPPORT SIGNS → AUTOMATION MAY REPRESENT SUPPORT; IT MAY NOT SILENTLY PRETEND TO BE CASEY, PETER, OR ANOTHER PERSON.**

A personal signature is allowed only when the named human actually sends/approves the communication as that person or Casey explicitly authorizes the exact message to be sent under that named identity.

Do not include a phone number in automated signatures until the active company phone/contact standard is separately reconciled and verified.

## Sensitive classification

Gmail Specialists may classify:

### SYSTEM SENSITIVE
Could materially affect OS integrity, credentials/security, deployment/access, account recovery or foundational system controls.

### BUSINESS SENSITIVE
Could materially create/change contract terms, pricing commitments, payment/financing obligations, exclusivity, legal/tax certification, inventory commitment, freight/storage liability, commercial promise or similar company obligation.

When uncertain, classify upward.

Hybrid Management may confirm or downgrade the classification.

Sensitive flow:

**PREPARE → RECON → DUPLICATE CHECK → MARK SENSITIVE + REASON → HYBRID MANAGEMENT REVIEW → CASEY REVIEWS FINAL EXACT SEND/SUBMISSION → CASEY AUTHORIZES → EXECUTE ONCE → VERIFY → RECEIPT**

Earlier concept/draft approval does not authorize a materially changed sensitive final version.

No SYSTEM SENSITIVE or BUSINESS SENSITIVE message is automatically authorized by the routine-send matrix.

## Disabled / retired identity control

When Casey retires, disables, or disqualifies an email/Google identity, that direction is immediate and controlling.

A retired identity must not be:

- recovered or reactivated for Elevation operations;
- reused as a worker/manager company identity;
- linked to vendor, ecommerce, logistics, payment, customer, or internal systems;
- used as a login, recovery email, forwarding target, contact address, or mailbox;
- treated as current merely because an older email, handoff, project note, contact record, or platform setting still references it.

Any phone number involved in a retired-account incident is also `RETIRED / DO NOT USE` for Elevation login, MFA, recovery, contact, or verification purposes unless Casey explicitly reauthorizes it.

Do not store incident phone digits in public Git. Preserve the minimum control state needed to prevent reuse.

When a retired identity may have supported an active job or workflow:

**SCOUT SURVIVING THREADS/PLATFORM RECORDS → IDENTIFY AFFECTED JOBS → VERIFY WHETHER THE RETIRED IDENTITY ACTUALLY PROPAGATED → REASSIGN TO AN APPROVED IDENTITY/ACCESS PATH → REMOVE/REPLACE RETIRED CONTACT/RECOVERY VALUES WHERE AUTHORIZED → VERIFY → RECEIPT**

Do not create duplicate outbound communication merely because a retired mailbox is unavailable. Reconstruct from surviving company records and counterpart/platform evidence first.

### Current retired identity notice — 2026-09-11

`elevationlithium@gmail.com` is **DISABLED FOR ALL FURTHER ELEVATION USE** by owner direction.

The account and the phone number involved in its lockout/recovery incident must not be reused, recovered, relinked, forwarded to, or treated as valid Elevation access/contact information. See `ELEVATIONLITHIUM_GMAIL_ACCESS_INCIDENT_2026-09-11.md` for the public-safe impact record.
