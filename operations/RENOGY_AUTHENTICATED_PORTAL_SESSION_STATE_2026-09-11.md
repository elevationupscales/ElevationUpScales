# Elevation UpScales — Renogy Authenticated Portal Session State

**Status:** ACTIVE / EXECUTION RESOURCE AVAILABLE / VERIFICATION PENDING  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Project:** Renogy Dealer / Catalog / Commerce Integration

## Owner-confirmed browser state

The Owner reports that the current browser session is logged into:

- Renogy Partner Portal;
- Doba;
- eBay.

This state changes execution readiness but does not by itself verify any SKU, inventory, order, price, account, or marketplace fact.

## Priority routing

### Renogy

The authenticated Renogy Partner Portal is now the next preferred source for resolving the remaining five-draft activation holds:

- exact current supplier item / generation for `RNG-INVT-2000-12V-P2-US`;
- exact current variant identity for `RNG-CTRL-RVR40`;
- current dealer orderability / availability for `RBC2125DS-21W-US` / mapped supplier item;
- current dealer orderability / availability for the uniquely mapped panel and battery-monitor launch candidates;
- exact product-media/spec references where the portal exposes them.

Do not change credentials, account settings, payment, tax, contact, address, order, cart, or security state as part of read-only verification.

### Doba and eBay

Authenticated sessions are available for their existing lanes, but under the current startup-revenue standard they remain **LOWER-PRIORITY PARALLEL** than direct Elevation website revenue activation and approved-vendor integration unless a safety, security, legal, financial, fraud, chargeback, account-suspension, or similarly material protected-risk exception appears.

Do not let ordinary Doba/eBay customer/order work displace Renogy/SOK/VEVOR/Kingboss direct-site catalog activation or first Elevation website PayPal order work.

## Current control

Authenticated session availability is an execution resource, not proof of completion.

**LOGIN AVAILABLE → READ-ONLY VERIFY → RECORD EXACT FACTS → HOLD ONLY AFFECTED ITEM → CONTINUE DIRECT-SITE REVENUE WORK.**
