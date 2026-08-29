const PAYPAL_SANDBOX_ORIGIN = "https://api-m.sandbox.paypal.com";
const PAYPAL_LIVE_ORIGIN = "https://api-m.paypal.com";
const FOURTHWALL_ORIGIN = "https://elevationupscales-shop.fourthwall.com";
const DEFAULT_CURRENCY = "USD";
const APPAREL_MARKUP = 1.20;
const APPAREL_SHIPPING_CENTS = 700;
const MAX_QTY = 10;

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

function sameOriginRequest(request) {
  const origin = clean(request.headers.get("Origin"), 500);
  if (!origin) return true;
  try { return origin === new URL(request.url).origin; } catch (_) { return false; }
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

async function fetchFourthwallProduct(id) {
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

async function catalogRvEntry(env, id) {
  const db = env?.MARKETPLACE_DB;
  const wanted = clean(id, 140);
  if (!db || typeof db.prepare !== "function" || !wanted) return null;
  try {
    const row = await db.prepare(`SELECT i.id,i.name,i.sku,i.supplier_product_id,i.price_cents,i.source_url,m.supplier_sku,m.supplier_stock,m.shipping_status,m.shipping_cents,m.primary_image,m.publish_status,m.review_state,s.spu_no,s.supplier_sku AS source_supplier_sku,s.supplier_stock AS source_stock,s.ship_to,s.shipping_method,s.estimated_shipping_cents,s.shipping_limitations,s.source_state
      FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id
      LEFT JOIN eus_doba_source_state s ON lower(s.item_no)=lower(i.supplier_product_id) AND lower(s.supplier_sku)=lower(m.supplier_sku)
      WHERE (i.id=? OR lower(i.supplier_product_id)=lower(?)) AND i.supplier='doba' LIMIT 1`).bind(wanted,wanted).first();
    if (!row || clean(row.publish_status,30) !== "published" || clean(row.shipping_status,30) !== "verified") return null;
    const priceCents = Number.parseInt(String(row.price_cents ?? ""),10);
    const stock = row.source_stock ?? row.supplier_stock;
    const shippingCents = row.shipping_cents ?? row.estimated_shipping_cents;
    const exactSku = clean(row.supplier_sku,180);
    const sourceSku = clean(row.source_supplier_sku,180);
    if (!exactSku || !sourceSku || exactSku.toLowerCase() !== sourceSku.toLowerCase()) return null;
    if (!Number.isInteger(priceCents) || priceCents < 1 || Number(stock) <= 0) return null;
    if (!Number.isInteger(Number(shippingCents)) || Number(shippingCents) < 0) return null;
    if (/stale|missing|error/i.test(clean(row.source_state,80))) return null;
    const shipTo = clean(row.ship_to,300);
    const blockedStates = /excluding[^a-z]*(ak|alaska).*?(hi|hawaii)|excluding[^a-z]*(hi|hawaii).*?(ak|alaska)/i.test(shipTo) ? ["AK","HI"] : [];
    return {
      catalogProductId: row.id, name: clean(row.name,240), imageUrl: clean(row.primary_image,1200),
      priceCents, shippingCents: Number(shippingCents), shippingVerified: true,
      itemNo: clean(row.supplier_product_id,120), skuId: exactSku, spuNo: clean(row.spu_no,120),
      blockedStates, shipTo, shippingMethod: clean(row.shipping_method,180), sourceUrl: clean(row.source_url,1000),
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
  return Boolean(address.fullName && address.address1 && address.city && address.state && address.postalCode && /^[A-Z]{2}$/.test(address.countryCode));
}

function normalizeCustomer(raw = {}) {
  return {
    email: clean(raw.email, 180).toLowerCase(),
    phone: clean(raw.phone, 60),
  };
}

async function quoteApparel(raw) {
  const product = await fetchFourthwallProduct(raw?.id);
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
  const entry = rvMapEntry(env, id) || await catalogRvEntry(env, id);
  if (!entry) {
    return {
      ok: false,
      fallback: "ebay",
      status: 409,
      error: "Doba shipping is not mapped for this item",
      ebayUrl: /^https:\/\/www\.ebay\.com\/itm\/\d{12}$/i.test(clean(raw?.ebayUrl, 300)) ? clean(raw.ebayUrl, 300) : "",
    };
  }

  if (entry.shippingVerified !== true) {
  return {
    ok: false,
    fallback: "ebay",
    status: 409,
    error: "Doba shipping is not verified for this item",
    ebayUrl: clean(entry.ebayUrl || raw?.ebayUrl, 300),
  };
}

  const destinationState = clean(raw?.shipping?.state, 2).toUpperCase();
  const blockedStates = Array.isArray(entry.blockedStates) ? entry.blockedStates.map((value) => clean(value, 2).toUpperCase()) : [];
  if (destinationState && blockedStates.includes(destinationState)) {
    return {
      ok: false, fallback: "ebay", status: 409,
      error: "This Doba item is not available for the selected shipping state",
      ebayUrl: clean(entry.ebayUrl || raw?.ebayUrl, 300),
    };
  }

  const qty = quantity(raw?.quantity);
  const unitPriceCents = Number.parseInt(String(entry.priceCents ?? ""), 10);
  const shippingCents = Number.parseInt(String(entry.shippingCents ?? ""), 10);
  if (!Number.isInteger(unitPriceCents) || unitPriceCents < 1 || !Number.isInteger(shippingCents) || shippingCents < 0) {
    return {
      ok: false,
      fallback: "ebay",
      status: 409,
      error: "Doba shipping is not available for this item",
      ebayUrl: clean(entry.ebayUrl || raw?.ebayUrl, 300),
    };
  }

  return {
    ok: true,
    source: "rv",
    id,
    productName: clean(entry.name || raw?.name, 240) || "RV & Outdoor item",
    productImage: clean(entry.imageUrl || entry.image, 1200),
    quantity: qty,
    unitPriceCents,
    merchandiseCents: unitPriceCents * qty,
    shippingCents: shippingCents * qty,
    totalCents: (unitPriceCents + shippingCents) * qty,
    variantId: "",
    variantName: "",
    variants: [],
    physical: true,
    doba: {
      itemNo: clean(entry.itemNo, 120),
      skuId: clean(entry.skuId, 120),
      spuNo: clean(entry.spuNo, 120),
    },
  };
}

async function quoteStoreItem(raw, env) {
  const source = clean(raw?.source, 20).toLowerCase();
  if (source === "apparel") return quoteApparel(raw);
  if (source === "rv") return quoteRv(raw, env);
  return { ok: false, status: 400, error: "Invalid store source" };
}

async function paypalAccessToken(env) {
  if (!paypalConfigured(env)) throw new Error("PayPal credentials are not configured");
  const basic = btoa(`${clean(env.PAYPAL_CLIENT_ID, 300)}:${clean(env.PAYPAL_CLIENT_SECRET, 300)}`);
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
  if (!response.ok || !body?.access_token) throw new Error("Unable to authorize PayPal checkout");
  return clean(body.access_token, 4000);
}

async function paypalRequest(env, path, options = {}) {
  const token = await paypalAccessToken(env);
  const response = await fetch(`${paypalOrigin(env)}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "PayPal-Request-Id": crypto.randomUUID(),
      ...(options.headers || {}),
    },
  });
  const body = await response.json().catch(() => ({}));
  return { response, body };
}

async function ensureStoreOrderSchema(env) {
  if (!env?.MARKETPLACE_DB || typeof env.MARKETPLACE_DB.prepare !== "function") return false;
  await env.MARKETPLACE_DB.prepare(`
    CREATE TABLE IF NOT EXISTS eus_store_orders (
      id TEXT PRIMARY KEY,
      source TEXT NOT NULL,
      product_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      variant_id TEXT,
      variant_name TEXT,
      quantity INTEGER NOT NULL,
      unit_price_cents INTEGER NOT NULL,
      merchandise_cents INTEGER NOT NULL,
      shipping_cents INTEGER NOT NULL,
      total_cents INTEGER NOT NULL,
      customer_json TEXT NOT NULL,
      shipping_json TEXT NOT NULL,
      supplier_json TEXT NOT NULL,
      paypal_order_id TEXT UNIQUE,
      paypal_capture_id TEXT,
      payment_status TEXT NOT NULL,
      created_at TEXT NOT NULL,
      paid_at TEXT
    )
  `).run();
  return true;
}

function storeReference() {
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `EUS-STORE-${day}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
}

async function createStoreOrder(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return json({ error: "Cross-origin request denied" }, 403);
  if (!paypalConfigured(env)) return json({ error: "PayPal checkout is not configured" }, 503);
  if (!liveCheckoutAllowed(env)) return json({ error: "Live checkout is locked pending launch approval" }, 503);

  const raw = await request.json().catch(() => ({}));
  const quote = await quoteStoreItem(raw, env);
  if (!quote.ok) return json(quote, quote.status || 400);

  const address = normalizeAddress(raw?.shipping);
  const customer = normalizeCustomer(raw?.customer);
  if (quote.physical && !validAddress(address)) return json({ error: "A complete shipping address is required" }, 400);

  const reference = storeReference();
  const purchaseUnit = {
    reference_id: reference,
    custom_id: reference,
    description: clean(`${quote.productName}${quote.variantName ? ` — ${quote.variantName}` : ""}`, 127),
    amount: {
      currency_code: DEFAULT_CURRENCY,
      value: centsToValue(quote.totalCents),
      breakdown: {
        item_total: { currency_code: DEFAULT_CURRENCY, value: centsToValue(quote.merchandiseCents) },
        shipping: { currency_code: DEFAULT_CURRENCY, value: centsToValue(quote.shippingCents) },
      },
    },
    items: [{
      name: clean(quote.productName, 127),
      quantity: String(quote.quantity),
      unit_amount: { currency_code: DEFAULT_CURRENCY, value: centsToValue(quote.unitPriceCents) },
      ...(quote.variantName ? { description: clean(quote.variantName, 127) } : {}),
      category: quote.physical ? "PHYSICAL_GOODS" : "DIGITAL_GOODS",
    }],
  };

  if (quote.physical) {
    purchaseUnit.shipping = {
      name: { full_name: address.fullName },
      address: {
        address_line_1: address.address1,
        ...(address.address2 ? { address_line_2: address.address2 } : {}),
        admin_area_2: address.city,
        admin_area_1: address.state,
        postal_code: address.postalCode,
        country_code: address.countryCode,
      },
    };
  }

  const requestBody = {
    intent: "CAPTURE",
    purchase_units: [purchaseUnit],
    payment_source: {
      paypal: {
        experience_context: {
          user_action: "PAY_NOW",
          shipping_preference: quote.physical ? "SET_PROVIDED_ADDRESS" : "NO_SHIPPING",
          brand_name: "Elevation UpScales, Inc.",
        },
      },
    },
  };

  const { response, body } = await paypalRequest(env, "/v2/checkout/orders", {
    method: "POST",
    body: JSON.stringify(requestBody),
  });
  if (!response.ok || !body?.id) return json({ error: "PayPal could not create the order" }, 502);

  if (await ensureStoreOrderSchema(env)) {
    await env.MARKETPLACE_DB.prepare(`
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
      JSON.stringify(quote.doba || {}),
      clean(body.id, 80),
      "",
      "created",
      new Date().toISOString(),
      null,
    ).run();
  }

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
  if (!sameOriginRequest(request)) return json({ error: "Cross-origin request denied" }, 403);
  if (!paypalConfigured(env)) return json({ error: "PayPal checkout is not configured" }, 503);
  if (!liveCheckoutAllowed(env)) return json({ error: "Live checkout is locked pending launch approval" }, 503);
  const id = validOrderId(orderId);
  if (!id) return json({ error: "Invalid PayPal order ID" }, 400);

  const { response, body } = await paypalRequest(env, `/v2/checkout/orders/${encodeURIComponent(id)}/capture`, {
    method: "POST",
    body: "{}",
  });

  if (!response.ok) {
    const issue = clean(body?.details?.[0]?.issue, 100);
    return json({ error: issue === "INSTRUMENT_DECLINED" ? "INSTRUMENT_DECLINED" : "PayPal could not capture the payment" }, response.status === 422 ? 422 : 502);
  }

  const capture = body?.purchase_units?.[0]?.payments?.captures?.[0] || {};
  if (env?.MARKETPLACE_DB && typeof env.MARKETPLACE_DB.prepare === "function") {
    await ensureStoreOrderSchema(env);
    await env.MARKETPLACE_DB.prepare(`
      UPDATE eus_store_orders
      SET paypal_capture_id=?,payment_status=?,paid_at=?
      WHERE paypal_order_id=?
    `).bind(clean(capture?.id, 80), clean(capture?.status, 40) || clean(body?.status, 40), new Date().toISOString(), id).run();
  }

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
    });
    return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
  }

  if (path === "/api/store-checkout/quote") {
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "POST" });
    if (!sameOriginRequest(request)) return json({ error: "Cross-origin request denied" }, 403);
    const raw = await request.json().catch(() => ({}));
    const quote = await quoteStoreItem(raw, env);
    return json(quote, quote.ok ? 200 : (quote.status || 400));
  }

  if (path === "/api/store-checkout/orders") return createStoreOrder(request, env);

  const capture = path.match(/^\/api\/store-checkout\/orders\/([A-Z0-9]{8,40})\/capture$/i);
  if (capture) return captureStoreOrder(request, env, capture[1]);

  return json({ error: "Store checkout endpoint not found" }, 404);
}
