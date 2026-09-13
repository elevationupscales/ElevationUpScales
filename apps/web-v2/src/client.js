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

  const hero48Image = document.querySelector('.reference-storefront-home .hero-product-48 img');
  if (hero48Image) hero48Image.src = 'https://elevationupscales.com/assets/brands/sok/48v-battery-cabinet/hero.webp?v=20260910-1';

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
`;
