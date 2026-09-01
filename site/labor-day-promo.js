(() => {
  "use strict";
  const esc=(v)=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  async function load(){
    try{
      const response=await fetch("/api/store/promotion",{headers:{Accept:"application/json"},cache:"no-store"});
      const promo=await response.json().catch(()=>({}));
      const slot=document.querySelector("[data-home-promo-slot]");
      if(!response.ok||promo.active!==true){if(slot){slot.hidden=true;slot.setAttribute("aria-hidden","true");}return;}
      const banner=document.createElement("section");
      banner.className="eus-labor-day-banner";
      banner.setAttribute("aria-label","Labor Day promotion");
      banner.innerHTML=`<div class="container eus-labor-day-banner__inner"><div><strong>${esc(promo.headline||"Labor Day Sale — 25% Off")}</strong><span>Use <code>${esc(promo.couponCode||"LABORDAY25")}</code> on eligible Elevation merchandise.</span></div><p>${esc(promo.disclosure||"25% off eligible Elevation merchandise. Shipping and exclusions apply.")}</p></div>`;
      if(slot){slot.hidden=false;slot.removeAttribute("aria-hidden");slot.replaceChildren(banner);slot.dataset.promoReady="true";}else{const header=document.querySelector("header");if(header)header.insertAdjacentElement("afterend",banner);else document.body.prepend(banner);}
    }catch(_){}
  }
  load();
})();
