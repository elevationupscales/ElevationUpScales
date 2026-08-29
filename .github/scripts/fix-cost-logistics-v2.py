from pathlib import Path

source_path = Path('.github/scripts/fix-cost-logistics.py')
source = source_path.read_text(encoding='utf-8')
old = r'.filter(Boolean).join("\n");'
new = r'.filter(Boolean).join("\\n");'
if old not in source:
    raise SystemExit('Expected escaping anchor not found in original patcher')
source = source.replace(old, new, 1)
exec(compile(source, str(source_path), 'exec'))
