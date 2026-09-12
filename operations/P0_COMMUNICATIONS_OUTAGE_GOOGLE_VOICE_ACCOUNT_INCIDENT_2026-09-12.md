# ELEVATION UPSCALES — P0 COMMUNICATIONS OUTAGE / GOOGLE VOICE + GOOGLE ACCOUNT INCIDENT

**Date:** 2026-09-12  
**Owner:** Casey Young  
**State Owner:** MPM 5 / Operating System Project Manager  
**Severity:** **P0 / CRITICAL**  
**Status:** **ACTIVE — CHANGE FREEZE / RECOVERY REQUIRED**

## Incident

Casey reports that the Peter-managed Google Voice / backup-email incident has escalated: Casey's actual phone is no longer reliably receiving inbound calls or text messages.

This is a customer-contact and owner-availability outage. It outranks non-customer-critical account setup work until the carrier phone path is restored.

## Verified evidence

- Google sent a security alert for a new Windows sign-in to `elevationupscales@gmail.com` on 2026-09-10 UTC.
- Google then sent a security alert confirming the recovery email for `elevationupscales@gmail.com` was changed on 2026-09-11 UTC.
- By 2026-09-12, `elevationlithium@gmail.com` could successfully send a recovery test to the primary Elevation Gmail and Peter.
- The email-side recovery does **not** prove the phone/Voice path is healthy.
- Google Voice linked-number/call-forwarding settings can prevent Google Voice calls from ringing a linked phone, but those settings do not normally disable direct carrier SMS/calls to the carrier number itself.

The Windows sign-in and recovery-email change must each be reconciled as authorized or unauthorized. If either was not Casey-authorized, account security recovery is part of this P0 incident.

## Immediate control

**FREEZE all Peter / worker changes involving:**

- Google Voice linked numbers;
- number claim / reverify actions;
- Google Voice call forwarding;
- Google Voice device-number changes;
- Google-account recovery email / phone changes;
- carrier-number porting or transfer attempts;
- SIM/eSIM changes;
- conditional/unconditional call-forwarding changes;
- additional verification-code experiments.

No worker may make another change in this lane until Casey's direct carrier phone service is verified stable or MPM explicitly releases a bounded recovery action.

## Recovery split

### Layer 1 — Carrier line / device — FIRST

Verify Casey's carrier-native line independently of Google Voice:

1. SIM/eSIM line active on device.
2. Direct inbound carrier call rings the device.
3. Direct carrier SMS reaches the device.
4. Carrier confirms no port-out / number transfer / SIM swap / line suspension.
5. Carrier confirms SMS provisioning and call routing are active.
6. Carrier confirms no unintended unconditional forwarding.

**Do not delete the eSIM, port the number, or replace the SIM until the carrier has checked the line state.**

If direct carrier calls/SMS fail, the incident remains carrier/device P0 even if Google Voice also has bad settings.

### Layer 2 — Google Voice

After the carrier path works:

1. Identify exact Google account owning the Voice number.
2. Verify the intended carrier number under Devices and numbers / Linked numbers.
3. Verify the intended device and linked number are enabled under Incoming calls / Call forwarding.
4. Check Google Voice Do Not Disturb and custom forwarding rules.
5. Reverify an inactive linked number only when the intended carrier number is confirmed and Casey controls the verification code.
6. Preserve direct carrier service while restoring Google Voice forwarding.

### Layer 3 — Google Account Security

1. Review the new-Windows-sign-in security event.
2. Review the recovery-email-change security event.
3. Determine who initiated each event and whether Casey authorized it.
4. Review recent account security activity and sign-in methods.
5. If an event is unrecognized, secure the account through Google's security flow and remove only unrecognized or unintended access/recovery methods.
6. Do not rotate or remove recovery methods blindly while phone recovery is underway.

## Peter required return

Peter must return an exact change log before touching this lane again:

- Google account used;
- Google Voice number involved;
- carrier number linked / claimed / reverified;
- exact Voice settings changed;
- exact recovery email / phone changes;
- verification codes requested and which destination received them;
- any call-forwarding or device-number changes;
- timestamps as closely as available;
- whether any number port / transfer / claim flow was started.

## Close condition

Incident may not close until all are true:

- direct carrier inbound call PASS;
- direct carrier SMS PASS;
- Google Voice inbound routing PASS where intended;
- Google account security change reconciled;
- no unauthorized linked number, forwarding rule, recovery method, or transfer remains;
- owner confirms normal calls/texts are arriving again.

**Until then: P0 / CRITICAL.**
