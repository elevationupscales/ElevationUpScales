(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const state = { products: [], counts: {}, events: [], preview: null, admin: "" };
  const money = (cents) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format((Number(cents) || 0) / 100);
  const text = (value) => String(value ?? "").trim();
  const cents = (value) => Math.max(0, Math.round((Number(value) || 0) * 100));
  const dollars = (value) => ((Number(value) || 0) / 100).toFixed(2);
  const esc = (value) => text(value).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));

  async function api(url, options = {}) {
    const headers = { Accept: "application/json", ...(options.headers || {}) };
    if (options.body && !headers["Content-Type"]) headers["Content-Type"] = "application/json";
    const response = await fetch(url, { credentials: "same-origin", cache: "no-store", ...options, headers });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) { const error = new Error(body.error || `Request failed (${response.status})`); error.status = response.status; throw error; }
    return body;
  }
  function status(el, message, kind = "") { if (!el) return; el.textContent = message || ""; el.dataset.state = kind; }
  function showLogin(message = "") { $("catalog-login-panel").hidden = false; $("catalog-dashboard").hidden = true; $("catalog-logout").hidden = true; status($("catalog-login-status"), message, message ? "error" : ""); }
  function showDashboard() { $("catalog-login-panel").hidden = true; $("catalog-dashboard").hidden = false; $("catalog-logout").hidden = false; }

  function openPanel(name) {
    document.querySelectorAll(".catalog-panel").forEach((panel) => { panel.hidden = panel.id !== `catalog-panel-${name}`; });
    const target = $(`catalog-panel-${name}`); target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function closePanels() { document.querySelectorAll(".catalog-panel").forEach((panel) => { panel.hidden = true; }); }

  function applySnapshot(data) {
    state.products = Array.isArray(data.products) ? data.products : [];
    state.counts = data.counts || {};
    state.events = Array.isArray(data.recentEvents) ? data.recentEvents : [];
    state.admin = data.admin || state.admin;
    renderCounts(); renderTable(); renderActivity();
    status($("catalog-sync-status"), `Synced ${new Date(data.syncedAt || Date.now()).toLocaleTimeString([], {hour:"numeric",minute:"2-digit",second:"2-digit"})}`, "success");
  }
  async function loadCatalog() {
    status($("catalog-sync-status"), "Loading catalog…");
    try { const data = await api("/api/admin/catalog"); showDashboard(); applySnapshot(data); }
    catch (error) { if (error.status === 401) return showLogin(); status($("catalog-sync-status"), error.message, "error"); }
  }
  function renderCounts() {
    const c = state.counts || {};
    $("catalog-count-total").textContent = Number(c.total || 0).toLocaleString();
    $("catalog-count-published").textContent = Number(c.published || 0).toLocaleString();
    $("catalog-count-draft").textContent = Number(c.draft || 0).toLocaleString();
    $("catalog-count-hold").textContent = Number(c.hold || 0).toLocaleString();
    $("catalog-count-paused").textContent = Number(c.paused || 0).toLocaleString();
    $("catalog-count-review").textContent = Number(c.needsReview || 0).toLocaleString();
  }
  function needsReview(product) { return product.publishStatus === "hold" || product.shippingStatus !== "verified" || Boolean(product.reviewState); }
  function filteredProducts() {
    const q = text($("catalog-search").value).toLowerCase(); const source = $("catalog-source-filter").value; const filter = $("catalog-status-filter").value;
    return state.products.filter((product) => {
      if (source !== "all" && product.sourceType !== source) return false;
      if (filter === "needs-review" ? !needsReview(product) : filter !== "all" && product.publishStatus !== filter) return false;
      if (!q) return true;
      return [product.sku,product.title,product.category,product.sourceType,product.supplierProductId,product.supplierSku,product.ebayItemId,product.fourthwallProductId,product.storeSection].map(text).join(" ").toLowerCase().includes(q);
    });
  }
  function renderTable() {
    const products = filteredProducts(); $("catalog-table-summary").textContent = `Showing ${products.length} of ${state.products.length} catalog products.`;
    if (!products.length) { $("catalog-table-body").innerHTML = '<tr><td colspan="10">No catalog products match the current filters.</td></tr>'; return; }
    $("catalog-table-body").innerHTML = products.map((product) => `<tr data-product-id="${esc(product.id)}">
      <td><div class="catalog-product"><strong>${esc(product.title)}</strong><code>${esc(product.sku)}</code><small>${esc(product.category || "Uncategorized")}</small></div></td>
      <td><span class="catalog-pill">${esc(product.sourceType)}</span><br><small>${esc(product.supplierProductId || "")}</small></td>
      <td>${esc(product.storeSection)}</td><td>${money(product.supplierCostCents)}</td><td><strong>${money(product.priceCents)}</strong></td>
      <td>${product.fulfillmentMode === "tracked" ? `Physical ${Number(product.quantityOnHand||0)}` : product.supplierStock === null ? "Supplier managed" : Number(product.supplierStock).toLocaleString()}</td>
      <td><span class="catalog-pill ${esc(product.shippingStatus)}">${esc(product.shippingStatus)}</span>${product.shippingCents !== null ? `<br><small>${money(product.shippingCents)}</small>` : ""}</td>
      <td><span class="catalog-pill ${esc(product.publishStatus)}">${esc(product.publishStatus)}</span>${product.reviewState ? `<br><small>${esc(product.reviewState)}</small>` : ""}</td>
      <td>${esc(product.updatedAt ? new Date(product.updatedAt).toLocaleString([], {month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}) : "—")}</td>
      <td><div class="catalog-row-actions"><button class="primary" data-action="edit" type="button">Edit</button>${product.publishStatus === "published" ? '<button data-action="hold" type="button">Hold</button>' : '<button data-action="publish" type="button">Publish</button>'}</div></td></tr>`).join("");
  }
  function renderActivity() {
    const wrap = $("catalog-activity-list");
    if (!state.events.length) { wrap.innerHTML = '<p class="admin-muted">No catalog changes loaded.</p>'; return; }
    wrap.innerHTML = state.events.slice(0,30).map((event) => `<div class="catalog-activity-row"><span>${esc(event.created_at ? new Date(event.created_at).toLocaleString() : "")}</span><strong>${esc(event.sku || event.inventory_item_id)}</strong><span>${esc(event.action || "updated")}</span><small>${esc(event.admin_email || "")}</small></div>`).join("");
  }

  function splitDelimitedLine(line, delimiter) {
    const out=[]; let current=""; let quoted=false;
    for(let i=0;i<line.length;i+=1){const ch=line[i]; if(ch==='"'){if(quoted&&line[i+1]==='"'){current+='"';i+=1;}else quoted=!quoted;}else if(ch===delimiter&&!quoted){out.push(current);current="";}else current+=ch;} out.push(current); return out.map((v)=>v.trim());
  }
  function parseDelimited(raw) {
    let lines = String(raw||"").replace(/\r/g,"").split("\n").filter((line)=>line.trim()); if(!lines.length)return [];
    const pipe = !lines[0].includes("\t") && lines[0].includes("|");
    const delimiter = lines[0].includes("\t") ? "\t" : pipe ? "|" : lines[0].includes(",") ? "," : "\t";
    if (pipe) lines = lines.map((line)=>line.trim().replace(/^\|/,"").replace(/\|$/,"")).filter((line)=>!/^\s*:?-{3,}/.test(line));
    const headers = splitDelimitedLine(lines[0],delimiter).map((h)=>h.trim()).filter(Boolean);
    return lines.slice(1).map((line)=>{const cells=splitDelimitedLine(line,delimiter); const row={}; headers.forEach((header,index)=>{row[header]=cells[index]??"";}); return row;}).filter((row)=>Object.values(row).some((v)=>text(v)));
  }
  const normKey = (value) => text(value).toLowerCase().replace(/[^a-z0-9]+/g,"");
  function field(row, names) { const entries=Object.entries(row); for(const name of names){const wanted=normKey(name); const found=entries.find(([key])=>normKey(key)===wanted); if(found&&text(found[1]))return found[1];} return ""; }
  function moneyToCents(value) { const cleaned=text(value).replace(/[$,%\s]/g,"").replace(/,/g,""); const n=Number(cleaned); return Number.isFinite(n)?Math.max(0,Math.round(n*100)):0; }
  function numberValue(value) { const n=Number(text(value).replace(/,/g,"")); return Number.isFinite(n)?Math.max(0,Math.round(n)):null; }
  function adaptRows(rows, source) {
    return rows.map((row) => {
      const sku = field(row,["Store SKU","SKU","Custom label (SKU)","Custom label","Seller SKU","Variant SKU","Supplier SKU"]);
      const title = field(row,["Product","Product Title","Title","Item title","Item Name","Name"]);
      const itemNo = field(row,["Item No.","Item No","Doba Item No.","Supplier Product ID","Product ID","SPU"]);
      const priceRaw = field(row,["Store Price","Price","Current price","Selling Price","Retail Price"]);
      const costRaw = field(row,["Supplier Price","Cost","Unit Cost","Supplier Cost"]);
      const inventoryRaw = field(row,["Store Inventory","Inventory","Quantity available","Available quantity","Stock"]);
      const shippingRaw = field(row,["Shipping","Shipping Cost","Shipping price"]);
      const image = field(row,["Image","Image URL","Primary Image","Main Image"]);
      const url = field(row,["URL","Source URL","Product URL","Listing URL"]);
      const ebay = field(row,["Item number","eBay Item ID","eBay Item Number"]);
      const fourthwall = field(row,["Fourthwall Product ID","Variant ID"]);
      return {
        sourceType:source, sku, supplierSku:sku, title, category:field(row,["Category","Store Category"]), supplierProductId:itemNo,
        supplierCostCents:moneyToCents(costRaw), priceCents:moneyToCents(priceRaw), supplierStock:numberValue(inventoryRaw),
        fulfillmentMode:source==="doba"?"dropship":source==="fourthwall"?"pod":"supplier_managed", shippingStatus:"unverified", shippingCents:shippingRaw?moneyToCents(shippingRaw):null,
        primaryImage:image, sourceUrl:url || (source==="ebay"&&ebay?`https://www.ebay.com/itm/${text(ebay)}`:""), ebayItemId:ebay, fourthwallProductId:fourthwall,
        salesChannels:source==="ebay"?["ebay"]:source==="tiktok"?["tiktok"]:source==="fourthwall"?["website","fourthwall"]:["website"], storeSection:source==="fourthwall"?"apparel":"rv-outdoor", publishStatus:"draft"
      };
    });
  }
  async function previewBulk() {
    const raw = $("bulk-paste").value; const source=$("bulk-source").value; const parsed=parseDelimited(raw); if(!parsed.length){status($("bulk-status"),"Paste a table with a header row and at least one product.","error");return;}
    const rows=adaptRows(parsed,source); status($("bulk-status"),`Checking ${rows.length} rows…`);
    try { const data=await api("/api/admin/catalog/preview",{method:"POST",body:JSON.stringify({source,rows})}); state.preview={source,rows:data.normalizedRows,states:data.states,previewToken:data.previewToken}; renderPreview(); status($("bulk-status"),"Preview ready. Review flagged rows before importing.","success"); }
    catch(error){status($("bulk-status"),error.message,"error");}
  }
  function renderPreview() {
    const p=state.preview; if(!p){$("bulk-preview-wrap").hidden=true;return;} $("bulk-preview-wrap").hidden=false;
    const blocked = new Set(["ERROR","SKU MISMATCH","PRICE MISMATCH","INVENTORY MISMATCH","HOLD"]); const eligible=p.states.filter((row)=>!blocked.has(row.state)).length;
    $("bulk-preview-summary").textContent=`${p.states.length} rows · ${eligible} importable · ${p.states.length-eligible} held/review`;
    $("bulk-preview-body").innerHTML=p.states.map((row,index)=>{const record=p.rows[index]||{};return `<tr><td><span class="catalog-state ${esc(row.state)}">${esc(row.state)}</span></td><td><code>${esc(row.sku)}</code></td><td>${esc(row.title)}</td><td>${money(record.priceCents)}</td><td>${record.supplierStock===null?"—":Number(record.supplierStock||0)}</td><td>${esc((row.reasons||[]).join(" · "))}</td></tr>`;}).join("");
  }
  async function importBulk() {
    if(!state.preview)return; status($("bulk-status"),"Importing approved rows…");
    try { const data=await api("/api/admin/catalog/import",{method:"POST",body:JSON.stringify({source:state.preview.source,rows:state.preview.rows,previewToken:state.preview.previewToken})}); applySnapshot(data); const imported=(data.results||[]).filter((r)=>r.imported).length; status($("bulk-status"),`${imported} rows imported/updated. Flagged rows remained on hold.`,"success"); state.preview=null; renderPreview(); }
    catch(error){status($("bulk-status"),error.message,"error");}
  }

  const fieldIds = {
    id:"single-id", elevationProductId:"single-elevation-id", sku:"single-sku", title:"single-product-title", description:"single-description", category:"single-category", sourceType:"single-source", supplier:"single-supplier",
    fulfillmentMode:"single-fulfillment", supplierProductId:"single-supplier-product-id", supplierSku:"single-supplier-sku", sourceUrl:"single-source-url", ebayItemId:"single-ebay-id", fourthwallProductId:"single-fourthwall-id",
    primaryImage:"single-primary-image", storeSection:"single-store-section", publishStatus:"single-publish-status", shippingStatus:"single-shipping-status", reviewState:"single-review", internalNotes:"single-notes"
  };
  function resetSingle() {
    $("single-form").reset(); $("single-id").value=""; $("single-elevation-id").value=""; $("single-source").value="doba"; $("single-supplier").value="doba"; $("single-fulfillment").value="dropship"; $("single-store-section").value="rv-outdoor"; $("single-publish-status").value="draft"; $("single-shipping-status").value="unverified"; $("single-onhand").value="0"; $("single-title").textContent="Add Single Product"; status($("single-status"),"");
  }
  function fillSingle(product) {
    resetSingle(); for(const [key,id] of Object.entries(fieldIds)){if($(id))$(id).value=product[key]??"";}
    $("single-elevation-id").value=product.id||product.elevationProductId||""; $("single-cost").value=dollars(product.supplierCostCents); $("single-price").value=dollars(product.priceCents); $("single-supplier-stock").value=product.supplierStock??""; $("single-onhand").value=product.quantityOnHand??0;
    $("single-shipping").value=product.shippingCents===null||product.shippingCents===undefined?"":dollars(product.shippingCents); $("single-images").value=(product.images||[]).filter((v)=>v&&v!==product.primaryImage).join("\n"); $("single-channels").value=(product.salesChannels||[]).join(", "); $("single-title").textContent=product.title||"Edit Product"; openPanel("single");
  }
  function singlePayload() {
    const payload={}; for(const [key,id] of Object.entries(fieldIds))payload[key]=$(id)?.value||"";
    payload.id=$("single-id").value||$("single-elevation-id").value; payload.elevationProductId=$("single-elevation-id").value; payload.supplierCostCents=cents($("single-cost").value); payload.priceCents=cents($("single-price").value); payload.supplierStock=$("single-supplier-stock").value===""?null:Number($("single-supplier-stock").value); payload.quantityOnHand=Number($("single-onhand").value||0); payload.shippingCents=$("single-shipping").value===""?null:cents($("single-shipping").value); payload.images=$("single-images").value.split(/\n+/).map(text).filter(Boolean); payload.salesChannels=$("single-channels").value.split(/[,\n]+/).map(text).filter(Boolean); return payload;
  }
  async function saveSingle(event) {
    event.preventDefault(); status($("single-status"),"Saving…"); try{const data=await api("/api/admin/catalog",{method:"POST",body:JSON.stringify({product:singlePayload()})});applySnapshot(data);status($("single-status"),data.operation==="NEW"?"Product added.":"Product updated.","success");const saved=data.record;fillSingle(saved);}catch(error){status($("single-status"),error.message,"error");}
  }
  async function createUrlDraft(event) {
    event.preventDefault(); status($("url-status"),"Creating draft…"); try{const data=await api("/api/admin/catalog/url-draft",{method:"POST",body:JSON.stringify({url:$("url-input").value})});status($("url-status"),data.message||"Draft created.","success");fillSingle(data.draft);}catch(error){status($("url-status"),error.message,"error");}
  }
  async function updateStatus(product, publishStatus) {
    try { const data=await api(`/api/admin/catalog/${encodeURIComponent(product.id)}/status`,{method:"PATCH",body:JSON.stringify({publishStatus,reviewState:publishStatus==="hold"?(product.reviewState||"Placed on hold in Catalog Manager"):""})}); applySnapshot(data); }
    catch(error){status($("catalog-sync-status"),error.message,"error");}
  }

  $("catalog-login-form")?.addEventListener("submit",async(event)=>{event.preventDefault();const form=new FormData(event.currentTarget);status($("catalog-login-status"),"Signing in…");try{const response=await fetch("/api/admin/login",{method:"POST",body:form,credentials:"same-origin"});if(!response.ok)throw new Error("Admin sign-in failed.");event.currentTarget.reset();await loadCatalog();}catch(error){status($("catalog-login-status"),error.message,"error");}});
  $("catalog-logout")?.addEventListener("click",async()=>{await fetch("/api/admin/logout",{method:"POST",credentials:"same-origin"}).catch(()=>{});showLogin("Signed out.");});
  document.querySelectorAll("[data-open-panel]").forEach((button)=>button.addEventListener("click",()=>{if(button.dataset.openPanel==="single")resetSingle();openPanel(button.dataset.openPanel);}));
  document.querySelectorAll("[data-close-panel]").forEach((button)=>button.addEventListener("click",closePanels));
  document.querySelectorAll("[data-source-open]").forEach((button)=>button.addEventListener("click",()=>{$("bulk-source").value=button.dataset.sourceOpen;openPanel("bulk");}));
  document.querySelectorAll("[data-filter-status]").forEach((button)=>button.addEventListener("click",()=>{$("catalog-status-filter").value=button.dataset.filterStatus;renderTable();document.querySelector(".catalog-workspace")?.scrollIntoView({behavior:"smooth"});}));
  $("bulk-preview")?.addEventListener("click",previewBulk); $("bulk-import")?.addEventListener("click",importBulk); $("bulk-clear")?.addEventListener("click",()=>{$("bulk-paste").value="";$("bulk-file").value="";state.preview=null;renderPreview();status($("bulk-status"),"");});
  $("bulk-file")?.addEventListener("change",async(event)=>{const file=event.target.files?.[0];if(!file)return;$("bulk-paste").value=await file.text();status($("bulk-status"),`${file.name} loaded. Preview before importing.`);});
  $("single-form")?.addEventListener("submit",saveSingle); $("single-reset")?.addEventListener("click",resetSingle); $("url-form")?.addEventListener("submit",createUrlDraft);
  for(const control of [$("catalog-search"),$("catalog-source-filter"),$("catalog-status-filter")])control?.addEventListener(control===$("catalog-search")?"input":"change",renderTable);
  $("catalog-refresh")?.addEventListener("click",loadCatalog);
  $("catalog-table-body")?.addEventListener("click",(event)=>{const button=event.target.closest("button[data-action]");if(!button)return;const id=button.closest("tr")?.dataset.productId;const product=state.products.find((item)=>item.id===id);if(!product)return;if(button.dataset.action==="edit")fillSingle(product);if(button.dataset.action==="hold")updateStatus(product,"hold");if(button.dataset.action==="publish")updateStatus(product,"published");});
  loadCatalog();
})();
