import type { Metadata } from "next";
import "./globals.css";

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
  ],
  openGraph: {
    title: "GPUBench — GPU Hashrate Database & Mining Calculator",
    description:
      "Real-world GPU benchmark data across mining algorithms. Find the most profitable GPU for your setup.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {/* Navigation */}
        <nav className="border-b border-[--border-color] bg-[--bg-secondary] sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <a href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-[--accent-green] flex items-center justify-center font-bold text-sm group-hover:scale-105 transition-transform">
                  G
                </div>
                <span className="font-bold text-lg text-[--text-primary]">
                  GPUBench<span className="text-[--accent-green]">.online</span>
                </span>
              </a>

              {/* Nav Links */}
              <div className="flex items-center gap-1 sm:gap-2">
                <a
                  href="/"
                  className="px-3 py-2 rounded-lg text-sm text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--bg-card] transition-all"
                >
                  Home
                </a>
                <a
                  href="/gpus"
                  className="px-3 py-2 rounded-lg text-sm text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--bg-card] transition-all"
                >
                  GPUs
                </a>
                <a
                  href="/coins"
                  className="px-3 py-2 rounded-lg text-sm text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--bg-card] transition-all"
                >
                  Coins
                </a>
                <a
                  href="/calculator"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[--accent-green] text-black hover:bg-green-400 transition-all"
                >
                  Calculator
                </a>
              </div>
            </div>
          </div>
        </nav>

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
              <div className="flex items-center gap-4 text-[--text-muted] text-xs">
                <span>Data sourced from real-world testing</span>
                <span>•</span>
                <span>Prices update every 5 min via CoinGecko</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
