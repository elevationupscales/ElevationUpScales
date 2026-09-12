# Company Operations — Kingboss Current Catalog Image Map Sent

**Date:** 2026-09-11 MDT  
**Owner:** Casey Young  
**Lane:** Company Operations / Kingboss vendor-source support  
**State:** SENT / AWAITING KINGBOSS SKU MAP

## Reconciliation result

Company Operations reconciled the canonical live Elevation lithium catalog API against the preserved Sep. 7 Doba source set.

- Live published records in the lithium API: **40**
- Authorized SOK records: **2**
- Published Doba records supplied by Kingboss: **38**
- Preserved Kingboss source rows with zero inventory and not present in the published live set: **5**

The 38-record intersection was exact. The supplier mapping packet therefore uses the live published set rather than the currently degraded `/kingboss-batteries` visual storefront renderer.

## Supplier packet

Sent to Kingboss in the existing wholesale/compliance thread:

`Kingboss_Current_Elevation_Catalog_Image_Reference_2026-09-11.zip`

Contents:

- `00_READ_ME_FIRST.txt`
- `00_MANIFEST.csv`
- `00_CONTACT_SHEET.html`
- 38 individual labeled HTML image-reference cards

The HTML files reference the exact current Doba source-image URLs from the live catalog; no product artwork was edited or regenerated. No costs, pricing commitments, wholesale quantities, or private account data were included.

## Current published Kingboss-supplied SKU set

1. `D0102X39TJV-111`
2. `D0102X33PPW-159`
3. `D01027H729U-Power-Bank1`
4. `D01027HH5XY-153`
5. `D0102X30VF7-224`
6. `D0102HQ76JU-100AH-B`
7. `D0102X33HNY-Power-Bank1-4`
8. `D0102X33HWU-Power-Bank1-1`
9. `D0102X33HKV-Power-Bank1-2`
10. `D0102X33HN7-Power-Bank1-3`
11. `D01027HH55U-155`
12. `D01027HH5JV-20`
13. `D01027HEY4V-226`
14. `D0102X39UCY-138`
15. `D01027HH5RV-156`
16. `D01027HEYT7-228`
17. `D01027HEYKA-223`
18. `D01027HEYKW-225`
19. `D0102X3L1Q7-221`
20. `D0102X3L1QY-222`
21. `D0102X39TYW-15`
22. `D0102X33E6A-152`
23. `D0102X33FAA-160`
24. `D0102X3GZMY-132`
25. `D0102HI2MDU-10000mAh`
26. `D01027HHE07-001`
27. `D0102X3GZZA-148`
28. `D01027HH7S7-11`
29. `D0102X3L10G-227`
30. `D0102X3L1JV-230`
31. `D01027HH7BV-136`
32. `D0102X33ESY-117`
33. `D0102X3L10U-229`
34. `D0102X39F27-135`
35. `D01027HRIWW-2-1`
36. `D01027HH70V-119`
37. `D0102X39FGA-137`
38. `D0102X39F2Y-114`

## Supplier requests now open

Kingboss is asked to return:

1. the internal Kingboss model/SKU mapping for the 38 currently published source records; and
2. written confirmation of the compliance crosswalk `D01027HH7BV → Kingboss Model 133 → report model ZM12100` so the received UN38.3/MSDS are bound to the correct commercial model.

## Separate technical state

The public Kingboss visual storefront still reports the catalog temporarily unavailable even though the canonical live API is responding. That UI/runtime defect remains routed separately and does not block supplier SKU mapping.

Control:

`LIVE API SET → EXACT KINGBOSS SOURCE INTERSECTION → IMAGE REFERENCE PACKET → SUPPLIER SKU MAP → DIRECT CATALOG CLEANUP.`
