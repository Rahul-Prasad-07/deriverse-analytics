"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ChartContainer from "@/components/ui/chart-container";
import { useTrading } from "@/context/trading-context";

export function CapitalFlowChart() {
  const { capitalFlows } = useTrading();

  return (
    <ChartContainer title="Capital Flows" subtitle="Deposits, withdrawals, and portfolio balance over time">
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={capitalFlows}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
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
            yAxisId="balance"
            stroke="#6b7280"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
          />
          <YAxis
            yAxisId="flow"
            orientation="right"
            stroke="#6b7280"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            tickFormatter={(v) => `$${Number(v).toFixed(0)}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#13141a",
              border: "1px solid #1e2028",
              borderRadius: "12px",
              padding: "12px",
            }}
            labelStyle={{ color: "#9ca3af" }}
            formatter={(value?: number, name?: string) => [
              `$${(value ?? 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
              name ?? "",
            ]}
            labelFormatter={(label) => label ? new Date(String(label)).toLocaleDateString() : ""}
          />
          <Legend wrapperStyle={{ color: "#9ca3af", fontSize: 12 }} />
          <Area
            yAxisId="balance"
            type="monotone"
            dataKey="balance"
            name="Balance"
            fill="url(#balanceGrad)"
            stroke="#8b5cf6"
            strokeWidth={2}
          />
          <Bar yAxisId="flow" dataKey="deposits" name="Deposits" fill="#00d4aa" barSize={6} radius={[2, 2, 0, 0]} />
          <Bar yAxisId="flow" dataKey="withdrawals" name="Withdrawals" fill="#ef4444" barSize={6} radius={[2, 2, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
