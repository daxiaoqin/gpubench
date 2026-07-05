"use client";

import { coins, algorithms, formatNumber } from "@/lib/data";
import { useLiveCoinData } from "@/lib/hooks/useLiveData";
import Link from "next/link";

export default function ZhCoinsPage() {
  const { data: liveCoins } = useLiveCoinData(5 * 60 * 1000);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">可挖币种行情</h1>
        <p className="text-[--text-secondary] mt-1">
          实时追踪可挖矿币种的价格、市值和涨跌数据。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coins.map((coin) => {
          const algo = algorithms.find((a) => a.symbol === coin.symbol);
          const livePrice = liveCoins?.[coin.id]?.usd;
          const liveChange = liveCoins?.[coin.id]?.usd_24h_change;
          const displayPrice = livePrice ?? coin.price;
          const displayChange = liveChange ?? coin.priceChange24h ?? 0;
          return (
            <div key={coin.id} className="bg-[--bg-card] border border-[--border-color] rounded-xl p-6">
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg"
                  style={{ backgroundColor: (coin.color ?? "#22c55e") + "20", color: coin.color ?? "#22c55e" }}
                >
                  {coin.symbol.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-lg">{coin.name}</h2>
                    <span className="text-xs text-[--text-muted] bg-[--bg-secondary] px-2 py-0.5 rounded">{coin.symbol}</span>
                  </div>
                  <div className="text-xs text-[--text-muted]">
                    {algo?.name ?? "PoW"} · 显卡可挖
                  </div>
                </div>
              </div>

              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-3xl font-bold">${displayPrice.toFixed(displayPrice < 0.001 ? 6 : displayPrice < 1 ? 4 : 2)}</span>
                <span className={`text-sm font-medium ${displayChange >= 0 ? "text-[--accent-green]" : "text-[--accent-red]"}`}>
                  {displayChange >= 0 ? "+" : ""}{displayChange.toFixed(2)}%
                </span>
              </div>

              <div className="space-y-2 text-sm border-t border-[--border-color] pt-4">
                <div className="flex justify-between">
                  <span className="text-[--text-muted]">市值</span>
                  <span className="font-mono">${formatNumber(coin.marketCap)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[--text-muted]">24h 交易量</span>
                  <span className="font-mono">${formatNumber(coin.volume24h)}</span>
                </div>
                {algo && (
                  <div className="flex justify-between">
                    <span className="text-[--text-muted]">算法</span>
                    <span className="font-mono">{algo.name}</span>
                  </div>
                )}
              </div>

              <Link
                href={`/zh/calculator?coin=${coin.symbol.toLowerCase()}`}
                className="mt-4 block w-full text-center py-2 rounded-lg bg-[--bg-secondary] border border-[--border-color] text-sm hover:bg-[--bg-card-hover] transition-all"
              >
                计算收益 →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
