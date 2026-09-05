import fs from "node:fs";
import path from "node:path";

const must=(ok,msg)=>{if(!ok)throw new Error(msg)};
const read=p=>fs.readFileSync(p,"utf8");
const jsTree=(dir)=>fs.existsSync(dir)
  ? fs.readdirSync(dir,{recursive:true,withFileTypes:true})
      .filter(entry=>entry.isFile()&&entry.name.endsWith(".js"))
      .map(entry=>read(path.join(entry.parentPath,entry.name)))
      .join("\n")
  : "";

const home=read("site/index.html"),
  order=read("site/sok-order.html"),
  orderJs=read("site/sok-order.js"),
  runtime=read("site/sok-full-line-runtime.js"),
  shell=read("site/site-shell.js"),
  workerRuntime=read("site/worker-core.js")+"\n"+jsTree("site/worker"),
  data=read("site/sok-full-line-data.js"),
  map=read("deployment/qa/WEBSITE_ANALYTICS_EVENT_MAP.md"),
  sitemap=read("site/sitemap.xml");

must(home.includes("data-home-sok"),"homepage SOK section missing");
for(const sku of ["SK12V100PC","SK48V100N"])must(home.includes(sku),`homepage anchor missing ${sku}`);
must(home.includes("Authorized SOK Energy Dealer")||home.includes("AUTHORIZED SOK ENERGY DEALER"),"authorized dealer claim missing");
for(const old of ["sok-order-company","sok-order-site-type","sok-order-use","sok-order-demand"])must(!order.includes(old),`long-form field remains: ${old}`);
must(order.includes("email or phone required"),"one contact method copy missing");
must(runtime.includes("valid email or phone"),"server email-or-phone rule missing");
must(runtime.includes("renderGallery(product)"),"SOK gallery renderer missing");
must(data.includes("system-cabinet.png"),"SK48 approved system image missing");
for(const event of ["homepage_sok_open","sok_catalog_view","sok_product_view","sok_media_view","purchase_options_open","purchase_inquiry_start","purchase_inquiry_submit","hawaii_options_open","commercial_review_route","add_to_cart","checkout_start","solar_builder_sok_cta"]){
  must(workerRuntime.includes(`\"${event}\"`),`backend event allowlist missing ${event}`);
  must(map.includes(`\`${event}\``),`event map missing ${event}`);
}

// Verify the accepted central analytics dedupe contract semantically rather than by legacy variable name.
must(/const\s+recent\s*=\s*new\s+Map\s*\(\s*\)/.test(shell),"central analytics recent-event map missing");
must(shell.includes('`${eventType}|${value}|${location.pathname}`'),"analytics dedupe key must include event, value, and route");
must(/now\s*-\s*prior\s*<\s*900/.test(shell),"analytics dedupe 900ms window missing");
must(/recent\.set\(key,\s*now\)/.test(shell),"analytics dedupe timestamp update missing");

must(!orderJs.includes("company:"),"company field still submitted");
must(!orderJs.includes("intendedUse:"),"intended-use field still submitted");
must(!orderJs.includes("demandType:"),"demand-type field still submitted");
must(!sitemap.includes("/project-guides"),"stale 404 project-guides route remains in sitemap");
for(const bad of ["warehouse cost","supplier cost","landed cost","margin","drop-ship price"])must(!home.toLowerCase().includes(bad),`private term on homepage: ${bad}`);
console.log("Website integrity static gate: PASS");
