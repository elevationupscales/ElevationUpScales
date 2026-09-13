# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Status:** **PREVIEW READY — RELEASE ENGINEER ACTIVE / EXACT-VERSION PREVIEW**  
**Reports To:** OS 1.1 Project Manager / MPM  
**Legacy production:** `production-deploy = 894b15cb12bf75a6a8e81b916e2a9bc2de858f88` — LEGACY ONLY / rollback reference  
**Canonical catalog + product-detail merge receipt:** `72694ae9ba5b9952c0460b9f90b380cffde4ff23`  
**Cart merge receipt:** `13b4411fc265a1f7b149ad9207059221fa53db32`  
**Checkout merge receipt:** `f5d3ac7cc4b37e8211a3bb460a8507380b75803d`  
**Order + fulfillment handoff merge receipt:** `cd8e21ef4a89c261a4580b683da54be8a896787a`  
**Preview-readiness merge receipt:** `84e9a2b8986ddeebd9b13a087c0e520c9dd9599c`  
**Preview-readiness branch:** `work/web-v2-preview-readiness-2026-09-13` — **MERGED / CLOSED**

## 1. Mission

Build and verify the customer experience in this order:

**EXPLAIN → SHOP → PRODUCT → CART → CHECKOUT → PAYMENT / ORDER → FULFILLMENT.**

Homepage, retail navigation, canonical catalog, product detail, cart, checkout review, durable-order orchestration and fulfillment routing are merged.

The merged Web V2 application is now **safe to render in an exact-version preview** without falsely activating payment or orderability.

## 2. Preview-readiness state — COMPLETE / MERGED

Preview-readiness controls now proven in the merged application:

- normal storefront rendering does not require `MARKETPLACE_DB`;
- homepage, store/vendor pages, product detail, cart and checkout render with commerce bindings absent;
- current held/non-orderable products remain held and non-orderable;
- no shipping, freight, tax, orderability or `amountDue` value was invented;
- no live PayPal activation was added;
- no Shopify checkout fallback was added;
- no raw card/CVV handling exists;
- `/__version` remains the exact Worker-version proof surface;
- preview robots remain disallowed from indexing;
- existing responsive desktop/tablet/mobile rules remain active;
- featured SOK links remain inside the Web V2 preview via `/shop/sok` rather than escaping to legacy SOK product routes;
- the approved SK12V100PC source was upgraded from the compressed homepage derivative to the clean 2160×2160 exact-SKU image;
- SK48V100N retains the safe clean 1000×265 exact-SKU crop with corrected intrinsic dimensions; the 2000×2000 promotional image was rejected because it contains promotional pricing that is not authoritative for this preview.

QA receipt for preview-readiness implementation head `116823ac28f581538945a1463a7bcd4f658d19a9`:

- **Web V2 QA #93 — PASS**;
- **Pull Request QA #137 — PASS**, including canonical QA and tracked-repository credential scan.

## 3. Commercial activation holds — STILL CONTROLLED

These are payment/commerce activation gates. They **do not block exact preview rendering**:

- Web V2 has no committed, verified `MARKETPLACE_DB` D1 binding identity;
- authoritative shipping/freight amount is not yet available for the general direct-order path;
- authoritative sales-tax amount/disposition is not yet approved/configured for the Web V2 order total;
- final `amountDue` therefore remains unverified;
- the current merged canonical catalog still has no verified orderable SKU;
- PayPal sandbox/live durable-order proof remains pending the required charge/runtime gates.

**DO NOT invent a D1 database ID, shipping amount, freight amount, tax amount, orderability state, `amountDue`, Hawaii eligibility or payment readiness to clear these holds.**

## 4. Worker routing

| Worker | State | Task |
|---|---|---|
| WEB DEVELOPER | **STANDBY / PREVIEW BUILD COMPLETE** | No further mutation unless exact preview exposes a real rendering defect. |
| COMMERCE DEVELOPER | **STANDBY / ACTIVATION WORK PRESERVED** | Resume authoritative freight/payment readiness after preview review; do not block preview. |
| RELEASE ENGINEER | **ACTIVE / CURRENT — EXACT-VERSION PREVIEW** | Take current merged main, create one exact candidate, expose immutable preview, prove `/__version`, return preview URL + Git SHA + Cloudflare Version ID. Stop before production promotion. |
| MASTER RECON OS | **STANDBY / TRIGGERED INTEGRITY** | Wake only for a real lineage, release, charge-authority or preview integrity conflict. |

## 5. Release Engineer handoff

Target sequence:

**CURRENT MERGED MAIN → EXACT CANDIDATE → IMMUTABLE / EXACT-VERSION PREVIEW → `/__version` PROOF → OWNER VISUAL ACCEPTANCE.**

Required release invariant remains:

**ONE APPROVED GIT SHA → ONE CLOUDFLARE VERSION ID → PRODUCTION-PARITY SMOKE OF THAT EXACT VERSION → SAME VERSION PROMOTED/CUT OVER → LIVE VERIFY.**

For this handoff, stop after the immutable preview and version proof.

**DO NOT promote/cut over production automatically. OWNER ACCEPTANCE IS REQUIRED.**

The existing `.github/workflows/web-v2-release.yml` is the candidate-upload path and already binds an exact 40-character Git SHA to the uploaded Cloudflare Worker Version ID. Do not replace that release architecture.

## 6. Visual acceptance target

The preview must let Casey inspect:

- homepage and responsive hero;
- navigation;
- store/vendor pages;
- product detail and held-state presentation;
- cart UX;
- checkout UX;
- desktop/mobile presentation;
- trust copy;
- Hawaii/freight presentation;
- current customer-facing copy;
- exact version identity.

If a transaction-control dependency is unavailable, fail closed for the transaction while preserving the customer-facing preview.

## 7. Next RUN meaning

Until owner visual acceptance is returned, `RUN` for this Worktree means:

**RELEASE ENGINEER → USE CURRENT MERGED MAIN → CREATE EXACT CANDIDATE → IMMUTABLE PREVIEW → PROVE `/__version` → RETURN PREVIEW RECEIPT → STOP BEFORE PRODUCTION.**

After visual acceptance, commerce activation work may resume under a new bounded run without reopening completed storefront phases.

## Control phrase

**STORE EXPERIENCE MERGED → PREVIEW READINESS MERGED → TRANSACTION HOLDS FAIL CLOSED → RELEASE ENGINEER ACTIVE FOR EXACT PREVIEW → OWNER VISUAL ACCEPTANCE BEFORE PRODUCTION.**
