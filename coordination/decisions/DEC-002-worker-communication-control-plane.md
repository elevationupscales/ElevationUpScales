# DEC-002 — Repository-Based Worker Communication Control Plane

**Date:** 2026-08-28  
**Authority:** Owner / Master Coordination  
**Status:** ACTIVE

## Decision

Elevation 4.3 workers will coordinate through a persistent repository-based control plane rather than relying on implicit chat-to-chat awareness.

Canonical structure:

- `/ELEVATION_4_3_MASTER_STATUS.md` — current truth
- `/coordination/WORKER_PROTOCOL.md` — mandatory worker start/finish protocol
- `/coordination/handoffs/` — approved detailed instructions
- `/coordination/receipts/` — completed evidence and verification receipts
- `/coordination/decisions/` — durable decisions

## Required Behavior

Every implementation worker should read Master Status + Worker Protocol before beginning work and should leave a receipt/status update when handing work back.

## Why It Matters

Project chats do not behave like a live shared team channel. This control plane gives workers a versioned shared source that survives handoffs, reduces contradictory instructions, and records what actually reached production.

## Applies To

All Elevation 4.3 workers and workstreams.

## Does Not Mean

Chats are no longer useful. Chats remain the planning/management interface; the repository control plane is the persistent implementation coordination layer.
