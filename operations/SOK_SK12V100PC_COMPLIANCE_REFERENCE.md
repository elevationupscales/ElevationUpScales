# SOK SK12V100PC Compliance Reference

Status: PUBLIC-SAFE DERIVED REFERENCE

Purpose: give Operations, Logistics, Store, and deployment workers one readable exact-model reference for the operational facts extracted from the recovered SK12V100PC transport classification, MSDS, UN38.3 report, and UN38.3 summary.

**Important:** this file is not a shipping approval, not carrier acceptance, and not a substitute for the original manufacturer/test-lab PDFs. Use the source documents for external submissions when requested.

## 1. Exact product identity

- Commercial model: SOK SK12V100PC
- Chemistry: lithium iron phosphate (LiFePO4), treated in the reports as a lithium-ion battery
- Nominal battery voltage: 12.8 V
- Rated capacity: 100 Ah
- Rated energy: 1,280 Wh
- UN38.3 test mass: 9.606 kg
- UN38.3 battery dimensions: 259.66 x 209.89 x 170.49 mm
- Approximate appearance in the test records: white, approximately cuboid
- Cell model in the UN38.3 report: CB79-100Ah
- Cell configuration: 4 cells, 4S1P

### Electrical values printed in the UN38.3 report

Battery values:
- Limited charge voltage: 14.6 V
- Standard charge current: 50 A
- Standard discharge current: 100 A
- Maximum continuous charge current: 100 A
- Maximum continuous discharge current: 100 A

Cell values:
- Nominal voltage: 3.2 V
- Rated capacity: 100 Ah
- Limited charge voltage: 3.65 V
- Cut-off voltage: 2.5 V
- Standard charge current: 50 A
- Standard discharge current: 50 A
- Maximum continuous charge current: 100 A
- Maximum continuous discharge current: 100 A
- Cell dimensions: 147.96 x 115.47 x 52.28 mm
- Cell test weight: 1.827 kg

### Source anomaly requiring caution

The UN38.3 report prints a **battery cut-off voltage of 13.8 V**. That value is higher than the same report's 12.8 V nominal battery voltage and should therefore be treated as a source-document anomaly until SOK/manufacturer product documentation confirms the intended value. Do not use 13.8 V as a customer-facing configuration, BMS, charger, or installation setting solely because it appears in this test report.

## 2. UN38.3 qualification

Full report: `TSZ25J3036A03-01`

Test standard:
- UN Manual of Tests and Criteria
- Revision 8
- Subsection 38.3

Test period:
- 2025-09-05 through 2025-09-23

Report issue date:
- 2025-09-28

Test conclusion:
- The submitted SK12V100PC samples complied with the cited UN38.3 requirements.

All eight test groups are recorded as PASS:
- T.1 Altitude Simulation - PASS
- T.2 Thermal Test - PASS
- T.3 Vibration - PASS
- T.4 Shock - PASS
- T.5 External Short Circuit - PASS
- T.6 Impact/Crush - PASS
- T.7 Overcharge - PASS
- T.8 Forced Discharge - PASS

The detailed report's `O` result notation indicates the required absence of specified failure conditions for the applicable test, such as leakage, venting, disassembly, rupture, and/or fire depending on the test.

The one-page UN38.3 summary is project `TSZ25J3036A03-02`, references full report `TSZ25J3036A03-01`, and also records T.1-T.8 as PASS.

## 3. Standalone sea transport classification

Sea classification source:
- Issued number: `SEKSZ202512197099PXY360001`
- Item number: `SEKSZ202512197099`
- Criteria: IMDG Code, Amendment 42-24
- Issued date: 2025-12-20
- Effective date shown: 2026-01-01
- Cover validity notice: through 2026-12-31

Classification for the exact standalone battery:
- Dangerous goods: YES
- UN number: UN3480
- Proper Shipping Name: Lithium ion batteries
- Class / Division: 9
- Watt-hour rating: 1,280 Wh (>100 Wh)
- Package described in the report: 1 battery per package; cells or batteries only
- UN38.3: confirmed
- Quality-management-program manufacture: confirmed
- Returned/waste/recycling battery condition: report confirms this is not that category
- Marine-pollutant status in the MSDS: No

Packaging statements recorded by the sea classification report:
- Packaging must meet Packing Group II performance standard.
- Each single battery must be packed to prevent short circuits under normal transport conditions.
- Battery must be packed in strong outer packaging.

Important interpretation:
- UN3480 Class 9 does not itself receive a conventional packing-group assignment. The report's PG II language is a **packaging performance requirement**, not a statement that the product is assigned Packing Group II.
- Special Provision 188 / 1.2 m drop-test / related small-battery simplified-package items are marked not applicable in this report for this 1,280 Wh battery.

## 4. Standalone road transport classification

Road classification source:
- Issued number: `AEKSZ202512190529PXY160001`
- Item number: `AEKSZ202512190529`
- Criteria: ADR 2025
- Issued date: 2025-12-20
- Effective date shown: 2026-01-01
- Cover validity notice: through 2026-12-31

Classification for the exact standalone battery:
- Dangerous goods: YES
- UN number: UN3480
- Proper Shipping Name: Lithium ion batteries
- Class / Division: 9
- Watt-hour rating: 1,280 Wh (>100 Wh)
- Package described in the report: 1 battery per package; cells or batteries only
- UN38.3: confirmed
- Packaging must meet Packing Group II performance standard
- Each single battery must be protected against short circuit and placed in strong outer packaging

## 5. MSDS safety reference

MSDS report: `TSZ25M3082A01-01`

Issue date:
- 2025-12-17

Annual validity notice:
- through 2026-12-31

### Composition printed in the MSDS

- Lithium iron phosphate (LiFePO4), CAS 15365-14-7 - 24%
- Graphite (C), CAS 7782-42-5 - 10-30%
- Lithium hexafluorophosphate (LiPF6), CAS 21324-40-3 - 23%
- Copper (Cu), CAS 7440-50-8 - 7-13%
- Aluminium (Al), CAS 7429-90-5 - 5-10%
- Nickel (Ni), CAS 7440-02-0 - 1-5%

These percentages are reproduced only because they are safety-relevant source facts. Do not infer cell chemistry, performance, or commercial formulation beyond what the source states.

### Normal-condition hazard posture

The MSDS treats many hazard-label elements as not applicable for the intact product under normal conditions. Operational risk increases if the enclosure is mechanically, thermally, or electrically abused, opened, ruptured, crushed, punctured, overheated, overcharged, short-circuited, or leaking.

### First aid for exposure to released contents

- Eyes: flush with plenty of water for at least 15 minutes; seek medical attention.
- Skin: remove contaminated clothing and rinse with plenty of water / shower for about 15 minutes; seek medical attention.
- Inhalation: move to fresh air; provide oxygen if needed/available; seek medical attention.
- Ingestion: source directs giving milk or water and seeking medical help; follow current medical/emergency guidance rather than relying on an internal summary.

### Fire response

- Extinguishing media listed: hydrocarbon surfactant and CO2
- Special procedure: self-contained breathing apparatus
- Excessive heat can cause venting and expose battery contents
- Hazardous combustion products listed: carbon monoxide, carbon dioxide, and lithium oxide fumes

### Leakage / spill response

- Remove personnel from the affected area until fumes dissipate.
- Maximize ventilation.
- Avoid skin/eye contact and inhalation of vapors.
- Absorb released liquid with sand, earth, or other inert absorbent material.
- Prevent entry into sewage systems, surface water, or groundwater.
- Collect released material and dispose of it according to applicable law and local requirements.

### Handling

Do not:
- open, destroy, or incinerate the battery;
- short-circuit terminals;
- overcharge or force over-discharge;
- throw into fire;
- crush or puncture;
- immerse in liquids;
- install with incorrect polarity.

### Storage

- Avoid mechanical and electrical abuse.
- Store in a cool, dry, ventilated area with limited temperature variation.
- Avoid high-temperature storage.
- Keep away from heating equipment.
- Avoid prolonged direct sunlight.

### PPE for damaged / leaking battery handling

Under normal intact-product conditions, the MSDS does not call for special respiratory/eye/skin PPE. For an open or leaking battery it calls for suitable protective clothing, gloves, and safety glasses, and recommends ready access to a safety shower and eyewash.

### Conditions to avoid

The MSDS specifically lists:
- heat above 70 C;
- incineration;
- deformation, mutilation, crushing, or disassembly;
- overcharge;
- short circuit;
- prolonged humid exposure.

Incompatible materials listed:
- oxidizing agents;
- acids;
- bases.

Hazardous decomposition products listed:
- carbon monoxide;
- carbon dioxide;
- lithium oxide fumes.

### Disposal

Observe applicable local, state, federal, and other official disposal rules. Do not treat the battery or released contents as ordinary trash solely from this summary.

## 6. General transport references in the MSDS

The MSDS lists:
- UN3480 or UN3481 depending on shipment configuration;
- Class 9;
- IMDG Code Amendment 42-24;
- ADR;
- RID;
- ICAO / IATA DGR 67th edition references.

For air transport, the MSDS references:
- Packing Instruction 965, Section IA; or
- Packing Instructions 966-967, Section I,

as appropriate to shipment configuration.

Do not use this general MSDS wording as automatic air-carrier acceptance. Air eligibility can depend on exact configuration, state of charge, operator variations, route, package, labels/marks, shipper status, and carrier approval.

## 7. What these recovered files now prove internally

For SK12V100PC, the recovered source packet provides readable evidence for:

`EXACT MODEL -> 12.8V / 100Ah / 1280Wh -> UN38.3 PASS -> UN3480 -> CLASS 9 -> SEA IMDG CLASSIFICATION -> ROAD ADR CLASSIFICATION -> SAFETY/HANDLING REFERENCE`

This is enough to stop repeatedly searching email/ZIPs for basic exact-model facts.

## 8. What these files do NOT prove

They do not by themselves prove:
- acceptance by a specific ocean carrier, forwarder, airline, warehouse, terminal, or final-mile provider;
- a particular Hawaii, Alaska, international, or remote-air route;
- a current freight quote;
- current supplier inventory;
- current commercial pricing or MAP;
- shipment-specific state of charge;
- shipment-specific labels, marks, package condition, palletization, or tender instructions;
- carrier-specific paperwork completion;
- current packaging dimensions or gross shipment weight for a customer order.

The UN38.3 dimensions and 9.606 kg mass are **test-sample/product values**, not a substitute for current packed-shipment dimensions and gross packed weight.

## 9. Carrier / warehouse packet minimum

When the route requires dangerous-goods qualification, use the private original source assets and the current shipment data. The minimum packet should normally resolve:

- exact model / SKU: SK12V100PC
- quantity
- 12.8 V / 100 Ah / 1,280 Wh
- UN3480
- Proper Shipping Name: Lithium ion batteries
- Class 9
- original exact-model SDS/MSDS
- original exact-model UN38.3 test summary and/or full report as requested
- current packed dimensions and gross packed weight from the shipment source
- package/mark/label configuration
- state of charge if requested
- origin / shipper identity as required by the booking
- destination and receiving instructions
- carrier-specific DG declaration/checklist where applicable

## 10. Data-quality rule

When this Git reference conflicts with an original source PDF, the original source PDF controls. When a source PDF conflicts with current manufacturer product documentation or carrier requirements, stop and verify before booking or publishing a customer-facing claim.

Do not silently resolve anomalies by assumption.