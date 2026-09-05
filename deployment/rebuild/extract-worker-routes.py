from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2]
CORE = ROOT / "site" / "worker" / "core-context.js"
ROUTES = ROOT / "site" / "worker" / "routes.js"
ROUTER = ROOT / "site" / "worker-core.js"

ROUTE_NAMES = [
    "SOLAR_NOTIFY_PATH",
    "MARKETPLACE_SUBMIT_PATH",
    "MARKETPLACE_PUBLIC_PATH",
    "MARKETPLACE_IMAGE_PREFIX",
    "MARKETPLACE_CONTACT_PREFIX",
    "MARKETPLACE_SHARE_PREFIX",
    "MARKETPLACE_EVENT_PATH",
    "SITE_EVENT_PATH",
    "LEGACY_SITE_EVENT_PATH",
    "MARKETPLACE_HEALTH_PATH",
    "HEALTH_PATH",
    "ADMIN_LOGIN_PATH",
    "ADMIN_LOGOUT_PATH",
    "ADMIN_SESSION_PATH",
    "ADMIN_LISTINGS_PATH",
    "ADMIN_MARKETPLACE_ISSUES_PATH",
    "ADMIN_OPERATIONS_PATH",
    "ADMIN_LEADS_PATH",
    "ADMIN_MARKETPLACE_FOLLOWUPS_PATH",
    "ADMIN_QA_TOKEN_PATH",
    "MARKETPLACE_QA_VALIDATE_PATH",
    "MARKETPLACE_REPORT_ISSUE_PATH",
    "ADMIN_IMPORT_LEGACY_PATH",
    "PROJECT_CLASSIFY_PATH",
    "PROJECT_SUBMIT_PATH",
    "PROJECT_CAPTURE_PATH",
    "PROJECT_CONTACT_REQUEST_PATH",
    "PROJECT_FOLLOWUP_REQUEST_PATH",
    "PROJECT_HANDYMAN_PHOTOS_PATH",
    "WORK_WITH_US_SUBMIT_PATH",
    "ADMIN_OPPORTUNITIES_PATH",
    "ADMIN_MARKET_ANALYTICS_PATH",
    "ADMIN_SOLAR_QA_TOKEN_PATH",
    "ADMIN_INVENTORY_PATH",
    "PUBLIC_INVENTORY_PATH",
    "SOLAR_QA_VALIDATE_PATH",
]


def import_block(source: str):
    return "import {\n" + "".join(f"  {name},\n" for name in ROUTE_NAMES) + f'}} from "{source}";\n'


def extract_routes():
    core = CORE.read_text()

    if ROUTES.exists() and 'from "./routes.js"' in core:
        for name in ROUTE_NAMES:
            if f"export const {name} =" not in ROUTES.read_text():
                raise SystemExit(f"routes.js missing {name}")
        return

    definitions = []
    for name in ROUTE_NAMES:
        pattern = re.compile(rf'^const {re.escape(name)} = ([^\n;]+);\n?', re.MULTILINE)
        match = pattern.search(core)
        if not match:
            raise SystemExit(f"simple route definition not found for {name}")
        expression = match.group(1)
        definitions.append(f"export const {name} = {expression};")
        core = pattern.sub("", core, count=1)

    ROUTES.parent.mkdir(parents=True, exist_ok=True)
    ROUTES.write_text(
        "// Canonical Worker route contracts. Values are preserved from the accepted runtime.\n\n"
        + "\n".join(definitions)
        + "\n"
    )

    core = import_block("./routes.js") + "\n" + core.lstrip("\n")
    CORE.write_text(core)


def point_router_at_routes():
    router = ROUTER.read_text()
    old_source = '} from "./worker/core-context.js";'
    new_source = '} from "./worker/routes.js";'
    if old_source in router:
        router = router.replace(old_source, new_source, 1)
    elif new_source not in router:
        raise SystemExit("worker-core route import source did not match expected code")
    ROUTER.write_text(router)


def verify():
    routes = ROUTES.read_text()
    core = CORE.read_text()
    router = ROUTER.read_text()
    for name in ROUTE_NAMES:
        if f"export const {name} =" not in routes:
            raise SystemExit(f"route contract missing from routes.js: {name}")
        if re.search(rf'^const {re.escape(name)} = ', core, re.MULTILINE):
            raise SystemExit(f"route contract still duplicated in core-context: {name}")
    if 'from "./routes.js"' not in core:
        raise SystemExit("core-context must reuse canonical route contracts")
    if 'from "./worker/routes.js"' not in router:
        raise SystemExit("worker-core must import canonical route contracts directly")


def main():
    extract_routes()
    point_router_at_routes()
    verify()
    print(f"Worker route contracts extracted: {len(ROUTE_NAMES)}")


if __name__ == "__main__":
    main()
