import { NextRequest, NextResponse } from "next/server";
import { fetchLiveNetworkData, defaultNetworkData, NetworkInfo } from "@/lib/networkData";

// In-memory cache
let cache: Record<string, { data: NetworkInfo; ts: number }> = {};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(request: NextRequest) {
  const algoId = request.nextUrl.searchParams.get("algo") ?? "";

  if (!algoId || !defaultNetworkData[algoId]) {
    // Return all network data if no specific algo
    const result: Record<string, NetworkInfo> = {};
    for (const key of Object.keys(defaultNetworkData)) {
      const d = await getNetworkData(key);
      if (d) result[key] = d;
    }
    return NextResponse.json(result, {
      headers: { "Cache-Control": "public, max-age=120, s-maxage=240" },
    });
  }

  const data = await getNetworkData(algoId);
  if (!data) {
    return NextResponse.json({ error: "Unknown algorithm" }, { status: 404 });
  }
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, max-age=120, s-maxage=240" },
  });
}

async function getNetworkData(algoId: string): Promise<NetworkInfo | null> {
  const now = Date.now();
  const cached = cache[algoId];
  if (cached && now - cached.ts < CACHE_TTL) {
    return cached.data;
  }

  // Try live fetch
  const live = await fetchLiveNetworkData(algoId);
  if (live) {
    cache[algoId] = { data: live, ts: now };
    return live;
  }

  // Fallback to default
  const def = defaultNetworkData[algoId];
  if (def) {
    cache[algoId] = { data: def, ts: now };
    return def;
  }

  return null;
}
