import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPUBench — 显卡算力数据库 & 挖矿收益计算器 | gpubench.online",
  description:
    "最全面的显卡挖矿性能数据库。收录 NVIDIA RTX 5090/5080/5070 Ti/5060 Ti 及 AMD Radeon 等 24 张显卡在 7 种算法下的实测算力和功耗数据，实时计算挖矿收益和回本周期。",
  keywords: [
    "显卡算力",
    "显卡挖矿",
    "RTX 5080 算力",
    "RTX 5090 挖矿",
    "RTX 5060 Ti 算力",
    "挖矿收益计算器",
    "显卡功耗",
    "挖矿教程",
    "PeakMiner 设置",
    "显卡挖矿收益",
    "GPU 挖矿 2026",
  ],
  alternates: {
    canonical: "https://gpubench.online/zh",
  },
  openGraph: {
    title: "GPUBench — 显卡算力数据库 & 挖矿收益计算器",
    description: "最全面的显卡挖矿性能数据库，支持 24 张显卡、7 种算法、实时币价计算收益。",
    url: "https://gpubench.online/zh",
    siteName: "GPUBench.online",
    locale: "zh_CN",
    images: [
      {
        url: "https://gpubench.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "GPUBench.online — 显卡算力数据库 & 挖矿收益计算器",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GPUBench — 显卡算力数据库 & 挖矿收益计算器",
    description: "最全面的显卡挖矿性能数据库，支持 24 张显卡、7 种算法、实时币价计算收益。",
    images: ["https://gpubench.online/og-image.png"],
  },
  // Baidu specific meta
  other: {
    "baidu-site-verification": "", // Add your Baidu verification code here
  },
};

export default function ZhLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
