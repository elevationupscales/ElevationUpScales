# Elevation UpScales — COM2 Duplicate Email Damage + Trust Recon

**Date:** 2026-09-13  
**Owner:** Casey Young  
**Lane:** Company Operations / COM2  
**Status:** ACTIVE CONTROL / EMAIL TRUST REPAIR

## Executive result

The live Gmail Sent mailbox does **not** show evidence of a mass exact-duplicate blast to the vendor network. The damage pattern is narrower but real:

1. several external vendor threads received **bursty, fragmented follow-ups** that can look automated or disorganized;
2. one external DHX thread received an accidental **`test`** message followed by a correction;
3. one fake Shopify Gmail sender received a reply (`Fix`) from Elevation, confirming the mailbox and exposing the business signature block;
4. external messages are commonly sent from `elevationupscales@gmail.com` while the signature presents `casey@elevationupscales.com`, creating sender-identity inconsistency;
5. repetitive template language such as “we have routed…” / “we are reconciling…” / “internal review” risks making legitimate vendor correspondence feel automated;
6. internal Peter/management routing was materially over-mailed, increasing management-noise and instruction-conflict risk even where vendor trust was not directly affected.

**Damage level:** MODERATE trust/professionalism risk; **NO CONFIRMED vendor relationship loss** found in the live inbox.

## Vendor-by-vendor duplicate / burst assessment

### DHX / DGX — HIGH CLEANUP PRIORITY

Observed sent pattern after Sep 10:
- 7 outbound messages to Gennie Messineo in the same `Re: DHX` thread;
- one accidental external `test` message;
- one immediate correction asking her to disregard the test;
- multiple factual packet/clarification updates in close succession;
- two more updates on Sep 12 only ~4 minutes apart.

This is the clearest vendor-facing trust issue. The content is mostly legitimate, but the fragmentation is excessive.

**Action:** send one concise courtesy note at the next substantive DHX touchpoint (or immediately before the final packet) explaining that Elevation is consolidating vendor-support email handling and that any duplicate/fragmented messages from the recent system transition may be disregarded. Then send one consolidated packet/message only.

### Kingboss — HIGH CLEANUP PRIORITY

Observed:
- 5 outbound messages in the same Kingboss thread after Sep 10;
- four on Sep 11, including three within ~8 minutes;
- separate messages covered acknowledgment, exact-model binding, further clarification, then image-reference packet.

Not exact duplicates, but this is a clear burst that can look like an automated system firing multiple partial responses.

**Action:** targeted courtesy notice recommended on the next Kingboss reply, followed by one consolidated ask only. Do not send multiple incremental clarifications.

### VEVOR / Melinda — MODERATE CLEANUP PRIORITY

Observed:
- three messages to Melinda within ~21 minutes on Sep 10 in the same cooperation thread;
- later fulfillment-detail and product-candidate follow-ups were separate/substantive;
- support ticket #459060013772800 was answered once after the closure warning; VEVOR then sent a newer reply.

This is bursty but not a clear exact-duplicate incident.

**Action:** no standalone apology blast. Add a brief one-line system-transition note only if the next substantive reply to Melinda or the ticket would benefit from it. Read VEVOR’s newest ticket reply before sending anything.

### SOK / Kam — MODERATE / NO STANDALONE NOTICE

Observed:
- multiple legitimate operating clarifications across Sep 10–11;
- two messages within ~6 minutes on Sep 10;
- later channel/warranty messages were materially different.

No evidence of an exact duplicate. Relationship remains active and responsive.

**Action:** do not send a standalone apology email. Consolidate future asks into one message per response cycle.

### Logistics Plus / Cara — LOW / NORMAL FOLLOW-UP

Multiple messages were sent over several days, but they added distinct safety, volume, and packing information. No exact duplicate is evident.

**Action:** no apology. Keep future updates consolidated.

### Renogy — LOW / LEGITIMATE CORRECTION HISTORY

Renogy received multiple messages, but key repetition came from a requested W-9 correction and later dealer/toolkit follow-up. Dealer approval was achieved.

**Action:** no duplicate-warning email.

### Phocos — LOW

One acknowledgment after receiving the application. No duplicate damage.

**Action:** no apology; next message should be the completed application / product-interest response.

### Doba — MODERATE COMMUNICATION DENSITY, NOT DUPLICATE

Separate messages requested:
- a formal U.S. fulfillment/warehouse relationship letter;
- response to a recommended product;
- urgent organizer availability/fulfillment for a paid customer.

The asks were different, though close in time.

**Action:** no duplicate apology. Future follow-up should combine outstanding asks into one concise message.

## Customer-facing duplicate risk

### Christiana / “New Customer” — DUPLICATE-LIKE

Two outbound replies in the same thread both asked which product she was trying to buy. The second repeated much of the first after several hours.

**Action:** do not send another apology unless she replies. If she does, answer the exact product/checkout issue once and do not repeat the prior generic website explanation.

## Platform / security trust issue

### Fake Shopify Gmail sender — SECURITY/TRUST INCIDENT

Elevation sent one reply (`Fix`) to `ecommerce.advisory.team@gmail.com`, which was posing as Shopify support. The reply exposed the standard business signature/contact block and validated that the mailbox is active.

No evidence found that credentials were sent in that reply.

**Control:**
- do not reply to Shopify/support claims from ordinary Gmail addresses;
- genuine Shopify operational mail must be verified against Shopify-controlled domains and then handled through authenticated Shopify Admin/support;
- treat `shopifyacademyagency@gmail.com`, `ecommerce.advisory.team@gmail.com`, and `shopifytechteam63@gmail.com` as untrusted unless independently proven otherwise.

## Sender identity / professionalism risk

Most outbound mail is being sent from `elevationupscales@gmail.com` while signatures advertise `casey@elevationupscales.com` and sometimes copy `sales@elevationupscales.com`.

That is not automatically unsafe, but it can look inconsistent to a supplier and weakens brand trust compared with a stable domain-authenticated sender.

**Do not change sender infrastructure during active routing instability.** Once company-domain mail routing is verified stable, Company Operations should standardize one primary external sender identity and matching signature.

## Email-style trust problem

Repeated phrases such as:
- “we have routed…”
- “we are reconciling…”
- “internal review…”
- “worktree…”
- “operating lane…”

should stay internal. Vendor-facing mail should read like ordinary business correspondence from Casey/Elevation, not like OS output.

## Recommended vendor cleanup notice

**Do not blast this to the whole vendor list.** Use it only for vendors with a real recent burst/duplicate pattern, primarily DHX and Kingboss, optionally VEVOR at the next substantive touchpoint.

Suggested text:

> Hi [Name],
>
> Quick housekeeping note from Elevation UpScales: we’re updating our vendor-support email workflow, and a few recent messages may have been sent more than once or broken into separate follow-ups during the transition. If you received any duplicate messages from us, please disregard the duplicate.
>
> We’re consolidating future updates into a single thread so communication stays clear and easy to follow. Thank you for your patience, and we appreciate your continued support.
>
> Casey Young  
> Elevation UpScales, Inc.

Prefer **“vendor-support email workflow”** over “automated email system” in external mail; it acknowledges the issue without making the relationship sound bot-managed.

## New outbound control

Effective immediately for Company Operations:

**SEARCH THREAD → READ LATEST INBOUND + SENT STATE → CONSOLIDATE → ONE OUTBOUND → WAIT FOR NEW FACT/REPLY.**

Rules:
1. Search the exact vendor/thread before sending.
2. One substantive outbound per vendor response cycle unless there is a real emergency/customer-order event.
3. Merge clarifications into one message instead of sending incremental fragments minutes apart.
4. Never send `test`, placeholder, tool-check, or partial operational language to an external recipient.
5. Verify recipient domain before responding to platform/security notices.
6. Keep internal OS/worker/project terminology out of vendor/customer email.
7. Use one stable sender identity once domain mail routing is verified healthy.
8. If a duplicate actually occurs, acknowledge it once; do not send multiple correction/apology emails.

## Current disposition

- **DHX:** targeted cleanup note recommended with final packet.
- **Kingboss:** targeted cleanup note recommended on next reply.
- **VEVOR:** optional one-line note on next substantive reply; no standalone apology blast.
- **SOK / Logistics Plus / Renogy / Phocos / Doba:** no standalone duplicate-warning email.
- **Christiana:** no apology unless she replies; answer the exact issue once.
- **Fake Shopify Gmail senders:** no further response.

## Control phrase

**ONE THREAD → ONE CONSOLIDATED MESSAGE → NO INTERNAL JARGON → NO TEST SENDS → VERIFY RECIPIENT → PROTECT TRUST.**
