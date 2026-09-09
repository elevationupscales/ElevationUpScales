# Elevation UpScales — Vendor Onboarding and Catalog Merge SOP

**Status: ACTIVE / CONTROLLING**  
**Effective: 2026-09-08**  
**Owner: Casey Young**  
**Scope: new manufacturers, distributors, wholesalers, authorized dealers, dropship suppliers, strategic product vendors, and supplier relationships being merged into Elevation ecommerce / operations**

## Purpose

Create one repeatable standard for moving a supplier from commercial interest into a reliable operating vendor without rebuilding the process from scratch for every relationship.

The standard is based on the operating depth developed through the SOK relationship: account authorization alone was not enough. Elevation also had to establish channel rules, product truth, inventory freshness, ordering mechanics, fulfillment, warranty, media rights, packed shipment facts, lithium documentation, warehouse preparation capability, and the handoff into Elevation logistics.

Core operating rule:

**APPROVED VENDOR ≠ CATALOG-READY VENDOR ≠ FULFILLMENT-READY VENDOR ≠ PROVEN VENDOR**

Use this progression:

**COMMERCIAL APPROVAL → VENDOR MASTER → SKU DATA → INVENTORY SOURCE → CHANNEL / MAP RULES → ORDER FLOW → FULFILLMENT → COMPLIANCE → CATALOG MERGE → FIRST ORDER → ACTUALS → REVALIDATE**

The goal is to make each new vendor easier to integrate while preserving product accuracy, customer experience, MAP/channel compliance, inventory truth, logistics reliability and protected commercial data.

---

## 1. SOK benchmark

SOK is the current benchmark for the level of operational information Elevation should seek from strategically important vendors.

The SOK relationship became operational because Elevation established, at minimum:

- direct commercial / dealer relationship status;
- authorized resale expectations and MAP rules;
- approved brand / media use;
- product-level pricing source;
- product-level inventory source and update cadence;
- exact ship-from warehouse;
- exact order-submission process;
- required order / consignee fields;
- payment process;
- normal processing and tracking sequence;
- blind-shipping / customer-paperwork treatment;
- Lower-48 fulfillment boundary;
- Hawaii / Alaska separation from normal parcel fulfillment;
- return, warranty and RMA path;
- exact carton dimensions and gross/net weights for priority products;
- pallet quantities, dimensions and weights where applicable;
- mixed-pallet / starter-order rules where applicable;
- model-specific lithium transport documents for regulated batteries;
- warehouse preparation capability for marks, labels, securement, photos and shipper paperwork where required;
- future inventory / dealer-portal transition path;
- referral / market-development opportunity where commercially appropriate.

A new vendor does not need every SOK capability to be useful. It does need every fact required for the exact products, channels and fulfillment lanes Elevation intends to activate.

---

## 2. Vendor onboarding states

Use these states for all material vendor relationships:

**DISCOVERED**  
Potential fit identified.

**CONTACTED**  
Initial commercial outreach sent.

**ACCOUNT REVIEW**  
Vendor is reviewing Elevation, application or business documents.

**COMMERCIAL APPROVED**  
Vendor has approved Elevation for a defined dealer / wholesale / reseller / dropship relationship.

**VENDOR DATA PENDING**  
Commercial approval exists, but operating data is incomplete.

**SKU QUALIFICATION**  
Product-level data, stock source, channel rules, fulfillment facts and required compliance are being verified.

**CATALOG READY**  
Required product and channel facts are complete enough for approved publication.

**FULFILLMENT READY**  
Order submission, payment, shipment release, tracking, warranty and any special shipping workflow are understood.

**LIVE**  
Approved SKUs are active in the applicable sales channel.

**PROVEN**  
At least one real order completed successfully and actuals were recorded.

**REVALIDATE**  
Material pricing, inventory, channel, product, fulfillment or compliance information is stale or changed.

Do not skip from **COMMERCIAL APPROVED** directly to unrestricted publication.

---

## 3. Relationship type must be explicit

Record which commercial relationship actually applies:

- authorized dealer / reseller;
- wholesale purchasing;
- dropship / direct-to-customer fulfillment;
- distributor purchasing;
- marketplace-authorized reseller;
- project / volume purchasing;
- local pickup / will-call purchasing;
- supplier referral relationship;
- strategic logistics relationship;
- stocking / replenishment relationship;
- other defined commercial structure.

Do not assume approval for one structure authorizes another.

Examples:

- wholesale approval does not automatically authorize dropshipping;
- dealer approval does not automatically authorize Amazon, eBay, TikTok Shop, Meta or other marketplaces;
- product availability does not automatically authorize Hawaii / Alaska shipment;
- a vendor may be catalog-ready for Lower-48 sales while still requiring specialized-shipping qualification.

---

## 4. Vendor master — required account information

Before a vendor is treated as operational, capture the applicable vendor-master facts.

### Identity and contacts

- legal / operating company name;
- brand name(s);
- primary account manager;
- order-submission contact or portal;
- logistics / warehouse contact when needed;
- warranty / RMA contact or process;
- compliance / dangerous-goods contact when regulated products are involved;
- current ship-from warehouse location(s);
- support hours / time zone when operationally useful.

### Commercial account

- Elevation account / dealer status;
- authorized relationship type;
- reseller / tax-document requirements;
- opening-order requirement;
- MOQ rules;
- case / pallet / volume rules;
- pricing source and effective-date / version source;
- volume or project-pricing process;
- payment methods and timing;
- whether terms may exist later, when applicable;
- cancellation / change process;
- order cutoff if one exists.

Exact dealer costs, private payment terms and negotiated commercial terms remain protected and must not be committed to the public repository.

### Channel rules

Establish before publication:

- MAP / UMAP / minimum advertised price policy;
- MSRP / advertised retail reference where applicable;
- coupon / promotion restrictions;
- approved website resale;
- approved marketplaces;
- prohibited marketplaces or channels;
- geographic restrictions;
- downstream reseller rules when Elevation may wholesale to another retailer;
- brand / trademark rules;
- product-content / media permissions.

If a channel is not confirmed, mark it **CHANNEL PENDING** rather than assuming permission.

---

## 5. SKU merge packet — product data required

Catalog merge is product-level, not merely vendor-level.

For each SKU / model being considered, obtain or verify as applicable:

### Product identity

- supplier SKU;
- manufacturer model / part number;
- UPC / EAN / GTIN when available;
- product title;
- brand;
- product family / category;
- variant attributes;
- current / discontinued / future-product state.

The supplier SKU and manufacturer model must be linked clearly enough that pricing, inventory, compliance, warranty and freight facts cannot accidentally attach to the wrong product.

### Customer-facing product truth

- manufacturer description or approved source;
- core specifications;
- dimensions;
- product net weight;
- included items;
- compatible accessories when manufacturer-verified;
- warranty summary / source;
- manuals / installation documentation;
- approved images / videos / media source.

Do not invent compatibility, included components or performance claims.

### Pricing / channel fields

- current retail / MAP source;
- current wholesale / dealer pricing source — protected;
- promotional rules;
- quantity / project pricing path;
- effective date or source version;
- revalidation trigger.

### Fulfillment fields

- normal ship-from warehouse;
- parcel / LTL / freight mode where known;
- packed carton dimensions;
- gross packed weight;
- whether the item ships individually;
- case quantity when relevant;
- units per pallet when relevant;
- pallet dimensions and gross weight when relevant;
- mixed-SKU pallet rules when relevant;
- special packing / securement limitations;
- dropship eligibility;
- freight-forwarder shipment eligibility;
- Lower-48 / Hawaii / Alaska boundaries.

Exact packed dimensions and gross weight are mandatory before requesting exact specialized-freight pricing.

---

## 6. Supplier inventory truth and freshness lifecycle

Supplier inventory must never be represented as Elevation physical On Hand.

Use this lifecycle:

**SOURCE → VERIFIED TIME → SKU STOCK SIGNAL → CUSTOMER SELLABILITY → EXPIRATION / RECHECK**

### Inventory source

Record the authoritative source type:

- live API;
- dealer portal;
- supplier website if explicitly approved as authoritative;
- scheduled CSV / Excel / feed;
- account-manager inventory sheet;
- manual supplier confirmation;
- purchase-order allocation / reservation.

### Verified time

Every imported supplier stock fact must carry a verified timestamp or source-version date.

Raw stock quantities are protected supplier data. Public systems should expose only the customer-safe availability state needed to sell accurately.

### Customer-safe sellability states

Use a controlled state rather than blindly exposing a supplier number:

**AVAILABLE** — supplier source is current and product can normally be sold under the approved workflow.

**MANUAL CONFIRMATION** — product may be available, but stock, fulfillment or route must be rechecked before accepting the order.

**PREORDER / FUTURE** — supplier has provided a future availability path but current stock is not sellable as normal inventory.

**UNAVAILABLE** — current source indicates no sellable stock or vendor cannot fulfill under the approved lane.

**DISCONTINUED / RETIRED** — product should not accept new normal orders.

A low-stock threshold may be used internally, but it must be vendor/SKU appropriate and must not expose protected raw counts publicly.

### Expiration / recheck rule

At onboarding, establish the expected inventory refresh cadence for the vendor.

Examples include live, daily, weekly or manual-per-order.

When a source becomes older than its expected cadence or the supplier warns that inventory is volatile, downgrade the customer-facing state to **MANUAL CONFIRMATION** until reverified.

Do not carry stale supplier inventory indefinitely because it was once true.

---

## 7. Order-submission and fulfillment contract

Before activating normal customer ordering, establish the actual supplier order workflow.

Required as applicable:

- PO / portal / API / email / spreadsheet method;
- required order fields;
- consignee requirements;
- payment sequence;
- invoice sequence;
- shipment-release trigger;
- processing-time expectation;
- order cutoff if any;
- tracking return path;
- blind-shipping capability;
- packing-slip / label branding;
- dealer pricing privacy on customer paperwork;
- cancellation / change window;
- address-change handling;
- damaged-in-transit process;
- return process;
- product-quality warranty / replacement / refund process;
- RMA responsibility;
- customer-support handoff.

Operating rule:

**CUSTOMER ORDER → ELEVATION VALIDATES → SUPPLIER PO / ORDER → PAYMENT / ACCEPTANCE → SUPPLIER RELEASE → TRACKING → CUSTOMER DELIVERY → ACTUALS**

Do not code or automate supplier ordering until the manual workflow is understood well enough to reproduce safely.

---

## 8. Media and catalog-content rights

Before using supplier content, establish the approved source and permission.

Preferred source order:

1. manufacturer-provided media package;
2. manufacturer dealer portal;
3. manufacturer website content explicitly approved for dealer use;
4. vendor-provided feed;
5. Elevation-created original content based on verified product facts.

Do not scrape unsupported assets, remove watermarks, invent images or assume an image-license right from commercial-account approval alone.

Track whether Elevation may use:

- logo;
- product images;
- lifestyle images;
- videos;
- descriptions;
- manuals / spec sheets;
- downloadable customer documents.

---

## 9. Regulated-product / lithium merge gate

For batteries, dangerous goods or other regulated products, commercial approval is not enough.

Before a regulated SKU is treated as specialized-shipping ready, obtain and match the required exact-model evidence, which may include:

- model-specific SDS / MSDS;
- UN38.3 test summary;
- manufacturer / model linkage;
- chemistry;
- watt-hour / energy rating;
- applicable UN identification / shipping description where required;
- state-of-charge information where relevant;
- packed dimensions and gross weight;
- package / terminal protection facts;
- marks / label capability;
- shipper paperwork responsibility;
- freight-forwarder / carrier acceptance requirements.

Apply `SHIPPING_SUPPLIER_QUALIFICATION_STANDARD.md` for the actual route.

A broad certification package such as CE / FCC / RoHS / UL may be commercially useful but does not substitute for transport documents required by a carrier.

If a vendor only releases required transport documentation after a large purchase is committed, do not represent the SKU as specialized-shipping ready until the exact carrier-required documentation can be obtained early enough to qualify the shipment safely.

---

## 10. Catalog merge gates

A SKU may be merged into the Elevation catalog only to the level supported by its verified data.

### Gate A — Product record ready

Requires:

- exact product identity;
- approved title / description source;
- core specifications;
- media rights/source;
- retail / MAP rule;
- lifecycle state.

### Gate B — Sellability ready

Requires Gate A plus:

- current inventory source;
- inventory freshness rule;
- approved sales channel;
- price source;
- fulfillment method;
- warranty / return path.

### Gate C — Dropship ready

Requires Gate B plus:

- dropship authorization;
- order-submission method;
- required customer/order fields;
- payment/release sequence;
- customer-paperwork treatment;
- processing / tracking flow.

### Gate D — Specialized-shipping ready

Requires Gate B plus:

- exact packed shipment profile;
- required compliance documents;
- origin preparation capability;
- route-specific carrier qualification;
- destination receiving / delivery path as applicable.

A product can be visible for information or manual inquiry without being enabled for automatic checkout if its fulfillment gate is incomplete.

---

## 11. Vendor merge packet for development / ecommerce operations

Before handing a new vendor to website / Shopify / catalog development, prepare one normalized merge packet containing only the fields relevant to that system.

Minimum operational structure:

`VENDOR → RELATIONSHIP → CHANNEL RULES → SKU MASTER → PRICE SOURCE → INVENTORY SOURCE / FRESHNESS → FULFILLMENT LANE → MEDIA SOURCE → WARRANTY → COMPLIANCE STATE → CUSTOMER SELLABILITY`

For each SKU, development should be able to answer:

- What is the exact product?
- May we sell it on this channel?
- What price rule controls?
- Is it currently sellable?
- How fresh is the stock signal?
- Where does it ship from?
- How is the supplier order placed?
- Is normal parcel fulfillment allowed?
- Is specialized shipping required?
- What happens if the product is defective or returned?
- Which product/media source is authoritative?

If those answers are not available, the system must use manual confirmation, inquiry-only, preorder or unavailable behavior rather than inventing certainty.

---

## 12. First-order proof

Do not treat configuration as proof.

For each strategically important vendor / fulfillment lane, use a controlled first order to verify the actual process.

Record in the protected operational system as applicable:

- SKU / quantity;
- inventory state at order time;
- supplier order-submission method;
- payment and acceptance timing;
- actual processing time;
- actual tracking timing;
- packing / branding outcome;
- freight / parcel outcome;
- delivery outcome;
- warranty / exception issues if any;
- manager time;
- changes needed to the vendor profile.

Then update the normalized profile so the second order is easier.

**MANUAL FIRST → ACTUALS → REPEATABLE PROFILE → AUTOMATION**

---

## 13. Revalidation triggers

Revalidate a vendor or SKU when:

- pricing sheet changes;
- MAP / UMAP changes;
- channel permission changes;
- inventory feed cadence fails;
- product is revised;
- SKU / model mapping changes;
- warehouse origin changes;
- shipping terms change;
- fulfillment method changes;
- warranty or return policy changes;
- MOQ / quantity structure changes;
- compliance documents change;
- supplier portal/API replaces a manual process;
- a real order exposes a mismatch with the documented workflow.

Do not leave old integration assumptions embedded in the website after the supplier changes its process.

---

## 14. Public / private data boundary

The repository is public.

Do not commit:

- dealer / wholesale costs;
- raw supplier inventory counts;
- private price sheets;
- private payment terms;
- supplier account credentials;
- private customer data;
- private supplier correspondence;
- non-public compliance packages;
- protected freight rates or carrier routing intelligence;
- private commercial contract terms.

Public operations files may document the required fields, workflow, relationship state and customer-safe availability state.

Protected systems may hold the actual supplier costs, raw inventory, account data and evidence required for operations.

---

## 15. New-vendor completion checklist

Before a vendor is called fully operational, confirm:

- commercial relationship approved;
- relationship type documented;
- channel permissions verified;
- MAP / pricing rule verified;
- approved media source verified;
- SKU/model mapping complete for activated products;
- product specifications verified;
- pricing source established;
- inventory source established;
- inventory refresh cadence established;
- customer-safe sellability mapping established;
- ship-from origin verified;
- order submission process verified;
- payment / release process verified;
- tracking process verified;
- returns / warranty / RMA verified;
- dropship workflow verified if used;
- packed shipment facts verified when freight matters;
- regulated-product documents verified when applicable;
- specialized route separately qualified when applicable;
- first real order completed or vendor remains marked **LIVE / NOT YET PROVEN**.

## Operating principle

**GET THE ACCOUNT → GET THE DATA → VERIFY THE SKU → VERIFY STOCK → VERIFY THE CHANNEL → VERIFY THE ORDER FLOW → VERIFY THE SHIPMENT → MERGE ONLY WHAT IS TRUE → PROVE IT WITH A REAL ORDER → KEEP IT CURRENT.**
