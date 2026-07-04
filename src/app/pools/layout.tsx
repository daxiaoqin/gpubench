import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mining Pool Comparison — Fees, Payouts & Server Locations | GPUBench.online",
  description:
    "Compare top mining pools for GPU mining: LuckyPool, F2Pool, Poolin, ViaBTC, WoolyPooly. Compare fees (0.5%-2.5%), payout methods (PPS/PPLNS), and server locations.",
  keywords: [
    "mining pool comparison",
    "best mining pool for GPU",
    "LuckyPool review",
    "F2Pool fee",
    "PPS vs PPLNS mining pool",
    "PearlHash mining pool",
    "KawPow pool",
    "mining pool fees comparison",
    "best pool for small miners",
  ],
  openGraph: {
    title: "Mining Pool Comparison — Find the Best Pool for Your GPU",
    description: "Compare 6 mining pools by fee, payout method, algorithm support, and server locations.",
  },
};

export default function PoolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
