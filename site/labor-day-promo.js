(() => {
  'use strict';
  const hide = () => {
    const slot = document.querySelector('[data-home-promo-slot],[data-promo-slot],.eus-labor-day-banner-slot');
    if (slot) {
      slot.replaceChildren();
      slot.hidden = true;
      slot.setAttribute('aria-hidden','true');
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hide, {once:true});
  else hide();
})();
