# ELEVATION UPSCALES — MPM ACTIVE EXECUTION WORKFLOW — 2026-09-17

**Owner:** Casey Young  
**Role:** Operating System Project Manager — Company Oversight  
**Mode:** **KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CONTINUE**  
**Control:** `CURRENT_WORK_BOARD.md`

---

# PURPOSE

This workflow organizes the current revenue-conversion push without putting workers or deployments on arbitrary time schedules.

It is a **state/gate workflow**, not a countdown.

Casey's attention may move between lanes as useful, while each execution owner continues its bounded packet until PASS, BLOCKED, or OWNER DECISION REQUIRED.

---

# GLOBAL RULES

1. Resolve current `main` once before routing technical work.
2. One work item = one execution owner.
3. Development builds; Recon verifies; MPM routes/updates state.
4. Do not restart broad recon when an exact defect is already proven.
5. Do not let an outside/vendor hold stop unrelated revenue work.
6. No new broad website redesign without Casey direction.
7. **No production deployment without Casey's explicit approval.**
8. No manager/recon direct deployment as the normal workflow.
9. Real paid orders supersede catalog-prep work and route immediately to verification/fulfillment.
10. Close work only on evidence, not on intended state.

---

# ACTIVE EXECUTION QUEUES

## QUEUE A — P0 WEB / COMMERCE STABILIZATION

**Execution owner:** Web V2 Development  
**Verification:** Recon / QA  
**Management:** MPM

### Current development packet

Work only proven live customer-facing defects. Initial known classes from the latest read-only store audit:

- storefront readability / contrast defects;
- broken/stale branding asset behavior between client states/domains where reproducible;
- card → Details → CTA inconsistencies;
- SOK accessory Details routes that present unavailable despite a valid purchase-options state;
- SKU/model prominence on product detail;
- incorrect shopping category/classification that materially misleads customers;
- listing-card quality defects only after functional path defects are controlled.

### Preserve

- working payment/checkout path;
- approved homepage/major visual direction unless Casey separately authorizes a change;
- current verified SOK direct-checkout behavior;
- server-side price/orderability protections;
- unrelated vendor/channel work.

### Required return

Development returns:

- branch;
- exact SHA;
- defect-by-defect result;
- files changed;
- QA/test evidence;
- holds;
- `READY TO DEPLOY: YES/NO`.

**STOP at READY TO DEPLOY.** Casey approval is a separate gate.

---

## QUEUE B — P1 MASTER CATALOG ECONOMICS / PRODUCT TRUTH

**Execution owner:** Company Operations + Vendor Projects  
**Management:** MPM

Build one reusable **REVENUE-READY SKU** schema using the verified SOK battery set first.

For each SKU capture:

- vendor / brand;
- supplier SKU;
- Elevation SKU;
- exact product identity / model;
- current source cost;
- MAP / advertised floor / permitted sell price;
- shipping cost / shipping disposition;
- channel fees;
- expected gross contribution;
- current stock / backorder/prepurchase state;
- channel authorization;
- warranty;
- returns;
- primary source / alternate source;
- last verification date/source;
- Shopify state;
- website state;
- eBay state;
- final disposition: `SELL NOW`, `SELL WITH BACKORDER/PREORDER`, `HOLD FOR DATA`, or `DO NOT LIST`.

Do not expand to all imported products until the SOK model is clean enough to reuse.

---

## QUEUE C — P1 SOK EBAY REVENUE

**Execution owner:** eBay Store Operations under Peter  
**Management:** MPM / Company Operations

Goal: convert the verified SOK battery truth into profitable exact-SKU eBay listings.

Per SKU:

**VERIFY IDENTITY → VERIFY MAP → VERIFY COST/SHIPPING → CALCULATE EBAY FEES → CONFIRM CONTRIBUTION → BUILD LISTING → QA → PUBLISH IF AUTHORIZED/CLEAN → VERIFY LIVE.**

Hold only the SKU that is blocked. Continue the next clean SKU.

Do not let eBay listing polish become a substitute for verified economics.

---

## QUEUE D — P1 SHOPIFY / RENOGY

**Execution owner:** Shopify Store Operations under Peter

Current checkpoint:

- `RSP10TC-G1-US` 10W Trickle Charger: live / purchase path smoke passed;
- next five Renogy SKUs: staged drafts with explicit gates;
- no bulk publication;
- payment stack remains green absent a fresh defect.

Execution rule:

**REAL PAID ORDER? → VERIFY PAYMENT/SKU/SOURCE → ROUTE FULFILLMENT FIRST.**

Otherwise resolve the staged products one gate at a time. Do not infer exact-SKU equivalence, orderability, media rights, or channel authorization.

---

## QUEUE E — LISTING / CARD QUALITY

**Execution owner:** Commerce Development / Catalog worker

This queue does not redesign the store.

Normalize customer-facing product records to a common card standard:

**BRAND → SKU/MODEL → CLEAN PRODUCT TITLE → SHORT CUSTOMER DESCRIPTION → CORRECT DEPARTMENT → PRIMARY IMAGE → PRICE → AVAILABILITY → CTA.**

Rules:

- real brand beats generic `SUPPLIER` when verified;
- raw supplier `Highlights:` copy is not final customer copy;
- duplicates are identified/consolidated before polishing every duplicate record;
- different variants must visibly explain the difference;
- categories must follow what the product is, not incidental terms like BMS/monitoring in supplier text;
- exact-SKU product identity must remain visible enough for support/operations/customer reference.

---

# HOLD / DEPRIORITIZED LANES

## Kingboss

**HOLD KINGBOSS ONLY.**

Do not let its catalog/storefront issue block Web, SOK, Shopify, eBay, SunGoldPower or company-wide catalog economics.

## VEVOR

**DEPRIORITIZED.**

No broad source-optimization project during the current grind. Route only a specific high-value source/cost decision.

## New vendor acquisition

**OPPORTUNISTIC ONLY.**

Authorized-brand breadth is sufficient for the current phase. Valuable inbound can be processed; broad prospecting does not outrank converting current vendors into orders.

---

# MPM RUN LOOP

When Casey says **MPM RUN**:

1. resolve current state once;
2. identify highest-priority unblocked management action;
3. route exactly one owner for each active item;
4. verify receipts/evidence already returned;
5. update canonical state when the real state changed;
6. continue to the next unblocked management action;
7. stop only at a real owner decision, external blocker, or when all active queues are already correctly owned and running.

MPM RUN does **not** automatically authorize a production deployment.

---

# OWNER GRIND FLOW

This is a sequencing aid for Casey, not a worker schedule:

**ROUTE DEVELOPMENT → ADVANCE CATALOG ECONOMICS → ADVANCE SOK EBAY → ADVANCE RENOGY GATES → REVIEW ANY READY RECEIPTS → MAKE OWNER DECISIONS → CONTINUE.**

If a worker is still executing, do not wait idle. Move to the next independent queue.

---

# STATE LABELS

Use only these operational states where practical:

- `ACTIVE` — an execution owner has a current next action;
- `READY TO DEPLOY` — development/QA complete; Casey deployment approval required;
- `BLOCKED` — exact named blocker prevents that item only;
- `HOLD` — intentionally paused / not priority;
- `DONE` — verified complete;
- `NEXT` — queued executable work with no blocker.

Avoid ambiguous states such as “almost done,” “basically ready,” or “working on it” without an owner/next action.

---

# RECEIPT FORMAT

Every worker/manager return should be compact:

**WORK ITEM**  
**OWNER**  
**STATE**  
**EVIDENCE / RESULT**  
**BLOCKER (if any)**  
**NEXT ACTION**  
**OWNER DECISION REQUIRED: YES/NO**

For code/release work also include branch + exact SHA.

---

# CONTROL PHRASE

**KEEP EVERY CLEAN REVENUE LANE MOVING. DO NOT DUPLICATE OWNERSHIP. DEVELOPMENT BUILDS. RECON VERIFIES. MANAGEMENT ROUTES. CASEY APPROVES PRODUCTION.**
