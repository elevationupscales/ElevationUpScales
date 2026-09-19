#!/usr/bin/env bash
set -euo pipefail
base="${1%/}"
test -n "$base"
for route in /sok-batteries /sok/sk12v100h/ /sok/sk24v150ph/ /sok/sk48v100n/ /sok/sktc30-smart-battery-monitor/ /sok/48v-battery-cabinet/ /sok-order.html; do code=$(curl -sS -L --retry 8 --retry-all-errors --retry-delay 2 -o /tmp/sok-full-page -w '%{http_code}' "$base$route" || true); echo "$route=$code"; test "$code" = "200"; done
curl -sS -L --fail "$base/api/sok/catalog" -o /tmp/sok-full.json
node - <<'NODE'
const fs=require('fs'),d=JSON.parse(fs.readFileSync('/tmp/sok-full.json','utf8'));if(!Array.isArray(d.products)||d.products.length!==20)throw new Error(`expected 20 SOK products, got ${d.products?.length}`);const by=Object.fromEntries(d.products.map(p=>[p.sku,p]));if(by.SK12V100PC.priceCents!==31900||by.SK48V100N.priceCents!==119900)throw new Error('anchor MAP mismatch');for(const p of d.products){if(p.mapVerified===true){if(!(Number(p.priceCents)>0))throw new Error(`${p.sku} verified MAP missing`);if(p.publicPurchaseMode!=='DIRECT_CHECKOUT')throw new Error(`${p.sku} verified MAP product not direct checkout`);}else if(p.priceCents!==null)throw new Error(`${p.sku} unverified price published`);}if(by['SOK-48V-CABINET'].publicPurchaseMode!=='COMMERCIAL_ONLY')throw new Error('cabinet purchase mode');const raw=JSON.stringify(d);for(const token of ['supplierCost','dropShipCost','supplierInventory','sourceWarehouse','sourcePage','primary_carrier','carrier_state','economics_state','landedCost','marginCents'])if(raw.includes(token))throw new Error(`public leak ${token}`);console.log('full-line public API: PASS');
NODE
for path in /assets/brands/sok/sk12v100h/hero.webp /assets/brands/sok/sk24v150ph/hero.webp /assets/brands/sok/sktc30-smart-battery-monitor/hero.webp; do code=$(curl -sS -L --retry 6 --retry-all-errors -o /tmp/sok-image -w '%{http_code}' "$base$path"||true); test "$code" = "200"; test "$(wc -c </tmp/sok-image)" -gt 5000; done
for runtime in /sok-full-line-runtime.js /sok-full-line-data.js; do code=$(curl -sS -o /tmp/runtime -w '%{http_code}' "$base$runtime"||true); test "$code" = "404"; done
echo 'SOK full-line preview smoke: PASS'
