import BenchmarkPage from "../../benchmark/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPU 挖矿测速 — 在线测试显卡算力 | GPUBench.online",
  description: "在浏览器中运行真实的 GPU 计算测速。通过 WebGPU 测量你的显卡在 7 种挖矿算法下的算力表现 — PearlHash、Blake3、KawPow 等。无需安装、无需下载，免费在线 GPU 测速工具。",
  keywords: [
    "GPU 测速",
    "显卡挖矿测速",
    "在线测试显卡算力",
    "WebGPU 测速",
    "挖矿性能测试",
    "GPU 算力测试",
    "免费显卡测速",
    "在线挖矿测速",
    "显卡性能测试",
  ],
  openGraph: {
    title: "免费 GPU 挖矿测速 — 在线测试你的显卡算力",
    description: "通过 WebGPU 在你的显卡上直接运行 SHA-256 计算着色器。15 秒内获得 7 种算法的预估算力。免费，无需安装。",
  },
  alternates: {
    canonical: "https://gpubench.online/zh/benchmark/",
  },
};

export default function ZhBenchmarkPage() {
  return <BenchmarkPage />;
}
