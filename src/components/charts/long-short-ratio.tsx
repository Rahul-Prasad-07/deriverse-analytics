"use client";

import React from "react";
import { useTrading } from "@/context/trading-context";
import ChartContainer from "@/components/ui/chart-container";
import { cn } from "@/lib/utils";

export default function LongShortRatio() {
  const { overviewMetrics } = useTrading();
  const total = overviewMetrics.longCount + overviewMetrics.shortCount;
  const longPercent = total > 0 ? (overviewMetrics.longCount / total) * 100 : 50;
  const shortPercent = total > 0 ? (overviewMetrics.shortCount / total) * 100 : 50;

  return (
    <ChartContainer
      title="Long/Short Ratio"
      subtitle="Directional bias analysis"
    >
      <div className="space-y-4">
        {/* Ratio bar */}
        <div className="relative h-4 rounded-full overflow-hidden bg-secondary">
          <div
            className="absolute left-0 top-0 h-full bg-green-500 rounded-l-full transition-all duration-500"
            style={{ width: `${longPercent}%` }}
          />
          <div
            className="absolute right-0 top-0 h-full bg-red-500 rounded-r-full transition-all duration-500"
            style={{ width: `${shortPercent}%` }}
          />
        </div>

        {/* Stats */}
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-xs text-muted-foreground">Long</span>
            </div>
            <p className="text-lg font-bold text-green-400 ml-[18px]">
              {overviewMetrics.longCount}
            </p>
            <p className="text-xs text-muted-foreground ml-[18px]">
              {longPercent.toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Ratio</p>
            <p className="text-xl font-bold gradient-text">
              {overviewMetrics.longShortRatio.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <span className="text-xs text-muted-foreground">Short</span>
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            </div>
            <p className="text-lg font-bold text-red-400">
              {overviewMetrics.shortCount}
            </p>
            <p className="text-xs text-muted-foreground">
              {shortPercent.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Bias indicator */}
        <div className="flex items-center justify-center gap-2 pt-2 border-t border-border">
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              overviewMetrics.longShortRatio > 1.2
                ? "bg-green-500"
                : overviewMetrics.longShortRatio < 0.8
                  ? "bg-red-500"
                  : "bg-yellow-500"
            )}
          />
          <span className="text-xs text-muted-foreground">
            {overviewMetrics.longShortRatio > 1.2
              ? "Bullish Bias"
              : overviewMetrics.longShortRatio < 0.8
                ? "Bearish Bias"
                : "Neutral Bias"}
          </span>
        </div>
      </div>
    </ChartContainer>
  );
}
