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

/* 2026-09-15 owner design-finish pass: unresolved supplier media must look intentional, never broken. */
.reference-storefront-home .home-product-card__image{
  position:relative;
  isolation:isolate;
  background:linear-gradient(145deg,#071c25,#031016)!important;
  border-bottom:1px solid rgba(33,212,255,.2);
}
.reference-storefront-home .home-product-card__image:has(img[src*="/assets/brands/sok/"]){
  background:#f3f5f5!important;
}
.reference-storefront-home .home-product-card__image[data-media-state="unavailable"]{
  background:linear-gradient(145deg,#0a2732,#041118)!important;
}
.reference-storefront-home .home-product-card__image[data-media-state="unavailable"]::before{
  content:"SUPPLIER MEDIA\A CATALOG VIEW";
  white-space:pre;
  position:absolute;
  inset:0;
  z-index:2;
  display:grid;
  place-content:center;
  text-align:center;
  color:#91bdca;
  font-size:.62rem;
  line-height:1.5;
  font-weight:900;
  letter-spacing:.14em;
}
.reference-storefront-home .home-product-card__image[data-media-state="unavailable"] img{
  display:none;
}

/* Catalog records with unverified photography collapse to a compact branded status panel. */
.catalog-card-media:has(.catalog-media-pending){
  height:112px!important;
  background:linear-gradient(145deg,#0b2630,#051319)!important;
  border-bottom:1px solid rgba(33,212,255,.22);
}
.catalog-card-media:has(.catalog-media-pending) .catalog-media-pending{
  color:#91bdca!important;
  padding:18px;
  box-sizing:border-box;
}
.catalog-card-media:has(.catalog-media-pending) .catalog-media-pending span{
  color:#56dfff;
}
.catalog-card-media:has(.catalog-media-pending) .catalog-media-pending strong{
  color:#d9edf2;
}

@media(max-width:680px){
  .reference-storefront-home .product-card-horizontal .product-image img,
  .reference-storefront-home .product-card-horizontal:nth-child(2) .product-image img{
    height:205px;
    padding:16px;
  }
  .catalog-card-media:has(.catalog-media-pending){height:104px!important}
}
`;