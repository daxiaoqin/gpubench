"use client";

import { useState, useRef, useEffect } from "react";
import { runBenchmark, runWebGLBenchmark, detectGPUs, ALGORITHM_RATIOS, type BenchmarkResult, type GPUDeviceInfo } from "@/lib/gpuBench";
import { submitBenchmark } from "@/lib/supabase";

// Static coin prices (fallback)
const COIN_PRICES: Record<string, number> = {
  pearlhash: 0.40,
  blake3: 0.0414,
  kawpow: 0.0039,
  kheavyhash: 0.031,
  etchash: 7.25,
  octopus: 0.0455,
  nexapow: 0.00000040,
};

type Phase = "idle" | "detecting" | "running" | "done" | "error" | "submitting" | "submitted";

export default function BenchmarkPage() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<BenchmarkResult | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [submitError, setSubmitError] = useState("");
  const [submittedId, setSubmittedId] = useState<number | null>(null);
  const [availableGPUs, setAvailableGPUs] = useState<GPUDeviceInfo[]>([]);
  const [selectedGPUIndex, setSelectedGPUIndex] = useState<number>(0);
  const [gpuDetectionDone, setGpuDetectionDone] = useState(false);
  const timerRef = useRef<number>(0);
  const startTimeRef = useRef(0);

  useEffect(() => {
    // Detect available GPUs on mount
    detectGPUs().then((gpus) => {
      if (gpus.length > 0) {
        setAvailableGPUs(gpus);
        setSelectedGPUIndex(gpus[0].index);
      }
      setGpuDetectionDone(true);
    });
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function startBench() {
    setPhase("detecting");
    setResult(null);
    setErrorMsg("");
    setElapsed(0);

    // Check WebGPU support
    if (typeof navigator !== "undefined" && !navigator.gpu) {
      setPhase("running");
      startTimeRef.current = performance.now();
      timerRef.current = window.setInterval(() => {
        setElapsed((performance.now() - startTimeRef.current) / 1000);
      }, 100);

      runWebGLBenchmark().then((res) => {
        clearInterval(timerRef.current);
        setElapsed((performance.now() - startTimeRef.current) / 1000);
        if (res.error) {
          setPhase("error");
          setErrorMsg(res.error);
        } else {
          setPhase("done");
          setResult(res);
        }
      });
      return;
    }

    // WebGPU path — use selected GPU
    setPhase("running");
    startTimeRef.current = performance.now();
    timerRef.current = window.setInterval(() => {
      setElapsed((performance.now() - startTimeRef.current) / 1000);
    }, 100);

    runBenchmark(
      (_time, _ops) => {
        // progress callback
      },
      undefined,
      selectedGPUIndex
    ).then((res) => {
      clearInterval(timerRef.current);
      setElapsed((performance.now() - startTimeRef.current) / 1000);
      if (res.error) {
        setPhase("error");
        setErrorMsg(res.error);
      } else {
        setPhase("done");
        setResult(res);
      }
    });
  }

  function formatValue(value: number, baseUnit: string): string {
    if (baseUnit === "TH/s") {
      if (value >= 1000) return (value / 1000).toFixed(2);
      return value.toFixed(1);
    }
    if (baseUnit === "GH/s") {
      if (value >= 1000) return (value / 1000).toFixed(2);
      return value.toFixed(2);
    }
    if (baseUnit === "MH/s") {
      if (value >= 1000) return (value / 1000).toFixed(2);
      return Math.round(value).toString();
    }
    return value.toFixed(2);
  }

  function formatUnit(value: number, baseUnit: string): string {
    if (baseUnit === "TH/s" && value >= 1000) return "PH/s";
    if (baseUnit === "GH/s" && value >= 1000) return "TH/s";
    if (baseUnit === "MH/s" && value >= 1000) return "GH/s";
    return baseUnit;
  }

  /** Submit result to leaderboard via Supabase */
  async function submitToLeaderboard() {
    if (!result || result.error) return;
    setPhase("submitting");
    setSubmitError("");
    try {
      const record = await submitBenchmark({
        gpuName: result.gpuName,
        rawScore: result.rawScore,
        estimatedPearlHash: result.estimatedPearlHash,
        confidence: result.confidence,
        supported: result.supported,
        gpuVendor: "",
      });
      setSubmittedId(record.id);
      setPhase("submitted");
    } catch (err: any) {
      setSubmitError(err.message);
      setPhase("done");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 text-[--text-primary]">
          ⚡ GPU Mining Benchmark
        </h1>
        <p className="text-lg text-[--text-muted] max-w-2xl mx-auto">
          Run a real GPU compute benchmark in your browser. Measure your graphics card&apos;s mining
          performance across all major algorithms — no install, no download, no ads.
        </p>
      </div>

      {/* WebGPU Status */}
      <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-[--text-primary]">WebGPU Status</span>
          <span
            className={`text-sm px-3 py-1 rounded-full font-medium ${
              typeof navigator !== "undefined" && navigator.gpu
                ? "bg-green-500/20 text-green-400"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {typeof navigator !== "undefined" && navigator.gpu
              ? "✅ Available"
              : "⚠️ Fallback to WebGL2"}
          </span>
        </div>
        <p className="text-xs text-[--text-muted]">
          {typeof navigator !== "undefined" && navigator.gpu
            ? "Using WebGPU compute shaders for accurate GPU measurement."
            : "WebGPU not detected. Falling back to WebGL2 rendering benchmark (less accurate)."}
        </p>
      </div>

      {/* GPU Selection (when multiple GPUs detected) */}
      {gpuDetectionDone && availableGPUs.length > 1 && phase === "idle" && (
        <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-[--text-primary]">🎮 Select GPU</span>
            <span className="text-xs text-[--text-muted]">{availableGPUs.length} GPU(s) detected</span>
          </div>
          <div className="space-y-2">
            {availableGPUs.map((gpu) => (
              <label
                key={gpu.index}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedGPUIndex === gpu.index
                    ? "border-[--accent-green] bg-[--accent-green]/5"
                    : "border-[--border-color] hover:border-[--text-muted]"
                }`}
              >
                <input
                  type="radio"
                  name="gpu-select"
                  checked={selectedGPUIndex === gpu.index}
                  onChange={() => setSelectedGPUIndex(gpu.index)}
                  className="accent-[--accent-green]"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-[--text-primary]">{gpu.label}</div>
                  <div className="text-xs text-[--text-muted]">
                    {gpu.type === "webgpu" ? "WebGPU" : "WebGL2"}
                    {gpu.vendor ? ` · ${gpu.vendor}` : ""}
                  </div>
                </div>
              </label>
            ))}
          </div>
          <p className="text-xs text-[--text-muted] mt-3">
            Select which GPU to benchmark. The benchmark will run exclusively on your chosen graphics card.
          </p>
        </div>
      )}

      {/* Start Button */}
      {(phase === "idle" || phase === "detecting") && (
        <div className="text-center mb-8">
          <button
            onClick={startBench}
            disabled={phase === "detecting"}
            className="px-10 py-4 text-lg font-bold rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {phase === "detecting" ? "🔍 Detecting GPU..." : "🚀 Start Benchmark"}
          </button>
          <p className="text-xs text-[--text-muted] mt-3">
            Takes ~10-15 seconds. Your GPU will run compute shaders at full speed.
          </p>
        </div>
      )}

      {/* Running */}
      {phase === "running" && (
        <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl p-8 mb-8 text-center">
          <div className="text-4xl mb-4 animate-pulse">⚙️</div>
          <h3 className="text-xl font-bold text-[--text-primary] mb-2">Benchmarking Your GPU...</h3>
          <p className="text-[--text-muted] mb-6">
            Running compute shader workload. Your GPU is working at full load — this is normal.
          </p>
          <div className="w-full bg-gray-700/50 rounded-full h-4 mb-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (elapsed / 15) * 100)}%` }}
            />
          </div>
          <div className="flex justify-center gap-8 text-sm">
            <div>
              <span className="text-[--text-muted]">Elapsed</span>
              <p className="text-[--text-primary] font-mono text-lg">{elapsed.toFixed(1)}s</p>
            </div>
            <div>
              <span className="text-[--text-muted]">Progress</span>
              <p className="text-[--text-primary] font-mono text-lg">
                {Math.min(100, Math.round((elapsed / 15) * 100))}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error */}
      {phase === "error" && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-bold text-red-400 mb-2">⚠️ Benchmark Failed</h3>
          <p className="text-[--text-muted]">{errorMsg}</p>
          <button
            onClick={startBench}
            className="mt-4 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {/* Results — visible in both done and submitted states */}
      {(phase === "done" || phase === "submitted") && result && (
        <>
          {/* Summary Card */}
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <span className="text-xs text-[--text-muted] uppercase tracking-wider">GPU Detected</span>
                <p className="text-lg font-bold text-[--text-primary] mt-1">{result.gpuName}</p>
              </div>
              <div>
                <span className="text-xs text-[--text-muted] uppercase tracking-wider">Raw Score</span>
                <p className="text-lg font-bold text-[--text-primary] mt-1 font-mono">
                  {(result.rawScore / 1000000).toFixed(2)}M ops/s
                </p>
              </div>
              <div>
                <span className="text-xs text-[--text-muted] uppercase tracking-wider">Est. PearlHash</span>
                <p className="text-lg font-bold text-purple-400 mt-1">{result.estimatedPearlHash} TH/s</p>
              </div>
              <div>
                <span className="text-xs text-[--text-muted] uppercase tracking-wider">Confidence</span>
                <p className="text-lg font-bold mt-1"
                   style={{ color: result.confidence > 0.7 ? "#22c55e" : result.confidence > 0.4 ? "#eab308" : "#ef4444" }}>
                  {Math.round(result.confidence * 100)}%
                </p>
              </div>
            </div>
          </div>

          {/* Algorithm Table */}
          <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl overflow-hidden mb-8">
            <div className="px-6 py-4 border-b border-[--border-color]">
              <h2 className="text-xl font-bold text-[--text-primary]">
                Estimated Hashrates — All Algorithms
              </h2>
              <p className="text-xs text-[--text-muted] mt-1">
                Based on benchmark score matched against our GPU database.
                Real-world results may vary by ±15%.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[--border-color] text-xs text-[--text-muted] uppercase">
                    <th className="text-left px-6 py-3 font-medium">Algorithm</th>
                    <th className="text-right px-6 py-3 font-medium">Coin</th>
                    <th className="text-right px-6 py-3 font-medium">Est. Hashrate</th>
                    <th className="text-right px-6 py-3 font-medium">Price (USD)</th>
                    <th className="text-right px-6 py-3 font-medium">Daily Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {ALGORITHM_RATIOS.map((algo) => {
                    const estHashrateFull = result.estimatedPearlHash * algo.ratio;
                    const unit = formatUnit(estHashrateFull, algo.unit);
                    const val = formatValue(estHashrateFull, algo.unit);
                    const price = COIN_PRICES[algo.id] || 0;

                    // Estimate daily revenue
                    let dailyRevenue = 0;
                    if (algo.id === "pearlhash") {
                      const prlPerDay = (result.estimatedPearlHash / 2160000) * 72000;
                      dailyRevenue = prlPerDay * price;
                    } else {
                      const prlEquivalent = result.estimatedPearlHash;
                      const prlPerDay = (prlEquivalent / 2160000) * 72000;
                      dailyRevenue = prlPerDay * price * (algo.ratio * 10);
                    }

                    return (
                      <tr key={algo.id} className="border-b border-[--border-color]/50 hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: algo.color }} />
                            <span className="font-medium text-[--text-primary]">{algo.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-[--text-primary]">{algo.symbol}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-mono font-bold text-[--text-primary]">{val}</span>
                          <span className="text-xs text-[--text-muted] ml-1">{unit}</span>
                        </td>
                        <td className="px-6 py-4 text-right font-mono text-[--text-muted]">
                          ${price.toFixed(price < 0.01 ? 8 : price < 1 ? 4 : 2)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`font-mono font-bold ${
                            dailyRevenue > 0.5 ? "text-green-400" : dailyRevenue > 0.1 ? "text-yellow-400" : "text-[--text-muted]"
                          }`}>
                            ${dailyRevenue.toFixed(2)}
                          </span>
                          <span className="text-xs text-[--text-muted] ml-1">/day</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-8">
            <p className="text-xs text-yellow-300/80">
              <strong>⚠️ Important:</strong> This benchmark runs a compute shader workload that correlates with
              mining performance. Results are estimates based on our GPU database. Actual mining hashrates may
              vary due to driver versions, thermal conditions, power limits, and algorithm optimizations.
              The benchmark runs your GPU at full load — ensure adequate cooling.
            </p>
          </div>
        </>
      )}

      {/* Submit to Leaderboard — outside results phase check to allow separate state */}
      {(phase === "done" || phase === "submitting" || phase === "submitted") && result && (
        <>
          {phase !== "submitted" ? (
            <div className="text-center mb-6">
              <button
                onClick={submitToLeaderboard}
                disabled={phase === "submitting"}
                className="px-8 py-3 font-semibold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {phase === "submitting" ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                    Submitting...
                  </span>
                ) : (
                  "🏆 Submit to Leaderboard"
                )}
              </button>
              {submitError && (
                <p className="text-xs text-red-400 mt-2">Submit failed: {submitError}</p>
              )}
              <p className="text-xs text-[--text-muted] mt-2">
                Your GPU model and hashrate will be added to our global leaderboard (anonymous).
              </p>
            </div>
          ) : (
            <div className="text-center mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <p className="text-emerald-400 font-bold text-lg mb-2">✅ Submitted to Leaderboard!</p>
              <p className="text-sm text-[--text-muted] mb-3">
                Your #{submittedId} result is now live.
              </p>
              <a
                href="/leaderboard"
                className="inline-block px-6 py-2 font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                🏆 View Leaderboard
              </a>
            </div>
          )}

          {/* Restart */}
          <div className="text-center">
            <button
              onClick={startBench}
              className="px-8 py-3 font-semibold rounded-xl bg-[--bg-secondary] border border-[--border-color] hover:bg-[--border-color] text-[--text-primary] transition-colors"
            >
              🔄 Run Again
            </button>
          </div>
        </>
      )}

      {/* How it works */}
      <div className="mt-16 mb-8">
        <h2 className="text-2xl font-bold text-[--text-primary] mb-6 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">1️⃣</div>
            <h3 className="font-bold text-[--text-primary] mb-2">WebGPU Compute</h3>
            <p className="text-sm text-[--text-muted]">
              Runs real SHA-256 style hash computations directly on your GPU via WebGPU compute shaders —
              the same type of work used in proof-of-work mining.
            </p>
          </div>
          <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">2️⃣</div>
            <h3 className="font-bold text-[--text-primary] mb-2">Smart Matching</h3>
            <p className="text-sm text-[--text-muted]">
              Your raw benchmark score is matched against our database of 50+ GPUs to identify your card
              and estimate real-world hashrates.
            </p>
          </div>
          <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl p-6 text-center">
            <div className="text-3xl mb-3">3️⃣</div>
            <h3 className="font-bold text-[--text-primary] mb-2">Instant Results</h3>
            <p className="text-sm text-[--text-muted]">
              See estimated hashrates for 7 algorithms (PearlHash, Blake3, KawPow, Etchash, and more)
              with daily profitability estimates — all within seconds, no install needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
