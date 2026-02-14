"use client";

import React from "react";
import { useTrading } from "@/context/trading-context";
import TimeFrameSelector from "@/components/layout/time-frame-selector";
import HourlyHeatmap from "@/components/charts/hourly-heatmap";
import WeekdayChart from "@/components/charts/weekday-chart";
import SessionChart from "@/components/charts/session-chart";
import DailyPnLChart from "@/components/charts/daily-pnl-chart";
import { ReturnDistributionChart } from "@/components/charts/return-distribution-chart";
import { CorrelationHeatmap } from "@/components/charts/correlation-heatmap";
import MetricCard from "@/components/ui/metric-card";
import ChartContainer from "@/components/ui/chart-container";
import { formatCurrency } from "@/lib/utils";
import {
  BarChart3,
  Calendar,
  Clock,
  TrendingUp,
  Activity,
} from "lucide-react";
import PageTransition from "@/components/ui/page-transition";

export default function PerformanceContent() {
  const {
    overviewMetrics,
    dailyPerformance,
    sessionStats,
    weekdayStats,
    timeOfDayStats,
  } = useTrading();

  // Find best and worst day
  const bestDay = [...dailyPerformance].sort((a, b) => b.pnl - a.pnl)[0];
  const worstDay = [...dailyPerformance].sort((a, b) => a.pnl - b.pnl)[0];

  // Find best hour
  const bestHour = [...timeOfDayStats].sort((a, b) => b.pnl - a.pnl)[0];
  const worstHour = [...timeOfDayStats].sort((a, b) => a.pnl - b.pnl)[0];

  // Find best session
  const bestSession = [...sessionStats].sort((a, b) => b.pnl - a.pnl)[0];

  // Find best weekday
  const bestWeekday = [...weekdayStats].sort((a, b) => b.pnl - a.pnl)[0];

  // Calculate trading days
  const tradingDays = dailyPerformance.length;
  const profitableDays = dailyPerformance.filter((d) => d.pnl > 0).length;
  const avgDailyPnl =
    tradingDays > 0
      ? dailyPerformance.reduce((s, d) => s + d.pnl, 0) / tradingDays
      : 0;
  const avgDailyTrades =
    tradingDays > 0
      ? dailyPerformance.reduce((s, d) => s + d.trades, 0) / tradingDays
      : 0;

  return (
    <PageTransition>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-primary" />
            Performance Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Time-based performance metrics and pattern analysis
          </p>
        </div>
        <TimeFrameSelector />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Trading Days"
          value={tradingDays.toString()}
          subtitle={`${profitableDays} profitable (${tradingDays > 0 ? ((profitableDays / tradingDays) * 100).toFixed(0) : 0}%)`}
          icon={<Calendar className="w-4 h-4 text-blue-400" />}
        />
        <MetricCard
          title="Avg Daily P&L"
          value={formatCurrency(avgDailyPnl)}
          change={`${avgDailyTrades.toFixed(1)} trades/day`}
          changeType={avgDailyPnl >= 0 ? "positive" : "negative"}
          icon={<TrendingUp className="w-4 h-4 text-green-400" />}
        />
        <MetricCard
          title="Best Day"
          value={bestDay ? formatCurrency(bestDay.pnl) : "$0"}
          subtitle={bestDay ? new Date(bestDay.date).toLocaleDateString() : "—"}
          icon={<Activity className="w-4 h-4 text-green-400" />}
          glowColor="green"
        />
        <MetricCard
          title="Worst Day"
          value={worstDay ? formatCurrency(worstDay.pnl) : "$0"}
          subtitle={worstDay ? new Date(worstDay.date).toLocaleDateString() : "—"}
          icon={<Activity className="w-4 h-4 text-red-400" />}
          glowColor="red"
        />
      </div>

      {/* Daily P&L Chart */}
      <DailyPnLChart />

      {/* Return Distribution & Correlation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ReturnDistributionChart />
        <CorrelationHeatmap />
      </div>

      {/* Time Analysis Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <HourlyHeatmap />
        <WeekdayChart />
      </div>

      {/* Session Performance */}
      <SessionChart />

      {/* Time Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ChartContainer title="Best Trading Hour" subtitle="Most profitable time">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-green-400">
                  {bestHour
                    ? `${bestHour.hour.toString().padStart(2, "0")}:00 UTC`
                    : "—"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {bestHour ? `${formatCurrency(bestHour.pnl)} P&L` : "—"}
                </p>
              </div>
              <Clock className="w-8 h-8 text-green-400/30" />
            </div>
            {worstHour && (
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Worst hour:{" "}
                  <span className="text-red-400 font-medium">
                    {worstHour.hour.toString().padStart(2, "0")}:00 UTC
                  </span>{" "}
                  ({formatCurrency(worstHour.pnl)})
                </p>
              </div>
            )}
          </div>
        </ChartContainer>

        <ChartContainer title="Best Trading Day" subtitle="Most profitable weekday">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-green-400">
                  {bestWeekday ? bestWeekday.day : "—"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {bestWeekday ? `${formatCurrency(bestWeekday.pnl)} P&L` : "—"}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-green-400/30" />
            </div>
            {bestWeekday && (
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  {bestWeekday.trades} trades ·{" "}
                  {bestWeekday.winRate.toFixed(0)}% win rate
                </p>
              </div>
            )}
          </div>
        </ChartContainer>

        <ChartContainer title="Best Session" subtitle="Most profitable trading session">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl font-bold text-green-400 capitalize">
                  {bestSession ? bestSession.session : "—"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {bestSession ? `${formatCurrency(bestSession.pnl)} P&L` : "—"}
                </p>
              </div>
              <Activity className="w-8 h-8 text-green-400/30" />
            </div>
            {bestSession && (
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  {bestSession.trades} trades ·{" "}
                  {bestSession.winRate.toFixed(0)}% win rate
                </p>
              </div>
            )}
          </div>
        </ChartContainer>
      </div>

      {/* Monthly Calendar Heatmap */}
      <ChartContainer
        title="Daily P&L Calendar"
        subtitle="Visual calendar of daily trading performance"
      >
        <div className="grid grid-cols-7 gap-1.5">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-[10px] text-muted-foreground font-medium py-1"
            >
              {day}
            </div>
          ))}
          {dailyPerformance.slice(-42).map((day, i) => {
            const date = new Date(day.date);
            const maxPnl = Math.max(
              ...dailyPerformance.map((d) => Math.abs(d.pnl)),
              1
            );
            const intensity = Math.min(Math.abs(day.pnl) / maxPnl, 1);

            return (
              <div
                key={day.date}
                className="aspect-square rounded-md flex items-center justify-center text-[9px] font-mono cursor-default group relative"
                style={{
                  backgroundColor:
                    day.pnl > 0
                      ? `rgba(0, 212, 170, ${0.1 + intensity * 0.5})`
                      : day.pnl < 0
                        ? `rgba(239, 68, 68, ${0.1 + intensity * 0.5})`
                        : "rgba(30, 33, 48, 0.5)",
                }}
              >
                {date.getDate()}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-card border border-border rounded px-2 py-1 shadow-xl z-10 whitespace-nowrap">
                  <p className="text-[10px] text-muted-foreground">
                    {date.toLocaleDateString()}
                  </p>
                  <p
                    className={`text-[10px] font-bold ${
                      day.pnl >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {formatCurrency(day.pnl)}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {day.trades} trades
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ChartContainer>
    </div>
    </PageTransition>
  );
}
