from pathlib import Path
p=Path('site/checkout/index.html')
s=p.read_text()
s=s.replace('<h3 id="checkout-hawaii-state">Freight Review</h3>','<h3 id="checkout-hawaii-state">Freight Review Required</h3>')
p.write_text(s)
print('Approved Hawaii checkout state wording applied')
