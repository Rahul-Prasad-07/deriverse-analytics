"use client";

import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { Trade, FilterState, TimeFrame, WalletState } from "@/types/trading";
import { generateTrades, generateDailyPerformance, generatePortfolioSnapshots } from "@/lib/mock-data";
import {
  calculateOverviewMetrics,
  calculateSymbolStats,
  calculateTimeOfDayStats,
  calculateSessionStats,
  calculateRiskMetrics,
  calculateOrderTypeStats,
  calculateFeeBreakdown,
  getWeekdayStats,
  calculateReturnDistribution,
  calculateCorrelations,
  calculateRiskHealthScore,
  generateKPIDashboard,
  calculateEquityCurve,
  generateCapitalFlows,
  calculateStrategyPerformance,
} from "@/lib/analytics";

interface TradingContextType {
  trades: Trade[];
  filteredTrades: Trade[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  timeFrame: TimeFrame;
  setTimeFrame: (tf: TimeFrame) => void;
  wallet: WalletState;
  connectWallet: () => void;
  disconnectWallet: () => void;
  updateAnnotation: (tradeId: string, annotation: string) => void;
  overviewMetrics: ReturnType<typeof calculateOverviewMetrics>;
  symbolStats: ReturnType<typeof calculateSymbolStats>;
  timeOfDayStats: ReturnType<typeof calculateTimeOfDayStats>;
  sessionStats: ReturnType<typeof calculateSessionStats>;
  riskMetrics: ReturnType<typeof calculateRiskMetrics>;
  orderTypeStats: ReturnType<typeof calculateOrderTypeStats>;
  feeBreakdown: ReturnType<typeof calculateFeeBreakdown>;
  weekdayStats: ReturnType<typeof getWeekdayStats>;
  dailyPerformance: ReturnType<typeof generateDailyPerformance>;
  portfolioSnapshots: ReturnType<typeof generatePortfolioSnapshots>;
  returnDistribution: ReturnType<typeof calculateReturnDistribution>;
  correlations: ReturnType<typeof calculateCorrelations>;
  riskHealthScore: ReturnType<typeof calculateRiskHealthScore>;
  kpis: ReturnType<typeof generateKPIDashboard>;
  equityCurve: ReturnType<typeof calculateEquityCurve>;
  capitalFlows: ReturnType<typeof generateCapitalFlows>;
  strategyPerformance: ReturnType<typeof calculateStrategyPerformance>;
  availableSymbols: string[];
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const TradingContext = createContext<TradingContextType | null>(null);

const defaultFilters: FilterState = {
  symbols: [],
  dateRange: { start: null, end: null },
  marketType: "all",
  side: "all",
  orderType: "all",
  status: "all",
  minPnl: null,
  maxPnl: null,
};

export function TradingProvider({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [allTrades, setAllTrades] = useState<Trade[]>(() => generateTrades(300));
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [timeFrame, setTimeFrame] = useState<TimeFrame>("3M");
  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    address: null,
    balance: 0,
    loading: false,
  });

  const availableSymbols = useMemo(
    () => [...new Set(allTrades.map((t) => t.symbol))].sort(),
    [allTrades]
  );

  const filteredTrades = useMemo(() => {
    let result = [...allTrades];

    // Time frame filter
    const now = new Date();
    const timeFrameDays: Record<TimeFrame, number> = {
      "1D": 1, "1W": 7, "1M": 30, "3M": 90, "6M": 180, "1Y": 365, ALL: 9999,
    };
    const cutoff = new Date(now.getTime() - timeFrameDays[timeFrame] * 86400000);
    result = result.filter((t) => t.entryTime >= cutoff);

    // Symbol filter
    if (filters.symbols.length > 0) {
      result = result.filter((t) => filters.symbols.includes(t.symbol));
    }

    // Date range filter
    if (filters.dateRange.start) {
      result = result.filter((t) => t.entryTime >= filters.dateRange.start!);
    }
    if (filters.dateRange.end) {
      result = result.filter((t) => t.entryTime <= filters.dateRange.end!);
    }

    // Market type filter
    if (filters.marketType !== "all") {
      result = result.filter((t) => t.marketType === filters.marketType);
    }

    // Side filter
    if (filters.side !== "all") {
      result = result.filter((t) => t.side === filters.side);
    }

    // Order type filter
    if (filters.orderType !== "all") {
      result = result.filter((t) => t.orderType === filters.orderType);
    }

    // Status filter
    if (filters.status !== "all") {
      result = result.filter((t) => t.status === filters.status);
    }

    // PnL range filter
    if (filters.minPnl !== null) {
      result = result.filter((t) => t.pnl >= filters.minPnl!);
    }
    if (filters.maxPnl !== null) {
      result = result.filter((t) => t.pnl <= filters.maxPnl!);
    }

    return result;
  }, [allTrades, filters, timeFrame]);

  const dailyPerformance = useMemo(
    () => generateDailyPerformance(filteredTrades),
    [filteredTrades]
  );

  const portfolioSnapshots = useMemo(
    () => generatePortfolioSnapshots(dailyPerformance),
    [dailyPerformance]
  );

  const overviewMetrics = useMemo(
    () => calculateOverviewMetrics(filteredTrades),
    [filteredTrades]
  );
  const symbolStats = useMemo(
    () => calculateSymbolStats(filteredTrades),
    [filteredTrades]
  );
  const timeOfDayStats = useMemo(
    () => calculateTimeOfDayStats(filteredTrades),
    [filteredTrades]
  );
  const sessionStats = useMemo(
    () => calculateSessionStats(filteredTrades),
    [filteredTrades]
  );
  const riskMetrics = useMemo(
    () => calculateRiskMetrics(filteredTrades, dailyPerformance),
    [filteredTrades, dailyPerformance]
  );
  const orderTypeStats = useMemo(
    () => calculateOrderTypeStats(filteredTrades),
    [filteredTrades]
  );
  const feeBreakdown = useMemo(
    () => calculateFeeBreakdown(filteredTrades),
    [filteredTrades]
  );
  const weekdayStats = useMemo(
    () => getWeekdayStats(filteredTrades),
    [filteredTrades]
  );
  const returnDistribution = useMemo(
    () => calculateReturnDistribution(filteredTrades),
    [filteredTrades]
  );
  const correlations = useMemo(
    () => calculateCorrelations(filteredTrades),
    [filteredTrades]
  );
  const riskHealthScore = useMemo(
    () => calculateRiskHealthScore(riskMetrics, overviewMetrics),
    [riskMetrics, overviewMetrics]
  );
  const kpis = useMemo(
    () => generateKPIDashboard(overviewMetrics, riskMetrics, dailyPerformance),
    [overviewMetrics, riskMetrics, dailyPerformance]
  );
  const equityCurve = useMemo(
    () => calculateEquityCurve(dailyPerformance),
    [dailyPerformance]
  );
  const capitalFlows = useMemo(
    () => generateCapitalFlows(dailyPerformance),
    [dailyPerformance]
  );
  const strategyPerformance = useMemo(
    () => calculateStrategyPerformance(filteredTrades),
    [filteredTrades]
  );

  const connectWallet = useCallback(() => {
    setWallet({
      connected: true,
      address: "DRvs7q...X9kP",
      balance: 12450.75,
      loading: false,
    });
  }, []);

  const disconnectWallet = useCallback(() => {
    setWallet({
      connected: false,
      address: null,
      balance: 0,
      loading: false,
    });
  }, []);

  const updateAnnotation = useCallback((tradeId: string, annotation: string) => {
    setAllTrades((prev) =>
      prev.map((t) => (t.id === tradeId ? { ...t, annotation } : t))
    );
  }, []);

  return (
    <TradingContext.Provider
      value={{
        trades: allTrades,
        filteredTrades,
        filters,
        setFilters,
        timeFrame,
        setTimeFrame,
        wallet,
        connectWallet,
        disconnectWallet,
        updateAnnotation,
        overviewMetrics,
        symbolStats,
        timeOfDayStats,
        sessionStats,
        riskMetrics,
        orderTypeStats,
        feeBreakdown,
        weekdayStats,
        dailyPerformance,
        portfolioSnapshots,
        returnDistribution,
        correlations,
        riskHealthScore,
        kpis,
        equityCurve,
        capitalFlows,
        strategyPerformance,
        availableSymbols,
        sidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      {children}
    </TradingContext.Provider>
  );
}

export function useTrading() {
  const context = useContext(TradingContext);
  if (!context) {
    throw new Error("useTrading must be used within a TradingProvider");
  }
  return context;
}
