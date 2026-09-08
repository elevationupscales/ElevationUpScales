#!/usr/bin/env bash
set -euo pipefail

base="${1%/}"
test -n "$base"

curl -sS -L --fail --retry 8 --retry-all-errors "$base/api/sok/catalog" -o /tmp/eus-sok-a2-catalog.json
curl -sS -L --fail --retry 8 --retry-all-errors \
  -H 'Content-Type: application/json' \
  -H "Origin: $base" \
  --data '{"source":"lithium","id":"sok-sk12v100pc","quantity":1,"shipping":{"state":"CA"}}' \
  "$base/api/store-checkout/quote" -o /tmp/eus-sok-a2-ca-quote.json

hi_code=$(curl -sS -L --retry 8 --retry-all-errors -o /tmp/eus-sok-a2-hi-quote.json -w '%{http_code}' \
  -H 'Content-Type: application/json' \
  -H "Origin: $base" \
  --data '{"source":"lithium","id":"sok-sk12v100pc","quantity":1,"shipping":{"state":"HI"}}' \
  "$base/api/store-checkout/quote" || true)
ak_code=$(curl -sS -L --retry 8 --retry-all-errors -o /tmp/eus-sok-a2-ak-quote.json -w '%{http_code}' \
  -H 'Content-Type: application/json' \
  -H "Origin: $base" \
  --data '{"source":"lithium","id":"sok-sk12v100pc","quantity":1,"shipping":{"state":"AK"}}' \
  "$base/api/store-checkout/quote" || true)

HI_CODE="$hi_code" AK_CODE="$ak_code" node - <<'NODE'
const fs=require("fs");
const catalog=JSON.parse(fs.readFileSync("/tmp/eus-sok-a2-catalog.json","utf8"));
const by=Object.fromEntries((catalog.products||[]).map(product=>[product.sku,product]));
const direct=by.SK12V100PC;
if(!direct)throw new Error("SK12V100PC missing from public SOK catalog");
if(direct.priceCents!==31900||direct.mapVerified!==true)throw new Error("SK12V100PC MAP mismatch");
if(direct.publicPurchaseMode!=="DIRECT_CHECKOUT"||direct.paymentEligible!==true||direct.commerceCta!=="Buy Now")throw new Error("SK12V100PC direct checkout not active");
if(!String(direct.purchaseUrl||"").startsWith("/checkout/?source=lithium&id=sok-sk12v100pc"))throw new Error("SK12V100PC checkout URL mismatch");
if(!["CURRENT","AGING","STALE","UNCONFIRMED"].includes(direct.inventoryFreshness))throw new Error("inventory freshness missing");

const assisted=by.SK48V100N;
if(!assisted||assisted.priceCents!==119900||assisted.paymentEligible!==false)throw new Error("SK48V100N assisted path changed unexpectedly");

const raw=JSON.stringify(catalog);
for(const token of ["supplierCost","dropShipCost","supplierInventory","sourceWarehouse","inventory_confirmation_source","last_supplier_verified","primary_carrier","carrier_state","economics_state","H2O Logistics","Approved Freight Forwarders"]){
  if(raw.includes(token))throw new Error(`public SOK data leak: ${token}`);
}

const ca=JSON.parse(fs.readFileSync("/tmp/eus-sok-a2-ca-quote.json","utf8"));
if(ca.ok!==true||ca.unitPriceCents!==31900||ca.merchandiseCents!==31900||ca.shippingCents!==0||ca.totalCents!==31900)throw new Error("Lower-48 SOK MAP/free-shipping quote mismatch");
if(ca.availability?.paymentEligible!==true)throw new Error("Lower-48 SOK payment is blocked");
if(ca.promotion?.eligible!==false||ca.promotion?.couponEligible!==false)throw new Error("SOK promotion boundary changed");
if(ca.shippingRule?.calculation!=="included_in_map"||ca.shippingRule?.rateCents!==0)throw new Error("SOK shipping-included rule missing");

if(process.env.HI_CODE!=="409")throw new Error(`Hawaii quote expected 409, got ${process.env.HI_CODE}`);
if(process.env.AK_CODE!=="409")throw new Error(`Alaska quote expected 409, got ${process.env.AK_CODE}`);
const hi=JSON.parse(fs.readFileSync("/tmp/eus-sok-a2-hi-quote.json","utf8"));
const ak=JSON.parse(fs.readFileSync("/tmp/eus-sok-a2-ak-quote.json","utf8"));
if(!hi.shippingReviewRequired||!ak.shippingReviewRequired)throw new Error("specialized-shipping review gate missing");

console.log("SOK direct dropship preview QA: PASS");
NODE

admin_code=$(curl -sS -o /dev/null -w '%{http_code}' "$base/api/admin/sok-availability" || true)
test "$admin_code" = "401"

echo "SOK A2 checkout activation preview: PASS"
