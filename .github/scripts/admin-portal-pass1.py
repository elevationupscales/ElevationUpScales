from pathlib import Path


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if new in text:
        return text
    if old not in text:
        raise SystemExit(f"Missing patch anchor: {label}")
    return text.replace(old, new, 1)


js_path = Path("site/admin-command-center.js")
js = js_path.read_text(encoding="utf-8")

old_nav = '''  const NAV=[
    ["Operate",[
      ["Overview","/admin","overview"],
      ["Orders & Fulfillment","/admin-store-orders","orders"],
      ["Shipping & Logistics","/admin-lithium-shipping","shipping"],
      ["Leads","/admin-listings#leads","leads"]
    ]],
    ["Sell",[
      ["Products / Import Center","/admin-catalog","products"],
      ["Inventory","/admin-inventory","inventory"],
      ["Channels / Stores","/admin-channels","channels"],
      ["Marketplace","/admin-listings#marketplace","marketplace"]
    ]],
    ["Measure",[
      ["Analytics","/admin-analytics","analytics"],
      ["System / QA","/admin-listings#system","system"]
    ]]
  ];'''
new_nav = '''  const NAV=[
    ["Daily Operations",[
      ["Overview","/admin","overview"],
      ["Leads","/admin-listings#leads","leads"],
      ["Orders & Fulfillment","/admin-store-orders","orders"]
    ]],
    ["Commerce",[
      ["Products / Import Center","/admin-catalog","products"],
      ["Inventory","/admin-inventory","inventory"],
      ["Channels / Stores","/admin-channels","channels"]
    ]],
    ["Shipping",[
      ["Lithium / Hawaii Logistics","/admin-lithium-shipping","shipping"]
    ]],
    ["Marketplace",[
      ["Marketplace Operations","/admin-listings#marketplace","marketplace"]
    ]],
    ["Insights & System",[
      ["Analytics","/admin-analytics","analytics"],
      ["System / QA","/admin-listings#system","system"]
    ]]
  ];'''
js = replace_once(js, old_nav, new_nav, "command center navigation")

old_css = '''  function ensureCss(){
    if(document.querySelector('link[data-eus-command-center-css]'))return;
    const link=document.createElement("link");link.rel="stylesheet";link.href="/admin-command-center.css?v=4.3.4";link.dataset.eusCommandCenterCss="1";document.head.append(link);
  }'''
new_css = '''  function ensureCss(){
    if(!document.querySelector('link[data-eus-command-center-css]')){
      const link=document.createElement("link");link.rel="stylesheet";link.href="/admin-command-center.css?v=4.3.5";link.dataset.eusCommandCenterCss="1";document.head.append(link);
    }
    if(!document.querySelector('link[data-eus-command-center-pass1-css]')){
      const pass=document.createElement("link");pass.rel="stylesheet";pass.href="/admin-command-center-pass1.css?v=4.3.5";pass.dataset.eusCommandCenterPass1Css="1";document.head.append(pass);
    }
  }'''
js = replace_once(js, old_css, new_css, "pass one stylesheet loader")
js = js.replace('Commerce · Leads · Fulfillment', 'Operations · Commerce · Leads')
js_path.write_text(js, encoding="utf-8")

worker_path = Path("site/_worker.js")
worker = worker_path.read_text(encoding="utf-8")
worker = worker.replace('/admin-command-center.js?v=4.3.4', '/admin-command-center.js?v=4.3.5')
worker_path.write_text(worker, encoding="utf-8")

css_path = Path("site/admin-command-center-pass1.css")
css_path.write_text(r'''/* Elevation Admin Portal — Organization & Visual Pass 1 (4.3.5) */
body.eus-admin-shell-active{--eus-pass-panel:#11161c;--eus-pass-panel-2:#171d24;--eus-pass-line:rgba(255,255,255,.10);--eus-pass-muted:#aeb7c2;--eus-pass-gold:#e2b74f;background:linear-gradient(180deg,#080a0d 0,#0b0e12 60%,#080a0d 100%)}
.eus-admin-shell-active .eus-admin-app{grid-template-columns:272px minmax(0,1fr)}
.eus-admin-shell-active .eus-admin-rail{padding:14px 12px 18px;background:linear-gradient(180deg,#080b0f,#07090c);border-right-color:rgba(255,255,255,.09);box-shadow:14px 0 40px rgba(0,0,0,.18)}
.eus-admin-shell-active .eus-admin-rail__brand{position:sticky;top:-14px;z-index:2;margin:0 -2px 14px;padding:16px 10px 15px;background:#080b0f;border-bottom-color:rgba(226,183,79,.18)}
.eus-admin-shell-active .eus-admin-rail__brand img{width:40px;height:40px}.eus-admin-shell-active .eus-admin-rail__brand strong{font-size:.93rem}.eus-admin-shell-active .eus-admin-rail__brand small{color:#919ba8;line-height:1.35}
.eus-admin-shell-active .eus-admin-rail .eus-admin-nav-group{margin:10px 0 14px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.055)}
.eus-admin-shell-active .eus-admin-rail .eus-admin-nav-group:last-of-type{border-bottom:0}
.eus-admin-shell-active .eus-admin-rail .eus-admin-nav-group>strong{padding:0 10px 6px;color:#7f8995;font-size:.64rem;letter-spacing:.13em}
.eus-admin-shell-active .eus-admin-rail .eus-admin-nav-group a{min-height:38px;margin:2px 0;padding:8px 10px;border-radius:9px;color:#cbd2da;font-size:.84rem;font-weight:650;line-height:1.2}
.eus-admin-shell-active .eus-admin-rail .eus-admin-nav-group a:hover{background:#121820;border-color:rgba(255,255,255,.07)}
.eus-admin-shell-active .eus-admin-rail .eus-admin-nav-group a.is-active{background:linear-gradient(90deg,rgba(226,183,79,.18),rgba(226,183,79,.055));border-color:rgba(226,183,79,.28);box-shadow:inset 3px 0 #e2b74f}
.eus-admin-shell-active .eus-admin-rail__foot{color:#707986}
.eus-admin-shell-active .eus-admin-main>main.admin-shell{padding-left:clamp(14px,2vw,30px);padding-right:clamp(14px,2vw,30px);padding-bottom:50px}

/* Compact the oversized legacy page headers and keep the actions readable. */
.eus-admin-shell-active main.admin-shell>.admin-shell__header,.eus-admin-shell-active .inventory-header{margin:14px 0 12px!important;padding:16px 18px!important;border-radius:16px!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto;gap:16px;align-items:center;box-shadow:0 14px 34px rgba(0,0,0,.18)!important}
.eus-admin-shell-active main.admin-shell>.admin-shell__header h1,.eus-admin-shell-active .inventory-header h1{font-size:clamp(1.65rem,2.8vw,2.35rem)!important;line-height:1!important;margin:.15rem 0 .3rem!important}
.eus-admin-shell-active main.admin-shell>.admin-shell__header .admin-subhead,.eus-admin-shell-active .inventory-header .admin-subhead{max-width:820px!important;font-size:.9rem!important;line-height:1.45!important;color:#aeb7c2!important}
.eus-admin-shell-active .admin-header-actions{display:flex!important;justify-content:flex-end;align-items:center;gap:7px;flex-wrap:wrap;max-width:690px}
.eus-admin-shell-active .admin-header-actions .button{min-height:38px!important;padding:.52rem .72rem!important;border-radius:9px!important;font-size:.78rem!important}
.eus-admin-shell-active .admin-live-refresh{order:20;width:100%;justify-content:flex-end;color:#8e98a4;font-size:.72rem}

/* Stronger content hierarchy. */
.eus-admin-shell-active .eus-admin-workspace-frame,.eus-admin-shell-active .admin-owner-signals,.eus-admin-shell-active .admin-opportunity-workspace,.eus-admin-shell-active .admin-leads-workspace,.eus-admin-shell-active .admin-followup-workspace,.eus-admin-shell-active .admin-workspace,.eus-admin-shell-active .inventory-workspace,.eus-admin-shell-active .inventory-editor,.eus-admin-shell-active .inventory-activity{border-color:var(--eus-pass-line)!important;border-radius:15px!important;background:linear-gradient(145deg,rgba(18,23,29,.96),rgba(11,14,18,.96))!important;box-shadow:0 12px 30px rgba(0,0,0,.14)!important}
.eus-admin-shell-active .admin-section-head,.eus-admin-shell-active .eus-section__head{padding-bottom:11px;margin-bottom:13px;border-bottom:1px solid rgba(255,255,255,.075)}
.eus-admin-shell-active .admin-section-head h2,.eus-admin-shell-active .admin-section-head h3,.eus-admin-shell-active .eus-section__head h2{margin:.1rem 0 .25rem!important;letter-spacing:-.02em!important}
.eus-admin-shell-active .admin-muted,.eus-admin-shell-active .admin-section-head p,.eus-admin-shell-active .eus-section__head p{color:#9ea8b4!important;line-height:1.45}
.eus-admin-shell-active .eyebrow,.eus-admin-shell-active .eus-admin-kicker{color:#e7c76f!important;font-size:.68rem!important;letter-spacing:.11em!important}

/* The inner Mission Control workspace becomes the primary organizer, not another wall of panels. */
.eus-admin-shell-active .eus-admin-workspace-frame{grid-template-columns:208px minmax(0,1fr)!important;overflow:visible!important}
.eus-admin-shell-active .eus-admin-workspace-nav{position:sticky!important;top:14px!important;align-self:start;max-height:calc(100vh - 28px);overflow:auto;border-radius:13px 0 0 13px;background:linear-gradient(180deg,#111720,#0b0f14)!important}
.eus-admin-shell-active .eus-admin-workspace-nav__head{padding:12px!important}
.eus-admin-shell-active .eus-admin-workspace-nav [data-admin-view]{min-height:37px!important;margin:2px 0!important;padding:8px 9px!important;font-size:.8rem!important;border-radius:8px!important}
.eus-admin-shell-active .eus-admin-view-head{padding:14px 16px!important;background:linear-gradient(90deg,rgba(226,183,79,.07),transparent 55%)!important}
.eus-admin-shell-active .eus-admin-view-head h2{font-size:1.35rem!important;margin:.15rem 0!important}.eus-admin-shell-active .eus-admin-view-head p{max-width:760px;color:#97a2ae!important;line-height:1.4}
.eus-admin-shell-active #eus-admin-view-content{padding:14px!important}

/* Cards: fewer visual treatments, easier scanning. */
.eus-admin-shell-active .admin-summary-grid,.eus-admin-shell-active .admin-command-actions,.eus-admin-shell-active .opportunity-counts,.eus-admin-shell-active .admin-signal-group__grid{gap:9px!important}
.eus-admin-shell-active .admin-summary-grid article,.eus-admin-shell-active .admin-command-actions article,.eus-admin-shell-active .opportunity-counts article,.eus-admin-shell-active .admin-signal-group__grid article,.eus-admin-shell-active .inventory-summary article{min-height:88px!important;padding:12px 13px!important;border:1px solid rgba(255,255,255,.085)!important;border-radius:11px!important;background:#10151b!important;box-shadow:none!important}
.eus-admin-shell-active .admin-command-actions article:before{width:2px!important}.eus-admin-shell-active .admin-command-actions article strong,.eus-admin-shell-active .admin-summary-grid article strong,.eus-admin-shell-active .inventory-summary article strong{font-size:clamp(1.45rem,2.4vw,2rem)!important}
.eus-admin-shell-active .admin-command-actions article span,.eus-admin-shell-active .admin-summary-grid article span,.eus-admin-shell-active .inventory-summary article span{color:#c5ccd4!important;font-size:.7rem!important;letter-spacing:.055em!important}
.eus-admin-shell-active .admin-command-actions article small,.eus-admin-shell-active .admin-summary-grid article small,.eus-admin-shell-active .inventory-summary article small{color:#8e99a6!important;line-height:1.35}

/* Filters and forms read as controls instead of inline prose. */
.eus-admin-shell-active .admin-table-tools,.eus-admin-shell-active .inventory-tools,.eus-admin-shell-active .eus-filter-row{gap:8px!important;align-items:end!important}
.eus-admin-shell-active .admin-table-tools label,.eus-admin-shell-active .inventory-tools label,.eus-admin-shell-active .eus-admin-filter{color:#aab4bf!important;font-size:.7rem!important;font-weight:750!important;letter-spacing:.025em}
.eus-admin-shell-active input,.eus-admin-shell-active select,.eus-admin-shell-active textarea{border-color:rgba(255,255,255,.14)!important;background:#0b1015!important;color:#f6f8fa!important;border-radius:8px!important}
.eus-admin-shell-active input,.eus-admin-shell-active select{min-height:39px!important}

/* Tables are the main operating surfaces; prioritize row separation and legibility. */
.eus-admin-shell-active .admin-table-scroll,.eus-admin-shell-active .inventory-table-scroll,.eus-admin-shell-active .eus-admin-table-wrap{border-color:rgba(255,255,255,.09)!important;border-radius:11px!important;background:#0b0f14!important}
.eus-admin-shell-active table{font-variant-numeric:tabular-nums}.eus-admin-shell-active table thead th,.eus-admin-shell-active .eus-admin-table th{position:sticky!important;top:0;z-index:2;background:#151b22!important;color:#b8c1cb!important;padding:10px 11px!important;font-size:.66rem!important;letter-spacing:.065em!important}
.eus-admin-shell-active table tbody td,.eus-admin-shell-active .eus-admin-table td{padding:11px!important;line-height:1.42!important;border-bottom-color:rgba(255,255,255,.065)!important;font-size:.79rem!important}
.eus-admin-shell-active table tbody tr:nth-child(even){background:rgba(255,255,255,.018)}.eus-admin-shell-active table tbody tr:hover{background:rgba(226,183,79,.055)!important}
.eus-admin-shell-active code{padding:.15rem .3rem;border-radius:5px;background:#090d12;color:#c9d2dc;font-size:.72rem}
.eus-admin-shell-active .inventory-row-actions,.eus-admin-shell-active .admin-row-actions{gap:5px!important}.eus-admin-shell-active .inventory-row-actions button,.eus-admin-shell-active table button{min-height:32px;border-radius:7px!important}

/* Keep long audit logs secondary to the working table. */
.eus-admin-shell-active .inventory-activity{margin-top:14px!important}.eus-admin-shell-active .inventory-activity-list{max-height:330px;overflow:auto;padding-right:4px}
.eus-admin-shell-active .inventory-activity-row{padding:8px 10px!important;border-radius:8px!important}

@media(max-width:1180px){.eus-admin-shell-active .eus-admin-app{grid-template-columns:238px minmax(0,1fr)}.eus-admin-shell-active .eus-admin-workspace-frame{grid-template-columns:176px minmax(0,1fr)!important}}
@media(max-width:900px){.eus-admin-shell-active main.admin-shell>.admin-shell__header,.eus-admin-shell-active .inventory-header{grid-template-columns:1fr!important}.eus-admin-shell-active .admin-header-actions{justify-content:flex-start;max-width:none}.eus-admin-shell-active .admin-live-refresh{justify-content:flex-start}.eus-admin-shell-active .eus-admin-workspace-frame{display:block!important}.eus-admin-shell-active .eus-admin-workspace-nav{position:relative!important;top:auto!important;max-height:none;border-radius:13px 13px 0 0}}
@media(max-width:820px){.eus-admin-shell-active .eus-admin-app{display:block}.eus-admin-shell-active .eus-admin-main>main.admin-shell{padding-left:10px;padding-right:10px}}
@media(max-width:620px){.eus-admin-shell-active .admin-header-actions{display:grid!important;grid-template-columns:1fr 1fr}.eus-admin-shell-active .admin-header-actions .button{width:100%}.eus-admin-shell-active .admin-summary-grid,.eus-admin-shell-active .admin-command-actions,.eus-admin-shell-active .opportunity-counts,.eus-admin-shell-active .admin-signal-group__grid{grid-template-columns:1fr 1fr!important}.eus-admin-shell-active #eus-admin-view-content{padding:9px!important}}
@media(max-width:430px){.eus-admin-shell-active .admin-summary-grid,.eus-admin-shell-active .admin-command-actions,.eus-admin-shell-active .opportunity-counts,.eus-admin-shell-active .admin-signal-group__grid{grid-template-columns:1fr!important}}
''', encoding="utf-8")

print("Admin Portal Pass 1 patch applied")
