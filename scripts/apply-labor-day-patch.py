from pathlib import Path
import re


def read(p): return Path(p).read_text()
def write(p,s): Path(p).write_text(s)
def one(s, old, new, label):
    if old not in s: raise SystemExit(f"missing pattern: {label}")
    if s.count(old)!=1: raise SystemExit(f"non-unique pattern: {label} count={s.count(old)}")
    return s.replace(old,new,1)
def sub1(s, pattern, repl, label, flags=re.S):
    out,n=re.subn(pattern,lambda _m: repl,s,count=1,flags=flags)
    if n!=1: raise SystemExit(f"regex failed: {label} count={n}")
    return out

def inject_assets(path):
    s=read(path)
    if '/labor-day-promo.css' not in s:
        s=one(s,'</head>','<link rel="stylesheet" href="/labor-day-promo.css?v=4.4.0">\n<script defer src="/labor-day-promo.js?v=4.4.0"></script>\n</head>',path+' promo assets')
    write(path,s)

# Public Catalog: derive current selling price from supplier cost + promotion config.
p='site/catalog-admin-runtime.js'; s=read(p)
if not s.startswith('import { getPromotionConfig'):
    s='import { getPromotionConfig, pricingForProduct } from "./promotion-runtime.js";\n'+s
old='''  const products = (result.results || []).map(catalogRow).map((p) => ({
    id: p.id, sku: p.sku, title: p.title, description: p.description, category: p.category,
    supplier: p.supplier, sourceType: p.sourceType, fulfillmentMode: p.fulfillmentMode,
    priceCents: p.priceCents, supplierStock: p.supplierStock, shippingStatus: p.shippingStatus,
    shippingCents: p.shippingCents, primaryImage: p.primaryImage, images: p.images,
    sourceUrl: p.sourceUrl, ebayItemId: p.ebayItemId, salesChannels: p.salesChannels,
    storeSection: p.storeSection, publishStatus: p.publishStatus, updatedAt: p.updatedAt
  }));'''
new='''  const promotionConfig = await getPromotionConfig(env);
  const products = (result.results || []).map(catalogRow).map((p) => {
    const priced = pricingForProduct(p, promotionConfig);
    return {
      id: p.id, sku: p.sku, title: p.title, description: p.description, category: p.category,
      supplier: p.supplier, sourceType: p.sourceType, fulfillmentMode: p.fulfillmentMode,
      priceCents: priced.priceCents, supplierStock: p.supplierStock, shippingStatus: p.shippingStatus,
      shippingCents: p.shippingCents, primaryImage: p.primaryImage, images: p.images,
      sourceUrl: p.sourceUrl, ebayItemId: p.ebayItemId, salesChannels: p.salesChannels,
      storeSection: p.storeSection, publishStatus: p.publishStatus, updatedAt: p.updatedAt, promotion: priced.promotion
    };
  });'''
s=one(s,old,new,'catalog public pricing'); write(p,s)

# Checkout server: promotion math, distinct lithium source, coupon and PayPal discount breakdown.
p='site/store-checkout-server.js'; s=read(p)
s=one(s,'import { ensureCommerceSchema } from "./commerce-schema-migrations.js";','import { ensureCommerceSchema } from "./commerce-schema-migrations.js";\nimport { getPromotionConfig, pricingForProduct, applyCoupon, isActualLithiumBattery, batteryUnitsPerCatalogUnit, publicPromotion } from "./promotion-runtime.js";','checkout promotion import')
new_catalog='''async function catalogRvEntry(env, id) {
  const db = env?.MARKETPLACE_DB;
  const wanted = clean(id, 140);
  if (!db || typeof db.prepare !== "function" || !wanted) return null;
  try {
    const row = await db.prepare(`SELECT i.id,i.name,i.sku,i.category,i.cost_cents,i.supplier_product_id,i.price_cents,i.source_url,m.description,m.store_section,m.supplier_sku,m.supplier_stock,m.shipping_status,m.shipping_cents,m.primary_image,m.publish_status,m.review_state,s.spu_no,s.supplier_sku AS source_supplier_sku,s.supplier_stock AS source_stock,s.ship_to,s.shipping_method,s.estimated_shipping_cents,s.shipping_limitations,s.source_state
      FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id
      LEFT JOIN eus_doba_source_state s ON lower(s.item_no)=lower(i.supplier_product_id) AND lower(s.supplier_sku)=lower(m.supplier_sku)
      WHERE (i.id=? OR lower(i.supplier_product_id)=lower(?)) AND i.supplier='doba' LIMIT 1`).bind(wanted,wanted).first();
    if (!row || clean(row.publish_status,30) !== "published" || clean(row.shipping_status,30) !== "verified") return null;
    const stock = row.source_stock ?? row.supplier_stock;
    const exactSku = clean(row.supplier_sku,180);
    const sourceSku = clean(row.source_supplier_sku,180);
    if (!exactSku || !sourceSku || exactSku.toLowerCase() !== sourceSku.toLowerCase()) return null;
    if (Number(stock) <= 0 || /stale|missing|error/i.test(clean(row.source_state,80))) return null;
    const rawShipping = row.shipping_cents ?? row.estimated_shipping_cents;
    const shippingCents = Number.isInteger(Number(rawShipping)) && Number(rawShipping) >= 0 ? Number(rawShipping) : null;
    const shipTo = clean(row.ship_to,300);
    const blockedStates = /excluding[^a-z]*(ak|alaska).*?(hi|hawaii)|excluding[^a-z]*(hi|hawaii).*?(ak|alaska)/i.test(shipTo) ? ["AK","HI"] : [];
    const productIdentity = {id:row.id,sku:clean(row.sku,120),title:clean(row.name,500),description:clean(row.description,3000),category:clean(row.category,180),supplier:"doba",sourceType:"doba",supplierSku:exactSku,supplierCostCents:Number(row.cost_cents||0),priceCents:Number(row.price_cents||0),storeSection:clean(row.store_section,60)};
    const config = await getPromotionConfig(env);
    const priced = pricingForProduct(productIdentity, config);
    if (!Number.isInteger(Number(priced.priceCents)) || Number(priced.priceCents) < 1) return null;
    return {
      catalogProductId: row.id, name: clean(row.name,240), imageUrl: clean(row.primary_image,1200),
      priceCents: Number(priced.priceCents), storedPriceCents:Number(row.price_cents||0), shippingCents, shippingVerified: true,
      itemNo: clean(row.supplier_product_id,120), skuId: exactSku, spuNo: clean(row.spu_no,120),
      blockedStates, shipTo, shippingMethod: clean(row.shipping_method,180), sourceUrl: clean(row.source_url,1000),
      storeSection:clean(row.store_section,60), productIdentity, promotion:priced.promotion
    };
  } catch (error) {
    console.error(JSON.stringify({event:"catalog_rv_entry_error",message:clean(error?.message,240)}));
    return null;
  }
}

function normalizeAddress'''
s=sub1(s,r'async function catalogRvEntry\(env, id\) \{.*?\n\}\n\nfunction normalizeAddress',new_catalog,'catalog checkout entry')
s=one(s,'async function quoteApparel(raw, env) {\n  const reference = await catalogApparelReference(env, raw?.id);','async function quoteApparel(raw, env) {\n  if (clean(raw?.couponCode,120)) return { ok:false,status:409,error:"Labor Day coupon is not eligible for Apparel" };\n  const reference = await catalogApparelReference(env, raw?.id);','apparel coupon exclusion')
new_quote='''async function quoteRv(raw, env) {
  const id = clean(raw?.id, 120);
  const source = clean(raw?.source,20).toLowerCase() === "lithium" ? "lithium" : "rv";
  const catalogEntry = await catalogRvEntry(env, id);
  const entry = source === "lithium" ? catalogEntry : (catalogEntry || rvMapEntry(env, id));
  if (!entry) return {ok:false,status:409,...(source==="rv"?{fallback:"ebay",ebayUrl:/^https:\/\/www\.ebay\.com\/itm\/\d{12}$/i.test(clean(raw?.ebayUrl,300))?clean(raw.ebayUrl,300):""}:{}),error:source==="lithium"?"Lithium Catalog identity or verified shipping is unavailable":"Doba shipping is not mapped for this item"};
  if (entry.shippingVerified !== true) return {ok:false,status:409,...(source==="rv"?{fallback:"ebay",ebayUrl:clean(entry.ebayUrl||raw?.ebayUrl,300)}:{}),error:"Doba shipping is not verified for this item"};
  if (entry.storeSection && ((source==="lithium"&&entry.storeSection!=="lithium-batteries")||(source==="rv"&&entry.storeSection!=="rv-outdoor"))) return {ok:false,status:409,error:"Catalog store identity does not match checkout source"};
  const destinationState = clean(raw?.shipping?.state, 2).toUpperCase();
  const blockedStates = Array.isArray(entry.blockedStates) ? entry.blockedStates.map((value) => clean(value, 2).toUpperCase()) : [];
  const product = entry.productIdentity || {title:entry.name||raw?.name,category:"",supplier:"doba",supplierCostCents:0,priceCents:entry.priceCents,storeSection:source==="lithium"?"lithium-batteries":"rv-outdoor"};
  const config = await getPromotionConfig(env);
  const priced = pricingForProduct(product, config);
  const actualBattery = source==="lithium" && isActualLithiumBattery(product);
  if (actualBattery && destinationState==="AK") return {ok:false,status:409,error:"Standard lithium battery checkout is not available to Alaska"};
  if (actualBattery && destinationState==="HI") return {ok:false,status:409,error:"Hawaii lithium battery shipping requires the Hawaii Lithium Program and a separate shipping quote"};
  if (destinationState && blockedStates.includes(destinationState)) return {ok:false,status:409,...(source==="rv"?{fallback:"ebay",ebayUrl:clean(entry.ebayUrl||raw?.ebayUrl,300)}:{}),error:"This Doba item is not available for the selected shipping state"};
  const qty = quantity(raw?.quantity);
  const unitPriceCents = Number.parseInt(String(priced.priceCents ?? entry.priceCents ?? ""),10);
  if (!Number.isInteger(unitPriceCents) || unitPriceCents < 1) return {ok:false,status:409,error:"Current Catalog price is unavailable for this item"};
  const listMerchandiseCents = unitPriceCents * qty;
  const coupon = applyCoupon({couponCode:raw?.couponCode,listMerchandiseCents,eligible:Boolean(priced.promotion?.couponEligible),config});
  if (!coupon.ok) return coupon;
  const batteryUnitsPerItem = actualBattery ? batteryUnitsPerCatalogUnit(product) : 0;
  const shippingPerCatalogItem = actualBattery ? config.batteryShippingCents * batteryUnitsPerItem : Number.parseInt(String(entry.shippingCents ?? ""),10);
  if (!Number.isInteger(shippingPerCatalogItem) || shippingPerCatalogItem < 0) return {ok:false,status:409,error:"Doba shipping is not available for this item"};
  const shippingCents = shippingPerCatalogItem * qty;
  return {
    ok:true,source,id,productName:clean(entry.name||raw?.name,240)||(source==="lithium"?"Lithium item":"RV & Outdoor item"),productImage:clean(entry.imageUrl||entry.image,1200),quantity:qty,
    unitPriceCents,listMerchandiseCents,discountCents:coupon.discountCents,merchandiseCents:coupon.merchandiseCents,shippingCents,totalCents:coupon.merchandiseCents+shippingCents,
    couponCode:coupon.couponCode,couponPercent:coupon.couponPercent,promotion:priced.promotion,
    variantId:"",variantName:"",variants:[],physical:true,
    battery:{actualBattery,batteryUnitsPerItem,shippingPerBatteryCents:actualBattery?config.batteryShippingCents:0},
    doba:{itemNo:clean(entry.itemNo,120),skuId:clean(entry.skuId,120),spuNo:clean(entry.spuNo,120)}
  };
}

async function quoteStoreItem(raw, env) {
  const source = clean(raw?.source, 20).toLowerCase();
  if (source === "apparel") return quoteApparel(raw, env);
  if (source === "rv" || source === "lithium") return quoteRv(raw, env);
  return { ok: false, status: 400, error: "Invalid store source" };
}
'''
s=sub1(s,r'async function quoteRv\(raw, env\) \{.*?\n\}\n\nasync function quoteStoreItem\(raw, env\) \{.*?\n\}\n',new_quote,'quote rv/lithium')
helper='''function buildPayPalPurchaseUnit(quote, reference, address) {
  const listMerchandiseCents = Number.isInteger(quote.listMerchandiseCents) ? quote.listMerchandiseCents : quote.merchandiseCents;
  const breakdown = {
    item_total:{currency_code:DEFAULT_CURRENCY,value:centsToValue(listMerchandiseCents)},
    shipping:{currency_code:DEFAULT_CURRENCY,value:centsToValue(quote.shippingCents)},
  };
  if (Number(quote.discountCents)>0) breakdown.discount={currency_code:DEFAULT_CURRENCY,value:centsToValue(quote.discountCents)};
  const purchaseUnit={reference_id:reference,custom_id:reference,description:clean(`${quote.productName}${quote.variantName?` — ${quote.variantName}`:""}`,127),amount:{currency_code:DEFAULT_CURRENCY,value:centsToValue(quote.totalCents),breakdown},items:[{name:clean(quote.productName,127),quantity:String(quote.quantity),unit_amount:{currency_code:DEFAULT_CURRENCY,value:centsToValue(quote.unitPriceCents)},...(quote.variantName?{description:clean(quote.variantName,127)}:{}),category:quote.physical?"PHYSICAL_GOODS":"DIGITAL_GOODS"}]};
  if (quote.physical) purchaseUnit.shipping={name:{full_name:address.fullName},address:{address_line_1:address.address1,...(address.address2?{address_line_2:address.address2}:{}),admin_area_2:address.city,admin_area_1:address.state,postal_code:address.postalCode,country_code:address.countryCode}};
  return purchaseUnit;
}

export const __storeCheckoutTest = { buildPayPalPurchaseUnit };

'''
s=one(s,'async function createStoreOrder(request, env) {',helper+'async function createStoreOrder(request, env) {','paypal helper insert')
s=s.replace('!["apparel", "rv"].includes(source)','!["apparel", "rv", "lithium"].includes(source)')
s=sub1(s,r'  const reference = storeReference\(\);\n  const purchaseUnit = \{.*?\n  if \(quote\.physical\) \{.*?\n  \}\n\n  const requestBody = \{','  const reference = storeReference();\n  const purchaseUnit = buildPayPalPurchaseUnit(quote, reference, address);\n\n  const requestBody = {','paypal purchase unit replace')
s=one(s,'JSON.stringify(quote.doba || {}),','JSON.stringify({...quote.doba,promotion:{pricingMode:quote.promotion?.pricingMode||"existing",markupPercent:quote.promotion?.markupPercent??null,couponCode:quote.couponCode||"",couponPercent:quote.couponPercent||0,discountCents:quote.discountCents||0,listMerchandiseCents:quote.listMerchandiseCents??quote.merchandiseCents,battery:quote.battery||{}}}),','order pricing audit')
s=one(s,'      apparelShippingPerItem: "7.00",','      apparelShippingPerItem: "7.00",\n      promotion: publicPromotion(await getPromotionConfig(env)),','checkout config promotion')
write(p,s)

# Checkout browser UI.
p='site/store-checkout.js'; s=read(p)
s=one(s,'  const merchandiseEl = document.querySelector("#checkout-merchandise");','  const listMerchandiseEl = document.querySelector("#checkout-list-merchandise");\n  const merchandiseEl = document.querySelector("#checkout-merchandise");\n  const discountRow = document.querySelector("#checkout-discount-row");\n  const discountEl = document.querySelector("#checkout-discount");\n  const couponCodeEl = document.querySelector("#checkout-coupon");\n  const couponStatusEl = document.querySelector("#checkout-coupon-status");','checkout ui refs')
s=one(s,'    variantId: variantEl?.value || "",\n    ...(source === "rv" ? { shipping: shipping() } : {}),','    variantId: variantEl?.value || "",\n    couponCode: couponCodeEl?.value.trim() || "",\n    ...(["rv","lithium"].includes(source) ? { shipping: shipping() } : {}),','checkout payload')
s=one(s,'    merchandiseEl.textContent = money(next.merchandiseCents);\n    shippingEl.textContent = money(next.shippingCents);','    if (listMerchandiseEl) listMerchandiseEl.textContent = money(next.listMerchandiseCents ?? next.merchandiseCents);\n    merchandiseEl.textContent = money(next.merchandiseCents);\n    if (discountRow && discountEl) { discountRow.hidden = !(Number(next.discountCents) > 0); discountEl.textContent = Number(next.discountCents) > 0 ? `-${money(next.discountCents)}` : money(0); }\n    if (couponStatusEl) couponStatusEl.textContent = next.couponCode ? `${next.couponCode} applied — shipping is not discounted.` : (next.promotion?.active ? `Labor Day coupon available for eligible merchandise.` : "");\n    shippingEl.textContent = money(next.shippingCents);','checkout render pricing')
s=one(s,'  if (source === "rv") {','  if (["rv","lithium"].includes(source)) {','address refresh lithium')
s=one(s,'    if (!["apparel", "rv"].includes(source) || !id) {','    if (!["apparel", "rv", "lithium"].includes(source) || !id) {','checkout source init')
s=one(s,'  quantityEl.addEventListener("change", refreshQuote);','  quantityEl.addEventListener("change", refreshQuote);\n  document.querySelector("#checkout-apply-coupon")?.addEventListener("click", refreshQuote);\n  couponCodeEl?.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); refreshQuote(); } });','coupon interaction')
write(p,s)

# Checkout HTML + styling.
p='site/checkout/index.html'; s=read(p)
s=one(s,'          <div class="eus-checkout-section-label">Contact & shipping</div>','          <div class="eus-checkout-section-label">Labor Day coupon</div>\n          <div class="eus-checkout-coupon-row"><label class="eus-checkout-field-wide"><span>Coupon code</span><input id="checkout-coupon" name="coupon" autocomplete="off" maxlength="40" placeholder="LABORDAY25"></label><button id="checkout-apply-coupon" class="eus-checkout-coupon-button" type="button">Apply</button></div>\n          <p id="checkout-coupon-status" class="eus-checkout-coupon-status">25% off eligible Elevation merchandise. Shipping is excluded.</p>\n\n          <div class="eus-checkout-section-label">Contact & shipping</div>','coupon field html')
s=one(s,'        <dl class="eus-checkout-summary">\n          <div><dt>Items</dt><dd id="checkout-merchandise">—</dd></div>','        <dl class="eus-checkout-summary">\n          <div><dt>Merchandise list</dt><dd id="checkout-list-merchandise">—</dd></div>\n          <div id="checkout-discount-row" hidden><dt>Coupon</dt><dd id="checkout-discount">—</dd></div>\n          <div><dt>Merchandise after coupon</dt><dd id="checkout-merchandise">—</dd></div>','checkout summary')
write(p,s)
p='site/store-checkout.css'; s=read(p); s+='\n.eus-checkout-coupon-row{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end}.eus-checkout-coupon-button{min-height:46px;padding:0 18px;border:1px solid rgba(212,175,85,.5);border-radius:9px;background:#15110a;color:#f0cf78;font-weight:800;cursor:pointer}.eus-checkout-coupon-status{margin:7px 0 0;color:#aaa295;font-size:.82rem;line-height:1.45}@media(max-width:620px){.eus-checkout-coupon-row{grid-template-columns:1fr}.eus-checkout-coupon-button{width:100%}}\n'; write(p,s)

# Distinct lithium checkout source and Hawaii request-only behavior.
p='site/lithium-shop.js'; s=read(p); s=s.replace('/checkout/?source=rv&id=${encodeURIComponent(id)}','/checkout/?source=lithium&id=${encodeURIComponent(id)}')
old='''    const actionMarkup = hawaiiMode
      ? `<a class="button button-primary" href="${esc(checkoutUrl)}">Buy Now</a>`
      : `<div class="lithium-card__actions"><a class="button button-outline" href="${esc(detailUrl)}">View Details</a><a class="button button-primary" href="${esc(checkoutUrl)}">Buy Now</a></div>`;'''
new='''    const actionMarkup = hawaiiMode
      ? `<a class="button button-primary" href="#hawaii-request">Request Shipping Availability</a>`
      : `<div class="lithium-card__actions"><a class="button button-outline" href="${esc(detailUrl)}">View Details</a><a class="button button-primary" href="${esc(checkoutUrl)}">Buy Now</a></div>`;'''
s=one(s,old,new,'Hawaii buy removal'); write(p,s)
p='site/product-detail.js'; s=read(p)
s=one(s,'    let url = `/checkout/?source=rv&id=${encodeURIComponent(id)}&name=${encodeURIComponent(rawName)}`;','    const checkoutSource = sectionFor(product) === "lithium" ? "lithium" : "rv";\n    let url = `/checkout/?source=${checkoutSource}&id=${encodeURIComponent(id)}&name=${encodeURIComponent(rawName)}`;','product detail checkout source'); write(p,s)

# Worker API routing + prerender checkout source.
p='site/_worker.js'; s=read(p)
s=one(s,'import { handleApparelProviderAdminApi } from "./apparel-provider-runtime.js";','import { handleApparelProviderAdminApi } from "./apparel-provider-runtime.js";\nimport { handlePromotionPublicApi, handlePromotionAdminApi } from "./promotion-runtime.js";','worker promotion import')
s=s.replace('/checkout/?source=rv&id=${encodeURIComponent(id)}&name=${encodeURIComponent(clean(product?.title||view.title,240))}','/checkout/?source=lithium&id=${encodeURIComponent(id)}&name=${encodeURIComponent(clean(product?.title||view.title,240))}')
s=one(s,'    if(url.pathname==="/api/store-checkout/config"||isQuote||isCreate||isCapture) return handleStoreCheckoutApi(request,env,url.pathname);','    if(url.pathname==="/api/store-checkout/config"||isQuote||isCreate||isCapture) return handleStoreCheckoutApi(request,env,url.pathname);\n    if(url.pathname==="/api/store/promotion") return handlePromotionPublicApi(request,env);\n    if(url.pathname==="/api/admin/promotion") return handlePromotionAdminApi(request,env);','worker promo routes'); write(p,s)

# Doba 45% export profile; existing generic formula recovers export/(1+markup).
p='site/doba-csv-sync-runtime.js'; s=read(p)
s=one(s,'const DEFAULT_PROFILE_NAME = "Doba Download Center — 25% Markup";','const DEFAULT_PROFILE_NAME = "Doba Download Center — 25% Markup";\nconst LABOR_DAY_PROFILE_ID = "doba-download-center-45";\nconst LABOR_DAY_PROFILE_NAME = "Doba Download Center — 45% Markup Export";','Doba 45 constants')
old='''  const stamp=now();await db.prepare(`INSERT OR IGNORE INTO eus_doba_csv_profiles(id,name,source_label,markup_percent,default_scope,created_at,updated_at,updated_by) VALUES(?,?,?,?,?,?,?,?)`).bind(DEFAULT_PROFILE_ID,DEFAULT_PROFILE_NAME,"Doba Download Center",25,"partial",stamp,stamp,"system").run();
  return db;'''
new='''  const stamp=now();await db.prepare(`INSERT OR IGNORE INTO eus_doba_csv_profiles(id,name,source_label,markup_percent,default_scope,created_at,updated_at,updated_by) VALUES(?,?,?,?,?,?,?,?)`).bind(DEFAULT_PROFILE_ID,DEFAULT_PROFILE_NAME,"Doba Download Center",25,"partial",stamp,stamp,"system").run();
  await db.prepare(`INSERT OR IGNORE INTO eus_doba_csv_profiles(id,name,source_label,markup_percent,default_scope,created_at,updated_at,updated_by) VALUES(?,?,?,?,?,?,?,?)`).bind(LABOR_DAY_PROFILE_ID,LABOR_DAY_PROFILE_NAME,"Doba Download Center",45,"partial",stamp,stamp,"master-2.0-approved").run();
  return db;'''
s=one(s,old,new,'Doba 45 profile seed'); write(p,s)
p='site/admin-channels.html'; s=read(p)
s=one(s,'<div class="eus-callout"><strong>Pricing rule:</strong> the saved 25% profile derives base supplier cost as <code>Dropshipping Price ÷ 1.25</code>. Partial Snapshot leaves missing products untouched. New products never auto-publish.</div>','<div class="eus-callout"><strong>Supplier-cost recovery:</strong> use the profile that matches the Doba export. The 25% profile uses <code>Export Price ÷ 1.25</code>; the approved 45% export profile uses <code>Export Price ÷ 1.45</code>. The selected profile and markup are recorded with every run. Partial Snapshot leaves missing products untouched. New products never auto-publish.</div>','Doba admin copy'); write(p,s)

# Admin navigation and pretty route.
p='site/admin.html'; s=read(p)
s=one(s,'    <a class="eus-work-card" href="/admin-catalog"><strong>Products & Listings</strong>','    <a class="eus-work-card" href="/admin-promotion"><strong>Pricing & Promotions</strong><span>Labor Day pricing, coupon state, eligibility, exclusions and clean deactivation.</span></a>\n    <a class="eus-work-card" href="/admin-catalog"><strong>Products & Listings</strong>','admin promo tile'); write(p,s)
p='site/_redirects'; s=read(p); s=one(s,'/admin-channels.html /admin-channels 301','/admin-channels.html /admin-channels 301\n/admin-promotion.html /admin-promotion 301'); write(p,s)

# Dynamic public promotion banner on buyer-facing surfaces; homepage Funnel body stays intact.
for p in ['site/index.html','site/lithium-batteries.html','site/rv-store.html','site/product.html','site/store.html','site/checkout/index.html']:
    inject_assets(p)

print('Labor Day integration patch complete')
