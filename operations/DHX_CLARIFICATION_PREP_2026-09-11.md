# Elevation UpScales — DHX / DGX Clarification Preparation

**Status:** READY FOR SHIPPING WORKER / TWO INPUTS STILL REQUIRED  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Parent:** Shipping & Logistics Project  
**Primary execution owner:** Shipping & Logistics Partner Worker  
**Company Operations role:** factual preparation / routing support only

## Purpose

Prepare the non-binding factual response inputs requested by DHX/DGX after Elevation sent the verified initial shipment-detail packet for SOK `SK12V100PC` and `SK48V100N`.

This file does not authorize a freight booking, rate acceptance, contract acceptance, dangerous-goods declaration, customer promise, or disclosure of protected compliance documents in public Git.

## Verified metric source dimensions already supplied to DHX

### SOK `SK12V100PC`

- Packed carton: `29.7 × 20.2 × 28.5 cm`
- Full pallet: `120 × 110 × 160 cm`

### SOK `SK48V100N`

- Packed carton: `54.2 × 52.2 × 19.7 cm`
- Full pallet: `110 × 110 × 136 cm`

## Converted dimensions for DHX clarification

Conversions use exact definitions `1 in = 2.54 cm` and `1 ft = 30.48 cm`. Values below are rounded for operational communication; the original metric manufacturer values remain controlling.

| Model / package | Original cm | Inches | Feet |
|---|---|---|---|
| `SK12V100PC` packed carton | 29.7 × 20.2 × 28.5 | 11.69 × 7.95 × 11.22 in | 0.974 × 0.663 × 0.935 ft |
| `SK12V100PC` full pallet | 120 × 110 × 160 | 47.24 × 43.31 × 62.99 in | 3.937 × 3.609 × 5.249 ft |
| `SK48V100N` packed carton | 54.2 × 52.2 × 19.7 | 21.34 × 20.55 × 7.76 in | 1.778 × 1.713 × 0.646 ft |
| `SK48V100N` full pallet | 110 × 110 × 136 | 43.31 × 43.31 × 53.54 in | 3.609 × 3.609 × 4.462 ft |

## SDS / compliance-document status

Private Gmail evidence confirms model-specific SOK document packages are already preserved for both requested models:

- `SK12V100PC Documents.zip`
- `SK48V100N Documents.zip`

The current Gmail connector exposes those ZIP attachments as existing evidence but does **not** support reading/extracting their contents. An earlier internal preservation copy and supplier correspondence both preserve the packages. A separate sent Logistics Plus packet also proves SOK safety documents for the two models were previously assembled and transmitted through the private compliance lane.

Classification: **EXISTING SOURCE / TECHNICAL ACCESS LIMITATION — NOT MISSING SUPPLIER COOPERATION.**

Required action: retrieve the matching current SDS from an authorized private attachment/download/archive path and attach it directly to the DHX reply. Do not ask SOK to resend the same documents solely because this connector cannot extract the ZIP, and do not place SDS/private compliance files in public Git.

## Hawaii destination ZIP

DHX also requested the final Hawaii destination ZIP. The current verified packet uses Honolulu/Oahu as the baseline but does not establish one exact final destination ZIP in this support record.

Classification: **REQUIRED BEFORE REPLY / EXACT DESTINATION INPUT.**

Do not invent or infer the ZIP from a general Honolulu/Oahu route assumption. Shipping worker must use the actual intended destination for the pricing configuration being requested.

## Shipping-worker response gate

One consolidated factual reply can be sent when all three fields are satisfied:

1. **Dimensions in inches/feet — READY** from this receipt.
2. **Matching current SDS files — EXIST / PRIVATE RETRIEVAL REQUIRED.**
3. **Exact final Hawaii destination ZIP — REQUIRED / NOT YET VERIFIED HERE.**

Then return the requested information to DHX/DGX while preserving the existing clarification that Elevation UpScales is the customer/logistics coordinator and SOK Battery is the legal shipper/responsible party for carrier paperwork.

## Control

**CONVERT VERIFIED FACTS → RETRIEVE EXISTING PRIVATE SDS → CONFIRM EXACT ZIP → ONE FACTUAL REPLY → DHX/DGX REVIEW → NO COMMITMENT UNTIL SEPARATELY AUTHORIZED.**
