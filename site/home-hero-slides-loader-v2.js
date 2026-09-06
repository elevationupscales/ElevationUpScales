(() => {
  'use strict';
  const load = (src) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
  load('/home-hero-slides-base.js?v=1.0.0')
    .then(() => load('/storefront-reference-shell-v2.js?v=2.0.0'))
    .catch((error) => console.error('Storefront reference loader failed', error));
})();
