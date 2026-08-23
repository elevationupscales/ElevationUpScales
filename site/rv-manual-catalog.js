const SELLER = "elevationupscalesshop";

function sellerSearch(query) {
  const url = new URL("https://www.ebay.com/sch/i.html");
  url.searchParams.set("_ssn", SELLER);
  url.searchParams.set("_nkw", query);
  url.searchParams.set("_sop", "10");
  return url.toString();
}

const catalog = [
  ["manual-runbox-wallet", "RUNBOX Wallet for Men · RFID Bifold", "Elevation Picks", "RUNBOX wallet men RFID bifold"],
  ["manual-carbon-wallet", "Slim RFID Carbon Fiber Wallet · Men’s Card & ID Holder", "Elevation Picks", "carbon fiber wallet RFID slim"],
  ["manual-renogy-wonderer", "Renogy Wonderer Solar Charge Controller", "Solar & Off-Grid", "Renogy Wonderer solar charge controller"],
  ["manual-rv-storage", "RV Storage Organizers", "RV Organization", "RV storage organizers"],
  ["manual-seat-storage", "Camper Back-of-Seat Storage", "RV Organization", "camper back seat storage organizer"],
  ["manual-hanging-storage", "Hanging Camper Organizers", "RV Organization", "hanging camper organizer"],
  ["manual-camp-organization", "Campsite Organization Gear", "Camping & Outdoor", "campsite organization gear"],
  ["manual-12v", "12V RV Accessories", "RV Electrical & Power", "12V RV accessories"],
  ["manual-rv-chargers", "RV Chargers & Electrical Equipment", "RV Electrical & Power", "RV charger electrical equipment"],
  ["manual-water", "RV Water System Components", "RV Water & Plumbing", "RV water system components"],
  ["manual-motorhome", "Motorhome Components & Accessories", "RV Parts & Accessories", "motorhome components accessories"],
  ["manual-universal", "Universal Camper Accessories", "RV Parts & Accessories", "universal camper accessories"],
];

export function manualRvCatalog() {
  const updatedAt = "2026-08-23T06:05:00.000Z";
  return catalog.map(([id, name, category, query]) => ({
    id,
    sku: id.toUpperCase(),
    name,
    category,
    priceCents: 0,
    fulfillmentMode: "supplier_managed",
    quantityAvailable: null,
    availability: "Available through Elevation eBay inventory",
    salesChannels: ["ebay", "website"],
    imageUrl: "",
    buyUrl: sellerSearch(query),
    updatedAt,
    manualFallback: true,
  }));
}
