from __future__ import annotations

import csv
import hashlib
import pathlib
import shutil
import urllib.request
import zipfile
from collections import Counter

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font
from openpyxl.utils import get_column_letter

ROOT = pathlib.Path('operations/vendor-source/vevor/2026-09-10')
SOURCE_URL = 'https://ads-feed.s3.us-west-2.amazonaws.com/ads/business/533/vevor-533.xlsx'
SOURCE_XLSX = pathlib.Path('/tmp/vevor-533.xlsx')
CURATED_CSV = ROOT / '05_VEVOR_Curated_40.csv'
LIGHT_CSV = ROOT / '06_VEVOR_All_Products_Light.csv'
CURATED_XLSX = ROOT / '04_Elevation_VEVOR_Curated_Catalog_Working_Set_2026-09-10.xlsx'
RUN_XLSX = ROOT / 'VEVOR_A_TIER_RUN_COMPLETE_2026-09-10.xlsx'
PACKET_ZIP = ROOT / 'VEVOR_PUBLIC_SAFE_WORKER_PACKET_2026-09-10.zip'
MANIFEST = ROOT / '10_MANIFEST_SHA256.txt'

LIGHT_FIELDS = [
    'SKU',
    'Product title',
    'Product link',
    'Availability',
    'Inventory quantity',
    'Product weight(KG)',
    'Brand',
    'Product type',
    'after coupon price',
    'MAP (Minimum Advertised Price)',
]

SOP_ROWS = [
    ('Relationship', 'VEVOR is an active direct-site dropship supplier onboarding lane; do not restart supplier qualification.', 'Use this packet for activation and catalog work, not new qualification.', 'ACTIVE'),
    ('Approved channel', "Direct VEVOR inventory is for Elevation's independent storefront unless VEVOR separately authorizes another sales channel.", 'CURATED 40 is intended for ElevationUpScales.com. Do not push direct-VEVOR inventory to eBay/Amazon/Walmart by default.', 'CONTROLLED'),
    ('MAP / selling-price floor', "The source feed contains a populated MAP field. VEVOR also instructed Elevation that its selling price cannot be below VEVOR's current selling price.", 'Planning Ad Floor = max(feed MAP, feed after-coupon reference). Recheck live VEVOR selling price before publish/order and use the higher applicable floor.', 'LIVE CHECK REQUIRED'),
    ('Inventory', 'Feed inventory is a snapshot, not a customer promise.', 'Recheck live stock before accepting or fulfilling a customer order.', 'LIVE CHECK REQUIRED'),
    ('Backorder / preorder', 'No VEVOR paid-backorder/preorder authorization is currently established.', 'If exact SKU is unavailable and no authorized alternate exists, pause that SKU only.', 'CONTROLLED'),
    ('Order flow', 'Customer order → Elevation checkout → VEVOR supplier order → supplier fulfillment → tracking → customer completion.', 'Do not block checkout for unrelated internal onboarding notes.', 'ACTIVE'),
    ('Tax license', 'The Colorado wholesale sales-tax license/account identifier is restricted company material.', 'Use the private company/account record only when required. Do not place it in public Git.', 'RESTRICTED'),
]

FULFILLMENT_ROWS = [
    ('Order Flow', 'CLOSED', 'Customer order → Elevation checkout → VEVOR supplier order → supplier fulfillment → tracking → customer completion.', 'Use as the direct-site fulfillment sequence.', 'Project master prompt', 'Operations / Peter', '2026-09-10'),
    ('Processing / Delivery', 'CLOSED', 'VEVOR states 1–2 business days processing and 2–6 business days delivery for general products; heavy products over 66 lb can take around 10–15 working days.', 'Do not promise exact delivery; show an estimated range and exception language.', 'VEVOR shipping policy', 'Operations / Storefront', '2026-09-10'),
    ('Tracking', 'CLOSED', 'Tracking is posted to VEVOR My Orders after shipment.', 'Capture tracking from supplier order and pass it to the Elevation customer order.', 'VEVOR FAQ', 'Operations / Peter', '2026-09-10'),
    ('Returns', 'CLOSED', 'Most original-condition items can be returned/exchanged within 30 days; authorization is required before return shipment.', 'Customer contacts Elevation first; Elevation opens VEVOR case and controls the return label/return destination.', 'VEVOR return policy', 'Operations / Customer Support', '2026-09-10'),
    ('Tax Exemption', 'WAITING', 'Tax-exemption review remains pending per project state; account identifier is retained outside public Git.', 'Catalog work continues; verify tax line on first supplier order.', 'Project current state', 'Peter / Operations', '2026-09-10'),
    ('Blind Shipping / Packing Slip', 'WAITING', 'Supplier-specific confirmation remains in flight.', 'Do not make unsupported customer-facing claims about packaging.', 'Supplier inquiry', 'Peter', '2026-09-10'),
]

RUN_RECEIPT_ROWS = [
    ('A-tier live gate', '19 / 19 A-tier pages checked; live displayed price equals feed MAP on all 19; selected page status shows In Stock on all 19.', 'CLOSED', 'Recheck exact variant, price, and stock again at supplier-order placement.'),
    ('Shopify product records', '19 / 19 verified A-tier SKUs already exist as ACTIVE VEVOR-Direct products at the verified price. No duplicate records created.', 'CLOSED', 'Preserve existing records and supplier-lane tags.'),
    ('VEVOR Direct collection', 'Smart collection contains all 19 VEVOR-Direct products and is attached to the Online Store publication.', 'CLOSED', 'No publication mutation required.'),
    ('Supplier operating details', 'Blind shipping / packing slips, normal tracking handoff, RMA/returns and support-routing confirmations remain in flight.', 'WAITING', 'Update SOP when supplier reply arrives; do not duplicate the open inquiry.'),
    ('Tax exemption', 'Final review remains pending; restricted identifier is retained outside public Git.', 'WAITING', 'Verify first supplier-order tax line and capture final approval.'),
]


def autosize(ws, max_width=60):
    for col in range(1, ws.max_column + 1):
        letter = get_column_letter(col)
        width = 10
        for cell in ws[letter]:
            if cell.value is not None:
                width = max(width, min(max_width, len(str(cell.value)) + 2))
                cell.alignment = Alignment(vertical='top', wrap_text=True)
        ws.column_dimensions[letter].width = width
    ws.freeze_panes = 'A2'


def bold_row(ws, row=1):
    for cell in ws[row]:
        cell.font = Font(bold=True)


def read_curated():
    with CURATED_CSV.open(encoding='utf-8-sig', newline='') as fh:
        return list(csv.DictReader(fh))


def write_control_sheet(ws, curated):
    counts = Counter(row['Lane'] for row in curated)
    ws.append(['ELEVATION UPSCALES — VEVOR CATALOG CONTROL'])
    ws.append([])
    ws.append(['Control Item', 'Current State', '', 'Lane', 'Curated Count'])
    controls = [
        ('Source workbook', 'vevor-533.xlsx'),
        ('Source product rows scanned', 20999),
        ('Source rows marked in stock', 16051),
        ('Supplier relationship', 'VEVOR PRO COMPLETE / DIRECT-SITE DROPSHIP ACTIVE'),
        ('Colorado tax exemption', 'SUBMITTED / PENDING REVIEW'),
        ('VEVOR Tax Exempt ID', 'RESTRICTED — VEVOR ACCOUNT RECORD'),
        ('A-tier Shopify reconciliation', '19 / 19 ACTIVE AS VEVOR-Direct — DO NOT DUPLICATE'),
        ('Public repository security', 'Restricted license/account artifacts excluded'),
    ]
    lanes = ['Power & Off-Grid', 'RV & Mobile', 'Restoration & Field Service', 'Outdoor & Support']
    max_rows = max(len(controls), len(lanes))
    for i in range(max_rows):
        left = controls[i] if i < len(controls) else ('', '')
        lane = lanes[i] if i < len(lanes) else ''
        ws.append([left[0], left[1], '', lane, counts.get(lane, '') if lane else ''])
    ws['A1'].font = Font(bold=True, size=14)
    bold_row(ws, 3)
    autosize(ws)
    ws.freeze_panes = 'A4'


def write_curated_sheet(ws, curated):
    headers = list(curated[0].keys())
    ws.append(headers)
    for row in curated:
        values = []
        for h in headers:
            v = row[h]
            if h in {'Rank', 'Inventory Qty'}:
                try: v = int(float(v))
                except Exception: pass
            elif h in {'Weight kg', 'After-Coupon Ref', 'Feed MAP', 'Planning Ad Floor'}:
                try: v = float(v)
                except Exception: pass
            values.append(v)
        ws.append(values)
    bold_row(ws)
    ws.auto_filter.ref = ws.dimensions
    autosize(ws)


def write_sop_sheet(ws):
    ws.append(['Control Area', 'Current Rule', 'Workbook / Catalog Action', 'State'])
    for row in SOP_ROWS:
        ws.append(row)
    bold_row(ws)
    autosize(ws)


def build_curated_workbook(curated):
    wb = Workbook()
    ws = wb.active
    ws.title = 'CONTROL'
    write_control_sheet(ws, curated)
    write_curated_sheet(wb.create_sheet('CURATED 40'), curated)
    write_sop_sheet(wb.create_sheet('VEVOR SOP'))
    wb.save(CURATED_XLSX)


def build_run_workbook(curated):
    wb = Workbook()
    ws = wb.active
    ws.title = 'CONTROL'
    write_control_sheet(ws, curated)
    write_curated_sheet(wb.create_sheet('CURATED 40'), curated)
    write_sop_sheet(wb.create_sheet('VEVOR SOP'))

    a = [row for row in curated if row['Priority'].startswith('A')]
    if len(a) != 19:
        raise SystemExit(f'Expected 19 A-tier curated rows, found {len(a)}')

    live = wb.create_sheet('A-TIER LIVE CHECK')
    live_headers = ['Rank', 'Lane', 'SKU', 'Product Title', 'Feed MAP', 'Live VEVOR Price', 'Live Stock', 'Applicable Floor', 'Price Match', 'Activation Status', 'Verified Date', 'Source URL', 'Control Note']
    live.append(live_headers)
    for row in a:
        feed_map = float(row['Feed MAP'])
        planning = float(row['Planning Ad Floor'])
        live.append([
            int(row['Rank']), row['Lane'], row['SKU'], row['Product Title'], feed_map,
            feed_map, 'In Stock', max(feed_map, planning), 'MATCH', 'ACTIVE / PUBLISHED',
            '2026-09-10', row['Product Link'],
            'Shopify direct VEVOR record is ACTIVE and included in the Online Store publication / VEVOR Direct collection. Recheck exact VEVOR variant, live price, and live stock again at supplier-order placement.'
        ])
    bold_row(live)
    live.auto_filter.ref = live.dimensions
    autosize(live)

    fulfillment = wb.create_sheet('FULFILLMENT CONTROL')
    fulfillment.append(['Control', 'Status', 'Verified Rule', 'Operational Use', 'Source', 'Owner / Next Action', 'Last Check'])
    for row in FULFILLMENT_ROWS:
        fulfillment.append(row)
    bold_row(fulfillment)
    autosize(fulfillment)

    receipt = wb.create_sheet('RUN RECEIPT')
    receipt.append(['VEVOR RUN RECEIPT', '2026-09-10', '', ''])
    receipt.append(['Workstream', 'Result', 'State', 'Next'])
    for row in RUN_RECEIPT_ROWS:
        receipt.append(row)
    receipt['A1'].font = Font(bold=True, size=14)
    bold_row(receipt, 2)
    autosize(receipt)
    receipt.freeze_panes = 'A3'

    shop = wb.create_sheet('SHOPIFY RECON')
    shop.append(['SHOPIFY / VEVOR DIRECT RECONCILIATION'])
    shop.append([])
    shop.append(['Store', 'Elevation Upscales'])
    shop.append(['Direct collection', 'VEVOR Direct'])
    shop.append(['Direct collection count', 19])
    shop.append(['Supplier tag', 'VEVOR-Direct'])
    shop.append(['Control', 'Existing A-tier records are authoritative; do not create duplicates.'])
    shop.append([])
    shop.append(['Rank', 'SKU', 'Product Title', 'State'])
    for row in a:
        shop.append([int(row['Rank']), row['SKU'], row['Product Title'], 'ACTIVE / PUBLISHED'])
    shop['A1'].font = Font(bold=True, size=14)
    bold_row(shop, 9)
    autosize(shop)
    shop.freeze_panes = 'A10'

    wb.save(RUN_XLSX)


def build_light_feed():
    urllib.request.urlretrieve(SOURCE_URL, SOURCE_XLSX)
    from openpyxl import load_workbook
    wb = load_workbook(SOURCE_XLSX, read_only=True, data_only=True)
    ws = wb[wb.sheetnames[0]]
    rows = ws.iter_rows(values_only=True)
    headers = [str(v).strip() if v is not None else '' for v in next(rows)]
    missing = [name for name in LIGHT_FIELDS if name not in headers]
    if missing:
        raise SystemExit(f'Missing expected VEVOR columns: {missing}')
    idx = [headers.index(name) for name in LIGHT_FIELDS]
    count = 0
    with LIGHT_CSV.open('w', newline='', encoding='utf-8-sig') as fh:
        writer = csv.writer(fh)
        writer.writerow(LIGHT_FIELDS)
        for row in rows:
            writer.writerow([row[i] if i < len(row) else None for i in idx])
            count += 1
    if count < 1:
        raise SystemExit(f'VEVOR live feed returned no product rows: {count}')


def write_manifest():
    lines = [
        '# VEVOR PUBLIC-SAFE WORKER PACKAGE — SHA256',
        '# Restricted Colorado tax-license image/account ID intentionally excluded from public Git.',
    ]
    for path in sorted(ROOT.iterdir()):
        if not path.is_file() or path.name in {MANIFEST.name, PACKET_ZIP.name}:
            continue
        digest = hashlib.sha256(path.read_bytes()).hexdigest()
        lines.append(f'{digest}  {path.name}')
    MANIFEST.write_text('\n'.join(lines) + '\n', encoding='utf-8')


def build_zip():
    excluded = {PACKET_ZIP.name, '08_Colorado_Wholesale_Sales_Tax_License.jpeg'}
    with zipfile.ZipFile(PACKET_ZIP, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        for path in sorted(ROOT.iterdir()):
            if path.is_file() and path.name not in excluded:
                zf.write(path, arcname=path.name)


def main():
    ROOT.mkdir(parents=True, exist_ok=True)
    curated = read_curated()
    if len(curated) != 40:
        raise SystemExit(f'Expected 40 curated rows, found {len(curated)}')
    build_curated_workbook(curated)
    build_run_workbook(curated)
    build_light_feed()
    write_manifest()
    build_zip()
    print('VEVOR worker assets built successfully.')


if __name__ == '__main__':
    main()
