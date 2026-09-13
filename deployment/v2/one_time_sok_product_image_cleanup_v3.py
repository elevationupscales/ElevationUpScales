from pathlib import Path

# Current source uses the SK48 home-crop path without a cache-bust query. Normalize that
# exact legacy promotional reference first, then run the retry-safe bounded cleanup.
shell_path = Path('apps/web-v2/src/shell.js')
shell = shell_path.read_text()
old = "asset('/assets/brands/sok/sk48v100n/home-crop.webp')"
new = "'/assets/brands/sok/sk48v100n/official-clean.png'"
if old in shell:
    shell = shell.replace(old, new)
elif new not in shell:
    raise SystemExit('shell.js: expected SK48 legacy home-crop or localized clean path')
shell_path.write_text(shell)

exec(Path('deployment/v2/one_time_sok_product_image_cleanup_v2.py').read_text(), {'__name__': '__main__'})
