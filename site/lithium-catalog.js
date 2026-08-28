(() => {
  "use strict";

  const products = [
    {
      id: "D0102X3GZZA-221080",
      source: { provider: "doba", itemNo: "D0102X3GZZA", sku: "D0102X3GZZA-221080", ebayItemId: "168634749004" },
      name: "12V 100Ah LiFePO4 Battery with 100A BMS for Solar and RV Power Needs",
      price: { currency: "USD", cents: 16500, source: "doba-store-export-2026-08-28" },
      specs: { chemistry: "LiFePO4", voltage: 12, voltageLabel: "12V", capacityAh: 100, unitCount: 1 },
      categories: ["12V LiFePO4", "RV & Van Power", "Solar / Off-Grid Storage"],
      imageUrl: "https://image.doba.com/dg7-izqBvdHZFYPh/dspic.jpg",
      inventory: { available: true, quantity: 1, sourceChecked: "2026-08-28" },
      shipping: {
        continentalUS: { eligible: true, priceCents: 2632, verified: false },
        hawaii: { eligible: false, priceCents: null, verified: false }
      },
      purchase: { mode: "ebay-fallback", url: "https://www.ebay.com/itm/168634749004" }
    },
    {
      id: "D0102X364CU-972550",
      source: { provider: "doba", itemNo: "D0102X364CU", sku: "D0102X364CU-972550", ebayItemId: "168634752153" },
      name: "Dual 12V 100Ah LiFePO4 Batteries for Solar Energy Storage & Off-Grid Use",
      price: { currency: "USD", cents: 31822, source: "doba-store-export-2026-08-28" },
      specs: { chemistry: "LiFePO4", voltage: 12, voltageLabel: "12V", capacityAh: 100, unitCount: 2 },
      categories: ["12V LiFePO4", "Solar / Off-Grid Storage"],
      imageUrl: "https://image.doba.com/dg7-OruhSNRnAFcG/dspic.jpg",
      inventory: { available: true, quantity: 1, sourceChecked: "2026-08-28" },
      shipping: {
        continentalUS: { eligible: true, priceCents: 0, verified: false },
        hawaii: { eligible: false, priceCents: null, verified: false }
      },
      purchase: { mode: "ebay-fallback", url: "https://www.ebay.com/itm/168634752153" }
    },
    {
      id: "D0102X30VF7-591857",
      source: { provider: "doba", itemNo: "D0102X30VF7", sku: "D0102X30VF7-591857", ebayItemId: "168634762404" },
      name: "12V LiFePO4 100Ah Deep Cycle Battery for RV, Solar and Camping Use",
      price: { currency: "USD", cents: 15999, source: "doba-store-export-2026-08-28" },
      specs: { chemistry: "LiFePO4", voltage: 12, voltageLabel: "12V", capacityAh: 100, unitCount: 1 },
      categories: ["12V LiFePO4", "RV & Van Power", "Solar / Off-Grid Storage"],
      imageUrl: "https://image.doba.com/dg7-ervRbQENNPJG/dspic.jpg",
      inventory: { available: true, quantity: 1, sourceChecked: "2026-08-28" },
      shipping: {
        continentalUS: { eligible: true, priceCents: 2632, verified: false },
        hawaii: { eligible: false, priceCents: null, verified: false }
      },
      purchase: { mode: "ebay-fallback", url: "https://www.ebay.com/itm/168634762404" }
    },
    {
      id: "D01027HH5RV-681904",
      source: { provider: "doba", itemNo: "D01027HH5RV", sku: "D01027HH5RV-681904", ebayItemId: "168639916934" },
      name: "In Stock 12V 100Ah Lithium Battery — RV LiFePO4",
      price: { currency: "USD", cents: 16933, source: "doba-store-export-2026-08-28" },
      specs: { chemistry: "LiFePO4", voltage: 12, voltageLabel: "12V", capacityAh: 100, unitCount: 1 },
      categories: ["12V LiFePO4", "RV & Van Power"],
      imageUrl: "https://image.doba.com/dg7-NhqLbjFpHcJA/dspic.jpg",
      inventory: { available: true, quantity: 1, sourceChecked: "2026-08-28" },
      shipping: {
        continentalUS: { eligible: true, priceCents: 2632, verified: false },
        hawaii: { eligible: false, priceCents: null, verified: false }
      },
      purchase: { mode: "ebay-fallback", url: "https://www.ebay.com/itm/168639916934" }
    },
    {
      id: "D01027R3A8P-737772",
      source: { provider: "doba", itemNo: "D01027R3A8P", sku: "D01027R3A8P-737772", ebayItemId: "168640016705" },
      name: "48V 100Ah LiFePO4 Battery with 100A BMS and Bluetooth",
      price: { currency: "USD", cents: 119899, source: "doba-store-export-2026-08-28" },
      specs: { chemistry: "LiFePO4", voltage: 48, voltageLabel: "48V", capacityAh: 100, unitCount: 1 },
      categories: ["24V / 36V / 48V", "Solar / Off-Grid Storage"],
      imageUrl: "https://image.doba.com/dg7-nZaHWfqmjePI/dspic.jpg",
      inventory: { available: true, quantity: 1, sourceChecked: "2026-08-28" },
      shipping: {
        continentalUS: { eligible: true, priceCents: 0, verified: false },
        hawaii: { eligible: false, priceCents: null, verified: false }
      },
      purchase: { mode: "ebay-fallback", url: "https://www.ebay.com/itm/168640016705" }
    },
    {
      id: "D010277UEBX-329545",
      source: { provider: "doba", itemNo: "D010277UEBX", sku: "D010277UEBX-329545", ebayItemId: "168639989005" },
      name: "Battery Box for Group 24/27 Trolling Motor and 12V/24V RV Batteries",
      price: { currency: "USD", cents: 5255, source: "doba-store-export-2026-08-28" },
      specs: { chemistry: null, voltage: null, voltageLabel: "12V / 24V", capacityAh: null, unitCount: 1 },
      categories: ["Battery Accessories", "RV & Van Power"],
      imageUrl: "https://image.doba.com/dg7-kApQmMSbTFYf/dspic.jpg",
      inventory: { available: true, quantity: 1, sourceChecked: "2026-08-28" },
      shipping: {
        continentalUS: { eligible: true, priceCents: 0, verified: false },
        hawaii: { eligible: false, priceCents: null, verified: false }
      },
      purchase: { mode: "ebay-fallback", url: "https://www.ebay.com/itm/168639989005" }
    }
  ];

  window.EUS_LITHIUM_CATALOG = Object.freeze(products.map((product) => Object.freeze(product)));
})();
