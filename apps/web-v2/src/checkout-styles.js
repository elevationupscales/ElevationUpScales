export const checkoutStyles = `
.checkout-layout{display:grid;grid-template-columns:minmax(260px,.8fr) minmax(0,1.4fr);gap:1.5rem;margin:2rem 0}.checkout-destination,.checkout-review{border:1px solid rgba(255,255,255,.14);border-radius:18px;background:rgba(4,18,24,.78);padding:1.2rem}.checkout-destination{display:grid;gap:1rem;align-content:start}.checkout-destination label{display:grid;gap:.4rem}.checkout-destination input{min-height:44px;border-radius:10px;border:1px solid rgba(255,255,255,.18);padding:.65rem .75rem}.checkout-destination button{min-height:44px;border-radius:10px;padding:.7rem 1rem}.checkout-help{opacity:.8;font-size:.92rem}.checkout-review{display:grid;gap:1rem}
@media (max-width:760px){.checkout-layout{grid-template-columns:1fr}}
`;
