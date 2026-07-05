"use client";

const pools = [
  {
    id: "luckypool",
    name: "LuckyPool",
    url: "https://luckypool.io",
    logo: "L",
    color: "#22c55e",
    type: "多币种",
    algorithms: ["PearlHash", "kHeavyHash", "Blake3", "KawPow", "Etchash"],
    fee: "1%",
    payout: "PPLNS",
    location: ["欧洲", "美国", "亚洲"],
    pros: ["支持多种币", "费率低", "管理团队活跃", "提供专用矿工"],
    cons: ["较新（算力较小）", "无内置交易所"],
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
    payout: "PPLNS",
    location: ["欧洲", "美国"],
    pros: ["PearlHash 最低费率", "快速支付", "透明统计", "运行稳定"],
    cons: ["仅支持 PearlHash", "总算力较小"],
    recommended: false,
  },
  {
    id: "f2pool",
    name: "F2Pool",
    url: "https://f2pool.com",
    logo: "F",
    color: "#3b82f6",
    type: "多币种",
    algorithms: ["KawPow", "Etchash", "kHeavyHash", "Blake3", "Octopus"],
    fee: "2.5%",
    payout: "PPS+",
    location: ["中国", "美国", "欧洲"],
    pros: ["最大的矿池", "久经考验的稳定性", "PPS+ 稳定收益", "多语言"],
    cons: ["费率较高 (2.5%)", "部分功能需 KYC", "不支持 PearlHash"],
    recommended: false,
  },
  {
    id: "viabtc",
    name: "ViaBTC",
    url: "https://viabtc.com",
    logo: "V",
    color: "#ef4444",
    type: "多币种",
    algorithms: ["KawPow", "Etchash", "kHeavyHash", "Octopus"],
    fee: "2%",
    payout: "PPS+",
    location: ["中国", "美国", "欧洲"],
    pros: ["内置交易所", "PPS+ 支付", "算力大", "币种转换"],
    cons: ["费率较高", "不支持 PearlHash", "需 KYC"],
    recommended: false,
  },
  {
    id: "woolypooly",
    name: "WoolyPooly",
    url: "https://woolypooly.com",
    logo: "W",
    color: "#06b6d4",
    type: "多币种",
    algorithms: ["KawPow", "Etchash", "kHeavyHash", "Blake3", "Octopus"],
    fee: "1%",
    payout: "PPLNS",
    location: ["欧洲", "美国"],
    pros: ["低费率", "极低最低支付", "适合小矿工", "界面简洁"],
    cons: ["算力较小", "不支持 PearlHash"],
    recommended: false,
  },
];

export default function ZhPoolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">矿池对比</h1>
        <p className="text-[--text-secondary] mt-1">
          按费率、支付方式、服务器位置和支持算法对比矿池。
        </p>
      </div>

      <div className="bg-[--bg-card] border border-[--border-color] rounded-xl overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[--bg-secondary] border-b border-[--border-color]">
                <th className="text-left py-3 px-4 font-medium">矿池</th>
                <th className="text-left py-3 px-4 font-medium">费率</th>
                <th className="text-left py-3 px-4 font-medium">支付方式</th>
                <th className="text-left py-3 px-4 font-medium">支持算法</th>
                <th className="text-left py-3 px-4 font-medium">服务器</th>
                <th className="text-left py-3 px-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {pools.map((p) => (
                <tr key={p.id} className="border-b border-[--border-color] hover:bg-[--bg-card-hover] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0"
                        style={{ backgroundColor: p.color + "20", color: p.color }}>
                        {p.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{p.name}</span>
                          {p.recommended && <span className="text-xs px-1.5 py-0.5 rounded bg-[--accent-green]/10 text-[--accent-green]">推荐</span>}
                        </div>
                        <div className="text-xs text-[--text-muted]">{p.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-mono font-medium ${parseFloat(p.fee) <= 1 ? "text-[--accent-green]" : ""}`}>{p.fee}</span>
                  </td>
                  <td className="py-3 px-4 text-[--text-secondary]">{p.payout}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {p.algorithms.slice(0, 3).map((a) => (
                        <span key={a} className="text-xs px-2 py-0.5 rounded bg-[--bg-secondary]">{a}</span>
                      ))}
                      {p.algorithms.length > 3 && <span className="text-xs text-[--text-muted]">+{p.algorithms.length - 3}</span>}
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
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[--accent-green] hover:underline">访问 →</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-5">详细对比</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {pools.map((p) => (
          <div key={p.id} className="bg-[--bg-card] border border-[--border-color] rounded-xl p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0"
                style={{ backgroundColor: p.color + "20", color: p.color }}>
                {p.logo}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{p.name}</h3>
                  {p.recommended && <span className="text-xs px-2 py-0.5 rounded-full bg-[--accent-green]/10 text-[--accent-green]">⭐ 首选</span>}
                </div>
                <p className="text-sm text-[--text-secondary]">{p.type} · {p.fee} 费率 · {p.location.join("/")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <h4 className="text-[--text-muted] mb-1.5">✅ 优点</h4>
                <ul className="space-y-1">
                  {p.pros.map((pr) => (
                    <li key={pr} className="flex items-start gap-1.5"><span className="text-[--accent-green] shrink-0">+</span><span>{pr}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[--text-muted] mb-1.5">⚠️ 缺点</h4>
                <ul className="space-y-1">
                  {p.cons.map((c) => (
                    <li key={c} className="flex items-start gap-1.5"><span className="text-[--accent-red] shrink-0">-</span><span>{c}</span></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[--border-color] pt-4 text-sm">
              <span className="text-[--text-muted]">支持 {p.algorithms.length} 种算法</span>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-[--bg-secondary] border border-[--border-color] text-xs hover:bg-[--bg-card-hover] transition-colors">
                访问矿池 ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
