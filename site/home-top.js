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

  // Internal storefront navigation uses the approved Store section-view event.
  // This keeps homepage Shop interest distinct from external eBay/Fourthwall handoffs.
  const trackStorePath = (section, source) => {
    const destination = section === 'rv_shop' ? 'rv_outdoor_store' : 'apparel_store';
    window.EUSIntent?.track?.('store_section_view', section, {
      source,
      source_page: '/',
      destination,
      section
    });
  };

  const bindStoreLink = (link, section, source) => {
    if (!link || link.dataset.eusStoreTrackBound === 'true') return;
    link.dataset.eusStoreTrackBound = 'true';
    link.addEventListener('click', () => trackStorePath(section, source));
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
    heroActions.append(shop);
  }
  bindStoreLink(document.querySelector('[data-home-shop-cta]'), 'brand_catalog', 'home-hero-shop');

  document.querySelectorAll('.hero-utility-links').forEach((group) => {
    const apparel = group.querySelector('a[href="/store"]');
    if (apparel) apparel.textContent = 'Apparel Store';
    bindStoreLink(apparel, 'brand_catalog', 'home-utility');

    let rv = group.querySelector('a[href="/rv-store"]');
    if (!rv) {
      rv = document.createElement('a');
      rv.href = '/rv-store';
      rv.textContent = 'RV & Outdoor Store';
      rv.setAttribute('aria-label', 'Visit the Elevation UpScales RV and Outdoor Store');
      apparel?.insertAdjacentElement('afterend', rv);
    }
    bindStoreLink(rv, 'rv_shop', 'home-utility');
  });

  // Fallback for older homepage HTML. Current homepage should contain this section
  // directly in markup so it is visible even before JavaScript runs.
  const hero = document.querySelector('.hero');
  if (hero && !document.querySelector('[data-home-store-showcase]')) {
    const section = document.createElement('section');
    section.className = 'section home-storefront-showcase';
    section.dataset.homeStoreShowcase = 'true';
    section.setAttribute('aria-labelledby', 'home-store-showcase-title');
    section.innerHTML = `
      <div class="container">
        <div class="home-storefront-showcase__panel">
          <div class="home-storefront-showcase__copy">
            <p class="eyebrow">NEW FROM ELEVATION UPSCALES</p>
            <h2 id="home-store-showcase-title">Shop Elevation</h2>
            <p>Two dedicated storefronts: official Elevation apparel and releases, plus RV, camping, travel and off-grid gear.</p>
          </div>
          <div class="home-storefront-showcase__actions">
            <a class="button button-gold" href="/store" data-home-store-apparel>Shop Apparel</a>
            <a class="button button-outline" href="/rv-store" data-home-store-rv>Shop RV & Outdoor</a>
          </div>
        </div>
      </div>`;
    hero.insertAdjacentElement('afterend', section);
  }

  bindStoreLink(document.querySelector('[data-home-store-apparel]'), 'brand_catalog', 'home-showcase');
  bindStoreLink(document.querySelector('[data-home-store-rv]'), 'rv_shop', 'home-showcase');
})();
