import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPU Mining Tutorials — Beginner to Advanced Guides | GPUBench.online",
  description:
    "Learn GPU mining from scratch. Step-by-step tutorials on hardware selection, software setup, power management, pool strategies, and profitability optimization.",
  keywords: [
    "GPU mining tutorial",
    "how to start GPU mining",
    "mining for beginners",
    "how to set up mining rig",
    "GPU power limit guide",
    "mining pool strategy",
    "multi GPU mining setup",
    "Windows mining guide",
    "reduce GPU power draw mining",
    "mining troubleshooting",
  ],
  openGraph: {
    title: "GPU Mining Tutorials — Learn to Mine from Scratch",
    description: "10+ comprehensive tutorials covering everything from basic concepts to advanced optimization strategies.",
  },
};

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
