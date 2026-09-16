# ELEVATION UPSCALES — CURRENT WORK BOARD

**Status:** ACTIVE / CANONICAL GLOBAL WORK STATE  
**Effective:** 2026-09-16  
**Owner:** Casey Young  
**State Owner:** **Operating System Project Manager — Company Oversight ROLE**  
**Release Control:** `OWNER_DIRECTIVE_WEB_V2_DIRECT_RELEASE_CONTROL_2026-09-16.md`  
**Web V2 Worktree:** `WEB_V2_CURRENT_WORKTREE.md`

---

# CONTROL RULE

**ONE CURRENT STATE PER WORK ITEM. ONE EXECUTION OWNER. NO DUPLICATE RECON. NO DUPLICATE DEV ROUTING.**

Numbered MPM chat instances are continuity/session labels only. They do not become independent authority layers.

Casey's newest explicit direction controls. Git current `main` is technical state truth.

A new MPM instance must adopt this board; it must not create a competing global worktree merely because the chat changed.

---

# ANTI-STALE RULE

Before routing technical work, resolve current `main` once.

Any dated instruction that names an older SHA as the current deployment source becomes **STALE / REFERENCE ONLY** after `main` advances, unless it defines a permanent invariant.

Do not launch recon just to rediscover that a dated deployment file is stale.

For Web V2 release conflicts:

**CURRENT MAIN + `OWNER_DIRECTIVE_WEB_V2_DIRECT_RELEASE_CONTROL_2026-09-16.md` WINS.**

---

# CURRENT COMPANY POSTURE

**Aggregate:** OPERATIONAL / REVENUE LAUNCH FOCUS.

Current priority:

**P0 WEB V2 DIRECT RELEASE → P1 SOK EBAY CATALOG ACTIVATION → P1 CATALOG / PRICING NORMALIZATION → P1 SHOPIFY + VENDOR REVENUE WORK → P1 CUSTOMER/COMMUNICATION VERIFICATION → P2 OPTIONAL CLEANUP.**

One non-release-critical lane does not block another clean revenue lane.

---

# P0 — WEB V2 DIRECT RELEASE

**State:** ACTIVE / SHORTEST SAFE PATH REQUIRED.

Historical mandatory Phase A → Phase B recovery is closed as the default deployment route.

Current release loop:

**CURRENT MAIN → RELEASE-CRITICAL QA → FIX ONLY PROVEN BLOCKER → ONE IMMUTABLE CLOUDFLARE CANDIDATE → VERIFY SHA/VERSION → SMOKE HOME/STORE/PRODUCT/CART/CHECKOUT/PAYPAL → PROMOTE SAME VERSION → LIVE VERIFY → RECORD BASELINE → DONE.**

Do not add:

- historical branch replay;
- recovery reconstruction;
- duplicate screenshot approval;
- broad catalog/media cleanup;
- new architecture;
- another manager gate;
- unrelated vendor work.

A fresh Casey gate is required only for a new material decision, not for normal release execution of already-approved work.

---

# CURRENT PRIORITIES

| Priority | Work Item | Execution Owner | State | Next Action |
|---|---|---|---|---|
| **P0** | Web V2 production release | Web V2 Development / Release Engineer | **ACTIVE — DIRECT RELEASE PATH** | Resolve current `main`, run bounded release QA, fix only proven blocker, create/test/promote same immutable version, live verify. |
| **P1** | SOK eBay full catalog | eBay Store Operations under Peter | **AUTHORIZED / MAP CONTROLLED / 9-SKU BASE READY** | Build and publish exact-SKU listings under verified SOK eBay authorization; respect MAP and full eBay fee economics; hold only SKU-specific blockers. |
| **P1** | Master vendor inventory / pricing truth | Company Operations + Vendor Projects | **ACTIVE** | Build one Elevation inventory master source with vendor SKU, Elevation SKU, cost, MAP/floor, stock, shipping, channel authorization, warranty/returns, alternate source and verification state. |
| **P1** | SunGoldPower catalog | Vendor/Commerce Operations | **READY FOR NEXT MAJOR BATCH** | Normalize approved price/catalog data and feed verified SKUs into commerce surfaces. |
| **P1** | Renogy economics | Renogy Project + Commerce | **PRICING DATA GAP** | Complete dealer-cost/pricing truth before broad catalog scaling; preserve verified live products. |
| **P1** | VEVOR source optimization | VEVOR Project + Commerce | **ACTIVE / SOURCE-COST REVIEW** | Continue exact-SKU Doba-vs-VEVOR source comparison; cheapest verified in-stock authorized source wins internally. |
| **P1** | Kingboss | Kingboss Project | **HOLD KINGBOSS ONLY** | Do not let Kingboss uncertainty block store or other vendors. |
| **P1** | Shopify revenue path | Shopify Store Operations under Peter | **PAYMENT GREEN / OPERATIONS ACTIVE** | Continue product trust, exact shipping truth, profitability and purchaseability verification without reopening payment setup absent a fresh defect. |
| **P1** | External communications control | Company Operations | **CONTAINED / MONITORED** | No unapproved external vendor send; inbound does not create outbound authority; report suspected rogue sends to Casey. |
| **P1** | Owner direct phone/SMS verification | Communications Recovery | **OPEN VERIFICATION** | Verify direct inbound call, SMS and voicemail; does not block Web V2 release. |
| **P2** | Optional visual/media polish | Web V2 specialist lane | **POST-RELEASE ONLY** | One proven section/media group at a time after production baseline is live. |

---

# WEB V2 RELEASE INVARIANTS

Permanent safeguards retained:

- one approved Git SHA maps to one immutable Cloudflare version;
- smoke the exact version intended for production;
- promote that same tested version;
- `/__version` or equivalent version proof must match;
- do not rebuild between acceptance and promotion;
- do not promote a historically rejected candidate;
- do not expose unverified price/orderability/supplier truth;
- payment/customer data protections remain intact.

These safeguards do **not** require historical recovery replay.

---

# RELEASE FAILURE BEHAVIOR

If current-main release QA fails:

**IDENTIFY EXACT FAILURE → FIX SMALLEST SAFE DELTA → RETEST → CONTINUE.**

Do not restart the whole site project.

Do not make one broken SKU, image, vendor, optional feature, admin surface, or unrelated integration block the entire store unless it actually breaks the release-critical customer path.

---

# MANAGEMENT DISCIPLINE

Managers manage state; workers execute work.

A manager may:

- resolve current state once;
- choose the highest-priority unblocked lane;
- route one owner;
- verify the result;
- escalate a proven blocker.

A manager may not:

- create a second workboard;
- duplicate another worker's recon;
- require Casey to re-approve an already-approved state without a new decision;
- reopen closed recovery history as normal workflow;
- create documentation work that delays a clean release;
- hold unrelated revenue work because another lane is waiting on an outside party.

When Casey says **RUN**: execute the highest-priority unblocked action and continue until a real gate is reached.

When Casey says **NEXT**: move to the next unblocked priority without restarting recon.

---

# HISTORICAL REFERENCES

Prior recovery artifacts, MPM takeover prompts, dated workboards, historical SHAs, and old release candidates remain evidence only.

They are not live authority when they conflict with this board or newer owner direction.

---

# CONTROL PHRASE

**GET CURRENT MAIN LIVE SAFELY. VERIFY THE REVENUE PATH. FIX ONLY REAL BLOCKERS. DO NOT TURN MANAGEMENT OR RELEASE CONTROL INTO ANOTHER PROJECT.**
