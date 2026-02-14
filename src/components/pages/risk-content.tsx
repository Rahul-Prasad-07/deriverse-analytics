"use client";

import React from "react";
import { useTrading } from "@/context/trading-context";
import TimeFrameSelector from "@/components/layout/time-frame-selector";
import DrawdownChart from "@/components/charts/drawdown-chart";
import MetricCard from "@/components/ui/metric-card";
import ChartContainer from "@/components/ui/chart-container";
import { RiskHealthGauge } from "@/components/ui/risk-health-gauge";
import { formatCurrency, formatPercent } from "@/lib/utils";
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Target,
  Flame,
  BarChart2,
  Percent,
} from "lucide-react";
import { cn } from "@/lib/utils";
import PageTransition from "@/components/ui/page-transition";

export default function RiskContent() {
  const { riskMetrics, overviewMetrics } = useTrading();

  return (
    <PageTransition>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            Risk Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Risk metrics, drawdown analysis, and position management
          </p>
        </div>
        <TimeFrameSelector />
      </div>

      {/* Risk Health Gauge + Risk Score Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RiskHealthGauge />
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold">Risk Ratios</h3>
            <Shield className="w-5 h-5 text-primary" />
          </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Sharpe Ratio</p>
            <p
              className={cn(
                "text-2xl font-bold",
                riskMetrics.sharpeRatio > 1
                  ? "text-green-400"
                  : riskMetrics.sharpeRatio > 0
                    ? "text-yellow-400"
                    : "text-red-400"
              )}
            >
              {riskMetrics.sharpeRatio.toFixed(2)}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {riskMetrics.sharpeRatio > 2
                ? "Excellent"
                : riskMetrics.sharpeRatio > 1
                  ? "Good"
                  : riskMetrics.sharpeRatio > 0
                    ? "Fair"
                    : "Poor"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Sortino Ratio</p>
            <p
              className={cn(
                "text-2xl font-bold",
                riskMetrics.sortinoRatio > 1.5
                  ? "text-green-400"
                  : riskMetrics.sortinoRatio > 0
                    ? "text-yellow-400"
                    : "text-red-400"
              )}
            >
              {riskMetrics.sortinoRatio.toFixed(2)}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              Downside risk-adjusted
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Calmar Ratio</p>
            <p
              className={cn(
                "text-2xl font-bold",
                riskMetrics.calmarRatio > 1
                  ? "text-green-400"
                  : riskMetrics.calmarRatio > 0
                    ? "text-yellow-400"
                    : "text-red-400"
              )}
            >
              {riskMetrics.calmarRatio.toFixed(2)}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              Return vs max drawdown
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Expectancy</p>
            <p
              className={cn(
                "text-2xl font-bold",
                riskMetrics.expectancy > 0 ? "text-green-400" : "text-red-400"
              )}
            >
              {formatCurrency(riskMetrics.expectancy)}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              Expected $ per trade
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Key Risk Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Max Drawdown"
          value={formatCurrency(riskMetrics.maxDrawdown)}
          subtitle={`${riskMetrics.maxDrawdownPercent.toFixed(1)}% from peak`}
          icon={<AlertTriangle className="w-4 h-4 text-red-400" />}
          glowColor="red"
        />
        <MetricCard
          title="Risk/Reward"
          value={
            riskMetrics.riskRewardRatio === Infinity
              ? "∞"
              : riskMetrics.riskRewardRatio.toFixed(2)
          }
          subtitle={`Avg Win: ${formatCurrency(riskMetrics.avgWin)}`}
          icon={<Target className="w-4 h-4 text-blue-400" />}
        />
        <MetricCard
          title="Kelly %"
          value={`${riskMetrics.kellyPercent.toFixed(1)}%`}
          subtitle="Optimal position size"
          icon={<Percent className="w-4 h-4 text-purple-400" />}
        />
        <MetricCard
          title="Volatility"
          value={formatCurrency(riskMetrics.volatility)}
          subtitle="Annualized std dev"
          icon={<BarChart2 className="w-4 h-4 text-yellow-400" />}
        />
      </div>

      {/* Drawdown Chart */}
      <DrawdownChart />

      {/* Win/Loss Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Largest Win */}
        <ChartContainer title="Largest Win" subtitle="Best performing trade">
          {riskMetrics.largestWin ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-400">
                    {formatCurrency(riskMetrics.largestWin.pnl)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatPercent(riskMetrics.largestWin.pnlPercent)} return
                  </p>
                </div>
                <TrendingUp className="w-10 h-10 text-green-400/30" />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground">Symbol</p>
                  <p className="text-xs font-medium">
                    {riskMetrics.largestWin.symbol}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Side</p>
                  <p
                    className={cn(
                      "text-xs font-medium capitalize",
                      riskMetrics.largestWin.side === "long"
                        ? "text-green-400"
                        : "text-red-400"
                    )}
                  >
                    {riskMetrics.largestWin.side}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">
                    Market Type
                  </p>
                  <p className="text-xs font-medium capitalize">
                    {riskMetrics.largestWin.marketType}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Leverage</p>
                  <p className="text-xs font-medium">
                    {riskMetrics.largestWin.leverage}x
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Date</p>
                  <p className="text-xs">
                    {riskMetrics.largestWin.entryTime.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">
                    Order Type
                  </p>
                  <p className="text-xs uppercase">
                    {riskMetrics.largestWin.orderType}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No winning trades</p>
          )}
        </ChartContainer>

        {/* Largest Loss */}
        <ChartContainer title="Largest Loss" subtitle="Worst performing trade">
          {riskMetrics.largestLoss ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-400">
                    {formatCurrency(riskMetrics.largestLoss.pnl)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatPercent(riskMetrics.largestLoss.pnlPercent)} return
                  </p>
                </div>
                <TrendingDown className="w-10 h-10 text-red-400/30" />
              </div>
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground">Symbol</p>
                  <p className="text-xs font-medium">
                    {riskMetrics.largestLoss.symbol}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Side</p>
                  <p
                    className={cn(
                      "text-xs font-medium capitalize",
                      riskMetrics.largestLoss.side === "long"
                        ? "text-green-400"
                        : "text-red-400"
                    )}
                  >
                    {riskMetrics.largestLoss.side}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">
                    Market Type
                  </p>
                  <p className="text-xs font-medium capitalize">
                    {riskMetrics.largestLoss.marketType}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Leverage</p>
                  <p className="text-xs font-medium">
                    {riskMetrics.largestLoss.leverage}x
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Date</p>
                  <p className="text-xs">
                    {riskMetrics.largestLoss.entryTime.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">
                    Order Type
                  </p>
                  <p className="text-xs uppercase">
                    {riskMetrics.largestLoss.orderType}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No losing trades</p>
          )}
        </ChartContainer>
      </div>

      {/* Streaks and VaR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChartContainer title="Streak Analysis" subtitle="Consecutive trade outcomes">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Current Streak</p>
                <p
                  className={cn(
                    "text-xl font-bold",
                    riskMetrics.currentStreakType === "win"
                      ? "text-green-400"
                      : riskMetrics.currentStreakType === "loss"
                        ? "text-red-400"
                        : "text-muted-foreground"
                  )}
                >
                  {riskMetrics.currentStreak}{" "}
                  {riskMetrics.currentStreakType === "none"
                    ? ""
                    : riskMetrics.currentStreakType === "win"
                      ? "🔥"
                      : "❄️"}
                </p>
              </div>
              <Flame
                className={cn(
                  "w-6 h-6",
                  riskMetrics.currentStreakType === "win"
                    ? "text-green-400"
                    : "text-muted-foreground"
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
              <div>
                <p className="text-[10px] text-muted-foreground">Max Win Streak</p>
                <p className="text-sm font-bold text-green-400">
                  {riskMetrics.maxConsecutiveWins}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Max Loss Streak</p>
                <p className="text-sm font-bold text-red-400">
                  {riskMetrics.maxConsecutiveLosses}
                </p>
              </div>
            </div>
          </div>
        </ChartContainer>

        <ChartContainer title="Value at Risk (VaR)" subtitle="Daily loss probability">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-muted-foreground">VaR (95%)</p>
                <p className="text-sm font-bold text-yellow-400">
                  {formatCurrency(Math.abs(riskMetrics.var95))}
                </p>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      (Math.abs(riskMetrics.var95) /
                        Math.max(riskMetrics.maxDrawdown, 1)) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                5% chance of losing more in a day
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-muted-foreground">VaR (99%)</p>
                <p className="text-sm font-bold text-red-400">
                  {formatCurrency(Math.abs(riskMetrics.var99))}
                </p>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      (Math.abs(riskMetrics.var99) /
                        Math.max(riskMetrics.maxDrawdown, 1)) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">
                1% chance of losing more in a day
              </p>
            </div>
          </div>
        </ChartContainer>

        <ChartContainer
          title="Win/Loss Distribution"
          subtitle="Average trade outcomes"
        >
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-muted-foreground">Average Win</p>
                <p className="text-sm font-bold text-green-400">
                  {formatCurrency(riskMetrics.avgWin)}
                </p>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      (riskMetrics.avgWin /
                        Math.max(riskMetrics.avgWin + riskMetrics.avgLoss, 1)) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-muted-foreground">Average Loss</p>
                <p className="text-sm font-bold text-red-400">
                  {formatCurrency(riskMetrics.avgLoss)}
                </p>
              </div>
              <div className="w-full bg-secondary rounded-full h-3">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      (riskMetrics.avgLoss /
                        Math.max(riskMetrics.avgWin + riskMetrics.avgLoss, 1)) *
                        100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">R:R Ratio</p>
                <p className="text-sm font-bold">
                  {riskMetrics.riskRewardRatio === Infinity
                    ? "∞"
                    : `1:${riskMetrics.riskRewardRatio.toFixed(2)}`}
                </p>
              </div>
            </div>
          </div>
        </ChartContainer>
      </div>
    </div>
    </PageTransition>
  );
}
