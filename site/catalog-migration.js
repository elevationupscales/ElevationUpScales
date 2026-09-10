(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const state = { preview: null };
  const SOURCES = new Set(["doba","ebay","tiktok","fourthwall","sok","kingboss","printful","spreadconnect","self-stock","other"]);
  const SUPPLIERS = new Set(["doba","fourthwall","sok","kingboss","printful","spreadconnect","self-stock","other"]);
  const FULFILLMENT = new Set(["tracked","supplier_managed","dropship","pod"]);
  const SHIPPING = new Set(["unverified","verified","quote_required","hold"]);
  const PUBLISH = new Set(["draft","published","paused","archived","hold"]);
  const text = (value) => String(value ?? "").trim();
  const esc = (value) => text(value).replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
  const money = (cents) => new Intl.NumberFormat("en-US", { style:"currency", currency:"USD" }).format((Number(cents)||0)/100);
  const normKey = (value) => text(value).toLowerCase().replace(/[^a-z0-9]+/g, "");
  function status(message, kind = "") { const el=$("migration-status"); if(!el)return; el.textContent=message||""; el.dataset.state=kind; }
  function loginStatus(message, kind = "") { const el=$("migration-login-status"); if(!el)return; el.textContent=message||""; el.dataset.state=kind; }
  function showLogin(message="") { $("migration-login-panel").hidden=false; $("migration-dashboard").hidden=true; $("migration-logout").hidden=true; loginStatus(message,message?"error":""); }
  function showDashboard() { $("migration-login-panel").hidden=true; $("migration-dashboard").hidden=false; $("migration-logout").hidden=false; }
  async function api(url, options={}) {
    const headers={Accept:"application/json",...(options.headers||{})};
    if(options.body&&!headers["Content-Type"])headers["Content-Type"]="application/json";
    const response=await fetch(url,{credentials:"same-origin",cache:"no-store",...options,headers});
    const body=await response.json().catch(()=>({}));
    if(!response.ok){const error=new Error(body.error||`Request failed (${response.status})`);error.status=response.status;throw error;}
    return body;
  }
  function splitDelimitedLine(line, delimiter) {
    const out=[];let current="";let quoted=false;
    for(let i=0;i<line.length;i+=1){const ch=line[i];if(ch==='"'){if(quoted&&line[i+1]==='"'){current+='"';i+=1;}else quoted=!quoted;}else if(ch===delimiter&&!quoted){out.push(current);current="";}else current+=ch;}out.push(current);return out.map((v)=>v.trim());
  }
  function parseDelimited(raw) {
    let lines=String(raw||"").replace(/\r/g,"").split("\n").filter((line)=>line.trim());
    if(!lines.length)return[];
    const pipe=!lines[0].includes("\t")&&lines[0].includes("|");
    const delimiter=lines[0].includes("\t")?"\t":pipe?"|":lines[0].includes(",")?",":"\t";
    if(pipe)lines=lines.map((line)=>line.trim().replace(/^\|/,"").replace(/\|$/,"")).filter((line)=>!/^\s*:?-{3,}/.test(line));
    const headers=splitDelimitedLine(lines[0],delimiter).map((h)=>h.trim()).filter(Boolean);
    return lines.slice(1).map((line)=>{const cells=splitDelimitedLine(line,delimiter);const row={};headers.forEach((header,index)=>{row[header]=cells[index]??"";});return row;}).filter((row)=>Object.values(row).some((v)=>text(v)));
  }
  function field(row,names){const entries=Object.entries(row);for(const name of names){const wanted=normKey(name);const found=entries.find(([key])=>normKey(key)===wanted);if(found&&text(found[1]))return found[1];}return"";}
  function dollarsToCents(value){const cleaned=text(value).replace(/[$,%\s]/g,"").replace(/,/g,"");const n=Number(cleaned);return Number.isFinite(n)?Math.max(0,Math.round(n*100)):0;}
  function numberValue(value){if(text(value)==="")return null;const n=Number(text(value).replace(/,/g,""));return Number.isFinite(n)?Math.max(0,Math.round(n)):null;}
  function normalizeToken(value,allowed,fallback){const token=text(value).toLowerCase().replace(/[\s_]+/g,"-");return allowed.has(token)?token:fallback;}
  function sourceValue(value){const token=text(value).toLowerCase().replace(/[\s_]+/g,"-");const aliases={"sok-energy":"sok","sok-battery":"sok","king-boss":"kingboss","fourth-wall":"fourthwall","spread-connect":"spreadconnect","self":"self-stock","elevation":"self-stock"};return normalizeToken(aliases[token]||token,SOURCES,"other");}
  function supplierValue(value,source){const token=text(value).toLowerCase().replace(/[\s_]+/g,"-");const aliases={"sok-energy":"sok","sok-battery":"sok","king-boss":"kingboss","fourth-wall":"fourthwall","spread-connect":"spreadconnect","self":"self-stock","elevation":"self-stock"};const normalized=aliases[token]||token;if(SUPPLIERS.has(normalized))return normalized;return SUPPLIERS.has(source)?source:"other";}
  function fulfillmentValue(value,source){const token=text(value).toLowerCase().replace(/[\s-]+/g,"_");if(FULFILLMENT.has(token))return token;if(["fourthwall","printful","spreadconnect"].includes(source))return"pod";if(source==="doba")return"dropship";return"supplier_managed";}
  function storeSectionValue(value,source,category,title){const raw=text(value).toLowerCase();if(["rv-outdoor","lithium-batteries","apparel","other"].includes(raw))return raw;if(/apparel|gear|shirt|hoodie|hat|cap|bag|sock|jogger|jacket/.test(`${raw} ${category} ${title}`.toLowerCase()))return"apparel";if(/lithium|battery|lifepo4|power storage/.test(`${raw} ${category} ${title}`.toLowerCase())||source==="sok")return"lithium-batteries";if(/rv|outdoor|camp|tool|automotive|atv|tow|travel|solar|off[- ]grid/.test(`${raw} ${category} ${title}`.toLowerCase()))return"rv-outdoor";return"other";}
  function splitList(value,max=12){return [...new Set(text(value).split(/[|;,\n]+/).map(text).filter(Boolean))].slice(0,max);}
  function adaptRows(rows){
    return rows.map((row)=>{
      const sku=field(row,["Canonical SKU","Elevation SKU","Store SKU","SKU","Custom label (SKU)","Custom label"]);
      const title=field(row,["Product Title","Product","Title","Item title","Item Name","Name"]);
      const source=sourceValue(field(row,["Source","Source Type","Provider","Platform"]));
      const supplier=supplierValue(field(row,["Supplier","Vendor","Fulfillment Provider"]),source);
      const supplierSku=field(row,["Supplier SKU","Vendor SKU","Variant SKU","Manufacturer SKU"])||sku;
      const department=field(row,["Department","Store Department"]);
      const subcategory=field(row,["Subcategory","Sub Category"]);
      const directCategory=field(row,["Category","Store Category"]);
      const category=directCategory||[department,subcategory].filter(Boolean).join(" > ");
      const priceRaw=field(row,["Price","Store Price","Current price","Selling Price","Retail Price"]);
      const costRaw=field(row,["Supplier Cost","Supplier Price","Cost","Unit Cost"]);
      const inventoryRaw=field(row,["Supplier Stock","Store Inventory","Inventory","Quantity available","Available quantity","Stock"]);
      const shippingRaw=field(row,["Shipping Cost","Shipping","Shipping price"]);
      const image=field(row,["Primary Image","Image","Image URL","Main Image"]);
      const additionalImages=splitList(field(row,["Additional Images","Images","Gallery"]),10);
      const sourceUrl=field(row,["Source URL","Legacy URL","Product URL","Listing URL","URL"]);
      const ebay=field(row,["eBay Item ID","eBay Item Number","Item number"]);
      const fourthwall=field(row,["Fourthwall Product ID","Fourthwall ID","Variant ID"]);
      const shippingStatus=normalizeToken(field(row,["Shipping Status"]),SHIPPING,"unverified");
      const publishStatus=normalizeToken(field(row,["Publish Status","Status"]),PUBLISH,"draft");
      const fulfillmentMode=fulfillmentValue(field(row,["Fulfillment","Fulfillment Mode"]),source);
      const storeSection=storeSectionValue(field(row,["Store Section","Store"]),source,category,title);
      const salesChannels=splitList(field(row,["Sales Channels","Channels"]),12);
      const notes=[field(row,["Internal Notes","Notes"]),department?`Department: ${department}`:"",subcategory?`Subcategory: ${subcategory}`:""].filter(Boolean).join("\n");
      return {
        sku,title,description:field(row,["Description","Product Description"]),category,sourceType:source,supplier,
        supplierProductId:field(row,["Supplier Product ID","Product ID","Item No.","Item No","Doba Item No.","SPU"]),supplierSku,
        supplierCostCents:dollarsToCents(costRaw),priceCents:dollarsToCents(priceRaw),supplierStock:numberValue(inventoryRaw),fulfillmentMode,
        shippingStatus,shippingCents:shippingStatus==="verified"&&shippingRaw?dollarsToCents(shippingRaw):null,primaryImage:image,images:[image,...additionalImages].filter(Boolean),
        sourceUrl,ebayItemId:ebay,fourthwallProductId:fourthwall,salesChannels:salesChannels.length?salesChannels:(source==="ebay"?["ebay"]:source==="tiktok"?["tiktok"]:source==="fourthwall"?["website","fourthwall"]:["website"]),
        storeSection,publishStatus,reviewState:field(row,["Review State","Review / Hold Reason","Hold Reason"]),internalNotes:notes
      };
    });
  }
  async function preview(){
    const parsed=parseDelimited($("migration-paste").value);if(!parsed.length){status("Upload or paste a source file with a header row and at least one product.","error");return;}
    const rows=adaptRows(parsed);status(`Checking ${rows.length} rows…`);
    try{const data=await api("/api/admin/catalog/preview",{method:"POST",body:JSON.stringify({source:"other",rows})});state.preview={source:"other",rows:data.normalizedRows,states:data.states,previewToken:data.previewToken};renderPreview();status("Preview ready. Review held rows before importing.","success");}
    catch(error){status(error.message,"error");}
  }
  function renderPreview(){
    const p=state.preview;const wrap=$("migration-preview-wrap");if(!p){wrap.hidden=true;return;}wrap.hidden=false;
    const blocked=new Set(["ERROR","SKU MISMATCH","PRICE MISMATCH","INVENTORY MISMATCH","HOLD"]);const eligible=p.states.filter((row)=>!blocked.has(row.state)).length;
    $("migration-preview-summary").textContent=`${p.states.length} rows · ${eligible} importable · ${p.states.length-eligible} held/review`;
    $("migration-preview-body").innerHTML=p.states.map((row,index)=>{const record=p.rows[index]||{};return `<tr><td><span class="catalog-state ${esc(row.state)}">${esc(row.state)}</span></td><td><code>${esc(row.sku)}</code></td><td>${esc(row.title)}</td><td>${esc(record.sourceType||"other")} / ${esc(record.supplier||"other")}</td><td>${esc(record.category||"Uncategorized")}</td><td>${money(record.priceCents)}</td><td>${record.supplierStock===null?"—":Number(record.supplierStock||0).toLocaleString()}</td><td>${esc((row.reasons||[]).join(" · "))}</td></tr>`;}).join("");
  }
  async function importRows(){
    if(!state.preview)return;status("Importing approved rows…");
    try{const data=await api("/api/admin/catalog/import",{method:"POST",body:JSON.stringify({source:state.preview.source,rows:state.preview.rows,previewToken:state.preview.previewToken})});const imported=(data.results||[]).filter((row)=>row.imported).length;const held=(data.results||[]).length-imported;status(`${imported} rows imported/updated · ${held} held for review. Existing stores remain unchanged.`,"success");state.preview=null;renderPreview();}
    catch(error){status(error.message,"error");}
  }
  async function checkSession(){try{await api("/api/admin/catalog");showDashboard();}catch(error){if(error.status===401)showLogin();else showLogin(error.message);}}
  $("migration-login-form")?.addEventListener("submit",async(event)=>{event.preventDefault();const form=new FormData(event.currentTarget);loginStatus("Signing in…");try{const response=await fetch("/api/admin/login",{method:"POST",body:form,credentials:"same-origin"});if(!response.ok)throw new Error("Admin sign-in failed.");event.currentTarget.reset();showDashboard();}catch(error){loginStatus(error.message,"error");}});
  $("migration-logout")?.addEventListener("click",async()=>{await fetch("/api/admin/logout",{method:"POST",credentials:"same-origin"}).catch(()=>{});showLogin("Signed out.");});
  $("migration-file")?.addEventListener("change",async(event)=>{const file=event.target.files?.[0];if(!file)return;$("migration-paste").value=await file.text();state.preview=null;renderPreview();status(`${file.name} loaded. Preview before importing.`);});
  $("migration-preview")?.addEventListener("click",preview);
  $("migration-import")?.addEventListener("click",importRows);
  $("migration-clear")?.addEventListener("click",()=>{$("migration-paste").value="";$("migration-file").value="";state.preview=null;renderPreview();status("");});
  checkSession();
})();
