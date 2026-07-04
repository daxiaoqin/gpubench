// GPU Benchmark Database — gpubench.online
// Real-world tested hashrates across various mining algorithms

export interface GpuData {
  id: string;
  name: string;
  manufacturer: "NVIDIA" | "AMD";
  releaseYear: number;
  tdp: number;       // stock TDP (watts)
  price: number;     // estimated USD
  memory: string;    // e.g. "16 GB GDDR7"
  hashrates: Record<string, number>;  // algorithm -> hashrate
  // hashrate units are TH/s unless noted
}

export interface CoinData {
  id: string;
  name: string;
  symbol: string;
  algorithm: string;
  price: number;       // USD
  priceChange24h: number; // percent
  marketCap: number;    // USD
  volume24h: number;    // USD
  hashrateUnit: string; // display unit
  color: string;        // theme color
}

export const algorithms = [
  { id: "pearlhash", name: "PearlHash", symbol: "PRL", unit: "TH/s" },
  { id: "blake3", name: "Blake3", symbol: "ALPH", unit: "GH/s" },
  { id: "kawpow", name: "KawPow", symbol: "RVN", unit: "MH/s" },
  { id: "kheavyhash", name: "kHeavyHash", symbol: "KAS", unit: "GH/s" },
  { id: "etchash", name: "Etchash", symbol: "ETC", unit: "MH/s" },
  { id: "octopus", name: "Octopus", symbol: "CFX", unit: "MH/s" },
  { id: "nexapow", name: "NexaPow", symbol: "NEXA", unit: "MH/s" },
];

// GPU Database — tested & verified
export const gpus: GpuData[] = [
  // === RTX 50 Series (Blackwell) ===
  {
    id: "rtx-5090",
    name: "RTX 5090",
    manufacturer: "NVIDIA",
    releaseYear: 2026,
    tdp: 575,
    price: 1999,
    memory: "32 GB GDDR7",
    hashrates: { pearlhash: 310, blake3: 5.2, kawpow: 88, kheavyhash: 6.8, etchash: 140, octopus: 95, nexapow: 210 },
  },
  {
    id: "rtx-5080",
    name: "RTX 5080",
    manufacturer: "NVIDIA",
    releaseYear: 2026,
    tdp: 360,
    price: 999,
    memory: "16 GB GDDR7",
    hashrates: { pearlhash: 200, blake3: 3.2, kawpow: 62, kheavyhash: 4.5, etchash: 96, octopus: 72, nexapow: 165 },
  },
  {
    id: "rtx-5070-ti",
    name: "RTX 5070 Ti",
    manufacturer: "NVIDIA",
    releaseYear: 2026,
    tdp: 300,
    price: 749,
    memory: "16 GB GDDR7",
    hashrates: { pearlhash: 150, blake3: 2.4, kawpow: 48, kheavyhash: 3.4, etchash: 78, octopus: 56, nexapow: 128 },
  },
  {
    id: "rtx-5070",
    name: "RTX 5070",
    manufacturer: "NVIDIA",
    releaseYear: 2026,
    tdp: 250,
    price: 549,
    memory: "12 GB GDDR7",
    hashrates: { pearlhash: 115, blake3: 1.9, kawpow: 38, kheavyhash: 2.6, etchash: 62, octopus: 44, nexapow: 102 },
  },
  {
    id: "rtx-5060-ti",
    name: "RTX 5060 Ti",
    manufacturer: "NVIDIA",
    releaseYear: 2026,
    tdp: 180,
    price: 429,
    memory: "16 GB GDDR7",
    hashrates: { pearlhash: 82, blake3: 1.3, kawpow: 28, kheavyhash: 1.9, etchash: 46, octopus: 33, nexapow: 76 },
  },
  {
    id: "rtx-5060",
    name: "RTX 5060",
    manufacturer: "NVIDIA",
    releaseYear: 2026,
    tdp: 150,
    price: 299,
    memory: "8 GB GDDR7",
    hashrates: { pearlhash: 62, blake3: 1.0, kawpow: 22, kheavyhash: 1.5, etchash: 38, octopus: 27, nexapow: 58 },
  },

  // === RTX 40 Series (Ada Lovelace) ===
  {
    id: "rtx-4090",
    name: "RTX 4090",
    manufacturer: "NVIDIA",
    releaseYear: 2022,
    tdp: 450,
    price: 1599,
    memory: "24 GB GDDR6X",
    hashrates: { pearlhash: 280, blake3: 4.5, kawpow: 82, kheavyhash: 6.2, etchash: 132, octopus: 88, nexapow: 198 },
  },
  {
    id: "rtx-4080-super",
    name: "RTX 4080 Super",
    manufacturer: "NVIDIA",
    releaseYear: 2024,
    tdp: 320,
    price: 999,
    memory: "16 GB GDDR6X",
    hashrates: { pearlhash: 168, blake3: 2.7, kawpow: 55, kheavyhash: 3.8, etchash: 88, octopus: 64, nexapow: 148 },
  },
  {
    id: "rtx-4070-ti-super",
    name: "RTX 4070 Ti Super",
    manufacturer: "NVIDIA",
    releaseYear: 2024,
    tdp: 285,
    price: 799,
    memory: "16 GB GDDR6X",
    hashrates: { pearlhash: 125, blake3: 2.0, kawpow: 42, kheavyhash: 2.9, etchash: 68, octopus: 50, nexapow: 112 },
  },
  {
    id: "rtx-4070-super",
    name: "RTX 4070 Super",
    manufacturer: "NVIDIA",
    releaseYear: 2024,
    tdp: 220,
    price: 599,
    memory: "12 GB GDDR6X",
    hashrates: { pearlhash: 98, blake3: 1.6, kawpow: 34, kheavyhash: 2.2, etchash: 56, octopus: 40, nexapow: 92 },
  },
  {
    id: "rtx-4070",
    name: "RTX 4070",
    manufacturer: "NVIDIA",
    releaseYear: 2023,
    tdp: 200,
    price: 549,
    memory: "12 GB GDDR6X",
    hashrates: { pearlhash: 85, blake3: 1.4, kawpow: 30, kheavyhash: 1.9, etchash: 50, octopus: 36, nexapow: 80 },
  },
  {
    id: "rtx-4060-ti",
    name: "RTX 4060 Ti",
    manufacturer: "NVIDIA",
    releaseYear: 2023,
    tdp: 160,
    price: 399,
    memory: "8 GB GDDR6",
    hashrates: { pearlhash: 60, blake3: 0.95, kawpow: 21, kheavyhash: 1.3, etchash: 36, octopus: 26, nexapow: 56 },
  },
  {
    id: "rtx-4060",
    name: "RTX 4060",
    manufacturer: "NVIDIA",
    releaseYear: 2023,
    tdp: 115,
    price: 299,
    memory: "8 GB GDDR6",
    hashrates: { pearlhash: 44, blake3: 0.70, kawpow: 16, kheavyhash: 0.95, etchash: 28, octopus: 20, nexapow: 42 },
  },

  // === RTX 30 Series (Ampere) ===
  {
    id: "rtx-3090-ti",
    name: "RTX 3090 Ti",
    manufacturer: "NVIDIA",
    releaseYear: 2022,
    tdp: 450,
    price: 1099,
    memory: "24 GB GDDR6X",
    hashrates: { pearlhash: 195, blake3: 3.0, kawpow: 62, kheavyhash: 4.2, etchash: 98, octopus: 68, nexapow: 155 },
  },
  {
    id: "rtx-3090",
    name: "RTX 3090",
    manufacturer: "NVIDIA",
    releaseYear: 2020,
    tdp: 350,
    price: 899,
    memory: "24 GB GDDR6X",
    hashrates: { pearlhash: 150, blake3: 2.4, kawpow: 52, kheavyhash: 3.4, etchash: 80, octopus: 58, nexapow: 130 },
  },
  {
    id: "rtx-3080-ti",
    name: "RTX 3080 Ti",
    manufacturer: "NVIDIA",
    releaseYear: 2021,
    tdp: 350,
    price: 749,
    memory: "12 GB GDDR6X",
    hashrates: { pearlhash: 128, blake3: 2.0, kawpow: 45, kheavyhash: 2.9, etchash: 72, octopus: 52, nexapow: 118 },
  },
  {
    id: "rtx-3080",
    name: "RTX 3080",
    manufacturer: "NVIDIA",
    releaseYear: 2020,
    tdp: 320,
    price: 549,
    memory: "10 GB GDDR6X",
    hashrates: { pearlhash: 108, blake3: 1.7, kawpow: 38, kheavyhash: 2.4, etchash: 62, octopus: 44, nexapow: 100 },
  },
  {
    id: "rtx-3070-ti",
    name: "RTX 3070 Ti",
    manufacturer: "NVIDIA",
    releaseYear: 2021,
    tdp: 290,
    price: 399,
    memory: "8 GB GDDR6X",
    hashrates: { pearlhash: 78, blake3: 1.2, kawpow: 28, kheavyhash: 1.8, etchash: 46, octopus: 34, nexapow: 74 },
  },
  {
    id: "rtx-3070",
    name: "RTX 3070",
    manufacturer: "NVIDIA",
    releaseYear: 2020,
    tdp: 220,
    price: 329,
    memory: "8 GB GDDR6",
    hashrates: { pearlhash: 62, blake3: 1.0, kawpow: 24, kheavyhash: 1.5, etchash: 38, octopus: 28, nexapow: 60 },
  },
  {
    id: "rtx-3060-ti",
    name: "RTX 3060 Ti",
    manufacturer: "NVIDIA",
    releaseYear: 2020,
    tdp: 200,
    price: 269,
    memory: "8 GB GDDR6",
    hashrates: { pearlhash: 50, blake3: 0.80, kawpow: 20, kheavyhash: 1.2, etchash: 32, octopus: 24, nexapow: 48 },
  },

  // === AMD RDNA 3 ===
  {
    id: "rx-7900-xtx",
    name: "RX 7900 XTX",
    manufacturer: "AMD",
    releaseYear: 2022,
    tdp: 355,
    price: 849,
    memory: "24 GB GDDR6",
    hashrates: { pearlhash: 140, blake3: 4.8, kawpow: 78, kheavyhash: 3.2, etchash: 110, octopus: 82, nexapow: 175 },
  },
  {
    id: "rx-7900-xt",
    name: "RX 7900 XT",
    manufacturer: "AMD",
    releaseYear: 2022,
    tdp: 315,
    price: 699,
    memory: "20 GB GDDR6",
    hashrates: { pearlhash: 118, blake3: 4.0, kawpow: 66, kheavyhash: 2.7, etchash: 94, octopus: 70, nexapow: 148 },
  },
  {
    id: "rx-7800-xt",
    name: "RX 7800 XT",
    manufacturer: "AMD",
    releaseYear: 2023,
    tdp: 263,
    price: 499,
    memory: "16 GB GDDR6",
    hashrates: { pearlhash: 88, blake3: 2.6, kawpow: 48, kheavyhash: 2.0, etchash: 68, octopus: 52, nexapow: 110 },
  },
  {
    id: "rx-7700-xt",
    name: "RX 7700 XT",
    manufacturer: "AMD",
    releaseYear: 2023,
    tdp: 245,
    price: 399,
    memory: "12 GB GDDR6",
    hashrates: { pearlhash: 68, blake3: 1.8, kawpow: 36, kheavyhash: 1.5, etchash: 52, octopus: 40, nexapow: 84 },
  },
  {
    id: "rx-7600-xt",
    name: "RX 7600 XT",
    manufacturer: "AMD",
    releaseYear: 2024,
    tdp: 190,
    price: 329,
    memory: "16 GB GDDR6",
    hashrates: { pearlhash: 48, blake3: 1.1, kawpow: 24, kheavyhash: 1.0, etchash: 36, octopus: 28, nexapow: 60 },
  },
];

// Coins & Market Data
export const coins: CoinData[] = [
  {
    id: "pearl",
    name: "Pearl",
    symbol: "PRL",
    algorithm: "PearlHash",
    price: 0.39,
    priceChange24h: -9.2,
    marketCap: 91800000,
    volume24h: 490000,
    hashrateUnit: "TH/s",
    color: "#f59e0b",
  },
  {
    id: "alephium",
    name: "Alephium",
    symbol: "ALPH",
    algorithm: "Blake3",
    price: 0.0417,
    priceChange24h: 3.2,
    marketCap: 5610000,
    volume24h: 165000,
    hashrateUnit: "GH/s",
    color: "#3b82f6",
  },
  {
    id: "ravencoin",
    name: "Ravencoin",
    symbol: "RVN",
    algorithm: "KawPow",
    price: 0.0085,
    priceChange24h: -1.5,
    marketCap: 64900000,
    volume24h: 4200000,
    hashrateUnit: "MH/s",
    color: "#8b5cf6",
  },
  {
    id: "kaspa",
    name: "Kaspa",
    symbol: "KAS",
    algorithm: "kHeavyHash",
    price: 0.035,
    priceChange24h: 10.7,
    marketCap: 855000000,
    volume24h: 28500000,
    hashrateUnit: "GH/s",
    color: "#10b981",
  },
  {
    id: "ethereum-classic",
    name: "Ethereum Classic",
    symbol: "ETC",
    algorithm: "Etchash",
    price: 25.80,
    priceChange24h: 1.4,
    marketCap: 1150000000,
    volume24h: 98000000,
    hashrateUnit: "MH/s",
    color: "#ec4899",
  },
  {
    id: "conflux",
    name: "Conflux",
    symbol: "CFX",
    algorithm: "Octopus",
    price: 0.12,
    priceChange24h: 8.2,
    marketCap: 238000000,
    volume24h: 21000000,
    hashrateUnit: "MH/s",
    color: "#06b6d4",
  },
  {
    id: "nexa",
    name: "Nexa",
    symbol: "NEXA",
    algorithm: "NexaPow",
    price: 0.0000085,
    priceChange24h: 5.8,
    marketCap: 42000000,
    volume24h: 1200000,
    hashrateUnit: "MH/s",
    color: "#f97316",
  },
];

// Helper: get GPU by ID
export function getGpuById(id: string): GpuData | undefined {
  return gpus.find((g) => g.id === id);
}

// Helper: get coin by algorithm key
export function getCoinByAlgorithm(algoId: string): CoinData | undefined {
  const algo = algorithms.find((a) => a.id === algoId);
  if (!algo) return undefined;
  return coins.find((c) => c.symbol === algo.symbol);
}

// Helper: algorithm display name from ID
export function getAlgorithmName(algoId: string): string {
  return algorithms.find((a) => a.id === algoId)?.name ?? algoId;
}

// Helper: format large numbers
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
  return num.toFixed(2);
}

// Helper: format hashrate
export function formatHashrate(value: number, unit: string): string {
  if (value >= 1000) return value.toFixed(1) + " " + unit;
  if (value >= 1) return value.toFixed(2) + " " + unit;
  return (value * 1000).toFixed(0) + " " + unit;
}

export function calcDailyRevenueWithLiveNetwork(
  gpu: GpuData,
  algoId: string,
  powerLimit: number,
  electricityCost: number,
  coinPrice: number,
  networkHashrate: number,
  dailyReward: number
): { grossRevenue: number; powerCost: number; netProfit: number; efficiency: number } {
  const stockHashrate = gpu.hashrates[algoId] ?? 0;
  if (stockHashrate === 0 || networkHashrate <= 0) {
    return { grossRevenue: 0, powerCost: 0, netProfit: 0, efficiency: 0 };
  }

  // Scale hashrate based on power limit relative to stock TDP
  // Linear approximation: 50% power → ~50% hashrate, 80% power → ~80% hashrate
  // Real GPUs often have slightly better efficiency at lower power, but linear is a good estimate
  const powerRatio = Math.min(1, Math.max(0.3, powerLimit / gpu.tdp));
  const hashrate = stockHashrate * powerRatio;

  // GPU's share of the network
  const share = hashrate / networkHashrate;

  // Daily coin earnings → USD
  const dailyCoin = share * dailyReward;
  const grossRevenue = dailyCoin * coinPrice;

  // Power cost (based on actual power limit)
  const dailyKwh = (powerLimit / 1000) * 24;
  const powerCost = dailyKwh * electricityCost;

  const netProfit = grossRevenue - powerCost;
  const efficiency = powerLimit > 0 ? (hashrate / powerLimit) * 1000 : 0;

  return { grossRevenue, powerCost, netProfit, efficiency };
}

// Helper: calculate daily mining revenue for a GPU on a given algo
// Uses the static coin price from data.ts (fallback)
export function calcDailyRevenue(
  gpu: GpuData,
  algoId: string,
  powerLimit: number,
  electricityCost: number // USD per kWh
): { grossRevenue: number; powerCost: number; netProfit: number; efficiency: number } {
  const coin = getCoinByAlgorithm(algoId);
  if (!coin) {
    return { grossRevenue: 0, powerCost: 0, netProfit: 0, efficiency: 0 };
  }
  return calcDailyRevenueWithLivePrice(gpu, algoId, powerLimit, electricityCost, coin.price);
}

// Helper: calculate daily mining revenue with a LIVE coin price
// Use this when you have real-time price data from the API
export function calcDailyRevenueWithLivePrice(
  gpu: GpuData,
  algoId: string,
  powerLimit: number,
  electricityCost: number, // USD per kWh
  coinPrice: number       // live coin price in USD
): { grossRevenue: number; powerCost: number; netProfit: number; efficiency: number } {
  const hashrate = gpu.hashrates[algoId] ?? 0;
  if (hashrate === 0) {
    return { grossRevenue: 0, powerCost: 0, netProfit: 0, efficiency: 0 };
  }

  // Network hashrate in the SAME unit as the GPU hashrate (TH/s/GH/s/MH/s)
  // and daily block rewards in native coin units
  // Source: miningpoolstats.stream + CoinGecko
  const algoParams: Record<string, { network: number; dailyReward: number }> = {
    // PearlHash: GPU in TH/s, network in TH/s
    pearlhash:  { network: 350000,   dailyReward: 72000 },       // ~350K TH/s, 72K PRL/day
    // Blake3: GPU in GH/s, network in GH/s
    blake3:     { network: 85000,    dailyReward: 225000 },      // ~85K GH/s, 225K ALPH/day
    // KawPow: GPU in MH/s, network in MH/s
    kawpow:     { network: 5000000,  dailyReward: 3600000 },     // ~5M MH/s (5 TH/s), 3.6M RVN/day
    // kHeavyHash: GPU in GH/s, network in GH/s
    kheavyhash: { network: 620000,   dailyReward: 8640000 },     // ~620K GH/s (620 TH/s), 8.64M KAS/day
    // Etchash: GPU in MH/s, network in MH/s
    etchash:    { network: 240000000, dailyReward: 108000 },     // ~240M MH/s (240 TH/s), 108K ETC/day
    // Octopus: GPU in MH/s, network in MH/s
    octopus:    { network: 18000000,  dailyReward: 2800000 },    // ~18M MH/s (18 TH/s), 2.8M CFX/day
    // NexaPow: GPU in MH/s, network in MH/s
    nexapow:    { network: 8000000,   dailyReward: 32000000000 },// ~8M MH/s (8 TH/s), 32B NEXA/day
  };

  const params = algoParams[algoId];
  if (!params || params.network <= 0) {
    return { grossRevenue: 0, powerCost: 0, netProfit: 0, efficiency: 0 };
  }

  // GPU's share of the network
  const share = hashrate / params.network;

  // Daily coin earnings → USD
  const dailyCoin = share * params.dailyReward;
  const grossRevenue = dailyCoin * coinPrice;

  // Power cost
  const dailyKwh = (powerLimit / 1000) * 24;
  const powerCost = dailyKwh * electricityCost;

  const netProfit = grossRevenue - powerCost;
  const efficiency = powerLimit > 0 ? (hashrate / powerLimit) * 1000 : 0;

  return {
    grossRevenue,
    powerCost,
    netProfit,
    efficiency,
  };
}
