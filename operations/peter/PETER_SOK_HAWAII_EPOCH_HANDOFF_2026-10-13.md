# Peter SOK Hawaii + Epoch Progress Handoff — 2026-10-13

**State:** LOCAL COMPLETE / OS3 FREIGHT EXECUTION NEXT  
**Owner direction:** Casey Young, 2026-10-13  
**Peter lane:** Director of Operations & Commerce

## FINISHED

- Reconciled the live Shopify SOK Hawaii catalog before creating anything, preserving existing active Hawaii offers and the existing `SK24V150PH` 1/3/6 DRAFT product IDs.
- Created **13 new Hawaii Shopify DRAFTS** across Casey's P1-P3 queue, each from the exact verified Lower-48 source model with genuine existing SOK media, supplier inventory tracking disabled and no invented shipping or delivery promises.
- P1 `SK48V100N`: created 1-, 2-, and 3-pack drafts representing 5.12 / 10.24 / 15.36kWh nominal package energy.
- P2 `SK12V100PC`: created only the missing 2- and 4-pack drafts; existing active 1/3/6/9/12 packs were not recreated.
- P2 `SK24V100`: created only the missing 2- and 4-pack drafts; existing active 1/3/6/9/12 packs were not recreated. Both new drafts explicitly carry supplier-availability follow-up.
- P3 heated/marine: created `SK12V100H` single/3-pack, `SK12V206H` single/2-pack and `SK12V206PH` single/2-pack drafts from verified source products and genuine media.
- Finished the existing `SK24V150PH` Hawaii 3- and 6-pack media galleries in place with six exact-source images each; the existing 1-pack already had six exact images.
- Created one consolidated SKU/status/freight control file: `operations/SOK_HAWAII_SHOPIFY_BUILD_STATUS_2026-10-13.md`.
- Reconciled the Epoch `1250A-ES` record to its new active Lower-48 state. The product remains ACTIVE at `$299`, has three exact supplier photos, and the old blocking tag `HOLD-FULFILLMENT-VERIFICATION` was removed and replaced with `FOLLOWUP-FULFILLMENT-VERIFICATION` so open fulfillment checks are tracked accurately without misrepresenting the live listing.
- Updated the Peter worktree, Epoch project source and Epoch Hawaii/PR pilot worktree to Casey's newest priority sequence: **SOK Hawaii P1-P3 first → Epoch next → Olight expansion paused**.

## CURRENT SHOPIFY CONTROL STATE

All 13 newly created SOK Hawaii configurations and all existing `SK24V150PH` 1/3/6 products remain **DRAFT**. No unqualified configuration was published.

The new drafts use merchandise subtotals based on the current exact source-product retail unit price multiplied by pack quantity. These are not landed Hawaii prices and do not include unverified freight.

No Shopify inventory number is being treated as supplier physical stock.

## SUPPLIER / CARRIER EVIDENCE STILL REQUIRED

Before any new SOK Hawaii configuration advances to publication, resolve the exact model/package and destination evidence:

- freight quote by exact quantity and destination island;
- packed/carton/pallet dimensions and gross weights where required;
- DG / lithium acceptance and required documentation;
- palletization, securement and handling requirements;
- exact service level such as terminal/will-call, curbside or other defined delivery path;
- quote validity and exclusions;
- approved landed customer-facing shipping amount and final Shopify shipping-profile mapping;
- current supplier orderability at publication / order acceptance;
- `SK24V100` specifically: current supplier availability and lead time.

Do **not** reuse the historical `$280` Hawaii rate generically across quantities or islands.

## OS3 NEXT EXECUTION

Use `operations/SOK_HAWAII_SHOPIFY_BUILD_STATUS_2026-10-13.md` as the catalog-side SKU/status matrix.

1. Bind each exact configuration to current freight evidence by quantity + island.
2. Return quote-supported configurations first so Peter can finish the exact Shopify shipping/profile setup while unsupported configurations stay DRAFT.
3. Preserve the existing active Hawaii product IDs and the existing `SK24V150PH` 1/3/6 DRAFT IDs; do not create replacements.
4. Flag any current Hawaii listing whose assigned freight rule does not match the exact quantity/island evidence.
5. Keep protected carrier buy rates / dealer costs outside public Git; return only the operational qualification state needed for commerce execution.
6. After supplier + carrier + economics pass for a configuration, return the exact subset ready for Shopify checkout/shipping verification and final publication decision.

Casey's supplied OS3 tracking URL is `https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/89`. The connected GitHub installation available in this session cannot read that repository/issue, so this handoff does **not** claim a direct OS3 Issue #89 update. Casey's direct instruction, live Shopify state and the accessible canonical operations repo were used instead.

## EPOCH NEXT

The active Epoch `1250A-ES` Lower-48 listing is no longer blocked by its prior media/listing state. Continue to track these separately as operational follow-up:

- exact-SKU supplier orderability with Nick;
- any dealer dropship fee;
- real buyer checkout verification of the `$18` Lower-48 shipping method;
- current Epoch MAP / fulfillment requirements.

Those checks do not undo the current ACTIVE listing. The proposed five-model Epoch Hawaii / Puerto Rico qualification pilot remains next after the SOK Hawaii queue is organized and progressing.
