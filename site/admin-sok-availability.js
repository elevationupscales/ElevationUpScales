(()=>{
  "use strict";
  const host=document.querySelector("#sok-availability-admin");
  const esc=(value)=>String(value??"").replace(/[&<>"']/g,(character)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[character]));
  if(!host)return;

  async function api(path,options={}){
    const response=await fetch(path,{credentials:"same-origin",headers:{Accept:"application/json",...(options.body?{"Content-Type":"application/json"}:{})},...options});
    const data=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error([data.error,...(data.blockers||[])].filter(Boolean).join(": ")||`Request failed (${response.status})`);
    return data;
  }

  function badge(value){return `<span class="sok-state-badge">${esc(String(value||"—").toUpperCase())}</span>`;}

  function render(data){
    const products=data.products||[],reservations=data.reservations||[];
    host.innerHTML=`<h2>Commerce Availability</h2>
      <p>Direct checkout is limited to a management-approved, exact-SKU, MAP-verified Lower-48 product. Inventory freshness and fulfillment preparation remain visible operating alerts, but do not prevent a customer from paying. Hawaii and Alaska remain review-gated.</p>
      <div class="sok-grid">${products.map((product)=>`<article data-sok-availability-card="${esc(product.sku)}">
        <h3>${esc(product.sku)}</h3>
        <p>${badge(product.availability_mode)} ${badge(product.public_purchase_mode)} ${badge(product.commerce?.inventoryFreshness)} ${badge(product.carrier_state)} ${badge(product.economics_state)}</p>
        <dl>
          <dt>Exact supplier SKU / model</dt><dd>${esc(product.supplier_sku)} / ${esc(product.model)}</dd>
          <dt>MAP retail</dt><dd>${Number.isInteger(Number(product.map_cents))?`$${(Number(product.map_cents)/100).toFixed(2)}`:"Not verified"}</dd>
          <dt>Last inventory confirmation</dt><dd>${esc(product.last_supplier_verified||"Not recorded")}</dd>
          <dt>Confirmation source</dt><dd>${esc(product.inventory_confirmation_source||"Not recorded")}</dd>
          <dt>Lower-48 eligible</dt><dd>${product.lower48_eligible?"Yes":"No"}</dd>
          <dt>Hazmat documents</dt><dd>${esc(product.hazmat_document_state)}</dd>
          <dt>Hawaii eligible</dt><dd>${product.hawaii_eligible?"Yes":"No"}</dd>
          <dt>Payment presentation</dt><dd>${product.commerce?.paymentEligible?"Eligible where destination gates pass":"Assisted purchase / review only"}</dd>
          <dt>Management approved</dt><dd>${product.management_approved?"Yes":"No"}</dd>
          <dt>Direct-checkout blockers</dt><dd>${(product.dropshipReadiness?.blockers||[]).length?esc(product.dropshipReadiness.blockers.join(", ")):"None"}</dd>
          <dt>Operations alerts</dt><dd>${(product.dropshipReadiness?.operationalAlerts||[]).length?esc(product.dropshipReadiness.operationalAlerts.join(", ")):"None"}</dd>
        </dl>
        <form class="sok-availability-form" data-sku="${esc(product.sku)}">
          <label>Availability mode<select name="availabilityMode">${["available","prepurchase","backorder","unavailable"].map((value)=>`<option value="${value}" ${value===product.availability_mode?"selected":""}>${value}</option>`).join("")}</select></label>
          <label>Public purchase mode<select name="publicPurchaseMode">${["CATALOG_ONLY","CONTACT_TO_ORDER","PURCHASE_OPTIONS","DIRECT_CHECKOUT","UNAVAILABLE"].map((value)=>`<option value="${value}" ${value===(product.commerce?.purchaseMode||product.public_purchase_mode)?"selected":""}>${value}</option>`).join("")}</select></label>
          <label>Inventory confirmation source<input name="inventoryConfirmationSource" value="${esc(product.inventory_confirmation_source)}" placeholder="SOK spreadsheet, portal or representative"></label>
          <label><input type="checkbox" name="confirmInventoryNow"> Record a new inventory confirmation now</label>
          <label>Inventory freshness<select name="inventoryFreshnessState">${["CURRENT","AGING","STALE","UNCONFIRMED"].map((value)=>`<option value="${value}" ${value===product.inventory_freshness_state?"selected":""}>${value}</option>`).join("")}</select></label>
          <label>Expected available date<input name="expectedAvailableDate" value="${esc(product.expected_available_date)}" placeholder="YYYY-MM-DD or leave blank"></label>
          <label>Expected ship window<input name="expectedShipWindow" value="${esc(product.expected_ship_window)}" placeholder="Only enter a credible confirmed/estimated window"></label>
          <label>Customer timing notice<textarea name="customerTimingNotice" rows="3">${esc(product.customer_timing_notice)}</textarea></label>
          <label><input type="checkbox" name="prepurchaseEnabled" ${product.prepurchase_enabled?"checked":""}> Pre-purchase enabled</label>
          <label><input type="checkbox" name="backorderEnabled" ${product.backorder_enabled?"checked":""}> Backorder enabled</label>
          <label><input type="checkbox" name="supplierReplenishmentConfirmed" ${product.supplier_replenishment_confirmed?"checked":""}> Supplier replenishment confirmed</label>
          <label><input type="checkbox" name="managementApproved" ${product.management_approved?"checked":""}> Management approved</label>
          <button class="button button-primary" type="submit">Save Availability State</button>
        </form>
      </article>`).join("")}</div>
      <h2>Carrier Qualification Package</h2>
      <div class="sok-grid">${(data.carrierQualification?.packages||[]).map((item)=>`<article><h3>${esc(item.sku)}</h3><p>${esc(item.voltage)} · ${esc(item.wh)}Wh</p><dl><dt>Gross weight</dt><dd>${esc(item.grossWeightLb)} lb</dd><dt>Carton</dt><dd>${esc(item.carton)}</dd><dt>Primary</dt><dd>${esc(data.carrierQualification.primary)}</dd><dt>Backup</dt><dd>${esc(data.carrierQualification.backup)}</dd><dt>Carrier</dt><dd>${esc(item.carrierAcceptance)}</dd><dt>Economics</dt><dd>${esc(item.economicsApproval)}</dd></dl><p><strong>Documents:</strong> ${item.documents.map(esc).join(" · ")}</p></article>`).join("")}</div>
      <h2>Customer Reservations / Backorders</h2>
      <div class="sok-grid">${reservations.length?reservations.map((reservation)=>`<article><h3>${esc(reservation.sku)} × ${esc(reservation.quantity)}</h3><p>${badge(reservation.availability_mode)} ${reservation.commercial_quantity?badge("commercial quantity block"):""}</p><p>${esc(reservation.customer_name)} · ${esc(reservation.customer_email)}${reservation.customer_phone?` · ${esc(reservation.customer_phone)}`:""}</p><p>Destination: ${esc(reservation.destination_state||"—")} · ${esc(reservation.created_at)}</p><small>${esc(reservation.id)}</small></article>`).join(""):"<p>No SOK reservations yet.</p>"}</div>
      <p id="sok-availability-status" role="status"></p>`;
    host.querySelectorAll(".sok-availability-form").forEach((form)=>form.addEventListener("submit",save));
  }

  async function save(event){
    event.preventDefault();
    const form=event.currentTarget,sku=form.dataset.sku,status=host.querySelector("#sok-availability-status"),fields=new FormData(form);
    status.textContent=`Saving ${sku}…`;
    const body={availabilityMode:fields.get("availabilityMode"),publicPurchaseMode:fields.get("publicPurchaseMode"),inventoryConfirmationSource:fields.get("inventoryConfirmationSource"),inventoryFreshnessState:fields.get("inventoryFreshnessState"),confirmInventoryNow:fields.get("confirmInventoryNow")==="on",expectedAvailableDate:fields.get("expectedAvailableDate"),expectedShipWindow:fields.get("expectedShipWindow"),customerTimingNotice:fields.get("customerTimingNotice"),prepurchaseEnabled:fields.get("prepurchaseEnabled")==="on",backorderEnabled:fields.get("backorderEnabled")==="on",supplierReplenishmentConfirmed:fields.get("supplierReplenishmentConfirmed")==="on",managementApproved:fields.get("managementApproved")==="on"};
    try{render(await api(`/api/admin/sok-availability/products/${encodeURIComponent(sku)}`,{method:"PATCH",body:JSON.stringify(body)}));}
    catch(error){status.textContent=error.message;}
  }

  api("/api/admin/sok-availability").then(render).catch((error)=>{host.innerHTML=`<p>${esc(error.message)}</p>`;});
})();
