"use client";

import { useState, useMemo } from "react";
import { gpus, algorithms, formatHashrate, formatNumber } from "@/lib/data";

export default function ZhGpusPage() {
  const [sortKey, setSortKey] = useState<string>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");
  const [manufacturer, setManufacturer] = useState<string>("all");
  const [algoFilter, setAlgoFilter] = useState<string>("all");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const filtered = useMemo(() => {
    let list = [...gpus];

    if (search) {
      const s = search.toLowerCase();
      list = list.filter((g) => g.name.toLowerCase().includes(s) || g.manufacturer.toLowerCase().includes(s));
    }
    if (manufacturer !== "all") {
      list = list.filter((g) => g.manufacturer.toLowerCase() === manufacturer);
    }
    if (algoFilter !== "all") {
      list = list.filter((g) => (g.hashrates[algoFilter] ?? 0) > 0);
    }

    list.sort((a, b) => {
      let av: number | string = "";
      let bv: number | string = "";
      if (sortKey === "name") {
        av = a.name;
        bv = b.name;
      } else if (sortKey === "manufacturer") {
        av = a.manufacturer;
        bv = b.manufacturer;
      } else if (sortKey === "tdp") {
        av = a.tdp;
        bv = b.tdp;
      } else if (sortKey === "price") {
        av = a.price;
        bv = b.price;
      } else if (sortKey === "releaseYear") {
        av = a.releaseYear;
        bv = b.releaseYear;
      } else if (sortKey && sortKey.startsWith("algo_")) {
        const algoId = sortKey.replace("algo_", "");
        av = a.hashrates[algoId] ?? 0;
        bv = b.hashrates[algoId] ?? 0;
      } else if (sortKey === "efficiency") {
        av = Object.values(a.hashrates).reduce((s, h) => s + (h ?? 0), 0) / a.tdp;
        bv = Object.values(b.hashrates).reduce((s, h) => s + (h ?? 0), 0) / b.tdp;
      }

      if (typeof av === "number" && typeof bv === "number") {
        return sortDir === "asc" ? av - bv : bv - av;
      }
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });

    return list;
  }, [search, manufacturer, algoFilter, sortKey, sortDir]);

  const SortIcon = ({ col }: { col: string }) => {
    if (sortKey !== col) return <span className="text-[--text-muted] ml-1 opacity-40">↕</span>;
    return <span className="ml-1">{sortDir === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">显卡数据库</h1>
        <p className="text-[--text-secondary] mt-1">
          收录 {gpus.length} 张显卡的 {algorithms.length} 种算法挖矿性能数据，支持排序和筛选。
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="搜索显卡名称..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-48"
        />
        <select value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} className="w-32">
          <option value="all">所有厂商</option>
          <option value="nvidia">NVIDIA</option>
          <option value="amd">AMD</option>
        </select>
        <select value={algoFilter} onChange={(e) => setAlgoFilter(e.target.value)} className="w-36">
          <option value="all">所有算法</option>
          {algorithms.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[--bg-card] border border-[--border-color] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-[--bg-secondary] border-b border-[--border-color]">
                <th className="text-left py-3 px-4 font-medium cursor-pointer select-none" onClick={() => handleSort("name")}>
                  显卡 <SortIcon col="name" />
                </th>
                <th className="text-left py-3 px-4 font-medium cursor-pointer select-none" onClick={() => handleSort("manufacturer")}>
                  厂商 <SortIcon col="manufacturer" />
                </th>
                {algorithms.map((algo) => (
                  <th key={algo.id} className="text-right py-3 px-3 font-medium cursor-pointer select-none text-xs" onClick={() => handleSort(`algo_${algo.id}`)}>
                    {algo.symbol} <SortIcon col={`algo_${algo.id}`} />
                  </th>
                ))}
                <th className="text-right py-3 px-4 font-medium cursor-pointer select-none" onClick={() => handleSort("tdp")}>
                  功耗 <SortIcon col="tdp" />
                </th>
                <th className="text-right py-3 px-4 font-medium cursor-pointer select-none" onClick={() => handleSort("efficiency")}>
                  能效 <SortIcon col="efficiency" />
                </th>
                <th className="text-right py-3 px-4 font-medium cursor-pointer select-none" onClick={() => handleSort("price")}>
                  参考价 <SortIcon col="price" />
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((gpu) => {
                const totalHash = Object.values(gpu.hashrates).reduce((s, h) => s + (h ?? 0), 0);
                const efficiency =
                  gpu.tdp > 0
                    ? (totalHash / gpu.tdp).toFixed(1)
                    : "—";

                return (
                  <tr key={gpu.id} className="border-b border-[--border-color] hover:bg-[--bg-card-hover] transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium">{gpu.name}</div>
                      <div className="text-xs text-[--text-muted]">{gpu.releaseYear}年</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs px-2 py-0.5 rounded bg-[--bg-secondary]">
                        {gpu.manufacturer}
                      </span>
                    </td>
                    {algorithms.map((algo) => (
                      <td key={algo.id} className="py-3 px-3 text-right font-mono text-xs">
                        {(gpu.hashrates[algo.id] ?? 0) > 0
                          ? formatHashrate(gpu.hashrates[algo.id]!, algo.unit)
                          : "—"}
                      </td>
                    ))}
                    <td className="py-3 px-4 text-right font-mono">{gpu.tdp}W</td>
                    <td className="py-3 px-4 text-right font-mono text-[--accent-green]">{efficiency}</td>
                    <td className="py-3 px-4 text-right font-mono">${gpu.price.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-[--text-secondary]">
          没有找到匹配的显卡。
        </div>
      )}
    </div>
  );
}
