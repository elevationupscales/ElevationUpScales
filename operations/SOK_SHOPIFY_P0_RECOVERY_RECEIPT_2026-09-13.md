# SOK SHOPIFY P0 RECOVERY RECEIPT — 2026-09-13

**Owner:** Casey Young  
**Lane:** Shopify Store Operations  
**Priority:** P0  
**Status:** **SOK PURCHASEABILITY = PASS**

## Control

- Git baseline re-resolved immediately before receipt: `e9cbaacc49443637e2241be7948ea93a3848557f`.
- Scope was limited to the Shopify SOK purchase path.
- No real payment was submitted.
- No duplicate products were created.
- Shopify Payments configuration was not reopened because no fresh payment defect was found.
- No blind inventory/product/channel mutation was made because the clean live storefront path is currently working.

## Verified SOK commercial truth

Controlling source reviewed: SOK USA drop-shipping price sheet, effective 2026-08-03, supplied by Kam / SOK Energy. California-warehouse drop-shipping prices are listed as free-shipping prices and the sheet provides the controlling MAP values.

SOK also confirmed on 2026-09-10 that Elevation may accept backorders/preorders for out-of-stock items, but inventory is not reserved/locked until supplier payment is confirmed.

| SKU | SOK free-ship dropship cost | MAP | Shopify price | MAP |
| --- | ---: | ---: | ---: | --- |
| SK12V100PC | $239 | $319 | $319 | PASS |
| SK48V100N | $899 | $1,199 | $1,199 | PASS |
| SK12V100H | $279 | $369 | $369 | PASS |
| SK12V206H | $562 | $749 | $749 | PASS |
| SK12V206PH | $562 | $750 | $750 | PASS |
| SK24V100 | $563 | $751 | $751 | PASS |
| SK12V280H | $749 | $999 | $999 | PASS |
| SK12V314PH | $824 | $1,099 | $1,099 | PASS |
| SK24V150PH | $862 | $1,149 | $1,149 | PASS |

## Shopify final state

Exactly nine intended SOK products were returned in the live Shopify audit. All nine are:

- `ACTIVE`;
- published to the Online Store with a live `onlineStoreUrl`;
- exact single-SKU identities with no duplicate-SKU condition found;
- `availableForSale = true`;
- `inventoryPolicy = CONTINUE`;
- not bundle-component dependent (`requiresComponents = false`);
- physical/shippable products;
- priced at the controlling SOK MAP.

Shopify quantity is currently `0` on all nine variants. That value is not treated as SOK supplier-stock truth. The authorized SOK backorder/preorder rule and Shopify `CONTINUE` configuration allow checkout while supplier inventory/orderability is confirmed during fulfillment. Stock must not be represented as reserved until SOK payment/order confirmation occurs.

`SK12V100PC` and `SK48V100N` currently have Shopify inventory tracking disabled. The other seven SOK variants have tracking enabled with quantity zero but remain purchasable because `CONTINUE` is set.

Shop primary domain verification:

- `ggwt0c-41.myshopify.com` is the Shopify primary domain;
- SSL enabled;
- checkout supported;
- `setupRequired = false`.

## Required live smoke matrix

| SOK SKU | Shopify product | Product status | Sales channel | Inventory / orderability | Preorder / backorder | Price | MAP | Add to Cart | Cart | Checkout | Payment page | Defect found | Correction made |
| --- | --- | --- | --- | --- | --- | ---: | --- | --- | --- | --- | --- | --- | --- |
| SK12V100PC | Premium 12V 100Ah Bluetooth LiFePO4 Battery | ACTIVE | Online Store LIVE | Shopify qty 0; `CONTINUE`; `availableForSale=true` | SOK-authorized backorder path; no reserved-stock claim | $319 | PASS | PASS | PASS | PASS | PASS — card + PayPal | Owner-reported failure not reproducible in clean live session | No config mutation required; working state preserved and verified. Colorado Lower-48 shipping test resolved Standard + Express rates. |
| SK48V100N | Premium 51.2V 100Ah 5.12kWh Rack LiFePO4 Battery | ACTIVE | Online Store LIVE | Shopify qty 0; `CONTINUE`; `availableForSale=true` | SOK-authorized backorder path; no reserved-stock claim | $1,199 | PASS | PASS | PASS | PASS | PASS — card + PayPal | No current SKU/channel/inventory blocker reproduced | No mutation required; working state preserved and verified |
| SK12V100H | Premium 12V 100Ah Heated LiFePO4 Battery | ACTIVE | Online Store LIVE | Shopify qty 0; `CONTINUE`; `availableForSale=true` | SOK-authorized backorder path; no reserved-stock claim | $369 | PASS | PASS | PASS | PASS | PASS — card + PayPal | No current SKU/channel/inventory blocker reproduced | No mutation required; working state preserved and verified |
| SK12V206H | Premium 12V 206Ah Heated LiFePO4 Battery | ACTIVE | Online Store LIVE | Shopify qty 0; `CONTINUE`; `availableForSale=true` | SOK-authorized backorder path; no reserved-stock claim | $749 | PASS | PASS | PASS | PASS | PASS — card + PayPal | No current SKU/channel/inventory blocker reproduced | No mutation required; working state preserved and verified |
| SK12V206PH | Premium Marine Grade 12V 206Ah Heated LiFePO4 Battery | ACTIVE | Online Store LIVE | Shopify qty 0; `CONTINUE`; `availableForSale=true` | SOK-authorized backorder path; no reserved-stock claim | $750 | PASS | PASS | PASS | PASS | PASS — card + PayPal | No current SKU/channel/inventory blocker reproduced | No mutation required; working state preserved and verified |
| SK24V100 | Premium 24V 100Ah LiFePO4 Battery | ACTIVE | Online Store LIVE | Shopify qty 0; `CONTINUE`; `availableForSale=true` | SOK-authorized backorder path; no reserved-stock claim | $751 | PASS | PASS | PASS | PASS | PASS — card + PayPal | No current SKU/channel/inventory blocker reproduced | No mutation required; working state preserved and verified |
| SK12V280H | Premium 12V 280Ah Heated LiFePO4 Battery | ACTIVE | Online Store LIVE | Shopify qty 0; `CONTINUE`; `availableForSale=true` | SOK-authorized backorder path; no reserved-stock claim | $999 | PASS | PASS | PASS | PASS | PASS — card + PayPal | No current Shopify defect reproduced | No Shopify mutation required; cart retention and fresh checkout verified |
| SK12V314PH | Premium 12V 314Ah Heated LiFePO4 Battery with Victron CAN | ACTIVE | Online Store LIVE | Shopify qty 0; `CONTINUE`; `availableForSale=true` | **Explicit preorder**; page states supplier-controlled expected shipment around 2026-09-20; no reserved-stock claim | $1,099 | PASS | PASS | PASS | PASS | PASS — card + PayPal | No purchase blocker; preorder path works | No config mutation required; existing preorder disclosure preserved |
| SK24V150PH | Premium 24V 150Ah Heated LiFePO4 Battery with Victron CAN | ACTIVE | Online Store LIVE | Shopify qty 0; `CONTINUE`; `availableForSale=true` | SOK-authorized backorder path; no reserved-stock claim | $1,149 | PASS | PASS | PASS | PASS | PASS — card + PayPal | No current SKU/channel/inventory blocker reproduced | No mutation required; working state preserved and verified |

## Live customer-path findings

The owner-reported purchase failure could not be reproduced in a clean current storefront session.

Verified live:

1. all nine SOK product pages load at the exact MAP price;
2. all nine exact variants are available for sale;
3. Add to Cart / cart retention was verified for every intended SOK SKU;
4. fresh checkout probes for every SOK SKU opened the correct item and price;
5. every checkout probe reached the payment section with credit/debit card and PayPal available;
6. the normal SKU `SK12V100PC` completed the full representative path and a Colorado Lower-48 address resolved shipping methods without blocking checkout;
7. preorder SKU `SK12V314PH` completed the full representative preorder path and retained clear supplier-controlled preorder language;
8. no real payment was submitted.

The exact historical owner error is therefore not assigned a speculative root cause. Current evidence rules out a presently active basic SOK product-status, Online Store publication, variant-availability, inventory-policy, primary-domain, payment-method, and tested Lower-48 shipping-rate blocker.

## Disposition

**SOK PURCHASEABILITY = PASS**

No Shopify mutation was justified after verification because the current SOK purchase path is working. A forced change to a green purchase path would create unnecessary risk.

Replay guard:

- do not disable SOK `CONTINUE` solely because Shopify quantity is zero;
- do not treat Shopify inventory as supplier inventory;
- do not claim supplier stock is reserved before SOK payment/order confirmation;
- do not reopen Shopify Payments without a fresh payment-specific failure;
- do not create duplicate SOK products as a workaround.

## Next Shopify-lane pickup

Keep SOK as the top Shopify priority through the first real paid SOK order:

**PAID ORDER → VERIFY PAYMENT → EXACT SKU → REVERIFY SOK ORDERABILITY/CURRENT COST → PLACE SUPPLIER ORDER → CONFIRM RELEASE → FULFILL → RECORD ACTUAL CONTRIBUTION.**
