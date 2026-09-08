(()=>{
  "use strict";

  const q=(selector)=>document.querySelector(selector);
  const esc=(value)=>String(value??"").replace(/[&<>"']/g,(character)=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[character]));
  let latest=null;
  let stagedRows=[];

  async function api(path,options={}){
    const response=await fetch(path,{credentials:"same-origin",cache:"no-store",headers:{Accept:"application/json",...(options.body?{"Content-Type":"application/json"}:{})},...options});
    const data=await response.json().catch(()=>({}));
    if(!response.ok){const error=new Error(data.error||`Request failed (${response.status})`);error.details=data;throw error;}
    return data;
  }

  function money(cents){return Number.isFinite(Number(cents))?`$${(Number(cents)/100).toFixed(2)}`:"—";}
  function dateLabel(value){if(!value)return"Not verified";const parsed=Date.parse(`${String(value).slice(0,10)}T00:00:00Z`);return Number.isFinite(parsed)?new Intl.DateTimeFormat("en-US",{dateStyle:"medium",timeZone:"UTC"}).format(parsed):String(value);}

  function renderSummary(data){
    const summary=data.stockSummary||{};
    q("#sok-stock-total").textContent=summary.total??0;
    q("#sok-stock-current").textContent=summary.in_stock??0;
    q("#sok-stock-recheck").textContent=(summary.unverified??0)+(summary.stale??0);
    q("#sok-stock-out").textContent=summary.out_of_stock??0;
    q("#sok-status").textContent=data.status||"—";
    q("#sok-anchor").textContent=data.anchorSku||"—";
    q("#sok-limit").textContent=`${data.maxStandardHawaiiQuantity??3} batteries`;
  }

  function visibleProducts(){
    const search=String(q("#sok-stock-search")?.value||"").trim().toLowerCase();
    const filter=q("#sok-stock-filter")?.value||"all";
    return (latest?.products||[]).filter((product)=>{
      const matchesText=!search||[product.sku,product.public_name,product.category,product.product_type].some((value)=>String(value||"").toLowerCase().includes(search));
      return matchesText&&(filter==="all"||product.stock?.key===filter);
    });
  }

  function renderProducts(){
    const body=q("#sok-products");
    if(!body)return;
    const products=visibleProducts();
    body.innerHTML=products.map((product)=>`<tr>
      <td><strong>${esc(product.sku)}</strong><span>${esc(product.public_name)}</span></td>
      <td>${esc(product.category||product.product_type||"Catalog item")}</td>
      <td><strong>${product.supplier_inventory===null||product.supplier_inventory===undefined?"Unknown":esc(product.supplier_inventory)}</strong></td>
      <td>${esc(dateLabel(product.last_supplier_verified))}</td>
      <td><span class="sok-state-badge is-${esc(product.stock?.key||"unverified")}">${esc(product.stock?.label||"Needs verification")}</span></td>
      <td>${esc(product.stock?.action||"Verify supplier stock.")}</td>
    </tr>`).join("")||'<tr><td colspan="6">No SOK products match this filter.</td></tr>';
  }

  function renderAdvanced(data){
    q("#sok-profiles").innerHTML=(data.freightProfiles||[]).map((profile)=>`<article><h3>${esc(profile.profile_id)}</h3><p>${esc(profile.configuration)}</p><p><strong>${esc(profile.cost_state)}</strong> · ${esc(profile.carrier_state)}</p><small>${esc(profile.handoff_route)}</small></article>`).join("")||"<p>No profiles.</p>";
    q("#sok-orders").innerHTML=(data.orderPackets||[]).map((order)=>`<article><h3>${esc(order.packet_id)}</h3><p>${esc(order.sku)} × ${esc(order.quantity)}</p><p>Commitment: ${esc(order.buyer_commitment_state)} · PO: ${esc(order.po_state)}</p></article>`).join("")||"<p>No order packets yet. PO progression remains blocked without buyer commitment or Management inventory override.</p>";
    q("#sok-research").innerHTML=(data.rrResearch||[]).map((record)=>`<article><h3>${esc(record.sku)}</h3><p>${esc(record.topic)}</p><small>${esc(record.status)}</small></article>`).join("")||"<p>No R&amp;R research records yet.</p>";
  }

  function render(data){
    latest=data;
    q("#sok-login").hidden=true;
    q("#sok-dashboard").hidden=false;
    renderSummary(data);
    renderProducts();
    renderAdvanced(data);
  }

  function parseCsvLine(line){
    const cells=[];let cell="";let quoted=false;
    for(let index=0;index<line.length;index+=1){const character=line[index];if(character==='"'){if(quoted&&line[index+1]==='"'){cell+='"';index+=1;}else quoted=!quoted;}else if(character===","&&!quoted){cells.push(cell.trim());cell="";}else cell+=character;}
    cells.push(cell.trim());return cells;
  }

  function parseStockCsv(text){
    const lines=String(text||"").replace(/^\uFEFF/,"").split(/\r?\n/).filter((line)=>line.trim());
    if(lines.length<2)throw new Error("Paste a header and at least one SOK stock row.");
    const headers=parseCsvLine(lines[0]).map((header)=>header.trim().toLowerCase().replace(/[\s-]+/g,"_"));
    const skuIndex=headers.indexOf("sku");
    const inventoryIndex=headers.findIndex((header)=>["supplier_inventory","inventory","stock","quantity"].includes(header));
    const verifiedIndex=headers.findIndex((header)=>["last_supplier_verified","verified","verified_date","date"].includes(header));
    if(skuIndex<0||inventoryIndex<0||verifiedIndex<0)throw new Error("CSV requires sku, supplier_inventory, and last_supplier_verified columns.");
    return lines.slice(1).map((line)=>{const cells=parseCsvLine(line);return{sku:cells[skuIndex],supplierInventory:cells[inventoryIndex],lastSupplierVerified:cells[verifiedIndex]};}).filter((row)=>String(row.supplierInventory||"").trim()||String(row.lastSupplierVerified||"").trim());
  }

  function renderPreview(preview){
    const panel=q("#sok-stock-preview-panel");
    panel.hidden=false;
    panel.innerHTML=`<div class="sok-preview-head"><strong>${preview.rowCount} row${preview.rowCount===1?"":"s"} · ${preview.errorCount} error${preview.errorCount===1?"":"s"}</strong><span>No prices, public availability, checkout, or freight rules will change.</span></div><div class="sok-stock-table-wrap"><table class="sok-stock-table"><thead><tr><th>Row</th><th>SKU</th><th>Supplier Qty</th><th>Verified</th><th>Review</th></tr></thead><tbody>${preview.rows.map((row)=>`<tr><td>${row.row}</td><td><strong>${esc(row.sku||"—")}</strong></td><td>${row.supplierInventory===null?"Unknown":esc(row.supplierInventory)}</td><td>${esc(row.lastSupplierVerified||"—")}</td><td class="${row.errors.length?"sok-preview-error":"sok-preview-ok"}">${row.errors.length?row.errors.map(esc).join(" · "):"Ready"}</td></tr>`).join("")}</tbody></table></div>`;
    q("#sok-stock-apply").disabled=!preview.canApply;
    q("#sok-stock-status").textContent=preview.canApply?"Preview is valid. Review the rows, then apply once.":"Preview has errors. Nothing was changed.";
  }

  async function previewStock(){
    const status=q("#sok-stock-status");
    try{
      stagedRows=parseStockCsv(q("#sok-stock-paste").value);
      status.textContent="Validating exact SOK SKUs…";
      const preview=await api("/api/admin/sok-operations/stock-preview",{method:"POST",body:JSON.stringify({rows:stagedRows})});
      renderPreview(preview);
    }catch(error){stagedRows=[];q("#sok-stock-apply").disabled=true;status.textContent=error.message;}
  }

  async function applyStock(){
    if(!stagedRows.length)return;
    const button=q("#sok-stock-apply"),status=q("#sok-stock-status");
    button.disabled=true;status.textContent="Applying verified supplier stock…";
    try{
      const data=await api("/api/admin/sok-operations/stock-apply",{method:"POST",body:JSON.stringify({rows:stagedRows,confirmed:true})});
      stagedRows=[];q("#sok-stock-paste").value="";q("#sok-stock-preview-panel").hidden=true;
      render(data);status.textContent=`Applied ${data.stockUpdate?.rowCount||0} verified stock row(s). Public commerce settings were unchanged.`;
    }catch(error){status.textContent=error.message;button.disabled=false;if(error.details?.preview)renderPreview(error.details.preview);}
  }

  function downloadTemplate(){
    const rows=["sku,supplier_inventory,last_supplier_verified",...(latest?.products||[]).map((product)=>`${product.sku},,`)];
    const url=URL.createObjectURL(new Blob([`${rows.join("\n")}\n`],{type:"text/csv"}));
    const link=document.createElement("a");link.href=url;link.download="sok-stock-template.csv";link.click();URL.revokeObjectURL(url);
  }

  async function load(){
    try{render(await api("/api/admin/sok-operations"));}
    catch(error){if(!/login|required/i.test(error.message))q("#sok-login-status").textContent=error.message;}
  }

  q("#sok-login-form")?.addEventListener("submit",async(event)=>{event.preventDefault();const form=new FormData(event.currentTarget);try{await api("/api/admin/login",{method:"POST",body:JSON.stringify({email:form.get("email"),password:form.get("password")})});await load();document.dispatchEvent(new CustomEvent("eus:sok-admin-authenticated"));}catch(error){q("#sok-login-status").textContent=error.message;}});
  q("#sok-refresh")?.addEventListener("click",load);
  q("#sok-stock-search")?.addEventListener("input",renderProducts);
  q("#sok-stock-filter")?.addEventListener("change",renderProducts);
  q("#sok-stock-preview")?.addEventListener("click",previewStock);
  q("#sok-stock-apply")?.addEventListener("click",applyStock);
  q("#sok-template")?.addEventListener("click",downloadTemplate);
  q("#sok-stock-file")?.addEventListener("change",async(event)=>{const file=event.target.files?.[0];if(file)q("#sok-stock-paste").value=await file.text();});
  load();
})();
