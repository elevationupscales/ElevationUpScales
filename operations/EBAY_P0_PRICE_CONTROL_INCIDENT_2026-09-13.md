# Elevation UpScales — eBay P0 Price / Quantity Control Incident

**Date:** 2026-09-13 MDT  
**Owner:** Casey Young  
**Severity:** P0 — NEW LOSS-MAKING SALE EXPOSURE / APPROVED STOP-LOSS CONTROLS NOT FULLY EXECUTED  
**Lane:** eBay Store Operations  
**Reports To:** Peter Torres — Ecommerce & Vendor Operations Manager  

## Owner report

Casey reported another eBay sale on a listing whose price had never received the approved profitability correction.

At the first authenticated reread after the report, the newest posted Seller Hub order remained `02-15170-43443` (back-seat organizer), sold at the historical $24.33 price. Gmail and Seller Hub had not yet posted a newer paid/awaiting-payment order, so the newly observed sale is **PENDING RECEIPT IDENTIFICATION** until eBay propagates the order.

Do not invent an order ID or fulfillment state before the receipt appears.

## Control failure verified

The current worktree already approved these stop-new-loss controls:

- weed wacker `168634712408` → quantity zero;
- folding bed `168634722813` → quantity zero during customer recovery;
- spotlight `168631043193` → quantity zero;
- organizer `168634275726` → quantity zero pending exact landed cost.

Authenticated Seller Hub on 2026-09-13 shows:

| Listing | Price | Available qty | Control result |
|---|---:|---:|---|
| `168634712408` weed wacker | $49.98 | **1** | **FAIL — approved qty-zero control not executed** |
| `168634722813` folding bed | $65.00 | **1** | **FAIL — approved qty-zero control not executed** |
| `168631043193` spotlight | $34.98 | **1** | **FAIL — approved qty-zero control not executed** |
| `168634275726` organizer | $24.33 | **0** | PASS — new sales blocked |

The failure is therefore not merely a stale price. It is an execution/receipt failure: previously approved stop-loss mutations remained open while the listings stayed purchasable.

## Phase 1 failed-economics batch — live exposure reread

The Sep. 11 Phase 1 screen established that 9/9 matched candidates fail the 30% pre-fee operating floor at the then-current price. The Sep. 13 authenticated reread shows most of those failed configurations are still active and purchasable at their old price:

| Listing / SKU | Live price | Qty | Approved disposition |
|---|---:|---:|---|
| `168631001484` / `D01027HHGCG` portable 5-gal fuel container | $65.00 | **1** | END / HOLD |
| `168631006501` / `D01027HX25W` metal fuel can | $46.76 | 0 | END / REBUILD |
| `168631036536` / `D0102HRMZW6` greenhouse | $134.55 | **1** | END / HOLD |
| `168631041650` / `D0102HHVH7A` 3x3m tent | $35.98 | **1** | END / REBUILD |
| `168633901217` / `D01027RSVIP` ATV cargo box | $265.99 | **1** | END / HOLD |
| `168634183922` / `D0102HQ4SWG` car refrigerator | $350.00 | **1** | END / REBUILD |
| `168634342983` / `D0102HS0G3P` camping lantern | $14.77 | **1** | END / HOLD |
| `168634908211` / `D01027RQ3N2` 6000W inverter | $499.00 | **1** | END / HOLD |
| `168639989005` / `D010277UEBX` battery box | $52.55 | **1** | END / REBUILD |

**8 of these 9 failed-screen configurations remain purchasable.**

Additional known weak/unverified configurations still purchasable:

- boot dryer `168633017846` — $17.89 / qty 1; conservative historical landed cost requires at least $20.00 for the 30% pre-fee screen and final contribution still must clear eBay fees;
- RV screen protector `168633285491` — $37.66 / qty 1; known best Doba path requires about $46.24 for the 30% pre-fee screen;
- lawn sweeper `168637439895` — $75.50 / qty 1; historical landed cost requires about $90.51 for the 30% pre-fee screen;
- camping fan `168647434992` — $46.85 / qty 1; exact source/cost remains unverified, so it is HOLD / VERIFY rather than an approved core listing.

## Immediate emergency control

**STOP NEW LOSS EXPOSURE BEFORE PRICE OPTIMIZATION.**

Until exact source + current landed cost + MAP + destination + expected contribution are verified, set available quantity to **0** on every known failed/uncontrolled configuration listed above that currently has qty 1. Preserve the listing/history; do not mass-delete merely to stop sales.

First priority manual mutation set:

`168634712408`, `168634722813`, `168631043193`, `168631001484`, `168631036536`, `168631041650`, `168633901217`, `168634183922`, `168634342983`, `168634908211`, `168639989005`, `168633017846`, `168633285491`, `168637439895`, `168647434992`.

The currently connected Opera Seller Hub surface is authenticated for read/navigation but does not expose a supported save/submit action. Therefore these mutations remain **ACTION SURFACE REQUIRED** until performed in Seller Hub and receipt-verified.

## New sale handling

When the new order receipt appears:

1. identify exact order + listing + SKU;
2. capture sale price, destination, ship-by date, payment state and whether tracking/supplier execution already exists;
3. verify exact source and current landed cost before placing any supplier order;
4. never cancel a verified shipped order;
5. if unshipped and economics/source fail, follow the customer-recovery path rather than creating another knowingly negative rescue fulfillment;
6. freeze that listing at qty 0 until the corrected configuration is receipt-verified.

## Management control

This incident supersedes any assumption that approved eBay contraction/price controls were already executed merely because they were recorded in Git.

**RECORDED DECISION ≠ SELLER HUB MUTATION.**

Every eBay price/quantity/end control now requires a live Seller Hub reread showing the resulting price/quantity/state before it may be marked complete.

## Control phrase

**STOP THE SALE EXPOSURE → IDENTIFY THE NEW ORDER → PROTECT THE CUSTOMER → VERIFY SOURCE + LANDED COST → CORRECT PRICE → RECEIPT-VERIFY SELLER HUB → ONLY THEN REOPEN QUANTITY.**
