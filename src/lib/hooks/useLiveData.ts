"use client";

import { useState, useEffect, useCallback } from "react";
import type { LiveCoinData } from "@/app/api/coins/route";
import type { NetworkInfo } from "@/lib/networkData";

/**
 * Hook to fetch live coin data from our CoinGecko proxy API
 * Auto-refreshes every 5 minutes
 */
export function useLiveCoinData(refreshMs = 5 * 60 * 1000) {
  const [data, setData] = useState<LiveCoinData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/coins");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: LiveCoinData[] = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshMs);
    return () => clearInterval(interval);
  }, [fetchData, refreshMs]);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook to fetch live network hashrate data
 * Auto-refreshes every 10 minutes (network data changes slower than prices)
 */
export function useNetworkData(refreshMs = 10 * 60 * 1000) {
  const [data, setData] = useState<Record<string, NetworkInfo> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/network");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: Record<string, NetworkInfo> = await res.json();
      setData(json);
    } catch {
      // Keep previous data on error
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshMs);
    return () => clearInterval(interval);
  }, [fetchData, refreshMs]);

  return { data, loading, refetch: fetchData };
}

/**
 * Get price for a specific coin by ID
 */
export function getCoinPrice(data: LiveCoinData[] | null, coinId: string): LiveCoinData | undefined {
  return data?.find((c) => c.id === coinId);
}
