# 🚀 Deriverse Analytics — Institutional-Grade Trading Dashboard

<div align="center">

[![Deriverse](https://img.shields.io/badge/Deriverse-00d4aa?style=for-the-badge&logoColor=white)](https://deriverse.io)
[![Solana](https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white)](https://solana.com)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://deriverse-analytics-azure.vercel.app)

### **The most comprehensive trading analytics platform for [Deriverse](https://deriverse.io)**

*Professional journal · Portfolio analysis · Risk management · Live analytics · Real-time insights*

<br />

### 🌐 **[VIEW LIVE DEMO →](https://deriverse-analytics-azure.vercel.app)**

<br />

![Dashboard Preview](https://img.shields.io/badge/58_TypeScript_Files-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Charts](https://img.shields.io/badge/18_Chart_Components-22b5bf?style=flat-square)
![Pages](https://img.shields.io/badge/7_Pages-00d4aa?style=flat-square)
![Analytics](https://img.shields.io/badge/15_Analytics_Functions-0055FF?style=flat-square)

</div>

---

## 🎯 Project Overview

**Deriverse Analytics** is a world-class trading analytics dashboard built specifically for the [Deriverse](https://deriverse.io) protocol — a next-generation, fully on-chain decentralized trading ecosystem on Solana supporting **spot**, **perpetual futures**, and **options** markets.

This platform transforms raw trade data into actionable intelligence with the sophistication of institutional trading platforms like Bloomberg Terminal, wrapped in a beautiful, modern interface that traders will love to use daily.

### 🏆 Built for the Deriverse Bounty

This project was created to showcase what's possible when you combine cutting-edge web technologies with deep trading analytics. Every feature was carefully designed to solve real problems that traders face daily.

---

## 💎 Key Features

<table>
<tr>
<td width="50%">

### 📊 **Analytics & Insights**
- ✅ **18 Interactive Charts** — Recharts 3.7 with custom themes
- ✅ **8 KPI Cards** — Color-coded health status + sparklines
- ✅ **Risk Health Score** — Composite A+ to F grading system
- ✅ **Equity Curve** — Portfolio value vs benchmark tracking
- ✅ **15 Analytics Functions** — Sharpe, Sortino, Calmar, VaR, Kelly Criterion
- ✅ **Correlation Matrix** — Pearson correlation across all pairs
- ✅ **Return Distribution** — P&L histogram analysis
- ✅ **Strategy Breakdown** — Per-strategy performance metrics

</td>
<td width="50%">

### 🎨 **User Experience**
- ✅ **Live Price Ticker** — Real-time scrolling feed with sparklines
- ✅ **⌘K Command Palette** — Fuzzy search everywhere
- ✅ **Trade Detail Modal** — Click any trade for full breakdown
- ✅ **IDE-style Status Bar** — Live stats always visible
- ✅ **Animated Transitions** — Smooth page changes with Framer Motion
- ✅ **Mobile Responsive** — Works perfectly on all devices
- ✅ **Dark Theme** — Professional terminal aesthetic
- ✅ **Keyboard Shortcuts** — Navigate at the speed of thought

</td>
</tr>
</table>

### 📦 **What Makes This Special**

| Feature | Why It Matters |
|:--------|:---------------|
| **58 TypeScript Files** | Fully type-safe, maintainable codebase with 25+ interfaces |
| **Zero Build Errors** | Production-ready code that compiles clean every time |
| **Seeded Mock Data** | 300 realistic trades across 10 pairs for consistent demos |
| **Institutional-Grade Math** | Proper implementations of Sharpe, Sortino, Calmar, Kelly, VaR |
| **Framer Motion Animations** | Polished UI with 60fps animations throughout |
| **Tailwind CSS v4** | Latest version with modern `@theme inline` syntax |
| **Next.js 16 + Turbopack** | Bleeding-edge framework with instant HMR |
| **Deployed on Vercel** | Live production deployment with zero config |

---

## 🎥 Feature Showcase

### 📊 Dashboard — Command Center
- **8 KPI Cards** with real-time sparklines and color-coded health (green/yellow/red)
- **Equity Curve** showing portfolio value vs 8% annual benchmark with drawdown overlay
- **Cumulative P&L**, Daily Bars, Volume with Fees, Win Rate, Long/Short Ratio
- **Strategy Performance** cards with animated progress bars and Sharpe ratios

### 📔 Trading Journal — Every Trade Tracked
- **Sortable Table** with 14 columns: date, symbol, side, type, entry, exit, volume, leverage, P&L, %, fees, duration, notes, tx link
- **🆕 Trade Detail Modal** — Click any row to see: P&L hero card, entry/exit prices, volume, leverage, strategy, R:R ratio, MAE/MFE, fee breakdown, tags, notes, and direct Solscan link
- **Inline Annotations** — Add notes to any trade directly in the table
- **Multi-Filter Panel** — Filter by symbol, market type, side, order type, status, P&L range
- **CSV/JSON Export** — Download your filtered data for offline analysis

### 💼 Portfolio Analysis — Deep Dive
- **Symbol Performance** horizontal bar chart comparing all 10 trading pairs
- **Detailed Table** with 11 columns per symbol: trades, win rate, P&L, avg P&L, volume, long/short split, best/worst, avg duration, profit factor
- **Strategy Breakdown** showing Momentum, Mean Reversion, Breakout, Scalping performance
- **Capital Flows** — Balance area chart with deposit/withdrawal bars
- **Fee Analysis** — Maker, taker, funding, liquidation breakdown with cumulative chart

### ⚡ Performance Analytics — Find Your Edge
- **Return Distribution** — Color-coded P&L histogram (green for wins, red for losses)
- **Correlation Heatmap** — Interactive Pearson correlation matrix showing which pairs move together
- **Hourly Heatmap** — 24-hour P&L grid to find your best trading times
- **Weekday Analysis** — See which days are most profitable
- **Session Breakdown** — Asian/European/American session comparison
- **42-Day Calendar** — Visual heatmap with hover tooltips showing daily P&L

### 🛡️ Risk Management — Stay Safe
- **🆕 Risk Health Gauge** — Beautiful animated circular SVG gauge showing 0-100 composite score
  - Sharpe component (0-25 pts)
  - Drawdown component (0-25 pts)
  - Consistency component (0-25 pts)
  - Risk/Reward component (0-25 pts)
  - Letter grade from A+ to F with color coding
- **Risk Ratios** — Sharpe, Sortino, Calmar, Expectancy with thresholds
- **VaR Analysis** — 95th and 99th percentile Value at Risk
- **Streak Tracking** — Current streak, max consecutive wins/losses
- **Extreme Trades** — Largest win/loss cards with full details

### 🎹 Global UX Features — Everywhere
- **🆕 Live Price Ticker** — Scrolling feed across top with mini-sparklines for all 10 symbols, auto-updates every 3s
- **⌘K Command Palette** — Fuzzy search pages, symbols (with inline stats), and metrics
- **⌘/ Shortcuts Panel** — Full keyboard reference modal showing all hotkeys
- **⌘1-6 Quick Navigation** — Jump to any page with one keystroke
- **IDE-style Status Bar** — Shows page name, connection status, live P&L, win rate, trade count, current date
- **Sidebar Mini P&L** — Color-coded total P&L badge with trend icon (↑/↓)
- **Welcome Toast** — First-visit onboarding teaching shortcuts (session storage)
- **Animated Page Transitions** — Smooth 350ms fade+slide on every route change
- **Mobile Responsive** — Hamburger menu, sidebar hides on small screens, adaptive padding
- **Custom 404** — Branded not-found page with glowing gradient "404", navigation buttons, Framer Motion entrance

---

## 🏗️ Technical Architecture

### Project Structure

```
deriverse-analytics/
├── src/
│   ├── app/                          # Next.js 16 App Router
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Dashboard page (/)
│   │   ├── journal/page.tsx         # Trading Journal (/journal)
│   │   ├── portfolio/page.tsx       # Portfolio Analysis (/portfolio)
│   │   ├── performance/page.tsx     # Performance Analytics (/performance)
│   │   ├── risk/page.tsx           # Risk Management (/risk)
│   │   ├── settings/page.tsx       # Settings (/settings)
│   │   └── not-found.tsx           # Custom 404 page
│   │
│   ├── components/
│   │   ├── layout/                  # Layout components (7)
│   │   │   ├── sidebar.tsx         # Navigation with mini P&L
│   │   │   ├── main-content.tsx    # Content wrapper with mobile support
│   │   │   ├── status-bar.tsx      # IDE-style top bar
│   │   │   ├── time-frame-selector.tsx
│   │   │   ├── command-palette.tsx # ⌘K fuzzy search
│   │   │   ├── keyboard-shortcuts.tsx # ⌘/ shortcuts panel
│   │   │   └── global-keyboard-nav.tsx # ⌘1-6 navigation
│   │   │
│   │   ├── charts/                  # 18 Recharts components
│   │   │   ├── pnl-chart.tsx
│   │   │   ├── equity-curve-chart.tsx
│   │   │   ├── drawdown-chart.tsx
│   │   │   ├── daily-pnl-chart.tsx
│   │   │   ├── volume-chart.tsx
│   │   │   ├── return-distribution-chart.tsx
│   │   │   ├── correlation-heatmap.tsx
│   │   │   ├── capital-flow-chart.tsx
│   │   │   ├── strategy-breakdown-chart.tsx
│   │   │   ├── win-rate-chart.tsx
│   │   │   ├── long-short-ratio-chart.tsx
│   │   │   ├── symbol-performance-chart.tsx
│   │   │   ├── hourly-heatmap.tsx
│   │   │   ├── weekday-performance-chart.tsx
│   │   │   ├── session-performance-chart.tsx
│   │   │   ├── fee-breakdown-chart.tsx
│   │   │   ├── cumulative-fee-chart.tsx
│   │   │   └── order-type-chart.tsx
│   │   │
│   │   ├── journal/                 # Trading journal components (3)
│   │   │   ├── trade-table.tsx     # Sortable table with clickable rows
│   │   │   ├── trade-detail-modal.tsx # Full trade breakdown modal
│   │   │   └── filter-panel.tsx    # Multi-filter sidebar
│   │   │
│   │   ├── pages/                   # Page content components (6)
│   │   │   ├── dashboard-content.tsx
│   │   │   ├── journal-content.tsx
│   │   │   ├── portfolio-content.tsx
│   │   │   ├── performance-content.tsx
│   │   │   ├── risk-content.tsx
│   │   │   └── settings-content.tsx
│   │   │
│   │   └── ui/                      # Reusable UI components (11)
│   │       ├── kpi-card.tsx        # KPI cards with sparklines
│   │       ├── risk-health-gauge.tsx # Circular gauge with grade
│   │       ├── live-ticker.tsx     # Scrolling price feed
│   │       ├── metric-card.tsx
│   │       ├── chart-container.tsx
│   │       ├── export-button.tsx   # CSV/JSON export
│   │       ├── loading-skeleton.tsx
│   │       ├── animated-counter.tsx
│   │       ├── page-transition.tsx # Route transition wrapper
│   │       ├── welcome-toast.tsx   # Onboarding notification
│   │       └── animations.tsx      # Framer Motion configs
│   │
│   ├── lib/                         # Core logic (4 files)
│   │   ├── analytics.ts            # 15 analytics functions
│   │   ├── mock-data.ts            # 300 seeded trades
│   │   ├── utils.ts                # Helpers (cn, formatters)
│   │   └── trading-context.tsx     # React Context with state
│   │
│   └── types/
│       └── trading.ts               # 25+ TypeScript interfaces
│
├── public/                          # Static assets
├── tailwind.config.ts              # Tailwind CSS v4 config
├── tsconfig.json                   # TypeScript config
├── next.config.ts                  # Next.js config
├── package.json                    # Dependencies
├── vercel.json                     # Vercel deployment config
└── README.md                       # This file
```

### Tech Stack

| Category | Technology | Version | Why? |
|:---------|:-----------|:--------|:-----|
| **Framework** | Next.js | 16.1.6 | Latest App Router, Turbopack, instant HMR |
| **Language** | TypeScript | 5.x | Full type safety, 25+ interfaces |
| **UI Library** | React | 19.2.3 | Latest stable with Server Components |
| **Styling** | Tailwind CSS | v4 | Modern `@theme inline` syntax, zero-config |
| **Charts** | Recharts | 3.7.0 | Composable, React-native charting |
| **Animation** | Framer Motion | 12.33.0 | Buttery smooth 60fps animations |
| **Icons** | Lucide React | 0.563.0 | 40+ icons with consistent design |
| **Blockchain** | @solana/web3.js | 1.98.1 | Solana wallet + RPC integration |
| **Deriverse** | @deriverse/kit | 1.0.39 | Protocol SDK (prepared for real data) |
| **Deployment** | Vercel | Cloud | Zero-config, instant global CDN |

### Analytics Functions (15)

All implemented in `src/lib/analytics.ts`:

1. **calculateSharpeRatio** — Risk-adjusted return metric
2. **calculateSortinoRatio** — Downside deviation only
3. **calculateCalmarRatio** — Return vs max drawdown
4. **calculateMaxDrawdown** — Largest peak-to-trough decline
5. **calculateWinRate** — Win percentage
6. **calculateProfitFactor** — Gross profit / gross loss
7. **calculateAverageWin** — Mean of winning trades
8. **calculateAverageLoss** — Mean of losing trades
9. **calculateExpectancy** — Expected value per trade
10. **calculateRiskRewardRatio** — Avg win / avg loss
11. **calculateValueAtRisk** — 95th/99th percentile loss
12. **calculateKellyCriterion** — Optimal position sizing
13. **calculateConsistency** — Profit ratio across buckets
14. **calculatePearsonCorrelation** — Symbol correlation matrix
15. **generateEquityCurve** — Cumulative balance over time

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17+ or 20.x
- npm, pnpm, yarn, or bun

### Local Development
│       ├── kpi-card.tsx            # Color-coded KPI + sparklines
│       ├── risk-health-gauge.tsx   # Circular SVG gauge
│       ├── live-ticker.tsx         # Scrolling real-time price ticker
│       ├── metric-card.tsx
│       ├── chart-container.tsx
│       ├── export-button.tsx       # CSV/JSON export
│       ├── loading-skeleton.tsx    # Shimmer states
│       ├── animated-counter.tsx    # Scroll-triggered number animations
│       ├── page-transition.tsx     # Animated page transitions
│       ├── welcome-toast.tsx       # Onboarding toast with shortcuts hint
│       └── animations.tsx          # Framer Motion utilities
│
├── context/
│   └── trading-context.tsx          # Global state (15 memoized values)
│
├── lib/
│   ├── analytics.ts                # 15 analytics functions
│   ├── mock-data.ts                # 300 realistic trades (seeded)
│   └── utils.ts                    # Formatting utilities
│
└── types/
    └── trading.ts                  # 25+ TypeScript interfaces
```

---

## 🔧 Tech Stack

| Technology | Version | Purpose |
|:---|:---|:---|
| **Next.js** | 16.1.6 | React framework (App Router, Turbopack, SSR) |
| **React** | 19.2.3 | UI library |
| **TypeScript** | 5.x | Type-safe development |
| **Tailwind CSS** | v4 | Utility-first CSS with `@theme inline` |
| **Recharts** | 3.7.0 | 18 chart components |
| **Framer Motion** | 12.33.0 | Animations (sidebar, gauge, staggered cards) |
| **Lucide React** | 0.563.0 | 40+ icons |
| **@solana/kit** | 2.3.0 | Solana blockchain integration |
| **@deriverse/kit** | 1.0.39 | Deriverse protocol SDK |
| **Radix UI** | latest | Accessible UI primitives |

---

## 🚀 Getting Started

### Live Demo

**[deriverse-analytics-azure.vercel.app](https://deriverse-analytics-azure.vercel.app)**

### Local Development

```bash
# Clone the repository
git clone https://github.com/Rahul-Prasad-07/deriverse-analytics.git
cd deriverse-analytics

# Install dependencies
npm install
# or
pnpm install
# or
yarn install
# or
bun install

# Run development server
npm run dev
# or
pnpm dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Build
npm run build

# Start production server
npm start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rahul-Prasad-07/deriverse-analytics)

Or via CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel deploy --prod
```

---

## 🎓 Learning Resources

- **[Deriverse Docs](https://docs.deriverse.io)** — Protocol documentation
- **[Deriverse GitHub](https://github.com/deriverse)** — Source code and examples
- **[Next.js 16 Docs](https://nextjs.org/docs)** — Framework reference
- **[Recharts Docs](https://recharts.org)** — Charting library guide
- **[Tailwind CSS v4](https://tailwindcss.com/docs)** — Styling reference
- **[Framer Motion](https://www.framer.com/motion/)** — Animation API

---

## 🏆 Submission Highlights

### What Makes This Project Stand Out

1. **Institutional-Grade Analytics** — This isn't just a dashboard; it's a complete trading analytics platform with 15 professional-grade calculations (Sharpe, Sortino, Calmar, VaR, Kelly Criterion, etc.) that real traders use to evaluate performance.

2. **Obsessive Attention to Detail** — Every component has been carefully crafted with animations, loading states, error handling, and edge cases considered. The Risk Health Gauge alone required custom SVG path calculations for smooth circular animations.

3. **Developer Experience** — Zero build errors, full TypeScript coverage with 25+ interfaces, consistent code patterns, and comprehensive comments. Any developer can jump in and understand the codebase immediately.

4. **User Experience Innovation** — Features like the ⌘K command palette, live price ticker with sparklines, and clickable trade detail modals are normally found in $50k/year Bloomberg Terminals — we've brought them to the web for free.

5. **Real-World Ready** — The `@deriverse/kit` integration is already in place. Swapping from mock data to live Deriverse protocol data requires changing just one import. The analytics functions work on any trade data shape.

### Technical Innovations

- **Custom Circular Gauge** — Built from scratch using SVG paths with Framer Motion animations for the risk health score (0-100 with A+ to F grades)
- **Advanced Correlation Matrix** — Full Pearson correlation calculations across all symbols with interactive color-coded heatmap
- **Intelligent Time Analysis** — Hourly heatmaps, weekday patterns, and session breakdowns to find optimal trading times
- **Equity Curve with Benchmark** — Dual Y-axis chart comparing portfolio performance vs 8% annual benchmark with drawdown overlay
- **Smart Filtering** — Multi-dimensional filter panel for journal with symbol, market type, side, order type, status, and P&L range filters
- **Responsive Command Palette** — Fuzzy search with grouped results (Pages, Symbols, Metrics), keyboard navigation, and inline symbol stats
- **Trade Detail Modal** — Click any trade row for full breakdown including MAE/MFE (Max Adverse/Favorable Excursion), risk/reward ratio, strategy tags, and Solscan links

### Why This Helps Traders

- **Find Your Edge** — Return distribution and correlation analysis show which strategies and symbols work best together
- **Optimize Timing** — Hourly heatmaps and session breakdown reveal when you're most profitable
- **Manage Risk** — Real-time risk health score, VaR calculations, and Kelly Criterion for optimal position sizing
- **Track Everything** — 300 mock trades demonstrate how the journal handles high-volume trading with pagination and filtering
- **Export Data** — CSV/JSON export lets traders bring data into Excel, Python, or other tools

---

## 🚧 Future Roadmap

- [ ] **Live Deriverse Integration** — Connect to real Deriverse protocol data via WebSocket
- [ ] **Multi-Wallet Support** — Connect multiple wallets and aggregate performance
- [ ] **Custom Alerts** — Set up notifications for P&L thresholds, risk limits, strategy signals
- [ ] **AI Trading Assistant** — GPT-4 powered insights and trade suggestions
- [ ] **Mobile App** — React Native version with push notifications
- [ ] **Strategy Backtesting** — Historical simulation engine for testing ideas
- [ ] **Social Features** — Share strategies, compete on leaderboards
- [ ] **Portfolio Optimization** — AI-driven position sizing and rebalancing
- [ ] **Tax Reports** — Generate tax forms with realized gains/losses

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with ❤️ for the [Deriverse](https://deriverse.io) community.

- **Deriverse Team** — For building an incredible on-chain trading protocol
- **Solana Labs** — For the fastest blockchain in the world
- **Vercel** — For making deployment effortless
- **Open Source Community** — For the amazing tools that made this possible

---

## 🔗 Links

- **🌐 Live Demo**: https://deriverse-analytics-azure.vercel.app
- **📦 GitHub**: https://github.com/Rahul-Prasad-07/deriverse-analytics
- **🔍 Vercel Inspect**: https://vercel.com/rahulprasad07s-projects/deriverse-analytics/4BrVPxJBdUXitNAbvuVPMRdw6JN5
- **📖 Deriverse Docs**: https://docs.deriverse.io
- **🐦 Deriverse Twitter**: https://twitter.com/deriverse_io

---

<div align="center">

**⭐ If you like this project, please give it a star on GitHub! ⭐**

Made with 💜 by [Rahul Prasad](https://github.com/Rahul-Prasad-07)

</div>
npm install

# Start development server (Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel

```bash
npm i -g vercel
### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rahul-Prasad-07/deriverse-analytics)

Or via CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel deploy --prod
```

All 7 routes build clean with zero errors:

```
✓ Compiled successfully
○ /                → Dashboard
○ /journal         → Trading Journal
○ /portfolio       → Portfolio Analysis
○ /performance     → Performance Analytics
○ /risk            → Risk Management
○ /settings        → Settings & Connections
○ /_not-found      → Custom 404
```

---

## 📊 Mock Data

This project includes **300 realistic trades** to demonstrate the platform's capabilities:

- **10 Solana Trading Pairs** — SOL, WBTC, WETH, BONK, JTO, PYTH, JUP, RNDR, HNT, RAY
- **90 Days of History** — Realistic per-asset volatility and price movements
- **4 Trading Strategies** — Momentum, Mean Reversion, Breakout, Scalping
- **Seeded Randomization** — Seed=42 for reproducible demos across deployments
- **Accurate Fee Structure** — 5bps taker, 0.625bps maker rebate matching Deriverse

All analytics functions work on any trade data shape. To connect real Deriverse data, simply swap the mock data import with live protocol queries via `@deriverse/kit`.

---

## 🔌 Deriverse Integration

Ready to connect to the live Deriverse protocol:

| Component | Status |
|:----------|:-------|
| **SDK** | `@deriverse/kit` v1.0.39 installed |
| **Program ID** | `Drvrseg8AQLP8B96DBGmHRjFGviFNYTkHueY9g3k27Gu` |
| **Price Oracle** | Pyth Network integration ready |
| **Markets** | Spot, Perpetual Futures, Options supported |
| **Fee Structure** | Matching live Deriverse rates (5bps taker, 0.625bps maker) |
| **Data Switch** | Change one import to go from mock → live |

---

## 📜 License

MIT

---

<p align="center">
  Built with ❤️ for the <a href="https://deriverse.io">Deriverse</a> ecosystem on <a href="https://solana.com">Solana</a>
  <br />
  <a href="https://deriverse-analytics-azure.vercel.app">Live Demo</a> · <a href="https://github.com/Rahul-Prasad-07/deriverse-analytics">GitHub</a>
</p>
