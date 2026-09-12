# ELEVATION UPSCALES — OWNER DIRECTIVE: PUBLIC COPY FIREWALL

**Date:** 2026-09-12
**Owner:** Casey Young
**State:** ACTIVE / P0 TRUST CONTROL

## OWNER DIRECTION

Public Elevation UpScales surfaces must read like a customer-facing retail and service business.

Internal operating-system, developer, AI-generated, worker, QA, trust-gate, quarantine, source-state, routing-state, fulfillment-state, or implementation language must not be exposed as customer copy.

## HARD RULE

**PUBLIC PAGE = CUSTOMER LANGUAGE ONLY.**

The following concepts belong in admin, logs, code comments, tests, runbooks, worktrees, issue trackers, and internal dashboards — not public storefront copy:

- trust review / quarantine / withheld / guard language;
- source verification / source state / provenance language;
- internal routing or workflow terminology;
- "current path", "controlled review path", "retail state", "direct checkout state", "supplier-backed catalog facts", or similar implementation wording;
- statements about internal payment eligibility, fulfillment gating, inventory-source controls, or worker decisions;
- QA, staging, release, gate, incident, baseline, worktree, manager, worker, PM, or developer terminology;
- explanatory copy written to describe how the software decides what a customer may buy.

## PRODUCT COPY RULE

Supplier feeds may provide factual source material, but raw supplier titles/descriptions must not be treated as finished Elevation retail copy.

Before public presentation, customer-facing product content should be normalized for:

- clean human-readable title;
- concise product benefit/description;
- accurate brand/vendor identity;
- customer-relevant availability wording;
- price and purchase action;
- essential shipping or destination limitations only when they materially affect the buyer.

Do not expose supplier-feed metadata or operational disclaimers merely because the data exists.

## PUBLIC STATUS LANGUAGE

Allowed customer concepts are simple and commercial, for example:

- In Stock
- Available
- Backorder Available
- Ships Separately
- Freight Shipping
- Contact Us for Hawaii/Alaska Shipping
- Out of Stock
- Add to Cart
- Buy Now
- View Details

If an internal state cannot be translated into plain customer language confidently, fail closed by withholding the product/section rather than displaying internal logic.

## HOMEPAGE CONTROL

This directive does not unlock the protected homepage hero. Hero remains NO-TOUCH unless Casey explicitly unlocks it.

Customer-copy cleanup outside the protected hero is authorized where it removes internal/developer/AI-operational language without redesigning the page.

## ACCEPTANCE

A customer should never need to understand Elevation's internal software architecture, supplier-control model, Git workflow, QA process, catalog trust system, or fulfillment-routing logic in order to shop.

Control phrase:

**INTERNAL CONTROLS STAY INTERNAL → PUBLIC COPY SELLS, EXPLAINS, AND SUPPORTS THE CUSTOMER → NO AI/OPS/DEV VERBIAGE ON CUSTOMER SURFACES.**
