export const homepageCloseoutStyles = `
/* Owner-approved final homepage visual closeout only.
   Scope: Solar & Off-Grid card media, freight visibility, footer brand collision. */

/* 1) Give the Solar & Off-Grid solution card a clearly readable verified local photo treatment. */
.reference-storefront-home .solution-card:nth-child(3){
  background:
    linear-gradient(180deg,rgba(2,9,13,.28) 0%,rgba(2,9,13,.56) 48%,rgba(2,9,13,.88) 100%),
    url('/assets/hero/store-rv-solar-technician-clean.webp') center 42%/cover no-repeat;
}

/* 2) Keep freight copy readable while making the existing ocean-freight photography visibly present. */
.reference-storefront-home .logistics-section::before{
  background:url('/assets/hero/hawaii-ocean-freight.webp') center 45%/cover no-repeat !important;
  opacity:.62 !important;
  filter:saturate(.96) contrast(1.06) brightness(1.03) !important;
  transform:scale(1.02) !important;
}
.reference-storefront-home .logistics-section::after{
  background:linear-gradient(90deg,rgba(4,17,21,.97) 0%,rgba(4,17,21,.84) 44%,rgba(4,17,21,.42) 72%,rgba(4,17,21,.14) 100%) !important;
}

/* 3) Remove the footer-block background wordmark that was colliding with footer copy.
      Restore the existing wordmark <img> as a bounded, normal-flow element instead. */
.reference-storefront-home .fidelity-footer-brand{
  background:none !important;
  display:grid;
  gap:10px;
  align-content:start;
  min-width:0;
}
.reference-storefront-home .fidelity-footer-brand>img{
  opacity:1 !important;
  display:block;
  width:235px !important;
  max-width:100%;
  height:auto !important;
  max-height:78px;
  object-fit:contain;
  object-position:left center;
}
.reference-storefront-home .fidelity-footer-brand>div{
  position:relative;
  z-index:1;
  min-width:0;
}

@media(max-width:680px){
  .reference-storefront-home .logistics-section::before{
    background-position:58% center !important;
    opacity:.5 !important;
  }
}
`;
