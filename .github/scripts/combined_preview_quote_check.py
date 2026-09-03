import json, math

def load(path):
    with open(path,encoding='utf-8') as f:return json.load(f)

battery=load('/tmp/battery.json')
lo=load('/tmp/quote-lower48.json')
hi=load('/tmp/quote-hawaii.json')
assert lo.get('ok') is True, lo
assert hi.get('ok') is True, hi
list_c=int(lo.get('listMerchandiseCents') or 0)
disc=int(lo.get('discountCents') or 0)
merch=int(lo.get('merchandiseCents') or 0)
ship=int(lo.get('shippingCents') or 0)
units=int((lo.get('battery') or {}).get('batteryUnitsPerItem') or 0)
assert units>=1, lo.get('battery')
assert disc==round(list_c*.25), (list_c,disc)
assert merch==list_c-disc, (list_c,disc,merch)
assert ship==2799*units, (ship,units)
assert int(lo.get('totalCents') or 0)==merch+ship
assert (lo.get('promotion') or {}).get('shippingDiscounted') is False
h=hi.get('hawaii') or {}
assert int(h.get('customerFreightPerBatteryCents') or 0)==9900, h
pickup_freight=int(h.get('pickupFreightCents') or 0)
pickup_price=int(h.get('pickupPriceCents') or 0)
hi_merch=int(hi.get('merchandiseCents') or 0)
assert pickup_freight==9900*units, (pickup_freight,units)
assert pickup_price==hi_merch+pickup_freight, (pickup_price,hi_merch,pickup_freight)
assert int(h.get('merchandiseAfterCouponCents') or 0)==hi_merch
assert (hi.get('promotion') or {}).get('shippingDiscounted') is False
state=str(h.get('customerState') or '')
assert state in {'shipping_available','review_required','unavailable'}, state
if state=='shipping_available':
    assert h.get('paymentAllowed') is True
    assert int(hi.get('shippingCents') or 0)==pickup_freight
    assert int(hi.get('totalCents') or 0)==pickup_price
else:
    assert h.get('paymentAllowed') is False
    assert int(hi.get('shippingCents') or 0)==0
print(json.dumps({'productId':battery.get('id'),'lower48ShippingCents':ship,'batteryUnits':units,'discountCents':disc,'hawaiiState':state,'hawaiiPickupFreightCents':pickup_freight,'hawaiiPickupPriceCents':pickup_price,'freightDiscounted':False},indent=2))
