export const sokProductMerchandisingStyles = `
/* Owner recovery: homepage hero keeps the production-faithful SOK presentation. */
.reference-storefront-home .sok-wordmark{
  content:url('https://elevationupscales.com/assets/brands/sok/sok-wordmark-home-transparent.webp?v=20260910-1');
}
.reference-storefront-home .hero-product-12 img{
  content:url('https://elevationupscales.com/assets/brands/sok/sk12v100pc/home-hero.webp?v=20260910-1');
}
.reference-storefront-home .hero-product-48 img{
  content:url('https://elevationupscales.com/assets/brands/sok/sk48v100n/home-crop.webp?v=20260910-1');
}

/* Store hero recovery uses the owner-reviewed RV + mountains + solar + technician scene. */
.store-hero{
  background-image:url('/assets/hero/store-rv-solar-technician-clean.webp')!important;
}

/* Product merchandising remains repository-localized and does not override hero composition. */
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
@media(max-width:680px){
  .reference-storefront-home .product-card-horizontal .product-image img,
  .reference-storefront-home .product-card-horizontal:nth-child(2) .product-image img{
    height:205px;
    padding:16px;
  }
}
`;
