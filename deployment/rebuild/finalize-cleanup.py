#!/usr/bin/env python3
"""Compatibility entrypoint for completed Website Rebuild cleanup.

Runtime protection, compatibility retention, and legacy Admin CSS retirement
are now committed source. This script intentionally verifies the completed
state instead of mutating the website again.
"""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]
VERIFY = ROOT / "deployment" / "rebuild" / "verify-complete-rebuild.py"

result = subprocess.run([sys.executable, str(VERIFY)], cwd=ROOT)
if result.returncode != 0:
    raise SystemExit(result.returncode)

print("finalize-cleanup.py: cleanup already complete; final state verified")
