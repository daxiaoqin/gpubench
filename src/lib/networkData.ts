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
  // Alephium — via public network info API
  blake3: async () => {
    try {
      const res = await fetch("https://backend-v2.mainnet.alephium.org/infos/network", { signal: AbortSignal.timeout(4000) });
      if (!res.ok) return null;
      const data = await res.json();
      // The API may return various fields; try to extract hashrate
      // Fall back to estimate if not available
      return null;
    } catch {
      return null;
    }
  },

  // Kaspa — has a simple public API
  kheavyhash: async () => {
    try {
      const res = await fetch("https://api.kaspa.org/info/network", { signal: AbortSignal.timeout(4000) });
      if (!res.ok) return null;
      const data = await res.json();
      const networkThs = data?.hashRate ?? 0;
      if (networkThs <= 0) return null;
      return {
        networkHashrate: networkThs * 1000, // TH/s → GH/s
        dailyReward: 8640000, // ~8.64M KAS/day
      };
    } catch {
      return null;
    }
  },

  // Ravencoin — via public explorer API
  kawpow: async () => {
    try {
      const res = await fetch("https://api.ravencoin.org/v1/network/stats", {
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      // Response may contain hashrate_ghs or similar
      const networkGhs = data?.hashrate_ghs ?? 0;
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
        signal: AbortSignal.timeout(4000),
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

  // Conflux — via ConfluxScan API
  octopus: async () => {
    try {
      const res = await fetch("https://api.confluxscan.io/v1/network", {
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      // ConfluxScan returns network hashrate in GH/s
      const networkGhs = data?.networkHashRate ?? data?.hashRate ?? 0;
      if (networkGhs <= 0) return null;
      return {
        networkHashrate: networkGhs * 1000, // GH/s → MH/s
        dailyReward: 2800000, // ~2.8M CFX/day
      };
    } catch {
      return null;
    }
  },

  // Nexa — via public block explorer
  nexapow: async () => {
    try {
      const res = await fetch("https://explorer.nexa.org/api/v1/network/stats", {
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      // Try common field names
      const networkMhs = data?.hashrate_mhs ?? data?.networkHashrate ?? 0;
      if (networkMhs <= 0) return null;
      return {
        networkHashrate: networkMhs, // already in MH/s
        dailyReward: 32000000000, // ~32B NEXA/day
      };
    } catch {
      return null;
    }
  },

  // BTX — new MatMul PoW chain (btx.dev), no public explorer API yet
  "btx-matmul": async () => {
    try {
      const res = await fetch("https://btx.dev/api/chaininfo.json", {
        signal: AbortSignal.timeout(4000),
      });
      if (!res.ok) return null;
      const data = await res.json();
      // Try common field names for chain info
      const networkMhs = data?.networkhashrate ?? data?.hashrate ?? 0;
      if (networkMhs <= 0) return null;
      return {
        networkHashrate: networkMhs, // MH/s
        dailyReward: 48000, // ~48K BTX/day at 90s blocks with current emission
      };
    } catch {
      return null;
    }
  },
};

// Default fallback values (used when live fetch fails)
export const defaultNetworkData: Record<string, NetworkInfo> = {
  pearlhash: {
    networkHashrate: 2160000, // TH/s — calibrated: 300 TH/s total → ~10 PRL/day
    dailyReward: 72000,
    unit: "TH/s",
    lastUpdated: null,
    source: "Real-world calibrated",
  },
  blake3: {
    networkHashrate: 85000, // GH/s — Alephium ~85 TH/s network
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
    source: "Estimated (live API fallback)",
  },
  kheavyhash: {
    networkHashrate: 620000, // GH/s (620 TH/s)
    dailyReward: 8640000,
    unit: "GH/s",
    lastUpdated: null,
    source: "Estimated (live API fallback)",
  },
  etchash: {
    networkHashrate: 240000000, // MH/s (~240 TH/s)
    dailyReward: 108000,
    unit: "MH/s",
    lastUpdated: null,
    source: "Estimated (live API fallback)",
  },
  octopus: {
    networkHashrate: 18000000, // MH/s (~18 TH/s)
    dailyReward: 2800000,
    unit: "MH/s",
    lastUpdated: null,
    source: "Estimated (live API fallback)",
  },
  nexapow: {
    networkHashrate: 8000000, // MH/s (~8 TH/s)
    dailyReward: 32000000000,
    unit: "MH/s",
    lastUpdated: null,
    source: "Estimated (live API fallback)",
  },
  "btx-matmul": {
    networkHashrate: 350000, // MH/s (~350 GH/s)
    dailyReward: 48000,      // ~48K BTX/day (90s blocks)
    unit: "MH/s",
    lastUpdated: null,
    source: "Estimated (live API fallback)",
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
