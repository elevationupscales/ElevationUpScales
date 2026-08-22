(() => {
  "use strict";

  const topLinks = [...document.querySelectorAll('a[href="#top"]')];
  if (!topLinks.length) return;

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
})();
