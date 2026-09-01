# Elevation 4.4 — Labor Day Production Receipt

Status: **PRODUCTION PASS / CLOSED**

## Production promotion

- Previous production SHA: `ff75885cb437b05a390601245359518fea033d08`
- Approved Labor Day candidate SHA: `a125d6995986bbf118a085cf0d1ee3cbd3fc2eb6`
- Production workflow: `33472275330`
- Production rollback baseline: `baseline-2026-08-31-pre-labor-day-production`
- Accepted Labor Day baseline: `baseline-2026-08-31-labor-day-production`

## Verified production behavior

- Labor Day promotional pricing: PASS
- 60% promotional markup / 35% inactive everyday pricing: PASS
- `LABORDAY25` 25% eligible-merchandise coupon: PASS
- Shipping excluded from coupon: PASS
- Doba 45% export cost recovery: PASS
- PayPal amount breakdown and canonical live configuration: PASS
- Lithium battery shipping: $27.99 per battery unit: PASS
- Quantity 1/2/3 shipping: PASS
- Alaska standard lithium checkout block: PASS
- Hawaii Lithium Program / separate quote routing: PASS
- Apparel coupon exclusion: PASS
- Marketplace promotion exclusion: PASS
- Manipulated client pricing rejection: PASS
- Lithium Catalog/storefront parity: PASS
- RV Catalog/storefront parity: PASS
- Product-detail regression: PASS
- Admin unauthenticated boundaries: PASS
- Homepage Funnel regression: PASS
- Desktop 1440×900: PASS
- Mobile 390×844: PASS
- Horizontal overflow: none
- Browser page errors: none

## Production disposition

The exact approved application candidate was deployed to the Cloudflare Pages production branch and verified on the canonical domain. Rollback was armed during verification but was not required.

The next website release must use this accepted Labor Day production baseline or a verified descendant as its parent. The homepage copy/font/usability finish-work addendum is a separate release and must preserve all Labor Day commerce behavior.
