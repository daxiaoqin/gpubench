// Coin price proxy — fetches from CoinGecko with server-side caching
// For PRL (Pearl), uses CoinGecko ID "pearl-2" which reflects SafeTrade price (~$0.4)
import { NextResponse } from "next/server";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=pearl-2,alephium,ravencoin,kaspa,ethereum-classic,conflux-token,nexa&vs_currencies=usd&include_24hr_change=true";

// Map our coin IDs to CoinGecko IDs
const COIN_ID_MAP: Record<string, string> = {
  pearl: "pearl-2",
  alephium: "alephium",
  ravencoin: "ravencoin",
  kaspa: "kaspa",
  "ethereum-classic": "ethereum-classic",
  conflux: "conflux-token",
  nexa: "nexa",
};

// In-memory cache
let cached: { data: any; ts: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Static fallback prices (updated regularly)
const STATIC_PRICES: Record<string, { usd: number }> = {
  pearl: { usd: 0.40 },
  alephium: { usd: 0.0416 },
  ravencoin: { usd: 0.0039 },
  kaspa: { usd: 0.0313 },
  "ethereum-classic": { usd: 7.29 },
  conflux: { usd: 0.0458 },
  nexa: { usd: 0.0012 },
};

export const revalidate = 120; // 2 min ISR

export async function GET() {
  const now = Date.now();

  // Return cached data if fresh
  if (cached && now - cached.ts < CACHE_TTL) {
    return NextResponse.json(cached.data, {
      headers: { "Cache-Control": "public, max-age=120, s-maxage=240" },
    });
  }

  // Fetch from CoinGecko
  try {
    const res = await fetch(COINGECKO_URL, { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const raw = await res.json();
      // Remap CoinGecko IDs back to our coin IDs
      const remapped: Record<string, any> = {};
      for (const [ourId, cgId] of Object.entries(COIN_ID_MAP)) {
        if (raw[cgId]) {
          remapped[ourId] = raw[cgId];
        }
      }
      if (Object.keys(remapped).length > 0) {
        cached = { data: remapped, ts: now };
        return NextResponse.json(remapped, {
          headers: { "Cache-Control": "public, max-age=120, s-maxage=240" },
        });
      }
    }
  } catch {
    // Fall through to static fallback
  }

  // Fallback
  return NextResponse.json(STATIC_PRICES, {
    headers: { "Cache-Control": "public, max-age=60" },
  });
}
