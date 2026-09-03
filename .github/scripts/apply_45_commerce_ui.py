from pathlib import Path
import re


def change(path, fn):
    p = Path(path)
    before = p.read_text()
    after = fn(before)
    if before == after:
        raise RuntimeError(f"No change made to {path}")
    p.write_text(after)


def patch_index(s):
    if '/home-commerce.css' not in s:
        s = s.replace('<link rel="stylesheet" href="/home-elevation-funnel.css?v=4.4.4">', '<link rel="stylesheet" href="/home-elevation-funnel.css?v=4.4.4">\n<link rel="stylesheet" href="/home-commerce.css?v=4.5.0">')
    if '/home-commerce.js' not in s:
        s = s.replace('<script defer src="/script.js?v=3.11.36"></script>', '<script defer src="/script.js?v=3.11.36"></script>\n<script defer src="/home-commerce.js?v=4.5.0"></script>')
    if 'data-home-commerce' not in s:
        marker = '  <section class="hc-section hc-section--gold" id="about">'
        section = '''  <section class="home-commerce" data-home-commerce aria-labelledby="home-commerce-title">
    <div class="container">
      <div class="home-commerce__head">
        <div><p class="hc-eyebrow">SHOP ELEVATION</p><h2 id="home-commerce-title">Current gear, ready from the front door.</h2><p>A small live selection from the Elevation Catalog. Open the full stores for every current product.</p></div>
      </div>
      <div class="home-commerce__group">
        <div class="home-commerce__group-head"><h3>Lithium Batteries</h3><a class="button button-outline" href="/lithium-batteries">Shop All Lithium Batteries</a></div>
        <div class="home-product-grid" data-home-products="lithium" aria-live="polite"><p class="home-commerce-empty">Loading current batteries…</p></div>
      </div>
      <div class="home-commerce__group">
        <div class="home-commerce__group-head"><h3>RV &amp; Outdoor</h3><a class="button button-outline" href="/rv-store">Shop All RV &amp; Outdoor</a></div>
        <div class="home-product-grid" data-home-products="rv" aria-live="polite"><p class="home-commerce-empty">Loading current gear…</p></div>
      </div>
    </div>
  </section>

'''
        if marker not in s:
            raise RuntimeError('Homepage insertion marker missing')
        s = s.replace(marker, section + marker)
    s = s.replace('<a class="button button-outline" href="#services">See Services</a>', '<a class="button button-outline" href="/what-we-do">What We Do</a>')
    return s


def patch_lithium_shop(s):
    start = s.find('  function card(product) {')
    end = s.find('\n\n  function renderCategories', start)
    if start < 0 or end < 0:
        raise RuntimeError('Lithium card boundaries missing')
    card = r'''  function card(product) {
    const sku = String(product.sku || product.id || "").trim();
    const id = String(product.id || "").trim();
    const view = viewFor(product);
    const shipping = lower48Shipping(product);
    const detailUrl = `/product?id=${encodeURIComponent(id)}&store=lithium`;
    const checkoutUrl = `/checkout/?source=lithium&id=${encodeURIComponent(id)}&name=${encodeURIComponent(view.rawTitle || view.title)}${hawaiiMode ? "&state=HI" : ""}`;
    const inventory = Number.isFinite(Number(product.supplierStock)) ? `${Math.max(0, Number(product.supplierStock))} available` : "Supplier-managed availability";
    const status = hawaiiMode ? { label: "Freight Review Required", className: "is-quote" } : shipping;
    return `<article class="lithium-card" data-product-id="${esc(id)}" data-hawaii-sku="${esc(sku)}" data-shipping-status="${esc(String(product.shippingStatus || "unverified"))}">
      <div class="lithium-card__image"><a class="lithium-card__detail-link" href="${esc(detailUrl)}" aria-label="View ${esc(view.title)} details"><img src="${esc(product.primaryImage || "/assets/logo.webp")}" alt="${esc(view.title)}" loading="lazy" decoding="async" referrerpolicy="no-referrer"></a></div>
      <div class="lithium-card__body">
        <p class="lithium-card__category">${esc(view.category)}</p>
        <h3><a class="lithium-card__title-link" href="${esc(detailUrl)}">${esc(view.title)}</a></h3>
        ${view.specs ? `<p class="lithium-card__spec-line">${esc(view.specs)}</p>` : ""}
        <div class="lithium-card__shipping ${status.className}" data-hawaii-status>${esc(status.label)}</div>
        ${hawaiiMode ? `<div class="hawaii-card-simple"><p><strong>Availability</strong><span>${esc(inventory)}</span></p><p data-hawaii-rate><strong>Hawaii Freight</strong><span>Current rule loading…</span></p><p><strong>Fulfillment</strong><span>Warehouse / freight-terminal pickup</span></p></div>` : ""}
        <div class="lithium-card__footer"><strong>${money.format(Number(product.priceCents || 0) / 100)}</strong><div class="lithium-card__actions"><a class="button button-outline" href="${esc(detailUrl)}">View Details</a><a class="button button-primary" href="${esc(checkoutUrl)}">${hawaiiMode ? "Buy / Reserve" : "Buy Now"}</a></div></div>
      </div>
    </article>`;
  }'''
    s = s[:start] + card + s[end:]

    s = s.replace('    document.querySelectorAll("[data-hawaii-sku]").forEach(syncStatus);', '    if (hawaiiMode) syncHawaiiStatuses();')

    start = s.find('  async function syncStatus(cardEl) {')
    end = s.find('\n\n  document.addEventListener("click"', start)
    if start < 0 or end < 0:
        raise RuntimeError('Lithium status/load boundaries missing')
    replacement = r'''  function applyHawaiiStatus(cardEl, data, rateCents) {
    const badge = cardEl.querySelector("[data-hawaii-status]");
    if (!badge) return;
    const stateValue = data?.customerState || "review_required";
    badge.className = "lithium-card__shipping";
    if (stateValue === "shipping_available") badge.classList.add("is-approved");
    else if (stateValue === "review_required") badge.classList.add("is-quote");
    else badge.classList.add("is-researching");
    badge.textContent = data?.label || (stateValue === "shipping_available" ? "Shipping Available" : stateValue === "unavailable" ? "Currently Unavailable" : "Freight Review Required");
    const rateEl = cardEl.querySelector("[data-hawaii-rate] span");
    if (rateEl) rateEl.textContent = `${money.format(Number(rateCents || 0) / 100)} per actual battery when shipping is approved`;
  }

  async function syncHawaiiStatuses() {
    if (!hawaiiMode) return;
    const cards = [...document.querySelectorAll("[data-hawaii-sku]")];
    if (!cards.length) return;
    try {
      const response = await fetch("/api/hawaii-lithium/statuses", { headers: { Accept: "application/json" }, cache: "no-store" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error("Hawaii status unavailable");
      const statuses = data.statuses || {};
      for (const cardEl of cards) {
        const sku = String(cardEl.dataset.hawaiiSku || "").trim().toLowerCase();
        const id = String(cardEl.dataset.productId || "").trim();
        applyHawaiiStatus(cardEl, statuses[sku] || statuses[id] || { customerState: "review_required", label: "Freight Review Required" }, data.customerFreightPerBatteryCents || 9900);
      }
    } catch (_) {
      for (const cardEl of cards) applyHawaiiStatus(cardEl, { customerState: "review_required", label: "Freight Review Required" }, 9900);
    }
  }

  async function loadCatalog() {
    const response = await fetch("/api/store/catalog?section=lithium-batteries", { headers: { Accept: "application/json" }, cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !Array.isArray(data.products)) throw new Error("Catalog unavailable");
    state.products = publicProducts(data.products);
    return data.products;
  }

  async function hydrateAndRender() {
    try {
      const rows = state.products.length ? state.products : await loadCatalog();
      render(rows);
    } catch (_) {
      if (!(grid.dataset.prerendered === "true" && grid.children.length)) render([]);
    }
  }

  function init() {
    if (grid.dataset.prerendered === "true" && grid.children.length) {
      if (hawaiiMode) syncHawaiiStatuses();
      return;
    }
    hydrateAndRender();
  }'''
    s = s[:start] + replacement + s[end:]

    s = s.replace('if (categoryButton) { state.category = categoryButton.dataset.lithiumCategory || "all"; render(state.products); return; }', 'if (categoryButton) { state.category = categoryButton.dataset.lithiumCategory || "all"; hydrateAndRender(); return; }')
    s = s.replace('search?.addEventListener("input", debounce(() => { state.query = search.value; render(state.products); }));', 'search?.addEventListener("input", debounce(() => { state.query = search.value; hydrateAndRender(); }));')
    s = s.replace('sort?.addEventListener("change", () => { state.sort = sort.value; render(state.products); });', 'sort?.addEventListener("change", () => { state.sort = sort.value; hydrateAndRender(); });')
    s = re.sub(r'\n\s*load\(\);\n\}\)\(\);\s*$', '\n\n  init();\n})();\n', s)
    if 'fetch(`/api/hawaii-lithium/status?sku=' in s:
        raise RuntimeError('Per-card Hawaii status fetch remains')
    return s


def patch_rv(s):
    s = s.replace('search?.addEventListener("input",debounce(()=>{state.query=search.value;render();}));', 'search?.addEventListener("input",debounce(async()=>{state.query=search.value;if(!state.items.length)await loadElevationCatalog();else render();}));')
    s = s.replace('sort?.addEventListener("change",()=>{state.sort=sort.value;render();});', 'sort?.addEventListener("change",async()=>{state.sort=sort.value;if(!state.items.length)await loadElevationCatalog();else render();});')
    old = 'track("store_open","rv_store",{section:"rv_shop",prerendered:grid.dataset.prerendered==="true"});loadElevationCatalog();'
    new = 'track("store_open","rv_store",{section:"rv_shop",prerendered:grid.dataset.prerendered==="true"});if(grid.dataset.prerendered==="true"&&grid.children.length){status.textContent="Current published products shown";}else loadElevationCatalog();'
    if old not in s:
        raise RuntimeError('RV initial load marker missing')
    return s.replace(old, new)


def patch_hawaii_html(s):
    s = re.sub(r'^<!doctype html><!-- Deployment compatibility:.*?--><html', '<!doctype html><html', s, count=1)
    s = s.replace('lithium-shop.js?v=4.4.4', 'lithium-shop.js?v=4.5.0')
    s = s.replace('hawaii-lithium-program.css?v=4.4.0', 'hawaii-lithium-program.css?v=4.5.0')
    s = s.replace('Shop the same Elevation Lithium Store inventory and use our consolidated Hawaii freight path for eligible large lithium batteries. Merchandise and freight stay separate, and every shipment remains subject to exact product, documentation, packaging, gross-weight, carrier-acceptance and scheduling checks.', 'Shop the same Elevation Lithium Store inventory and check the current Hawaii shipping state for each battery. Eligible orders use coordinated freight with warehouse or freight-terminal pickup.')
    old_banner = '<div class="hawaii-batch-banner"><p class="eyebrow">HAWAII CONSOLIDATED FREIGHT</p><h3>$99 per actual battery · Warehouse / Freight-Terminal Pickup Only</h3><p>1 battery = $99 freight · 2 batteries = $198 · 3 batteries = $297. Three compatible batteries is the current preferred consolidated-shipment target, but customers may request one, two or three. Orders of fewer than three compatible batteries may wait while Elevation combines compatible Hawaii orders.</p><p><strong>Estimated Shipment / Pickup Timing — Not Guaranteed.</strong> Final movement depends on exact battery compatibility, required documentation, packaging, actual packed gross weight, carrier acceptance and freight scheduling.</p></div>'
    new_banner = '<div class="hawaii-batch-banner"><p class="eyebrow">HAWAII FREIGHT</p><h3>$99 per actual battery under the current approved rule</h3><p><strong>Warehouse / freight-terminal pickup.</strong> Shipment timing is estimated and depends on freight coordination and product eligibility.</p></div>'
    if old_banner in s:
        s = s.replace(old_banner, new_banner)
    old_steps = '<div class="hawaii-steps"><article class="hawaii-step"><strong>1 · Choose / Request</strong><p>Select a current Catalog battery, quantity and Hawaii destination. The merchandise price remains separate from Hawaii freight.</p></article><article class="hawaii-step"><strong>2 · Elevation Verifies the Freight File</strong><p>We confirm the exact product, supplier availability, documentation, packaging, packed weight, route and carrier acceptance before tender.</p></article><article class="hawaii-step"><strong>3 · Consolidate &amp; Pick Up</strong><p>Compatible reservations are grouped toward a preferred three-battery shipment. After Hawaii arrival, customers receive terminal or warehouse release and pickup instructions.</p></article></div><div class="hawaii-status-grid" style="margin-top:14px"><article class="hawaii-status-card"><strong>Shipping Options Being Confirmed</strong><p>We’re still confirming the shipping path for this exact battery or destination.</p></article><article class="hawaii-status-card"><strong>Hawaii Shipping Quote Required</strong><p>A supported path may require a customer-specific freight quote.</p></article><article class="hawaii-status-card is-approved"><strong>Hawaii Shipping Available</strong><p>Shown only when Elevation’s current internal record supports the exact product and applicable destination.</p></article><article class="hawaii-status-card"><strong>Currently Unavailable for Hawaii</strong><p>The current product, inventory, documentation, or route is not supportable at this time.</p></article></div>'
    new_steps = '<div class="hawaii-steps"><article class="hawaii-step"><strong>1 · Choose a Battery</strong><p>Select a current battery and quantity from the same Elevation Lithium Catalog.</p></article><article class="hawaii-step"><strong>2 · Check the Shipping State</strong><p>Elevation verifies the exact product and destination before payment is treated as shipping-confirmed.</p></article><article class="hawaii-step"><strong>3 · Buy or Reserve</strong><p>Shipping-available orders show the current freight rule. Review-required orders can be reserved while Elevation confirms the freight path.</p></article></div><div class="hawaii-status-grid" style="margin-top:14px"><article class="hawaii-status-card is-approved"><strong>Shipping Available</strong><p>The current exact-product record supports the Hawaii freight path.</p></article><article class="hawaii-status-card"><strong>Freight Review Required</strong><p>Reserve or request review before payment is treated as shipping-confirmed.</p></article><article class="hawaii-status-card"><strong>Currently Unavailable</strong><p>The current product or destination cannot be supported at this time.</p></article></div>'
    if old_steps in s:
        s = s.replace(old_steps, new_steps)
    s = s.replace('<p class="hawaii-request-disclosure"><strong>Hawaii lithium batteries move through consolidated freight.</strong> Orders of fewer than three compatible batteries may be held while Elevation combines them with other Hawaii battery orders. Three compatible batteries is the current preferred shipment target.</p>', '<p class="hawaii-request-disclosure"><strong>Freight review does not collect payment.</strong> Elevation confirms exact-product eligibility and the current shipping rule before a shipment is treated as confirmed.</p>')
    s = s.replace('These cards use the existing Elevation Lithium Catalog. Inventory is not duplicated for Hawaii. Hawaii freight is $99 per actual battery; warehouse pickup only. Current route, consolidation and timing details appear where existing logistics records support them.', 'These cards use the existing Elevation Lithium Catalog. Inventory is not duplicated for Hawaii. Each card shows a simple current shipping state; detailed freight education remains above.')
    return s


def patch_hawaii_css(s):
    if '.hawaii-card-simple' in s:
        return s
    return s + '\n.hawaii-card-simple{display:grid;gap:7px;margin:10px 0 4px;padding:10px 12px;border:1px solid rgba(255,255,255,.08);border-radius:12px;background:rgba(255,255,255,.025)}.hawaii-card-simple p{display:flex;justify-content:space-between;gap:12px;margin:0;font-size:.78rem;line-height:1.3}.hawaii-card-simple strong{color:#ddd}.hawaii-card-simple span{text-align:right;color:#aaa}@media(max-width:520px){.hawaii-card-simple p{display:block}.hawaii-card-simple span{display:block;text-align:left;margin-top:2px}}\n'


def patch_admin_html(s):
    if '/admin-shipping-rules.css' not in s:
        s = s.replace('<link rel="stylesheet" href="/admin-shipping-pass2.css?v=4.3.6">', '<link rel="stylesheet" href="/admin-shipping-pass2.css?v=4.3.6">\n<link rel="stylesheet" href="/admin-shipping-rules.css?v=4.5.0">')
    if '/admin-shipping-rules.js' not in s:
        s = s.replace('<script defer src="/admin-shipping-pass2.js?v=4.3.6"></script>', '<script defer src="/admin-shipping-pass2.js?v=4.3.6"></script>\n<script defer src="/admin-shipping-rules.js?v=4.5.0"></script>')
    if 'data-shipping-rules-admin' not in s:
        marker = '<section class="lithium-admin-alert"><strong>Phase 2 commercial-control rule</strong><span>All Hawaii lithium defaults to full review. A supported route requires exact SKU evidence, current supply, route/provider acceptance, and server-side gates. Batch assignment never charges a customer.</span></section>'
        panel = '''<section class="shipping-rules-admin" data-shipping-rules-admin><div class="shipping-rules-admin__head"><div><p class="eyebrow">COMMERCE CONTROL</p><h2>Shipping Rules</h2><p>Normal shipping policy is server-authoritative. Update approved regional rules here without redeploying the website. Exact-product Hawaii eligibility remains controlled by Product Qualification and Routes.</p></div><button class="button button-outline" type="button" data-shipping-rules-refresh>Refresh Rules</button></div><p class="catalog-status" data-shipping-rules-status role="status"></p><div class="shipping-rules-list" data-shipping-rules-list></div><div class="shipping-rules-events"><h3>Recent Rule Changes</h3><ul data-shipping-rules-events></ul></div></section>'''
        if marker not in s:
            raise RuntimeError('Admin shipping insertion marker missing')
        s = s.replace(marker, marker + panel)
    return s


def patch_checkout_html(s):
    s = s.replace('/store-checkout.js?v=4.4.0', '/store-checkout.js?v=4.5.0')
    old = '<section id="checkout-hawaii-freight" class="eus-checkout-hawaii" hidden><p class="eus-checkout-step">HAWAII LITHIUM SHIPPING &amp; FREIGHT</p><h3>Warehouse Pickup Only</h3><p><strong>Hawaii Consolidated Freight — $99 per actual battery.</strong></p><p id="checkout-hawaii-math"></p><p>Orders of fewer than three compatible batteries may be held while Elevation combines them with other Hawaii battery orders. Three compatible batteries is the current preferred shipment target.</p><p><strong>Estimated Shipment / Pickup Timing — Not Guaranteed.</strong> Timing depends on consolidation, supplier inventory, documentation, packaging, carrier scheduling, mainland receiving, ocean freight and Hawaii terminal availability.</p><a id="checkout-hawaii-reserve" class="eus-checkout-hawaii-cta" href="/hawaii-lithium-batteries#hawaii-request">Request / Reserve Hawaii Freight</a></section>'
    new = '<section id="checkout-hawaii-freight" class="eus-checkout-hawaii" hidden><p class="eus-checkout-step">HAWAII LITHIUM SHIPPING &amp; FREIGHT</p><h3 id="checkout-hawaii-state">Freight Review</h3><p id="checkout-hawaii-math"></p><p><strong>Warehouse / freight-terminal pickup.</strong> Shipment timing is estimated and depends on freight coordination and product eligibility.</p><a id="checkout-hawaii-reserve" class="eus-checkout-hawaii-cta" href="/hawaii-lithium-batteries#hawaii-request">Reserve / Request Shipping Review</a></section>'
    if old not in s:
        raise RuntimeError('Checkout Hawaii panel marker missing')
    return s.replace(old, new)


def patch_checkout_js(s):
    if 'const hawaiiStateEl' not in s:
        s = s.replace('  const hawaiiMath = document.querySelector("#checkout-hawaii-math");', '  const hawaiiMath = document.querySelector("#checkout-hawaii-math");\n  const hawaiiStateEl = document.querySelector("#checkout-hawaii-state");')
    start = s.find('    if (isHawaii) {\n      const batteryCount')
    end = s.find('\n    }\n    setProductImage(next.productImage, productName);', start)
    if start < 0 or end < 0:
        raise RuntimeError('Checkout Hawaii render block missing')
    block = r'''    if (isHawaii) {
      const batteryCount = Number(next.battery?.batteryUnitsPerItem || 1) * Number(next.quantity || 1);
      const freightRate = Number(next.hawaii?.customerFreightPerBatteryCents || next.shippingRule?.rateCents || 0);
      const customerState = String(next.hawaii?.customerState || "review_required");
      if (hawaiiStateEl) hawaiiStateEl.textContent = next.hawaii?.statusLabel || (customerState === "shipping_available" ? "Shipping Available" : customerState === "unavailable" ? "Currently Unavailable" : "Freight Review Required");
      if (hawaiiMath) {
        if (customerState === "shipping_available") hawaiiMath.textContent = `Battery ${money(next.unitPriceCents)} × ${next.quantity}. Hawaii Freight ${money(freightRate)} × ${batteryCount} actual batter${batteryCount === 1 ? "y" : "ies"} = ${money(next.shippingCents)}. Order total ${money(next.totalCents)} before any applicable tax.`;
        else if (customerState === "unavailable") hawaiiMath.textContent = "This exact battery is currently unavailable for the selected Hawaii freight path. No payment will be collected.";
        else hawaiiMath.textContent = "Freight Review Required. Reserve or request shipping review before payment is treated as shipping-confirmed.";
      }
      if (shippingEl) shippingEl.textContent = customerState === "shipping_available" ? money(next.shippingCents) : (customerState === "unavailable" ? "Unavailable" : "Review required");
      if (hawaiiReserve) hawaiiReserve.href = next.hawaii?.requestUrl || "/hawaii-lithium-batteries#hawaii-request";
      paypalEl.hidden = true;
    }'''
    s = s[:start] + block + s[end+6:]
    old_status = '    if (body.hawaii) setStatus("Hawaii consolidated-freight terms loaded. Reserve the order for freight coordination before payment.", "ready");'
    new_status = '    if (body.hawaii) { const stateValue=String(body.hawaii.customerState||"review_required"); setStatus(stateValue==="shipping_available" ? "Hawaii shipping rule loaded. Reserve the order for freight coordination before payment." : stateValue==="unavailable" ? "This battery is currently unavailable for the Hawaii freight path. No payment will be collected." : "Freight Review Required. Reserve / request shipping review before payment.", stateValue==="unavailable" ? "error" : "ready"); }'
    if old_status not in s:
        raise RuntimeError('Checkout Hawaii status marker missing')
    return s.replace(old_status, new_status)


def patch_sitemap(s):
    if '<loc>https://elevationupscales.com/what-we-do</loc>' in s:
        return s
    entry = '  <url><loc>https://elevationupscales.com/what-we-do</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>\n'
    return s.replace('</urlset>', entry + '</urlset>')


def patch_hawaii_dynamic_rule(s):
    if 'resolveShippingRule' not in s.split('\n', 3)[0:3]:
        s = 'import { resolveShippingRule } from "./shipping-rules-runtime.js";\n' + s
    old = '  const db=await ensureSchema(env); const records=(await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE active=1").all()).results||[]; const destinations=(await db.prepare("SELECT * FROM eus_lithium_destination_records WHERE destination IN (\'Hawaii — General\',\'Oahu\',\'Maui\',\'Kauai\',\'Hawaii Island / Big Island\')").all()).results||[];'
    new = '  const db=await ensureSchema(env); const ruleResult=await resolveShippingRule(env,{destinationState:"HI",quantity:1,batteryUnitsPerItem:1}); const records=(await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE active=1").all()).results||[]; const destinations=(await db.prepare("SELECT * FROM eus_lithium_destination_records WHERE destination IN (\'Hawaii — General\',\'Oahu\',\'Maui\',\'Kauai\',\'Hawaii Island / Big Island\')").all()).results||[];'
    if old in s:
        s = s.replace(old, new)
    old_return = '  return json({statuses,customerFreightPerBatteryCents:HAWAII_CUSTOMER_FREIGHT_CENTS_PER_BATTERY,preferredConsolidationUnits:HAWAII_PREFERRED_CONSOLIDATION_UNITS,pickupOnly:true});'
    new_return = '  return json({statuses,customerFreightPerBatteryCents:Number(ruleResult?.rule?.rateCents||HAWAII_CUSTOMER_FREIGHT_CENTS_PER_BATTERY),preferredConsolidationUnits:Number(ruleResult?.rule?.preferredConsolidationQuantity||HAWAII_PREFERRED_CONSOLIDATION_UNITS),pickupOnly:Boolean(ruleResult?.rule?.pickupOnly??true),shippingRule:ruleResult?.rule?{id:ruleResult.rule.id,version:ruleResult.rule.version,method:ruleResult.rule.method,rateCents:ruleResult.rule.rateCents,customerLabel:ruleResult.rule.customerLabel,timingMessage:ruleResult.rule.timingMessage}:null});'
    if old_return not in s:
        raise RuntimeError('Hawaii batched status return marker missing')
    return s.replace(old_return, new_return)


change('site/index.html', patch_index)
change('site/lithium-shop.js', patch_lithium_shop)
change('site/rv-store.js', patch_rv)
change('site/hawaii-lithium-batteries.html', patch_hawaii_html)
change('site/hawaii-lithium-program.css', patch_hawaii_css)
change('site/admin-lithium-shipping.html', patch_admin_html)
change('site/checkout/index.html', patch_checkout_html)
change('site/store-checkout.js', patch_checkout_js)
change('site/sitemap.xml', patch_sitemap)
change('site/hawaii-lithium-runtime.js', patch_hawaii_dynamic_rule)
print('4.5 commerce customer/admin UI patch applied')
