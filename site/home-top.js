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

  // Keep the main project CTA intact while giving the RV retail store a
  // prominent, direct homepage entry point.
  const heroActions = document.querySelector('.hero-actions');
  if (heroActions && !heroActions.querySelector('a[data-online-rv-store]')) {
    const rvStoreButton = document.createElement('a');
    rvStoreButton.className = 'button button-outline';
    rvStoreButton.href = '/store';
    rvStoreButton.dataset.onlineRvStore = '';
    rvStoreButton.textContent = 'Online RV Store';
    heroActions.appendChild(rvStoreButton);
  }

  const storeUtilityLink = document.querySelector('.hero-utility-links a[href="/store"]');
  if (storeUtilityLink) {
    storeUtilityLink.textContent = 'Online RV Store';
  }
})();
