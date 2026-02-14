"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
} from "recharts";
import ChartContainer from "@/components/ui/chart-container";
import { useTrading } from "@/context/trading-context";

export function ReturnDistributionChart() {
  const { returnDistribution } = useTrading();

  return (
    <ChartContainer title="Return Distribution" subtitle="P&L histogram across all trades">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={returnDistribution} barCategoryGap="5%">
          <CartesianGrid strokeDasharray="3 3" stroke="#1e2028" />
          <XAxis
            dataKey="range"
            stroke="#6b7280"
            tick={{ fill: "#6b7280", fontSize: 10 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis
            stroke="#6b7280"
            tick={{ fill: "#6b7280", fontSize: 11 }}
            label={{ value: "Trades", angle: -90, position: "insideLeft", fill: "#6b7280", fontSize: 11 }}
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
              if (name === "count") return [value ?? 0, "Trades"];
              return [value ?? 0, name ?? ""];
            }}
          />
          <ReferenceLine x="$0" stroke="#6b7280" strokeDasharray="3 3" />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {returnDistribution.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.midpoint >= 0 ? "#00d4aa" : "#ef4444"}
                fillOpacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
