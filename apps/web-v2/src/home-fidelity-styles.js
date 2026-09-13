export const homeFidelityStyles = `
/* Owner-directed homepage fidelity layer. Presentation only; commerce authority remains elsewhere. */
.reference-storefront-home{
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
  --f-white-line:rgba(255,255,255,.09);
  --f-radius:7px;
  background:var(--f-bg);
  color:var(--f-text);
  color-scheme:dark;
}
.reference-storefront-home main{background:var(--f-bg)}
.reference-storefront-home .shell-width{width:min(1180px,calc(100% - 38px));margin-inline:auto}
.reference-storefront-home a{transition:border-color .18s ease,background .18s ease,color .18s ease,transform .18s ease}
.reference-storefront-home .eyebrow{margin:0 0 12px;color:var(--f-cyan)!important;font-size:.64rem!important;font-weight:900;letter-spacing:.17em;text-transform:uppercase}
.reference-storefront-home .text-link{color:#84e8fb;font-size:.72rem;font-weight:900;letter-spacing:.02em;text-transform:none;text-decoration:none}
.reference-storefront-home .text-link:hover{color:#fff}
.reference-storefront-home .button{min-height:44px;padding:10px 16px;border-radius:5px;font-size:.72rem;font-weight:900;letter-spacing:.01em;text-transform:uppercase;box-shadow:none}
.reference-storefront-home .button-primary{background:var(--f-cyan);border-color:var(--f-cyan);color:#001015}
.reference-storefront-home .button-primary:hover{filter:brightness(1.06);transform:translateY(-1px)}
.reference-storefront-home .button-outline{border:1px solid rgba(255,255,255,.28);background:rgba(1,10,14,.62);color:#fff}
.reference-storefront-home .button-outline:hover{border-color:var(--f-cyan);background:rgba(33,204,239,.07);color:#fff}

/* Utility bar + production header proportions. */
.reference-storefront-home .utility-bar{background:#010506;border-bottom:1px solid rgba(255,255,255,.055);color:#d8e6ea;font-size:.62rem;letter-spacing:.12em;text-transform:uppercase}
.reference-storefront-home .utility-inner{min-height:38px;display:flex;align-items:center;justify-content:space-between;gap:18px;width:100%}
.reference-storefront-home .utility-inner>*{white-space:nowrap}
.reference-storefront-home .utility-signal{font-weight:800;color:#eef6f8}
.reference-storefront-home .utility-inner>a{color:#c9d7dc;font-weight:800;text-decoration:none}
.reference-storefront-home .utility-applications{color:#eef6f8;font-weight:800}
.reference-storefront-home .utility-contact{display:flex;align-items:center;gap:20px;text-transform:none;letter-spacing:0}
.reference-storefront-home .utility-contact a{color:#eef6f8;text-decoration:none}
.reference-storefront-home .utility-inner a:hover{color:var(--f-cyan)}
.reference-storefront-home .site-header{position:sticky;top:0;z-index:80;background:rgba(2,7,10,.97);border-bottom:1px solid rgba(55,207,235,.16);box-shadow:0 10px 30px rgba(0,0,0,.24);backdrop-filter:blur(14px)}
.reference-storefront-home .nav-row{min-height:76px;display:flex;align-items:center;gap:20px}
.reference-storefront-home .brand{position:relative;display:block;width:235px;min-width:235px;max-width:235px;min-height:60px;overflow:hidden;text-decoration:none;flex:0 0 235px}
.reference-storefront-home .brand>img{display:block;width:100%;height:58px;object-fit:contain;object-position:left center;background:transparent}
.reference-storefront-home .primary-nav{display:flex;align-items:center;gap:1px;margin-left:auto}
.reference-storefront-home .nav-menu{position:relative}
.reference-storefront-home .nav-menu summary{min-height:44px;display:flex;align-items:center;gap:7px;padding:9px 8px;border-radius:5px;list-style:none;color:#d7e3e7;font-size:.68rem;font-weight:850;letter-spacing:.035em;text-transform:none;cursor:pointer;white-space:nowrap}
.reference-storefront-home .nav-menu summary::-webkit-details-marker{display:none}
.reference-storefront-home .nav-menu summary::marker{content:""}
.reference-storefront-home .nav-menu summary:hover,.reference-storefront-home .nav-menu[open]>summary,.reference-storefront-home .nav-menu[data-active="true"] summary{background:rgba(33,204,239,.08);color:#fff}
.reference-storefront-home .nav-caret{width:7px;height:7px;border-right:1.5px solid currentColor;border-bottom:1.5px solid currentColor;transform:translateY(-2px) rotate(45deg);transition:transform .18s ease}
.reference-storefront-home .nav-menu[open] .nav-caret{transform:translateY(2px) rotate(225deg)}
.reference-storefront-home .nav-dropdown{position:absolute;top:calc(100% + 9px);left:50%;width:285px;transform:translateX(-50%);display:grid;gap:3px;padding:8px;border:1px solid var(--f-line);border-radius:8px;background:#061419;box-shadow:0 20px 55px rgba(0,0,0,.48)}
.reference-storefront-home .nav-menu:last-child .nav-dropdown{left:auto;right:0;transform:none}
.reference-storefront-home .nav-dropdown a{display:block;padding:11px 12px;border-radius:5px;color:#fff;text-decoration:none}
.reference-storefront-home .nav-dropdown a:hover{background:rgba(33,204,239,.07)}
.reference-storefront-home .nav-dropdown strong,.reference-storefront-home .nav-dropdown small{display:block}
.reference-storefront-home .nav-dropdown strong{font-size:.72rem}.reference-storefront-home .nav-dropdown small{margin-top:3px;color:#94aab2;font-size:.62rem;line-height:1.3}
.reference-storefront-home .header-search{width:235px;height:43px;display:grid;grid-template-columns:1fr 42px;overflow:hidden;border:1px solid #16b9df;border-radius:24px;background:#07131a;flex:0 0 235px}
.reference-storefront-home .header-search input{min-width:0;padding:0 0 0 15px;border:0;outline:0;color:#edf8fb;background:transparent;font-size:.72rem}
.reference-storefront-home .header-search input::placeholder{color:#90a7b2}
.reference-storefront-home .header-search button{border:0;color:var(--f-cyan);background:transparent;font-size:1.4rem;cursor:pointer}
.reference-storefront-home .header-cta{min-height:44px;padding-inline:17px;white-space:nowrap;flex:0 0 auto}
.reference-storefront-home .nav-toggle{display:none}

/* Flagship hero — production visual/copy composition. */
.reference-storefront-home .storefront-hero{position:relative;min-height:580px;overflow:hidden;background:#021017;border-bottom:1px solid rgba(55,207,235,.08)}
.reference-storefront-home .storefront-scene{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,5,9,.94) 0%,rgba(0,8,13,.84) 29%,rgba(2,15,23,.3) 58%,rgba(0,6,10,.42) 100%),linear-gradient(180deg,rgba(0,0,0,.01),rgba(0,6,10,.18) 64%,rgba(0,6,10,.78)),url('https://elevationupscales.com/assets/hero/storefront-tropical-logistics-v3.webp') center 44%/cover no-repeat}
.reference-storefront-home .storefront-grid{position:relative;z-index:2;min-height:580px;display:grid;grid-template-columns:minmax(0,1.02fr) minmax(310px,.98fr);gap:44px;align-items:stretch}
.reference-storefront-home .storefront-copy{display:flex;flex-direction:column;justify-content:center;padding:58px 0 40px;max-width:650px}
.reference-storefront-home .storefront-hero h1{margin:0;max-width:650px;color:#fff;font-size:clamp(3rem,4.65vw,4.7rem);line-height:.94;letter-spacing:-.04em;text-wrap:balance}
.reference-storefront-home .storefront-hero h1 span{display:block;margin-top:8px;color:#fff;font-size:1em;font-weight:760;letter-spacing:-.04em}
.reference-storefront-home .storefront-lead{max-width:590px;margin:18px 0 0;color:#e8f3f7;font-size:.98rem;line-height:1.55;font-weight:650}
.reference-storefront-home .hero-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:21px}
.reference-storefront-home .storefront-copy>.hero-actions .button{min-height:52px;padding-inline:28px;font-size:.78rem}
.reference-storefront-home .usecase-grid{width:min(650px,100%);display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-top:22px}
.reference-storefront-home .usecase-grid a{min-height:58px;display:flex;align-items:flex-start;justify-content:center;padding:10px 12px;border:1px solid rgba(5,199,242,.22);border-radius:7px;background:rgba(2,14,20,.46);color:#f4fafc;text-align:center;font-size:.63rem;line-height:1.2;font-weight:850;letter-spacing:.055em;text-transform:uppercase;text-decoration:none}
.reference-storefront-home .usecase-grid a:hover{border-color:rgba(5,199,242,.62);background:rgba(5,199,242,.08);transform:translateY(-1px)}
.reference-storefront-home .storefront-visual{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-rows:1fr;align-items:end;gap:18px;padding:92px 10px 8px}
.reference-storefront-home .sok-wordmark{position:absolute;top:-8px;left:50%;width:min(470px,60%);transform:translateX(-50%);filter:drop-shadow(0 10px 22px rgba(0,0,0,.35));isolation:isolate}
.reference-storefront-home .hero-product{position:relative;width:100%;height:300px;display:flex;align-items:flex-end;justify-content:center;text-decoration:none}
.reference-storefront-home .hero-product img{width:100%;height:100%;object-fit:contain;object-position:center bottom;filter:drop-shadow(0 22px 28px rgba(0,0,0,.5))}
.reference-storefront-home .hero-product-48 img{height:145px;margin-bottom:42px;object-fit:contain;object-position:center}
.reference-storefront-home .hero-product span{position:absolute;left:18px;right:18px;bottom:2px;display:grid;gap:2px;padding:8px 10px;border:1px solid rgba(33,204,239,.35);border-radius:5px;background:rgba(0,7,11,.82);text-align:center}
.reference-storefront-home .hero-product b{color:var(--f-cyan);font-size:.7rem;letter-spacing:.08em}.reference-storefront-home .hero-product small{color:#e7f0f3;font-size:.62rem}

/* Trust strip. */
.reference-storefront-home .trust-strip{display:grid;grid-template-columns:repeat(3,1fr);background:#03131d;border-block:1px solid rgba(49,198,231,.2)}
.reference-storefront-home .trust-item{position:relative;min-height:78px;display:flex;flex-direction:column;justify-content:flex-start;gap:0;padding:17px 34px;border-right:1px solid rgba(5,199,242,.16);background:linear-gradient(180deg,rgba(5,199,242,.025),transparent);text-decoration:none}
.reference-storefront-home .trust-item:last-child{border-right:0}.reference-storefront-home .trust-item::before{content:"";position:absolute;top:0;left:34px;width:46px;height:2px;background:var(--f-cyan);opacity:.8}
.reference-storefront-home .trust-item strong{color:#fff;font-size:.82rem;letter-spacing:.07em}.reference-storefront-home .trust-item span{margin-top:5px;color:#adc3cd;font-size:.7rem}
.reference-storefront-home a.trust-item:hover strong{color:var(--f-cyan)}

/* Shared homepage section system. */
.reference-storefront-home .section{padding:58px 0}
.reference-storefront-home .section-heading{display:flex;align-items:end;justify-content:space-between;gap:26px;margin-bottom:21px}
.reference-storefront-home .section-heading h2,.reference-storefront-home .sok-feature h2,.reference-storefront-home .logistics-section h2,.reference-storefront-home .home-commerce h2,.reference-storefront-home .solar-feature-copy h2,.reference-storefront-home .services-head h2{margin:0;color:#fff;font-size:clamp(1.8rem,3.4vw,2.8rem);line-height:1.02;letter-spacing:-.035em}
.reference-storefront-home .section-heading h2 span{color:var(--f-cyan)}
.reference-storefront-home .section-link{white-space:nowrap}

/* Shop by solution. */
.reference-storefront-home .solutions-section{padding-top:58px}
.reference-storefront-home .solution-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.reference-storefront-home .solution-card{position:relative;min-height:180px;display:flex;flex-direction:column;padding:20px;border:1px solid var(--f-line);border-radius:6px;background:#061923}
.reference-storefront-home .solution-card:nth-child(1),.reference-storefront-home .solution-card:nth-child(4),.reference-storefront-home .solution-card:nth-child(7){background:#071f2b}
.reference-storefront-home .solution-card h3{margin:0 0 9px;color:#fff;font-size:1rem;line-height:1.08;text-transform:uppercase}
.reference-storefront-home .solution-card p{flex:1;margin:0 0 17px;color:var(--f-muted-2);font-size:.78rem;line-height:1.45}
.reference-storefront-home .solution-card .text-link{width:max-content;padding:8px 10px;border:1px solid rgba(5,199,242,.35);border-radius:6px;color:#eafaff}

/* Featured SOK — heading band plus two horizontal product cards, as production. */
.reference-storefront-home .sok-feature{position:relative;padding:58px 0 64px;background:#031016;border-block:1px solid var(--f-line);overflow:hidden;isolation:isolate}
.reference-storefront-home .sok-feature::before{content:"";position:absolute;inset:0;z-index:-2;background:url('https://elevationupscales.com/assets/hero/storefront-tropical-logistics-v3.webp') center 46%/cover no-repeat;opacity:.14;filter:saturate(.7)}
.reference-storefront-home .sok-feature::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,rgba(2,10,14,.82),rgba(2,10,14,.93))}
.reference-storefront-home .sok-feature-head{display:flex;align-items:end;justify-content:space-between;gap:28px;margin-bottom:24px}
.reference-storefront-home .sok-feature-head>div{max-width:760px}
.reference-storefront-home .sok-feature-head h2{font-size:clamp(1.85rem,3.5vw,3rem);text-transform:uppercase}
.reference-storefront-home .sok-feature-head .eyebrow{margin:11px 0 7px}
.reference-storefront-home .sok-feature-head p:not(.eyebrow){margin:0;color:#c5d2d7;font-size:.86rem;line-height:1.5}
.reference-storefront-home .sok-feature-head>.button{min-width:190px}
.reference-storefront-home .sok-products-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.reference-storefront-home .product-card-horizontal{min-height:275px;display:grid;grid-template-columns:minmax(210px,.85fr) minmax(0,1.15fr);gap:0;padding:18px;border:1px solid rgba(33,204,239,.45);border-radius:8px;background:rgba(1,12,17,.88)}
.reference-storefront-home .product-card-horizontal .product-image{min-height:235px;display:grid;place-items:center;overflow:hidden;border-radius:5px;background:rgba(9,20,25,.86)}
.reference-storefront-home .product-card-horizontal .product-image img{width:100%;height:220px;object-fit:contain}
.reference-storefront-home .product-card-horizontal:nth-child(2) .product-image img{height:auto;max-height:140px;object-fit:contain}
.reference-storefront-home .product-card-copy{display:flex;flex-direction:column;justify-content:center;padding:18px 8px 18px 28px}
.reference-storefront-home .product-kicker{margin:0 0 12px;color:var(--f-cyan)!important;font-size:.64rem!important;font-weight:900;letter-spacing:.12em;text-transform:uppercase}
.reference-storefront-home .product-card h3{margin:0;color:#fff;font-size:1.35rem;line-height:1.08;text-transform:uppercase}.reference-storefront-home .product-card-copy>p:not(.product-kicker){margin:8px 0 0;color:var(--f-muted-2);font-size:.78rem}
.reference-storefront-home .product-actions{display:flex;flex-wrap:wrap;gap:0;margin-top:18px}.reference-storefront-home .product-actions .button{min-height:46px;padding:10px 22px;font-size:.7rem}

/* Freight / Hawaii / Alaska. */
.reference-storefront-home .logistics-section{position:relative;padding:72px 0;background:#061317;border-block:1px solid rgba(55,207,235,.08);overflow:hidden;isolation:isolate}
.reference-storefront-home .logistics-section::before{content:"";position:absolute;inset:0;z-index:-2;background:url('https://elevationupscales.com/assets/elevation-lithium-social-card.webp') center/cover no-repeat;opacity:.15;filter:saturate(.8);transform:scale(1.05)}
.reference-storefront-home .logistics-section::after{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,#041115 0%,rgba(4,17,21,.94) 55%,rgba(4,17,21,.78))}
.reference-storefront-home .logistics-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:52px;align-items:start}
.reference-storefront-home .logistics-copy h2{max-width:620px;font-size:clamp(2rem,3.5vw,3.15rem);line-height:1.03;text-transform:uppercase}
.reference-storefront-home .logistics-copy>p:not(.eyebrow){max-width:580px;color:#b8c8ce;font-size:.9rem;line-height:1.6}
.reference-storefront-home .logistics-path-inline{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:18px 0 0}
.reference-storefront-home .logistics-path-inline span{min-height:58px;display:flex;flex-direction:column;justify-content:center;padding:10px;border:1px solid rgba(33,204,239,.22);border-radius:5px;background:rgba(2,13,17,.72);color:#fff;font-size:.66rem;font-weight:850;text-transform:uppercase}
.reference-storefront-home .logistics-path-inline b{color:var(--f-cyan);font-size:.58rem;letter-spacing:.1em}.reference-storefront-home .logistics-path-inline small{margin-top:2px;color:#7f969f;font-size:.48rem;letter-spacing:.06em;text-transform:uppercase}
.reference-storefront-home .logistics-actions{display:flex;flex-wrap:wrap;gap:9px;margin-top:20px}.reference-storefront-home .logistics-actions .button{min-height:40px;padding:9px 14px;font-size:.66rem}
.reference-storefront-home .logistics-lanes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.reference-storefront-home .logistics-lanes article{padding:16px;border:1px solid var(--f-line);border-radius:6px;background:rgba(3,14,17,.76)}
.reference-storefront-home .logistics-lanes small{color:var(--f-cyan);font-size:.52rem;font-weight:900;letter-spacing:.12em}.reference-storefront-home .logistics-lanes h3{margin:6px 0 5px;color:#fff;font-size:.88rem}.reference-storefront-home .logistics-lanes p{margin:0;color:#9eb1b8;font-size:.72rem;line-height:1.48}

/* Shop the Store — production six-column merchandising density. */
.reference-storefront-home .home-commerce{padding:62px 0 72px;background:#02090d;border-top:1px solid rgba(55,207,235,.08)}
.reference-storefront-home .home-commerce-head{margin-bottom:28px}.reference-storefront-home .home-commerce-head>p:not(.eyebrow){max-width:720px;margin:7px 0 0;color:#9eb1b8;font-size:.82rem}
.reference-storefront-home .home-commerce-head h2{text-transform:uppercase;font-size:clamp(2rem,3.8vw,3.3rem)}
.reference-storefront-home .home-commerce-group+.home-commerce-group{margin-top:44px}
.reference-storefront-home .home-commerce-group-head{display:flex;align-items:center;justify-content:space-between;gap:24px;margin-bottom:16px}
.reference-storefront-home .home-commerce-group-head h3{margin:0;color:#fff;font-size:1.45rem;line-height:1;text-transform:uppercase;letter-spacing:.015em}
.reference-storefront-home .home-commerce-group-head>.product-actions{margin:0}.reference-storefront-home .home-commerce-group-head>.product-actions .button,.reference-storefront-home .home-commerce-group-head>.button{min-height:50px;padding:10px 22px}
.reference-storefront-home .home-product-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px}
.reference-storefront-home .home-product-card{min-width:0;display:flex;flex-direction:column;overflow:hidden;border:1px solid rgba(33,204,239,.29);border-radius:6px;background:#04151b}
.reference-storefront-home .home-product-card__image{height:185px;display:grid;place-items:center;overflow:hidden;background:#f1f3f3}
.reference-storefront-home .home-product-card__image img{width:100%;height:100%;object-fit:contain}
.reference-storefront-home .home-product-card__body{flex:1;display:flex;flex-direction:column;padding:12px}
.reference-storefront-home .home-product-card h4{margin:0;color:#fff;font-size:.88rem;line-height:1.2;text-transform:uppercase;letter-spacing:.015em}.reference-storefront-home .home-product-card h4 a{color:inherit;text-decoration:none}
.reference-storefront-home .home-product-card__body>p{min-height:34px;margin:7px 0 0;color:#a9bac0;font-size:.69rem;line-height:1.35}
.reference-storefront-home .home-product-card__authority-slot{height:32px;margin-top:auto}
.reference-storefront-home .home-product-card__actions{display:grid;grid-template-columns:1fr;gap:6px}.reference-storefront-home .home-product-card__actions .button{min-height:35px;padding:7px 8px;font-size:.62rem;text-align:center}

/* Solar system feature. */
.reference-storefront-home .solar-builder-section{background:#041015}
.reference-storefront-home .solar-feature-band{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:stretch}
.reference-storefront-home .solar-feature-media,.reference-storefront-home .solar-feature-copy{min-height:320px}
.reference-storefront-home .solar-feature-media{background:linear-gradient(0deg,rgba(1,8,12,.24),rgba(1,8,12,.12)),url('https://elevationupscales.com/assets/solar/solar-hero-desktop.webp') center/cover no-repeat;border:1px solid var(--f-line);border-radius:6px}
.reference-storefront-home .solar-feature-copy{display:flex;flex-direction:column;justify-content:center;padding:34px 38px;border:1px solid var(--f-line);border-radius:6px;background:linear-gradient(145deg,#071923,#041118)}
.reference-storefront-home .solar-feature-copy h2{font-size:clamp(1.75rem,3vw,2.7rem);line-height:1.05;text-transform:uppercase}
.reference-storefront-home .solar-feature-copy>p:not(.eyebrow){max-width:560px;margin:12px 0 0;color:#b8c8ce;font-size:.9rem;line-height:1.55}

/* Project & Field Support. */
.reference-storefront-home .services-section{padding:64px 0;background:linear-gradient(180deg,#04131a,#020b10)}
.reference-storefront-home .services-head{max-width:820px;margin-bottom:28px}.reference-storefront-home .services-head h2{text-transform:uppercase}.reference-storefront-home .services-head>p:not(.eyebrow){margin:9px 0 0;color:#aebfc5;font-size:.84rem}
.reference-storefront-home .support-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.reference-storefront-home .support-card{position:relative;min-height:205px;padding:24px;display:flex;flex-direction:column;border:1px solid rgba(5,199,242,.2);border-radius:6px;background:linear-gradient(145deg,#071923,#041118);overflow:hidden}
.reference-storefront-home .support-card::before{content:"";position:absolute;inset:0 auto 0 0;width:2px;background:linear-gradient(180deg,var(--f-cyan),transparent 72%)}
.reference-storefront-home .support-card small{color:var(--f-cyan);font-size:.58rem;font-weight:900;letter-spacing:.12em}.reference-storefront-home .support-card h3{margin:7px 0 8px;color:#fff;font-size:1rem}.reference-storefront-home .support-card p{flex:1;margin:0;color:#9fb2b9;font-size:.76rem;line-height:1.5}.reference-storefront-home .support-card a{width:max-content;margin-top:10px;padding:8px 11px;border:1px solid rgba(5,199,242,.36);border-radius:6px;color:#eafaff;font-size:.7rem;text-decoration:none}.reference-storefront-home .support-card a:hover{border-color:var(--f-cyan);color:var(--f-cyan)}
.reference-storefront-home .marketplace-note{display:flex;align-items:center;justify-content:space-between;gap:22px;margin-top:16px;padding:14px 16px;border:1px solid rgba(255,255,255,.08);background:#020a0e;color:#aabcc3;font-size:.72rem}.reference-storefront-home .marketplace-note a{color:#84e8fb;font-weight:800;text-decoration:none}

/* Footer — production density, ordering and brand treatment. */
.reference-storefront-home .site-footer{padding:46px 0 24px;border-top:1px solid rgba(33,204,239,.2);background:#01070a;color:#d9e7ea}
.reference-storefront-home .fidelity-footer-grid{display:grid;grid-template-columns:1.45fr .75fr .85fr .85fr;gap:34px;align-items:start}
.reference-storefront-home .fidelity-footer-brand img{width:235px;height:78px;object-fit:contain;object-position:left center}.reference-storefront-home .fidelity-footer-brand strong{display:block;margin-top:12px;color:#fff;font-size:.78rem}.reference-storefront-home .fidelity-footer-brand p{margin:5px 0;color:#c4d2d7;font-size:.7rem}.reference-storefront-home .fidelity-footer-brand span{color:#8298a1;font-size:.62rem}
.reference-storefront-home .footer-link-group,.reference-storefront-home .footer-contact{display:grid;gap:9px}.reference-storefront-home .footer-link-group strong,.reference-storefront-home .footer-contact strong{margin-bottom:4px;color:#fff;font-size:.72rem;letter-spacing:.06em}.reference-storefront-home .footer-link-group a,.reference-storefront-home .footer-contact a:not(.button){color:#b5c6cc;font-size:.7rem;text-decoration:none}.reference-storefront-home .footer-link-group a:hover,.reference-storefront-home .footer-contact a:hover{color:var(--f-cyan)}
.reference-storefront-home .footer-contact .button{width:max-content;margin-top:7px}.reference-storefront-home .copyright{grid-column:1/-1;margin:12px 0 0;padding-top:16px;border-top:1px solid rgba(255,255,255,.07);color:#8298a1;font-size:.62rem}

@media(max-width:1180px){
  .reference-storefront-home .utility-applications{display:none}
  .reference-storefront-home .brand{width:205px;min-width:205px;flex-basis:205px}.reference-storefront-home .brand>img{height:54px}
  .reference-storefront-home .primary-nav{gap:0}.reference-storefront-home .nav-menu summary{padding-inline:6px;font-size:.64rem}
  .reference-storefront-home .header-search{width:205px;flex-basis:205px}
  .reference-storefront-home .storefront-grid{grid-template-columns:1fr 1fr;gap:22px}
  .reference-storefront-home .home-product-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
}

@media(max-width:920px){
  .reference-storefront-home .utility-inner{min-height:32px;font-size:.55rem}.reference-storefront-home .utility-contact{display:none}
  .reference-storefront-home .nav-row{min-height:68px;display:grid;grid-template-columns:1fr auto}.reference-storefront-home .brand{width:190px;min-width:190px;max-width:190px;min-height:52px;flex-basis:auto}.reference-storefront-home .brand>img{height:50px}
  .reference-storefront-home .nav-toggle{display:grid;width:42px;height:42px;place-content:center;gap:5px;border:1px solid var(--f-line);border-radius:5px;background:#07131a}.reference-storefront-home .nav-toggle>span:not(.sr-only){display:block;width:20px;height:2px;background:#dce9ed}
  .reference-storefront-home .primary-nav{display:none;grid-column:1/-1;width:100%;margin:0;padding:10px 0}.reference-storefront-home .primary-nav[data-open="true"]{display:grid}.reference-storefront-home .nav-menu summary{font-size:.78rem}.reference-storefront-home .nav-dropdown{position:static;width:auto;transform:none;margin:0 0 6px;padding:5px;box-shadow:none}
  .reference-storefront-home .header-search{display:none}.reference-storefront-home .header-cta{display:none}
  .reference-storefront-home .storefront-grid{grid-template-columns:1fr;min-height:auto}.reference-storefront-home .storefront-copy{padding:54px 0 22px}.reference-storefront-home .storefront-visual{min-height:330px;padding:72px 2px 4px}.reference-storefront-home .sok-wordmark{top:-4px;width:245px}.reference-storefront-home .hero-product{height:190px}.reference-storefront-home .hero-product-48 img{height:100px;margin-bottom:30px}
  .reference-storefront-home .usecase-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
  .reference-storefront-home .solution-grid{grid-template-columns:repeat(2,1fr)}
  .reference-storefront-home .sok-products-grid{grid-template-columns:1fr}.reference-storefront-home .logistics-grid{grid-template-columns:1fr}.reference-storefront-home .solar-feature-band{grid-template-columns:1fr}.reference-storefront-home .support-grid{grid-template-columns:1fr}
  .reference-storefront-home .fidelity-footer-grid{grid-template-columns:1fr 1fr}
}

@media(max-width:680px){
  .reference-storefront-home .shell-width{width:min(100% - 28px,1180px)}
  .reference-storefront-home .utility-inner{justify-content:center}.reference-storefront-home .utility-signal,.reference-storefront-home .utility-applications{display:none}.reference-storefront-home .utility-inner>a{font-size:.52rem}
  .reference-storefront-home .site-header{position:sticky}.reference-storefront-home .nav-row{min-height:64px}
  .reference-storefront-home .storefront-hero{min-height:auto}.reference-storefront-home .storefront-hero h1{font-size:clamp(2.55rem,12vw,3.8rem)}.reference-storefront-home .storefront-lead{font-size:.88rem}.reference-storefront-home .storefront-copy>.hero-actions{display:grid;grid-template-columns:1fr}.reference-storefront-home .storefront-copy>.hero-actions .button{width:100%;text-align:center}.reference-storefront-home .usecase-grid{grid-template-columns:1fr 1fr}.reference-storefront-home .storefront-visual{min-height:320px;gap:8px;padding:72px 2px 4px}.reference-storefront-home .hero-product{height:190px}.reference-storefront-home .hero-product span{left:4px;right:4px}.reference-storefront-home .hero-product-48 img{height:85px;margin-bottom:42px}
  .reference-storefront-home .trust-strip{grid-template-columns:1fr}.reference-storefront-home .trust-item{min-height:66px;padding:14px 20px;border-right:0;border-bottom:1px solid rgba(5,199,242,.12)}.reference-storefront-home .trust-item::before{left:20px}
  .reference-storefront-home .section-heading,.reference-storefront-home .sok-feature-head,.reference-storefront-home .home-commerce-group-head{align-items:flex-start;flex-direction:column}.reference-storefront-home .section-heading h2,.reference-storefront-home .sok-feature h2,.reference-storefront-home .logistics-section h2,.reference-storefront-home .home-commerce h2,.reference-storefront-home .solar-feature-copy h2,.reference-storefront-home .services-head h2{font-size:clamp(1.8rem,9vw,2.55rem)}
  .reference-storefront-home .solution-grid{grid-template-columns:1fr}.reference-storefront-home .solution-card{min-height:150px}
  .reference-storefront-home .sok-feature{padding:48px 0}.reference-storefront-home .sok-feature-head>.button{width:100%}.reference-storefront-home .product-card-horizontal{grid-template-columns:1fr;min-height:auto}.reference-storefront-home .product-card-horizontal .product-image{min-height:220px}.reference-storefront-home .product-card-copy{padding:20px 6px 6px}
  .reference-storefront-home .logistics-section{padding:52px 0}.reference-storefront-home .logistics-path-inline{grid-template-columns:1fr 1fr}.reference-storefront-home .logistics-lanes{grid-template-columns:1fr}.reference-storefront-home .logistics-actions{display:grid}.reference-storefront-home .logistics-actions .button{width:100%;text-align:center}
  .reference-storefront-home .home-commerce{padding:48px 0}.reference-storefront-home .home-product-grid{grid-template-columns:1fr 1fr}.reference-storefront-home .home-product-card__image{height:155px}.reference-storefront-home .home-commerce-group-head>.product-actions{display:grid;width:100%}.reference-storefront-home .home-commerce-group-head>.product-actions .button,.reference-storefront-home .home-commerce-group-head>.button{width:100%;text-align:center}
  .reference-storefront-home .solar-feature-copy{padding:26px}.reference-storefront-home .solar-feature-media{min-height:230px}.reference-storefront-home .solar-feature-copy{min-height:auto}
  .reference-storefront-home .marketplace-note{align-items:flex-start;flex-direction:column}
  .reference-storefront-home .fidelity-footer-grid{grid-template-columns:1fr}.reference-storefront-home .copyright{grid-column:1}
}

@media(max-width:430px){
  .reference-storefront-home .home-product-grid{grid-template-columns:1fr}.reference-storefront-home .home-product-card__image{height:220px}
  .reference-storefront-home .usecase-grid{grid-template-columns:1fr 1fr}
}
`;
