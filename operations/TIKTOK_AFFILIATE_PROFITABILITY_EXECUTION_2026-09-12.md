# Elevation UpScales — TikTok Affiliate Profitability Execution

**Status:** EXECUTION CONTROL / MARGIN VALIDATION GATE  
**Effective:** 2026-09-12  
**Owner:** Casey Young  
**Parent lane:** Company Operations → Ecommerce & Vendor Operations → TikTok execution / Apparel creator engine  
**Source branch parent:** `main@361d9aca818691cf2014658fef9315b039b1c009`

## Objective

Maximize TikTok Shop Affiliate as Elevation Apparel's distributed creator-sales engine while preventing creator commission, samples, discounts, fees, refunds, or provider costs from turning growth into negative contribution.

This packet does **not** create another manager or duplicate the TikTok execution lane. It gives the existing TikTok execution lane exact profitability controls and an initial product state.

## Current TikTok controls verified 2026-09-12

Current U.S. TikTok Shop public Seller University documentation supports:

- Open Collaboration for broad creator discovery;
- Target Collaboration for creator-specific offers;
- Target Collaboration commission superseding Open Collaboration commission for the same creator/product;
- commission rates configured by product/collaboration;
- refundable samples configured through Open Collaboration;
- refundable-sample sales thresholds of 1–3 qualifying sales;
- category referral rates of 6% for the current listed womenswear/fashion/general apparel-related categories used as the working baseline here.

Official source references:

- `https://seller-us.tiktok.com/university/essay?knowledge_id=6837873164896001`
- `https://seller-us.tiktok.com/university/essay?knowledge_id=5988482086864682`
- `https://seller-us.tiktok.com/university/essay?knowledge_id=1597481526134574`

**Live Seller Center remains the final fee/configuration check before activation because TikTok can change account/category-specific terms.**

## Controlling profitability formula

For every creator-promoted SKU:

**NET CONTRIBUTION = CUSTOMER REVENUE - PROVIDER COST - SELLER-FUNDED SHIPPING - TIKTOK/PLATFORM FEES - AFFILIATE COMMISSION - SELLER-FUNDED PROMO/DISCOUNT - SAMPLE ACQUISITION ALLOCATION - RETURN/REFUND/REPLACEMENT LEAKAGE.**

### Commission ceiling

The safe maximum creator commission must be calculated from the SKU's true all-in economics:

**SAFE AFFILIATE COMMISSION $ = REVENUE - ALL NON-AFFILIATE COSTS - REQUIRED ELEVATION NET CONTRIBUTION.**

**SAFE AFFILIATE COMMISSION % = SAFE AFFILIATE COMMISSION $ / COMMISSIONABLE REVENUE.**

The safe ceiling is **not** the break-even ceiling. It must preserve the required Elevation contribution target.

If the safe ceiling is below 10%, default disposition is `REPRICE / REROUTE / HOLD` rather than forcing an unattractive creator offer, unless actual creator performance proves a lower rate converts.

## Initial creator offer architecture

### Open Collaboration — discovery

Use for validated hero products only.

- Base creator offer: start at **up to 10%**, but never above the SKU safe ceiling.
- If a SKU cannot safely support 10%, hold/reprice/reroute before concentrated creator acquisition.
- Approval mode may be used where sample or brand-control exposure warrants manual screening.
- Refundable samples are the default discovery sample mechanism for products where the sample economics pass.

### Target Collaboration — qualified creators

Use for creators selected from actual TikTok Shop performance and brand fit.

- Proven creator target: **up to 15%**, never above the SKU safe ceiling.
- High-performing/strategic partner target: **up to 20%**, never above the SKU safe ceiling.
- The historical Elevation 20% creator commission becomes a **performance-tier reference**, not a blanket default.
- Higher rates require demonstrated conversion, repeat content value, or a clearly justified launch/acquisition case.

### Paid / flat-fee creator deals

`HOLD` until organic affiliate conversion and realized contribution prove the SKU/creator combination. No paid amplification or flat-fee creator acquisition by default.

## Sample controls

### Refundable samples — default prospect mechanism

For creator-ready hero products:

- normal starting threshold: **2 qualifying sales**;
- margin-constrained or higher-cost sample: **3 qualifying sales**;
- strategic low-friction launch test: **1 qualifying sale** only when economics justify it;
- keep quotas bounded and review sample exposure against realized creator GMV/contribution.

### Free samples — selective

Free samples are not the default acquisition method.

Approve primarily for:

- `PROVEN` creators with prior attributable sales;
- `PARTNER` creators with repeat performance;
- unusually high-fit creators where expected content value and economics justify acquisition cost;
- controlled product-launch tests approved within the SKU acquisition budget.

Do not run unbounded free-sample campaigns.

## Creator qualification model

Internal Elevation creator score, 100 points:

| Factor | Weight | What to inspect |
|---|---:|---|
| TikTok Shop sales / units | 35 | Recent attributable revenue and unit-selling history |
| Shoppable content performance | 25 | Product-video views, conversion evidence, quality of sales-oriented content |
| Engagement quality | 15 | Meaningful engagement relative to audience size |
| Sample/post reliability | 15 | Posting behavior and collaboration follow-through |
| Audience + brand fit | 10 | Demographics, lifestyle fit, apparel fit, Elevation brand compatibility |

Do not select creators primarily on follower count.

### Creator ladder

`PROSPECT → ACTIVATED → PROVEN → PARTNER`

- **PROSPECT:** invited / no successful Elevation content yet.
- **ACTIVATED:** accepted and published qualifying Elevation content.
- **PROVEN:** attributable orders with acceptable realized contribution.
- **PARTNER:** repeat profitable sales, reliable content, and strong brand fit.

Commission, sample access, launch priority, and direct attention increase only when the creator moves up this ladder.

## Initial Apparel hero matrix

| SKU / Product | Current state | Open Collaboration | Target Collaboration | Sample state | Immediate action |
|---|---|---|---|---|---|
| Mountain Patch Baseball Cap | `PROVISIONAL HERO / PRIORITY 1` | **HOLD RATE** pending exact economics | **HOLD RATE** pending exact economics | HOLD until exact acquisition cost known | Capture current retail, provider cost by variant, shipping subsidy, TikTok fee basis, promo exposure; calculate ceiling first |
| Mountain Patch Trucker Cap | `TEST CANDIDATE / PRIORITY 2` | **HOLD RATE** pending exact economics | **HOLD RATE** pending exact economics | HOLD | Validate exact cost/price/fulfillment and compare against baseball cap |
| Signature Collection Emblem Tee | `HOLD / REPRICE` | **OFF** at current economics | **OFF** at current economics | OFF | Reprice or reroute provider before affiliate promotion |
| Women's Crop Tee | `FEMALE CREATOR HERO CANDIDATE / HOLD` | **OFF** until normalized | **OFF** until normalized | OFF | Reprice/reroute; preserve as priority female/lifestyle creator lane |
| Essential Hoodie | `CREATOR CANDIDATE / HOLD` | **OFF** until normalized | **OFF** until normalized | OFF | Reprice/reroute or find better provider economics |

## Signature Collection Emblem Tee — hard stop math

Current Fourthwall operating profile:

- Retail: **$30.00**
- Displayed provider cost XS–XL: **$25.00**
- Displayed provider cost 2XL: **$27.00**
- Displayed provider cost 3XL–4XL: **$28.50**
- Historical delivered-order realized Fourthwall profit: **$1.77**

Using the current public 6% TikTok referral rate as a simplified pre-promo illustration:

- $30 × 6% = **$1.80 TikTok referral fee**.
- XS–XL: $30 - $25 - $1.80 = **$3.20** before creator commission, samples, seller discounts, refunds/returns/replacements, or other seller-funded leakage.
- At 10% creator commission ($3.00), only **$0.20** remains before those other costs.
- At 20% creator commission ($6.00), contribution becomes **-$2.80** before those other costs.
- 2XL leaves only **$1.20** before affiliate commission and other leakage.
- 3XL–4XL are already **-$0.30** after provider cost + illustrative referral fee, before affiliate commission.

**Decision:** do not activate Signature Collection Emblem Tee affiliate promotion at the current $30 / current Fourthwall cost structure.

## Promotion collision control

Current Fourthwall profile identifies live promotional codes including 15%, 10%, 5%, and 3% offers. Any seller-funded discount that can apply to a TikTok-routed or equivalent product must be modeled before setting a creator commission.

Do not calculate affiliate margin from headline retail alone.

## Activation gate for each hero SKU

Before any affiliate rate is activated, record:

1. exact product and variant;
2. TikTok selling price;
3. provider/base cost;
4. seller-funded shipping or shipping subsidy;
5. current TikTok referral/platform fee applicable to that product/account;
6. seller-funded promo exposure;
7. return/refund/replacement reserve;
8. sample acquisition allocation;
9. required Elevation net contribution;
10. resulting safe affiliate commission ceiling.

Only then set Open/Target rates.

## Creator acquisition workflow

**TREND SIGNAL → PROFIT-VALIDATED HERO SKU → CREATOR FILTER → TARGET/OPEN OFFER → REFUNDABLE OR CONTROLLED SAMPLE → CONTENT → ATTRIBUTED ORDERS → REALIZED CONTRIBUTION → CREATOR SCORE → RATE/SAMPLE TIER CHANGE → REPEAT.**

### Discovery priorities

TikTok creator discovery should prioritize:

- actual shop revenue / units sold;
- recent shoppable-content performance;
- engagement quality;
- sample/post reliability;
- fast-growing creators;
- audience demographic fit;
- historical product/category/brand collaboration fit.

Follower count is secondary.

## Measurement scoreboard

Track per creator + SKU:

- invitation date;
- collaboration type (`OPEN` / `TARGET`);
- commission rate;
- sample type/cost/status;
- posted content count;
- views;
- clicks/product views when available;
- orders;
- GMV;
- affiliate commission $;
- provider cost;
- TikTok fees;
- promo cost;
- refund/return/replacement leakage;
- realized contribution $;
- realized contribution %;
- creator score/tier;
- next action (`INCREASE / MAINTAIN / TEST AGAIN / DROP`).

## Immediate RUN queue

1. **Do not broaden current affiliate rates yet.** Profitability gate remains active.
2. Capture exact economics for Mountain Patch Baseball Cap first.
3. Capture exact economics for Mountain Patch Trucker Cap second.
4. Reprice/reroute Signature Tee, Women's Crop Tee, and Essential Hoodie before concentrated TikTok Affiliate promotion.
5. Once the first cap passes economics, launch it as the first controlled hero with Open Collaboration + refundable sample testing.
6. Start Target outreach to qualified creators after the hero rate is validated.
7. Use creator ladder and performance data to earn 15% / 20% Target offers instead of granting 20% universally.
8. Feed every realized TikTok sale back into Apparel provider selection and contribution tracking.

## Live execution note

During this execution pass, the connected browser could read existing browser tabs but refused new navigation to TikTok Seller Center. **No live Seller Center commission/sample setting was changed or claimed as changed.** This prevents an unsafe blind activation and does not alter the profitability work above.

The next live TikTok action is authorized only after the exact hero SKU contribution math is complete and Seller Center confirms the live applicable fee/configuration.

## Control phrase

**QUALIFIED CREATORS × PROFITABLE HERO PRODUCTS × REPEATABLE CONTENT → REALIZED CONTRIBUTION DECIDES WHAT SCALES.**
