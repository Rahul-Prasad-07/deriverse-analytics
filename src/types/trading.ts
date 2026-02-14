// ============================================================================
// Deriverse Trading Analytics - Core Types
// Inspired by institutional trading platforms & fund management systems
// ============================================================================

export type MarketType = "spot" | "perpetual" | "options";
export type OrderSide = "long" | "short";
export type OrderType = "market" | "limit" | "stop" | "stop-limit" | "ioc";
export type TradeStatus = "open" | "closed" | "liquidated";
export type TimeFrame = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y" | "ALL";
export type TradingSession = "asian" | "european" | "american";
export type AnalyticsScope = "portfolio" | "strategy" | "symbol" | "platform";

// ============================================================================
// Core Trade Model
// ============================================================================

export interface Trade {
  id: string;
  symbol: string;
  marketType: MarketType;
  side: OrderSide;
  orderType: OrderType;
  status: TradeStatus;
  entryPrice: number;
  exitPrice: number | null;
  quantity: number;
  leverage: number;
  entryTime: Date;
  exitTime: Date | null;
  pnl: number;
  pnlPercent: number;
  fees: TradeFees;
  fundingPayments: number;
  liquidationPrice: number | null;
  annotation: string | null;
  tags: string[];
  txSignature: string;
  strategy?: string;
  riskRewardRatio?: number;
  maxAdverseExcursion?: number;
  maxFavorableExcursion?: number;
}

export interface TradeFees {
  maker: number;
  taker: number;
  funding: number;
  liquidation: number;
  total: number;
}

export interface PortfolioSnapshot {
  timestamp: Date;
  totalValue: number;
  pnl: number;
  cumulativePnl: number;
  drawdown: number;
  drawdownPercent: number;
}

export interface DailyPerformance {
  date: string;
  pnl: number;
  cumulativePnl: number;
  trades: number;
  winRate: number;
  volume: number;
  fees: number;
  maxDrawdown: number;
}

export interface SymbolStats {
  symbol: string;
  totalTrades: number;
  winRate: number;
  totalPnl: number;
  avgPnl: number;
  avgDuration: number;
  volume: number;
  longCount: number;
  shortCount: number;
  bestTrade: number;
  worstTrade: number;
  profitFactor: number;
}

export interface TimeOfDayStats {
  hour: number;
  trades: number;
  pnl: number;
  winRate: number;
  avgPnl: number;
}

export interface SessionStats {
  session: TradingSession;
  trades: number;
  pnl: number;
  winRate: number;
  volume: number;
  avgPnl: number;
}

export interface RiskMetrics {
  maxDrawdown: number;
  maxDrawdownPercent: number;
  sharpeRatio: number;
  sortinoRatio: number;
  calmarRatio: number;
  maxConsecutiveWins: number;
  maxConsecutiveLosses: number;
  currentStreak: number;
  currentStreakType: "win" | "loss" | "none";
  largestWin: Trade | null;
  largestLoss: Trade | null;
  avgWin: number;
  avgLoss: number;
  riskRewardRatio: number;
  expectancy: number;
  kellyPercent: number;
  volatility: number;
  var95: number;
  var99: number;
}

export interface OrderTypeStats {
  orderType: OrderType;
  trades: number;
  winRate: number;
  avgPnl: number;
  totalPnl: number;
  avgDuration: number;
}

export interface FeeBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface OverviewMetrics {
  totalPnl: number;
  totalPnlPercent: number;
  totalTrades: number;
  winRate: number;
  lossRate: number;
  totalVolume: number;
  totalFees: number;
  avgTradeDuration: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  longShortRatio: number;
  longCount: number;
  shortCount: number;
  bestDay: DailyPerformance | null;
  worstDay: DailyPerformance | null;
  currentStreak: number;
  currentStreakType: "win" | "loss" | "none";
  todayPnl: number;
  weekPnl: number;
  monthPnl: number;
}

export interface FilterState {
  symbols: string[];
  dateRange: { start: Date | null; end: Date | null };
  marketType: MarketType | "all";
  side: OrderSide | "all";
  orderType: OrderType | "all";
  status: TradeStatus | "all";
  minPnl: number | null;
  maxPnl: number | null;
}

export interface WalletState {
  connected: boolean;
  address: string | null;
  balance: number;
  loading: boolean;
}

// ============================================================================
// NAV & Equity Curve (inspired by institutional fund management)
// ============================================================================

export interface NAVSnapshot {
  timestamp: Date;
  nav: number;
  sharePrice: number;
  totalCapital: number;
  lifetimePnl: number;
  highWaterMark: number;
  dailyReturn: number;
  weeklyReturn: number;
  monthlyReturn: number;
  tradesCount: number;
  tradingVolume: number;
  periodPnl: number;
}

export interface EquityCurvePoint {
  date: string;
  equity: number;
  benchmark: number;
  drawdown: number;
  drawdownPercent: number;
}

// ============================================================================
// Capital Flow Tracking
// ============================================================================

export interface CapitalFlow {
  date: string;
  deposits: number;
  withdrawals: number;
  netFlow: number;
  cumulativeNet: number;
  balance: number;
}

// ============================================================================
// Strategy Performance
// ============================================================================

export interface StrategyPerformance {
  name: string;
  trades: number;
  winRate: number;
  totalPnl: number;
  avgPnl: number;
  sharpeRatio: number;
  maxDrawdown: number;
  profitFactor: number;
  avgDuration: number;
  returnPct: number;
  currentNAV: number;
  status: "active" | "paused" | "inactive";
}

// ============================================================================
// Return Distribution
// ============================================================================

export interface ReturnBucket {
  range: string;
  count: number;
  percentage: number;
  midpoint: number;
}

// ============================================================================
// Correlation Data
// ============================================================================

export interface CorrelationPair {
  symbolA: string;
  symbolB: string;
  correlation: number;
}

// ============================================================================
// Risk Health Score (composite rating)
// ============================================================================

export interface RiskHealthScore {
  overall: number; // 0–100
  sharpeScore: number;
  drawdownScore: number;
  consistencyScore: number;
  riskRewardScore: number;
  grade: "A+" | "A" | "B+" | "B" | "C+" | "C" | "D" | "F";
  warnings: string[];
  recommendations: string[];
}

// ============================================================================
// KPI Definition (inspired by ref backend KPI system)
// ============================================================================

export interface KPIDefinition {
  key: string;
  name: string;
  value: number | string;
  formattedValue: string;
  unit: "currency" | "percentage" | "ratio" | "number" | "duration";
  type: "performance" | "risk" | "attribution";
  status: "good" | "warning" | "danger" | "neutral";
  change?: number;
  changePeriod?: string;
  description?: string;
  sparklineData?: number[];
}

// ============================================================================
// Export Types
// ============================================================================

export interface ExportConfig {
  format: "csv" | "json" | "pdf";
  dateRange: { start: Date | null; end: Date | null };
  includeAnnotations: boolean;
  includeMetrics: boolean;
  symbols: string[];
}
