from pathlib import Path
import re


def read(path):
    return Path(path).read_text()


def write(path, content):
    Path(path).write_text(content)


def change(path, transform):
    before = read(path)
    after = transform(before)
    if before == after:
        raise RuntimeError(f"No change made to {path}")
    write(path, after)


def patch_migrations(s):
    s = s.replace('export const COMMERCE_SCHEMA_VERSION = "2026.08.29.1";', 'export const COMMERCE_SCHEMA_VERSION = "2026.09.02.1";')
    if '2026-09-02-shipping-rules-v1' in s:
        return s
    migration = '''  {
    id: "2026-09-02-shipping-rules-v1",
    description: "Server-authoritative shipping rules and audit trail",
    statements: [
      `CREATE TABLE IF NOT EXISTS eus_shipping_rules (
        id TEXT PRIMARY KEY, region TEXT NOT NULL UNIQUE, enabled INTEGER NOT NULL DEFAULT 1,
        method TEXT NOT NULL, calculation TEXT NOT NULL, rate_cents INTEGER NOT NULL DEFAULT 0,
        quote_required INTEGER NOT NULL DEFAULT 0, pickup_only INTEGER NOT NULL DEFAULT 0,
        residential_allowed INTEGER NOT NULL DEFAULT 1, min_quantity INTEGER NOT NULL DEFAULT 1,
        max_quantity INTEGER, preferred_consolidation_quantity INTEGER,
        customer_label TEXT NOT NULL DEFAULT '', timing_message TEXT NOT NULL DEFAULT '',
        effective_start TEXT NOT NULL DEFAULT '', effective_end TEXT NOT NULL DEFAULT '',
        internal_notes TEXT NOT NULL DEFAULT '', version INTEGER NOT NULL DEFAULT 1,
        updated_at TEXT NOT NULL, updated_by TEXT NOT NULL DEFAULT ''
      )`,
      `CREATE TABLE IF NOT EXISTS eus_shipping_rule_events (
        id TEXT PRIMARY KEY, rule_id TEXT NOT NULL, action TEXT NOT NULL,
        before_json TEXT NOT NULL DEFAULT '{}', after_json TEXT NOT NULL DEFAULT '{}',
        actor TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS idx_eus_shipping_rule_events_created ON eus_shipping_rule_events(created_at DESC)`,
    ],
  },
'''
    marker = '  },\n];\n\nlet schemaPromise = null;'
    pos = s.rfind(marker)
    if pos < 0:
        raise RuntimeError('Migration insertion marker not found')
    return s[:pos+5] + migration + s[pos+5:]


def patch_routes(s):
    if '"/shipping-rules-runtime.js"' in s:
        return s
    return s.replace('    "/commerce-schema-migrations.js"', '    "/commerce-schema-migrations.js",\n    "/shipping-rules-runtime.js"')


def patch_hawaii(s):
    if 'async function publicStatuses(' not in s:
        marker = '\nfunction quoteExpired(value) {'
        helper = r'''
function customerState(record, destinations = []) {
  if (!record) return { customerState: "review_required", label: "Freight Review Required", eligible: false };
  if (Number(record.hold)) return { customerState: "unavailable", label: "Currently Unavailable", eligible: false };
  if (record.review_state !== "INTERNAL REQUIREMENTS SATISFIED") return { customerState: "review_required", label: "Freight Review Required", eligible: false };
  const states = destinations.map((row) => upper(row.eligibility_state || ""));
  if (states.includes("APPROVED")) return { customerState: "shipping_available", label: "Shipping Available", eligible: true };
  if (states.some((value) => ["NOT ELIGIBLE", "HOLD"].includes(value))) return { customerState: "unavailable", label: "Currently Unavailable", eligible: false };
  return { customerState: "review_required", label: "Freight Review Required", eligible: false };
}

export async function resolveHawaiiCustomerStatus(env, { sku = "", productId = "", destination = "Hawaii — General" } = {}) {
  const db = await ensureSchema(env);
  const exactSku = clean(sku, 180);
  const exactProductId = clean(productId, 120);
  const record = exactProductId
    ? await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE catalog_product_id=? LIMIT 1").bind(exactProductId).first()
    : exactSku
      ? await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE sku=? COLLATE NOCASE LIMIT 1").bind(exactSku).first()
      : null;
  if (!record) return { ...customerState(null), sku: exactSku, productId: exactProductId };
  const target = clean(destination, 80) || "Hawaii — General";
  const rows = (await db.prepare("SELECT * FROM eus_lithium_destination_records WHERE shipping_record_id=? AND destination IN (?, 'Hawaii — General') ORDER BY CASE WHEN destination=? THEN 0 ELSE 1 END")
    .bind(record.id, target, target).all()).results || [];
  return { ...customerState(record, rows), sku: record.sku, productId: record.catalog_product_id };
}

async function publicStatuses(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") return json({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  const db = await ensureSchema(env);
  const records = (await db.prepare("SELECT * FROM eus_lithium_shipping_records WHERE active=1").all()).results || [];
  const destinations = (await db.prepare("SELECT * FROM eus_lithium_destination_records WHERE destination IN ('Hawaii — General','Oahu','Maui','Kauai','Hawaii Island / Big Island')").all()).results || [];
  const byRecord = new Map();
  for (const row of destinations) {
    if (!byRecord.has(row.shipping_record_id)) byRecord.set(row.shipping_record_id, []);
    byRecord.get(row.shipping_record_id).push(row);
  }
  const statuses = {};
  for (const record of records) {
    const value = { ...customerState(record, byRecord.get(record.id) || []), sku: record.sku, productId: record.catalog_product_id };
    if (record.sku) statuses[String(record.sku).toLowerCase()] = value;
    if (record.catalog_product_id) statuses[record.catalog_product_id] = value;
  }
  return json({
    statuses,
    customerFreightPerBatteryCents: HAWAII_CUSTOMER_FREIGHT_CENTS_PER_BATTERY,
    preferredConsolidationUnits: HAWAII_PREFERRED_CONSOLIDATION_UNITS,
    pickupOnly: true,
  });
}
'''
        if marker not in s:
            raise RuntimeError('Hawaii helper insertion marker missing')
        s = s.replace(marker, '\n' + helper + marker)
    old = 'export async function handleHawaiiLithiumPublicApi(request,env,pathname){try{if(pathname==="/api/hawaii-lithium/requests")return publicRequest(request,env);if(pathname==="/api/hawaii-lithium/status")return publicStatus(request,env);return json({error:"Not found"},404);}'
    if old in s:
        new = 'export async function handleHawaiiLithiumPublicApi(request,env,pathname){try{if(pathname==="/api/hawaii-lithium/requests")return publicRequest(request,env);if(pathname==="/api/hawaii-lithium/statuses")return publicStatuses(request,env);if(pathname==="/api/hawaii-lithium/status")return publicStatus(request,env);return json({error:"Not found"},404);}'
        s = s.replace(old, new)
    if '/api/hawaii-lithium/statuses' not in s:
        raise RuntimeError('Hawaii statuses handler patch failed')
    return s


def patch_worker(s):
    import_line = 'import { handleShippingRulesPublicApi, handleShippingRulesAdminApi } from "./shipping-rules-runtime.js";\n'
    if import_line not in s:
        marker = 'import { handlePromotionPublicApi, handlePromotionAdminApi } from "./promotion-runtime.js";\n'
        if marker not in s:
            raise RuntimeError('Worker import marker missing')
        s = s.replace(marker, marker + import_line)

    old_catalog = 'async function getPublicCatalog(request,env,section){try{const path=section==="lithium"?"/api/store/catalog?section=lithium-batteries":"/api/store-catalog?section=rv-outdoor";const apiUrl=new URL(path,request.url);const apiRequest=new Request(apiUrl.toString(),{method:"GET",headers:{Accept:"application/json"}});const response=await handleCatalogPublicApi(apiRequest,env,apiUrl.pathname);if(!response?.ok)return[];const data=await response.json().catch(()=>({}));return publicRows(data,section);}catch(_){return[];}}'
    new_catalog = 'async function getPublicCatalog(request,env,section){try{const isLithium=section==="lithium"||section==="hawaii";const path=isLithium?"/api/store/catalog?section=lithium-batteries":"/api/store-catalog?section=rv-outdoor";const apiUrl=new URL(path,request.url);const apiRequest=new Request(apiUrl.toString(),{method:"GET",headers:{Accept:"application/json"}});const response=await handleCatalogPublicApi(apiRequest,env,apiUrl.pathname);if(!response?.ok)return[];const data=await response.json().catch(()=>({}));return publicRows(data,isLithium?"lithium":"rv");}catch(_){return[];}}'
    if old_catalog in s:
        s = s.replace(old_catalog, new_catalog)

    start = s.find('function lithiumCard(')
    end = s.find('\nfunction rvCard', start)
    if start < 0 or end < 0:
        raise RuntimeError('Worker lithiumCard boundaries missing')
    card = '''function lithiumCard(product,hawaii=false){const id=clean(product?.id||product?.sku,140);const sku=clean(product?.sku||product?.id,160);const view=lithiumView(product);const image=clean(product?.primaryImage||product?.images?.[0]||"/assets/logo.webp",1000);const detail=`/product?id=${encodeURIComponent(id)}&store=lithium`;const checkout=`/checkout/?source=lithium&id=${encodeURIComponent(id)}&name=${encodeURIComponent(clean(product?.title||view.title,240))}${hawaii?"&state=HI":""}`;const shipping=hawaii?{label:"Freight Review Required",className:"is-quote"}:shippingPresentation(product);const inventory=Number.isFinite(Number(product?.supplierStock))?`${Math.max(0,Number(product.supplierStock))} available`:"Supplier-managed availability";return `<article class="lithium-card" data-product-id="${htmlEsc(id)}" data-hawaii-sku="${htmlEsc(sku)}" data-shipping-status="${htmlEsc(clean(product?.shippingStatus,30))}"><div class="lithium-card__image"><a class="lithium-card__detail-link" href="${htmlEsc(detail)}" aria-label="View ${htmlEsc(view.title)} details"><img src="${htmlEsc(image)}" alt="${htmlEsc(view.title)}" loading="lazy" decoding="async" referrerpolicy="no-referrer"></a></div><div class="lithium-card__body"><p class="lithium-card__category">${htmlEsc(view.category)}</p><h3><a class="lithium-card__title-link" href="${htmlEsc(detail)}">${htmlEsc(view.title)}</a></h3>${view.specs?`<p class="lithium-card__spec-line">${htmlEsc(view.specs)}</p>`:""}<div class="lithium-card__shipping ${shipping.className}" data-hawaii-status>${htmlEsc(shipping.label)}</div>${hawaii?`<div class="hawaii-card-simple"><p><strong>Availability</strong><span>${htmlEsc(inventory)}</span></p><p><strong>Hawaii Freight</strong><span>$99 per actual battery when shipping is approved</span></p><p><strong>Fulfillment</strong><span>Warehouse / freight-terminal pickup</span></p></div>`:""}<div class="lithium-card__footer"><strong>${htmlEsc(money(product?.priceCents))}</strong><div class="lithium-card__actions"><a class="button button-outline" href="${htmlEsc(detail)}">View Details</a><a class="button button-primary" href="${htmlEsc(checkout)}">${hawaii?"Buy / Reserve":"Buy Now"}</a></div></div></div></article>`;}'''
    s = s[:start] + card + s[end:]

    start = s.find('async function enhanceStorefront(')
    end = s.find('\n\nexport default', start)
    if start < 0 or end < 0:
        raise RuntimeError('Worker enhanceStorefront boundaries missing')
    enhancer = '''async function enhanceStorefront(request,response,env,section){if(request.method!=="GET"||!response?.ok||!String(response.headers.get("content-type")||"").includes("text/html"))return response;const products=await getPublicCatalog(request,env,section);if(!products.length)return response;let html=await response.text();if(section==="lithium"||section==="hawaii"){html=html.replace(/<strong data-lithium-count>[^<]*<\\/strong>/,`<strong data-lithium-count>${products.length}</strong>`).replace(/<div class="lithium-grid" data-lithium-grid>[\\s\\S]*?<\\/div>/,`<div class="lithium-grid" data-lithium-grid data-prerendered="true">${products.map((p)=>lithiumCard(p,section==="hawaii")).join("")}</div>`);if(section==="lithium")html=html.replace(/<div class="lithium-category-strip__inner" data-lithium-categories>[\\s\\S]*?<\\/div>/,`<div class="lithium-category-strip__inner" data-lithium-categories>${lithiumCategories(products).map((c)=>`<button class="lithium-chip" type="button" data-lithium-category="${htmlEsc(c)}">${htmlEsc(c)}</button>`).join("")}</div>`);}else{html=html.replace(/<p class="rv-store-status" id="rv-catalog-status"[^>]*>[^<]*<\\/p>/,`<p class="rv-store-status" id="rv-catalog-status" aria-live="polite">${products.length} products available now</p>`).replace(/<span id="rv-count">[^<]*<\\/span>/,`<span id="rv-count">${products.length}</span>`).replace(/<div class="rv-product-grid" id="rv-product-grid">[\\s\\S]*?<\\/div>/,`<div class="rv-product-grid" id="rv-product-grid" data-prerendered="true">${products.map(rvCard).join("")}</div>`);}const headers=new Headers(response.headers);headers.set("Cache-Control","no-store");headers.set("X-EUS-Storefront-Prerender",`${section}:${products.length}`);return new Response(html,{status:response.status,statusText:response.statusText,headers});}'''
    s = s[:start] + enhancer + s[end:]

    block_old = '"/commerce-schema-migrations.js"].includes(url.pathname)'
    if block_old in s:
        s = s.replace(block_old, '"/commerce-schema-migrations.js","/shipping-rules-runtime.js"].includes(url.pathname)')
    elif '"/shipping-rules-runtime.js"' not in s[s.find('export default'):s.find('export default')+1800]:
        raise RuntimeError('Worker internal module block patch failed')

    api_anchor = '    if(url.pathname==="/api/store/promotion") return handlePromotionPublicApi(request,env);'
    if '/api/store/featured' not in s:
        featured = '''    if(url.pathname==="/api/store/featured"){const [lithium,rv]=await Promise.all([getPublicCatalog(request,env,"lithium"),getPublicCatalog(request,env,"rv")]);const li=lithium.slice(0,4).map((p)=>{const v=lithiumView(p),id=clean(p.id||p.sku,140);return{id,title:v.title,spec:v.specs||v.subtitle||"LiFePO4 power",priceCents:Number(p.priceCents||0),image:clean(p.primaryImage||p.images?.[0]||"/assets/logo.webp",1000),detailUrl:`/product?id=${encodeURIComponent(id)}&store=lithium`,buyUrl:`/checkout/?source=lithium&id=${encodeURIComponent(id)}&name=${encodeURIComponent(clean(p.title||v.title,240))}`};});const gear=rv.slice(0,4).map((p,i)=>{const raw=clean(p.title||p.name||"RV & Outdoor item",300),id=clean(p.id||p.sku||`catalog-${i}`,140);return{id,title:compactTitle(raw),spec:useCase(raw)||rvCategory(p.category,raw),priceCents:Number(p.priceCents||0),image:clean(p.primaryImage||p.images?.[0]||"/assets/logo.webp",1000),detailUrl:`/product?id=${encodeURIComponent(id)}&store=rv`,buyUrl:`/checkout/?source=rv&id=${encodeURIComponent(id)}&name=${encodeURIComponent(raw)}`};});return new Response(JSON.stringify({lithium:li,rv:gear}),{headers:{"Content-Type":"application/json; charset=utf-8","Cache-Control":"public, max-age=120, stale-while-revalidate=300","X-Content-Type-Options":"nosniff"}});}
    if(url.pathname==="/api/shipping-rules"||url.pathname==="/api/shipping-rules/resolve") return handleShippingRulesPublicApi(request,env,url.pathname);
    if(url.pathname==="/api/admin/shipping-rules"||url.pathname.startsWith("/api/admin/shipping-rules/")) return handleShippingRulesAdminApi(request,env,url.pathname);
'''
        if api_anchor not in s:
            raise RuntimeError('Worker API insertion anchor missing')
        s = s.replace(api_anchor, featured + api_anchor)

    route = '    if(url.pathname==="/lithium-batteries"||url.pathname==="/lithium-batteries/") return enhanceStorefront(request,response,env,"lithium");'
    if 'enhanceStorefront(request,response,env,"hawaii")' not in s:
        if route not in s:
            raise RuntimeError('Worker storefront route anchor missing')
        s = s.replace(route, route + '\n    if(url.pathname==="/hawaii-lithium-batteries"||url.pathname==="/hawaii-lithium-batteries/") return enhanceStorefront(request,response,env,"hawaii");')
    return s


def patch_checkout(s):
    promo = 'import { getPromotionConfig, pricingForProduct, applyCoupon, isActualLithiumBattery, batteryUnitsPerCatalogUnit, publicPromotion } from "./promotion-runtime.js";'
    if 'resolveShippingRule' not in s:
        if promo not in s:
            raise RuntimeError('Checkout import anchor missing')
        s = s.replace(promo, promo + '\nimport { resolveShippingRule } from "./shipping-rules-runtime.js";\nimport { resolveHawaiiCustomerStatus } from "./hawaii-lithium-runtime.js";')

    start = s.find('async function quoteRv(raw, env) {')
    end = s.find('\nasync function quoteStoreItem', start)
    if start < 0 or end < 0:
        raise RuntimeError('quoteRv boundaries missing')
    quote = r'''async function quoteRv(raw, env) {
  const id = clean(raw?.id, 120);
  const source = clean(raw?.source,20).toLowerCase() === "lithium" ? "lithium" : "rv";
  const catalogEntry = await catalogRvEntry(env, id);
  const mappedEntry = source === "rv" ? rvMapEntry(env, id) : null;
  const entry = source === "lithium" ? catalogEntry : (catalogEntry || mappedEntry);
  const serverFallbackUrl = source === "rv" ? (trustedEbayUrl(mappedEntry?.ebayUrl) || ebayUrlFromItemId(mappedEntry?.ebayItemId) || await catalogRvFallbackUrl(env, id)) : "";
  const fallback = serverFallbackUrl ? {fallback:"ebay",ebayUrl:serverFallbackUrl} : {};
  if (!entry) return {ok:false,status:409,...fallback,error:source==="lithium"?"Lithium Catalog identity or verified shipping is unavailable":"Doba shipping is not mapped for this item"};
  if (entry.shippingVerified !== true) return {ok:false,status:409,...fallback,error:"Doba shipping is not verified for this item"};
  if (entry.storeSection && ((source==="lithium"&&entry.storeSection!=="lithium-batteries")||(source==="rv"&&entry.storeSection!=="rv-outdoor"))) return {ok:false,status:409,error:"Catalog store identity does not match checkout source"};
  const destinationState = clean(raw?.shipping?.state, 2).toUpperCase();
  const blockedStates = Array.isArray(entry.blockedStates) ? entry.blockedStates.map((value) => clean(value, 2).toUpperCase()) : [];
  const product = entry.productIdentity || {title:entry.name||raw?.name,category:"",supplier:"doba",supplierCostCents:0,priceCents:entry.priceCents,storeSection:source==="lithium"?"lithium-batteries":"rv-outdoor"};
  const config = await getPromotionConfig(env);
  const priced = pricingForProduct(product, config);
  const actualBattery = source==="lithium" && isActualLithiumBattery(product);
  if (destinationState && blockedStates.includes(destinationState) && !(actualBattery && ["HI","AK"].includes(destinationState))) return {ok:false,status:409,...fallback,error:"This Doba item is not available for the selected shipping state"};
  const qty = quantity(raw?.quantity);
  const unitPriceCents = Number.parseInt(String(priced.priceCents ?? entry.priceCents ?? ""),10);
  if (!Number.isInteger(unitPriceCents) || unitPriceCents < 1) return {ok:false,status:409,error:"Current Catalog price is unavailable for this item"};
  const listMerchandiseCents = unitPriceCents * qty;
  const coupon = applyCoupon({couponCode:raw?.couponCode,listMerchandiseCents,eligible:Boolean(priced.promotion?.couponEligible),config});
  if (!coupon.ok) return coupon;
  const batteryUnitsPerItem = actualBattery ? batteryUnitsPerCatalogUnit(product) : 0;
  const ruleResult = actualBattery ? await resolveShippingRule(env,{destinationState,quantity:qty,batteryUnitsPerItem}) : null;
  if (actualBattery && ruleResult?.status === "unavailable") return {ok:false,status:409,error:"Lithium shipping is currently unavailable for this destination",shippingRule:ruleResult.rule||null};
  if (actualBattery && destinationState === "AK") return {ok:false,status:409,error:"Freight Review Required for Alaska lithium shipping",shippingReviewRequired:true,shippingRule:ruleResult?.rule||null};
  const hawaiiFreight = actualBattery && destinationState === "HI";
  const hawaiiStatus = hawaiiFreight ? await resolveHawaiiCustomerStatus(env,{productId:id,sku:product?.sku||entry?.sku||"",destination:"Hawaii — General"}) : null;
  let shippingCents;
  if (hawaiiFreight) shippingCents = hawaiiStatus?.customerState === "shipping_available" ? Number(ruleResult?.shippingCents||0) : 0;
  else if (actualBattery) shippingCents = Number(ruleResult?.shippingCents||0);
  else {
    const shippingPerCatalogItem = Number.parseInt(String(entry.shippingCents ?? ""),10);
    if (!Number.isInteger(shippingPerCatalogItem) || shippingPerCatalogItem < 0) return {ok:false,status:409,error:"Doba shipping is not available for this item"};
    shippingCents = shippingPerCatalogItem * qty;
  }
  const rule = ruleResult?.rule || null;
  const shippingRule = rule ? {
    id:rule.id,version:rule.version,region:rule.region,method:rule.method,calculation:rule.calculation,rateCents:rule.rateCents,
    quoteRequired:rule.quoteRequired,pickupOnly:rule.pickupOnly,residentialAllowed:rule.residentialAllowed,
    customerLabel:rule.customerLabel,timingMessage:rule.timingMessage,appliedShippingCents:shippingCents,resolvedAt:new Date().toISOString()
  } : null;
  const requestUrl = `/hawaii-lithium-batteries?productId=${encodeURIComponent(id)}&product=${encodeURIComponent(clean(entry.name||raw?.name,240))}&qty=${qty}#hawaii-request`;
  return {
    ok:true,source,id,productName:clean(entry.name||raw?.name,240)||(source==="lithium"?"Lithium item":"RV & Outdoor item"),productImage:clean(entry.imageUrl||entry.image,1200),quantity:qty,
    unitPriceCents,listMerchandiseCents,discountCents:coupon.discountCents,merchandiseCents:coupon.merchandiseCents,shippingCents,totalCents:coupon.merchandiseCents+shippingCents,
    couponCode:coupon.couponCode,couponPercent:coupon.couponPercent,promotion:priced.promotion,shippingRule,
    variantId:"",variantName:"",variants:[],physical:true,
    battery:{actualBattery,batteryUnitsPerItem,shippingPerBatteryCents:actualBattery?Number(rule?.rateCents||0):0},
    ...(hawaiiFreight?{hawaii:{customerState:hawaiiStatus?.customerState||"review_required",statusLabel:hawaiiStatus?.label||"Freight Review Required",customerFreightPerBatteryCents:Number(rule?.rateCents||9900),preferredConsolidationUnits:Number(rule?.preferredConsolidationQuantity||3),warehousePickupOnly:Boolean(rule?.pickupOnly??true),requiresReservation:true,paymentAllowed:false,timing:rule?.timingMessage||"Warehouse / freight-terminal pickup. Shipment timing is estimated and depends on freight coordination and product eligibility.",requestUrl}}:{}),
    doba:{itemNo:clean(entry.itemNo,120),skuId:clean(entry.skuId,120),spuNo:clean(entry.spuNo,120)}
  };
}'''
    s = s[:start] + quote + s[end:]

    old_meta = 'JSON.stringify({...quote.doba,promotion:{pricingMode:quote.promotion?.pricingMode||"existing",markupPercent:quote.promotion?.markupPercent??null,couponCode:quote.couponCode||"",couponPercent:quote.couponPercent||0,discountCents:quote.discountCents||0,listMerchandiseCents:quote.listMerchandiseCents??quote.merchandiseCents,battery:quote.battery||{}}})'
    new_meta = 'JSON.stringify({...quote.doba,shippingRule:quote.shippingRule||{},promotion:{pricingMode:quote.promotion?.pricingMode||"existing",markupPercent:quote.promotion?.markupPercent??null,couponCode:quote.couponCode||"",couponPercent:quote.couponPercent||0,discountCents:quote.discountCents||0,listMerchandiseCents:quote.listMerchandiseCents??quote.merchandiseCents,battery:quote.battery||{}}})'
    if old_meta not in s:
        raise RuntimeError('Checkout order snapshot marker missing')
    s = s.replace(old_meta, new_meta)
    return s


change('site/commerce-schema-migrations.js', patch_migrations)
change('site/_routes.json', patch_routes)
change('site/hawaii-lithium-runtime.js', patch_hawaii)
change('site/_worker.js', patch_worker)
change('site/store-checkout-server.js', patch_checkout)
print('4.5 commerce core patch applied')
