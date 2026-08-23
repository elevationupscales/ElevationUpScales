const SELLER = "elevationupscalesshop";

function sellerSearch(query) {
  const url = new URL("https://www.ebay.com/sch/i.html");
  url.searchParams.set("_ssn", SELLER);
  url.searchParams.set("_nkw", query);
  url.searchParams.set("_sop", "10");
  return url.toString();
}

const definitions = [
  ["manual-rv-parts", "RV Parts & Accessories", "RV Parts & Accessories", "rv camper parts accessories"],
  ["manual-camping", "Camping & Outdoor Gear", "Camping & Outdoor", "camping outdoor gear"],
  ["manual-offgrid", "Solar & Off-Grid Gear", "Solar & Off-Grid", "solar battery inverter off grid"],
  ["manual-road", "Towing & Road Gear", "Towing & Road", "rv towing hitch road gear"],
  ["manual-electrical", "RV Electrical & Power", "RV Electrical & Power", "rv 12v electrical power converter"],
  ["manual-water", "RV Water & Plumbing", "RV Water & Plumbing", "rv water pump plumbing sewer"],
];

export function manualRvCatalog() {
  const updatedAt = "2026-08-23T06:00:00.000Z";
  return definitions.map(([id, name, category, query]) => ({
    id,
    sku: id.toUpperCase(),
    name,
    category,
    priceCents: 0,
    fulfillmentMode: "supplier_managed",
    quantityAvailable: null,
    availability: "Browse current eBay inventory",
    salesChannels: ["ebay", "website"],
    imageUrl: "",
    buyUrl: sellerSearch(query),
    updatedAt,
    manualFallback: true,
  }));
}
