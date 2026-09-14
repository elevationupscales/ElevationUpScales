# Elevation UpScales — eBay SOK-Only Store Reset Workflow

**Status:** READY / STANDBY — OWNER DIRECTIVE ADOPTED / NO SELLER HUB RESET MUTATIONS EXECUTED BY THIS WORKFLOW BUILD  
**Date:** 2026-09-14 MDT  
**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Lane:** eBay Store Operations  
**Reports To:** Peter Torres — Ecommerce & Vendor Operations Manager  
**Operational Oversight:** Company Operations / MPM 7  
**Repository:** `elevationupscales/ElevationUpScales`

## 1. Owner strategy reset

Casey's 2026-09-14 owner directive supersedes the prior eBay future-sale strategy of maintaining a small mixed-product profitable core.

The future eBay storefront is:

**SOK BATTERIES ONLY.**

This reset applies to **future-sale listings**. It does not authorize deletion of eBay transactional history, customer records, closed/refunded order history, payment records, tracking history, feedback, returns, cancellations or other account records.

Views, watchers, historical sales, prior demand and prior listing work do not create a `KEEP` exception for non-SOK future-sale inventory.

The prior worktree remains useful for customer/order chronology, safety controls, source evidence and historical receipts, but its mixed-core / approximately-12-listing future-sale strategy is superseded by this owner directive.

## 2. Controlling source stack

At each `RUN`, start from the newest explicit owner instruction and re-resolve current `main` before acting.

Current workflow source stack:

1. newest explicit Casey Young owner direction;
2. `CURRENT_WORK_BOARD.md`;
3. this workflow — `EBAY_SOK_ONLY_STORE_RESET_WORKFLOW_2026-09-14.md`;
4. `EBAY_STORE_OPERATIONS_CURRENT_WORKTREE.md` for order history, safety controls and prior receipts only where not superseded;
5. `COM2_EBAY_FALSE_COMPLETION_CORRECTION_2026-09-14.md`;
6. `vendor-project-sources/SOK_PROJECT_SOURCE.md`;
7. `SOK_ECOMMERCE_SHIPPING_SOP.md`;
8. `EBAY_DIRECT_SOURCE_PERMISSION_CLARIFICATION_SEND_RECEIPT_2026-09-11.md` and any newer verified SOK marketplace-authority evidence;
9. protected current SOK pricing/MAP/inventory/compliance/source records where a consequential SKU decision requires them.

Public Git must not contain protected dealer cost, private supplier correspondence, raw inventory, private compliance packets, private addresses, tax IDs, payment data or commercially sensitive freight rates.

## 3. Current pre-RUN source snapshot

This workflow build does **not** execute the live Seller Hub reset. It records the current control position from Git so the next `RUN` starts cleanly.

### eBay customer/seller state

`CURRENT_WORK_BOARD.md` still treats eBay as P0 authenticated verification work and specifically keeps order `20-15123-05140` as a live verification target.

Casey's newest owner report now states that order `20-15123-05140` was refunded. Until authenticated Seller Hub produces terminal refund proof, classify it exactly as:

**OWNER-REPORTED REFUNDED / TERMINAL SELLER HUB REFUND PROOF REQUIRED.**

Do not replay fulfillment, refund or cancellation actions from older records without a fresh Seller Hub reread.

### SOK source state

Current SOK project truth establishes:

- SOK is Elevation's **active primary authorized battery supplier**;
- direct Elevation commerce is verified;
- exact SKU verification remains mandatory;
- protected current pricing/MAP sources exist;
- supplier inventory is supplier-controlled and must be checked at execution time;
- supported Lower-48 SOK commerce/fulfillment exists subject to exact SKU, order mode and destination verification;
- key SKU-specific compliance/SDS/UN38.3 material exists but must match the exact model/revision;
- supplier-backed warranty support is verified, with exact returns/RMA handling still SKU/process specific;
- Hawaii downstream resale is verified in principle under the dealer relationship, but Hawaii freight/storage/routing remains a controlled proving lane;
- product media/spec source exists and official product-image sourcing is verified, but media must map exactly to the SKU.

Current Git eBay channel evidence still says:

**WAITING — SOK EBAY PERMISSION CLARIFICATION.**

Therefore, absent newer written authority recovered during `RUN`:

**SOK EBAY PUBLICATION = HOLD / DOCUMENTARY AUTHORITY REQUIRED.**

Dealer status, direct-site authority or Hawaii downstream-resale authority must not be silently converted into eBay marketplace authority.

## 4. RUN sequence

When Casey or authorized management says `RUN`, execute:

**CURRENT MAIN → EBAY CONTROL FILES → SOK SOURCE TRUTH → AUTHENTICATED SELLER HUB → CUSTOMER RECON → ACTIVE-LISTING RECON → END NON-SOK FUTURE-SALE INVENTORY → VERIFY ZERO NON-SOK → SOK AUTHORITY/COMMERCIAL/COMPLIANCE RECON → BUILD VERIFIED SOK LAUNCH QUEUE → RECORD RECEIPT → CONTINUE UNTIL REAL GATE.**

Do not restart broad eBay strategy work. This workflow is the reset strategy.

## 5. Gate 0 — Git and execution-surface readiness

Before live action:

1. re-resolve exact current `main`;
2. read current work board, current eBay worktree, this workflow and current SOK project source;
3. recover any newer eBay/SOK authority, pricing, compliance, logistics or owner-control receipt;
4. open authenticated eBay Seller Hub;
5. determine whether the current authenticated surface supports consequential actions such as end listing, edit quantity, cancel, refund or submit;
6. use authenticated live evidence as truth for account state.

Historical rule remains controlling:

**PLAN ≠ MUTATION → HANDOFF ≠ MUTATION → GIT RECEIPT ≠ LIVE SELLER HUB STATE.**

If a required consequential action cannot be executed through the available authenticated surface, record:

**OPEN TASK / ACTION SURFACE REQUIRED**

and continue all non-destructive executable recon.

Do not use TinyFish for eBay execution unless Casey explicitly supersedes the existing prohibition.

## 6. Gate 1 — live customer-obligation ledger

**CUSTOMER OBLIGATIONS FIRST.**

Before ending listings, re-read every current order or case in Seller Hub that is:

- paid;
- awaiting shipment;
- shipped;
- cancellation requested / processing;
- canceled;
- refunded / refund processing;
- return open;
- dispute/request/case open;
- otherwise commercially unresolved.

For each current order record only:

| Field | Required evidence |
|---|---|
| Order ID | exact Seller Hub order ID |
| Product | exact order/listing product |
| Item/SKU | exact item ID / custom label where available |
| Payment state | live Seller Hub state |
| Shipment state | live shipped/unshipped state |
| Tracking | exact tracking only when present; never invent |
| Cancellation | exact requested/processing/terminal state |
| Refund | exact pending/completed/amount state |
| Return/case | exact open/closed state |
| Remaining action | one exact next action or monitor-only state |

Order-specific controls:

- **Never cancel a verified shipped/tracked order.**
- Never duplicate tracking.
- Never invent tracking or supplier shipment from absence of evidence.
- Never create a replacement supplier order merely to preserve a transaction whose source/economics are already known to fail.
- Protect each buyer obligation before mutating its associated listing.
- For `20-15123-05140`, begin from **OWNER-REPORTED REFUNDED / VERIFY TERMINAL** and prove the terminal Seller Hub state before closing it.
- Preserve already closed/refunded orders as historical only; do not reopen them absent a genuine new exception.

Output of Gate 1: **LIVE CUSTOMER OBLIGATION TABLE**.

## 7. Gate 2 — active future-sale inventory classification

After customer recon, inventory every active future-sale listing in Seller Hub.

Every active listing receives exactly one classification:

- `SOK — HOLD FOR EXACT VERIFICATION`
- `NON-SOK — END`
- `ORDER DEPENDENCY — HOLD ONLY UNTIL CUSTOMER RESOLUTION`

There is **no `KEEP` category for non-SOK merchandise**.

For each active listing capture:

- item ID;
- exact title;
- current quantity / active state;
- current price where relevant to identification;
- supplier/brand/source identity if evidenced;
- associated live customer dependency, if any;
- classification;
- required reset action.

Do not infer that an old zero-quantity listing is ended. The terminal target is no active non-SOK future-sale offer.

## 8. Gate 3 — non-SOK removal sequence

For every listing classified `NON-SOK — END`:

1. confirm immediately before mutation that no new customer/order dependency appeared;
2. execute one consequential end/remove-from-future-sale action through the supported authenticated Seller Hub surface;
3. wait for the action result;
4. reopen/re-read that exact item;
5. verify the terminal result live;
6. record exact before/after evidence;
7. continue to the next listing.

One consequential mutation at a time.

Do not mass-cancel customer orders. Do not delete transactional/account history under the authority to end a listing.

If a non-SOK listing has a live customer dependency, classify it:

**ORDER DEPENDENCY — HOLD ONLY UNTIL CUSTOMER RESOLUTION**

Resolve/protect the customer first. Then end the future-sale listing and live-verify it.

Historical sales, views, watchers, conversion signals and demand do not override this reset.

## 9. Gate 4 — terminal store-reset proof

After the removal pass, re-read Seller Hub active listings independently from the mutation sequence.

The reset cannot close until the live count is:

**NON-SOK ACTIVE FUTURE-SALE LISTINGS: 0**

If the count is greater than zero, identify every remaining item and classify the cause:

- new customer dependency;
- mutation failed / did not persist;
- action surface unavailable;
- listing was missed;
- item identity unresolved.

Do not call the reset complete from an intended action or a Git checklist.

## 10. Gate 5 — SOK eBay authority / commercial / compliance matrix

Only after non-SOK future-sale inventory is cleared or all remaining exceptions are isolated to genuine customer dependencies, reconcile SOK for eBay.

For each authority area return exactly `PASS`, `FAIL`, or `HOLD` with evidence date/source:

| Gate | Required truth |
|---|---|
| eBay marketplace authority | express current SOK authorization to list/sell on eBay; do not infer |
| MAP / price floor | current applicable MAP/price rule for exact SKU |
| SKU / product truth | exact SOK model/SKU and exact specs |
| Stock / orderability | current supplier availability or authorized preorder/backorder state |
| Fulfillment | exact supplier order and fulfillment method |
| Shipping | current parcel/freight path for exact SKU/destination |
| Lithium / DG | exact battery classification and required documentation for route |
| Destination restrictions | Lower-48, Alaska, Hawaii and any route-specific exclusions |
| Warranty / returns | current customer-facing warranty and RMA/return process |
| Compliance media/docs | correct exact-SKU SDS/UN38.3/other required documentation |
| eBay policy compatibility | listing/handling/shipping configuration compatible with current eBay rules |
| Economics | positive expected contribution after all variable costs |

Until express eBay authority is recovered:

**EBAY MARKETPLACE AUTHORITY = HOLD**  
**SOK PUBLICATION = HOLD / DOCUMENTARY AUTHORITY REQUIRED**

Do not let an authority HOLD block customer recovery or non-SOK listing cleanup.

## 11. Gate 6 — SOK SKU launch queue

Do not bulk-publish SOK.

Each SOK battery must clear independently:

**EXACT SKU → EBAY AUTHORIZED → CURRENT MAP → CURRENT STOCK/ORDERABILITY → SHIPPING/DG ROUTE → DESTINATION → WARRANTY/RETURNS → POSITIVE CONTRIBUTION → EXACT PRODUCT MEDIA/COPY → QA → PUBLISH → LIVE VERIFY**

For each candidate queue row record:

| Field | Required state |
|---|---|
| SOK SKU/model | exact verified identifier |
| eBay authority | PASS required before publish |
| MAP | current verified floor/rule |
| stock/orderability | current exact state |
| route | exact supported route |
| DG/compliance | exact applicable packet/state |
| destination scope | verified allowed destinations |
| warranty/returns | verified customer-facing terms/process |
| proposed eBay price | only when current price-floor + economics evidence exists |
| expected contribution | only from verified source/shipping/eBay-variable-cost inputs |
| media/copy | exact SOK product evidence only |
| readiness | `READY`, `HOLD`, or `FAIL` |
| blocker | exact remaining blocker |

A SKU with one unresolved consequential fact stays `HOLD`; it does not authorize publication of sibling SKUs.

## 12. Economics gate

Publication requires positive expected contribution, not merely positive gross margin.

Use:

**EXPECTED CONTRIBUTION = EBAY CUSTOMER REVENUE - CURRENT SOK SOURCE COST - SUPPLIER SHIPPING/FREIGHT - EBAY VARIABLE FEES - DISCOUNTS/CREDITS - OTHER VARIABLE TRANSACTION/FULFILLMENT COSTS.**

Do not publish a negative-contribution SOK listing.

Do not expose protected dealer costs or freight buy-rates in public Git; record only PASS/FAIL/HOLD and public-safe conclusions where required.

## 13. Hawaii / Alaska / freight lithium boundary

Hawaii/freight lithium remains under Shipping & Logistics / Hawaii Lithium controls.

Do not apply ordinary parcel assumptions to Hawaii SOK batteries.

Do not promise parcel service, delivery dates, terminal pickup, direct delivery, DG acceptance or freight price until the exact route is verified.

Current SOK source truth says Hawaii downstream resale is verified in principle under the dealer relationship, while freight/storage routing remains a controlled proving lane. That does **not** independently establish eBay marketplace authority or a customer-ready Hawaii eBay offer.

Alaska similarly requires exact route/destination verification rather than a generic Lower-48 assumption.

## 14. Paid acquisition

Promoted Listings and all paid marketplace acquisition remain:

**OFF / BLOCKED BY OWNER CAPITAL-RECOVERY RULE**

Do not enable suggested ad rates, promoted listings or other paid marketplace traffic because eBay displays an eligible promotion option or because an SOK SKU passes economics.

Only Casey may explicitly reopen paid acquisition after the controlling capital-recovery gate is satisfied.

## 15. Required management receipt after RUN

Return one concise receipt with these five sections.

### A. CUSTOMER STATE

Every current order with:

- order ID;
- product;
- current Seller Hub state;
- shipped/tracking/refund/cancellation state;
- remaining action.

### B. NON-SOK CLEANUP

Every non-SOK active listing with:

- item ID;
- title;
- prior state;
- customer dependency;
- action taken;
- verified final state.

### C. RESET RESULT

Report exactly:

**NON-SOK ACTIVE FUTURE-SALE LISTINGS: [NUMBER]**

Target:

**0**

### D. SOK AUTHORITY

Return PASS / FAIL / HOLD for:

- eBay marketplace authority;
- MAP;
- SKU/product truth;
- stock/orderability;
- shipping;
- lithium/DG;
- destination restrictions;
- warranty/returns;
- economics.

### E. SOK LAUNCH QUEUE

For each SOK battery:

- SKU;
- listing readiness;
- remaining blocker;
- proposed eBay price only if verified;
- expected contribution only if source economics are verified.

## 16. Hard replay guards

- No active non-SOK future-sale listing after reset completion.
- No mass cancellation of customer orders.
- No cancellation of a verified shipped order.
- No fake tracking.
- No unsupported fulfillment promise.
- No invented supplier stock.
- No invented SOK eBay authorization.
- No invented MAP.
- No invented warranty.
- No invented lithium/DG classification.
- No invented shipping route.
- No price below a verified applicable floor.
- No negative-contribution SOK publication.
- No broad Doba catalog rebuild.
- No substitution of VEVOR, Renogy, Kingboss or other suppliers into the SOK-only eBay strategy.
- No deletion of transactional/account history under listing-reset authority.
- No paid ads.
- One consequential mutation at a time, followed by live verification.
- No false completion from Git plans, handoffs or intended mutations.

## 17. Workflow close condition

The eBay reset phase closes only when all of the following are simultaneously true:

1. every current customer obligation is terminally resolved, cleanly shipped/tracked, or isolated to a genuine live external dependency;
2. all non-SOK future-sale listings have been ended and live-verified;
3. independent Seller Hub reread reports **NON-SOK ACTIVE FUTURE-SALE LISTINGS: 0**;
4. SOK eBay authority has an explicit documentary PASS before any direct SOK publication;
5. each published SOK SKU individually clears MAP, source, stock/orderability, route, DG/compliance, destination, warranty/returns, economics, media/copy and eBay policy gates;
6. each published listing is re-read live after publication;
7. paid acquisition remains off unless Casey separately reopens it.

## Control phrase

**CLOSE CUSTOMER OBLIGATIONS → CLEAR NON-SOK INVENTORY → VERIFY ZERO NON-SOK ACTIVE → PROVE SOK AUTHORITY + MAP + SHIPPING + LITHIUM + ECONOMICS → SELL SOK BATTERIES ONLY.**
