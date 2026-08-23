from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def read(path):
    return (ROOT / path).read_text(encoding="utf-8")


def write(path, text):
    (ROOT / path).write_text(text, encoding="utf-8")


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"{label}: expected one match, found {count}")
    return text.replace(old, new, 1)


# ---- Store page ----
store_path = "site/store.html"
store = read(store_path)
store = replace_once(
    store,
    '<link href="store-patch-8.css?v=3.0.3" rel="stylesheet"/>',
    '<link href="store-patch-8.css?v=3.0.3" rel="stylesheet"/>\n<link href="store-channel.css?v=3.11.27-rv-shop" rel="stylesheet"/>',
    "store css include",
)
store = replace_once(
    store,
    '<script defer="" src="store-patch-8.js?v=3.0.3"></script>',
    '<script defer="" src="store-patch-8.js?v=3.0.3"></script>\n<script defer="" src="store-channel-analytics.js?v=3.11.27-rv-shop"></script>',
    "store analytics script include",
)
store = replace_once(
    store,
    '<a href="/store"><span><strong>Shop the Brand</strong><small>Hats, apparel, artwork, stickers, and Elevation releases</small></span></a>\n<a href="/collector"><span><strong>Collector Series</strong><small>Explore the four-card collection and Golden Ticket</small></span></a>',
    '<a href="/store"><span><strong>Shop the Brand</strong><small>Hats, apparel, artwork, stickers, and Elevation releases</small></span></a>\n<a href="/store#rv-shop"><span><strong>RV Shop</strong><small>RV parts, accessories, travel gear, and outdoor essentials on eBay</small></span></a>\n<a href="/collector"><span><strong>Collector Series</strong><small>Explore the four-card collection and Golden Ticket</small></span></a>',
    "store dropdown rv link",
)
rv_section = '''<section aria-labelledby="rv-shop-title" class="rv-shop-intro" id="rv-shop">
<div class="container featured-shell">
<div class="rv-shop-heading"><p class="eyebrow">RV SHOP · NOW LIVE</p><h2 id="rv-shop-title">RV &amp; Outdoor Gear</h2><p>A dedicated Elevation UpScales shopping lane for RV parts, useful accessories, travel gear, and off-grid essentials. The catalog is fulfilled through our live eBay store while the Elevation website remains your starting point.</p></div>
<article class="hero-product rv-shop-product">
<div aria-label="Elevation UpScales RV project image" class="hero-product-media"><img alt="Elevation UpScales RV interior project" height="1200" loading="lazy" src="assets/rv-interior-before-after.webp" width="1200"/></div>
<div class="hero-product-copy">
<p class="hero-product-kicker">Elevation UpScales RV Shop</p>
<h2>Shop RV Parts, Gear &amp; Essentials</h2>
<p>Browse the live Elevation UpScales eBay shop for RV-focused products and useful outdoor gear. Inventory can change as supplier stock and listings are updated.</p>
<div class="rv-shop-lanes"><span>RV Essentials</span><span>Parts &amp; Accessories</span><span>Outdoor / Off-Grid</span></div>
<div class="hero-product-meta"><span class="hero-product-price">eBay Store</span><a class="button button-primary" data-store-destination="ebay" href="https://www.ebay.com/usr/elevationupscalesshop" rel="noopener" target="_blank">Shop the RV Store</a></div>
<div class="rv-shop-trust"><article><strong>Live inventory</strong><span>Listings stay current in the eBay storefront.</span></article><article><strong>Elevation curated</strong><span>A separate shopping lane from Elevation apparel and collector releases.</span></article><article><strong>Tracked handoff</strong><span>Mission Control records the anonymous website journey up to the eBay click.</span></article></div>
</div>
</article>
</div>
</section>
'''
store = replace_once(
    store,
    '<nav aria-label="Shop categories" class="shop-category-nav">',
    rv_section + '<nav aria-label="Shop categories" class="shop-category-nav">',
    "rv shop section insertion",
)
store = replace_once(
    store,
    '<button class="category-chip is-active" data-category="all" type="button">All Products</button>',
    '<a class="category-chip category-chip-link" href="#rv-shop" data-store-section-link="rv_shop">RV Shop</a>\n<button class="category-chip is-active" data-category="all" type="button">All Products</button>',
    "rv shop category chip",
)
write(store_path, store)


# ---- Admin page includes ----
admin_path = "site/admin-listings.html"
admin = read(admin_path)
admin = replace_once(
    admin,
    '<link href="/admin-market-pulse.css?v=3.11.20-visuals" rel="stylesheet">',
    '<link href="/admin-market-pulse.css?v=3.11.20-visuals" rel="stylesheet">\n<link href="/admin-store-analytics.css?v=3.11.27-rv-shop" rel="stylesheet">',
    "admin store analytics css include",
)
admin = replace_once(
    admin,
    '<script defer src="/admin-market-pulse.js?v=3.11.20-visuals"></script>',
    '<script defer src="/admin-market-pulse.js?v=3.11.20-visuals"></script>\n<script defer src="/admin-store-analytics.js?v=3.11.27-rv-shop"></script>',
    "admin store analytics script include",
)
write(admin_path, admin)


# ---- Worker analytics event contract + admin payload ----
worker_path = "site/_worker.js"
worker = read(worker_path)
worker = replace_once(
    worker,
    '  "work_with_us_open", "opportunity_type_selected", "opportunity_form_started", "opportunity_submitted"\n]);',
    '  "store_open", "store_section_view", "store_category_select", "store_search_used", "store_sort_changed", "store_destination_click", "store_product_click",\n  "work_with_us_open", "opportunity_type_selected", "opportunity_form_started", "opportunity_submitted"\n]);',
    "site intent store event types",
)
worker = replace_once(
    worker,
    '  "solar_builder_open", "work_with_us_open", "marketplace_open", "listing_interest"\n]);',
    '  "solar_builder_open", "work_with_us_open", "marketplace_open", "listing_interest",\n  "store_open", "store_destination_click"\n]);',
    "analytics engine store event types",
)
worker = replace_once(
    worker,
    '  const allowedStrings = new Set(["package", "classification", "projectType", "intakeIntent", "serviceArea", "source", "status", "journeyReference", "contactMethod", "visitorMarket", "cta_id", "source_page", "contact_method", "build", "buildReference", "builderStage", "builderStep", "milestone"]);',
    '  const allowedStrings = new Set(["package", "classification", "projectType", "intakeIntent", "serviceArea", "source", "status", "journeyReference", "contactMethod", "visitorMarket", "cta_id", "source_page", "contact_method", "build", "buildReference", "builderStage", "builderStep", "milestone", "destination", "section", "category", "product", "referrerHost", "utmSource", "utmMedium", "utmCampaign"]);',
    "store analytics detail keys",
)
validation_old = '  if (eventType === "contact_click" && !["call", "text", "email", "follow_up_request"].includes(value)) return jsonResponse({ error: "Invalid contact method" }, 400);'
validation_new = validation_old + '\n  if (eventType === "store_destination_click" && !["ebay", "fourthwall", "collector"].includes(value)) return jsonResponse({ error: "Invalid Store destination" }, 400);\n  if (eventType === "store_product_click" && !["ebay", "fourthwall", "collector"].includes(value)) return jsonResponse({ error: "Invalid Store product destination" }, 400);\n  if (eventType === "store_section_view" && !["rv_shop", "brand_catalog"].includes(value)) return jsonResponse({ error: "Invalid Store section" }, 400);'
worker = replace_once(worker, validation_old, validation_new, "store event validation")

store_backend = r'''
    let storeAnalytics = {
      sessions: 0, rvShopSessions: 0,
      ebayClicks: 0, ebayClickSessions: 0,
      fourthwallClicks: 0, fourthwallClickSessions: 0,
      collectorClicks: 0, collectorClickSessions: 0,
      productClicks: 0, categorySelections: 0, searchUses: 0,
      ebayCtr: null, recentEvents: []
    };
    try {
      const storeMetricRow = await env.MARKETPLACE_DB.prepare(`SELECT
        COUNT(DISTINCT CASE WHEN event_type='store_open' THEN session_hash END) AS store_sessions,
        COUNT(DISTINCT CASE WHEN event_type='store_section_view' AND event_value='rv_shop' THEN session_hash END) AS rv_shop_sessions,
        SUM(CASE WHEN event_type='store_destination_click' AND event_value='ebay' THEN 1 ELSE 0 END) AS ebay_clicks,
        COUNT(DISTINCT CASE WHEN event_type='store_destination_click' AND event_value='ebay' THEN session_hash END) AS ebay_click_sessions,
        SUM(CASE WHEN event_type='store_destination_click' AND event_value='fourthwall' THEN 1 ELSE 0 END) AS fourthwall_clicks,
        COUNT(DISTINCT CASE WHEN event_type='store_destination_click' AND event_value='fourthwall' THEN session_hash END) AS fourthwall_click_sessions,
        SUM(CASE WHEN event_type='store_destination_click' AND event_value='collector' THEN 1 ELSE 0 END) AS collector_clicks,
        COUNT(DISTINCT CASE WHEN event_type='store_destination_click' AND event_value='collector' THEN session_hash END) AS collector_click_sessions,
        SUM(CASE WHEN event_type='store_product_click' THEN 1 ELSE 0 END) AS product_clicks,
        SUM(CASE WHEN event_type='store_category_select' THEN 1 ELSE 0 END) AS category_selections,
        SUM(CASE WHEN event_type='store_search_used' THEN 1 ELSE 0 END) AS search_uses
        FROM eus_site_events
        WHERE created_at>=? AND created_at<=?`).bind(window.start, window.end).first();
      const storeSessions = Math.max(0, Number(storeMetricRow?.store_sessions) || 0);
      const rvShopSessions = Math.max(0, Number(storeMetricRow?.rv_shop_sessions) || 0);
      const ebayClickSessions = Math.max(0, Number(storeMetricRow?.ebay_click_sessions) || 0);
      const storeEventRows = await env.MARKETPLACE_DB.prepare(`SELECT
        substr(session_hash,1,10) AS visitor_tag,
        event_type, event_value, page, details_json, created_at
        FROM eus_site_events
        WHERE created_at>=? AND created_at<=?
          AND event_type IN ('store_open','store_section_view','store_category_select','store_search_used','store_sort_changed','store_destination_click','store_product_click')
        ORDER BY created_at DESC LIMIT 80`).bind(window.start, window.end).all();
      storeAnalytics = {
        sessions: storeSessions,
        rvShopSessions,
        ebayClicks: Math.max(0, Number(storeMetricRow?.ebay_clicks) || 0),
        ebayClickSessions,
        fourthwallClicks: Math.max(0, Number(storeMetricRow?.fourthwall_clicks) || 0),
        fourthwallClickSessions: Math.max(0, Number(storeMetricRow?.fourthwall_click_sessions) || 0),
        collectorClicks: Math.max(0, Number(storeMetricRow?.collector_clicks) || 0),
        collectorClickSessions: Math.max(0, Number(storeMetricRow?.collector_click_sessions) || 0),
        productClicks: Math.max(0, Number(storeMetricRow?.product_clicks) || 0),
        categorySelections: Math.max(0, Number(storeMetricRow?.category_selections) || 0),
        searchUses: Math.max(0, Number(storeMetricRow?.search_uses) || 0),
        ebayCtr: rvShopSessions > 0 ? Math.round((ebayClickSessions / rvShopSessions) * 1000) / 10 : null,
        recentEvents: (storeEventRows.results || []).map((row) => {
          const details = parseJsonObject(row.details_json);
          return {
            visitorTag: cleanString(row.visitor_tag, 12) || "anonymous",
            eventType: cleanString(row.event_type, 60),
            eventValue: cleanString(row.event_value, 120),
            page: analyticsPath(row.page || "/store"),
            destination: cleanString(details.destination, 40),
            section: cleanString(details.section, 60),
            category: cleanString(details.category, 60),
            product: cleanString(details.product, 120),
            referrerHost: cleanString(details.referrerHost, 120),
            utmSource: cleanString(details.utmSource, 80),
            utmMedium: cleanString(details.utmMedium, 80),
            utmCampaign: cleanString(details.utmCampaign, 120),
            createdAt: cleanString(row.created_at, 80),
          };
        })
      };
    } catch (error) {
      console.error(JSON.stringify({ event: "admin_store_analytics_error", message: error instanceof Error ? error.message : String(error) }));
    }
'''
pattern = re.compile(r'(\n\s*const selectedBreakdown = Object\.fromEntries\([^\n]+\);\n)(\n\s*const payload = \{)')
match = pattern.search(worker)
if not match:
    raise RuntimeError("admin market analytics insertion anchor not found")
worker = worker[:match.end(1)] + store_backend + worker[match.start(2):]
worker = replace_once(
    worker,
    '      overall, selected, markets: allMarkets, selectedBreakdown, projectDataAvailable,',
    '      overall, selected, markets: allMarkets, selectedBreakdown, projectDataAvailable, store: storeAnalytics,',
    "store analytics payload field",
)
write(worker_path, worker)

print("RV Shop integration patch applied successfully")
