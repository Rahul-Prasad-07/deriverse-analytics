"use client";

import React from "react";
import { useTrading } from "@/context/trading-context";
import { usePathname } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import {
  Activity,
  CircleDot,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/journal": "Trading Journal",
  "/portfolio": "Portfolio Analysis",
  "/performance": "Performance",
  "/risk": "Risk Management",
  "/settings": "Settings",
};

export default function StatusBar() {
  const pathname = usePathname();
  const { overviewMetrics, filteredTrades, wallet } = useTrading();

  const bestTrade = filteredTrades.reduce((best, t) =>
    t.pnl > (best?.pnl ?? -Infinity) ? t : best,
  filteredTrades[0]);

  const pageTitle = pageTitles[pathname] || "Deriverse Analytics";

  return (
    <div className="h-7 bg-[#0d0e13] border-b border-[#1a1c24] flex items-center px-4 gap-4 text-[11px] text-gray-500 shrink-0 overflow-x-auto">
      {/* Current page breadcrumb */}
      <div className="flex items-center gap-1.5 text-gray-400 shrink-0">
        <Activity className="w-3 h-3 text-[#00d4aa]" />
        <span className="font-medium">{pageTitle}</span>
      </div>

      <div className="w-px h-3 bg-[#1e2028]" />

      {/* Connection status */}
      <div className="flex items-center gap-1.5 shrink-0">
        <CircleDot className={cn(
          "w-3 h-3",
          wallet.connected ? "text-emerald-400" : "text-gray-600"
        )} />
        <span>{wallet.connected ? "Connected" : "Not Connected"}</span>
      </div>

      <div className="w-px h-3 bg-[#1e2028]" />

      {/* P&L indicator */}
      <div className="flex items-center gap-1.5 shrink-0">
        {overviewMetrics.totalPnl >= 0 ? (
          <TrendingUp className="w-3 h-3 text-emerald-400" />
        ) : (
          <TrendingDown className="w-3 h-3 text-red-400" />
        )}
        <span className={cn(
          "font-mono",
          overviewMetrics.totalPnl >= 0 ? "text-emerald-400" : "text-red-400"
        )}>
          {formatCurrency(overviewMetrics.totalPnl)}
        </span>
      </div>

      <div className="w-px h-3 bg-[#1e2028]" />

      {/* Win rate */}
      <div className="flex items-center gap-1 shrink-0">
        <span>WR</span>
        <span className="font-mono text-gray-400">{overviewMetrics.winRate.toFixed(1)}%</span>
      </div>

      <div className="w-px h-3 bg-[#1e2028]" />

      {/* Trade count */}
      <div className="flex items-center gap-1 shrink-0">
        <span>{overviewMetrics.totalTrades} trades</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Timestamp */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Clock className="w-3 h-3" />
        <span className="font-mono">{new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
}
