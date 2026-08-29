from pathlib import Path
import re

p=Path('.github/workflows/deploy-pages.yml')
text=p.read_text(encoding='utf-8')

# Remove/replace obsolete eBay-only validation block regardless of minor historical formatting.
start=text.find('          # Validate the static Seller Hub-verified eBay catalog architecture.')
end=text.find('          # Preserve Store analytics + Inventory administration foundation.', start)
if start != -1 and end != -1:
    replacement='''          # Legacy eBay catalog is recovery/reference only; current RV Store is Catalog-backed first.\n          test -f site/rv-ebay-catalog.js\n          grep -q 'window.EUS_VERIFIED_EBAY_CATALOG' site/rv-ebay-catalog.js\n          grep -q '/api/store-catalog?section=rv-outdoor' site/rv-store.js\n          grep -q 'RV & OUTDOOR GEAR' site/rv-store.html\n          grep -q 'fallbackCatalog' site/rv-store.js\n\n'''
    text=text[:start]+replacement+text[end:]

# Current page no longer uses the previous ELEVATION CATALOG display marker.
text=text.replace("printf '%s' \"$rv_html\" | grep -q 'ELEVATION CATALOG'", "printf '%s' \"$rv_html\" | grep -q 'RV & OUTDOOR GEAR'")
text=text.replace("printf '%s' \"$rv_html\" | grep -q 'VERIFIED EBAY CATALOG'", "printf '%s' \"$rv_html\" | grep -q 'RV & OUTDOOR GEAR'")

# Ensure final Admin routes are included in both preview and production route sweeps.
for base in ['/admin /admin-analytics /admin-channels', '/admin /admin-analytics /admin-channels /admin-system /admin-catalog /admin-inventory /admin-store-orders /admin-lithium-shipping']:
    if base in text:
        text=text.replace(base,'/admin /admin-analytics /admin-channels /admin-system /admin-catalog /admin-inventory /admin-store-orders /admin-lithium-shipping')

# Make final owner-facing checks authoritative.
text=text.replace("curl --silent --show-error --location --retry 6 --retry-all-errors \"${base}/admin-catalog\" | grep -q 'TikTok Shop'", "curl --silent --show-error --location --retry 6 --retry-all-errors \"${base}/admin-catalog\" | grep -q 'Products & Listings'\n          curl --silent --show-error --location --retry 6 --retry-all-errors \"${base}/admin-channels\" | grep -q 'Channels & Sync'\n          curl --silent --show-error --location --retry 6 --retry-all-errors \"${base}/admin-system\" | grep -q 'System / QA'")
text=text.replace("curl --silent --show-error --location --retry 10 --retry-all-errors --retry-delay 3 --connect-timeout 15 --max-time 45 \"${base}/admin-catalog\" | grep -q 'TikTok Shop' || return 1", "curl --silent --show-error --location --retry 10 --retry-all-errors --retry-delay 3 --connect-timeout 15 --max-time 45 \"${base}/admin-catalog\" | grep -q 'Products & Listings' || return 1\n            curl --silent --show-error --location --retry 10 --retry-all-errors --retry-delay 3 --connect-timeout 15 --max-time 45 \"${base}/admin-channels\" | grep -q 'Channels & Sync' || return 1\n            curl --silent --show-error --location --retry 10 --retry-all-errors --retry-delay 3 --connect-timeout 15 --max-time 45 \"${base}/admin-system\" | grep -q 'System / QA' || return 1")

p.write_text(text,encoding='utf-8')

# Normalize trailing whitespace in all files touched by the integration scripts.
paths=[
 'site/_worker.js','site/_routes.json','site/admin-command-center.js','site/admin-overview.js','site/admin.html','site/admin-catalog.html','site/admin-inventory.html','site/admin-lithium-shipping.html','.github/workflows/deploy-pages.yml'
]
for name in paths:
    q=Path(name)
    if not q.exists(): continue
    lines=q.read_text(encoding='utf-8').splitlines()
    q.write_text('\n'.join(line.rstrip() for line in lines)+'\n',encoding='utf-8')
print('final_admin_gate_followup=PASS')
