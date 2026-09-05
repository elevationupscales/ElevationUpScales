#!/usr/bin/env python3
from pathlib import Path
import re
import sys
root=Path(sys.argv[1]).resolve()

# Keep structured product-aware inquiry as the primary customer path. The accepted
# SOK commercialization gate intentionally avoids mailto as the transaction system
# of record. Public email may be displayed, but every action must retain product
# context through the structured SOK request workflow.

p=root/'site/sok-order.html'
text=p.read_text(encoding='utf-8')
text=re.sub(
    r'<p>Prefer direct email\?\s*<a[^>]*id="sok-order-email-link"[^>]*>casey@elevationupscales\.com</a></p>',
    '<p>Public inquiry destination: <strong id="sok-order-email-link">casey@elevationupscales.com</strong></p>',
    text,
    flags=re.I,
)
# Defensive removal in case a template variant remains.
text=text.replace('mailto:casey@elevationupscales.com','/sok-order.html')
p.write_text(text,encoding='utf-8')

p=root/'site/sok-order.js'
text=p.read_text(encoding='utf-8')
# The generated client previously assigned a mailto URL to the public email node.
# The node is now display-only; product inquiry is a structured intent button.
text=text.replace('mailto:casey@elevationupscales.com','/sok-order.html')
# Normalize the assignment if the generator emitted it. The element may be a
# <strong>, so only textContent is needed.
text=re.sub(r'emailLink\.href=`/sok-order\.html\?subject=\$\{encodeURIComponent\([\s\S]*?\)\}`;',
            'emailLink.textContent="casey@elevationupscales.com";',text,count=1)
p.write_text(text,encoding='utf-8')

p=root/'site/sok-full-line-runtime.js'
text=p.read_text(encoding='utf-8')
old='''  const email=`mailto:${PUBLIC_EMAIL}?subject=${encodeURIComponent(`SOK ${product.sku} product inquiry`)}&body=${encodeURIComponent(`I am interested in ${product.title}.\\n\\nProduct: https://elevationupscales.com${product.detailUrl}\\nQuantity:\\nDestination ZIP:\\nIntended use:\\n`)}`;\n  const primary=product.publicPurchaseMode==="COMMERCIAL_ONLY"?`<a class="button button-primary" data-sok-page-action="commercial" href="${commercial}">Request Commercial Pricing</a>`:`<a class="button button-primary" data-sok-page-action="purchase-options" href="${po}">See Purchase Options</a>`;\n  const hawaii=product.batteryRelevant?`<a class="button button-outline" data-sok-page-action="hawaii" href="/sok-order.html?sku=${encodeURIComponent(product.sku)}&intent=hawaii&state=HI">Check Hawaii Availability</a>`:"";\n  return `<div class="sok-product-actions">${primary}<a class="button button-outline" data-sok-page-action="email" href="${esc(email)}">Email Us About This Product</a><a class="button button-outline" data-sok-page-action="commercial" href="${commercial}">Request Commercial Pricing</a>${hawaii}</div>`;'''
new='''  const inquiry=`/sok-order.html?sku=${encodeURIComponent(product.sku)}&intent=product`;\n  const primary=product.publicPurchaseMode==="COMMERCIAL_ONLY"?`<a class="button button-primary" data-sok-page-action="commercial" href="${commercial}">Request Commercial Pricing</a>`:`<a class="button button-primary" data-sok-page-action="purchase-options" href="${po}">See Purchase Options</a>`;\n  const hawaii=product.batteryRelevant?`<a class="button button-outline" data-sok-page-action="hawaii" href="/sok-order.html?sku=${encodeURIComponent(product.sku)}&intent=hawaii&state=HI">Check Hawaii Availability</a>`:"";\n  return `<div class="sok-product-actions">${primary}<a class="button button-outline" data-sok-page-action="email" href="${inquiry}">Email Us About This Product</a><a class="button button-outline" data-sok-page-action="commercial" href="${commercial}">Request Commercial Pricing</a>${hawaii}</div><p class="sok-public-email">Public inquiry destination: ${PUBLIC_EMAIL}</p>`;'''
if old in text:
    text=text.replace(old,new,1)
else:
    # If the exact generator formatting changes, still refuse any public mailto
    # action rather than silently weakening the structured inquiry path.
    text=text.replace('mailto:${PUBLIC_EMAIL}','/sok-order.html')
p.write_text(text,encoding='utf-8')

order=(root/'site/sok-order.html').read_text(encoding='utf-8')+(root/'site/sok-order.js').read_text(encoding='utf-8')
if re.search(r'mailto:casey@elevationupscales\.com',order,re.I):
    raise SystemExit('structured inquiry repair failed: mailto remains in SOK order path')
if '/api/sok/reservations' not in order:
    raise SystemExit('structured inquiry repair failed: reservation API missing')
print('SOK full-line accepted inquiry-path repair applied')
