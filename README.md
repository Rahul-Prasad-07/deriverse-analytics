<div align="center">

# 🚀 Deriverse Analytics

### Institutional-grade trading analytics for [Deriverse](https://deriverse.io) protocol

[![Live Demo](https://img.shields.io/badge/🌐_LIVE_DEMO-deriverse--analytics-00d4aa?style=for-the-badge)](https://deriverse-analytics-azure.vercel.app)

![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Solana](https://img.shields.io/badge/Solana-Powered-9945FF?logo=solana)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)

</div>

---

## ✨ What Is This?

A professional trading dashboard for **Deriverse** — the fully on-chain decentralized trading protocol on Solana. Track performance, analyze strategies, manage risk, and optimize your trading with institutional-grade analytics.

Built with Next.js 16, TypeScript, and Recharts. **58 files · 18 charts · 7 pages · 300 trades · Zero errors.**

**🎯 [View Live Demo →](https://deriverse-analytics-azure.vercel.app)**

---

## 🔥 Key Features

### 📊 **Analytics Engine**
- **18 Interactive Charts** — Equity curves, P&L distribution, correlation heatmaps, hourly patterns
- **15 Metrics** — Sharpe, Sortino, Calmar, VaR, Kelly Criterion, Profit Factor, Win Rate
- **Risk Health Score** — 0-100 composite grade (A+ to F) with animated circular gauge
- **Strategy Breakdown** — Momentum, Mean Reversion, Breakout, Scalping performance

### 📔 **Trading Journal**
- **Full Trade History** — Sortable table with 300+ mock trades across 10 Solana pairs
- **Trade Detail Modal** — Click any trade for complete breakdown (P&L, fees, R:R, MAE/MFE, Solscan link)
- **Multi-Filter Panel** — Filter by symbol, side, strategy, P&L range, date
- **CSV/JSON Export** — Download filtered data for offline analysis

### 🎨 **UX Innovation**
- **⌘K Command Palette** — Fuzzy search pages, symbols, metrics with keyboard navigation
- **⌘1-6 Quick Nav** — Jump to any page instantly
- **Live Price Ticker** — Scrolling real-time feed with mini-sparklines
- **IDE-style Status Bar** — Live P&L, win rate, trade count always visible
- **Animated Transitions** — Smooth 60fps page changes with Framer Motion
- **Mobile Responsive** — Adaptive layouts, hamburger menu, touch-optimized

---

## 🛠️ Tech Stack

**Framework:** Next.js 16.1.6 (App Router + Turbopack)  
**Language:** TypeScript 5 with 25+ interfaces  
**UI:** React 19 + Tailwind CSS v4  
**Charts:** Recharts 3.7 (18 components)  
**Animation:** Framer Motion 12.33  
**Blockchain:** @solana/web3.js + @deriverse/kit  
**Deployment:** Vercel (zero config)

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/Rahul-Prasad-07/deriverse-analytics.git
cd deriverse-analytics

# Install
npm install

# Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel

```bash
npm i -g vercel
vercel login
vercel deploy --prod
```

---

## 📊 Pages Overview

| Page | Route | Features |
|:-----|:------|:---------|
| **Dashboard** | `/` | 8 KPI cards, equity curve, daily P&L, strategy breakdown |
| **Journal** | `/journal` | Trade table, detail modal, filters, export |
| **Portfolio** | `/portfolio` | Symbol performance, capital flows, fee analysis |
| **Performance** | `/performance` | Return distribution, correlation matrix, hourly heatmap |
| **Risk** | `/risk` | Health gauge, VaR analysis, streak tracking |
| **Settings** | `/settings` | Wallet connection, API config, preferences |

---

## 🏆 Why This Stands Out

1. **Institutional Math** — 15 analytics functions (Sharpe, Sortino, Calmar, VaR, Kelly) implemented correctly with proper edge case handling

2. **Production Quality** — Zero build errors, full TypeScript coverage, consistent patterns, comprehensive comments

3. **Real Traders Use This** — Correlation matrices, MAE/MFE tracking, hourly patterns, risk health scores — features from $50k/year terminals, free on the web

4. **Ready for Real Data** — `@deriverse/kit` integrated. Swap one import to go from mock → live protocol data

5. **UX Excellence** — Command palette, keyboard shortcuts, live ticker, trade modals — details matter

---

## 📊 Mock Data

**300 realistic trades** across 10 Solana pairs (SOL, WBTC, WETH, BONK, JTO, PYTH, JUP, RNDR, HNT, RAY)  
**90 days history** · **4 strategies** · **Seed=42** for reproducible demos  
**Accurate fees** — 5bps taker, 0.625bps maker matching Deriverse

---

## 🔗 Links

**🌐 Live:** https://deriverse-analytics-azure.vercel.app  
**📦 GitHub:** https://github.com/Rahul-Prasad-07/deriverse-analytics  
**📖 Deriverse:** https://deriverse.io | https://docs.deriverse.io

---

## 📄 License

MIT — Built for the Deriverse community on Solana

<div align="center">

**⭐ Star this repo if you find it useful!**

Made by [Rahul Prasad](https://github.com/Rahul-Prasad-07)

</div>
