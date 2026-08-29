from pathlib import Path
p=Path('.github/stabilize_4_3.py')
text=p.read_text(encoding='utf-8')
old=r'r"async function ensureSchema\(env\)\{.*?return db;\}"'
new=r'r"async function ensureSchema\(env\)\{.*?return db;\s*\}"'
if text.count(old) != 1:
    raise SystemExit(f'ensureSchema runner anchor count={text.count(old)}')
text=text.replace(old,new,1)
p.write_text(text,encoding='utf-8')
