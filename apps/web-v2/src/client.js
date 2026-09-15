export const clientScript = `
(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#primary-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.dataset.open = String(!open);
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.dataset.open = 'false';
      }
    });
  }

  const productMedia = document.querySelectorAll('.home-product-card__image img');
  const markMediaState = (image) => {
    const frame = image.closest('.home-product-card__image');
    if (!frame) return;
    if (image.complete && image.naturalWidth > 0) {
      frame.dataset.mediaState = 'ready';
      return;
    }
    if (image.complete && image.naturalWidth === 0) frame.dataset.mediaState = 'unavailable';
  };

  productMedia.forEach((image) => {
    image.addEventListener('load', () => markMediaState(image), { once: true });
    image.addEventListener('error', () => {
      const frame = image.closest('.home-product-card__image');
      if (frame) frame.dataset.mediaState = 'unavailable';
    }, { once: true });
    markMediaState(image);
  });

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
`;