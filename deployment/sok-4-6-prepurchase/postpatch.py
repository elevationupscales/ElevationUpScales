from pathlib import Path
import sys
repo=Path(sys.argv[1]).resolve()
p=repo/'site/sok-availability-runtime.js'
text=p.read_text()
old="""    await db.prepare(`UPDATE eus_sok_product_ops SET lifecycle_state='HAZMAT DOCUMENTED',sds_state='RECEIVED',un38_state='RECEIVED',hazmat_document_state='DOCUMENTED / READY FOR CARRIER REVIEW',updated_at=CASE WHEN updated_by='system-baseline' THEN ? ELSE updated_at END WHERE upper(sku)=?`).bind(stamp,sku).run();"""
new="""    await db.prepare(`UPDATE eus_sok_product_ops SET voltage=?,capacity='100Ah',energy=?,lifecycle_state='HAZMAT DOCUMENTED',sds_state='RECEIVED',un38_state='RECEIVED',hazmat_document_state='DOCUMENTED / READY FOR CARRIER REVIEW',updated_at=CASE WHEN updated_by='system-baseline' THEN ? ELSE updated_at END WHERE upper(sku)=?`).bind(d.voltage,`${d.energyWh}Wh`,stamp,sku).run();"""
if text.count(old)!=1:
    raise SystemExit(f'exact SOK evidence anchor not found: {text.count(old)}')
p.write_text(text.replace(old,new,1))
print('Exact SOK voltage/Wh evidence normalization applied')
