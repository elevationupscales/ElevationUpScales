# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Status:** **OWNER-DIRECTED HOMEPAGE FIDELITY REPAIR ACTIVE — WEB DEVELOPER CURRENT**  
**Reports To:** OS 1.1 Project Manager / MPM 6  
**Owner visual control:** `WEB_V2_OWNER_VISUAL_FIDELITY_REQUIREMENTS_2026-09-13.md`  
**Active repair branch:** `work/web-v2-homepage-fidelity-repair-2026-09-13`  
**Current observed repair head:** `aeec98f37766a8b6db3814c1111acc29b12ec279`  
**Legacy production:** `production-deploy = 894b15cb12bf75a6a8e81b916e2a9bc2de858f88` — LEGACY ONLY / rollback reference

## 1. Mission

Build and verify the customer experience in this order:

**EXPLAIN → SHOP → PRODUCT → CART → CHECKOUT → PAYMENT / ORDER → FULFILLMENT.**

The commerce architecture is preserved. Current execution is a bounded owner-directed homepage visual-fidelity repair after exact-candidate review exposed visible mismatches against the approved production homepage.

## 2. Accepted merged commerce foundation

Completed / merged and not to be reopened during this visual repair:

- canonical catalog + product detail — `72694ae9ba5b9952c0460b9f90b380cffde4ff23`;
- cart — `13b4411fc265a1f7b149ad9207059221fa53db32`;
- checkout review — `f5d3ac7cc4b37e8211a3bb460a8507380b75803d`;
- order + fulfillment handoff — `cd8e21ef4a89c261a4580b683da54be8a896787a`;
- preview-readiness implementation — `84e9a2b8986ddeebd9b13a087c0e520c9dd9599c`.

No Shopify fallback, raw card/CVV handling, invented shipping/tax/orderability, or live PayPal activation is authorized by this repair.

## 3. Exact candidate evidence — retained / not owner-accepted

The latest exact candidate prior to this repair remains useful evidence only:

- Git SHA: `6dff0a7e65f3967d60040977c3c2693e430e56b4`;
- Cloudflare Version ID: `e60f4bd0-285b-4b08-9b55-1db013be383e`;
- immutable diagnostic preview: `https://e60f4bd0-elevation-web-v2.elevationupscales.workers.dev/`;
- `/__version` proof matched the Cloudflare Version ID;
- candidate upload did not promote production.

Casey did **not** accept that candidate as the final visual baseline. The exact candidate is therefore evidence, not a release authorization.

## 4. Owner visual source of truth

The current production homepage at `https://elevationupscales.com/` remains the visible homepage source of truth until Casey explicitly accepts a deliberate change.

DEV must consume `WEB_V2_OWNER_VISUAL_FIDELITY_REQUIREMENTS_2026-09-13.md` and preserve, at minimum:

- original-quality Elevation and SOK branding;
- complete hero composition and hero product imagery;
- production-visible copy and CTA wording;
- category-specific imagery rather than generic repeated imagery;
- Shop by Solution imagery;
- Featured SOK imagery;
- Hawaii / Alaska / freight imagery;
- homepage product-grid imagery;
- Shop the Store category treatment;
- Build Your Power System imagery;
- Project & Field Support presentation;
- footer branding, density and link structure;
- desktop and mobile production-like spacing, crops and hierarchy.

**Do not redesign, simplify, rewrite, AI-redraw factual product media, substitute SKUs, or treat equivalent sections as visual fidelity.**

## 5. Current repair state

OS RECON verified the active repair branch exists and has real implementation work.

Observed branch state during RECON:

- branch: `work/web-v2-homepage-fidelity-repair-2026-09-13`;
- observed head: `aeec98f37766a8b6db3814c1111acc29b12ec279`;
- branch is ahead of the prior fidelity merge and currently diverged from `main` because the owner visual-control file landed afterward;
- changed implementation surfaces include `apps/web-v2/src/shell.js`, `apps/web-v2/src/home-fidelity-styles.js`, and `apps/web-v2/test/shell.test.mjs`;
- repair tests now assert production-visible copy, navigation, SOK imagery, product-grid membership and removal of prior alternate wording.

Before final QA / merge, DEV must reconcile current `main` and explicitly consume the owner visual-control file. Do not discard the active repair work.

## 6. Known remaining owner-fidelity audit points

The active branch is progress, not automatic completion. OS RECON observed that some production sections still require explicit visual verification against the owner requirements, including category-specific imagery and section-level imagery where the source remains text/card driven.

DEV must account for every required production visual before returning the repair to Release Engineer. If a production image cannot be reproduced safely, record the exact reason and present the closest owner-reviewable alternative.

## 7. Commercial activation holds — STILL CONTROLLED

These remain transaction/payment gates and do not block the visual repair:

- Cloudflare currently shows `CF_VERSION_METADATA` as the only connected Worker binding; `MARKETPLACE_DB` is not currently connected;
- authoritative general-path shipping/freight amount remains unverified;
- authoritative Web V2 sales-tax amount/disposition remains unverified;
- final `amountDue` therefore remains unverified;
- current canonical orderability still must fail closed where supplier truth is incomplete;
- PayPal sandbox/live durable-order proof remains pending the charge/runtime gates.

**DO NOT invent a D1 database ID, shipping amount, freight amount, tax amount, orderability state, `amountDue`, Hawaii eligibility or payment readiness.**

## 8. Worker routing

| Worker | State | Task |
|---|---|---|
| **WEB DEVELOPER** | **ACTIVE / CURRENT — OWNER HOMEPAGE FIDELITY REPAIR** | Continue the existing bounded repair branch; reconcile current main + owner visual-control file; finish image/copy/layout fidelity; produce same-viewport desktop/mobile comparison evidence; QA; merge; then hand back. |
| COMMERCE DEVELOPER | **STANDBY / ACTIVATION WORK PRESERVED** | Do not reopen checkout/order architecture during visual repair. Resume freight/payment readiness after the visual baseline is accepted. |
| RELEASE ENGINEER | **STANDBY / NEXT AFTER DEV MERGE** | Do not create another candidate from the rejected visual baseline. After DEV repair merge, create one new exact candidate from the corrected SHA and return immutable preview + `/__version` proof. |
| MASTER RECON OS | **TRIGGERED / CONTROL RECON ONLY** | Reconcile lineage/runtime/control state; do not implement the homepage. |

## 9. Next RUN meaning

Until the owner-directed fidelity repair is merged:

**WEB DEVELOPER → RECOVER EXISTING REPAIR BRANCH → CONSUME CURRENT MAIN + OWNER VISUAL CONTROL → COMPLETE PRODUCTION-FIDELITY IMAGE/COPY/LAYOUT AUDIT → QA → MERGE → HAND BACK TO RELEASE ENGINEER.**

After the repair merge:

**RELEASE ENGINEER → EXACT CANDIDATE → IMMUTABLE PREVIEW → `/__version` PROOF → OWNER REVIEW.**

Do not promote/cut over production automatically.

## 10. Release invariant

**ONE APPROVED GIT SHA → ONE CLOUDFLARE VERSION ID → PRODUCTION-PARITY SMOKE OF THAT EXACT VERSION → SAME VERSION PROMOTED / CUT OVER → LIVE VERIFY.**

Final visual acceptance belongs to Casey Young only.

## Control phrase

**OWNER FIDELITY REPAIR ACTIVE → WEB DEV FINISHES THE VISIBLE HOMEPAGE → QA / MERGE → RELEASE ENGINEER CREATES A NEW EXACT CANDIDATE → CASEY REVIEWS → NO PRODUCTION PROMOTION WITHOUT OWNER ACCEPTANCE.**
