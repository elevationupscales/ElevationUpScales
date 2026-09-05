# SOK 4.6 — AUTOMATED SMOKE TEST + RELEASE GATE DIRECTIVE

**Date:** 2026-09-04  
**Authority:** Elevation UpScales Management / Business Plan Management  
**Branch:** `work/sok-4-6-catalog-commercialization-2026-09-04`  
**Status:** APPROVED TO IMPLEMENT  

## Purpose

Deployment should stop treating the SOK commercialization smoke pass as a mostly manual checklist.

The repository already contains a controlled release workflow at:

`.github/workflows/release-candidate-gate.yml`

That workflow already performs:

- current-main ancestry validation;
- protected-file checks;
- production-invariant checks;
- JavaScript syntax checks;
- Cloudflare Pages file/credential checks;
- isolated candidate preview deployment;
- basic route smoke testing;
- release-candidate step summary;
- **no production promotion**.

Do **not** replace this workflow with a second release system.

Extend the existing release-candidate process so SOK commercialization becomes a repeatable automated gate.

---

# MANAGEMENT OBJECTIVE

The desired operating pattern is:

**BUILD → AUTOMATED STATIC CHECKS → ISOLATED PREVIEW → AUTOMATED SOK SMOKE → RELEASE RECEIPT → MANAGEMENT PRODUCTION GATE → PROMOTE → AUTOMATED POST-PROMOTION SMOKE → ACCEPT BASELINE**

Human review should focus on actual business/policy exceptions and visual judgment, not manually rechecking the same technical invariants every release.

---

# 1. EXTEND THE EXISTING RELEASE-CANDIDATE GATE

Preserve the current lineage and preview controls in `release-candidate-gate.yml`.

Add SOK-specific commercialization smoke coverage to that same controlled pipeline, preferably by moving reusable checks into one or more scripts under a clear QA location such as:

`deployment/qa/`

or an equivalent existing repository convention.

The same smoke implementation should be callable:

- locally by Deployment;
- from the candidate-preview workflow;
- from a post-production verification workflow.

Avoid maintaining three different copies of the same smoke logic.

---

# 2. REQUIRED ROUTE SMOKE

The isolated preview must return a successful customer-facing response for at least:

- `/`
- `/store`
- `/rv-store`
- `/lithium-battery-shop` or the current canonical lithium route
- `/sok-batteries`
- SK12V100PC product detail route
- SK48V100N product detail route
- `/hawaii-lithium` or the current canonical Hawaii lithium route
- `/solar-project`
- `/start-a-project`
- `/marketplace`
- commercial inquiry route/panel endpoint when implemented

Use the repository's actual canonical routes. Do not invent duplicate URLs just to satisfy this list.

A redirect is acceptable only when it resolves to the intended canonical route and ends in a valid customer page.

---

# 3. SOK CATALOG CONTENT SMOKE

Automated preview checks must prove:

## `/sok-batteries`

- page loads successfully;
- Elevation remains the primary storefront brand;
- **Authorized SOK Energy Dealer** treatment is present;
- SK12V100PC is discoverable;
- SK48V100N is discoverable;
- product imagery resolves locally;
- product literature/spec-sheet links resolve locally;
- no production SOK media is hotlinked to a third-party source;
- customer CTA is derived from product state rather than hard-coded globally.

## SK12V100PC

Verify customer-safe product identity includes the correct model and current verified electrical values used by production.

Current known anchor values:

- 12.8V nominal;
- 100Ah;
- 1280Wh.

## SK48V100N

Verify customer-safe product identity includes:

- 51.2V nominal;
- 100Ah;
- 5120Wh / 5.12kWh.

Do not expose MSDS/UN38.3/compliance packets publicly unless separately authorized.

---

# 4. PURCHASE-MODE MATRIX TEST

Automate coverage for the existing per-SKU purchase modes:

- `CATALOG_ONLY`
- `CONTACT_TO_ORDER`
- `PURCHASE_OPTIONS`
- `DIRECT_CHECKOUT`
- `UNAVAILABLE`

The test should prove the public CTA generated for each mode matches the intended behavior.

At minimum:

### `CATALOG_ONLY`

Customer can view product information but is not falsely offered immediate checkout.

### `CONTACT_TO_ORDER`

Customer gets a working assisted-contact path.

### `PURCHASE_OPTIONS`

Customer gets a usable Purchase Options panel, not a dead end.

### `DIRECT_CHECKOUT`

Customer gets the normal approved checkout path only when all required gates pass.

### `UNAVAILABLE`

Customer does not enter payment.

Do not mutate production records merely to run the test. Use fixtures, protected QA state, preview overrides, or another deterministic test mechanism.

---

# 5. PRE-PURCHASE / BACKORDER MATRIX

Preserve the existing availability architecture and automatically prove:

- Available product renders the approved normal availability state;
- Pre-Purchase product renders clear pre-purchase wording and timing disclosure;
- Backorder product renders backorder wording and timing disclosure;
- unavailable product without approved replenishment cannot proceed to payment;
- pre-purchase does not become fake `IN STOCK`;
- backorder does not become fake `IN STOCK`;
- neither state bypasses Hawaii, carrier, economics, MAP, payment, or quantity gates.

Availability state and public purchase mode remain separate dimensions.

---

# 6. HAWAII CONTROLLED-LAUNCH TEST MATRIX

This is a hard release gate.

For an otherwise eligible SOK Hawaii product, prove:

### Quantity 1

Can follow the authorized Hawaii qualification path.

### Quantity 3

Can follow the authorized Hawaii qualification path.

### Quantity 4

Cannot enter normal payment.

Must return customer-safe commercial review behavior such as:

**COMMERCIAL QUANTITY — FREIGHT REVIEW REQUIRED**

with the approved commercial quote/purchase-options path.

Also prove:

- no customer-facing text calls the 3-unit cap a DOT/legal/carrier/H2O/SOK maximum;
- pre-purchase does not bypass the quantity gate;
- backorder does not bypass the quantity gate;
- a not-yet-Hawaii-qualified SOK SKU remains visible but routes to freight/purchase review;
- Lower-48 quantity behavior is not changed by the Hawaii-only operational control;
- legacy SOK Hawaii **Included Freight** implication is absent.

Do not require a real PayPal charge to run CI smoke.

Use protected test/preview behavior that proves whether the payment gate would open or remain blocked.

---

# 7. SOK MAP — HARD AUTOMATED RELEASE GATE

MAP validation must be machine-enforced before production promotion.

For every published SOK SKU with a public merchandise price:

**effective public merchandise price >= current authoritative SOK MAP**

Current known anchors are:

- SK12V100PC — $319 MAP
- SK48V100N — $1,199 MAP

Do not make these two literal values the only permanent MAP architecture. The test should read the authoritative SOK MAP/configuration source used by the application whenever possible.

The gate must also test active customer promotions/coupons against SOK pricing.

Specifically prove:

- LABORDAY25 cannot reduce SOK merchandise below MAP;
- a future promotion cannot silently reduce SOK merchandise below MAP;
- shipping, taxes and separately quoted freight remain distinct from merchandise MAP calculation;
- MAP failure stops the candidate workflow.

If a published SOK SKU lacks a required MAP record, fail closed rather than guessing.

---

# 8. COMMERCIAL INQUIRY SMOKE

The commercial inquiry path must remain available even after a product becomes direct-checkout ready.

Automated checks should prove:

- exact SOK SKU is carried into the inquiry;
- product URL/context is carried;
- quantity is carried when known;
- destination can be captured;
- one-time vs recurring demand can be captured where implemented;
- no supplier cost, dealer sheet, margin, internal warehouse route or internal carrier calculation is exposed.

## Current unresolved destination

The public inquiry destination remains a Management-configurable value.

Do not invent an address.

Automation should support two states:

### Destination configured

Full protected QA submission can be exercised using a test sink / QA mode without emailing a real customer or creating unwanted business mail.

### Destination not configured

The build may still pass implementation smoke **only if** the customer cannot submit into a dead endpoint.

No blank `mailto:`.
No `#` placeholder.
No discarded POST.
No fake success confirmation.

Public activation of the actual inquiry submission remains gated until Management supplies the destination.

---

# 9. SUPPLIER-DATA EXPOSURE GATE

Fail the release candidate if public responses/source expose protected upstream fields or values.

Continue testing for the existing protected boundary, including as applicable:

- supplier/source name where not approved for customer use;
- supplier cost;
- raw supplier stock count;
- source URL;
- source type;
- fulfillment mode;
- internal warehouse routing;
- internal freight cost;
- margin;
- pricing floor;
- reconciliation/import state;
- internal PO state;
- private SOK compliance packets.

The customer should receive only approved public catalog state.

---

# 10. MEDIA / LITERATURE INTEGRITY

Automate checks that:

- required SOK hero/product images return successfully;
- required SOK spec-sheet files return successfully;
- production HTML/JS does not depend on external SOK image hotlinks;
- no broken image URL is introduced on SOK catalog/product pages;
- local literature remains matched to the correct SKU.

Do not fail a release solely because an optional secondary gallery asset is absent unless the application declares that asset required.

---

# 11. SOLAR BUILDER SOK CHECK

Once SOK is introduced into the Solar Builder, automated smoke should prove:

- SK48V100N only appears where the builder considers the configuration compatible;
- SK12V100PC only appears in appropriate 12V/RV/small off-grid contexts;
- calculated capacity labels for SK48V100N use 5.12kWh per battery;
- customer-facing capacity math for 1/2/3/4 units is correct when shown;
- no unverified system compatibility claim is generated;
- Solar Builder still functions when no SOK product is appropriate.

Do not delay the whole commercialization release on Solar Builder automation if that feature is intentionally staged later; instead mark the test `NOT_APPLICABLE` until the feature enters the candidate scope. Once present, it becomes required.

---

# 12. ANALYTICS SMOKE

For the SOK commercialization layer, verify meaningful events can be emitted without storing private supplier data.

Preferred customer/business events include equivalents of:

- SOK catalog viewed;
- SOK product viewed;
- purchase options opened;
- commercial inquiry started;
- Hawaii purchase options opened;
- direct checkout initiated;
- commercial inquiry submitted, once enabled.

Do not instrument every click.

Automation should prove the event names/payload shape do not contain supplier cost, internal stock, margin or compliance documents.

---

# 13. MOBILE / BASIC VISUAL SAFETY

Where practical in the existing stack, add automated viewport checks for the main SOK catalog/product purchase surfaces.

At minimum detect obvious failures such as:

- horizontal overflow;
- purchase CTA pushed off-screen;
- missing product image;
- overlapping purchase-option controls;
- unusable quantity input;
- inaccessible commercial/Hawaii action.

Do not introduce a heavyweight browser-testing dependency solely for cosmetic screenshot comparison if the repository can satisfy the requirement more simply.

If an existing browser automation framework is already available, reuse it.

---

# 14. AUTOMATED RECEIPT

Every candidate run should produce one clear machine-readable and human-readable result.

The receipt should include at minimum:

- candidate SHA;
- required/current production parent SHA;
- preview URL;
- test timestamp;
- route smoke result;
- SOK catalog result;
- purchase-mode result;
- pre-purchase/backorder result;
- Hawaii 1/3/4+ result;
- MAP result;
- commercial inquiry result;
- supplier-exposure result;
- media/literature result;
- Solar Builder result or `NOT_APPLICABLE`;
- analytics result or `NOT_APPLICABLE`;
- protected regression result;
- final candidate status: `PASS` or `BLOCKED`;
- production promotion: `NOT PERFORMED` during candidate gate.

Prefer storing the receipt as a workflow artifact and GitHub step summary so Management can inspect it without reading raw logs.

A failure should identify the exact failed assertion and route/SKU involved.

---

# 15. POST-PRODUCTION SMOKE

After Management explicitly approves production promotion, automatically run a smaller read-only smoke set against the canonical production site.

Verify at minimum:

- homepage;
- lithium shop;
- `/sok-batteries`;
- both priority SOK product pages;
- Hawaii lithium page/path;
- public pricing/MAP state;
- customer-safe purchase CTA;
- no supplier-data leak;
- local product/spec media resolves.

If post-production smoke fails:

- mark the deployment **NOT ACCEPTED**;
- surface the exact failure immediately;
- do not create/advance the accepted production baseline receipt;
- do not automatically perform an undocumented rollback.

Rollback remains controlled by the existing release procedure unless a separately reviewed automated rollback policy is created later.

---

# 16. NO AUTOMATIC PRODUCTION PROMOTION

Automation should reduce repetitive QA work, not remove Management's final production gate.

The candidate workflow may automatically:

- validate lineage;
- build/check files;
- deploy an isolated preview;
- run smoke/regression tests;
- generate receipts.

It must **not automatically promote the SOK candidate to canonical production** merely because smoke passes.

The required final state before Management approval is:

**CANDIDATE PASS / READY FOR PRODUCTION PROMOTION**

Then Management approves the actual promotion.

---

# 17. IMPLEMENTATION PRIORITY

Deployment should implement this automation alongside the SOK commercialization work rather than waiting until the end.

Preferred order:

1. Preserve/extend `release-candidate-gate.yml`.
2. Extract reusable smoke logic.
3. Add `/sok-batteries` and priority product route coverage.
4. Add MAP + Hawaii gates early.
5. Add purchase-mode and availability matrix fixtures.
6. Add supplier-exposure checks.
7. Add inquiry tests when inquiry implementation lands.
8. Add Solar Builder/analytics checks when those features land.
9. Add post-production read-only verification.
10. Return one candidate receipt to Management at the final promotion gate.

Do not stop for routine approval while implementing these tests.

Stop only if automation uncovers a genuine unresolved Management policy decision or if the candidate is ready for final production promotion.

---

# ACCEPTANCE STANDARD

The goal is not simply `curl returned 200`.

A SOK commercialization release is ready only when automation proves:

**THE PAGE LOADS + THE PRODUCT IS CORRECT + THE CTA IS CORRECT + MAP IS SAFE + HAWAII IS SAFE + INTERNAL DATA IS PRIVATE + THE CUSTOMER HAS A WORKING NEXT STEP.**

Management status:

**AUTOMATED QA / SMOKE EXPANSION — APPROVED TO IMPLEMENT**

**AUTOMATIC PRODUCTION PROMOTION — NOT AUTHORIZED**
