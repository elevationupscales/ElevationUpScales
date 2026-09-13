import { CANONICAL_ORIGIN, FOOTER_NAV, PRIMARY_NAV, canonicalUrl } from './routes.js';

const solutionCards = [
  ['Lithium Batteries', 'Reliable LiFePO4 power for mobile, backup and off-grid systems.', 'lithium'],
  ['Solar & Off-Grid', 'Power systems designed around real energy needs and real environments.', 'solar'],
  ['RV & Outdoor', 'Mobile power, charging and energy storage for life beyond hookups.', 'rv'],
  ['Backup Power', 'Resilient power options for homes, properties and essential loads.', 'backup'],
  ['Commercial Solutions', 'Scalable supply, energy and logistics support for larger projects.', 'commercial'],
  ['Hawaii Logistics', 'Harder-to-serve market support with disciplined freight and fulfillment planning.', 'hawaii']
];

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[character]));

function solutionMarkup() {
  return solutionCards.map(([title, copy, solution], index) => `
    <article class="solution-card">
      <div class="solution-index" aria-hidden="true">0${index + 1}</div>
      <h3>${title}</h3>
      <p>${copy}</p>
      <a href="/start-a-project?solution=${encodeURIComponent(solution)}" class="text-link">Talk with Elevation <span aria-hidden="true">→</span></a>
    </article>
  `).join('');
}

function navMarkup(currentPath) {
  return PRIMARY_NAV.map(({ label, href }) => {
    const active = href === currentPath ? ' aria-current="page"' : '';
    return `<a href="${href}"${active}>${label}</a>`;
  }).join('');
}

function footerLinksMarkup(currentPath) {
  return FOOTER_NAV.map(({ label, href }) => {
    const active = href === currentPath ? ' aria-current="page"' : '';
    return `<a href="${href}"${active}>${label}</a>`;
  }).join('');
}

function documentHead(routeInfo, { notFound = false } = {}) {
  const title = notFound ? 'Page Not Found | Elevation UpScales' : routeInfo.title;
  const description = notFound
    ? 'The requested page could not be found. Continue to Elevation UpScales home or contact the team for help.'
    : routeInfo.description;
  const canonical = notFound ? '' : `\n  <link rel="canonical" href="${canonicalUrl(routeInfo)}">`;
  const robots = notFound ? '\n  <meta name="robots" content="noindex,follow">' : '';
  const pageUrl = notFound ? CANONICAL_ORIGIN : canonicalUrl(routeInfo);

  return `
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#020b12">
  <meta name="description" content="${escapeHtml(description)}">${robots}${canonical}
  <meta property="og:site_name" content="Elevation UpScales">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(pageUrl)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="/assets/app.css">
  <script defer src="/assets/app.js"></script>`;
}

function headerMarkup(currentPath) {
  return `
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="utility-bar">
    <div class="utility-inner shell-width">
      <span>OFF-GRID POWER • SUPPLY • LOGISTICS</span>
      <span>HAWAII LOGISTICS AVAILABLE</span>
      <span>RV • SOLAR • BACKUP • COMMERCIAL</span>
      <span><a href="tel:+12088134998">208-813-4998</a></span>
    </div>
  </div>
  <header class="site-header">
    <div class="shell-width nav-row">
      <a class="brand" href="/" aria-label="Elevation UpScales home">
        <span class="brand-primary">ELEVATION</span>
        <span class="brand-secondary">UpScales</span>
      </a>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">Menu</button>
      <nav id="primary-nav" class="primary-nav" aria-label="Primary navigation">
        ${navMarkup(currentPath)}
      </nav>
      <a class="button button-outline header-cta" href="/start-a-project">Start a Project</a>
    </div>
  </header>`;
}

function footerMarkup(currentPath) {
  return `
  <footer class="site-footer">
    <div class="shell-width footer-grid">
      <div>
        <div class="brand footer-brand" data-asset-reference="ChatGPT Image Sep 5, 2026, 04_15_53 PM.png">
          <span class="brand-primary">ELEVATION</span>
          <span class="brand-secondary">UpScales</span>
        </div>
        <p>OFF-GRID POWER • SUPPLY • LOGISTICS</p>
      </div>
      <nav class="footer-meta" aria-label="Footer navigation">
        ${footerLinksMarkup(currentPath)}
        <a href="tel:+12088134998">208-813-4998</a>
        <span>© <span data-current-year>2026</span> Elevation UpScales, Inc.</span>
      </nav>
    </div>
  </footer>`;
}

function homeMain() {
  return `
    <section class="hero" data-asset-reference="ChatGPT Image Sep 6, 2026, 11_44_56 AM.png">
      <div class="hero-visual" aria-hidden="true"></div>
      <div class="shell-width hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">ELEVATION UPSCALES | OFF-GRID POWER • SUPPLY • LOGISTICS</p>
          <h1>Power Beyond <span>the Grid.</span></h1>
          <p class="hero-lead">Power systems, supply and logistics for RV, solar, backup power, commercial applications and harder-to-serve markets.</p>
          <div class="hero-actions">
            <a class="button button-primary" href="#solutions">Explore Power Solutions <span aria-hidden="true">→</span></a>
            <a class="button button-outline" href="/start-a-project">Start a Project</a>
          </div>
          <div class="hero-meta" aria-label="Core solution areas">
            <span>Lithium Batteries</span>
            <span>Solar & Off-Grid</span>
            <span>RV & Outdoor</span>
            <span>Backup Power</span>
            <span>Commercial</span>
            <span>Hawaii Logistics</span>
          </div>
        </div>
        <aside class="hero-panel" aria-label="Customer support">
          <div class="panel-kicker">BUILT FOR A STRONGER TOMORROW</div>
          <h2>Power, supply and logistics support.</h2>
          <p>Bring Elevation the goal, environment and constraints. We help identify the right next step for the project.</p>
          <dl>
            <div><dt>Power</dt><dd>Battery, solar and backup applications</dd></div>
            <div><dt>Mobile</dt><dd>RV, outdoor and off-grid use</dd></div>
            <div><dt>Logistics</dt><dd>Harder-to-serve destination planning</dd></div>
          </dl>
        </aside>
      </div>
    </section>

    <section class="trust-strip" id="capabilities">
      <div class="shell-width trust-grid">
        <div><strong>POWER SOLUTIONS</strong><span>Support for mobile, backup and off-grid applications.</span></div>
        <div><strong>DESTINATION LOGISTICS</strong><span>Planning support for harder-to-serve markets.</span></div>
        <div><strong>REAL SUPPORT</strong><span>Talk to Elevation at 208-813-4998.</span></div>
      </div>
    </section>

    <section class="section shell-width" id="solutions">
      <div class="section-heading">
        <div>
          <p class="eyebrow">REAL POWER FOR REAL LIFE</p>
          <h2>Explore by <span>Solution</span></h2>
        </div>
        <p class="section-copy">Start with the application rather than a product list. Elevation can help narrow the path based on what you need to power, where it will operate and how it needs to move.</p>
      </div>
      <div class="solution-grid">${solutionMarkup()}</div>
    </section>

    <section class="vendor-band" id="company">
      <div class="shell-width vendor-grid">
        <div>
          <p class="eyebrow">ELEVATION UPSCALES</p>
          <h2>One place to plan the next move.</h2>
        </div>
        <p>From batteries and solar to RV applications, property needs and destination logistics, Elevation brings the customer journey together around the real job to be done.</p>
      </div>
    </section>

    <section class="project-section" id="start-project">
      <div class="shell-width project-grid">
        <div>
          <p class="eyebrow">START A PROJECT</p>
          <h2>Need a system, supply solution or logistics plan?</h2>
          <p>Call or email Elevation with what you are trying to power, build, move or solve. We will help identify the right next step.</p>
        </div>
        <div class="contact-card">
          <a class="button button-primary" href="tel:+12088134998">Call 208-813-4998</a>
          <a class="button button-outline" href="mailto:casey@elevationupscales.com">Email Elevation</a>
        </div>
      </div>
    </section>`;
}

function startProjectMain() {
  return `
    <section class="simple-page shell-width">
      <p class="eyebrow">START A PROJECT</p>
      <h1>Tell Elevation what you need to solve.</h1>
      <p>For a new power, property, RV, solar, off-grid or logistics project, start with a direct conversation. Call or email Elevation with the goal, location and the best way to reach you.</p>
      <div class="hero-actions">
        <a class="button button-primary" href="tel:+12088134998">Call 208-813-4998</a>
        <a class="button button-outline" href="mailto:casey@elevationupscales.com?subject=Start%20a%20Project">Email Elevation</a>
      </div>
    </section>`;
}

function notFoundMain() {
  return `
    <section class="simple-page shell-width">
      <p class="eyebrow">404 • PAGE NOT FOUND</p>
      <h1>We couldn’t find that page.</h1>
      <p>The address may have changed or the page may no longer be available. Return home, start a project, or call Elevation for help finding the right path.</p>
      <div class="hero-actions">
        <a class="button button-primary" href="/">Return Home</a>
        <a class="button button-outline" href="/start-a-project">Start a Project</a>
        <a class="text-link" href="tel:+12088134998">Call 208-813-4998 <span aria-hidden="true">→</span></a>
      </div>
    </section>`;
}

function document({ routeInfo, main, notFound = false }) {
  const currentPath = notFound ? '' : routeInfo.path;
  return `<!doctype html>
<html lang="en">
<head>${documentHead(routeInfo, { notFound })}
</head>
<body>
${headerMarkup(currentPath)}
<main id="main">${main}</main>
${footerMarkup(currentPath)}
</body>
</html>`;
}

export function renderPublicPage(routeInfo) {
  if (routeInfo.page === 'start-project') return document({ routeInfo, main: startProjectMain() });
  return document({ routeInfo, main: homeMain() });
}

export function renderNotFound() {
  return document({
    routeInfo: { path: '/', title: 'Page Not Found | Elevation UpScales', description: 'The requested page could not be found.' },
    main: notFoundMain(),
    notFound: true
  });
}
