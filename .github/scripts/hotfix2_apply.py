from pathlib import Path
import re

ROOT = Path('site')

def read(name):
    return (ROOT / name).read_text(encoding='utf-8')

def write(name, text):
    (ROOT / name).write_text(text, encoding='utf-8')

def replace_required(text, old, new, label, count=None):
    hits = text.count(old)
    if hits == 0:
        raise SystemExit(f'missing marker: {label}')
    if count is not None and hits != count:
        raise SystemExit(f'unexpected marker count {label}: {hits}')
    return text.replace(old, new)

# 1) Shared shell: retire duplicate homepage capability injection and simplify Hawaii navigation.
name = 'site-shell.js'
s = read(name)
pattern = re.compile(r'\n  const homePath = location\.pathname === "/" \|\| location\.pathname === "/index\.html";\n  if \(homePath && !document\.querySelector\(\'script\[data-eus-home-capabilities\]\'\)\) \{.*?\n  \}\n\n  const shopMenu', re.S)
s, n = pattern.subn('\n\n  const shopMenu', s, count=1)
if n != 1:
    raise SystemExit('homepage capability injection block not found exactly once')
s = replace_required(s, '["/hawaii-lithium-batteries", "Hawaii Lithium Shipping & Freight", "Hawaii consolidated freight · Alaska quote options"]', '["/hawaii-lithium-batteries", "Hawaii Lithium Batteries", "Honolulu pickup pricing · Hawaii battery availability"]', 'shared Hawaii shop nav', 1)
s = s.replace('/* Elevation UpScales shared navigation 3.11.32 capability rail */', '/* Elevation UpScales shared navigation 4.5.2 commerce cleanup */')
write(name, s)

# Shared cache-bust on primary customer/indexable surfaces without changing page architecture.
primary = ['index.html','what-we-do.html','home-services.html','rv-services.html','solar-services.html','solar-project.html','start-a-project.html','store.html','rv-store.html','lithium-batteries.html','hawaii-lithium-batteries.html','marketplace.html','make-a-listing.html','work-with-us.html','privacy.html','terms.html','product.html']
for page in primary:
    p = ROOT / page
    if not p.exists():
        continue
    t = p.read_text(encoding='utf-8')
    t = t.replace('site-shell.js?v=3.11.46', 'site-shell.js?v=4.5.2')
    p.write_text(t, encoding='utf-8')

# 2) Homepage approved imagery + customer-oriented Hawaii label. Replace existing requests; do not add image count.
name = 'index.html'
s = read(name)
s = replace_required(s, "--route-image:url('/assets/elevation-lithium-social-card.webp')", "--route-image:url('/assets/homepage-option-2-lithium-solar.webp')", 'homepage lithium route visual', 1)
s = replace_required(s, '<img class="hc-media-img" src="/assets/rvs/1975-winnebago-brave-features-layout.webp" alt="Vintage Winnebago Brave layout and RV features" width="1600" height="900" loading="lazy" decoding="async">', '<img class="hc-media-img" src="/assets/homepage-option-3-home-rv-lifestyle.webp" alt="Home, RV and off-grid outdoor lifestyle" width="960" height="540" loading="lazy" decoding="async">', 'homepage lifestyle visual', 1)
s = s.replace('>Hawaii Lithium Shipping &amp; Freight</a>', '>Hawaii Lithium Batteries</a>')
write(name, s)

# 3/4/5/10) Hawaii: products first, simple customer language, current crawl signals, review path de-emphasized.
name = 'hawaii-lithium-batteries.html'
s = read(name)
s = s.replace('<title>Hawaii Lithium Shipping &amp; Freight | Elevation UpScales</title>', '<title>Hawaii Lithium Batteries | Honolulu Pickup | Elevation UpScales</title>')
s = s.replace('content="View current Elevation lithium inventory and buy eligible batteries with $99-per-battery freight to the Honolulu warehouse / freight-terminal pickup location."', 'content="Shop current Elevation lithium batteries for Hawaii. Eligible batteries use $99-per-battery freight to the Honolulu warehouse / freight-terminal pickup location; address delivery is quoted separately where available."')
s = s.replace('<a class="skip-link" href="#hawaii-request">Skip to Hawaii availability request</a>', '<a class="skip-link" href="#hawaii-products">Skip to Hawaii battery listings</a>')
s = s.replace('<strong>Lithium Shipping &amp; Freight</strong><small>Hawaii consolidated freight · warehouse pickup</small>', '<strong>Hawaii Lithium Batteries</strong><small>Honolulu pickup pricing · Hawaii battery availability</small>')
s = s.replace('<h1>Hawaii Lithium Shipping &amp; Freight</h1>', '<h1>Hawaii Lithium Batteries</h1>')
s = s.replace('Shop the same Elevation Lithium Store inventory and check the current Hawaii shipping state for each battery. Eligible orders use $99-per-battery freight to the Honolulu warehouse / freight-terminal pickup location. Elevation handles the freight coordination and sends the customer the pickup details when confirmed.', 'Shop current Elevation lithium batteries for Hawaii and see the shipping state for each exact battery. Eligible orders use $99-per-battery freight to the Honolulu warehouse / freight-terminal pickup location. Elevation handles the freight coordination and sends pickup details when confirmed.')
s = s.replace('<a class="button button-outline" href="#hawaii-request">Request / Reserve</a>', '<a class="text-link-inline" href="#hawaii-request">Need a Shipping Review?</a>')
s = s.replace('<label>Island / destination<select name="island" required><option>Oahu</option>', '<label>Island / destination <small>(optional)</small><select name="island"><option value="">Honolulu pickup / not sure</option><option>Oahu</option>')
# Move the existing single-Catalog product section directly after hero and before process/education.
product_re = re.compile(r'\n<section class="lithium-market" id="hawaii-products">.*?</section>', re.S)
m = product_re.search(s)
if not m:
    raise SystemExit('Hawaii product section not found')
product_section = m.group(0)
s = s[:m.start()] + s[m.end():]
hero_end = '</section>\n<section class="section" id="how-it-works">'
if hero_end not in s:
    raise SystemExit('Hawaii hero/how-it-works boundary not found')
s = s.replace(hero_end, '</section>' + product_section + '\n<section class="section" id="how-it-works">', 1)
write(name, s)

# 5/6/12) Static retail navigation and Hawaii/Alaska product-detail wording.
nav_files = ['store.html','rv-store.html','lithium-batteries.html','product.html']
for name in nav_files:
    s = read(name)
    s = s.replace('<strong>Hawaii Lithium Shipping &amp; Freight</strong><small>Hawaii consolidated freight · Alaska quote options</small>', '<strong>Hawaii Lithium Batteries</strong><small>Honolulu pickup pricing · Hawaii battery availability</small>')
    s = s.replace('<strong>Lithium Shipping &amp; Freight</strong><small>Hawaii consolidated freight · Alaska quote options</small>', '<strong>Hawaii Lithium Batteries</strong><small>Honolulu pickup pricing · Hawaii battery availability</small>')
    write(name, s)

name = 'lithium-batteries.html'
s = read(name)
s = s.replace('Shipping to Alaska or Hawaii? See lithium shipping &amp; freight options.', 'Shipping to Hawaii? Shop Hawaii lithium battery listings. Alaska shipping remains freight review required.')
s = s.replace('<p class="eyebrow">LITHIUM SHIPPING &amp; FREIGHT</p><h2>Shipping to Alaska or Hawaii?</h2>', '<p class="eyebrow">HAWAII LITHIUM BATTERIES</p><h2>Buying a battery for Hawaii?</h2>')
s = s.replace('Hawaii lithium batteries use consolidated freight at <strong>$99 per actual battery</strong> with warehouse or freight-terminal pickup. Alaska routing remains quote required where exact service and pricing have not been verified.', 'Eligible Hawaii batteries use <strong>$99 per actual battery</strong> to the Honolulu warehouse / freight-terminal pickup location. Delivery beyond pickup is a separate quote where available. Alaska shipping remains Freight Review Required.')
s = s.replace('View Shipping &amp; Freight Options →', 'Shop Hawaii Lithium Batteries →')
write(name, s)

name = 'product.html'
s = read(name)
s = s.replace('Shipping to Alaska or Hawaii? View shipping &amp; freight options →', 'Shipping to Hawaii? Shop Hawaii lithium battery listings →')
write(name, s)

# Remove customer-visible eBay query plumbing from product detail checkout URL; authoritative server fallback remains separate.
name = 'product-detail.js'
s = read(name)
s, n = re.subn(r'\n    const ebay = clean\(product\?\.ebayItemId, 20\);\n    if \(sectionFor\(product\) === "rv" && /\^\\d\{12\}\$/\.test\(ebay\)\) url \+= `&ebay=\$\{encodeURIComponent\(`https://www\.ebay\.com/itm/\$\{ebay\}`\)\}`;', '', s, count=1)
if n != 1:
    raise SystemExit('product-detail public ebay checkout parameter marker not found')
write(name, s)

# RV footer: add Terms beside Privacy without redesign.
name = 'rv-store.html'
s = read(name)
if 'href="/terms"' not in s:
    marker = '<a href="/privacy">Privacy</a>'
    if marker not in s:
        raise SystemExit('RV privacy footer marker not found')
    s = s.replace(marker, marker + '<a href="/terms">Terms</a>', 1)
write(name, s)

# 7) Terms: align Honolulu pickup + separately quoted final-mile delivery.
name = 'terms.html'
s = read(name)
old = 'Hawaii lithium fulfillment is warehouse or freight-terminal pickup only. Residential lithium delivery is not currently offered through this program. Shipment and pickup timing is estimated and not guaranteed; timing can change because of consolidation, supplier inventory, exact battery documentation, packaging, actual packed gross weight, carrier scheduling, mainland receiving, ocean freight and Hawaii terminal availability.'
new = 'The standard Hawaii freight price covers Honolulu warehouse or freight-terminal pickup. Delivery from the pickup location to a home, business, jobsite or other address is not included and may be arranged separately for an additional quoted charge where available. Shipment, pickup and any separately arranged final-mile delivery timing is estimated and not guaranteed; timing can change because of consolidation, supplier inventory, exact battery documentation, packaging, actual packed gross weight, carrier scheduling, mainland receiving, ocean freight and Hawaii terminal availability.'
s = replace_required(s, old, new, 'Terms Hawaii delivery contradiction', 1)
s = s.replace('<strong>Last updated:</strong> September 2, 2026', '<strong>Last updated:</strong> September 3, 2026')
write(name, s)

# 8) Privacy: document direct commerce/order/logistics data and PayPal role conservatively.
name = 'privacy.html'
s = read(name)
s = s.replace('Elevation UpScales, Inc. privacy notice for project inquiries, solar builds, and marketplace submissions.', 'Elevation UpScales, Inc. privacy notice for project inquiries, store orders, shipping coordination, solar builds, and marketplace submissions.')
s = s.replace('<h1>How we use <span>lead information.</span></h1><p>Elevation UpScales, Inc. collects only the information needed to respond to project requests, save solar-system builds, review compatibility, and follow up with customers.</p>', '<h1>How we handle <span>customer information.</span></h1><p>Elevation UpScales, Inc. collects information needed to respond to project requests, process store orders, coordinate shipping or pickup, save solar-system builds, review compatibility, and follow up with customers.</p>')
s = s.replace('Depending on the form, we may collect your name, phone number, email address, city and state, RV or marketplace-item information, project details, selected solar components, preferred contact method, and listing photos.', 'Depending on the form or order, we may collect your name, phone number, email address, city and state, shipping or pickup information, product and quantity information, Hawaii freight-coordination information, RV or marketplace-item information, project details, selected solar components, preferred contact method, and listing photos.')
commerce = '<h2>Store orders, payments and fulfillment</h2><p>For direct store orders, we may keep product and quantity information, customer contact information, shipping or pickup details, order status, fulfillment records, and supplier or freight references needed to complete the order. Hawaii orders or shipping-review requests may also include information needed to coordinate the applicable pickup or quoted delivery path.</p><p>PayPal is used as a payment processor for supported direct checkout. Elevation may receive and retain PayPal order or transaction identifiers, payment-status information, and other limited transaction details needed to confirm and administer an order. Elevation does not claim to store full payment-card credentials handled by PayPal.</p>'
marker = '<h2>Marketplace submissions</h2>'
if commerce not in s:
    s = replace_required(s, marker, commerce + marker, 'Privacy marketplace insertion point', 1)
s = s.replace('Submissions may be processed through Cloudflare services. Marketplace records may be stored in a private Cloudflare D1 database, and submitted listing photos may be stored in a private Cloudflare R2 bucket. Email is used to notify Elevation UpScales, Inc. that a submission is waiting for review.', 'Submissions and order records may be processed through Cloudflare services. Marketplace and commerce records may be stored in private Cloudflare data services, and submitted listing photos may be stored in a private Cloudflare R2 bucket. PayPal processes supported checkout payments. Suppliers and freight providers may receive order, product, destination, pickup or other fulfillment information reasonably needed to complete an order. Email may be used to notify Elevation UpScales, Inc. about submissions or order activity.')
s = s.replace('<strong>Last updated:</strong> August 22, 2026', '<strong>Last updated:</strong> September 3, 2026')
write(name, s)

# 9) Sitemap: current primary indexable routes; omit checkout/admin/private operational routes.
sitemap = '''<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://elevationupscales.com/</loc><lastmod>2026-09-03</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://elevationupscales.com/what-we-do</loc><lastmod>2026-09-03</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://elevationupscales.com/home-services</loc><lastmod>2026-08-31</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://elevationupscales.com/rv-services</loc><lastmod>2026-08-31</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://elevationupscales.com/solar-services</loc><lastmod>2026-08-31</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://elevationupscales.com/solar-project</loc><lastmod>2026-08-29</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>https://elevationupscales.com/start-a-project</loc><lastmod>2026-08-31</lastmod><changefreq>monthly</changefreq><priority>0.9</priority></url>
  <url><loc>https://elevationupscales.com/store</loc><lastmod>2026-09-03</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://elevationupscales.com/rv-store</loc><lastmod>2026-09-03</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://elevationupscales.com/lithium-batteries</loc><lastmod>2026-09-03</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://elevationupscales.com/hawaii-lithium-batteries</loc><lastmod>2026-09-03</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>https://elevationupscales.com/marketplace</loc><lastmod>2026-08-31</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>
  <url><loc>https://elevationupscales.com/make-a-listing</loc><lastmod>2026-08-31</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://elevationupscales.com/work-with-us</loc><lastmod>2026-08-31</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>
  <url><loc>https://elevationupscales.com/privacy</loc><lastmod>2026-09-03</lastmod><changefreq>yearly</changefreq><priority>0.4</priority></url>
  <url><loc>https://elevationupscales.com/terms</loc><lastmod>2026-09-03</lastmod><changefreq>yearly</changefreq><priority>0.5</priority></url>
  <url><loc>https://elevationupscales.com/gallery</loc><lastmod>2026-08-13</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>
  <url><loc>https://elevationupscales.com/project-guides</loc><lastmod>2026-08-13</lastmod><changefreq>monthly</changefreq><priority>0.5</priority></url>
</urlset>
'''
write('sitemap.xml', sitemap)

# Source assertions.
assert 'home-capabilities.js' not in read('site-shell.js')
assert 'Hawaii Lithium Shipping & Freight' not in read('site-shell.js')
assert 'Alaska quote options' not in read('site-shell.js')
assert read('hawaii-lithium-batteries.html').index('id="hawaii-products"') < read('hawaii-lithium-batteries.html').index('id="how-it-works"') < read('hawaii-lithium-batteries.html').index('id="hawaii-request"')
assert 'Residential lithium delivery is not currently offered' not in read('terms.html')
assert 'PayPal order or transaction identifiers' in read('privacy.html')
assert '/lithium-batteries' in read('sitemap.xml') and '/hawaii-lithium-batteries' in read('sitemap.xml') and '/terms' in read('sitemap.xml')
assert '&ebay=' not in read('product-detail.js')
print('Hotfix 2 patch applied successfully')
