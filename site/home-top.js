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

    const marketplace = group.querySelector('a[href="/marketplace"]');
    if (marketplace && !marketplace.classList.contains('home-marketplace-live')) {
      marketplace.classList.add('home-marketplace-live');
      marketplace.setAttribute('aria-label', 'Marketplace is live — browse reviewed listings');
      marketplace.innerHTML = '<span class="home-marketplace-live__dot" aria-hidden="true"></span><span>Marketplace</span><small>LIVE</small>';
    }
  });

  document.querySelectorAll('.home-feature-footer a[href="/marketplace"]').forEach((link) => {
    link.classList.add('home-marketplace-featured-cta');
    link.textContent = 'Browse Marketplace';
    link.setAttribute('aria-label', 'Browse the live Elevation Marketplace');
  });

  if (!document.getElementById('home-marketplace-polish')) {
    const style = document.createElement('style');
    style.id = 'home-marketplace-polish';
    style.textContent = `
      .hero-utility-links .home-marketplace-live{
        display:inline-flex;align-items:center;gap:.48rem;min-height:38px;padding:.48rem .72rem;
        border:1px solid rgba(240,182,45,.7);border-radius:999px;
        background:linear-gradient(145deg,rgba(240,182,45,.14),rgba(255,255,255,.025));
        color:#fff;box-shadow:0 8px 22px rgba(0,0,0,.25),0 0 0 1px rgba(240,182,45,.06) inset;
        text-decoration:none;font-weight:850;letter-spacing:.015em;
      }
      .hero-utility-links .home-marketplace-live:hover,
      .hero-utility-links .home-marketplace-live:focus-visible{
        border-color:#f3cf67;background:linear-gradient(145deg,rgba(240,182,45,.22),rgba(255,255,255,.045));
        color:#fff;transform:translateY(-1px);box-shadow:0 10px 28px rgba(0,0,0,.34),0 0 0 2px rgba(240,182,45,.1);
      }
      .home-marketplace-live__dot{width:8px;height:8px;flex:0 0 8px;border-radius:50%;background:#f0b62d;box-shadow:0 0 0 4px rgba(240,182,45,.14),0 0 12px rgba(240,182,45,.48)}
      .home-marketplace-live small{padding:.18rem .38rem;border-radius:999px;background:#f0b62d;color:#090909;font-size:.58rem;font-weight:950;letter-spacing:.1em;line-height:1}
      .home-feature-footer .home-marketplace-featured-cta{
        border-color:rgba(240,182,45,.72);background:linear-gradient(145deg,rgba(240,182,45,.12),rgba(255,255,255,.02));
        color:#f5e1a3;box-shadow:0 8px 22px rgba(0,0,0,.2)
      }
      .home-feature-footer .home-marketplace-featured-cta:hover,
      .home-feature-footer .home-marketplace-featured-cta:focus-visible{border-color:#f3cf67;color:#fff;background:rgba(240,182,45,.16)}
      @media(max-width:620px){
        .hero-utility-links .home-marketplace-live{width:100%;justify-content:center;min-height:44px;padding:.58rem .8rem}
      }
      @media(prefers-reduced-motion:reduce){.hero-utility-links .home-marketplace-live{transition:none;transform:none!important}}
    `;
    document.head.append(style);
  }

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
