"use client";

import Link from "next/link";
import { gpus, algorithms, coins, calcDailyRevenue, formatHashrate, formatNumber } from "@/lib/data";

export default function ZhHomePage() {
  // Get top GPUs by overall efficiency
  const topGPUs = [...gpus]
    .map((g) => ({
      ...g,
      avgEff:
        gpus.reduce((sum, gg) => sum + (g.hashrates[gg.hashrates ? Object.keys(gg.hashrates)[0] : "pearlhash"] ?? 0), 0) /
        Object.keys(g.hashrates).length,
      totalHash:
        Object.values(g.hashrates).reduce((sum, h) => sum + (h ?? 0), 0) / 1000, // normalized
    }))
    .sort((a, b) => {
      const aHash = Object.values(a.hashrates).reduce((s, h) => s + (h ?? 0), 0);
      const bHash = Object.values(b.hashrates).reduce((s, h) => s + (h ?? 0), 0);
      return bHash / b.tdp - aHash / a.tdp;
    })
    .slice(0, 8);

  const totalGpus = gpus.length;
  const totalAlgos = algorithms.length;
  const topEfficiency = gpus.length > 0
    ? [...gpus].sort((a, b) => {
        const aEff = Object.values(a.hashrates).reduce((s, h) => s + (h ?? 0), 0) / a.tdp;
        const bEff = Object.values(b.hashrates).reduce((s, h) => s + (h ?? 0), 0) / b.tdp;
        return bEff - aEff;
      })[0]
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="text-center py-12 mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="text-[var(--accent-green)]">GPU</span> 算力数据库 &amp; 挖矿计算器
        </h1>
        <p className="text-lg text-[--text-secondary] max-w-2xl mx-auto">
          最全面的显卡挖矿性能数据库。比较算力、功耗、能效，计算挖矿收益。
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link
            href="/zh/gpus"
            className="px-6 py-2.5 rounded-xl bg-[var(--accent-green)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            浏览显卡 →
          </Link>
          <Link
            href="/zh/calculator"
            className="px-6 py-2.5 rounded-xl border border-[--border-color] text-[--text-primary] font-medium hover:bg-[--bg-card-hover] transition-colors"
          >
            计算收益
          </Link>
          <Link
            href="/zh/tutorials"
            className="px-6 py-2.5 rounded-xl border border-[--border-color] text-[--text-primary] font-medium hover:bg-[--bg-card-hover] transition-colors"
          >
            新手教程
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="bg-[--bg-card] border border-[--border-color] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[var(--accent-green)]">{totalGpus}</div>
          <div className="text-sm text-[--text-muted]">收录显卡</div>
        </div>
        <div className="bg-[--bg-card] border border-[--border-color] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold">{totalAlgos}</div>
          <div className="text-sm text-[--text-muted]">支持的算法</div>
        </div>
        <div className="bg-[--bg-card] border border-[--border-color] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold">{coins.length}</div>
          <div className="text-sm text-[--text-muted]">监控币种</div>
        </div>
        <div className="bg-[--bg-card] border border-[--border-color] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[--accent-blue]">
            {topEfficiency ? (Object.values(topEfficiency.hashrates).reduce((s, h) => s + (h ?? 0), 0) / topEfficiency.tdp).toFixed(1) : "—"}
          </div>
          <div className="text-sm text-[--text-muted]">最高能效比 (H/W)</div>
        </div>
      </div>

      {/* Top GPU Rankings */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">🏆 能效排行 Top 8</h2>
          <Link href="/zh/gpus" className="text-sm text-[var(--accent-green)] hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {topGPUs.map((gpu, i) => {
            const totalHash = Object.values(gpu.hashrates).reduce((s, h) => s + (h ?? 0), 0);
            const efficiency = totalHash / gpu.tdp;
            return (
              <Link
                key={gpu.id}
                href={`/zh/gpus#${gpu.id}`}
                className="bg-[--bg-card] border border-[--border-color] rounded-xl p-4 hover:border-[var(--accent-green)]/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold">#{i + 1}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[--bg-secondary]">{gpu.manufacturer}</span>
                </div>
                <h3 className="font-medium text-sm group-hover:text-[var(--accent-green)] transition-colors">
                  {gpu.name}
                </h3>
                <div className="mt-3 space-y-1 text-xs text-[--text-secondary]">
                  <div className="flex justify-between">
                    <span>功耗</span>
                    <span>{gpu.tdp}W</span>
                  </div>
                  <div className="flex justify-between">
                    <span>能效</span>
                    <span className="text-[--accent-green] font-mono">{efficiency.toFixed(1)} H/W</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Coins overview */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">💰 可挖币种</h2>
          <Link href="/zh/coins" className="text-sm text-[var(--accent-green)] hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {coins.slice(0, 8).map((coin) => {
            const algo = algorithms.find((a) => a.symbol === coin.symbol);
            return (
              <div key={coin.id} className="bg-[--bg-card] border border-[--border-color] rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
                    style={{ backgroundColor: (coin.color ?? "#22c55e") + "20", color: coin.color ?? "#22c55e" }}>
                    {coin.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{coin.name}</div>
                    <div className="text-xs text-[--text-muted]">{algo?.name ?? "PoW"}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-mono font-bold">${coin.price.toFixed(2)}</span>
                  <span className={`text-xs ${(coin.priceChange24h ?? 0) >= 0 ? "text-[--accent-green]" : "text-[--accent-red]"}`}>
                    {(coin.priceChange24h ?? 0) >= 0 ? "+" : ""}{coin.priceChange24h?.toFixed(1)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div className="bg-[--bg-card] border border-[--border-color] rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-2">🖥️ GPU 数据库</h3>
          <p className="text-sm text-[--text-secondary] mb-4">
            涵盖 NVIDIA RTX 30/40/50 系列和 AMD Radeon 显卡，7 种挖矿算法的实测算力数据。
          </p>
          <Link href="/zh/gpus" className="text-sm text-[--accent-green] hover:underline">浏览显卡 →</Link>
        </div>
        <div className="bg-[--bg-card] border border-[--border-color] rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-2">🧮 收益计算器</h3>
          <p className="text-sm text-[--text-secondary] mb-4">
            选择显卡、算法、功耗墙、电费，实时计算每日/每月/每年净收益和回本周期。
          </p>
          <Link href="/zh/calculator" className="text-sm text-[--accent-green] hover:underline">计算收益 →</Link>
        </div>
        <div className="bg-[--bg-card] border border-[--border-color] rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-2">📚 新手教程</h3>
          <p className="text-sm text-[--text-secondary] mb-4">
            从零开始的挖矿指南：如何选显卡、装矿机、优化功耗、计算收益。
          </p>
          <Link href="/zh/tutorials" className="text-sm text-[--accent-green] hover:underline">查看教程 →</Link>
        </div>
      </div>

      {/* Site footer text */}
      <div className="text-center text-xs text-[--text-muted] py-6 border-t border-[--border-color]">
        <p>数据仅供参考，实际算力和收益可能因硬件配置、驱动程序、温度环境等因素而异。</p>
        <p className="mt-1">© 2026 GPUBench.online — 显卡算力数据库</p>
      </div>
    </div>
  );
}
