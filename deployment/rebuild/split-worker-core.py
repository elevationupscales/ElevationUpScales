#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import re, json, hashlib

ROOT=Path('.')
CORE=ROOT/'site/worker-core.js'
REGISTRY=ROOT/'src/core-route-registry.js'
OUTDIR=ROOT/'site/worker/domains'
CONTEXT=ROOT/'site/worker/core-context.js'
REPORT=ROOT/'deployment/qa/WORKER_ROUTE_OWNERSHIP.md'

src=CORE.read_text()
registry_text=REGISTRY.read_text()
route_rows=[]
for m in re.finditer(r'\{\s*match:\s*"([^"]+)",\s*path:\s*"([^"]+)",\s*domain:\s*"([^"]+)",\s*handler:\s*"([^"]+)"', registry_text):
    route_rows.append(dict(match=m.group(1),path=m.group(2),domain=m.group(3),handler=m.group(4)))
if len(route_rows)!=37:
    raise SystemExit(f'Expected 37 registry rows, found {len(route_rows)}')

def scan_states(text):
    n=len(text); i=0; depth=0; state='code'; template_expr=[]
    while i<n:
        c=text[i]; nxt=text[i+1] if i+1<n else ''
        yield i, depth, state
        if state=='line':
            if c=='\n': state='code'
            i+=1; continue
        if state=='block':
            if c=='*' and nxt=='/': i+=2; state='code'; continue
            i+=1; continue
        if state in ('single','double'):
            quote="'" if state=='single' else '"'
            if c=='\\': i+=2; continue
            if c==quote: state='code'
            i+=1; continue
        if state=='template':
            if c=='\\': i+=2; continue
            if c=='`': state='code'; i+=1; continue
            if c=='$' and nxt=='{':
                template_expr.append(depth); depth+=1; state='code'; i+=2; continue
            i+=1; continue
        if c=='/' and nxt=='/': state='line'; i+=2; continue
        if c=='/' and nxt=='*': state='block'; i+=2; continue
        if c=="'": state='single'; i+=1; continue
        if c=='"': state='double'; i+=1; continue
        if c=='`': state='template'; i+=1; continue
        if c in '({[': depth+=1
        elif c in ')}]':
            depth=max(0,depth-1)
            if template_expr and depth==template_expr[-1]: template_expr.pop(); state='template'
        i+=1

states=list(scan_states(src))
depth_at=[0]*len(src); state_at=['code']*len(src)
for i,d,s in states:
    if i<len(src): depth_at[i]=d; state_at[i]=s

funcs={}
pat=re.compile(r'(?m)^(async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(')
for m in pat.finditer(src):
    start=m.start()
    if depth_at[start]!=0 or state_at[start] != 'code': continue
    name=m.group(2); brace=src.find('{',m.end())
    if brace<0: continue
    target=depth_at[brace]; i=brace+1; end=None
    while i<len(src):
        if state_at[i]=='code' and src[i]=='}' and depth_at[i]==target+1:
            end=i+1; break
        i+=1
    if end is None: raise SystemExit(f'Could not close function {name}')
    funcs[name]=(start,end,src[start:end])

handler_domains={}
for row in route_rows:
    if row['handler'].startswith('handle'):
        handler_domains.setdefault(row['handler'],row['domain'])
move_names=sorted(handler_domains)
missing=[n for n in move_names if n not in funcs]
if missing: raise SystemExit('Mapped handlers not found as top-level functions: '+', '.join(missing))

export_m=re.search(r'(?m)^export\s+default\s*\{',src)
if not export_m or depth_at[export_m.start()]!=0: raise SystemExit('Top-level export default object not found')
obj_brace=src.find('{',export_m.start()); target=depth_at[obj_brace]; i=obj_brace+1; export_end=None
while i<len(src):
    if state_at[i]=='code' and src[i]=='}' and depth_at[i]==target+1:
        export_end=i+1
        while export_end<len(src) and src[export_end] in ' ;\t\r\n': export_end+=1
        break
    i+=1
if export_end is None: raise SystemExit('Could not close export default')
if src[export_end:].strip(): raise SystemExit('Unexpected code after export default; refusing transform')
dispatch=src[export_m.start():export_end].strip()+"\n"

for name in move_names:
    text=funcs[name][2]
    deps=[other for other in move_names if other!=name and re.search(rf'\b{re.escape(other)}\b',text)]
    if deps: raise SystemExit(f'Cross-handler dependency in {name}: {deps}')

ranges=[(funcs[n][0],funcs[n][1]) for n in move_names]+[(export_m.start(),export_end)]
ranges.sort(); parts=[]; pos=0
for a,b in ranges: parts.append(src[pos:a]); pos=b
parts.append(src[pos:])
context_src=''.join(parts).rstrip()+"\n"
leaks=[n for n in move_names if re.search(rf'\b{re.escape(n)}\b',context_src)]
if leaks: raise SystemExit('Moved handler names still referenced by shared context: '+', '.join(leaks))

def collect_top_level_names(text):
    depth=[0]*len(text); state=['code']*len(text)
    for i,d,s in scan_states(text):
        if i<len(text): depth[i]=d; state[i]=s
    names=[]
    for p in [
        re.compile(r'(?m)^(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\('),
        re.compile(r'(?m)^class\s+([A-Za-z_$][\w$]*)\b'),
        re.compile(r'(?m)^(?:const|let|var)\s+([A-Za-z_$][\w$]*)\b'),
    ]:
        for m in p.finditer(text):
            if depth[m.start()]==0 and state[m.start()]=='code': names.append((m.start(),m.group(1)))
    return [n for _,n in sorted(names)]

exports=collect_top_level_names(context_src); seen=set(); exports=[n for n in exports if not (n in seen or seen.add(n))]
if not exports: raise SystemExit('No context exports discovered')
context_src += "\nexport {\n  "+",\n  ".join(exports)+"\n};\n"
OUTDIR.mkdir(parents=True,exist_ok=True); CONTEXT.parent.mkdir(parents=True,exist_ok=True); CONTEXT.write_text(context_src)

by_domain={}
for name,domain in handler_domains.items(): by_domain.setdefault(domain,[]).append(name)
for domain,names in sorted(by_domain.items()):
    safe=domain.replace('_','-')
    body='import * as core from "../core-context.js";\n\n'
    body+='const {\n  '+',\n  '.join(exports)+'\n} = core;\n\n'
    for name in sorted(names,key=lambda x: funcs[x][0]): body+=funcs[name][2].strip()+"\n\n"
    body+='export {\n  '+',\n  '.join(sorted(names))+'\n};\n'
    (OUTDIR/f'{safe}.js').write_text(body)

imports=['import * as core from "./worker/core-context.js";']; all_moved=[]
for domain,names in sorted(by_domain.items()):
    safe=domain.replace('_','-')
    imports.append('import { '+', '.join(sorted(names))+' } from "./worker/domains/'+safe+'.js";'); all_moved.extend(names)
router='\n'.join(imports)+'\n\nconst {\n  '+',\n  '.join(exports)+'\n} = core;\n\n'+dispatch
CORE.write_text(router)

REPORT.parent.mkdir(parents=True,exist_ok=True)
lines=['# Website Rebuild — Worker Route Ownership','',f'Generated from registry SHA-256 `{hashlib.sha256(registry_text.encode()).hexdigest()}`.','', '| Route | Match | Domain | Handler | Access |','|---|---|---|---|---|']
for r in route_rows: lines.append(f"| `{r['path']}` | {r['match']} | {r['domain']} | `{r['handler']}` | {r['access']} |")
lines += ['', '## Runtime layout', '', '- `site/worker-core.js` — thin compatibility/router entry point; no moved business handler implementations.', '- `site/worker/core-context.js` — shared legacy-compatible helper/data context.', '- `site/worker/domains/*.js` — current route handler implementations grouped by domain.', '- `/api/store-products` remains an explicit compatibility route backed by shared catalog logic.', '']
REPORT.write_text('\n'.join(lines))

router_now=CORE.read_text()
for name in move_names:
    if f'function {name}(' in router_now or f'async function {name}(' in router_now: raise SystemExit(f'Handler implementation still in router: {name}')
    if name not in router_now: raise SystemExit(f'Router lost handler reference: {name}')

print(json.dumps({'handlers_moved':len(move_names),'domains':{k:len(v) for k,v in sorted(by_domain.items())},'context_exports':len(exports),'router_bytes':CORE.stat().st_size,'context_bytes':CONTEXT.stat().st_size},indent=2))
