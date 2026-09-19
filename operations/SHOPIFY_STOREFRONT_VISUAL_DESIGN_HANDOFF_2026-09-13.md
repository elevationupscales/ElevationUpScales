# ELEVATION UPSCALES — SHOPIFY STOREFRONT VISUAL DESIGN HANDOFF

**Date:** 2026-09-13  
**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Recipient:** Shopify Store Operations Manager  
**Source:** Storefront Visual Designer  
**Status:** READY FOR IMPLEMENTATION  
**Priority:** CONVERSION + TRUST

---

## 1. PURPOSE

This handoff records the approved visual direction for the live Elevation UpScales Shopify storefront.

Primary objective:

**REAL COMPANY + REAL PRODUCT + REAL APPLICATION.**

The storefront currently presents too much like a generic starter Shopify catalog. The visual redesign should improve first-impression trust, reduce the appearance of an automated/AI-built or generic dropship storefront, and make Shopify feel like the commerce extension of Elevation UpScales.

This is a bounded storefront visual/trust treatment. Do not alter pricing, product truth, checkout rules, fulfillment logic, inventory controls, vendor rules, or existing commerce operations except where a storefront visual element directly requires it.

---

## 2. LIVE STOREFRONT RECON — PROBLEM FOUND

Observed storefront state during visual recon:

- generic announcement: `Welcome to our store`;
- plain starter-style header/navigation;
- generic illustrated hero;
- hero copy: `Browse our latest products`;
- generic `Shop all` CTA;
- mixed product catalog appears immediately below the hero;
- first screen does not establish strong real-company, technical, authorized-dealer, or product-support credibility.

The core problem is not lack of products. It is lack of immediate trust hierarchy.

The first five seconds should answer:

1. Who is Elevation UpScales?
2. What does Elevation actually sell and support?
3. Why should a customer trust this store with a high-value battery/solar/RV purchase?
4. Are these legitimate supplier relationships?

---

## 3. APPROVED HERO DESIGN

### Approved asset

The final approved hero has already been uploaded into Shopify Files as:

`elevation-shopify-hero-authorized-dealers-final.png`

**Use this exact approved artwork. Do not regenerate, restyle, or substitute it without owner approval.**

### Approved visual concept

The hero uses a photorealistic off-grid/RV application scene rather than generic illustration:

- RV electrical/power installation;
- technician actively working on equipment;
- lithium battery / solar context;
- mountain/outdoor environment;
- Elevation UpScales brand presentation;
- real-use-case visual framing instead of abstract ecommerce artwork.

### Approved headline hierarchy baked into the hero

`AUTHORIZED OFF-GRID POWER & RV SUPPLY`

`Power Your RV.`  
`Build Your Off-Grid System.`  
`Buy With Confidence.`

Supporting message:

`Lithium batteries, solar, charging and RV equipment from trusted manufacturers — backed by real product support from Elevation UpScales.`

Trust presentation includes:

- Authorized Dealer;
- U.S.-based business;
- Secure checkout;
- Real product support: `208-813-4998`.

---

## 4. AUTHORIZED DEALER / PARTNER ACCURACY — LOCKED

Owner clarification is authoritative:

**Elevation UpScales is an authorized dealer of every brand shown in the approved hero strip:**

- SOK;
- Renogy;
- VEVOR;
- Winegard.

### Critical correction already made

An earlier design incorrectly displayed **Victron Energy** as a partner/dealer brand.

That was rejected and corrected.

**DO NOT reintroduce Victron dealer/partner messaging into this Shopify hero or related trust strip unless Casey separately authorizes it later.**

The approved final hero uses **Winegard** instead.

---

## 5. CTA / BUTTON IMPLEMENTATION — IMPORTANT

Owner correctly identified that CTA buttons baked into an image are not functional Shopify controls.

The final approved hero artwork therefore does **not** use fake clickable CTA buttons as part of the banner design.

### Implementation rule

If storefront CTAs are desired, build them as **native Shopify/theme elements layered below or adjacent to the hero**, not as artwork inside the image.

Recommended functional CTAs:

- `Shop Batteries`
- `Shop Solar & RV`

Each CTA must have a real destination and be tested after implementation.

Do not create visual buttons that appear clickable but are only pixels inside the hero image.

---

## 6. P0 HOMEPAGE IMPLEMENTATION

### P0.1 — Replace current generic hero

Replace the existing generic illustrated hero with:

`elevation-shopify-hero-authorized-dealers-final.png`

### P0.2 — Remove old overlay content

Remove or disable the existing hero overlay that currently produces:

- `Browse our latest products`
- `Shop all`

Do not allow old theme copy/buttons to cover or duplicate the approved hero artwork.

### P0.3 — Replace default announcement

Remove:

`Welcome to our store`

Recommended replacement:

`Authorized Off-Grid Power & RV Supply | Real Support: 208-813-4998`

Keep it concise, readable, and credible.

### P0.4 — Functional CTAs only

If buttons are added around the hero, they must be theme-native and clickable.

Recommended destinations should resolve to the correct collections once the Shopify Manager confirms current collection structure.

### P0.5 — Responsive QA

Verify desktop and mobile rendering.

Preserve:

- left-side headline readability;
- right-side technician/product context;
- bottom authorized-dealer brand strip;
- logo visibility;
- trust/support information.

Do not crop the partner strip or key headline content on mobile.

---

## 7. P1 HOMEPAGE STRUCTURE

Do not send customers directly from the hero into a visually random mixed product wall.

Recommended next section:

### SHOP BY MISSION

**RV POWER**  
Batteries, charging, refrigeration & upgrades

**SOLAR & OFF-GRID**  
Panels, batteries, controllers & system equipment

**BACKUP POWER**  
Storage, inverters & emergency power

**RV & OUTDOOR**  
Practical gear selected for mobile/off-grid use

Desired homepage hierarchy:

**Hero → trust/dealer proof → Shop by Mission → featured power products → Why Elevation → broader catalog**

This makes supplier inventory feel intentionally curated by Elevation instead of automatically imported.

---

## 8. TRUST / AI VISUAL RULE

Customer-facing trust should come from verifiable business substance, not synthetic presentation alone.

Use design/AI as a composition tool, but establish legitimacy with:

- actual authorized-dealer relationships;
- correct supplier brands;
- real support phone/contact information;
- real company identity;
- secure checkout;
- shipping/returns/support clarity;
- real project, installation, customer, and team photography as those assets become available.

The storefront should never imply an authorization, partnership, certification, or product relationship that has not been confirmed by the owner/vendor record.

---

## 9. DOMAIN / BRAND CONTINUITY RECOMMENDATION

During recon, the customer-facing storefront was visible on the raw Shopify domain:

`ggwt0c-41.myshopify.com`

If customers are still being routed there directly, this is a trust leak.

Recommended follow-up: use an Elevation-branded commerce domain/subdomain or otherwise ensure customers experience the Shopify store as part of the official Elevation brand surface.

This is a follow-up recommendation, not authorization to alter DNS without the proper owner/operations workflow.

---

## 10. ACCEPTANCE CRITERIA

Storefront visual implementation is accepted only when all applicable checks pass:

- [ ] approved final hero asset is used;
- [ ] old generic hero illustration is gone;
- [ ] old `Browse our latest products` overlay is gone;
- [ ] old `Shop all` overlay is gone or replaced with a real theme-native CTA;
- [ ] `Welcome to our store` is removed;
- [ ] Winegard is present in approved partner/dealer presentation;
- [ ] Victron is absent from partner/dealer claims;
- [ ] SOK, Renogy, VEVOR and Winegard are treated as authorized dealer brands per owner direction;
- [ ] no fake/nonfunctional buttons are baked into the hero;
- [ ] any CTA rendered by Shopify is actually clickable and routes correctly;
- [ ] desktop crop is visually clean;
- [ ] mobile crop preserves headline, application image and authorized-dealer strip;
- [ ] search, navigation and cart remain functional;
- [ ] live storefront is visually verified after publish.

---

## 11. MANAGER ACTION

Shopify Store Operations Manager should treat this as the **approved visual handoff** and integrate it into the existing Shopify worktree without creating a separate management system.

Execution sequence:

**VERIFY CURRENT STOREFRONT → LOCATE APPROVED SHOPIFY FILE → IMPLEMENT HERO → REMOVE DEFAULT OVERLAYS → ADD ONLY FUNCTIONAL CTAS → RESPONSIVE QA → VERIFY LIVE → RECORD RECEIPT**

Do not allow this visual work to block checkout or active sales. If a theme change creates a commerce regression, preserve purchaseability first and repair the visual layer separately.

---

**OWNER DESIGN DIRECTION:** APPROVED  
**HERO ASSET:** READY IN SHOPIFY FILES  
**IMPLEMENTATION:** PENDING SHOPIFY STORE OPERATIONS MANAGER
