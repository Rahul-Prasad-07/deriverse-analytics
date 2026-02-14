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

export default function DrawdownChart() {
  const { portfolioSnapshots } = useTrading();

  const data = portfolioSnapshots.map((s) => ({
    date: s.timestamp.toISOString().split("T")[0],
    drawdown: -Number(s.drawdownPercent.toFixed(2)),
    drawdownAbs: -Number(s.drawdown.toFixed(2)),
  }));

  return (
    <ChartContainer
      title="Drawdown Analysis"
      subtitle="Portfolio drawdown from peak equity"
    >
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0} />
                <stop offset="100%" stopColor="#ef4444" stopOpacity={0.3} />
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
              tickFormatter={(val) => `${val.toFixed(1)}%`}
              axisLine={false}
              tickLine={false}
              width={50}
              domain={["dataMin", 0]}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
                    <p className="text-xs text-muted-foreground mb-1">
                      {label ? new Date(String(label)).toLocaleDateString() : ""}
                    </p>
                    <p className="text-sm font-bold text-red-400">
                      {(payload[0].value as number).toFixed(2)}%
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatCurrency(payload[1]?.value as number || 0)}
                    </p>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="drawdown"
              stroke="#ef4444"
              strokeWidth={1.5}
              fill="url(#drawdownGradient)"
            />
            <Area
              type="monotone"
              dataKey="drawdownAbs"
              stroke="transparent"
              fill="transparent"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
