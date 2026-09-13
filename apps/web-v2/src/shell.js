const solutionCards = [
  ['Lithium Batteries', 'Reliable LiFePO4 power for mobile, backup and off-grid systems.'],
  ['Solar & Off-Grid', 'Power systems designed around real energy needs and real environments.'],
  ['RV & Outdoor', 'Mobile power, charging and energy storage for life beyond hookups.'],
  ['Backup Power', 'Resilient power options for homes, properties and essential loads.'],
  ['Commercial Solutions', 'Scalable supply, energy and logistics support for larger projects.'],
  ['Hawaii Logistics', 'Harder-to-serve market support with disciplined freight and fulfillment planning.']
];

function solutionMarkup() {
  return solutionCards.map(([title, copy], index) => `
    <article class="solution-card">
      <div class="solution-index" aria-hidden="true">0${index + 1}</div>
      <h3>${title}</h3>
      <p>${copy}</p>
      <a href="#start-project" class="text-link">Explore solution <span aria-hidden="true">→</span></a>
    </article>
  `).join('');
}

export function renderShell({ startProject = false, notFound = false } = {}) {
  const title = notFound
    ? 'Page Not Found | Elevation UpScales'
    : 'Elevation UpScales | Off-Grid Power • Supply • Logistics';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#020b12">
  <meta name="description" content="Elevation UpScales — off-grid power, supply and logistics for RV, solar, backup power, commercial systems and harder-to-serve markets.">
  <title>${title}</title>
  <link rel="stylesheet" href="/assets/app.css">
  <script defer src="/assets/app.js"></script>
</head>
<body class="${startProject ? 'route-start-project' : ''}">
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
        <a href="#solutions">Power</a>
        <a href="#solutions">Shop</a>
        <a href="#start-project">Projects</a>
        <a href="#capabilities">Services</a>
        <a href="#company">Company</a>
      </nav>
      <a class="button button-outline header-cta" href="/start-a-project#start-project">Start a Project</a>
    </div>
  </header>

  <main id="main">
    ${notFound ? `
      <section class="simple-page shell-width">
        <p class="eyebrow">WEB V2</p>
        <h1>That route is not part of the current shell.</h1>
        <p>The first Web V2 source shell is intentionally narrow while Commerce V2 and additional customer routes remain isolated.</p>
        <a class="button button-primary" href="/">Return home</a>
      </section>
    ` : `
      <section class="hero" data-asset-reference="ChatGPT Image Sep 6, 2026, 11_44_56 AM.png">
        <div class="hero-visual" aria-hidden="true"></div>
        <div class="shell-width hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">ELEVATION UPSCALES | OFF-GRID POWER • SUPPLY • LOGISTICS</p>
            <h1>Power Beyond <span>the Grid.</span></h1>
            <p class="hero-lead">Power systems, supply and logistics for RV, solar, backup power, commercial applications and harder-to-serve markets.</p>
            <div class="hero-actions">
              <a class="button button-primary" href="#solutions">Explore Power Solutions <span aria-hidden="true">→</span></a>
              <a class="button button-outline" href="/start-a-project#start-project">Start a Project</a>
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

          <aside class="hero-panel" aria-label="Web V2 shell status">
            <div class="panel-kicker">BUILT FOR A STRONGER TOMORROW</div>
            <h2>One Elevation experience.</h2>
            <p>Public Web V2 is being separated from Commerce and Ops so customer experience can evolve without rebuilding payment, order or internal operations logic into the storefront.</p>
            <dl>
              <div><dt>Web</dt><dd>Customer experience</dd></div>
              <div><dt>Commerce</dt><dd>Product + order truth</dd></div>
              <div><dt>Ops</dt><dd>Internal operations</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section class="trust-strip" id="capabilities">
        <div class="shell-width trust-grid">
          <div><strong>TRUSTED POWER</strong><span>Verified systems from approved suppliers.</span></div>
          <div><strong>HAWAII READY</strong><span>Logistics support for harder-to-serve markets.</span></div>
          <div><strong>REAL SUPPORT</strong><span>Talk to a real person. 208-813-4998</span></div>
        </div>
      </section>

      <section class="section shell-width" id="solutions">
        <div class="section-heading">
          <div>
            <p class="eyebrow">REAL POWER FOR REAL LIFE</p>
            <h2>Shop by <span>Solution</span></h2>
          </div>
          <p class="section-copy">The Step 4 shell establishes customer navigation and presentation only. Prices, stock, shipping, checkout and order truth remain intentionally outside Web V2 until Commerce V2 is connected.</p>
        </div>
        <div class="solution-grid">
          ${solutionMarkup()}
        </div>
      </section>

      <section class="vendor-band" id="company">
        <div class="shell-width vendor-grid">
          <div>
            <p class="eyebrow">AUTHORIZED VENDOR EXPERIENCE</p>
            <h2>Elevation first. Verified partners behind the solution.</h2>
          </div>
          <p>Web V2 will merchandise approved vendor relationships inside one Elevation customer experience rather than creating disconnected vendor storefronts. SOK is the first visual baseline; additional approved vendors follow the same model.</p>
        </div>
      </section>

      <section class="project-section" id="start-project">
        <div class="shell-width project-grid">
          <div>
            <p class="eyebrow">START A PROJECT</p>
            <h2>Need a system, supply solution or logistics plan?</h2>
            <p>Tell Elevation what you are trying to power, build, move or solve. The full intake workflow will connect in a later Web V2 phase; this shell keeps the customer action visible from day one.</p>
          </div>
          <div class="contact-card">
            <a class="button button-primary" href="tel:+12088134998">Call 208-813-4998</a>
            <a class="button button-outline" href="mailto:casey@elevationupscales.com">Email Elevation</a>
          </div>
        </div>
      </section>
    `}
  </main>

  <footer class="site-footer">
    <div class="shell-width footer-grid">
      <div>
        <div class="brand footer-brand" data-asset-reference="ChatGPT Image Sep 5, 2026, 04_15_53 PM.png">
          <span class="brand-primary">ELEVATION</span>
          <span class="brand-secondary">UpScales</span>
        </div>
        <p>OFF-GRID POWER • SUPPLY • LOGISTICS</p>
      </div>
      <div class="footer-meta">
        <span>Web V2 Phase 1 / Step 4</span>
        <span>Commerce not connected</span>
        <span>© <span data-current-year>2026</span> Elevation UpScales, Inc.</span>
      </div>
    </div>
  </footer>
</body>
</html>`;
}
