# OS1 Work Order Recovery Audit — 2026-10-18

**Status:** EVIDENCE-BASED TRIAGE / PUBLIC-SAFE REFERENCE; not a new SOP.  
**Authority:** Casey's direct work-order numbering and SOP-first direction; [MASTER-SOP.md](../MASTER-SOP.md); [canonical Current Work Board](CURRENT_WORK_BOARD.md).  
**Repositories:** [OS1 management](https://github.com/elevationupscales/ElevationUpScales), [OS3 private engineering](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager).  
**Snapshot scope:** GitHub REST open issues and open pull requests in the two controlling repos, the current board, Peter's current worktree and targeted current/historical company email threads. Cross-repo status and email were reconciled where evidenced. Not an exhaustive audit of closed Git items, every branch, every mailbox folder or live marketplace state.

## Summary

| Inventory / action | Count |
| --- | ---: |
| Preexisting numbered company work orders, preserved | 11 |
| Newly recovered numbered company work orders | 20 |
| Current numbered company work orders | 31 |
| OS1 open issues (excluding PRs) | 19 |
| OS3 open issues (excluding PRs) | 13 |
| OS1 open PRs | 9 |
| OS3 open PRs | 13 |

**Important:** A GitHub open-state is not an execution failure. Older issues can contain fully accepted checks, and a draft PR may be intentionally unmerged or superseded. The 32 open issues and 22 open PRs map to the company orders, and **do not create 54 additional projects**.

## Standard references

The canonical company order is `NNNNP#`: four-digit stable sequence, then mutable current priority. Supported owner shorthand: `WO-0001`, `WO#0001`, `P0#0001`, `0001P0`; always reconcile the current suffix against accepted Git. `P0` by itself means only the urgency class, **not an individual work order**.

Always disambiguate Git artifact references with the repository: `OS1 PR#297`, `OS3 PR#92`, `OS1 Issue#292`, `OS3 Issue#90`. Each company work order can link multiple source issues, PRs, emails and actual receipts. A PR number is never reused as the company order number.

- `P0` = urgent customer/order/shipment, active verified incident.
- `P1` = near-term commercial or customer-facing risk.
- `P2` = active planning, approved projects or external waiting.
- `P3` = deferred/paused/housekeeping, not deleted.

**Statuses are separate from priority:** ACTIVE, WAITING EXTERNAL, OWNER DECISION, BLOCKED EXACT LANE, DEFERRED, COMPLETED, SUPERSEDED / REVIEW CLOSE. Owner authority and the applicable existing project SOP control actual writes, emails, supplier orders and publication. Recover once, verify precise current state, and execute when already authorized. Protected supplier pricing, buyer PII and private freight remain outside this public report.

## Source-to-work-order mapping — 22 open PRs

The following are open at the Oct 18 snapshot. **No automatic merge, close, rebase or branch deletion is authorized by this audit.** A work-order link does not itself authorize PR execution.

| Repo | Open pull request | Company order | Precise disposition task |
| --- | --- | --- | --- |
| OS1 | [PR #297](https://github.com/elevationupscales/ElevationUpScales/pull/297) | 0001P0 | Oct 17 eBay readback proposal now overtaken by accepted owner cash-hold board changes; check diff before closing |
| OS1 | [PR #290](https://github.com/elevationupscales/ElevationUpScales/pull/290) | 0014P1 | SK48V100N handoff snapshot; compare current three live items and newer owner-approved media work |
| OS1 | [PR #288](https://github.com/elevationupscales/ElevationUpScales/pull/288) | 0016P1 | Earlier seller credential incident; preserve only unsuperseded remedial evidence, do not execute resets |
| OS1 | [PR #286](https://github.com/elevationupscales/ElevationUpScales/pull/286) | 0011P3 | Olight Black Friday proposal predates owner pause; do not merge or reactivate |
| OS1 | [PR #273](https://github.com/elevationupscales/ElevationUpScales/pull/273) | 0031P3 | Oct 4 operations recap/history; review as superseded by newer board |
| OS1 | [PR #270](https://github.com/elevationupscales/ElevationUpScales/pull/270) | 0031P3 | Oct 1 canonical board snapshot; do not overwrite latest board |
| OS1 | [PR #268](https://github.com/elevationupscales/ElevationUpScales/pull/268) | 0011P3 | Older Olight collaboration note; paused lane |
| OS1 | [PR #267](https://github.com/elevationupscales/ElevationUpScales/pull/267) | 0005P2 | Peter Oct 1 continuity rebuild; review versus October 18 SOP-first controls |
| OS1 | [PR #266](https://github.com/elevationupscales/ElevationUpScales/pull/266) | 0011P3 | Olight historical interrupted-run receipt; do not restart |
| OS3 | [PR #92](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/92) | 0010P3 | One-command CJ Mexico scan proposed; compare against accepted runtime and prior exact variant receipts before merge |
| OS3 | [PR #81](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/81) | 0019P2 | Draft new Hawaii six-pack; missing qualified DG freight and policy executor, no seller write |
| OS3 | [PR #72](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/72) | 0014P1 | Commercial eBay write versus software deploy classifier; exact regression/accepted-main comparison |
| OS3 | [PR #67](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/67) | 0018P2 | Oct 9 Opera SOK pack reconnaissance; historical evidence, not new live-seller truth |
| OS3 | [PR #59](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/59) | 0020P2 | Selective HTTP 400 error classifier draft; compare current error diagnostics |
| OS3 | [PR #48](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/48) | 0020P2 | SOK legacy revision design identified as superseded by accepted existing-item executor PR #49 |
| OS3 | [PR #45](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/45) | 0020P2 | Local SOK video archive inventory; stacked on open PR #43; local inventory receipt separately accepted |
| OS3 | [PR #43](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/43) | 0018P2 | Private Hawaii freight master read-only import branch; local read receipt does not mean merged code |
| OS3 | [PR #42](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/42) | 0008P2 | Nine-core derived-offer registry draft; reconcile with accepted source before any rebase |
| OS3 | [PR #15](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/15) | 0012P1 | Read-only Shopify delivery profile audit; compare with current accepted capabilities |
| OS3 | [PR #9](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/9) | 0029P2 | Commerce Operations Check utility; engineering backlog only if not already covered |
| OS3 | [PR #8](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/8) | 0029P2 | Read-only GitHub worker; optional internal tool, not an owner blocker |
| OS3 | [PR #7](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/pull/7) | 0016P1 | eBay account read diagnostics; confirm whether accepted main already provides it |

## Source-to-work-order mapping — 32 open GitHub issues

| Repo | Open issue | Company work order(s) / historical disposition |
| --- | --- | --- |
| OS1 | [Issue #293](https://github.com/elevationupscales/ElevationUpScales/issues/293) | 0015P1 |
| OS1 | [Issue #292](https://github.com/elevationupscales/ElevationUpScales/issues/292) | 0015P1 |
| OS1 | [Issue #291](https://github.com/elevationupscales/ElevationUpScales/issues/291) | 0022P2; 0011P3 paused |
| OS1 | [Issue #289](https://github.com/elevationupscales/ElevationUpScales/issues/289) | 0009P3 |
| OS1 | [Issue #67](https://github.com/elevationupscales/ElevationUpScales/issues/67) | 0008P2 / 0031P3 historical-recovery review |
| OS1 | [Issue #230](https://github.com/elevationupscales/ElevationUpScales/issues/230) | 0012P1 |
| OS1 | [Issue #232](https://github.com/elevationupscales/ElevationUpScales/issues/232) | 0005P2 / 0031P3 incident history |
| OS1 | [Issue #235](https://github.com/elevationupscales/ElevationUpScales/issues/235) | 0028P2 |
| OS1 | [Issue #234](https://github.com/elevationupscales/ElevationUpScales/issues/234) | 0028P2 |
| OS1 | [Issue #233](https://github.com/elevationupscales/ElevationUpScales/issues/233) | 0028P2 |
| OS1 | [Issue #229](https://github.com/elevationupscales/ElevationUpScales/issues/229) | 0012P1 / 0008P2 |
| OS1 | [Issue #190](https://github.com/elevationupscales/ElevationUpScales/issues/190) | 0012P1 / 0031P3 historical |
| OS1 | [Issue #192](https://github.com/elevationupscales/ElevationUpScales/issues/192) | 0027P2 |
| OS1 | [Issue #185](https://github.com/elevationupscales/ElevationUpScales/issues/185) | 0027P2 |
| OS1 | [Issue #150](https://github.com/elevationupscales/ElevationUpScales/issues/150) | 0017P1 |
| OS1 | [Issue #147](https://github.com/elevationupscales/ElevationUpScales/issues/147) | 0027P2 |
| OS1 | [Issue #145](https://github.com/elevationupscales/ElevationUpScales/issues/145) | 0012P1 |
| OS1 | [Issue #141](https://github.com/elevationupscales/ElevationUpScales/issues/141) | 0027P2 |
| OS1 | [Issue #24](https://github.com/elevationupscales/ElevationUpScales/issues/24) | 0025P2 / 0031P3 obsolete Doba launch |
| OS3 | [Issue #93](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/93) | 0021P2 |
| OS3 | [Issue #91](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/91) | 0010P3 |
| OS3 | [Issue #90](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/90) | 0012P1 |
| OS3 | [Issue #82](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/82) | 0012P1 |
| OS3 | [Issue #89](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/89) | 0008P2 |
| OS3 | [Issue #87](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/87) | 0029P2 |
| OS3 | [Issue #80](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/80) | 0019P2 |
| OS3 | [Issue #46](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/46) | 0018P2 |
| OS3 | [Issue #74](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/74) | 0014P1 |
| OS3 | [Issue #68](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/68) | 0014P1 |
| OS3 | [Issue #56](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/56) | 0016P1 |
| OS3 | [Issue #44](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/44) | 0020P2 |
| OS3 | [Issue #51](https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/51) | 0029P2 |

## Email-only or corroborated recovered items

- **Google Merchant Center:** Sept 29 restriction/misrepresentation and item-count notices; no sampled later authorization/clearance. **0013P1** verifies actual current status before corrections or reconsideration.
- **Winegard:** existing reseller approval, but Oct 6 correspondence still requested dealer catalog/portal/supplier terms. **0023P2** awaits exact vendor evidence.
- **Phocos:** owner forwarded older partner messages on Oct 15; Peter later acknowledged a mail connection failure. **0024P2** must reuse received records and not repeatedly ask the owner to resend.
- **Doba/TikTok:** supplier program cancelled; Oct 8–13 customer-linked risk/appeal/refund correspondence remained disputed. **0025P2** captures external settlement rather than reactivating the old Doba launch issue.
- **PayPal:** Oct 13 Colorado banking-complaint response and Oct 12 Message Center notice. **0026P2** tracks substantive outcome once, not repeated OAuth/payment remediation.
- **Epoch:** October 16 dealer/logistics replies for Hawaii and Puerto Rico with Peter involved; separate from already-active Lower-48 1250A-ES listing. **0022P2** preserves the existing pilot and quotes.
- **Business financing:** owner describes an intended credit-union line-of-credit application and a roughly six-month horizon before meaningful Hawaii warehouse stock. **0030P2** is planning only; no private finance records or assumed approval.
- **Older eBay inverter charger:** the Oct 11 missed-delivery customer complaint was followed by an Oct 12 refund notification for that order. **Do not create another open fulfillment work order** from the stale complaint; separately reconcile only if later credible evidence shows a surviving customer obligation.

## No-duplicate / owner safeguards

1. Keep **0001P0** eBay paid order owner-approved but cash-blocked until funds become usable; keep its ship-by risk visible. Do not treat approval as a shipment.
2. Keep **0002P0** first SOK Hawaii customer freight paid and waiting on Pablo's actual Oct 17 sail/loading confirmation; no duplicate carrier email.
3. Keep **0003P1** Cara/Logistics Plus in Peter-review state; draft was sent privately to Peter, not externally; larger inventory timeline is around six months, not December.
4. Keep **0004P3** Yelp bank-dispute follow-up deferred. Owner already decided to let the bank handle it.
5. Keep **0008P2** SOK Hawaii Shopify drafts grouped under one commercial catalog lane. Existing Peter draft builds completed; quote/pack qualification remains the only legitimate next step.
6. Keep **0009P3** completed Renogy SKU audits closed for Peter; a separate future exact cleanup request can be scoped under same order.
7. Keep **0010P3** CJ Mexico pilot unlisted and deferred; do not reactivate from the unmerged OS3 scan PR alone.
8. Keep **0011P3** Olight expansion paused, including historic holiday and old Peter PRs. Incoming existing customer/warranty exceptions still get handled.
9. Do not ask Peter to maintain a second workboard or review this full recovered portfolio. Peter's immediate human involvement stays **0003P1** unless owner directs another bounded decision.
10. Never treat historical issue headings labeled P0 as an automatic present-day P0. First check if the issue is live now. In particular, OS1 #150 requires a current communication test, and OS3 #90 says its Oct 16 customer-US publication issue was largely repaired.

## Next review sequence (not blanket execution grants)

**P0 first:** real deadlines and existing owner approvals in 0001 and 0002.  
**P1 next:** current US buyer checkout/catalog market (0012), Google Merchant Center restriction (0013), SK48 gallery/product integrity (0014), HQ residual/multi-vendor bundles (0015), eBay write-read auth recovery (0016), business phone verification (0017).  
**P2 and P3:** pursue exact supplier/commerce stages using current evidence; park genuine external waiting or paused lanes; inspect superseded PRs only when the owning work item is selected.

**Recovery completion rule:** This report documents uncovered and potentially unfinished work, not proof every workstream needs active execution. Use the current Work Board as the sole priority source; revise statuses and priorities there when new evidence arrives, keeping the four-digit identity intact.
