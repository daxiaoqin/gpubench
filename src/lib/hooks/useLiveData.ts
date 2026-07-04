"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchLiveNetworkData, defaultNetworkData, NetworkInfo } from "@/lib/networkData";

// ─────────────────────── Coin Price ───────────────────────
// NOTE: This site uses static export — no server API routes.
// Coin prices are fetched directly from CoinGecko (works if user has VPN/proxy).
// Falls back to static prices baked into the build.
//
// CoinGecko IDs:
//   PRL → "pearl-2" (SafeTrade price ~$0.4)
//   CFX → "conflux-token"
//   others → standard IDs

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=pearl-2,alephium,ravencoin,kaspa,ethereum-classic,conflux-token,nexa&vs_currencies=usd&include_24hr_change=true";

// Map CoinGecko IDs back to our coin IDs
const CG_OUR_MAP: Record<string, string> = {
  "pearl-2": "pearl",
  "alephium": "alephium",
  "ravencoin": "ravencoin",
  "kaspa": "kaspa",
  "ethereum-classic": "ethereum-classic",
  "conflux-token": "conflux",
  "nexa": "nexa",
};

export function useLiveCoinData(intervalMs = 180_000) {
  const [data, setData] = useState<Record<string, { usd: number; usd_24h_change?: number }> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPrices = useCallback(async () => {
    try {
      // Try CoinGecko directly (works if user has VPN/proxy)
      const res = await fetch(COINGECKO_URL, { signal: AbortSignal.timeout(8000) });
      if (res.ok) {
        const raw = await res.json();
        // Remap CoinGecko IDs → our coin IDs
        const remapped: Record<string, { usd: number; usd_24h_change?: number }> = {};
        for (const [cgId, val] of Object.entries(raw) as [string, any][]) {
          const ourId = CG_OUR_MAP[cgId];
          if (ourId && val) {
            remapped[ourId] = { usd: val.usd ?? 0, usd_24h_change: val.usd_24h_change };
          }
        }
        if (Object.keys(remapped).length > 0) {
          setData(remapped);
          setLoading(false);
          return;
        }
      }
      throw new Error("CoinGecko fetch failed");
    } catch {
      // Silent fail — components use static prices when data is null
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    fetchPrices();
    const interval = setInterval(() => {
      if (mounted) fetchPrices();
    }, intervalMs);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [fetchPrices, intervalMs]);

  const refetch = useCallback(() => {
    setLoading(true);
    fetchPrices();
  }, [fetchPrices]);

  return { data, loading, refetch };
}

export function getCoinPrice(
  liveData: Record<string, { usd: number; usd_24h_change?: number }> | null,
  coinId: string
): { price: number; priceChange24h: number } | null {
  if (!liveData || !liveData[coinId]) return null;
  return {
    price: liveData[coinId].usd ?? 0,
    priceChange24h: liveData[coinId].usd_24h_change ?? 0,
  };
}

// ─────────────────────── Network Hashrate ─────────────────

export function useNetworkData() {
  const [data, setData] = useState<Record<string, NetworkInfo> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      // Start with defaults, try block explorer fetchers directly
      const result: Record<string, NetworkInfo> = {};
      for (const algoId of Object.keys(defaultNetworkData)) {
        result[algoId] = { ...defaultNetworkData[algoId] };
      }

      for (const algoId of Object.keys(defaultNetworkData)) {
        try {
          const live = await fetchLiveNetworkData(algoId);
          if (live && mounted) {
            result[algoId] = live;
          }
        } catch {
          // Use default
        }
      }

      if (mounted) {
        setData(result);
        setLoading(false);
      }
    };

    fetchAll();
    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading };
}
