"use client";

import React from "react";
import { useTrading } from "@/context/trading-context";
import TimeFrameSelector from "@/components/layout/time-frame-selector";
import FilterPanel from "@/components/journal/filter-panel";
import TradeTable from "@/components/journal/trade-table";
import MetricCard from "@/components/ui/metric-card";
import { formatCurrency } from "@/lib/utils";
import { ExportButton } from "@/components/ui/export-button";
import { BookOpen, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import PageTransition from "@/components/ui/page-transition";

export default function JournalContent() {
  const { filteredTrades, overviewMetrics } = useTrading();

  const openTrades = filteredTrades.filter((t) => t.status === "open");
  const closedTrades = filteredTrades.filter((t) => t.status === "closed");
  const liquidatedTrades = filteredTrades.filter((t) => t.status === "liquidated");

  return (
    <PageTransition>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-primary" />
            Trading Journal
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Detailed trade history with annotations and analysis
          </p>
        </div>
        <div className="flex items-center gap-3">
          <ExportButton />
          <TimeFrameSelector />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Trades"
          value={filteredTrades.length.toString()}
          subtitle={`${closedTrades.length} closed`}
          icon={<BookOpen className="w-4 h-4 text-blue-400" />}
        />
        <MetricCard
          title="Winning Trades"
          value={closedTrades.filter((t) => t.pnl > 0).length.toString()}
          subtitle={`${overviewMetrics.winRate.toFixed(1)}% win rate`}
          icon={<TrendingUp className="w-4 h-4 text-green-400" />}
        />
        <MetricCard
          title="Losing Trades"
          value={closedTrades.filter((t) => t.pnl <= 0).length.toString()}
          subtitle={`${overviewMetrics.lossRate.toFixed(1)}% loss rate`}
          icon={<TrendingDown className="w-4 h-4 text-red-400" />}
        />
        <MetricCard
          title="Liquidations"
          value={liquidatedTrades.length.toString()}
          subtitle={
            liquidatedTrades.length > 0
              ? `${formatCurrency(liquidatedTrades.reduce((s, t) => s + t.pnl, 0))} lost`
              : "No liquidations"
          }
          icon={<AlertTriangle className="w-4 h-4 text-yellow-400" />}
        />
      </div>

      {/* Filters */}
      <FilterPanel />

      {/* Trade Table */}
      <TradeTable />
    </div>
    </PageTransition>
  );
}
