from pathlib import Path
import re, shutil, sys

repo=Path(sys.argv[1] if len(sys.argv)>1 else ".").resolve()
control=Path(sys.argv[2] if len(sys.argv)>2 else ".").resolve()
site=repo/"site"

def must_replace(path, old, new, count=1):
    p=repo/path
    text=p.read_text()
    if old not in text:
        raise SystemExit(f"required patch anchor missing: {path}: {old[:90]!r}")
    text=text.replace(old,new,count)
    p.write_text(text)

def must_regex(path, pattern, repl, count=1, flags=0):
    p=repo/path
    text=p.read_text()
    new,n=re.subn(pattern,repl,text,count=count,flags=flags)
    if n!=count:
        raise SystemExit(f"required regex patch failed: {path}: {pattern!r}; got {n}")
    p.write_text(new)

shutil.copy2(control/"deployment/sok-4-6/sok-operations-runtime.js",site/"sok-operations-runtime.js")

# Worker routing: private runtime, protected admin API, safe public eligibility endpoint,
# Kingboss excluded from the Hawaii storefront, and server-side Hawaii collection bounded by SOK readiness.
must_replace("site/_worker.js",
'import { handleHawaiiLithiumAdminApi, handleHawaiiLithiumPublicApi } from "./hawaii-lithium-runtime.js";',
'import { handleHawaiiLithiumAdminApi, handleHawaiiLithiumPublicApi } from "./hawaii-lithium-runtime.js";\nimport { handleSokOperationsAdminApi, handleSokOperationsPublicApi, filterHawaiiEligibleCatalogProducts } from "./sok-operations-runtime.js";')
must_replace("site/_worker.js",'      "/hawaii-lithium-runtime.js",','      "/hawaii-lithium-runtime.js",\n      "/sok-operations-runtime.js",')
must_replace("site/_worker.js",'["/worker-core.js","/store-checkout-server.js","/store-orders-admin-server.js","/catalog-admin-server.js","/catalog-admin-runtime.js","/hawaii-lithium-runtime.js","/sync-admin-runtime.js","/doba-csv-sync-runtime.js","/apparel-provider-runtime.js","/commerce-schema-migrations.js","/shipping-rules-runtime.js"]',
'["/worker-core.js","/store-checkout-server.js","/store-orders-admin-server.js","/catalog-admin-server.js","/catalog-admin-runtime.js","/hawaii-lithium-runtime.js","/sok-operations-runtime.js","/sync-admin-runtime.js","/doba-csv-sync-runtime.js","/apparel-provider-runtime.js","/commerce-schema-migrations.js","/shipping-rules-runtime.js"]')
must_replace("site/_worker.js",'if(section==="hawaii"&&batteryUnitsPerCatalogUnit(p)<1)return false;',
'if(section==="hawaii"&&(batteryUnitsPerCatalogUnit(p)<1||KINGBOSS_CATALOG_IDS.has(clean(p.id||"",120))))return false;')
must_replace("site/_worker.js",'    if(url.pathname.startsWith("/api/hawaii-lithium/")) return handleHawaiiLithiumPublicApi(request,env,url.pathname);',
'    if(url.pathname==="/api/hawaii-lithium/eligible-products") return handleSokOperationsPublicApi(request,env,url.pathname);\n    if(url.pathname.startsWith("/api/hawaii-lithium/")) return handleHawaiiLithiumPublicApi(request,env,url.pathname);')
must_replace("site/_worker.js",'    if(url.pathname==="/api/admin/lithium-shipping"||url.pathname.startsWith("/api/admin/lithium-shipping/")) return handleHawaiiLithiumAdminApi(request,env,url.pathname);',
'    if(url.pathname==="/api/admin/lithium-shipping"||url.pathname.startsWith("/api/admin/lithium-shipping/")) return handleHawaiiLithiumAdminApi(request,env,url.pathname);\n    if(url.pathname==="/api/admin/sok-operations"||url.pathname.startsWith("/api/admin/sok-operations/")) return handleSokOperationsAdminApi(request,env,url.pathname);')

# Upgrade the server-side Hawaii storefront query if the current getPublicCatalog implementation has
# the expected simple return. This ensures unqualified SOK products do not flash in prerendered HTML.
w=repo/"site/_worker.js"
text=w.read_text()
start=text.find("async function getPublicCatalog(request,env,section)")
if start<0: raise SystemExit("getPublicCatalog missing")
end=text.find("async function",start+20)
if end<0: end=len(text)
chunk=text[start:end]
patterns=[r"return publicRows\(data,section\);",r"return publicRows\(payload,section\);",r"return publicRows\(jsonData,section\);"]
changed=False
for pat in patterns:
    m=re.search(pat,chunk)
    if m:
        arg=m.group(0)[len("return publicRows("):-2]
        replacement=f'const rows=publicRows({arg});return section==="hawaii"?await filterHawaiiEligibleCatalogProducts(env,rows):rows;'
        chunk=chunk[:m.start()]+replacement+chunk[m.end():]
        changed=True
        break
if not changed:
    # Safe fallback: Kingboss static exclusion above still prevents the existing secondary battery family.
    print("NOTICE: getPublicCatalog return shape not patched; relying on publicRows Kingboss block + client API.")
else:
    text=text[:start]+chunk+text[end:]
    w.write_text(text)

# Hawaii runtime: exact SOK readiness overrides generic route status and the public intake caps normal orders at 3.
must_replace("site/hawaii-lithium-runtime.js",'import { resolveShippingRule } from "./shipping-rules-runtime.js";',
'import { resolveShippingRule } from "./shipping-rules-runtime.js";\nimport { resolveSokHawaiiCustomerStatus, HAWAII_OPERATIONAL_MAX_QTY } from "./sok-operations-runtime.js";')
must_replace("site/hawaii-lithium-runtime.js",'  const quantity=Math.min(100,Math.max(1,int(raw.quantity,1))); const consent=boolInt(raw.consent);',
'  const quantity=Math.min(100,Math.max(1,int(raw.quantity,1))); const commercialQuantity=quantity>HAWAII_OPERATIONAL_MAX_QTY; const consent=boolInt(raw.consent);')
# After the standard request insert, convert larger requests into a quote-only internal hold and return a customer-safe response.
anchor="""    .bind(requestId,name,email,phone,zip,island,clean(raw.productInterest,240),quantity,intendedUse,clean(raw.notes,3000),consent,created,created,created).run();"""
insert=anchor+"""
  if(commercialQuantity){
    await db.prepare("UPDATE eus_hawaii_lithium_requests SET state='REVIEWING',fulfillment_state='HOLD',updated_at=? WHERE id=?").bind(now(),requestId).run();
    return json({ok:true,requestId,customerState:"commercial_review_required",label:"Commercial Quantity — Freight Review Required",quoteRequired:true,paymentAllowed:false,maxStandardQuantity:HAWAII_OPERATIONAL_MAX_QTY},202);
  }"""
must_replace("site/hawaii-lithium-runtime.js",anchor,insert)
# SOK/Kingboss policy is evaluated before legacy generic destination records.
must_replace("site/hawaii-lithium-runtime.js",'export async function resolveHawaiiCustomerStatus(env, { sku = "", productId = "", destination = "Hawaii — General" } = {}) {\n  const db = await ensureSchema(env);',
'export async function resolveHawaiiCustomerStatus(env, { sku = "", productId = "", destination = "Hawaii — General" } = {}) {\n  const sokState = await resolveSokHawaiiCustomerStatus(env,{sku,productId,destination});\n  if(sokState) return sokState;\n  const db = await ensureSchema(env);')

# Checkout: Hawaii is an exception path. Normal shopping stays unchanged; only a Hawaii lithium destination invokes SOK gates.
must_replace("site/store-checkout-server.js",'import { resolveHawaiiCustomerStatus } from "./hawaii-lithium-runtime.js";',
'import { resolveHawaiiCustomerStatus } from "./hawaii-lithium-runtime.js";\nimport { evaluateSokHawaiiOrder } from "./sok-operations-runtime.js";')
old='''  const hawaiiFreight = actualBattery && destinationState === "HI";\n  const hawaiiStatus = hawaiiFreight ? await resolveHawaiiCustomerStatus(env,{productId:id,sku:product?.sku||entry?.sku||"",destination:"Hawaii — General"}) : null;'''
new='''  const hawaiiFreight = actualBattery && destinationState === "HI";\n  const hawaiiSku=product?.sku||entry?.sku||"";\n  const sokHawaiiGate=hawaiiFreight?await evaluateSokHawaiiOrder(env,{productId:id,sku:hawaiiSku,quantity:qty,overrideToken:clean(raw?.hawaiiQuantityOverride,240),orderKey:clean(raw?.customer?.email||raw?.email,180)}):null;\n  if(sokHawaiiGate?.blocked)return {ok:false,status:sokHawaiiGate.status||409,error:sokHawaiiGate.label||"Freight Review Required",shippingReviewRequired:true,commercialQuoteRequired:Boolean(sokHawaiiGate.commercialQuoteRequired),maxStandardQuantity:sokHawaiiGate.maxStandardQuantity||3};\n  const hawaiiStatus = hawaiiFreight ? await resolveHawaiiCustomerStatus(env,{productId:id,sku:hawaiiSku,destination:"Hawaii — General"}) : null;'''
must_replace("site/store-checkout-server.js",old,new)

# Public Hawaii page: products first, SOK authorized-dealer status, freight intake only when Hawaii is relevant,
# and no universal SOK $99 promise before exact carrier qualification.
p=repo/"site/hawaii-lithium-batteries.html"
h=p.read_text()
h=h.replace('Shop current Elevation lithium batteries for Hawaii. Eligible batteries use $99-per-battery freight to the Honolulu warehouse / freight-terminal pickup location; address delivery is quoted separately where available.','Shop battery models currently approved to enter Elevation’s Hawaii freight workflow. Select a battery first, then complete the Hawaii freight intake for the exact SKU and quantity.')
h=h.replace('<p class="hawaii-license"><strong>LICENSED LITHIUM BATTERY RETAILER</strong></p>','<p class="hawaii-license"><strong>AUTHORIZED SOK ENERGY DEALER</strong></p>')
h=h.replace('Shop current Elevation lithium batteries for Hawaii and see the shipping state for each exact battery. Eligible orders use $99-per-battery freight to the Honolulu warehouse / freight-terminal pickup location. Elevation handles the freight coordination and sends pickup details when confirmed.','Shop the battery models currently approved for Elevation’s Hawaii freight workflow. Choose the product first. Hawaii freight review begins only after the exact battery, quantity and destination are known.')
h=h.replace('<a class="text-link-inline" href="#how-it-works">How the Freight Process Works →</a>','<a class="text-link-inline" href="#how-it-works">How Hawaii Orders Work →</a>')
h=re.sub(r'<div class="hawaii-batch-banner">.*?</div></div></section>', '<div class="hawaii-batch-banner"><p class="eyebrow">CONTROLLED HAWAII LAUNCH</p><h3>Standard Hawaii orders are currently limited to 1–3 batteries.</h3><p>Larger quantities route to commercial freight review before payment. Availability and freight are confirmed for the exact battery and destination.</p></div></div></section>', h, count=1, flags=re.S)
h=h.replace('Current Battery Inventory for Hawaii Requests','Hawaii-Eligible Battery List')
h=h.replace('These cards use the existing Elevation Lithium Catalog. Inventory is not duplicated for Hawaii. Each card shows a simple current shipping state. $99-per-battery freight is to the Honolulu pickup location; address delivery is an additional quoted service.','This is a controlled view of the same Elevation Catalog—not a second inventory system. Only battery models approved for the Hawaii freight workflow appear here.')
h=h.replace('Buy the battery. Elevation handles the freight process.','Choose the battery. Hawaii routing starts when Hawaii is selected.')
h=h.replace('Customers do not choose carriers, batches, compliance packages or freight routes. Elevation keeps that work on the operations side and provides meaningful updates as the order moves toward Honolulu pickup.','Normal shopping stays simple. When an eligible battery is going to Hawaii, Elevation routes the order into a short freight intake and keeps carrier, hazmat and supplier operations private.')
h=h.replace('Shipping Available batteries can be purchased with the current $99-per-actual-battery Honolulu pickup freight rule.','Choose from the dedicated Hawaii-eligible battery list.')
h=h.replace('Review the merchandise, quantity, Hawaii freight and total. Elevation coordinates the shipping work after purchase.','For 1–3 batteries, provide the Hawaii destination and freight-intake details. Larger quantities route to commercial review.')
h=h.replace('Elevation sends order and freight milestones, then confirmed Honolulu pickup details when the shipment is ready.','Elevation confirms the exact freight path and payment state before the order advances.')
h=re.sub(r'<section class="section" id="hawaii-freight-education">.*?</section>\s*', '', h, count=1, flags=re.S)
h=h.replace('max="100" value="1"','max="3" value="1"')
h=h.replace('Reserve / Request Shipping Review','Start Hawaii Freight Review')
h=h.replace('<strong>Review requests do not collect payment.</strong> Shipping Available batteries use $99 per actual battery to the Honolulu pickup location. Address delivery beyond that point is a separate quote.','<strong>Freight-intake requests do not collect payment.</strong> Exact freight, pickup or supported delivery is confirmed for the selected battery and destination before a review-required order can advance to payment.')
h=h.replace('Home Services • RV Services • Solar &amp; Off-Grid • Outdoor Marketplace','Lithium Batteries • Solar &amp; Off-Grid • Hawaii Power &amp; Logistics • RV &amp; Outdoor • Project Services')
p.write_text(h)

# Shared Shop navigation follows the new simple customer language.
must_replace("site/site-shell.js",'["/hawaii-lithium-batteries", "Hawaii Lithium Batteries", "Honolulu pickup pricing · Hawaii battery availability"]',
'["/hawaii-lithium-batteries", "Hawaii Power & Logistics", "Eligible battery models · Hawaii freight intake"]')

# Protected admin launch point.
must_replace("site/admin-lithium-shipping.html",'<a class="button button-outline" href="/admin-store-orders.html">Store Orders</a>',
'<a class="button button-outline" href="/admin-store-orders.html">Store Orders</a><a class="button button-outline" href="/admin-sok.html">SOK Operations</a>')

admin_html='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>SOK Operations | Elevation UpScales</title><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/admin-catalog.css"><link rel="stylesheet" href="/admin-sok.css"><script defer src="/admin-sok.js"></script></head><body class="admin-framework-page"><main class="sok-shell"><header><div><p class="eyebrow">PRIMARY AUTHORIZED BATTERY PARTNER</p><h1>SOK Operations</h1><p>Controlled manufacturer-direct battery lane. Supplier, freight and margin data stays internal.</p></div><nav><a class="button button-outline" href="/admin-lithium-shipping.html">Shipping & Logistics</a><a class="button button-outline" href="/admin-catalog.html">Catalog</a></nav></header><section id="sok-login"><h2>Admin sign-in required</h2><form id="sok-login-form"><label>Email<input name="email" type="email" required value="elevationupscales@gmail.com"></label><label>Password<input name="password" type="password" required></label><button class="button button-primary">Sign In</button><p id="sok-login-status"></p></form></section><section id="sok-dashboard" hidden><div class="sok-summary"><article><span>Status</span><strong id="sok-status">—</strong></article><article><span>Anchor SKU</span><strong id="sok-anchor">—</strong></article><article><span>Hawaii Standard Limit</span><strong id="sok-limit">—</strong></article></div><h2>Approved SOK SKU Operating Records</h2><div id="sok-products" class="sok-grid"></div><h2>Freight Profiles</h2><div id="sok-profiles" class="sok-grid"></div><h2>Order / PO Safeguards</h2><div id="sok-orders" class="sok-grid"></div><h2>R&amp;R Commercial Research</h2><div id="sok-research" class="sok-grid"></div><p id="sok-status-line" role="status"></p></section></main></body></html>'''
(site/"admin-sok.html").write_text(admin_html)
admin_js='''(()=>{"use strict";const q=s=>document.querySelector(s),esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));async function api(path,opts={}){const r=await fetch(path,{credentials:"same-origin",headers:{Accept:"application/json",...(opts.body?{"Content-Type":"application/json"}:{})},...opts});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||`Request failed (${r.status})`);return d;}function money(c){return Number.isFinite(Number(c))?`$${(Number(c)/100).toFixed(2)}`:"—";}function render(d){q("#sok-login").hidden=true;q("#sok-dashboard").hidden=false;q("#sok-status").textContent=d.status;q("#sok-anchor").textContent=d.anchorSku;q("#sok-limit").textContent=`${d.maxStandardHawaiiQuantity} batteries`;q("#sok-products").innerHTML=(d.products||[]).map(p=>`<article><h3>${esc(p.sku)}</h3><p>${esc(p.public_name)}</p><dl><dt>Lifecycle</dt><dd>${esc(p.lifecycle_state)}</dd><dt>Hazmat pre-ship</dt><dd>${esc(p.hazmat_state)}</dd><dt>Carrier</dt><dd>${esc(p.carrier_state)}</dd><dt>Economics</dt><dd>${esc(p.economics_state)}</dd><dt>Hawaii eligible</dt><dd>${p.hawaii_eligible?"Yes":"No"}</dd><dt>Supplier cost</dt><dd>${money(p.supplier_cost_cents)}</dd><dt>MAP</dt><dd>${money(p.map_cents)}</dd><dt>Source</dt><dd>${esc(p.source_warehouse)}</dd></dl></article>`).join("")||"<p>No records.</p>";q("#sok-profiles").innerHTML=(d.freightProfiles||[]).map(p=>`<article><h3>${esc(p.profile_id)}</h3><p>${esc(p.configuration)}</p><p><strong>${esc(p.cost_state)}</strong> · ${esc(p.carrier_state)}</p><small>${esc(p.handoff_route)}</small></article>`).join("")||"<p>No profiles.</p>";q("#sok-orders").innerHTML=(d.orderPackets||[]).map(o=>`<article><h3>${esc(o.packet_id)}</h3><p>${esc(o.sku)} × ${o.quantity}</p><p>Commitment: ${esc(o.buyer_commitment_state)} · PO: ${esc(o.po_state)}</p></article>`).join("")||"<p>No order packets yet. PO progression remains blocked without buyer commitment or Management inventory override.</p>";q("#sok-research").innerHTML=(d.rrResearch||[]).map(r=>`<article><h3>${esc(r.sku)}</h3><p>${esc(r.topic)}</p><small>${esc(r.status)}</small></article>`).join("")||"<p>No R&amp;R research records yet.</p>";}async function load(){try{render(await api("/api/admin/sok-operations"));}catch(e){if(!/login|required/i.test(e.message))q("#sok-login-status").textContent=e.message;}}q("#sok-login-form")?.addEventListener("submit",async e=>{e.preventDefault();const f=new FormData(e.currentTarget);try{await api("/api/admin/login",{method:"POST",body:JSON.stringify({email:f.get("email"),password:f.get("password")})});await load();}catch(err){q("#sok-login-status").textContent=err.message;}});load();})();'''
(site/"admin-sok.js").write_text(admin_js)
admin_css='''.sok-shell{width:min(1180px,94vw);margin:0 auto;padding:28px 0 70px}.sok-shell>header{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:24px}.sok-shell nav{display:flex;gap:8px;flex-wrap:wrap}.sok-summary,.sok-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin:16px 0 28px}.sok-summary article,.sok-grid article{border:1px solid rgba(255,200,61,.22);background:#111;padding:16px;border-radius:8px}.sok-summary span{display:block;color:#aaa;font-size:.75rem;text-transform:uppercase;letter-spacing:.08em}.sok-summary strong{display:block;margin-top:6px}.sok-grid dl{display:grid;grid-template-columns:1fr 1fr;gap:6px 10px}.sok-grid dt{color:#aaa}.sok-grid dd{margin:0;text-align:right}#sok-login{max-width:520px}#sok-login-form{display:grid;gap:12px}#sok-login-form label{display:grid;gap:5px}@media(max-width:700px){.sok-shell>header{display:block}.sok-shell nav{margin-top:14px}}'''
(site/"admin-sok.css").write_text(admin_css)

# Version markers on the touched browser assets only.
must_replace("site/hawaii-lithium-batteries.html",'lithium-shop.js?v=4.5.0','lithium-shop.js?v=4.6.0')
must_replace("site/hawaii-lithium-batteries.html",'hawaii-lithium-program.js?v=4.4.0','hawaii-lithium-program.js?v=4.6.0')

print("SOK 4.6 recovery patch applied")
