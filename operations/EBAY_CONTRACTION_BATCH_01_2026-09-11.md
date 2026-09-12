# Elevation UpScales — eBay Contraction Batch 01

**Status:** READY FOR AUTHENTICATED SELLER HUB EXECUTION  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Execution Owner:** eBay Store Operations Worker  
**Manager:** Peter Torres — Ecommerce & Vendor Operations Manager  
**Parent Directive:** `EBAY_STORE_CONTRACTION_AND_DIRECT_SOURCE_REBUILD_2026-09-11.md`

## Purpose

Translate the current source/economics RECON into the first executable store-reduction batch.

This batch does **not** claim that live eBay listings were already ended. Consequential listing actions require authenticated Seller Hub and open-order verification immediately before execution.

## Batch rule

**OPEN ORDER FIRST → PROTECT CUSTOMER → THEN END/REBUILD LISTING.**

Do not end or materially alter a listing in a way that interferes with an unresolved paid order.

---

## A. End / drop after current order state is closed

### 1. Weed Wacker — item `168634712408`

**Known:** sold at $49.98; known Doba source candidate cost $62.59 before eBay fees; customer cancellation/recovery failure.

**Classification:** `END / DROP`

**Execution:**
- first verify order `10-15134-90489` is canceled/refunded or otherwise fully resolved;
- then end the listing;
- do not relist unless a separately authorized source supports materially profitable economics.

### 2. VEVOR rechargeable spotlight / flashlight — order `20-15123-05140`

**Known:** sold at $34.98; Sep. 7 MAP evidence $35.90; known Doba source paths were negative or approximately 4% pre-fee before eBay costs.

**Classification:** `END / HOLD FOR REBUILD`

**Execution:**
- resolve the current order first;
- end the current commercial configuration;
- only rebuild after eBay marketplace authorization, exact direct/approved source, MAP-compliant price and positive contribution are verified.

### 3. RV Screen Door Protector — item `168633285491`

**Known:** current/historical price around $37.66; known Doba dropship path negative and pickup path only about 14% pre-fee.

**Classification:** `END / REBUILD AFTER SOURCE APPROVAL`

**Execution:**
- verify no unresolved paid order depends on the listing;
- end unless a current authorized source and profitable corrected price are already established;
- do not keep it live solely because Doba inventory is available.

### 4. Ordinary-parcel lithium battery listings

**Known:** historical battery listings created unsupported Hawaii obligations and showed thin/negative economics under the known Doba source. Lithium also adds dangerous-goods and destination-routing complexity.

**Classification:** `END / HOLD` for ordinary parcel flow unless exact SKU + eBay permission + route + profitable economics are all verified.

**Execution:**
- identify every current active lithium/battery listing in Seller Hub;
- protect any unresolved paid order first;
- end ordinary parcel offers lacking verified lower-48/route controls and profitable source economics;
- Hawaii lithium remains in the controlled freight program, not generic eBay parcel fulfillment.

---

## B. Preserve only if direct/approved-source economics pass

### 5. Folding Bed / Camping Cot — item `168634722813`

**Known:** repeated real demand. Current Doba economics are weak: one actual shipped order produced about 20.1% pre-fee margin; another known sale/source combination was negative or only ~9.6% pre-fee depending source path.

**Classification:** `KEEP HISTORY / SOURCE REBUILD`

**Execution:**
- resolve all current cot orders first;
- preserve one useful listing/history record only if current views/watchers/sales justify it;
- require a new authorized source or materially better economics before leaving it active;
- if no profitable authorized source is ready, end and preserve the history in Git for later rebuild.

### 6. VEVOR Boot/Shoe Dryer — item `168633017846`

**Known:** repeat sales + watcher signal; historical fulfillment at $14 against $10.89 sales was negative; ~$17.89 pricing still fails the 30% screen against that historical cost.

**Classification:** `KEEP HISTORY / REPRICE OR END`

**Execution:**
- preserve only if live Seller Hub metrics show continuing value **and** a verified authorized source supports profitable price;
- otherwise end during Batch 01/02.

### 7. VEVOR 21-Inch Lawn Sweeper — item `168637439895`

**Known:** sold at $69.99; historical landed cost $63.36; ~9.5% pre-fee margin. Historical cost would require roughly $90.51 sale price for the 30% screen before eBay fees.

**Classification:** `KEEP HISTORY / REPRICE OR END`

**Execution:**
- verify live traffic/watchers;
- if the market cannot support the required profitable price and no better authorized direct source exists, end.

### 8. Camping Fan — item `168647434992`

**Known:** current listing around $46.85; exact source identity/cost not proven.

**Classification:** `HOLD / VERIFY EXACT SOURCE + COST`

**Execution:**
- verify exact item/source;
- current sale price requires landed source cost at or below approximately $32.80 for the 30% pre-fee screen;
- if source/cost cannot be proven or profit fails, end.

### 9. Back-Seat Organizer — item `168634275726`, order `02-15170-43443`

**Known:** current paid order at $24.33; exact Doba public source found but account cost not recovered. Current price requires landed source cost at or below $17.03 for the 30% pre-fee screen.

**Classification:** `TEMP ORDER-PROTECTION HOLD / THEN REBUILD OR END`

**Execution:**
- current customer obligation comes first;
- determine executable profitable source before Sep. 16 ship-by;
- after the order is resolved, do not leave the listing active unless the source/price/contribution pass.

---

## C. Seller Hub zero-demand purge

After the named known-economics items above, inspect every remaining active listing.

End in the same contraction cycle when all are true:

- zero or near-zero meaningful views;
- zero watchers;
- zero sales or no useful conversion history;
- no strategic direct-source advantage;
- weak/unknown economics or source reliability;
- no current paid order dependency.

Do not spend management time rebuilding a listing that has neither demand nor source advantage.

## D. Phase 1 core candidate rule

After Batch 01, select only the strongest candidates toward the temporary **~12 active listing maximum**.

Prefer:

- proven demand;
- simple domestic fulfillment;
- direct/approved source;
- explicit eBay marketplace permission;
- stable availability;
- positive actual/expected contribution;
- low support/return complexity.

The initial core may be **smaller than 12**. Twelve is a cap, not a quota.

## E. Doba removal standard

Do not migrate all Doba listings one-for-one to a direct vendor.

For each current Doba-derived item:

1. ask whether the product deserves to stay on eBay at all;
2. if yes, verify direct/alternate source marketplace authorization;
3. compare landed cost and fulfillment reliability;
4. rebuild only when the new path is materially better and profitable;
5. otherwise end.

**Removing a middleman is useful only if the replacement source is authorized, cheaper/better, and operationally reliable.**

## Close condition

Batch 01 closes when:

- every named item has a live Seller Hub disposition;
- every active paid order tied to those items is protected/resolved;
- zero-demand purge has been run on the remaining active inventory;
- active listing count is materially reduced toward the Phase 1 cap;
- no active listing remains merely because Doba carries it;
- the retained core has source + permission + profit + fulfillment truth recorded.
