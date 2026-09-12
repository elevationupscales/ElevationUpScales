# ELEVATION UPSCALES — PUBLIC COPY CLEANUP WORK ORDER

**Date:** 2026-09-12
**Priority:** P0
**State:** ACTIVE / DEVELOPER + STOREFRONT CLEANUP

## OBJECTIVE

Remove internal operational, AI-generated, developer, supplier-feed, trust-gate and workflow language from public customer surfaces without changing the underlying business controls.

## EXECUTION ORDER

### 1. Universal Store
Remove or replace public phrases that explain internal catalog/source/trust/fulfillment logic.

Replace internal-facing status messaging with simple buyer language. Keep the actual eligibility logic intact.

Do not show `trust-review`, `quarantine`, `source`, `provenance`, `retail state`, `direct checkout state`, `supplier-backed catalog facts`, `questionable`, or equivalent internal terminology to customers.

### 2. Product Cards
Keep title, concise description, availability, price and actions.

Do not show internal inventory-source commentary such as `Supplier availability is validated before fulfillment` on every card.

Normalize raw supplier-feed titles and descriptions before public rendering. Remove `Highlights: 1...`, mechanically truncated feed text, duplicated brand names and malformed titles.

### 3. Homepage Outside Hero
Hero remains locked.

Clean only non-hero public copy contamination, including duplicated/broken headings and internal routing language.

### 4. Logistics + Brand Storefronts
Keep only customer-relevant shipping facts and actions. Internal review workflow stays internal.

### 5. Shopify
Preserve the separate purchase-friction P0. Customer-facing Shopify copy should be clean retail copy; Shop/checkout controls are handled by the Shopify purchase-path work order.

## GUARDS

- Do not weaken payment, shipping, supplier, stock or trust protections.
- Do not mass-publish products.
- Do not redesign the storefront.
- Do not touch protected homepage hero.
- Do not expose private supplier economics.
- Do not replace customer copy with another layer of operations jargon.

## QA

Before release, run a public-text scan across deployable customer files for likely internal terms including:

`trust`, `quarantine`, `provenance`, `source state`, `retail state`, `direct checkout state`, `controlled review`, `current path`, `supplier-backed`, `questionable`, `withheld`, `gate`, `workflow`, `baseline`, `incident`, `worktree`, `manager`, `worker`, `QA`, `staging`.

Every hit must be reviewed in context. Code identifiers/comments may remain; customer-visible strings must not.

Then verify the rendered public pages, not just source code.

## ACCEPTANCE

The public site reads like one company speaking to customers, not an internal operating system explaining itself.
