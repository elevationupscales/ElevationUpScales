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

Before outbound owner review:

**RECON → EXISTING THREAD CHECK → SENT/DRAFT/CASE/APPLICATION CHECK → RESEND JUSTIFICATION CHECK → NO-DUPLICATE VERIFICATION**

No external email send or form submission without Casey authorization unless Casey explicitly pre-authorized that send class.

For ordinary communications, one Casey approval is enough to execute once, verify, record receipt and update the Worktree.

## Email identity and signature control

All outbound email under this lane must follow `EMAIL_IDENTITY_AND_SIGNATURE_STANDARD_2026-09-11.md`.

Current approved identity model:

- `elevationupscales@gmail.com` = verified technical/system sending mailbox and Google-connected backend identity.
- `casey@elevationupscales.com` = owner/executive business identity and Casey-specific reply path.
- `sales@elevationupscales.com` = default team sales/vendor/customer-commerce reply identity.
- `elevationlithium@gmail.com` = `DISABLED / DO NOT USE`.

Do not claim a domain address was the technical sender unless outbound `Send As` capability for that address is actually verified.

Automated/system-generated external messages represent the **company or role**, not a named person. They use the applicable role signature from the Email Identity & Signature Standard.

**AUTOMATION MAY REPRESENT THE COMPANY; IT MAY NOT SILENTLY PRETEND TO BE CASEY, PETER, OR ANOTHER PERSON.**

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
