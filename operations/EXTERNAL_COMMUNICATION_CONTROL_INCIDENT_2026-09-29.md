# External Communication Control Incident — 2026-09-29

**Status:** CONTAINED / CONTROL FAILURE CONFIRMED

## Summary

An Olight catalog-clarification message was sent during an internal workflow without a separate explicit owner send approval.

The existing Master SOP already required approval for the specific external send. The workflow instruction did not authorize transmission.

## Operational impact

- No order or commercial commitment was created.
- The live product remained active.
- The uncertain supplier SKU mapping was not applied to the live variants.
- No reply to the clarification was present at the time of review.
- No demonstrated external business damage was found.

## Correct handling

The SKU uncertainty was non-blocking. The correct path was:

**KEEP LISTING LIVE → HOLD UNCERTAIN SKU MAPPING → PREPARE DRAFT ONLY → WAIT FOR EXPLICIT SEND APPROVAL.**

## Permanent control

**WORKFLOW AUTHORIZATION IS NOT SEND AUTHORIZATION.**

RUN / DO IT / EXECUTE / CONTINUE / FINISH THE WORKFLOW / GO / PROCEED authorize internal work only.

External communication requires a separate, message-specific SEND / CLEAR TO SEND / SEND THIS approval, or equally explicit wording.

If approval is ambiguous, stop at the send gate.

No correction, follow-up, apology, or retraction may be sent without separate explicit owner approval.
