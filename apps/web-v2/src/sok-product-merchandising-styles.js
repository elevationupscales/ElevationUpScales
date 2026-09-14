export const sokProductMerchandisingStyles = `
/* Issue #185 — clean official SOK product photography only. No commerce authority lives here. */
/* Product media is served from repository-localized Worker static assets; legacy supplier artwork remains outside this presentation lane. */
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
  background:url('/assets/hero/hawaii-ocean-freight.webp') center/cover no-repeat;
}
.reference-storefront-home .solar-feature-media{
  background:linear-gradient(0deg,rgba(1,8,12,.24),rgba(1,8,12,.12)),url('/assets/hero/store-rv-mountains.webp') center/cover no-repeat;
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
}
`;
