import coreWorker from "./worker-core.js";
import { handleStoreCheckoutApi } from "./store-checkout-server.js";
import { handleStoreOrdersAdminApi } from "./store-orders-admin-server.js";
import { handleCatalogAdminApi, handleCatalogPublicApi } from "./catalog-admin-runtime.js";
import { handleHawaiiLithiumAdminApi, handleHawaiiLithiumPublicApi } from "./hawaii-lithium-runtime.js";
import { handleSyncAdminApi, handleSyncScheduledApi } from "./sync-admin-runtime.js";
import { handleDobaCsvSyncAdminApi } from "./doba-csv-sync-runtime.js";
import { handleApparelProviderAdminApi } from "./apparel-provider-runtime.js";

const KINGBOSS_CATALOG_IDS = new Set([
  "cat-5ad42092-f1f9-4777-ad3c-54ece4f89d74","cat-0e47924f-dbbb-4a17-8ed0-b1f337aeb87c","cat-efc4e7d9-aa7e-4319-9b9d-a20c1a1521cd","cat-d051e21d-5101-45db-98db-9d048f797613","cat-87fc0fec-edc2-464c-99c3-6e0edc9067d3","cat-4549fb51-f0f4-448e-86d2-19e9e6675ad8","cat-ced9cfa3-0343-4f26-90d5-d8054af3c446","cat-e91de8a6-3e69-45b3-b749-605befbdb268","cat-8c48e9e1-69f0-47a7-8a8f-85787637613e","cat-14a69c9b-5bfd-4474-b88b-b87c63ac3638","cat-d134ecdf-403c-4027-8212-0c5fbad26c1f","cat-f2d15722-2248-4155-acce-5e6354cc2641","cat-ea02ed7c-1be4-49b9-b7c5-956e2b2be272","cat-7aa76941-d68e-4a5a-a637-62200fec3b2d","cat-87407e02-20e3-4cd3-a1e9-8538add18a37","cat-a049195e-a035-4b75-a5ca-8b342273f952","cat-b7fe4f9e-b922-42af-9d2d-4921ac8600f1","cat-f6c09a59-b485-47b3-b3e4-9863d007622f","cat-09479302-7993-4e32-a22c-918833298e4a","cat-24d978f3-8853-4582-bcac-4ae0bbdf8ab4","cat-d133f01f-229f-4d3e-93e1-ad826bbf7537","cat-0bc1b4e8-a0ef-4327-a74f-ea815dbd89dc","cat-c124cb4f-b336-48e9-a252-00f420a7087d","cat-3c50a359-e302-404d-9aee-75ad2b6e0cdd","cat-f65d742c-0502-4f3a-b8be-98c014723871","cat-5f1f5ac7-7482-480a-9383-df90d8a64c11","cat-2f78da39-1d71-4c8b-80ab-9d747820551a","cat-aa4ebfeb-ec3b-4d27-b629-64fb0f9ec56b","cat-916e5182-89b2-4e89-af07-01a95d81a6c7","cat-0c0b0387-62de-42e8-bf94-dbbc15f49d0c","cat-c81224a6-566d-4b56-838c-3047062d8b01","cat-91ee487c-ce5b-4fd8-9ca7-4fb00528f113","cat-1b9fa5a8-810f-49ff-b75f-ced91037e641","cat-926afe97-9468-48bf-9af7-850518b752c6","cat-be6f2f23-1727-43b6-86ba-ffafe03c2484","cat-edb05fb0-92b7-448b-bd90-817a8ddc03a2","cat-3eb7c11f-9b4c-4952-8a21-de0e0d34754c","cat-336cf814-be3f-49fd-b574-0d0a39ac7312","cat-5104ec49-cf2f-4d6c-beb4-52a0b6f0186c","cat-ba15b95a-ab9c-49ba-be75-fc1b325f451e","cat-66afeb4e-432a-4a25-8fb8-2edb10cb1c22","cat-6fc1f5b7-41c3-44d9-a378-1075bd9f2eab","cat-01e78438-5fb8-4e0d-aaab-ffbe86f5cf77"
]);

const CHECKOUT_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.paypal.com https://www.paypalobjects.com https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "connect-src 'self' https://www.paypal.com https://*.paypal.com https://cloudflareinsights.com",
  "frame-src https://www.paypal.com https://*.paypal.com",
  "object-src 'none'","base-uri 'self'","frame-ancestors 'self'",
  "form-action 'self' https://www.paypal.com https://*.paypal.com","upgrade-insecure-requests",
].join("; ");

function checkoutResponse(response) {
  if (!response) return response;
  const headers = new Headers(response.headers);
  headers.set("Content-Security-Policy", CHECKOUT_CSP);
  headers.set("Cache-Control", "no-store");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}
function checkoutJson(data, status) { return Response.json(data, { status, headers: { "Cache-Control":"no-store","X-Content-Type-Options":"nosniff","X-Frame-Options":"DENY","Referrer-Policy":"no-referrer" } }); }
function clean(value,max=500){ return String(value??"").trim().slice(0,max); }
function sameOriginPost(request){ if(request.method!=="POST") return true; const origin=clean(request.headers.get("Origin"),500); if(!origin) return false; try{return origin===new URL(request.url).origin;}catch(_){return false;} }
async function kingbossDestinationBlocked(request){
  if(request.method!=="POST") return false;
  try{
    const body=await request.clone().json();
    const id=clean(body?.id,120); const source=clean(body?.source,20).toLowerCase(); const state=clean(body?.shipping?.state,2).toUpperCase();
    return source==="rv" && KINGBOSS_CATALOG_IDS.has(id) && (state==="AK" || state==="HI");
  }catch(_){ return false; }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (["/worker-core.js","/store-checkout-server.js","/store-orders-admin-server.js","/catalog-admin-server.js","/catalog-admin-runtime.js","/hawaii-lithium-runtime.js","/sync-admin-runtime.js","/doba-csv-sync-runtime.js","/apparel-provider-runtime.js","/commerce-schema-migrations.js"].includes(url.pathname)) return new Response("Not found",{status:404,headers:{"Cache-Control":"no-store","X-Content-Type-Options":"nosniff"}});
    const isQuote=url.pathname==="/api/store-checkout/quote"; const isCreate=url.pathname==="/api/store-checkout/orders"; const isCapture=/^\/api\/store-checkout\/orders\/[A-Z0-9]{8,40}\/capture$/i.test(url.pathname);
    if((isQuote||isCreate||isCapture)&&request.method==="POST"&&!sameOriginPost(request)) return checkoutJson({error:"Cross-origin request denied"},403);
    if((isQuote||isCreate) && await kingbossDestinationBlocked(request)) return checkoutJson({error:"Kingboss supplier fulfillment is available to the lower 48 only. Alaska and Hawaii require a separate shipping review."},409);
    if(url.pathname==="/api/store-checkout/config"||isQuote||isCreate||isCapture) return handleStoreCheckoutApi(request,env,url.pathname);
    if(url.pathname==="/api/admin/store-orders"||url.pathname.startsWith("/api/admin/store-orders/")) return handleStoreOrdersAdminApi(request,env,url.pathname);
    if(url.pathname==="/api/store-catalog"||url.pathname==="/api/store/catalog") return handleCatalogPublicApi(request,env,url.pathname);
    if(url.pathname.startsWith("/api/hawaii-lithium/")) return handleHawaiiLithiumPublicApi(request,env,url.pathname);
    if(url.pathname==="/api/admin/catalog"||url.pathname.startsWith("/api/admin/catalog/")) return handleCatalogAdminApi(request,env,url.pathname);
    if(url.pathname==="/api/admin/lithium-shipping"||url.pathname.startsWith("/api/admin/lithium-shipping/")) return handleHawaiiLithiumAdminApi(request,env,url.pathname);
    if(url.pathname==="/api/admin/sync"||url.pathname.startsWith("/api/admin/sync/")) return handleSyncAdminApi(request,env,url.pathname);
    if(url.pathname==="/api/admin/doba-csv-sync") return handleDobaCsvSyncAdminApi(request,env,url.pathname);
    if(url.pathname==="/api/admin/apparel-providers") return handleApparelProviderAdminApi(request,env,url.pathname);
    if(url.pathname==="/api/sync/run") return handleSyncScheduledApi(request,env,url.pathname);
    const response=await coreWorker.fetch(request,env,ctx);
    if(url.pathname==="/checkout"||url.pathname==="/checkout/") return checkoutResponse(response);
    return response;
  },
};
