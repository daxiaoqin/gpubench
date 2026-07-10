"use client";

import { gpus, algorithms, coins as staticCoins, formatHashrate, formatNumber } from "@/lib/data";
import { useLiveCoinData } from "@/lib/hooks/useLiveData";
import Link from "next/link";

export default function HomePage() {
  const { data: liveCoins, loading } = useLiveCoinData();

  // Pick the top 8 GPUs sorted by efficiency on PearlHash
  const topGpus = [...gpus]
    .map((g) => ({
      ...g,
      efficiency: g.hashrates["pearlhash"] ? g.hashrates["pearlhash"] / g.tdp * 1000 : 0,
    }))
    .sort((a, b) => b.efficiency - a.efficiency)
    .slice(0, 8);

  // Use live data if available, fallback to static
  const featuredCoins = liveCoins
    ? staticCoins.map((c) => ({
        id: c.id,
        name: c.name,
        symbol: c.symbol,
        price: liveCoins[c.id]?.usd ?? c.price,
        priceChange24h: liveCoins[c.id]?.usd_24h_change ?? c.priceChange24h,
        marketCap: c.marketCap,
        volume24h: c.volume24h,
        lastUpdated: new Date().toISOString(),
      })).slice(0, 8)
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
    <div>
      {/* ─────── HERO ─────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[--accent-teal]/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-[--accent-teal]/5 rounded-full blur-3xl float-anim" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-[--accent-purple]/5 rounded-full blur-3xl float-slow" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[--accent-teal]/10 border border-[--accent-teal]/20 text-[--accent-teal] text-sm mb-6 fade-in">
              <span className="w-2 h-2 rounded-full bg-[--accent-teal] pulse-glow" />
              Real-world GPU benchmark data{!loading && liveCoins && <span className="text-[--text-muted]"> · Live prices</span>}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 fade-in">
              Find the{" "}
              <span className="text-[--accent-teal]">Most Profitable</span>{" "}
              GPU for Mining
            </h1>
            <p className="text-lg md:text-xl text-[--text-secondary] mb-10 max-w-2xl mx-auto fade-in">
              Compare hashrates, power efficiency, and real profitability
              across 8 algorithms. Data verified from actual mining rigs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 fade-in">
              <Link
                href="/gpus"
                className="px-6 py-3 rounded-xl bg-[--accent-teal] text-black font-semibold hover:brightness-110 transition-all text-lg"
              >
                Browse GPUs →
              </Link>
              <Link
                href="/calculator"
                className="px-6 py-3 rounded-xl border border-[--border-color] text-[--text-primary] font-semibold hover:bg-[--bg-card] transition-all text-lg"
              >
                Profit Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────── STATS BAR ─────── */}
      <section className="border-y border-[--border-color] bg-[--bg-secondary]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center fade-in-up stagger-item">
              <div className="text-2xl font-bold text-[--accent-teal]">{gpus.length}</div>
              <div className="text-sm text-[--text-muted]">GPUs Benchmarked</div>
            </div>
            <div className="text-center fade-in-up stagger-item">
              <div className="text-2xl font-bold text-[--accent-green]">{algorithms.length}</div>
              <div className="text-sm text-[--text-muted]">Algorithms Supported</div>
            </div>
            <div className="text-center fade-in-up stagger-item">
              <div className="text-2xl font-bold text-[--accent-amber]">{staticCoins.length}</div>
              <div className="text-sm text-[--text-muted]">Coins Tracked</div>
            </div>
            <div className="text-center fade-in-up stagger-item">
              <div className="text-2xl font-bold text-[--accent-purple]">
                {loading ? "Loading..." : "Live"}
              </div>
              <div className="text-sm text-[--text-muted]">Market Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────── TOP GPUs ─────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Top GPUs by Efficiency</h2>
            <p className="text-[--text-secondary] mt-1">Best hashrate-per-watt across all algorithms</p>
          </div>
          <Link href="/gpus" className="text-[--accent-teal] hover:underline text-sm">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topGpus.map((gpu, i) => (
            <Link
              key={gpu.id}
              href="/gpus"
              className="group bg-[--bg-card] border border-[--border-color] rounded-xl p-5 card-hover fade-in-up stagger-item"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs text-[--text-muted] mb-1">#{i + 1}</div>
                  <h3 className="font-semibold group-hover:text-[--accent-green] transition-colors">
                    {gpu.name}
                  </h3>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  gpu.manufacturer === "NVIDIA" ? "bg-emerald-900/30 text-emerald-400" : "bg-rose-900/30 text-rose-400"
                }`}>
                  {gpu.manufacturer}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[--text-muted]">PearlHash</span>
                  <span className="font-mono">{formatHashrate(gpu.hashrates["pearlhash"] ?? 0, "TH/s")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[--text-muted]">Blake3</span>
                  <span className="font-mono">{formatHashrate(gpu.hashrates["blake3"] ?? 0, "GH/s")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[--text-muted]">Power</span>
                  <span className="font-mono">{gpu.tdp}W</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[--border-color]">
                  <span className="text-[--text-muted]">Efficiency</span>
                  <span className="font-mono text-[--accent-green]">
                    {gpu.efficiency.toFixed(0)} H/W
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────── FEATURED COINS ─────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Market Overview</h2>
            <p className="text-[--text-secondary] mt-1">
              {loading ? "Loading prices..." : "Live prices from CoinGecko · updates every 5 min"}
            </p>
          </div>
          <Link href="/coins" className="text-[--accent-purple] hover:underline text-sm">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredCoins.map((coin, i) => {
            // Match static coin data for color & algorithm info
            const staticCoin = staticCoins.find((c) => c.id === coin.id);
            return (
              <div
                key={coin.id}
                className="bg-[--bg-card] border border-[--border-color] rounded-xl p-5 card-hover fade-in-up stagger-item"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: (staticCoin?.color ?? "#22c55e") + "20", color: staticCoin?.color ?? "#22c55e" }}
                  >
                    {coin.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{coin.name}</div>
                    <div className="text-xs text-[--text-muted]">{coin.symbol} · {staticCoin?.algorithm ?? "Mineable"}</div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[--text-muted]">Price</span>
                    <span className="font-mono">
                      ${coin.price < 0.01 ? coin.price.toFixed(6) : coin.price.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[--text-muted]">24h Change</span>
                    <span className={`font-mono ${coin.priceChange24h >= 0 ? "text-[--accent-green]" : "text-[--accent-red]"}`}>
                      {coin.priceChange24h >= 0 ? "+" : ""}{coin.priceChange24h?.toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[--text-muted]">Market Cap</span>
                    <span className="font-mono">${formatNumber(coin.marketCap)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[--text-muted]">24h Volume</span>
                    <span className="font-mono">${formatNumber(coin.volume24h)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────── CTA ─────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[--accent-teal]/10 to-[--accent-purple]/10 border border-[--accent-teal]/20 p-8 md:p-12 text-center">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Find Your Best Mining GPU?
            </h2>
            <p className="text-[--text-secondary] mb-8 max-w-xl mx-auto">
              Use our interactive calculator to compare real profitability
              across GPUs, algorithms, and power settings.
            </p>
            <Link
              href="/calculator"
              className="inline-flex px-6 py-3 rounded-xl bg-[--accent-teal] text-black font-semibold hover:brightness-110 transition-all text-lg"
            >
              Open Calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* ─────── External Authority Links ─────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center text-xs text-[--text-muted] space-x-3">
          <span>Data sources:</span>
          <a href="https://www.coingecko.com" target="_blank" rel="noopener noreferrer" className="hover:text-[--text-primary] underline underline-offset-2">CoinGecko</a>
          <span>•</span>
          <a href="https://whattomine.com" target="_blank" rel="noopener noreferrer" className="hover:text-[--text-primary] underline underline-offset-2">WhatToMine</a>
          <span>•</span>
          <a href="https://www.nvidia.com" target="_blank" rel="noopener noreferrer" className="hover:text-[--text-primary] underline underline-offset-2">NVIDIA GPU Specs</a>
          <span>•</span>
          <a href="https://www.amd.com" target="_blank" rel="noopener noreferrer" className="hover:text-[--text-primary] underline underline-offset-2">AMD GPU Specs</a>
        </div>
      </section>
    </div>
  );
}
