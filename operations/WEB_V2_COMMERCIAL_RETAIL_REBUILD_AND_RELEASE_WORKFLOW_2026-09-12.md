# ELEVATION UPSCALES — WEB V2 COMMERCIAL RETAIL REBUILD + RELEASE WORKFLOW

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Lane:** Web V2 Development  
**Status:** OWNER-DIRECTED / CONTROLLING TARGET FOR THE NEXT WEB V2 BUILD  
**Source main at RECON:** `7a55652a1a59226b40023050ad1aef04ab6e1577`

## 1. OWNER OUTCOME

ElevationUpScales.com must become a functioning commercial online retailer for Elevation's authorized vendor products while preserving the approved visual identity of the current homepage.

The website's first job is:

**EXPLAIN WHAT ELEVATION DOES → MERCHANDISE AUTHORIZED PRODUCTS → ADD TO CART → PAY ELEVATION → HAND OFF TO SUPPLIER / FREIGHT / LOGISTICS FULFILLMENT.**

Company positioning for the public site:

**LITHIUM BATTERIES • OFF-GRID POWER • RV / MOBILE POWER • FREIGHT SHIPPING • HAWAII LITHIUM LOGISTICS**

Elevation began in RV/off-grid lithium and is building a commercial supply + logistics business around authorized distributor relationships and the Hawaii lithium supply gap.

## 2. HOMEPAGE LOCK

The rebuild does **not** authorize a new homepage concept.

The Web V2 homepage must reconstruct the owner-approved current Elevation homepage experience as closely as practical, including:

- current approved hero composition and visual direction;
- current freight/logistics presentation that the owner recently approved;
- current Elevation brand treatment;
- current dark / premium off-grid power aesthetic;
- existing approved logo/image assets;
- mobile-first responsive behavior.

Do not replace that homepage with a generic SaaS shell, internal OS language, architecture explanations, development-status panels, or a new visual concept.

The homepage must quickly answer:

1. What does Elevation sell?
2. Which major brands / partners can customers buy through Elevation?
3. What is Elevation's lithium / off-grid / RV specialty?
4. What freight and Hawaii logistics problem does Elevation solve?
5. How does a customer shop now?

## 3. PUBLIC SITE MINIMUM

Build the smallest website that can produce legitimate revenue.

Foreground customer routes:

- `/` — exact approved homepage reconstruction;
- `/store` — all approved retail products;
- `/shop/<vendor>` — vendor catalog views;
- `/product/<slug-or-id>` — full retail product detail;
- `/cart` — durable customer cart;
- `/checkout` — Elevation-owned checkout;
- `/shipping-logistics-services` — freight / logistics explanation;
- `/hawaii-lithium-batteries` — Hawaii lithium supply + shipping program;
- `/start-a-project` — secondary project / system / logistics intake;
- `/privacy` and `/terms` — required customer/legal surfaces.

Everything else is secondary. Old marketplace/list-your-item/collector/vehicle-selling and unrelated legacy feature surfaces must not drive the new navigation or delay commerce.

## 4. VENDOR CATALOG MODEL

One canonical Elevation catalog. Vendor pages are filtered views, not duplicate stores.

Each sellable SKU must resolve to one canonical retail record containing at minimum:

- Elevation product ID;
- vendor / brand;
- exact supplier SKU;
- public title;
- verified images;
- customer description/specs;
- current Elevation price;
- MAP/floor status when applicable;
- source cost / margin control kept server-side/internal;
- stock/orderability state;
- shipping mode;
- warranty / return owner;
- fulfillment source;
- channel/vendor authorization status.

Vendor project source files remain authoritative for exact supplier facts. Web V2 consumes approved product truth; it does not invent it.

Initial catalog lanes should be built from the currently authorized vendor projects and exact approved product data rather than creating a new onboarding process.

## 5. PAYMENT / ORDER AUTHORITY

ElevationUpScales.com direct commerce is an **Elevation-owned transaction surface**.

Required flow:

**PRODUCT → CART → SERVER REVALIDATION → CHECKOUT REVIEW → PAYPAL ORDERS v2 → DURABLE ELEVATION ORDER → CAPTURE / RECONCILIATION → FULFILLMENT ROUTING.**

Direct-site orders may not be silently cross-routed into Shopify checkout.

Shopify, eBay and TikTok remain separate channel surfaces with their own order/payment authority.

The accepted Legacy PayPal repair may be used as technical evidence/reference, but Web V2 must implement a clean Commerce V2 transaction path rather than re-importing the Legacy monolith.

No raw card/CVV storage. PayPal remains hosted/tokenized payment infrastructure.

## 6. SHIPPING / FREIGHT RULE

Every sellable product must have an explicit shipping disposition before payment:

- parcel / known-rate shipping;
- supplier-calculated / controlled shipping;
- freight quote required;
- Hawaii lithium controlled route;
- unavailable / manual review.

Do not accept a final charge when the exact product/destination requires unresolved freight or lithium-route approval.

Hawaii lithium controls remain separate and fail closed where route / freight approval is not proven.

## 7. RELEASE SYSTEM — PRODUCTION-PARITY SMOKE

The versioned `workers.dev` preview is no longer a mandatory acceptance gate because it does not prove production-zone settings / routing parity.

Preview URLs may remain available for diagnostics only.

### Release invariant

**ONE APPROVED GIT SHA → ONE CLOUDFLARE WORKER VERSION ID → PRODUCTION-PARITY SMOKE OF THAT EXACT VERSION → THAT SAME VERSION ID PROMOTED → LIVE VERIFY.**

Runtime truth:

**GIT SHA + CLOUDFLARE VERSION ID + DEPLOYMENT ID.**

No rebuild after candidate upload.

### Bootstrap release

Before Web V2 owns the root domain:

1. create exact candidate with `wrangler versions upload`;
2. deploy that exact Version ID to the Web V2 Worker attached to a production-parity smoke custom domain;
3. smoke the real Worker with production bindings/settings;
4. verify the runtime itself reports the expected Version ID;
5. owner accepts the smoke;
6. perform the separately authorized root-domain cutover to the already-tested Worker/version;
7. live verify the root domain;
8. preserve Legacy rollback until cutover acceptance is closed.

The bootstrap smoke hostname must not be the customer production root.

### Steady-state releases after Web V2 owns production

1. upload exact candidate version;
2. keep accepted version at 100% and add candidate to the deployment at 0%;
3. use `Cloudflare-Workers-Version-Overrides` on the real production domain to force smoke requests to the candidate;
4. verify `/__version` returns the exact candidate Version ID;
5. smoke required routes / cart / checkout without submitting a live customer charge;
6. promote that same Version ID to 100% only after owner/release acceptance;
7. rollback to the last accepted Version ID immediately on failure.

## 8. BUILD ORDER

Do not build broad infrastructure before revenue-critical customer paths.

### Phase A — Homepage reconstruction

- exact approved visual homepage baseline;
- retail-first messaging;
- vendor/partner credibility;
- freight/Hawaii lithium positioning;
- Shop primary CTA;
- Start a Project secondary CTA;
- no internal/developer copy.

### Phase B — Canonical vendor catalog

- canonical product model;
- `/store`;
- vendor filters/pages;
- product detail;
- source/orderability/shipping gates.

### Phase C — Cart + PayPal

- durable cart;
- server-side product/price/shipping revalidation;
- checkout review;
- PayPal Orders v2;
- durable Elevation order record;
- idempotency and retry safety;
- fulfillment handoff.

### Phase D — Freight / Hawaii purchase paths

- freight classifications;
- quote/manual-review gates where required;
- Hawaii lithium route state;
- customer-facing shipping expectations.

### Phase E — Production-parity release

- exact candidate upload;
- production-parity smoke;
- owner acceptance;
- same-version production cutover/promotion;
- live verification;
- accepted receipt.

## 8A. IMPLEMENTATION LOOP — NO PRE-BUILD RECON SPIN

Once `WEB_V2_CURRENT_WORKTREE.md` names a phase **ACTIVE / CURRENT** and the worker is authorized, the worker must execute that phase instead of repeatedly reconstructing management state.

Use:

**RE-RESOLVE `main` ONCE → READ ACTIVE WORKTREE + EXACT PHASE/SOURCE FILES → CREATE/RECOVER BOUNDED BRANCH → IMPLEMENT → QA → RE-RESOLVE `main` ONCE BEFORE MERGE → RECONCILE → MERGE → UPDATE WORKTREE → REPORT.**

This workflow specifically rejects the failure loop:

**RESOLVE → READ ALL CONTROL FILES → RECON AGAIN → PREPARE RECEIPT → EXECUTION WINDOW ENDS → NO BRANCH → REPEAT.**

Instead:

- full OS onboarding is not repeated after lane/task authority is already established;
- branch creation/recovery occurs immediately after the active task is verified;
- broad repository discovery stops once the exact implementation surface is known;
- authoritative supplier-source reads are task work and remain required;
- receipt composition occurs only after durable implementation/QA/merge state exists;
- an execution-window/context cutoff is not an owner gate;
- if no mutation occurred on an interrupted run, the next run rechecks only current `main` and the active Worktree, then branches/builds;
- if durable branch/commit progress exists, resume it rather than restarting discovery;
- normal bounded implementation uses two `main` resolutions maximum unless a real race/conflict is detected;
- when execution capacity is constrained, prioritize **BRANCH/COMMIT → QA → MERGE → WORKTREE UPDATE → RECEIPT**.

MASTER RECON is not part of the normal inner development loop. Trigger RECON only for actual control/state conflict, supplier-truth conflict that changes catalog policy, lineage ambiguity, or release-integrity gates.

## 9. WHAT IS NOT FOREGROUND

Do not delay revenue launch for:

- Ops V2 dashboards;
- broad analytics rebuilds;
- another marketplace/listing system;
- customer vehicle marketplace features;
- collector features;
- new social channels;
- speculative AI/agentic commerce;
- large CMS/admin architecture beyond what is required to maintain catalog truth;
- unrelated home-service feature expansion.

Do not delay implementation for repeated management-file rereads after the current Worktree/task is already unambiguous.

## 10. CLOSE CONDITION

This workflow is complete when:

- the approved homepage look is reconstructed;
- authorized vendor products are discoverable and purchasable where shipping is resolvable;
- customer can add products to cart;
- direct checkout takes Elevation-owned PayPal payment safely;
- an order is persisted and routed for fulfillment;
- freight/Hawaii exceptions fail closed or enter the correct controlled path;
- production-parity smoke passes on the exact candidate;
- that same candidate is accepted live on ElevationUpScales.com;
- first real order can prove payment → order → supplier/freight → fulfillment → realized margin.

## CONTROL PHRASE

**RESOLVE ONCE → BRANCH → BUILD → QA → RESOLVE BEFORE MERGE → MERGE → REPORT. KEEP THE HOMEPAGE → SELL THE PARTNERS → CART → PAYPAL → ORDER → FULFILL → FREIGHT / HAWAII CONTROL → PRODUCTION-PARITY SMOKE → SAME VERSION LIVE → MAKE MONEY.**
