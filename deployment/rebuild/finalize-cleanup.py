#!/usr/bin/env python3
from pathlib import Path
import json
ROOT=Path('.')
site=ROOT/'site'
worker=site/'_worker.js'
routes=site/'_routes.json'
redirects=site/'_redirects'
qa=ROOT/'deployment/qa'; qa.mkdir(parents=True,exist_ok=True)

w=worker.read_text()
old='if (internalRuntimePaths.has(url.pathname)) return new Response("Not found", { status: 404, headers: { "Cache-Control":"no-store", "X-Content-Type-Options":"nosniff" } });'
new='if (url.pathname.startsWith("/worker/") || internalRuntimePaths.has(url.pathname)) return new Response("Not found", { status: 404, headers: { "Cache-Control":"no-store", "X-Content-Type-Options":"nosniff" } });'
if new not in w:
    if old not in w: raise SystemExit('Expected internal runtime protection guard not found')
    w=w.replace(old,new,1)
    worker.write_text(w)

r=json.loads(routes.read_text())
inc=r.get('include',[])
if '/worker/*' not in inc:
    try: idx=inc.index('/worker-core.js')+1
    except ValueError: idx=len(inc)
    inc.insert(idx,'/worker/*')
r['include']=inc
routes.write_text(json.dumps(r,indent=2)+"\n")

legacy_css=site/'admin-command-center-pass1.css'
css_disposition='NOT PRESENT'
if legacy_css.exists():
    refs=[]
    for p in site.rglob('*'):
        if not p.is_file() or p==legacy_css: continue
        if p.suffix.lower() not in {'.html','.js','.css','.json','.xml','.txt'}: continue
        try: text=p.read_text(errors='ignore')
        except Exception: continue
        if 'admin-command-center-pass1.css' in text: refs.append(str(p))
    if refs:
        css_disposition='RETAINED — references remain: '+', '.join(refs)
    else:
        legacy_css.unlink(); css_disposition='RETIRED — zero repository/page references; accepted cascade already folded into admin-command-center.css'

routing=qa/'RUNTIME_ROUTING_AUDIT.md'
routing.write_text('\n'.join([
 '# Website Rebuild — Runtime Routing Audit','',
 '## Disposition','',
 '- `_routes.json` remains the Cloudflare Pages interception contract.',
 '- Added `/worker/*` solely so decomposed runtime source modules remain non-public.',
 '- `_worker.js` returns 404 for `/worker/*` before customer/API dispatch.',
 '- Existing customer, checkout, SOK, Hawaii, Marketplace and API route includes are retained.',
 '- `_redirects` is not rewritten by Worker decomposition.','',
 '## Current includes','', *[f'- `{x}`' for x in inc],''
 ]))

redir_lines=[]
if redirects.exists():
    for raw in redirects.read_text().splitlines():
        s=raw.strip()
        if not s or s.startswith('#'): continue
        redir_lines.append(s)
compat=qa/'LEGACY_COMPATIBILITY_AUDIT.md'
compat.write_text('\n'.join([
 '# Website Rebuild — Legacy / Compatibility Audit','',
 '## Policy','',
 'Compatibility behavior is retained unless direct route, redirect, metadata, sitemap and browser parity prove retirement safe. This pass does not remove aliases merely because they are old.','',
 '## Redirect contract — RETAINED / COMPATIBILITY','', *[f'- `{x}`' for x in redir_lines], '',
 '## Explicit retained compatibility','',
 '- `.html` aliases where configured','- `/home-project*`','- `/rv-project*`','- Marketplace seller aliases','- Store/RV aliases','- `/technician.html`','- Gallery legacy aliases','',
 '## Explicit retired/non-route','', '- `/project-guides` remains absent from the sitemap and is not recreated.','',
 '## CSS disposition','', f'- `{css_disposition}`',''
 ]))

sitemap=(site/'sitemap.xml').read_text(errors='ignore')
if '/project-guides' in sitemap: raise SystemExit('/project-guides must not be reintroduced into sitemap')
print(json.dumps({'worker_runtime_protection':'/worker/*','css_disposition':css_disposition,'redirects_retained':len(redir_lines)},indent=2))
