"use client";

import { useState } from "react";

const tutorials = [
  {
    title: "什么是显卡挖矿？新手完整入门指南",
    slug: "what-is-gpu-mining",
    category: "基础",
    readTime: "8 分钟",
    difficulty: "入门",
    description: "了解显卡挖矿的工作原理、需要什么设备、以及如何开始挖矿。",
    content: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p><strong>显卡挖矿</strong>是利用你显卡的算力来保护区块链网络并赚取加密货币奖励的过程。</p>
        <p>挖矿时，显卡会解决复杂的数学问题。第一个解出新区块的矿工会获得新铸造的币和交易手续费。</p>
        <p className="font-medium mt-4">你需要准备的：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>至少 6GB 显存的显卡</li>
          <li>挖矿软件（如 PeakMiner、SRBMiner）</li>
          <li>你想要挖的币的钱包地址</li>
          <li>一个矿池来与其他矿工合并算力</li>
        </ul>
        <p className="mt-3">收益取决于算力、电费、币价和网络难度。用我们的<a href="/zh/calculator" className="text-[--accent-green] underline">计算器</a>估算收益。</p>
      </div>
    ),
  },
  {
    title: "2026 年如何选择最适合挖矿的显卡",
    slug: "choose-gpu-mining-2026",
    category: "硬件",
    readTime: "10 分钟",
    difficulty: "入门",
    description: "根据算力、功耗、能效和预算选择最佳挖矿显卡的完整指南。",
    content: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>2026年选挖矿显卡要看<strong>能效比</strong>（H/W）——每瓦特的算力——而不只是看原始速度。</p>
        <p className="font-medium mt-4">按预算推荐：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>入门：</strong>RTX 4060 / RX 7600 — 低成本高效能</li>
          <li><strong>中端：</strong>RTX 5060 Ti — 能效极佳（Pearl 93 TH/s @ 150W）</li>
          <li><strong>高端：</strong>RTX 5080 — 性能强劲（Pearl 200 TH/s @ 260W）</li>
          <li><strong>发烧：</strong>RTX 5090 — 最强算力，但功耗也高</li>
        </ul>
        <p className="mt-3">查看我们的<a href="/zh/gpus" className="text-[--accent-green] underline">显卡页面</a>获取真实基准测试和能效数据。</p>
      </div>
    ),
  },
  {
    title: "PeakMiner 设置教程：从下载到开挖",
    slug: "peakminer-setup-guide",
    category: "软件",
    readTime: "12 分钟",
    difficulty: "入门",
    description: "手把手教你安装和配置 PeakMiner，实现自动挖矿。",
    content: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>PeakMiner 是一个用户友好的矿工软件，自带功耗限制和自动重启功能。设置方法如下：</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>下载</strong> PeakMiner 官方网站获取最新版</li>
          <li><strong>解压</strong>到文件夹（添加 Windows Defender 排除项）</li>
          <li><strong>创建 .bat 文件</strong>写入矿池和钱包地址：<br/>
            <code className="block bg-[--bg-secondary] p-2 rounded mt-1 text-xs">peakminer.exe --algo pearlhash --pool stratum+tcp://pearl-eu2.luckypool.io:3360 --user 你的钱包地址 --power-limit 260</code>
          </li>
          <li><strong>以管理员身份运行</strong></li>
        </ol>
        <p className="mt-2">PeakMiner 会在电脑启动时自动运行，并在崩溃后自动重启。</p>
      </div>
    ),
  },
  {
    title: "算力、功耗与能效详解",
    slug: "hashrate-power-efficiency",
    category: "基础",
    readTime: "6 分钟",
    difficulty: "入门",
    description: "算力是什么？功耗如何影响收益？为什么能效比最重要？",
    content: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p><strong>算力</strong>衡量显卡挖矿的速度 — 越高越好。PearlHash 的单位是 TH/s。</p>
        <p><strong>功耗</strong>是显卡使用的电量（瓦特）。更低功耗 = 更少的电费。</p>
        <p><strong>能效比</strong>（H/W）= 算力 / 功耗。数字越高意味着每块钱电费挖的币越多。</p>
        <div className="bg-[--bg-secondary] p-3 rounded-lg mt-3">
          <p className="font-medium">示例：</p>
          <p>RTX 5080：200 TH/s @ 260W = <strong>769 H/W</strong><br/>
          RTX 5060 Ti：93 TH/s @ 150W = <strong>620 H/W</strong></p>
        </div>
      </div>
    ),
  },
  {
    title: "显卡功耗限制（Power Limit）完全指南",
    slug: "power-limiting-guide",
    category: "硬件",
    readTime: "7 分钟",
    difficulty: "进阶",
    description: "如何降低显卡功耗而不过多损失算力，省电、降温、延长寿命。",
    content: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>降低功耗限制可以减少显卡的用电量，节省电费并降低温度，而算力损失相对较小。</p>
        <p className="font-medium">经验法则：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>80% 功耗 → ~80% 算力，~75% 功耗（能效更好）</li>
          <li>70% 功耗 → ~70% 算力，~65% 功耗</li>
          <li>60% 功耗 → ~60% 算力，~55% 功耗（最高能效）</li>
        </ul>
        <p className="mt-2">PeakMiner 内置 <code>--power-limit</code> 参数。在我们的<a href="/zh/calculator" className="text-[--accent-green] underline">计算器</a>里可以试验不同功耗设置。</p>
      </div>
    ),
  },
  {
    title: "多显卡挖矿机搭建：2卡/4卡/8卡配置指南",
    slug: "multi-gpu-setup",
    category: "硬件",
    readTime: "15 分钟",
    difficulty: "进阶",
    description: "搭建多显卡矿机的方方面面：转接线、电源、散热、系统配置。",
    content: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>搭建多显卡矿机需要仔细规划。以下是重点：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>主板：</strong>需要足够 PCIe 插槽。用转接卡（riser）拉开间距。</li>
          <li><strong>电源：</strong>总功率 = 所有显卡功耗之和 + 150W。1250W 电源可带 2-3 张高端显卡。</li>
          <li><strong>散热：</strong>显卡之间留空隙。开放式机箱效果最好。</li>
          <li><strong>软件：</strong>用 <code>CUDA_VISIBLE_DEVICES</code> 指定每张卡，或运行多个矿工程序。</li>
        </ul>
      </div>
    ),
  },
  {
    title: "挖矿矿池策略：Solo vs PPS vs PPLNS",
    slug: "mining-pool-strategies",
    category: "策略",
    readTime: "9 分钟",
    difficulty: "进阶",
    description: "不同矿池支付方式对比，选择最适合你的方案。",
    content: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>矿池把多人的算力合并，分摊收益。支付方式很重要：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>PPS</strong> — 每份固定收益。稳定但收益较低。</li>
          <li><strong>PPLNS</strong> — 收益较高但波动大。奖励忠诚度。</li>
          <li><strong>Solo</strong> — 挖到块就拿全部奖励，但波动极大。</li>
        </ul>
        <p className="mt-2">大多数小矿工选择 PPLNS 以获得更好的长期收益。</p>
      </div>
    ),
  },
  {
    title: "Windows 还是 Linux 挖矿？优缺点对比",
    slug: "windows-vs-linux-mining",
    category: "软件",
    readTime: "7 分钟",
    difficulty: "入门",
    description: "哪个系统更适合挖矿？稳定性、驱动、易用性全面对比。",
    content: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p className="font-medium">Windows：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>✅ 设置简单，容易排查问题</li>
          <li>✅ 新显卡驱动支持更好</li>
          <li>❌ 系统占用高（占用内存和CPU）</li>
          <li>❌ Windows 更新可能中断挖矿</li>
        </ul>
        <p className="font-medium mt-3">Linux：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>✅ 系统开销低 — 算力略高</li>
          <li>✅ 更稳定 — 数月不重启</li>
          <li>❌ 学习曲线陡峭</li>
          <li>❌ 部分矿工软件没有 Linux 版</li>
        </ul>
        <p className="mt-2"><strong>结论：</strong>新手从 Windows 开始。如果是专用矿机，考虑切换 Linux。</p>
      </div>
    ),
  },
  {
    title: "如何准确计算挖矿收益",
    slug: "calculate-profitability",
    category: "策略",
    readTime: "8 分钟",
    difficulty: "进阶",
    description: "综合考虑电费、矿池手续费、硬件折旧和币价波动。",
    content: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>准确计算收益要考虑以下因素：</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>总收入</strong> — 你分到的每日区块奖励 × 币价</li>
          <li><strong>电费</strong> — 功耗（W）× 24 小时 × 你的电价</li>
          <li><strong>矿池手续费</strong> — 通常为收益的 0-2%</li>
          <li><strong>硬件折旧</strong> — 显卡会随时间贬值</li>
        </ol>
        <p className="mt-2">使用我们的<a href="/zh/calculator" className="text-[--accent-green] underline">计算器</a>，结合实时币价和网络数据获得最准确的估算。</p>
      </div>
    ),
  },
  {
    title: "常见挖矿问题排查与解决",
    slug: "common-mining-issues",
    category: "故障排查",
    readTime: "11 分钟",
    difficulty: "入门",
    description: "解决崩溃、拒绝率高、温度过高等常见挖矿问题。",
    content: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p className="font-medium">矿工启动崩溃</p>
        <p>检查 Windows Defender 排除项，以管理员身份运行，更新显卡驱动。</p>
        <p className="font-medium mt-3">高拒绝率</p>
        <p>尝试不同的矿池服务器（欧洲 vs 美国），检查网络稳定性。</p>
        <p className="font-medium mt-3">显卡温度过高</p>
        <p>设置功耗限制（先从 80% 开始），改善机箱风道，清理灰尘。</p>
        <p className="font-medium mt-3">算力偏低</p>
        <p>确认使用正确的算法。检查功耗限制是否设置过低。</p>
        <p className="font-medium mt-3">矿工显示 &quot;GPU 0 &quot; 空白错误</p>
        <p>用 <code>CUDA_VISIBLE_DEVICES=X</code> 隔离有问题的卡。更新驱动。</p>
      </div>
    ),
  },
];

const categories = ["全部", "基础", "硬件", "软件", "策略", "故障排查"];

export default function ZhTutorialsPage() {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const filtered = activeCategory === "全部"
    ? tutorials
    : tutorials.filter((t) => t.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">挖矿教程</h1>
        <p className="text-[--text-secondary] mt-1">
          从零开始的挖矿指南，适合小白和进阶玩家。点击教程查看详情。
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setExpandedSlug(null); }}
            className={`px-4 py-1.5 rounded-lg text-sm border transition-all ${
              activeCategory === cat
                ? "bg-[--accent-green]/10 border-[--accent-green] text-[--accent-green]"
                : "bg-[--bg-card] border-[--border-color] text-[--text-secondary] hover:text-[--text-primary] hover:border-[--accent-green]/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t) => (
          <div key={t.slug}>
            <button
              onClick={() => setExpandedSlug(expandedSlug === t.slug ? null : t.slug)}
              className="group bg-[--bg-card] border border-[--border-color] rounded-xl p-5 hover:bg-[--bg-card-hover] hover:border-[--accent-green]/30 transition-all text-left w-full cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 rounded-full bg-[--accent-green]/10 text-[--accent-green]">{t.category}</span>
                <span className="text-xs text-[--text-muted]">{t.readTime}</span>
                <span className="text-xs text-[--text-muted] ml-auto">{t.difficulty}</span>
              </div>
              <h3 className="font-semibold group-hover:text-[--accent-green] transition-colors mb-2">{t.title}</h3>
              <p className="text-sm text-[--text-secondary]">{t.description}</p>
            </button>
            {expandedSlug === t.slug && (
              <div className="mt-2 bg-[--bg-secondary] border border-[--border-color] rounded-xl p-5 animate-[fadeIn_0.2s_ease-in]">
                {t.content}
                <button
                  onClick={() => setExpandedSlug(null)}
                  className="mt-3 text-xs text-[--text-muted] hover:text-[--text-primary] transition-colors"
                >
                  ▲ 收起
                </button>
              </div>
            )}
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
            <p className="text-sm text-[--text-secondary]">显卡选择、矿机搭建、电源和散热。</p>
          </div>
          <div className="bg-[--bg-secondary] rounded-lg p-4">
            <h3 className="font-medium mb-2">💻 软件配置</h3>
            <p className="text-sm text-[--text-secondary]">矿工软件设置、驱动安装与自动化。</p>
          </div>
          <div className="bg-[--bg-secondary] rounded-lg p-4">
            <h3 className="font-medium mb-2">📊 收益优化</h3>
            <p className="text-sm text-[--text-secondary]">利润优化、矿池选择、币种切换。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
