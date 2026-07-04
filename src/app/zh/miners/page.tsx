"use client";

const miners = [
  {
    id: "peakminer",
    name: "PeakMiner",
    version: "v1.0.13",
    logo: "P",
    color: "#22c55e",
    description: "全能挖矿软件，内置功耗限制、温度控制和自动重启。最适合 NVIDIA RTX 40/50 系列显卡。",
    algorithms: ["PearlHash", "kHeavyHash", "Blake3", "KawPow", "Etchash", "Octopus", "NexaPow"],
    pros: ["Blackwell 架构能效极佳", "一站式解决方案", "低拒绝率", "持续更新", "免费使用"],
    cons: ["Windows Defender 误报", "不支持双挖", "软件较新"],
    rating: 4.5,
    hashrateRef: "RTX 5080: 180 TH/s (PearlHash)",
  },
  {
    id: "wildrig",
    name: "WildRig",
    version: "v0.35.3",
    logo: "W",
    color: "#f59e0b",
    description: "流行的开源挖矿软件，支持多种算法。跨代显卡兼容性好。",
    algorithms: ["PearlHash", "kHeavyHash", "Blake3", "KawPow", "Etchash", "Octopus"],
    pros: ["非常稳定", "开源可审查", "社区支持好", "定期更新"],
    cons: ["RTX 50 系列能效略低", "仅命令行", "无内置功耗限制"],
    rating: 4.0,
    hashrateRef: "RTX 5060 Ti: 92 TH/s (PearlHash)",
  },
  {
    id: "srbminer",
    name: "SRBMiner",
    version: "v2.6.8",
    logo: "S",
    color: "#8b5cf6",
    description: "功能丰富的挖矿软件，支持 AMD 和 NVIDIA，提供高级调优选项。",
    algorithms: ["PearlHash", "kHeavyHash", "Blake3", "KawPow", "Etchash"],
    pros: ["调优选项丰富", "支持 AMD 好", "Web 监控面板", "多算法"],
    cons: ["设置较复杂", "部分算法手续费高", "不是全部算法都支持"],
    rating: 4.2,
    hashrateRef: "RTX 5080: 195 TH/s (PearlHash)",
  },
  {
    id: "lpminer",
    name: "lpminer",
    version: "v2.1.0",
    logo: "L",
    color: "#3b82f6",
    description: "LuckyPool 官方挖矿客户端，针对 PearlHash 优化。",
    algorithms: ["PearlHash"],
    pros: ["LuckyPool 优化", "设置简单", "低延迟", "自动支付"],
    cons: ["仅支持 PearlHash", "部分显卡能效一般", "功能单一"],
    rating: 3.5,
    hashrateRef: "RTX 5080: 192 TH/s (PearlHash)",
  },
];

export default function ZhMinersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">挖矿软件对比</h1>
        <p className="text-[--text-secondary] mt-1">
          主流显卡挖矿软件的功能、能效和易用性对比。
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {miners.map((m) => (
          <div key={m.id} className="bg-[--bg-card] border border-[--border-color] rounded-xl p-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0"
                style={{ backgroundColor: m.color + "20", color: m.color }}>
                {m.logo}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{m.name}</h3>
                  <span className="text-xs text-[--text-muted] bg-[--bg-secondary] px-2 py-0.5 rounded">{m.version}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: m.color + "20", color: m.color }}>★ {m.rating}</span>
                </div>
                <p className="text-sm text-[--text-secondary] mt-1">{m.description}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-[--text-muted] text-sm mb-1.5">支持算法</h4>
              <div className="flex flex-wrap gap-1">
                {m.algorithms.map((a) => (
                  <span key={a} className="text-xs px-2 py-0.5 rounded bg-[--bg-secondary]">{a}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <h4 className="text-[--text-muted] mb-1.5">✅ 优点</h4>
                <ul className="space-y-1">
                  {m.pros.map((p) => (
                    <li key={p} className="flex items-start gap-1.5"><span className="text-[--accent-green] shrink-0">+</span><span>{p}</span></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[--text-muted] mb-1.5">⚠️ 缺点</h4>
                <ul className="space-y-1">
                  {m.cons.map((c) => (
                    <li key={c} className="flex items-start gap-1.5"><span className="text-[--accent-red] shrink-0">-</span><span>{c}</span></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-sm border-t border-[--border-color] pt-3 mt-2">
              <span className="text-[--text-muted]">参考算力: </span>
              <span className="font-mono">{m.hashrateRef}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
