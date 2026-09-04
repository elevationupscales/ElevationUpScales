from pathlib import Path
import re


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{label}: expected one marker, found {count}")
    return text.replace(old, new, 1)


# Fix confirmed D1 baseline insert mismatch: 34 columns, 34 values.
p = Path("site/sok-operations-runtime.js")
s = p.read_text()
s = replace_once(
    s,
    "'NOT CONFIRMED',?,?,?,?,?,?,?,?,?,?,?,?,?,'SOP REQUIRED'",
    "'NOT CONFIRMED',?,?,?,?,?,?,?,?,?,?,?,?,'SOP REQUIRED'",
    "SOK 35/34 insert repair",
)
p.write_text(s)

# Keep public purchase mode independent from availability/fulfillment state.
p = Path("site/sok-availability-runtime.js")
s = p.read_text()
s = replace_once(
    s,
    'const MODES=new Set(["available","prepurchase","backorder","unavailable"]);\n',
    'const MODES=new Set(["available","prepurchase","backorder","unavailable"]);\nconst PURCHASE_MODES=new Set(["CATALOG_ONLY","CONTACT_TO_ORDER","PURCHASE_OPTIONS","DIRECT_CHECKOUT","UNAVAILABLE"]);\n',
    "purchase-mode set",
)
s = replace_once(
    s,
    '  await addColumn(db,"ALTER TABLE eus_sok_product_ops ADD COLUMN availability_mode TEXT NOT NULL DEFAULT \'unavailable\'");\n',
    '  await addColumn(db,"ALTER TABLE eus_sok_product_ops ADD COLUMN availability_mode TEXT NOT NULL DEFAULT \'unavailable\'");\n  await addColumn(db,"ALTER TABLE eus_sok_product_ops ADD COLUMN public_purchase_mode TEXT NOT NULL DEFAULT \'PURCHASE_OPTIONS\'");\n',
    "purchase-mode schema",
)

pattern = r'export function commercePresentation\(row,destinationState=""\)\{.*?\n\}\n\nfunction publicProduct\(row\)\{.*?\n\}\n\nexport async function publicSokCatalogProducts'
replacement = r'''export function commercePresentation(row,destinationState=""){
  const mode=MODES.has(clean(row?.availability_mode,30).toLowerCase())?clean(row.availability_mode,30).toLowerCase():"unavailable";
  const purchaseRaw=upper(row?.public_purchase_mode||"PURCHASE_OPTIONS",40);
  const purchaseMode=PURCHASE_MODES.has(purchaseRaw)?purchaseRaw:"PURCHASE_OPTIONS";
  const approved=bool(row?.management_approved);
  const timing=clean(row?.expected_ship_window,300)||clean(row?.expected_available_date,80);
  const timingNotice=clean(row?.customer_timing_notice,500)||SAFE_TIMING_NOTICE;
  const replenishment=bool(row?.supplier_replenishment_confirmed);
  let label="Temporarily Unavailable",baseCta="Check Availability",basePaymentEligible=false,requiresTimingAcknowledgement=false;
  if(mode==="available"&&approved){label="Available";baseCta="Buy Now";basePaymentEligible=true;}
  else if(mode==="prepurchase"&&approved&&bool(row?.prepurchase_enabled)){label="Pre-Purchase";baseCta="Pre-Purchase";basePaymentEligible=Boolean(timing);requiresTimingAcknowledgement=basePaymentEligible;}
  else if(mode==="backorder"&&approved&&bool(row?.backorder_enabled)){label="Available on Backorder";baseCta="Available on Backorder";basePaymentEligible=Boolean(replenishment&&timing);requiresTimingAcknowledgement=basePaymentEligible;}
  let cta=baseCta,paymentEligible=basePaymentEligible;
  if(purchaseMode!=="DIRECT_CHECKOUT") paymentEligible=false;
  if(purchaseMode==="CATALOG_ONLY") cta="View Product";
  else if(purchaseMode==="CONTACT_TO_ORDER") cta="Email Us to Order";
  else if(purchaseMode==="PURCHASE_OPTIONS") cta="See Purchase Options";
  else if(purchaseMode==="UNAVAILABLE"){cta="Currently Unavailable";paymentEligible=false;label="Temporarily Unavailable";}
  if(upper(destinationState,2)==="HI") paymentEligible=false;
  return{mode,label,cta,paymentEligible,requiresTimingAcknowledgement:paymentEligible&&requiresTimingAcknowledgement,expectedAvailableDate:clean(row?.expected_available_date,80),expectedShipWindow:clean(row?.expected_ship_window,300),timingNotice,managementApproved:approved,replenishmentConfirmed:replenishment,purchaseMode};
}

function publicProduct(row){
  const sku=upper(row?.sku,120),d=SOK_PUBLIC[sku];if(!d)return null;
  const availability=commercePresentation(row,"");
  const reservationUrl=`/sok-order.html?sku=${encodeURIComponent(sku)}&mode=${encodeURIComponent(availability.mode)}`;
  const detailUrl=`/product?id=${encodeURIComponent(d.id)}&store=lithium`;
  const checkoutUrl=`/checkout/?source=lithium&id=${encodeURIComponent(d.id)}&name=${encodeURIComponent(d.title)}`;
  let purchaseUrl=reservationUrl;
  if(availability.purchaseMode==="CATALOG_ONLY"||availability.purchaseMode==="UNAVAILABLE") purchaseUrl=detailUrl;
  else if(availability.paymentEligible) purchaseUrl=checkoutUrl;
  const hawaiiStatus=bool(row?.hawaii_eligible)?"shipping_available":"freight_review_required";
  return{id:d.id,sku,title:d.title,description:d.description,category:d.category,priceCents:d.mapCents,availabilityStatus:(availability.mode==="unavailable"||availability.purchaseMode==="UNAVAILABLE")?"unavailable":"available",shippingStatus:bool(row?.lower48_eligible)?"verified":"quote_required",shippingCents:null,primaryImage:"",images:[],storeSection:"lithium-batteries",publishStatus:"published",updatedAt:clean(row?.updated_at,80),purchaseUrl,promotion:{active:false,eligible:false,couponEligible:false,couponCode:"",couponPercent:0,pricingMode:"sok-map",shippingDiscounted:false},brand:"SOK Energy",authorizedDealer:true,sokProduct:true,availabilityMode:availability.mode,publicPurchaseMode:availability.purchaseMode,commerceLabel:availability.label,commerceCta:availability.cta,paymentEligible:availability.paymentEligible,requiresTimingAcknowledgement:availability.requiresTimingAcknowledgement,expectedAvailableDate:availability.expectedAvailableDate,expectedShipWindow:availability.expectedShipWindow,customerTimingNotice:availability.timingNotice,reservationUrl,purchaseOptionsUrl:reservationUrl,hawaiiStatus};
}

export async function publicSokCatalogProducts'''
s, n = re.subn(pattern, replacement, s, count=1, flags=re.S)
if n != 1:
    raise SystemExit(f"commerce/public product replacement failed: {n}")

s = replace_once(
    s,
    "SELECT sku,availability_mode,prepurchase_enabled,backorder_enabled,expected_available_date,expected_ship_window,supplier_replenishment_confirmed,customer_timing_notice,management_approved,lifecycle_state,hazmat_document_state,hazmat_state,carrier_state,economics_state,hawaii_eligible,commercial_ready,updated_at,updated_by FROM eus_sok_product_ops",
    "SELECT sku,availability_mode,public_purchase_mode,prepurchase_enabled,backorder_enabled,expected_available_date,expected_ship_window,supplier_replenishment_confirmed,customer_timing_notice,management_approved,lifecycle_state,hazmat_document_state,hazmat_state,carrier_state,economics_state,hawaii_eligible,commercial_ready,updated_at,updated_by FROM eus_sok_product_ops",
    "admin snapshot purchase mode",
)

pattern = r'async function patchAvailability\(request,env,sku,admin\)\{.*?\n\}\n\nexport async function handleSokAvailabilityPublicApi'
replacement = r'''async function patchAvailability(request,env,sku,admin){const db=await ensureSokAvailabilitySchema(env);const existing=await db.prepare("SELECT * FROM eus_sok_product_ops WHERE upper(sku)=? LIMIT 1").bind(upper(sku,120)).first();if(!existing)return json({error:"SOK SKU not found"},404);const raw=await request.json().catch(()=>({}));const mode=clean(raw.availabilityMode??existing.availability_mode,30).toLowerCase();if(!MODES.has(mode))return json({error:"Invalid availability mode"},400);const purchaseMode=upper(raw.publicPurchaseMode??existing.public_purchase_mode,40);if(!PURCHASE_MODES.has(purchaseMode))return json({error:"Invalid public purchase mode"},400);const prep=raw.prepurchaseEnabled===undefined?bool(existing.prepurchase_enabled):bool(raw.prepurchaseEnabled),back=raw.backorderEnabled===undefined?bool(existing.backorder_enabled):bool(raw.backorderEnabled),replenish=raw.supplierReplenishmentConfirmed===undefined?bool(existing.supplier_replenishment_confirmed):bool(raw.supplierReplenishmentConfirmed),approved=raw.managementApproved===undefined?bool(existing.management_approved):bool(raw.managementApproved),date=clean(raw.expectedAvailableDate??existing.expected_available_date,80),window=clean(raw.expectedShipWindow??existing.expected_ship_window,300),notice=clean(raw.customerTimingNotice??existing.customer_timing_notice,500)||SAFE_TIMING_NOTICE,stamp=now();await db.prepare("UPDATE eus_sok_product_ops SET availability_mode=?,public_purchase_mode=?,prepurchase_enabled=?,backorder_enabled=?,expected_available_date=?,expected_ship_window=?,supplier_replenishment_confirmed=?,customer_timing_notice=?,management_approved=?,updated_at=?,updated_by=? WHERE upper(sku)=?").bind(mode,purchaseMode,prep?1:0,back?1:0,date,window,replenish?1:0,notice,approved?1:0,stamp,admin,upper(sku,120)).run();await db.prepare("INSERT INTO eus_sok_events (id,entity_type,entity_id,action,details_json,actor,created_at) VALUES (?,?,?,?,?,?,?)").bind(`SOK-EVT-${crypto.randomUUID()}`,"product",upper(sku,120),"availability_updated",JSON.stringify({availabilityMode:mode,publicPurchaseMode:purchaseMode,prepurchaseEnabled:prep,backorderEnabled:back,expectedAvailableDate:date,expectedShipWindow:window,supplierReplenishmentConfirmed:replenish,managementApproved:approved}),admin,stamp).run();return json(await availabilityAdminSnapshot(db));}

export async function handleSokAvailabilityPublicApi'''
s, n = re.subn(pattern, replacement, s, count=1, flags=re.S)
if n != 1:
    raise SystemExit(f"admin availability replacement failed: {n}")
s = replace_once(
    s,
    "export const __sokAvailabilityTest={commercePresentation,SAFE_TIMING_NOTICE};",
    "export const __sokAvailabilityTest={commercePresentation,SAFE_TIMING_NOTICE,PURCHASE_MODES};",
    "test export purchase modes",
)
p.write_text(s)

# Admin control for per-SKU public purchase mode.
p = Path("site/admin-sok-availability.js")
s = p.read_text()
s = replace_once(
    s,
    '${badge(p.availability_mode)} ${badge(p.carrier_state)} ${badge(p.economics_state)}',
    '${badge(p.availability_mode)} ${badge(p.public_purchase_mode)} ${badge(p.carrier_state)} ${badge(p.economics_state)}',
    "admin purchase badge",
)
s = replace_once(
    s,
    '</select></label><label>Expected available date',
    '</select></label><label>Public purchase mode<select name="publicPurchaseMode">${["CATALOG_ONLY","CONTACT_TO_ORDER","PURCHASE_OPTIONS","DIRECT_CHECKOUT","UNAVAILABLE"].map(v=>`<option value="${v}" ${v===p.public_purchase_mode?"selected":""}>${v}</option>`).join("")}</select></label><label>Expected available date',
    "admin purchase select",
)
s = replace_once(
    s,
    'body={availabilityMode:f.get("availabilityMode"),expectedAvailableDate:',
    'body={availabilityMode:f.get("availabilityMode"),publicPurchaseMode:f.get("publicPurchaseMode"),expectedAvailableDate:',
    "admin purchase PATCH body",
)
p.write_text(s)

# Server-rendered cards honor purchase mode and do not advertise unproven SOK Hawaii freight price.
p = Path("site/_worker.js")
s = p.read_text()
s = replace_once(
    s,
    'const pickupPriceCents=merchandiseCents+pickupFreightCents;return',
    'const pickupPriceCents=merchandiseCents+pickupFreightCents;const hawaiiPriceReady=!product?.sokProduct||clean(product?.hawaiiStatus,40).toLowerCase()==="shipping_available";const normalActionUrl=clean(product?.purchaseUrl||checkout,1000)||checkout;const normalActionLabel=clean(product?.commerceCta||"Buy Now",80)||"Buy Now";return',
    "worker SOK action state",
)
s = replace_once(s, '` href="${htmlEsc(checkout)}"`', '` href="${htmlEsc(normalActionUrl)}"`', "worker purchase URL")
s = replace_once(s, '${hawaii?"Check Hawaii Availability":"Buy Now"}', '${hawaii?"Check Hawaii Availability":htmlEsc(normalActionLabel)}', "worker purchase CTA")
s = replace_once(s, '${batteryUnits>0?htmlEsc(money(pickupPriceCents)):"Freight Review Required"}', '${batteryUnits>0&&hawaiiPriceReady?htmlEsc(money(pickupPriceCents)):"Freight Review Required"}', "worker Hawaii pickup state")
s = replace_once(s, '${hawaii&&batteryUnits>0?htmlEsc(money(pickupPriceCents)):htmlEsc(money(product?.priceCents))}', '${hawaii&&batteryUnits>0&&hawaiiPriceReady?htmlEsc(money(pickupPriceCents)):htmlEsc(money(product?.priceCents))}', "worker Hawaii footer state")
p.write_text(s)

# Client cards mirror server behavior.
p = Path("site/lithium-shop.js")
s = p.read_text()
s = replace_once(
    s,
    'const pickupPriceCents = merchandiseCents + (batteryUnits > 0 ? 9900 * batteryUnits : 0);',
    'const pickupPriceCents = merchandiseCents + (batteryUnits > 0 ? 9900 * batteryUnits : 0);\n    const hawaiiPriceReady = !product?.sokProduct || String(product?.hawaiiStatus || "").toLowerCase() === "shipping_available";',
    "client Hawaii readiness",
)
s = replace_once(s, '${batteryUnits > 0 ? money.format(pickupPriceCents / 100) : "Freight Review Required"}', '${batteryUnits > 0 && hawaiiPriceReady ? money.format(pickupPriceCents / 100) : "Freight Review Required"}', "client Hawaii pickup state")
s = replace_once(s, '${hawaiiMode && batteryUnits > 0 ? money.format(pickupPriceCents / 100) : money.format(merchandiseCents / 100)}', '${hawaiiMode && batteryUnits > 0 && hawaiiPriceReady ? money.format(pickupPriceCents / 100) : money.format(merchandiseCents / 100)}', "client Hawaii footer state")
p.write_text(s)

# Assisted purchase page: product inquiry, commercial pricing, and Hawaii paths.
p = Path("site/sok-order.html")
s = p.read_text()
s = replace_once(s, '<title>SOK Order Reservation | Elevation UpScales</title>', '<title>SOK Purchase Options | Elevation UpScales</title>', "order page title")
s = replace_once(s, 'content="Reserve or start a pre-purchase/backorder request for SOK lithium batteries through Elevation UpScales."', 'content="Review purchase, commercial pricing, Hawaii freight, pre-purchase and backorder options for SOK lithium batteries through Elevation UpScales."', "order page description")
s = replace_once(s, '<h1>Start a SOK Order</h1><p>This request lets Elevation begin availability, fulfillment and freight processing before payment when a product is on pre-purchase, backorder or destination review.</p>', '<h1>SOK Purchase Options</h1><p>This SOK product is available through Elevation UpScales. Ordering options may depend on quantity and destination. Choose the path that fits your order; unresolved routes remain reservation-first and do not collect payment.</p>', "order page intro")
s = replace_once(s, '<h2 id="sok-order-title">SOK Battery Reservation</h2>', '<h2 id="sok-order-title">Start Your Purchase Request</h2>', "order page panel title")
marker = '<p id="sok-order-mode">Availability and final timing will be confirmed before the order advances.</p>'
actions = marker + '<div class="lithium-actions" aria-label="SOK purchase options"><a class="button button-outline" id="sok-email-product" href="mailto:casey@elevationupscales.com">Email Us About This Product</a><button class="button button-outline" type="button" data-sok-intent="commercial">Request Commercial Pricing</button><button class="button button-outline" type="button" data-sok-intent="hawaii">Check Hawaii Availability</button></div>'
s = replace_once(s, marker, actions, "order page purchase actions")
form = '<form id="sok-order-form" style="display:grid;gap:14px">'
s = replace_once(s, form, form + '<input id="sok-order-intent" name="intent" type="hidden" value="purchase_options">', "order page intent")
s = replace_once(s, 'placeholder="Project, quantity or timing details"', 'placeholder="Intended use, project details, quantity or timing notes"', "order page notes")
s = replace_once(s, '>Start Order Processing</button>', '>Submit Purchase Request</button>', "order page submit")
p.write_text(s)

Path("site/sok-order.js").write_text(r'''(()=>{"use strict";const params=new URLSearchParams(location.search),form=document.querySelector("#sok-order-form"),status=document.querySelector("#sok-order-status"),skuEl=document.querySelector("#sok-order-sku"),qtyEl=document.querySelector("#sok-order-qty"),stateEl=document.querySelector("#sok-order-state"),modeEl=document.querySelector("#sok-order-mode"),intentEl=document.querySelector("#sok-order-intent"),emailLink=document.querySelector("#sok-email-product");const products={SK12V100PC:{id:"sok-sk12v100pc",name:"SOK SK12V100PC 12.8V 100Ah 1280Wh LiFePO4 Battery"},SK48V100N:{id:"sok-sk48v100n",name:"SOK SK48V100N 51.2V 100Ah 5120Wh Server Rack LiFePO4 Battery"}};const sku=String(params.get("sku")||"").trim().toUpperCase(),mode=String(params.get("mode")||"").trim().toLowerCase(),product=products[sku]||{id:"",name:sku||"SOK battery"};skuEl.value=sku;if(params.get("qty"))qtyEl.value=params.get("qty");if(params.get("state"))stateEl.value=String(params.get("state")).trim().toUpperCase();if(mode==="prepurchase")modeEl.textContent="PRE-PURCHASE — Expected fulfillment timing is an estimate and may change. Elevation will confirm the current supply window before payment when required.";else if(mode==="backorder")modeEl.textContent="AVAILABLE ON BACKORDER — Elevation will confirm replenishment and estimated fulfillment timing before payment when required.";else modeEl.textContent="Availability and final timing will be confirmed before the order advances.";const productUrl=product.id?`${location.origin}/product?id=${encodeURIComponent(product.id)}&store=lithium`:location.href;function refreshEmail(){if(!emailLink)return;const subject=`SOK purchase options — ${sku||"battery"}`,body=[`I'm interested in the ${product.name}.`,`SKU: ${sku||"Not selected"}`,`Quantity: ${qtyEl.value||""}`,`Shipping destination: ${stateEl.value||""}`,"Intended use: ",`Product: ${productUrl}`].join("\n");emailLink.href=`mailto:casey@elevationupscales.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;}[qtyEl,stateEl].forEach(el=>el?.addEventListener("input",refreshEmail));document.querySelectorAll("[data-sok-intent]").forEach(btn=>btn.addEventListener("click",()=>{const intent=String(btn.dataset.sokIntent||"purchase_options");intentEl.value=intent;if(intent==="hawaii"){stateEl.value="HI";status.textContent="Hawaii availability selected. Standard Hawaii requests are limited to 1–3 batteries; larger quantities route to commercial freight review.";stateEl.dispatchEvent(new Event("input"));}else{status.textContent="Commercial pricing selected. Enter the quantity and destination below so Elevation can review the order.";}form.scrollIntoView({behavior:"smooth",block:"start"});}));refreshEmail();form?.addEventListener("submit",async e=>{e.preventDefault();status.textContent="Submitting purchase request…";const rawNotes=document.querySelector("#sok-order-notes").value.trim(),context=`Purchase option: ${intentEl.value}; Product: ${product.name}; Product URL: ${productUrl}`;const body={sku:skuEl.value,quantity:Number.parseInt(qtyEl.value||"1",10)||1,destinationState:stateEl.value.trim().toUpperCase(),name:document.querySelector("#sok-order-name").value.trim(),email:document.querySelector("#sok-order-email").value.trim(),phone:document.querySelector("#sok-order-phone").value.trim(),notes:rawNotes?`${context}; Notes: ${rawNotes}`:context};try{const r=await fetch("/api/sok/reservations",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(body)}),d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||"Unable to start the order");status.textContent=`${d.status}. Reference ${d.reservationId}. ${d.nextStep}`;form.querySelector("button[type=submit]").disabled=true;}catch(err){status.textContent=err.message;}});})();''')

# Restrained SOK text co-branding only; no unverified logo/image asset added.
p = Path("site/lithium-batteries.html")
s = p.read_text()
marker = '<p class="lithium-retailer-badge"><strong>LICENSED LITHIUM BATTERY RETAILER</strong></p>'
s = replace_once(s, marker, marker + '<p class="lithium-retailer-badge"><strong>AUTHORIZED SOK ENERGY DEALER</strong></p>', "Lithium SOK dealer badge")
p.write_text(s)

# Hawaii copy reflects catalog-first discovery, while freight/payment gates stay separate.
p = Path("site/hawaii-lithium-batteries.html")
s = p.read_text()
s = replace_once(s, 'Shop battery models currently approved to enter Elevation’s Hawaii freight workflow. Select a battery first, then complete the Hawaii freight intake for the exact SKU and quantity.', 'Browse SOK battery models available through Elevation UpScales for Hawaii. Select a battery first, then complete freight review for the exact SKU, quantity and destination.', "Hawaii meta description")
s = replace_once(s, 'Shop the battery models currently approved for Elevation’s Hawaii freight workflow. Choose the product first. Hawaii freight review begins only after the exact battery, quantity and destination are known.', 'Browse SOK battery models available through Elevation UpScales. Choose the product first. Hawaii freight review begins only after the exact battery, quantity and destination are known.', "Hawaii hero copy")
s = replace_once(s, '>View Hawaii Battery Inventory</a>', '>Browse Hawaii Battery Catalog</a>', "Hawaii catalog CTA")
s = replace_once(s, 'Choose from the dedicated Hawaii-eligible battery list.', 'Choose from the Hawaii battery catalog. Products that still need carrier or economics qualification remain freight review required.', "Hawaii step copy")
p.write_text(s)

print("SOK finalizer patch applied")
