"use client";

const tutorials = [
  {
    title: "What Is GPU Mining? A Complete Beginner's Guide",
    slug: "what-is-gpu-mining",
    category: "Basics",
    readTime: "8 min",
    description: "Learn how GPU mining works, what you need to get started, and how much you can earn.",
    difficulty: "Beginner",
  },
  {
    title: "How to Choose the Best GPU for Mining in 2026",
    slug: "choose-gpu-mining-2026",
    category: "Hardware",
    readTime: "10 min",
    description: "A comprehensive guide to selecting the right GPU based on hashrate, power efficiency, and budget.",
    difficulty: "Beginner",
  },
  {
    title: "PeakMiner Setup Guide: Step-by-Step for Beginners",
    slug: "peakminer-setup-guide",
    category: "Software",
    readTime: "12 min",
    description: "Complete walkthrough of installing and configuring PeakMiner for maximum profitability.",
    difficulty: "Beginner",
  },
  {
    title: "Understanding Hashrate, Power Draw & Efficiency",
    slug: "hashrate-power-efficiency",
    category: "Basics",
    readTime: "6 min",
    description: "Learn what hashrate means, how power draw affects profits, and why efficiency matters most.",
    difficulty: "Beginner",
  },
  {
    title: "Power Limiting Your GPU: The Complete Guide",
    slug: "power-limiting-guide",
    category: "Hardware",
    readTime: "7 min",
    description: "How to reduce power consumption without sacrificing much hashrate. Save electricity and heat.",
    difficulty: "Intermediate",
  },
  {
    title: "Multi-GPU Mining Setup: Tips for 2, 4 & 8 Card Rigs",
    slug: "multi-gpu-setup",
    category: "Hardware",
    readTime: "15 min",
    description: "Everything you need to know about building a multi-GPU mining rig: risers, PSU, cooling, and more.",
    difficulty: "Intermediate",
  },
  {
    title: "Mining Pool Strategies: Solo vs PPS vs PPLNS",
    slug: "mining-pool-strategies",
    category: "Strategy",
    readTime: "9 min",
    description: "Compare different mining pool payout methods and choose the best one for your setup.",
    difficulty: "Intermediate",
  },
  {
    title: "Windows vs Linux for GPU Mining: Pros & Cons",
    slug: "windows-vs-linux-mining",
    category: "Software",
    readTime: "7 min",
    description: "Which operating system is better for mining? Compare stability, drivers, and ease of use.",
    difficulty: "Beginner",
  },
  {
    title: "How to Calculate Mining Profitability Accurately",
    slug: "calculate-profitability",
    category: "Strategy",
    readTime: "8 min",
    description: "Learn to factor in electricity cost, pool fees, hardware depreciation, and coin price volatility.",
    difficulty: "Intermediate",
  },
  {
    title: "Common Mining Issues & How to Fix Them",
    slug: "common-mining-issues",
    category: "Troubleshooting",
    readTime: "11 min",
    description: "Fix crashes, rejected shares, high temperatures, and other common mining problems.",
    difficulty: "Beginner",
  },
];

const categories = ["All", "Basics", "Hardware", "Software", "Strategy", "Troubleshooting"];

export default function TutorialsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Mining Tutorials</h1>
        <p className="text-[--text-secondary] mt-1">
          Step-by-step guides for beginners and experienced miners alike. Click any tutorial to read more.
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
          <a
            key={t.slug}
            href={`/tutorials`}
            className="group bg-[--bg-card] border border-[--border-color] rounded-xl p-5 hover:bg-[--bg-card-hover] hover:border-[--accent-green]/30 transition-all block"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-[--accent-green]/10 text-[--accent-green]">
                {t.category}
              </span>
              <span className="text-xs text-[--text-muted]">{t.readTime}</span>
              <span className="text-xs text-[--text-muted] ml-auto">{t.difficulty}</span>
            </div>
            <h3 className="font-semibold group-hover:text-[--accent-green] transition-colors mb-2">
              {t.title}
            </h3>
            <p className="text-sm text-[--text-secondary]">{t.description}</p>
          </a>
        ))}
      </div>

      <div className="mt-12 bg-[--bg-card] border border-[--border-color] rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-4">📚 Tutorial Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[--bg-secondary] rounded-lg p-4">
            <h3 className="font-medium mb-2">🟢 Basics</h3>
            <p className="text-sm text-[--text-secondary]">Start here if you&apos;re new to mining. Learn the fundamentals.</p>
          </div>
          <div className="bg-[--bg-secondary] rounded-lg p-4">
            <h3 className="font-medium mb-2">🔧 Hardware</h3>
            <p className="text-sm text-[--text-secondary]">GPU selection, rig building, power management, and cooling.</p>
          </div>
          <div className="bg-[--bg-secondary] rounded-lg p-4">
            <h3 className="font-medium mb-2">💻 Software</h3>
            <p className="text-sm text-[--text-secondary]">Miner setup, OS choice, driver configuration, and automation.</p>
          </div>
          <div className="bg-[--bg-secondary] rounded-lg p-4">
            <h3 className="font-medium mb-2">📊 Strategy</h3>
            <p className="text-sm text-[--text-secondary]">Profit optimization, pool selection, and coin switching.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
