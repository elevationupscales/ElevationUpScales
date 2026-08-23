const SELLER = "elevationupscalesshop";

function sellerSearch(query) {
  const url = new URL("https://www.ebay.com/sch/i.html");
  url.searchParams.set("_ssn", SELLER);
  url.searchParams.set("_nkw", query);
  url.searchParams.set("_sop", "10");
  return url.toString();
}

// Manually validated against Seller Hub screenshots on 2026-08-23.
const catalog = [
  ["ebay-01-6l-electric-hot-pot-with-divider-for-flavorful-family-meals", "6L Electric Hot Pot with Divider for Flavorful Family Meals", "Elevation Picks", 6200, "/assets/marketplace/marketplace-premium-hero-mobile.webp"],
  ["ebay-02-vevor-21-inch-heavy-duty-lawn-sweeper-with-durable-mesh-coll", "VEVOR 21-Inch Heavy Duty Lawn Sweeper with Durable Mesh Collection Bag", "Camping & Outdoor", 6999, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-03-vevor-portable-5-gallon-fuel-container-with-spout-for-cars-a", "VEVOR Portable 5 Gallon Fuel Container with Spout for Cars and Motorcycles, Red", "RV Parts & Accessories", 6500, "/assets/hero-galaxy-rv.webp"],
  ["ebay-04-vevor-heavy-duty-5-3-gallon-metal-fuel-can-with-spout-comfor", "VEVOR Heavy-Duty 5.3 Gallon Metal Fuel Can with Spout & Comfort Handle", "RV Parts & Accessories", 3676, "/assets/hero-galaxy-rv.webp"],
  ["ebay-05-vevor-high-performance-12v-water-diaphragm-pump-5-5-gpm-70-p", "VEVOR High-Performance 12V Water Diaphragm Pump - 5.5 GPM & 70 PSI Adjustable", "Solar & Off-Grid", 7999, "/assets/solar/builder/panel.svg"],
  ["ebay-06-12v-electric-scissor-car-jack-impact-wrench-for-easy-tire-ch", "12V Electric Scissor Car Jack & Impact Wrench for Easy Tire Changes", "Solar & Off-Grid", 5712, "/assets/solar/builder/panel.svg"],
  ["ebay-07-vevor-portable-walk-in-greenhouse-20-x-10-hot-house-with-stee", "VEVOR Portable Walk-In Greenhouse 20' x 10' Hot House with Steel Hoops & Windows", "Camping & Outdoor", 13455, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-08-8l-hot-water-heater-tankless-instant-boiler-outdoor", "8L Hot Water Heater Tankless Instant Boiler Outdoor", "RV Parts & Accessories", 19433, "/assets/hero-galaxy-rv.webp"],
  ["ebay-09-3-x-3m-waterproof-tent-with-spiral-tubes-white", "3 x 3m Waterproof Tent with Spiral Tubes White", "Camping & Outdoor", 4987, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-10-vevor-super-bright-rechargeable-200-000-lumens-led-spotlight", "VEVOR Super Bright Rechargeable 200,000 Lumens LED Spotlight for Outdoor Use", "Camping & Outdoor", 3498, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-11-quick-set-brown-pop-up-gazebo-tent-with-removable-wind-cloth", "Quick Set Brown Pop-Up Gazebo Tent with Removable Wind Cloths", "Camping & Outdoor", 21500, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-12-vevor-stainless-steel-moonshine-still-with-copper-tube-for-h", "VEVOR Stainless Steel Moonshine Still with Copper Tube for Home Distilling", "Elevation Picks", 9734, "/assets/marketplace/marketplace-premium-hero-mobile.webp"],
  ["ebay-13-solar-cable-connector-kit-10-20-50-100-200-pairs-for-diy-sola", "Solar Cable Connector Kit - 10/20/50/100/200 Pairs for DIY Solar Panels", "Solar & Off-Grid", 3200, "/assets/solar/builder/panel.svg"],
  ["ebay-14-10-pairs-of-waterproof-solar-panel-connectors-for-efficient-e", "10 Pairs of Waterproof Solar Panel Connectors for Efficient Energy Use", "Solar & Off-Grid", 2777, "/assets/solar/builder/panel.svg"],
  ["ebay-15-portable-led-solar-camping-light-with-usb-rechargeable-bulb-f", "Portable LED Solar Camping Light with USB Rechargeable Bulb for Outdoors", "Solar & Off-Grid", 3500, "/assets/solar/builder/panel.svg"],
  ["ebay-16-vevor-heavy-duty-rv-double-sided-tape-16ft-strong-clear-adhesi", "VEVOR Heavy Duty RV Double Sided Tape 16ft Strong & Clear Adhesive", "RV Parts & Accessories", 1797, "/assets/hero-galaxy-rv.webp"],
  ["ebay-17-rv-comprehensive-fast-blow-glass-fuse-set-120-pcs-for-electro", "RV Comprehensive Fast-Blow Glass Fuse Set - 120 PCS for Electronics & Appliances", "RV Parts & Accessories", 1799, "/assets/hero-galaxy-rv.webp"],
  ["ebay-18-diesel-heaters-rv-flexible-stainless-steel-exhaust-hose-with", "Diesel Heaters RV Flexible Stainless Steel Exhaust Hose with Clamps", "RV Parts & Accessories", 1999, "/assets/hero-galaxy-rv.webp"],
  ["ebay-19-vevor-fast-drying-electric-boot-shoe-dryer-with-deodorizing-t", "VEVOR Fast-Drying Electric Boot & Shoe Dryer with Deodorizing Technology", "Elevation Picks", 1189, "/assets/marketplace/marketplace-premium-hero-mobile.webp"],
  ["ebay-20-mppt-solar-panel-regulator-charge-controller-auto-focus-track", "MPPT Solar Panel Regulator Charge Controller Auto Focus Tracking 30-100A 12V/24V", "Solar & Off-Grid", 1588, "/assets/solar/builder/panel.svg"],
  ["ebay-21-compact-waterproof-backpacking-sleeping-bag-for-all-weather-a", "Compact Waterproof Backpacking Sleeping Bag for All Weather Adventures", "Camping & Outdoor", 2189, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-22-emergency-aluminum-foil-sleeping-bag-for-outdoor-adventures", "Emergency Aluminum Foil Sleeping Bag for Outdoor Adventures", "Camping & Outdoor", 1488, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-23-car-seat-gap-organizer-for-drinks-convenient-cup-holder-wedge", "Car Seat Gap Organizer for Drinks - Convenient Cup Holder Wedge", "Elevation Picks", 1999, "/assets/marketplace/marketplace-premium-hero-mobile.webp"],
  ["ebay-24-vevor-rv-stainless-steel-paper-towel-holder-non-slip-with-suct", "VEVOR RV Stainless Steel Paper Towel Holder - Non-Slip with Suction Cups", "RV Parts & Accessories", 2566, "/assets/hero-galaxy-rv.webp"],
  ["ebay-25-rv-hi-capacity-2-pack-moisture-absorber-buckets-for-long-lasti", "RV Hi-Capacity 2-Pack Moisture Absorber Buckets for Long-Lasting Fresh Air", "RV Parts & Accessories", 1988, "/assets/hero-galaxy-rv.webp"],
  ["ebay-26-under-bed-shoe-storage-organizer-with-adjustable-dividers-and", "Under Bed Shoe Storage Organizer with Adjustable Dividers and Clear Window", "Elevation Picks", 1899, "/assets/marketplace/marketplace-premium-hero-mobile.webp"],
  ["ebay-27-vevor-rv-matte-black-square-deadbolt-lock-for-enhanced-securi", "VEVOR RV Matte Black Square Deadbolt Lock for Enhanced Security", "RV Parts & Accessories", 2999, "/assets/hero-galaxy-rv.webp"],
  ["ebay-28-rv-smart-bluetooth-diesel-air-heater-for-rvs-and-boats-12v-8k", "RV Smart Bluetooth Diesel Air Heater for RVs and Boats - 12V 8KW", "RV Parts & Accessories", 15999, "/assets/hero-galaxy-rv.webp"],
  ["ebay-29-rv-heavy-duty-adhesive-hooks-for-towel-coat-storage-4-pack-ma", "RV Heavy-Duty Adhesive Hooks for Towel & Coat Storage - 4 Pack, Matte Black", "RV Parts & Accessories", 2332, "/assets/hero-galaxy-rv.webp"],
  ["ebay-30-diesel-air-heater-all-in-one-12v-8kw-bluetooth-app-lcd-for-ca", "Diesel Air Heater All-in-One 12V 8KW Bluetooth App LCD for Car RV", "RV Parts & Accessories", 19000, "/assets/hero-galaxy-rv.webp"],
  ["ebay-31-rv-mattress-with-checkered-three-dimensional-edges-full-size", "RV Mattress with Checkered Three-Dimensional Edges - Full Size", "RV Parts & Accessories", 3800, "/assets/hero-galaxy-rv.webp"],
  ["ebay-32-heavy-duty-outdoor-rv-steps-with-handrail-for-easy-access-to", "Heavy Duty Outdoor RV Steps with Handrail for Easy Access to Hot Tub", "RV Parts & Accessories", 11133, "/assets/hero-galaxy-rv.webp"],
  ["ebay-33-rv-elegant-12-piece-stoneware-dinnerware-set-for-4-microwave", "RV Elegant 12-Piece Stoneware Dinnerware Set for 4 - Microwave & Dishwasher Safe", "RV Parts & Accessories", 4200, "/assets/hero-galaxy-rv.webp"],
  ["ebay-34-bulk-hunting-survival-flint-steel-striker-kit-for-outdoor-ad", "BULK Hunting / Survival Flint Steel Striker Kit for Outdoor Adventures", "Camping & Outdoor", 3500, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-35-rv-patio-3x3m-white-waterproof-tent-with-spiral-support-tubes", "RV Patio 3x3m White Waterproof Tent with Spiral Support Tubes for Events", "RV Parts & Accessories", 6500, "/assets/hero-galaxy-rv.webp"],
  ["ebay-36-brazilian-rough-gemstone-tumbler-stones-1000-carat-bulk-mix", "Brazilian Rough Gemstone Tumbler Stones - 1000 Carat Bulk Mix", "Elevation Picks", 1999, "/assets/marketplace/marketplace-premium-hero-mobile.webp"],
  ["ebay-37-gray-2-seater-patio-swing-with-canopy-and-table-for-relaxing", "Gray 2-Seater Patio Swing with Canopy and Table for Relaxing Outdoors", "Camping & Outdoor", 18988, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-38-heavy-duty-42-lbs-square-patio-umbrella-base-for-1-25-1-5-p", "Heavy Duty 42 lbs Square Patio Umbrella Base for 1.25\" & 1.5\" Poles", "Camping & Outdoor", 9999, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-39-camping-dual-lid-rolling-cooler-cart-with-side-shelves-for-ou", "Camping Dual-Lid Rolling Cooler Cart with Side Shelves for Outdoor Fun", "Camping & Outdoor", 23599, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-40-vevor-7-in-1-multi-function-folding-ladder-for-rv-offgrid", "VEVOR 7-in-1 Multi-Function Folding Ladder for RV & Offgrid", "RV Parts & Accessories", 23825, "/assets/hero-galaxy-rv.webp"],
  ["ebay-41-vevor-outdoor-dual-fuel-pizza-oven-16-wood-propane-with-ther", "VEVOR Outdoor Dual Fuel Pizza Oven - 16\" Wood & Propane with Thermometer", "Camping & Outdoor", 29900, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-42-vevor-rv-6-34-gallon-portable-marine-fuel-tank-with-hose-and", "VEVOR RV 6.34-Gallon Portable Marine Fuel Tank with Hose and Gauge for Boats", "RV Parts & Accessories", 7977, "/assets/hero-galaxy-rv.webp"],
  ["ebay-43-travel-rv-comprehensive-297-piece-mechanics-tool-set-off-grid", "Travel RV Comprehensive 297-Piece Mechanics Tool Set Off Grid Storage", "RV Parts & Accessories", 13524, "/assets/hero-galaxy-rv.webp"],
  ["ebay-44-premium-2-story-wooden-cat-house-for-winter-shelter-outdoor", "Premium 2-Story Wooden Cat House for Winter Shelter & Outdoor Use", "Camping & Outdoor", 9921, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-45-solar-inverter-4-pack-wall-mount-rv-rack-mount-cantilever-she", "Solar Inverter 4-Pack Wall Mount RV Rack Mount Cantilever Shelf for 19\"", "Solar & Off-Grid", 4299, "/assets/solar/builder/panel.svg"],
  ["ebay-46-rv-12v-dual-battery-isolation-kit-for-rvs-and-boats-140amp-v", "RV 12V Dual Battery Isolation Kit for RVs and Boats - 140AMP VSR Relay System", "Solar & Off-Grid", 7700, "/assets/solar/builder/panel.svg"],
  ["ebay-47-portable-led-camping-fan-with-power-bank-remote-control-5200m", "Portable LED Camping Fan with Power Bank & Remote Control - 5200mAh", "Camping & Outdoor", 5500, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-48-portable-personal-water-filter-for-hiking-camping-adventures", "Portable Personal Water Filter for Hiking & Camping Adventures", "Camping & Outdoor", 1500, "/assets/mountain-bull-bear-header.webp"],
  ["ebay-49-adjustable-rv-screen-door-guard-pet-safe-entry-protector-blac", "Adjustable RV Screen Door Guard - Pet Safe Entry Protector, Black", "RV Parts & Accessories", 3766, "/assets/hero-galaxy-rv.webp"],
];

export function manualRvCatalog() {
  const updatedAt = "2026-08-23T06:22:00.000Z";
  return catalog.map(([id, name, category, priceCents, imageUrl]) => ({
    id,
    sku: id.toUpperCase(),
    name,
    category,
    priceCents,
    fulfillmentMode: "supplier_managed",
    quantityAvailable: null,
    availability: "Active eBay listing",
    salesChannels: ["ebay", "website"],
    imageUrl,
    buyUrl: sellerSearch(name),
    updatedAt,
    manualFallback: true,
    sellerValidated: true,
  }));
}
