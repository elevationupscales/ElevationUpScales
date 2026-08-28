from pathlib import Path
import re

SITE = Path('site')
CURRENT_SHELL = '3.11.46'

SHOP_LINKS = '''
<a href="/store"><span><strong>Apparel Store</strong><small>Hats, apparel, artwork, stickers, and official Elevation releases</small></span></a>
<a href="/rv-store"><span><strong>RV &amp; Outdoor Store</strong><small>RV parts, accessories, camping gear, travel items, and off-grid essentials</small></span></a>
<a href="/lithium-batteries"><span><strong>Lithium Battery Shop</strong><small>LiFePO4 batteries for RV, solar, van, and off-grid power</small></span></a>
<a href="/hawaii-lithium-batteries"><span><strong>Hawaii Lithium Shipping</strong><small>Hawaii eligibility, rates, and island shipping information</small></span></a>
<a href="/collector"><span><strong>Collector Series</strong><small>Explore the four-card collection and Golden Ticket</small></span></a>
'''.strip()

shop_pattern = re.compile(
    r'(<details\s+class="[^"]*eus-menu--shop[^"]*"[^>]*>\s*<summary[\s\S]*?</summary>\s*<div\s+class="[^"]*eus-dropdown[^"]*"[^>]*>)[\s\S]*?(</div>\s*</details>)',
    re.I,
)

changed_nav = 0
for path in SITE.glob('*.html'):
    text = path.read_text()
    original = text
    text = re.sub(r'site-shell\.js\?v=[A-Za-z0-9._-]+', f'site-shell.js?v={CURRENT_SHELL}', text)
    text = text.replace('Shop the Brand', 'Apparel Store')
    if 'eus-menu--shop' in text:
        text, count = shop_pattern.subn(lambda m: m.group(1) + '\n' + SHOP_LINKS + '\n' + m.group(2), text, count=1)
        if count:
            changed_nav += 1
    if text != original:
        path.write_text(text)

# Checkout nested page also receives the fresh shell cache key.
checkout = SITE / 'checkout' / 'index.html'
if checkout.exists():
    text = checkout.read_text()
    text = re.sub(r'site-shell\.js\?v=[A-Za-z0-9._-]+', f'site-shell.js?v={CURRENT_SHELL}', text)
    checkout.write_text(text)

# Homepage storefront positioning: no longer "two storefronts" and expose lithium directly.
index = SITE / 'index.html'
text = index.read_text()
text = text.replace('Two storefronts. One Elevation experience.', 'Apparel, RV & outdoor, and lithium power — one Elevation experience.')
text = text.replace(
    'Shop official Elevation apparel and releases, or browse RV parts, camping gear, travel accessories and off-grid essentials in the dedicated RV &amp; Outdoor Store.',
    'Shop official Elevation apparel, curated RV and outdoor gear, LiFePO4 batteries, and off-grid power products through Elevation storefronts.'
)
if 'data-home-store-lithium' not in text:
    anchor = '<a class="button button-outline" href="/rv-store" data-home-store-rv>Shop RV &amp; Outdoor</a>'
    replacement = anchor + '\n<a class="button button-outline" href="/lithium-batteries" data-home-store-lithium>Shop Lithium Batteries</a>\n<a class="text-link-inline" href="/hawaii-lithium-batteries">Hawaii Lithium Shipping →</a>'
    text = text.replace(anchor, replacement, 1)
text = text.replace('Browse what is live now, then jump directly into either dedicated storefront.', 'Browse what is live now, then shop directly through Elevation.')
text = text.replace('Marketplace + Apparel', 'Marketplace + Elevation Stores')
text = text.replace('Featured marketplace finds and official Elevation releases.', 'Featured marketplace finds and products from Elevation storefronts.')
index.write_text(text)

# RV Store: Elevation catalog is primary; eBay is fallback/acquisition, not the identity of the storefront.
rv = SITE / 'rv-store.html'
text = rv.read_text()
text = text.replace('Shop verified Elevation UpScales eBay listings for RV parts, accessories, camping gear, travel items, and off-grid essentials.', 'Shop curated Elevation UpScales RV, camping, solar, and off-grid products with protected direct checkout and marketplace fallback where needed.')
text = text.replace('Browse verified products from the Elevation UpScales eBay shop. Verified products can use secure Elevation checkout; anything not approved continues to the exact eBay listing.', 'Browse products published through the Elevation catalog. Approved products can use secure Elevation checkout; products that still require marketplace fulfillment keep their protected fallback.')
text = text.replace('<strong>Seller Hub verified</strong><span>Each product is matched to Elevation UpScales eBay inventory.</span>', '<strong>Elevation catalog</strong><span>Published products are managed through Elevation inventory and supplier records.</span>')
text = text.replace('<strong>Safe checkout routing</strong><span>Verified items can check out with Elevation; all other items keep the exact eBay fallback.</span>', '<strong>Protected checkout routing</strong><span>Only approved products use Elevation checkout; unresolved shipping or supplier records stay on a safe fallback.</span>')
text = text.replace('<strong>Separate storefront</strong><span>RV and outdoor gear stays distinct from Elevation apparel.</span>', '<strong>Curated inventory</strong><span>RV, camping, solar, and off-grid products stay focused instead of becoming an unfiltered supplier dump.</span>')
text = text.replace('<a class="is-current" href="/rv-store">RV &amp; Outdoor Store</a><a href="/collector">Collector Series</a>', '<a class="is-current" href="/rv-store">RV &amp; Outdoor Store</a><a href="/lithium-batteries">Lithium Batteries</a><a href="/hawaii-lithium-batteries">Hawaii Lithium Shipping</a><a href="/collector">Collector Series</a>')
text = text.replace('VERIFIED EBAY CATALOG', 'ELEVATION CATALOG')
text = text.replace('Loading verified eBay catalog…', 'Loading Elevation catalog…')
text = text.replace('<strong><span id="rv-count">0</span> products</strong><span>Verified from Elevation UpScales Seller Hub</span>', '<strong><span id="rv-count">Loading</span> products</strong><span>Published through Elevation catalog management</span>')
text = text.replace('<h3>No products match your search.</h3><p>Clear the search or browse the current eBay store.</p><a class="button button-primary" href="https://www.ebay.com/usr/elevationupscalesshop" target="_blank" rel="noopener">Browse Current eBay Store</a>', '<h3>No products match your search.</h3><p>Clear the search, browse Lithium Batteries, or check back as new Elevation catalog products are published.</p><a class="button button-primary" href="/lithium-batteries">Browse Lithium Batteries</a>')
text = text.replace('rv-store.js?v=3.11.37', 'rv-store.js?v=3.11.46')
rv.write_text(text)

# Marketplace static state should not imply a filter failure before its API loads.
market = SITE / 'marketplace.html'
text = market.read_text()
text = text.replace('<span data-marketplace-count="">Loading</span> listings', '<span data-marketplace-count="">Loading</span> listings')
text = text.replace('<h3>No listings match those filters.</h3><p>Clear the filters, try another category, or like another listing.</p>', '<h3>No active listings are published right now.</h3><p>New approved listings will appear here automatically. You can also submit an RV, vehicle, or eligible gear listing for review.</p>')
text = text.replace('marketplace-feed.js?v=3.3.6', 'marketplace-feed.js?v=3.11.46')
market.write_text(text)

# Add public read-only catalog API backed by the same normalized Catalog Manager tables.
runtime = SITE / 'catalog-admin-runtime.js'
text = runtime.read_text()
if 'handleCatalogPublicApi' not in text:
    text += r'''

export async function handleCatalogPublicApi(request, env, pathname) {
  if (request.method !== "GET" && request.method !== "HEAD") return json({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  let db;
  try { db = await ensureSchema(env); await seedKnown(db); }
  catch (error) { return json({ products: [], count: 0, error: clean(error?.message, 240) || "Catalog unavailable" }, 503); }
  const url = new URL(request.url);
  const requestedSection = clean(url.searchParams.get("section") || "", 50).toLowerCase();
  const allowedSection = STORE_SECTIONS.has(requestedSection) ? requestedSection : "";
  const where = allowedSection ? "WHERE m.publish_status='published' AND m.store_section=?" : "WHERE m.publish_status='published'";
  const query = `SELECT i.*,m.source_type,m.description,m.supplier_sku,m.supplier_stock,m.shipping_status,m.shipping_cents,m.primary_image,m.images_json,m.ebay_item_id,m.fourthwall_product_id,m.store_section,m.publish_status,m.review_state,m.created_by,m.updated_by AS catalog_updated_by,m.created_at AS catalog_created_at,m.updated_at AS catalog_updated_at FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id ${where} ORDER BY m.updated_at DESC LIMIT 200`;
  const result = allowedSection ? await db.prepare(query).bind(allowedSection).all() : await db.prepare(query).all();
  const products = (result.results || []).map(catalogRow).map((p) => ({
    id: p.id, sku: p.sku, title: p.title, description: p.description, category: p.category,
    supplier: p.supplier, sourceType: p.sourceType, fulfillmentMode: p.fulfillmentMode,
    priceCents: p.priceCents, supplierStock: p.supplierStock, shippingStatus: p.shippingStatus,
    shippingCents: p.shippingCents, primaryImage: p.primaryImage, images: p.images,
    sourceUrl: p.sourceUrl, ebayItemId: p.ebayItemId, salesChannels: p.salesChannels,
    storeSection: p.storeSection, publishStatus: p.publishStatus, updatedAt: p.updatedAt
  }));
  return json({ products, count: products.length, section: allowedSection || "all" }, 200, { "Cache-Control": "public, max-age=30, s-maxage=60" });
}
'''
    runtime.write_text(text)

worker = SITE / '_worker.js'
text = worker.read_text()
text = text.replace('import { handleCatalogAdminApi } from "./catalog-admin-runtime.js";', 'import { handleCatalogAdminApi, handleCatalogPublicApi } from "./catalog-admin-runtime.js";')
anchor = '''    if (url.pathname === "/api/admin/catalog" || url.pathname.startsWith("/api/admin/catalog/")) {
      return handleCatalogAdminApi(request, env, url.pathname);
    }
'''
addition = '''    if (url.pathname === "/api/store-catalog") {
      return handleCatalogPublicApi(request, env, url.pathname);
    }

''' + anchor
if 'url.pathname === "/api/store-catalog"' not in text:
    if anchor not in text:
        raise SystemExit('Catalog admin routing anchor not found')
    text = text.replace(anchor, addition, 1)
worker.write_text(text)

print(f'nav_files_updated={changed_nav}')
