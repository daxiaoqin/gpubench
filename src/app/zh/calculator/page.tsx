"use client";

import { useState, useMemo, useEffect } from "react";
import { gpus, algorithms, coins as staticCoins, formatHashrate, calcDailyRevenueWithLiveNetwork } from "@/lib/data";
import { useLiveCoinData, getCoinPrice, useNetworkData } from "@/lib/hooks/useLiveData";

const algoToCoinId: Record<string, string> = {
  pearlhash: "pearl",
  blake3: "alephium",
  kawpow: "ravencoin",
  kheavyhash: "kaspa",
  etchash: "ethereum-classic",
  octopus: "conflux",
  nexapow: "nexa",
};

export default function ZhCalculatorPage() {
  const { data: liveCoins } = useLiveCoinData();
  const { data: networkData } = useNetworkData();
  const [selectedGpuId, setSelectedGpuId] = useState("rtx-5080");
  const [selectedAlgoId, setSelectedAlgoId] = useState("pearlhash");
  const [powerLimit, setPowerLimit] = useState(260);
  const [electricityCost, setElectricityCost] = useState(0.08);
  const [gpuCount, setGpuCount] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const coinParam = params.get("coin");
    if (coinParam) {
      const matched = algorithms.find((a) => a.symbol.toLowerCase() === coinParam.toLowerCase());
      if (matched) setSelectedAlgoId(matched.id);
    }
  }, []);

  const selectedGpu = gpus.find((g) => g.id === selectedGpuId);
  const algo = algorithms.find((a) => a.id === selectedAlgoId);
  const coinId = algoToCoinId[selectedAlgoId];

  // Live price
  const liveCoin = getCoinPrice(liveCoins, coinId);
  const coinPrice = liveCoin?.price ?? staticCoins.find((c) => c.id === coinId)?.price ?? 0;

  useEffect(() => {
    if (selectedGpu) setPowerLimit(selectedGpu.tdp);
  }, [selectedGpuId]);

  const result = useMemo(() => {
    if (!selectedGpu || !algo) return null;
    const networkInfo = networkData?.[selectedAlgoId];
    const networkHashrate = networkInfo?.networkHashrate ?? 0;
    const dailyReward = networkInfo?.dailyReward ?? 0;

    return calcDailyRevenueWithLiveNetwork(
      selectedGpu, selectedAlgoId, powerLimit, electricityCost,
      coinPrice, networkHashrate, dailyReward
    );
  }, [selectedGpu, selectedAlgoId, powerLimit, electricityCost, coinPrice, networkData]);

  const monthlyNet = result ? result.netProfit * 30 * gpuCount : 0;
  const yearlyNet = result ? result.netProfit * 365 * gpuCount : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">挖矿收益计算器</h1>
        <p className="text-[--text-secondary] mt-1">
          {networkData ? "实时网络算力和币价" : "估算"}任意显卡和算法组合的每日挖矿收益。
          {liveCoin && networkData && <span className="text-[--accent-green]"> ● 实时</span>}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-[--bg-card] border border-[--border-color] rounded-xl p-5 space-y-5">
            <h2 className="font-semibold text-lg">参数设置</h2>

            <div>
              <label className="block text-sm text-[--text-muted] mb-1.5">显卡</label>
              <select value={selectedGpuId} onChange={(e) => setSelectedGpuId(e.target.value)} className="w-full">
                <optgroup label="NVIDIA RTX 50 系列">
                  {gpus.filter(g => g.manufacturer === "NVIDIA" && g.releaseYear >= 2026).map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </optgroup>
                <optgroup label="NVIDIA RTX 40 系列">
                  {gpus.filter(g => g.manufacturer === "NVIDIA" && g.releaseYear >= 2022 && g.releaseYear < 2026).map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </optgroup>
                <optgroup label="NVIDIA RTX 30 系列">
                  {gpus.filter(g => g.manufacturer === "NVIDIA" && g.releaseYear < 2022).map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </optgroup>
                <optgroup label="AMD Radeon">
                  {gpus.filter(g => g.manufacturer === "AMD").map((g) => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[--text-muted] mb-1.5">算法</label>
              <select value={selectedAlgoId} onChange={(e) => setSelectedAlgoId(e.target.value)} className="w-full">
                {algorithms.map((a) => (
                  <option key={a.id} value={a.id}>{a.name} ({a.symbol})</option>
                ))}
              </select>
            </div>

            {liveCoin && (
              <div className="bg-[--bg-secondary] rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[--text-muted]">{algo?.symbol} 实时价格</span>
                  <span className="font-mono font-semibold text-[--accent-green]">
                    ${liveCoin.price < 0.01 ? liveCoin.price.toFixed(6) : liveCoin.price.toFixed(4)}
                    <span className={`ml-1 text-xs ${(liveCoin.priceChange24h ?? 0) >= 0 ? "text-[--accent-green]" : "text-[--accent-red]"}`}>
                      {(liveCoin.priceChange24h ?? 0) >= 0 ? "+" : ""}{liveCoin.priceChange24h?.toFixed(1)}%
                    </span>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[--text-muted]">网络数据</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    networkData?.[selectedAlgoId]?.source === "Live API"
                      ? "bg-[--accent-green]/10 text-[--accent-green]"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}>
                    {networkData?.[selectedAlgoId]?.source === "Live API" ? "● 实时" : "○ 估算"}
                  </span>
                </div>
              </div>
            )}

            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <label className="text-[--text-muted]">功耗墙</label>
                <span className="font-mono font-medium">{powerLimit}W</span>
              </div>
              {selectedGpu && (
                <input
                  type="range"
                  min={Math.round(selectedGpu.tdp * 0.5)}
                  max={selectedGpu.tdp}
                  step={5}
                  value={powerLimit}
                  onChange={(e) => setPowerLimit(Number(e.target.value))}
                  className="w-full"
                />
              )}
              <div className="flex justify-between text-xs text-[--text-muted]">
                <span>{selectedGpu ? Math.round(selectedGpu.tdp * 0.5) : 0}W</span>
                <span>{selectedGpu?.tdp ?? 0}W</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[--text-muted] mb-1.5">电费</label>
              <div className="flex items-center gap-2">
                <span className="text-[--text-muted]">$</span>
                <input type="number" value={electricityCost} onChange={(e) => setElectricityCost(Math.max(0, Number(e.target.value)))} step="0.005" min="0" max="1" className="w-full" />
                <span className="text-[--text-muted] text-sm">/ kWh</span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[--text-muted] mb-1.5">显卡数量</label>
              <input type="number" value={gpuCount} onChange={(e) => setGpuCount(Math.max(1, Math.min(100, Number(e.target.value))))} min="1" max="100" className="w-full" />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {result && selectedGpu && algo && (
            <>
              <div className="bg-[--bg-card] border border-[--border-color] rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold">{selectedGpu.name}</h2>
                    <p className="text-[--text-secondary] text-sm">
                      {algo.name} · {gpuCount} 张卡 · 功耗 {powerLimit}W
                      {liveCoin && networkData && <span className="text-[--accent-green] ml-2">● 实时</span>}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-[--text-muted]">总算力</div>
                    <div className="text-lg font-bold text-[--accent-green] font-mono">
                      {formatHashrate(selectedGpu.hashrates[selectedAlgoId] ?? 0, algo.unit)}
                      {gpuCount > 1 && <span className="text-sm text-[--text-muted]"> (×{gpuCount})</span>}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-[--bg-secondary] rounded-lg p-4">
                    <div className="text-xs text-[--text-muted] mb-1">每日总收入</div>
                    <div className="text-lg font-bold font-mono">${(result.grossRevenue * gpuCount).toFixed(4)}</div>
                  </div>
                  <div className="bg-[--bg-secondary] rounded-lg p-4">
                    <div className="text-xs text-[--text-muted] mb-1">每日电费</div>
                    <div className="text-lg font-bold font-mono text-[--accent-red]">-${(result.powerCost * gpuCount).toFixed(4)}</div>
                  </div>
                  <div className="bg-[--bg-secondary] rounded-lg p-4">
                    <div className="text-xs text-[--text-muted] mb-1">每日净收益</div>
                    <div className={`text-lg font-bold font-mono ${result.netProfit > 0 ? "text-[--accent-green]" : "text-[--accent-red]"}`}>
                      ${(result.netProfit * gpuCount).toFixed(4)}
                    </div>
                  </div>
                  <div className="bg-[--bg-secondary] rounded-lg p-4">
                    <div className="text-xs text-[--text-muted] mb-1">能效比</div>
                    <div className="text-lg font-bold font-mono text-[--accent-blue]">{result.efficiency.toFixed(0)}</div>
                    <div className="text-xs text-[--text-muted]">H/W</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-[--text-muted]">月净收益</span>
                    <div className={`font-mono font-semibold ${monthlyNet > 0 ? "text-[--accent-green]" : "text-[--accent-red]"}`}>
                      ${monthlyNet.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <span className="text-[--text-muted]">年净收益</span>
                    <div className={`font-mono font-semibold ${yearlyNet > 0 ? "text-[--accent-green]" : "text-[--accent-red]"}`}>
                      ${yearlyNet.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <span className="text-[--text-muted]">日耗电</span>
                    <div className="font-mono font-semibold">{(powerLimit / 1000 * 24 * gpuCount).toFixed(1)} kWh</div>
                  </div>
                  <div>
                    <span className="text-[--text-muted]">保本价格</span>
                    <div className="font-mono font-semibold">
                      ${coinPrice > 0 && result.grossRevenue > 0 ? (result.powerCost / result.grossRevenue * coinPrice).toFixed(4) : "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              {/* ROI */}
              <div className="bg-[--bg-card] border border-[--border-color] rounded-xl p-5">
                <h3 className="font-semibold mb-3">回本周期估算</h3>
                {result.netProfit > 0 ? (
                  <div className="text-sm text-[--text-secondary]">
                    <p>
                      基于显卡价格 <strong className="text-[--text-primary]">${selectedGpu.price.toLocaleString()}</strong>，
                      每日净收益 <strong className="text-[--text-primary]">${(result.netProfit * gpuCount).toFixed(4)}</strong>：
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex-1 bg-[--bg-secondary] rounded-full h-3 overflow-hidden">
                        <div className="h-full bg-[--accent-green] rounded-full transition-all"
                          style={{ width: `${Math.min(100, (selectedGpu.price / (result.netProfit * gpuCount * 365 * 3)) * 100)}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold whitespace-nowrap">
                        {result.netProfit * gpuCount > 0
                          ? `${(selectedGpu.price / (result.netProfit * gpuCount * 365)).toFixed(1)} 年`
                          : "∞"}
                      </span>
                    </div>
                    <p className="text-xs text-[--text-muted] mt-2">
                      * 仅供参考，未考虑难度变化、币价波动和矿池幸运值。
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-[--accent-red]">当前配置在当前电费和币价下无法盈利。</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
