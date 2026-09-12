# Elevation UpScales — TikTok Seller Verification Repair RECON

**Status:** ACTIVE / P0 ACCOUNT-COMPLIANCE EXCEPTION / PUBLIC-SAFE RECON  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Primary Manager:** Company Operations Manager  
**Ecommerce Oversight:** Peter Torres — Ecommerce & Vendor Operations Manager  
**RECON Support:** MASTER RECON OS / assigned RECON  
**Platform:** TikTok Shop Seller Center  
**Violation / Review Record:** `7682224328997617933`

## Owner-reported live issue

Casey has current authenticated TikTok Seller Hub access and inspected the verification/review submission.

Owner-reported defects:

1. the verification package contains **two IRS EIN-document uploads** where the intended document mapping was not correct;
2. Casey recorded the required representative verification video and included video evidence in the broader process, but the video was **not uploaded correctly into the required Seller Center video submission field**;
3. the correct Colorado wholesale/sales-tax license exists and needs to be mapped into the appropriate business-license evidence slot during repair.

Treat this as a **repair of the existing verification review**, not a fresh seller-account application and not a reason to duplicate previously accepted company records.

## RECON source recovery

The file-recovery workflow was used before asking the owner to upload anything again.

Private company Gmail contains recoverable source evidence including:

- `Colorado_Wholesale_Sales_Tax_License.jpeg` — official Colorado Department of Revenue wholesale sales-tax license image;
- `Colorado_Sales_Tax_Registration.pdf` — Colorado sales-tax registration supporting record;
- `Colorado_Articles_Incorporation.pdf` — Colorado corporation registration record;
- `IRS_CP575A.pdf` — IRS EIN confirmation;
- Colorado government ID front/back images previously assembled for the TikTok appeal;
- prior Doba purchase/order/fulfillment evidence;
- prior address-support evidence;
- the prior TikTok appeal `UPLOAD_MAP.txt`.

**Do not place raw tax, identity, license, address or private company verification documents into public Git.** Gmail remains an authorized original-evidence recovery source under the current Gmail/File Recovery controls.

## Historical intended upload map

The recovered TikTok appeal upload map classified the prior evidence as:

- government ID → Colorado driver-license front/back;
- proof of business/address → IRS EIN + Colorado sales-tax registration;
- purchase evidence → Doba order/export records;
- fulfillment support → Doba membership/order approval;
- optional → order/tracking list.

The same map contained a critical warning that TikTok's video requirement is **not replaceable by paperwork** and called for an original representative video using the same government ID.

Owner's live Seller Hub observation proves the actual review submission no longer matches that intended evidence map and needs repair.

## Current TikTok policy check — 2026-09-11

Current TikTok Shop US guidance was rechecked against the official TikTok Shop Academy before this repair plan was created.

Relevant guidance:

- `Violation & Appeal Guide`, updated 2026-05-29;
- `How to register as a Corporation or Partnership`, updated 2026-05-13;
- `How to appeal a violation` / current Shop Health appeal guidance.

Current guidance emphasizes:

- use Seller Center → Account Health / Shop Health → Violation Records → View Details for the exact available Correction / Appeal action;
- appeal documentation must be complete, original and clearly legible;
- information on uploaded documents must match Seller Center information;
- current strong-appeal examples include business-license evidence, government-issued ID, purchase/operating evidence and a required representative video where requested;
- where the strong-appeal video requirement appears, it calls for the representative's face to be visible while holding the business license and government ID with the ID front/back clearly shown;
- account-specific ticket instructions and fields control the exact final submission.

Do not infer that every general example document is mandatory if the live violation ticket does not request it. The live ticket controls the exact field mapping.

## Repair matrix

| Seller Center evidence type / slot | Correct repair source | Control |
|---|---|---|
| Business license / business-license evidence | `Colorado_Wholesale_Sales_Tax_License.jpeg` | Use the complete clear original image recovered privately from Gmail. Do not substitute a second EIN copy. |
| EIN / federal tax proof, **only if the live field requests it** | `IRS_CP575A.pdf` | One correct copy only. Do not duplicate it into unrelated document slots. |
| Corporation / business-registration support, if requested | `Colorado_Articles_Incorporation.pdf` and/or `Colorado_Sales_Tax_Registration.pdf` | Use only in the matching live Seller Center field/supporting-doc area. |
| Government-issued representative ID | Existing Colorado ID front/back evidence | Must match the representative information in Seller Center. Keep private. |
| Proof of address, if requested | Exact current proof whose name/address matches the Seller Center field being verified | Do not mix business-address evidence with residential-address requirements. The live field controls which address type is required. |
| Purchase / supplier proof, if requested | Existing Doba purchase/order evidence or another exact current authorized source record | Company/entity/product details should be consistent with the operations being represented. |
| Warehouse / fulfillment evidence | Actual supplier/dropship/fulfillment evidence only | Elevation must **not claim ownership of a supplier warehouse**. If the field specifically requires owned/leased warehouse proof and no truthful qualifying document exists, route that exact requirement to Support/management rather than fabricating ownership. |
| Representative verification video | Correctly upload the original qualifying video or record a fresh qualifying video if the existing file cannot be verified against the current ticket requirements | Video belongs in the dedicated video field. Do not treat a video embedded elsewhere or mentioned in an email as satisfying the upload field. |

## Video acceptance checklist

Before upload, RECON/Operations verifies against the current live ticket and current official guidance:

- authorized representative is Casey Young;
- face clearly visible;
- no hat or glasses if the current ticket/guidance applies that requirement;
- business-license document clearly visible;
- same government-issued ID used in the account verification is shown;
- ID front and back are shown clearly where requested;
- documents are legible enough for review;
- video is original/unmodified for the submission purpose;
- upload finishes in the **video** field and the Seller Center UI visibly shows the video as attached/accepted before submission.

If the existing recorded video cannot be verified to meet those requirements, record a new clean video instead of risking another appeal attempt.

## Repair sequence

**GIT FIRST → OPEN EXACT TIKTOK VIOLATION/REVIEW RECORD → VERIFY AVAILABLE ACTION + APPEAL ATTEMPT COUNT + DEADLINE → INVENTORY EVERY CURRENT FIELD/UPLOAD → IDENTIFY DUPLICATE/MISPLACED EIN FILES → REPLACE WRONG SLOT WITH WHOLESALE LICENSE WHERE THAT SLOT REQUESTS BUSINESS-LICENSE EVIDENCE → KEEP EIN ONLY IN ITS CORRECT REQUESTED FIELD → VERIFY ID / ADDRESS / SUPPORTING EVIDENCE MATCHES EACH FIELD → VERIFY/UPLOAD REPRESENTATIVE VIDEO TO VIDEO SLOT → PRE-SUBMISSION CROSS-CHECK → OWNER-DIRECTED FACTUAL RESUBMISSION ONCE → CAPTURE RECEIPT/SCREENSHOT/STATUS → UPDATE WORKTREE.**

## No-duplicate / no-invention controls

- Do not submit a new appeal until the exact current ticket/attempt state is known.
- Do not use two EIN documents merely to fill two fields.
- Do not submit a document into a field whose requirement it does not satisfy.
- Do not alter, crop away material portions of, or recreate official documents when the original full evidence is available.
- Do not falsely state Elevation owns a warehouse/property when its actual model is supplier/dropship/controlled fulfillment.
- Do not resubmit the appeal multiple times because a UI response is slow or uncertain; verify outcome first.
- Do not expose raw verification documents or identifiers in public Git.

## Manager assignment

**Primary execution manager: Company Operations Manager.**

Reason: this is an active platform/account-compliance repair affecting company operating capability, verification evidence, customer-commerce access and cross-lane continuity. It belongs in Company Operations rather than creating a new TikTok manager layer.

Support structure:

- **Company Operations Manager** — owns live repair Worktree, Seller Center field audit, final factual resubmission and receipt;
- **MASTER RECON / assigned RECON** — owns evidence map, source/version integrity, duplicate/misplaced evidence detection and pre-submit QA;
- **Peter Torres — Ecommerce & Vendor Operations Manager** — ecommerce/TikTok operational oversight and downstream store/order readiness after verification;
- **MPM / Operating System Project Manager** — priority/routing and cross-project state only;
- **Casey** — owner/authorized representative; current direction authorizes this factual repair. Any new legal certification, materially different representation, payment commitment, or unverifiable statement remains an owner gate.

## Current execution limitation

The user reports TikTok Seller Hub is open in the user's local browser. Current ChatGPT tools do not yet have a confirmed authenticated connection to that exact local Seller Hub tab.

Therefore:

- the RECON, evidence recovery, upload map, manager assignment and pre-submit controls can be completed now;
- do **not** claim that Seller Hub fields were changed or the appeal was submitted unless a connected authenticated browser surface or a verified owner-execution receipt proves it;
- if Casey performs the final clicks in the already-open Seller Hub, Company Operations reconciles the resulting status/receipt immediately afterward.

## Close condition

This repair work closes only when:

1. exact violation/review attempt state and deadline are verified;
2. every current Seller Center evidence slot has the correct matching document or a truthful documented hold;
3. duplicate/misplaced EIN evidence is removed/replaced where the UI permits;
4. the correct wholesale/business-license evidence is attached to the intended business-license slot;
5. the representative video is visibly attached to the required video field and meets the current requirement;
6. submission occurs once;
7. Seller Center confirms receipt / review state;
8. the receipt is recorded in the TikTok repair Worktree and Master management state.

**Control phrase:**

**EXACT TICKET → EXACT FIELD → EXACT ORIGINAL EVIDENCE → VIDEO IN VIDEO SLOT → VERIFY BEFORE SUBMIT → SUBMIT ONCE → RECEIPT.**