export const COMMERCE_SCHEMA_VERSION = "2026.09.02.1";

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
  {
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
