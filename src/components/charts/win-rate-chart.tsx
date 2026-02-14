"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTrading } from "@/context/trading-context";
import ChartContainer from "@/components/ui/chart-container";

export default function WinRateChart() {
  const { overviewMetrics } = useTrading();

  const data = [
    { name: "Wins", value: overviewMetrics.winRate, color: "#00d4aa" },
    { name: "Losses", value: overviewMetrics.lossRate, color: "#ef4444" },
  ];

  return (
    <ChartContainer title="Win Rate" subtitle="Win/Loss distribution">
      <div className="h-[200px] flex items-center">
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  return (
                    <div className="bg-card border border-border rounded-lg p-2 shadow-xl">
                      <p className="text-xs font-medium">
                        {payload[0].name}: {(payload[0].value as number).toFixed(1)}%
                      </p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 space-y-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00d4aa]" />
              <span className="text-xs text-muted-foreground">Wins</span>
            </div>
            <p className="text-lg font-bold text-green-400 ml-[18px]">
              {overviewMetrics.winRate.toFixed(1)}%
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
              <span className="text-xs text-muted-foreground">Losses</span>
            </div>
            <p className="text-lg font-bold text-red-400 ml-[18px]">
              {overviewMetrics.lossRate.toFixed(1)}%
            </p>
          </div>
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">Profit Factor</p>
            <p className="text-sm font-bold">
              {overviewMetrics.profitFactor === Infinity
                ? "∞"
                : overviewMetrics.profitFactor.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </ChartContainer>
  );
}
