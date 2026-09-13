# Elevation UpScales — Current Work Board

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-09-13  
**Owner:** Casey Young  
**State Owner:** **MPM 6 — Company Oversight**  
**MPM 6 control:** `MPM6_COMPANY_OVERSIGHT_TAKEOVER_2026-09-13.md`  
**Web V2 development Worktree:** `WEB_V2_CURRENT_WORKTREE.md`  
**Shopify conversion control:** `SHOPIFY_CONVERSION_CONFIDENCE_ROUTE_PACKET_2026-09-13.md`  
**Profitability control:** `PROFITABILITY_RECOVERY_WORKFLOW_V1_0.md`  
**Paid-acquisition control:** `OWNER_DIRECTIVE_NO_PAID_ADS_UNTIL_CAPITAL_RECOVERY_2026-09-12.md`

## Operating rule

**ONE CURRENT STATE PER WORK ITEM. ONE EXECUTION OWNER. NO DUPLICATE RECON. NO DUPLICATE DEV ROUTING.**

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CONTINUE**

MPM 6 is the active company-oversight instance. Prior MPM iterations are historical/reference and must not issue competing live control.

---

# CURRENT COMPANY PRIORITIES

| Priority | Work Item | Owner | Current State | Next Action |
|---|---|---|---|---|
| **P0** | Web V2 direct-commerce path | MPM 6 → Web V2 Commerce Developer | **ORDER + FULFILLMENT ROUTING ACTIVE** | Build bounded payment/durable-order/fulfillment handoff from merged server-validated checkout state. |
| **P0** | Shopify conversion trust | Shopify Store Operations + DEV + Shipping/Company Ops | **ACTIVE** | Fix blurry/weak product imagery; resolve supplier-specific shipping truth; approve missing policies; add verified near-CTA confidence. |
| **P0** | Owner communications / residual Google Voice forwarding | MPM 6 / Communications Recovery | **CRITICAL UNTIL VERIFIED CLOSED** | Verify direct inbound call + SMS after carrier/Google correction. |
| **P0** | eBay customer/cash recovery | eBay Store Operations under Peter / Company Operations | **PARALLEL ACTIVE** | Customer obligations → cash release → loss prevention → profitable core. |
| **P1** | Existing-shop profitability tuning | Company Operations + channel workers | **ACTIVE** | Improve current sales channels before expansion; no broad paid acquisition. |
| **P1** | Vendor source truth | Owning Vendor Projects | **ACTIVE SUPPORT** | Maintain exact SKU/price/MAP/stock/shipping/warranty/fulfillment/channel truth and resolve only their own gaps. |

Waiting on one lane does not stop executable work in another lane.

---

# WEB V2 — CURRENT VERIFIED STATE

Revenue path:

**HOMEPAGE → PRODUCT DISCOVERY → PRODUCT → CART → CHECKOUT → PAYPAL / ELEVATION ORDER → SUPPLIER/FREIGHT FULFILLMENT**

Verified receipts:

- Homepage reconstruction — **COMPLETE / MERGED** `6940c32b5c1863d4b60be85427ccff3060e5d396`.
- Retail navigation — **COMPLETE / MERGED** `e2c9e3494bd932c2cde8b0d24e807cbb94706009`.
- Canonical catalog + product detail — **COMPLETE / MERGED** `72694ae9ba5b9952c0460b9f90b380cffde4ff23`.
- Cart — **COMPLETE / MERGED** `13b4411fc265a1f7b149ad9207059221fa53db32`.
- Checkout review — **COMPLETE / MERGED** `f5d3ac7cc4b37e8211a3bb460a8507380b75803d` through PR #169.
- Checkout candidate QA — **PASS**: Pull Request QA run 130 + Web V2 QA run 78.
- Worktree advancement — PR #170 merged; current Worktree owns the next phase.

| Worker | Current State | Routing |
|---|---|---|
| WEB DEVELOPER | **STANDBY / SUPPORT** | Preserve merged public/customer commerce path; support exact bounded UI defects. |
| COMMERCE DEVELOPER | **ACTIVE / CURRENT — ORDER + FULFILLMENT ROUTING** | Server revalidation → PayPal/order mutation → durable Elevation order → exact supplier/SKU fulfillment route. |
| RELEASE ENGINEER | **READY / SUPPORT** | Act only at true production-parity release gate. |
| MASTER RECON OS | **STANDBY / TRIGGERED INTEGRITY** | Wake only for real state, lineage, policy, supplier-truth or release conflicts. |

Web V2 sequence:

1. Homepage — **COMPLETE**
2. Retail navigation — **COMPLETE**
3. Canonical catalog — **COMPLETE**
4. Product detail — **COMPLETE**
5. Cart — **COMPLETE**
6. Checkout review — **COMPLETE**
7. **Order + fulfillment routing — P0 ACTIVE / CURRENT**
8. Hawaii/freight controls — queued where applicable
9. Production-parity smoke — true release gate only
10. Same-version cutover — owner acceptance required
11. First real order — final revenue proof

Commerce integrity:

**VERIFIED SUPPLIER TRUTH → CANONICAL PRODUCT → CART → SERVER-REVALIDATED CHECKOUT → PAYMENT / DURABLE ORDER → EXACT FULFILLMENT ROUTE. UNKNOWN TRUTH FAILS CLOSED FOR THE AFFECTED ITEM ONLY.**

Do not reopen unchanged vendor files as a search loop.

---

# SHOPIFY — SEPARATE CHANNEL / CONVERSION STATE

Shopify remains a separate sales channel and is not the Web V2 direct-site payment owner.

Verified payment state:

- payout destination ending **6453** verified;
- Shopify Payments **Accepting payments**;
- **Receiving payouts**;
- card + PayPal checkout pass;
- accelerated PayPal already live;
- abandoned-checkout recovery active;
- no payment/KYC blocker currently controlling.

Current conversion priority:

**PAYMENT GREEN → PRODUCT TRUST → IMAGE QUALITY → SHIPPING TRUTH → POLICIES → BUY-BOX CONFIDENCE → FIRST REAL ORDER**

### P0 image-quality defect

Blurry/weak storefront or product images are a conversion-trust defect.

DEV must distinguish:

- weak/low-resolution source media;
- incorrect product-media mapping;
- CSS/container upscaling;
- responsive `srcset`/sizing problems;
- over-compression;
- crop/aspect issues.

Fix rendering defects immediately. Use the best approved factual product original available. Do not substitute the wrong SKU or AI-redrawn vendor product media.

### Shipping hold

Current broad Shopify shipping profile is not authoritative for all supplier/product destinations.

**DO NOT GUESS** rates, ETA, Alaska/Hawaii eligibility, expedited service, lithium restrictions or freight routing.

Shipping & Logistics + owning Vendor Projects must establish exact truth before Shopify profile segmentation.

### Policy gap

Privacy exists. Refund/Return, Shipping and Terms substance require Owner / Company Operations approval before publication. Do not invent legal/commercial terms.

Optional Clarity/domain polish remains behind image quality, shipping truth and policy trust.

---

# CHANNEL / OPERATIONS STATE

| Lane | Owner | State |
|---|---|---|
| Shopify | Shopify Store Operations / Peter / Company Ops | **ACTIVE — CONVERSION + TRUST TUNING** |
| eBay | eBay Store Operations / Peter / Company Ops | **P0 PARALLEL — CUSTOMER/CASH/PROFIT RECOVERY** |
| TikTok | TikTok execution under Peter | **ACTIVE UNDER RESTRICTION — NO APPEAL REPLAY / NO UNAUTHORIZED PAID SPEND** |
| Fourthwall / Apparel | Apparel operations under Peter | **ACTIVE SEPARATE CHANNEL** |
| SOK | SOK Project Operations Manager / SOK RECON OS | **ACTIVE PRIMARY SUPPLIER** |
| VEVOR | VEVOR Project Operations Manager / Specialist | **ACTIVE SUPPLIER / CONTROLLED PUBLICATION** |
| Renogy | Renogy Branch Operations Manager / Specialist | **ACTIVE SUPPLIER / CONTROLLED PUBLICATION** |
| Kingboss | Kingboss Project Operations Manager / Specialist | **ACTIVE STAGE-1 PROVING** |
| Shipping & Logistics | Company Operations / Shipping & Logistics Partner Worker | **ACTIVE — ROUTE TRUTH AUTHORITY** |

---

# HARD HOLDS / REPLAY GUARDS

- External/new-channel expansion — **HOLD; current channels first**.
- Paid advertising / prepaid media — **HOLD until Casey explicitly reopens**.
- Broad Ops V2/admin/dashboard rebuild — **HOLD behind revenue path**.
- Legacy homepage mutation — **NO TOUCH absent exact fresh defect authorization**.
- `production-deploy` — **LEGACY ONLY**, currently accepted at `894b15cb12bf75a6a8e81b916e2a9bc2de858f88`.
- `repair/live-site-audit-20260912` / `5fc55c806c1d7e138a9819a234e85ec932a056cb` — **ABANDONED / DO NOT DEPLOY / DO NOT MERGE**.
- workflow `34728792703` — **FAILED / DO NOT REPLAY AS RELEASE PATH**.
- stale candidate `84af23ec814baa73718e33ec052044ce4706534d` — **RETIRED / DO NOT DEPLOY**.
- Shopify Payments incomplete/setup blocker — **CLOSED / STALE** unless a fresh live defect appears.
- Do not restore Commerce-WAIT or workers.dev preview acceptance.

---

# UPDATE DISCIPLINE

1. The closest active Worktree owns phase sequencing.
2. Global Board/Registry follow the Worktree; they do not route workers backward when they lag.
3. One bounded task = one primary execution owner.
4. Hold only the affected SKU/order/route when truth is missing.
5. Vendor Projects own supplier truth; storefront workers do not infer it.
6. `production-deploy` remains Legacy-only until Web V2 cutover is separately accepted.
7. Release invariant remains: **ONE APPROVED GIT SHA → ONE CLOUDFLARE VERSION ID → PRODUCTION-PARITY SMOKE → SAME VERSION CUTOVER → LIVE VERIFY.**
8. MPM 6 owns company oversight; MPM 5 and earlier instances are historical/reference.
9. MASTER RECON returns to triggered integrity after correcting drift.
10. **HOLD ONLY THE BLOCKED ITEM → KEEP THE COMPANY MOVING.**

## Current control phrase

**WEB V2: CHECKOUT MERGED → ORDER + FULFILLMENT ACTIVE. SHOPIFY: PAYMENT GREEN → IMAGE/TRUST/SHIPPING/POLICY CONVERSION WORK. SELL → CONVERT → FULFILL → RECORD PROFIT.**
