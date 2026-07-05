import json, sys

# Check SafeTrade for NEXA
r = json.load(sys.stdin)
for t in r.get('tickers', []):
    b = t.get('base', '')
    if b in ('NEXA', 'PRL', 'ALPH', 'RVN', 'KAS', 'ETC', 'CFX', 'QTC'):
        cusd = t.get('converted_last', {}).get('usd', 'N/A')
        print(f"{b}/{t.get('target','')}: last={t.get('last')} usd={cusd} vol={t.get('volume')}")
