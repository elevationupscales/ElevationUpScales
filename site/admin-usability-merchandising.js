(() => {
  "use strict";
  if (window.EUSAdminUsabilityCleanupLoaded) return;
  window.EUSAdminUsabilityCleanupLoaded = true;

  const path = location.pathname.replace(/\.html$/i, "").replace(/\/$/, "") || "/";
  const supported = new Set(["/admin-catalog","/admin-inventory","/admin-channels","/admin-store-orders","/admin-lithium-shipping"]);
  if (!supported.has(path)) return;

  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const text = (v) => String(v ?? "").trim();
  const esc = (v) => text(v).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const money = (cents) => new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format((Number(cents)||0)/100);
  const percent = (v) => Number.isFinite(v) ? `${Math.round(v*10)/10}%` : "—";
  const debounce = (fn, ms=220) => { let t=0; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn(...a),ms); }; };
  const image = (url, name, size=56) => {
    const safe = /^https?:\/\//i.test(text(url)) ? text(url) : "/assets/logo.webp";
    return `<span class="eus-merch-thumb" style="--thumb:${size}px"><img src="${esc(safe)}" width="${size}" height="${size}" loading="lazy" decoding="async" alt="" data-merch-img><span class="sr-only">${esc(name||"Product")}</span></span>`;
  };

  const ELEVATION_CATEGORIES = [
    "Lithium Batteries","Solar & Off-Grid","RV Essentials & Water","Camping & Shelter",
    "Automotive, ATV & Towing","Tools & Workshop","Outdoor Lighting & Power",
    "Travel & Organization","Apparel","Other / Review"
  ];

  async function api(url, options={}) {
    const headers = {Accept:"application/json", ...(options.headers||{})};
    const response = await fetch(url, {credentials:"same-origin", cache:"no-store", ...options, headers});
    const body = await response.json().catch(()=>({}));
    if (!response.ok) { const e=new Error(body.error||`Request failed (${response.status})`); e.status=response.status; throw e; }
    return body;
  }

  function cleanDisplayTitle(raw) {
    const original = text(raw).replace(/\s+/g," ");
    if (!original) return "Untitled product";
    if (original.length <= 92) return original;

    const battery = /(?:lifepo4|lithium iron phosphate|lithium battery)/i.test(original);
    if (battery) {
      const voltage = original.match(/\b(12(?:\.8)?|24|25\.6|36|48|51\.2)\s*V\b/i)?.[0]?.replace(/\s+/g,"");
      const ah = original.match(/\b(\d{2,4}(?:\.\d+)?)\s*Ah\b/i)?.[0]?.replace(/\s+/g,"");
      const bms = original.match(/\b(\d{2,4})\s*A\s*BMS\b/i);
      const chemistry = /LiFePO4/i.test(original) ? "LiFePO4" : (/lithium iron phosphate/i.test(original) ? "Lithium Iron Phosphate" : "Lithium");
      if (voltage && ah) return `${voltage} ${ah} ${chemistry} Battery${bms ? ` — ${bms[1]}A BMS` : ""}`;
    }

    const first = original.split(/\s*[|;]\s*|\s+-\s+|\s*,\s*(?=[A-Z])/)[0];
    if (first.length >= 35 && first.length <= 100) return first;
    const withCut = original.split(/\b(?:with|for)\b/i)[0].trim().replace(/[,\-–—:\s]+$/,"");
    if (withCut.length >= 35 && withCut.length <= 100) return withCut;
    return original.slice(0, 88).replace(/\s+\S*$/,"").replace(/[,\-–—:\s]+$/,"") + "…";
  }

  function normalizedCategory(p={}) {
    const section = text(p.storeSection).toLowerCase();
    const hay = `${text(p.category)} ${text(p.title)} ${text(p.description)}`.toLowerCase();
    if (section === "apparel" || /\b(apparel|shirt|hoodie|hat|tee|sweatshirt)\b/.test(hay)) return "Apparel";
    if (section === "lithium-batteries" || /\b(lifepo4|lithium battery|battery bank)\b/.test(hay)) return "Lithium Batteries";
    if (/\b(solar|mppt|charge controller|photovoltaic|off[- ]?grid|inverter)\b/.test(hay)) return "Solar & Off-Grid";
    if (/\b(rv|water heater|water pump|fresh water|holding tank|toilet|tire pressure)\b/.test(hay)) return "RV Essentials & Water";
    if (/\b(camping|camp|tent|gazebo|shelter|canopy|sleeping)\b/.test(hay)) return "Camping & Shelter";
    if (/\b(atv|automotive|vehicle|trailer|towing|tow|hitch|truck|car )\b/.test(hay)) return "Automotive, ATV & Towing";
    if (/\b(tool|socket|plasma cutter|recovery tank|workshop|wrench|drill|fuse)\b/.test(hay)) return "Tools & Workshop";
    if (/\b(light|lantern|flashlight|power bank|portable power station|generator)\b/.test(hay)) return "Outdoor Lighting & Power";
    if (/\b(organizer|travel|laptop desk|storage bag|seat gap|cup holder)\b/.test(hay)) return "Travel & Organization";
    const current = text(p.category);
    return ELEVATION_CATEGORIES.includes(current) ? current : "Other / Review";
  }

  function gross(p={}) {
    const price = Number(p.priceCents)||0;
    const cost = Number(p.supplierCostCents ?? p.costCents)||0;
    if (price <= 0) return {dollars:null, margin:null};
    return {dollars:price-cost, margin:((price-cost)/price)*100};
  }

  function baseFamilyTitle(title) {
    return cleanDisplayTitle(title).toLowerCase()
      .replace(/\b(black|white|blue|green|red|gray|grey|orange|yellow|pink|silver)\b/g,"")
      .replace(/\b\d+(?:\.\d+)?\s*(?:pack|pcs?|piece|ft|feet|inch|in)\b/g,"")
      .replace(/\s+/g," ").trim();
  }

  function buildGroups(products) {
    const buckets = new Map();
    products.forEach(p => {
      const key = `${normalizedCategory(p)}|${baseFamilyTitle(p.title)}`;
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(p);
    });
    const info = new Map();
    buckets.forEach((items,key) => {
      const distinctSkus = new Set(items.map(p=>text(p.supplierSku||p.sku)).filter(Boolean));
      const imageSet = new Set(items.map(p=>text(p.primaryImage)).filter(Boolean));
      let classification = "DISTINCT PRODUCT";
      if (items.length > 1 && distinctSkus.size > 1) classification = "VARIANT FAMILY";
      if (items.length > 1 && imageSet.size <= 1) classification = "NEAR DUPLICATE — REVIEW";
      items.forEach(p => info.set(p.id || p.sku, {key, size:items.length, classification}));
    });
    return info;
  }

  function listingState(p={}, group={}) {
    const review = text(p.reviewState).toLowerCase();
    const stock = p.supplierStock === null || p.supplierStock === undefined ? null : Number(p.supplierStock);
    if (/sync.*error|error.*sync/.test(review)) return "SYNC ERROR";
    if (stock === 0) return "OUT OF STOCK";
    if (text(p.publishStatus).toLowerCase() === "hold") return "HOLD";
    if (text(p.publishStatus).toLowerCase() === "published") return "LIVE";
    const g = gross(p);
    const ready = text(p.supplierSku) && Number(p.supplierCostCents)>0 && stock !== 0 &&
      text(p.primaryImage) && cleanDisplayTitle(p.title) && normalizedCategory(p)!=="Other / Review" &&
      Number(p.priceCents)>0 && g.dollars >= 500 && g.margin >= 20 &&
      text(p.shippingStatus).toLowerCase()==="verified" && !review &&
      !/REVIEW/.test(group.classification||"");
    return ready ? "READY" : "DRAFT";
  }

  function blocker(p={}, state="", group={}) {
    if (state==="LIVE" || state==="READY") return "—";
    if (state==="OUT OF STOCK") return "Supplier out of stock";
    if (state==="SYNC ERROR") return text(p.reviewState)||"Sync needs attention";
    if (state==="HOLD") return text(p.reviewState)||"HOLD — review required";
    if (/REVIEW/.test(group.classification||"")) return "Duplicate / variant review";
    if (!text(p.supplierSku)) return "Supplier SKU missing";
    if (!(Number(p.supplierCostCents)>0)) return "Supplier cost missing";
    if (p.supplierStock === null || p.supplierStock === undefined) return "Supplier stock not confirmed";
    if (!text(p.primaryImage)) return "Thumbnail / primary image missing";
    if (normalizedCategory(p)==="Other / Review") return "Category review";
    if (!(Number(p.priceCents)>0)) return "Retail price missing";
    const g=gross(p); if (g.dollars < 500 || g.margin < 20) return "Margin review";
    if (text(p.shippingStatus).toLowerCase()!=="verified") return "Shipping path review";
    return text(p.reviewState)||"Readiness review";
  }

  function pill(state) {
    const c = state==="LIVE"||state==="READY" ? "is-good" : state==="HOLD"||state==="OUT OF STOCK"||state==="SYNC ERROR" ? "is-alert" : "is-warn";
    return `<span class="eus-merch-pill ${c}">${esc(state)}</span>`;
  }

  function rewriteHumanVoice() {
    const exact = new Map([
      ["Track physical Elevation stock separately from supplier-managed availability, current supplier cost, and source freshness.","Manage Elevation inventory and supplier availability."],
      ["Supplier-managed, dropship, and POD items stay in the catalog without pretending we physically hold stock.","Supplier-managed products do not count as physical on-hand inventory."],
      ["Updates from this page appear in other open Inventory sessions automatically. Server state is rechecked every few seconds while this page is visible.",""],
      ["One master Elevation product catalog with clear listing readiness, source relationships, HOLD controls, and channel mappings.","Manage products, images, suppliers, prices and listing status."],
      ["This workspace uses the existing signed Admin session. Store Manager role separation can be added later without changing the product model.","Sign in to manage products and listings."],
      ["Catalog is the commerce product master. The Elevation website consumes published catalog records where integrated; channel/source state is monitored separately in Channels & Sync.","Review products, prices, categories, supplier availability and listing status."],
      ["One product catalog, one writer per field, and explicit source/channel health. “Mapped” never means “API healthy.”","Check supplier updates, store listings and channel connections."],
      ["Current configuration is reported from server-side capability checks without exposing credentials.","See which sources and sales channels are ready or need attention."],
      ["The historical Seller Hub catalog is discovery/reference only. Exact matches are reconciled; unmatched records remain review candidates until source SKU, cost, stock, margin and fulfillment are current.","Review older listings that still need a current product match or fulfillment check."],
      ["Catalog is the product master. Readiness combines product identity, supplier cost/stock, shipping path, margin guard, HOLD state and external mapping without creating a second product database.","See which products are live, ready, or waiting on a specific fix."]
    ]);
    $$("p,small,span,div").forEach(el => {
      if (el.children.length) return;
      const v=text(el.textContent);
      if (exact.has(v)) el.textContent=exact.get(v);
    });
    $$("p.admin-muted").forEach(el => { if (!text(el.textContent)) el.hidden=true; });
    const oneWriter = $$(".eus-callout").find(el => /one-writer rule/i.test(text(el.textContent)));
    if (oneWriter) oneWriter.remove();
  }

  let catalog = [];
  let groups = new Map();
  let byId = new Map(), bySku=new Map(), bySupplierId=new Map();

  async function loadCatalog() {
    const data = await api("/api/admin/catalog");
    catalog = Array.isArray(data.products) ? data.products : [];
    groups = buildGroups(catalog);
    byId = new Map(catalog.map(p=>[text(p.id),p]));
    bySku = new Map(catalog.map(p=>[text(p.sku).toLowerCase(),p]));
    bySupplierId = new Map(catalog.filter(p=>p.supplierProductId).map(p=>[text(p.supplierProductId).toLowerCase(),p]));
    return data;
  }

  function merchMetrics(products=catalog) {
    const states = products.map(p=>listingState(p,groups.get(p.id||p.sku)||{}));
    const familyKeys = new Set([...groups.values()].filter(g=>g.size>1 && g.classification==="VARIANT FAMILY").map(g=>g.key));
    const reviewKeys = new Set([...groups.values()].filter(g=>/REVIEW/.test(g.classification)).map(g=>g.key));
    const distinctKeys = new Set(products.map(p=>(groups.get(p.id||p.sku)||{}).key).filter(Boolean));
    return {
      total: products.length,
      distinct: distinctKeys.size,
      variantFamilies: familyKeys.size,
      reviewGroups: reviewKeys.size,
      live: states.filter(x=>x==="LIVE").length,
      ready: states.filter(x=>x==="READY").length,
      draft: states.filter(x=>x==="DRAFT").length,
      hold: states.filter(x=>x==="HOLD").length,
      out: states.filter(x=>x==="OUT OF STOCK").length,
      error: states.filter(x=>x==="SYNC ERROR").length,
      missingThumbs: products.filter(p=>!text(p.primaryImage)).length
    };
  }

  function setupBrokenImageFallback(root=document) {
    root.addEventListener("error", e => {
      const img=e.target;
      if (!(img instanceof HTMLImageElement) || !img.matches("[data-merch-img]")) return;
      img.removeAttribute("data-merch-img");
      img.src="/assets/logo.webp";
      img.closest(".eus-merch-thumb")?.classList.add("is-fallback");
    }, true);
  }

  function decorateExistingRows() {
    const candidates = [
      ["#catalog-table-body","data-product-id"],
      ["#inventory-table-body","data-item-id"],
      ["#channels-table",null],
      ["#orders-table-body","data-order-id"],
      ["#shipping-products-body",null],
      ["#shipping-reservations-body",null]
    ];
    candidates.forEach(([sel,attr]) => {
      const root=$(sel); if (!root) return;
      const decorate=()=>$$('tr',root).forEach(row=>{
        if (row.dataset.merchDecorated) return;
        let p=null;
        if (attr && row.dataset.productId) p=byId.get(row.dataset.productId);
        if (!p) {
          const code=text($("code",row)?.textContent).toLowerCase();
          p=bySku.get(code)||bySupplierId.get(code);
        }
        if (!p) {
          const rowText=text(row.textContent).toLowerCase();
          p=catalog.find(x=>rowText.includes(text(x.sku).toLowerCase()))||null;
        }
        if (!p || !row.cells?.length) return;
        row.dataset.merchDecorated="1";
        const first=row.cells[0];
        if (!$(".eus-merch-thumb",first)) first.insertAdjacentHTML("afterbegin",image(p.primaryImage,cleanDisplayTitle(p.title),52));
        first.classList.add("eus-merch-product-cell");
        const strong=$("strong",first); if (strong) { strong.title=`Raw/source title: ${text(p.title)}`; strong.textContent=cleanDisplayTitle(p.title); }
        const small=$("small",first); if (small && /uncategorized|rv|solar|battery|tool|camp|travel|outdoor/i.test(text(small.textContent))) small.textContent=normalizedCategory(p);
      });
      new MutationObserver(decorate).observe(root,{childList:true,subtree:true});
      decorate();
    });
  }

  function pagedTable({mount, products, title, subtitle, extraFilters=true}) {
    if (!mount) return;
    const state={q:"",status:"all",category:"all",supplier:"all",page:1,pageSize:30};
    const cats=[...new Set(products.map(normalizedCategory))].sort();
    const suppliers=[...new Set(products.map(p=>text(p.supplier||p.sourceType)).filter(Boolean))].sort();
    mount.innerHTML=`<div class="eus-merch-head"><div><p class="eyebrow">Owner View</p><h2>${esc(title)}</h2><p class="admin-muted">${esc(subtitle)}</p></div></div>
      <div class="eus-merch-tools"><label>Search<input type="search" data-q placeholder="Product, SKU, supplier"></label>
      <label>Listing<select data-status><option value="all">All listing states</option>${["LIVE","READY","DRAFT","HOLD","OUT OF STOCK","SYNC ERROR"].map(x=>`<option>${x}</option>`).join("")}</select></label>
      ${extraFilters?`<label>Category<select data-category><option value="all">All categories</option>${cats.map(x=>`<option>${esc(x)}</option>`).join("")}</select></label>
      <label>Supplier<select data-supplier><option value="all">All suppliers</option>${suppliers.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join("")}</select></label>`:""}
      </div><div class="eus-merch-table-wrap"><table class="eus-merch-table"><thead><tr>
      <th>Product</th><th>Supplier</th><th>Cost</th><th>Retail</th><th>Gross $</th><th>Gross Margin</th><th>Supplier Stock</th><th>Last Checked</th><th>Listing</th><th>Blocker</th><th>Actions</th>
      </tr></thead><tbody data-body></tbody></table></div><div class="eus-merch-pager"><span data-summary></span><div><button type="button" data-prev>Previous</button><button type="button" data-next>Next</button></div></div>`;
    const body=$("[data-body]",mount), summary=$("[data-summary]",mount);
    const render=()=>{
      let list=products.filter(p=>{
        const g=groups.get(p.id||p.sku)||{}, ls=listingState(p,g);
        if(state.status!=="all"&&ls!==state.status)return false;
        if(state.category!=="all"&&normalizedCategory(p)!==state.category)return false;
        if(state.supplier!=="all"&&text(p.supplier||p.sourceType)!==state.supplier)return false;
        if(!state.q)return true;
        return `${cleanDisplayTitle(p.title)} ${p.title} ${p.sku} ${p.supplierSku} ${p.supplierProductId} ${p.supplier}`.toLowerCase().includes(state.q);
      });
      const pages=Math.max(1,Math.ceil(list.length/state.pageSize)); state.page=Math.min(state.page,pages);
      const shown=list.slice((state.page-1)*state.pageSize,state.page*state.pageSize);
      body.innerHTML=shown.length?shown.map(p=>{
        const g=groups.get(p.id||p.sku)||{}, ls=listingState(p,g), gr=gross(p), stock=p.supplierStock===null||p.supplierStock===undefined?"Not confirmed":Number(p.supplierStock).toLocaleString();
        return `<tr><td class="eus-merch-product-cell">${image(p.primaryImage,p.title)}<div><a href="/admin-catalog?focus=${encodeURIComponent(p.id||"")}"><strong>${esc(cleanDisplayTitle(p.title))}</strong></a><code>${esc(p.sku)}</code><small>${esc(normalizedCategory(p))} · ${esc(g.classification||"DISTINCT PRODUCT")}</small></div></td>
          <td>${esc(p.supplier||p.sourceType||"—")}</td><td>${money(p.supplierCostCents)}</td><td>${money(p.priceCents)}</td>
          <td>${gr.dollars===null?"—":money(gr.dollars)}</td><td>${percent(gr.margin)}<small class="eus-merch-net-note">Net Contribution Incomplete</small></td>
          <td>${esc(stock)}</td><td>${esc(p.updatedAt?new Date(p.updatedAt).toLocaleString([], {month:"short",day:"numeric",hour:"numeric",minute:"2-digit"}):"—")}</td>
          <td>${pill(ls)}</td><td>${esc(blocker(p,ls,g))}</td><td><a class="button button-outline" href="/admin-catalog?focus=${encodeURIComponent(p.id||"")}">Open</a></td></tr>`;
      }).join(""):`<tr><td colspan="11" class="admin-empty-cell">No products match these filters.</td></tr>`;
      summary.textContent=`${list.length} products · page ${state.page} of ${pages}`;
      $("[data-prev]",mount).disabled=state.page<=1; $("[data-next]",mount).disabled=state.page>=pages;
    };
    const debounced=debounce(e=>{state.q=e.target.value.trim().toLowerCase();state.page=1;render();});
    $("[data-q]",mount).addEventListener("input",debounced);
    $("[data-status]",mount).addEventListener("change",e=>{state.status=e.target.value;state.page=1;render();});
    $("[data-category]",mount)?.addEventListener("change",e=>{state.category=e.target.value;state.page=1;render();});
    $("[data-supplier]",mount)?.addEventListener("change",e=>{state.supplier=e.target.value;state.page=1;render();});
    $("[data-prev]",mount).addEventListener("click",()=>{state.page=Math.max(1,state.page-1);render();});
    $("[data-next]",mount).addEventListener("click",()=>{state.page+=1;render();});
    render();
  }

  function addCatalogOwnerView() {
    const dash=$("#catalog-dashboard"); if(!dash||$("#eus-catalog-owner-view"))return;
    const m=merchMetrics();
    const section=document.createElement("section"); section.id="eus-catalog-owner-view"; section.className="catalog-panel eus-merch-section";
    section.innerHTML=`<div class="eus-merch-metrics">
      <article><span>Distinct Products</span><strong>${m.distinct}</strong></article><article><span>Variant Families</span><strong>${m.variantFamilies}</strong></article>
      <article><span>Duplicate / Review Groups</span><strong>${m.reviewGroups}</strong></article><article><span>LIVE</span><strong>${m.live}</strong></article>
      <article><span>READY</span><strong>${m.ready}</strong></article><article><span>Missing Thumbnails</span><strong>${m.missingThumbs}</strong></article></div>
      <div data-table></div>`;
    const anchor=$(".catalog-summary",dash); anchor?.after(section);
    pagedTable({mount:$("[data-table]",section),products:catalog,title:"Merchandising & Listing Control",subtitle:"Clean product view with listing state, supplier availability and basic gross margin. Exact supplier records remain unchanged."});
    const focus=new URLSearchParams(location.search).get("focus");
    if(focus) setTimeout(()=>{const row=$(`#catalog-table-body tr[data-product-id="${CSS.escape(focus)}"]`); row?.scrollIntoView({behavior:"smooth",block:"center"}); row?.classList.add("eus-focus-row");},500);
  }

  async function addInventoryOwnerView() {
    const dash=$("#inventory-dashboard"); if(!dash||$("#eus-inventory-owner-view"))return;
    const snap=await api("/api/admin/inventory");
    const items=Array.isArray(snap.items)?snap.items:[];
    const supplierItems=items.filter(i=>i.fulfillmentMode!=="tracked");
    const mapped=supplierItems.map(i=>byId.get(text(i.id))||bySku.get(text(i.sku).toLowerCase())||bySupplierId.get(text(i.supplierProductId).toLowerCase())).filter(Boolean);
    const stockVals=mapped.map(p=>p.supplierStock===null||p.supplierStock===undefined?null:Number(p.supplierStock));
    const metrics={
      products:supplierItems.length,
      available:stockVals.filter(v=>v!==null&&v>10).length,
      low:stockVals.filter(v=>v!==null&&v>0&&v<=10).length,
      out:stockVals.filter(v=>v===0).length,
      review:mapped.filter(p=>!["LIVE","READY"].includes(listingState(p,groups.get(p.id||p.sku)||{}))).length + Math.max(0,supplierItems.length-mapped.length),
      physical:items.filter(i=>i.fulfillmentMode==="tracked"&&i.status==="active").reduce((sum,i)=>sum+Number(i.quantityOnHand||0),0)
    };
    const section=document.createElement("section");section.id="eus-inventory-owner-view";section.className="admin-workspace eus-merch-section";
    section.innerHTML=`<div class="eus-merch-metrics">
      <article><span>Supplier Products</span><strong>${metrics.products}</strong></article><article><span>Supplier Available</span><strong>${metrics.available}</strong></article>
      <article><span>Supplier Low Stock</span><strong>${metrics.low}</strong></article><article><span>Supplier Out of Stock</span><strong>${metrics.out}</strong></article>
      <article><span>Needs Review</span><strong>${metrics.review}</strong></article><article><span>Physical On Hand</span><strong>${metrics.physical}</strong></article></div>
      <div data-table></div><div class="eus-merch-footnote">Supplier-managed products do not count as physical on-hand inventory.</div>`;
    const legacy=$(".inventory-workspace",dash); legacy?.before(section);
    pagedTable({mount:$("[data-table]",section),products:mapped,title:"Supplier Availability & Listings",subtitle:"Supplier stock, cost, retail pricing and listing blockers in one view."});
    if(legacy){
      legacy.classList.add("eus-merch-advanced");
      const toggle=document.createElement("button");toggle.type="button";toggle.className="button button-outline eus-merch-toggle";toggle.textContent="Show Tracked Stock & Advanced Inventory";
      legacy.before(toggle); legacy.hidden=true; toggle.addEventListener("click",()=>{legacy.hidden=!legacy.hidden;toggle.textContent=legacy.hidden?"Show Tracked Stock & Advanced Inventory":"Hide Advanced Inventory";});
    }
    $(".inventory-summary",dash)?.classList.add("eus-merch-legacy-summary");
  }

  function addMerchSummaryToChannels() {
    if($("#eus-channel-merch-summary"))return;
    const dash=$("#channels-dashboard"); if(!dash)return;
    const m=merchMetrics();
    const section=document.createElement("section");section.id="eus-channel-merch-summary";section.className="eus-section";
    section.innerHTML=`<div class="eus-section__head"><div><span class="eus-admin-kicker">Product Readiness</span><h2>What needs attention</h2><p>Supplier refresh and channel state stay separate from publication approval.</p></div></div>
      <div class="eus-merch-metrics"><article><span>LIVE</span><strong>${m.live}</strong></article><article><span>READY</span><strong>${m.ready}</strong></article><article><span>DRAFT</span><strong>${m.draft}</strong></article><article><span>HOLD</span><strong>${m.hold}</strong></article><article><span>OUT OF STOCK</span><strong>${m.out}</strong></article><article><span>SYNC ERROR</span><strong>${m.error}</strong></article></div>`;
    const first=$(".eus-section",dash); first?.after(section);
  }

  function addShippingThumbnails() {
    const dash=$("#shipping-dashboard, #lithium-dashboard, body");
    if(!dash)return;
    const decorate=()=>$$("table tbody tr",dash).forEach(row=>{
      if(row.dataset.shippingMerch)return;
      const rowText=text(row.textContent).toLowerCase();
      const p=catalog.find(x=>text(x.sku)&&rowText.includes(text(x.sku).toLowerCase()));
      if(!p||!row.cells?.length)return;
      row.dataset.shippingMerch="1";
      row.cells[0].insertAdjacentHTML("afterbegin",image(p.primaryImage,p.title,48));
      row.cells[0].classList.add("eus-merch-product-cell");
    });
    new MutationObserver(decorate).observe(dash,{childList:true,subtree:true});decorate();
  }

  async function init() {
    setupBrokenImageFallback();
    rewriteHumanVoice();
    try { await loadCatalog(); }
    catch(e){ if(e.status!==401) console.warn("Admin merchandising data unavailable",e); return; }
    rewriteHumanVoice();
    decorateExistingRows();
    if(path==="/admin-catalog") addCatalogOwnerView();
    if(path==="/admin-inventory") await addInventoryOwnerView();
    if(path==="/admin-channels") addMerchSummaryToChannels();
    if(path==="/admin-lithium-shipping") addShippingThumbnails();
    rewriteHumanVoice();
    const root=$("#catalog-table-body, #inventory-table-body, #channels-table, #orders-table-body, #shipping-dashboard");
    if(root)new MutationObserver(debounce(()=>{decorateExistingRows();rewriteHumanVoice();},120)).observe(root,{childList:true,subtree:true});
  }

  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",()=>setTimeout(init,40));
  else setTimeout(init,40);
})();