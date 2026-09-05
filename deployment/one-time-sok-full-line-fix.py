#!/usr/bin/env python3
from pathlib import Path
import sys
root=Path(sys.argv[1]).resolve()

def patch(rel,old,new):
    p=root/rel;text=p.read_text(encoding='utf-8')
    if old not in text: raise SystemExit(f'missing patch marker {rel}: {old[:100]}')
    p.write_text(text.replace(old,new,1),encoding='utf-8')

# Keep structured product-aware inquiry as the primary customer path. The accepted
# SOK gate intentionally avoids mailto as the transaction system of record.
p=root/'site/sok-order.html';text=p.read_text(encoding='utf-8')
text=text.replace('<p>Prefer direct email? <a id="sok-order-email-link" href="mailto:casey@elevationupscales.com">casey@elevationupscales.com</a></p>','<p>Public inquiry destination: <strong id="sok-order-email-link">casey@elevationupscales.com</strong></p>')
p.write_text(text,encoding='utf-8')
p=root/'site/sok-order.js';text=p.read_text(encoding='utf-8')
text=text.replace('emailLink=document.querySelector("#sok-order-email-link");','emailLink=document.querySelector("#sok-order-email-link");')
text=text.replace('emailLink.href=`mailto:casey@elevationupscales.com?subject=${encodeURIComponent(`SOK ${product.sku} product inquiry`)}&body=${encodeURIComponent(`Product: ${location.origin}${product.detailUrl||"/sok-batteries"}\\nQuantity: ${qtyEl.value||1}\\nDestination ZIP: `)}`;','emailLink.textContent="casey@elevationupscales.com";')
p.write_text(text,encoding='utf-8')

p=root/'site/sok-full-line-runtime.js';text=p.read_text(encoding='utf-8')
old='''  const email=`mailto:${PUBLIC_EMAIL}?subject=${encodeURIComponent(`SOK ${product.sku} product inquiry`)}&body=${encodeURIComponent(`I am interested in ${product.title}.\\n\\nProduct: https://elevationupscales.com${product.detailUrl}\\nQuantity:\\nDestination ZIP:\\nIntended use:\\n`)}`;\n  const primary=product.publicPurchaseMode==="COMMERCIAL_ONLY"?`<a class="button button-primary" data-sok-page-action="commercial" href="${commercial}">Request Commercial Pricing</a>`:`<a class="button button-primary" data-sok-page-action="purchase-options" href="${po}">See Purchase Options</a>`;\n  const hawaii=product.batteryRelevant?`<a class="button button-outline" data-sok-page-action="hawaii" href="/sok-order.html?sku=${encodeURIComponent(product.sku)}&intent=hawaii&state=HI">Check Hawaii Availability</a>`:"";\n  return `<div class="sok-product-actions">${primary}<a class="button button-outline" data-sok-page-action="email" href="${esc(email)}">Email Us About This Product</a><a class="button button-outline" data-sok-page-action="commercial" href="${commercial}">Request Commercial Pricing</a>${hawaii}</div>`;'''
new='''  const inquiry=`/sok-order.html?sku=${encodeURIComponent(product.sku)}&intent=product`;\n  const primary=product.publicPurchaseMode==="COMMERCIAL_ONLY"?`<a class="button button-primary" data-sok-page-action="commercial" href="${commercial}">Request Commercial Pricing</a>`:`<a class="button button-primary" data-sok-page-action="purchase-options" href="${po}">See Purchase Options</a>`;\n  const hawaii=product.batteryRelevant?`<a class="button button-outline" data-sok-page-action="hawaii" href="/sok-order.html?sku=${encodeURIComponent(product.sku)}&intent=hawaii&state=HI">Check Hawaii Availability</a>`:"";\n  return `<div class="sok-product-actions">${primary}<a class="button button-outline" data-sok-page-action="email" href="${inquiry}">Email Us About This Product</a><a class="button button-outline" data-sok-page-action="commercial" href="${commercial}">Request Commercial Pricing</a>${hawaii}</div><p class="sok-public-email">Public inquiry destination: ${PUBLIC_EMAIL}</p>`;'''
if old not in text: raise SystemExit('runtime email action patch marker missing')
p.write_text(text.replace(old,new,1),encoding='utf-8')
print('SOK full-line accepted inquiry-path repair applied')
