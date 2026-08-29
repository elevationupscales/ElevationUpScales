import fs from 'node:fs';
import { ensureSchema, createPreview, applyRun } from './runtime.mjs';

const token=process.env.CLOUDFLARE_API_TOKEN;
const account=process.env.CLOUDFLARE_ACCOUNT_ID;
if(!token||!account) throw new Error('Cloudflare credentials missing');
const csvText=fs.readFileSync('/tmp/kingboss/source.csv','utf8');
const fingerprint='4c1c424c314ccf384f0db854617bb5a97b3481bda869597c43bbc7853c3e3f66';
const adminEmail='deployment-manager@elevationupscales.com';
const base='https://api.cloudflare.com/client/v4';

async function cf(path,options={}){
  const response=await fetch(base+path,{...options,headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json',...(options.headers||{})}});
  const body=await response.json().catch(()=>({}));
  if(!response.ok||body.success===false) throw new Error(`Cloudflare API ${response.status}: ${JSON.stringify(body.errors||body)}`);
  return body;
}
async function query(databaseId,sql,params=[]){
  const payload=await cf(`/accounts/${account}/d1/database/${databaseId}/query`,{method:'POST',body:JSON.stringify({sql,params})});
  const entry=Array.isArray(payload.result)?payload.result[0]:payload.result;
  if(!entry||entry.success===false) throw new Error(`D1 query failed: ${JSON.stringify(entry||payload)}`);
  return {results:Array.isArray(entry.results)?entry.results:[],meta:entry.meta||{}};
}
class Statement{
  constructor(db,sql,params=[]){this.db=db;this.sql=sql;this.params=params;}
  bind(...params){return new Statement(this.db,this.sql,params);}
  async all(){return this.db.query(this.sql,this.params);}
  async first(column){const r=await this.db.query(this.sql,this.params);const row=r.results[0]??null;return column&&row?row[column]??null:row;}
  async run(){const r=await this.db.query(this.sql,this.params);return {success:true,meta:r.meta,results:r.results};}
}
class RestD1{constructor(id){this.id=id;} prepare(sql){return new Statement(this,sql);} query(sql,params=[]){return query(this.id,sql,params);}}

const dbList=await cf(`/accounts/${account}/d1/database?per_page=100`);
let chosen=null;
for(const candidate of (dbList.result||[])){
  const id=candidate.uuid||candidate.id;
  if(!id) continue;
  try{const p=await query(id,"SELECT name FROM sqlite_master WHERE type='table' AND name='eus_inventory_items' LIMIT 1");if(p.results.length){chosen={id,name:candidate.name||id};break;}}catch{}
}
if(!chosen) throw new Error('Production Catalog D1 not found');
const db=new RestD1(chosen.id);
await ensureSchema({MARKETPLACE_DB:db});

const before=(await db.query("SELECT COUNT(*) AS n FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id WHERE lower(i.supplier)='kingboss' OR lower(i.name) LIKE '%kingboss%'" )).results[0]?.n||0;
const previewResponse=await createPreview(db,{fileName:'US_Dropshipping_Product_Data_with_25%_Markup_20260829_5188361.csv',csvText,scope:'partial',profileId:'doba-download-center-25',markupPercent:25},adminEmail);
const detail=previewResponse?.alreadyApplied?previewResponse.run:previewResponse;
const run=detail?.run;
if(!run) throw new Error('Kingboss preview receipt missing');
if(run.fileFingerprint!==fingerprint) throw new Error(`Fingerprint mismatch ${run.fileFingerprint}`);
if(Number(run.rowCount)!==43) throw new Error(`Expected 43 Kingboss rows, got ${run.rowCount}`);
let applied=detail;
if(!previewResponse?.alreadyApplied) applied=await applyRun(db,run.id,adminEmail);
if(!String(applied?.run?.status||'').startsWith('APPLIED')) throw new Error(`Apply failed: ${applied?.run?.status}`);
if(Number(applied?.run?.receipt?.errors||0)!==0) throw new Error(`Kingboss apply returned ${applied.run.receipt.errors} errors`);

const rows=(await db.query("SELECT r.catalog_product_id,r.item_no,r.supplier_sku,r.inventory_qty,r.shipping_method,r.ship_to,r.estimated_shipping_cents,r.source_json FROM eus_doba_csv_rows r WHERE r.run_id=? ORDER BY r.row_index",[run.id])).results;
if(rows.length!==43) throw new Error(`Expected 43 applied rows, got ${rows.length}`);
let integrated=0,zeroStock=0;
for(const row of rows){
  if(!row.catalog_product_id) throw new Error(`Missing Catalog link for ${row.item_no}`);
  const source=JSON.parse(row.source_json||'{}');
  const stock=Number(row.inventory_qty||0);
  const isZero=stock<=0;
  if(isZero) zeroStock++;
  const reason=isZero
    ? 'KINGBOSS: SUPPLIER OUT OF STOCK — LITHIUM / POWER PRODUCT REQUIRES RECHECK BEFORE PUBLICATION.'
    : 'KINGBOSS: LITHIUM / POWER PRODUCT INTEGRATED — SHIPPING, DOCUMENTATION, PRICE AND DESTINATION QUALIFICATION REQUIRED BEFORE PUBLICATION.';
  await db.query("UPDATE eus_inventory_items SET supplier='kingboss',fulfillment_mode='dropship',category='LiFePO4 Batteries & Portable Power',status='paused',sales_channels_json='[]',updated_at=?,updated_by=? WHERE id=?",[new Date().toISOString(),adminEmail,row.catalog_product_id]);
  await db.query("UPDATE eus_catalog_meta SET source_type='doba',supplier_sku=?,supplier_stock=?,shipping_status=?,shipping_cents=?,store_section='lithium-batteries',publish_status='hold',review_state=?,updated_at=?,updated_by=? WHERE inventory_item_id=?",[row.supplier_sku,stock,isZero?'hold':'unverified',Number.isFinite(Number(row.estimated_shipping_cents))?Number(row.estimated_shipping_cents):null,reason,new Date().toISOString(),adminEmail,row.catalog_product_id]);
  integrated++;
}
const after=(await db.query("SELECT COUNT(*) AS n FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id WHERE lower(i.supplier)='kingboss' AND m.store_section='lithium-batteries'" )).results[0]?.n||0;
const publicLeak=(await db.query("SELECT COUNT(*) AS n FROM eus_inventory_items i JOIN eus_catalog_meta m ON m.inventory_item_id=i.id WHERE lower(i.supplier)='kingboss' AND m.publish_status='published'" )).results[0]?.n||0;
if(Number(publicLeak)!==0) throw new Error(`Kingboss public safety gate failed: ${publicLeak} unexpectedly published`);
const receipt={disposition:'PASS',database:chosen.name,fingerprint,runId:run.id,rowCount:43,itemMatches:run.itemMatchCount,newCount:run.newCount,integrated,before:Number(before),after:Number(after),zeroStock,publicPublished:Number(publicLeak),policy:'All Kingboss lithium/power products integrated to Catalog/Lithium and held for shipping/document/price qualification before public sale.'};
fs.writeFileSync('/tmp/kingboss/receipt.json',JSON.stringify(receipt,null,2));
console.log(JSON.stringify(receipt,null,2));
