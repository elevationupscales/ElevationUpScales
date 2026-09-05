#!/usr/bin/env python3
"""Append the presentation-only redesign loader to the shared public site shell.

This migration is intentionally tiny and idempotent. It does not rewrite site-shell
behavior; it only appends loading of redesign-v1 CSS/JS on non-Admin routes.
"""
from pathlib import Path

TARGET = Path("site/site-shell.js")
MARKER = "EUS_VISUAL_REDESIGN_V1_LOADER"

BLOCK = r'''

/* EUS_VISUAL_REDESIGN_V1_LOADER
   Presentation-only experiment. Remove this block to restore the accepted shell. */
(()=>{
  if(window.__EUS_VISUAL_REDESIGN_V1_LOADED__) return;
  window.__EUS_VISUAL_REDESIGN_V1_LOADED__=true;
  if((location.pathname||"").startsWith("/admin")) return;
  const styles=[
    ["v1","/redesign-v1.css?v=1.0.0"],
    ["v1-pages","/redesign-v1-pages.css?v=1.0.0"]
  ];
  styles.forEach(([key,href])=>{
    if(document.querySelector(`link[data-eus-redesign="${key}"]`)) return;
    const link=document.createElement("link");
    link.rel="stylesheet";
    link.href=href;
    link.dataset.eusRedesign=key;
    document.head.append(link);
  });
  if(!document.querySelector('script[data-eus-redesign="v1"]')){
    const script=document.createElement("script");
    script.src="/redesign-v1.js?v=1.0.0";
    script.async=false;
    script.dataset.eusRedesign="v1";
    document.head.append(script);
  }
})();
'''

source = TARGET.read_text(encoding="utf-8")
if MARKER in source:
    print("Shared redesign loader already present; no change.")
else:
    TARGET.write_text(source.rstrip() + BLOCK.rstrip() + "\n", encoding="utf-8")
    print("Appended presentation-only redesign loader to site/site-shell.js")
