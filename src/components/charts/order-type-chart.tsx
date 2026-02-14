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
import { formatCurrency, formatDuration } from "@/lib/utils";

const ORDER_TYPE_COLORS: Record<string, string> = {
  market: "#3b82f6",
  limit: "#00d4aa",
  stop: "#f59e0b",
  "stop-limit": "#8b5cf6",
  ioc: "#06b6d4",
};

export default function OrderTypeChart() {
  const { orderTypeStats } = useTrading();

  const data = orderTypeStats.map((o) => ({
    type: o.orderType.toUpperCase(),
    pnl: Number(o.totalPnl.toFixed(2)),
    trades: o.trades,
    winRate: Number(o.winRate.toFixed(1)),
    avgDuration: o.avgDuration,
    color: ORDER_TYPE_COLORS[o.orderType] || "#64748b",
  }));

  return (
    <ChartContainer
      title="Order Type Performance"
      subtitle="P&L analysis by order type"
    >
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" vertical={false} />
            <XAxis
              dataKey="type"
              tick={{ fontSize: 10, fill: "#e2e8f0" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#64748b" }}
              tickFormatter={(val) => formatCurrency(val, 0)}
              axisLine={false}
              tickLine={false}
              width={55}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
                    <p className="text-xs font-semibold mb-1">{d.type}</p>
                    <p
                      className={`text-sm font-bold ${
                        d.pnl >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {formatCurrency(d.pnl)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {d.trades} trades · WR: {d.winRate}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Avg Duration: {formatDuration(d.avgDuration)}
                    </p>
                  </div>
                );
              }}
            />
            <Bar dataKey="pnl" radius={[4, 4, 0, 0]} maxBarSize={36}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  fillOpacity={0.8}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
