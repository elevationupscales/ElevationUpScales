import { ensureCommerceSchema } from "./commerce-schema-migrations.js";
import { getPromotionConfig, pricingForProduct, applyCoupon, isActualLithiumBattery, batteryUnitsPerCatalogUnit, publicPromotion } from "./promotion-runtime.js";
import { resolveShippingRule } from "./shipping-rules-runtime.js";
import { resolveHawaiiCustomerStatus } from "./hawaii-lithium-runtime.js";
import { evaluateSokHawaiiOrder } from "./sok-operations-runtime.js";
import { getSokCheckoutEntry } from "./sok-availability-runtime.js";
const PAYPAL_SANDBOX_ORIGIN = "https://api-m.sandbox.paypal.com";
const PAYPAL_LIVE_ORIGIN = "https://api-m.paypal.com";
const FOURTHWALL_ORIGIN = "https://elevationupscales-shop.fourthwall.com";
const DEFAULT_CURRENCY = "USD";
const APPAREL_MARKUP = 1.20;
const APPAREL_SHIPPING_CENTS = 700;
const MAX_QTY = 10;
const HAWAII_CUSTOMER_FREIGHT_CENTS_PER_BATTERY = 9900;
const HAWAII_PREFERRED_CONSOLIDATION_UNITS = 3;

const JSON_HEADERS = Object.freeze({
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
});

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), { status, headers: { ...JSON_HEADERS, ...extraHeaders } });
}

function clean(value, max = 300) {
  return String(value ?? "").trim().slice(0, max);
}


function paypalMode(env) {
  return clean(env?.PAYPAL_ENV, 20).toLowerCase() === "live" ? "live" : "sandbox";
}

function paypalOrigin(env) {
  return paypalMode(env) === "live" ? PAYPAL_LIVE_ORIGIN : PAYPAL_SANDBOX_ORIGIN;
}

function paypalConfigured(env) {
  return Boolean(clean(env?.PAYPAL_CLIENT_ID, 300) && clean(env?.PAYPAL_CLIENT_SECRET, 300));
}

function envFlag(value) {
  return ["1", "true", "yes", "on"].includes(clean(value, 20).toLowerCase());
}

function liveCheckoutAllowed(env) {
  return paypalMode(env) !== "live" || envFlag(env?.STORE_LIVE_CHECKOUT_ENABLED);
}

function centsToValue(cents) {
  return `${Math.floor(cents / 100)}.${String(cents % 100).padStart(2, "0")}`;
}

function dollarsToCents(value) {
  if (value && typeof value === "object") {
    const directCents = Number.parseInt(String(value.cents ?? ""), 10);
    if (Number.isInteger(directCents) && directCents >= 0) return directCents;
    value = value.value ?? value.amount ?? value.price ?? "";
  }
  const parsed = Number.parseFloat(String(value ?? "").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? Math.round(parsed * 100) : null;
}

function quantity(value) {
  const parsed = Number.parseInt(String(value ?? "1"), 10);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= MAX_QTY ? parsed : 1;
}

function validQuantity(value) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= MAX_QTY;
}

function validEmail(value) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean(value, 180));
}

function validOrderId(value) {
  const id = clean(value, 80);
  return /^[A-Z0-9]{8,40}$/i.test(id) ? id : "";
}

function extractProducts(data) {
  return [data, data?.products, data?.results, data?.items, data?.collection?.products, data?.data?.products, data?.data?.results].find(Array.isArray) || [];
}

function slugFromProduct(product) {
  const direct = clean(product?.slug || product?.handle, 240).replace(/^\/+|\/+$/g, "").replace(/^products\//i, "");
  if (direct) return direct;
  for (const value of [product?.url, product?.productUrl, product?.permalink]) {
    try {
      const match = new URL(String(value || ""), FOURTHWALL_ORIGIN).pathname.match(/^\/products\/([^/?#]+)/i);
      if (match) return decodeURIComponent(match[1]);
    } catch (_) {}
  }
  return "";
}

function productId(product) {
  return clean(product?.id || product?.productId || product?.offerId || slugFromProduct(product) || product?.name || product?.title, 300);
}

function priceFromProduct(product) {
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const variantPrices = variants
    .map((variant) => dollarsToCents(variant?.unitPrice?.value ?? variant?.price?.value ?? variant?.price ?? variant?.amount))
    .filter((value) => Number.isInteger(value));
  const direct = dollarsToCents(product?.price?.value ?? product?.price?.amount ?? product?.price ?? product?.minPrice?.value ?? product?.minPrice);
  return Number.isInteger(direct) ? direct : (variantPrices.length ? Math.min(...variantPrices) : null);
}

function imageUrl(value) {
  if (typeof value === "string") return clean(value, 1200);
  return clean(value?.url || value?.src || value?.imageUrl || value?.transformedUrl, 1200);
}

function variantImages(variant) {
  const candidates = [
    ...(Array.isArray(variant?.images) ? variant.images : []),
    ...(Array.isArray(variant?.media) ? variant.media : []),
    variant?.thumbnailImage,
    variant?.image,
  ];
  return candidates.map(imageUrl).filter(Boolean);
}

function productImages(product) {
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const candidates = [
    ...(Array.isArray(product?.images) ? product.images : []),
    ...(Array.isArray(product?.media) ? product.media : []),
    product?.image,
    product?.featuredImage,
    product?.primaryImage,
    product?.thumbnailImage,
    ...variants.flatMap(variantImages),
  ];
  return [...new Set(candidates.map(imageUrl).filter(Boolean))];
}

function variantId(variant, index) {
  return clean(variant?.id || variant?.variantId || variant?.sku || variant?.offerId || `variant-${index + 1}`, 240);
}

function variantLabel(variant, index) {
  const direct = clean(variant?.name || variant?.title || variant?.variantName || variant?.displayName, 180);
  if (direct) return direct;
  const values = [];
  const options = variant?.options || variant?.optionValues || variant?.attributes;
  if (Array.isArray(options)) {
    for (const option of options) {
      const value = clean(option?.value || option?.name || option?.label || option, 80);
      if (value) values.push(value);
    }
  } else if (options && typeof options === "object") {
    for (const value of Object.values(options)) {
      const text = clean(value?.value || value?.name || value, 80);
      if (text) values.push(text);
    }
  }
  return values.join(" / ") || `Variant ${index + 1}`;
}

function physicalApparel(product) {
  const text = `${clean(product?.name || product?.title, 240)} ${clean(product?.description || product?.descriptionHtml, 800)}`.toLowerCase();
  return !/(digital|download|printable|pdf\b)/.test(text);
}

async function fetchFourthwallProductLegacy(id) {
  const wanted = clean(id, 300);
  if (!wanted) return null;
  for (let page = 1; page <= 10; page += 1) {
    const suffix = page === 1 ? "/collections/all.json" : `/collections/all/${page}.json`;
    const response = await fetch(`${FOURTHWALL_ORIGIN}${suffix}`, {
      headers: { Accept: "application/json" },
      cf: { cacheTtl: 60, cacheEverything: true },
    });
    if (!response.ok) break;
    const rows = extractProducts(await response.json().catch(() => ({})));
    if (!rows.length) break;
    for (const product of rows) {
      if ([productId(product), slugFromProduct(product)].includes(wanted)) return product;
    }
  }
  return null;
}

function readDobaMap(env) {
  try {
    const parsed = JSON.parse(clean(env?.DOBA_PRODUCT_MAP_JSON, 50_000) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (_) {
    return {};
  }
}

function rvMapEntry(env, id) {
  const map = readDobaMap(env);
  const entry = map[clean(id, 120)];
  return entry && typeof entry === "object" && !Array.isArray(entry) ? entry : null;
}

function trustedEbayUrl(value) {
  const raw = clean(value, 300);
  return /^https:\/\/www\.ebay\.com\/itm\/\d{12}$/i.test(raw) ? raw : "";
}
function ebayUrlFromItemId(value) {
  const itemId = clean(value, 30);
  return /^\d{12}$/.test(itemId) ? `https://www.ebay.com/itm/${itemId}` : "";
}
async function catalogRvFallbackUrl(env, id) {
  const db = env?.MARKETPLACE_DB;
  const wanted = clean(id, 140);
  if (!db || typeof db.prepare !== "function" || !wanted) return "";
  try {
    const row = await db.prepare(`SELECT m.ebay_item_id FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id WHERE (i.id=? OR lower(i.supplier_product_id)=lower(?) OR m.ebay_item_id=?) AND i.supplier='doba' LIMIT 1`).bind(wanted,wanted,wanted).first();
    return ebayUrlFromItemId(row?.ebay_item_id);
  } catch (error) {
    console.error(JSON.stringify({event:"rv_checkout_fallback_lookup_error",message:clean(error?.message,240)}));
    return "";
  }
}

async function catalogRvEntry(env, id) {
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

function normalizeAddress(raw = {}) {
  return {
    fullName: clean(raw.fullName, 120),
    address1: clean(raw.address1, 180),
    address2: clean(raw.address2, 180),
    city: clean(raw.city, 120),
    state: clean(raw.state, 80).toUpperCase(),
    postalCode: clean(raw.postalCode, 30).toUpperCase(),
    countryCode: (clean(raw.countryCode, 2).toUpperCase() || "US").slice(0, 2),
  };
}

function validAddress(address) {
  return Boolean(
    address.fullName && address.address1 && address.city &&
    /^[A-Z]{2}$/.test(address.state) &&
    /^\d{5}(?:-\d{4})?$/.test(address.postalCode) &&
    address.countryCode === "US"
  );
}

function normalizeCustomer(raw = {}) {
  return {
    email: clean(raw.email, 180).toLowerCase(),
    phone: clean(raw.phone, 60),
  };
}

const fourthwallProductCache = new Map();

function slugFromUrl(value) {
  try {
    const match = new URL(String(value || ""), FOURTHWALL_ORIGIN).pathname.match(/\/products\/([^/?#]+)/i);
    return match ? decodeURIComponent(match[1]) : "";
  } catch (_) { return ""; }
}

async function catalogApparelReference(env, id) {
  const wanted = clean(id, 300);
  const db = env?.MARKETPLACE_DB;
  if (!wanted || !db || typeof db.prepare !== "function") return { slug: wanted };
  try {
    const like = `%/products/${wanted}`;
    const row = await db.prepare(`SELECT i.id,i.source_url,m.fourthwall_product_id,l.provider_product_id,l.provider_product_url,l.provider_state
      FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id
      LEFT JOIN eus_catalog_provider_links l ON l.catalog_product_id=i.id AND l.provider='fourthwall'
      WHERE m.store_section='apparel' AND (i.id=? OR m.fourthwall_product_id=? OR l.provider_product_id=? OR lower(i.source_url) LIKE lower(?) OR lower(l.provider_product_url) LIKE lower(?))
      ORDER BY CASE WHEN l.provider_state='MAPPED' THEN 0 ELSE 1 END LIMIT 1`)
      .bind(wanted,wanted,wanted,like,like).first();
    if (!row) return { slug: wanted };
    return { slug: slugFromUrl(row.provider_product_url) || slugFromUrl(row.source_url) || clean(row.fourthwall_product_id,300) || clean(row.provider_product_id,300) || wanted };
  } catch (error) {
    console.error(JSON.stringify({event:"apparel_catalog_reference_error",message:clean(error?.message,240)}));
    return { slug: wanted };
  }
}

async function fetchFourthwallProductExact(reference) {
  const slug = clean(reference?.slug, 300);
  if (!slug) return null;
  const cached = fourthwallProductCache.get(slug);
  if (cached && cached.expiresAt > Date.now()) return cached.product;
  try {
    const response = await fetch(`${FOURTHWALL_ORIGIN}/products/${encodeURIComponent(slug)}.json`, {
      headers: { Accept: "application/json" },
      cf: { cacheTtl: 300, cacheEverything: true },
    });
    if (response.ok) {
      const body = await response.json().catch(() => ({}));
      const product = body?.product || body?.data?.product || body;
      if (product && [productId(product), slugFromProduct(product), slug].includes(slug)) {
        fourthwallProductCache.set(slug, { product, expiresAt: Date.now() + 300000 });
        return product;
      }
    }
  } catch (_) {}
  const product = await fetchFourthwallProductLegacy(slug);
  if (product) fourthwallProductCache.set(slug, { product, expiresAt: Date.now() + 120000 });
  return product;
}

async function quoteApparel(raw, env) {
  if (clean(raw?.couponCode,120)) return { ok:false,status:409,error:"Labor Day coupon is not eligible for Apparel" };
  const reference = await catalogApparelReference(env, raw?.id);
  const product = await fetchFourthwallProductExact(reference);
  if (!product) return { ok: false, status: 404, error: "Product unavailable" };

  const qty = quantity(raw?.quantity);
  const variants = Array.isArray(product?.variants) ? product.variants : [];
  const requestedVariant = clean(raw?.variantId, 240);
  let selectedVariant = null;
  if (requestedVariant) {
    selectedVariant = variants.find((variant, index) => variantId(variant, index) === requestedVariant) || null;
    if (!selectedVariant) return { ok: false, status: 400, error: "Selected product option is unavailable" };
  } else if (variants.length === 1) {
    selectedVariant = variants[0];
  }

  // Fourthwall frequently supplies a verified product-level price while variant
  // records carry option data only. A selected variant therefore inherits the
  // verified product price when its own price field is absent.
  const productBaseCents = priceFromProduct(product);
  const variantBaseCents = selectedVariant
    ? dollarsToCents(selectedVariant?.unitPrice?.value ?? selectedVariant?.price?.value ?? selectedVariant?.price ?? selectedVariant?.amount)
    : null;
  const selectedBaseCents = Number.isInteger(variantBaseCents) ? variantBaseCents : productBaseCents;
  if (!Number.isInteger(selectedBaseCents)) return { ok: false, status: 502, error: "Product price unavailable" };

  const unitPriceCents = Math.round(selectedBaseCents * APPAREL_MARKUP);
  const merchandiseCents = unitPriceCents * qty;
  const shippingCents = physicalApparel(product) ? APPAREL_SHIPPING_CENTS * qty : 0;
  const totalCents = merchandiseCents + shippingCents;
  const defaultImage = productImages(product)[0] || "";
  const selectedImage = selectedVariant ? (variantImages(selectedVariant)[0] || defaultImage) : defaultImage;

  return {
    ok: true,
    source: "apparel",
    id: productId(product),
    productName: clean(product?.name || product?.title, 240) || "Elevation UpScales item",
    productImage: selectedImage,
    quantity: qty,
    unitPriceCents,
    merchandiseCents,
    shippingCents,
    totalCents,
    variantId: selectedVariant ? variantId(selectedVariant, variants.indexOf(selectedVariant)) : "",
    variantName: selectedVariant ? variantLabel(selectedVariant, variants.indexOf(selectedVariant)) : "",
    variants: variants.map((variant, index) => {
      const directBase = dollarsToCents(variant?.unitPrice?.value ?? variant?.price?.value ?? variant?.price ?? variant?.amount);
      const base = Number.isInteger(directBase) ? directBase : productBaseCents;
      return {
        id: variantId(variant, index),
        label: variantLabel(variant, index),
        image: variantImages(variant)[0] || defaultImage,
        priceCents: Number.isInteger(base) ? Math.round(base * APPAREL_MARKUP) : unitPriceCents,
      };
    }),
    physical: physicalApparel(product),
  };
}

async function quoteRv(raw, env) {
  const id = clean(raw?.id, 120);
  const source = clean(raw?.source,20).toLowerCase() === "lithium" ? "lithium" : "rv";
  const destinationState = clean(raw?.shipping?.state, 2).toUpperCase();
  const catalogEntry = await catalogRvEntry(env, id) || (source === "lithium" ? await getSokCheckoutEntry(env,id,destinationState) : null);
  const mappedEntry = source === "rv" ? rvMapEntry(env, id) : null;
  const entry = source === "lithium" ? catalogEntry : (catalogEntry || mappedEntry);
  const serverFallbackUrl = source === "rv" ? (trustedEbayUrl(mappedEntry?.ebayUrl) || ebayUrlFromItemId(mappedEntry?.ebayItemId) || await catalogRvFallbackUrl(env, id)) : "";
  const fallback = serverFallbackUrl ? {fallback:"ebay",ebayUrl:serverFallbackUrl} : {};
  if (!entry) return {ok:false,status:409,...fallback,error:source==="lithium"?"Lithium Catalog identity or verified shipping is unavailable":"Doba shipping is not mapped for this item"};
  if (entry.shippingVerified !== true) return {ok:false,status:409,...fallback,error:"Shipping is not verified for this item"};
  if (entry.storeSection && ((source==="lithium"&&entry.storeSection!=="lithium-batteries")||(source==="rv"&&entry.storeSection!=="rv-outdoor"))) return {ok:false,status:409,error:"Catalog store identity does not match checkout source"};
  const blockedStates = Array.isArray(entry.blockedStates) ? entry.blockedStates.map((value) => clean(value, 2).toUpperCase()) : [];
  const product = entry.productIdentity || {title:entry.name||raw?.name,category:"",supplier:"doba",supplierCostCents:0,priceCents:entry.priceCents,storeSection:source==="lithium"?"lithium-batteries":"rv-outdoor"};
  const config = await getPromotionConfig(env);
  const priced = pricingForProduct(product, config);
  const availability = entry.sokAvailability || null;
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
  const hawaiiSku=product?.sku||entry?.sku||"";
  const sokHawaiiGate=hawaiiFreight?await evaluateSokHawaiiOrder(env,{productId:id,sku:hawaiiSku,quantity:qty,overrideToken:clean(raw?.hawaiiQuantityOverride,240),orderKey:clean(raw?.customer?.email||raw?.email,180)}):null;
  if(sokHawaiiGate?.blocked)return {ok:false,status:sokHawaiiGate.status||409,error:sokHawaiiGate.label||"Freight Review Required",shippingReviewRequired:true,commercialQuoteRequired:Boolean(sokHawaiiGate.commercialQuoteRequired),maxStandardQuantity:sokHawaiiGate.maxStandardQuantity||3};
  const hawaiiStatus = hawaiiFreight ? await resolveHawaiiCustomerStatus(env,{productId:id,sku:hawaiiSku,destination:"Hawaii — General"}) : null;
  const hawaiiPickupFreightCents = hawaiiFreight ? Number(ruleResult?.shippingCents||0) : 0;
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
    availability:availability?{...availability,reservationUrl:`/sok-order.html?sku=${encodeURIComponent(hawaiiSku||product?.sku||"")}&mode=${encodeURIComponent(availability.mode||"unavailable")}&qty=${qty}${destinationState?`&state=${encodeURIComponent(destinationState)}`:""}`} : null,
    unitPriceCents,listMerchandiseCents,discountCents:coupon.discountCents,merchandiseCents:coupon.merchandiseCents,shippingCents,totalCents:coupon.merchandiseCents+shippingCents,
    couponCode:coupon.couponCode,couponPercent:coupon.couponPercent,promotion:priced.promotion,shippingRule,
    variantId:"",variantName:"",variants:[],physical:true,
    battery:{actualBattery,batteryUnitsPerItem,shippingPerBatteryCents:actualBattery?Number(rule?.rateCents||0):0},
    ...(hawaiiFreight?{hawaii:{customerState:hawaiiStatus?.customerState||"review_required",statusLabel:hawaiiStatus?.label||"Freight Review Required",customerFreightPerBatteryCents:Number(rule?.rateCents||9900),preferredConsolidationUnits:Number(rule?.preferredConsolidationQuantity||3),warehousePickupOnly:Boolean(rule?.pickupOnly??true),pickupLocationLabel:"Honolulu warehouse / freight-terminal pickup location",merchandiseAfterCouponCents:coupon.merchandiseCents,pickupFreightCents:hawaiiPickupFreightCents,pickupPriceCents:coupon.merchandiseCents+hawaiiPickupFreightCents,requiresReservation:(hawaiiStatus?.customerState||"review_required")!=="shipping_available",paymentAllowed:(hawaiiStatus?.customerState||"review_required")==="shipping_available",finalMileQuoteRequired:true,finalMileMessage:"Need delivery from our Honolulu pickup location to your home, business or another address? Contact Elevation for a delivery quote.",supportPhone:"208-813-4998",supportEmail:"casey@elevationupscales.com",timing:rule?.timingMessage||"Honolulu warehouse / freight-terminal pickup. Shipment timing is estimated and not guaranteed.",requestUrl}}:{}),
    doba:{itemNo:clean(entry.itemNo,120),skuId:clean(entry.skuId,120),spuNo:clean(entry.spuNo,120)}
  };
}
async function quoteStoreItem(raw, env) {
  const source = clean(raw?.source, 20).toLowerCase();
  if (source === "apparel") return quoteApparel(raw, env);
  if (source === "rv" || source === "lithium") return quoteRv(raw, env);
  return { ok: false, status: 400, error: "Invalid store source" };
}

let paypalTokenCache = { key: "", token: "", expiresAt: 0 };

function clearPaypalTokenCache() {
  paypalTokenCache = { key: "", token: "", expiresAt: 0 };
}

async function paypalAccessToken(env, forceRefresh = false) {
  if (!paypalConfigured(env)) throw new Error("PayPal credentials are not configured");
  const clientId = clean(env.PAYPAL_CLIENT_ID, 300);
  const cacheKey = `${paypalMode(env)}:${clientId}`;
  if (!forceRefresh && paypalTokenCache.key === cacheKey && paypalTokenCache.token && Date.now() < paypalTokenCache.expiresAt) {
    return paypalTokenCache.token;
  }
  const basic = btoa(`${clientId}:${clean(env.PAYPAL_CLIENT_SECRET, 300)}`);
  const response = await fetch(`${paypalOrigin(env)}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      "Accept-Language": "en_US",
    },
    body: "grant_type=client_credentials",
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body?.access_token) {
    clearPaypalTokenCache();
    throw new Error("Unable to authorize PayPal checkout");
  }
  const expiresIn = Number.parseInt(String(body?.expires_in ?? "300"), 10);
  const ttlSeconds = Number.isInteger(expiresIn) && expiresIn > 60 ? expiresIn - 30 : 270;
  paypalTokenCache = { key: cacheKey, token: clean(body.access_token, 4000), expiresAt: Date.now() + ttlSeconds * 1000 };
  return paypalTokenCache.token;
}

async function paypalRequest(env, path, options = {}) {
  const requestId = crypto.randomUUID();
  const send = async (forceRefresh = false) => {
    const token = await paypalAccessToken(env, forceRefresh);
    return fetch(`${paypalOrigin(env)}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
        "PayPal-Request-Id": requestId,
        ...(options.headers || {}),
      },
    });
  };
  let response = await send(false);
  if (response.status === 401) {
    clearPaypalTokenCache();
    response = await send(true);
  }
  const body = await response.json().catch(() => ({}));
  return { response, body };
}


function storeReference() {
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `EUS-STORE-${day}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

function buildPayPalPurchaseUnit(quote, reference, address) {
  const listMerchandiseCents = Number.isInteger(quote.listMerchandiseCents) ? quote.listMerchandiseCents : quote.merchandiseCents;
  const breakdown = {
    item_total:{currency_code:DEFAULT_CURRENCY,value:centsToValue(listMerchandiseCents)},
    shipping:{currency_code:DEFAULT_CURRENCY,value:centsToValue(quote.shippingCents)},
  };
  if (Number(quote.discountCents)>0) breakdown.discount={currency_code:DEFAULT_CURRENCY,value:centsToValue(quote.discountCents)};
  const purchaseUnit={reference_id:reference,custom_id:reference,description:clean(`${quote.productName}${quote.variantName?` — ${quote.variantName}`:""}`,127),amount:{currency_code:DEFAULT_CURRENCY,value:centsToValue(quote.totalCents),breakdown},items:[{name:clean(quote.productName,127),quantity:String(quote.quantity),unit_amount:{currency_code:DEFAULT_CURRENCY,value:centsToValue(quote.unitPriceCents)},...(quote.variantName?{description:clean(quote.variantName,127)}:{}),category:quote.physical?"PHYSICAL_GOODS":"DIGITAL_GOODS"}]};
  if (quote.physical && !(quote.hawaii?.customerState === "shipping_available" && quote.hawaii?.warehousePickupOnly)) purchaseUnit.shipping={name:{full_name:address.fullName},address:{address_line_1:address.address1,...(address.address2?{address_line_2:address.address2}:{}),admin_area_2:address.city,admin_area_1:address.state,postal_code:address.postalCode,country_code:address.countryCode}};
  return purchaseUnit;
}

export const __storeCheckoutTest = { buildPayPalPurchaseUnit };

async function createStoreOrder(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "POST" });

  const raw = await request.json().catch(() => ({}));
  const source = clean(raw?.source, 20).toLowerCase();
  if (!["apparel", "rv", "lithium"].includes(source)) return json({ error: "Invalid store source" }, 400);
  if (!validQuantity(raw?.quantity)) return json({ error: "Quantity must be from 1 to 10" }, 400);
  const customer = normalizeCustomer(raw?.customer);
  if (!validEmail(customer.email)) return json({ error: "A valid customer email is required" }, 400);
  const quote = await quoteStoreItem(raw, env);
  if (!quote.ok) return json(quote, quote.status || 400);
  if (quote.availability?.paymentEligible === false) return json({error:quote.availability?.mode==="prepurchase"?"Pre-Purchase timing must be confirmed before payment.":quote.availability?.mode==="backorder"?"Backorder replenishment and timing must be confirmed before payment.":"This item is not currently eligible for payment.",reservationRequired:true,reservationUrl:quote.availability?.reservationUrl,quote},409);
  if (quote.availability?.requiresTimingAcknowledgement && raw?.availabilityTimingAcknowledged !== true) return json({error:"Please acknowledge the estimated fulfillment timing before payment.",timingAcknowledgementRequired:true,quote},409);
  if (quote.hawaii?.customerState === "review_required") return json({error:"Freight Review Required. Elevation will verify the battery and Hawaii freight path and contact you with the next step.",hawaiiFreight:true,requestUrl:quote.hawaii.requestUrl,quote},409);
  if (quote.hawaii?.customerState === "unavailable") return json({error:"Currently Unavailable for Hawaii Shipping",hawaiiFreight:true,requestUrl:quote.hawaii.requestUrl,quote},409);
  if (!paypalConfigured(env)) return json({ error: "PayPal checkout is not configured" }, 503);
  if (!liveCheckoutAllowed(env)) return json({ error: "Live checkout is locked pending launch approval" }, 503);
  const address = normalizeAddress(raw?.shipping);
  const hawaiiPickup = quote.hawaii?.customerState === "shipping_available" && quote.hawaii?.warehousePickupOnly;
  if (quote.physical && !hawaiiPickup && !validAddress(address)) return json({ error: "A valid U.S. shipping address is required" }, 400);
  if (hawaiiPickup && (!address.fullName || !validEmail(customer.email))) return json({ error: "Name and email are required for Hawaii pickup orders" }, 400);
  let db;
  try { db = await ensureCommerceSchema(env); }
  catch (error) {
    console.error(JSON.stringify({event:"commerce_schema_error",message:clean(error?.message,240)}));
    return json({ error: "Store order storage is not configured" }, 503);
  }

  const reference = storeReference();
  const purchaseUnit = buildPayPalPurchaseUnit(quote, reference, address);

  const requestBody = {
    intent: "CAPTURE",
    purchase_units: [purchaseUnit],
    payment_source: {
      paypal: {
        experience_context: {
          user_action: "PAY_NOW",
          shipping_preference: quote.physical && !(quote.hawaii?.customerState === "shipping_available" && quote.hawaii?.warehousePickupOnly) ? "SET_PROVIDED_ADDRESS" : "NO_SHIPPING",
          brand_name: "Elevation UpScales, Inc.",
        },
      },
    },
  };

  let response, body;
  try {
    ({ response, body } = await paypalRequest(env, "/v2/checkout/orders", {
      method: "POST",
      body: JSON.stringify(requestBody),
    }));
  } catch (error) {
    console.error(JSON.stringify({ event: "paypal_create_error", message: clean(error?.message, 240) }));
    return json({ error: "PayPal checkout is temporarily unavailable" }, 502);
  }
  if (!response.ok || !body?.id) return json({ error: "PayPal could not create the order" }, 502);

  await db.prepare(`
      INSERT INTO eus_store_orders
      (id,source,product_id,product_name,variant_id,variant_name,quantity,unit_price_cents,merchandise_cents,shipping_cents,total_cents,customer_json,shipping_json,supplier_json,paypal_order_id,paypal_capture_id,payment_status,created_at,paid_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `).bind(
      reference,
      quote.source,
      quote.id,
      quote.productName,
      quote.variantId || "",
      quote.variantName || "",
      quote.quantity,
      quote.unitPriceCents,
      quote.merchandiseCents,
      quote.shippingCents,
      quote.totalCents,
      JSON.stringify(customer),
      JSON.stringify(address),
      JSON.stringify({...quote.doba,shippingRule:quote.shippingRule||{},hawaii:quote.hawaii||null,availability:quote.availability||null,promotion:{pricingMode:quote.promotion?.pricingMode||"existing",markupPercent:quote.promotion?.markupPercent??null,couponCode:quote.couponCode||"",couponPercent:quote.couponPercent||0,discountCents:quote.discountCents||0,listMerchandiseCents:quote.listMerchandiseCents??quote.merchandiseCents,battery:quote.battery||{}}}),
      clean(body.id, 80),
      "",
      "created",
      new Date().toISOString(),
      null,
    ).run();

  return json({
    ok: true,
    id: clean(body.id, 80),
    reference,
    amount: centsToValue(quote.totalCents),
    currency: DEFAULT_CURRENCY,
  });
}

async function captureStoreOrder(request, env, orderId) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!paypalConfigured(env)) return json({ error: "PayPal checkout is not configured" }, 503);
  if (!liveCheckoutAllowed(env)) return json({ error: "Live checkout is locked pending launch approval" }, 503);
  const id = validOrderId(orderId);
  if (!id) return json({ error: "Invalid PayPal order ID" }, 400);
  let db;
  try { db = await ensureCommerceSchema(env); }
  catch (error) {
    console.error(JSON.stringify({event:"commerce_schema_error",message:clean(error?.message,240)}));
    return json({ error: "Store order storage is not configured" }, 503);
  }

  let response, body;
  try {
    ({ response, body } = await paypalRequest(env, `/v2/checkout/orders/${encodeURIComponent(id)}/capture`, {
      method: "POST",
      body: "{}",
    }));
  } catch (error) {
    console.error(JSON.stringify({ event: "paypal_capture_error", message: clean(error?.message, 240) }));
    return json({ error: "PayPal could not capture the payment" }, 502);
  }

  if (!response.ok) {
    const issue = clean(body?.details?.[0]?.issue, 100);
    return json({ error: issue === "INSTRUMENT_DECLINED" ? "INSTRUMENT_DECLINED" : "PayPal could not capture the payment" }, response.status === 422 ? 422 : 502);
  }

  const capture = body?.purchase_units?.[0]?.payments?.captures?.[0] || {};
  await db.prepare(`
      UPDATE eus_store_orders
      SET paypal_capture_id=?,payment_status=?,paid_at=?
      WHERE paypal_order_id=?
    `).bind(clean(capture?.id, 80), clean(capture?.status, 40) || clean(body?.status, 40), new Date().toISOString(), id).run();

  return json({
    ok: true,
    id: clean(body?.id || id, 80),
    status: clean(body?.status, 40),
    captureId: clean(capture?.id, 80),
    captureStatus: clean(capture?.status, 40),
    amount: clean(capture?.amount?.value, 40),
    currency: clean(capture?.amount?.currency_code, 10) || DEFAULT_CURRENCY,
  });
}

export async function handleStoreCheckoutApi(request, env, pathname) {
  const path = clean(pathname, 240);

  if (path === "/api/store-checkout/config") {
    if (request.method !== "GET" && request.method !== "HEAD") return json({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
    const credentialsConfigured = paypalConfigured(env);
    const checkoutEnabled = credentialsConfigured && liveCheckoutAllowed(env);
    const response = json({
      ok: true,
      configured: checkoutEnabled,
      credentialsConfigured,
      checkoutEnabled,
      liveCheckoutApproved: paypalMode(env) === "live" ? envFlag(env?.STORE_LIVE_CHECKOUT_ENABLED) : false,
      environment: paypalMode(env),
      clientId: checkoutEnabled ? clean(env.PAYPAL_CLIENT_ID, 300) : "",
      currency: DEFAULT_CURRENCY,
      apparelMarkupPercent: 20,
      apparelShippingPerItem: "7.00",
      promotion: publicPromotion(await getPromotionConfig(env)),
    });
    return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
  }

  if (path === "/api/store-checkout/quote") {
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
      const raw = await request.json().catch(() => ({}));
    const source = clean(raw?.source, 20).toLowerCase();
    if (!["apparel", "rv", "lithium"].includes(source)) return json({ error: "Invalid store source" }, 400);
    if (!validQuantity(raw?.quantity)) return json({ error: "Quantity must be from 1 to 10" }, 400);
    const quote = await quoteStoreItem(raw, env);
    return json(quote, quote.ok ? 200 : (quote.status || 400));
  }

  if (path === "/api/store-checkout/orders") return createStoreOrder(request, env);

  const capture = path.match(/^\/api\/store-checkout\/orders\/([A-Z0-9]{8,40})\/capture$/i);
  if (capture) return captureStoreOrder(request, env, capture[1]);

  return json({ error: "Store checkout endpoint not found" }, 404);
}
