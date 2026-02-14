# 🚀 Deriverse Analytics

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white)](https://solana.com)
[![Tailwind](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://deriverse-analytics-azure.vercel.app)

<h3>Institutional-Grade Trading Analytics for <a href="https://deriverse.io">Deriverse</a></h3>

*Bloomberg Terminal meets modern web — professional analytics in your browser*

<br />

### **[🌐 VIEW LIVE DEMO](https://deriverse-analytics-azure.vercel.app)**

<br />

![TypeScript](https://img.shields.io/badge/58_TypeScript_Files-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Charts](https://img.shields.io/badge/18_Chart_Components-22b5bf?style=flat-square)
![Analytics](https://img.shields.io/badge/15_Analytics_Functions-0055FF?style=flat-square)
![Build](https://img.shields.io/badge/Build_Status-Passing-00d4aa?style=flat-square)

</div>

---

## 🎯 Overview

**Deriverse Analytics** is a complete trading analytics platform built for [Deriverse](https://deriverse.io) — Solana's advanced on-chain derivatives protocol supporting **spot**, **perpetuals**, and **options** markets.

This dashboard transforms raw trading data into actionable intelligence with the sophistication of institutional platforms like Bloomberg Terminal, delivered through a beautiful, high-performance web interface that traders will love.

**Built for the Deriverse Bounty** — showcasing what's possible when cutting-edge web tech meets professional trading analytics.

---

## ⚡ Key Features

### 📊 **18 Professional Charts**
- **Equity Curve** with benchmark tracking & drawdown overlay
- **P&L Distribution** histogram with win/loss color coding  
- **Correlation Heatmap** (Pearson) across all trading pairs
- **Time Analysis** — hourly/weekday/session heatmaps for timing optimization
- **Strategy Breakdown** with per-strategy Sharpe ratios
- **Volume Analysis** with fee overlays
- **Capital Flows** with deposit/withdrawal tracking
- **Fee Analysis** — maker, taker, funding, liquidation breakdown

### 🧮 **15 Institutional Analytics**
Professional implementations of quant trading metrics:
- **Risk-Adjusted Returns** — Sharpe, Sortino, Calmar ratios
- **Risk Management** — VaR (95/99%), Kelly Criterion, Max Drawdown
- **Performance Metrics** — Profit Factor, Expectancy, Win Rate, Risk/Reward
- **Portfolio Analysis** — Equity curve generation, correlation matrix
- **Risk Health Score** — Composite 0-100 gauge with A+ to F letter grades

### 🎨 **Premium User Experience**
- **⌘K Command Palette** — Fuzzy search pages, symbols, and metrics
- **Live Price Ticker** — Scrolling real-time feed with sparklines for all 10 symbols
- **Trade Detail Modal** — Click any trade for full breakdown including P&L, fees, MAE/MFE, strategy tags, and Solscan links
- **⌘1-6 Quick Navigation** — Jump to any page instantly
- **⌘/ Shortcuts Panel** — Full keyboard reference modal
- **IDE-Style Status Bar** — Live P&L, win rate, connection state always visible
- **Smooth Animations** — 60fps page transitions with Framer Motion
- **Mobile Responsive** — Perfect experience on all devices
- **Custom 404** — Branded error page with navigation

### 📝 **Complete Trading Journal**
- **Sortable Table** with 14 columns (date, symbol, side, type, entry/exit, P&L, fees, duration, notes, tx link)
- **Advanced Filters** — Symbol, market type, side, order type, status, P&L range
- **Inline Annotations** — Add notes to any trade directly in the table
- **Export Functionality** — Download filtered data as CSV/JSON
- **Solscan Integration** — Direct on-chain transaction verification
- **Pagination** — Clean navigation through 300+ trades

### 🛡️ **Risk Management Suite**
- **Animated Risk Health Gauge** — Beautiful SVG gauge showing 0-100 composite score
- **Component Scoring** — Sharpe (25 pts), Drawdown (25 pts), Consistency (25 pts), Risk/Reward (25 pts)
- **Smart Warnings** — Auto-generated alerts for concerning metrics
- **Streak Tracking** — Max consecutive wins/losses with current streak
- **VaR Analysis** — 95th and 99th percentile loss estimates with visual progress bars
- **Extreme Trades** — Detailed cards for largest wins and losses

---

## 🏗️ Tech Stack

| Layer | Technology | Version | Why? |
|:------|:-----------|:--------|:-----|
| **Framework** | Next.js | 16.1.6 | Latest App Router, Turbopack, instant HMR |
| **Language** | TypeScript | 5.x | Full type safety with 25+ custom interfaces |
| **UI Library** | React | 19.2.3 | Latest stable with Server Components |
| **Styling** | Tailwind CSS | v4 | Modern `@theme inline` syntax |
| **Charts** | Recharts | 3.7.0 | Composable, React-native charting library |
| **Animation** | Framer Motion | 12.33.0 | Buttery smooth 60fps animations |
| **Icons** | Lucide React | 0.563.0 | Beautiful, consistent icon system |
| **Blockchain** | Solana Web3.js | 1.98.1 | Wallet and RPC integration |
| **Protocol** | @deriverse/kit | 1.0.39 | Official SDK, ready for live data |
| **Deployment** | Vercel | Cloud | Zero-config global CDN |

**58 TypeScript files** · **Zero build errors** · **Production ready**

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/Rahul-Prasad-07/deriverse-analytics.git
cd deriverse-analytics

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
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

## 📂 Project Structure

```
src/
├── app/                          # Next.js 16 App Router (7 pages)
│   ├── page.tsx                 # Dashboard
│   ├── journal/page.tsx         # Trading journal
│   ├── portfolio/page.tsx       # Portfolio analysis
│   ├── performance/page.tsx     # Performance analytics
│   ├── risk/page.tsx            # Risk management
│   ├── settings/page.tsx        # Settings
│   └── not-found.tsx            # Custom 404
│
├── components/
│   ├── charts/                   # 18 Recharts components
│   │   ├── pnl-chart.tsx
│   │   ├── equity-curve-chart.tsx
│   │   ├── correlation-heatmap.tsx
│   │   ├── return-distribution-chart.tsx
│   │   └── ... (14 more)
│   │
│   ├── layout/                   # 7 layout components
│   │   ├── sidebar.tsx          # Navigation with mini P&L
│   │   ├── status-bar.tsx       # IDE-style top bar
│   │   ├── command-palette.tsx  # ⌘K search
│   │   ├── keyboard-shortcuts.tsx # ⌘/ shortcuts panel
│   │   └── ... (3 more)
│   │
│   ├── journal/                  # 3 journal components
│   │   ├── trade-table.tsx      # Sortable table
│   │   ├── trade-detail-modal.tsx # Detail modal
│   │   └── filter-panel.tsx     # Multi-filter
│   │
│   ├── pages/                    # 6 page content components
│   └── ui/                       # 11 reusable UI components
│       ├── kpi-card.tsx         # KPI cards with sparklines
│       ├── risk-health-gauge.tsx # SVG gauge
│       ├── live-ticker.tsx      # Scrolling ticker
│       └── ... (8 more)
│
├── lib/
│   ├── analytics.ts              # 15 analytics functions
│   ├── mock-data.ts             # 300 seeded trades
│   ├── utils.ts                 # Formatters & helpers
│   └── trading-context.tsx      # React Context
│
└── types/
    └── trading.ts                # 25+ TypeScript interfaces
```

---

## 📊 Pages & Features

| Page | Route | Key Features |
|:-----|:------|:-------------|
| **Dashboard** | `/` | 8 KPI cards, equity curve, strategy breakdown, daily P&L, win rate analysis |
| **Journal** | `/journal` | Sortable trade table, detail modal, advanced filters, CSV/JSON export, Solscan links |
| **Portfolio** | `/portfolio` | Symbol performance chart, capital flows, fee breakdown, order type analysis |
| **Performance** | `/performance` | Return distribution, correlation matrix, hourly/weekday/session heatmaps |
| **Risk** | `/risk` | Risk health gauge with A+ to F grades, VaR analysis, streak tracking, extreme trades |
| **Settings** | `/settings` | Wallet connection, API endpoints, trade notifications, risk alerts |

All pages feature:
- ⌘K global search
- Live status bar
- Smooth page transitions
- Mobile responsive layouts
- Loading states & error handling

---

## 🏆 What Makes This Special

### 1. **Institutional-Grade Mathematics**
Not toy calculations — these are **real implementations** of Sharpe, Sortino, Calmar, VaR, Kelly Criterion, and Pearson correlation. The same metrics used by professional quant traders and hedge funds.

### 2. **Obsessive Attention to Detail**
Every component has been crafted with animations, loading states, error handling, and edge cases covered. The Risk Health Gauge alone required custom SVG path calculations for smooth circular progress animations.

### 3. **Superior Developer Experience**
- Zero build errors in production
- Full TypeScript coverage with 25+ custom interfaces
- Consistent code patterns and architecture
- Comprehensive inline documentation
- Clean, maintainable codebase

### 4. **User Experience Innovation**
Features typically found in $50k/year Bloomberg Terminals:
- ⌘K command palette with fuzzy search
- Live price ticker with sparklines
- Clickable trade detail modals
- IDE-style status bar
- Professional keyboard shortcuts

### 5. **Production Ready**
The `@deriverse/kit` SDK is integrated and configured. Switching from mock data to live Deriverse protocol data requires changing **one import**. All analytics functions work on any trade data structure.

### 6. **Realistic Demo Data**
300 carefully seeded trades across 10 Solana pairs, 90 days of history, 4 trading strategies, and accurate Deriverse fee structures. Perfect for demonstrations and testing.

---

## 🔌 Deriverse Integration

Ready to connect to the live Deriverse protocol:

| Component | Status |
|:----------|:-------|
| **SDK** | ✅ `@deriverse/kit` v1.0.39 installed |
| **Program ID** | ✅ `Drvrseg8AQLP8B96DBGmHRjFGviFNYTkHueY9g3k27Gu` configured |
| **Price Oracle** | ✅ Pyth Network integration prepared |
| **Markets** | ✅ Spot, Perpetuals, Options all supported |
| **Fee Structure** | ✅ 5bps taker, 0.625bps maker (matches live rates) |
| **Data Switch** | ✅ Change one import: mock → live |

---

## 💡 Value Proposition

### For Traders

| Challenge | Solution |
|:----------|:---------|
| *"Which strategies actually work?"* | Strategy breakdown with Sharpe, profit factor, win rate per approach |
| *"When should I be trading?"* | Hourly heatmaps + session analysis reveal your most profitable times |
| *"Am I taking too much risk?"* | Risk health score + VaR + Kelly Criterion for optimal position sizing |
| *"Where's my edge?"* | Return distribution + correlation matrix uncover profitable patterns |
| *"How do I track everything?"* | Complete journal with 300 trades, filters, notes, and exports |

### For Deriverse

- **Protocol Showcase** — Demonstrates what's possible with Deriverse's on-chain trading
- **User Acquisition** — Professional tools attract serious traders to the platform
- **Developer Example** — Clean codebase serves as reference for other builders
- **Community Value** — Open source, MIT licensed, ready for contributions

---

## 🚧 Future Roadmap

- [ ] **Live Data Integration** — Real-time Deriverse protocol WebSocket feeds
- [ ] **Multi-Wallet Support** — Connect multiple wallets with aggregated performance
- [ ] **AI Trading Assistant** — GPT-4 powered insights and trade suggestions
- [ ] **Custom Alerts** — Push notifications for P&L thresholds and risk limits
- [ ] **Strategy Backtesting** — Historical simulation engine for testing ideas
- [ ] **Mobile Application** — React Native app with native notifications
- [ ] **Social Features** — Share strategies, compete on leaderboards
- [ ] **Tax Reporting** — Automated tax form generation with realized gains/losses
- [ ] **Advanced Order Types** — OCO, trailing stops, conditional orders
- [ ] **Portfolio Optimization** — AI-driven position sizing and rebalancing

---

## 📈 Analytics Functions

All 15 functions implemented in `src/lib/analytics.ts`:

| Function | Purpose |
|:---------|:--------|
| `calculateSharpeRatio` | Risk-adjusted return (return per unit of volatility) |
| `calculateSortinoRatio` | Downside risk-adjusted return (only negative volatility) |
| `calculateCalmarRatio` | Return vs maximum drawdown |
| `calculateMaxDrawdown` | Largest peak-to-trough decline |
| `calculateWinRate` | Percentage of profitable trades |
| `calculateProfitFactor` | Gross profit divided by gross loss |
| `calculateAverageWin` | Mean profit of winning trades |
| `calculateAverageLoss` | Mean loss of losing trades |
| `calculateExpectancy` | Expected value per trade |
| `calculateRiskRewardRatio` | Average win divided by average loss |
| `calculateValueAtRisk` | 95th/99th percentile loss estimate |
| `calculateKellyCriterion` | Optimal position sizing percentage |
| `calculateConsistency` | Profit consistency across time buckets |
| `calculatePearsonCorrelation` | Symbol correlation matrix |
| `generateEquityCurve` | Cumulative balance over time |

---

## 📦 Mock Data

The project includes **300 realistic trades** for demonstration:

- **10 Trading Pairs** — SOL, WBTC, WETH, BONK, JTO, PYTH, JUP, RNDR, HNT, RAY
- **90 Days History** — Realistic volatility patterns per asset
- **4 Strategies** — Momentum, Mean Reversion, Breakout, Scalping
- **Seeded Random** — Seed=42 for reproducible demos
- **Accurate Fees** — Matches Deriverse's live fee structure

---

## 🎓 Learning Resources

- **[Deriverse Documentation](https://docs.deriverse.io)** — Protocol documentation
- **[Deriverse GitHub](https://github.com/deriverse)** — Official repositories
- **[Next.js 16 Docs](https://nextjs.org/docs)** — Framework reference
- **[Recharts Documentation](https://recharts.org)** — Charting library guide
- **[Tailwind CSS v4](https://tailwindcss.com/docs)** — Styling reference
- **[Framer Motion](https://www.framer.com/motion/)** — Animation API

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

Free to use, modify, and distribute. Built for the community.

---

## 🙏 Acknowledgments

Built with ❤️ for the [Deriverse](https://deriverse.io) community and Solana ecosystem.

**Special Thanks:**
- **Deriverse Team** — For building world-class on-chain trading infrastructure
- **Solana Labs** — For the fastest, most scalable blockchain
- **Vercel** — For making deployment effortless
- **Open Source Community** — For the incredible tools and libraries

---

<div align="center">

## 🔗 Links

**[🌐 Live Demo](https://deriverse-analytics-azure.vercel.app)** · **[📦 GitHub](https://github.com/Rahul-Prasad-07/deriverse-analytics)** · **[📖 Deriverse Docs](https://docs.deriverse.io)** · **[🐦 Twitter](https://twitter.com/deriverse_io)**

<br />

### ⭐ Star this repo if you find it useful! ⭐

<br />

**Built by [Rahul Prasad](https://github.com/Rahul-Prasad-07)**

*Transforming on-chain trading data into actionable intelligence*

</div>
