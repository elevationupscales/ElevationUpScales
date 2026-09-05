#!/usr/bin/env python3
"""Compatibility entrypoint for the completed Worker decomposition.

The one-time splitter has already been applied and the modular Worker is now
committed source. Re-running the historical splitter against the completed
layout would be unsafe, so this entrypoint intentionally performs verification
only.
"""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[2]
VERIFY = ROOT / "deployment" / "rebuild" / "verify-complete-rebuild.py"

result = subprocess.run([sys.executable, str(VERIFY)], cwd=ROOT)
if result.returncode != 0:
    raise SystemExit(result.returncode)

print("split-worker-core.py: migration already complete; final layout verified")
