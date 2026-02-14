"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useTrading } from "@/context/trading-context";
import ChartContainer from "@/components/ui/chart-container";
import { formatCurrency } from "@/lib/utils";

export default function HourlyHeatmap() {
  const { timeOfDayStats } = useTrading();

  const data = timeOfDayStats.map((h) => ({
    hour: `${h.hour.toString().padStart(2, "0")}:00`,
    pnl: Number(h.pnl.toFixed(2)),
    trades: h.trades,
    winRate: Number(h.winRate.toFixed(1)),
  }));

  return (
    <ChartContainer
      title="Performance by Hour"
      subtitle="Time-of-day P&L analysis (UTC)"
    >
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" vertical={false} />
            <XAxis
              dataKey="hour"
              tick={{ fontSize: 8, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#64748b" }}
              tickFormatter={(val) => formatCurrency(val, 0)}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
                    <p className="text-xs font-semibold mb-1">{d.hour} UTC</p>
                    <p
                      className={`text-sm font-bold ${
                        d.pnl >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {formatCurrency(d.pnl)}
                    </p>
                    <div className="flex gap-3 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {d.trades} trades
                      </p>
                      <p className="text-xs text-muted-foreground">
                        WR: {d.winRate}%
                      </p>
                    </div>
                  </div>
                );
              }}
            />
            <Bar dataKey="pnl" radius={[2, 2, 0, 0]} maxBarSize={14}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.pnl >= 0 ? "#00d4aa" : "#ef4444"}
                  fillOpacity={0.7}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
