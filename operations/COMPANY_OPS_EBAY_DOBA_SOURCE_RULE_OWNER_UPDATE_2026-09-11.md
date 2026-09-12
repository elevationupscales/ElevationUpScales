# Company Operations — eBay Doba Source Rule Owner Update

**Date:** 2026-09-11 MDT  
**Owner:** Casey Young  
**Priority:** MANAGEMENT CONTROL UPDATE  
**Applies To:** eBay Store Operations / Ecommerce & Vendor Operations / Company Operations / OS Management  
**State:** ACTIVE / OWNER CLARIFICATION

## Owner decision

Casey clarified the controlling eBay sourcing rule:

**A product legitimately offered through Doba for eBay does not require separate Elevation direct-manufacturer eBay authorization merely because the underlying brand/manufacturer is Kingboss, VEVOR, Renogy, SOK, or another supplier.**

Direct-manufacturer eBay authorization is required only when Elevation intends to source that product **directly from the manufacturer** rather than through Doba.

## Doba-backed eBay rule

For an exact Doba SKU, retain/list on eBay when all of the following pass:

1. eBay is permitted for the exact Doba SKU, or eBay is not identified as a prohibited marketplace;
2. Doba MAP / pricing controls are satisfied;
3. current Doba inventory is executable;
4. destination restrictions are satisfied;
5. landed cost and eBay variable costs support positive contribution;
6. fulfillment reliability is acceptable.

Do **not** remove Kingboss systems or other manufacturer-branded listings solely because Elevation lacks separate direct eBay authorization from that manufacturer when the listing remains valid through Doba.

## Direct-source rule remains separate

If Elevation wants to replace Doba and source directly from SOK, Kingboss, VEVOR, Renogy, or another manufacturer, the direct-source channel authorization remains a separate requirement.

Therefore:

- `Doba → eBay` is controlled by the exact Doba SKU's marketplace/MAP/source rules.
- `Manufacturer Direct → eBay` is controlled by the manufacturer's direct marketplace authorization to Elevation.

## Management effect

Upper management and all eBay/catalog workers must avoid any cleanup rule that says:

> No direct manufacturer eBay authorization → remove the branded eBay listing.

That rule is incorrect when an independent valid Doba source path exists.

Correct decision sequence:

**EXACT DOBA SKU → EBAY ALLOWED → MAP COMPLIANT → INVENTORY/DESTINATION → LANDED ECONOMICS → FULFILLMENT RELIABILITY → KEEP / REPRICE / REBUILD / END.**

Direct manufacturer permission is evaluated only if the source is being migrated away from Doba to a direct manufacturer relationship.

## Related control update

The eBay lane source-control document was corrected in commit `74156a1b633c969e25b6cb1c0fde9292a45949a8`:

`operations/EBAY_DIRECT_SOURCE_CHANNEL_AUTHORIZATION_RECON_2026-09-11.md`

This owner clarification supersedes prior language that could be read as requiring removal/hold of a Doba-backed branded listing merely because direct manufacturer eBay authorization was absent.
