(() => {
  "use strict";

  const topLinks = [...document.querySelectorAll('a[href="#top"]')];
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const track = (type, value, details = {}) => window.EUSIntent?.track?.(type, value, details);

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

  // Keep project intake primary while making both retail lanes unmistakable.
  const heroActions = document.querySelector('.hero-actions');
  let rvStoreButton = heroActions?.querySelector('a[data-online-rv-store]');
  if (heroActions && !rvStoreButton) {
    rvStoreButton = document.createElement('a');
    rvStoreButton.className = 'button button-outline';
    rvStoreButton.dataset.onlineRvStore = '';
    heroActions.appendChild(rvStoreButton);
  }
  if (rvStoreButton) {
    rvStoreButton.href = '/rv-store';
    rvStoreButton.textContent = 'Shop RV & Outdoor';
    rvStoreButton.addEventListener('click', () => {
      track('store_section_view', 'rv_shop', { source: 'homepage', cta: 'hero_rv_store' });
    });
  }

  const apparelLink = document.querySelector('.hero-utility-links a[href="/store"]');
  if (apparelLink) {
    apparelLink.textContent = 'Shop Apparel';
    apparelLink.addEventListener('click', () => {
      track('store_open', 'apparel', { source: 'homepage', cta: 'hero_apparel_link' });
    });
  }
})();
