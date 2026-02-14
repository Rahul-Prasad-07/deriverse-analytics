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

export default function DailyPnLChart() {
  const { dailyPerformance } = useTrading();

  const data = dailyPerformance.slice(-30).map((d) => ({
    date: d.date,
    pnl: Number(d.pnl.toFixed(2)),
    trades: d.trades,
  }));

  return (
    <ChartContainer
      title="Daily P&L"
      subtitle="Profit and loss per trading day (last 30 days)"
    >
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9, fill: "#64748b" }}
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
              width={55}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const pnl = payload[0].value as number;
                return (
                  <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
                    <p className="text-xs text-muted-foreground mb-1">
                      {label ? new Date(String(label)).toLocaleDateString() : ""}
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        pnl >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {formatCurrency(pnl)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {(payload[0].payload as { trades: number }).trades} trades
                    </p>
                  </div>
                );
              }}
            />
            <Bar dataKey="pnl" radius={[3, 3, 0, 0]} maxBarSize={16}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.pnl >= 0 ? "#00d4aa" : "#ef4444"}
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
