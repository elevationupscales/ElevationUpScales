(() => {
  "use strict";

  const topLinks = [...document.querySelectorAll('a[href="#top"]')];
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');

  topLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      // The site header is sticky, so targeting the header itself can make
      // the browser think #top is already visible. Scroll the document instead.
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion?.matches ? 'auto' : 'smooth'
      });

      // Keep the homepage URL clean after a same-page "Home" action.
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

  // Keep Start a Project as the primary homepage CTA while giving the new
  // split storefront a prominent, customer-visible entry point.
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

  // Turn the old single store shortcut into clear routes for both storefronts.
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
})();
