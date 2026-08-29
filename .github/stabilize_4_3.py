from pathlib import Path
import re
import json


def replace_once(path, old, new):
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected one match, found {count}: {old[:120]!r}")
    p.write_text(text.replace(old, new, 1), encoding="utf-8")


def regex_once(path, pattern, repl, flags=re.S):
    p = Path(path)
    text = p.read_text(encoding="utf-8")
    new, count = re.subn(pattern, repl, text, count=1, flags=flags)
    if count != 1:
        raise SystemExit(f"{path}: regex expected one match, found {count}: {pattern[:120]}")
    p.write_text(new, encoding="utf-8")


# Make customer-facing route dependencies explicit instead of Worker-injected.
replace_once(
    "site/store.html",
    '<script defer src="store-config.js?v=3.0.3"></script><script defer src="store-patch-8.js?v=3.0.3"></script>',
    '<script defer src="store-config.js?v=3.0.3"></script><script defer src="store-checkout-routing.js?v=3.11.43"></script><script defer src="store-patch-8.js?v=3.0.3"></script>',
)
replace_once(
    "site/admin-listings.html",
    '<script defer src="/admin-listings.js?v=3.11.19-login-state"></script>',
    '<script defer src="/admin-listings.js?v=3.11.19-login-state"></script>\n<script defer src="/admin-store-orders-link.js?v=3.11.42"></script>',
)

# Worker owns routing/private runtime protection/origin gate; remove hidden JS/HTML mutation.
regex_once("site/_worker.js", r"const APPAREL_ROUTING_LOADER = `.*?const CHECKOUT_CSP = \[", "const CHECKOUT_CSP = [")
regex_once("site/_worker.js", r"async function appendRuntimeLoader\(response, loader\) \{.*?function checkoutResponse\(response\) \{", "function checkoutResponse(response) {")
for pattern in [
    r"\nfunction validEmail\(value\) \{.*?\n\}",
    r"\nfunction validQuantity\(value\) \{.*?\n\}",
    r"\nfunction validUsAddress\(raw = \{\}\) \{.*?\n\}",
    r"\nfunction readDobaMap\(env\) \{.*?\n\}",
    r"\nfunction verifiedRvEntry\(env, raw = \{\}\) \{.*?\n\}",
    r"\nfunction validEbayItemUrl\(value\) \{.*?\n\}",
    r"\nfunction rvFallback\(raw = \{\}, entry = null, message = .*?\n\}",
    r"\nfunction rvDestinationAllowed\(entry, raw = \{\}\) \{.*?\n\}",
    r"\nasync function ensureStoreOrderTable\(env\) \{.*?\n\}",
    r"\nasync function checkoutRequestBody\(request\) \{.*?\n\}",
]:
    regex_once("site/_worker.js", pattern, "")

old_preflight = '''    const isQuote = url.pathname === "/api/store-checkout/quote";
    const isCreate = url.pathname === "/api/store-checkout/orders";

    if ((isQuote || isCreate) && request.method === "POST") {
      if (!sameOriginPost(request)) return checkoutJson({ error: "Cross-origin request denied" }, 403);
      const raw = await checkoutRequestBody(request);
      const source = clean(raw.source, 20).toLowerCase();
      if (!["apparel", "rv"].includes(source)) return checkoutJson({ error: "Invalid store source" }, 400);
      if (!validQuantity(raw.quantity)) return checkoutJson({ error: "Quantity must be from 1 to 10" }, 400);

      if (source === "rv") {
        const entry = verifiedRvEntry(env, raw);
        if (entry && !rvDestinationAllowed(entry, raw)) return rvFallback(raw, entry, "This Doba item is not available for the selected shipping state");
        // Catalog-backed Doba products are authoritatively checked in store-checkout-server.js.
        // Legacy static map entries retain the preflight destination guard above.
      }

      if (isCreate) {
        if (!validEmail(raw?.customer?.email)) return checkoutJson({ error: "A valid customer email is required" }, 400);
        if (!validUsAddress(raw?.shipping)) return checkoutJson({ error: "A valid U.S. shipping address is required" }, 400);
        if (!await ensureStoreOrderTable(env)) return checkoutJson({ error: "Store order storage is not configured" }, 503);
      }
    }

    if (url.pathname === "/api/store-checkout/config" ||
        isQuote ||
        isCreate ||
        /^\/api\/store-checkout\/orders\/[A-Z0-9]{8,40}\/capture$/i.test(url.pathname)) {
      return handleStoreCheckoutApi(request, env, url.pathname);
    }'''
new_preflight = '''    const isQuote = url.pathname === "/api/store-checkout/quote";
    const isCreate = url.pathname === "/api/store-checkout/orders";
    const isCapture = /^\/api\/store-checkout\/orders\/[A-Z0-9]{8,40}\/capture$/i.test(url.pathname);

    if ((isQuote || isCreate || isCapture) && request.method === "POST" && !sameOriginPost(request)) {
      return checkoutJson({ error: "Cross-origin request denied" }, 403);
    }

    if (url.pathname === "/api/store-checkout/config" || isQuote || isCreate || isCapture) {
      return handleStoreCheckoutApi(request, env, url.pathname);
    }'''
replace_once("site/_worker.js", old_preflight, new_preflight)
regex_once(
    "site/_worker.js",
    r"\n    if \(url\.pathname === \"/store-config\.js\"\) \{.*?\n    \}\n\n    if \(url\.pathname === \"/rv-store\.js\"\) \{.*?\n    \}\n\n    if \(url\.pathname === \"/admin-listings\.js\"\) \{.*?\n    \}\n",
    "\n",
)
replace_once(
    "site/_worker.js",
    '''    const response = await coreWorker.fetch(request, env, ctx);
    if (url.pathname === "/checkout" || url.pathname === "/checkout/") return checkoutResponse(response);
    const adminHtml = url.pathname === "/admin" || url.pathname === "/admin/" || url.pathname.startsWith("/admin-") || url.pathname === "/admin.html";
    if (adminHtml) return appendHtmlLoader(response, ADMIN_COMMAND_CENTER_LOADER);
    return response;''',
    '''    const response = await coreWorker.fetch(request, env, ctx);
    if (url.pathname === "/checkout" || url.pathname === "/checkout/") return checkoutResponse(response);
    return response;''',
)
replace_once(
    "site/_worker.js",
    '"/doba-csv-sync-runtime.js", "/apparel-provider-runtime.js"].includes(url.pathname)',
    '"/doba-csv-sync-runtime.js", "/apparel-provider-runtime.js", "/commerce-schema-migrations.js"].includes(url.pathname)',
)

# Static assets no longer pass through Worker just to append hidden loaders.
routes = {
    "version": 1,
    "include": [
        "/api/*",
        "/marketplace/listing/*",
        "/checkout",
        "/checkout/*",
        "/worker-core.js",
        "/store-checkout-server.js",
        "/store-orders-admin-server.js",
        "/catalog-admin-server.js",
        "/catalog-admin-runtime.js",
        "/hawaii-lithium-runtime.js",
        "/sync-admin-runtime.js",
        "/doba-csv-sync-runtime.js",
        "/apparel-provider-runtime.js",
        "/commerce-schema-migrations.js",
    ],
    "exclude": [],
}
Path("site/_routes.json").write_text(json.dumps(routes, indent=2) + "\n", encoding="utf-8")

# Minimal, versioned, idempotent commerce migration ledger. No destructive statements.
Path("site/commerce-schema-migrations.js").write_text(r'''export const COMMERCE_SCHEMA_VERSION = "2026.08.29.1";

const MIGRATIONS = [
  {
    id: "2026-08-29-store-orders-v1",
    description: "Store order ledger",
    statements: [`CREATE TABLE IF NOT EXISTS eus_store_orders (
      id TEXT PRIMARY KEY, source TEXT NOT NULL, product_id TEXT NOT NULL, product_name TEXT NOT NULL,
      variant_id TEXT, variant_name TEXT, quantity INTEGER NOT NULL, unit_price_cents INTEGER NOT NULL,
      merchandise_cents INTEGER NOT NULL, shipping_cents INTEGER NOT NULL, total_cents INTEGER NOT NULL,
      customer_json TEXT NOT NULL, shipping_json TEXT NOT NULL, supplier_json TEXT NOT NULL,
      paypal_order_id TEXT UNIQUE, paypal_capture_id TEXT, payment_status TEXT NOT NULL,
      created_at TEXT NOT NULL, paid_at TEXT
    )`],
  },
  {
    id: "2026-08-29-sync-runtime-v1",
    description: "Commerce sync run/state/event tables",
    statements: [
      `CREATE TABLE IF NOT EXISTS eus_sync_runs (
        id TEXT PRIMARY KEY,target TEXT NOT NULL,trigger TEXT NOT NULL,mode TEXT NOT NULL,started_at TEXT NOT NULL,completed_at TEXT,status TEXT NOT NULL,
        discovered_count INTEGER NOT NULL DEFAULT 0,matched_count INTEGER NOT NULL DEFAULT 0,changed_count INTEGER NOT NULL DEFAULT 0,updated_count INTEGER NOT NULL DEFAULT 0,
        review_count INTEGER NOT NULL DEFAULT 0,error_count INTEGER NOT NULL DEFAULT 0,cursor_reference TEXT NOT NULL DEFAULT '',error_summary TEXT NOT NULL DEFAULT ''
      )`,
      `CREATE INDEX IF NOT EXISTS idx_eus_sync_runs_started ON eus_sync_runs(started_at DESC)`,
      `CREATE TABLE IF NOT EXISTS eus_channel_sync_state (
        catalog_product_id TEXT NOT NULL,sku TEXT NOT NULL DEFAULT '',channel TEXT NOT NULL,external_id TEXT NOT NULL DEFAULT '',desired_state TEXT NOT NULL DEFAULT 'NOT LISTED',
        observed_state TEXT NOT NULL DEFAULT 'UNKNOWN',sync_status TEXT NOT NULL DEFAULT 'NOT CONFIGURED',mode TEXT NOT NULL DEFAULT 'monitor',last_attempt_at TEXT,last_success_at TEXT,
        last_observed_at TEXT,last_error TEXT NOT NULL DEFAULT '',external_quantity INTEGER,external_price_cents INTEGER,external_updated_at TEXT,metadata_json TEXT NOT NULL DEFAULT '{}',
        PRIMARY KEY(catalog_product_id,channel)
      )`,
      `CREATE INDEX IF NOT EXISTS idx_eus_channel_sync_status ON eus_channel_sync_state(channel,sync_status,last_observed_at DESC)`,
      `CREATE TABLE IF NOT EXISTS eus_sync_item_events (
        id TEXT PRIMARY KEY,run_id TEXT NOT NULL,catalog_product_id TEXT NOT NULL DEFAULT '',sku TEXT NOT NULL DEFAULT '',channel TEXT NOT NULL DEFAULT '',event_type TEXT NOT NULL,
        status TEXT NOT NULL,details_json TEXT NOT NULL DEFAULT '{}',created_at TEXT NOT NULL
      )`,
      `CREATE INDEX IF NOT EXISTS idx_eus_sync_events_created ON eus_sync_item_events(created_at DESC)`,
      `CREATE TABLE IF NOT EXISTS eus_recovery_candidates (
        id TEXT PRIMARY KEY,source_type TEXT NOT NULL,external_id TEXT NOT NULL DEFAULT '',sku TEXT NOT NULL DEFAULT '',title TEXT NOT NULL DEFAULT '',price_cents INTEGER,
        image_url TEXT NOT NULL DEFAULT '',source_url TEXT NOT NULL DEFAULT '',classification TEXT NOT NULL DEFAULT 'UNRESOLVED',matched_catalog_product_id TEXT NOT NULL DEFAULT '',
        blocker TEXT NOT NULL DEFAULT '',ignored INTEGER NOT NULL DEFAULT 0,metadata_json TEXT NOT NULL DEFAULT '{}',created_at TEXT NOT NULL,updated_at TEXT NOT NULL
      )`,
      `CREATE UNIQUE INDEX IF NOT EXISTS idx_eus_recovery_source_external ON eus_recovery_candidates(source_type,external_id)`,
    ],
  },
  {
    id: "2026-08-29-apparel-provider-v1",
    description: "Apparel provider mapping and health tables",
    statements: [
      `CREATE TABLE IF NOT EXISTS eus_catalog_provider_links (
        catalog_product_id TEXT NOT NULL,provider TEXT NOT NULL,provider_product_id TEXT NOT NULL DEFAULT '',provider_variant_id TEXT NOT NULL DEFAULT '',provider_sku TEXT NOT NULL DEFAULT '',provider_product_url TEXT NOT NULL DEFAULT '',provider_thumbnail_url TEXT NOT NULL DEFAULT '',provider_state TEXT NOT NULL DEFAULT 'REVIEW',provider_stock_state TEXT NOT NULL DEFAULT 'UNKNOWN',provider_cost_cents INTEGER,last_sync_at TEXT,last_error TEXT NOT NULL DEFAULT '',fulfillment_mode TEXT NOT NULL DEFAULT '',metadata_json TEXT NOT NULL DEFAULT '{}',updated_at TEXT NOT NULL,PRIMARY KEY(catalog_product_id,provider,provider_variant_id)
      )`,
      `CREATE INDEX IF NOT EXISTS idx_eus_provider_links_provider ON eus_catalog_provider_links(provider,last_sync_at DESC)`,
      `CREATE TABLE IF NOT EXISTS eus_provider_health (
        provider TEXT PRIMARY KEY,configured INTEGER NOT NULL DEFAULT 0,state TEXT NOT NULL DEFAULT 'Not Configured',last_attempt_at TEXT,last_success_at TEXT,last_error TEXT NOT NULL DEFAULT '',discovered_count INTEGER NOT NULL DEFAULT 0,matched_count INTEGER NOT NULL DEFAULT 0,review_count INTEGER NOT NULL DEFAULT 0,updated_at TEXT NOT NULL
      )`,
    ],
  },
];

let schemaPromise = null;

async function runMigrations(db) {
  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_schema_migrations (
    id TEXT PRIMARY KEY, schema_version TEXT NOT NULL, description TEXT NOT NULL, applied_at TEXT NOT NULL
  )`).run();
  for (const migration of MIGRATIONS) {
    const applied = await db.prepare("SELECT id FROM eus_schema_migrations WHERE id=? LIMIT 1").bind(migration.id).first();
    if (applied) continue;
    for (const statement of migration.statements) await db.prepare(statement).run();
    await db.prepare("INSERT OR IGNORE INTO eus_schema_migrations(id,schema_version,description,applied_at) VALUES(?,?,?,?)")
      .bind(migration.id, COMMERCE_SCHEMA_VERSION, migration.description, new Date().toISOString()).run();
  }
  return db;
}

export async function ensureCommerceSchema(env) {
  const db = env?.MARKETPLACE_DB;
  if (!db || typeof db.prepare !== "function") throw new Error("Commerce database is not configured");
  if (!schemaPromise) {
    schemaPromise = runMigrations(db).catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  return schemaPromise;
}
''', encoding="utf-8")

# Sync/provider schema initialization uses the centralized idempotent migration owner.
for runtime in ["site/sync-admin-runtime.js", "site/apparel-provider-runtime.js"]:
    p = Path(runtime)
    text = p.read_text(encoding="utf-8")
    if not text.startswith('import { ensureCommerceSchema } from "./commerce-schema-migrations.js";'):
        text = 'import { ensureCommerceSchema } from "./commerce-schema-migrations.js";\n' + text
    text, count = re.subn(
        r"async function ensureSchema\(env\)\{.*?return db;\}",
        "async function ensureSchema(env){return ensureCommerceSchema(env);}",
        text,
        count=1,
        flags=re.S,
    )
    if count != 1:
        raise SystemExit(f"{runtime}: ensureSchema replacement failed: {count}")
    p.write_text(text, encoding="utf-8")
regex_once("site/sync-admin-runtime.js", r"async function upsertState\(db,p,channel,cap,runAt,runId\)\{[^}]*\}\n", "")

# Checkout: business validation stays in server handler; Worker retains strict Origin gate.
checkout = Path("site/store-checkout-server.js")
text = checkout.read_text(encoding="utf-8")
if not text.startswith('import { ensureCommerceSchema } from "./commerce-schema-migrations.js";'):
    text = 'import { ensureCommerceSchema } from "./commerce-schema-migrations.js";\n' + text
text, count = re.subn(r"\nfunction sameOriginRequest\(request\) \{.*?\n\}", "", text, count=1, flags=re.S)
if count != 1:
    raise SystemExit("sameOriginRequest removal failed")

quantity_anchor = '''function quantity(value) {
  const parsed = Number.parseInt(String(value ?? "1"), 10);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= MAX_QTY ? parsed : 1;
}
'''
if text.count(quantity_anchor) != 1:
    raise SystemExit("quantity anchor failed")
text = text.replace(
    quantity_anchor,
    quantity_anchor + '''
function validQuantity(value) {
  const parsed = Number.parseInt(String(value ?? ""), 10);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= MAX_QTY;
}

function validEmail(value) {
  return /^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(clean(value, 180));
}
''',
    1,
)
old_addr = '''function validAddress(address) {
  return Boolean(address.fullName && address.address1 && address.city && address.state && address.postalCode && /^[A-Z]{2}$/.test(address.countryCode));
}
'''
new_addr = '''function validAddress(address) {
  return Boolean(
    address.fullName && address.address1 && address.city &&
    /^[A-Z]{2}$/.test(address.state) &&
    /^\\d{5}(?:-\\d{4})?$/.test(address.postalCode) &&
    address.countryCode === "US"
  );
}
'''
if text.count(old_addr) != 1:
    raise SystemExit("address validation anchor failed")
text = text.replace(old_addr, new_addr, 1)

# Fourthwall: exact Catalog/provider reference first, public product endpoint second, bounded legacy scan only as resilience fallback.
if text.count("async function fetchFourthwallProduct(id) {") != 1:
    raise SystemExit("Fourthwall legacy lookup anchor failed")
text = text.replace("async function fetchFourthwallProduct(id) {", "async function fetchFourthwallProductLegacy(id) {", 1)
customer_anchor = '''function normalizeCustomer(raw = {}) {
  return {
    email: clean(raw.email, 180).toLowerCase(),
    phone: clean(raw.phone, 60),
  };
}

'''
resolver = r'''const fourthwallProductCache = new Map();

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

'''
if text.count(customer_anchor) != 1:
    raise SystemExit("apparel resolver anchor failed")
text = text.replace(customer_anchor, customer_anchor + resolver, 1)
replace_from = '''async function quoteApparel(raw) {
  const product = await fetchFourthwallProduct(raw?.id);'''
replace_to = '''async function quoteApparel(raw, env) {
  const reference = await catalogApparelReference(env, raw?.id);
  const product = await fetchFourthwallProductExact(reference);'''
if text.count(replace_from) != 1:
    raise SystemExit("quoteApparel anchor failed")
text = text.replace(replace_from, replace_to, 1)
replace_from = 'if (source === "apparel") return quoteApparel(raw);'
if text.count(replace_from) != 1:
    raise SystemExit("quoteStoreItem apparel anchor failed")
text = text.replace(replace_from, 'if (source === "apparel") return quoteApparel(raw, env);', 1)

# PayPal: cache only OAuth token + expiry; refresh on expiry or a single 401 retry.
paypal_pattern = r"async function paypalAccessToken\(env\) \{.*?\n\}\n\nasync function paypalRequest\(env, path, options = \{\}\) \{.*?\n\}\n"
paypal_repl = r'''let paypalTokenCache = { key: "", token: "", expiresAt: 0 };

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
'''
text, count = re.subn(paypal_pattern, paypal_repl, text, count=1, flags=re.S)
if count != 1:
    raise SystemExit("PayPal replacement failed")
text, count = re.subn(r"\nasync function ensureStoreOrderSchema\(env\) \{.*?\n\}", "", text, count=1, flags=re.S)
if count != 1:
    raise SystemExit("store order schema removal failed")

# Origin is now solely enforced by _worker.js. Business input checks remain here.
text = text.replace('  if (!sameOriginRequest(request)) return json({ error: "Cross-origin request denied" }, 403);\n', '')
create_anchor = '''  const raw = await request.json().catch(() => ({}));
  const quote = await quoteStoreItem(raw, env);
  if (!quote.ok) return json(quote, quote.status || 400);

  const address = normalizeAddress(raw?.shipping);
  const customer = normalizeCustomer(raw?.customer);
  if (quote.physical && !validAddress(address)) return json({ error: "A complete shipping address is required" }, 400);'''
create_new = '''  const raw = await request.json().catch(() => ({}));
  const source = clean(raw?.source, 20).toLowerCase();
  if (!["apparel", "rv"].includes(source)) return json({ error: "Invalid store source" }, 400);
  if (!validQuantity(raw?.quantity)) return json({ error: "Quantity must be from 1 to 10" }, 400);
  const customer = normalizeCustomer(raw?.customer);
  if (!validEmail(customer.email)) return json({ error: "A valid customer email is required" }, 400);
  const quote = await quoteStoreItem(raw, env);
  if (!quote.ok) return json(quote, quote.status || 400);
  const address = normalizeAddress(raw?.shipping);
  if (quote.physical && !validAddress(address)) return json({ error: "A valid U.S. shipping address is required" }, 400);
  let db;
  try { db = await ensureCommerceSchema(env); }
  catch (error) {
    console.error(JSON.stringify({event:"commerce_schema_error",message:clean(error?.message,240)}));
    return json({ error: "Store order storage is not configured" }, 503);
  }'''
if text.count(create_anchor) != 1:
    raise SystemExit("create validation anchor failed")
text = text.replace(create_anchor, create_new, 1)
replace_from = '  if (await ensureStoreOrderSchema(env)) {\n    await env.MARKETPLACE_DB.prepare(`'
if text.count(replace_from) != 1:
    raise SystemExit("create schema insert anchor failed")
text = text.replace(replace_from, '  await db.prepare(`', 1)
replace_from = '    ).run();\n  }\n\n  return json({'
if text.count(replace_from) < 1:
    raise SystemExit("create insert close anchor failed")
text = text.replace(replace_from, '    ).run();\n\n  return json({', 1)

capture_anchor = '''  const id = validOrderId(orderId);
  if (!id) return json({ error: "Invalid PayPal order ID" }, 400);

  const { response, body } = await paypalRequest'''
capture_new = '''  const id = validOrderId(orderId);
  if (!id) return json({ error: "Invalid PayPal order ID" }, 400);
  let db;
  try { db = await ensureCommerceSchema(env); }
  catch (error) {
    console.error(JSON.stringify({event:"commerce_schema_error",message:clean(error?.message,240)}));
    return json({ error: "Store order storage is not configured" }, 503);
  }

  const { response, body } = await paypalRequest'''
if text.count(capture_anchor) != 1:
    raise SystemExit("capture anchor failed")
text = text.replace(capture_anchor, capture_new, 1)
replace_from = '  if (env?.MARKETPLACE_DB && typeof env.MARKETPLACE_DB.prepare === "function") {\n    await ensureStoreOrderSchema(env);\n    await env.MARKETPLACE_DB.prepare(`'
if text.count(replace_from) != 1:
    raise SystemExit("capture schema update anchor failed")
text = text.replace(replace_from, '  await db.prepare(`', 1)
replace_from = '    `).bind(clean(capture?.id, 80), clean(capture?.status, 40) || clean(body?.status, 40), new Date().toISOString(), id).run();\n  }\n\n  return json({'
if text.count(replace_from) != 1:
    raise SystemExit("capture update close anchor failed")
text = text.replace(replace_from, '    `).bind(clean(capture?.id, 80), clean(capture?.status, 40) || clean(body?.status, 40), new Date().toISOString(), id).run();\n\n  return json({', 1)

quote_anchor = '''    const raw = await request.json().catch(() => ({}));
    const quote = await quoteStoreItem(raw, env);'''
quote_new = '''    const raw = await request.json().catch(() => ({}));
    const source = clean(raw?.source, 20).toLowerCase();
    if (!["apparel", "rv"].includes(source)) return json({ error: "Invalid store source" }, 400);
    if (!validQuantity(raw?.quantity)) return json({ error: "Quantity must be from 1 to 10" }, 400);
    const quote = await quoteStoreItem(raw, env);'''
if text.count(quote_anchor) != 1:
    raise SystemExit("quote validation anchor failed")
text = text.replace(quote_anchor, quote_new, 1)
checkout.write_text(text, encoding="utf-8")
