export const RENOGY_WAVE2_CANDIDATES = Object.freeze([
  {
    id: 'renogy-rsp100dct-g1-us',
    sku: 'RSP100DCT-G1-US',
    name: 'Renogy 100W Mono N-Type Bifacial Rigid Solar Panel',
    retailPriceReference: 109.99,
    upc: '840315254862',
    activationState: 'HOLD_EXACT_DEALER_IDENTITY_ORDERABILITY',
    source: 'RENOGY_SUPPLIED_ITEM_WORKBOOK_2026_09_11'
  },
  {
    id: 'renogy-rbc2125ds-21w-g3-us',
    sku: 'RBC2125DS-21W-G3-US',
    name: 'Renogy IP67 DC-DC Battery Charger with MPPT',
    retailPriceReference: 373.99,
    upc: '840315240315',
    activationState: 'HOLD_CURRENT_DEALER_ORDERABILITY',
    source: 'RENOGY_SUPPLIED_ITEM_WORKBOOK_2026_09_11'
  },
  {
    id: 'renogy-rkit200rv-a30dt1-us',
    sku: 'RKIT200RV-A30DT1-US',
    name: 'Renogy 200W RV Solar Kit',
    retailPriceReference: 518.90,
    upc: null,
    activationState: 'HOLD_MEDIA_ORDERABILITY_VERIFICATION',
    source: 'RENOGY_SUPPLIED_ITEM_WORKBOOK_2026_09_11'
  },
  {
    id: 'renogy-rng-kit-premium400d-rvr40-g4-us',
    sku: 'RNG-KIT-PREMIUM400D-RVR40-G4-US',
    name: 'Renogy 400W 12V Solar Premium Kit',
    retailPriceReference: 639.99,
    upc: '816360028062',
    activationState: 'HOLD_MEDIA_ORDERABILITY_VERIFICATION',
    source: 'RENOGY_SUPPLIED_ITEM_WORKBOOK_2026_09_11'
  },
  {
    id: 'renogy-rcc60rego-g2-us',
    sku: 'RCC60REGO-G2-US',
    name: 'Renogy REGO 60A MPPT Controller',
    retailPriceReference: 516.99,
    upc: '840315224674',
    activationState: 'HOLD_MEDIA_ORDERABILITY_VERIFICATION',
    source: 'RENOGY_SUPPLIED_ITEM_WORKBOOK_2026_09_11'
  },
  {
    id: 'renogy-rbc2115ds-21w-g1-us',
    sku: 'RBC2115DS-21W-G1-US',
    name: 'Renogy REGO 30A Bidirectional DC-DC Battery Charger',
    retailPriceReference: 327.99,
    upc: '840315234062',
    activationState: 'HOLD_MEDIA_ORDERABILITY_VERIFICATION',
    source: 'RENOGY_SUPPLIED_ITEM_WORKBOOK_2026_09_11'
  },
  {
    id: 'renogy-rsp400lsc-g1-us',
    sku: 'RSP400LSC-G1-US',
    name: 'Renogy 400W Compact Suitcase Portable Solar Panel',
    retailPriceReference: 495.99,
    upc: '840315218680',
    activationState: 'HOLD_MEDIA_ORDERABILITY_VERIFICATION',
    source: 'RENOGY_SUPPLIED_ITEM_WORKBOOK_2026_09_11'
  },
  {
    id: 'renogy-rng-invt-2000-12v-p2-g3-us',
    sku: 'RNG-INVT-2000-12V-P2-G3-US',
    name: 'Renogy 2000W 12V Pure Sine Wave Inverter',
    retailPriceReference: 285.99,
    upc: '810081406116',
    activationState: 'HOLD_EXACT_CURRENT_GENERATION_ORDERABILITY',
    source: 'RENOGY_SUPPLIED_ITEM_WORKBOOK_2026_09_11'
  }
]);

export const RENOGY_WAVE2_POLICY = Object.freeze({
  publicRelationship: 'AUTHORIZED_DEALER',
  salesChannel: 'ELEVATION_DIRECT_WEBSITE',
  lower48Shipping: 'SUPPLIER_GUIDANCE_VERIFIED',
  fulfillment: 'RENOGY_DIRECT_DROPSHIP',
  pricingRule: 'USE_VERIFIED_CURRENT_RETAIL_MAP_REFERENCE_ONLY; NEVER COMMIT PROTECTED DEALER COST',
  activationRule: 'NO CHECKOUT UNTIL EXACT SKU ORDERABILITY, CURRENT PRICE CONTROL, MEDIA, AND REQUIRED WARRANTY FACTS ARE VERIFIED'
});
