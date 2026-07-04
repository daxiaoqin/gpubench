// Coin price proxy — fetches from CoinGecko with server-side caching
import { NextRequest, NextResponse } from "next/server";
import { coins } from "@/lib/data";

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=pearl,alephium,ravencoin,kaspa,ethereum-classic,conflux,nexa&vs_currencies=usd&include_24hr_change=true";

// In-memory cache
let cached: { data: any; ts: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

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
      const data = await res.json();
      cached = { data, ts: now };
      return NextResponse.json(data, {
        headers: { "Cache-Control": "public, max-age=120, s-maxage=240" },
      });
    }
  } catch {
    // Fall through to static fallback
  }

  // Fallback: return static prices
  const fallback: Record<string, { usd: number }> = {};
  for (const coin of coins) {
    fallback[coin.id] = { usd: coin.price };
  }
  return NextResponse.json(fallback, {
    headers: { "Cache-Control": "public, max-age=60" },
  });
}
