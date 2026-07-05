# GPUBench.online — GPU Hashrate Database &amp; Mining Calculator

[![Website](https://img.shields.io/badge/Website-gpubench.online-00c853?style=flat-square)](https://gpubench.online)
[![GitHub last commit](https://img.shields.io/github/last-commit/daxiaoqin/gpubench?style=flat-square)](https://github.com/daxiaoqin/gpubench/commits/main)
[![GitHub stars](https://img.shields.io/github/stars/daxiaoqin/gpubench?style=flat-square)](https://github.com/daxiaoqin/gpubench/stargazers)

**Real-world GPU benchmark data across mining algorithms.** Compare hashrates, power efficiency, and daily profitability for NVIDIA RTX 50/40/30 series and AMD Radeon GPUs.

👉 **Live site: [https://gpubench.online](https://gpubench.online)**

---

## Features

- 🔍 **GPU Database** — Hashrates for all major algorithms (PearlHash, Blake3, KawPow, Etchash, RandomX, etc.)
- 📊 **Mining Calculator** — Estimate daily revenue based on your GPU, power cost, and real-time network data
- 📈 **Live Prices** — Real-time coin prices via CoinGecko (PRL, RVN, KAS, ETC, CFX, NEXA, ALPH)
- ⛏ **Mining Tutorials** — Step-by-step guides for PeakMiner, SRBMiner, lolMiner and more
- 🏊 **Pool List** — Curated mining pools with stratum details
- 🌐 **EN / 中文** — Full bilingual support

## Tech Stack

| Layer  | Technology |
|--------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Data Source | CoinGecko API (client-side) |
| Deployment | Static export on Hostinger |

## Getting Started

```bash
git clone https://github.com/daxiaoqin/gpubench.git
cd gpubench
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

Static output goes to `out/` — deploy anywhere.

## Why This Project?

- **Community-driven** — Hashrate data comes from real miners, not synthetic benchmarks
- **Ad-free & open** — No paywalls, no sign-ups required
- **Privacy-first** — No tracking, all API calls run in your browser

## Contributing

Contributions are welcome! Open an issue or PR for:

- New GPU benchmark submissions
- Additional algorithm support
- Bug fixes and improvements
- New mining pool listings

## License

[MIT](LICENSE)

---

**Made with ❤️ by GPU miners, for GPU miners.**
