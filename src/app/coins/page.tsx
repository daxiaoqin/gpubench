"use client";

import { coins, algorithms, formatNumber } from "@/lib/data";
import Link from "next/link";

export default function CoinsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Mineable Coins</h1>
        <p className="text-[--text-secondary] mt-1">
          Real-time market data for proof-of-work coins. Prices update every 5 minutes via CoinGecko.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coins.map((coin) => {
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
                  style={{ backgroundColor: coin.color + "20", color: coin.color }}
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
                    <span className="font-medium text-[--accent-green]">{coin.algorithm}</span>
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
                  coin.priceChange24h >= 0 ? "text-[--accent-green]" : "text-[--accent-red]"
                }`}>
                  {coin.priceChange24h >= 0 ? "+" : ""}{coin.priceChange24h}%
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
                    <span className="text-[--text-muted]">Hashrate Unit</span>
                    <span className="font-mono">{coin.hashrateUnit}</span>
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
