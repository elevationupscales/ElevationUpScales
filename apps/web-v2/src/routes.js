export const CANONICAL_ORIGIN = 'https://elevationupscales.com';

const route = (path, title, description, options = {}) => ({ path, title, description, implemented: false, ...options });

export const PUBLIC_ROUTES = new Map([
  ['/', route('/', 'Elevation UpScales | Off-Grid Power • Supply • Logistics', 'Elevation UpScales provides off-grid power, supply and logistics support for RV, solar, backup power, commercial systems and harder-to-serve markets.', { implemented: true, page: 'home' })],
  ['/start-a-project', route('/start-a-project', 'Start a Project | Elevation UpScales', 'Start a project with Elevation UpScales for power, property, RV, solar, off-grid or logistics needs.', { page: 'start-project' })],
  ['/store', route('/store', 'Shop | Elevation UpScales', 'Shop verified-source power, battery, RV, outdoor and equipment product records from Elevation UpScales.', { implemented: true, page: 'store' })],
  ['/product', route('/product', 'Product Details | Elevation UpScales', 'View product details from Elevation UpScales.')],
  ['/cart', route('/cart', 'Cart | Elevation UpScales', 'Review items selected from Elevation UpScales.')],
  ['/checkout', route('/checkout', 'Checkout | Elevation UpScales', 'Complete an Elevation UpScales purchase.')],
  ['/shop/sok', route('/shop/sok', 'SOK | Elevation UpScales', 'Explore SOK power products through Elevation UpScales.', { implemented: true, page: 'vendor', vendor: 'sok' })],
  ['/shop/renogy', route('/shop/renogy', 'Renogy | Elevation UpScales', 'Explore Renogy power products through Elevation UpScales.', { implemented: true, page: 'vendor', vendor: 'renogy' })],
  ['/shop/vevor', route('/shop/vevor', 'VEVOR | Elevation UpScales', 'Explore VEVOR products through Elevation UpScales.', { implemented: true, page: 'vendor', vendor: 'vevor' })],
  ['/shop/kingboss', route('/shop/kingboss', 'Kingboss | Elevation UpScales', 'Explore Kingboss power products through Elevation UpScales.', { implemented: true, page: 'vendor', vendor: 'kingboss' })],
  ['/what-we-do', route('/what-we-do', 'What We Do | Elevation UpScales', 'Explore Elevation UpScales services, power solutions and logistics capabilities.')],
  ['/home-services', route('/home-services', 'Home Services | Elevation UpScales', 'Home repair, restoration and improvement services from Elevation UpScales.')],
  ['/rv-services', route('/rv-services', 'RV Services | Elevation UpScales', 'RV repair, restoration, inspection, upgrades and planning from Elevation UpScales.')],
  ['/solar-services', route('/solar-services', 'Solar & Off-Grid | Elevation UpScales', 'Solar, battery and off-grid power services from Elevation UpScales.')],
  ['/shipping-logistics-services', route('/shipping-logistics-services', 'Shipping & Logistics | Elevation UpScales', 'Shipping and logistics support from Elevation UpScales.')],
  ['/hawaii-lithium-batteries', route('/hawaii-lithium-batteries', 'Hawaii Power & Logistics | Elevation UpScales', 'Power product and logistics support for Hawaii through Elevation UpScales.')],
  ['/solar-project', route('/solar-project', 'Build a Solar System | Elevation UpScales', 'Plan a solar and battery system with Elevation UpScales.')],
  ['/other-ways-we-can-help', route('/other-ways-we-can-help', 'Other Ways We Can Help | Elevation UpScales', 'Find the right Elevation UpScales path for projects, shopping, support and collaboration.')],
  ['/work-with-us', route('/work-with-us', 'Work With Us | Elevation UpScales', 'Explore ways to work with Elevation UpScales.')],
  ['/collector', route('/collector', 'Collector Series | Elevation UpScales', 'Explore the Elevation UpScales Collector Series.')],
  ['/privacy', route('/privacy', 'Privacy | Elevation UpScales', 'Read the Elevation UpScales privacy information.')],
  ['/terms', route('/terms', 'Terms | Elevation UpScales', 'Read the Elevation UpScales terms and conditions.')]
]);

export const PRIMARY_NAV = [
  { label: 'Shop', href: '/store' },
  { label: 'Vendors', children: [
    { label: 'SOK Energy', href: '/shop/sok', description: 'Authorized battery systems' },
    { label: 'Renogy', href: '/shop/renogy', description: 'Solar and off-grid power' },
    { label: 'VEVOR', href: '/shop/vevor', description: 'Tools, equipment and outdoor products' },
    { label: 'Kingboss', href: '/shop/kingboss', description: 'Lithium battery supply' }
  ]},
  { label: 'Freight & Hawaii', children: [
    { label: 'Shipping & Logistics', href: '/shipping-logistics-services', description: 'Destination and freight review' },
    { label: 'Hawaii Lithium', href: '/hawaii-lithium-batteries', description: 'Lithium purchase and freight paths' }
  ]},
  { label: 'Start a Project', href: '/start-a-project' }
];

export const FOOTER_NAV = [
  { label: 'Shop', href: '/store' },
  { label: 'Shipping & Logistics', href: '/shipping-logistics-services' },
  { label: 'Hawaii Lithium', href: '/hawaii-lithium-batteries' },
  { label: 'Start a Project', href: '/start-a-project' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' }
];

const EXACT_REDIRECTS = new Map([
  ['/index.html', { location: '/', status: 301 }], ['/home-services.html', { location: '/home-services', status: 301 }],
  ['/rv-services.html', { location: '/rv-services', status: 301 }], ['/solar-services.html', { location: '/solar-services', status: 301 }],
  ['/privacy.html', { location: '/privacy', status: 301 }], ['/terms.html', { location: '/terms', status: 301 }],
  ['/store.html', { location: '/store', status: 301 }], ['/collector.html', { location: '/collector', status: 301 }],
  ['/start-a-project.html', { location: '/start-a-project', status: 301 }], ['/other-ways-we-can-help.html', { location: '/other-ways-we-can-help', status: 301 }],
  ['/work-with-us.html', { location: '/work-with-us', status: 301 }], ['/product.html', { location: '/product', status: 301 }],
  ['/lithium-batteries', { location: '/store?department=lithium-batteries', status: 301 }], ['/lithium-batteries/', { location: '/store?department=lithium-batteries', status: 301 }],
  ['/lithium-batteries.html', { location: '/store?department=lithium-batteries', status: 301 }], ['/rv-store', { location: '/store?department=rv-outdoor', status: 301 }],
  ['/rv-store/', { location: '/store?department=rv-outdoor', status: 301 }], ['/rv-store.html', { location: '/store?department=rv-outdoor', status: 301 }],
  ['/kingboss-batteries', { location: '/shop/kingboss', status: 301 }], ['/kingboss-batteries/', { location: '/shop/kingboss', status: 301 }],
  ['/kingboss-batteries.html', { location: '/shop/kingboss', status: 301 }], ['/marketplace', { location: '/store', status: 301 }],
  ['/marketplace/', { location: '/store', status: 301 }], ['/marketplace.html', { location: '/store', status: 301 }],
  ['/make-a-listing', { location: '/store', status: 301 }], ['/make-a-listing/', { location: '/store', status: 301 }], ['/make-a-listing.html', { location: '/store', status: 301 }],
  ['/report-an-issue', { location: '/other-ways-we-can-help', status: 301 }], ['/report-an-issue/', { location: '/other-ways-we-can-help', status: 301 }], ['/report-an-issue.html', { location: '/other-ways-we-can-help', status: 301 }],
  ['/vehicles', { location: '/store', status: 301 }], ['/vehicles/', { location: '/store', status: 301 }], ['/vehicles.html', { location: '/store', status: 301 }],
  ['/rv', { location: '/store?department=rv-outdoor', status: 301 }], ['/rv/', { location: '/store?department=rv-outdoor', status: 301 }], ['/rv.html', { location: '/store?department=rv-outdoor', status: 301 }],
  ['/rvs', { location: '/store?department=rv-outdoor', status: 301 }], ['/rvs/', { location: '/store?department=rv-outdoor', status: 301 }], ['/rvs.html', { location: '/store?department=rv-outdoor', status: 301 }],
  ['/outdoor-store', { location: '/store?department=rv-outdoor', status: 301 }], ['/rv-outdoor-store', { location: '/store?department=rv-outdoor', status: 301 }], ['/shop/rv', { location: '/store?department=rv-outdoor', status: 301 }],
  ['/gallery', { location: '/', status: 301 }], ['/gallery/', { location: '/', status: 301 }], ['/gallery.html', { location: '/', status: 301 }],
  ['/product/', { location: '/product', status: 308 }], ['/start-a-project/', { location: '/start-a-project', status: 308 }],
  ['/other-ways-we-can-help/', { location: '/other-ways-we-can-help', status: 308 }], ['/work-with-us/', { location: '/work-with-us', status: 308 }], ['/solar-project/', { location: '/solar-project', status: 308 }]
]);

const PROJECT_REDIRECTS = new Map([
  ['/home-project', 'home'], ['/home-project/', 'home'], ['/home-project.html', 'home'],
  ['/rv-project', 'rv'], ['/rv-project/', 'rv'], ['/rv-project.html', 'rv']
]);

const RETIRED_STORE_ALIASES = new Set([
  '/list-a-vehicle', '/list-a-vehicle/', '/list-a-vehicle.html', '/list-a-motorcycle', '/list-a-motorcycle/', '/list-a-motorcycle.html',
  '/list-a-boat', '/list-a-boat/', '/list-a-boat.html', '/list-a-bicycle', '/list-a-bicycle/', '/list-a-bicycle.html',
  '/list-used-gear', '/list-used-gear/', '/list-used-gear.html', '/sell', '/sell-a-vehicle', '/sell-a-car', '/sell-a-truck', '/list-a-car', '/list-a-truck',
  '/cars', '/trucks', '/cars-trucks'
]);

export function getPublicRoute(pathname) {
  if (PUBLIC_ROUTES.has(pathname)) return PUBLIC_ROUTES.get(pathname);
  const productMatch = pathname.match(/^\/product\/([a-z0-9][a-z0-9-]*)\/?$/i);
  if (productMatch) {
    const productId = productMatch[1].toLowerCase();
    return route(`/product/${productId}`, 'Product Details | Elevation UpScales', 'View verified-source product information through Elevation UpScales.', { implemented: true, page: 'product', productId });
  }
  if (/^\/sok\/[a-z0-9][a-z0-9-]*\/?$/i.test(pathname)) {
    return route(pathname.replace(/\/$/, ''), 'SOK Product | Elevation UpScales', 'View SOK product information through Elevation UpScales.', { dynamic: 'sok-product' });
  }
  return null;
}

export function getSitemapRoutes() { return [...PUBLIC_ROUTES.values()].filter(({ implemented, indexable = true }) => implemented && indexable); }

export function resolveCompatibilityRedirect(url) {
  const exact = EXACT_REDIRECTS.get(url.pathname);
  if (exact) return exact;
  const projectType = PROJECT_REDIRECTS.get(url.pathname);
  if (projectType) return { location: `/start-a-project?type=${projectType}&source=legacy-route`, status: 302 };
  if (RETIRED_STORE_ALIASES.has(url.pathname)) return { location: '/store', status: 301 };
  if (url.pathname === '/sell-an-rv' || url.pathname === '/list-an-rv' || url.pathname === '/list-an-rv/' || url.pathname === '/list-an-rv.html') return { location: '/store?department=rv-outdoor', status: 301 };
  return null;
}

export function canonicalUrl(routeInfo) { return `${CANONICAL_ORIGIN}${routeInfo?.path || '/'}`; }
