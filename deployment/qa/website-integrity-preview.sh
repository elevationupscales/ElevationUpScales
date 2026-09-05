#!/usr/bin/env bash
set -euo pipefail
BASE="${1:?base URL required}"; base="${BASE%/}"
get(){ curl -fsSL --retry 8 --retry-all-errors --retry-delay 2 "$base$1"; }
for route in / /sok-batteries /sok/sk12v100pc/ /sok/sk48v100n/ /sok-order.html /store /rv-store /lithium-batteries /hawaii-lithium-batteries /checkout/ /start-a-project /solar-project /marketplace; do code=$(curl -sSL --retry 8 --retry-all-errors --retry-delay 2 -o /tmp/eus-page -w '%{http_code}' "$base$route" || true); echo "$route=$code"; test "$code" = 200; done
home=$(get /); grep -q 'data-home-sok' <<<"$home"; grep -q 'SK12V100PC' <<<"$home"; grep -q 'SK48V100N' <<<"$home"
order=$(get /sok-order.html); grep -q 'email or phone required' <<<"$order"; ! grep -q 'sok-order-company' <<<"$order"; ! grep -q 'sok-order-site-type' <<<"$order"
sk48=$(get /sok/sk48v100n/); grep -q 'sok-product-gallery' <<<"$sk48"; grep -q 'system-cabinet.png' <<<"$sk48"
api=$(get /api/sok/catalog); grep -q 'SK12V100PC' <<<"$api"; grep -q 'SK48V100N' <<<"$api"; ! grep -Eqi 'warehouse.?cost|supplier.?cost|landed.?cost|margin|drop.?ship.?price' <<<"$api"
echo 'Website integrity preview smoke: PASS'
