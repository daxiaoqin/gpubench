"use client";

const tutorials = [
  {
    title: "什么是显卡挖矿？新手完整入门指南",
    slug: "what-is-gpu-mining",
    category: "基础",
    readTime: "8 分钟",
    description: "了解显卡挖矿的工作原理、需要什么设备、以及如何开始挖矿。",
    difficulty: "入门",
  },
  {
    title: "2026 年如何选择最适合挖矿的显卡",
    slug: "choose-gpu-mining-2026",
    category: "硬件",
    readTime: "10 分钟",
    description: "根据算力、功耗、能效和预算选择最佳挖矿显卡的完整指南。",
    difficulty: "入门",
  },
  {
    title: "PeakMiner 设置教程：从下载到开挖",
    slug: "peakminer-setup-guide",
    category: "软件",
    readTime: "12 分钟",
    description: "手把手教你安装和配置 PeakMiner，实现自动挖矿。",
    difficulty: "入门",
  },
  {
    title: "算力、功耗与能效详解",
    slug: "hashrate-power-efficiency",
    category: "基础",
    readTime: "6 分钟",
    description: "算力是什么？功耗如何影响收益？为什么能效比最重要？",
    difficulty: "入门",
  },
  {
    title: "显卡功耗限制（Power Limit）完全指南",
    slug: "power-limiting-guide",
    category: "硬件",
    readTime: "7 分钟",
    description: "如何降低显卡功耗而不过多损失算力，省电、降温、延长寿命。",
    difficulty: "进阶",
  },
  {
    title: "多显卡挖矿机搭建：2卡/4卡/8卡配置指南",
    slug: "multi-gpu-setup",
    category: "硬件",
    readTime: "15 分钟",
    description: "搭建多显卡矿机的方方面面：转接线、电源、散热、系统配置。",
    difficulty: "进阶",
  },
  {
    title: "挖矿矿池策略：Solo vs PPS vs PPLNS",
    slug: "mining-pool-strategies",
    category: "策略",
    readTime: "9 分钟",
    description: "不同矿池支付方式对比，选择最适合你的方案。",
    difficulty: "进阶",
  },
  {
    title: "Windows 还是 Linux 挖矿？优缺点对比",
    slug: "windows-vs-linux-mining",
    category: "软件",
    readTime: "7 分钟",
    description: "哪个系统更适合挖矿？稳定性、驱动、易用性全面对比。",
    difficulty: "入门",
  },
  {
    title: "如何准确计算挖矿收益",
    slug: "calculate-profitability",
    category: "策略",
    readTime: "8 分钟",
    description: "综合考虑电费、矿池手续费、硬件折旧和币价波动。",
    difficulty: "进阶",
  },
  {
    title: "常见挖矿问题排查与解决",
    slug: "common-mining-issues",
    category: "故障排查",
    readTime: "11 分钟",
    description: "解决崩溃、拒绝率高、温度过高等常见挖矿问题。",
    difficulty: "入门",
  },
];

const categories = ["全部", "基础", "硬件", "软件", "策略", "故障排查"];

export default function ZhTutorialsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">挖矿教程</h1>
        <p className="text-[--text-secondary] mt-1">
          从零开始的挖矿指南，适合小白和进阶玩家。
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            className="px-4 py-1.5 rounded-lg text-sm bg-[--bg-card] border border-[--border-color] text-[--text-secondary] hover:text-[--text-primary] hover:border-[--accent-green]/30 transition-all"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tutorials.map((t) => (
          <div
            className="group bg-[--bg-card] border border-[--border-color] rounded-xl p-5 hover:bg-[--bg-card-hover] hover:border-[--accent-green]/30 transition-all cursor-default"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-[--accent-green]/10 text-[--accent-green]">{t.category}</span>
              <span className="text-xs text-[--text-muted]">{t.readTime}</span>
              <span className="text-xs text-[--text-muted] ml-auto">{t.difficulty}</span>
            </div>
            <h3 className="font-semibold group-hover:text-[--accent-green] transition-colors mb-2">{t.title}</h3>
            <p className="text-sm text-[--text-secondary]">{t.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[--bg-card] border border-[--border-color] rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-4">📚 教程分类</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[--bg-secondary] rounded-lg p-4">
            <h3 className="font-medium mb-2">🟢 基础入门</h3>
            <p className="text-sm text-[--text-secondary]">如果你是挖矿新手，从这里开始。</p>
          </div>
          <div className="bg-[--bg-secondary] rounded-lg p-4">
            <h3 className="font-medium mb-2">🔧 硬件指南</h3>
            <p className="text-sm text-[--text-secondary]">显卡选择、矿机搭建、电源和散热方案。</p>
          </div>
          <div className="bg-[--bg-secondary] rounded-lg p-4">
            <h3 className="font-medium mb-2">💻 软件配置</h3>
            <p className="text-sm text-[--text-secondary]">矿工软件设置、驱动安装与自动化脚本。</p>
          </div>
          <div className="bg-[--bg-secondary] rounded-lg p-4">
            <h3 className="font-medium mb-2">📊 收益优化</h3>
            <p className="text-sm text-[--text-secondary]">利润优化、矿池选择、币种切换策略。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
