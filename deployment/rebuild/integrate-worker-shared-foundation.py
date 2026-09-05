from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CORE = ROOT / "site" / "worker" / "core-context.js"
TEST = ROOT / "tests" / "shared-foundation.test.mjs"

IMPORTS = '''import {
  API_SECURITY_HEADERS,
  HTML_SECURITY_HEADERS,
  jsonResponse,
} from "./shared/response.js";
import { escapeHtml, jsonForInlineScript } from "./shared/html.js";
import {
  cleanList,
  cleanString,
  configuredEmail,
  hasBasicContact,
  hasEarlySolarContact,
  isValidEmail,
  isValidPhone,
} from "./shared/validation.js";
import {
  sanitizeBuild,
  sanitizeContact,
  sanitizeSolarMilestone,
} from "./shared/solar-sanitizers.js";

'''

PREP_FILES = [
    ROOT / "src" / "worker" / "response.js",
    ROOT / "src" / "shared" / "html.js",
    ROOT / "src" / "shared" / "validation.js",
    ROOT / "src" / "shared" / "solar-sanitizers.js",
]


def integrate_core():
    text = CORE.read_text()
    if 'from "./shared/response.js"' not in text:
        start = text.find("const API_SECURITY_HEADERS = {")
        end = text.find("\nfunction eventHeading", start)
        if start < 0 or end < 0:
            raise SystemExit("shared foundation block did not match expected core-context source")
        text = IMPORTS + text[:start] + text[end + 1:]
        CORE.write_text(text)
    else:
        for required in (
            'from "./shared/response.js"',
            'from "./shared/html.js"',
            'from "./shared/validation.js"',
            'from "./shared/solar-sanitizers.js"',
        ):
            if required not in text:
                raise SystemExit(f"core-context missing {required}")


def point_tests_at_runtime():
    text = TEST.read_text()
    replacements = {
        "../src/worker/response.js": "../site/worker/shared/response.js",
        "../src/shared/html.js": "../site/worker/shared/html.js",
        "../src/shared/validation.js": "../site/worker/shared/validation.js",
        "../src/shared/solar-sanitizers.js": "../site/worker/shared/solar-sanitizers.js",
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    TEST.write_text(text)


def retire_prep_duplicates():
    for file in PREP_FILES:
        if file.exists():
            file.unlink()


def main():
    for required in (
        ROOT / "site" / "worker" / "shared" / "response.js",
        ROOT / "site" / "worker" / "shared" / "html.js",
        ROOT / "site" / "worker" / "shared" / "validation.js",
        ROOT / "site" / "worker" / "shared" / "solar-sanitizers.js",
    ):
        if not required.exists():
            raise SystemExit(f"missing runtime shared module: {required}")

    integrate_core()
    point_tests_at_runtime()
    retire_prep_duplicates()
    print("Worker shared foundation integrated into deployed runtime")


if __name__ == "__main__":
    main()
