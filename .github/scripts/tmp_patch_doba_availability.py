from pathlib import Path


def replace_once(path, old, new):
    p = Path(path)
    text = p.read_text()
    count = text.count(old)
    if count != 1:
        raise SystemExit(f"{path}: expected one match, found {count}")
    p.write_text(text.replace(old, new, 1))


replace_once(
    "site/_worker.js",
    'const stock=Number(p.supplierStock);if(Number.isFinite(stock)&&stock<=0)return false;',
    'const rawStock=p.supplierStock,hasStock=rawStock!==null&&rawStock!==undefined&&String(rawStock).trim()!=="";if(hasStock){const stock=Number(rawStock);if(Number.isFinite(stock)&&stock<=0)return false;}',
)

replace_once(
    "site/_worker.js",
    'const direct=supplier==="doba"&&clean(product?.publishStatus,30).toLowerCase()==="published"&&clean(product?.shippingStatus,30).toLowerCase()==="verified"&&Number(product?.priceCents)>0;',
    'const rawStock=product?.supplierStock,hasStock=rawStock!==null&&rawStock!==undefined&&String(rawStock).trim()!=="",supplierStock=hasStock?Number(rawStock):null;const direct=supplier==="doba"&&clean(product?.publishStatus,30).toLowerCase()==="published"&&clean(product?.shippingStatus,30).toLowerCase()==="verified"&&hasStock&&Number.isFinite(supplierStock)&&supplierStock>0&&Number(product?.priceCents)>0;',
)

replace_once(
    "site/_worker.js",
    'const buy=direct?`/checkout/?source=rv&id=${encodeURIComponent(id)}&name=${encodeURIComponent(raw)}`:(/^\\d{12}$/.test(ebay)?`https://www.ebay.com/itm/${ebay}`:(/^https?:\\/\\//i.test(sourceUrl)?sourceUrl:""));',
    'const buy=direct?`/checkout/?source=rv&id=${encodeURIComponent(id)}&name=${encodeURIComponent(raw)}`:(supplier==="doba"?"":(/^\\d{12}$/.test(ebay)?`https://www.ebay.com/itm/${ebay}`:(/^https?:\\/\\//i.test(sourceUrl)?sourceUrl:"")));',
)

replace_once(
    "site/catalog-admin-runtime.js",
    'purchaseUrl: (() => { const source=clean(p.sourceType,40).toLowerCase(); const ebay=clean(p.ebayItemId,20); const section=p.storeSection==="lithium-batteries"?"lithium":"rv"; if(source==="doba" && clean(p.publishStatus,30).toLowerCase()==="published" && clean(p.shippingStatus,30).toLowerCase()==="verified" && Number(priced.priceCents)>0) return `/checkout/?source=${section}&id=${encodeURIComponent(p.id)}&name=${encodeURIComponent(p.title)}`; if(/^\\d{12}$/.test(ebay)) return `https://www.ebay.com/itm/${ebay}`; return ""; })(),',
    'purchaseUrl: (() => { const source=clean(p.sourceType,40).toLowerCase(); const ebay=clean(p.ebayItemId,20); const section=p.storeSection==="lithium-batteries"?"lithium":"rv"; const hasSupplierStock=p.supplierStock!==null&&p.supplierStock!==undefined&&String(p.supplierStock).trim()!==""; const supplierStock=hasSupplierStock?Number(p.supplierStock):null; if(source==="doba" && clean(p.publishStatus,30).toLowerCase()==="published" && clean(p.shippingStatus,30).toLowerCase()==="verified" && hasSupplierStock && Number.isFinite(supplierStock) && supplierStock>0 && Number(priced.priceCents)>0) return `/checkout/?source=${section}&id=${encodeURIComponent(p.id)}&name=${encodeURIComponent(p.title)}`; if(source!=="doba" && /^\\d{12}$/.test(ebay)) return `https://www.ebay.com/itm/${ebay}`; return ""; })(),',
)
