// Network hashrate data for supported coins
// Each entry: network hashrate (in same unit as GPU hashrates) + daily block reward
// Sources are checked in order: live API → cached estimate → hardcoded fallback

// Default network parameters (fallback values, updated by live API when available)
export interface NetworkInfo {
  networkHashrate: number;   // in the same unit as GPU hashrates
  dailyReward: number;       // native coin units per day
  unit: string;              // human-readable unit
  lastUpdated: string | null; // ISO date
  source: string;            // data source description
}

// For each coin, define how to fetch live data
// Each fetcher returns { networkHashrate, dailyReward } or null
const fetchers: Record<string, () => Promise<{ networkHashrate: number; dailyReward: number } | null>> = {
  // Alephium — has a public API
  blake3: async () => {
    try {
      const res = await fetch("https://backend-v2.mainnet.alephium.org/infos/network", { signal: AbortSignal.timeout(3000) });
      if (!res.ok) return null;
      const data = await res.json();
      // Currently Alephium doesn't expose network hashrate directly in this endpoint
      // Fall back to estimated value
      return null;
    } catch {
      return null;
    }
  },

  // Kaspa — has a simple public API
  kheavyhash: async () => {
    try {
      const res = await fetch("https://api.kaspa.org/info/network", { signal: AbortSignal.timeout(3000) });
      if (!res.ok) return null;
      const data = await res.json();
      const networkThs = data?.hashRate ?? 0;
      if (networkThs <= 0) return null;
      return {
        networkHashrate: networkThs * 1000, // TH/s → GH/s
        dailyReward: 8640000,
      };
    } catch {
      return null;
    }
  },

  // Ravencoin — via Ravencoin explorer
  kawpow: async () => {
    try {
      const res = await fetch("https://rvn.nownodes.io/api/v2/network/hashrate", {
        signal: AbortSignal.timeout(5000),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) return null;
      const data = await res.json();
      // Returns in GH/s, convert to MH/s
      const networkGhs = data.hashrate ?? 0;
      if (networkGhs <= 0) return null;
      return {
        networkHashrate: networkGhs * 1000, // GH/s → MH/s
        dailyReward: 3600000, // ~3.6M RVN/day
      };
    } catch {
      return null;
    }
  },

  // Ethereum Classic — via blockchair
  etchash: async () => {
    try {
      const res = await fetch("https://api.blockchair.com/ethereum-classic/stats", {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      const networkHash = data?.data?.hashrate_24h ?? 0;
      if (networkHash <= 0) return null;
      return {
        networkHashrate: networkHash / 1e6, // H/s → MH/s
        dailyReward: 108000, // ~108K ETC/day
      };
    } catch {
      return null;
    }
  },
};

// Default fallback values (used when live fetch fails)
export const defaultNetworkData: Record<string, NetworkInfo> = {
  pearlhash: {
    networkHashrate: 3700000, // TH/s — small coin, ~3.7M TH/s network
    dailyReward: 72000,
    unit: "TH/s",
    lastUpdated: null,
    source: "Estimated (no public API)",
  },
  blake3: {
    networkHashrate: 85000, // GH/s — Alephium network ~85 TH/s
    dailyReward: 225000,
    unit: "GH/s",
    lastUpdated: null,
    source: "Estimated (no public API)",
  },
  kawpow: {
    networkHashrate: 5000000, // MH/s (~5 TH/s)
    dailyReward: 3600000,
    unit: "MH/s",
    lastUpdated: null,
    source: "RVN block explorer",
  },
  kheavyhash: {
    networkHashrate: 620000, // GH/s (620 TH/s)
    dailyReward: 8640000,
    unit: "GH/s",
    lastUpdated: null,
    source: "Kaspa public API",
  },
  etchash: {
    networkHashrate: 240000000, // MH/s (~240 TH/s)
    dailyReward: 108000,
    unit: "MH/s",
    lastUpdated: null,
    source: "Blockchair ETC stats",
  },
  octopus: {
    networkHashrate: 18000000, // MH/s (~18 TH/s)
    dailyReward: 2800000,
    unit: "MH/s",
    lastUpdated: null,
    source: "Estimated (no public API)",
  },
  nexapow: {
    networkHashrate: 8000000, // MH/s (~8 TH/s)
    dailyReward: 32000000000,
    unit: "MH/s",
    lastUpdated: null,
    source: "Estimated (no public API)",
  },
};

export async function fetchLiveNetworkData(algoId: string): Promise<NetworkInfo | null> {
  const fetcher = fetchers[algoId];
  if (!fetcher) return null;

  const live = await fetcher();
  if (!live) return null;

  const def = defaultNetworkData[algoId];
  return {
    networkHashrate: live.networkHashrate,
    dailyReward: live.dailyReward,
    unit: def?.unit ?? "",
    lastUpdated: new Date().toISOString(),
    source: "Live API",
  };
}
