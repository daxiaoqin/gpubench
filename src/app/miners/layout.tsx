import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mining Software Comparison — PeakMiner vs SRBMiner vs WildRig | GPUBench.online",
  description:
    "Compare the best GPU mining software: PeakMiner, SRBMiner, WildRig, lpminer, and Gminer. Features, efficiency, pros/cons, and real hashrate benchmarks for each miner.",
  keywords: [
    "PeakMiner review",
    "SRBMiner vs WildRig",
    "best GPU mining software 2026",
    "mining software comparison",
    "PeakMiner setup",
    "WildRig tutorial",
    "GPU miner benchmark",
    "mining software Windows",
    "lpminer LuckyPool",
  ],
  openGraph: {
    title: "Mining Software Comparison — PeakMiner, SRBMiner & More",
    description: "Detailed comparison of 5 popular GPU mining software. Efficiency ratings, features, and real hashrate benchmarks.",
  },
};

export default function MinersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
