#!/usr/bin/env python3
from pathlib import Path
import re, json, hashlib
ROOT=Path('.')
CORE=ROOT/'site/worker-core.js'; REGISTRY=ROOT/'src/core-route-registry.js'
OUTDIR=ROOT/'site/worker/domains'; CONTEXT=ROOT/'site/worker/core-context.js'; REPORT=ROOT/'deployment/qa/WORKER_ROUTE_OWNERSHIP.md'
src=CORE.read_text(); registry_text=REGISTRY.read_text()
route_rows=[dict(match=m.group(1),path=m.group(2),domain=m.group(3),handler=m.group(4)) for m in re.finditer(r'\{\s*match:\s*"([^"]+)",\s*path:\s*"([^"]+)",\s*domain:\s*"([^"]+)",\s*handler:\s*"([^"]+)"',registry_text)]
if len(route_rows)!=37: raise SystemExit(f'Expected 37 registry rows, found {len(route_rows)}')

decl_re=re.compile(r'(?m)^(?:(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(|(?:const|let|var)\s+([A-Za-z_$][\w$]*)\b|class\s+([A-Za-z_$][\w$]*)\b|export\s+default\b)')
decls=[]
for m in decl_re.finditer(src):
    kind='export-default' if m.group(0).startswith('export') else ('function' if m.group(2) else ('variable' if m.group(3) else 'class'))
    name=m.group(2) or m.group(3) or m.group(4) or 'default'
    decls.append({'start':m.start(),'kind':kind,'name':name})
for i,d in enumerate(decls): d['end']=decls[i+1]['start'] if i+1<len(decls) else len(src)
funcs={d['name']:(d['start'],d['end'],src[d['start']:d['end']]) for d in decls if d['kind']=='function'}
exports_default=[d for d in decls if d['kind']=='export-default']
if len(exports_default)!=1: raise SystemExit(f'Expected one export default, found {len(exports_default)}')
export_decl=exports_default[0]
if src[export_decl['end']:].strip(): raise SystemExit('Unexpected content after export default declaration')
dispatch=src[export_decl['start']:export_decl['end']].strip()+"\n"

handler_domains={}
for row in route_rows:
    if row['handler'].startswith('handle'): handler_domains.setdefault(row['handler'],row['domain'])
move_names=sorted(handler_domains)
missing=[n for n in move_names if n not in funcs]
if missing: raise SystemExit('Mapped handlers not found as top-level functions: '+', '.join(missing))
for name in move_names:
    body=funcs[name][2]
    deps=[other for other in move_names if other!=name and re.search(rf'\b{re.escape(other)}\b',body)]
    if deps: raise SystemExit(f'Cross-handler dependency in {name}: {deps}')

ranges=[(funcs[n][0],funcs[n][1]) for n in move_names]+[(export_decl['start'],export_decl['end'])]
ranges.sort(); parts=[]; pos=0
for a,b in ranges: parts.append(src[pos:a]); pos=b
parts.append(src[pos:]); context_src=''.join(parts).rstrip()+"\n"
leaks=[n for n in move_names if re.search(rf'\b{re.escape(n)}\b',context_src)]
if leaks: raise SystemExit('Moved handler names still referenced by shared context: '+', '.join(leaks))

name_re=re.compile(r'(?m)^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(|^(?:const|let|var)\s+([A-Za-z_$][\w$]*)\b|^class\s+([A-Za-z_$][\w$]*)\b')
exports=[]; seen=set()
for m in name_re.finditer(context_src):
    name=next((g for g in m.groups() if g),None)
    if name and name not in seen: seen.add(name); exports.append(name)
if not exports: raise SystemExit('No context exports discovered')
context_src += "\nexport {\n  "+",\n  ".join(exports)+"\n};\n"
OUTDIR.mkdir(parents=True,exist_ok=True); CONTEXT.parent.mkdir(parents=True,exist_ok=True); CONTEXT.write_text(context_src)

by_domain={}
for name,domain in handler_domains.items(): by_domain.setdefault(domain,[]).append(name)
for domain,names in sorted(by_domain.items()):
    safe=domain.replace('_','-')
    body='import * as core from "../core-context.js";\n\nconst {\n  '+',\n  '.join(exports)+'\n} = core;\n\n'
    for name in sorted(names,key=lambda n:funcs[n][0]): body+=funcs[name][2].strip()+"\n\n"
    body+='export {\n  '+',\n  '.join(sorted(names))+'\n};\n'
    (OUTDIR/f'{safe}.js').write_text(body)

imports=['import * as core from "./worker/core-context.js";']
for domain,names in sorted(by_domain.items()): imports.append('import { '+', '.join(sorted(names))+' } from "./worker/domains/'+domain.replace('_','-')+'.js";')
CORE.write_text('\n'.join(imports)+'\n\nconst {\n  '+',\n  '.join(exports)+'\n} = core;\n\n'+dispatch)

REPORT.parent.mkdir(parents=True,exist_ok=True)
lines=['# Website Rebuild — Worker Route Ownership','',f'Generated from registry SHA-256 `{hashlib.sha256(registry_text.encode()).hexdigest()}`.','', '| Route | Match | Domain | Handler | Access |','|---|---|---|---|---|']
for r in route_rows: lines.append(f"| `{r['path']}` | {r['match']} | {r['domain']} | `{r['handler']}` | {r['access']} |")
lines += ['', '## Runtime layout','', '- `site/worker-core.js` — thin compatibility/router entry point; no moved business handler implementations.', '- `site/worker/core-context.js` — shared legacy-compatible helper/data context.', '- `site/worker/domains/*.js` — current route handler implementations grouped by domain.', '- `/api/store-products` remains an explicit compatibility route backed by shared catalog logic.','']
REPORT.write_text('\n'.join(lines))
router=CORE.read_text()
for name in move_names:
    if re.search(rf'\b(?:async\s+)?function\s+{re.escape(name)}\s*\(',router): raise SystemExit(f'Handler implementation still in router: {name}')
    if name not in router: raise SystemExit(f'Router lost handler reference: {name}')
print(json.dumps({'handlers_moved':len(move_names),'domains':{k:len(v) for k,v in sorted(by_domain.items())},'context_exports':len(exports),'router_bytes':CORE.stat().st_size,'context_bytes':CONTEXT.stat().st_size},indent=2))
