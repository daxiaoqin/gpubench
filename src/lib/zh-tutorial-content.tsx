import type { ReactNode } from "react";

export interface ZhTutorial {
  title: string;
  slug: string;
  category: string;
  readTime: string;
  difficulty: string;
  description: string;
  content: ReactNode;
}

function Content({ children }: { children: ReactNode }) {
  return <div className="space-y-3 text-sm leading-relaxed">{children}</div>;
}

export const zhTutorials: ZhTutorial[] = [
  {
    title: "什么是显卡挖矿？新手完整入门指南",
    slug: "what-is-gpu-mining",
    category: "基础",
    readTime: "8 分钟",
    difficulty: "入门",
    description: "了解显卡挖矿的工作原理、需要什么设备、以及如何开始挖矿。",
    content: (
      <Content>
        <p><strong>显卡挖矿</strong>是利用你显卡的算力来保护区块链网络并赚取加密货币奖励的过程。</p>
        <p>挖矿时，显卡会解决复杂的数学问题。第一个解出新区块的矿工会获得新铸造的币和交易手续费。</p>
        <p className="font-medium mt-4">你需要准备的：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>至少 6GB 显存的显卡</li>
          <li>挖矿软件（如 PeakMiner、SRBMiner）</li>
          <li>你选择币种的钱包地址</li>
          <li>一个矿池来和其他矿工合并算力</li>
        </ul>
        <p className="mt-3">收益取决于算力、电费、币价和网络难度。使用我们的<a href="/zh/calculator" className="text-[--accent-green] underline">收益计算器</a>来估算收益。</p>
      </Content>
    ),
  },
  {
    title: "2026 年如何选择最佳挖矿显卡",
    slug: "choose-gpu-mining-2026",
    category: "硬件",
    readTime: "10 分钟",
    difficulty: "入门",
    description: "根据算力、能效和预算选择最合适的挖矿显卡的全面指南。",
    content: (
      <Content>
        <p>2026 年选择挖矿显卡的关键是<strong>能效比</strong>（H/W），不是单纯的算力高低。</p>
        <p className="font-medium mt-4">按预算推荐：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>入门：</strong>RTX 4060 / RX 7600 — 性价比高</li>
          <li><strong>中端：</strong>RTX 5060 Ti — 能效出色（PearlHash 93 TH/s @ 150W）</li>
          <li><strong>高端：</strong>RTX 5080 — 性能强劲（PearlHash 200 TH/s @ 260W）</li>
          <li><strong>旗舰：</strong>RTX 5090 — 极限算力，但功耗较高</li>
        </ul>
        <p className="mt-3">查看我们的<a href="/zh/gpus" className="text-[--accent-green] underline">显卡数据库</a>获取实测算力和能效数据。</p>
      </Content>
    ),
  },
  {
    title: "PeakMiner 设置教程：从零开始",
    slug: "peakminer-setup-guide",
    category: "软件",
    readTime: "12 分钟",
    difficulty: "入门",
    description: "从下载到运行，手把手教你配置 PeakMiner 最大化挖矿收益。",
    content: (
      <Content>
        <p>PeakMiner 是一款用户友好的挖矿软件，内置功耗限制和自动重启功能。设置步骤如下：</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>下载</strong> PeakMiner 官方版本</li>
          <li><strong>解压</strong>到文件夹（添加 Windows Defender 排除项）</li>
          <li><strong>创建 .bat 文件</strong>，填入矿池和钱包地址：<br/>
            <code className="block bg-[--bg-secondary] p-2 rounded mt-1 text-xs">peakminer.exe --algo pearlhash --pool stratum+tcp://pearl-eu2.luckypool.io:3360 --user 你的钱包地址 --power-limit 260</code>
          </li>
          <li><strong>以管理员身份运行</strong></li>
        </ol>
        <p className="mt-2">PeakMiner 支持开机自启和崩溃自动恢复。</p>
      </Content>
    ),
  },
  {
    title: "理解算力、功耗与能效",
    slug: "hashrate-power-efficiency",
    category: "基础",
    readTime: "6 分钟",
    difficulty: "入门",
    description: "了解算力的含义、功耗如何影响收益、以及为什么能效比是最重要的指标。",
    content: (
      <Content>
        <p><strong>算力（Hashrate）</strong> 衡量显卡的挖矿速度。对于 PearlHash 算法，单位为 TH/s。</p>
        <p><strong>功耗（Power Draw）</strong> 是显卡消耗的电量（瓦特）。功耗越低，电费越少。</p>
        <p><strong>能效比（H/W）</strong> = 算力 / 功耗。数值越高，每度电挖到的币越多。</p>
        <div className="bg-[--bg-secondary] p-3 rounded-lg mt-3">
          <p className="font-medium">示例：</p>
          <p>RTX 5080: 200 TH/s @ 260W = <strong>769 H/W</strong><br/>
          RTX 5060 Ti: 93 TH/s @ 150W = <strong>620 H/W</strong></p>
        </div>
      </Content>
    ),
  },
  {
    title: "显卡功耗限制完整指南",
    slug: "power-limiting-guide",
    category: "硬件",
    readTime: "7 分钟",
    difficulty: "进阶",
    description: "如何在几乎不影响算力的情况下降低功耗，节省电费并降低温度。",
    content: (
      <Content>
        <p>功耗限制可以大幅降低显卡的耗电量和温度，同时只损失少量算力。</p>
        <p className="font-medium">经验法则：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>80% 功耗限制 → 约 80% 算力、75% 功耗（能效更高）</li>
          <li>70% 功耗限制 → 约 70% 算力、65% 功耗</li>
          <li>60% 功耗限制 → 约 60% 算力、55% 功耗（能效最大化）</li>
        </ul>
        <p className="mt-2">PeakMiner 内置 <code>--power-limit</code> 参数。使用我们的<a href="/zh/calculator" className="text-[--accent-green] underline">计算器</a>模拟不同功耗设置下的收益。</p>
      </Content>
    ),
  },
  {
    title: "多显卡挖矿搭建指南：2卡、4卡到8卡",
    slug: "multi-gpu-setup",
    category: "硬件",
    readTime: "15 分钟",
    difficulty: "进阶",
    description: "多显卡矿机搭建的关键要点：主板、电源、散热、转接卡等。",
    content: (
      <Content>
        <p>搭建多显卡矿机需要仔细规划：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>主板：</strong>需要足够的 PCIe 插槽，使用转接卡（riser）扩展</li>
          <li><strong>电源：</strong>总功率 = 显卡功耗总和 + 150W（主板/CPU）</li>
          <li><strong>散热：</strong>显卡之间留足间距，开放式机架效果最佳</li>
          <li><strong>软件：</strong>使用 <code>CUDA_VISIBLE_DEVICES</code> 分别指定显卡</li>
        </ul>
      </Content>
    ),
  },
  {
    title: "矿池策略：Solo vs PPS vs PPLNS",
    slug: "mining-pool-strategies",
    category: "策略",
    readTime: "9 分钟",
    difficulty: "进阶",
    description: "比较不同矿池的收益分配方式，选择最适合你的方案。",
    content: (
      <Content>
        <p>矿池的收益分配方式直接影响你的实际收入：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>PPS</strong> — 每次提交有效份额即获固定收益，稳定但费率较高</li>
          <li><strong>PPLNS</strong> — 按最近 N 个份额分配收益，长期收益更高但有波动</li>
          <li><strong>Solo</strong> — 找到区块获得全额奖励，波动极大</li>
        </ul>
        <p className="mt-2">小型矿工建议选择 PPLNS，长期收益更优。</p>
      </Content>
    ),
  },
  {
    title: "Windows vs Linux 挖矿：优缺点对比",
    slug: "windows-vs-linux-mining",
    category: "软件",
    readTime: "7 分钟",
    difficulty: "入门",
    description: "哪个操作系统更适合挖矿？从稳定性、驱动支持和易用性角度全面对比。",
    content: (
      <Content>
        <p className="font-medium">Windows：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>✅ 设置简单，排障方便</li>
          <li>✅ 新显卡驱动更新快</li>
          <li>❌ 系统占用资源较多</li>
          <li>❌ Windows 更新可能中断挖矿</li>
        </ul>
        <p className="font-medium mt-3">Linux：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>✅ 系统占用低，算力略高</li>
          <li>✅ 更稳定，可连续运行数月</li>
          <li>❌ 学习曲线陡峭</li>
          <li>❌ 部分工具不支持 Linux</li>
        </ul>
        <p className="mt-2"><strong>结论：</strong>初学者从 Windows 开始。运行专用矿机时可切换到 Linux。</p>
      </Content>
    ),
  },
  {
    title: "如何准确计算挖矿收益",
    slug: "calculate-profitability",
    category: "策略",
    readTime: "8 分钟",
    difficulty: "进阶",
    description: "综合考虑电费、矿池手续费、硬件折旧和币价波动，准确计算实际收益。",
    content: (
      <Content>
        <p>准确的收益计算需要以下因素：</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>总收入</strong> — 每日挖到的币 × 币价</li>
          <li><strong>电费</strong> — 功耗（W）× 24小时 × 电价</li>
          <li><strong>矿池手续费</strong> — 通常为 0-2%</li>
          <li><strong>硬件折旧</strong> — 显卡会随时间贬值</li>
        </ol>
        <p className="mt-2">使用我们的<a href="/zh/calculator" className="text-[--accent-green] underline">收益计算器</a>获取基于实时币价的最准确估算。</p>
      </Content>
    ),
  },
  {
    title: "常见挖矿问题与解决方法",
    slug: "common-mining-issues",
    category: "故障排除",
    readTime: "11 分钟",
    difficulty: "入门",
    description: "解决矿机崩溃、拒绝率高、温度过高等常见问题。",
    content: (
      <Content>
        <p className="font-medium">矿机启动就崩溃</p>
        <p>检查 Windows Defender 排除项，以管理员身份运行，更新显卡驱动。</p>
        <p className="font-medium mt-3">拒绝率过高</p>
        <p>尝试切换矿池服务器（欧洲/美国节点），检查网络稳定性。</p>
        <p className="font-medium mt-3">显卡温度过高</p>
        <p>设置功耗上限（从 80% 开始），改善机箱通风，清理灰尘。</p>
        <p className="font-medium mt-3">算力偏低</p>
        <p>确认使用了正确的算法。检查功耗限制是否设置过低。</p>
        <p className="font-medium mt-3">提示"GPU 0 "错误</p>
        <p>使用 <code>CUDA_VISIBLE_DEVICES=X</code> 隔离问题显卡，更新驱动。</p>
      </Content>
    ),
  },
  {
    title: "BTX 挖矿指南：配置与收益",
    slug: "bitcore-mining-guide",
    category: "软件",
    readTime: "9 分钟",
    difficulty: "进阶",
    description: "使用 BTX-MatMul 算法挖矿 BTX（btx.dev）的完整指南——节点设置、推荐显卡、收益技巧。",
    content: (
      <Content>
        <p><strong>BTX</strong> 是一种后量子 Layer 1 区块链（btx.dev），采用 <strong>BTX-MatMul</strong> 算法——512×512 矩阵乘法 PoW（M31 域上的 MatMul），专为 GPU 挖矿优化。主网于 2026 年 3 月 19 日上线，90 秒出块，总供应 2100 万枚，原生支持 CUDA 挖矿。</p>

        <p className="font-medium mt-4">开始挖矿：</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>运行节点</strong> — 从 <a href="https://btx.dev" className="underline">btx.dev</a> 下载官方 BTX 节点（Linux/macOS，支持 CUDA GPU）</li>
          <li><strong>准备钱包</strong> — BTX 节点内置钱包功能</li>
          <li><strong>直接挖矿</strong> — BTX 挖矿内置于节点软件，使用 <code>--mine</code> 参数启动 CUDA GPU 挖矿</li>
          <li><strong>或使用第三方矿工</strong> — PeakMiner v1.0.15+ 和 SRBMiner 支持 BTX-MatMul（查看我们的<a href="/zh/pools" className="text-[--accent-green] underline">矿池页面</a>）</li>
        </ol>

        <p className="font-medium mt-4">PeakMiner 配置示例：</p>
        <code className="block bg-[--bg-secondary] p-2 rounded mt-1 text-xs">peakminer.exe --coin btx --pool btx-hk.lproute.com:8660 --wallet 你的BTX地址 --power-limit 260</code>

        <p className="font-medium mt-4">BTX 推荐显卡：</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>最强性能：</strong>RTX 5090 / RTX 5080 — 最高算力</li>
          <li><strong>最佳能效：</strong>RTX 5060 Ti — 算力功耗比出色</li>
          <li><strong>最高性价比：</strong>RTX 4070 Super — 性能与价格的平衡</li>
        </ul>

        <p className="mt-3">使用我们的<a href="/zh/calculator?coin=btx" className="text-[--accent-green] underline">收益计算器</a>估算 BTX 挖矿收益。</p>
      </Content>
    ),
  },
];

export const zhCategories = ["全部", "基础", "硬件", "软件", "策略", "故障排除"];

export function getZhTutorialBySlug(slug: string): ZhTutorial | undefined {
  return zhTutorials.find(t => t.slug === slug);
}

export function getAllZhSlugs(): string[] {
  return zhTutorials.map(t => t.slug);
}
