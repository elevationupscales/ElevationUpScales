# Hawaii Freight Chatbot / Shipping Assistant — Isolated Foundation

Work ID: `HAWAII-FREIGHT-BOT-0905-01`

## Status

Foundation prototype only. **Not a public website feature.** No production API route, customer persistence, carrier integration, quoting, payment, supplier PO, Cloudflare binding, or deployment workflow is included.

## Customer-first flow

`PRODUCT / SKU → QUANTITY → DESTINATION → CONTACT → ROUTING RESULT → HUMAN FOLLOW-UP WHERE NEEDED`

The first conversation collects only information that is useful for routing:

- product/SKU (may be supplied by page context later)
- quantity
- destination ZIP/state
- Hawaii island/destination area when it changes routing
- customer name
- email OR phone
- optional notes

The prototype intentionally does not begin by asking for company, use case, pallet details, hazmat paperwork, packaging dimensions, carrier preference, or other internal logistics details.

## Routing rules currently encoded

- Hawaii quantity 1–3 → controlled Hawaii purchase-options/freight-intake path.
- Hawaii quantity 4+ → `COMMERCIAL_REVIEW` with customer-safe `Freight Review Required` language.
- Lower 48, Alaska and other destinations remain separate routing outcomes.
- Missing/unclear destination, stale/missing freight profile, firm-price requests, carrier/legal questions, used/damaged/defective product movement, packaging exceptions, pending-partnership dependencies, and unknown routing conditions fail closed to human review.
- The 4+ threshold is represented only as an Elevation operating control, never as a law or carrier rule.

## Public/private boundary

`routeIntake()` only returns the customer intake fields plus safe routing/audit data.

Reusable freight profiles deliberately separate:

- `public`: approved brand/model/specification/purchase-mode information
- `private`: supplier, dimensions/weights, documentation state, transport route, internal freight economics, internal notes
- `verification`: status/source/timestamps

`publicProfileView()` strips the private section before anything can reach a public-facing adapter. `assertNoPrivateLeak()` provides an additional test guard.

## Files

- `intake-engine.mjs` — normalization, minimum-field collection, deterministic routing and human handoff rules.
- `freight-profiles.mjs` — reusable freight-profile contract and public/private guard.
- `test-fixtures.mjs` — offline test cases for Hawaii 1/3/4+, Oahu/unknown-island, stale profiles, price/carrier questions, used-battery movement and Lower-48 separation.

## Running the isolated tests

```bash
node prototypes/hawaii-freight-bot/test-fixtures.mjs
```

No network access or secrets are required.

## Intended future adapter contract

A later, separately authorized website adapter can pass safe page context into `routeIntake()`:

```js
routeIntake({
  sku: pageProduct.sku,
  quantity: customer.quantity,
  destinationZip: customer.zip,
  destinationState: customer.state,
  hawaiiIsland: customer.island,
  customerName: customer.name,
  email: customer.email,
  phone: customer.phone,
});
```

The website adapter should render only `publicMessage`, safe intake data, and a routing label. It must not serialize private freight profiles into client state.

## Explicitly out of scope until Management opens implementation

- adding a chatbot widget to `elevationupscales.com`
- production API endpoints
- production database writes
- live freight quotes or carrier booking
- live inventory promises
- delivery-date promises
- dangerous-goods/legal determinations
- supplier PO creation
- payment integration
- automatic customer/carrier email
- production deployment changes

## Next foundation work

1. Add representative transcript fixtures with question-by-question conversational state.
2. Add a formal typed/schema contract without introducing unnecessary runtime dependencies.
3. Reconcile SK12V100PC and SK48V100N shipping profile facts into private fixtures with source/verification timestamps.
4. Add security tests that attempt to inject or surface private profile fields.
5. Prepare a website/backend integration contract for Management review, without implementing the public UI.
