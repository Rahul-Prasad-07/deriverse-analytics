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
  Legend,
} from "recharts";
import { useTrading } from "@/context/trading-context";
import ChartContainer from "@/components/ui/chart-container";
import { formatCurrency } from "@/lib/utils";

export default function SessionChart() {
  const { sessionStats } = useTrading();

  const sessionLabels: Record<string, string> = {
    asian: "Asian (00-08 UTC)",
    european: "European (08-16 UTC)",
    american: "American (16-24 UTC)",
  };

  const sessionColors: Record<string, string> = {
    asian: "#f59e0b",
    european: "#3b82f6",
    american: "#8b5cf6",
  };

  const data = sessionStats.map((s) => ({
    session: sessionLabels[s.session],
    pnl: Number(s.pnl.toFixed(2)),
    trades: s.trades,
    winRate: Number(s.winRate.toFixed(1)),
    volume: Number(s.volume.toFixed(2)),
    color: sessionColors[s.session],
  }));

  return (
    <ChartContainer
      title="Session Performance"
      subtitle="Performance by trading session"
    >
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e2130" vertical={false} />
            <XAxis
              dataKey="session"
              tick={{ fontSize: 9, fill: "#e2e8f0" }}
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
                    <p className="text-xs font-semibold mb-1">{d.session}</p>
                    <p
                      className={`text-sm font-bold ${
                        d.pnl >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      P&L: {formatCurrency(d.pnl)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {d.trades} trades · WR: {d.winRate}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Vol: {formatCurrency(d.volume)}
                    </p>
                  </div>
                );
              }}
            />
            <Bar dataKey="pnl" radius={[4, 4, 0, 0]} maxBarSize={48}>
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
