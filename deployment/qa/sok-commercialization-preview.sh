#!/usr/bin/env bash
set -euo pipefail
base="${1%/}"; test -n "$base"
routes=("/" "/store" "/rv-store" "/lithium-batteries" "/sok-batteries" "/product?id=sok-sk12v100pc&store=lithium" "/product?id=sok-sk48v100n&store=lithium" "/sok-order.html?sku=SK12V100PC&intent=purchase_options" "/sok-order.html?sku=SK48V100N&intent=commercial" "/hawaii-lithium-batteries" "/solar-project" "/checkout/" "/start-a-project" "/marketplace")
for route in "${routes[@]}"; do code=$(curl -sS -L --retry 8 --retry-all-errors --retry-delay 2 --connect-timeout 15 --max-time 45 -o /tmp/sok-route -w '%{http_code}' "${base}${route}" || true); [[ "$code" == 200 ]] || { echo "FAIL route $route = $code"; exit 1; }; done
curl -sS -L --retry 8 --retry-all-errors "${base}/sok-batteries" -o /tmp/sok-page; grep -q 'AUTHORIZED SOK ENERGY DEALER' /tmp/sok-page; grep -q 'SK12V100PC' /tmp/sok-page; grep -q 'SK48V100N' /tmp/sok-page
curl -sS -L --retry 8 --retry-all-errors "${base}/sok-order.html?sku=SK48V100N&intent=commercial" -o /tmp/sok-order; grep -q 'Request Commercial Pricing' /tmp/sok-order; ! grep -qi 'mailto:casey@elevationupscales.com' /tmp/sok-order
curl -sS -L --retry 8 --retry-all-errors "${base}/api/sok/catalog" -o /tmp/sok-catalog.json
python3 - <<'PY2'
import json
d=json.load(open('/tmp/sok-catalog.json')); rows={p['sku']:p for p in d.get('products',[])}
assert set(['SK12V100PC','SK48V100N']) <= set(rows)
assert rows['SK12V100PC']['priceCents'] >= 31900
assert rows['SK48V100N']['priceCents'] >= 119900
assert rows['SK12V100PC']['availabilityMode'] == 'available'
assert rows['SK48V100N']['availabilityMode'] == 'prepurchase'
for p in rows.values():
    promo=p.get('promotion',{}); assert promo.get('eligible') is False; assert promo.get('couponEligible') is False; assert promo.get('pricingMode') == 'sok-map'
raw=json.dumps(d).lower()
for token in ['suppliercost','supplierinventory','sourcewarehouse','dropshipcost','landedcost','margincents','primary_carrier','carrier_state','economics_state']:
    assert token not in raw, token
PY2
for asset in /assets/brands/sok/sk12v100pc/hero.png /assets/brands/sok/sk12v100pc/spec-sheet.pdf /assets/brands/sok/sk48v100n/hero.jpg /assets/brands/sok/sk48v100n/spec-sheet.pdf /assets/brands/sok/sk48v100n/system-cabinet.png /sok-product-merch.js /sok-solar-builder.js; do code=$(curl -sS -L --retry 8 --retry-all-errors -o /dev/null -w '%{http_code}' "${base}${asset}"); [[ "$code" == 200 ]] || { echo "FAIL asset $asset = $code"; exit 1; }; done
for protected in /sok-availability-runtime.js /sok-operations-runtime.js /commerce-pricing-runtime.js /catalog-admin-runtime.js /doba-csv-sync-runtime.js; do code=$(curl -sS -o /dev/null -w '%{http_code}' "${base}${protected}" || true); [[ "$code" == 404 ]] || { echo "FAIL protected $protected = $code"; exit 1; }; done
code=$(curl -sS -o /dev/null -w '%{http_code}' "${base}/api/admin/sok-availability" || true); [[ "$code" == 401 ]] || { echo "FAIL SOK admin auth = $code"; exit 1; }
curl -sS -L "${base}/solar-project" | grep -q 'sok-solar-builder.js'
curl -sS -L "${base}/lithium-shop.js" | grep -q '4+ · Freight Review Required'
echo "SOK commercialization preview smoke: PASS"
