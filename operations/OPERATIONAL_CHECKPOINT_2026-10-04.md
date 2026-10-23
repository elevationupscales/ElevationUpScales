# ELEVATION UPSCALES — OPERATIONAL CHECKPOINT — 2026-10-04

**Authority:** Casey Young direct instruction  
**System:** OS 1 / MPM 28  
**Purpose:** Record material fulfillment and cash-flow state changes without reopening completed recon.

## TikTok Shop funds

**State:** INCOMING / EXPECTED 2026-11-05

- Withdrawal freeze is tied to violation ID `7682224328997617933`.
- TikTok support reconfirmed on 2026-10-04 that both appeals were rejected and the frozen withdrawal remains through its stated end time.
- Original enforcement record showed fund withdrawal suspension beginning 2026-09-06 and ending 2026-11-05.
- No earlier-release path was confirmed through support.
- Operational control: stop active escalation absent materially new TikTok evidence; verify release/settlement on or after 2026-11-05.

## eBay / VEVOR wire crimper fulfillment

**State:** SENT / REMOVE FROM ACTIVE FULFILLMENT QUEUE

- Item: VEVOR 24–10 AWG ratcheting wire crimper.
- Supplier/order reference: `26100400965819136872`.
- Owner confirmed the order was sent on 2026-10-04.
- This item no longer controls the P0 fulfillment queue unless a shipment exception, tracking failure, or buyer issue appears.

## Next fulfillment lane

Advance to the next unresolved paid-customer obligation. Current evidence points to the 8 kW diesel air heater as the next item requiring shipment-status reconciliation, unless newer fulfillment proof supersedes that state.


## eBay / VEVOR 8 kW diesel air heater

**State:** BLOCKED — WORKING CAPITAL

- Owner confirmed on 2026-10-04 that available working capital is insufficient to fulfill this item while TikTok seller funds remain frozen.
- Do not treat this as completed or canceled. Keep it as a paid-customer obligation blocked by funding.
- Resume immediately when sufficient working capital becomes available or an approved alternate fulfillment path is identified.

## eBay / VEVOR 3-Inch Diesel Heater Pipe Vent Kit

**State:** SUPPLIER ORDER COMPLETE / FULFILLMENT IN PROGRESS

- Item: VEVOR 3-Inch Diesel Heater Pipe Duct Vent Kit with Y-Connector & Air Duct Clamps for 5KW/8KW heaters.
- eBay order: `18-15223-96471`.
- Sold: 2026-10-01.
- Sale amount: $23.99.
- eBay ship-by date: 2026-10-06.
- Owner confirmed supplier order completion on 2026-10-04.
- Supplier order/reference number was not provided in the owner update; capture it with tracking when available.
- Next gate: tracking / shipment confirmation.


## eBay / 6,000W Pure Sine Wave Inverter Charger

**State:** HOLD — WORKING CAPITAL

- eBay order: `07-15247-64154`.
- Sold: $499.00 on 2026-10-01.
- Ship-by date: 2026-10-06.
- Owner directed on 2026-10-04 to hold fulfillment until more working capital is available.
- Do not spend further time on supplier execution until capital is available or Casey explicitly reactivates the order.


## Google Merchant Center — identity verification

**State:** WAITING EXTERNAL — IDENTITY VERIFICATION SUBMITTED

- Merchant Center account remains blocked by Misrepresentation for the United States and Mexico.
- Shopify business identity/contact data has been reconciled to the public store: support@elevationupscales.com, (208) 813-4998, and the Peyton, Colorado business address.
- Owner confirmed on 2026-10-04 that Google Merchant Center identity verification was submitted.
- Do not submit duplicate identity verification or request another review until Google returns the verification result or materially new Merchant Center guidance.
- Next gate: Google identity-verification outcome → Merchant Center Misrepresentation review eligibility / status.


## International pricing / freight-lane learning — CJ travel bag

**State:** ACCEPTED OPERATING LEARNING — LISTING BUILD VALID / FREIGHT PRESENTATION REQUIRES NORMALIZATION

- Product: Waterproof Sports & Travel Gear Bag with Shoe Compartment, SKU CJJT167029603CX.
- Listing and international delivery-profile build are considered valid. The observed checkout friction is not evidence of worker/listing failure.
- Current item price: $29.99.
- Live lane freight spans $6.78–$28.17. Mean across all 12 configured lanes is approximately $12.40; median is approximately $10.92. Excluding Puerto Rico, mean freight is approximately $10.96.
- Highest-friction lane overall: Puerto Rico, $28.17 freight (about 94% of item price), with a 12–50 day estimate.
- Highest-friction international country lane: Ireland, $16.14 freight (about 54% of item price).
- Next-highest international lanes: Netherlands $12.20, New Zealand $11.88, Mexico $11.76.
- Lowest-cost lane: United Kingdom, $6.78.
- Internal pricing direction for future international general-merchandise listings: embed a standard freight allowance into merchandise price, keep raw supplier/freight lane economics internal, and expose a lower/simple customer-facing shipping amount by lane.
- Working baseline for this bag class: embed roughly $10 freight into price (e.g. $39.99 merchandise) and reduce visible shipping by the same $10. This preserves approximately the same pre-product-cost contribution as the original $29.99 + actual freight structure for lanes at or above $10 freight, while making shipping appear materially lower.
- High-friction outliers must be treated separately rather than forcing every market into one flat shipping promise.
- Before the next international item launch: capture supplier unit cost, live freight by active market/territory, payment/marketplace fees, mean/median freight, worst-lane freight, and gross-contribution floor before setting retail and customer-facing shipping.
- Do not expose internal supplier freight rates or margin logic publicly.


## CJ travel bag pricing adjustment — implemented

**State:** LIVE / VERIFIED

- Product: Waterproof Sports & Travel Gear Bag with Shoe Compartment
- SKU: CJJT167029603CX
- Retail price changed from $29.99 to **$45.99** on 2026-10-04.
- Dedicated delivery profile: CJ Global — Travel Gear Bag.
- All 12 existing active shipping lanes changed to **$0 customer-facing shipping** while preserving current lane coverage and delivery estimates.
- Verified free-shipping lanes: Australia, Canada, France, Germany, Ireland, Mexico, Netherlands, New Zealand, Puerto Rico, Spain, United Kingdom, and U.S. Lower 48.
- This is a pricing-presentation change, not a supplier-cost change. Internal freight economics remain tracked by lane.
- Internal model now uses verified prior CJ/OS3 supplier cost **$4.19** plus a working payment-fee assumption of **2.9% + $0.30** until the active processor rate is verified.
- Modeled average contribution across all 12 lanes: **$27.77/order / 60.4%**.
- Modeled average contribution excluding Puerto Rico: **$29.20/order**.
- Puerto Rico remains the structural outlier: historical freight $28.17 leaves approximately **$12.00 contribution / 26.1% margin** under the working model.
- Dedicated operating model: `operations/international/CJ_TRAVEL_BAG_PRICING_MODEL_2026-10-04.md`.
- Reusable rule: no future international listing publishes without supplier cost, lane freight table, payment-fee assumption, average/worst-lane contribution, margin, and explicit outlier treatment.
