"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isZh = pathname.startsWith("/zh");

  return (
    <footer className="border-t border-[--border-color] bg-[--bg-secondary] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-[--text-muted] text-sm">
            <div className="w-6 h-6 rounded bg-[--accent-green] flex items-center justify-center font-bold text-xs">
              G
            </div>
            <span>{isZh ? "GPUBench.online — 显卡算力数据库" : "GPUBench.online — GPU Hashrate Database"}</span>
          </div>
          <div className="flex items-center gap-3 text-[--text-muted] text-xs flex-wrap justify-center">
            <a href="/benchmark" className="hover:text-[--text-primary]">{isZh ? "测速" : "Benchmark"}</a>
            <span>•</span>
            <a href="/leaderboard" className="hover:text-[--text-primary]">{isZh ? "排行榜" : "Leaderboard"}</a>
            <span>•</span>
            <a href="/tutorials" className="hover:text-[--text-primary]">{isZh ? "教程" : "Tutorials"}</a>
            <span>•</span>
            <a href="/miners" className="hover:text-[--text-primary]">{isZh ? "矿工" : "Miners"}</a>
            <span>•</span>
            <a href="/pools" className="hover:text-[--text-primary]">{isZh ? "矿池" : "Pools"}</a>
            <span>•</span>
            <a href="/zh" className="hover:text-[--text-primary]">{isZh ? "中文版" : "中文版"}</a>
            <span>•</span>
            <span>{isZh ? "实测算力数据" : "Data from real-world testing"}</span>
            <span>•</span>
            <a
              href="https://www.coingecko.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[--text-primary] underline underline-offset-2"
            >
              {isZh ? "币价来自 CoinGecko" : "Prices via CoinGecko"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
