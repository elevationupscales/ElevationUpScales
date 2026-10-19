# ELEVATION UPSCALES — CURRENT WORK BOARD

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-10-08  
**Owner:** Casey Young  
**State Owner:** **OS 1 / Operating System Project Manager — MPM 30 continuity**  
**Web / Commerce Worktree:** `WEB_V2_CURRENT_WORKTREE.md`  
**Active Execution Workflow:** `MPM_ACTIVE_EXECUTION_WORKFLOW_2026-09-17.md`

---

# CONTROL RULE

**ONE CURRENT STATE PER WORK ITEM. ONE EXECUTION OWNER. NO DUPLICATE RECON. NO DUPLICATE DEV ROUTING.**

Numbered MPM/COM/Recon chat instances are continuity/session labels only. They do not become independent authority layers.

Casey's newest explicit direction controls. Git current `main` is technical state truth.

Before routing technical work, resolve current `main` once. Do not relaunch broad recon merely because a chat changed.

---

## 2026-10-18 OWNER PRIORITY RANKING — NUMBERED COMPANY WORK ORDERS

**Owner numbering rule (effective 2026-10-18):** Company work orders use `NNNNP#`: four-digit sequence plus current priority level, beginning `0001P0`. **Sequence `NNNN` is the durable identity; the final `P#` updates when owner priority changes.** Example: `0003P1` becomes `0003P3` if moved to the back, without creating a new order or reusing the sequence. Number new company orders from `0012` onward; do not renumber older historical issues or create a second priority board. `P0` urgent; `P1` near-term; `P2` active/waiting; `P3` backlog/paused. Keep **COMPLETED / DEFERRED / ACTIVE / WAITING** status separate from the priority suffix. After a **verified new COMPLETED/CLOSED** event or **owner-directed move to the back (P3/DEFERRED)**, update Git first, then send Peter one brief outcome email under the cross-GPT SOP. Initial numbering of already-P3/completed-historically records is not a new transition and does **not** generate retroactive email. Keep paused items paused; assigning an ID doesn't reactivate them.

**Work-order reference aliases (owner operational shorthand, not a new SOP):** Canonical ID `0001P0`; accepted equivalents `WO-0001`, `WO#0001`, `P0#0001`, `order 0001`, or `priority-zero work order 0001`. The fixed digits identify the work; the P-level reflects **current** board priority. Refer to GitHub artifacts separately and unambiguously as `OS1 PR#297`, `OS3 PR#92`, `OS1 Issue#292`, or `OS3 Issue#90`—Git issue/PR numbers never become new work-order identities. If a shorthand P-level conflicts with Git, use current accepted Work Board. Do not create a new work order for every comment/commit/PR or another copy of the priority queue.

**Authority:** Casey's October 18 correction: assign each work item an individual priority number; **do not escalate every item to P0**. This section supersedes the prior October 18 blanket-P0 section and older priority labels only for the named items. **P0 = urgent paid customer/shipping obligation; P1 = near-term business follow-up; P2 = active, non-immediate or waiting; P3 = deferred/paused.** A priority is scheduling/routing, not permission to publish, purchase, ship, cancel, contact suppliers or bypass a genuine HOLD. OS1 owns the shared queue; Peter receives at most one bounded human-needed task.

| Work order ID | Work item | Current state and next action | Owner / decision |
| --- | --- | --- | --- |
| **0001P3** | Paid eBay VEVOR heater-ducting sale (Oct 17; ship by Oct 21) | **OWNER-DIRECTED P3 DEFERRED OCT 19; previous execution status preserved.** **OWNER APPROVED ECONOMICS AND FULFILLMENT IN PRINCIPLE; EXECUTION BLOCKED — CASH UNAVAILABLE PENDING YELP-RELATED BANK DISPUTE/RELEASE (owner correction Oct 18).** Do not place supplier order, buy labels, or mark shipment fulfilled while funds are unavailable; no repeat profitability or sourcing approval loop. Owner reports approximately $35 sitting with eBay but not available for use until Yelp-related funding condition clears; distinguish owner banking restriction from eBay platform's separate payout hold/eligibility. Reopen execution only when owner confirms immediately usable funds. **October 21 ship-by deadline remains binding**; this cash blocker may exceed it. If payment cannot be made in time, promptly route the specific deadline/customer obligation to owner for an eBay-compliant remedy; do not silently miss deadline or auto-cancel. Preserve exact authorized SKU/source and verified transaction economics without printing private costs in public Git. | OS1/eBay fulfillment lane: WAITING FOR OWNER-VERIFIED FUNDS; no purchase/ship action. Owner controls release and any required buyer/order remedy. Peter advisory only if independently assigned. |
| **0002P3** | First SOK Hawaii paid freight movement | **OWNER-DIRECTED P3 DEFERRED OCT 19; previous execution status preserved.** **WAITING — CARRIER RESPONSE (Oct 18).** Shipment SHNL663308 payment confirmed; forwarder said eligible for Oct 17 sailing, not verified as loaded or departed. Owner sent one follow-up to Pablo and Approved Forwarders support Oct 18 asking whether it sailed; mailbox read found no carrier reply or loading confirmation. Do not duplicate email or reopen freight booking. Return when carrier confirms actual departure/loading, next tracking milestone, or a material schedule exception. Keep P0 until movement status is reconciled; no Peter notice unless completed or owner moves to backlog. | Logistics/OS1 monitors actual carrier response and records milestone. |
| **0003P3** | Cara, Logistics Plus Hawaii | **OWNER-DIRECTED P3 DEFERRED OCT 19; previous execution status preserved.** **OWNER RESPONSE SENT — OCT 19; WAITING FOR CARA.** Peter's strategic review completed and owner-approved update sent as a reply in the existing Logistics Plus email thread (Gmail message `1a154d7ae29d4204`), CC Peter and elevationlithium. Conveyed approximately six-month timeline for major inventory rather than December; preserved long-term Hawaii warranty-stock goal and requested low-volume/pay-per-use terms, receiving/storage/releases, will-call/local/Neighbor Island options, SOK DG acceptance and rate-card duration. **No warehouse commitment or inventory purchase authorized.** Do not resend; next step is Cara's response and targeted follow-up on actual terms. Peter review task COMPLETE; external commercial work WAITING (not CLOSED). | OS1 monitors Cara reply; Peter informed by CC; owner approves any contract. |
| **0004P3** | Yelp charges, refunds and cancellation | **DEFERRED — BANK DISPUTE IN PROGRESS / OWNER HANDOFF (Oct 18).** Owner reports bank dispute filed after Yelp did not return or verify approval of the second charge. No further routine Yelp refund-chasing or repeat customer-support calls; allow bank dispute to proceed. Reopen only on bank request, bank decision/credit posting, a newly identified charge or a material cancellation/ads risk. Permanent paid-service termination is not independently verified; do not call that portion complete. This P1-to-P3 move is a new defer/backlog event requiring one concise Peter status notice after Git acceptance. | Owner/bank control; OS1 checks material triggers only. Peter action NONE. |
| **0005P2** | Peter SOP/Git drift and workboard structure proposal | Owner sent SOP-first direction Oct 18; await Peter's response. Existing OS1 management Git is current source. Do not grant OS3 access as a prerequisite or create an extra repo without a separate decision. | OS1; Peter has no additional remediation assignment |
| **0006P2** | EG4 Hawaii commercial opportunity | Tim declined preliminary R1 due to cheaper local supply; owner asked for price-gap feedback. James advised Oct 20 battery-cost increase. Preserve the lead; no purchase/quote revision absent reengagement or owner direction. | OS1 monitors; Peter advisory for specific commercial choice |
| **0007P2** | Shopify pending-payment order | Monitor pending payment; do not source/fulfill an unpaid order. Existing paid/fulfilled order remains closed absent exception. | Shopify lane |
| **0008P2** | SOK Hawaii Shopify draft/catalog qualifications | P1–P3 *project stage names* from the existing Hawaii build remain intact; overall management priority today is P2. Advance only the exact quantity/terminal freight-supported drafts, no bulk restart or unapproved publication. | SOK/Shopify project workers; owner at binding commerce decision |
| **0009P3** | Renogy SKU audits | Peter's seven- and eight-SKU audits completed; retain draft holds and defer targeted catalog cleanup until chosen for launch. No second general audit. | OS1 / Renogy lane |
| **0010P3** | CJ Mexico backpack pilot — live listing activation | **OWNER-DIRECTED P3 DEFERRED OCT 19; previous execution status preserved.** **COMPLETED — LISTING ACTIVATION; OWNER STOCK-THRESHOLD OVERRIDE (Oct 19).** Product `gid://shopify/Product/16075478696305`, CJ SKU `CJFU30964460001` currently ACTIVE as of Oct 19 readback. **KEEP ACTIVE; no Peter chat, OS3 worker, automation or generic listing gate may reset it to DRAFT/UNLISTED for missing freight tests, price holds, rights paperwork, zero Shopify-owned inventory, or incomplete checkout testing.** Owner authorizes moving to DRAFT **only when a fresh, exact-CJ-VID, Mexico-origin stock read verifies fewer than 3 supplier-available units** (0, 1 or 2). **3 or more = KEEP ACTIVE.** Unknown, stale or failed stock reads are NOT proof of under-3 stock; alert and retry rather than unpublish. Recheck variant VID `2092448688954044418`; last verified Oct 16 baseline 36 units, not a current guarantee. Record timestamp, source and count for every status decision; restore ACTIVE if a worker changes it without the threshold receipt. Post-launch tasks are nonblocking tests: Mexico publication and checkout purchaseability, postcode shipping, CJ order fulfillment, listing edits and monitoring. Preserve U.S. lanes. **Oct 19 retail cleanup verified:** seven obsolete hold/draft tags removed; Shopify product remained ACTIVE, five images and USD 101.48 price preserved; Mexico publication readback returned published. Checkout remains a post-launch test. Do not restore hold tags or downgrade absent exact CJ Mexico under-3 inventory receipt. Shopify tracking-zero is not CJ supplier inventory. | OS1 authority / OS3-CJ stock monitor / Shopify execution; notify Peter of owner override. |
| **0011P3** | Olight catalog expansion / Peter relationship handoff | **P3 DEFERRED / PETER OLIGHT FOLLOW-UP HANDLED — OWNER CONFIRMED OCT 19.** Mark Peter's current Olight reply/coordination assignment COMPLETE; no duplicate communications or repeat review. Broader Olight catalog expansion remains **P3 PAUSED** unless owner separately resumes it. Kiki's holiday 200+ unit/custom order planning request does not authorize speculative stock purchase or override pause. Return only on material supplier response, customer obligation or explicit owner instruction. | OS1 monitors only; Peter's assigned follow-up COMPLETE. |

| **0012P0** | Shopify US-market publishing and buyer checkout truth | **LIVE READ-ONLY AUDIT OCT 19 COMPLETED: 94/94 ACTIVE PRODUCTS SCANNED.** All 94 have Admin-reported `onlineStoreUrl`, but that does not prove US address checkout. Two ACTIVE product records have unavailable variants (`availableForSale=false`, `inventoryPolicy=DENY`, zero tracked qty): LG 16H Prime 16kWh Battery + Growatt Inverter Bundle `gid://shopify/Product/16020167688561` (four sampled variants), and LG RESU16H Prime 16kWh High-Voltage Battery `gid://shopify/Product/16020155236721` (one). Zero-inventory dropship products including VEVOR diesel air heater and CJ bags returned `availableForSale=true`; do not treat supplier inventory as HQ zero. **Remaining P0 customer purchaseability tests:** actual US address rate/checkout for representative active US SKUs; verify supplier basis for the 2 LG records before any inventory policy, stock or product change. No listings, rates, inventory or statuses mutated in this audit; do not rerun broad scan absent change event. Preserve 0010 Mexico owner stock-threshold override and paused Olight catalog work. | Shopify operations / OS3 exact bounded diagnostics; owner only for material customer risk. |
| **0013P1** | Google Merchant Center listing restriction | RECOVERED / CURRENT STATUS UNVERIFIED. Sept 29 Google notice reported misrepresentation restriction and item decline; no later authoritative clearance found in sampled mail. Inspect current Merchant Center diagnostics and site trust fixes, then determine whether a compliant reconsideration is needed. No automatic appeal, ad spend or policy assertions. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | Company Operations / Google commerce lane. |
| **0014P1** | SOK SK48V100N Lower-48 eBay listings — gallery and cutover | RECOVERED / PARTIALLY LIVE. OS3 #74 identifies three already-live replacement items with one-image galleries and owner-approved media-only enhancements; #68 contains earlier create/retire sequence. Do not recreate existing listings or end older items without verified new-listing state. Route exact original-ID gallery updates via accepted commerce executor, current auth and readback. PR OS1 #290 is historical review, not execution permission. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | eBay/SOK specialists through bounded OS3; OS1 receives exact seller readback. |
| **0015P1** | Shopify Colorado HQ residual stock and five SOK/Renogy bundles | RECOVERED / MANAGEMENT DECISIONS REMAIN. OS1 #292 verified HQ disabled for online fulfillment and 221 legacy assignments reduced to 26, all Draft/Archived; #293 records five bundle DRAFTs and Peter's commercial reviews. Decide residual kit BOM/retirement and accurate multi-supplier fulfillment, protected margin and cabinet compatibility; no repeated HQ reset or bulk audits; no publication without exact business decision. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | OS1 decision owner; Shopify/SOK/Renogy workers implement selected bounded actions. |
| **0016P1** | eBay OS3 authentication / protected seller-write recovery | RECOVERED / CAPABILITY HOLD, NOT GLOBAL HOLD. OS3 #56 records unresolved normal-worker auth/Trading checks and prohibition on speculative OAuth/token cleanup; OS1 PR #288 is an older incident draft. Verify present credential state with safe masked diagnostics and seller-read receipts once; preserve all other unrelated commerce work. No destructive resets or eBay write until the exact path is accepted. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | OS3 eBay engineering/security lane; OS1 manages business consequence. |
| **0017P1** | Owner business phone and Google Voice reliability | HISTORICAL OPEN INCIDENT / VERIFY IF STILL AFFECTING SERVICE. OS1 #150 (Sept 12) reported missed incoming calls/texts. Do one present-day inbound call/text and routing test before classifying unresolved or closing; no speculative account/forwarding modifications. If actually still broken, escalate immediate customer-contact recovery. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | Company Operations / owner communication lane. |
| **0018P2** | Existing Hawaii SOK eBay multi-variation shipping and listing integrity | RECOVERED / EXACT REMEDIATION ONLY. OS3 #46 reconciled Hawaii offers and one legacy multi-variation item lacking a supported safe OS3 edit route. Preserve sibling variation IDs and real DG/terminal terms; isolate only currently incorrect live policies, rates or copy. Unmerged OS3 PRs #67/#43 are evidence/candidates, not live proof. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | SOK Hawaii / eBay specialists. |
| **0019P2** | NEW SOK SK12V100PC Hawaii six-pack and DG freight policy | RECOVERED / DRAFT INCOMPLETE. OS3 #80 and draft PR #81 stage six-pack content and DG-policy contract; no current six-pack freight-qualified buyer rate, published policy or live offer verified. Keep distinct from existing Hawaii variations; qualify exact island/terminal and authorization before any live creation. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | SOK Hawaii freight + OS3 eBay engineering; owner for approved retail freight. |
| **0020P2** | Three legacy SOK eBay single-listing image/description revisions | RECOVERED / AUTH-DEPENDENT EXECUTION WAITING. OS3 #44 holds accepted 6/5/6 image+content packets for original item IDs, but no complete original-ID live revision readback; partial job outcomes require reconciliation. Reuse accepted OS3 PR #49, not superseded PR #48; PR #59/#45 are selective review candidates. Do not restart media harvesting or claim write completed. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | OS3 eBay specialist, dependent on 0016P1 safe seller path. |
| **0021P2** | CJ United States 153-SKU source register to launch candidates | RECOVERED / SOURCE SNAPSHOT READY. OS3 #93 and Peter's Oct 17 shortlist are accepted reconnaissance; factory vs CJ-managed stock and 153 origin-qualified rows are not live US orderability or postage. Choose bounded Tier A candidate(s), exact-SKU quantity-one source acceptance, ship-to rate, channel rights and post-fee contribution. No bulk Shopify stock injection or repeated full scan. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | CJ sourcing / OS1 commercial owner; Peter's shortlist complete. |
| **0022P2** | Epoch dealer fulfillment and Hawaii/Puerto Rico expansion | RECOVERED / STAGED. OS1 #291 and Peter worktree show active Lower-48 1250A-ES; Oct 15 communications cite a second product and checkout smoke tests pending. Oct 16 Daniel thread supports exploring HI/PR freight, not acceptance. Verify current SKU-specific supplier fees and checkout on existing products; progress five-model HI/PR quote qualification only after SOK commitments permit. Olight remains paused. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | Epoch/vendor and Shopify lane; Peter consulted on concrete commerce review. |
| **0023P2** | Winegard dealer data and portal onboarding | RECOVERED / EXTERNAL INPUT WAITING. Approved reseller agreement acknowledged; Oct 6 Peter requested catalog, dealer pricing, inventory, dropship, warranty terms and portal access. No later material response found in sampled mail. Preserve inquiry and resume when provider supplies facts; do not invent an authorized catalog. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | Vendor onboarding / Peter when a real reply arrives. |
| **0024P2** | Phocos partner records and first-product intake | RECOVERED / SOURCE ALREADY FOUND. Oct 15 owner forwarded earlier Phocos messages and Peter acknowledged the retrieval problem was a connection error. Reuse recovered materials and identify only exact still-missing SKU/commercial onboarding inputs; no fifth repetitive owner request or duplicate introduction. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | Vendor onboarding / Peter, one bounded status decision. |
| **0025P2** | Doba exit, refund request and TikTok risk/appeal documentation | RECOVERED / EXTERNAL REVIEW. Doba Basic cancelled and linked fulfillment interrupted; Oct 8-13 correspondence says used-plan refund refused and TikTok evidence referred onward. Reconcile actual final settlement/appeal response once; do not reactivate Doba listings or file another generic complaint absent new evidence. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | Company Operations / owner dispute liaison. |
| **0026P2** | PayPal restriction and banking-complaint response | RECOVERED / EXTERNAL WAITING. Colorado Division of Banking replied Oct 13 concerning PayPal complaint; Oct 12 PayPal Message Center notice exists. Verify whether a substantive response or restored capability has arrived, not through repeated generic account-repair loops. Keep unrelated ecommerce live. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | OS1 payment operations / owner only when a bank or PayPal action is required. |
| **0027P2** | Web V2 customer-safe storefront copy and merchandising validation | RECOVERED / PRESENT STATE CHECK NEEDED. Older OS1 #147/#192/#185/#141 involve public AI-ops wording contamination, visual quality and hero no-touch rules. Audit current published pages and preserve accepted live design; fix only observed customer-facing defects. Do not restart historical releases. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | Web V2 / storefront owner-scoped worker. |
| **0028P2** | Partners page and Hawaii commercial B2B brochure integration | RECOVERED / ASSET PRESERVATION FIRST. OS1 #233/#234/#235 include verified-vendor Partners page and an already-approved six-page B2B brochure for Hawaii route. Read deployed website first; use existing approved brochure and true vendor counts; integrate only absent customer-facing pieces after approval. Do not recreate finished design. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | Web V2 / commercial content specialist. |
| **0029P2** | OS3 generic Shopify variant and operations command maintenance | RECOVERED / ENGINEERING BACKLOG. OS3 #87 requested reusable one-command variant create/update/media/readback; actual Oct 12 CJ five-color bag is already completed in Shopify, not a reason to repeat mutations. OS3 #51 broader commerce-agent roadmap and draft PRs #9/#8/#15 are candidate capabilities; only proven missing executor features should become scoped engineering tasks. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | OS3 engineering; no Peter or customer catalog rework. |
| **0030P2** | Credit-union business line-of-credit preparation | OWNER PLANNING / NOT YET SUBMITTED. Owner is considering applying for commercial financing before larger Hawaii stock commitments, roughly six-month horizon; linked to 0003P1 Logistics Plus relationship. Record required business application inputs and eligibility only when directed, without recording private financials in public Git or treating approval as granted. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | OS1 owner finance planning; Peter advises only on warehouse-commercial sequencing. |
| **0031P3** | Open PR and historical issue disposition audit | RECOVERED / REVIEW ONLY. Snapshot Oct 18: 9 open OS1 PRs, 13 open OS3 PRs, plus 19 OS1 and 13 OS3 open issues (excluding PRs). Use the linked PR ledger to distinguish active incomplete work from superseded/historical proposals; don't merge, close or delete merely because a PR is open. Close/retire only on owner-authorized review and proof of supersession; do not silently reactivate Olight. Related recovery receipt: [audit](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). | OS1 Git management / OS3 code owner for respective repositories. |

**Audit scope / source mapping:** [October 18 recovered work-order and 22-PR disposition register](WORK_ORDER_RECOVERY_AUDIT_2026-10-18.md). Existing 0001–0011 remain as previously authorized; recovered 0012–0031 are **triage assignments**, not automatic execution approvals. The last issued company sequence is now **0031**; the next new independent work order is **0032**. Historic issues/PRs referenced below are evidence, not automatically new orders. Peter's currently assigned 0003P1 remains his sole human management ask unless Casey directs otherwise.

### New eBay post-sale decision checkpoint — remains controlling
**PAID SALE → VERIFY EXACT ORDER/SOURCE → CURRENT LANDED COST + ALL PLATFORM/PROMOTION COSTS → EXPECTED PRE-FEE MARGIN AND NET CONTRIBUTION → OWNER APPROVE / DENY SOURCE PURCHASE / HOLD FOR EVIDENCE → EXECUTE APPROVED ROUTE → TRACKING/DELIVERY → ACTUALS.** Retain the existing eBay SOP thresholds, without inventing rates/costs. No unapproved supplier purchases, labels or marked shipments. Denial of a proposed source route does **not** erase customer obligations: promptly evaluate viable authorized alternate fulfillment or owner-directed eBay-compliant customer remediation. Protect the actual Oct 21 ship-by date.

**Public data protection:** Public management Git stores priority, decision status, accountable lane and redacted receipts. Protected dealer costs, private freight, fees and buyer PII remain in authorized private systems.

---

## 2026-10-08 MPM 30 — OS3 execution integration and current SOK state

This section supersedes the older draft-only assignment and mandatory further-media sourcing below **for the three existing singles only**. Preserve historical receipts as evidence; they are not new execution gates.

- **Code:** [OS3 PR #49](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/49) implements the bounded existing-item content executor, durable jobs/checkpoints and typed local MCP interface. Follow the [current OS3 runbook](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/blob/main/docs/os3-execution-integration.md). Re-resolve accepted main and installed capabilities; code acceptance does not prove host installation or a connected OS1 session.
- **Accepted content:** Shopify descriptions and **6 / 5 / 6** approved photos for `SK24V150PH` (`168697309882`), `SK12V206H` (`168698654908`), and `SK12V100H` (`168697309880`), respectively. [Owner override in issue #44](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/44#issuecomment-6070497096) permits this baseline; twelve photos and video are optional later enhancement, not blockers. Do not reopen Drive/archive/catalog research to finish this bundle.
- **Preservation:** revise only approved description and gallery on those original IDs. Preserve current retail price, quantity, shipping, policies, handling, category, SKU and location. No duplicate creation, migration, end/relist or unrelated listing mutation.
- **Runtime next action:** install accepted OS3 main on the owner host and establish its private MCP connection to OS1. Use `Show OS3 capabilities`, reuse the existing preparation packet, and bind one local exact-bundle execution grant to the reviewed seller/hash. MCP cannot issue that grant. Existing seller authorization may be reused if runtime checks pass; do not assume a browser sign-in is required merely because no editor was previously attached.
- **Resume:** submit the registered execute action with a stable idempotency key, poll its durable job, and report each item independently. Known image uploads resume from checkpoints; unknown upload/revision outcomes require reconciliation. A blocked item does not freeze other safe items.
- **Evidence boundary:** no live eBay revisions or host/OS1 connection acceptance are claimed by this coding update. Completion requires original-ID readback of description/gallery and preserved commercial fields.
- **Separate drafts:** OS3 #42/#43/#45 remain unmerged. #48's offline revision plan is superseded for this lane; do not merge that draft as another engineering prerequisite. Hawaii/private-source, video, and excluded models keep their existing boundaries.

---

## Historical 2026-10-08 continuation — pre-integration blocker


- Local OS3 Hawaii master **read and persistence accepted**: Windows receipt `OS3-20261008053840-EDSUK`, 497/497 tests, 39 private carrier quotes (27 in-window/12 historical), unchanged source hash. Private-source access PR #43 is **draft/unmerged** pending explicit merge approval. No freight booking or customer pricing authorized.
- SOK single-battery eBay **improvement priority**: Three already-listed singles (`SK24V150PH` 168697309882, `SK12V206H` 168698654908, `SK12V100H` 168697309880) have exact Shopify retail-ready description/gallery packets staged on OS3 main. **No live eBay revisions yet**.
- Next bounded OS3 engineering/read assignment: [elevation-agent-manager issue #44](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/44). Confirm seller item ID, legacy Trading API vs Inventory API management, current status, SKU/model, gallery source mode and exact field-by-field diff; stop at a **draft-only revision implementation/preview** with no write until exact owner approval.
- Preserve Shopify-only hold for SK24V100, ended/seller-held SK48V100N, excluded charger kits/multipacks, and blocked new SK24V150PH duplicate offer `EBAYLIST-2C667EBB64-944W95F9`.
- Resume existing SOK single work before **derived Hawaii freight** offers. Hawaii retail offers remain separate and cannot use internal carrier buy prices as direct checkout prices.

---
## HISTORICAL MEDIA STANDARD — 12 DISTINCT PHOTOS + VIDEO — 2026-10-07

For the three existing singles, the current MPM 30 override above controls. The research record below is retained for optional later improvements.

### 2026-10-08 DEEP SOK VIDEO RECON — SUPPLIER MASTER FOUND

**SOK LOCAL VIDEO READ ACCEPTED — 2026-10-08:** Owner ran PR #45's F: scanner, Windows 503/503 tests, installed 7-Zip, read `F:\SOK Battery Product Videos (2).rar`, receipt `OS3-20261008061621-4A2T7` with 9 video files / 0 unsafe / 574,003,731-byte supplier size match. See `operations/SOK_VIDEO_MEDIA_RECON_2026-10-08.md` for all filenames and sizes. All nine map to existing Shopify Files supplier clips by name. No exact 206H or 100H clip yet; 24V150 shorthand classifier fixed in draft #45, new regression test pending local rerun. No video extraction or eBay/Shopify mutation. PRs #43 and #45 remain draft/unmerged; no merge authorization.


**Owner F: availability update:** SOK confirms original SOK Battery Product Videos.rar is already stored on the local F: drive. [OS3 draft PR #45](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/45) stages an exact read-only RAR inventory command, without copying videos or extracting them. PR #45 is stacked on the unmerged draft #43 for tested Windows portability; local build/test and actual RAR inventory receipt still required. eBay video publication/edit remains NOT AUTHORIZED.


SOK's manager sent a **574 MB authoritative product-video RAR archive** on Sep 29, verified by live Google Drive metadata. The related **930 MB SOK photo ZIP** is also available. See `operations/SOK_VIDEO_MEDIA_RECON_2026-10-08.md` for supplier-origin IDs, all nine Shopify model video reads, video candidates and license gates. These files are too large for the connector's 256 MiB limit; the OS3 worker should index the supplier RAR locally on F: when downloaded, not start new general research.

Shopify exhaustive read: **73 video files across the store**, **7 SOK model-associated source clips** (SK12V314PH×3, SK24V150PH×1, SK48V100N×2, SK12V280H×1) and **2 generic feature candidates** awaiting frame-to-SKU validation. SK12V206H and SK12V100H exact-video gap remains until supplier RAR indexed. eBay video uploads/revisions remain not authorized. OS3 issue #44 holds the consolidated task.


**Owner direction:** Use 12 real, distinct, model-correct photos on SOK eBay single-battery listings wherever enough approved media exists, PLUS one exact-model seller-approved video where eligible. eBay permits up to 24 ordinary listing photos and one video. Existing 5/6-image packets are valid preparation baselines, **not the desired end state**. Never pad with near-identical cloned renders, incompatible SKU/case/color, charger kits or multipacks.

**Source discovery:** OS3 must search Shopify **product media and Shopify Files** (not just attached product gallery), authoritative SOK approved manufacturer media, previously accepted vendor files/Drive media and accessible local assets. Preserve Shopify exact retail-ready `descriptionHtml`. Record every candidate's model, rights, dimensions, view role, duplicate status and video format/size. Seller-owned legacy item readback and correct API editing route remain mandatory; no Media API upload or live revise without exact owner approval.

**Current live Shopify recon:** SK24V150PH 6 product images / 12 matching image files (several likely copied heroes) **plus attached SOK parallel-wiring READY video 89 seconds**; SK12V206H 5 product images / 9 matching files (some clones or heater-kit-associated); SK12V100H 6 product images / 8 matching files. Video sweep: 73 total store videos, with dedicated SOK SK12V314PH, SK48V100N and SK12V280H clips. No exact SK12V206H or SK12V100H video was identified yet. These are candidate counts, **not approval that 12 unique images exist**.

**Worker task:** [OS3 issue #44](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/44). Stage one consolidated SKU-exact media/video proposal and safe existing eBay item IDs. No edits, publication, new listings, freight rate leakage, or video uploads in reconnaissance. Inaccessible/expired legacy conversation attachments are not source evidence; retrieve original Drive/Shopify/vendor content where available.

---
# CURRENT OWNER OVERRIDE — ALL NINE SOK SINGLE BATTERIES — 2026-10-07

**STATE: P0 / ACTIVE / 1-UNIT EBAY OFFER CONVENTION**

Casey's newest direct instruction supersedes the prior four-model-first restriction: **build every currently identified standalone SOK battery listing now; conduct the detailed supplier stock audit for the internal availability lists after the listing-build pass.** Keep eBay offer quantity at **one (1)** for new single-model offers and preserve accepted one-unit eBay singles. Do not infer confirmed physical stock from an offer quantity of 1.

Nine confirmed Shopify manufacturer-model sources: `SK12V100PC`, `SK12V206PH`, `SK12V314PH`, `SK24V100`, `SK24V150PH`, `SK48V100N`, `SK12V100H`, `SK12V206H`, `SK12V280H`. The two accepted existing singles stay intact. SK12V314PH is owner-cleared to sell and remains the current exact packet; Shopify's stale `Pre-Order` tag needs source-state reconciliation. Complete the rest using existing Shopify/OS3 exact-model discovery and eBay legacy-duplicate checks.

**Source/assignment/status matrix:** `operations/SOK_EBAY_SINGLE_BATTERY_BUILD_2026-10-07.md`.

Execution boundaries are unchanged: per-SKU read-only build packet, specific seller create approval, separate publish approval, live readback; do not conflate quantities with supplier stock. Build preparation proceeds without requiring the final all-model stock spreadsheet; fulfillability and accurate customer shipping promises still gate publication. No blanket commerce write authorization.

---

# OWNER PRIORITY OVERRIDE — SOK SINGLE-BATTERY EBAY REVENUE — 2026-10-07

**STATE: ACTIVE / CURRENT OWNER DIRECTION**

Casey's newest direct instruction elevates SOK single-battery eBay listing quality above older catalog-expansion priorities.

Immediate sequence:

1. **SK12V206PH** — exact single-battery listing reconciliation / strengthening.
2. **SK12V314PH** — exact single-battery listing preparation with preorder/fulfillment evidence preserved.
3. **SK24V100** — exact 24V single-battery listing reconciliation; preserve separation from charger kits and multipacks.
4. **SK24V150PH** — exact 24V single-battery listing reconciliation / strengthening.
5. After these four pass acceptance, expand through the remaining SOK single-battery catalog using the same control packet.

Execution ownership:
- **MPM 28 / OS 1:** priority, packet acceptance, business-decision routing and final execution gate.
- **Recon Worker via OS 3:** live eBay listing/offer/duplicate state, exact seller location/policy evidence, exact model/color evidence, and exception reporting.
- **Shopify/SOK source read:** exact active source variant, approved exact-model media, specifications and source hash.
- **eBay specialist:** prepare or revise only the exact accepted single-battery target; no unrelated packs, kits, prices, policies or listings.
- **Casey:** receives only unresolved business decisions or the final exact consequential execution approval.

Acceptance standard for each single:
- exact model and intended single-battery configuration proven;
- exact 24V blue/orange model identity proven before color enters listing copy;
- existing eBay listing reconciled before any new-listing proposal;
- no duplicate kit, pack or legacy listing collision;
- at least six exact-model approved images, with 8–12 preferred when available;
- source specifications and media match the exact model;
- current marketplace price respects supplier MAP;
- current fulfillment origin, destination rule and business policies are live-read rather than guessed;
- preorder/backorder status is explicit when applicable;
- proposal remains non-mutating until the exact owner execution gate;
- after execution, live readback must verify item ID, title, price, quantity, images, policies, location and status.

**DO NOT restart broad SOK recon. Resume from existing evidence and resolve only the missing live facts required for these exact listings.**

---

# MPM ACCEPTANCE — SOK MARINE + 24V SOURCE RECON — 2026-10-07

**STATE: SOURCE RESOLUTION PASS / EBAY LIVE DELTA OPEN**

MPM accepts the Recon Worker source packet for the four priority SOK singles:
- SK12V206PH — marine-grade single.
- SK12V314PH — marine-capable/Victron single; preserve preorder state.
- SK24V100 — standard 24V single; do not market as a marine-specific model without newer source evidence.
- SK24V150PH — marine-capable/Victron 24V single.

Accepted controls:
- manufacturer SKU is the source-product identity;
- Elevation pack/kit SKUs are commerce compositions and must not be treated as separate manufacturer products;
- exact base-product galleries meet the six-image eBay preparation floor;
- Lower-48 SOK singles source from the SOK Chino fulfillment lane;
- current Hawaii SK24V150PH draft/profile defects stay outside this eBay-single workstream and remain DRAFT/HOLD until separately remediated;
- no new international route is inferred from the Lower-48 source listings.

Current Recon Worker assignment through OS3:
1. Re-read the existing eBay single/offer state for SK12V206PH.
2. Prove whether an exact SK12V314PH single already exists; keep the known presale multipack separate.
3. Reconcile the exact SK24V100 single separately from its charger kit and packs.
4. Reconcile the exact SK24V150PH single separately from its packs.
5. Resolve exact blue/orange 24V model identity from authoritative source/media evidence before color enters eBay copy.
6. Return only live item/offer IDs, seller SKU, title, price, quantity, image count, merchant location, policies, status, duplicate/collision state, and factual blockers.

No create, revise or publish action is authorized by this acceptance entry. Clean packets advance to MPM acceptance; Casey receives only an unresolved business decision or the exact consequential execution approval.

---

# OS 1 / MPM 28 CONTROL ALIGNMENT — 2026-10-02

**STATE: CURRENT / CONTROLLING**

Current owner-established project control:
- **OS 1 / Operating System is the active company management/control system.**
- **MPM 28 is the current manager continuity inside OS 1.**
- MPM 27 and earlier MPM sessions remain inherited history/evidence; they do not become parallel authority layers.
- **OS 2 / Operating System 2.0 is RETIRED.** Do not route new work through it.
- **OS 3 / Agent Manager is an ACTIVE API EXECUTION / CONTROL SYSTEM used alongside MPM 28.** It may perform bounded API execution, acceptance, verification, and audited workflows under its own gates. It does not replace OS 1 management authority and does not infer production, payment, external-send, or unrelated mutation authority.
- Current accepted OS 3 baseline is maintained in `elevationupscales/elevationupscales-elevation-agent-manager`; accepted OS 3 main at this transition is `1e6970dd1fb59b82ae7e5adbf92b58c681794969`.
- Current direct owner instruction remains highest authority.
- Current accepted `main` remains technical state truth.
- Do not create another OS layer, master work board, or parallel control hierarchy.

---

# P0 GIT / WORKER DRIFT RECOVERY — 2026-09-27

**STATE: ACTIVE CONTROL LOCK / REPAIR IN EFFECT**

Owner directed repair of massive Git drift and worker execution errors.

Current recovery control:
- start every new technical task from current `main`;
- existing drifted `work/*` branches are historical evidence unless explicitly reauthorized;
- if a branch is behind current `main`, do not resume/merge it wholesale—create a fresh branch from current `main` and port only the still-approved scoped changes;
- PRs #242, #244 and #245 are CLOSED / QUARANTINED;
- do not use closed PR branches as bases;
- one owner objective = one focused branch = one PR;
- repetitive worker bookkeeping/recon/status commits must be consolidated rather than stacked;
- Shopify actions remain Shopify work; Git website workers must not create competing commerce truth;
- durable incident control: `operations/GIT_DRIFT_RECOVERY_2026-09-27.md`.

**No production deployment is authorized by this recovery lock.**

---

# MPM 28 OPERATING RHYTHM — 2026-10-02

**STATE: ACTIVE MANAGEMENT CADENCE**

Current management cadence:

**MORNING CHECK → REAL CUSTOMERS → MONEY / FULFILLMENT → ONE REVENUE LANE → CONVERSION → OPTIONAL EXPANSION → CLOSE STATE → REPEAT**

Individual-work cadence:

**VERIFY ONCE → EXECUTE → VERIFY RESULT → RECORD MATERIAL CHANGE → NEXT**

Waiting-external rule:

```
BLOCKED LANE
↓
WAITING EXTERNAL
↓
REMOVE FROM ACTIVE WORK QUEUE
↓
CONTINUE OTHER INDEPENDENT WORK
```

A waiting lane re-enters active work only when a new external reply arrives, materially new evidence appears, or Casey explicitly reactivates it.

Immediate management stack:
- **P0 — Paid customer fulfillment:** paid customer obligations outrank catalog polish or blocked-account recon. eBay fulfillment remains at the front of this lane until current paid-order obligations are reconciled and completed.
- **P0 — MPM 28 continuity:** canonical control documents, active queue, and worker routing must reflect the current OS 1 / OS 2 / OS 3 model.
- **P1 — OS 3 production acceptance / controlled expansion:** continue bounded API acceptance work independent of PayPal. Current accepted OS 3 main baseline is `1e6970dd1fb59b82ae7e5adbf92b58c681794969`; eBay read-only foundation remains an active controlled-expansion lane until separately accepted.
- **P1 — Shopify/CJ commerce workflow:** Shopify specialist acceptance and CJ → Shopify controlled workflow may continue under exact approval, read-after-write, audit, and independent-verification gates.
- **P1 — Google Merchant repair:** treat as an active revenue/acquisition blocker.
- **P1 — Hawaii SOK physical movement/payment path:** logistics model is proven; first physical order still requires completion proof through supplier release / tender / movement / receipt as applicable.
- **P1 — Olight domestic revenue + global qualification:** domestic lane remains active; international/global expansion stays qualification-gated.
- **WAITING EXTERNAL — PayPal complaint/account review:** no repeated recon or escalation while there is no new PayPal evidence. PayPal is not a global blocker.
- **WAITING EXTERNAL — Signature Solar EG4 freight package:** hold until supplier freight/hazardous-goods data advances.
- **HOLD — PayPal-dependent work:** only work specifically requiring restored PayPal capability remains held.

Control:
- **MPM 28 manages inside OS 1.**
- Recon verifies when routed; recon does not become a parallel manager.
- **OS 2 is retired.**
- **OS 3 is active bounded execution/control alongside MPM 28.**
- Waiting work leaves the active queue until its external state changes.
- One blocked lane does not block another clean revenue or acceptance lane.

---

# OWNER RELEASE CONTROL — CURRENT

**NO PRODUCTION DEPLOYMENT WITHOUT CASEY'S EXPLICIT APPROVAL.**

This supersedes any older instruction that allowed routine promotion/deployment without a fresh owner gate.

Development may branch, build, test, create previews/candidates, and return a release receipt without another owner decision when the scope is already approved.

Production promotion/deployment stops at:

**READY TO DEPLOY → CASEY APPROVAL REQUIRED.**

MPM, COM, and Recon are not the normal production coding/deployment lane. The temporary manager/recon direct-deploy pattern used to push through major website grunt work is closed. A manager/recon worker may directly execute code/deployment only when Casey explicitly directs that exception for the specific task.

---

# CURRENT COMPANY POSTURE

**Aggregate:** GREEN / ACTIVE with contained yellow areas.  
**Operating focus:** **REVENUE CONVERSION / COMMERCE STABILIZATION.**

Major website build/edit work is substantially complete. The company is now converting authorized vendor relationships into **verified, profitable, purchasable products and actual orders**.

Current priority order:

**P0 CORE LINEUP MERCHANDISING + PURCHASEABILITY → P0 WEB / COMMERCE STABILIZATION → P1 CATALOG ECONOMICS + PRODUCT TRUTH → P1 SOK EBAY REVENUE → P1 SHOPIFY / RENOGY REVENUE → P1 LISTING QUALITY → P1 SUNGOLDPOWER → P2 SECONDARY VENDOR / COMMUNICATION WORK.**

Vendor acquisition is no longer the main mission. New vendor prospecting is opportunistic only unless Casey specifically elevates a target.

One blocked vendor/SKU does not block another clean revenue lane.

---

# DEVELOPMENT OPERATING MODE

Major redesign is closed unless Casey explicitly reopens it.

Normal development loop:

**ISSUE OBSERVED → RECON/QA PROVES IT → MPM ROUTES BOUNDED PACKET → DEVELOPMENT BRANCHES → DEVELOPMENT FIXES → QA/RECON VERIFIES → READY TO DEPLOY → CASEY APPROVES → RELEASE ENGINEER DEPLOYS → LIVE SMOKE → BASELINE RECORDED.**

Development is **state/gate driven, not time scheduled**. A work packet stays active until it passes, hits a real blocker, or requires an owner decision.

Managers manage state and priorities. Workers execute code and commerce operations.

---

# OWNER P0 DIRECTIVE — CORE LINEUP MERCHANDISING + PURCHASEABILITY — 2026-09-20

Casey's current storefront directive is:

**CORE 12 → HOMEPAGE HIERARCHY → THREE BUYING LANES → TRUST PASS → 12-SKU CHECKOUT SMOKE → MARKET**

This supersedes broad catalog-growth and random-product merchandising as the current storefront priority.

Execution rules:
- preserve the current theme/shell; this is a merchandising and purchaseability pass, not a redesign;
- use approximately 12 deliberately promoted revenue SKUs as the measured selling set;
- simplify the visible customer path into **Shop Equipment / Complete Systems / Commercial-Large Projects**;
- homepage sequence should represent the full business rather than overloading first-time visitors with SOK multipacks or Hawaii freight offers;
- target sequence: **SOK 100Ah → Renogy portable solar → Elevation bundle → SunGold 8kW complete system → Hawaii capability**;
- establish a visible entry-price ladder before asking every visitor to make a four-figure decision;
- every core product must answer authorization/trust, fulfillment, included equipment, normal shipping treatment, and Elevation support;
- smoke the exact 12 core product paths from merchandising surface through product detail, cart/Buy action and checkout;
- one failed SKU becomes one bounded repair; do not restart the entire store project;
- marketing scales only after the core lineup smoke is clean;
- sourcing, new bundle creation and broad catalog expansion are behind this conversion lane until the core selling structure has measurable evidence.

Primary measurement:

**CORE PRODUCT VIEW → ADD TO CART → CHECKOUT → PAID ORDER**

Do not use total catalog count as a storefront-success metric.

# CURRENT PRIORITIES — MPM 28 ACTIVE STACK

This table is the current queue and supersedes older priority ordering elsewhere in this file where there is a conflict. Detailed downstream workstream sections remain supporting context only.

| Priority | Work Item | Execution Owner | State | Next Action |
|---|---|---|---|---|
| **P0** | Paid customer fulfillment / eBay fulfillment | MPM 28 + Commerce / eBay Operations | **ACTIVE / CUSTOMER OBLIGATION** | Reconcile and complete paid-order fulfillment first. Do not let PayPal waiting state or catalog polish displace customer deadlines. |
| **P0** | MPM 28 management continuity | OS 1 / MPM 28 | **ACTIVE / CONTROLLING** | Keep canonical board, handoff, worker routing, and closeout state aligned to current owner direction. |
| **P1** | OS 3 production acceptance / controlled API expansion | OS 3 Agent Manager under OS 1 / MPM 28 | **ACTIVE / CONTROLLED EXPANSION** | Continue read → bounded write → read-after-write → audit → independent verification acceptance. Preserve exact approval gates. |
| **P1** | Shopify / CJ commerce workflow | OS 3 + Shopify/CJ specialists | **ACTIVE / CONTROLLED** | Continue bounded Shopify/CJ integration independent of PayPal; no uncontrolled publication, pricing, inventory, or fulfillment writes. |
| **P1** | Google Merchant repair | Commerce / Acquisition | **ACTIVE REVENUE BLOCKER** | Diagnose and repair current Merchant acquisition/feed/compliance blockers with bounded evidence-first work. |
| **P1** | Hawaii SOK physical movement / payment path | Company Operations + Shipping & Logistics | **ACTIVE / COMPLETION PROOF OPEN** | Advance the first physical order through remaining release/tender/movement/receipt evidence. Do not restart broad recon when a gate is unchanged. |
| **P1** | Olight domestic revenue + global qualification | Ecommerce & Vendor Operations / Peter | **DOMESTIC ACTIVE / GLOBAL GATED** | Keep domestic revenue lane moving; qualify territory, fulfillment, transport, and compliance before international expansion. |
| **WAITING EXTERNAL** | PayPal complaint / account review | Company Operations | **WAITING EXTERNAL** | No active recon or repeated escalation until a new PayPal reply or materially new evidence arrives. Not a global blocker. |
| **WAITING EXTERNAL** | Signature Solar EG4 freight package | Vendor / Shipping Operations | **WAITING EXTERNAL** | Resume when supplier freight / DG / packed-weight data arrives. |
| **HOLD** | Work specifically dependent on PayPal restoration | Relevant workstream owner | **HOLD — DEPENDENCY** | Resume only after PayPal capability is restored or an owner-approved alternate payment path is established. |

Current health summary:

```
OS 1 MANAGEMENT          YELLOW — MPM 28 TRANSITION IN PROGRESS
OS 2                     CLOSED / RETIRED
OS 3                     GREEN-YELLOW — ACTIVE / CONTROLLED EXPANSION
PAYPAL                    WAITING EXTERNAL
SHOPIFY                   GREEN
CJ                        GREEN
EBAY FULFILLMENT          RED / P0
OLIGHT DOMESTIC           GREEN
OLIGHT GLOBAL             YELLOW / QUALIFICATION
HAWAII LOGISTICS          GREEN-YELLOW
GOOGLE MERCHANT           RED / P1 BLOCKER
CANONICAL GIT STATE       YELLOW → ALIGNING TO MPM 28
```

---

---

# WEB V2 SHOPIFY-ALIGNED LISTINGS — OWNER BUILD APPROVAL — 2026-09-17

Casey approved the bounded Shopify-aligned purchasable-listings packet for elevationupscales.com.

Execution branch:
- `work/web-v2-shopify-purchasable-listings-2026-09-17`
- base: `6ffe0eed331556652230fc0ec086f4bed9270459`

Scope:
- mirror Shopify's proven product-card/detail merchandising structure;
- expose only verified live products;
- preserve one commerce truth;
- route purchase CTAs into the existing verified checkout/payment path;
- add Renogy / Hawaii-Alaska / Canada customer discovery paths;
- no broad homepage redesign;
- no held-SKU activation;
- no duplicate payment engine.

Control:
**BUILD / TEST / PREVIEW AUTHORIZED. PRODUCTION DEPLOYMENT IS NOT YET AUTHORIZED.**

Development must return an exact candidate SHA and `READY TO DEPLOY: YES/NO`. Production remains behind the separate Casey approval gate.

---

# MARKET EXPANSION + CLICK-CONVERSION CHECKPOINT — 2026-09-17

Canonical control: `RENOGY_HI_AK_CANADA_MARKET_OPENING_2026-09-17.md`.

Owner direction:
- Hawaii Renogy path: **OPENING / ACTIVE**
- Alaska Renogy path: **OPENING / ACTIVE**
- Canada Renogy path: **OFFICIALLY ACTIVE PATH**
- objective: **increase qualified product click-through and convert clicks into paid orders**
- do not wait for perfect shipping history where a conservative bounded estimate is safe
- learn from actual orders and adjust future rate classes

Worker boundaries:
- **Shopify Store Operations under Peter:** destination eligibility, shipping rates, publication, checkout, purchaseability
- **Commerce/Storefront:** click-through merchandising only; one clear eligible-products path; no broad redesign
- **Shipping & Logistics:** actual cost, freight/DG exceptions, estimate tuning
- **OS RECON:** verify boundaries, route logic, promoted-SKU purchaseability, funnel evidence
- **COM2/COM3/support workers:** supporting evidence/fixes only; no competing market rule set

Initial planning estimates have been superseded by the live Shopify execution receipt and checkout-rate proof:
- Renogy small-parcel remote profile: **AK/HI $34.95**;
- Renogy small-parcel Canada profile: **$29.95** in the current launch provinces;
- Renogy 3000W inverter remote profile: **AK/HI $119.95**;
- Renogy 3000W inverter Canada profile: **$79.95**;
- Canada launch provinces: AB, BC, MB, NB, NL, NS, ON, PE, QC, SK;
- Canada YT / NU / NT remain excluded;
- no generic Hawaii free-shipping threshold during learning;
- rates remain conservative launch estimates and must be tuned from real paid-order freight data.

Hard exclusions remain:
- AK/HI batteries: no blanket auto-open
- AK/HI solar panels over 320W: blocked from automatic air route
- Canada Yukon/Nunavut/NWT: blocked under current route
- regulated/DG or unknown freight: quote/review
- expansion does not clear unrelated SKU price/orderability/media holds

Conversion funnel to measure:

**IMPRESSIONS → PRODUCT/COLLECTION CLICK → PRODUCT DETAIL → ADD TO CART → CHECKOUT → PAID ORDER**

Do not claim click-rate improvement without before/after evidence. Do not optimize vanity traffic at the expense of purchaseability or margin.


---

# OS RECON MARKET-EXPANSION EXECUTION CHECK — 2026-09-17

Live Shopify verification after the canonical expansion control:

- **Renogy — Hawaii & Alaska Eligible** collection exists and contains 5 ACTIVE Renogy products.
- **Renogy — Canada Supply** collection exists and contains 5 ACTIVE Renogy products.
- Both expansion collections now have intentional customer-facing collection imagery and updated retail copy.
- The default **Main menu → Shop** now directly exposes **Renogy — Hawaii & Alaska** and **Renogy — Canada Supply**.
- The prior destination-discovery defect is **FIXED** in live Shopify; measure external source → collection/product → cart movement before another navigation redesign.
- The AK/HI set correctly excludes the 400W Renogy suitcase.
- Live variant verification:
  - `RSP10TC-G1-US`: ACTIVE / availableForSale PASS / inventory policy CONTINUE / qty 0.
  - `RNG-CTRL-ADV30-LI-US`: ACTIVE / availableForSale PASS / inventory policy DENY / qty 0.
  - `RBM500-G3-US`: ACTIVE / availableForSale PASS / inventory policy DENY / qty 0.
  - `RSHST-B02P300-G1-US`: ACTIVE / availableForSale PASS / inventory policy DENY / qty 0.
  - `RNG-INVT-3000-12V-P2-G3-US`: ACTIVE / availableForSale PASS / inventory policy CONTINUE / qty 0.
- Because three promoted Wave-1 products remain DENY at quantity zero, **do not change inventory policy merely to improve click rate**. Shopify Store Operations must reconcile exact supplier orderability before changing those controls.
- The conversion baseline shows **41 search sessions with 0 cart additions**, making search/landing relevance and product discovery the clearest current external conversion weakness.
- Route:
  - **Commerce/Storefront:** surface the two market collections in a clear customer-facing navigation/merchandising path and add intentional collection imagery/copy; no broad redesign.
  - **Shopify Store Operations under Peter:** verify destination checkout/rates and reconcile the three DENY-at-zero Wave-1 SKUs before claiming them fully purchase-ready.
  - **OS RECON:** re-verify navigation, collection contents, purchaseability and funnel movement after receipts land.
- Do not create another market-expansion plan. This is execution against the existing canonical control.


---

# OS RECON FOLLOW-UP — MARKET DISCOVERY STILL OPEN — 2026-09-17

Current Git advanced through Renogy Wave-1 reconciliation and BOM/hazmat hardening, but the storefront discovery defect remains open.

Verified live Shopify state:
- **Renogy — Hawaii & Alaska Eligible** now contains 9 ACTIVE products.
- **Renogy — Canada Supply** now contains 9 ACTIVE products.
- Both collections have customer-facing imagery and updated retail copy.
- Default **Main menu → Shop** links both destination collections directly.
- Six primary Renogy entry-product PDPs have been rewritten for customer value/trust and route clarity.
- `RSP100DCT-G1-US` has been corrected to the canonical **$99.99** price.
- `RNG-KIT-STCS100DC-VOY20-G1-US` now has populated SEO; `RBM500-G3-US` SEO no longer embeds dated stock language.

Therefore the current conversion priority is now:
**MEASURE EXTERNAL SOURCE → PRODUCT/COLLECTION → CART MOVEMENT → FIX ONLY THE NEXT PROVEN DROP-OFF.**

Catalog-side progress since the previous recon:
- Renogy Wave 1 has been fully triaged against current commercial truth.
- `RSP10TC-G1-US` remains LIVE / verified.
- `RBM500-G3-US` and `RSHST-B02P300-G1-US` remain ACTIVE under current route/orderability controls.
- `RSP100DCT-G1-US` and `RCC20VOYP-G1-US` remain HOLD; do not force activation.
- Renogy kit/bundle hazmat control is now BOM/component-based; unresolved included battery/regulated component keeps the kit on HOLD.
- Do not reopen Wave-1 product activation merely because the storefront discovery defect is still open.

Execution ownership remains:
- **Commerce/Storefront:** add a clear customer-facing path to the Hawaii/Alaska and Canada Renogy collections and add intentional collection imagery/copy; no broad redesign.
- **Shopify Store Operations under Peter:** continue route/rate/purchaseability verification; do not change inventory/orderability controls merely for click rate.
- **OS RECON:** re-verify after storefront receipt lands and compare the conversion funnel against the existing baseline.

Status: **YELLOW — DISCOVERY/CTR DEFECT OPEN; PRODUCT TRUTH CONTROL IMPROVING.**

---

# SHOPIFY SALES-CHANNEL CHECKPOINT — 2026-09-17

- Shopify Shop-channel incident was verified, not ignored.
- Store state before repair: **67 ACTIVE products; 37 Shop-approved; 30 Shop needs-action; 0 Shop-published reported by channel search**.
- The 37 Shop-approved products were added to the Shop publication with zero publication errors.
- The 30 needs-action products were audited. All 30 had valid price + featured image and all 30 were missing Shopify Standard Product Taxonomy categories.
- Standardized categories were assigned to all 30 affected products with zero product-update errors.
- The repaired 30 were also added to the Shop publication with zero publication errors.
- Final approval-state check: **37 approved / 0 needs-action**. Per-resource verification confirms Shop publication membership is live; channel aggregate counters may lag Shopify's publication objects during reprocessing.
- Facebook & Instagram channel audit: **36 ACTIVE products are currently published**, with **0 approval backlog and 0 needs-action backlog** at the COM 3 checkpoint.
- Do not reopen broad Shop repair unless a fresh Shop eligibility or publication error appears. Continue verifying customer-facing purchaseability as channel sync settles.

---

# SHOPIFY CONVERSION BASELINE — 2026-09-17

- Fresh Shopify analytics baseline after storefront/navigation and channel repairs:
  - **168 sessions** in the last 30 days; **167** occurred in the last 7 days.
  - **15 sessions with cart additions**.
  - **18 sessions reached checkout**.
  - **0 sessions completed checkout**.
  - **0 non-test Shopify orders** at the same checkpoint.
- Traffic source split:
  - Direct: **107 sessions / 13 cart additions / 17 checkouts / 0 purchases**.
  - Search: **41 sessions / 0 cart additions / 0 checkouts / 0 purchases**.
  - Social: **17 sessions / 1 cart addition / 1 checkout / 0 purchases**; current social referral traffic is Facebook.
  - Unknown: **3 sessions**.
- Device split: **154 desktop / 13 mobile / 1 other**. Because management/QA activity is desktop-heavy, raw storewide conversion is materially contaminated by internal/testing sessions; do not treat 0.0% aggregate conversion as a clean prospect-only rate.
- Current conversion interpretation:
  - **Search traffic is not progressing into cart at all** and is the clearest external acquisition/merchandising weakness in the current sample.
  - Social has produced at least one cart + checkout from 17 sessions, but sample size is still too small for a broad redesign conclusion.
  - Direct checkout activity is heavily mixed with internal QA and cannot be used as proof of a customer checkout defect without a clean external reproduction.
- COM / Recon action: maintain this as the baseline. Optimize qualified external clicks and search landing/product relevance first; only reopen checkout repair when a clean external customer-path test or real customer evidence proves a defect.

---


# MPM RUN LIVE DELTA — 2026-09-17

This delta records only state verified during the current management RUN. It does not create a new authority layer.

- Git `main` was re-resolved at the start of this RUN to `4dbdb14fcd42da4ec6d1acd4d557740391acb14e`; that commit records Casey's Shopify-aligned Web V2 build approval.
- Web V2 PR **#236** is open at head `3aaa7335e21ab88bcdb1d57d2bcd1a54a123676f`. Its latest Pull Request QA fails inside the pre-existing SOK commercialization gate, not inside the Renogy diff. The branch also must reconcile current `main` ancestry before the preview workflow can pass. Exact correction and preview routing were posted to PR #236; **production remains not authorized**.
- Live Shopify order check: **0 orders present**. A real paid order still supersedes optimization work if one appears.
- **Renogy — Hawaii & Alaska Eligible** now contains **9 ACTIVE products**; **Renogy — Canada Supply** also contains **9 ACTIVE products**.
- Renogy remote-market reconciliation corrected: `RNG-INVT-3000-12V-P2-G3-US` is intentionally AK/HI + Canada enabled under the later Shopify execution receipt. Checkout-rate proof is recorded at **$119.95 AK/HI** and **$79.95 Canada**; live Shopify confirms ACTIVE + published + availableForSale + inventory policy CONTINUE. The prior MPM instruction to remove it from the remote-market route is withdrawn.
- Newly advanced Renogy products were live-audited and are customer-saleable:
  - `RSP100DCT-G1-US` — ACTIVE / published / availableForSale / CONTINUE / public backorder verified;
  - `RNG-KIT-STCS100DC-VOY20-G1-US` — ACTIVE / published / availableForSale / CONTINUE / public backorder verified;
  - `RBC2125DS-21W-G3-US` — ACTIVE / published / availableForSale / CONTINUE / supplier orderability verified;
  - `RBC2115DS-21W-G1-US` — ACTIVE / published / availableForSale / CONTINUE / approved media + supplier catalog state.
- Both Renogy remote-market collections currently contain **9 ACTIVE products**. Keep the current route intact unless a fresh exact-SKU shipping/orderability defect appears.
- The 400W Renogy suitcase remains excluded from the AK/HI automatic-air collection, consistent with the >320W exclusion.
- SOK weekly stock refresh: Casey's request to Kam was sent at **10:57 AM MDT on 2026-09-17**; no newer stock reply was found during this RUN. This remains an external wait and does not block verified direct SOK commerce.
- SOK eBay authority: **Casey explicitly owner-authorized the supplied current-upload SOK eBay wave on 2026-09-17.** This supersedes the prior internal marketplace-authority hold for those exact files. The packet contains one confirmed successful listing receipt for `SK24V150PH-L48-4-SEP26` (eBay Item ID `168697218516`). Remaining current-upload files are authorized but must be verified after upload. `10_PRESALE_HOLD` remains separate.
- No vendor email was sent by this MPM RUN.

Status after routing: **P0 Web V2 = DEVELOPMENT CORRECTION/PREVIEW PENDING; Renogy remote-market = ACTIVE; SOK stock refresh = EXTERNAL PENDING; SOK eBay CURRENT WAVE = OWNER AUTHORIZED / VERIFY EACH UPLOAD; SOK PRESALE = HOLD; production deploy = OWNER GATE.**

---

# ASAP SALES-GATE REMEDIATION — 2026-09-17

Owner direction: **fix identified sales gates ASAP**.

Executed live in Shopify:
- six promoted Renogy PDPs now lead with customer-facing Elevation value: exact-SKU support, destination-aware shipping, system-fit help and supplier recheck before fulfillment;
- backorder/pre-purchase language clarified on the 100W bifacial panel and 100W portable suitcase;
- 500A monitor dated-stock SEO/PDP wording replaced with durable orderability/support language;
- missing SEO added to the 100W portable suitcase;
- main Renogy, Renogy AK/HI and Renogy Canada collections now have intentional imagery plus customer-facing route/value copy;
- existing Shopify main navigation already exposes the AK/HI and Canada Renogy collections, so no duplicate navigation mutation was made;
- `RSP100DCT-G1-US` is now **$99.99** live, matching Renogy's current public price at the verification checkpoint;
- all six changed products remained ACTIVE + published + availableForSale after mutation;
- final Shopify order check remained **0 orders**.

Branded-domain trust gate — CLOSED:
- Shopify `shop.primaryDomain.url` now resolves to **`https://shop.elevationupscales.com`** with SSL enabled;
- public Shopify home, Renogy AK/HI collection and Renogy Canada collection resolve on the branded domain;
- PR #236 branch customer destinations were corrected from the old `myshopify.com` host to `shop.elevationupscales.com`;
- stale PR copy for the Renogy 3000W inverter AK/HI rate was corrected from **$89.99** to the verified live **$119.95** rate;
- Shopify delivery-profile API verification confirms small parcel AK/HI **$34.95**, small parcel Canada **$29.95**, inverter AK/HI **$119.95**, inverter Canada **$79.95**;
- preserve the existing Shopify checkout/payment stack; do not create a second payment system.

Status:
**PDP VALUE/TRUST = FIXED; SEO DEFECTS = FIXED; COLLECTION TRUST/DISCOVERY = FIXED; 100W BIFACIAL PRICE = $99.99 VERIFIED; BRANDED SHOPIFY DOMAIN = FIXED; REMOTE-MARKET SHIPPING CONFIG = VERIFIED; PAYMENT STACK = DO NOT REOPEN WITHOUT NEW EVIDENCE; WEB V2 PR #236 = RECONCILE CURRENT MAIN + PREVIEW/SMOKE BEFORE OWNER DEPLOY GATE.**

---
# CURRENT VERIFIED SHOPIFY / ORDER CHECKPOINT

- Fresh non-test Shopify order check on 2026-09-17: **0 real orders present**.
- Real paid orders remain the highest-priority commerce event and supersede catalog polishing when they appear.
- Do not reopen payment-stack work absent a fresh customer-path defect.

---

# SHOPIFY STOREFRONT MERCHANDISING CHECKPOINT — 2026-09-17

- Shopify storefront navigation repair executed after customer-path review showed the home page visually overrepresented SOK and hid the broader catalog.
- The legacy manual `frontpage` collection had only one product and that product was DRAFT with no image; it has been converted into **Featured Power & Off-Grid** and now contains a curated live mix across Renogy, SOK, and VEVOR.
- New customer-facing smart collections created and published: **Solar & Charging**, **Batteries & Monitoring**, and **RV & Mobile Power**.
- Main navigation updated from **Home / Catalog / Contact** to **Home / Shop / Brands / Catalog / Contact**.
- **Shop** now exposes Solar & Charging, Batteries & Monitoring, RV & Mobile Power, Off-Grid & Lithium, and Outdoor & Camping.
- **Brands** now exposes Renogy, SOK Battery, and VEVOR Direct. SunGoldPower remains excluded from live navigation until its product activation gates clear.
- Collection imagery added so the new categories render as intentional visual destinations instead of text-only links.
- No product pricing, supplier truth, or activation status was altered as part of this merchandising repair.

---

# CURRENT VERIFIED SHOPIFY / RENOGY CHECKPOINT

Current verified state:

- Renogy 10W Solar Battery Trickle Charger Maintainer `RSP10TC-G1-US`: ACTIVE at $39.99, available for sale, customer path through checkout/payment-method selection PASS with no real charge/order;
- Renogy 400W compact suitcase portable solar panel `RSP400LSC-G1-US`: ACTIVE at $495.99 and published to the Online Store on 2026-09-17; Shopify generated a live storefront URL after publication;
- the 400W suitcase exposed a launch-control defect: product status had been ACTIVE while Online Store publication was still absent, producing a broken customer link;
- launch control is now: **ACTIVE + ONLINE STORE PUBLISHED + STOREFRONT URL VERIFIED = LIVE**. ACTIVE alone is not sufficient;
- `RBC2125DS-21W-G3-US` 50A IP67 DC-DC MPPT: **ACTIVE / PUBLISHED / AVAILABLE FOR SALE / CONTINUE**; exact SKU, approved media and supplier orderability are verified;
- `RSP100DCT-G1-US` 100W N-Type bifacial: **ACTIVE / PUBLISHED / AVAILABLE FOR SALE / CONTINUE** at $109.99 under the verified public backorder/pre-purchase path;
- `RNG-KIT-STCS100DC-VOY20-G1-US` 100W portable suitcase + Voyager 20A: **ACTIVE / PUBLISHED / AVAILABLE FOR SALE / CONTINUE** at $229.99 under the verified public backorder/pre-purchase path;
- `RBC2115DS-21W-G1-US` REGO 30A bidirectional: **ACTIVE / PUBLISHED / AVAILABLE FOR SALE / CONTINUE** at $327.99 with approved exact-SKU media and supplier catalog state;
- `RKIT200RV-A30D1-G2-US` 200W RV kit: **HOLD — current supplier availability + approved media**;
- `RNG-KIT-PREMIUM400D-RVR40-G4-US` 400W Premium Kit G4: **HOLD — current supplier availability + approved media**;
- `RCC60REGO-G2-US` REGO 60A MPPT: **HOLD — current public price + availability + approved media**;
- no bulk publication is authorized; advance only exact SKUs whose commerce gates are actually clean.

---

# SOK SHOPIFY PACKAGE WAVE — PHASE 1 LIVE / PHASE 2 PLANNED — 2026-09-17

Canonical receipt/plan: `SOK_SHOPIFY_PACKAGE_WAVE_PHASE2_PLAN_2026-09-17.md`.

Owner direction executed:
- equivalent Shopify package listings were built from the owner-authorized SOK eBay package wave without duplicating existing singles or the existing 30.72kWh rack package;
- **12 new SOK package products are ACTIVE + Online Store published + availableForSale**;
- Lower-48 package wave: SK12V206H 2/3-pack, SK12V280H 2/3/4-pack, SK24V150PH 2/3/4-pack;
- Hawaii package wave: SK12V100PC 3/6/9/12-pack;
- owner-authorized eBay customer prices were preserved for Shopify Phase 1; channel-specific repricing is deferred until fee/margin analysis.

Shipping:
- Lower-48 packages reuse `gid://shopify/DeliveryProfile/140130550129` with **Freight Included — Lower 48 / $0.00**;
- Hawaii packages use `gid://shopify/DeliveryProfile/140132122993` with **Hawaii only / Hawaii Lithium Freight — Included / $0.00**;
- Hawaii package price contains the working freight allowance; final carrier/DG/terminal handoff remains a fulfillment check;
- SOK collection copy was updated so Hawaii package availability is no longer contradicted by legacy exclusion language.

Public smoke:
- Lower-48 SK12V206H 2-pack: PASS on `shop.elevationupscales.com`;
- Hawaii SK12V100PC 3-pack: PASS on `shop.elevationupscales.com`.

Phase 2 plan:
- SK12V314PH 2/3-pack presale after fresh supplier timing/orderability check;
- activate existing 20.48kWh and 51.2kWh rack-system drafts after cabinet/freight/orderability gates;
- recon heavier Hawaii battery families before expanding freight packages;
- evaluate Shopify-direct pricing advantage only after fee + MAP + contribution analysis;
- add package-specific merchandising and measure package PDP → cart → checkout → paid order.

Status: **PHASE 1 LIVE / PHASE 2 PLANNED / PRESALE HOLD ISOLATED.**

---

# SOK CONTROL CHECKPOINT

- Public-safe SKU truth is recorded in `SOK_MASTER_CATALOG_TRUTH_2026-09-17.md`.
- The current supplier baseline is the 2026-09-09 SOK package; a fresh weekly stock/availability update has been requested from Kam and is pending.
- Current Shopify SOK MAP reconciliation passed for the active nine-product set; no public-price repair was required at the last check.
- Shopify quantity zero is not treated as supplier out-of-stock proof for dropship products; current supplier availability controls fulfillment truth.
- Protected dealer costs, raw supplier inventory quantities, private correspondence and protected freight economics remain outside public Git.
- Direct Elevation commerce may continue using verified SOK terms while current stock is refreshed.
- Casey's explicit owner authorization clears the internal eBay authority hold for the exact supplied current-upload wave. Preserve `10_PRESALE_HOLD` as a separate gate and verify every eBay upload result before calling it live.

---

# SUNGOLDPOWER CONTROL CHECKPOINT

SunGoldPower confirmed Elevation passed distributor review and may begin listing products on the company website. The supplier-issued 2026-09-15 price sheet provides exact SKU, MAP and stock state for the staged batch.

Batch 1 is recorded in `SUNGOLDPOWER_SHOPIFY_BATCH_1_2026-09-17.md` and consists of five Shopify DRAFT products:

- `SPH302460A` — 3000W 24V Solar Inverter Charger — $445 MAP;
- `SPH302480A` — 3000W 24V Solar Inverter Charger — $459 MAP;
- `SPH5048P` — 5000W 48V Solar Charger Inverter, 100A MPPT Parallel — $750 MAP;
- `SPH504880A` — 5000W 48V Solar Charger Inverter, 80A MPPT — $589 MAP;
- `SPH6548P` — 6500W 48V Split Phase Solar Charger Inverter — $1,150 MAP.

All five were supplier-listed in stock at the source-sheet checkpoint. They remain unpublished pending approved exact-SKU media, dropship/order-submission process, and Lower-48 shipping economics. Casey's Sept. 16 partner packet already requested those operating details; do not duplicate outreach without management approval.

---

# RELEASE / FAILURE BEHAVIOR

For a proven development defect:

**IDENTIFY EXACT FAILURE → FIX SMALLEST SAFE DELTA → RETEST → RETURN RECEIPT.**

Do not restart the whole site project.

Do not let one broken SKU, image, vendor, optional feature, admin surface, or unrelated integration block the entire commerce program unless it actually breaks the customer revenue path.

A development receipt should contain:

- branch / exact SHA;
- defects fixed;
- files changed;
- tests passed;
- known holds;
- `READY TO DEPLOY: YES/NO`.

If `YES`, stop and request Casey's deployment approval.

---

# MANAGEMENT DISCIPLINE

A manager may:

- resolve current state once;
- choose the highest-priority unblocked lane;
- route one execution owner;
- verify receipts/results;
- escalate a proven blocker;
- keep unrelated revenue lanes moving.

A manager may not:

- create a competing global workboard;
- duplicate another worker's recon;
- become the default coding/deployment worker;
- reopen closed recovery history as normal workflow;
- create documentation work that delays execution;
- hold unrelated revenue work because another lane is waiting on an outside party.

When Casey says **MPM RUN** or **RUN** to MPM: execute the highest-priority unblocked management action, route/verify execution, continue until a real owner gate or external blocker is reached.

When Casey says **NEXT**: move to the next unblocked priority without restarting recon.

---

# OWNER GRIND ORDER

This is an attention order, **not a worker time schedule**:

1. keep Development on the bounded Web / Commerce Stabilization packet;
2. open and verify the Renogy Hawaii / Alaska / Canada parcel-class market path;
3. surface eligible products clearly and measure product click → add-to-cart → checkout;
4. keep master catalog truth current without exposing protected supplier economics;
5. execute and verify the owner-authorized SOK eBay current-upload wave; keep the presale hold isolated;
6. advance Shopify / Renogy only when explicit commercial SKU gates clear;
7. hold SunGoldPower Batch 1 at the documented external operating-detail gates while continuing unrelated revenue work;
8. review Development/QA receipts whenever they become ready;
9. approve or hold production deployment as a distinct owner decision.

---

# HISTORICAL REFERENCES

Prior recovery artifacts, dated workboards, old release candidates and previous manager direct-deploy exceptions remain evidence only.

They are not live authority when they conflict with this board or newer owner direction.

---

# CONTROL PHRASE

**CONVERT VERIFIED PRODUCTS INTO PROFITABLE ORDERS. OPEN CLEAN MARKETS. MEASURE THE CLICK. PROTECT THE MARGIN. DEVELOPMENT BUILDS. RECON VERIFIES. MANAGEMENT ROUTES. CASEY APPROVES PRODUCTION DEPLOYMENT.**


---

# SOP RECON CORRECTION CHECKPOINT — 2026-09-24

This checkpoint reconciles durable state against current Git, live supplier/provider evidence, live mailbox send state and read-only public-route smoke. Where an older section conflicts with this checkpoint, this newer state controls.

## P0 — FIRST OFFICIAL HAWAII SOK ORDER

**State:** ACTIVE FULFILLMENT PROOF.

A real Hawaii SOK customer order now supersedes speculative SOK catalog-prep work for fulfillment attention.

Control sequence:

**ORDER / CUSTOMER FUNDS → EXACT SKU + DOCUMENTS → CARRIER/DG READINESS → SOK PO/PAYMENT → SUPPLIER RELEASE → FREIGHT TENDER → TRANSIT → DESTINATION RECEIPT → CUSTOMER CLOSEOUT → ACTUALS**

Do not collapse payment capture, carrier acceptance and supplier release into one gate. Keep Hawaii fulfillment ahead of Puerto Rico research.

## SOK WARRANTY / STORAGE STATE

- Consolidated SOK Hawaii warranty operating-input request: **ANSWERED 2026-09-11 / RECONCILIATION ACTIVE**.
- Logistics Plus Hawaii warehousing/fulfillment rate card: **RECEIVED 2026-09-22 / PROTECTED ECONOMICS RECONCILIATION ACTIVE**.
- Do not resend the completed SOK request.
- Contact SOK again only for a material unresolved fact that prevents an executable warranty/economics model.

## CUSTOM ORDER RELEASE STATE

The Custom Order work from PR #243 is **MERGED TO MAIN / NOT VERIFIED LIVE IN PRODUCTION**.

Read-only production smoke on 2026-09-24 returned **404** for `/custom-order`.

Control:

**MERGED ≠ DEPLOYED.**

Do not represent Custom Order as production-live until Casey explicitly approves a production release and a post-release live smoke passes.

## EXTERNAL COMMUNICATION RECEIPT STATE

Live mailbox state on 2026-09-24 confirms these consequential messages are **SENT**:

- SOK first official Hawaii order notification;
- Approved Freight Forwarders quote #152762 booking-stage message;
- Olight/Kiki launch update.

This checkpoint records send state only; it does not infer approval provenance from mailbox evidence.

Puerto Rico supplier/carrier qualification remains **DRAFT / UNSENT / OWNER GATE**.

For consequential external messages, use:

**DRAFT → CASEY APPROVED / CASEY SENT → SENT RECEIPT → RESULT / WAITING**

## OPEN-PR CONTROL

The 2026-09-24 SOP recon found the open PR estate materially diverged from current `main`.

- #242 remains the only current owner-review/rebase/retest candidate.
- #238, #231, #228, #213, #187 and #70 are supersession/forward-port candidates and must not be merged directly from their stale branches.
- Preserve evidence before closing or deleting any historical branch.
- Historical green CI on a diverged branch is not current-main release evidence.

## SYSTEM CONTROL

**CURRENT MAIN + CURRENT WORK BOARD + LIVE EXTERNAL EVIDENCE → ONE STATE. MERGED IS NOT DEPLOYED. SENT IS NOT DRAFT. RECEIVED IS NOT WAITING.**

---

# HAWAII SOK ORDER PAYMENT CHECKPOINT — 2026-09-24

Casey confirmed customer payment has been received for the first official Hawaii SOK order.

**State:** **PAYMENT RECEIVED / FULFILLMENT EXECUTION ACTIVE.**

The customer-funds gate is now cleared. Do not collapse the remaining gates.

Current sequence:

**PAYMENT RECEIVED → EXACT SKU + DOCUMENT PACKET → CARRIER/DG READINESS → SOK PO/PAYMENT → SUPPLIER RELEASE → FREIGHT TENDER → TRANSIT → DESTINATION RECEIPT → CUSTOMER CLOSEOUT → ACTUALS**

Immediate next action:
- verify the exact SOK SKU/package against the order record;
- assemble/verify the correct SKU-specific compliance documents;
- confirm carrier/DG readiness and final routing requirements;
- then advance the SOK purchase/release step under the existing fulfillment controls.

Customer identity, payment amount, private carrier rates and other protected commercial/customer information remain outside public Git.

Payment-processing reconciliation:
- the first Hawaii proof order exposed a processor-cost omission in the quoted economics;
- treat the processor deduction as a protected order-cost variance and include it in first-order actuals;
- future controlled quotes/payment links must recover expected processing/channel cost before the customer total is issued;
- exact fee rates and margin calculations remain outside public Git;
- do not retroactively add a processor surcharge to a paid customer order without Casey's explicit approval and channel/legal validation.

---

# APPROVED FORWARDERS STRUCTURED-PRICING OPPORTUNITY — 2026-09-24

Inbound from Approved Forwarders management materially advances the Hawaii logistics lane.

**State:** **STRATEGIC PRICING DISCUSSION OFFERED / OWNER GATE.**

Approved Forwarders reviewed Elevation's repeated Hawaii lithium quote activity and proposed discussing a more permanent, consistent pricing structure rather than continuing only with one-off quotes. A solutions lead was added to the conversation and a Teams call was requested to discuss Elevation's broader Hawaii shipping requirements.

Operational significance:
- this may support a repeatable island / will-call rate architecture instead of quote-by-quote checkout assumptions;
- it directly aligns with Elevation's goal of building dependable Hawaii battery purchasing and terminal pickup options;
- no permanent rates, commercial commitments, exclusivity, booking authority, or public customer pricing are agreed yet;
- existing real-order fulfillment remains active and should not wait on this strategic discussion where current shipment execution is already supported.

Next action:
**CASEY OWNER DECISION → DRAFT RESPONSE / CALL SCOPE → TEAMS DISCUSSION → PROTECTED RATE/TERM RECEIPT → ECONOMICS + ROUTE RECONCILIATION → OWNER APPROVAL BEFORE CUSTOMER-FACING STANDARDIZATION.**

Do not commit private carrier pricing, named customer information, private contacts beyond what is necessary for public-safe project state, or negotiated commercial terms to public Git.

