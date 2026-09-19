export const styles = `
:root {
  color-scheme: dark;
  --bg: #02080b;
  --bg-soft: #04131a;
  --panel: #061923;
  --panel-2: #03131d;
  --line: rgba(53, 202, 232, .22);
  --cyan: #31c6e7;
  --cyan-strong: #16b9df;
  --white: #f8fbfd;
  --muted: #aec1ca;
  --max: 1700px;
  font-family: Inter, Avenir, "Segoe UI", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; background: var(--bg); }
body { margin: 0; min-width: 320px; background: var(--bg); color: var(--white); line-height: 1.5; }
a { color: inherit; text-decoration: none; }
img { max-width: 100%; }
button, input { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
.shell-width { width: min(calc(100% - 62px), var(--max)); margin-inline: auto; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.skip-link { position: fixed; top: 10px; left: 10px; transform: translateY(-160%); z-index: 100; background: #fff; color: #00131b; padding: 10px 14px; }
.skip-link:focus { transform: none; }

.utility-bar { min-height: 58px; display: flex; align-items: center; background: #031923; border-bottom: 1px solid rgba(49,198,231,.28); color: #edf8fb; font-size: 14px; letter-spacing: .08em; text-transform: uppercase; }
.utility-inner { display: grid; grid-template-columns: 1.08fr 1.12fr 1fr auto; gap: 28px; align-items: center; width: 100%; }
.utility-inner > * { white-space: nowrap; }
.utility-inner > a { text-align: center; font-weight: 700; }
.utility-contact { display: flex; align-items: center; gap: 28px; text-transform: none; letter-spacing: 0; }
.utility-contact a:hover, .utility-inner > a:hover { color: var(--cyan); }

.site-header { position: sticky; top: 0; z-index: 50; min-height: 118px; background: rgba(1, 8, 12, .97); border-bottom: 1px solid rgba(49,198,231,.18); backdrop-filter: blur(14px); }
.nav-row { min-height: 118px; display: grid; grid-template-columns: minmax(230px, 270px) minmax(430px, 1fr) minmax(250px, 350px) auto; gap: 28px; align-items: center; }
.brand { display: block; width: 240px; }
.brand img { display: block; width: 100%; height: 76px; object-fit: contain; object-position: left center; }
.primary-nav { display: flex; align-items: center; justify-content: center; gap: clamp(22px, 2.3vw, 48px); font-size: 15px; font-weight: 850; }
.primary-nav a { position: relative; padding: 12px 0; color: #e8f0f3; }
.primary-nav a::after { content: "⌄"; display: inline-block; margin-left: 8px; color: #d7e8ed; font-size: 15px; transform: translateY(-1px); }
.primary-nav a:hover, .primary-nav a:focus-visible, .primary-nav a[aria-current="page"] { color: var(--cyan); }
.nav-toggle { display: none; }
.header-search { height: 64px; display: grid; grid-template-columns: 1fr 52px; overflow: hidden; border: 1px solid var(--cyan-strong); border-radius: 32px; background: #07131a; }
.header-search input { min-width: 0; padding: 0 0 0 22px; border: 0; outline: 0; color: #edf8fb; background: transparent; }
.header-search input::placeholder { color: #90a7b2; }
.header-search button { border: 0; color: var(--cyan); background: transparent; font-size: 31px; cursor: pointer; }

.button { display: inline-flex; align-items: center; justify-content: center; gap: 12px; min-height: 58px; padding: 0 28px; border: 1px solid transparent; border-radius: 5px; font-size: 16px; font-weight: 900; letter-spacing: .02em; text-transform: uppercase; transition: transform .18s ease, border-color .18s ease, background .18s ease; }
.button:hover { transform: translateY(-1px); }
.button-primary { background: var(--cyan); color: #00121a; }
.button-primary:hover { background: #5ed8f0; }
.button-outline { border-color: rgba(202,231,239,.34); background: rgba(1, 8, 12, .66); color: #fff; }
.button-outline:hover { border-color: var(--cyan); color: var(--cyan); }
.header-cta { min-height: 66px; padding-inline: 28px; white-space: nowrap; }

.storefront-hero { position: relative; min-height: 690px; overflow: hidden; background: #021017; }
.storefront-scene { position: absolute; inset: 0; background-image: linear-gradient(90deg, rgba(0,5,9,.96) 0%, rgba(0,8,13,.86) 30%, rgba(2,15,23,.28) 58%, rgba(0,6,10,.38) 100%), linear-gradient(180deg, rgba(0,0,0,.02), rgba(0,6,10,.12) 62%, rgba(0,6,10,.8)), url('https://elevationupscales.com/assets/hero/storefront-tropical-logistics-v3.webp'); background-size: cover; background-position: center 44%; }
.storefront-grid { position: relative; z-index: 2; min-height: 690px; display: grid; grid-template-columns: minmax(560px, .9fr) minmax(600px, 1.1fr); gap: 36px; align-items: stretch; }
.storefront-copy { display: flex; flex-direction: column; justify-content: center; padding: 72px 0 50px; max-width: 760px; }
.eyebrow { margin: 0 0 20px; color: #6ee6ff; font-size: 14px; font-weight: 900; letter-spacing: .22em; text-transform: uppercase; }
.storefront-hero h1 { margin: 0; max-width: 760px; font-size: clamp(58px, 5.3vw, 90px); line-height: .94; letter-spacing: -.045em; }
.storefront-hero h1 span { display: block; margin-top: 12px; color: #fff; font-size: .78em; letter-spacing: -.035em; }
.storefront-lead { max-width: 730px; margin: 26px 0 0; color: #edf3f5; font-size: clamp(18px, 1.4vw, 23px); line-height: 1.55; font-weight: 650; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 32px; }
.usecase-grid { display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); gap: 8px; margin-top: 28px; }
.usecase-grid a { min-height: 58px; display: flex; align-items: center; justify-content: center; padding: 10px; border: 1px solid rgba(49,198,231,.24); border-radius: 6px; background: rgba(2,14,20,.52); color: #f1f8fa; text-align: center; font-size: 11px; line-height: 1.25; font-weight: 850; letter-spacing: .05em; text-transform: uppercase; }
.usecase-grid a:hover { border-color: var(--cyan); color: var(--cyan); }
.storefront-visual { position: relative; display: grid; grid-template-columns: 1fr 1fr; align-items: end; gap: 16px; padding: 122px 0 22px; }
.sok-wordmark { position: absolute; top: 135px; left: 50%; width: min(470px, 54%); transform: translateX(-50%); filter: drop-shadow(0 10px 22px rgba(0,0,0,.35)); }
.hero-product { position: relative; min-width: 0; height: 330px; display: flex; align-items: flex-end; justify-content: center; }
.hero-product img { width: 100%; height: 100%; object-fit: contain; object-position: center bottom; filter: drop-shadow(0 22px 28px rgba(0,0,0,.5)); }
.hero-product span { position: absolute; left: 18px; bottom: 12px; display: grid; gap: 1px; padding: 7px 10px; background: rgba(0,7,11,.75); border-left: 2px solid var(--cyan); }
.hero-product b { font-size: 12px; }
.hero-product small { color: #b6cbd2; font-size: 10px; }
.hero-product:hover span { color: var(--cyan); }

.trust-strip { display: grid; grid-template-columns: repeat(3,1fr); background: #03131d; border-block: 1px solid rgba(49,198,231,.2); }
.trust-item { position: relative; min-height: 88px; display: flex; flex-direction: column; justify-content: center; padding: 17px clamp(28px, 4vw, 70px); border-right: 1px solid rgba(49,198,231,.18); }
.trust-item:last-child { border-right: 0; }
.trust-item::before { content: ""; position: absolute; top: 0; left: clamp(28px, 4vw, 70px); width: 48px; height: 2px; background: var(--cyan); }
.trust-item strong { font-size: 13px; letter-spacing: .08em; }
.trust-item span { margin-top: 6px; color: #abc0ca; font-size: 12px; }
a.trust-item:hover strong { color: var(--cyan); }

.section { padding-block: 88px 100px; }
.section-heading { display: flex; align-items: end; justify-content: space-between; gap: 34px; margin-bottom: 34px; }
.section-heading h2, .sok-feature h2, .logistics-section h2, .project-section h2, .simple-page h1 { margin: 0; font-size: clamp(38px, 4vw, 64px); line-height: 1; letter-spacing: -.045em; }
.section-heading h2 span { color: var(--cyan); }
.section-link { white-space: nowrap; }
.solution-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.solution-card { position: relative; min-height: 205px; display: flex; flex-direction: column; padding: 28px; border: 1px solid rgba(49,198,231,.2); background: #061923; }
.solution-card:nth-child(1), .solution-card:nth-child(4), .solution-card:nth-child(7) { background: #071f2b; }
.solution-card h3 { margin: 0 0 12px; font-size: 23px; line-height: 1.05; text-transform: uppercase; }
.solution-card p { flex: 1; margin: 0 0 22px; color: var(--muted); }
.text-link { color: #84e8fb; font-size: 13px; font-weight: 900; letter-spacing: .03em; text-transform: uppercase; }
.text-link:hover { color: #fff; }

.sok-feature { padding-block: 82px 92px; background: #04131a; border-block: 1px solid var(--line); }
.sok-feature-grid { display: grid; grid-template-columns: 1fr .72fr .72fr; gap: 22px; align-items: stretch; }
.sok-feature-copy { display: flex; flex-direction: column; justify-content: center; padding: 40px; border-left: 3px solid var(--cyan); background: #061923; }
.sok-feature-copy p:not(.eyebrow) { max-width: 620px; color: var(--muted); font-size: 17px; }
.sok-feature-copy .button { width: max-content; margin-top: 16px; }
.product-card { display: flex; flex-direction: column; padding: 24px; border: 1px solid rgba(49,198,231,.19); background: #06151e; }
.product-image { min-height: 280px; display: grid; place-items: center; background: #f4f5f5; }
.product-image img { width: 100%; height: 260px; object-fit: contain; }
.product-kicker { margin: 22px 0 8px; color: var(--cyan)!important; font-size: 11px!important; font-weight: 900; letter-spacing: .1em; }
.product-card h3 { margin: 0; font-size: 25px; }
.product-card > p { color: var(--muted); }

.logistics-section { padding-block: 92px; background: #020b10; }
.logistics-grid { display: grid; grid-template-columns: minmax(0,.95fr) minmax(520px,1.05fr); gap: 72px; align-items: center; }
.logistics-copy > p:not(.eyebrow) { max-width: 720px; color: var(--muted); font-size: 18px; }
.logistics-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }
.logistics-path { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
.logistics-path > div { min-height: 170px; display: grid; align-content: start; gap: 7px; padding: 24px; border: 1px solid rgba(49,198,231,.2); background: #061923; }
.logistics-path span { color: var(--cyan); font-size: 12px; font-weight: 900; letter-spacing: .14em; }
.logistics-path strong { font-size: 19px; text-transform: uppercase; }
.logistics-path small { color: var(--muted); font-size: 13px; }

.project-section { padding-block: 86px; background: #04131a; border-top: 1px solid var(--line); }
.project-grid { display: grid; grid-template-columns: 1.35fr .65fr; gap: 70px; align-items: center; }
.project-section p:not(.eyebrow) { max-width: 820px; color: var(--muted); font-size: 17px; }
.contact-card { display: grid; gap: 12px; padding: 26px; border: 1px solid var(--line); background: #061923; }

.site-footer { border-top: 1px solid var(--line); background: #01070b; }
.footer-grid { min-height: 210px; display: flex; align-items: center; justify-content: space-between; gap: 36px; }
.footer-brand { width: 245px; }
.footer-brand img { height: 78px; }
.footer-brand-block p { margin: 10px 0 0; color: var(--muted); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; }
.footer-meta { display: grid; gap: 6px; text-align: right; color: #829aa5; font-size: 12px; }
.footer-meta a:hover { color: var(--cyan); }
.simple-page { min-height: 70vh; padding-block: 100px; display: grid; align-content: center; justify-items: start; gap: 22px; }
.simple-page p { max-width: 760px; color: var(--muted); font-size: 18px; }

@media (max-width: 1280px) {
  .utility-inner { grid-template-columns: 1fr 1fr auto; }
  .utility-inner > span:nth-child(3) { display: none; }
  .nav-row { grid-template-columns: 220px 1fr 260px auto; gap: 18px; }
  .primary-nav { gap: 20px; font-size: 14px; }
  .storefront-grid { grid-template-columns: minmax(500px,.95fr) minmax(470px,1.05fr); }
  .storefront-hero h1 { font-size: clamp(54px, 5.5vw, 76px); }
  .usecase-grid { grid-template-columns: repeat(3,1fr); }
  .hero-product { height: 280px; }
  .solution-grid { grid-template-columns: repeat(3,1fr); }
}

@media (max-width: 1040px) {
  .utility-inner { grid-template-columns: 1fr auto; }
  .utility-inner > a, .utility-inner > span:nth-child(3) { display: none; }
  .nav-row { position: relative; min-height: 84px; grid-template-columns: 1fr auto auto; }
  .brand { width: 200px; }
  .brand img { height: 60px; }
  .nav-toggle { display: inline-flex; min-height: 44px; align-items: center; justify-content: center; padding: 0 16px; border: 1px solid var(--line); background: transparent; color: #fff; cursor: pointer; }
  .primary-nav { display: none; position: absolute; top: 84px; left: 0; right: 0; z-index: 55; flex-direction: column; align-items: stretch; gap: 0; padding: 10px; border: 1px solid var(--line); background: #03131d; }
  .primary-nav[data-open="true"] { display: flex; }
  .primary-nav a { min-height: 48px; display: flex; align-items: center; padding: 0 14px; border-bottom: 1px solid rgba(49,198,231,.12); }
  .primary-nav a::after { margin-left: auto; }
  .header-search { display: none; }
  .storefront-grid { grid-template-columns: 1fr; }
  .storefront-copy { max-width: 800px; padding-bottom: 30px; }
  .storefront-visual { min-height: 390px; padding-top: 90px; }
  .sok-wordmark { top: 10px; width: 320px; }
  .hero-product { height: 300px; }
  .solution-grid { grid-template-columns: repeat(2,1fr); }
  .sok-feature-grid, .logistics-grid, .project-grid { grid-template-columns: 1fr; }
  .sok-feature-grid { max-width: 820px; }
  .logistics-path { max-width: 820px; }
}

@media (max-width: 680px) {
  .shell-width { width: min(calc(100% - 28px), var(--max)); }
  .utility-bar { min-height: 42px; font-size: 10px; }
  .utility-inner { gap: 12px; }
  .utility-contact { gap: 12px; }
  .utility-contact a:last-child { display: none; }
  .site-header, .nav-row { min-height: 72px; }
  .brand { width: 172px; }
  .brand img { height: 50px; }
  .nav-row { grid-template-columns: 1fr auto; }
  .header-cta { display: none; }
  .primary-nav { top: 72px; }
  .storefront-hero { min-height: 0; }
  .storefront-grid { min-height: 0; }
  .storefront-copy { padding: 58px 0 24px; }
  .eyebrow { font-size: 11px; letter-spacing: .17em; }
  .storefront-hero h1 { font-size: clamp(48px, 14.5vw, 68px); }
  .storefront-hero h1 span { margin-top: 8px; font-size: .7em; }
  .storefront-lead { margin-top: 20px; font-size: 16px; line-height: 1.55; }
  .hero-actions { display: grid; gap: 10px; }
  .button { width: 100%; min-height: 54px; font-size: 14px; }
  .usecase-grid { grid-template-columns: 1fr 1fr; }
  .storefront-visual { min-height: 325px; grid-template-columns: 1fr 1fr; gap: 4px; padding: 72px 0 6px; }
  .sok-wordmark { top: 6px; width: 245px; }
  .hero-product { height: 210px; }
  .hero-product span { left: 2px; bottom: 2px; }
  .trust-strip { grid-template-columns: 1fr; }
  .trust-item { min-height: 76px; border-right: 0; border-bottom: 1px solid rgba(49,198,231,.16); padding-inline: 20px; }
  .trust-item::before { left: 20px; }
  .section { padding-block: 64px 70px; }
  .section-heading { align-items: start; flex-direction: column; }
  .section-heading h2, .sok-feature h2, .logistics-section h2, .project-section h2, .simple-page h1 { font-size: clamp(36px, 11vw, 52px); }
  .solution-grid { grid-template-columns: 1fr; }
  .solution-card { min-height: 180px; }
  .sok-feature, .logistics-section, .project-section { padding-block: 64px; }
  .sok-feature-copy { padding: 28px 24px; }
  .sok-feature-copy .button { width: 100%; }
  .product-image { min-height: 240px; }
  .logistics-path { grid-template-columns: 1fr; }
  .logistics-path > div { min-height: 145px; }
  .logistics-actions { display: grid; }
  .contact-card { padding: 20px; }
  .footer-grid { min-height: 0; padding-block: 46px; flex-direction: column; align-items: flex-start; }
  .footer-meta { text-align: left; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition-duration: .01ms !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; }
}
`;
