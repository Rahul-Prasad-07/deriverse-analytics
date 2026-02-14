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

export default function SymbolPerformanceChart() {
  const { symbolStats } = useTrading();

  const data = symbolStats.slice(0, 8).map((s) => ({
    symbol: s.symbol.replace("/USDC", ""),
    pnl: Number(s.totalPnl.toFixed(2)),
    trades: s.totalTrades,
    winRate: Number(s.winRate.toFixed(1)),
  }));

  return (
    <ChartContainer
      title="Performance by Symbol"
      subtitle="P&L breakdown per trading pair"
    >
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" horizontal={false} />
            <XAxis
              type="number"
              tick={{ fontSize: 10, fill: "#64748b" }}
              tickFormatter={(val) => formatCurrency(val, 0)}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="symbol"
              tick={{ fontSize: 11, fill: "#e2e8f0" }}
              axisLine={false}
              tickLine={false}
              width={50}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
                    <p className="text-xs font-semibold mb-1">
                      {data.symbol}/USDC
                    </p>
                    <p
                      className={`text-sm font-bold ${
                        data.pnl >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {formatCurrency(data.pnl)}
                    </p>
                    <div className="flex gap-3 mt-1">
                      <p className="text-xs text-muted-foreground">
                        {data.trades} trades
                      </p>
                      <p className="text-xs text-muted-foreground">
                        WR: {data.winRate}%
                      </p>
                    </div>
                  </div>
                );
              }}
            />
            <Bar dataKey="pnl" radius={[0, 4, 4, 0]} maxBarSize={20}>
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
