#!/usr/bin/env bash
set -euo pipefail

BASE="${1:-}"
if [[ -z "$BASE" ]]; then
  echo "Usage: $0 <preview-base-url>" >&2
  exit 2
fi
base="${BASE%/}"

check_status() {
  local expected="$1"
  local route="$2"
  local code
  code=$(curl -sS -L --retry 8 --retry-all-errors --retry-delay 2 \
    -o /tmp/eus-clean-baseline-response --write-out '%{http_code}' "$base$route" || true)
  echo "CHECK $route => $code (expected $expected)"
  if [[ "$code" != "$expected" ]]; then
    head -c 800 /tmp/eus-clean-baseline-response || true
    echo
    return 1
  fi
}

for route in \
  / \
  /start-a-project \
  /store \
  /rv-store \
  /marketplace \
  /solar-project \
  /sok-batteries \
  /sok/sk12v100pc/ \
  /sok/sk48v100n/ \
  /sok-order.html \
  /lithium-batteries \
  /hawaii-lithium-batteries \
  /checkout \
  /admin \
  /admin-store-orders \
  /admin-inventory \
  /admin-listings \
  /admin-analytics \
  /admin-system \
  /admin-command-center.css \
  /api/store-products; do
  check_status 200 "$route"
done

check_status 404 /admin-command-center-pass1.css

health_code=$(curl -sS -L --retry 8 --retry-all-errors --retry-delay 2 \
  -o /tmp/eus-clean-baseline-health --write-out '%{http_code}' "$base/api/health" || true)
if [[ "$health_code" != "200" && "$health_code" != "503" ]]; then
  echo "Unexpected /api/health status: $health_code" >&2
  cat /tmp/eus-clean-baseline-health >&2 || true
  exit 1
fi

HEALTH_FILE=/tmp/eus-clean-baseline-health node - <<'NODE'
const fs = require('fs');
const payload = JSON.parse(fs.readFileSync(process.env.HEALTH_FILE, 'utf8'));
const services = payload.services || {};
for (const [key, expected] of [
  ['siteAssets', 'configured'],
  ['marketplaceDatabase', 'ok'],
  ['leadsDatabase', 'ok'],
  ['marketplaceImages', 'configured'],
  ['siteAnalyticsD1', 'ok'],
]) {
  if (services[key] !== expected) throw new Error(`Core health regression ${key}: ${services[key]} expected ${expected}`);
}
if (payload.status === 'degraded' && services.marketplaceNotifications === 'configured' && services.solarNotifications === 'configured') throw new Error('Unexplained degraded health');
console.log('Accepted health contract: PASS');
NODE

for route in \
  /api/admin/operations \
  /api/admin/inventory \
  /api/admin/leads \
  /api/admin/market-analytics \
  /api/admin/sync; do
  check_status 401 "$route"
done

for qa_route in /api/admin/gmail-provider-qa /api/admin/email-role-qa; do
  qa_code=$(curl -sS -o /tmp/eus-mail-qa-auth-response --write-out '%{http_code}' -X POST -H "Origin: $base" -H 'Content-Type: application/json' --data '{}' "$base$qa_route" || true)
  echo "CHECK POST $qa_route => $qa_code (expected 401)"
  if [[ "$qa_code" != "401" ]]; then
    head -c 800 /tmp/eus-mail-qa-auth-response || true
    echo
    exit 1
  fi
done

check_status 200 /api/admin/listings
LISTINGS_FILE=/tmp/eus-clean-baseline-response node - <<'NODE'
const fs = require('fs');
const payload = JSON.parse(fs.readFileSync(process.env.LISTINGS_FILE, 'utf8'));
if (payload.ok !== true || payload.retired !== true || payload.count !== 0 || !Array.isArray(payload.listings) || payload.listings.length !== 0) throw new Error('Retired Marketplace listings endpoint contract failed');
console.log('Retired Marketplace listings endpoint: PASS');
NODE

for route in \
  /worker-core.js \
  /worker/core-context.js \
  /worker/domains/admin-auth.js \
  /worker/domains/compatibility.js \
  /worker/shared/gmail-mail-provider.js \
  /worker/shared/gmail-provider-qa.js \
  /worker/shared/email-role-routing.js \
  /worker/shared/email-role-surfaces.js \
  /sok-full-line-runtime.js \
  /sok-full-line-data.js \
  /sync-admin-runtime.js; do
  check_status 404 "$route"
done

head_code=$(curl -sS -I --retry 8 --retry-all-errors --retry-delay 2 -o /tmp/eus-store-products-head --write-out '%{http_code}' "$base/api/store-products" || true)
if [[ "$head_code" != "200" ]]; then
  echo "HEAD /api/store-products => $head_code (expected 200)" >&2
  exit 1
fi

echo "HEAD /api/store-products => 200"

bash deployment/qa/sok-commercialization-preview.sh "$base"
bash deployment/qa/sok-full-line-preview.sh "$base"
bash deployment/qa/sok-direct-dropship-preview.sh "$base"
bash deployment/qa/website-integrity-preview.sh "$base"

echo "clean-baseline-preview.sh: PASS"
