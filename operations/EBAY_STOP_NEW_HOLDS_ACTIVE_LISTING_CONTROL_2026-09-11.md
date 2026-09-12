# Elevation UpScales — eBay Stop-New-Holds Active Listing Control

**Date:** 2026-09-11  
**Owner:** Casey Young  
**Priority:** P0 FINANCIAL RECOVERY  
**Parent:** `EBAY_CASH_RELEASE_BOARD_2026-09-11.md`  
**State:** ACTIVE / OWNER-SAFE TEMPORARY CONTROL

## Purpose

Prevent new eBay orders from the exact listings currently producing late, untracked, or uneconomic fulfillment exposure while preserving listing history, views, watchers, and the option to rebuild/reprice later.

This is **not** a mass-delete directive and does not conflict with the owner Doba-source rule. A valid Doba-backed product may remain an authorized source path, but a listing can still be temporarily quantity-controlled when its current economics or fulfillment execution are unsafe.

## Authenticated Seller Hub active-listing evidence

Seller Hub Active Listings currently shows:

| Listing | Item ID | Doba SKU | Current price | Available quantity shown | Views | Control |
|---|---|---|---:|---:|---:|---|
| Cordless Electric Weed Wacker with Dual Batteries & 3 Blades | `168634712408` | `D0102X316EA` | **$49.98** | **1** | **22** | **TEMP QTY 0 / DO NOT DELETE.** Current buyer cancellation is processing and known Doba source cost is above sale price. |
| Portable Heavy Duty Folding Bed with Flip-Up Mattress for Travel | `168634722813` | `D0102X33W6W` | **$65.00** | **1** | **113** | **TEMP QTY 0 / PRESERVE HISTORY.** Two current late/untracked orders have no Doba order/shipment evidence; one separate order is already shipped. Rebuild/reprice only after source execution is controlled. |
| VEVOR Super Bright Rechargeable 200,000 Lumens LED Spotlight | `168631043193` | `D010277TCB2` | **$34.98** | **1** | **18** | **TEMP QTY 0 / DO NOT DELETE.** Current order has no Doba order/shipment evidence; sale price was below recorded Doba MAP and known source economics are negative/thin. |
| Universal Tactical Vehicle Back Seat Organizer with Detachable Molle Pouches | `168634275726` | `D01027H21KW` | **$24.33** | **0** | **6** | **ALREADY QTY 0.** Keep blocked until exact Doba account cost proves executable positive contribution; current order ships by Sep. 16. |

## Execution rule

**FAILED OR UNCONTROLLED FULFILLMENT → SET AVAILABLE QUANTITY TO 0 → PRESERVE LISTING → RESOLVE EXISTING CUSTOMER OBLIGATIONS → VERIFY SOURCE/MAP/ECONOMICS → REPRICE/REBUILD → RESTORE QUANTITY ONLY AFTER PASS.**

Do not end/delete these listings merely because of missing direct-manufacturer eBay authorization when the exact Doba SKU itself remains an allowed source path. Product-level source controls and current execution economics decide whether/when the listing can return to sale.

## Current manual gate

The Opera Browser Connector can read Seller Hub but does not expose a supported generic click/edit/submit action. The owner must therefore set available quantity to `0` manually for item IDs `168634712408`, `168634722813`, and `168631043193`. The eBay worker must then re-read Active Listings and receipt-verify all three quantity changes before any further catalog expansion.
