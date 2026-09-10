# Elevation UpScales — Solar Builder Reference: Sun Atlas Power

**Status:** APPROVED REFERENCE / END-OF-QUEUE BUILD INPUT  
**Effective:** 2026-09-10  
**Owner:** Casey Young  
**Execution:** Developer / Solar Builder lane only when current higher-priority work clears or Owner explicitly reprioritizes

## Owner direction

Use Signature Solar's public Sun Atlas Power experience as a **reference benchmark** when the Elevation Solar Builder returns to active development.

Reference URL:

`https://signaturesolar.com/sun-atlas-power`

This is a reference for product-flow and customer-experience architecture. It is **not** authorization to copy Sun Atlas branding, copyrighted copy, visual design, source code, trade dress, proprietary calculations, or other protected materials.

## Reference concepts to preserve

The public Sun Atlas experience organizes the customer journey around a simple sequence:

1. **Design / size the system** — customer can size a solar + battery setup, self-serve or expert-guided.
2. **Show transparent pricing** — customer sees a real project price earlier in the process rather than entering a generic lead funnel with no commercial context.
3. **Move into execution** — engineering, permitting, materials/procurement, installation, inspection/interconnection, activation, and monitoring are handled as downstream project stages.

The Sun Atlas page also frames the broader installation process as:

**consultation/site assessment → custom system design/proposal → permitting/utility applications → equipment procurement → professional installation → inspection/interconnection → activation/monitoring**

## Elevation Solar Builder application

When this lane is activated, use the above as a workflow reference while preserving Elevation's own operating model, suppliers, service areas, pricing rules, and branding.

Target Elevation sequence:

**PROJECT INPUTS → LOAD / USE PROFILE → SOLAR + BATTERY SIZING → COMPATIBLE EQUIPMENT CONFIGURATION → CURRENT PRODUCT/PRICE SOURCE → TRANSPARENT SYSTEM PRICE / RANGE → SERVICE-AREA + INSTALLATION PATH → PROJECT REVIEW / CHECKOUT / LEAD HANDOFF → ENGINEERING / PERMIT / INSTALLATION WORKFLOW WHEN APPLICABLE**

The Builder should increasingly behave as a **system configurator**, not merely a lead form. It should be able to assemble a practical solar/off-grid system from products Elevation can actually sell or source, while distinguishing:

- equipment-only purchase;
- RV/mobile/off-grid system;
- residential/home backup configuration;
- installation-required project;
- service-area vs outside-area/manual review;
- products that can be purchased immediately vs items requiring review/quote.

## Data/source rules

- Use Elevation's verified catalog/vendor records for actual products and sell prices.
- Respect supplier MAP/minimum-advertised-price and channel restrictions.
- Do not present unsupported installation pricing as final.
- Keep product availability, freight, storage, and lithium-shipping requirements tied to the applicable supplier/logistics records.
- Preserve the primary `Start a Project` customer path and integrate the Solar Builder beneath it rather than replacing it.
- Treat supplier/manufacturer builder references as design research, not as authorization to copy their proprietary implementation.

## End-of-queue build objective

When activated, Developer should first document the current Elevation Solar Builder state, compare its customer flow against this reference, and propose the smallest controlled upgrade that moves Elevation toward:

**SIZE → CONFIGURE → PRICE → BUY / REQUEST INSTALLATION → EXECUTE**

No website/runtime change is authorized by this reference file alone. Standard owner-side development approval and release controls remain in force.
