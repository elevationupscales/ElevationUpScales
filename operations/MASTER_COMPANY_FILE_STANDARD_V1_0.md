# Elevation UpScales — Master Company File Standard V1.0

**Version:** 1.0  
**Status:** CONTROLLING INDEX/STORAGE STANDARD

## Purpose

Maintain one indexed company source structure acting as the durable company “hard drive” for approved operating materials.

## Master Company File categories

- corporate/business verification and licensing records;
- brand assets, logos and approved media;
- supplier/vendor authorizations and agreements;
- catalog/listing source files and normalized mappings;
- warranty/RMA/returns source material;
- shipping/logistics/commercial partner profiles;
- marketplace/channel authorization records;
- safe operating receipts/manifests;
- project/vendor packet indexes.

## Vendor Master Packet

Each approved product Vendor Project maintains one durable packet/source structure containing, where applicable:

- dealer/reseller/brand authorization;
- agreements/account information;
- product catalog/feed/spreadsheets/SKU mapping;
- titles/descriptions/specifications;
- approved images/media;
- MAP/pricing/channel rules;
- inventory/availability source + refresh method;
- fulfillment/drop-ship rules;
- warehouse/origin/freight profile;
- lithium/DG/compliance records;
- warranty/RMA/returns;
- shipping rules;
- marketplace restrictions;
- contact/escalation references;
- import/listing files;
- historical source versions;
- deployment/listing receipts;
- first-order proof/exceptions.

## Public Git boundary

Public Git should hold safe indexes, state, S.O.P.s, mappings, manifests and receipts.

Do not place raw secrets, credentials, tax identifiers, protected personal data or unnecessarily sensitive supplier documents into public Git.

## Large-package standard

Large prompt/source/recon/deployment packages should be ZIP-first where practical and include:

`00_START_HERE.md` + controlling source/prompt/S.O.P. + supporting files + manifest/index + source/version/date + SHA256 manifest when appropriate.
