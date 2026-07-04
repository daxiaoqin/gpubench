import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPU Hashrate Database — RTX 5090 to RTX 3060 Mining Benchmarks | GPUBench.online",
  description:
    "Comprehensive GPU mining hashrate database with real-world benchmarks across 7 algorithms: PearlHash, Blake3, KawPow, kHeavyHash, Etchash, Octopus, NexaPow. Compare RTX 5090, RTX 5080, RTX 5070 Ti, RTX 5060 Ti, RTX 4090 and more.",
  keywords: [
    "GPU hashrate",
    "RTX 5080 hashrate",
    "RTX 5090 mining",
    "RTX 5060 Ti hashrate",
    "GPU mining benchmark",
    "graphics card mining performance",
    "PearlHash GPU",
    "Blake3 GPU",
    "KawPow GPU hashrate",
    "most efficient mining GPU",
  ],
  openGraph: {
    title: "GPU Hashrate Database — Mining Benchmarks for Every GPU",
    description: "Real-world hashrate data for 24 GPUs across 7 algorithms. Filter, sort, and compare.",
  },
};

export default function GpusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
