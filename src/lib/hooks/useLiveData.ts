import { useState, useEffect, useCallback } from "react";
import { fetchLiveNetworkData, defaultNetworkData, NetworkInfo } from "@/lib/networkData";

// ─────────────────────── Coin Price (Client-side only) ───────────────────────

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=pearl,alephium,ravencoin,kaspa,ethereum-classic,conflux,nexa&vs_currencies=usd&include_24hr_change=true";

export function useLiveCoinData(intervalMs = 120_000) {
  const [data, setData] = useState<Record<string, { usd: number; usd_24h_change?: number }> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch(COINGECKO_URL, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch {
      // Fail silently — CoinGecko may be rate-limited or blocked by ad-blockers
      // Components fall back to static prices when data is null
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

// ─────────────────────── Network Hashrate (Client-side only) ─────────────────

export function useNetworkData() {
  const [data, setData] = useState<Record<string, NetworkInfo> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchAll = async () => {
      setLoading(true);
      // Start with defaults, then try live fetchers
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
