# 🚀 Deriverse Analytics — Institutional-Grade Trading Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/Deriverse-00d4aa?style=for-the-badge&logoColor=white" alt="Deriverse" />
  <img src="https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white" alt="Solana" />
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Recharts-22b5bf?style=for-the-badge" alt="Recharts" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

<p align="center">
  <b>The most comprehensive trading analytics platform for the <a href="https://deriverse.io">Deriverse</a> on-chain ecosystem</b>
  <br />
  <i>Professional journal · Portfolio analysis · Risk management · Strategy breakdown · Equity curves · KPI dashboards</i>
</p>

<p align="center">
  <a href="https://deriverse-analytics-azure.vercel.app"><strong>🌐 Live Demo →</strong></a>
</p>

---

## ✨ Overview

**Deriverse Analytics** is an institutional-grade trading analytics dashboard designed specifically for the [Deriverse](https://deriverse.io) protocol — a next-gen, fully on-chain, decentralized Solana trading ecosystem supporting **spot**, **perpetual futures**, and **options** markets.

This dashboard transforms raw trade data into actionable intelligence, helping traders optimize strategies, manage risk, and track performance with the depth and quality of a Bloomberg terminal — in a sleek, modern web UI.

### 🔑 Highlights

| Stat | Value |
|:---|:---|
| TypeScript Files | **58** |
| Chart Components | **18** |
| Pages | **7** (+ custom 404) |
| Analytics Functions | **15** |
| TypeScript Interfaces | **25+** |
| Mock Trades | **300** across 10 pairs |

### Why This Project?

- **18 chart components** covering every dimension of trading analysis
- **8 KPI cards** with live sparklines and color-coded health status
- **Risk Health Score** — composite 0-100 grade (A+ to F) with actionable recommendations
- **Equity Curve** with benchmark comparison and drawdown overlay
- **Strategy Performance** breakdown with Sharpe, profit factor, and win rate per strategy
- **Symbol Correlation Matrix** — Pearson correlation heatmap across all trading pairs
- **Return Distribution** histogram for P&L analysis
- **Capital Flow Tracking** with deposit/withdrawal visualization
- **Live Price Ticker** — scrolling real-time price feed with sparklines for all traded symbols
- **Trade Detail Modal** — click any trade for full breakdown (entry/exit, fees, strategy, tags, Solscan link)
- **CSV/JSON Export** for offline analysis
- **⌘K Command Palette** — fuzzy search pages, symbols, metrics
- **⌘/ Keyboard Shortcuts Panel** with full shortcut reference
- **⌘1-6 Quick Navigation** — jump to any page with one keystroke
- **IDE-style Status Bar** — live P&L, win rate, connection state, trade count
- **Mini P&L Indicator** in sidebar with trend icon
- **Welcome Onboarding Toast** — first-visit keyboard tips
- **Animated Page Transitions** — smooth fade+slide between routes
- **Custom 404 Page** with branded design and navigation
- **Mobile Responsive** — hamburger menu, adaptive layouts
- **Dark theme** design inspired by professional trading terminals

---

## 🎯 Features by Page

### 📊 Dashboard (`/`)
- **8 KPI Cards** — Total P&L, Sharpe Ratio, Max Drawdown, Win Rate, Profit Factor, Sortino Ratio, Expectancy, VaR (95%) — each with color-coded status (good/warning/danger), SVG sparklines, and hover descriptions
- **Equity Curve** — Portfolio value vs 8% annual benchmark, with drawdown area overlay on dual Y-axes
- **Cumulative P&L Chart** — Area chart with gradient fills
- **Drawdown Analysis** — Real-time drawdown percentage tracking
- **Daily P&L Bars** — Color-coded daily performance
- **Volume Chart** — Daily volume with fee overlay
- **Strategy Breakdown** — Per-strategy performance cards with animated progress bars
- **Win Rate + Long/Short Ratio** — Compact visual summaries

### 📔 Trading Journal (`/journal`)
- **Full Trade History Table** — Sortable by 7 columns (date, symbol, side, P&L, %, volume, duration)
- **Trade Detail Modal** — Click any row to see full breakdown: P&L hero card, entry/exit, volume, leverage, strategy, R:R ratio, MAE/MFE, fee breakdown, tags, notes, and Solscan tx link
- **Inline Annotations** — Click to add/edit notes on any trade
- **Tag System** — Auto-categorized tags (breakout, scalp, momentum, etc.)
- **Multi-Filter Panel** — Filter by symbol, market type, side, order type, status, P&L range
- **Pagination** — 20 trades per page with navigation
- **Solana Explorer Links** — Direct tx links for on-chain verification
- **CSV/JSON Export** — Download filtered trades with all metadata

### 💼 Portfolio Analysis (`/portfolio`)
- **Symbol Performance** — Horizontal bar chart comparing all 10 trading pairs
- **Detailed Symbol Table** — 11 columns: win rate, P&L, avg P&L, volume, long/short split, best/worst, avg duration, profit factor
- **Strategy Breakdown** — Performance cards per strategy (Momentum, Mean Reversion, Breakout, Scalping)
- **Capital Flows** — Balance area chart with deposit/withdrawal bars
- **Order Type Performance** — Market vs Limit vs Stop analysis
- **Fee Analysis** — Taker, maker, funding, liquidation breakdown
- **Cumulative Fee Chart** — Fee accumulation over time

### ⚡ Performance Analytics (`/performance`)
- **Daily P&L Trending** — Time-series performance
- **Return Distribution** — P&L histogram with green/red color coding
- **Correlation Heatmap** — Interactive Pearson correlation matrix across all symbols
- **Hourly Heatmap** — 24-hour P&L distribution (find optimal trading times)
- **Weekday Analysis** — Day-of-week patterns
- **Session Analysis** — Asian/European/American session breakdown
- **Calendar Heatmap** — 42-day visual calendar with P&L intensity coloring
- **Time Insights** — Best hour, best weekday, best session cards

### 🛡️ Risk Management (`/risk`)
- **Risk Health Score** — Animated circular gauge (0-100) with A+ to F grade
  - Component scores: Sharpe (0-25), Drawdown (0-25), Consistency (0-25), Risk/Reward (0-25)
  - Auto-generated warnings and recommendations
- **Risk Ratios** — Sharpe, Sortino, Calmar, Expectancy with color-coded ratings
- **Key Metrics** — Max Drawdown, Risk/Reward, Kelly %, Volatility
- **VaR Analysis** — 95th and 99th percentile Value at Risk with progress bars
- **Streak Tracking** — Current streak, max consecutive wins/losses
- **Largest Win/Loss** — Detailed trade cards for extreme outcomes
- **Win/Loss Distribution** — Visual ratio bars with R:R analysis

### ⚙️ Settings (`/settings`)
- **Connection Status** — Deriverse Mainnet, Program ID, Price Oracle, Wallet status with live indicators
- **Wallet Management** — Connect/disconnect with balance display
- **API Configuration** — Editable RPC and WebSocket endpoints
- **Preferences** — Trade notifications, risk alerts, auto-refresh toggles

### 🎹 Global UX Features
- **Live Price Ticker** — Scrolling real-time price feed with mini-sparklines for all 10 symbols, auto-updating every 3s
- **⌘K Command Palette** — Fuzzy search across pages, symbols (with stats), and metrics; keyboard navigable
- **⌘/ Shortcuts Panel** — Full keyboard shortcut reference modal
- **⌘1-6 Quick Nav** — Jump to any page instantly with one keystroke
- **IDE-style Status Bar** — Shows current page, connection status, live P&L, win rate, trade count, and date
- **Sidebar Mini P&L** — Color-coded total P&L indicator with trend icon below navigation
- **Welcome Toast** — First-visit onboarding notification teaching keyboard shortcuts (session-based)
- **Animated Page Transitions** — Smooth fade+slide on every route change
- **Mobile Responsive** — Sidebar hidden on small screens with hamburger toggle, adaptive padding
- **Custom 404** — Branded not-found page with gradient glow, navigation buttons, and Framer Motion animations

---

## 🏗️ Architecture

```
src/
├── app/                              # Next.js 16 App Router
│   ├── layout.tsx                   # Root layout (Provider + Sidebar + Main)
│   ├── page.tsx                     # Dashboard
│   ├── journal/page.tsx
│   ├── portfolio/page.tsx
│   ├── performance/page.tsx
│   ├── risk/page.tsx
│   ├── settings/page.tsx
│   └── not-found.tsx                # Custom 404
│
├── components/
│   ├── charts/                      # 18 chart components
│   │   ├── pnl-chart.tsx           # Cumulative P&L area
│   │   ├── equity-curve-chart.tsx  # Equity vs benchmark + drawdown
│   │   ├── drawdown-chart.tsx
│   │   ├── daily-pnl-chart.tsx
│   │   ├── volume-chart.tsx
│   │   ├── return-distribution-chart.tsx  # P&L histogram
│   │   ├── correlation-heatmap.tsx # Symbol correlation matrix
│   │   ├── capital-flow-chart.tsx  # Balance + deposits/withdrawals
│   │   ├── strategy-breakdown.tsx  # Per-strategy cards
│   │   ├── win-rate-chart.tsx
│   │   ├── long-short-ratio.tsx
│   │   ├── symbol-performance-chart.tsx
│   │   ├── hourly-heatmap.tsx
│   │   ├── weekday-chart.tsx
│   │   ├── session-chart.tsx
│   │   ├── fee-breakdown-chart.tsx
│   │   ├── cumulative-fee-chart.tsx
│   │   └── order-type-chart.tsx
│   │
│   ├── layout/
│   │   ├── sidebar.tsx             # Animated collapsible sidebar + mini P&L
│   │   ├── main-content.tsx        # Animated main content area + status bar
│   │   ├── status-bar.tsx          # IDE-style top status bar
│   │   ├── time-frame-selector.tsx
│   │   ├── command-palette.tsx     # ⌘K fuzzy search overlay
│   │   ├── keyboard-shortcuts.tsx  # ⌘/ shortcuts panel
│   │   └── global-keyboard-nav.tsx # ⌘1-6 page navigation
│   │
│   ├── pages/                       # 6 page content components
│   │
│   ├── journal/
│   │   ├── trade-table.tsx         # Sortable, paginated trade history
│   │   ├── trade-detail-modal.tsx  # Full trade breakdown modal
│   │   └── filter-panel.tsx
│   │
│   └── ui/
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
vercel login
vercel deploy --prod
```

All 7 routes build clean:
```
○ /                → Dashboard
○ /journal         → Trading Journal
○ /portfolio       → Portfolio Analysis
○ /performance     → Performance Analytics
○ /risk            → Risk Management
○ /settings        → Settings & Connections
○ /_not-found      → Custom 404
```

---

## 📈 Analytics Engine

15 functions in `src/lib/analytics.ts`:

| Category | Metrics |
|:---|:---|
| **Risk** | Sharpe, Sortino, Calmar, VaR (95/99%), Kelly Criterion, Risk Health Score (composite 0-100) |
| **Performance** | Profit Factor, Expectancy, Win/Loss Streaks, Return Distribution, Strategy Performance |
| **Portfolio** | Equity Curve (vs benchmark), Capital Flows, Symbol Correlation (Pearson), KPI Dashboard |

---

## 🔗 Deriverse Integration

| Aspect | Detail |
|:---|:---|
| **Protocol** | Fully on-chain, decentralized trading on Solana |
| **Markets** | Spot, Perpetual Futures, Options |
| **Fee Structure** | 5bps taker, 0.625bps maker rebate |
| **SDK** | `@deriverse/kit` v1.0.39 |
| **Program ID** | `Drvrseg8AQLP8B96DBGmHRjFGviFNYTkHueY9g3k27Gu` |
| **Price Oracle** | Pyth Network |

---

## 📐 Mock Data

- **300 trades** across 10 Solana pairs (SOL, WBTC, WETH, BONK, JTO, PYTH, JUP, RNDR, HNT, RAY)
- **90 days** of history with realistic per-asset volatility
- **4 strategies** — Momentum, Mean Reversion, Breakout, Scalping
- **Seeded randomization** (seed=42) for reproducible demos
- **Accurate Deriverse fee tiers** with maker/taker/funding

---

## 📜 License

MIT

---

<p align="center">
  Built with ❤️ for the <a href="https://deriverse.io">Deriverse</a> ecosystem on <a href="https://solana.com">Solana</a>
  <br />
  <a href="https://deriverse-analytics-azure.vercel.app">Live Demo</a> · <a href="https://github.com/Rahul-Prasad-07/deriverse-analytics">GitHub</a>
</p>
