"use client";

import Link from "next/link";

const miners = [
  {
    id: "peakminer",
    name: "PeakMiner",
    version: "v1.0.13",
    logo: "P",
    color: "#22c55e",
    description: "All-in-one mining software with built-in power limiting, temperature control, and auto-restart. Best for NVIDIA RTX 40/50 series.",
    algorithms: ["PearlHash", "kHeavyHash", "Blake3", "KawPow", "Etchash", "Octopus", "NexaPow"],
    features: ["Built-in power limit", "Temperature control", "Auto-restart on crash", "GPU fan control", "Watchdog timer", "CLI & config file"],
    pros: ["Excellent efficiency on Blackwell", "All-in-one solution", "Low rejected shares", "Active development", "Free to use"],
    cons: ["Windows Defender false positive", "No dual mining", "Relatively new"],
    rating: 4.5,
    hashrateRef: "RTX 5080: 180 TH/s (PearlHash)",
    efficiency: "Excellent",
    installGuide: "Download, extract, edit .bat file with your wallet and pool URL, run.",
  },
  {
    id: "wildrig",
    name: "WildRig",
    version: "v0.35.3",
    logo: "W",
    color: "#f59e0b",
    description: "Popular open-source miner supporting many algorithms. Good compatibility across GPU generations.",
    algorithms: ["PearlHash", "kHeavyHash", "Blake3", "KawPow", "Etchash", "Octopus"],
    features: ["Open source", "Wide algorithm support", "Configurable intensity", "Watchdog", "API monitoring"],
    pros: ["Very stable on older GPUs", "Good community support", "Open source (auditable)", "Regular updates"],
    cons: ["Slightly lower efficiency on RTX 50 series", "CLI only", "No built-in power limit"],
    rating: 4.0,
    hashrateRef: "RTX 5060 Ti: 92 TH/s (PearlHash)",
    efficiency: "Good",
    installGuide: "Download, configure .json file with pool and wallet, run wildrig.exe.",
  },
  {
    id: "srbminer",
    name: "SRBMiner",
    version: "v2.6.8",
    logo: "S",
    color: "#8b5cf6",
    description: "Feature-rich miner with excellent tuning options. Supports AMD & NVIDIA GPUs.",
    algorithms: ["PearlHash", "kHeavyHash", "Blake3", "KawPow", "Etchash"],
    features: ["Advanced tuning", "Dual mining support", "Auto-tuning", "Web dashboard", "Telegram notifications"],
    pros: ["Great tuning options", "Multi-algorithm", "Good AMD support", "Web monitoring"],
    cons: ["More complex setup", "Higher devfee on some algos", "Not all algorithms supported"],
    rating: 4.2,
    hashrateRef: "RTX 5080: 195 TH/s (PearlHash)",
    efficiency: "Very Good",
    installGuide: "Download, edit config file with pool details, launch SRBMiner-MULTI.exe.",
  },
  {
    id: "lpminer",
    name: "lpminer",
    version: "v2.1.0",
    logo: "L",
    color: "#3b82f6",
    description: "LuckyPool's official mining client. Optimized for PearlHash and connected pools.",
    algorithms: ["PearlHash"],
    features: ["Pool-optimized", "Simple setup", "Low latency", "Auto-update"],
    pros: ["Optimized for LuckyPool", "Very easy setup", "Low devfee on LuckyPool", "Auto-payment"],
    cons: ["PearlHash only", "Less efficient on some GPUs", "No standalone features"],
    rating: 3.5,
    hashrateRef: "RTX 5080: 192 TH/s (PearlHash)",
    efficiency: "Good",
    installGuide: "Download from lucky-pool.org, extract, run with pool parameters.",
  },
  {
    id: "gminer",
    name: "Gminer",
    version: "v3.4.0",
    logo: "G",
    color: "#ef4444",
    description: "Reliable multi-algorithm miner with a long track record. Supports NVIDIA and AMD.",
    algorithms: ["KawPow", "Etchash", "Octopus", "kHeavyHash", "Blake3"],
    features: ["Watchdog", "API", "Autoupdate", "Intensity control", "Temperature limit"],
    pros: ["Proven stability", "Wide algo support", "Good docs", "API monitoring"],
    cons: ["Not updated for PearlHash", "Higher devfee (2%)", "No built-in PL"],
    rating: 3.8,
    hashrateRef: "RTX 3080: 90 MH/s (KawPow)",
    efficiency: "Good",
    installGuide: "Download, create .bat file with pool and wallet, run miner.exe.",
  },
];

export default function MinersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Mining Software Comparison</h1>
        <p className="text-[--text-secondary] mt-1">
          Comprehensive comparison of popular GPU mining software. Benchmarks, features, and setup guides.
        </p>
      </div>

      {/* Featured comparison table */}
      <div className="bg-[--bg-card] border border-[--border-color] rounded-xl overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[--bg-secondary] border-b border-[--border-color]">
                <th className="text-left py-3 px-4 font-medium">Software</th>
                <th className="text-left py-3 px-4 font-medium">Rating</th>
                <th className="text-left py-3 px-4 font-medium">Efficiency</th>
                <th className="text-left py-3 px-4 font-medium">Algorithms</th>
                <th className="text-left py-3 px-4 font-medium">Key Feature</th>
                <th className="text-left py-3 px-4 font-medium">Best For</th>
              </tr>
            </thead>
            <tbody>
              {miners.map((m) => (
                <tr key={m.id} className="border-b border-[--border-color] hover:bg-[--bg-card-hover] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
                        style={{ backgroundColor: m.color + "20", color: m.color }}
                      >
                        {m.logo}
                      </div>
                      <div>
                        <div className="font-medium">{m.name}</div>
                        <div className="text-xs text-[--text-muted]">{m.version}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{m.rating}</span>
                      <span className="text-[--text-muted]">/ 5</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      m.efficiency === "Excellent" ? "bg-[--accent-green]/10 text-[--accent-green]" :
                      m.efficiency === "Very Good" ? "bg-[--accent-blue]/10 text-[--accent-blue]" :
                      "bg-[--accent-orange]/10 text-[--accent-orange]"
                    }`}>
                      {m.efficiency}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {m.algorithms.slice(0, 3).map((a) => (
                        <span key={a} className="text-xs px-2 py-0.5 rounded bg-[--bg-secondary]">{a}</span>
                      ))}
                      {m.algorithms.length > 3 && (
                        <span className="text-xs text-[--text-muted]">+{m.algorithms.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[--text-secondary]">{m.features[0]}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs">{m.id === "peakminer" ? "RTX 40/50 series" : m.id === "wildrig" ? "Older GPUs" : m.id === "srbminer" ? "Tuning enthusiasts" : m.id === "lpminer" ? "PearlHash only" : "KawPow/Etchash"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {miners.map((m) => (
          <div key={m.id} className="bg-[--bg-card] border border-[--border-color] rounded-xl p-5">
            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0"
                style={{ backgroundColor: m.color + "20", color: m.color }}
              >
                {m.logo}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{m.name}</h3>
                  <span className="text-xs text-[--text-muted] bg-[--bg-secondary] px-2 py-0.5 rounded">{m.version}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: m.color + "20", color: m.color }}>
                    ★ {m.rating}
                  </span>
                </div>
                <p className="text-sm text-[--text-secondary] mt-1">{m.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <h4 className="text-[--text-muted] mb-1.5">✅ Pros</h4>
                <ul className="space-y-1">
                  {m.pros.map((p) => (
                    <li key={p} className="flex items-start gap-1.5">
                      <span className="text-[--accent-green] shrink-0">+</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[--text-muted] mb-1.5">⚠️ Cons</h4>
                <ul className="space-y-1">
                  {m.cons.map((c) => (
                    <li key={c} className="flex items-start gap-1.5">
                      <span className="text-[--accent-red] shrink-0">-</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm border-t border-[--border-color] pt-4 mt-2">
              <div>
                <span className="text-[--text-muted]">Reference: </span>
                <span className="font-mono">{m.hashrateRef}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded bg-[--bg-secondary]">⚡ {m.efficiency}</span>
                <span className="text-xs px-2 py-1 rounded bg-[--bg-secondary]">🔧 {m.installGuide.substring(0, 40)}...</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
