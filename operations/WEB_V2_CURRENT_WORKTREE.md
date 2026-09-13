# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Status:** **ACTIVE — COMMERCIAL RETAIL REBUILD / REVENUE FIRST**  
**Reports To:** OS 1.1 Project Manager / MPM  
**Current owner workflow:** `WEB_V2_COMMERCIAL_RETAIL_REBUILD_AND_RELEASE_WORKFLOW_2026-09-12.md`  
**Visual control:** `WEB_V2_VISUAL_SYSTEM_SOP_V1_0.md`  
**Legacy production:** `production-deploy = 894b15cb12bf75a6a8e81b916e2a9bc2de858f88` — LEGACY ONLY / rollback reference  
**Accepted commercial-retail reset baseline:** `9442ffc679b00b8c9b87ff4c6fbb0664b5728881`  
**Git freshness rule:** re-resolve then-current `main` before every bounded task; later control-only descendants do not change the owner build order by themselves.

## 1. Mission

Rebuild ElevationUpScales.com into the smallest complete commercial retail system that can sell authorized vendor products and explain Elevation's lithium/off-grid/freight/Hawaii specialty.

The website must do this in order:

**EXPLAIN → SHOP → PRODUCT → CART → PAYPAL → ORDER → FULFILL.**

Do not turn Web V2 into another architecture demo, internal OS surface, generic services website or feature collection.

## 2. Homepage rule

The owner has locked the design direction:

**RECONSTRUCT THE CURRENT APPROVED HOMEPAGE LOOK — DO NOT REDESIGN IT.**

Preserve the approved hero, freight/logistics presentation, brand feel, visual hierarchy and mobile experience. Remove development-status/internal-system copy. Make the homepage retail-first and immediately explain lithium/off-grid supply, freight/logistics and Hawaii lithium access.

Primary CTA: **Shop**.  
Secondary CTA: **Start a Project**.

## 3. Public minimum

Foreground routes only:

- `/`
- `/store`
- `/shop/<vendor>`
- `/product/<id-or-slug>`
- `/cart`
- `/checkout`
- `/shipping-logistics-services`
- `/hawaii-lithium-batteries`
- `/start-a-project`
- `/privacy`
- `/terms`

Retire from foreground navigation any old marketplace/list-item/collector/vehicle-selling or unrelated feature surface that does not help customers buy, understand shipping, or start a relevant project.

## 4. Catalog rule

One canonical Elevation product catalog. Vendor pages are filtered views of the same product truth.

Vendor Project sources own exact supplier truth. Web V2/Commerce V2 consume only approved:

- product identity / SKU;
- title/specs/images;
- sell price and MAP/floor state;
- stock/orderability;
- shipping/freight disposition;
- warranty/returns owner;
- fulfillment source;
- channel authorization.

No duplicate vendor storefront architecture.

## 5. Checkout authority

Elevation direct site owns its own transaction:

**PRODUCT → CART → SERVER REVALIDATION → CHECKOUT REVIEW → PAYPAL ORDERS v2 → DURABLE ELEVATION ORDER → GUARDED CAPTURE/RECONCILIATION → FULFILLMENT ROUTE.**

No silent Shopify fallback. Shopify/eBay/TikTok remain separate channel/order/payment surfaces.

No raw card/CVV handling or storage.

## 6. Shipping / Hawaii control

Payment may proceed only when the exact item/destination has a valid shipping disposition.

Allowed states include parcel/known rate, supplier-controlled shipping, approved freight, approved Hawaii lithium route, or manual review/quote. Unknown freight or unapproved lithium routing fails closed before final charge.

## 7. New release system

The production-parity release-system reset is **COMPLETE / MERGED / QA PASS**. QA run `34738843664` passed the release foundation and Web V2 application tests.

Version preview is **diagnostic only** and is no longer the acceptance gate.

Release invariant:

**ONE APPROVED GIT SHA → ONE CLOUDFLARE VERSION ID → PRODUCTION-PARITY SMOKE OF THAT EXACT VERSION → SAME VERSION PROMOTED / CUT OVER → LIVE VERIFY.**

Runtime truth:

**GIT SHA + CLOUDFLARE VERSION ID + DEPLOYMENT ID.**

### Bootstrap

Before V2 owns the root domain:

**CANDIDATE → SMOKE-ONLY CUSTOM DOMAIN WITH PRODUCTION BINDINGS → RUNTIME VERSION PROOF → OWNER ACCEPTANCE → ROOT-DOMAIN CUTOVER TO SAME WORKER/VERSION → LIVE VERIFY.**

### Steady state

After V2 owns production:

**CANDIDATE → ACCEPTED VERSION 100% + CANDIDATE 0% → REAL PRODUCTION URL + `Cloudflare-Workers-Version-Overrides` → RUNTIME VERSION PROOF → OWNER ACCEPTANCE → CANDIDATE 100% → LIVE VERIFY.**

Rollback restores the last accepted Version ID. No rebuild or re-upload after candidate acceptance.

Do not create a candidate or smoke deployment merely because the release machinery is ready. Release begins only when the bounded site build reaches its true release gate.

## 8. Current worker routing

| Worker | State | Task |
|---|---|---|
| WEB DEVELOPER | **ACTIVE / NEXT — HOMEPAGE RECONSTRUCTION** | Reconstruct approved homepage exactly enough for owner visual acceptance; remove internal/development presentation; make retail/logistics positioning clear. Do not skip ahead to release. |
| COMMERCE DEVELOPER | **AUTHORIZED / QUEUED IMMEDIATELY AFTER HOMEPAGE BASELINE** | Canonical catalog → vendor views → product detail → cart → PayPal Orders v2 → durable order → fulfillment handoff. |
| RELEASE ENGINEER | **READY / ACTIVE SUPPORT — PRODUCTION-PARITY RELEASE** | Release system is already built and QA-passed. Preserve exact SHA/version identity and rollback; act when a bounded build reaches a true release gate. Do not recreate preview-gated architecture. |
| MASTER RECON OS | **STANDBY / TRIGGERED INTEGRITY** | Reset is complete. Wake for state/lineage conflict, worker drift, exact-candidate validation, release-integrity checks, or owner-directed RECON. |

## 9. Build sequence

1. **Homepage reconstruction** — owner-approved current look, hero and freight presentation.
2. **Retail navigation** — Shop / Vendors / Freight & Hawaii / Start a Project; remove distractions.
3. **Canonical vendor catalog** — approved supplier truth only.
4. **Product detail** — normal commercial retail presentation.
5. **Cart** — durable, editable, server-revalidated.
6. **Checkout + PayPal** — PayPal Orders v2 + durable Elevation order + idempotency.
7. **Fulfillment routing** — supplier/freight source recorded and operable.
8. **Hawaii/freight gates** — fail closed where route/cost approval is missing.
9. **Production-parity smoke** — exact candidate/runtime version proof.
10. **Same-version cutover/promotion** — live verify + receipt.
11. **First real order** — prove payment → order → source → fulfillment → realized margin.

## 10. Holds

Do not delay this sequence for:

- Ops V2 dashboards;
- broad CMS/admin rebuild;
- marketplace/list-a-vehicle systems;
- collector features;
- new social/channel expansion;
- speculative AI commerce;
- unrelated home-service expansion;
- another visual redesign.

## 11. RUN

`RUN` means:

**RE-RESOLVE MAIN → READ THIS WORKTREE → EXECUTE NEXT REVENUE-CRITICAL BOUNDED TASK → QA → MERGE → UPDATE WORKTREE → CONTINUE UNTIL TRUE GATE.**

Do not stop merely because a later phase is waiting if the next earlier phase is executable.

Do not skip the active homepage baseline to start release work. After homepage acceptance, route directly into authorized Commerce work rather than restoring an obsolete Commerce WAIT gate.

## Control phrase

**KEEP THE HOMEPAGE → SELL THE PARTNERS → CART → PAYPAL → ORDER → FULFILL → FREIGHT / HAWAII CONTROL → PRODUCTION-PARITY SMOKE → SAME VERSION LIVE → MAKE MONEY.**
