"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ChartContainer from "@/components/ui/chart-container";
import { useTrading } from "@/context/trading-context";

export function EquityCurveChart() {
  const { equityCurve } = useTrading();

  return (
    <ChartContainer title="Equity Curve" subtitle="Portfolio value vs benchmark with drawdown">
      <ResponsiveContainer width="100%" height={380}>
        <ComposedChart data={equityCurve}>
          <defs>
            <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00d4aa" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#00d4aa" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="drawdownGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2028" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            tickFormatter={(v) => v ? new Date(String(v)).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : ""}
          />
          <YAxis
            yAxisId="equity"
            stroke="#6b7280"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
          />
          <YAxis
            yAxisId="drawdown"
            orientation="right"
            stroke="#6b7280"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            tickFormatter={(v) => `${Number(v).toFixed(0)}%`}
            reversed
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#13141a",
              border: "1px solid #1e2028",
              borderRadius: "12px",
              padding: "12px",
            }}
            labelStyle={{ color: "#9ca3af" }}
            formatter={(value?: number, name?: string) => {
              const v = value ?? 0;
              const n = name ?? "";
              if (n === "Drawdown") return [`${v.toFixed(1)}%`, n];
              return [`$${v.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, n];
            }}
            labelFormatter={(label) => label ? new Date(String(label)).toLocaleDateString() : ""}
          />
          <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 12 }} />
          <Area
            yAxisId="drawdown"
            type="monotone"
            dataKey="drawdownPercent"
            name="Drawdown"
            fill="url(#drawdownGrad)"
            stroke="#ef4444"
            strokeWidth={1}
            strokeOpacity={0.5}
          />
          <Line
            yAxisId="equity"
            type="monotone"
            dataKey="benchmark"
            name="Benchmark (8% Annual)"
            stroke="#6b7280"
            strokeDasharray="5 5"
            strokeWidth={1.5}
            dot={false}
          />
          <Area
            yAxisId="equity"
            type="monotone"
            dataKey="equity"
            name="Portfolio Equity"
            fill="url(#equityGrad)"
            stroke="#00d4aa"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
