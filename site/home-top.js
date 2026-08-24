(() => {
  "use strict";

  const topLinks = [...document.querySelectorAll('a[href="#top"]')];
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');

  topLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion?.matches ? 'auto' : 'smooth'
      });
      if (window.location.hash === '#top') {
        history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      }
    });
  });

  const trackStorePath = (destination, source) => {
    window.EUSIntent?.track?.('store_destination_click', destination, {
      source,
      source_page: '/',
      destination
    });
  };

  // Start a Project stays primary; Shop Elevation is a promoted secondary lane.
  const heroActions = document.querySelector('.hero-actions');
  if (heroActions && !heroActions.querySelector('[data-home-shop-cta]')) {
    const shop = document.createElement('a');
    shop.className = 'button button-outline';
    shop.href = '/store';
    shop.dataset.homeShopCta = 'true';
    shop.textContent = 'New: Shop Elevation';
    shop.setAttribute('aria-label', 'Shop Elevation apparel and RV outdoor gear');
    shop.addEventListener('click', () => trackStorePath('apparel-store', 'home-hero'));
    heroActions.append(shop);
  }

  document.querySelectorAll('.hero-utility-links').forEach((group) => {
    const apparel = group.querySelector('a[href="/store"]');
    if (apparel) {
      apparel.textContent = 'Apparel Store';
      apparel.addEventListener('click', () => trackStorePath('apparel-store', 'home-utility'));
    }
    if (!group.querySelector('a[href="/rv-store"]')) {
      const rv = document.createElement('a');
      rv.href = '/rv-store';
      rv.textContent = 'RV & Outdoor Store';
      rv.setAttribute('aria-label', 'Visit the Elevation UpScales RV and Outdoor Store');
      rv.addEventListener('click', () => trackStorePath('rv-outdoor-store', 'home-utility'));
      apparel?.insertAdjacentElement('afterend', rv);
    }
  });

  // Dedicated storefront showcase directly below the homepage hero.
  const hero = document.querySelector('.hero');
  if (hero && !document.querySelector('[data-home-store-showcase]')) {
    const section = document.createElement('section');
    section.className = 'section';
    section.dataset.homeStoreShowcase = 'true';
    section.setAttribute('aria-labelledby', 'home-store-showcase-title');
    section.innerHTML = `
      <div class="container" style="padding-top:clamp(1.2rem,3vw,2rem);padding-bottom:clamp(1.2rem,3vw,2rem)">
        <div style="display:grid;grid-template-columns:minmax(0,1.4fr) minmax(260px,.8fr);gap:1rem;align-items:center;padding:clamp(1rem,2.5vw,1.5rem);border:1px solid rgba(255,200,61,.42);border-radius:10px;background:linear-gradient(135deg,rgba(255,200,61,.10),rgba(255,255,255,.02));box-shadow:0 14px 34px rgba(0,0,0,.28)">
          <div>
            <p class="eyebrow" style="margin-bottom:.35rem">NEW FROM ELEVATION UPSCALES</p>
            <h2 id="home-store-showcase-title" style="margin:.1rem 0 .55rem">Shop Elevation</h2>
            <p style="margin:0;color:#c9c4b9">Apparel, hats, branded releases, RV parts, camping gear, travel accessories, and off-grid essentials now have dedicated storefronts.</p>
          </div>
          <div style="display:grid;gap:.65rem">
            <a class="button button-gold" href="/store" data-home-store-apparel>Shop Apparel</a>
            <a class="button button-outline" href="/rv-store" data-home-store-rv>Shop RV & Outdoor</a>
          </div>
        </div>
      </div>`;
    hero.insertAdjacentElement('afterend', section);
    section.querySelector('[data-home-store-apparel]')?.addEventListener('click', () => trackStorePath('apparel-store', 'home-showcase'));
    section.querySelector('[data-home-store-rv]')?.addEventListener('click', () => trackStorePath('rv-outdoor-store', 'home-showcase'));
  }
})();
