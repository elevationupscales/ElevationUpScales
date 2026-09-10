# Elevation UpScales — Peter Project Starter V2 Control Record

**Date:** 2026-09-10  
**Status:** CONTROLLING REPLACEMENT PACKAGE + CURRENT OWNER PRIORITY DELTA  
**Owner:** Casey Young  
**Human Manager:** Peter Torres — Ecommerce & Vendor Operations Manager

## Replacement

This record supersedes the earlier starter package:

`ELEVATION_UPSCALES_PETER_CHATGPT_PROJECT_STARTER_2026-09-09.zip`

Earlier package SHA256:
`6ba2d2ee0dae43aeaafbb54960558ea2a3b8a2667c456f297d05088307800ec2`

Replacement package:

`ELEVATION_UPSCALES_PETER_PROJECT_STARTER_V2_REPLACES_V1_2026-09-10.zip`

Replacement SHA256:
`c97f30cc835a45dd45f517d27950261bc86762527924062285d593b45fd125f5`

The live Git record may contain newer owner priority/synchronization direction than the original V2 ZIP. A final consolidated update ZIP should reconcile those deltas into Peter's master manager when Company Operations / OS PM completes the next handoff.

## Project Structure

Peter maintains one working ChatGPT Project:

**Elevation — Ecommerce & Vendor Operations**

Initial workers:
1. Vendor Onboarding Worker
2. Catalog & Storefront Worker
3. Order & Fulfillment Worker
4. Vendor Email & Research Worker

Workers execute routed work. They do not become independent managers or own master company state.

## Shared Control Model

**CASEY → Operating System Project Manager → Company Operations Project / Company Operations Manager → Peter Torres → routed workers**

GitHub `/operations/` is the shared policy/evidence/control record. Peter's ChatGPT Project is his working execution space. ZIP packages are controlled human handoff snapshots and never override newer Casey direction or newer controlling Git state.

## Immediate Worktree Priority — Owner Direction 2026-09-10

**#1 ACTIVE PRIORITY: VEVOR DIRECT-WEBSITE DROPSHIPPING.**

Peter and his routed workers should keep VEVOR at the top of the active supplier worktree while it is unblocked. Routine eBay account work, Renogy waiting state, and lower-priority vendor enrichment do not displace VEVOR. A real paid-order/customer fulfillment exception may interrupt when immediate customer action is required.

VEVOR execution order:
1. verify/complete VEVOR PRO account registration and live account state;
2. complete tax-exemption setup through the verified account path when available;
3. preserve and return the direct VEVOR supplier feed supplied by Melinda;
4. reconcile the first 20–40 relevant direct-site products into the Master Catalog;
5. enforce the VEVOR price-floor rule: Elevation selling price may not be below VEVOR's current selling price;
6. keep Amazon, Walmart, eBay, and other third-party marketplaces blocked unless VEVOR later provides written authorization;
7. establish the normal order/fulfillment/return path;
8. keep the integration OPEN until a live paid VEVOR order is captured by the Elevation Operating System under `SOP-STORE-INT-001` and completed through fulfillment actuals.

## ZIP ↔ Git Rule

- Shared supplier/operating truth belongs in Git `/operations/` when material.
- Peter receives replacement/consolidation ZIPs when his project setup, priority, or instructions materially change.
- Each replacement ZIP must explicitly name the package it supersedes or updates.
- Peter returns concise state: **COMPLETED / HELD / NEXT / NEEDS CASEY**.
- Company Operations / OS PM records material shared-state changes into Git.
- Do not create a competing Peter management repository unless Casey explicitly authorizes it.

## Peter Team → Company Operations Sync Requirement

When Peter's team is asked for a management update, return **one concise ZIP package** rather than fragmented management emails. The ZIP should identify:

- what is completed;
- what is held/blocked;
- what Peter or his AI workers are missing;
- what account/tool access works or does not work;
- what source files or supplier feeds were captured;
- what action is next;
- what genuinely requires Casey.

Do not put passwords, MFA codes, API keys, customer PII, private supplier pricing, private freight rates, tax forms, IDs, or other protected records into a Git-tracked handoff.

## Git Management Communication Protocol

Peter's team should test access against the exact shared repository:

`elevationupscales/ElevationUpScales`

and the controlling path:

`main → /operations/`

Report the result in the next management ZIP using one of these states:

- **READ + WRITE AVAILABLE** — use existing relevant `/operations/` files for public-safe shared management updates. Do not create a new management repository.
- **READ AVAILABLE / WRITE NOT AVAILABLE** — read current `/operations/` as source of truth; return proposed public-safe deltas in the management ZIP for Company Operations / OS PM to commit. If Peter has authorized branch/PR capability, that may be used instead of email for proposed changes.
- **REPOSITORY NOT VISIBLE** — report the GitHub account/integration identity and that the repository is not visible; do not send credentials. Casey / Company Operations resolves repository or GitHub App access. Until resolved, use the one-ZIP management handoff as the temporary return path.

Git is for public-safe management state only. Protected vendor/customer/compliance material stays in approved private systems.

## Current Commercial State

- **VEVOR:** ACTIVE PRIORITY #1. Owner approved for direct-website dropshipping; onboarding/catalog execution proceeds without another routine owner gate.
- **SOK Energy:** primary active lithium supplier/dealer relationship; buyer-ready catalog work and commerce proof continue without displacing the current VEVOR priority unless a real paid-order/fulfillment event requires action.
- **Renogy:** application and signed W-9 follow-through complete; WAITING on external review. No chase during normal review window.
- **Kingboss:** B2B/onboarding/compliance work remains active but below VEVOR unless specifically reprioritized.
- **R&R / Logistics Plus:** existing Hawaii/logistics relationships remain under controlled Operations routing; do not duplicate active correspondence unless assigned.

## Store Integration Rule

All new sales-channel/store integrations follow `SOP-STORE-INT-001` and remain OPEN until:

**live purchase → payment → channel order → Elevation Operating System ingestion → SKU/source/fulfillment verification → production receipt**.

## Starting Git Baseline Used to Build V2

`3d4b960babd8aa1447d1e7ba25b60dfe0adc510c`

Always re-resolve current `main` before execution.