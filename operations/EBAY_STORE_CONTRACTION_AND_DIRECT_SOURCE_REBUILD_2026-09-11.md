# Elevation UpScales — eBay Store Contraction + Direct-Source Rebuild

**Status:** ACTIVE / OWNER-DIRECTED P0 COMMERCIAL RESET  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Primary Lane:** eBay Store Operations  
**Reporting Manager:** Peter Torres — Ecommerce & Vendor Operations Manager  
**Operational Oversight:** Company Operations / Operating System Project Manager  
**Related:** `EBAY_STORE_OPERATIONS_SOP_V1_0.md`, `EBAY_STORE_OPERATIONS_CURRENT_WORKTREE.md`, `EBAY_SOURCE_ECONOMICS_RECON_2026-09-11.md`, `EBAY_PAYOUT_HOLD_RECOVERY_DIRECTIVE_2026-09-11.md`

## Owner decision

Current eBay catalog breadth has cost the company more than it has produced in usable income.

The store is therefore entering a **controlled contraction**.

The goal is not to preserve listing count. The goal is to preserve and rebuild only listings that can generate **profitable, manageable, reliably fulfilled cash**.

**DECLUTTER → REMOVE BAD ECONOMICS → REMOVE SOURCE DEPENDENCY → KEEP PROVEN DEMAND → REBUILD DIRECT WHERE AUTHORIZED → SELL FEWER / BETTER ITEMS.**

## Doba decision

Doba is **retired as the default / blanket eBay catalog source**.

Effective immediately:

- do not create new eBay listings merely because an item exists in Doba;
- do not keep a weak listing alive merely because Doba can technically fulfill it;
- do not use Doba as automatic source authority after a sale;
- do not expand Doba-derived catalog breadth;
- existing Doba fulfillment may still be used to finish a current customer obligation when it is already committed, profitable enough to honor, or otherwise the correct recovery action;
- Doba remains an evidence/source fallback, not the eBay merchandising strategy.

Removing Doba as the middleman does **not** authorize an unapproved direct-vendor marketplace switch.

For each direct vendor, eBay permission remains vendor-specific:

- Renogy direct: current terms are direct-site only; **do not use direct Renogy source on eBay**;
- VEVOR Direct: use on eBay only after explicit current marketplace authorization is verified;
- SOK: verify eBay marketplace authorization before direct eBay use;
- Kingboss: verify eBay marketplace authorization before direct eBay use;
- future suppliers: same rule.

If a Doba-dependent listing has no currently authorized profitable replacement source, the correct action is normally **END / HOLD**, not an unauthorized source substitution.

## Phase 1 active-listing cap

Until eBay fulfillment, holds and payout behavior normalize, use a temporary operating target of:

**NO MORE THAN ~12 ACTIVE REVENUE LISTINGS**

This does not count an item that must remain temporarily visible solely because an unresolved paid customer order is still being closed out.

The cap is a management tool, not a permanent company limit. Expansion resumes only after the retained core demonstrates:

- clean fulfillment;
- tracking discipline;
- payout release;
- positive contribution;
- manageable order volume;
- low cancellation/refund friction.

## Contraction order

### Tier 1 — End / disable first

End or remove from active sale as soon as Seller Hub state permits when the listing is already proven commercially defective and there is no clean current authorized replacement source.

Current evidence places these at the top of the contraction queue:

1. **Cordless Electric Weed Wacker** — known source cost exceeded sale price before eBay fees; customer recovery failure. `END / DROP` unless a new authorized profitable source is independently proven.
2. **VEVOR rechargeable spotlight / flashlight** — historical sale below known MAP and known Doba paths were negative or near-zero before fees. `END / HOLD FOR REBUILD` until direct/source authorization + economics pass.
3. **Ordinary parcel lithium battery listings with unresolved route/source economics** — high fulfillment, Hawaii/AK and dangerous-goods risk; do not leave ordinary parcel listings active merely because inventory exists somewhere. Rebuild only under verified marketplace + shipping controls.
4. **RV screen-door guard at current economics** — known Doba source path negative/thin. End or reprice/rebuild only if a better authorized source is verified.
5. Any listing with **zero/near-zero demand + no direct-source advantage + weak or unknown economics**.

### Tier 2 — Preserve history only if it can be made profitable

These have useful demand signals but should not remain active at losing economics:

- camping cot / folding bed;
- VEVOR boot/shoe dryer;
- VEVOR lawn sweeper;
- camping fan;
- back-seat organizer.

For each one:

**SALES/WATCHERS → DIRECT/APPROVED SOURCE → EBAY AUTHORIZATION → CURRENT LANDED COST → PROFITABLE PRICE → RELIABLE HANDLING → KEEP / REBUILD / END.**

If the direct-source economics or eBay permission cannot be verified quickly, end the listing and preserve the SKU/history in the audit record rather than keeping an uncontrolled liability live.

## Core-store selection standard

The retained ~12 listing set should favor:

1. proven demand;
2. direct or strategically controlled source;
3. explicit eBay channel authorization;
4. easy domestic parcel fulfillment;
5. low dangerous-goods / special-freight complexity;
6. stable availability;
7. at least the working margin target;
8. low return/cancellation risk;
9. simple customer expectations;
10. strong RV / outdoor / off-grid / practical utility fit.

Do **not** choose the core merely by highest views or lowest supplier cost.

## Profit standard

Continue using:

- ~30% pre-fee gross margin as the minimum working screen;
- 35%+ preferred;
- final decision requires positive expected contribution after eBay fees, supplier freight/shipping, promoted listing fees, discounts and other variable costs.

A listing that sells but loses money is not a successful listing.

## Active-listing audit states

Every active listing must end the contraction audit in one of these states:

- `CORE KEEP — DIRECT/APPROVED + PROFITABLE`
- `KEEP HISTORY / REPRICE`
- `END / REBUILD AFTER SOURCE APPROVAL`
- `END / DROP`
- `TEMP ORDER-PROTECTION HOLD`

No listing stays active in an unclassified state.

## Seller Hub execution sequence

Once authenticated Seller Hub is available:

1. export/read complete active listing inventory;
2. capture views, watchers, quantity, sales history and open-order dependency;
3. protect any listing tied to an unresolved paid order until that order is safely resolved;
4. apply the known economics/source map;
5. batch-classify every listing;
6. end `END / DROP` first;
7. end `END / REBUILD` where no open order depends on it;
8. reprice only listings with verified source + channel permission + positive economics;
9. reduce toward the ~12-listing Phase 1 cap;
10. verify remaining listings one by one;
11. record the new active catalog baseline.

Do not mass-delete historical records outside eBay. Preserve the decision ledger in Git.

## New-listing freeze

Until the Phase 1 contraction closes:

**NO NEW EBAY LISTING WITHOUT:**

**DEMAND CASE → EBAY CHANNEL AUTHORIZATION → EXACT SOURCE → CURRENT LANDED COST → PROFIT CHECK → SHIPPING/HANDLING PLAN → MANAGER PASS.**

This freeze is intended to stop catalog creep while the store is being repaired.

## Expansion gate

The eBay catalog may grow beyond the temporary cap only after:

- current $242.79 held-funds incident is substantially resolved or clearly aging toward scheduled release;
- no unmanaged late orders remain;
- tracking is consistently posted;
- retained core listings are profitable at actual order economics;
- source relationships are explicit and stable;
- Company Operations / Ecommerce Manager approves the next batch.

## Control phrase

**FEWER LISTINGS → BETTER SOURCES → HIGHER PROFIT → CLEAN FULFILLMENT → CASH RELEASE → THEN SCALE.**