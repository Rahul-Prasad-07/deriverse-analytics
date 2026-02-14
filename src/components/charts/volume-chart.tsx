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
} from "recharts";
import { useTrading } from "@/context/trading-context";
import ChartContainer from "@/components/ui/chart-container";
import { formatCurrency } from "@/lib/utils";

export default function VolumeChart() {
  const { dailyPerformance } = useTrading();

  const data = dailyPerformance.slice(-30).map((d) => ({
    date: d.date,
    volume: Number(d.volume.toFixed(2)),
    fees: Number(d.fees.toFixed(2)),
  }));

  return (
    <ChartContainer
      title="Trading Volume"
      subtitle="Daily trading volume (last 30 days)"
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
                return (
                  <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
                    <p className="text-xs text-muted-foreground mb-1">
                      {label ? new Date(String(label)).toLocaleDateString() : ""}
                    </p>
                    <p className="text-sm font-bold text-blue-400">
                      Vol: {formatCurrency(payload[0].value as number)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Fees: {formatCurrency(payload[1]?.value as number || 0)}
                    </p>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="volume"
              fill="#3b82f6"
              fillOpacity={0.6}
              radius={[3, 3, 0, 0]}
              maxBarSize={16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
