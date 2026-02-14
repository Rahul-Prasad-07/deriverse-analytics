"use client";

import React from "react";
import { useTrading } from "@/context/trading-context";
import TimeFrameSelector from "@/components/layout/time-frame-selector";
import SymbolPerformanceChart from "@/components/charts/symbol-performance-chart";
import FeeBreakdownChart from "@/components/charts/fee-breakdown-chart";
import CumulativeFeeChart from "@/components/charts/cumulative-fee-chart";
import OrderTypeChart from "@/components/charts/order-type-chart";
import LongShortRatio from "@/components/charts/long-short-ratio";
import { StrategyBreakdown } from "@/components/charts/strategy-breakdown";
import { CapitalFlowChart } from "@/components/charts/capital-flow-chart";
import ChartContainer from "@/components/ui/chart-container";
import { formatCurrency, formatDuration, cn } from "@/lib/utils";
import { PieChart } from "lucide-react";
import PageTransition from "@/components/ui/page-transition";

export default function PortfolioContent() {
  const { symbolStats, orderTypeStats, feeBreakdown } = useTrading();

  return (
    <PageTransition>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            <PieChart className="w-6 h-6 text-primary" />
            Portfolio Analysis
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            In-depth symbol, fee, and order type analysis
          </p>
        </div>
        <TimeFrameSelector />
      </div>

      {/* Symbol Performance */}
      <SymbolPerformanceChart />

      {/* Symbol Detail Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden card-hover">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold">Symbol Breakdown</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Detailed statistics per trading pair
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-accent/30">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                  Symbol
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  Trades
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  Win Rate
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  Total P&L
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  Avg P&L
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  Volume
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  Long/Short
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  Best
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  Worst
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  Avg Duration
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
                  Profit Factor
                </th>
              </tr>
            </thead>
            <tbody>
              {symbolStats.map((sym) => (
                <tr
                  key={sym.symbol}
                  className="border-b border-border/50 hover:bg-accent/20 transition-colors"
                >
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium">{sym.symbol}</span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs">
                    {sym.totalTrades}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`text-xs font-medium ${
                        sym.winRate >= 50 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {sym.winRate.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`text-xs font-bold ${
                        sym.totalPnl >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {formatCurrency(sym.totalPnl)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`text-xs ${
                        sym.avgPnl >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {formatCurrency(sym.avgPnl)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-muted-foreground">
                    {formatCurrency(sym.volume)}
                  </td>
                  <td className="px-4 py-3 text-right text-xs">
                    <span className="text-green-400">{sym.longCount}</span>
                    <span className="text-muted-foreground mx-1">/</span>
                    <span className="text-red-400">{sym.shortCount}</span>
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-green-400">
                    {formatCurrency(sym.bestTrade)}
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-red-400">
                    {formatCurrency(sym.worstTrade)}
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-muted-foreground">
                    {formatDuration(sym.avgDuration)}
                  </td>
                  <td className="px-4 py-3 text-right text-xs font-medium">
                    {sym.profitFactor === Infinity
                      ? "∞"
                      : sym.profitFactor.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategy Breakdown & Capital Flows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <StrategyBreakdown />
        <CapitalFlowChart />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OrderTypeChart />
        <LongShortRatio />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <FeeBreakdownChart />
        <CumulativeFeeChart />
      </div>
    </div>
    </PageTransition>
  );
}
