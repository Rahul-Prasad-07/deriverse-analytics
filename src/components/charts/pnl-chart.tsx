"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTrading } from "@/context/trading-context";
import ChartContainer from "@/components/ui/chart-container";
import { formatCurrency } from "@/lib/utils";

export default function PnLChart() {
  const { dailyPerformance } = useTrading();

  const data = dailyPerformance.map((d) => ({
    date: d.date,
    pnl: Number(d.cumulativePnl.toFixed(2)),
    daily: Number(d.pnl.toFixed(2)),
  }));

  const isPositive = data.length > 0 && data[data.length - 1].pnl >= 0;

  return (
    <ChartContainer
      title="Cumulative P&L"
      subtitle="Overall portfolio performance over time"
    >
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={isPositive ? "#00d4aa" : "#ef4444"}
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor={isPositive ? "#00d4aa" : "#ef4444"}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#64748b" }}
              tickFormatter={(val) => {
                const d = new Date(val);
                return `${d.getMonth() + 1}/${d.getDate()}`;
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#64748b" }}
              tickFormatter={(val) => formatCurrency(val, 0)}
              axisLine={false}
              tickLine={false}
              width={60}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
                    <p className="text-xs text-muted-foreground mb-1">
                      {label ? new Date(String(label)).toLocaleDateString() : ""}
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        (payload[0].value as number) >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {formatCurrency(payload[0].value as number)}
                    </p>
                    {payload[1] && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Daily: {formatCurrency(payload[1].value as number)}
                      </p>
                    )}
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="pnl"
              stroke={isPositive ? "#00d4aa" : "#ef4444"}
              strokeWidth={2}
              fill="url(#pnlGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
