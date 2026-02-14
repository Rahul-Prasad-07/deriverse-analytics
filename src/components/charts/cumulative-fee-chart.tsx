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

export default function CumulativeFeeChart() {
  const { dailyPerformance } = useTrading();

  let cumFees = 0;
  const data = dailyPerformance.map((d) => {
    cumFees += d.fees;
    return {
      date: d.date,
      fees: Number(d.fees.toFixed(2)),
      cumFees: Number(cumFees.toFixed(2)),
    };
  });

  return (
    <ChartContainer
      title="Cumulative Fees"
      subtitle="Total fees paid over time"
    >
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id="feeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              width={50}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                return (
                  <div className="bg-card border border-border rounded-lg p-3 shadow-xl">
                    <p className="text-xs text-muted-foreground mb-1">
                      {label ? new Date(String(label)).toLocaleDateString() : ""}
                    </p>
                    <p className="text-sm font-bold text-yellow-400">
                      Cumulative: {formatCurrency(payload[0].value as number)}
                    </p>
                  </div>
                );
              }}
            />
            <Area
              type="monotone"
              dataKey="cumFees"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="url(#feeGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  );
}
