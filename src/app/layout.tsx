import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "GPUBench — GPU Hashrate Database & Mining Calculator",
  description:
    "Real-world GPU benchmark data across mining algorithms. Compare hashrates, efficiency, and profitability for RTX 50/40/30 series and AMD Radeon GPUs.",
  keywords: [
    "GPU hashrate",
    "mining calculator",
    "RTX 5080 hashrate",
    "RTX 5090 mining",
    "PearlHash",
    "Blake3",
    "KawPow",
    "GPU benchmark",
    "cryptocurrency mining",
    "GPU profitability",
    "PeakMiner",
    "mining pool",
    "GPU mining tutorial",
  ],
  openGraph: {
    title: "GPUBench — GPU Hashrate Database & Mining Calculator",
    description:
      "Real-world GPU benchmark data across mining algorithms. Find the most profitable GPU for your setup.",
    type: "website",
  },
  verification: {
    google: "googlee0da5c4d8d31ab16",
    yandex: "cdbd4e9f85b3b012",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GPUBench.online",
    alternateName: "GPU Hashrate Database & Mining Calculator",
    url: "https://gpubench.online",
    description:
      "Real-world GPU benchmark data across mining algorithms. Compare hashrates, efficiency, and profitability for RTX 50/40/30 series and AMD Radeon GPUs.",
    inLanguage: ["en", "zh"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://gpubench.online/gpus?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Suspense fallback={<div className="h-16 bg-[--bg-secondary] border-b border-[--border-color]" />}>
          <NavBar />
        </Suspense>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="border-t border-[--border-color] bg-[--bg-secondary] mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-[--text-muted] text-sm">
                <div className="w-6 h-6 rounded bg-[--accent-green] flex items-center justify-center font-bold text-xs">
                  G
                </div>
                <span>GPUBench.online — GPU Hashrate Database</span>
              </div>
              <div className="flex items-center gap-3 text-[--text-muted] text-xs flex-wrap justify-center">
                <a href="/benchmark" className="hover:text-[--text-primary]">Benchmark</a>
                <span>•</span>
                <a href="/leaderboard" className="hover:text-[--text-primary]">Leaderboard</a>
                <span>•</span>
                <a href="/tutorials" className="hover:text-[--text-primary]">Tutorials</a>
                <span>•</span>
                <a href="/miners" className="hover:text-[--text-primary]">Miners</a>
                <span>•</span>
                <a href="/pools" className="hover:text-[--text-primary]">Pools</a>
                <span>•</span>
                <a href="/zh" className="hover:text-[--text-primary]">中文版</a>
                <span>•</span>
                <span>Data from real-world testing</span>
                <span>•</span>
                <span>Prices via CoinGecko</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
