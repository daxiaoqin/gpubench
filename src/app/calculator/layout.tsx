import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPU Mining Profitability Calculator — Estimate Daily Earnings | GPUBench.online",
  description:
    "Calculate GPU mining profitability in real-time. Select your GPU, algorithm, power limit, and electricity cost to estimate daily gross revenue, net profit, monthly earnings, and ROI. Live CoinGecko prices.",
  keywords: [
    "GPU mining calculator",
    "mining profitability calculator",
    "RTX 5080 mining profit",
    "RTX 5090 mining profit",
    "GPU mining ROI calculator",
    "how much can I make mining",
    "mining electricity cost calculator",
    "PeakMiner profitability",
    "PearlHash mining calculator",
  ],
  openGraph: {
    title: "GPU Mining Profitability Calculator — Free & Real-Time",
    description: "Estimate daily mining profit for any GPU-algorithm combination. Live prices via CoinGecko.",
  },
};

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "GPU Mining Profitability Calculator",
    url: "https://gpubench.online/calculator",
    applicationCategory: "UtilityApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    description:
      "Calculate GPU mining profitability based on hashrate, power draw, electricity cost, and live coin prices via CoinGecko.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
