import assert from "node:assert/strict";
import fs from "node:fs";
import {__sokAvailabilityTest} from "../../site/sok-availability-runtime.js";

const {commercePresentation,directDropshipReadiness,inventoryFreshness,SOK_PUBLIC,publicProduct}=__sokAvailabilityTest;
const ready={sku:"SK12V100PC",supplier_sku:"SK12V100PC",model:"SK12V100PC",map_cents:31900,lower48_eligible:1,management_approved:1,sds_state:"RECEIVED",un38_state:"RECEIVED",last_supplier_verified:"2026-09-04T12:00:00.000Z",inventory_confirmation_source:"SOK inventory update",inventory_freshness_state:"CURRENT",availability_mode:"available",public_purchase_mode:"DIRECT_CHECKOUT",updated_at:"qa",updated_by:"system-baseline"};

assert.equal(inventoryFreshness("CURRENT",ready.last_supplier_verified).state,"CURRENT");
assert.equal(inventoryFreshness("AGING",ready.last_supplier_verified).state,"AGING");
assert.equal(inventoryFreshness("STALE",ready.last_supplier_verified).state,"STALE");
assert.equal(inventoryFreshness("","").state,"UNCONFIRMED");

assert.deepEqual(directDropshipReadiness(ready,SOK_PUBLIC.SK12V100PC,"CA").blockers,[]);
assert.equal(commercePresentation(ready,"CA").paymentEligible,true);
assert.equal(commercePresentation(ready,"HI").paymentEligible,false);
assert.equal(commercePresentation(ready,"AK").paymentEligible,false);
assert.equal(commercePresentation({...ready,inventory_freshness_state:"STALE"},"CA").paymentEligible,true);
assert.equal(commercePresentation({...ready,inventory_freshness_state:"STALE"},"CA").label,"Available to Order");
assert.equal(commercePresentation({...ready,map_cents:31899},"CA").paymentEligible,false);
assert.equal(commercePresentation({...ready,lower48_eligible:0},"CA").paymentEligible,false);
assert.equal(commercePresentation({...ready,supplier_sku:"WRONG"},"CA").paymentEligible,false);
assert.equal(commercePresentation({...ready,sds_state:"MISSING"},"CA").paymentEligible,true);
assert.equal(commercePresentation({...ready,public_purchase_mode:"PURCHASE_OPTIONS"},"CA").purchaseMode,"DIRECT_CHECKOUT");
assert.equal(commercePresentation({...ready,public_purchase_mode:"PURCHASE_OPTIONS",updated_by:"management@example.com"},"CA").paymentEligible,false);
assert.deepEqual(directDropshipReadiness({...ready,inventory_freshness_state:"STALE",sds_state:"MISSING"},SOK_PUBLIC.SK12V100PC,"CA").operationalAlerts,["DOCUMENTS","INVENTORY_FRESHNESS"]);
const prePurchase={...ready,availability_mode:"unavailable",prepurchase_enabled:1,expected_ship_window:"Ships in approximately 2–4 weeks"};
assert.equal(commercePresentation(prePurchase,"CA").mode,"prepurchase");
assert.equal(commercePresentation(prePurchase,"CA").paymentEligible,true);
assert.equal(commercePresentation(prePurchase,"CA").requiresTimingAcknowledgement,true);
const backorder={...ready,availability_mode:"unavailable",backorder_enabled:1,supplier_replenishment_confirmed:1,expected_ship_window:"Expected to ship in 3–5 weeks"};
assert.equal(commercePresentation(backorder,"CA").mode,"backorder");
assert.equal(commercePresentation(backorder,"CA").paymentEligible,true);
const assistedOutOfStock={...ready,availability_mode:"unavailable",prepurchase_enabled:1,backorder_enabled:1,expected_ship_window:"",supplier_replenishment_confirmed:0};
assert.equal(commercePresentation(assistedOutOfStock,"CA").paymentEligible,false);
assert.equal(commercePresentation(assistedOutOfStock,"CA").cta,"See Purchase Options");

const product=publicProduct(ready);
assert.equal(product.paymentEligible,true);
assert.equal(product.commerceCta,"Buy Now");
assert.match(product.purchaseUrl,/^\/checkout\/\?source=lithium&id=sok-sk12v100pc/);
assert.equal(product.inventoryFreshness,"CURRENT");
const publicJson=JSON.stringify(product);
for(const token of ["inventory_confirmation_source","last_supplier_verified","supplier_inventory","supplier_cost_cents","drop_ship_cost_cents","source_warehouse","blockers"]){
  assert.equal(publicJson.includes(token),false,`public direct-checkout payload leaked ${token}`);
}

const checkout=fs.readFileSync("site/store-checkout-server.js","utf8");
assert.match(checkout,/quote\.availability\?\.paymentEligible === false/);
assert.match(checkout,/destinationState === "AK"/);
assert.match(checkout,/evaluateSokHawaiiOrder/);
assert.match(checkout,/sokDirect \? Number\(entry\.shippingCents\|\|0\)/);
assert.match(checkout,/included_in_map/);
const operations=fs.readFileSync("site/sok-operations-runtime.js","utf8");
for(const privateLiteral of ["supplierCostCents:65000","dropShipCostCents:89900","supplierInventory:291","supplierInventory:815","4277 Schaefer Ave","H2O Logistics","Approved Freight Forwarders"]){
  assert.equal(operations.includes(privateLiteral),false,`private supplier baseline remains in public source: ${privateLiteral}`);
}
const collection=fs.readFileSync("site/sok-batteries.js","utf8");
const detail=fs.readFileSync("site/sok-full-line-runtime.js","utf8");
assert.match(collection,/direct_checkout_open/);
assert.match(detail,/direct-checkout/);

console.log("SOK direct dropship activation static QA: PASS");
