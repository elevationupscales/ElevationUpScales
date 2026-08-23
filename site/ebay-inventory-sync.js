const BUILD = "3.11.31-ebay-inventory-sync";
const SELLER = "elevationupscalesshop";
const AUTO_BY = "ebay-auto-sync";
const AUTO_MARKER = "ebay-auto-sync-v1";
const SYNC_INTERVAL_MS = 10 * 60 * 1000;
const ERROR_RETRY_MS = 60 * 1000;

const headers = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};

function json(data, status = 200, extra = {}) {
  return Response.json(data, { status, headers: { ...headers, ...extra } });
}

function clean(value, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function integer(value, fallback = 0, max = 1_000_000_000) {
  if (value === undefined || value === null || value === "") return fallback;
  const n = Number(value);
  return Number.isFinite(n) ? Math.max(0, Math.min(max, Math.round(n))) : fallback;
}

function channels(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed) ? parsed.map((x) => clean(x, 50)).filter(Boolean) : [];
  } catch (_) {
    return [];
  }
}

function notesMeta(value) {
  try {
    const parsed = JSON.parse(value || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (_) {
    return {};
  }
}

function safeEbayItemUrl(value) {
  try {
    const u = new URL(String(value || ""), "https://www.ebay.com");
    const host = u.hostname.toLowerCase();
    return u.protocol === "https:" && (host === "ebay.com" || host === "www.ebay.com") ? u.toString() : "";
  } catch (_) {
    return "";
  }
}

function safeImageUrl(value) {
  try {
    const u = new URL(String(value || ""));
    const host = u.hostname.toLowerCase();
    const allowed = host === "ebayimg.com" || host.endsWith(".ebayimg.com") || host === "ebaystatic.com" || host.endsWith(".ebaystatic.com");
    return u.protocol === "https:" && allowed ? u.toString() : "";
  } catch (_) {
    return "";
  }
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => String.fromCodePoint(Number.parseInt(num, 10)))
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ");
}

function plain(value, max = 240) {
  return clean(decodeHtml(String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ")), max);
}

function legacyItemId(value) {
  const raw = String(value || "");
  const rest = raw.match(/^v1\|(\d{9,15})\|/i);
  if (rest) return rest[1];
  const url = raw.match(/\/itm\/(?:[^/?#]+\/)?(\d{9,15})(?:[/?#]|$)/i);
  if (url) return url[1];
  const direct = raw.match(/\b(\d{9,15})\b/);
  return direct ? direct[1] : "";
}

function moneyCents(value) {
  const match = String(value ?? "").replace(/,/g, "").match(/\d+(?:\.\d{1,2})?/);
  if (!match) return 0;
  const n = Number(match[0]);
  return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) : 0;
}

function categoryFor(title) {
  const text = String(title || "").toLowerCase();
  if (/\b(rv|camper|motorhome|motor home|travel trailer|fifth wheel|5th wheel|tow|towing|hitch|awning|water pump|fresh water|black water|sewer|propane|leveling|stabilizer|roof vent|slide.?out|refrigerator|converter|shore power)\b/.test(text)) return "RV Parts & Accessories";
  if (/\b(solar|battery|inverter|charge controller|power station|generator|12v|24v|48v|off.?grid)\b/.test(text)) return "Solar & Off-Grid";
  if (/\b(camp|camping|outdoor|hiking|tent|lantern|cooler|camp chair|sleeping bag|picnic)\b/.test(text)) return "Camping & Outdoor";
  return "RV & Outdoor";
}

function listingCandidate({ id, title, price, url, imageUrl }) {
  const itemUrl = safeEbayItemUrl(url);
  const itemId = legacyItemId(id || itemUrl);
  const name = plain(title, 180);
  if (!itemId || !name || !itemUrl) return null;
  return { id: itemId, name, priceCents: moneyCents(price), url: itemUrl, imageUrl: safeImageUrl(imageUrl) };
}

function collectJsonLd(node, out, depth = 0) {
  if (!node || depth > 10 || out.size >= 500) return;
  if (Array.isArray(node)) {
    for (const value of node) collectJsonLd(value, out, depth + 1);
    return;
  }
  if (typeof node !== "object") return;
  const item = node.item && typeof node.item === "object" ? node.item : node;
  const offer = Array.isArray(item.offers) ? item.offers[0] : (item.offers || {});
  const image = Array.isArray(item.image) ? item.image[0] : item.image;
  const candidate = listingCandidate({
    id: item.itemId || item.sku || "",
    title: item.name || item.title || "",
    price: offer?.price ?? offer?.lowPrice ?? "",
    url: item.url || "",
    imageUrl: typeof image === "string" ? image : image?.url,
  });
  if (candidate) out.set(candidate.id, candidate);
  for (const value of Object.values(node)) collectJsonLd(value, out, depth + 1);
}

function listingsFromHtml(html) {
  const source = String(html || "");
  const out = new Map();
  for (const match of source.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { collectJsonLd(JSON.parse(decodeHtml(match[1])), out); } catch (_) {}
  }
  for (const match of source.matchAll(/href=["'](https:\/\/www\.ebay\.com\/itm\/[^"'<>]+|\/itm\/[^"'<>]+)["']/gi)) {
    const url = safeEbayItemUrl(match[1]);
    const id = legacyItemId(url);
    if (!id || out.has(id)) continue;
    const start = Math.max(0, (match.index || 0) - 1400);
    const end = Math.min(source.length, (match.index || 0) + 7000);
    const block = source.slice(start, end);
    const title = block.match(/class=["'][^"']*s-item__title[^"']*["'][^>]*>([\s\S]{0,700}?)<\/[^>]+>/i)?.[1]
      || block.match(/(?:title|aria-label)=["']([^"']{4,220})["']/i)?.[1]
      || "";
    const price = plain(block.match(/class=["'][^"']*s-item__price[^"']*["'][^>]*>([\s\S]{0,180}?)<\/[^>]+>/i)?.[1] || "", 80);
    const image = block.match(/(?:src|data-src)=["'](https:\/\/[^"']*(?:ebayimg|ebaystatic)\.com\/[^"']+)["']/i)?.[1] || "";
    const candidate = listingCandidate({ id, title, price, url, imageUrl: image });
    if (candidate) out.set(candidate.id, candidate);
  }
  return [...out.values()];
}

async function fromApi(env) {
  const clientId = clean(env.EBAY_CLIENT_ID, 300);
  const clientSecret = clean(env.EBAY_CLIENT_SECRET, 500);
  if (!clientId || !clientSecret) return null;
  const tokenResponse = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials&scope=https%3A%2F%2Fapi.ebay.com%2Foauth%2Fapi_scope",
  });
  if (!tokenResponse.ok) throw new Error(`eBay OAuth returned ${tokenResponse.status}`);
  const token = await tokenResponse.json();
  const access = clean(token.access_token, 4000);
  if (!access) throw new Error("eBay OAuth returned no access token");
  const u = new URL("https://api.ebay.com/buy/browse/v1/item_summary/search");
  u.searchParams.set("filter", `sellers:{${SELLER}}`);
  u.searchParams.set("limit", "200");
  u.searchParams.set("sort", "newlyListed");
  const response = await fetch(u, { headers: { Authorization: `Bearer ${access}`, "X-EBAY-C-MARKETPLACE-ID": "EBAY_US", Accept: "application/json" } });
  if (!response.ok) throw new Error(`eBay Browse API returned ${response.status}`);
  const data = await response.json();
  const listings = [];
  for (const item of Array.isArray(data.itemSummaries) ? data.itemSummaries : []) {
    const candidate = listingCandidate({ id: item.itemId, title: item.title, price: item.price?.value, url: item.itemWebUrl, imageUrl: item.image?.imageUrl });
    if (candidate) listings.push(candidate);
  }
  return { listings, source: "ebay-api", coverageComplete: listings.length < 200 };
}

async function fromPublic() {
  const urls = [
    `https://www.ebay.com/sch/i.html?_ssn=${encodeURIComponent(SELLER)}&_sop=10&_ipg=240&rt=nc`,
    `https://www.ebay.com/sch/${encodeURIComponent(SELLER)}/m.html?_nkw=&_armrs=1&_ipg=240&_sop=10`,
    `https://www.ebay.com/usr/${encodeURIComponent(SELLER)}`,
  ];
  let last = "";
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        headers: {
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "en-US,en;q=0.8",
          "User-Agent": "Mozilla/5.0 (compatible; ElevationUpScalesInventorySync/1.0; +https://elevationupscales.com)",
        },
        redirect: "follow",
      });
      if (!response.ok) { last = `eBay public page returned ${response.status}`; continue; }
      const listings = listingsFromHtml(await response.text());
      if (listings.length) return { listings, source: "ebay-public", coverageComplete: false };
      last = "eBay public page returned no parseable listings";
    } catch (error) {
      last = error instanceof Error ? error.message : String(error);
    }
  }
  throw new Error(last || "eBay public listings unavailable");
}

async function fetchListings(env) {
  try {
    const api = await fromApi(env);
    if (api?.listings?.length) return api;
  } catch (error) {
    console.error(JSON.stringify({ event: "ebay_inventory_api_error", message: clean(error?.message || error, 240) }));
  }
  return fromPublic();
}

async function ensureSchema(db) {
  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_inventory_items (
    id TEXT PRIMARY KEY,
    sku TEXT NOT NULL COLLATE NOCASE UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT '',
    supplier TEXT NOT NULL DEFAULT 'other',
    fulfillment_mode TEXT NOT NULL DEFAULT 'tracked',
    supplier_product_id TEXT NOT NULL DEFAULT '',
    source_url TEXT NOT NULL DEFAULT '',
    sales_channels_json TEXT NOT NULL DEFAULT '[]',
    cost_cents INTEGER NOT NULL DEFAULT 0,
    price_cents INTEGER NOT NULL DEFAULT 0,
    quantity_on_hand INTEGER NOT NULL DEFAULT 0,
    quantity_reserved INTEGER NOT NULL DEFAULT 0,
    reorder_point INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active',
    notes TEXT NOT NULL DEFAULT '',
    version INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    updated_by TEXT NOT NULL DEFAULT ''
  )`).run();
  await db.prepare(`CREATE TABLE IF NOT EXISTS eus_inventory_sync_state (
    source TEXT PRIMARY KEY,
    last_started_at TEXT NOT NULL DEFAULT '',
    last_success_at TEXT NOT NULL DEFAULT '',
    last_error TEXT NOT NULL DEFAULT '',
    last_count INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT ''
  )`).run();
}

async function syncEbay(env) {
  const db = env.MARKETPLACE_DB;
  if (!db?.prepare) return { status: "unconfigured", source: "ebay", count: 0 };
  await ensureSchema(db);
  const state = await db.prepare("SELECT * FROM eus_inventory_sync_state WHERE source='ebay' LIMIT 1").first();
  const lastStarted = Date.parse(state?.last_started_at || "");
  const retryMs = state?.last_error ? ERROR_RETRY_MS : SYNC_INTERVAL_MS;
  if (Number.isFinite(lastStarted) && Date.now() - lastStarted < retryMs) {
    return {
      status: state?.last_error ? "stale" : "current",
      source: "ebay",
      count: Number(state?.last_count || 0),
      lastSuccessAt: clean(state?.last_success_at, 80),
      lastError: clean(state?.last_error, 240),
    };
  }
  const startedAt = new Date().toISOString();
  await db.prepare(`INSERT INTO eus_inventory_sync_state (source,last_started_at,last_success_at,last_error,last_count,updated_at)
    VALUES ('ebay',?,'','',0,?)
    ON CONFLICT(source) DO UPDATE SET last_started_at=excluded.last_started_at,updated_at=excluded.updated_at`).bind(startedAt, startedAt).run();
  try {
    const feed = await fetchListings(env);
    const listings = Array.isArray(feed.listings) ? feed.listings.slice(0, 500) : [];
    if (!listings.length) throw new Error("No active eBay listings returned");
    let created = 0, updated = 0, protectedManual = 0;
    const now = new Date().toISOString();
    const seen = new Set();
    for (const listing of listings) {
      seen.add(listing.id);
      const sku = `EBAY-${listing.id}`;
      const row = await db.prepare(`SELECT * FROM eus_inventory_items WHERE
        (lower(COALESCE(supplier,''))='ebay' AND supplier_product_id=?) OR sku=? COLLATE NOCASE LIMIT 1`).bind(listing.id, sku).first();
      const meta = JSON.stringify({ managedBy: AUTO_MARKER, seller: SELLER, source: feed.source, imageUrl: listing.imageUrl });
      const category = categoryFor(listing.name);
      if (!row) {
        await db.prepare(`INSERT INTO eus_inventory_items
          (id,sku,name,category,supplier,fulfillment_mode,supplier_product_id,source_url,sales_channels_json,cost_cents,price_cents,quantity_on_hand,quantity_reserved,reorder_point,status,notes,version,created_at,updated_at,updated_by)
          VALUES (?,?,?,?,?,'dropship',?,?,?,0,?,0,0,0,'active',?,1,?,?,?)`).bind(
            `inv_ebay_${listing.id}`, sku, listing.name, category, "eBay", listing.id, listing.url,
            JSON.stringify(["ebay", "website"]), listing.priceCents, meta, now, now, AUTO_BY,
          ).run();
        created += 1;
        continue;
      }
      const currentMeta = notesMeta(row.notes);
      const managed = clean(row.updated_by, 180) === AUTO_BY || currentMeta.managedBy === AUTO_MARKER;
      if (!managed) { protectedManual += 1; continue; }
      const changed = clean(row.name, 180) !== listing.name
        || clean(row.category, 100) !== category
        || integer(row.price_cents) !== listing.priceCents
        || clean(row.source_url, 700) !== listing.url
        || clean(row.status, 30) !== "active"
        || clean(row.fulfillment_mode, 40) !== "dropship"
        || String(row.notes || "") !== meta;
      if (!changed) continue;
      await db.prepare(`UPDATE eus_inventory_items SET
        name=?,category=?,supplier='eBay',fulfillment_mode='dropship',supplier_product_id=?,source_url=?,sales_channels_json=?,price_cents=?,
        quantity_on_hand=0,quantity_reserved=0,reorder_point=0,status='active',notes=?,version=version+1,updated_at=?,updated_by=? WHERE id=?`).bind(
          listing.name, category, listing.id, listing.url, JSON.stringify(["ebay", "website"]), listing.priceCents, meta, now, AUTO_BY, row.id,
        ).run();
      updated += 1;
    }
    if (feed.coverageComplete) {
      const managed = await db.prepare("SELECT id,supplier_product_id FROM eus_inventory_items WHERE lower(COALESCE(supplier,''))='ebay' AND updated_by=? AND status='active'").bind(AUTO_BY).all();
      for (const row of managed.results || []) {
        if (row.supplier_product_id && !seen.has(String(row.supplier_product_id))) {
          await db.prepare("UPDATE eus_inventory_items SET status='archived',version=version+1,updated_at=?,updated_by=? WHERE id=?").bind(now, AUTO_BY, row.id).run();
        }
      }
    }
    await db.prepare("UPDATE eus_inventory_sync_state SET last_success_at=?,last_error='',last_count=?,updated_at=? WHERE source='ebay'").bind(now, listings.length, now).run();
    return { status: "success", source: feed.source, count: listings.length, created, updated, protectedManual, lastSuccessAt: now };
  } catch (error) {
    const message = clean(error instanceof Error ? error.message : String(error), 240);
    const at = new Date().toISOString();
    await db.prepare("UPDATE eus_inventory_sync_state SET last_error=?,updated_at=? WHERE source='ebay'").bind(message, at).run().catch(() => {});
    console.error(JSON.stringify({ event: "ebay_inventory_sync_error", message }));
    return { status: "error", source: "ebay", count: Number(state?.last_count || 0), lastSuccessAt: clean(state?.last_success_at, 80), lastError: message };
  }
}

function publicItem(row) {
  const mode = clean(row.fulfillment_mode, 40) || "tracked";
  const onHand = integer(row.quantity_on_hand);
  const reserved = integer(row.quantity_reserved);
  const available = Math.max(0, onHand - reserved);
  const meta = notesMeta(row.notes);
  const fallback = new URL("https://www.ebay.com/sch/i.html");
  fallback.searchParams.set("_ssn", SELLER);
  fallback.searchParams.set("_nkw", clean(row.name, 180));
  let buyUrl = fallback.toString();
  const source = safeEbayItemUrl(row.source_url);
  if (source) buyUrl = source;
  return {
    id: clean(row.id, 100),
    sku: clean(row.sku, 80),
    name: clean(row.name, 180),
    category: clean(row.category, 100) || "RV & Outdoor",
    priceCents: integer(row.price_cents, 0, 100_000_000_000),
    fulfillmentMode: mode,
    quantityAvailable: mode === "tracked" ? available : null,
    availability: mode === "tracked" ? (available > 0 ? "In Stock" : "Out of Stock") : "Available from supplier",
    salesChannels: channels(row.sales_channels_json),
    imageUrl: safeImageUrl(meta.imageUrl),
    buyUrl,
    updatedAt: clean(row.updated_at, 80),
  };
}

export async function handleStoreInventory(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") return json({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  if (!env.MARKETPLACE_DB?.prepare) return json({ items: [], count: 0, storageConfigured: false, build: BUILD }, 200, { "Cache-Control": "public, max-age=3, s-maxage=3" });
  const supplierSync = await syncEbay(env);
  try {
    await ensureSchema(env.MARKETPLACE_DB);
    const result = await env.MARKETPLACE_DB.prepare(`SELECT * FROM eus_inventory_items
      WHERE status='active' AND lower(COALESCE(supplier,'')) <> 'fourthwall' AND fulfillment_mode <> 'pod'
      ORDER BY updated_at DESC, name COLLATE NOCASE ASC LIMIT 500`).all();
    const items = (result.results || []).map(publicItem);
    const response = json({ items, count: items.length, storageConfigured: true, supplierSync, syncedAt: new Date().toISOString(), build: BUILD }, 200, { "Cache-Control": "public, max-age=3, s-maxage=3" });
    return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
  } catch (error) {
    return json({ error: "Store inventory is temporarily unavailable", items: [], count: 0, supplierSync, build: BUILD }, 503);
  }
}
