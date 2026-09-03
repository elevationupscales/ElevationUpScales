from pathlib import Path
p=Path('site/store-checkout-server.js')
s=p.read_text(encoding='utf-8')
old='''async function createStoreOrder(request, env) {\n  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "POST" });\n  if (!paypalConfigured(env)) return json({ error: "PayPal checkout is not configured" }, 503);\n  if (!liveCheckoutAllowed(env)) return json({ error: "Live checkout is locked pending launch approval" }, 503);\n\n  const raw = await request.json().catch(() => ({}));'''
new='''async function createStoreOrder(request, env) {\n  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, { Allow: "POST" });\n\n  const raw = await request.json().catch(() => ({}));'''
if old not in s: raise RuntimeError('createStoreOrder provider gate marker missing')
s=s.replace(old,new,1)
marker='''  if (quote.hawaii?.customerState === "review_required") return json({error:"Freight Review Required. Elevation will verify the battery and Hawaii freight path and contact you with the next step.",hawaiiFreight:true,requestUrl:quote.hawaii.requestUrl,quote},409);\n  if (quote.hawaii?.customerState === "unavailable") return json({error:"Currently Unavailable for Hawaii Shipping",hawaiiFreight:true,requestUrl:quote.hawaii.requestUrl,quote},409);\n  const address = normalizeAddress(raw?.shipping);'''
replacement='''  if (quote.hawaii?.customerState === "review_required") return json({error:"Freight Review Required. Elevation will verify the battery and Hawaii freight path and contact you with the next step.",hawaiiFreight:true,requestUrl:quote.hawaii.requestUrl,quote},409);\n  if (quote.hawaii?.customerState === "unavailable") return json({error:"Currently Unavailable for Hawaii Shipping",hawaiiFreight:true,requestUrl:quote.hawaii.requestUrl,quote},409);\n  if (!paypalConfigured(env)) return json({ error: "PayPal checkout is not configured" }, 503);\n  if (!liveCheckoutAllowed(env)) return json({ error: "Live checkout is locked pending launch approval" }, 503);\n  const address = normalizeAddress(raw?.shipping);'''
if marker not in s: raise RuntimeError('Hawaii payment-boundary marker missing')
s=s.replace(marker,replacement,1)
p.write_text(s,encoding='utf-8')
print('Checkout eligibility now gates payment-provider readiness')
