# Status Update Template

**Baseline:** `<current main SHA>`  
**Branch:** `<work branch>`  
**Candidate:** `<candidate SHA>`

## Changed
- concise scope summary

## Protected boundaries
- confirm product/pricing/inventory/checkout/PayPal/SOK/freight/lead-routing/bindings/secrets unchanged unless explicitly authorized

## Validation
- diff review
- JavaScript/static checks
- `npm run qa` when runner is available
- isolated preview when available

## Deployment
- management approval
- merge to current `main`
- production deploy from current `main`
- live smoke verification
- production receipt / new accepted baseline
