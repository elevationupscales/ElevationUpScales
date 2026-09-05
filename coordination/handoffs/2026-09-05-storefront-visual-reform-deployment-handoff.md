# Elevation UpScales — Storefront Visual Reform → Deployment Handoff

**Date:** 2026-09-05  
**Workstream:** Website Visual / Graphics  
**Visual worker state:** COMPLETE — READY FOR DEPLOYMENT WORKER  
**Production promotion performed by visual worker:** NO

## Authority / latest owner direction

The owner supplied and approved two controlling visual references on 2026-09-05:

1. the original Elevation + SOK storefront reference defining the target visual language; and
2. a new Elevation UpScales wordmark reading **OFF-GRID POWER • SUPPLY • LOGISTICS** for storefront applications.

This is **not a company-wide rebrand**.

### Storefront identity rule
Use the new wordmark on the power/storefront customer journey:
- homepage retail presentation;
- Lithium Battery Shop;
- SOK catalog and SOK product/purchase-option surfaces;
- RV & Outdoor Store;
- Hawaii lithium / freight storefront;
- product-detail and checkout surfaces associated with the retail journey.

Keep the Bull + Bear identity for:
- Apparel Store (`/store`);
- internal/Admin/management surfaces;
- service/non-store areas;
- other non-store brand applications where the original mark is appropriate.

## Production / repository lineage resolved by visual worker

Latest accepted production receipt read before closeout:
- accepted production application SHA: `176dbd96cac420b1e52e4fb19ab2483a6caeb46b`
- accepted production baseline: `baseline-2026-09-05-website-integrity-sok-homepage-analytics-production`
- canonical: `https://elevationupscales.com`

Current repository `main` used as the visual-parent source at start:
- `1ab4f033b395a441336428cf651a89d2921b4b3c`

**Important:** repo `main` and accepted production are not assumed identical. Deployment must re-resolve both immediately before preview/production.

## Clean deployment handoff

Branch:
`handoff/storefront-visual-reform-2026-09-05`

Visual application candidate commit:
`37e6f88a490af4ec62ebe7a0c5d88b7ae38df2c4`

Parent:
`1ab4f033b395a441336428cf651a89d2921b4b3c`

The handoff branch was rebuilt cleanly from current main so deployment does not need to review the visual worker's scratch history.

## Net visual application files

1. `site/assets/brand/storefront-wordmark.webp`
   - approved owner-supplied storefront wordmark;
   - localized in repository;
   - source image converted to optimized WebP;
   - SHA-256 of localized WebP at visual preparation: `ed096e555b5e7e305b4d3b09f718f4fc119c9db6d9baf0b097591dad261f1423`.

2. `site/assets/brand/storefront-wordmark.note.txt`
   - source/provenance note for the approved asset.

3. `site/index.html`
   - homepage re-composed toward the owner's original storefront reference;
   - Power Beyond the Grid hierarchy;
   - compact SOK proof/purchase panel using existing local official media;
   - five compact visual shopping routes;
   - freight/logistics treated as a core retail capability;
   - existing Catalog/SOK commerce hooks preserved.

4. `site/retail-first.css`
   - consolidated reference-driven storefront visual system;
   - dark charcoal/black foundations, restrained electric-cyan accents, thin borders, tighter radii and spacing;
   - route-aware new-wordmark presentation;
   - explicit Apparel Store exclusion so Bull + Bear remains intact there;
   - unified Home/Lithium/SOK/RV/Hawaii/Product/Checkout presentation;
   - responsive/mobile treatment;
   - reduced-motion handling;
   - no commerce/runtime decisions encoded.

5. `site/sok-batteries.html`
   - SOK catalog header brought into shared storefront navigation contract;
   - existing SOK catalog/runtime data hooks preserved.

6. `site/sok-order.html`
   - Purchase Options explicitly opted into storefront visual shell;
   - purchase form fields, IDs, runtime hooks and Hawaii/commercial behavior preserved;
   - no payment/shipping logic changed.

## Visual system result

Target identity is now:
- premium dark power-retail presentation;
- white primary typography;
- electric-cyan accent and restrained glow;
- thin outlined panels rather than rounded SaaS-style cards;
- consistent button geometry;
- consistent section rhythm;
- product imagery framed cleanly and with `object-fit: contain` where product identity matters;
- shared store navigation and customer-facing brand hierarchy;
- Elevation remains primary while Authorized SOK Energy Dealer treatment remains preserved.

## Protected commerce systems — unchanged by this work

No visual-worker changes were made to:
- SOK MAP/public pricing controls;
- supplier cost or inventory;
- PayPal or payment processing;
- checkout JavaScript/server behavior;
- Hawaii 1–3 standard freight-review / 4+ commercial-review policy;
- carrier/DG/economics logic;
- Catalog source-of-truth behavior;
- Doba CSV sync;
- promotion/pricing importer logic;
- Marketplace architecture;
- database schema or production data.

The accepted SOK local official media and local spec sheets remain the source for the initial SOK products. No SOK hotlinks were introduced.

## Product-image reform status

### Completed
- SOK hero/product context continues to use accepted local official media.
- shared storefront image framing/fallback presentation standardized.
- owner-approved storefront wordmark localized.

### Exact-SKU media items intentionally deferred — DO NOT GUESS
The visual audit identified live/legacy image-control issues that require supplier identity verification before replacement:

1. VEVOR rechargeable spotlight — exact VEVOR family corroborated; localize exact authorized image when source relationship is re-confirmed.
2. 8L tankless water heater — replace unrelated `utedusjer.no` image with exact Doba `D01027HXHHA` supplier media.
3. 12V electric scissor jack + wrench — exact supplier SKU/model must be re-established before replacement.
4. VEVOR 12V 5.5 GPM / 70 PSI diaphragm pump — official VEVOR product corroborated; replace Walmart-hosted image only after exact Catalog source confirmation.
5. VEVOR 5.3-gallon metal fuel can — exact color/pack variant must be confirmed before replacement.

Legacy `site/rv-ebay-catalog.js` third-party retail/CDN image URLs remain discovery evidence only and are **not** approved media merely because they exist in the repo.

These deferred exact-SKU media corrections are not a blocker to deploying the completed visual shell, provided deployment does not widen scope or auto-promote legacy images.

## Deployment-worker acceptance pass

Deployment worker should now:

1. Re-resolve current repo `main` and accepted production application SHA separately.
2. Confirm the handoff candidate still descends from / cleanly applies to current accepted lineage; rebase/reconstruct if newer conflicting storefront work exists.
3. Verify net application diff is presentation-only and matches the six visual application files above.
4. Run canonical repository QA and the existing commerce/SOK regression gates.
5. Deploy an isolated preview — not production first.
6. Visual-check desktop + mobile at minimum:
   - `/`
   - `/lithium-batteries`
   - `/sok-batteries`
   - `/sok/sk12v100pc/`
   - `/sok/sk48v100n/`
   - `/sok-order.html?sku=SK12V100PC&intent=purchase_options`
   - `/rv-store`
   - `/hawaii-lithium-batteries`
   - `/product` with a valid current product
   - `/checkout/` with a valid eligible product
   - `/store` specifically to confirm Bull + Bear / Apparel identity remains intact.
7. Verify the new wordmark is crisp, correctly scaled, not stretched and not used in Apparel/non-store areas.
8. Verify mobile menu, header height, CTA visibility, image containment, product cards and forms.
9. Re-run SOK MAP, Hawaii routing, PayPal/checkout and protected-data regression gates.
10. Promote production only under Deployment/Management authority after preview passes.
11. Create immutable/canonical production receipt and rollback baseline.

### Cache note
Current `_headers` policy marks `site-shell.js` no-cache/no-store and CSS `max-age=3600, must-revalidate`. Deployment may purge/bump the retail stylesheet query during the normal production pass if immediate cache invalidation is desired; no long-lived visual cache dependency was introduced by the visual worker.

## Master Status update block

**Workstream:** Storefront Visual / Graphics Reform  
**Previous state:** Reference-inspired visual pass present but inconsistent across Home/Lithium/SOK/RV/Hawaii/Product/Checkout; old Bull + Bear mark still used throughout retail surfaces; owner supplied revised storefront wordmark and clarified visual-worker/deployment boundary.  
**New state:** VISUAL WORK COMPLETE / CLEAN HANDOFF READY FOR DEPLOYMENT PREVIEW. New storefront wordmark localized and route-scoped; Apparel retains Bull + Bear; reference visual system unified across retail journey; SOK catalog + Purchase Options aligned.  
**Authoritative SHA:** visual application candidate `37e6f88a490af4ec62ebe7a0c5d88b7ae38df2c4` on `handoff/storefront-visual-reform-2026-09-05`  
**Production state:** UNCHANGED BY VISUAL WORKER  
**Controlling handoff:** `coordination/handoffs/2026-09-05-storefront-visual-reform-deployment-handoff.md`  
**Completed:** owner reference alignment; storefront wordmark localization/scope; homepage composition; shared storefront visual system; SOK catalog header; SOK Purchase Options visual integration; route/mobile visual coverage preparation; media audit.  
**Blockers / anomalies:** deployment must re-resolve main vs accepted production; five exact-SKU third-party product-image replacements remain evidence-gated and must not be guessed.  
**Deferred:** exact-SKU localization for the five audited RV/Outdoor media items; any additional supplier-gallery cleanup requiring fresh supplier evidence.  
**Rollback reference:** deployment must create rollback baseline when production pass is accepted; last accepted pre-visual production baseline is `baseline-2026-09-05-website-integrity-sok-homepage-analytics-production`.  
**Next action:** Deployment worker runs isolated preview + full regression/visual acceptance, then production promotion under management authority.  
**Parked work still untouched:** yes

## Final visual-worker disposition

**READY FOR DEPLOYMENT WORKER.**

The visual worker is complete for this reform scope. Deployment owns preview execution, production promotion, rollback creation and final production receipt.
