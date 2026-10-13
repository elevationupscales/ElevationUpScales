# Elevation UpScales — SOK Hawaii Shopify Build Status

**Owner:** Casey Young  
**Commerce lane:** Peter Torres — Director of Operations & Commerce  
**Effective:** 2026-10-13  
**Status:** ACTIVE / P1-P3 SHOPIFY DRAFT BUILD + FREIGHT QUALIFICATION  
**OS3 tracking reference supplied by owner:** `https://github.com/elevationupscales/elevationupscales-elevation-agent-manager/issues/89`

## Control

One consolidated SKU/status/freight checklist controls this build. Do not recreate existing Hawaii offers. Do not infer freight from another quantity or island. No guessed shipping price, inventory, delivery promise or live publishing.

New Hawaii products created in this pass are **DRAFT**, use the exact verified Lower-48 source model and genuine SOK media, and have supplier inventory tracking disabled. Draft merchandise subtotal uses the current source-product retail price multiplied by the exact pack quantity; freight is not included or guessed.

## P1 — SK48V100N Hawaii

| Configuration | Shopify state | Draft SKU | Product GID | Media | Freight / publish state |
|---|---|---|---|---|---|
| 1-pack / 5.12kWh | DRAFT | `SK48V100N-HI-PREP-1-OCT26` | `gid://shopify/Product/16068435181937` | 8 exact source images | UNQUALIFIED — quote/pallet/DG/island/carrier required |
| 2-pack / 10.24kWh | DRAFT | `SK48V100N-HI-PREP-2-OCT26` | `gid://shopify/Product/16068435411313` | 8 exact source images | UNQUALIFIED — quote/pallet/DG/island/carrier required |
| 3-pack / 15.36kWh | DRAFT | `SK48V100N-HI-PREP-3-OCT26` | `gid://shopify/Product/16068435673457` | 8 exact source images | UNQUALIFIED — quote/pallet/DG/island/carrier required |

Source product: `SK48V100N` / Shopify `gid://shopify/Product/15995497972081` / current source retail $1,199 per battery.

## P2 — missing Hawaii packs

### SK12V100PC

Existing Hawaii products already active and **not recreated**: 1-, 3-, 6-, 9- and 12-pack.

| Configuration | Shopify state | Draft SKU | Product GID | Media | Freight / publish state |
|---|---|---|---|---|---|
| 2-pack | DRAFT | `SK12V100PC-HI-PREP-2-OCT26` | `gid://shopify/Product/16068436001137` | 6 exact source images | UNQUALIFIED — quantity + island quote required |
| 4-pack | DRAFT | `SK12V100PC-HI-PREP-4-OCT26` | `gid://shopify/Product/16068436427121` | 6 exact source images | UNQUALIFIED — quantity + island quote required |

Source product: `SK12V100PC` / Shopify `gid://shopify/Product/15995497906545` / current source retail $319 per battery.

### SK24V100

Existing Hawaii products already active and **not recreated**: 1-, 3-, 6-, 9- and 12-pack.

| Configuration | Shopify state | Draft SKU | Product GID | Media | Supplier | Freight / publish state |
|---|---|---|---|---|---|---|
| 2-pack | DRAFT | `SK24V100-HI-PREP-2-OCT26` | `gid://shopify/Product/16068436820337` | 6 exact source images | availability / lead time PENDING | UNQUALIFIED — quantity + island quote required |
| 4-pack | DRAFT | `SK24V100-HI-PREP-4-OCT26` | `gid://shopify/Product/16068437049713` | 6 exact source images | availability / lead time PENDING | UNQUALIFIED — quantity + island quote required |

Source product: `SK24V100` / Shopify `gid://shopify/Product/15997525262705` / current source retail $751 per battery.

Do not assume the existing Hawaii freight rate applies to these quantities or to every island.

## P3 — heated / marine Hawaii models

| Model / configuration | Shopify state | Draft SKU | Product GID | Media | Freight / publish state |
|---|---|---|---|---|---|
| SK12V100H 1-pack | DRAFT | `SK12V100H-HI-PREP-1-OCT26` | `gid://shopify/Product/16068437410161` | 6 exact source images | UNQUALIFIED |
| SK12V100H 3-pack | DRAFT | `SK12V100H-HI-PREP-3-OCT26` | `gid://shopify/Product/16068437639537` | 6 exact source images | UNQUALIFIED |
| SK12V206H 1-pack | DRAFT | `SK12V206H-HI-PREP-1-OCT26` | `gid://shopify/Product/16068437868913` | 5 exact source images | UNQUALIFIED |
| SK12V206H 2-pack | DRAFT | `SK12V206H-HI-PREP-2-OCT26` | `gid://shopify/Product/16068437967217` | 5 exact source images | UNQUALIFIED |
| SK12V206PH 1-pack | DRAFT | `SK12V206PH-HI-PREP-1-OCT26` | `gid://shopify/Product/16068438163825` | 6 exact source images | UNQUALIFIED |
| SK12V206PH 2-pack | DRAFT | `SK12V206PH-HI-PREP-2-OCT26` | `gid://shopify/Product/16068438425969` | 6 exact source images | UNQUALIFIED |

Source products:
- `SK12V100H` — `gid://shopify/Product/15997524935025` — current source retail $369.
- `SK12V206H` — `gid://shopify/Product/15997525164401` — current source retail $749.
- `SK12V206PH` — `gid://shopify/Product/15997525197169` — current source retail $750.

## Existing SK24V150PH Hawaii drafts — finish in place

Do not recreate these.

| Configuration | Existing SKU | Product GID | Current state | Media after this pass | Remaining work |
|---|---|---|---|---|---|
| 1-pack | `SK24V150PH-HI-PREP-1-SEP26` | `gid://shopify/Product/16020150124913` | DRAFT | 6 exact source images already attached | exact quote / route / publish gate |
| 3-pack | `SK24V150PH-HI-PREP-3-SEP26` | `gid://shopify/Product/16020150157681` | DRAFT | 6 exact source images attached in this pass | exact quote / route / publish gate |
| 6-pack | `SK24V150PH-HI-PREP-6-SEP26` | `gid://shopify/Product/16020150190449` | DRAFT | 6 exact source images attached in this pass | exact quote / route / publish gate |

Source product: `SK24V150PH` / Shopify `gid://shopify/Product/15997525623153`.

## Freight evidence still required

For every unqualified configuration, OS3 / logistics must resolve the exact sellable route rather than reuse a generic rate:

- exact quantity and destination island;
- exact packed/carton/pallet profile and gross weight where carrier requires it;
- DG / lithium acceptance and required documentation;
- terminal / will-call / curbside / other service level;
- carrier or forwarder quote and quote validity;
- any minimum, palletization or handling requirement;
- landed customer-facing shipping price only after approved economics;
- final Shopify shipping/profile mapping before publication.

## Supplier evidence still required

- `SK24V100`: current supplier availability and lead time before any new 2- or 4-pack is published.
- For every model: do not treat Shopify quantity as supplier physical stock; re-check orderability before publication / order acceptance.

## OS3 next execution

1. Consume this exact SKU/status matrix as the catalog-side state.
2. Bind each configuration to current freight evidence by quantity + island; do not reuse `$280` generically.
3. Return quote-supported configurations first so Peter can finish shipping/profile setup while blocked configurations remain DRAFT.
4. Preserve existing active Hawaii listings; flag any exact listing whose current freight rule does not match its actual quantity / island evidence.
5. Keep `SK24V150PH` on the existing 1/3/6 product IDs above.
6. After freight + supplier truth passes, return the exact subset ready for Shopify shipping/profile verification and final publication decision.

## Next catalog focus after SOK queue

Epoch remains next after this SOK Hawaii queue is organized and progressing. The active Epoch `1250A-ES` Lower-48 product is the core source for the proposed five-model Hawaii / Puerto Rico qualification pilot with Nick. Olight expansion remains paused unless reactivated by newer owner direction.
