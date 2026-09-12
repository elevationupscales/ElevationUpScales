# Elevation UpScales — Doba Availability Presentation Live Receipt

**Status:** CLOSED / PRODUCTION VERIFIED  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Lane:** Commerce / Developer / Universal Store  
**Parent:** `CURRENT_WORK_BOARD.md`; GitHub issue #65 residual checkout architecture

## Defect closed

The server-side universal/RV storefront path was treating an unknown/null Doba supplier-stock value like confirmed zero because numeric coercion converted `null` to `0`. Separately, Doba public purchase URLs and server-prerendered RV Buy Now behavior did not require a verified positive supplier-stock value before exposing direct checkout.

The client-side universal store already used the safer rule: unknown stock means availability confirmation, not direct checkout.

## Production behavior

PR #136 aligned the server/API path to the same supplier-safe rule:

- unknown Doba supplier stock remains visible for availability confirmation instead of being silently removed as zero stock;
- unknown Doba stock does not expose direct checkout;
- verified positive supplier stock is required for the Doba direct checkout path;
- confirmed zero remains unavailable;
- Doba unknown/non-direct server-prerendered rows no longer fall back to an external eBay purchase link;
- exact SKU/source, shipping, destination, pricing and payment controls remain authoritative.

No blanket zero-stock bypass was introduced. No inventory is represented as Elevation-owned stock.

## Verification chain

- Pull request: **#136 — Fix Doba unknown-stock storefront gating**
- Merge SHA: `fd47919ae5701fd5c2422bf31fc199c882948ebd`
- PR QA: **PASS** — Pull Request QA run #92
- Exact-SHA preview run: `34669555235` — **PASS**
  - exact source verification PASS
  - canonical QA PASS
  - Cloudflare preview deploy PASS
  - preview smoke PASS
- Production workflow: **Deploy Elevation UpScales run #41** / run id `34669666345` — **PASS**
  - production authorization PASS
  - canonical production QA PASS
  - secret/artifact checks PASS
  - Cloudflare production deployment PASS
  - deployed-application smoke PASS
  - canonical `elevationupscales.com` smoke PASS
  - workflow receipt PASS

The production source is the exact PR #136 merge SHA above. Later `main` commits were operations/public-safe source-record changes and do not invalidate this production acceptance receipt.

## Residual checkout scope

The shared universal-store source-routing defect and the generic Doba unknown/zero/positive presentation defect are now production-closed.

The checkout-gate cleanup lane must not be reopened as a broad zero-stock or HOLD rewrite. The remaining supplier-specific regression is limited to an exact Renogy delayed-order SKU if/when that SKU becomes activation-ready with verified current dealer/MAP/orderability authority.

**Control phrase:**

**UNKNOWN DOBA STOCK → CONFIRM AVAILABILITY; VERIFIED POSITIVE STOCK → DIRECT CHECKOUT IF ALL OTHER GATES PASS; CONFIRMED ZERO → UNAVAILABLE.**
