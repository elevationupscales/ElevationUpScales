# Elevation UpScales — Shopify Primary Domain State

**Date:** 2026-09-11  
**Owner:** Casey Young  
**Actor:** Company Operations Manager  
**Mode:** RUN / GIT FIRST / OBJECTIVE STATE RECONCILIATION  
**Starting main:** `e97d2d17920eefdf01a7d0c59671d915374930e0`  
**Status:** VERIFIED OS UPDATE / VEVOR STOREFRONT PASSWORD GATE PERSISTS

## Verified change

Shopify sent a settings-change notice confirming that the store primary Shopify domain was changed by **Casey young** from:

`elevation-upscales.myshopify.com`

to:

`ggwt0c-41.myshopify.com`

Source Gmail message ID:

`1a092ab5ea5f5af6`

This record treats the change as an owner-attributed Shopify settings update. It does **not** classify the change as a security incident.

## Connected Shopify verification

The current authorized Shopify connection resolves to the existing **Elevation Upscales** store and reports `ggwt0c-41.myshopify.com` as its current Shopify domain.

No Shopify setting was changed by Company Operations during this verification.

## Public storefront verification

An unauthenticated live fetch of:

`https://ggwt0c-41.myshopify.com`

redirected to:

`https://ggwt0c-41.myshopify.com/password`

Therefore the existing customer-facing Shopify Online Store password gate remains active after the primary-domain change.

## VEVOR routing impact

This is a state update to the existing VEVOR / Shopify activation Worktree, not a new onboarding task.

- VEVOR catalog/source work remains preserved.
- Do not recreate A-tier or B-tier product records.
- Do not recreate supplier qualification or fulfillment inquiries.
- The exact customer-facing blocker remains **Shopify Online Store password protection**.
- The new Shopify domain does not itself close public storefront/cart/checkout acceptance.
- When legitimate owner/admin access to the password setting is available, disable only the storefront password protection, save, then immediately re-run unauthenticated storefront/product/cart/checkout acceptance.
- Any B-tier publication-concurrency correction remains owned by the VEVOR Project Worktree and must not become a status-write race.

## Boundaries

This notice does not establish that Elevation's custom public domain changed. The Shopify notice proves only the `.myshopify.com` primary-domain change described above. Custom-domain/DNS state must be verified independently if needed.

No password, credential, recovery setting, payment setting, order, product, publication state or customer record was changed by this Operations reconciliation.

## Route

**OS UPDATE REQUIRED → VEVOR Project Operations Manager / VEVOR Specialist → incorporate the new Shopify domain into current Project state → preserve password gate as the exact blocker → continue all other safe VEVOR work → public acceptance test only after password trigger clears.**

## Control result

**PRIMARY SHOPIFY DOMAIN CHANGE VERIFIED → CONNECTED STORE MATCHES → PUBLIC PASSWORD GATE STILL ACTIVE → NO RESTART / NO DUPLICATE CATALOG WORK / NO SECURITY INCIDENT INFERRED.**
