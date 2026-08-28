(() => {
  'use strict';

  const featuredRail = document.querySelector('[data-home-featured-rail]');
  if (!featuredRail) return;

  const STORE_ORIGIN = 'https://elevationupscales-shop.fourthwall.com';
  const categoryNames = {
    rv: 'RV / CAMPER', motorcycle: 'MOTORCYCLE', bicycle: 'BICYCLE / TRIKE',
    boat: 'BOAT / WATERCRAFT', vehicle: 'CAR / TRUCK', gear: 'USED GEAR / SOLAR'
  };

  const fallbackShop = [
    ['True Grit Trucker Hat', 27.99, '/assets/store/true-grit-trucker-hat-approved.webp', 'elevation-upscales-true-grit-trucker-hat'],
    ['Elevation Signature Series Polar Bear Hoodie', 56.08, '/assets/store/featured-hoodie-back-mockup.webp', 'elevation-polar-bear-hoodie'],
    ['Golden Bear and Bull SnapBack', 25, '/assets/store/hat-coming-soon.webp', 'golden-bear-and-bull-snapback'],
    ['Elevation UpScales 4K Wall Art', 55, '/assets/store/combined-brand-wall-art.webp', 'elevation-upscales-4k-wall-art'],
    ['Polar Bear Elevation UpScales 4K Wall Art', 45, '/assets/store/polar-bear-wall-art.webp', 'polar-bear-elevation-upscales-4k-wall-art'],
    ['Golden Bull Elevation UpScales 4K Wall Art', 45, '/assets/store/golden-bull-wall-art.webp', 'golden-bull-elevation-upscales-4k-wall-art'],
    ['Emergency Response 4K Wall Art', 45, '/assets/store/emergency-wall-art.webp', 'emergency-response-4k-wall-art'],
    ['Elevation UpScales Kiss Cut Stickers', 10.29, '/assets/store/stickers.webp', 'elevationupscales-kiss-cut-stickers'],
    ['Elevation UpScales Trucker Hat', 23, '/assets/store/signature-hat.webp', 'elevationupscales-trucker-hat'],
    ['Collectors Series 01 Printable', 5, '/assets/store/signature-digital.webp', 'collectors-series-01-printable']
  ].map(([name, price, image, slug], order) => ({ name, price, image, slug, order }));

  const text = (tag, value, className) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = value;
    return node;
  };

  const imageNode = (src, alt) => {
    const img = document.createElement('img');
    img.src = src || '/assets/logo.webp';
    img.alt = alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 900;
    img.height = 900;
    img.referrerPolicy = 'no-referrer';
    img.addEventListener('error', () => {
      img.src = '/assets/logo.webp';
      img.classList.add('is-fallback-image');
    }, { once: true });
    return img;
  };

  const formatPrice = (value) => {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return 'View price';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: amount % 1 ? 2 : 0 }).format(amount);
  };

  const listingTitle = (listing) => {
    const parts = listing?.category === 'gear'
      ? [listing?.make, listing?.model]
      : [listing?.year, listing?.make, listing?.model];
    return parts.filter((value) => value !== null && value !== undefined && String(value).trim()).join(' ').trim() || 'Marketplace Listing';
  };

  const buildMarketplaceCard = (listing) => {
    const title = listingTitle(listing);
    const article = document.createElement('article');
    article.className = 'home-feature-card';

    const media = document.createElement('a');
    media.className = 'home-feature-card-image';
    media.href = `/marketplace/listing/${encodeURIComponent(String(listing.id || ''))}`;
    media.setAttribute('aria-label', `View ${title}`);
    const featuredIndex = Math.max(0, Number(listing.featuredPhoto) || 0);
    media.append(imageNode(listing.images?.[featuredIndex] || listing.images?.[0] || '/assets/logo.webp', title));
    if (listing.status === 'sold') media.append(text('span', 'SOLD', 'home-feature-badge home-feature-badge--sold'));
    else media.append(text('span', 'AVAILABLE', 'home-feature-badge'));

    const copy = document.createElement('div');
    copy.className = 'home-feature-card-copy';
    copy.append(text('p', `MARKETPLACE · ${categoryNames[listing.category] || 'LISTING'}`, 'home-feature-kicker'));
    const h = document.createElement('h4');
    const titleLink = document.createElement('a');
    titleLink.href = media.href;
    titleLink.textContent = title;
    h.append(titleLink);
    copy.append(h);
    copy.append(text('strong', String(listing.price || 'View price'), 'home-feature-price'));
    copy.append(text('p', String(listing.location || 'View listing for location'), 'home-feature-meta'));
    const cta = document.createElement('a');
    cta.className = 'home-feature-link';
    cta.href = media.href;
    cta.textContent = 'View Listing →';
    copy.append(cta);
    article.append(media, copy);
    return article;
  };

  const safeImageUrl = (candidate) => {
    const value = typeof candidate === 'string' ? candidate : candidate?.transformedUrl || candidate?.url || candidate?.src || candidate?.imageUrl || '';
    if (!value) return '';
    try {
      const url = new URL(String(value), location.origin);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
    } catch { return ''; }
  };

  const firstProductImage = (product) => {
    const variants = Array.isArray(product?.variants) ? product.variants : [];
    const candidates = [
      ...(Array.isArray(product?.images) ? product.images : []),
      ...(Array.isArray(product?.media) ? product.media : []),
      ...variants.flatMap((variant) => [...(Array.isArray(variant?.images) ? variant.images : []), variant?.thumbnailImage]),
      product?.image, product?.featuredImage, product?.primaryImage, product?.thumbnailImage
    ];
    return candidates.map(safeImageUrl).find(Boolean) || '/assets/logo.webp';
  };

  const productSlug = (product) => {
    let value = String(product?.slug || product?.handle || '').trim();
    if (!value) {
      for (const raw of [product?.url, product?.productUrl, product?.permalink]) {
        if (!raw) continue;
        try {
          const parsed = new URL(String(raw), STORE_ORIGIN);
          const match = parsed.pathname.match(/^\/products\/([^/?#]+)/i);
          if (match) { value = decodeURIComponent(match[1]); break; }
        } catch (_) {}
      }
    }
    return value.replace(/^\/+|\/+$/g, '').replace(/^products\//i, '');
  };

  const productPrice = (product) => {
    const direct = product?.price?.value ?? product?.price?.amount ?? product?.price ?? product?.minPrice?.value ?? product?.minPrice;
    const parsed = Number.parseFloat(String(direct ?? '').replace(/[^0-9.-]/g, ''));
    if (Number.isFinite(parsed)) return parsed;
    const prices = (Array.isArray(product?.variants) ? product.variants : [])
      .map((variant) => Number.parseFloat(String(variant?.unitPrice?.value ?? variant?.price?.value ?? variant?.price ?? '').replace(/[^0-9.-]/g, '')))
      .filter(Number.isFinite);
    return prices.length ? Math.min(...prices) : null;
  };

  const normalizeProduct = (product, index) => {
    const name = String(product?.name || product?.title || product?.productName || `Product ${index + 1}`).trim();
    return { name, price: productPrice(product), image: firstProductImage(product), slug: productSlug(product), order: index };
  };

  const productPriority = (product) => {
    const value = `${product.slug} ${product.name}`.toLowerCase();
    if (/true-grit-trucker-hat|true grit trucker hat/.test(value)) return 0;
    if (/polar[ -]+bear.*hoodie|hoodie.*polar[ -]+bear/.test(value)) return 1;
    return 20 + product.order;
  };

  const buildShopCard = (product) => {
    const article = document.createElement('article');
    article.className = 'home-feature-card';
    const href = product.slug ? `/checkout/?source=apparel&id=${encodeURIComponent(product.slug)}` : '/store';
    const media = document.createElement('a');
    media.className = 'home-feature-card-image';
    media.href = href;
    media.append(imageNode(product.image, product.name));
    if (productPriority(product) < 2) media.append(text('span', 'FEATURED', 'home-feature-badge'));

    const copy = document.createElement('div');
    copy.className = 'home-feature-card-copy';
    copy.append(text('p', 'OFFICIAL SHOP', 'home-feature-kicker'));
    const h = document.createElement('h4');
    const titleLink = document.createElement('a');
    titleLink.href = href;
    titleLink.textContent = product.name;
    h.append(titleLink);
    copy.append(h);
    copy.append(text('strong', formatPrice(product.price), 'home-feature-price'));
    const cta = document.createElement('a');
    cta.className = 'home-feature-link';
    cta.href = href;
    cta.textContent = 'Shop Item →';
    copy.append(cta);
    article.append(media, copy);
    return article;
  };

  const marketplaceNodes = async () => {
    try {
      const response = await fetch('/api/marketplace/listings', { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`Marketplace returned ${response.status}`);
      const data = await response.json();
      const listings = Array.isArray(data?.listings) ? data.listings : [];
      return [...listings]
        .sort((a, b) => (a.status === b.status ? 0 : a.status === 'published' ? -1 : 1))
        .slice(0, 5)
        .map(buildMarketplaceCard);
    } catch (error) {
      console.warn('Home Marketplace featured items unavailable:', error);
      return [];
    }
  };

  const shopNodes = async () => {
    let products = [];
    try {
      const response = await fetch('/api/store-products?v=3.0.8', { headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`Store returned ${response.status}`);
      const data = await response.json();
      const raw = Array.isArray(data) ? data : data?.products || data?.results || data?.items || data?.data?.products || [];
      products = raw.map(normalizeProduct).filter((product) => product.name && product.slug);
    } catch (error) {
      console.warn('Home Shop featured items using local fallback:', error);
    }
    if (!products.length) products = [...fallbackShop];
    if (products.length < 10) {
      const existing = new Set(products.map((product) => String(product.slug || product.name).toLowerCase()));
      for (const fallback of fallbackShop) {
        const key = String(fallback.slug || fallback.name).toLowerCase();
        if (existing.has(key)) continue;
        products.push(fallback);
        existing.add(key);
        if (products.length >= 10) break;
      }
    }
    return products.sort((a, b) => productPriority(a) - productPriority(b)).slice(0, 10).map(buildShopCard);
  };

  const loadFeatured = async () => {
    const [marketplace, shop] = await Promise.all([marketplaceNodes(), shopNodes()]);
    const nodes = [...marketplace, ...shop];
    if (nodes.length) featuredRail.replaceChildren(...nodes);
    else featuredRail.replaceChildren(text('p', 'Featured items are temporarily unavailable. Browse the Marketplace or Shop directly.', 'home-feature-empty'));
    featuredRail.setAttribute('aria-busy', 'false');
  };

  const prev = document.querySelector('[data-home-rail-prev="featured"]');
  const next = document.querySelector('[data-home-rail-next="featured"]');
  const scroll = (direction) => featuredRail.scrollBy({
    left: direction * Math.max(260, featuredRail.clientWidth * 0.75),
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  });
  prev?.addEventListener('click', () => scroll(-1));
  next?.addEventListener('click', () => scroll(1));

  let featuredLoadStarted = false;
  const startFeaturedLoad = () => {
    if (featuredLoadStarted) return;
    featuredLoadStarted = true;
    loadFeatured();
  };

  if ('IntersectionObserver' in window) {
    const featuredSection = featuredRail.closest('.home-featured-content') || featuredRail;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      startFeaturedLoad();
    }, { rootMargin: '600px 0px' });
    observer.observe(featuredSection);
  } else {
    startFeaturedLoad();
  }
})();
