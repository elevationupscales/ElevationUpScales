export const homeFidelityStyles = `
/* Homepage fidelity layer. Scoped so store/cart/checkout architecture stays intact. */
.reference-storefront-home {
  --f-bg:#02070a;
  --f-bg-2:#061217;
  --f-panel:#07161b;
  --f-panel-2:#0a1d23;
  --f-text:#f7fbfc;
  --f-muted:#8fa5ae;
  --f-muted-2:#bac9ce;
  --f-cyan:#21ccef;
  --f-cyan-soft:#71e5f5;
  --f-line:rgba(55,207,235,.22);
  --f-line-strong:rgba(55,207,235,.48);
  --f-radius:7px;
  background:var(--f-bg);
  color:var(--f-text);
}
.reference-storefront-home main{background:var(--f-bg)}
.reference-storefront-home .shell-width{width:min(calc(100% - 62px),1700px);margin-inline:auto}
.reference-storefront-home .eyebrow{margin:0 0 17px;color:var(--f-cyan)!important;font-size:14px;font-weight:900;letter-spacing:.19em;text-transform:uppercase}
.reference-storefront-home .text-link{color:#84e8fb;font-size:13px;font-weight:900;letter-spacing:.03em;text-transform:uppercase;text-decoration:none}
.reference-storefront-home .text-link:hover{color:#fff}
.reference-storefront-home .button{min-height:58px;padding:0 28px;border-radius:5px;font-size:16px;font-weight:900;letter-spacing:.02em;text-transform:uppercase}
.reference-storefront-home .button-primary{background:var(--f-cyan);border-color:var(--f-cyan);color:#00121a}
.reference-storefront-home .button-outline{border:1px solid rgba(202,231,239,.34);background:rgba(1,8,12,.66);color:#fff}
.reference-storefront-home .button-outline:hover{border-color:var(--f-cyan);color:var(--f-cyan)}

/* Production utility/header rhythm */
.reference-storefront-home .utility-bar{min-height:57px;display:flex;align-items:center;background:#031923;border-bottom:1px solid rgba(49,198,231,.28);color:#edf8fb;font-size:14px;letter-spacing:.07em;text-transform:uppercase}
.reference-storefront-home .utility-inner{display:grid;grid-template-columns:1.1fr 1.15fr 1fr auto;gap:28px;align-items:center;width:100%}
.reference-storefront-home .utility-inner>*{white-space:nowrap}
.reference-storefront-home .utility-inner>a{text-align:center;font-weight:700}
.reference-storefront-home .utility-contact{display:flex;align-items:center;gap:28px;text-transform:none;letter-spacing:0}
.reference-storefront-home .utility-inner a:hover{color:var(--f-cyan)}
.reference-storefront-home .site-header{position:sticky;top:0;z-index:80;min-height:118px;background:rgba(1,8,12,.985);border-bottom:1px solid rgba(49,198,231,.18);box-shadow:0 10px 30px rgba(0,0,0,.24);backdrop-filter:blur(14px)}
.reference-storefront-home .nav-row{min-height:118px;display:grid;grid-template-columns:minmax(220px,270px) minmax(480px,1fr) minmax(270px,350px) auto;gap:28px;align-items:center}
.reference-storefront-home .brand{width:235px;display:flex;align-items:center;gap:11px;min-width:0;text-decoration:none}
.reference-storefront-home .brand>img{width:58px;height:58px;object-fit:contain;flex:0 0 auto}
.reference-storefront-home .brand-copy{display:grid;gap:4px;min-width:0}
.reference-storefront-home .brand-copy strong{color:#f5fbfd;font-size:16px;line-height:1.05;letter-spacing:.015em}
.reference-storefront-home .brand-copy small{color:#8da6b0;font-size:8px;line-height:1.2;letter-spacing:.12em;text-transform:uppercase;white-space:normal}
.reference-storefront-home .primary-nav{display:flex;align-items:center;justify-content:center;gap:clamp(18px,2.1vw,42px);width:max-content;justify-self:center}
.reference-storefront-home .nav-menu{position:relative}
.reference-storefront-home .nav-menu summary{min-height:46px;padding:0;display:flex;align-items:center;gap:10px;list-style:none;color:#dfe9ed;font-size:15px;font-weight:850;cursor:pointer;white-space:nowrap}
.reference-storefront-home .nav-menu summary::-webkit-details-marker{display:none}
.reference-storefront-home .nav-menu summary::marker{content:""}
.reference-storefront-home .nav-caret{width:9px;height:9px;border-right:2px solid currentColor;border-bottom:2px solid currentColor;transform:translateY(-2px) rotate(45deg);transition:transform .18s ease}
.reference-storefront-home .nav-menu[open] .nav-caret{transform:translateY(2px) rotate(225deg)}
.reference-storefront-home .nav-menu summary:hover,.reference-storefront-home .nav-menu[data-active="true"] summary{color:var(--f-cyan)}
.reference-storefront-home .nav-dropdown{position:absolute;top:calc(100% + 12px);left:50%;width:315px;transform:translateX(-50%);display:grid;gap:3px;padding:9px;border:1px solid var(--f-line);border-radius:8px;background:#061419;box-shadow:0 20px 55px rgba(0,0,0,.48)}
.reference-storefront-home .nav-dropdown a{display:block;padding:12px 13px;border-radius:5px;color:#fff;text-decoration:none}
.reference-storefront-home .nav-dropdown a:hover{background:rgba(33,204,239,.07)}
.reference-storefront-home .nav-dropdown strong,.reference-storefront-home .nav-dropdown small{display:block}
.reference-storefront-home .nav-dropdown strong{font-size:13px}.reference-storefront-home .nav-dropdown small{margin-top:3px;color:#94aab2;font-size:10px;line-height:1.3}
.reference-storefront-home .header-search{height:64px;display:grid;grid-template-columns:1fr 52px;overflow:hidden;border:1px solid #16b9df;border-radius:32px;background:#07131a}
.reference-storefront-home .header-search input{min-width:0;padding:0 0 0 22px;border:0;outline:0;color:#edf8fb;background:transparent;font-size:16px}
.reference-storefront-home .header-search input::placeholder{color:#90a7b2}
.reference-storefront-home .header-search button{border:0;color:var(--f-cyan);background:transparent;font-size:31px;cursor:pointer}
.reference-storefront-home .header-cta{min-height:66px;padding-inline:28px;white-space:nowrap}
.reference-storefront-home .nav-toggle{display:none}

/* Flagship hero */
.reference-storefront-home .storefront-hero{position:relative;min-height:690px;overflow:hidden;background:#021017}
.reference-storefront-home .storefront-scene{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,5,9,.94) 0%,rgba(0,8,13,.84) 29%,rgba(2,15,23,.3) 58%,rgba(0,6,10,.42) 100%),linear-gradient(180deg,rgba(0,0,0,.01),rgba(0,6,10,.18) 64%,rgba(0,6,10,.78)),url('https://elevationupscales.com/assets/hero/storefront-tropical-logistics-v3.webp') center 44%/cover no-repeat}
.reference-storefront-home .storefront-grid{position:relative;z-index:2;min-height:690px;display:grid;grid-template-columns:minmax(560px,.9fr) minmax(600px,1.1fr);gap:36px;align-items:stretch}
.reference-storefront-home .storefront-copy{display:flex;flex-direction:column;justify-content:center;padding:72px 0 50px;max-width:760px}
.reference-storefront-home .storefront-hero h1{margin:0;max-width:760px;color:#fff;font-size:clamp(54px,4.65vw,82px);line-height:.94;letter-spacing:-.04em}
.reference-storefront-home .storefront-hero h1 span{display:block;margin-top:8px;color:#fff;font-size:1em;font-weight:760;letter-spacing:-.04em}
.reference-storefront-home .storefront-lead{max-width:670px;margin:18px 0 0;color:#e8f3f7;font-size:17px;line-height:1.55;font-weight:650}
.reference-storefront-home .hero-actions{display:flex;flex-wrap:wrap;gap:20px;margin-top:25px}
.reference-storefront-home .usecase-grid{width:min(760px,100%);display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-top:22px}
.reference-storefront-home .usecase-grid a{min-height:58px;display:flex;align-items:center;justify-content:center;padding:10px 12px;border:1px solid rgba(5,199,242,.22);border-radius:7px;background:rgba(2,14,20,.46);color:#f4fafc;text-align:center;font-size:11px;line-height:1.2;font-weight:850;letter-spacing:.055em;text-transform:uppercase}
.reference-storefront-home .usecase-grid a:hover{border-color:rgba(5,199,242,.62);background:rgba(5,199,242,.08)}
.reference-storefront-home .storefront-visual{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:end;gap:18px;padding:92px 10px 8px}
.reference-storefront-home .sok-wordmark{position:absolute;top:20px;left:50%;width:min(470px,60%);transform:translateX(-50%);filter:drop-shadow(0 10px 22px rgba(0,0,0,.35))}
.reference-storefront-home .hero-product{position:relative;width:100%;height:300px;display:flex;align-items:flex-end;justify-content:center}
.reference-storefront-home .hero-product img{width:100%;height:100%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 22px 28px rgba(0,0,0,.5))}
.reference-storefront-home .hero-product span{position:absolute;left:18px;bottom:12px;display:grid;gap:1px;padding:7px 10px;background:rgba(0,7,11,.78);border-left:2px solid var(--f-cyan)}
.reference-storefront-home .hero-product b{font-size:13px}.reference-storefront-home .hero-product small{color:#b6cbd2;font-size:11px}

/* Trust strip */
.reference-storefront-home .trust-strip{display:grid;grid-template-columns:repeat(3,1fr);background:#03131d;border-block:1px solid rgba(49,198,231,.2)}
.reference-storefront-home .trust-item{position:relative;min-height:88px;display:flex;flex-direction:column;justify-content:center;padding:17px clamp(28px,4vw,70px);border-right:1px solid rgba(49,198,231,.18);text-decoration:none}
.reference-storefront-home .trust-item:last-child{border-right:0}.reference-storefront-home .trust-item::before{content:"";position:absolute;top:0;left:clamp(28px,4vw,70px);width:48px;height:2px;background:var(--f-cyan)}
.reference-storefront-home .trust-item strong{font-size:13px;letter-spacing:.08em}.reference-storefront-home .trust-item span{margin-top:6px;color:#abc0ca;font-size:12px}
.reference-storefront-home a.trust-item:hover strong{color:var(--f-cyan)}

/* Repeated section system */
.reference-storefront-home .section{padding-block:82px 92px}
.reference-storefront-home .section-heading{display:flex;align-items:end;justify-content:space-between;gap:34px;margin-bottom:34px}
.reference-storefront-home .section-heading h2,.reference-storefront-home .sok-feature h2,.reference-storefront-home .logistics-section h2,.reference-storefront-home .home-commerce h2,.reference-storefront-home .solar-feature-copy h2,.reference-storefront-home .services-head h2{margin:0;color:#fff;font-size:clamp(36px,3.7vw,60px);line-height:1;letter-spacing:-.04em}
.reference-storefront-home .section-heading h2 span{color:var(--f-cyan)}
.reference-storefront-home .section-link{white-space:nowrap}

/* Shop by solution */
.reference-storefront-home .solutions-section{padding-top:88px}
.reference-storefront-home .solution-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.reference-storefront-home .solution-card{position:relative;min-height:205px;display:flex;flex-direction:column;padding:28px;border:1px solid rgba(49,198,231,.2);background:#061923}
.reference-storefront-home .solution-card:nth-child(1),.reference-storefront-home .solution-card:nth-child(4),.reference-storefront-home .solution-card:nth-child(7){background:#071f2b}
.reference-storefront-home .solution-card h3{margin:0 0 12px;color:#fff;font-size:23px;line-height:1.05;text-transform:uppercase}
.reference-storefront-home .solution-card p{flex:1;margin:0 0 22px;color:var(--f-muted-2);font-size:15px;line-height:1.5}

/* Featured SOK */
.reference-storefront-home .sok-feature{padding-block:82px 92px;background:#04131a;border-block:1px solid var(--f-line)}
.reference-storefront-home .sok-feature-grid{display:grid;grid-template-columns:1fr .72fr .72fr;gap:22px;align-items:stretch}
.reference-storefront-home .sok-feature-copy{display:flex;flex-direction:column;justify-content:center;padding:40px;border-left:3px solid var(--f-cyan);background:#061923}
.reference-storefront-home .sok-feature-copy p:not(.eyebrow){max-width:620px;color:var(--f-muted-2);font-size:17px}.reference-storefront-home .sok-feature-copy .button{width:max-content;margin-top:16px}
.reference-storefront-home .product-card{display:flex;flex-direction:column;padding:24px;border:1px solid rgba(49,198,231,.19);background:#06151e}
.reference-storefront-home .product-image{min-height:280px;display:grid;place-items:center;background:#f4f5f5;overflow:hidden}
.reference-storefront-home .product-image img{width:100%;height:260px;object-fit:contain}.reference-storefront-home .product-kicker{margin:22px 0 8px;color:var(--f-cyan)!important;font-size:11px!important;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
.reference-storefront-home .product-card h3{margin:0;color:#fff;font-size:25px}.reference-storefront-home .product-card>p:not(.product-kicker){color:var(--f-muted-2)}
.reference-storefront-home .product-actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:auto;padding-top:12px}.reference-storefront-home .product-actions .button{min-height:42px;padding:0 14px;font-size:11px}

/* Freight */
.reference-storefront-home .logistics-section{position:relative;padding-block:92px;background:#061317;border-block:1px solid rgba(55,207,235,.08);overflow:hidden;isolation:isolate}
.reference-storefront-home .logistics-section::before{content:"";position:absolute;inset:0;z-index:-2;background:url('https://elevationupscales.com/assets/elevation-lithium-social-card.webp') center/cover no-repeat;opacity:.15;filter:saturate(.8);transform:scale(1.05)}
.reference-storefront-home .logistics-section::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,#041115 0%,rgba(4,17,21,.94) 55%,rgba(4,17,21,.78))}
.reference-storefront-home .logistics-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:52px;align-items:start}
.reference-storefront-home .logistics-copy>p:not(.eyebrow){max-width:680px;color:#b8c8ce;font-size:16px;line-height:1.6}
.reference-storefront-home .logistics-actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:20px}.reference-storefront-home .logistics-actions .button{min-height:48px;padding:0 17px;font-size:12px}
.reference-storefront-home .logistics-path-inline{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:22px}.reference-storefront-home .logistics-path-inline span{display:flex;flex-direction:column;gap:4px;padding:13px 12px;border:1px solid var(--f-line);background:rgba(3,14,17,.72);color:#dce8ec;font-size:11px;font-weight:850;text-transform:uppercase}.reference-storefront-home .logistics-path-inline b{color:var(--f-cyan);font-size:10px}
.reference-storefront-home .logistics-lanes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.reference-storefront-home .logistics-lanes article{padding:20px;border:1px solid var(--f-line);border-radius:6px;background:rgba(3,14,17,.76)}
.reference-storefront-home .logistics-lanes small{color:var(--f-cyan);font-size:11px;font-weight:900;letter-spacing:.12em}.reference-storefront-home .logistics-lanes h3{margin:7px 0 6px;color:#fff;font-size:18px}.reference-storefront-home .logistics-lanes p{margin:0;color:#9eb1b8;font-size:13px;line-height:1.48}

/* Production-sized product grid */
.reference-storefront-home .homepage-products{padding-bottom:76px}.reference-storefront-home .homepage-product-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:14px}
.reference-storefront-home .homepage-product-card{min-width:0;display:flex;flex-direction:column;border:1px solid var(--f-line);border-radius:6px;overflow:hidden;background:var(--f-panel)}
.reference-storefront-home .homepage-product-card:hover{border-color:var(--f-line-strong)}
.reference-storefront-home .homepage-product-card__media{height:218px;display:grid;place-items:center;overflow:hidden;background:#f1f4f3}.reference-storefront-home .homepage-product-card__media img{width:100%;height:100%;object-fit:contain;background:#f1f4f3}
.reference-storefront-home .homepage-product-card__body{display:flex;flex:1;flex-direction:column;padding:16px}.reference-storefront-home .homepage-product-card__body .product-kicker{margin:0 0 8px}.reference-storefront-home .homepage-product-card h3{margin:0 0 18px;color:#fff;font-size:15px;line-height:1.25}.reference-storefront-home .homepage-product-card h3 a{color:#fff}.reference-storefront-home .homepage-product-card .text-link{margin-top:auto;font-size:11px}

/* Shop the store */
.reference-storefront-home .home-commerce{padding:72px 0 78px;background:#02070a;border-top:1px solid rgba(255,255,255,.05)}
.reference-storefront-home .home-commerce-head{margin-bottom:28px}.reference-storefront-home .home-commerce-head>p:not(.eyebrow){color:var(--f-muted);font-size:14px}
.reference-storefront-home .home-commerce-group{padding:24px 0;border-top:1px solid rgba(255,255,255,.075)}.reference-storefront-home .home-commerce-group-head{display:flex;align-items:center;justify-content:space-between;gap:22px;margin-bottom:16px}.reference-storefront-home .home-commerce-group-head h3{margin:0;color:#fff;font-size:24px;text-transform:uppercase}
.reference-storefront-home .store-category-row{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.reference-storefront-home .store-category-card{position:relative;min-height:220px;display:flex;align-items:flex-end;overflow:hidden;border:1px solid var(--f-line);border-radius:7px;background:#07161b;isolation:isolate}
.reference-storefront-home .store-category-card::before{content:"";position:absolute;inset:0;z-index:-2;background-size:cover;background-position:center;filter:saturate(.9)}.reference-storefront-home .store-category-card::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(2,7,9,.05),rgba(2,7,9,.62) 48%,rgba(2,7,9,.97))}
.reference-storefront-home .store-category-sok::before{background-image:url('https://elevationupscales.com/assets/brands/sok/sk12v100pc/home-hero.webp');background-size:contain;background-repeat:no-repeat;background-color:#eef2f1}
.reference-storefront-home .store-category-lithium::before{background-image:url('https://elevationupscales.com/assets/hero/storefront-tropical-logistics-v3.webp')}.reference-storefront-home .store-category-rv::before{background-image:url('https://elevationupscales.com/assets/hero-galaxy-rv.webp')}.reference-storefront-home .store-category-gear::before{background-image:url('https://elevationupscales.com/assets/elevation-lithium-social-card.webp')}
.reference-storefront-home .store-category-card span{padding:19px 20px}.reference-storefront-home .store-category-card small,.reference-storefront-home .store-category-card strong,.reference-storefront-home .store-category-card em{display:block}.reference-storefront-home .store-category-card small{color:var(--f-cyan);font-size:10px;font-weight:900;letter-spacing:.12em}.reference-storefront-home .store-category-card strong{margin-top:5px;color:#fff;font-size:22px}.reference-storefront-home .store-category-card em{margin-top:4px;color:#b8c8ce;font-size:13px;font-style:normal}

/* Builder + services */
.reference-storefront-home .solar-builder-section{background:linear-gradient(180deg,#071318,#041014)}.reference-storefront-home .solar-feature-band{display:grid;grid-template-columns:1.12fr .88fr;gap:18px}.reference-storefront-home .solar-feature-media,.reference-storefront-home .solar-feature-copy{min-height:320px;border:1px solid var(--f-line);border-radius:7px;overflow:hidden}.reference-storefront-home .solar-feature-media{background:linear-gradient(180deg,rgba(0,0,0,.06),rgba(0,0,0,.45)),url('https://elevationupscales.com/assets/solar/solar-hero-desktop.webp') center/cover no-repeat}.reference-storefront-home .solar-feature-copy{display:flex;flex-direction:column;justify-content:center;padding:34px 38px;background:linear-gradient(145deg,#071923,#041118)}.reference-storefront-home .solar-feature-copy p:not(.eyebrow){max-width:560px;color:#aebfc5;font-size:15px;line-height:1.55}
.reference-storefront-home .services-section{padding:64px 0;background:linear-gradient(180deg,#04131a,#020b10)}.reference-storefront-home .services-head{max-width:820px;margin-bottom:28px}.reference-storefront-home .services-head>p:not(.eyebrow){color:#9fb1b8;font-size:15px}.reference-storefront-home .support-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.reference-storefront-home .support-card{position:relative;min-height:205px;padding:24px;display:flex;flex-direction:column;border:1px solid rgba(5,199,242,.2);border-radius:6px;background:linear-gradient(145deg,#071923,#041118)}.reference-storefront-home .support-card::before{content:"";position:absolute;inset:0 auto 0 0;width:2px;background:linear-gradient(180deg,var(--f-cyan),transparent 72%)}.reference-storefront-home .support-card small{color:var(--f-cyan);font-size:11px;font-weight:900;letter-spacing:.12em}.reference-storefront-home .support-card h3{margin:8px 0 4px;color:#fff;font-size:20px}.reference-storefront-home .support-card p{flex:1;color:#9fb1b8;font-size:14px;line-height:1.5}.reference-storefront-home .support-card a{width:max-content;margin-top:10px;padding:8px 11px;border:1px solid rgba(5,199,242,.36);border-radius:6px;color:#eafaff;font-size:12px;font-weight:850}.reference-storefront-home .support-card a:hover{border-color:var(--f-cyan);color:var(--f-cyan)}
.reference-storefront-home .marketplace-note{margin-top:34px;padding-top:20px;border-top:1px solid rgba(255,255,255,.07);display:flex;justify-content:space-between;gap:20px;align-items:center;color:#8297a0;font-size:13px}.reference-storefront-home .marketplace-note a{color:#aebfc5}.reference-storefront-home .marketplace-note a:hover{color:var(--f-cyan)}

/* Full production-style footer */
.reference-storefront-home .site-footer{background:#010506;border-top:1px solid rgba(55,207,235,.1);color:#879aa2}.reference-storefront-home .fidelity-footer-grid{position:relative;min-height:310px;display:grid;grid-template-columns:1.25fr .75fr .9fr .9fr;gap:44px;align-items:start;padding:56px 0 78px}.reference-storefront-home .fidelity-footer-brand{display:grid;grid-template-columns:80px 1fr;gap:16px;align-items:start}.reference-storefront-home .fidelity-footer-brand>img{width:80px;height:80px;object-fit:contain}.reference-storefront-home .fidelity-footer-brand strong{color:#fff;font-size:18px}.reference-storefront-home .fidelity-footer-brand p{margin:7px 0 3px;color:#aebfc5;font-size:12px}.reference-storefront-home .fidelity-footer-brand span{font-size:11px;color:#718891}.reference-storefront-home .footer-link-group,.reference-storefront-home .footer-contact{display:grid;gap:8px}.reference-storefront-home .footer-link-group>strong,.reference-storefront-home .footer-contact>strong{margin-bottom:3px;color:#fff;font-size:13px;text-transform:uppercase;letter-spacing:.08em}.reference-storefront-home .footer-link-group a,.reference-storefront-home .footer-contact a:not(.button){color:#aebfc5;font-size:12px}.reference-storefront-home .footer-link-group a:hover,.reference-storefront-home .footer-contact a:hover{color:var(--f-cyan)}.reference-storefront-home .footer-contact .button{min-height:42px;margin-top:8px;padding:0 14px;font-size:11px}.reference-storefront-home .copyright{position:absolute;left:0;right:0;bottom:24px;margin:0;color:#667d86;font-size:11px}

@media (max-width:1380px){
  .reference-storefront-home .utility-inner{grid-template-columns:1fr 1fr auto}.reference-storefront-home .utility-inner>span:nth-child(3){display:none}
  .reference-storefront-home .nav-row{grid-template-columns:190px 1fr 280px auto;gap:18px}.reference-storefront-home .brand{width:185px}.reference-storefront-home .brand-copy{display:none}.reference-storefront-home .primary-nav{gap:18px}.reference-storefront-home .nav-menu summary{font-size:13px}.reference-storefront-home .storefront-grid{grid-template-columns:minmax(500px,.92fr) minmax(460px,1.08fr)}
  .reference-storefront-home .homepage-product-grid{grid-template-columns:repeat(4,minmax(0,1fr))}
}
@media (max-width:1080px){
  .reference-storefront-home .utility-inner{grid-template-columns:1fr auto}.reference-storefront-home .utility-inner>a:nth-child(2){display:none}
  .reference-storefront-home .site-header{min-height:78px}.reference-storefront-home .nav-row{position:relative;min-height:78px;grid-template-columns:1fr auto auto;gap:14px}.reference-storefront-home .brand{width:auto}.reference-storefront-home .brand>img{width:54px;height:54px}.reference-storefront-home .brand-copy{display:grid}.reference-storefront-home .brand-copy small{display:none}.reference-storefront-home .nav-toggle{display:grid;width:48px;height:48px;padding:11px;border:1px solid var(--f-line);background:#061419;gap:5px;align-content:center}.reference-storefront-home .nav-toggle>span:not(.sr-only){display:block;height:2px;background:#eaf6f9}.reference-storefront-home .primary-nav{position:absolute;top:78px;left:0;right:0;display:none;width:auto;padding:10px;background:#03131d;border:1px solid var(--f-line);box-shadow:0 22px 50px rgba(0,0,0,.52)}.reference-storefront-home .primary-nav[data-open="true"]{display:grid}.reference-storefront-home .nav-menu{width:100%}.reference-storefront-home .nav-menu summary{min-height:50px;padding:0 14px;border-bottom:1px solid rgba(49,198,231,.12)}.reference-storefront-home .nav-caret{margin-left:auto}.reference-storefront-home .nav-dropdown{position:static;width:auto;transform:none;padding:0 8px 8px 24px;border:0;box-shadow:none}.reference-storefront-home .header-search{display:none}.reference-storefront-home .header-cta{min-height:50px;padding-inline:18px;font-size:13px}
  .reference-storefront-home .storefront-grid{grid-template-columns:1fr;gap:10px}.reference-storefront-home .storefront-copy{padding-bottom:10px}.reference-storefront-home .storefront-visual{min-height:390px;padding-top:70px}.reference-storefront-home .sok-wordmark{top:0}.reference-storefront-home .solution-grid{grid-template-columns:repeat(2,1fr)}.reference-storefront-home .sok-feature-grid{grid-template-columns:1fr 1fr}.reference-storefront-home .sok-feature-copy{grid-column:1/-1}.reference-storefront-home .logistics-grid{grid-template-columns:1fr}.reference-storefront-home .homepage-product-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.reference-storefront-home .solar-feature-band{grid-template-columns:1fr}.reference-storefront-home .support-grid{grid-template-columns:1fr}.reference-storefront-home .fidelity-footer-grid{grid-template-columns:1fr 1fr}
}
@media (max-width:680px){
  .reference-storefront-home .shell-width{width:min(calc(100% - 28px),1700px)}
  .reference-storefront-home .utility-bar{min-height:38px;font-size:9px}.reference-storefront-home .utility-inner{grid-template-columns:1fr auto;gap:10px}.reference-storefront-home .utility-contact{gap:10px}.reference-storefront-home .utility-contact a:last-child{display:none}
  .reference-storefront-home .nav-row{min-height:70px}.reference-storefront-home .primary-nav{top:70px}.reference-storefront-home .brand-copy strong{font-size:13px}.reference-storefront-home .brand>img{width:48px;height:48px}.reference-storefront-home .header-cta{display:none}
  .reference-storefront-home .storefront-hero{min-height:auto}.reference-storefront-home .storefront-grid{min-height:auto}.reference-storefront-home .storefront-copy{padding:50px 0 8px}.reference-storefront-home .storefront-hero h1{font-size:clamp(44px,13vw,64px)}.reference-storefront-home .storefront-lead{font-size:15px}.reference-storefront-home .hero-actions{display:grid;grid-template-columns:1fr;gap:10px}.reference-storefront-home .hero-actions .button{width:100%}.reference-storefront-home .usecase-grid{grid-template-columns:1fr 1fr}.reference-storefront-home .storefront-visual{min-height:320px;gap:8px;padding:72px 2px 4px}.reference-storefront-home .sok-wordmark{top:4px;width:245px}.reference-storefront-home .hero-product{height:190px}.reference-storefront-home .trust-strip{grid-template-columns:1fr}.reference-storefront-home .trust-item{min-height:74px;border-right:0;border-bottom:1px solid rgba(49,198,231,.13);padding:14px 20px}.reference-storefront-home .trust-item::before{left:20px}
  .reference-storefront-home .section{padding-block:54px}.reference-storefront-home .section-heading{align-items:flex-start;flex-direction:column;margin-bottom:24px}.reference-storefront-home .section-heading h2,.reference-storefront-home .sok-feature h2,.reference-storefront-home .logistics-section h2,.reference-storefront-home .home-commerce h2,.reference-storefront-home .solar-feature-copy h2,.reference-storefront-home .services-head h2{font-size:clamp(32px,10vw,44px)}.reference-storefront-home .solution-grid{grid-template-columns:1fr}.reference-storefront-home .solution-card{min-height:170px}.reference-storefront-home .sok-feature{padding-block:54px}.reference-storefront-home .sok-feature-grid{grid-template-columns:1fr}.reference-storefront-home .sok-feature-copy{grid-column:auto;padding:26px}.reference-storefront-home .product-image{min-height:230px}.reference-storefront-home .logistics-section{padding-block:56px}.reference-storefront-home .logistics-path-inline{grid-template-columns:repeat(2,1fr)}.reference-storefront-home .logistics-lanes{grid-template-columns:1fr}.reference-storefront-home .logistics-actions{display:grid}.reference-storefront-home .logistics-actions .button{width:100%}.reference-storefront-home .homepage-product-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.reference-storefront-home .homepage-product-card__media{height:170px}.reference-storefront-home .homepage-product-card h3{font-size:13px}.reference-storefront-home .home-commerce{padding:54px 0}.reference-storefront-home .home-commerce-group-head{align-items:flex-start;flex-direction:column}.reference-storefront-home .store-category-row{grid-template-columns:1fr}.reference-storefront-home .solar-feature-copy{padding:26px}.reference-storefront-home .solar-feature-media{min-height:230px}.reference-storefront-home .marketplace-note{align-items:flex-start;flex-direction:column}.reference-storefront-home .fidelity-footer-grid{grid-template-columns:1fr;gap:28px;padding:44px 0 84px}.reference-storefront-home .copyright{bottom:22px}
}
@media (max-width:430px){.reference-storefront-home .homepage-product-grid{grid-template-columns:1fr}.reference-storefront-home .utility-inner>span:first-child{font-size:8px}.reference-storefront-home .button{font-size:13px}}
`;
