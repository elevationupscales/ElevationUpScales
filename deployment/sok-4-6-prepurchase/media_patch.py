from pathlib import Path
import sys
repo=Path(sys.argv[1]).resolve()

def replace(path,old,new,count=1):
    p=repo/path
    text=p.read_text()
    if text.count(old)<count:
        raise SystemExit(f"missing media patch anchor {path}: {old[:120]!r}")
    p.write_text(text.replace(old,new,count))

# Keep official SOK media local in Elevation-controlled paths.
replace('site/sok-availability-runtime.js',
'defaultMode:"available"}',
'defaultMode:"available",primaryImage:"/assets/brands/sok/sk12v100pc/hero.png",images:["/assets/brands/sok/sk12v100pc/hero.png"],specSheet:"/assets/brands/sok/sk12v100pc/spec-sheet.pdf"}')
replace('site/sok-availability-runtime.js',
'defaultMode:"prepurchase"}',
'defaultMode:"prepurchase",primaryImage:"/assets/brands/sok/sk48v100n/hero.jpg",images:["/assets/brands/sok/sk48v100n/hero.jpg","/assets/brands/sok/sk48v100n/system-cabinet.png"],specSheet:"/assets/brands/sok/sk48v100n/spec-sheet.pdf"}')
replace('site/sok-availability-runtime.js',
'primaryImage:"",images:[],storeSection:"lithium-batteries"',
'primaryImage:d.primaryImage,images:d.images,downloads:[{label:"SOK Specification Sheet",url:d.specSheet}],storeSection:"lithium-batteries"')
replace('site/sok-availability-runtime.js',
'imageUrl:"",priceCents:d.mapCents',
'imageUrl:d.primaryImage,priceCents:d.mapCents')

# Co-branded SOK section: Elevation stays the seller; SOK is featured as the authorized battery partner.
feature='''<section class="sok-brand-feature" aria-labelledby="sok-brand-title"><div class="container sok-brand-feature__grid"><div class="sok-brand-feature__copy"><p class="eyebrow">AUTHORIZED SOK ENERGY DEALER</p><div class="sok-brand-wordmark" aria-label="SOK Battery">SOK <span>BATTERY</span></div><h2 id="sok-brand-title">SOK LiFePO4 Battery Systems</h2><p>Elevation UpScales supplies selected SOK lithium battery solutions for RV, marine, solar, off-grid and commercial energy-storage applications.</p><div class="lithium-actions"><a class="button button-primary" href="/product?id=sok-sk48v100n&amp;store=lithium">View 48V Rack Battery</a><a class="button button-outline" href="/product?id=sok-sk12v100pc&amp;store=lithium">View 12V 100Ah Battery</a></div><div class="sok-brand-downloads"><a href="/assets/brands/sok/sk48v100n/spec-sheet.pdf">SK48V100N Spec Sheet</a><a href="/assets/brands/sok/sk12v100pc/spec-sheet.pdf">SK12V100PC Spec Sheet</a></div></div><figure class="sok-brand-feature__media"><img src="/assets/brands/sok/sk48v100n/system-cabinet.png" alt="SOK 48V rack battery cabinet shown as an example of a scalable energy storage configuration" loading="lazy" decoding="async"><figcaption>Example scalable rack configuration. Cabinet and battery configuration are quoted separately.</figcaption></figure></div></section>'''
replace('site/lithium-batteries.html','</section><nav class="lithium-category-strip"',f'</section>{feature}<nav class="lithium-category-strip"')
replace('site/lithium-batteries.html','lithium-shop.css?v=4.4.3','lithium-shop.css?v=4.6.1')

css='''\n/* SOK authorized-dealer feature — co-branded without replacing Elevation identity */\n.sok-brand-feature{padding:42px 0;background:linear-gradient(180deg,#0b0b0b,#111);border-top:1px solid rgba(255,255,255,.08);border-bottom:1px solid rgba(255,255,255,.08)}\n.sok-brand-feature__grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(300px,.95fr);gap:32px;align-items:center}\n.sok-brand-wordmark{display:inline-flex;align-items:baseline;gap:.38rem;margin:.25rem 0 .55rem;font-size:clamp(2rem,5vw,3.7rem);font-weight:900;letter-spacing:-.045em;color:#f4f4f4}\n.sok-brand-wordmark span{font-size:.34em;letter-spacing:.18em;color:#d9362b}\n.sok-brand-feature__copy h2{margin-top:.25rem}.sok-brand-feature__copy p{max-width:700px}.sok-brand-downloads{display:flex;flex-wrap:wrap;gap:14px;margin-top:18px}.sok-brand-downloads a{font-weight:700;text-decoration:underline;text-underline-offset:4px}.sok-brand-feature__media{margin:0;padding:18px;border:1px solid rgba(255,255,255,.1);background:#fff;border-radius:18px}.sok-brand-feature__media img{display:block;width:100%;height:auto;object-fit:contain}.sok-brand-feature__media figcaption{margin-top:10px;color:#444;font-size:.86rem;line-height:1.4}@media(max-width:820px){.sok-brand-feature__grid{grid-template-columns:1fr}.sok-brand-feature__media{order:-1}}\n'''
p=repo/'site/lithium-shop.css';p.write_text(p.read_text()+css)
print('SOK media/brand treatment patch applied')
