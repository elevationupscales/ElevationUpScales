export const styles = `
:root {
  color-scheme: dark;
  --bg: #02070b;
  --bg-soft: #06111a;
  --panel: rgba(5, 19, 29, 0.82);
  --panel-strong: #071824;
  --line: rgba(30, 202, 255, 0.26);
  --cyan: #13c8ff;
  --cyan-strong: #00aef0;
  --white: #f7fbff;
  --muted: #a7bac8;
  --max: 1440px;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; background: var(--bg); }
body { margin: 0; min-width: 320px; background: var(--bg); color: var(--white); line-height: 1.5; }
a { color: inherit; text-decoration: none; }
button, a { -webkit-tap-highlight-color: transparent; }
.shell-width { width: min(calc(100% - 40px), var(--max)); margin-inline: auto; }
.skip-link { position: fixed; top: 10px; left: 10px; transform: translateY(-150%); z-index: 99; background: var(--white); color: #00111b; padding: 10px 14px; border-radius: 8px; }
.skip-link:focus { transform: none; }

.utility-bar { background: linear-gradient(90deg, #03131f, #07304a 45%, #03131f); border-bottom: 1px solid var(--line); font-size: 11px; letter-spacing: .12em; }
.utility-inner { min-height: 40px; display: flex; align-items: center; justify-content: space-between; gap: 20px; white-space: nowrap; overflow: hidden; }
.utility-inner a { color: #dff7ff; }

.site-header { position: sticky; top: 0; z-index: 40; background: rgba(2, 8, 13, .92); backdrop-filter: blur(18px); border-bottom: 1px solid rgba(80, 214, 255, .13); }
.nav-row { min-height: 76px; display: grid; grid-template-columns: auto 1fr auto; gap: 28px; align-items: center; }
.brand { display: inline-flex; flex-direction: column; line-height: .9; letter-spacing: .04em; }
.brand-primary { font-size: 22px; font-weight: 900; }
.brand-secondary { margin-top: 4px; color: var(--cyan); font-size: 19px; letter-spacing: .14em; font-weight: 600; }
.primary-nav { display: flex; justify-content: center; gap: 34px; font-size: 14px; font-weight: 700; }
.primary-nav a { color: #e9f5fb; opacity: .88; transition: color .2s ease, opacity .2s ease; }
.primary-nav a:hover, .primary-nav a:focus-visible { color: var(--cyan); opacity: 1; }
.nav-toggle { display: none; }

.button { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-height: 48px; padding: 0 20px; border-radius: 11px; font-weight: 800; border: 1px solid transparent; transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
.button:hover { transform: translateY(-1px); }
.button-primary { background: linear-gradient(135deg, #12c9ff, #039fe5); color: #00121d; box-shadow: 0 12px 38px rgba(0, 174, 240, .2); }
.button-outline { background: rgba(2, 14, 23, .52); border-color: rgba(19, 200, 255, .76); color: #eefaff; }
.button-outline:hover { border-color: #7ee7ff; box-shadow: 0 0 0 3px rgba(19, 200, 255, .08); }
.header-cta { min-height: 46px; padding-inline: 20px; }

.hero { position: relative; min-height: 710px; display: grid; align-items: stretch; overflow: hidden; background:
  radial-gradient(circle at 74% 26%, rgba(255, 201, 117, .18), transparent 26%),
  radial-gradient(circle at 72% 65%, rgba(9, 174, 220, .18), transparent 26%),
  linear-gradient(105deg, #02070c 0 18%, #061522 43%, #0a3140 66%, #07111a 100%);
}
.hero::before { content: ""; position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0, 5, 9, .92) 0%, rgba(1, 9, 14, .72) 34%, rgba(0, 9, 14, .22) 70%, rgba(0, 4, 8, .66) 100%); pointer-events: none; }
.hero-visual { position: absolute; inset: 0; opacity: .55; background:
  linear-gradient(160deg, transparent 0 42%, rgba(14, 63, 72, .7) 43% 56%, transparent 57%),
  linear-gradient(200deg, transparent 0 48%, rgba(0, 110, 139, .32) 49% 63%, transparent 64%),
  radial-gradient(ellipse at 68% 70%, rgba(17, 205, 240, .24) 0 13%, transparent 14%),
  repeating-linear-gradient(90deg, transparent 0 96px, rgba(26, 160, 188, .025) 97px 98px);
}
.hero-grid { position: relative; z-index: 2; display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(340px, .75fr); gap: 64px; align-items: center; padding-block: 90px 78px; }
.hero-copy { max-width: 760px; }
.eyebrow { margin: 0 0 16px; color: #73ddff; font-size: 12px; letter-spacing: .22em; font-weight: 800; }
.hero h1 { margin: 0; max-width: 760px; font-size: clamp(54px, 7vw, 104px); line-height: .9; letter-spacing: -.055em; }
.hero h1 span, .section-heading h2 span { color: var(--cyan); }
.hero-lead { max-width: 720px; margin: 26px 0 0; color: #d8e5ec; font-size: clamp(18px, 2vw, 25px); line-height: 1.45; }
.hero-actions { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 32px; }
.hero-meta { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 44px; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.hero-meta span { min-height: 58px; display: flex; align-items: center; padding: 12px 14px; border-right: 1px solid var(--line); color: #d4e7ef; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; }
.hero-meta span:nth-child(3n) { border-right: 0; }

.hero-panel { align-self: center; padding: 30px; border: 1px solid rgba(37, 212, 255, .28); border-radius: 24px; background: linear-gradient(180deg, rgba(7, 28, 42, .82), rgba(3, 13, 21, .88)); box-shadow: 0 30px 80px rgba(0, 0, 0, .42); backdrop-filter: blur(14px); }
.panel-kicker { color: var(--cyan); font-size: 11px; letter-spacing: .18em; font-weight: 800; }
.hero-panel h2 { margin: 10px 0 8px; font-size: 34px; line-height: 1.05; }
.hero-panel p { margin: 0; color: var(--muted); }
.hero-panel dl { margin: 24px 0 0; display: grid; gap: 10px; }
.hero-panel dl > div { display: grid; grid-template-columns: 90px 1fr; gap: 12px; padding-top: 10px; border-top: 1px solid rgba(81, 203, 235, .14); }
.hero-panel dt { color: var(--cyan); font-weight: 800; }
.hero-panel dd { margin: 0; color: #dce9ef; }

.trust-strip { border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); background: #04121c; }
.trust-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
.trust-grid > div { padding: 22px 26px; border-right: 1px solid var(--line); }
.trust-grid > div:last-child { border-right: 0; }
.trust-grid strong, .trust-grid span { display: block; }
.trust-grid strong { font-size: 13px; letter-spacing: .12em; }
.trust-grid span { margin-top: 4px; color: var(--muted); font-size: 13px; }

.section { padding-block: 78px 90px; }
.section-heading { display: grid; grid-template-columns: 1fr minmax(320px, .75fr); gap: 52px; align-items: end; margin-bottom: 34px; }
.section-heading h2, .vendor-band h2, .project-section h2, .simple-page h1 { margin: 0; font-size: clamp(38px, 5vw, 64px); line-height: 1; letter-spacing: -.04em; }
.section-copy, .vendor-band p, .project-section p { margin: 0; color: var(--muted); font-size: 16px; }
.solution-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.solution-card { position: relative; min-height: 250px; padding: 28px; border: 1px solid rgba(44, 191, 229, .18); border-radius: 16px; background: linear-gradient(145deg, rgba(10, 30, 42, .82), rgba(3, 13, 20, .96)); overflow: hidden; }
.solution-card::after { content: ""; position: absolute; inset: auto -50px -70px auto; width: 150px; height: 150px; border-radius: 50%; background: radial-gradient(circle, rgba(16, 197, 255, .18), transparent 70%); }
.solution-index { color: var(--cyan); font-size: 12px; font-weight: 800; letter-spacing: .18em; }
.solution-card h3 { margin: 36px 0 8px; font-size: 24px; }
.solution-card p { margin: 0 0 22px; color: var(--muted); }
.text-link { color: #7ce6ff; font-weight: 800; font-size: 14px; }

.vendor-band { padding-block: 72px; background: linear-gradient(90deg, #03101a, #071f2c 50%, #04111a); border-block: 1px solid var(--line); }
.vendor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
.vendor-band h2 { max-width: 720px; }
.vendor-band p { max-width: 620px; }

.project-section { padding-block: 88px; background: radial-gradient(circle at 15% 45%, rgba(0, 184, 240, .09), transparent 28%), var(--bg); }
.project-grid { display: grid; grid-template-columns: 1.4fr .6fr; gap: 70px; align-items: center; }
.project-section h2 { max-width: 800px; margin-bottom: 18px; }
.project-section p { max-width: 800px; }
.contact-card { display: grid; gap: 12px; padding: 24px; border: 1px solid var(--line); border-radius: 18px; background: rgba(6, 22, 33, .76); }

.site-footer { border-top: 1px solid var(--line); background: #01070b; }
.footer-grid { min-height: 180px; display: flex; align-items: center; justify-content: space-between; gap: 30px; }
.footer-brand { width: max-content; }
.footer-grid p { margin: 14px 0 0; color: var(--muted); font-size: 11px; letter-spacing: .18em; }
.footer-meta { display: grid; gap: 5px; text-align: right; color: #718b99; font-size: 12px; }
.simple-page { min-height: 70vh; padding-block: 100px; display: grid; align-content: center; justify-items: start; gap: 22px; }
.simple-page p { max-width: 760px; color: var(--muted); font-size: 18px; }

@media (max-width: 980px) {
  .utility-inner span:nth-child(2), .utility-inner span:nth-child(3) { display: none; }
  .nav-row { grid-template-columns: auto auto 1fr; }
  .nav-toggle { display: inline-flex; justify-self: end; background: transparent; color: var(--white); border: 1px solid var(--line); border-radius: 8px; padding: 8px 12px; }
  .primary-nav { display: none; position: absolute; top: 77px; left: 20px; right: 20px; flex-direction: column; gap: 0; padding: 10px; background: #04111a; border: 1px solid var(--line); border-radius: 14px; }
  .primary-nav[data-open="true"] { display: flex; }
  .primary-nav a { padding: 14px; }
  .header-cta { justify-self: end; }
  .hero-grid, .section-heading, .vendor-grid, .project-grid { grid-template-columns: 1fr; }
  .hero-grid { gap: 34px; }
  .hero-panel { max-width: 620px; }
  .solution-grid { grid-template-columns: repeat(2, 1fr); }
  .section-heading { align-items: start; }
}

@media (max-width: 680px) {
  .shell-width { width: min(calc(100% - 28px), var(--max)); }
  .utility-inner { justify-content: space-between; }
  .utility-inner span:first-child { font-size: 9px; }
  .nav-row { min-height: 68px; grid-template-columns: 1fr auto; gap: 12px; }
  .brand-primary { font-size: 18px; }
  .brand-secondary { font-size: 15px; }
  .header-cta { display: none; }
  .primary-nav { top: 69px; left: 14px; right: 14px; }
  .hero { min-height: 0; }
  .hero-grid { padding-block: 64px 56px; }
  .hero h1 { font-size: clamp(52px, 17vw, 78px); }
  .hero-lead { font-size: 18px; }
  .hero-actions { display: grid; }
  .hero-meta { grid-template-columns: repeat(2, 1fr); }
  .hero-meta span, .hero-meta span:nth-child(3n) { border-right: 1px solid var(--line); }
  .hero-meta span:nth-child(2n) { border-right: 0; }
  .hero-panel { padding: 24px; }
  .hero-panel h2 { font-size: 29px; }
  .trust-grid, .solution-grid { grid-template-columns: 1fr; }
  .trust-grid > div { border-right: 0; border-bottom: 1px solid var(--line); }
  .trust-grid > div:last-child { border-bottom: 0; }
  .section { padding-block: 60px 70px; }
  .solution-card { min-height: 220px; }
  .vendor-band, .project-section { padding-block: 62px; }
  .footer-grid { min-height: 220px; flex-direction: column; align-items: flex-start; justify-content: center; }
  .footer-meta { text-align: left; }
}
`;
