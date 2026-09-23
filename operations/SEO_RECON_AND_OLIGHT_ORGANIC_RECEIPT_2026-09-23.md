# Elevation UpScales — SEO Recon + Olight Organic SEO Receipt — 2026-09-23

**Owner:** Casey Young  
**Mode:** GIT FIRST → LIVE SEARCH CHECK → SHOPIFY SEO RECON → BOUNDED TECHNICAL FIX  
**State:** ACTIVE / PARTIAL COMPLETE

## Git check

Current accepted `main` at workflow start:

`013cecbbae70dc3abaed0c481ebf383926537fc8`

Current Work Board and existing Shopify organic-SEO receipt were read before action.

## Live search finding

Current public search verification found both:

- `elevationupscales.com`; and
- the Cloudflare Pages origin `elevationupscales.pages.dev`

appearing as separate public results for substantially the same site content.

This is a technical SEO duplication risk. Canonical tags on the production pages are already present, but the Pages host remains crawlable/indexable.

## Technical SEO repair candidate

Created bounded branch:

`work/seo-preview-domain-indexing-2026-09-23`

Opened PR:

**#240 — SEO: prevent Cloudflare Pages preview indexing**

Candidate behavior:

- preserve normal production custom-domain indexing;
- keep preview URLs usable for QA;
- add host-aware `X-Robots-Tag: noindex, nofollow, noarchive` to `.pages.dev` HTML responses;
- include dynamic SOK HTML pages in that preview-domain guard;
- add dedicated SEO static QA;
- do not alter checkout, pricing, orders, shipping, catalog truth or production deployment state.

Production is not authorized by this receipt.

## Shopify Olight SEO audit

Live Shopify verification found:

- 12 Olight product records;
- 7 ACTIVE;
- 5 DRAFT;
- all 7 ACTIVE products had custom SEO metadata;
- one ACTIVE product, Oclip 2 Pro, had stale SEO copy referencing Premium dock options that were removed from the live product;
- four current DRAFT launch products lacked custom SEO metadata.

## Shopify SEO changes completed

Zero mutation errors.

### Oclip 2 Pro

Corrected the live SEO description so it reflects the current two standard variants only:

- Matte Black
- Orange

The removed Premium dock variants are no longer referenced in SEO metadata.

### Draft readiness SEO

Custom factual SEO metadata was added for:

- Olight Sphere;
- Olight Odin S;
- Olight PL X GL;
- Olight OSIGHT SE.

Product status was not changed by the SEO pass.

### Olight collection

Updated the Olight collection organic metadata to better describe the actual assortment:

**SEO title:**  
`Olight Authorized Dealer | Flashlights, Work Lights & Optics`

**SEO description:**  
`Shop Olight flashlights, clip lights, searchlights and optics from Elevation UpScales, an authorized Olight dealer with U.S. supplier fulfillment.`

No collection membership, price, inventory, status or publication rule was changed.

## Existing SEO control preserved

The prior SOK organic SEO pass remains accepted:

`SHOPIFY_P0_MEDIA_AND_ORGANIC_SEO_RECEIPT_2026-09-13.md`

Do not duplicate that work unless current evidence shows a new defect.

## Next SEO sequence

1. Get PR #240 QA green.
2. Stop at READY TO DEPLOY; production still requires Casey approval.
3. Reconcile sitemap/navigation SEO with the existing open clean-commerce PR #239 rather than creating a competing site-architecture branch.
4. After the current site architecture settles, run one exact crawl/indexability pass for:
   - production canonical URLs;
   - sitemap membership;
   - redirects;
   - duplicate Pages-origin visibility;
   - vendor landing pages;
   - Shopify collection/product discovery.
5. Measure impressions/clicks and organic entry pages before broad content expansion.

## Control statement

**ONE CANONICAL DOMAIN → ONE CURRENT SITEMAP → UNIQUE PRODUCT/COLLECTION SEO → NO PREVIEW-DOMAIN INDEXING → MEASURE ORGANIC ENTRY → FIX ONLY PROVEN GAPS.**
