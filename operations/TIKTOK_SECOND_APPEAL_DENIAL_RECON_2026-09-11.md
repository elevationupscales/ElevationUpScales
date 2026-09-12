# Elevation UpScales — TikTok Second Appeal Denial RECON

**Date:** 2026-09-11  
**Lane:** Company Operations / MASTER RECON support  
**Violation Record:** `7682224328997617933`  
**State:** ACTIVE / SECOND APPEAL NOT SUBMITTED

## Source-controlled denial facts

TikTok Shop's first-appeal rejection email dated 2026-09-06 states:

- shop classification: high-risk shop group requiring additional verification;
- first appeal: unsuccessful;
- denial categories: **EIN / Business Registration / Proof of Address / Warehouse Contract or Storage Proof**;
- reason class: submitted materials did not meet required standards because one or more items may have missing details, mismatched information, poor quality, invalid document type, or edits;
- enforcement remains: daily order creation limited and fund withdrawal suspended;
- second appeal is allowed within 15 days after the first denial.

## Working deadline

Use **2026-09-21** as the conservative internal working cutoff for the second appeal based on the 2026-09-06 rejection date and TikTok's stated 15-day second-appeal window.

The live Seller Center deadline/attempt counter remains authoritative. If Seller Center displays an earlier cutoff, the portal controls.

## Corrected evidence logic

The first appeal package over-grouped different proof categories. The second appeal must not reuse that loose mapping.

| Denial / Required Area | Current Source State | Second-Appeal Rule |
|---|---|---|
| EIN | IRS CP575A recovered privately | Use once, only where EIN/tax identity is actually requested. Do not upload the EIN notice into a business-license, address or warehouse field. |
| Business registration / license | Colorado Articles, sales-tax registration and current wholesale sales-tax license recovered privately | Prefer the exact state-issued business/license document requested by the live field. Use the Colorado wholesale sales-tax license for the business-license slot when that is the requested evidence. Do not duplicate the EIN as business-registration proof. |
| Proof of address | Original business-mail/address evidence plus state records recovered privately | Use only documents that independently support the exact business address shown in Seller Center. Do not treat representative ID as business-address proof unless the live field expressly accepts it and the address matches. |
| Warehouse contract / storage proof | No truthful Elevation-owned or Elevation-leased warehouse ownership/lease/utility record exists in current RECON | Do not represent Doba, SOK, VEVOR, Kingboss or another supplier warehouse as Elevation-owned. Current third-party-warehouse evidence request is open with TikTok Support and Doba. If Seller Center requires owned/leased warehouse proof with no acceptable third-party option, classify `SUPPORT REQUIRED` rather than fabricate evidence. |
| Representative identity | Government ID front/back recovered privately | Use only in representative identity field(s). |
| Representative video | Owner-local recording reported; no recoverable Gmail/Project copy | Video must be uploaded into the dedicated video field. Verify that it meets the current field instructions; otherwise record a fresh compliant video before submission. |
| Product photos | Prior upload map says physical-product photos were separately required | Use only current truthful photos of qualifying physical products if the live appeal still requests this field. Paperwork is not a substitute. |
| Purchase / fulfillment evidence | Doba order history, TikTok-order export and tracking evidence recovered | Supplemental operational proof only. It does not replace business-license, address or warehouse-contract/storage evidence. |

## Original upload-map defect

The prior `UPLOAD_MAP.txt` grouped the IRS CP575A and Colorado sales-tax registration together under **PROOF OF ADDRESS / PROOF OF BUSINESS**. That grouping is too broad for the second appeal because TikTok's rejection now separates EIN, business registration, address and warehouse/storage into distinct deficiency categories.

The prior map correctly stated that the physical-product-photo field and representative-video field cannot be replaced by paperwork. Preserve that control.

## Current policy cross-check

Current TikTok Shop US appeal guidance states that a rejected first appeal may receive a second appeal within 15 calendar days of the first appeal decision and that supporting documents/images/videos should be complete and relevant.

Current TikTok violation guidance also states that strong high-risk verification appeals may require:

- clear business-license evidence;
- government-issued ID;
- warehouse ownership evidence such as property documents, lease agreement or utility bills;
- purchase contract/invoices;
- representative video showing the representative with required identity/business documents.

This creates a real evidence-fit issue for Elevation's third-party/dropship fulfillment model. Do not cure that mismatch through false ownership claims.

## Current open dependencies

1. Live Seller Center field map, attempt number and exact deadline from the owner's authenticated browser.
2. TikTok Support response on acceptable third-party warehouse/storage evidence for this exact verification repair.
3. Doba or other current fulfillment provider formal relationship/storage letter, if acceptable to TikTok.
4. Owner-local representative video verification or fresh compliant re-recording.

## Submission rule

Do not submit the second appeal until:

**LIVE FIELD MAP → EXACT DOCUMENT PER FIELD → WAREHOUSE/STORAGE DISPOSITION → VIDEO VERIFIED → NO DUPLICATES → RECON PASS → SUBMIT ONCE → SAVE RECEIPT.**

No second appeal is claimed submitted in this record.