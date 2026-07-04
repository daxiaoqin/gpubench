"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchLiveNetworkData, defaultNetworkData, NetworkInfo } from "@/lib/networkData";

// ─────────────────────── Coin Price ───────────────────────

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=pearl,alephium,ravencoin,kaspa,ethereum-classic,conflux,nexa&vs_currencies=usd&include_24hr_change=true";

export function useLiveCoinData(intervalMs = 180_000) {
  const [data, setData] = useState<Record<string, { usd: number; usd_24h_change?: number }> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPrices = useCallback(async () => {
    try {
      // 1) Try server proxy (works even when CoinGecko is blocked from browser)
      const proxyRes = await fetch("/api/coins", { signal: AbortSignal.timeout(6000) });
      if (proxyRes.ok) {
        const json = await proxyRes.json();
        setData(json);
        setLoading(false);
        return;
      }
    } catch {
      // Fall through to direct CoinGecko
    }

    try {
      // 2) Try CoinGecko directly
      const res = await fetch(COINGECKO_URL, { signal: AbortSignal.timeout(8000) });
      if (res.ok) {
        const json = await res.json();
        setData(json);
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch {
      // 3) Fail silently — components use static prices when data is null
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
      // 1) Start with defaults
      const result: Record<string, NetworkInfo> = {};
      for (const algoId of Object.keys(defaultNetworkData)) {
        result[algoId] = { ...defaultNetworkData[algoId] };
      }

      let success = false;

      // 2) Try server proxy
      try {
        const proxyRes = await fetch("/api/network", { signal: AbortSignal.timeout(8000) });
        if (proxyRes.ok) {
          const json = await proxyRes.json();
          for (const algoId of Object.keys(json)) {
            if (json[algoId] && mounted) {
              result[algoId] = json[algoId];
            }
          }
          success = true;
        }
      } catch {
        // Fall through to direct fetchers
      }

      // 3) If server proxy failed, try direct block explorer fetchers
      if (!success) {
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
