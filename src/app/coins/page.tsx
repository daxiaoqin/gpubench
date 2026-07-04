"use client";

import { coins as staticCoins, algorithms, formatNumber } from "@/lib/data";
import { useLiveCoinData } from "@/lib/hooks/useLiveData";
import Link from "next/link";

export default function CoinsPage() {
  const { data: liveCoins, loading, refetch } = useLiveCoinData(5 * 60 * 1000);

  // Use live data if available, fallback to static
  const displayCoins = liveCoins || staticCoins.map((c) => ({
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
              {/* Header */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
                  style={{ backgroundColor: (staticCoin?.color ?? "#22c55e") + "20", color: staticCoin?.color ?? "#22c55e" }}
                >
                  {coin.symbol.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-lg">{coin.name}</h2>
                    <span className="text-xs text-[--text-muted] bg-[--bg-secondary] px-2 py-0.5 rounded">
                      {coin.symbol}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[--text-muted]">
                    <span className="font-medium text-[--accent-green]">{staticCoin?.algorithm ?? algo?.name ?? "PoW"}</span>
                    <span>·</span>
                    <span>GPU Mineable</span>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl font-bold">
                  ${coin.price < 0.01 ? coin.price.toFixed(6) : coin.price.toFixed(4)}
                </span>
                <span className={`text-sm font-medium ${
                  (coin.priceChange24h ?? 0) >= 0 ? "text-[--accent-green]" : "text-[--accent-red]"
                }`}>
                  {(coin.priceChange24h ?? 0) >= 0 ? "+" : ""}{coin.priceChange24h?.toFixed(1) ?? "0.0"}%
                </span>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm border-t border-[--border-color] pt-4">
                <div className="flex justify-between">
                  <span className="text-[--text-muted]">Market Cap</span>
                  <span className="font-mono">${formatNumber(coin.marketCap)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[--text-muted]">24h Volume</span>
                  <span className="font-mono">${formatNumber(coin.volume24h)}</span>
                </div>
                {algo && (
                  <div className="flex justify-between">
                    <span className="text-[--text-muted]">Algorithm</span>
                    <span className="font-mono">{algo.name}</span>
                  </div>
                )}
              </div>

              {/* Action */}
              <Link
                href={`/calculator?coin=${coin.symbol.toLowerCase()}`}
                className="mt-4 block w-full text-center py-2 rounded-lg bg-[--bg-secondary] border border-[--border-color] text-sm hover:bg-[--bg-card-hover] hover:border-[--accent-green]/30 transition-all"
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
