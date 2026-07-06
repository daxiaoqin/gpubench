"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, getLeaderboard, getStats, type BenchmarkRow } from "@/lib/supabase";

interface Stats {
  totalSubmissions: number;
  uniqueGpus: number;
  avgPearlHash: number;
  topPearlHash: number;
}

export default function LeaderboardPage() {
  const [data, setData] = useState<BenchmarkRow[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchData = useCallback(async () => {
    try {
      const [lbData, lbStats] = await Promise.all([
        getLeaderboard(100),
        getStats(),
      ]);
      setData(lbData);
      setStats(lbStats);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch + auto-poll every 15 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  function formatHashrate(th: number): string {
    if (th >= 1000) return `${(th / 1000).toFixed(2)} PH/s`;
    if (th >= 1) return `${th.toFixed(1)} TH/s`;
    return `${(th * 1000).toFixed(0)} GH/s`;
  }

  function formatConfidence(c: number): string {
    if (c >= 0.8) return "🟢 High";
    if (c >= 0.5) return "🟡 Medium";
    return "🔴 Low";
  }

  function getMedal(index: number): string {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `${index + 1}`;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3 text-[--text-primary]">
          🏆 GPU Benchmark Leaderboard
        </h1>
        <p className="text-lg text-[--text-muted] max-w-2xl mx-auto">
          Real GPU mining hashrate results submitted by the community.
          Run the benchmark to add yours!
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <a
            href="/benchmark"
            className="px-6 py-2 font-semibold rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg transition-all"
          >
            🚀 Run Benchmark
          </a>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-[--text-primary]">{stats.totalSubmissions}</div>
            <div className="text-xs text-[--text-muted] uppercase tracking-wider mt-1">Submissions</div>
          </div>
          <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-[--text-primary]">{stats.uniqueGpus}</div>
            <div className="text-xs text-[--text-muted] uppercase tracking-wider mt-1">Unique GPUs</div>
          </div>
          <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">{formatHashrate(stats.avgPearlHash)}</div>
            <div className="text-xs text-[--text-muted] uppercase tracking-wider mt-1">Avg PearlHash</div>
          </div>
          <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-emerald-400">{formatHashrate(stats.topPearlHash)}</div>
            <div className="text-xs text-[--text-muted] uppercase tracking-wider mt-1">Top Score</div>
          </div>
        </div>
      )}

      {/* Auto-refresh indicator */}
      <div className="flex items-center justify-end mb-4 gap-2 text-xs text-[--text-muted]">
        {loading ? (
          <span className="flex items-center gap-1">
            <span className="animate-spin inline-block w-3 h-3 border-2 border-gray-500 border-t-white rounded-full" />
            Loading...
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Auto-refreshing every 15s · Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
        <button
          onClick={() => { setLoading(true); fetchData(); }}
          className="px-3 py-1 rounded-lg bg-[--bg-secondary] border border-[--border-color] hover:bg-[--border-color] transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Leaderboard Table */}
      {loading && data.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-4 animate-pulse">🏆</div>
          <p className="text-[--text-muted]">Loading leaderboard...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center py-20 bg-[--bg-secondary] border border-[--border-color] rounded-xl">
          <div className="text-5xl mb-4">📊</div>
          <h2 className="text-xl font-bold text-[--text-primary] mb-2">No Results Yet</h2>
          <p className="text-[--text-muted] mb-6">
            Be the first to submit a benchmark result!
          </p>
          <a
            href="/benchmark"
            className="inline-block px-8 py-3 font-bold rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg transition-all"
          >
            🚀 Start Benchmark
          </a>
        </div>
      ) : (
        <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[--border-color] text-xs text-[--text-muted] uppercase tracking-wider">
                  <th className="text-left px-6 py-4 w-12">#</th>
                  <th className="text-left px-6 py-4">GPU</th>
                  <th className="text-right px-6 py-4">PearlHash</th>
                  <th className="text-right px-6 py-4 hidden md:table-cell">Raw Score</th>
                  <th className="text-center px-6 py-4 hidden sm:table-cell">Confidence</th>
                  <th className="text-right px-6 py-4 hidden lg:table-cell">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {data.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className="border-b border-[--border-color]/50 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className={`font-bold text-lg ${
                        index < 3 ? "" : "text-[--text-muted]"
                      }`}>
                        {getMedal(index)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-[--text-primary]">{entry.gpu_name}</div>
                      {entry.gpu_vendor && (
                        <div className="text-xs text-[--text-muted]">{entry.gpu_vendor}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-mono font-bold text-lg ${
                        index === 0 ? "text-emerald-400" :
                        index === 1 ? "text-blue-400" :
                        index === 2 ? "text-purple-400" :
                        "text-[--text-primary]"
                      }`}>
                        {formatHashrate(entry.estimated_pearl_hash)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right hidden md:table-cell">
                      <span className="font-mono text-sm text-[--text-muted]">
                        {(entry.raw_score / 1000000).toFixed(2)}M
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center hidden sm:table-cell">
                      <span className={`text-xs ${
                        entry.confidence >= 0.8 ? "text-green-400" :
                        entry.confidence >= 0.5 ? "text-yellow-400" : "text-red-400"
                      }`}>
                        {formatConfidence(entry.confidence)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right hidden lg:table-cell">
                      <span className="text-xs text-[--text-muted]">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* How it works footer */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl p-5 text-center">
          <div className="text-2xl mb-2">1️⃣</div>
          <h3 className="font-bold text-[--text-primary] mb-1">Run Benchmark</h3>
          <p className="text-xs text-[--text-muted]">
            Run the in-browser GPU benchmark — it takes about 10-15 seconds.
          </p>
        </div>
        <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl p-5 text-center">
          <div className="text-2xl mb-2">2️⃣</div>
          <h3 className="font-bold text-[--text-primary] mb-1">Submit Your Score</h3>
          <p className="text-xs text-[--text-muted]">
            After the test completes, click &quot;Submit to Leaderboard&quot; to share your result.
          </p>
        </div>
        <div className="bg-[--bg-secondary] border border-[--border-color] rounded-xl p-5 text-center">
          <div className="text-2xl mb-2">3️⃣</div>
          <h3 className="font-bold text-[--text-primary] mb-1">Climb the Ranks</h3>
          <p className="text-xs text-[--text-muted]">
            See how your GPU compares against the community. Top scores get featured!
          </p>
        </div>
      </div>
    </div>
  );
}
