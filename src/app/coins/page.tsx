"use client";

import { coins as staticCoins, algorithms, formatNumber } from "@/lib/data";
import { useLiveCoinData } from "@/lib/hooks/useLiveData";
import Link from "next/link";

interface DisplayCoin {
  id: string;
  name: string;
  symbol: string;
  price: number;
  priceChange24h: number;
  marketCap: number;
  volume24h: number;
  lastUpdated: string;
}

export default function CoinsPage() {
  const { data: liveCoins, loading, refetch } = useLiveCoinData(5 * 60 * 1000);

  // Build display coins from live data OR static fallback
  const displayCoins: DisplayCoin[] = liveCoins
    ? staticCoins.map((c) => {
        const live = liveCoins[c.id];
        return {
          id: c.id,
          name: c.name,
          symbol: c.symbol,
          price: live?.usd ?? c.price,
          priceChange24h: live?.usd_24h_change ?? c.priceChange24h,
          marketCap: c.marketCap,
          volume24h: c.volume24h,
          lastUpdated: new Date().toISOString(),
        };
      })
    : staticCoins.map((c) => ({
        id: c.id,
        name: c.name,
        symbol: c.symbol,
        price: c.price,
        priceChange24h: c.priceChange24h,
        marketCap: c.marketCap,
        volume24h: c.volume24h,
        lastUpdated: new Date().toISOString(),
      }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mineable Coins</h1>
          <p className="text-[--text-secondary] mt-1">
            {loading
              ? "Loading live prices..."
              : "Real-time prices via CoinGecko · updates every 5 minutes"}
          </p>
        </div>
        {!loading && (
          <button
            onClick={refetch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[--bg-card] border border-[--border-color] text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayCoins.map((coin) => {
          const staticCoin = staticCoins.find((c) => c.id === coin.id);
          const algo = algorithms.find((a) => a.symbol === coin.symbol);

          return (
            <div
              key={coin.id}
              className="bg-[--bg-card] border border-[--border-color] rounded-xl p-6 hover:border-[--accent-green]/20 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl" style={{ filter: "grayscale(0.2)" }}>
                    {staticCoin?.color ?? "🪙"}
                  </span>
                  <div>
                    <div className="font-semibold">{coin.name}</div>
                    <div className="text-xs text-[--text-muted]">{coin.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-semibold">
                    ${coin.price < 0.01 ? coin.price.toFixed(6) : coin.price.toFixed(4)}
                  </div>
                  <div
                    className={`text-xs font-mono ${
                      coin.priceChange24h >= 0
                        ? "text-[--accent-green]"
                        : "text-[--accent-red]"
                    }`}
                  >
                    {coin.priceChange24h >= 0 ? "+" : ""}
                    {coin.priceChange24h.toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className="flex justify-between text-xs text-[--text-secondary] mb-3">
                <span>Algorithm: <span className="font-medium text-[--text-primary]">{algo?.name ?? coin.symbol}</span></span>
                <span>Market Cap: <span className="font-medium text-[--text-primary]">{formatNumber(coin.marketCap)}</span></span>
              </div>

              <Link
                href={`/calculator?coin=${coin.symbol.toLowerCase()}`}
                className="block w-full text-center py-2 rounded-lg bg-[--accent-green]/10 text-[--accent-green] text-sm font-medium hover:bg-[--accent-green]/20 transition-colors"
              >
                Calculate Profitability →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
