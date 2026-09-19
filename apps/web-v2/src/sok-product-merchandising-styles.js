export const sokProductMerchandisingStyles = `
/* Issue #185 — clean official SOK product photography only. No commerce authority lives here. */
/* Product media is served from repository-localized Worker static assets; legacy supplier artwork remains outside this presentation lane. */
.reference-storefront-home .brand,
.reference-footer .footer-brand-block{
  background-image:url('/assets/brand/elevation-wordmark.webp');
  background-repeat:no-repeat;
  background-position:left center;
  background-size:contain;
}
.reference-storefront-home .brand>img,
.reference-footer .footer-brand-block>img{
  opacity:0;
}
.reference-storefront-home .hero-product-12 img,
.reference-storefront-home .hero-product-48 img{
  width:calc(100% - 12px);
  height:220px;
  max-height:none;
  margin:0 0 50px;
  padding:14px;
  box-sizing:border-box;
  object-fit:contain;
  object-position:center;
  border:1px solid rgba(33,204,239,.22);
  border-radius:8px;
  background:#f3f5f5;
  filter:drop-shadow(0 18px 24px rgba(0,0,0,.38));
}
.reference-storefront-home .product-card-horizontal .product-image{
  background:#f3f5f5;
}
.reference-storefront-home .product-card-horizontal .product-image img,
.reference-storefront-home .product-card-horizontal:nth-child(2) .product-image img{
  width:100%;
  height:220px;
  max-height:none;
  padding:18px;
  box-sizing:border-box;
  object-fit:contain;
  object-position:center;
}
.reference-storefront-home .home-product-card__image img[src*="/assets/brands/sok/"]{
  padding:14px;
  box-sizing:border-box;
  object-fit:contain;
  object-position:center;
}
/* Image-closeout only: preserve the accepted e9cbaacc visual treatment while using repository-localized media in the existing background slots. */
.reference-storefront-home .storefront-scene{
  background:linear-gradient(90deg,rgba(0,5,9,.94) 0%,rgba(0,8,13,.84) 29%,rgba(2,15,23,.3) 58%,rgba(0,6,10,.42) 100%),linear-gradient(180deg,rgba(0,0,0,.01),rgba(0,6,10,.18) 64%,rgba(0,6,10,.78)),url('/assets/hero/home-tropical.webp') center 44%/cover no-repeat;
}
.reference-storefront-home .sok-feature::before{
  background:url('/assets/hero/home-tropical.webp') center 46%/cover no-repeat;
}
.reference-storefront-home .logistics-section::before{
  background:url('https://elevationupscales.com/assets/elevation-lithium-social-card.webp') center/cover no-repeat;
  opacity:.46;
  filter:saturate(.9) contrast(1.06);
  transform:scale(1.03);
}
.reference-storefront-home .logistics-section::after{
  background:linear-gradient(90deg,#041115 0%,rgba(4,17,21,.9) 48%,rgba(4,17,21,.38) 100%);
}
.reference-storefront-home .solar-feature-media{
  background:linear-gradient(0deg,rgba(1,8,12,.24),rgba(1,8,12,.12)),url('/assets/hero/store-rv-mountains.webp') center/cover no-repeat;
}
/* Exact product imagery that is not yet repository-localized is held in-place instead of showing broken or wrong-SKU media. */
.reference-storefront-home .home-product-card__image:has(img[src^="http"]){
  position:relative;
  display:grid;
  place-items:center;
  min-height:190px;
  overflow:hidden;
  background:radial-gradient(circle at 50% 38%,rgba(23,190,228,.12),transparent 38%),linear-gradient(145deg,#eef3f4,#dfe7e9);
}
.reference-storefront-home .home-product-card__image img[src^="http"]{
  display:none;
}
.reference-storefront-home .home-product-card__image:has(img[src^="http"])::before{
  content:"PRODUCT IMAGE";
  position:absolute;
  top:44%;
  left:50%;
  transform:translate(-50%,-50%);
  color:#315460;
  font-size:.69rem;
  font-weight:900;
  letter-spacing:.16em;
  white-space:nowrap;
}
.reference-storefront-home .home-product-card__image:has(img[src^="http"])::after{
  content:"VERIFICATION PENDING";
  position:absolute;
  top:56%;
  left:50%;
  transform:translate(-50%,-50%);
  color:#607985;
  font-size:.58rem;
  font-weight:800;
  letter-spacing:.1em;
  white-space:nowrap;
}

/* Catalog/store-only visual layer retained from the current Web V2 catalog. No homepage selectors below this line. */
.catalog-main{background:#02080b!important;color:#edf8fb!important;padding:0!important}
.catalog-shell{width:min(1440px,calc(100% - 48px))!important}
.catalog-utility{background:#04364c;color:#eefcff;font-size:.73rem;letter-spacing:.1em;text-transform:uppercase}
.catalog-utility .catalog-shell{min-height:38px;display:flex;align-items:center;justify-content:space-between;gap:18px}
.catalog-utility a{color:#fff}
.catalog-topnav{background:rgba(2,8,11,.98)!important;border-bottom:1px solid rgba(33,212,255,.2);position:relative;z-index:10}
.catalog-topnav .catalog-nav-inner{width:min(1440px,calc(100% - 48px))!important;min-height:82px!important}
.catalog-brand{width:245px;display:block!important;margin-right:8px!important}
.catalog-brand img{width:100%;height:62px;object-fit:contain}
.catalog-topnav nav{gap:12px!important}
.catalog-topnav nav a{font-size:.79rem!important}
.catalog-search{margin-left:auto;display:flex;align-items:center;width:min(320px,22vw);border:1px solid #0ebee8;border-radius:28px;overflow:hidden;background:#04131a}
.catalog-search input{min-width:0;width:100%;padding:11px 14px;background:none;border:0;color:white;outline:0}
.catalog-search button{border:0;background:none;color:#21d4ff;font-size:1.35rem;padding:6px 12px}
.catalog-cart-link,.catalog-project-link{color:#fff;text-decoration:none;font-weight:800}
.catalog-project-link{border:2px solid #0fd1ff;border-radius:9px;padding:12px 17px;color:#15d8ff!important}
.store-hero{position:relative;min-height:570px;display:flex;align-items:center;background:#02080b url('/assets/hero/store-rv-solar-technician-clean.webp') right center/auto 100% no-repeat}
.store-hero-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(2,8,11,.9) 0%,rgba(2,8,11,.67) 44%,rgba(2,8,11,.12) 75%)}
.store-hero-content{position:relative;z-index:2;padding:70px 0}
.store-eyebrow{color:#bdeeff!important;font-weight:850;letter-spacing:.2em;text-transform:uppercase}
.store-hero h1{max-width:820px;margin:12px 0 20px;font-size:clamp(3.1rem,6vw,6rem);line-height:.91;letter-spacing:-.05em;color:white}
.store-hero h1 span{color:#13cfff}
.store-hero-content>p:last-of-type{max-width:760px;color:#e6f2f5!important;font-size:1.2rem;line-height:1.55}
.store-hero-actions{display:flex;gap:14px;margin-top:25px}
.store-primary,.store-secondary{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 22px;border-radius:8px;font-weight:850;text-decoration:none}
.store-primary{background:#09bff4;color:white}
.store-secondary{border:2px solid #09bff4;color:white}
.store-trust{display:grid;grid-template-columns:repeat(4,1fr);background:#03141c;border-block:1px solid rgba(33,212,255,.3)}
.store-trust>div{display:flex;gap:12px;align-items:center;justify-content:center;padding:21px;border-right:1px solid rgba(33,212,255,.3)}
.store-trust>div:last-child{border-right:0}
.store-trust strong{font-size:1.4rem;color:#fff}
.store-trust span{display:flex;flex-direction:column}
.store-trust b{font-size:.92rem}
.store-trust small{color:#a9c5cf}
.store-content{padding:46px 0 70px}
.store-section-heading{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:18px}
.store-section-heading h2{margin:0;color:white;font-size:clamp(2rem,4vw,3.2rem)}
.store-section-heading h2 span{color:#15d8ff}
.store-section-heading p{color:#5fdfff;letter-spacing:.14em;font-weight:800}
.store-section-heading a{color:#15d8ff}
.store-category-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}
.store-category-card{min-height:210px;position:relative;overflow:hidden;border:1px solid rgba(33,212,255,.3);border-radius:10px;color:white;text-decoration:none;background:#07171d}
.store-category-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center}
.store-category-shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,8,11,.02) 25%,rgba(2,8,11,.8) 90%)}
.store-category-card strong{position:absolute;left:14px;bottom:14px;z-index:2;font-size:.96rem}
.store-category-icon-visual{position:absolute;inset:0;display:grid;place-items:center;background:radial-gradient(circle at 50% 40%,rgba(0,191,243,.17),rgba(3,20,28,.96) 62%,#06141a)}
.store-category-icon-visual .semantic-icon{width:78px;height:78px;color:#21d4ff;filter:drop-shadow(0 0 16px rgba(0,191,243,.16))}
/* Restore only the missing photo backgrounds behind the existing semantic icons. */
.store-category-card:nth-child(3) .store-category-icon-visual{background:linear-gradient(180deg,rgba(3,20,28,.34),rgba(3,20,28,.82)),url('/assets/hero/project-support.webp') center/cover no-repeat}
.store-category-card:nth-child(5) .store-category-icon-visual{background:linear-gradient(180deg,rgba(3,20,28,.34),rgba(3,20,28,.82)),url('/assets/hero/hawaii-ocean-freight.webp') center/cover no-repeat}
.store-category-card:nth-child(6) .store-category-icon-visual{background:linear-gradient(180deg,rgba(3,20,28,.34),rgba(3,20,28,.82)),url('/assets/hero/home-tropical.webp') center/cover no-repeat}
.store-featured,.dealer-trust,.full-catalog{margin-top:56px}
.catalog-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}
.catalog-featured-grid{grid-template-columns:repeat(3,minmax(0,1fr))!important}
.catalog-card{padding:0!important;overflow:hidden;background:#07171d!important;border-color:rgba(33,212,255,.3)!important;color:white}
.catalog-card-media{display:block;height:190px;background:#eef3f5;margin:0!important}
.catalog-card-media img{width:100%;height:100%;object-fit:contain;padding:18px;box-sizing:border-box}
.catalog-media-pending{height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:#4b6570;letter-spacing:.09em}
.catalog-media-pending span{font-size:.7rem}
.catalog-media-pending strong{font-size:.86rem}
.catalog-card-body{padding:18px;display:flex;flex-direction:column;gap:8px;min-height:230px}
.catalog-card h2{color:white!important;font-size:1.06rem}
.catalog-card .price{color:white!important}
.catalog-card .status{background:#283139!important;color:#dbe9ee!important}
.catalog-card a{color:#22d8ff!important}
.dealer-trust{padding:28px;border:1px solid rgba(33,212,255,.3);background:#f1f4f4;color:#06141a;text-align:center;border-radius:10px}
.dealer-trust>p{font-size:.72rem;letter-spacing:.18em;font-weight:900}
.dealer-trust>div{display:flex;justify-content:center;gap:60px;flex-wrap:wrap;font-size:1.45rem}
.catalog-filter a{background:#07171d!important;border-color:#244854!important;color:#d7edf3!important}
.catalog-filter a[aria-current="page"]{border-color:#11cdf8!important;color:white!important}
.catalog-empty{background:#07171d!important;border-color:#35505a!important;color:#b9cbd1!important}
.catalog-footer{background:#010608!important;border-top:1px solid rgba(33,212,255,.3);padding:35px 0!important}
.catalog-footer-brand{text-align:center;margin-bottom:22px}
.catalog-footer-brand img{width:280px;max-width:70vw}
.catalog-footer-brand p{letter-spacing:.18em;font-size:.72rem}
.catalog-footer .catalog-nav-inner{width:min(1180px,calc(100% - 2rem))!important;justify-content:center}
@media(max-width:1100px){
  .store-category-grid{grid-template-columns:repeat(3,1fr)}
  .catalog-topnav nav{display:none}
  .catalog-search{width:auto;flex:1}
  .catalog-featured-grid,.catalog-grid{grid-template-columns:repeat(2,1fr)!important}
}
@media(max-width:920px){
  .reference-storefront-home .hero-product-12 img,
  .reference-storefront-home .hero-product-48 img{
    height:150px;
    margin-bottom:34px;
    padding:10px;
  }
}
@media(max-width:680px){
  .reference-storefront-home .hero-product-12 img,
  .reference-storefront-home .hero-product-48 img{
    height:140px;
    margin-bottom:42px;
    padding:9px;
  }
  .reference-storefront-home .product-card-horizontal .product-image img,
  .reference-storefront-home .product-card-horizontal:nth-child(2) .product-image img{
    height:205px;
    padding:16px;
  }
  .catalog-shell{width:min(100% - 28px,1440px)!important}
  .catalog-utility .catalog-shell{font-size:.62rem;justify-content:center}
  .catalog-utility span,.catalog-utility a{display:none}
  .catalog-topnav .catalog-nav-inner{width:calc(100% - 28px)!important;min-height:72px!important;display:grid!important;grid-template-columns:1fr auto auto;gap:10px!important;padding:8px 0!important}
  .catalog-brand{width:160px}
  .catalog-brand img{height:52px}
  .catalog-search{grid-column:1/-1;grid-row:2;width:100%}
  .catalog-project-link{display:none}
  .store-hero{min-height:600px;background-size:auto 100%;background-position:62% center}
  .store-hero-overlay{background:linear-gradient(180deg,rgba(2,8,11,.75),rgba(2,8,11,.9))}
  .store-hero-content{padding:46px 0}
  .store-hero h1{font-size:3rem}
  .store-hero-content>p:last-of-type{font-size:1rem}
  .store-hero-actions{flex-direction:column;align-items:stretch}
  .store-trust{grid-template-columns:1fr 1fr}
  .store-trust>div{justify-content:flex-start;padding:14px}
  .store-category-grid{grid-template-columns:1fr 1fr}
  .store-category-card{min-height:180px}
  .catalog-featured-grid,.catalog-grid{grid-template-columns:1fr!important}
  .dealer-trust>div{gap:18px;font-size:1rem}
  .store-section-heading{align-items:flex-start;flex-direction:column}
  .catalog-card-media{height:210px}
}
@media(max-width:420px){
  .store-category-grid{grid-template-columns:1fr}
  .store-hero h1{font-size:2.65rem}
}
`;
