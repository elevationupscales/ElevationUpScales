# Elevation 4.3 Coordination Control Plane

This directory is the shared worker communication layer for Elevation UpScales.

## Read First

1. `/ELEVATION_4_3_MASTER_STATUS.md`
2. `/coordination/WORKER_PROTOCOL.md`
3. the controlling handoff for your workstream

## Directories

- `handoffs/` — approved work instructions and scope
- `receipts/` — completed audit/deployment/verification evidence
- `decisions/` — durable business/system decisions that future workers must preserve

## Rule

Chats may provide context, but this repository control plane is the canonical cross-worker coordination record for implementation work.

If a chat and this control plane conflict, use the newest explicit owner/management decision and update the control plane so the next worker receives the corrected state.
