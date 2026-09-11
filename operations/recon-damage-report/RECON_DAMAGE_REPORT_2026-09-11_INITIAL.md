# Recon Damage Report — Initial Baseline

**Date:** 2026-09-11  
**Project:** Recon Damage Report  
**Status:** INITIAL PASS OPEN

## Finding 1 — Canonical board still carries retired Shopify storefront-password gate

- **Observed state:** `CURRENT_WORK_BOARD.md` still describes Shopify Online Store password protection as the current customer-facing VEVOR gate and requires disabling it before acceptance.
- **Expected/approved state:** Casey explicitly removed storefront password protection as a workflow/catalog integration blocker. Listings must be judged by whether they are active, viewable and purchasable through the intended Elevation sales path.
- **Severity:** MEDIUM
- **Classification:** STALE CONTROL — RECONCILE ONLY
- **Owning lane:** OS Project Manager / Universal Catalog
- **Repair:** update the canonical board and any current tailored workflow that still treats this password as a global blocker. Do not alter the password setting merely to satisfy the old control text.
- **Close condition:** no controlling work item stops catalog integration or sales solely because the standalone Shopify storefront remains password-protected.

## Finding 2 — Renogy board state understates completed Shopify staging

- **Observed state:** board still says `ZERO LIVE RENOGY PRODUCTS AT RECON` while the accepted overnight worktree created five Renogy Stage-01 Shopify DRAFT products and a Renogy smart collection.
- **Expected/approved state:** preserve those staged products and continue SKU-by-SKU activation behind MAP/orderability/media gates.
- **Severity:** MEDIUM
- **Classification:** STALE CONTROL — RECONCILE ONLY
- **Owning lane:** Renogy Project + OS board
- **Repair:** reconcile wording; do not recreate Stage-01 products.
- **Close condition:** project and board both show the five staged drafts as current state and route only activation work forward.

## Finding 3 — Homepage release row is stale after successful production catch-up

- **Observed state:** board still contains a `RELEASE READY` row saying PR #94 has not run in production.
- **Expected/approved state:** Owner RUN production release completed successfully; approved homepage/lithium presentation is live and protected from recreation.
- **Severity:** MEDIUM
- **Classification:** STALE CONTROL — RECONCILE ONLY
- **Owning lane:** OS Project Manager / Release
- **Repair:** close or replace stale row with production-complete evidence.
- **Close condition:** canonical board no longer routes PR #94 as pending release unless new live drift is proven.

## Finding 4 — PayPal/payment path still needs current verified activation proof

- **Observed state:** PayPal setup work is actively being attempted; Shopify API lacks the financial read scope needed to prove the configured payout provider from API alone.
- **Expected/approved state:** PayPal may support the customer-pay-first operating model after activation and checkout proof. Internal working-capital/order-value caps may be removed only after usable-funds behavior is verified. Supplier MAP/channel/legal controls remain independent.
- **Severity:** HIGH if checkout/payment unavailable; otherwise MEDIUM until verified.
- **Classification:** VERIFYING — ROUTE TO COMMERCE/PAYMENTS
- **Owning lane:** Commerce / Payments
- **Repair:** finish authorized PayPal setup, confirm checkout offers PayPal, confirm a valid settlement/usable-funds path without exposing financial credentials, then update operating rules.
- **Close condition:** live checkout payment path is proven and the applicable cash-flow rule is documented accurately.

## Finding 5 — VEVOR archive/security regression root fix must remain protected

- **Observed state:** prior generated VEVOR ZIP repeatedly tripped repository-wide credential/security scanning; generator was changed not to recreate the archive while preserving extracted readable assets.
- **Expected/approved state:** no generated archive recurrence; security scan remains green.
- **Severity:** HIGH if recurrence blocks all release QA.
- **Classification:** CLOSED — PROTECTED FROM RECREATION / WATCH
- **Owning lane:** Developer / VEVOR automation
- **Repair:** none unless archive recurs.
- **Close condition:** future worker generation and release QA remain archive-free and green.

## Initial priority

1. Reconcile stale canonical control text.
2. Finish/verify PayPal payment path in its own commerce lane.
3. Run universal-catalog state comparison after the control repair.
4. Continue regression watch without reopening already-closed release/security work.
