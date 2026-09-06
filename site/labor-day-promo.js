(() => {
  "use strict";
  const esc=(v)=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  function ensureSlot(){
    const existing=document.querySelector("[data-home-promo-slot],[data-promo-slot]");
    if(existing)return existing;
    const slot=document.createElement("div");
    slot.className="eus-labor-day-banner-slot";
    slot.setAttribute("data-promo-slot","");
    slot.setAttribute("aria-live","polite");
    slot.setAttribute("aria-label","Promotion status");
    const header=document.querySelector("header");
    if(header)header.insertAdjacentElement("afterend",slot);else document.body.prepend(slot);
    return slot;
  }
  async function load(){
    const slot=ensureSlot();
    try{
      const response=await fetch("/api/store/promotion",{headers:{Accept:"application/json"},cache:"no-store"});
      const promo=await response.json().catch(()=>({}));
      if(!response.ok||promo.active!==true){if(slot){slot.hidden=true;slot.setAttribute("aria-hidden","true");}return;}
      const banner=document.createElement("section");
      banner.className="eus-labor-day-banner";
      banner.setAttribute("aria-label","Current promotion");
      banner.innerHTML=`<div class="container eus-labor-day-banner__inner"><span class="eus-promo-kicker">CURRENT OFFER</span><div><strong>${esc(promo.headline||"Current Elevation Offer")}</strong><span>Use <code>${esc(promo.couponCode||"")}</code> on eligible Elevation merchandise.</span></div><p>${esc(promo.disclosure||"Offer applies only to eligible Elevation merchandise. Shipping and exclusions apply.")}</p></div>`;
      slot.hidden=false;slot.removeAttribute("aria-hidden");slot.replaceChildren(banner);slot.dataset.promoReady="true";
    }catch(_){if(slot){slot.hidden=true;slot.setAttribute("aria-hidden","true");}}
  }
  load();
})();
