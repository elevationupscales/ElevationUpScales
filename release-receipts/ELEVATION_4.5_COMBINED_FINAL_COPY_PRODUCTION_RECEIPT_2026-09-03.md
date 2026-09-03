# Elevation UpScales, Inc. — Elevation 4.5 Combined Final Copy Production Receipt

**Production date:** September 3, 2026  
**Status:** PRODUCTION DEPLOYED / VERIFIED / CLOSED / ACCEPTED  
**Canonical:** https://elevationupscales.com  

## Release control

- Prior accepted application baseline: `2cafb2274d1fbd7733068853554bef68fcf5c02d`
- Final deployed application SHA: `31d2bb33d5dabd94ac007ff8ebcdc3b98a3dbfcf`
- Production workflow runner commit: `ac5d71b50d47954423c37156b0fafc2cbc022c96`
- GitHub Actions production run: `33800006333`
- Immutable Cloudflare Pages deployment: `https://7ca9afc9.elevationupscales.pages.dev`
- Canonical production: `https://elevationupscales.com`
- Database migration: none
- Historical emergency rollback retained: `071b69ceddecaa51516ad01d762360a468c00925`

The production workflow explicitly fetched and detached to the exact application SHA `31d2bb33d5dabd94ac007ff8ebcdc3b98a3dbfcf` before deployment. The exact source gate verified that the final application was a clean descendant of `2cafb2274d1fbd7733068853554bef68fcf5c02d` and that the final copy repair changed only:

- `site/index.html`
- `site/start-a-project.html`
- `site/start-a-project/index.html`
- `site/store.html`

No temporary workflow or migration files were included in the deployed application delta.

## Production deployment proof

Workflow run `33800006333` completed successfully.

The production job passed all stages:

1. exact final production source gate
2. Cloudflare Pages deployment
3. immutable deployment verification
4. canonical custom-domain propagation check
5. full canonical browser commerce smoke
6. final production acceptance summary

Cloudflare production deployment:

`https://7ca9afc9.elevationupscales.pages.dev`

## Canonical production verification

The final Chromium smoke against `https://elevationupscales.com` passed.

### Homepage

- Final humanized copy present: **Shop Current Products**
- Supporting copy present: **Featured products from our Lithium and RV & Outdoor stores.**
- Hawaii CTA present as **Hawaii Lithium Batteries**
- Featured products: **4 Lithium + 4 RV/Outdoor**
- Approved Option 2 Lithium/Solar image decoded successfully at 960×540
- Approved Option 3 Home/RV/Outdoor lifestyle image decoded successfully at 960×540
- Desktop overflow: **0**
- Mobile homepage overflow: **0**
- Homepage footer contains Terms

### Start a Project

- HTTP 200
- Internal management jargon removed
- **Pick the closest match** customer-facing wording present
- Removed public wording included:
  - underlying Project families
  - Intake Intent tells management
  - management review

### Lithium / Hawaii commerce

- Lithium cards: **38**
- Hawaii battery cards: **31**
- Non-battery products on Hawaii page: **0**
- Known 12V 100Ah LiFePO4 smoke SKU resolved to Hawaii checkout correctly

### Promotion / pricing controls

- Lithium products audited: **38**
- Promotion floor failures: **0**
- Coupon failures: **0**
- Labor Day merchandise discount: **25%**
- Freight discounted: **false**

### Shipping controls verified at deployment

- Lower-48 Lithium shipping: **$27.99 per actual battery**
- Hawaii configured freight rule at deployment: **$99 per actual battery**
- Merchandise and Hawaii pickup freight remained separately represented internally
- Known Hawaii exact-SKU state: **Freight Review Required**
- PayPal hidden while freight review is required
- Reservation/request path remains available

The shipping values above record the runtime configuration verified during this production release. They are not a permanent pricing-policy guarantee and may be superseded only by a separately approved pricing/logistics change.

### Terms / public routes

Canonical smoke verified the applicable public/commerce routes and Terms links across the release acceptance set. Core routes returned HTTP 200, including homepage, stores, Lithium, Hawaii Lithium, Start a Project, Product, Checkout, Terms, Privacy, and Admin.

## Independent post-run canonical read

After the workflow completed, an independent canonical read reconfirmed:

- homepage final copy is live
- approved Home/RV/Outdoor lifestyle visual is referenced live
- Hawaii CTA reads **Hawaii Lithium Batteries**
- homepage Terms link is live
- Start-a-Project customer-facing wording is cleaned and jargon-free

One minor follow-up consistency item was identified after acceptance: the Start-a-Project footer still exposes Privacy without a Terms link. This did not fail the defined production smoke suite and does not reopen the release. It should be handled in a later targeted consistency repair.

## Final disposition

**ELEVATION 4.5 COMBINED FINAL COPY HOTFIX: CLOSED / ACCEPTED.**

Production is serving the exact verified application SHA:

`31d2bb33d5dabd94ac007ff8ebcdc3b98a3dbfcf`

Future website work must start from this deployed application SHA or an explicitly accepted descendant. Documentation-only commits above the application SHA must not be treated as a new application deployment unless the `site/` tree changes and is separately verified.
