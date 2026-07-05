import json, sys

# Check all coin prices from live APIs
data = json.load(sys.stdin)

# Our coins vs CoinGecko IDs
coins = {
    "pearl-2": "PRL",
    "alephium": "ALPH",
    "ravencoin": "RVN",
    "kaspa": "KAS",
    "ethereum-classic": "ETC",
    "conflux-token": "CFX",
    "nexa": "NEXA (WRONG ID!)",
    "nexacoin": "NEXA (alt)",
}

for cg_id, name in coins.items():
    if cg_id in data:
        print(f"{name} ({cg_id}): ${data[cg_id]['usd']}")
