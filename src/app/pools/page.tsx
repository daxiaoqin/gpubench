"use client";

import Link from "next/link";

const pools = [
  {
    id: "luckypool",
    name: "LuckyPool",
    url: "https://luckypool.io",
    logo: "L",
    color: "#22c55e",
    type: "Multi-coin",
    algorithms: ["PearlHash", "kHeavyHash", "Blake3", "KawPow", "Etchash"],
    fee: "1%",
    payout: "0.1 PRL (PearlHash)",
    minPayout: "$0.10 equivalent",
    location: ["EU", "US", "Asia"],
    features: ["PPLNS", "Real-time stats", "Telegram bot", "Low latency", "DDoS protection"],
    pros: ["Multiple coin support", "Competitive fees", "Active admin team", "Custom mining client (lpminer)"],
    cons: ["Newer pool (smaller hashrate)", "No built-in exchange"],
    recommended: true,
  },
  {
    id: "pearlhashpool",
    name: "PearlHash Pool",
    url: "https://pearlhashpool.com",
    logo: "P",
    color: "#f59e0b",
    type: "PearlHash",
    algorithms: ["PearlHash"],
    fee: "0.5%",
    payout: "0.05 PRL",
    minPayout: "$0.05 equivalent",
    location: ["EU", "US"],
    features: ["PPLNS", "Block explorer", "API", "Email notifications"],
    pros: ["Lowest fee for PearlHash", "Fast payouts", "Transparent stats", "Good uptime"],
    cons: ["PearlHash only", "Lower total hashrate"],
    recommended: false,
  },
  {
    id: "f2pool",
    name: "F2Pool",
    url: "https://f2pool.com",
    logo: "F",
    color: "#3b82f6",
    type: "Multi-coin",
    algorithms: ["KawPow", "Etchash", "kHeavyHash", "Blake3", "Octopus"],
    fee: "2.5%",
    payout: "Daily",
    minPayout: "Varies by coin",
    location: ["China", "US", "EU"],
    features: ["PPS+", "Very large pool", "Mobile app", "Detailed stats", "Long history"],
    pros: ["Largest pool hashrate", "Proven reliability", "PPS+ payment (stable income)", "Multi-language"],
    cons: ["Higher fees (2.5%)", "KYC for some features", "No PearlHash support"],
    recommended: false,
  },
  {
    id: "poolin",
    name: "Poolin",
    url: "https://poolin.com",
    logo: "P",
    color: "#8b5cf6",
    type: "Multi-coin",
    algorithms: ["KawPow", "Etchash", "kHeavyHash", "Octopus"],
    fee: "2%",
    payout: "Daily",
    minPayout: "Varies by coin",
    location: ["US", "Asia", "EU"],
    features: ["FPPS", "Web wallet", "API", "Pool statistics", "Mobile app"],
    pros: ["FPPS for stable income", "Good reputation", "Multiple payout options", "Global servers"],
    cons: ["Higher fee", "No PearlHash", "Some regions restricted"],
    recommended: false,
  },
  {
    id: "viabtc",
    name: "ViaBTC",
    url: "https://viabtc.com",
    logo: "V",
    color: "#ef4444",
    type: "Multi-coin",
    algorithms: ["KawPow", "Etchash", "kHeavyHash", "Octopus"],
    fee: "2%",
    payout: "Daily",
    minPayout: "Varies by coin",
    location: ["China", "US", "EU"],
    features: ["PPS+", "Exchange service", "Coin swap", "Cloud mining"],
    pros: ["Built-in exchange", "PPS+ payment", "Large hashrate", "Coin conversion"],
    cons: ["Higher fee", "KYC for some features", "No PearlHash support"],
    recommended: false,
  },
  {
    id: "woolypooly",
    name: "WoolyPooly",
    url: "https://woolypooly.com",
    logo: "W",
    color: "#06b6d4",
    type: "Multi-coin",
    algorithms: ["KawPow", "Etchash", "kHeavyHash", "Blake3", "Octopus"],
    fee: "1%",
    payout: "0.01 coin minimum",
    minPayout: "$0.01 equivalent",
    location: ["EU", "US"],
    features: ["PPLNS", "Telegram bot", "API", "Low minimum payout"],
    pros: ["Low fees", "Very low minimum payout", "Good for small miners", "Clean UI"],
    cons: ["Lower hashrate", "No PearlHash support"],
    recommended: false,
  },
  {
    id: "zpool",
    name: "Zpool",
    url: "https://zpool.ca",
    logo: "Z",
    color: "#14b8a6",
    type: "Multi-coin",
    algorithms: ["KawPow", "Etchash", "kHeavyHash", "Blake3", "BTX-MatMul"],
    fee: "0.9%",
    payout: "0.001 BTX minimum",
    minPayout: "$0.01 equivalent",
    location: ["US", "EU", "Asia"],
    features: ["PPLNS", "Auto-exchange", "API", "Low minimum payout", "Multi-algo switching"],
    pros: ["Auto-exchange to BTC", "Low fees", "Good for small miners", "Supports BTX"],
    cons: ["Not all algorithms supported", "No PearlHash"],
    recommended: false,
  },
];

export default function PoolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Mining Pool Comparison</h1>
        <p className="text-[--text-secondary] mt-1">
          Compare mining pools by fee, payout method, server locations, and supported algorithms.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-[--bg-card] border border-[--border-color] rounded-xl p-4">
          <div className="text-xl font-bold text-[--accent-green]">{pools.length}</div>
          <div className="text-sm text-[--text-muted]">Pools tracked</div>
        </div>
        <div className="bg-[--bg-card] border border-[--border-color] rounded-xl p-4">
          <div className="text-xl font-bold">{pools.filter(p => p.fee.includes("1") || p.fee.includes("0.5")).length}</div>
          <div className="text-sm text-[--text-muted]">Low-fee pools (&le;1%)</div>
        </div>
        <div className="bg-[--bg-card] border border-[--border-color] rounded-xl p-4">
          <div className="text-xl font-bold">{pools.filter(p => p.algorithms.includes("PearlHash")).length}</div>
          <div className="text-sm text-[--text-muted]">PearlHash pools</div>
        </div>
        <div className="bg-[--bg-card] border border-[--border-color] rounded-xl p-4">
          <div className="text-xl font-bold">0.5-2.5%</div>
          <div className="text-sm text-[--text-muted]">Fee range</div>
        </div>
      </div>

      {/* Pool table */}
      <div className="bg-[--bg-card] border border-[--border-color] rounded-xl overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[--bg-secondary] border-b border-[--border-color]">
                <th className="text-left py-3 px-4 font-medium">Pool</th>
                <th className="text-left py-3 px-4 font-medium">Fee</th>
                <th className="text-left py-3 px-4 font-medium">Payout Method</th>
                <th className="text-left py-3 px-4 font-medium">Min Payout</th>
                <th className="text-left py-3 px-4 font-medium">Algorithms</th>
                <th className="text-left py-3 px-4 font-medium">Servers</th>
                <th className="text-left py-3 px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {pools.map((p) => (
                <tr key={p.id} className="border-b border-[--border-color] hover:bg-[--bg-card-hover] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
                        style={{ backgroundColor: p.color + "20", color: p.color }}
                      >
                        {p.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{p.name}</span>
                          {p.recommended && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-[--accent-green]/10 text-[--accent-green]">Recommended</span>
                          )}
                        </div>
                        <div className="text-xs text-[--text-muted]">{p.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-mono font-medium ${
                      parseFloat(p.fee) <= 1 ? "text-[--accent-green]" : "text-[--text-primary]"
                    }`}>{p.fee}</span>
                  </td>
                  <td className="py-3 px-4 text-[--text-secondary]">{p.features[0]}</td>
                  <td className="py-3 px-4 font-mono text-xs">{p.minPayout}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {p.algorithms.slice(0, 3).map((a) => (
                        <span key={a} className="text-xs px-2 py-0.5 rounded bg-[--bg-secondary]">{a}</span>
                      ))}
                      {p.algorithms.length > 3 && (
                        <span className="text-xs text-[--text-muted]">+{p.algorithms.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {p.location.map((loc) => (
                        <span key={loc} className="text-xs px-2 py-0.5 rounded bg-[--bg-secondary]">{loc}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[--accent-green] hover:underline"
                    >
                      Visit →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed pool cards */}
      <h2 className="text-xl font-bold mb-5">Detailed Overview</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {pools.map((p) => (
          <div key={p.id} className="bg-[--bg-card] border border-[--border-color] rounded-xl p-5">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0"
                style={{ backgroundColor: p.color + "20", color: p.color }}
              >
                {p.logo}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  {p.recommended && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[--accent-green]/10 text-[--accent-green]">⭐ Top Pick</span>
                  )}
                </div>
                <p className="text-sm text-[--text-secondary]">{p.type} · {p.fee} fee · {p.location.join("/")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <h4 className="text-[--text-muted] mb-1.5">✅ Pros</h4>
                <ul className="space-y-1">
                  {p.pros.map((pr) => (
                    <li key={pr} className="flex items-start gap-1.5">
                      <span className="text-[--accent-green] shrink-0">+</span>
                      <span>{pr}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[--text-muted] mb-1.5">⚠️ Cons</h4>
                <ul className="space-y-1">
                  {p.cons.map((c) => (
                    <li key={c} className="flex items-start gap-1.5">
                      <span className="text-[--accent-red] shrink-0">-</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[--border-color] pt-4 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-[--text-muted]">Payout:</span>
                <span className="font-mono">{p.payout}</span>
              </div>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[--bg-secondary] border border-[--border-color] text-xs hover:bg-[--bg-card-hover] transition-colors"
              >
                Visit Pool ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
