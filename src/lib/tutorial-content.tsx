import type { ReactNode } from "react";

export interface Tutorial {
  title: string;
  slug: string;
  category: "Basics" | "Hardware" | "Software" | "Strategy" | "Troubleshooting";
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  content: ReactNode;
}

function Content({ children }: { children: ReactNode }) {
  return <div className="space-y-3 text-sm leading-relaxed">{children}</div>;
}

export const tutorials: Tutorial[] = [
  {
    title: "What Is GPU Mining? A Complete Beginner's Guide",
    slug: "what-is-gpu-mining",
    category: "Basics",
    readTime: "8 min",
    difficulty: "Beginner",
    description: "Learn how GPU mining works, what you need to get started, and how much you can earn.",
    content: (
      <Content>
        <p><strong>GPU mining</strong> uses your graphics card&apos;s processing power to secure blockchain networks and earn cryptocurrency rewards.</p>
        <p>When you mine, your GPU solves complex mathematical problems. The first miner to solve each block gets rewarded with newly minted coins plus transaction fees.</p>
        <p className="font-medium mt-4">What you need to start:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>A GPU with at least 6GB VRAM</li>
          <li>Mining software (e.g. PeakMiner, SRBMiner)</li>
          <li>A wallet address for your chosen coin</li>
          <li>A mining pool to combine hashrate with others</li>
        </ul>
        <p className="mt-3">Your profit depends on hashrate, power cost, coin price, and network difficulty. Use our <a href="/calculator" className="text-[--accent-green] underline">Calculator</a> to estimate earnings.</p>
      </Content>
    ),
  },
  {
    title: "How to Choose the Best GPU for Mining in 2026",
    slug: "choose-gpu-mining-2026",
    category: "Hardware",
    readTime: "10 min",
    difficulty: "Beginner",
    description: "A comprehensive guide to selecting the right GPU based on hashrate, power efficiency, and budget.",
    content: (
      <Content>
        <p>Choosing a mining GPU in 2026 is about <strong>efficiency</strong> (H/W) — hashrate per watt — not just raw speed.</p>
        <p className="font-medium mt-4">Top picks by budget:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Budget:</strong> RTX 4060 / RX 7600 — good efficiency at low cost</li>
          <li><strong>Mid-range:</strong> RTX 5060 Ti — excellent efficiency (93 TH/s @ 150W for Pearl)</li>
          <li><strong>High-end:</strong> RTX 5080 — great performance (200 TH/s @ 260W for Pearl)</li>
          <li><strong>Enthusiast:</strong> RTX 5090 — best raw speed, but high power draw</li>
        </ul>
        <p className="mt-3">Check our <a href="/gpus" className="text-[--accent-green] underline">GPUs page</a> for real-world benchmarks and efficiency data.</p>
      </Content>
    ),
  },
  {
    title: "PeakMiner Setup Guide: Step-by-Step for Beginners",
    slug: "peakminer-setup-guide",
    category: "Software",
    readTime: "12 min",
    difficulty: "Beginner",
    description: "Complete walkthrough of installing and configuring PeakMiner for maximum profitability.",
    content: (
      <Content>
        <p>PeakMiner is a user-friendly miner with built-in power limiting and auto-restart. Here&apos;s how to set it up:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Download</strong> PeakMiner from the official website</li>
          <li><strong>Extract</strong> to a folder (add Windows Defender exclusion)</li>
          <li><strong>Create a .bat file</strong> with your pool and wallet:<br/>
            <code className="block bg-[--bg-secondary] p-2 rounded mt-1 text-xs">peakminer.exe --algo pearlhash --pool stratum+tcp://pearl-eu2.luckypool.io:3360 --user YOUR_WALLET_ADDRESS --power-limit 260</code>
          </li>
          <li><strong>Run</strong> as administrator</li>
        </ol>
        <p className="mt-2">PeakMiner auto-starts when the PC boots and handles crashes automatically.</p>
      </Content>
    ),
  },
  {
    title: "Understanding Hashrate, Power Draw & Efficiency",
    slug: "hashrate-power-efficiency",
    category: "Basics",
    readTime: "6 min",
    difficulty: "Beginner",
    description: "Learn what hashrate means, how power draw affects profits, and why efficiency matters most.",
    content: (
      <Content>
        <p><strong>Hashrate</strong> measures how fast your GPU can mine — higher is better. For PearlHash, it&apos;s in TH/s (terahashes per second).</p>
        <p><strong>Power draw</strong> is how much electricity your GPU uses (watts). Lower power = lower electricity bill.</p>
        <p><strong>Efficiency</strong> (H/W) = hashrate / power. A higher number means more mining per dollar spent on electricity.</p>
        <div className="bg-[--bg-secondary] p-3 rounded-lg mt-3">
          <p className="font-medium">Example:</p>
          <p>RTX 5080: 200 TH/s @ 260W = <strong>769 H/W</strong><br/>
          RTX 5060 Ti: 93 TH/s @ 150W = <strong>620 H/W</strong></p>
        </div>
      </Content>
    ),
  },
  {
    title: "Power Limiting Your GPU: The Complete Guide",
    slug: "power-limiting-guide",
    category: "Hardware",
    readTime: "7 min",
    difficulty: "Intermediate",
    description: "How to reduce power consumption without sacrificing much hashrate. Save electricity and heat.",
    content: (
      <Content>
        <p>Power limiting reduces your GPU&apos;s power draw, saving electricity and lowering temperatures with only a small hashrate loss.</p>
        <p className="font-medium">General rules of thumb:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>80% power limit → ~80% hashrate, ~75% power (better efficiency)</li>
          <li>70% power limit → ~70% hashrate, ~65% power</li>
          <li>60% power limit → ~60% hashrate, ~55% power (max efficiency)</li>
        </ul>
        <p className="mt-2">PeakMiner has a built-in <code>--power-limit</code> flag. Our <a href="/calculator" className="text-[--accent-green] underline">Calculator</a> lets you experiment with different power limits.</p>
      </Content>
    ),
  },
  {
    title: "Multi-GPU Mining Setup: Tips for 2, 4 & 8 Card Rigs",
    slug: "multi-gpu-setup",
    category: "Hardware",
    readTime: "15 min",
    difficulty: "Intermediate",
    description: "Everything you need to know about building a multi-GPU rig: risers, PSU, cooling, and more.",
    content: (
      <Content>
        <p>Building a multi-GPU rig requires careful planning. Here are the essentials:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Motherboard:</strong> Needs enough PCIe slots. Use risers for spacing.</li>
          <li><strong>PSU:</strong> Total wattage = sum of all GPU power limits + 150W for CPU/mobo. A 1250W PSU handles 2-3 high-end GPUs.</li>
          <li><strong>Cooling:</strong> Leave space between cards. Open-air frames work best.</li>
          <li><strong>Software:</strong> Use <code>CUDA_VISIBLE_DEVICES</code> to assign each card, or run separate miner instances.</li>
        </ul>
      </Content>
    ),
  },
  {
    title: "Mining Pool Strategies: Solo vs PPS vs PPLNS",
    slug: "mining-pool-strategies",
    category: "Strategy",
    readTime: "9 min",
    difficulty: "Intermediate",
    description: "Compare different mining pool payout methods and choose the best one for your setup.",
    content: (
      <Content>
        <p>Mining pools combine hashrate from many miners and split rewards. The payout method matters:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>PPS</strong> (Pay Per Share) — fixed payout per share. Stable but lower returns.</li>
          <li><strong>PPLNS</strong> (Pay Per Last N Shares) — higher returns but variable. Rewards loyalty.</li>
          <li><strong>Solo</strong> — you keep 100% of the block reward if you find one, but variance is huge.</li>
        </ul>
        <p className="mt-2">Most small miners prefer PPLNS for better long-term returns.</p>
      </Content>
    ),
  },
  {
    title: "Windows vs Linux for GPU Mining: Pros & Cons",
    slug: "windows-vs-linux-mining",
    category: "Software",
    readTime: "7 min",
    difficulty: "Beginner",
    description: "Which operating system is better for mining? Compare stability, drivers, and ease of use.",
    content: (
      <Content>
        <p className="font-medium">Windows:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>✅ Easy to set up and troubleshoot</li>
          <li>✅ Better driver support for new GPUs</li>
          <li>❌ More overhead (uses RAM and CPU)</li>
          <li>❌ Windows updates can interrupt mining</li>
        </ul>
        <p className="font-medium mt-3">Linux:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>✅ Lower overhead — slightly higher hashrates</li>
          <li>✅ More stable — can run months without reboot</li>
          <li>❌ Steeper learning curve</li>
          <li>❌ Some miner tools lack Linux versions</li>
        </ul>
        <p className="mt-2"><strong>Verdict:</strong> Beginners should start with Windows. Switch to Linux if running a dedicated mining rig.</p>
      </Content>
    ),
  },
  {
    title: "How to Calculate Mining Profitability Accurately",
    slug: "calculate-profitability",
    category: "Strategy",
    readTime: "8 min",
    difficulty: "Intermediate",
    description: "Learn to factor in electricity cost, pool fees, hardware depreciation, and coin price volatility.",
    content: (
      <Content>
        <p>Accurate profitability calculation requires factoring in:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li><strong>Gross revenue</strong> — your share of the daily block reward × coin price</li>
          <li><strong>Electricity cost</strong> — power (W) × 24 hours × your kWh rate</li>
          <li><strong>Pool fees</strong> — typically 0-2% of earnings</li>
          <li><strong>Hardware depreciation</strong> — GPUs lose value over time</li>
        </ol>
        <p className="mt-2">Use our <a href="/calculator" className="text-[--accent-green] underline">Calculator</a> with live coin prices and network data for the most accurate estimates.</p>
      </Content>
    ),
  },
  {
    title: "Common Mining Issues & How to Fix Them",
    slug: "common-mining-issues",
    category: "Troubleshooting",
    readTime: "11 min",
    difficulty: "Beginner",
    description: "Fix crashes, rejected shares, high temperatures, and other common mining problems.",
    content: (
      <Content>
        <p className="font-medium">Miner crashes at startup</p>
        <p>Check Windows Defender exclusions, run as admin, update GPU drivers.</p>
        <p className="font-medium mt-3">High rejected share rate</p>
        <p>Try a different pool server (EU vs US), check your internet stability.</p>
        <p className="font-medium mt-3">GPU overheating</p>
        <p>Set a power limit (80% is a good start), improve case airflow, clean dust.</p>
        <p className="font-medium mt-3">Low hashrate</p>
        <p>Make sure you&apos;re using the right algorithm. Check if power limit is too aggressive.</p>
        <p className="font-medium mt-3">Miner shows "GPU 0 " (blank) error</p>
        <p>Use <code>CUDA_VISIBLE_DEVICES=X</code> to isolate problematic cards. Update drivers.</p>
      </Content>
    ),
  },
  {
    title: "Bitcore (BTX) Mining Guide: Setup & Profitability",
    slug: "bitcore-mining-guide",
    category: "Software",
    readTime: "9 min",
    difficulty: "Intermediate",
    description: "Complete guide to mining Bitcore (BTX) using the BTX-MatMul algorithm — pool setup, recommended GPUs, and profit tips.",
    content: (
      <Content>
        <p><strong>Bitcore (BTX)</strong> is a UTXO-based cryptocurrency that uses the <strong>BTX-MatMul</strong> algorithm — a matrix-multiplication-heavy PoW optimized for GPU mining. It offers fast transactions and low fees.</p>

        <p className="font-medium mt-4">Getting Started:</p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Get a wallet</strong> — Download the official Bitcore Core wallet or use a web wallet like Stakenet</li>
          <li><strong>Choose mining software</strong> — PeakMiner, SRBMiner, or WildRig all support BTX-MatMul</li>
          <li><strong>Join a pool</strong> — Zpool or a dedicated BTX pool (see our <a href="/pools" className="text-[--accent-green] underline">Pools page</a>)</li>
          <li><strong>Configure your miner</strong> — Set the algorithm to BTX-MatMul and point to your pool&apos;s stratum URL</li>
        </ol>

        <p className="font-medium mt-4">PeakMiner example .bat file:</p>
        <code className="block bg-[--bg-secondary] p-2 rounded mt-1 text-xs">peakminer.exe --algo btx-matmul --pool stratum+tcp://btx.mine.zpool.ca:xxxx --user YOUR_BTX_ADDRESS --power-limit 260</code>

        <p className="font-medium mt-4">Recommended GPUs for BTX:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Best overall:</strong> RTX 5090 / RTX 5080 — highest raw hashrate</li>
          <li><strong>Best efficiency:</strong> RTX 5060 Ti — excellent hashrate-per-watt</li>
          <li><strong>Best value:</strong> RTX 4070 Super — good balance of price and performance</li>
        </ul>

        <p className="mt-3">Use our <a href="/calculator?coin=btx" className="text-[--accent-green] underline">Profitability Calculator</a> to estimate your BTX mining earnings.</p>
      </Content>
    ),
  },
];

export const categories = ["All", "Basics", "Hardware", "Software", "Strategy", "Troubleshooting"];

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return tutorials.find(t => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return tutorials.map(t => t.slug);
}
