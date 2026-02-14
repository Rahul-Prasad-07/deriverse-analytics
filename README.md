# 🚀 Deriverse Analytics

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white)](https://solana.com)
[![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

### **Institutional-grade trading analytics for [Deriverse](https://deriverse.io)**

*Bloomberg Terminal meets modern web — in your browser*

<br />

## **[🌐 LIVE DEMO](https://deriverse-analytics-azure.vercel.app)** | **[📦 GITHUB](https://github.com/Rahul-Prasad-07/deriverse-analytics)**

<br />

![58 TypeScript Files](https://img.shields.io/badge/58_Files-TypeScript-3178C6?style=flat-square)
![18 Charts](https://img.shields.io/badge/18_Charts-Recharts-22b5bf?style=flat-square)
![15 Analytics](https://img.shields.io/badge/15_Analytics-Functions-0055FF?style=flat-square)
![Zero Errors](https://img.shields.io/badge/Build-Zero_Errors-00d4aa?style=flat-square)

</div>

---

## 🎯 What Is This?

**Deriverse Analytics** is a complete trading analytics platform built for [Deriverse](https://deriverse.io) — Solana's advanced on-chain derivatives protocol supporting **spot**, **perpetuals**, and **options**.

This dashboard transforms trading data into professional insights with the depth of institutional platforms like Bloomberg Terminal, wrapped in a beautiful, fast, modern interface.

---

## ⚡ Key Features

### 📊 **18 Professional Charts**
- Equity curve with benchmark tracking & drawdown overlay
- P&L distribution histogram with win/loss color coding
- Correlation heatmap (Pearson) across all trading pairs
- Hourly/weekday/session heatmaps for timing optimization
- Strategy breakdown with per-strategy Sharpe ratios
- Volume analysis with fee overlays
- Capital flows with deposit/withdrawal tracking

### 🧮 **15 Analytics Functions**
Real implementations of institutional-grade metrics:
- **Risk-Adjusted Returns**: Sharpe, Sortino, Calmar ratios
- **Risk Management**: VaR (95/99%), Kelly Criterion, Max Drawdown
- **Performance**: Profit Factor, Expectancy, Win Rate, R:R Ratio
- **Portfolio**: Equity curve generation, correlation matrix
- **Risk Health Score**: Composite 0-100 gauge with A+ to F grades

### 🎨 **Premium UX**
- **⌘K Command Palette** — Fuzzy search pages, symbols, metrics
- **Live Price Ticker** — Scrolling real-time feed with sparklines
- **Trade Detail Modal** — Click any trade for full breakdown (P&L, fees, MAE/MFE, strategy, Solscan link)
- **⌘1-6 Quick Nav** — Jump to any page instantly
- **⌘/ Shortcuts Panel** — Full keyboard reference
- **IDE-style Status Bar** — Live P&L, win rate, connection state
- **Animated Transitions** — Smooth 60fps page changes with Framer Motion
- **Mobile Responsive** — Works perfectly on all devices
- **Custom 404** — Branded error page

### 📝 **Complete Trading Journal**
- Sortable table with 14 columns (date, symbol, side, P&L, fees, duration, etc.)
- Multi-filter panel (symbol, market type, side, P&L range)
- Inline annotations — add notes to any trade
- CSV/JSON export for offline analysis
- Direct Solscan links for on-chain verification
- 20 trades per page with pagination

### 🛡️ **Risk Management Suite**
- **Risk Health Gauge** — Beautiful animated SVG gauge (0-100 score)
- **Component Scoring** — Sharpe (25 pts), Drawdown (25 pts), Consistency (25 pts), R:R (25 pts)
- **Auto Warnings** — Smart alerts for concerning metrics
- **Streak Tracking** — Max consecutive wins/losses
- **VaR Analysis** — 95th/99th percentile loss estimates

---

## 🏗️ Tech Stack

| Layer | Technology | Why? |
|:------|:-----------|:-----|
| **Framework** | Next.js 16.1.6 | App Router, Turbopack, instant HMR |
| **Language** | TypeScript 5 | Full type safety, 25+ interfaces |
| **UI** | React 19.2.3 | Latest stable with Server Components |
| **Styling** | Tailwind CSS v4 | Modern `@theme inline` syntax |
| **Charts** | Recharts 3.7.0 | Composable React charting |
| **Animation** | Framer Motion 12.33.0 | Buttery smooth 60fps |
| **Icons** | Lucide React 0.563.0 | 40+ beautiful icons |
| **Blockchain** | Solana Web3.js 1.98.1 | Wallet integration |
| **Protocol** | @deriverse/kit 1.0.39 | Ready for live data |
| **Deploy** | Vercel | Zero-config global CDN |

**58 TypeScript files** · **Zero build errors** · **Production ready**

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/Rahul-Prasad-07/deriverse-analytics.git
cd deriverse-analytics

# Install
npm install

# Run (opens http://localhost:3000)
npm run dev

# Build for production
npm run build
npm start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rahul-Prasad-07/deriverse-analytics)

Or via CLI:
```bash
npm i -g vercel
vercel login
vercel deploy --prod
```

---

## 🏆 What Makes This Special

### 1. **Institutional-Grade Math**
Not toy calculations — real implementations of Sharpe, Sortino, Calmar, VaR, Kelly Criterion, Pearson correlation. The same metrics used by professional quant traders and hedge funds.

### 2. **Obsessive Polish**
Every component has animations, loading states, error handling, and edge cases covered. The Risk Health Gauge alone required custom SVG path calculations for smooth circular animations.

### 3. **Developer Experience**
Zero build errors, full TypeScript coverage, consistent patterns, comprehensive comments. Any developer can understand the codebase immediately.

### 4. **UX Innovation**
Features like ⌘K command palette, live ticker with sparklines, and clickable trade modals are normally found in $50k/year Bloomberg Terminals — we've brought them to the web.

### 5. **Real-World Ready**
The `@deriverse/kit` integration is in place. Swapping from mock data to live protocol data requires changing one import. All analytics functions work on any trade shape.

### 6. **300 Realistic Trades**
Seeded mock data with 10 Solana pairs, 90 days of history, 4 strategies, accurate fee structure. Perfect for demos and testing.

---

## 📂 Project Structure

```
src/
├── app/                      # 7 pages (Next.js 16 App Router)
│   ├── page.tsx             # Dashboard
│   ├── journal/             # Trading journal
│   ├── portfolio/           # Portfolio analysis
│   ├── performance/         # Performance analytics
│   ├── risk/                # Risk management
│   ├── settings/            # Settings
│   └── not-found.tsx        # Custom 404
│
├── components/
│   ├── charts/              # 18 Recharts components
│   ├── layout/              # 7 layout components (sidebar, status bar, command palette, etc.)
│   ├── journal/             # 3 journal components (table, modal, filters)
│   ├── pages/               # 6 page content components
│   └── ui/                  # 11 reusable UI components
│
├── lib/
│   ├── analytics.ts         # 15 analytics functions
│   ├── mock-data.ts         # 300 seeded trades
│   ├── utils.ts             # Formatters and helpers
│   └── trading-context.tsx  # React Context
│
└── types/
    └── trading.ts           # 25+ TypeScript interfaces
```

---

## 📊 Pages Overview

| Page | Purpose | Key Features |
|:-----|:--------|:-------------|
| **Dashboard** | Command center | 8 KPI cards, equity curve, strategy breakdown, daily P&L |
| **Journal** | Trade history | Sortable table, detail modal, filters, CSV/JSON export |
| **Portfolio** | Asset analysis | Symbol performance, capital flows, fee breakdown |
| **Performance** | Deep analytics | Return distribution, correlation matrix, time analysis |
| **Risk** | Risk management | Health gauge, VaR, streaks, largest wins/losses |
| **Settings** | Configuration | Wallet connection, API endpoints, preferences |

---

## 🔌 Deriverse Integration

Ready to connect to live Deriverse protocol:

- ✅ `@deriverse/kit` v1.0.39 installed
- ✅ Program ID configured (`Drvrseg8AQLP8B96DBGmHRjFGviFNYTkHueY9g3k27Gu`)
- ✅ Pyth oracle integration prepared
- ✅ Fee structure matches live rates (5bps taker, 0.625bps maker)
- ✅ Supports spot, perpetuals, and options
- ✅ Change one import to go from mock → live data

---

## 🎓 Why Traders Will Love This

| Problem | Solution |
|:--------|:---------|
| "I don't know which strategies work" | Strategy breakdown with Sharpe, profit factor, win rate per approach |
| "When should I trade?" | Hourly heatmaps + session analysis show your best times |
| "Am I taking too much risk?" | Risk health score + VaR + Kelly Criterion for position sizing |
| "Where's the edge?" | Return distribution + correlation matrix reveal profitable patterns |
| "How do I track everything?" | Complete journal with 300 trades, filters, notes, exports |

---

## 🚧 Future Roadmap

- [ ] Real-time Deriverse protocol WebSocket integration
- [ ] Multi-wallet support with aggregated performance
- [ ] AI trading assistant powered by GPT-4
- [ ] Custom alerts for P&L/risk thresholds
- [ ] Strategy backtesting engine
- [ ] Mobile app with push notifications
- [ ] Social features & leaderboards
- [ ] Tax report generation

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

Built with ❤️ for the [Deriverse](https://deriverse.io) community.

- **Deriverse Team** — For building incredible on-chain trading infrastructure
- **Solana Labs** — For the fastest blockchain
- **Vercel** — For effortless deployment
- **Open Source Community** — For the amazing tools

---

<div align="center">

## 🔗 **Links**

**[🌐 Live Demo](https://deriverse-analytics-azure.vercel.app)** · **[📦 GitHub](https://github.com/Rahul-Prasad-07/deriverse-analytics)** · **[📖 Deriverse Docs](https://docs.deriverse.io)**

<br />

**⭐ Star this repo if you like it! ⭐**

<br />

Made with 💜 by [Rahul Prasad](https://github.com/Rahul-Prasad-07)

</div>
