// ============================================================================
// Deriverse Trading Analytics - Realistic Mock Data Generator
// ============================================================================

import {
  Trade,
  TradeFees,
  MarketType,
  OrderSide,
  OrderType,
  TradeStatus,
  DailyPerformance,
  PortfolioSnapshot,
} from "@/types/trading";

const SYMBOLS = [
  "SOL/USDC",
  "WBTC/USDC",
  "WETH/USDC",
  "BONK/USDC",
  "JTO/USDC",
  "PYTH/USDC",
  "JUP/USDC",
  "RNDR/USDC",
  "HNT/USDC",
  "RAY/USDC",
];

const SYMBOL_PRICES: Record<string, { base: number; volatility: number }> = {
  "SOL/USDC": { base: 185, volatility: 0.08 },
  "WBTC/USDC": { base: 97500, volatility: 0.05 },
  "WETH/USDC": { base: 3350, volatility: 0.06 },
  "BONK/USDC": { base: 0.000032, volatility: 0.15 },
  "JTO/USDC": { base: 3.8, volatility: 0.12 },
  "PYTH/USDC": { base: 0.45, volatility: 0.10 },
  "JUP/USDC": { base: 1.2, volatility: 0.11 },
  "RNDR/USDC": { base: 8.5, volatility: 0.09 },
  "HNT/USDC": { base: 6.2, volatility: 0.08 },
  "RAY/USDC": { base: 5.8, volatility: 0.10 },
};

const STRATEGIES = [
  "Momentum",
  "Mean Reversion",
  "Breakout",
  "Scalping",
];

const TAGS = [
  "breakout",
  "trend-following",
  "mean-reversion",
  "scalp",
  "swing",
  "news",
  "technical",
  "momentum",
  "support-bounce",
  "resistance-rejection",
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function randomBetween(
  random: () => number,
  min: number,
  max: number
): number {
  return min + random() * (max - min);
}

function randomInt(random: () => number, min: number, max: number): number {
  return Math.floor(randomBetween(random, min, max));
}

function pickRandom<T>(random: () => number, arr: T[]): T {
  return arr[Math.floor(random() * arr.length)];
}

function generateTxSignature(random: () => number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 88; i++) {
    result += chars.charAt(Math.floor(random() * chars.length));
  }
  return result;
}

function generateFees(
  volume: number,
  marketType: MarketType,
  random: () => number
): TradeFees {
  const baseFeeRate = 0.0005; // 5 bps
  const isMaker = random() > 0.6;
  const makerRebateRate = 0.000_062_5; // 0.625 bps

  const maker = isMaker ? volume * makerRebateRate : 0;
  const taker = isMaker ? 0 : volume * baseFeeRate;
  const funding = marketType === "perpetual" ? volume * randomBetween(random, -0.001, 0.001) : 0;
  const liquidation = 0;
  const total = taker - maker + Math.abs(funding);

  return { maker, taker, funding, liquidation, total };
}

export function generateTrades(count: number = 250, seed: number = 42): Trade[] {
  const random = seededRandom(seed);
  const trades: Trade[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const symbol = pickRandom(random, SYMBOLS);
    const priceInfo = SYMBOL_PRICES[symbol];
    const marketType: MarketType = random() > 0.4 ? "perpetual" : "spot";
    const side: OrderSide = random() > 0.45 ? "long" : "short";
    const orderType: OrderType = pickRandom(random, [
      "market",
      "limit",
      "limit",
      "limit",
      "stop",
      "stop-limit",
      "ioc",
    ]);
    const leverage = marketType === "perpetual" ? randomInt(random, 1, 11) : 1;

    // Time distribution over past 90 days with more recent trades
    const daysAgo = Math.pow(random(), 1.5) * 90;
    const entryTime = new Date(
      now.getTime() - daysAgo * 86400000 - randomInt(random, 0, 86400) * 1000
    );

    // Duration varies: scalps = minutes, swings = days
    const isScalp = random() > 0.7;
    const durationMinutes = isScalp
      ? randomBetween(random, 2, 120)
      : randomBetween(random, 120, 7200);

    const exitTime = new Date(entryTime.getTime() + durationMinutes * 60000);
    const isClosed = exitTime < now;

    // Price generation with realistic moves
    const entryPrice =
      priceInfo.base *
      (1 + randomBetween(random, -priceInfo.volatility, priceInfo.volatility));
    const priceMove =
      randomBetween(random, -priceInfo.volatility * 0.5, priceInfo.volatility * 0.5) *
      (isScalp ? 0.3 : 1);

    // Slight edge: 53% directional accuracy for a skilled trader
    const isWin = random() < 0.53;
    const moveDirection = isWin
      ? side === "long"
        ? 1
        : -1
      : side === "long"
        ? -1
        : 1;
    const exitPrice = isClosed
      ? entryPrice * (1 + priceMove * moveDirection)
      : null;

    // Realistic quantity based on price
    const notionalValue = randomBetween(random, 500, 25000);
    const quantity = notionalValue / entryPrice;

    // PnL calculation
    let pnl = 0;
    let pnlPercent = 0;
    if (exitPrice !== null) {
      const priceDiff = side === "long" ? exitPrice - entryPrice : entryPrice - exitPrice;
      pnl = priceDiff * quantity * leverage;
      pnlPercent = (priceDiff / entryPrice) * 100 * leverage;
    }

    const volume = quantity * entryPrice;
    const fees = generateFees(volume, marketType, random);
    pnl -= fees.total;

    const fundingPayments =
      marketType === "perpetual"
        ? volume * randomBetween(random, -0.002, 0.002) * (durationMinutes / 1440)
        : 0;

    const status: TradeStatus = !isClosed
      ? "open"
      : random() < 0.03
        ? "liquidated"
        : "closed";

    // Annotations for some trades
    const hasAnnotation = random() < 0.25;
    const annotations = [
      "Entry based on breakout above resistance at key level",
      "Followed momentum after news catalyst",
      "Mean reversion play at support zone",
      "Took profit early due to increasing volatility",
      "Stopped out, should have used wider stop",
      "Perfect entry, could have held longer",
      "Funding rate was favorable for this direction",
      "Scaled into position over 3 entries",
      "Hedging against spot exposure",
      "Breakout trade with volume confirmation",
    ];

    const numTags = randomInt(random, 0, 4);
    const tradeTags: string[] = [];
    for (let t = 0; t < numTags; t++) {
      const tag = pickRandom(random, TAGS);
      if (!tradeTags.includes(tag)) tradeTags.push(tag);
    }

    trades.push({
      id: `trade-${i.toString().padStart(4, "0")}`,
      symbol,
      marketType,
      side,
      orderType,
      status,
      entryPrice,
      exitPrice,
      quantity,
      leverage,
      entryTime,
      exitTime: isClosed ? exitTime : null,
      pnl,
      pnlPercent,
      fees,
      fundingPayments,
      strategy: pickRandom(random, STRATEGIES),
      liquidationPrice:
        marketType === "perpetual"
          ? side === "long"
            ? entryPrice * (1 - 1 / leverage * 0.9)
            : entryPrice * (1 + 1 / leverage * 0.9)
          : null,
      annotation: hasAnnotation ? pickRandom(random, annotations) : null,
      tags: tradeTags,
      txSignature: generateTxSignature(random),
    });
  }

  // Sort by entry time descending
  trades.sort((a, b) => b.entryTime.getTime() - a.entryTime.getTime());
  return trades;
}

export function generateDailyPerformance(trades: Trade[]): DailyPerformance[] {
  const dailyMap = new Map<string, { pnl: number; trades: number; wins: number; volume: number; fees: number }>();
  
  const closedTrades = trades.filter((t) => t.status !== "open");
  
  closedTrades.forEach((trade) => {
    const date = trade.exitTime
      ? trade.exitTime.toISOString().split("T")[0]
      : trade.entryTime.toISOString().split("T")[0];
    
    const existing = dailyMap.get(date) || {
      pnl: 0, trades: 0, wins: 0, volume: 0, fees: 0,
    };
    
    existing.pnl += trade.pnl;
    existing.trades += 1;
    existing.wins += trade.pnl > 0 ? 1 : 0;
    existing.volume += trade.quantity * trade.entryPrice;
    existing.fees += trade.fees.total;
    
    dailyMap.set(date, existing);
  });

  const dates = Array.from(dailyMap.keys()).sort();
  let cumulativePnl = 0;
  let peak = 0;

  return dates.map((date) => {
    const day = dailyMap.get(date)!;
    cumulativePnl += day.pnl;
    peak = Math.max(peak, cumulativePnl);
    const drawdown = peak - cumulativePnl;

    return {
      date,
      pnl: day.pnl,
      cumulativePnl,
      trades: day.trades,
      winRate: day.trades > 0 ? (day.wins / day.trades) * 100 : 0,
      volume: day.volume,
      fees: day.fees,
      maxDrawdown: drawdown,
    };
  });
}

export function generatePortfolioSnapshots(
  dailyPerformance: DailyPerformance[],
  initialBalance: number = 10000
): PortfolioSnapshot[] {
  let balance = initialBalance;
  let peak = initialBalance;

  return dailyPerformance.map((day) => {
    balance += day.pnl;
    peak = Math.max(peak, balance);
    const drawdown = peak - balance;
    const drawdownPercent = peak > 0 ? (drawdown / peak) * 100 : 0;

    return {
      timestamp: new Date(day.date),
      totalValue: balance,
      pnl: day.pnl,
      cumulativePnl: day.cumulativePnl,
      drawdown,
      drawdownPercent,
    };
  });
}
