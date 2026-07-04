// Network data proxy — fetches from block explorers with server-side caching
// Falls back to estimated data when APIs are unreachable
import { NextResponse } from "next/server";
import { fetchLiveNetworkData, defaultNetworkData, NetworkInfo } from "@/lib/networkData";

// In-memory cache
let cache: Record<string, { data: NetworkInfo; ts: number }> = {};
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function GET() {
  const now = Date.now();
  const result: Record<string, NetworkInfo> = {};

  for (const algoId of Object.keys(defaultNetworkData)) {
    // Check cache
    const cached = cache[algoId];
    if (cached && now - cached.ts < CACHE_TTL) {
      result[algoId] = cached.data;
      continue;
    }

    // Try live fetch
    try {
      const live = await fetchLiveNetworkData(algoId);
      if (live) {
        cache[algoId] = { data: live, ts: now };
        result[algoId] = live;
        continue;
      }
    } catch {
      // Fall through to default
    }

    // Fallback to default
    result[algoId] = defaultNetworkData[algoId];
  }

  return NextResponse.json(result, {
    headers: { "Cache-Control": "public, max-age=120, s-maxage=240" },
  });
}
