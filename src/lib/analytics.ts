// ============================================================================
// Deriverse Trading Analytics - Comprehensive Analytics Calculations
// ============================================================================

import {
  Trade,
  OverviewMetrics,
  SymbolStats,
  TimeOfDayStats,
  SessionStats,
  RiskMetrics,
  OrderTypeStats,
  FeeBreakdown,
  DailyPerformance,
  TradingSession,
  ReturnBucket,
  CorrelationPair,
  RiskHealthScore,
  KPIDefinition,
  EquityCurvePoint,
  CapitalFlow,
  StrategyPerformance,
} from "@/types/trading";

export function calculateOverviewMetrics(trades: Trade[]): OverviewMetrics {
  const closedTrades = trades.filter((t) => t.status !== "open");
  const winningTrades = closedTrades.filter((t) => t.pnl > 0);
  const losingTrades = closedTrades.filter((t) => t.pnl <= 0);

  const totalPnl = closedTrades.reduce((sum, t) => sum + t.pnl, 0);
  const totalVolume = closedTrades.reduce(
    (sum, t) => sum + t.quantity * t.entryPrice,
    0
  );
  const totalFees = closedTrades.reduce((sum, t) => sum + t.fees.total, 0);
  const longTrades = closedTrades.filter((t) => t.side === "long");
  const shortTrades = closedTrades.filter((t) => t.side === "short");

  const avgWin =
    winningTrades.length > 0
      ? winningTrades.reduce((sum, t) => sum + t.pnl, 0) / winningTrades.length
      : 0;
  const avgLoss =
    losingTrades.length > 0
      ? losingTrades.reduce((sum, t) => sum + t.pnl, 0) / losingTrades.length
      : 0;

  const grossProfit = winningTrades.reduce((sum, t) => sum + t.pnl, 0);
  const grossLoss = Math.abs(losingTrades.reduce((sum, t) => sum + t.pnl, 0));
  const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0;

  // Average trade duration in minutes
  const durationsMinutes = closedTrades
    .filter((t) => t.exitTime)
    .map(
      (t) =>
        (t.exitTime!.getTime() - t.entryTime.getTime()) / 60000
    );
  const avgTradeDuration =
    durationsMinutes.length > 0
      ? durationsMinutes.reduce((a, b) => a + b, 0) / durationsMinutes.length
      : 0;

  // Streak calculation
  let currentStreak = 0;
  let currentStreakType: "win" | "loss" | "none" = "none";
  const sortedByExit = [...closedTrades].sort(
    (a, b) => (b.exitTime?.getTime() || 0) - (a.exitTime?.getTime() || 0)
  );

  if (sortedByExit.length > 0) {
    currentStreakType = sortedByExit[0].pnl > 0 ? "win" : "loss";
    for (const trade of sortedByExit) {
      if (
        (currentStreakType === "win" && trade.pnl > 0) ||
        (currentStreakType === "loss" && trade.pnl <= 0)
      ) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  // Period PnL
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const todayPnl = closedTrades
    .filter((t) => t.exitTime && t.exitTime >= todayStart)
    .reduce((sum, t) => sum + t.pnl, 0);
  const weekPnl = closedTrades
    .filter((t) => t.exitTime && t.exitTime >= weekStart)
    .reduce((sum, t) => sum + t.pnl, 0);
  const monthPnl = closedTrades
    .filter((t) => t.exitTime && t.exitTime >= monthStart)
    .reduce((sum, t) => sum + t.pnl, 0);

  // Best/worst day
  const dailyPnl = new Map<string, number>();
  closedTrades.forEach((t) => {
    const date = (t.exitTime || t.entryTime).toISOString().split("T")[0];
    dailyPnl.set(date, (dailyPnl.get(date) || 0) + t.pnl);
  });

  return {
    totalPnl,
    totalPnlPercent: totalVolume > 0 ? (totalPnl / totalVolume) * 100 : 0,
    totalTrades: closedTrades.length,
    winRate:
      closedTrades.length > 0
        ? (winningTrades.length / closedTrades.length) * 100
        : 0,
    lossRate:
      closedTrades.length > 0
        ? (losingTrades.length / closedTrades.length) * 100
        : 0,
    totalVolume,
    totalFees,
    avgTradeDuration,
    avgWin,
    avgLoss,
    profitFactor,
    longShortRatio:
      shortTrades.length > 0
        ? longTrades.length / shortTrades.length
        : longTrades.length,
    longCount: longTrades.length,
    shortCount: shortTrades.length,
    bestDay: null,
    worstDay: null,
    currentStreak,
    currentStreakType,
    todayPnl,
    weekPnl,
    monthPnl,
  };
}

export function calculateSymbolStats(trades: Trade[]): SymbolStats[] {
  const closedTrades = trades.filter((t) => t.status !== "open");
  const symbolMap = new Map<string, Trade[]>();

  closedTrades.forEach((t) => {
    const arr = symbolMap.get(t.symbol) || [];
    arr.push(t);
    symbolMap.set(t.symbol, arr);
  });

  return Array.from(symbolMap.entries())
    .map(([symbol, symTrades]) => {
      const wins = symTrades.filter((t) => t.pnl > 0);
      const losses = symTrades.filter((t) => t.pnl <= 0);
      const totalPnl = symTrades.reduce((s, t) => s + t.pnl, 0);
      const volume = symTrades.reduce(
        (s, t) => s + t.quantity * t.entryPrice,
        0
      );
      const durations = symTrades
        .filter((t) => t.exitTime)
        .map((t) => (t.exitTime!.getTime() - t.entryTime.getTime()) / 60000);
      const avgDuration =
        durations.length > 0
          ? durations.reduce((a, b) => a + b, 0) / durations.length
          : 0;
      const grossProfit = wins.reduce((s, t) => s + t.pnl, 0);
      const grossLoss = Math.abs(losses.reduce((s, t) => s + t.pnl, 0));

      return {
        symbol,
        totalTrades: symTrades.length,
        winRate: (wins.length / symTrades.length) * 100,
        totalPnl,
        avgPnl: totalPnl / symTrades.length,
        avgDuration,
        volume,
        longCount: symTrades.filter((t) => t.side === "long").length,
        shortCount: symTrades.filter((t) => t.side === "short").length,
        bestTrade: Math.max(...symTrades.map((t) => t.pnl)),
        worstTrade: Math.min(...symTrades.map((t) => t.pnl)),
        profitFactor:
          grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0,
      };
    })
    .sort((a, b) => b.totalPnl - a.totalPnl);
}

export function calculateTimeOfDayStats(trades: Trade[]): TimeOfDayStats[] {
  const closedTrades = trades.filter((t) => t.status !== "open");
  const hourMap = new Map<
    number,
    { trades: number; pnl: number; wins: number }
  >();

  for (let h = 0; h < 24; h++) {
    hourMap.set(h, { trades: 0, pnl: 0, wins: 0 });
  }

  closedTrades.forEach((t) => {
    const hour = t.entryTime.getHours();
    const data = hourMap.get(hour)!;
    data.trades++;
    data.pnl += t.pnl;
    if (t.pnl > 0) data.wins++;
  });

  return Array.from(hourMap.entries()).map(([hour, data]) => ({
    hour,
    trades: data.trades,
    pnl: data.pnl,
    winRate: data.trades > 0 ? (data.wins / data.trades) * 100 : 0,
    avgPnl: data.trades > 0 ? data.pnl / data.trades : 0,
  }));
}

export function calculateSessionStats(trades: Trade[]): SessionStats[] {
  const closedTrades = trades.filter((t) => t.status !== "open");

  const getSession = (date: Date): TradingSession => {
    const hour = date.getUTCHours();
    if (hour >= 0 && hour < 8) return "asian";
    if (hour >= 8 && hour < 16) return "european";
    return "american";
  };

  const sessionMap = new Map<
    TradingSession,
    { trades: number; pnl: number; wins: number; volume: number }
  >();
  (["asian", "european", "american"] as TradingSession[]).forEach((s) => {
    sessionMap.set(s, { trades: 0, pnl: 0, wins: 0, volume: 0 });
  });

  closedTrades.forEach((t) => {
    const session = getSession(t.entryTime);
    const data = sessionMap.get(session)!;
    data.trades++;
    data.pnl += t.pnl;
    if (t.pnl > 0) data.wins++;
    data.volume += t.quantity * t.entryPrice;
  });

  return Array.from(sessionMap.entries()).map(([session, data]) => ({
    session,
    trades: data.trades,
    pnl: data.pnl,
    winRate: data.trades > 0 ? (data.wins / data.trades) * 100 : 0,
    volume: data.volume,
    avgPnl: data.trades > 0 ? data.pnl / data.trades : 0,
  }));
}

export function calculateRiskMetrics(
  trades: Trade[],
  dailyPerformance: DailyPerformance[]
): RiskMetrics {
  const closedTrades = trades.filter((t) => t.status !== "open");
  const winningTrades = closedTrades.filter((t) => t.pnl > 0);
  const losingTrades = closedTrades.filter((t) => t.pnl <= 0);

  // Max drawdown from daily performance
  let peak = 0;
  let maxDrawdown = 0;
  let maxDrawdownPercent = 0;
  dailyPerformance.forEach((day) => {
    peak = Math.max(peak, day.cumulativePnl);
    const dd = peak - day.cumulativePnl;
    if (dd > maxDrawdown) {
      maxDrawdown = dd;
      maxDrawdownPercent = peak > 0 ? (dd / peak) * 100 : 0;
    }
  });

  // Consecutive wins/losses
  const sorted = [...closedTrades].sort(
    (a, b) => (a.exitTime?.getTime() || 0) - (b.exitTime?.getTime() || 0)
  );
  let maxConsecutiveWins = 0;
  let maxConsecutiveLosses = 0;
  let currentWinStreak = 0;
  let currentLossStreak = 0;

  sorted.forEach((t) => {
    if (t.pnl > 0) {
      currentWinStreak++;
      currentLossStreak = 0;
      maxConsecutiveWins = Math.max(maxConsecutiveWins, currentWinStreak);
    } else {
      currentLossStreak++;
      currentWinStreak = 0;
      maxConsecutiveLosses = Math.max(maxConsecutiveLosses, currentLossStreak);
    }
  });

  // Current streak
  let currentStreak = 0;
  let currentStreakType: "win" | "loss" | "none" = "none";
  const reverseSorted = [...sorted].reverse();
  if (reverseSorted.length > 0) {
    currentStreakType = reverseSorted[0].pnl > 0 ? "win" : "loss";
    for (const t of reverseSorted) {
      if (
        (currentStreakType === "win" && t.pnl > 0) ||
        (currentStreakType === "loss" && t.pnl <= 0)
      ) {
        currentStreak++;
      } else break;
    }
  }

  // Avg win/loss
  const avgWin =
    winningTrades.length > 0
      ? winningTrades.reduce((s, t) => s + t.pnl, 0) / winningTrades.length
      : 0;
  const avgLoss =
    losingTrades.length > 0
      ? Math.abs(
          losingTrades.reduce((s, t) => s + t.pnl, 0) / losingTrades.length
        )
      : 0;

  const riskRewardRatio = avgLoss > 0 ? avgWin / avgLoss : avgWin > 0 ? Infinity : 0;

  // Expectancy
  const winRate = closedTrades.length > 0 ? winningTrades.length / closedTrades.length : 0;
  const expectancy = winRate * avgWin - (1 - winRate) * avgLoss;

  // Kelly %
  const kellyPercent =
    avgLoss > 0
      ? ((winRate * (avgWin / avgLoss) - (1 - winRate)) / (avgWin / avgLoss)) * 100
      : 0;

  // Daily returns for Sharpe/Sortino
  const dailyReturns = dailyPerformance.map((d) => d.pnl);
  const avgReturn =
    dailyReturns.length > 0
      ? dailyReturns.reduce((a, b) => a + b, 0) / dailyReturns.length
      : 0;
  const stdDev = Math.sqrt(
    dailyReturns.reduce((s, r) => s + Math.pow(r - avgReturn, 2), 0) /
      Math.max(dailyReturns.length - 1, 1)
  );
  const downDev = Math.sqrt(
    dailyReturns
      .filter((r) => r < 0)
      .reduce((s, r) => s + Math.pow(r, 2), 0) /
      Math.max(dailyReturns.filter((r) => r < 0).length - 1, 1)
  );

  const annualizedReturn = avgReturn * 252;
  const annualizedStdDev = stdDev * Math.sqrt(252);
  const annualizedDownDev = downDev * Math.sqrt(252);

  const sharpeRatio = annualizedStdDev > 0 ? annualizedReturn / annualizedStdDev : 0;
  const sortinoRatio = annualizedDownDev > 0 ? annualizedReturn / annualizedDownDev : 0;
  const calmarRatio = maxDrawdown > 0 ? annualizedReturn / maxDrawdown : 0;

  // VaR
  const sortedReturns = [...dailyReturns].sort((a, b) => a - b);
  const var95Index = Math.floor(sortedReturns.length * 0.05);
  const var99Index = Math.floor(sortedReturns.length * 0.01);
  const var95 = sortedReturns[var95Index] || 0;
  const var99 = sortedReturns[var99Index] || 0;

  // Largest win/loss
  const sortedByPnl = [...closedTrades].sort((a, b) => b.pnl - a.pnl);
  const largestWin = sortedByPnl.length > 0 && sortedByPnl[0].pnl > 0 ? sortedByPnl[0] : null;
  const largestLoss =
    sortedByPnl.length > 0 && sortedByPnl[sortedByPnl.length - 1].pnl < 0
      ? sortedByPnl[sortedByPnl.length - 1]
      : null;

  return {
    maxDrawdown,
    maxDrawdownPercent,
    sharpeRatio,
    sortinoRatio,
    calmarRatio,
    maxConsecutiveWins,
    maxConsecutiveLosses,
    currentStreak,
    currentStreakType,
    largestWin,
    largestLoss,
    avgWin,
    avgLoss,
    riskRewardRatio,
    expectancy,
    kellyPercent: Math.max(0, Math.min(100, kellyPercent)),
    volatility: annualizedStdDev,
    var95,
    var99,
  };
}

export function calculateOrderTypeStats(trades: Trade[]): OrderTypeStats[] {
  const closedTrades = trades.filter((t) => t.status !== "open");
  const orderTypeMap = new Map<string, Trade[]>();

  closedTrades.forEach((t) => {
    const arr = orderTypeMap.get(t.orderType) || [];
    arr.push(t);
    orderTypeMap.set(t.orderType, arr);
  });

  return Array.from(orderTypeMap.entries())
    .map(([orderType, otTrades]) => {
      const wins = otTrades.filter((t) => t.pnl > 0);
      const totalPnl = otTrades.reduce((s, t) => s + t.pnl, 0);
      const durations = otTrades
        .filter((t) => t.exitTime)
        .map((t) => (t.exitTime!.getTime() - t.entryTime.getTime()) / 60000);
      const avgDuration =
        durations.length > 0
          ? durations.reduce((a, b) => a + b, 0) / durations.length
          : 0;

      return {
        orderType: orderType as Trade["orderType"],
        trades: otTrades.length,
        winRate: (wins.length / otTrades.length) * 100,
        avgPnl: totalPnl / otTrades.length,
        totalPnl,
        avgDuration,
      };
    })
    .sort((a, b) => b.totalPnl - a.totalPnl);
}

export function calculateFeeBreakdown(trades: Trade[]): FeeBreakdown[] {
  const closedTrades = trades.filter((t) => t.status !== "open");

  const totalMaker = closedTrades.reduce((s, t) => s + t.fees.maker, 0);
  const totalTaker = closedTrades.reduce((s, t) => s + t.fees.taker, 0);
  const totalFunding = closedTrades.reduce(
    (s, t) => s + Math.abs(t.fees.funding),
    0
  );
  const totalLiquidation = closedTrades.reduce(
    (s, t) => s + t.fees.liquidation,
    0
  );
  const grandTotal = totalTaker + totalFunding + totalLiquidation;

  return [
    {
      category: "Taker Fees",
      amount: totalTaker,
      percentage: grandTotal > 0 ? (totalTaker / grandTotal) * 100 : 0,
      color: "#ef4444",
    },
    {
      category: "Maker Rebates",
      amount: -totalMaker,
      percentage: grandTotal > 0 ? (totalMaker / grandTotal) * 100 : 0,
      color: "#22c55e",
    },
    {
      category: "Funding Fees",
      amount: totalFunding,
      percentage: grandTotal > 0 ? (totalFunding / grandTotal) * 100 : 0,
      color: "#f59e0b",
    },
    {
      category: "Liquidation Fees",
      amount: totalLiquidation,
      percentage: grandTotal > 0 ? (totalLiquidation / grandTotal) * 100 : 0,
      color: "#8b5cf6",
    },
  ];
}

export function getWeekdayStats(
  trades: Trade[]
): { day: string; pnl: number; trades: number; winRate: number }[] {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const closedTrades = trades.filter((t) => t.status !== "open");
  const dayMap = new Map<number, { pnl: number; trades: number; wins: number }>();

  for (let d = 0; d < 7; d++) {
    dayMap.set(d, { pnl: 0, trades: 0, wins: 0 });
  }

  closedTrades.forEach((t) => {
    const dow = t.entryTime.getDay();
    const data = dayMap.get(dow)!;
    data.trades++;
    data.pnl += t.pnl;
    if (t.pnl > 0) data.wins++;
  });

  return Array.from(dayMap.entries()).map(([dow, data]) => ({
    day: days[dow],
    pnl: data.pnl,
    trades: data.trades,
    winRate: data.trades > 0 ? (data.wins / data.trades) * 100 : 0,
  }));
}

// ============================================================================
// Return Distribution Histogram
// ============================================================================

export function calculateReturnDistribution(trades: Trade[]): ReturnBucket[] {
  const closedTrades = trades.filter((t) => t.status !== "open");
  if (closedTrades.length === 0) return [];

  const pnls = closedTrades.map((t) => t.pnl);
  const min = Math.min(...pnls);
  const max = Math.max(...pnls);
  const range = max - min;
  const bucketCount = Math.min(20, Math.max(8, Math.ceil(Math.sqrt(closedTrades.length))));
  const bucketSize = range / bucketCount;

  const buckets: ReturnBucket[] = [];

  for (let i = 0; i < bucketCount; i++) {
    const low = min + i * bucketSize;
    const high = min + (i + 1) * bucketSize;
    const mid = (low + high) / 2;
    const count = pnls.filter((p) => p >= low && (i === bucketCount - 1 ? p <= high : p < high)).length;

    buckets.push({
      range: `$${low.toFixed(0)}`,
      count,
      percentage: closedTrades.length > 0 ? (count / closedTrades.length) * 100 : 0,
      midpoint: mid,
    });
  }

  return buckets;
}

// ============================================================================
// Symbol Correlation Matrix
// ============================================================================

export function calculateCorrelations(trades: Trade[]): CorrelationPair[] {
  const closedTrades = trades.filter((t) => t.status !== "open");
  const symbols = [...new Set(closedTrades.map((t) => t.symbol))];
  const pairs: CorrelationPair[] = [];

  // Group daily PnL by symbol
  const symbolDailyPnl = new Map<string, Map<string, number>>();
  closedTrades.forEach((t) => {
    const dateKey = t.entryTime.toISOString().split("T")[0];
    if (!symbolDailyPnl.has(t.symbol)) symbolDailyPnl.set(t.symbol, new Map());
    const dayMap = symbolDailyPnl.get(t.symbol)!;
    dayMap.set(dateKey, (dayMap.get(dateKey) || 0) + t.pnl);
  });

  // Calculate Pearson correlation for each pair
  for (let i = 0; i < symbols.length; i++) {
    for (let j = i; j < symbols.length; j++) {
      const a = symbolDailyPnl.get(symbols[i])!;
      const b = symbolDailyPnl.get(symbols[j])!;
      const commonDates = [...a.keys()].filter((d) => b.has(d));

      if (commonDates.length < 3) {
        pairs.push({ symbolA: symbols[i], symbolB: symbols[j], correlation: 0 });
        continue;
      }

      const aVals = commonDates.map((d) => a.get(d)!);
      const bVals = commonDates.map((d) => b.get(d)!);
      const aMean = aVals.reduce((s, v) => s + v, 0) / aVals.length;
      const bMean = bVals.reduce((s, v) => s + v, 0) / bVals.length;

      let num = 0, denA = 0, denB = 0;
      for (let k = 0; k < commonDates.length; k++) {
        const da = aVals[k] - aMean;
        const db = bVals[k] - bMean;
        num += da * db;
        denA += da * da;
        denB += db * db;
      }

      const den = Math.sqrt(denA * denB);
      const corr = den > 0 ? num / den : i === j ? 1 : 0;
      pairs.push({ symbolA: symbols[i], symbolB: symbols[j], correlation: corr });
    }
  }

  return pairs;
}

// ============================================================================
// Risk Health Score (composite grade)
// ============================================================================

export function calculateRiskHealthScore(
  riskMetrics: RiskMetrics,
  overviewMetrics: OverviewMetrics
): RiskHealthScore {
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Sharpe Score (0-25)
  let sharpeScore = 0;
  if (riskMetrics.sharpeRatio > 2) sharpeScore = 25;
  else if (riskMetrics.sharpeRatio > 1.5) sharpeScore = 22;
  else if (riskMetrics.sharpeRatio > 1) sharpeScore = 18;
  else if (riskMetrics.sharpeRatio > 0.5) sharpeScore = 12;
  else if (riskMetrics.sharpeRatio > 0) sharpeScore = 6;
  else { sharpeScore = 0; warnings.push("Negative Sharpe ratio indicates poor risk-adjusted returns"); }

  // Drawdown Score (0-25)
  let drawdownScore = 25;
  if (Math.abs(riskMetrics.maxDrawdownPercent) > 30) { drawdownScore = 5; warnings.push("Max drawdown exceeds 30%"); }
  else if (Math.abs(riskMetrics.maxDrawdownPercent) > 20) { drawdownScore = 10; warnings.push("Max drawdown exceeds 20%"); }
  else if (Math.abs(riskMetrics.maxDrawdownPercent) > 10) drawdownScore = 18;
  else if (Math.abs(riskMetrics.maxDrawdownPercent) > 5) drawdownScore = 22;

  // Consistency Score (0-25) based on win rate & profit factor
  let consistencyScore = 0;
  if (overviewMetrics.winRate > 60 && overviewMetrics.profitFactor > 1.5) consistencyScore = 25;
  else if (overviewMetrics.winRate > 50 && overviewMetrics.profitFactor > 1.2) consistencyScore = 20;
  else if (overviewMetrics.winRate > 45 && overviewMetrics.profitFactor > 1) consistencyScore = 15;
  else if (overviewMetrics.winRate > 40) consistencyScore = 10;
  else { consistencyScore = 5; recommendations.push("Consider tightening stop losses to improve win rate"); }

  // Risk/Reward Score (0-25)
  let riskRewardScore = 0;
  if (riskMetrics.riskRewardRatio > 2) riskRewardScore = 25;
  else if (riskMetrics.riskRewardRatio > 1.5) riskRewardScore = 20;
  else if (riskMetrics.riskRewardRatio > 1) riskRewardScore = 15;
  else if (riskMetrics.riskRewardRatio > 0.5) riskRewardScore = 8;
  else { riskRewardScore = 3; recommendations.push("Average wins should exceed average losses"); }

  if (riskMetrics.kellyPercent > 25) recommendations.push("Kelly suggests reducing position sizes");
  if (riskMetrics.maxConsecutiveLosses > 5) warnings.push(`${riskMetrics.maxConsecutiveLosses} consecutive losses detected`);

  const overall = sharpeScore + drawdownScore + consistencyScore + riskRewardScore;

  let grade: RiskHealthScore["grade"] = "F";
  if (overall >= 90) grade = "A+";
  else if (overall >= 80) grade = "A";
  else if (overall >= 70) grade = "B+";
  else if (overall >= 60) grade = "B";
  else if (overall >= 50) grade = "C+";
  else if (overall >= 40) grade = "C";
  else if (overall >= 25) grade = "D";

  return { overall, sharpeScore, drawdownScore, consistencyScore, riskRewardScore, grade, warnings, recommendations };
}

// ============================================================================
// Equity Curve with Benchmark
// ============================================================================

export function calculateEquityCurve(
  dailyPerformance: DailyPerformance[],
  initialCapital: number = 10000
): EquityCurvePoint[] {
  let equity = initialCapital;
  let benchmarkEquity = initialCapital;
  let peak = initialCapital;

  // Simulate 8% annual benchmark (SPY-like)
  const dailyBenchmarkReturn = Math.pow(1.08, 1 / 365) - 1;

  return dailyPerformance.map((dp) => {
    equity += dp.pnl;
    benchmarkEquity *= (1 + dailyBenchmarkReturn);
    peak = Math.max(peak, equity);
    const drawdown = peak - equity;
    const drawdownPercent = peak > 0 ? (drawdown / peak) * 100 : 0;

    return {
      date: dp.date,
      equity,
      benchmark: benchmarkEquity,
      drawdown,
      drawdownPercent,
    };
  });
}

// ============================================================================
// Capital Flow Tracking
// ============================================================================

export function generateCapitalFlows(
  dailyPerformance: DailyPerformance[],
  initialDeposit: number = 10000
): CapitalFlow[] {
  let cumulativeNet = initialDeposit;
  let balance = initialDeposit;

  return dailyPerformance.map((dp, i) => {
    // Simulate periodic deposits/withdrawals
    let deposits = 0;
    let withdrawals = 0;

    if (i > 0 && i % 14 === 0) deposits = 500 + Math.random() * 1000;
    if (i > 30 && i % 30 === 0) withdrawals = 200 + Math.random() * 500;

    const netFlow = deposits - withdrawals;
    cumulativeNet += netFlow;
    balance += dp.pnl + netFlow;

    return {
      date: dp.date,
      deposits,
      withdrawals,
      netFlow,
      cumulativeNet,
      balance,
    };
  });
}

// ============================================================================
// Strategy Performance Breakdown
// ============================================================================

export function calculateStrategyPerformance(trades: Trade[]): StrategyPerformance[] {
  const strategies = ["Momentum", "Mean Reversion", "Breakout", "Scalping"];
  const closedTrades = trades.filter((t) => t.status !== "open");

  return strategies.map((name, idx) => {
    // Assign trades to strategies based on tags or hash
    const stratTrades = closedTrades.filter((_, i) => i % strategies.length === idx);
    if (stratTrades.length === 0) {
      return {
        name, trades: 0, winRate: 0, totalPnl: 0, avgPnl: 0,
        sharpeRatio: 0, maxDrawdown: 0, profitFactor: 0,
        avgDuration: 0, returnPct: 0, currentNAV: 10000, status: "active" as const,
      };
    }

    const wins = stratTrades.filter((t) => t.pnl > 0);
    const losses = stratTrades.filter((t) => t.pnl <= 0);
    const totalPnl = stratTrades.reduce((s, t) => s + t.pnl, 0);
    const grossProfit = wins.reduce((s, t) => s + t.pnl, 0);
    const grossLoss = Math.abs(losses.reduce((s, t) => s + t.pnl, 0));

    const durations = stratTrades
      .filter((t) => t.exitTime)
      .map((t) => (t.exitTime!.getTime() - t.entryTime.getTime()) / 60000);

    const dailyPnls = new Map<string, number>();
    stratTrades.forEach((t) => {
      const key = t.entryTime.toISOString().split("T")[0];
      dailyPnls.set(key, (dailyPnls.get(key) || 0) + t.pnl);
    });
    const dPnls = [...dailyPnls.values()];
    const mean = dPnls.length > 0 ? dPnls.reduce((a, b) => a + b, 0) / dPnls.length : 0;
    const std = dPnls.length > 1
      ? Math.sqrt(dPnls.reduce((s, v) => s + (v - mean) ** 2, 0) / (dPnls.length - 1))
      : 0;

    return {
      name,
      trades: stratTrades.length,
      winRate: (wins.length / stratTrades.length) * 100,
      totalPnl,
      avgPnl: totalPnl / stratTrades.length,
      sharpeRatio: std > 0 ? (mean / std) * Math.sqrt(252) : 0,
      maxDrawdown: Math.min(...dPnls, 0),
      profitFactor: grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? Infinity : 0,
      avgDuration: durations.length > 0 ? durations.reduce((a, b) => a + b, 0) / durations.length : 0,
      returnPct: totalPnl / 10000 * 100,
      currentNAV: 10000 + totalPnl,
      status: "active" as const,
    };
  });
}

// ============================================================================
// KPI Dashboard Generator (inspired by ref backend KPI system)
// ============================================================================

export function generateKPIDashboard(
  overviewMetrics: OverviewMetrics,
  riskMetrics: RiskMetrics,
  dailyPerformance: DailyPerformance[]
): KPIDefinition[] {
  const formatCurr = (v: number) => `$${Math.abs(v).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Sparkline from daily PnL
  const sparkline = dailyPerformance.slice(-30).map((d) => d.cumulativePnl);

  return [
    {
      key: "total_pnl",
      name: "Total P&L",
      value: overviewMetrics.totalPnl,
      formattedValue: (overviewMetrics.totalPnl >= 0 ? "+" : "-") + formatCurr(overviewMetrics.totalPnl),
      unit: "currency",
      type: "performance",
      status: overviewMetrics.totalPnl > 0 ? "good" : overviewMetrics.totalPnl < -1000 ? "danger" : "warning",
      change: overviewMetrics.todayPnl,
      changePeriod: "today",
      description: "Net realized profit/loss across all closed trades",
      sparklineData: sparkline,
    },
    {
      key: "sharpe_ratio",
      name: "Sharpe Ratio",
      value: riskMetrics.sharpeRatio,
      formattedValue: riskMetrics.sharpeRatio.toFixed(2),
      unit: "ratio",
      type: "risk",
      status: riskMetrics.sharpeRatio > 1.5 ? "good" : riskMetrics.sharpeRatio > 0.5 ? "warning" : "danger",
      description: "Risk-adjusted return (annualized)",
    },
    {
      key: "max_drawdown",
      name: "Max Drawdown",
      value: riskMetrics.maxDrawdownPercent,
      formattedValue: `${Math.abs(riskMetrics.maxDrawdownPercent).toFixed(1)}%`,
      unit: "percentage",
      type: "risk",
      status: Math.abs(riskMetrics.maxDrawdownPercent) < 10 ? "good" : Math.abs(riskMetrics.maxDrawdownPercent) < 20 ? "warning" : "danger",
      description: "Largest peak-to-trough decline",
    },
    {
      key: "win_rate",
      name: "Win Rate",
      value: overviewMetrics.winRate,
      formattedValue: `${overviewMetrics.winRate.toFixed(1)}%`,
      unit: "percentage",
      type: "performance",
      status: overviewMetrics.winRate > 55 ? "good" : overviewMetrics.winRate > 45 ? "warning" : "danger",
      description: "Percentage of profitable trades",
    },
    {
      key: "profit_factor",
      name: "Profit Factor",
      value: overviewMetrics.profitFactor,
      formattedValue: overviewMetrics.profitFactor === Infinity ? "∞" : overviewMetrics.profitFactor.toFixed(2),
      unit: "ratio",
      type: "performance",
      status: overviewMetrics.profitFactor > 1.5 ? "good" : overviewMetrics.profitFactor > 1 ? "warning" : "danger",
      description: "Gross profit / gross loss ratio",
    },
    {
      key: "sortino_ratio",
      name: "Sortino Ratio",
      value: riskMetrics.sortinoRatio,
      formattedValue: riskMetrics.sortinoRatio.toFixed(2),
      unit: "ratio",
      type: "risk",
      status: riskMetrics.sortinoRatio > 2 ? "good" : riskMetrics.sortinoRatio > 1 ? "warning" : "danger",
      description: "Return adjusted for downside risk only",
    },
    {
      key: "expectancy",
      name: "Expectancy",
      value: riskMetrics.expectancy,
      formattedValue: formatCurr(riskMetrics.expectancy),
      unit: "currency",
      type: "performance",
      status: riskMetrics.expectancy > 0 ? "good" : "danger",
      description: "Expected profit per trade",
    },
    {
      key: "var_95",
      name: "VaR (95%)",
      value: riskMetrics.var95,
      formattedValue: formatCurr(Math.abs(riskMetrics.var95)),
      unit: "currency",
      type: "risk",
      status: Math.abs(riskMetrics.var95) < 500 ? "good" : Math.abs(riskMetrics.var95) < 1000 ? "warning" : "danger",
      description: "Maximum expected daily loss at 95% confidence",
    },
  ];
}