from pathlib import Path

p=Path('site/hawaii-lithium-runtime.js')
s=p.read_text()
imp='import { resolveShippingRule } from "./shipping-rules-runtime.js";\n'
if imp not in s:
    s=imp+s
start=s.find('async function publicStatuses(request, env) {')
end=s.find('\n\nfunction quoteExpired', start)
if start<0 or end<0:
    raise RuntimeError('publicStatuses boundaries missing')
fn='''async function publicStatuses(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") return json({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  const db = await ensureSchema(env);
  const ruleResult = await resolveShippingRule(env, { destinationState: "HI", quantity: 1, batteryUnitsPerItem: 1 });
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
  const rule = ruleResult?.rule || null;
  return json({
    statuses,
    customerFreightPerBatteryCents: Number(rule?.rateCents || HAWAII_CUSTOMER_FREIGHT_CENTS_PER_BATTERY),
    preferredConsolidationUnits: Number(rule?.preferredConsolidationQuantity || HAWAII_PREFERRED_CONSOLIDATION_UNITS),
    pickupOnly: Boolean(rule?.pickupOnly ?? true),
    shippingRule: rule ? { id: rule.id, version: rule.version, method: rule.method, rateCents: rule.rateCents, customerLabel: rule.customerLabel, timingMessage: rule.timingMessage } : null,
  });
}'''
s=s[:start]+fn+s[end:]
p.write_text(s)
print('Hawaii batched status now follows current Shipping Rule')
