from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2]
WORKER_CORE = ROOT / "site" / "worker-core.js"
DOMAINS = ROOT / "site" / "worker" / "domains"


def move_store_products_compatibility():
    worker = WORKER_CORE.read_text()
    compat_path = DOMAINS / "compatibility.js"
    compat = compat_path.read_text()

    old_import = 'import { handleRetiredLegacyMarketplaceImport } from "./worker/domains/compatibility.js";'
    new_import = 'import { handleRetiredLegacyMarketplaceImport, handleStoreProductsCompatibility } from "./worker/domains/compatibility.js";'
    if old_import in worker:
        worker = worker.replace(old_import, new_import, 1)
    elif new_import not in worker:
        raise SystemExit("worker-core compatibility import did not match expected source")

    start = worker.find('    if (url.pathname === "/api/store-products") {')
    if start >= 0:
        end_marker = '\n    return env.ASSETS.fetch(request);'
        end = worker.find(end_marker, start)
        if end < 0:
            raise SystemExit("worker-core store-products block end not found")
        replacement = '    if (url.pathname === "/api/store-products") return handleStoreProductsCompatibility(request);\n'
        worker = worker[:start] + replacement + worker[end:]
    elif 'handleStoreProductsCompatibility(request)' not in worker:
        raise SystemExit("worker-core store-products compatibility route missing")

    if "async function handleStoreProductsCompatibility" not in compat:
        export_marker = "export {\n  handleRetiredLegacyMarketplaceImport\n};"
        if export_marker not in compat:
            raise SystemExit("compatibility export marker did not match expected source")
        addition = '''async function handleStoreProductsCompatibility(request) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  }

  try {
    const response = await getCatalog(request);
    return request.method === "HEAD"
      ? new Response(null, { status: response.status, headers: response.headers })
      : response;
  } catch (error) {
    console.error(JSON.stringify({
      event: "store_catalog_error",
      message: error instanceof Error ? error.message : String(error),
    }));
    return Response.json(
      { error: "The live catalog is temporarily unavailable." },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store",
          ...API_SECURITY_HEADERS,
          "X-EUS-Store-Build": STORE_BUILD,
        },
      },
    );
  }
}

export {
  handleRetiredLegacyMarketplaceImport,
  handleStoreProductsCompatibility,
};'''
        compat = compat.replace(export_marker, addition, 1)

    WORKER_CORE.write_text(worker)
    compat_path.write_text(compat)


def trim_core_surface(path: Path):
    text = path.read_text()
    if path == WORKER_CORE:
        import_line = 'import * as core from "./worker/core-context.js";'
        source = './worker/core-context.js'
    else:
        import_line = 'import * as core from "../core-context.js";'
        source = '../core-context.js'

    if import_line not in text:
        if '} = core;' in text or 'import * as core' in text:
            raise SystemExit(f"unexpected core import shape in {path}")
        return None

    import_pos = text.index(import_line)
    destructure_start = text.find('const {\n', import_pos + len(import_line))
    if destructure_start < 0:
        raise SystemExit(f"core destructure start missing in {path}")
    destructure_end = text.find('\n} = core;\n', destructure_start)
    if destructure_end < 0:
        raise SystemExit(f"core destructure end missing in {path}")

    block = text[destructure_start + len('const {\n'):destructure_end]
    candidates = []
    for raw in block.splitlines():
        name = raw.strip().rstrip(',')
        if not name:
            continue
        if not re.fullmatch(r'[A-Za-z_$][A-Za-z0-9_$]*', name):
            raise SystemExit(f"unexpected core symbol {name!r} in {path}")
        candidates.append(name)

    body_start = destructure_end + len('\n} = core;\n')
    body = text[body_start:]
    if re.search(r'\bcore\s*\.', body):
        raise SystemExit(f"direct core namespace access remains in {path}")

    used = [name for name in candidates if re.search(rf'\b{re.escape(name)}\b', body)]
    if not used:
        named_import = ''
    else:
        named_import = 'import {\n' + ''.join(f'  {name},\n' for name in used) + f'}} from "{source}";'

    prefix = text[:import_pos]
    between = text[import_pos + len(import_line):destructure_start]
    suffix = text[body_start:]
    replacement = named_import + between + suffix
    path.write_text(prefix + replacement)
    return len(candidates), len(used)


def main():
    move_store_products_compatibility()
    targets = [WORKER_CORE] + sorted(DOMAINS.glob('*.js'))
    total_before = 0
    total_after = 0
    changed = 0
    for path in targets:
        result = trim_core_surface(path)
        if result is None:
            continue
        before, after = result
        total_before += before
        total_after += after
        changed += 1
        print(f"{path.relative_to(ROOT)}: core surface {before} -> {after}")

    if changed == 0:
        print("Worker import surfaces already consolidated")
    else:
        print(f"Consolidated {changed} Worker modules: {total_before} -> {total_after} named core dependencies")


if __name__ == '__main__':
    main()
