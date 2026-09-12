# Elevation UpScales — TikTok Seller Verification Repair Current Worktree

**Status:** ACTIVE / P0 ACCOUNT-COMPLIANCE EXCEPTION  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Primary Manager:** Company Operations Manager  
**Ecommerce Oversight:** Peter Torres — Ecommerce & Vendor Operations Manager  
**RECON Support:** MASTER RECON OS / assigned RECON  
**Violation / Review Record:** `7682224328997617933`  
**RECON:** `TIKTOK_SELLER_VERIFICATION_REPAIR_RECON_2026-09-11.md`  
**Workflow:** `TIKTOK_SELLER_VERIFICATION_REPAIR_WORKFLOW_2026-09-11.md`

## Objective

Repair the existing TikTok Seller Center verification/review by correcting document-slot mapping and the representative-video upload, submit once after complete pre-submit RECON, and preserve a verified receipt/status.

## Current verified state

- Owner reports TikTok Seller Hub is currently open/authenticated in the owner's local browser.
- Owner observed that two IRS EIN documents were uploaded where the review evidence mapping was incorrect.
- Owner reports the representative verification video was recorded but was not uploaded correctly into the required Seller Center video field.
- RECON recovered the correct Colorado wholesale sales-tax license from the authorized private Gmail evidence archive.
- RECON also recovered the prior TikTok appeal upload map, Colorado sales-tax registration, corporation record, IRS EIN record, ID evidence references, supplier/order evidence and address-support references.
- Raw verification files remain private and are not stored in public Git.
- Current ChatGPT execution surfaces do not have a confirmed authenticated connection to the owner's already-open TikTok Seller Hub tab, so no Seller Center field edit/submission is claimed yet.

## Work queue

| Priority | Task | Owner | State | Next Action | Close Condition |
|---|---|---|---|---|---|
| P0 | Exact live review-state recon | Company Operations + RECON | READY / OWNER BROWSER OPEN | In Seller Hub, open exact record and identify Correction/Appeal status, attempt count, deadline, every current evidence slot and video-upload status before changing anything | Exact current field map + attempt/deadline recorded |
| P0 | Duplicate/misplaced EIN repair | Company Operations | READY AFTER LIVE FIELD MAP | Keep EIN only where the live field requests EIN/tax proof; remove/replace duplicate/misplaced EIN in unrelated slot(s) | No unrelated slot contains duplicate EIN |
| P0 | Correct business-license evidence | Company Operations + RECON | PRIVATE SOURCE RECOVERED | Use recovered `Colorado_Wholesale_Sales_Tax_License.jpeg` in the exact business-license field if that is what the live ticket requests | Correct license visibly attached to intended field |
| P0 | Representative video repair | Casey + Company Operations / RECON QA | VIDEO REPORTED RECORDED / UPLOAD NOT VERIFIED | Verify existing recording meets live requirements; upload to dedicated video field, or record fresh compliant video if existing recording cannot be verified | Video visibly attached in Seller Center video field and meets requirement |
| P0 | Full pre-submit evidence cross-check | RECON + Company Operations | QUEUED | Check exact field → exact document, identity/address match, no false warehouse ownership, no duplicate/missing evidence, valid appeal/correction window | RECON PASS / no unresolved material mapping defect |
| P0 | Factual correction/resubmission | Company Operations Manager | OWNER-DIRECTED / QUEUED | Submit exactly once after RECON PASS | Seller Center displays submission receipt/review state |
| P0 | Receipt + management state | Company Operations / MPM | QUEUED | Record public-safe receipt/status and next trigger | Git Worktree + Master state updated |

## Private evidence map

Available through authorized Gmail recovery:

- `Colorado_Wholesale_Sales_Tax_License.jpeg`
- `Colorado_Sales_Tax_Registration.pdf`
- `Colorado_Articles_Incorporation.pdf`
- `IRS_CP575A.pdf`
- prior TikTok government-ID front/back evidence
- prior Doba purchase/order/fulfillment evidence
- prior address-support evidence
- prior TikTok `UPLOAD_MAP.txt`

Never commit these private originals to public Git.

## Current manager routing

**Company Operations Manager = primary active manager for the repair.**

Peter supports ecommerce continuity but does not replace Company Operations for the compliance-repair Worktree.

MASTER RECON supports evidence mapping and pre-submit QA but does not become the manager.

MPM retains priority/cross-project coordination only.

## Next action

**OPEN EXACT SELLER CENTER REVIEW → CAPTURE FIELD MAP + ATTEMPT/DEADLINE → CORRECT DUPLICATE EIN / LICENSE SLOT → VERIFY VIDEO CONTENT → UPLOAD VIDEO INTO VIDEO FIELD → RECON PASS → SUBMIT ONCE → RECEIPT.**