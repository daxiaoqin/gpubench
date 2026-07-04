import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gpubench.online";

  // English pages
  const enPages = [
    { path: "", priority: 1.0, changeFreq: "daily" as const },
    { path: "/gpus", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/coins", priority: 0.8, changeFreq: "hourly" as const },
    { path: "/calculator", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/miners", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/pools", priority: 0.7, changeFreq: "weekly" as const },
    { path: "/tutorials", priority: 0.8, changeFreq: "weekly" as const },
  ];

  // Chinese pages
  const zhPages = [
    { path: "/zh", priority: 0.6, changeFreq: "daily" as const },
    { path: "/zh/gpus", priority: 0.6, changeFreq: "weekly" as const },
    { path: "/zh/coins", priority: 0.5, changeFreq: "hourly" as const },
    { path: "/zh/calculator", priority: 0.6, changeFreq: "weekly" as const },
    { path: "/zh/miners", priority: 0.5, changeFreq: "weekly" as const },
    { path: "/zh/pools", priority: 0.5, changeFreq: "weekly" as const },
    { path: "/zh/tutorials", priority: 0.6, changeFreq: "weekly" as const },
  ];

  // GPU detail pages (hashrate references make these valuable)
  const gpuDetailPaths = [
    { path: "/gpus#rtx-5090", priority: 0.6 },
    { path: "/gpus#rtx-5080", priority: 0.6 },
    { path: "/gpus#rtx-5070-ti", priority: 0.5 },
    { path: "/gpus#rtx-5060-ti", priority: 0.5 },
  ];

  const allPages = [...enPages, ...zhPages];

  return allPages.map(({ path, priority, changeFreq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  }));
}
