"use client";

import { usePathname } from "next/navigation";

const enNav = [
  { href: "/", label: "Home" },
  { href: "/gpus", label: "GPUs" },
  { href: "/coins", label: "Coins" },
  { href: "/miners", label: "Miners" },
  { href: "/pools", label: "Pools" },
  { href: "/calculator", label: "Calculator" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/benchmark", label: "🏆 Benchmark" },
];

const zhNav = [
  { href: "/zh", label: "首页" },
  { href: "/zh/gpus", label: "显卡" },
  { href: "/zh/coins", label: "币种" },
  { href: "/zh/miners", label: "矿工" },
  { href: "/zh/pools", label: "矿池" },
  { href: "/zh/calculator", label: "计算器" },
  { href: "/zh/tutorials", label: "教程" },
  { href: "/zh/benchmark", label: "🏆 测速" },
];

export default function NavBar() {
  const pathname = usePathname();
  const isZh = pathname.startsWith("/zh");
  const nav = isZh ? zhNav : enNav;
  const logoHref = isZh ? "/zh" : "/";

  return (
    <nav className="border-b border-[--border-color] bg-[--bg-secondary] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href={logoHref} className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[--accent-green] flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
              G
            </div>
            <span className="font-bold text-lg text-[--text-primary] hidden sm:inline">
              GPUBench<span className="text-[--accent-green]">.online</span>
            </span>
          </a>

          {/* Nav Links */}
          <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap transition-all ${
                  pathname === item.href
                    ? "text-[--text-primary] bg-[--bg-card]"
                    : "text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--bg-card]"
                }`}
              >
                {item.label}
              </a>
            ))}
            {/* Leaderboard button */}
            <a
              href="/leaderboard"
              className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap transition-all font-medium ${
                pathname === "/leaderboard"
                  ? "text-purple-400 bg-purple-500/10"
                  : "text-purple-400/80 hover:text-purple-400 hover:bg-purple-500/10"
              }`}
            >
              {isZh ? "🏅 排行榜" : "🏅 Leaderboard"}
            </a>
            {/* Language Switcher */}
            <a
              href={isZh ? "/" : "/zh"}
              className="ml-1 sm:ml-2 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm text-[--text-muted] border border-[--border-color] hover:text-[--text-primary] hover:border-[--accent-green]/30 transition-all whitespace-nowrap"
            >
              {isZh ? "English" : "中文"}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
