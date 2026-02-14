"use client";

import React from "react";
import { useTrading } from "@/context/trading-context";
import TimeFrameSelector from "@/components/layout/time-frame-selector";
import MetricCard from "@/components/ui/metric-card";
import { KPIDashboard } from "@/components/ui/kpi-card";
import PnLChart from "@/components/charts/pnl-chart";
import DrawdownChart from "@/components/charts/drawdown-chart";
import DailyPnLChart from "@/components/charts/daily-pnl-chart";
import VolumeChart from "@/components/charts/volume-chart";
import WinRateChart from "@/components/charts/win-rate-chart";
import LongShortRatio from "@/components/charts/long-short-ratio";
import { EquityCurveChart } from "@/components/charts/equity-curve-chart";
import { StrategyBreakdown } from "@/components/charts/strategy-breakdown";
import { formatCurrency, formatDuration, formatPercent } from "@/lib/utils";
import { AnimatedContainer, StaggeredGrid, StaggeredItem } from "@/components/ui/animations";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  Clock,
  DollarSign,
  Percent,
  Zap,
} from "lucide-react";

export default function DashboardContent() {
  const { overviewMetrics, filteredTrades, kpis } = useTrading();

  const openTrades = filteredTrades.filter((t) => t.status === "open");

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedContainer>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Overview of your trading performance on Deriverse
            </p>
          </div>
          <TimeFrameSelector />
        </div>
      </AnimatedContainer>

      {/* KPI Dashboard - Premium color-coded cards with sparklines */}
      <AnimatedContainer delay={0.1}>
        <KPIDashboard kpis={kpis} />
      </AnimatedContainer>

      {/* Equity Curve - Full width hero chart */}
      <AnimatedContainer delay={0.15}>
        <EquityCurveChart />
      </AnimatedContainer>

      {/* Charts Row 1 */}
      <AnimatedContainer delay={0.2} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <PnLChart />
        <DrawdownChart />
      </AnimatedContainer>

      {/* Charts Row 2 */}
      <AnimatedContainer delay={0.25} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DailyPnLChart />
        <VolumeChart />
      </AnimatedContainer>

      {/* Charts Row 3 */}
      <AnimatedContainer delay={0.3} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StrategyBreakdown />
        <div className="grid grid-rows-2 gap-4">
          <WinRateChart />
          <LongShortRatio />
        </div>
      </AnimatedContainer>
    </div>
  );
}
