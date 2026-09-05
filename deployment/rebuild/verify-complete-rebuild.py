#!/usr/bin/env python3
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2]
SITE = ROOT / "site"
WORKER = SITE / "worker"
DOMAINS = WORKER / "domains"


def require(condition, message):
    if not condition:
        raise SystemExit(message)


def read(path):
    require(path.exists(), f"missing required file: {path.relative_to(ROOT)}")
    return path.read_text(encoding="utf-8")


# Final deployed Worker layout.
worker_core = read(SITE / "worker-core.js")
core_context = read(WORKER / "core-context.js")
routes = read(WORKER / "routes.js")
compat = read(DOMAINS / "compatibility.js")
registry = read(ROOT / "src" / "core-route-registry.js")

required_shared = [
    WORKER / "shared" / "response.js",
    WORKER / "shared" / "html.js",
    WORKER / "shared" / "validation.js",
    WORKER / "shared" / "solar-sanitizers.js",
]
for path in required_shared:
    read(path)

# Prep duplicates must stay retired; tests exercise deployed runtime modules.
retired_prep = [
    ROOT / "src" / "worker" / "response.js",
    ROOT / "src" / "shared" / "html.js",
    ROOT / "src" / "shared" / "validation.js",
    ROOT / "src" / "shared" / "solar-sanitizers.js",
]
for path in retired_prep:
    require(not path.exists(), f"retired prep duplicate returned: {path.relative_to(ROOT)}")

shared_test = read(ROOT / "tests" / "shared-foundation.test.mjs")
for expected in [
    "../site/worker/shared/response.js",
    "../site/worker/shared/html.js",
    "../site/worker/shared/validation.js",
    "../site/worker/shared/solar-sanitizers.js",
]:
    require(expected in shared_test, f"shared foundation test no longer targets deployed runtime: {expected}")

# Router and context must share one canonical route-contract owner.
require('from "./worker/routes.js"' in worker_core, "worker-core must import canonical Worker routes directly")
require('from "./routes.js"' in core_context, "core-context must reuse canonical Worker routes")
route_exports = re.findall(r'^export const ([A-Z0-9_]+_PATH|[A-Z0-9_]+_PREFIX)\s*=', routes, re.MULTILINE)
require(len(route_exports) == 36, f"expected 36 canonical Worker route constants, found {len(route_exports)}")
registry_rows = re.findall(r'\{\s*match:\s*"[^"]+",\s*path:\s*"[^"]+",\s*domain:\s*"[^"]+",\s*handler:\s*"[^"]+",\s*access:\s*"[^"]+"', registry)
require(len(registry_rows) == 37, f"expected 37 Worker route registry rows, found {len(registry_rows)}")

# Business handlers belong to domain modules, not worker-core.
require("async function handle" not in worker_core, "worker-core regained business handler implementations")
require("import * as core" not in worker_core, "worker-core regained whole-context namespace import")
for path in sorted(DOMAINS.glob("*.js")):
    text = read(path)
    require("import * as core" not in text, f"whole-context namespace import returned: {path.relative_to(ROOT)}")
    require("} = core;" not in text, f"whole-context destructuring returned: {path.relative_to(ROOT)}")

# Compatibility Catalog route must stay out of the thin router implementation.
require("handleStoreProductsCompatibility" in worker_core, "worker-core lost store-products compatibility dispatch")
require("handleStoreProductsCompatibility" in compat, "compatibility domain lost store-products handler")
require('domain: "compatibility", handler: "handleStoreProductsCompatibility"' in registry, "route registry lost final store-products ownership")

# Runtime modules must remain intercepted/protected.
front_worker = read(SITE / "_worker.js")
route_config = read(SITE / "_routes.json")
require('url.pathname.startsWith("/worker/")' in front_worker, "front Worker no longer protects /worker/*")
require('"/worker/*"' in route_config, "_routes.json no longer intercepts /worker/*")

# Accepted legacy Admin CSS retirement must remain enforced.
require(not (SITE / "admin-command-center-pass1.css").exists(), "retired Admin Pass 1 stylesheet returned")
admin_css = read(SITE / "admin-command-center.css")
require("accepted Pass 1 cascade folded into canonical file" in admin_css, "canonical Admin CSS lost accepted Pass 1 cascade marker")

print("verify-complete-rebuild.py: PASS")
print("  Worker domains: explicit named dependencies")
print("  Worker shared runtime: single deployed implementation")
print("  Worker route contracts: canonical ownership")
print("  Compatibility Catalog route: domain-owned")
print("  Runtime protection: enforced")
