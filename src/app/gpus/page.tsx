"use client";

import { useState, useMemo } from "react";
import { gpus, algorithms, formatHashrate, getAlgorithmName } from "@/lib/data";

type SortKey = "name" | "tdp" | "price" | "efficiency" | string;
type SortDir = "asc" | "desc";

export default function GpusPage() {
  const [selectedAlgo, setSelectedAlgo] = useState("pearlhash");
  const [manufacturer, setManufacturer] = useState<"all" | "NVIDIA" | "AMD">("all");
  const [sortKey, setSortKey] = useState<SortKey>("efficiency");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [search, setSearch] = useState("");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const sorted = useMemo(() => {
    let filtered = [...gpus];

    if (manufacturer !== "all") {
      filtered = filtered.filter((g) => g.manufacturer === manufacturer);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter((g) => g.name.toLowerCase().includes(q));
    }

    filtered.sort((a, b) => {
      let va: number | string = 0;
      let vb: number | string = 0;

      if (sortKey === "name") {
        va = a.name;
        vb = b.name;
        return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      if (sortKey === "tdp") {
        va = a.tdp;
        vb = b.tdp;
      } else if (sortKey === "price") {
        va = a.price;
        vb = b.price;
      } else if (sortKey === "efficiency") {
        const ha = a.hashrates[selectedAlgo] ?? 0;
        const hb = b.hashrates[selectedAlgo] ?? 0;
        va = a.tdp > 0 ? (ha / a.tdp) * 1000 : 0;
        vb = b.tdp > 0 ? (hb / b.tdp) * 1000 : 0;
      } else {
        va = a.hashrates[selectedAlgo] ?? 0;
        vb = b.hashrates[selectedAlgo] ?? 0;
      }

      return sortDir === "asc" ? (va as number) - (vb as number) : (vb as number) - (va as number);
    });

    return filtered;
  }, [selectedAlgo, manufacturer, sortKey, sortDir, search]);

  const algo = algorithms.find((a) => a.id === selectedAlgo);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">GPU Hashrate Database</h1>
        <p className="text-[--text-secondary] mt-1">
          Real-world tested hashrates across {algorithms.length} algorithms. Click column headers to sort.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Algorithm selector */}
        <div className="flex items-center gap-2 bg-[--bg-card] border border-[--border-color] rounded-xl px-3 py-1.5">
          <span className="text-xs text-[--text-muted]">Algorithm:</span>
          <select
            value={selectedAlgo}
            onChange={(e) => setSelectedAlgo(e.target.value)}
            className="bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer py-1"
          >
            {algorithms.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name} ({a.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Manufacturer filter */}
        <div className="flex items-center gap-2 bg-[--bg-card] border border-[--border-color] rounded-xl px-3 py-1.5">
          <span className="text-xs text-[--text-muted]">Brand:</span>
          <select
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value as any)}
            className="bg-transparent border-none text-sm font-medium focus:outline-none cursor-pointer py-1"
          >
            <option value="all">All</option>
            <option value="NVIDIA">NVIDIA</option>
            <option value="AMD">AMD</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search GPU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[--bg-card] border border-[--border-color] rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[--accent-green] transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[--border-color]">
        <table className="w-full text-sm table-sortable">
          <thead>
            <tr className="bg-[--bg-secondary] border-b border-[--border-color]">
              <th
                className="text-left px-4 py-3 font-medium text-[--text-muted] text-xs uppercase tracking-wider cursor-pointer hover:text-[--accent-green]"
                onClick={() => handleSort("name")}
              >
                GPU {sortKey === "name" ? (sortDir === "asc" ? "↑" : "↓") : ""}
              </th>
              <th
                className="text-left px-4 py-3 font-medium text-[--text-muted] text-xs uppercase tracking-wider cursor-pointer hover:text-[--accent-green]"
                onClick={() => handleSort(selectedAlgo)}
              >
                {algo?.name ?? "Hashrate"} ({algo?.unit ?? ""}) {sortKey === selectedAlgo ? (sortDir === "asc" ? "↑" : "↓") : ""}
              </th>
              {algorithms.filter(a => a.id !== selectedAlgo).slice(0, 4).map((a) => (
                <th
                  key={a.id}
                  className="text-left px-4 py-3 font-medium text-[--text-muted] text-xs uppercase tracking-wider hidden md:table-cell"
                >
                  {a.symbol}
                </th>
              ))}
              <th
                className="text-left px-4 py-3 font-medium text-[--text-muted] text-xs uppercase tracking-wider cursor-pointer hover:text-[--accent-green] hidden sm:table-cell"
                onClick={() => handleSort("tdp")}
              >
                TDP {sortKey === "tdp" ? (sortDir === "asc" ? "↑" : "↓") : ""}
              </th>
              <th
                className="text-left px-4 py-3 font-medium text-[--text-muted] text-xs uppercase tracking-wider cursor-pointer hover:text-[--accent-green]"
                onClick={() => handleSort("efficiency")}
              >
                Eff. {sortKey === "efficiency" ? (sortDir === "asc" ? "↑" : "↓") : ""}
              </th>
              <th
                className="text-left px-4 py-3 font-medium text-[--text-muted] text-xs uppercase tracking-wider cursor-pointer hover:text-[--accent-green] hidden md:table-cell"
                onClick={() => handleSort("price")}
              >
                Price {sortKey === "price" ? (sortDir === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="text-left px-4 py-3 font-medium text-[--text-muted] text-xs uppercase tracking-wider hidden lg:table-cell">
                Memory
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-12 text-[--text-muted]">
                  No GPUs match your filters.
                </td>
              </tr>
            )}
            {sorted.map((gpu, i) => {
              const hash = gpu.hashrates[selectedAlgo] ?? 0;
              const efficiency = gpu.tdp > 0 ? (hash / gpu.tdp) * 1000 : 0;
              return (
                <tr
                  key={gpu.id}
                  className={`border-b border-[--border-color] hover:bg-[--bg-card-hover] transition-colors ${
                    i % 2 === 0 ? "bg-[--bg-card]" : "bg-[--bg-secondary]"
                  }`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        gpu.manufacturer === "NVIDIA"
                          ? "bg-green-900/30 text-green-400"
                          : "bg-red-900/30 text-red-400"
                      }`}>
                        {gpu.manufacturer === "NVIDIA" ? "N" : "A"}
                      </span>
                      <span className="font-medium">{gpu.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono font-medium text-[--accent-green]">
                    {formatHashrate(hash, algo?.unit ?? "")}
                  </td>
                  {algorithms.filter(a => a.id !== selectedAlgo).slice(0, 4).map((a) => (
                    <td key={a.id} className="px-4 py-3 font-mono text-[--text-secondary] hidden md:table-cell">
                      {formatHashrate(gpu.hashrates[a.id] ?? 0, a.unit)}
                    </td>
                  ))}
                  <td className="px-4 py-3 font-mono text-[--text-secondary] hidden sm:table-cell">
                    {gpu.tdp}W
                  </td>
                  <td className="px-4 py-3 font-mono">
                    <span className={efficiency > 500 ? "text-[--accent-green]" : "text-[--text-secondary]"}>
                      {efficiency.toFixed(0)}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[--text-secondary] hidden md:table-cell">
                    ${gpu.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-[--text-muted] text-xs hidden lg:table-cell">
                    {gpu.memory}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[--text-muted] mt-4">
        * Hashrates are from real-world testing. Your results may vary based on cooling, power limits, and silicon lottery.
        GPU prices are approximate street prices in USD.
      </p>
    </div>
  );
}
