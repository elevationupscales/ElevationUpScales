from pathlib import Path
import json

SITE = Path('site')

def replace(path, old, new, required=True):
    p = Path(path)
    text = p.read_text(encoding='utf-8')
    if old not in text:
        if required:
            raise SystemExit(f'anchor missing in {path}: {old[:120]}')
        return False
    p.write_text(text.replace(old, new, 1), encoding='utf-8')
    return True

# Worker: add protected sync runtime and APIs without changing checkout/Hawaii behavior.
p = SITE/'_worker.js'; text=p.read_text()
anchor='import { handleHawaiiLithiumAdminApi, handleHawaiiLithiumPublicApi } from "./hawaii-lithium-runtime.js";'
if 'handleSyncAdminApi' not in text:
    text=text.replace(anchor, anchor+'\nimport { handleSyncAdminApi, handleSyncScheduledApi } from "./sync-admin-runtime.js";')
text=text.replace('admin-command-center.js?v=4.3.5','admin-command-center.js?v=4.3.7')
text=text.replace('"/hawaii-lithium-runtime.js"]','"/hawaii-lithium-runtime.js", "/sync-admin-runtime.js"]')
route='''    if (url.pathname === "/api/admin/lithium-shipping" || url.pathname.startsWith("/api/admin/lithium-shipping/")) {
      return handleHawaiiLithiumAdminApi(request, env, url.pathname);
    }
'''
if '/api/admin/sync' not in text:
    text=text.replace(route,route+'''\n    if (url.pathname === "/api/admin/sync" || url.pathname.startsWith("/api/admin/sync/")) {
      return handleSyncAdminApi(request, env, url.pathname);
    }

    if (url.pathname === "/api/sync/run") {
      return handleSyncScheduledApi(request, env, url.pathname);
    }
''')
p.write_text(text)

# Pages routes: force server runtime through Worker so source code cannot leak.
p=SITE/'_routes.json'; data=json.loads(p.read_text())
if '/sync-admin-runtime.js' not in data['include']: data['include'].append('/sync-admin-runtime.js')
p.write_text(json.dumps(data,indent=2)+'\n')

# Shared Admin shell final labels / System page / sync module.
p=SITE/'admin-command-center.js'; text=p.read_text()
text=text.replace('["Products / Import Center","/admin-catalog","products"]','["Products & Listings","/admin-catalog","products"]')
text=text.replace('["Channels / Stores","/admin-channels","channels"]','["Channels & Sync","/admin-channels","channels"]')
text=text.replace('["System / QA","/admin-listings#system","system"]','["System / QA","/admin-system","system"]')
text=text.replace('if(p.includes("admin-analytics"))return"analytics";','if(p.includes("admin-analytics"))return"analytics";\n    if(p.includes("admin-system"))return"system";')
text=text.replace('pass.href="/admin-command-center-pass1.css?v=4.3.5"','pass.href="/admin-command-center-pass1.css?v=4.3.7"')
text=text.replace('link.href="/admin-command-center.css?v=4.3.5"','link.href="/admin-command-center.css?v=4.3.7"')
if 'const getSync=' not in text:
    text=text.replace('const getLithium=()=>api("/api/admin/lithium-shipping");','const getLithium=()=>api("/api/admin/lithium-shipping");\n  const getSync=()=>api("/api/admin/sync");')
    text=text.replace('settle("analytics",getAnalytics),settle("lithium",getLithium)','settle("analytics",getAnalytics),settle("lithium",getLithium),settle("sync",getSync)')
    text=text.replace('getOperations,getAnalytics,getLithium,orderActions','getOperations,getAnalytics,getLithium,getSync,orderActions')
text=text.replace('review:products.filter(p=>p.publishStatus==="hold"||p.shippingStatus!=="verified"||Boolean(p.reviewState)).length,','review:products.filter(p=>p.publishStatus==="hold"||Boolean(p.reviewState)).length,')
p.write_text(text)

# Overview: add sync-derived action queues.
p=SITE/'admin-overview.js'; text=p.read_text()
if 'const syncState=' not in text:
    text=text.replace('const catalogState=D().catalogActions(catalog);','const catalogState=D().catalogActions(catalog);\n    const syncState=snapshot.sync.ok?(snapshot.sync.data||{}):{};\n    const syncCounts=syncState.counts||{};')
    needle='''      action("Products needing review",snapshot.catalog.ok?catalogState.review:"N/A","Catalog hold, shipping, or review-state product exceptions.","/admin-catalog",""),'''
    repl='''      action("Products ready to publish",snapshot.sync.ok?syncCounts.ready:"N/A","Products that pass current server-side listing readiness gates.","/admin-catalog",syncCounts.ready?"is-warning":""),
      action("Products needing review",snapshot.sync.ok?syncCounts.review:(snapshot.catalog.ok?catalogState.review:"N/A"),"Actionable product identity, cost, stock, shipping, margin, HOLD, or mapping blockers.","/admin-catalog",syncCounts.review?"is-warning":""),
      action("Listings out of sync",snapshot.sync.ok?syncCounts.outOfSync:"N/A","Channel/source relationships needing review, recheck, or configuration.","/admin-channels",syncCounts.outOfSync?"is-warning":""),
      action("Sync errors / stale",snapshot.sync.ok?((syncCounts.syncError||0)+(syncCounts.stale||0)):"N/A","Automation errors and supplier/source observations needing a fresh check.","/admin-system",(syncCounts.syncError||syncCounts.stale)?"is-urgent":""),'''
    text=text.replace(needle,repl)
p.write_text(text)

# Overview wording/links.
p=SITE/'admin.html'; text=p.read_text()
text=text.replace('Add / Import Products','Products & Listings')
text=text.replace('Channels / Stores','Channels & Sync')
text=text.replace('Shipping & Hawaii Lithium','Shipping & Logistics')
text=text.replace('Exact-SKU qualification, route evidence, reservations and freight batches.','Hawaii reservations, route evidence, freight batches, blockers and advanced lithium controls.')
p.write_text(text)

# Catalog owner-facing final identity + readiness overlay.
p=SITE/'admin-catalog.html'; text=p.read_text()
text=text.replace('<title>Store Catalog Manager |','<title>Products & Listings |')
text=text.replace('<h1>Store Catalog Manager</h1>','<h1>Products & Listings</h1>')
text=text.replace('Create, import, review, publish, pause, and maintain one Elevation master product catalog across Doba, eBay, Fourthwall, and other suppliers.','One master Elevation product catalog with clear listing readiness, source relationships, HOLD controls, and channel mappings.')
text=text.replace('Lithium Shipping Matrix','Shipping & Logistics')
text=text.replace('Sign in to Store Catalog Manager','Sign in to Products & Listings')
text=text.replace('Public stores can migrate to these normalized records in later isolated releases. This release does not replace the current RV/Apparel/Lithium storefront feeds.','Catalog is the commerce product master. The Elevation website consumes published catalog records where integrated; channel/source state is monitored separately in Channels & Sync.')
if 'admin-products-final.js' not in text:
    text=text.replace('</head>','<script defer src="/rv-ebay-catalog.js?v=3.11.35"></script><script defer src="/admin-products-final.js?v=4.3.7"></script></head>')
p.write_text(text)

# Inventory wording: preserve physical-vs-supplier-managed model and point to final workspace names.
p=SITE/'admin-inventory.html'; text=p.read_text()
text=text.replace('Build and maintain one operational inventory list with live stock visibility and change history.','Track physical Elevation stock separately from supplier-managed availability, current supplier cost, and source freshness.')
text=text.replace('>Catalog Manager<','>Products & Listings<')
text=text.replace('Working Inventory','Source & Stock State')
p.write_text(text)

# Shipping links retain advanced backend but present final owner-facing naming.
p=SITE/'admin-lithium-shipping.html'; text=p.read_text()
text=text.replace('>Store Catalog<','>Products & Listings<')
text=text.replace('>Mission Control<','>Overview<')
p.write_text(text)

# Update permanent deployment gate: final Admin OS, current Elevation RV Catalog, sync runtime, and System/QA.
p=Path('.github/workflows/deploy-pages.yml'); text=p.read_text()
text=text.replace('test -f site/admin-channels.js','test -f site/admin-channels.js\n          test -f site/admin-system.html\n          test -f site/admin-system.js\n          test -f site/admin-products-final.js\n          test -f site/sync-admin-runtime.js')
text=text.replace("grep -q 'Admin Command Center' site/admin.html","grep -q 'Admin Command Center' site/admin.html\n          grep -q 'Products & Listings' site/admin-catalog.html\n          grep -q 'Channels & Sync' site/admin-channels.html\n          grep -q 'System / QA' site/admin-system.html\n          grep -q '/api/admin/sync' site/_worker.js\n          grep -q '/api/sync/run' site/_worker.js")
# Retire obsolete eBay-only RV assertions while retaining the legacy file as recovery reference.
text=text.replace("          # Validate the static Seller Hub-verified eBay catalog architecture.\n          grep -q 'rv-ebay-catalog.js?v=3.11.35' site/rv-store.html\n          grep -q 'window.EUS_VERIFIED_EBAY_CATALOG' site/rv-ebay-catalog.js\n          grep -q 'window.EUS_VERIFIED_EBAY_CATALOG' site/rv-store.js\n          grep -q 'elevationupscalesshop' site/rv-store.js\n          ! grep -q '/api/store-inventory' site/rv-store.js\n          python - <<'PY'\n          import re\n          from pathlib import Path\n          catalog = Path('site/rv-ebay-catalog.js').read_text(encoding='utf-8')\n          ids = re.findall(r'\\[\"(\\d{12})\",', catalog)\n          assert len(ids) >= 10, f'expected a populated eBay catalog, got {len(ids)} items'\n          assert len(ids) == len(set(ids)), 'duplicate eBay item numbers found'\n          html = Path('site/rv-store.html').read_text(encoding='utf-8')\n          assert html.index('rv-ebay-catalog.js') < html.index('rv-store.js'), 'catalog must load before renderer'\n          assert 'rv-store-hero__media' not in html, 'retired RV hero image block returned'\n          print('verified_ebay_items=', len(ids))\n          PY\n", "          # Legacy eBay catalog remains recovery/reference only; live RV Store is Catalog-backed.\n          test -f site/rv-ebay-catalog.js\n          grep -q 'window.EUS_VERIFIED_EBAY_CATALOG' site/rv-ebay-catalog.js\n          grep -q 'ELEVATION CATALOG' site/rv-store.html\n          grep -q '/api/store-catalog?section=rv-outdoor' site/rv-store.js\n          ! grep -q 'VERIFIED EBAY CATALOG' site/rv-store.html\n")
text=text.replace("/admin /admin-analytics /admin-channels","/admin /admin-analytics /admin-channels /admin-system /admin-catalog /admin-inventory /admin-store-orders /admin-lithium-shipping")
text=text.replace("printf '%s' \"$rv_html\" | grep -q 'VERIFIED EBAY CATALOG'","printf '%s' \"$rv_html\" | grep -q 'ELEVATION CATALOG'")
text=text.replace("curl --silent --show-error --location --retry 6 --retry-all-errors \"${base}/admin-catalog\" | grep -q 'TikTok Shop'","curl --silent --show-error --location --retry 6 --retry-all-errors \"${base}/admin-catalog\" | grep -q 'Products & Listings'\n          curl --silent --show-error --location --retry 6 --retry-all-errors \"${base}/admin-channels\" | grep -q 'Channels & Sync'")
text=text.replace("curl --silent --show-error --location --retry 10 --retry-all-errors --retry-delay 3 --connect-timeout 15 --max-time 45 \"${base}/admin-catalog\" | grep -q 'TikTok Shop' || return 1","curl --silent --show-error --location --retry 10 --retry-all-errors --retry-delay 3 --connect-timeout 15 --max-time 45 \"${base}/admin-catalog\" | grep -q 'Products & Listings' || return 1\n            curl --silent --show-error --location --retry 10 --retry-all-errors --retry-delay 3 --connect-timeout 15 --max-time 45 \"${base}/admin-channels\" | grep -q 'Channels & Sync' || return 1")
p.write_text(text)

print('final_admin_operating_system_patch=PASS')
