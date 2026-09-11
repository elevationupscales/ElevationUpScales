# Elevation UpScales — Email Identity & Signature Standard

**Owner:** Casey Young  
**Effective:** 2026-09-11  
**Status:** ACTIVE OWNER-AUTHORIZED OPERATING STANDARD  
**Parent control:** `GMAIL_EMAIL_NETWORK_SOP_V1_0.md`

## Purpose

Establish one clear company rule for which email identities Elevation uses, how automated/system-generated emails are signed, and when a message may carry a person's name/title.

## Verified current sending reality

Current Gmail send history proves `elevationupscales@gmail.com` is the active technical outbound mailbox.

`casey@elevationupscales.com` and `sales@elevationupscales.com` are active company-facing/domain addresses in current correspondence and routing, but this standard does **not** claim either domain address is configured as an outbound Gmail `Send As` identity until that capability is separately verified.

Therefore:

**TECHNICAL FROM ADDRESS MAY DIFFER FROM THE BUSINESS IDENTITY SHOWN IN THE SIGNATURE / REPLY PATH.**

Never claim a domain address was the actual sender when the mail platform sent from another address.

## Approved email identities

### 1. `elevationupscales@gmail.com` — SYSTEM / BACKEND MAILBOX

Use for:
- current authenticated Gmail sending path;
- Google-connected administrative operations;
- OS-approved automated/system-generated outbound email when no verified domain `Send As` identity is available;
- central thread continuity and durable correspondence history.

Do not promote this address as the preferred public contact when a domain role address is appropriate.

### 2. `casey@elevationupscales.com` — OWNER / EXECUTIVE IDENTITY

Use for:
- Casey-specific executive correspondence;
- owner approvals and owner-directed external communication;
- sensitive commercial/executive correspondence when Casey is the actual speaking identity;
- direct replies intended specifically for Casey.

Automated workers must **not** sign Casey's name or title unless the exact communication is explicitly authorized to be sent as Casey / in Casey's voice.

### 3. `sales@elevationupscales.com` — DEFAULT COMPANY SALES / OPERATIONS REPLY IDENTITY

Use as the preferred business-facing reply/contact identity for:
- vendor outreach and vendor operations;
- ecommerce/catalog/vendor onboarding communication;
- general customer sales/support communication;
- website commerce/order questions;
- automated operational email where a team reply path is appropriate.

Until outbound `Send As` capability is verified, messages may technically originate from `elevationupscales@gmail.com` while the signature directs replies/contact to `sales@elevationupscales.com`.

## Retired / disallowed identities

`elevationlithium@gmail.com` is `DISABLED / DO NOT USE` for all Elevation purposes.

Peter's personal email accounts may be used for internal communication with Peter where necessary, but they are not the default branded external company sender identity.

No automated worker may create or adopt a new company email identity, recovery address, or phone-linked account without Casey's authorization.

## Automated signature rules

### A. Vendor / ecommerce / operations automation

Use:

Elevation UpScales Operations  
Elevation UpScales, Inc.  
Vendor & Ecommerce Operations  
sales@elevationupscales.com  
elevationupscales.com  
*Sent through the Elevation Operating System. Replies are reviewed by our team.*

### B. Customer / website-commerce automation

Use:

Elevation UpScales Customer Operations  
Elevation UpScales, Inc.  
sales@elevationupscales.com  
elevationupscales.com  
*Sent through the Elevation Operating System. Replies are reviewed by our team.*

### C. Internal automated management message

Use:

Elevation Operating System  
Elevation UpScales, Inc.  
*Automated management routing / operating-system message.*

Do not add a human signature to an internal automated message unless a named human actually authored/approved it as that person.

## Human signature rules

### Casey

When Casey is the actual speaking identity / exact message is owner-authorized as Casey:

Casey Young  
President | Elevation UpScales, Inc.  
casey@elevationupscales.com  
elevationupscales.com

Use `Founder & Owner` only when Casey specifically chooses that presentation for the communication. Default corporate external title is `President`.

### Peter

Only when Peter personally authors/approves/sends the communication as himself:

Peter Torres  
Ecommerce & Vendor Operations Manager  
Elevation UpScales, Inc.  
sales@elevationupscales.com  
elevationupscales.com

Automated messages supporting Peter's work use the **Elevation UpScales Operations** role signature instead of impersonating Peter.

## Phone-number rule

Do not include a phone number in automated signatures until the active company phone/contact standard is separately reconciled and verified.

A retired/incident phone must never appear in a signature, account recovery field, vendor profile, or automated template.

## Reply-path rule

Default routing:

- vendor / ecommerce / catalog / general customer commerce → `sales@elevationupscales.com`
- owner / executive / Casey-specific → `casey@elevationupscales.com`
- backend Google/system continuity → `elevationupscales@gmail.com`

Where the sending platform supports `Reply-To`, configure the appropriate domain role address once technically verified. Until then, include the correct domain contact visibly in the signature and preserve the actual sender header truthfully.

## Anti-impersonation rule

**AUTOMATION MAY REPRESENT THE COMPANY; IT MAY NOT SILENTLY PRETEND TO BE A PERSON.**

An automated or pre-authorized routine message must use a role/team signature unless:
1. the human is actually sending it; or
2. Casey explicitly authorizes the exact message to be sent under that named human identity.

## Control phrase

**SYSTEM SENDS AS THE COMPANY → HUMANS SIGN AS THEMSELVES → SALES IS THE DEFAULT TEAM REPLY PATH → CASEY IS OWNER-SPECIFIC → NEVER REUSE RETIRED IDENTITIES.**
