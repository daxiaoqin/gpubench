import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Mineable Coin Prices — GPU Mining Coins | GPUBench.online",
  description:
    "Real-time prices, market cap, and 24h volume for mineable coins including Pearl (PRL), Kaspa (KAS), Alephium (ALPH), Ravencoin (RVN), Ethereum Classic (ETC), Conflux (CFX), and Nexa (NEXA).",
  keywords: [
    "mineable coins",
    "Pearl coin price",
    "PRL price",
    "Kaspa price",
    "KAS hashrate",
    "Alephium mining",
    "Ravencoin price",
    "Ethereum Classic mining",
    "GPU mineable cryptocurrencies",
    "best coins to mine with GPU",
  ],
  openGraph: {
    title: "Live Mineable Coin Prices & Market Data",
    description: "Track GPU-mineable coin prices in real-time. PRL, KAS, RVN, ETC, ALPH, CFX, NEXA.",
  },
};

export default function CoinsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
