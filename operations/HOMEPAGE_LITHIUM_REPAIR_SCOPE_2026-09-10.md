# HOMEPAGE / LITHIUM STOREFRONT REPAIR SCOPE — 2026-09-10

Owner: Casey Young
Status: AUTHORIZED FOR ONE BOUNDED DEPLOYMENT PASS
Priority: Repair ASAP only if this is a short bounded pass. If implementation is likely to consume a few hours, STOP after recon and defer until later Dev work.

## SCOPE

This pass is limited to the homepage/lithium-store issues identified by the Owner in the current review. No other design, formatting, content, navigation, commerce, admin, catalog, checkout, supplier, or operational changes are authorized.

1. Homepage copy overload
- Remove the long vendor-network/commercial-freight mission statement from the homepage hero.
- Do not delete the business message from company use; reserve that positioning for the Commercial Freight / Logistics hero or section.
- Keep homepage messaging focused on lithium battery retail and authorized SOK dealer positioning.
- Working homepage hierarchy: Authorized SOK Energy Dealer → Lithium Power for RV, Solar & Backup → concise support line → existing customer actions.
- Do not add new mission copy or a new content system.

2. Homepage hero product visual repair
- Remove the current visual fault where old/cached product imagery and positioned product layers make the selected battery appear over the rack/cabinet.
- Restore a clean temporary two-item presentation using the standalone 12V SOK battery and the prior 48V cabinet/storage visual.
- The two products must not overlap or cover one another.
- Do not build the future product carousel in this pass.
- Audit the relevant preload/cache-busting references so the intended current images load cleanly without a stale-first/overlay effect.

3. Lithium-store branding repair
- Blue Elevation UpScales branding is the standard for the lithium shop / battery retail side.
- Use the approved image asset itself. Do not recreate the logo as HTML text, CSS typography, pseudo-elements, OCR text, or AI-generated lettering.
- Canonical approved source: `/Elevation UpScales/Brand Assets/Approved/Lithium Shop/Elevation_UpScales_Inc_Blue_LithiumShop_FINAL_FONT.png`.
- The clear companion file is reference only: `/Elevation UpScales/Brand Assets/Reference/Lithium Shop Variants/Elevation_UpScales_Inc_Blue_CLEAR_REFERENCE_WRONG_INC_SIZE.png`.
- The companion reference has the useful general format but its `Inc.` font size is wrong and it is not approved for final deployment.
- Audit only homepage/header/hero and lithium/battery retail routes where the logo currently appears as generated/styled words instead of the approved image.
- Preserve artwork, proportions, colors, wording, and final `Inc.` typography.

4. Existing homepage design boundary
- Do not redesign the homepage.
- Do not change unrelated section layouts, colors, spacing systems, navigation, or component styling.
- Do not change SOK product identity, authorized-dealer status, product URLs, purchase modes, checkout/payment behavior, PayPal, Pay Later, Shopify ingestion, pricing, MAP, availability, freight rules, Hawaii/Alaska controls, or admin behavior.
- Do not create a new design layer or workaround stylesheet if the existing conflicting annotation/layer can be safely corrected or removed.

5. Company contact / support professionalism
- The website must present Elevation UpScales as a company with role-based contact paths, not as a single personal phone contact.
- Preserve the Owner phone number where currently appropriate, but do not leave it as the only visible support method.
- Use the verified role addresses below where the corresponding customer intent exists:
  - Customer support / general help / warranty-help entry point: `support@elevationupscales.com`
  - Order-status / fulfillment / shipment questions: `orders@elevationupscales.com`
  - Sales / product purchasing / B2B commercial inquiries: `sales@elevationupscales.com`
  - Owner / strategic contact only where an owner-level or executive route is actually appropriate: `casey@elevationupscales.com`
- Do not use `casey@elevationupscales.com` as the default customer-support address.
- Do not expose internal routing notes, personal mailbox details, forwarding architecture, or private manager contacts.
- Homepage/footer/support surfaces should make at least the general Support email readily visible alongside the existing phone contact.
- Add Orders and Sales only where their intent is clear; do not clutter every page with all addresses.
- Keep current forms/intake routes primary where they are already the intended workflow; role email addresses are supporting contact paths, not replacements for `Start a Project`, checkout, order forms, or other working intake systems.
- Use ordinary `mailto:` links or the site's existing contact component pattern; do not build a new messaging system.
- Verify desktop/mobile rendering and that no contact link points to an unverified or placeholder address.

## VERIFIED ROLE EMAIL SOURCE STATE

These role addresses were previously QA-tested through the production email-routing setup and are approved for public website routing where appropriate:

- `support@elevationupscales.com`
- `orders@elevationupscales.com`
- `sales@elevationupscales.com`
- `casey@elevationupscales.com`

Do not add additional public addresses unless they are separately verified and routed.

## DEV EXECUTION LOCK

This assignment is the currently authorized bounded Dev lane until it reaches a verified terminal state or Casey explicitly changes it.

Before continuing this assignment or starting any later Dev assignment:
- re-resolve current `main`;
- read the newest applicable `/operations/` control delta first;
- reconcile the active branch against that current control state;
- do not assume an older branch base or earlier assignment snapshot is still current;
- if `main` moved and the existing branch is stale or non-mergeable, reconcile/rebuild from current `main` rather than forcing stale work forward;
- do not reopen closed/superseded PRs simply to preserve old paperwork.

Priority changes elsewhere in Operations do not silently cancel this Dev lane. It remains OPEN until explicitly COMPLETE, HELD, SUPERSEDED, or otherwise terminally reconciled.

## EFFICIENCY / STOP RULE

First perform a quick exact-SHA recon of current `main` and identify the minimum files causing these faults: copy overload, product-layer/cache fault, logo-as-text fallback, and missing/weak company contact routing.

If the repair is clearly small and bounded, complete it in one branch/PR with focused QA.

If the repair is likely to require a few hours, broad visual reconstruction, asset pipeline rebuilding, new contact infrastructure, or unrelated refactoring:

**STOP. RETURN HELD / DEFER TO LATER DEV WORK. DO NOT PRESS THE ISSUE DURING ACTIVE DEV PRIORITIES.**

## REQUIRED RETURN

Return only:
- current `main` SHA used;
- root cause(s);
- files changed;
- confirmation that only the stated scope changed;
- confirmation of role-email placement and route intent;
- desktop/mobile verification;
- before/after screenshot proof if available;
- QA result;
- branch, commit SHA, PR number;
- either `SHORT REPAIR COMPLETE / READY FOR REVIEW` or `HELD / MULTI-HOUR WORK — DEFERRED`.
