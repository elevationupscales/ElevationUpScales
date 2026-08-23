const SELLER = "elevationupscalesshop";

function sellerSearch(query) {
  const url = new URL("https://www.ebay.com/sch/i.html");
  url.searchParams.set("_ssn", SELLER);
  url.searchParams.set("_nkw", query);
  url.searchParams.set("_sop", "10");
  return url.toString();
}

const catalog = [
  ["manual-runbox-wallet", "RUNBOX Wallet for Men · RFID Bifold", "Elevation Picks", "RUNBOX wallet men RFID bifold", "/assets/marketplace/marketplace-premium-hero-mobile.webp"],
  ["manual-carbon-wallet", "Slim RFID Carbon Fiber Wallet · Men’s Card & ID Holder", "Elevation Picks", "carbon fiber wallet RFID slim", "/assets/marketplace/marketplace-premium-hero-desktop.webp"],
  ["manual-renogy-wonderer", "Renogy Wonderer Solar Charge Controller", "Solar & Off-Grid", "Renogy Wonderer solar charge controller", "/assets/solar/builder/panel.svg"],
  ["manual-rv-storage", "RV Storage Organizers", "RV Organization", "RV storage organizers", "/assets/hero-galaxy-rv.webp"],
  ["manual-seat-storage", "Camper Back-of-Seat Storage", "RV Organization", "camper back seat storage organizer", "/assets/marketplace/marketplace-hero-mobile.webp"],
  ["manual-hanging-storage", "Hanging Camper Organizers", "RV Organization", "hanging camper organizer", "/assets/marketplace/marketplace-hero-desktop.webp"],
  ["manual-camp-organization", "Campsite Organization Gear", "Camping & Outdoor", "campsite organization gear", "/assets/mountain-bull-bear-header.webp"],
  ["manual-12v", "12V RV Accessories", "RV Electrical & Power", "12V RV accessories", "/assets/solar/builder/panel.svg"],
  ["manual-rv-chargers", "RV Chargers & Electrical Equipment", "RV Electrical & Power", "RV charger electrical equipment", "/assets/solar/builder/panel.svg"],
  ["manual-water", "RV Water System Components", "RV Water & Plumbing", "RV water system components", "/assets/hero-galaxy-fifth-wheel-9-1-4.webp"],
  ["manual-motorhome", "Motorhome Components & Accessories", "RV Parts & Accessories", "motorhome components accessories", "/assets/hero-galaxy-rv.webp"],
  ["manual-universal", "Universal Camper Accessories", "RV Parts & Accessories", "universal camper accessories", "/assets/marketplace/marketplace-hero-mobile.webp"],
];

export function manualRvCatalog() {
  const updatedAt = "2026-08-23T06:18:00.000Z";
  return catalog.map(([id, name, category, query, imageUrl]) => ({
    id,
    sku: id.toUpperCase(),
    name,
    category,
    priceCents: 0,
    fulfillmentMode: "supplier_managed",
    quantityAvailable: null,
    availability: "Available through Elevation eBay inventory",
    salesChannels: ["ebay", "website"],
    imageUrl,
    buyUrl: sellerSearch(query),
    updatedAt,
    manualFallback: true,
  }));
}
