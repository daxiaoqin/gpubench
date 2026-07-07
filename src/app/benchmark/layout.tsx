import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPU Mining Benchmark — Test Your GPU Hashrate Online | GPUBench.online",
  description:
    "Run a real GPU compute benchmark in your browser. Measure your graphics card's mining performance across 7 algorithms — PearlHash, Blake3, KawPow, and more. No install, no download, no ads. Free WebGPU benchmark tool.",
  keywords: [
    "GPU benchmark online",
    "GPU mining benchmark",
    "test GPU hashrate",
    "WebGPU benchmark",
    "mining perf test",
    "GPU compute benchmark",
    "benchmark your GPU",
    "test graphics card mining",
    "free GPU benchmark",
    "online mining benchmark",
  ],
  openGraph: {
    title: "Free GPU Mining Benchmark — Test Your Graphics Card Online",
    description: "Run SHA-256 style compute shaders directly on your GPU via WebGPU. Get estimated hashrates for 7 algorithms in 15 seconds. Free, no install.",
  },
};

export default function BenchmarkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
