"use client";

import { useState } from "react";
import Link from "next/link";
import { zhTutorials, zhCategories } from "@/lib/zh-tutorial-content";

const badgeColors: Record<string, string> = {
  "基础": "bg-blue-500/10 text-blue-400",
  "硬件": "bg-purple-500/10 text-purple-400",
  "软件": "bg-emerald-500/10 text-emerald-400",
  "策略": "bg-orange-500/10 text-orange-400",
  "故障排除": "bg-rose-500/10 text-rose-400",
};

export default function ZhTutorialsPage() {
  const [filter, setFilter] = useState("全部");

  const filtered = filter === "全部" ? zhTutorials : zhTutorials.filter((t) => t.category === filter);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">挖矿教程</h1>
        <p className="text-[--text-secondary] max-w-xl mx-auto">
          从入门到精通，手把手教你显卡挖矿。点击任意教程开始阅读。
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {zhCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-lg text-sm border transition-all ${
              filter === cat
                ? "bg-[--accent-green] text-black border-[--accent-green] font-medium"
                : "bg-[--bg-card] border-[--border-color] text-[--text-secondary] hover:text-[--text-primary] hover:border-[--accent-green]/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tutorial cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((t) => (
          <Link
            key={t.slug}
            href={`/zh/tutorials/${t.slug}`}
            className="group bg-[--bg-card] border border-[--border-color] rounded-xl p-5 hover:bg-[--bg-card-hover] hover:border-[--accent-green]/30 transition-all text-left w-full"
          >
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeColors[t.category]}`}>
                {t.category}
              </span>
              <span className="text-xs text-[--text-muted]">{t.readTime}</span>
              <span className="text-xs text-[--text-muted]">•</span>
              <span className="text-xs text-[--text-muted]">{t.difficulty}</span>
            </div>
            <h3 className="font-semibold text-base mb-1 group-hover:text-[--accent-green] transition-colors">
              {t.title}
            </h3>
            <p className="text-sm text-[--text-secondary]">{t.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
