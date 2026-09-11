# Elevation UpScales — Email Identity & Signature Standard

**Owner:** Casey Young  
**Effective:** 2026-09-11  
**Status:** ACTIVE OWNER-AUTHORIZED OPERATING STANDARD  
**Parent control:** `GMAIL_EMAIL_NETWORK_SOP_V1_0.md`

## Purpose

Establish one clear company rule for which email identities Elevation uses, how automated/system-generated emails are signed, and when a message may carry a person's name/title.

## Verified current sending reality

Current Gmail send history proves `elevationupscales@gmail.com` is the active technical outbound mailbox.

Current routing evidence also verifies `support@elevationupscales.com` as an established Elevation support-role address. Prior routing QA and inbound messages prove that the support address is active as a company contact/routing identity.

`casey@elevationupscales.com` and `sales@elevationupscales.com` remain valid company-facing domain identities for their assigned roles, but this standard does **not** claim any domain address is configured as a Gmail outbound `Send As` identity unless separately verified.

Therefore:

**AUTOMATION MAY SEND TECHNICALLY FROM `elevationupscales@gmail.com` WHILE PRESENTING ELEVATION UPSCALES SUPPORT AS THE BUSINESS CONTACT / SIGNATURE IDENTITY.**

Never falsify the actual From header. The technical sender and the visible support/contact identity may differ.

## Approved email identities

### 1. `elevationupscales@gmail.com` — TECHNICAL / SYSTEM SENDING MAILBOX

Use for:
- current authenticated Gmail sending path;
- Google-connected administrative operations;
- OS-approved automated/system-generated outbound email;
- central thread continuity and durable correspondence history.

This is the technical sender. It is not the preferred public reply/contact identity for automated vendor or website communications.

### 2. `support@elevationupscales.com` — DEFAULT AUTOMATED PUBLIC CONTACT IDENTITY

Use as the default visible support/contact identity for:
- automated vendor correspondence;
- vendor onboarding and operational follow-up;
- ecommerce/catalog support communication;
- website customer communication;
- website order/support communication;
- general automated operational correspondence where a company team identity is appropriate.

Automated messages may technically send from `elevationupscales@gmail.com` while the body/signature identifies `support@elevationupscales.com` as the company contact.

Where the sending platform supports a verified `Reply-To`, use `support@elevationupscales.com` for these automated classes.

### 3. `sales@elevationupscales.com` — SALES-SPECIFIC BUSINESS IDENTITY

Use for:
- direct sales conversations;
- sales quotes or sales-specific human correspondence;
- commercial conversations where Sales is the appropriate functional owner.

It is not the default automated vendor/customer identity unless Casey or the applicable workflow specifically routes that communication through Sales.

### 4. `casey@elevationupscales.com` — OWNER / EXECUTIVE IDENTITY

Use for:
- Casey-specific executive correspondence;
- owner approvals and owner-directed external communication;
- sensitive commercial/executive correspondence when Casey is the actual speaking identity;
- direct replies intended specifically for Casey.

Automated workers must **not** sign Casey's name or title unless the exact communication is explicitly authorized to be sent as Casey / in Casey's voice.

## Retired / disallowed identities

`elevationlithium@gmail.com` is `DISABLED / DO NOT USE` for all Elevation purposes.

Peter's personal email accounts may be used for internal communication with Peter where necessary, but they are not the default branded external company sender identity.

No automated worker may create or adopt a new company email identity, recovery address, or phone-linked account without Casey's authorization.

## Automated signature rules

### A. Vendor / partner automation

Default signature:

Elevation UpScales Support  
Vendor & Partner Support  
Elevation UpScales, Inc.  
support@elevationupscales.com  
elevationupscales.com

Use for supplier/vendor onboarding, vendor follow-up, catalog/ecommerce coordination, logistics coordination when Support is the company-facing contact, and routine partner correspondence.

The message may be technically sent from `elevationupscales@gmail.com`. Do not add Casey's or Peter's personal signature unless the exact message is authorized as that person.

### B. Website / customer automation

Default signature:

Elevation UpScales Support  
Customer & Website Support  
Elevation UpScales, Inc.  
support@elevationupscales.com  
elevationupscales.com

Use for website inquiries, direct Elevation website orders, order-status communication, general customer support, checkout/support follow-up, and automated website correspondence.

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
support@elevationupscales.com  
elevationupscales.com

Automated messages supporting Peter's work use the **Elevation UpScales Support** role signature instead of impersonating Peter.

## Phone-number rule

Do not include a phone number in automated signatures until the active company phone/contact standard is separately reconciled and verified.

A retired/incident phone must never appear in a signature, account recovery field, vendor profile, or automated template.

## Reply-path rule

Default routing:

- automated vendor / partner / ecommerce / catalog → `support@elevationupscales.com`
- automated website / customer / direct website order support → `support@elevationupscales.com`
- sales-specific human/commercial correspondence → `sales@elevationupscales.com`
- owner / executive / Casey-specific → `casey@elevationupscales.com`
- backend Google/system continuity → `elevationupscales@gmail.com`

Where the sending platform supports a verified `Reply-To`, automated vendor and website/customer mail should use `support@elevationupscales.com`.

Until domain `Send As` is verified, preserve the true technical From address while displaying the approved Support identity/signature in the message body.

## Anti-impersonation rule

**AUTOMATION MAY REPRESENT ELEVATION UPSCALES SUPPORT; IT MAY NOT SILENTLY PRETEND TO BE A PERSON.**

An automated or pre-authorized routine message must use a role/team signature unless:
1. the human is actually sending it; or
2. Casey explicitly authorizes the exact message to be sent under that named human identity.

## Control phrase

**MAIN GMAIL SENDS → SUPPORT SIGNS → SUPPORT@ IS THE DEFAULT AUTOMATED CONTACT → SALES IS SALES-SPECIFIC → CASEY IS OWNER-SPECIFIC → NEVER REUSE RETIRED IDENTITIES.**
