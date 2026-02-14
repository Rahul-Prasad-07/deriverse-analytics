"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useTrading } from "@/context/trading-context";
import ChartContainer from "@/components/ui/chart-container";
import { formatCurrency } from "@/lib/utils";

export default function FeeBreakdownChart() {
  const { feeBreakdown } = useTrading();

  const totalFees = feeBreakdown.reduce(
    (sum, f) => sum + Math.abs(f.amount),
    0
  );

  return (
    <ChartContainer
      title="Fee Composition"
      subtitle="Breakdown of all trading fees"
    >
      <div className="h-[250px] flex items-center">
        <div className="w-1/2">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={feeBreakdown.filter((f) => Math.abs(f.amount) > 0)}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                dataKey={(entry) => Math.abs(entry.amount)}
                strokeWidth={0}
              >
                {feeBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const data = payload[0].payload;
                  return (
                    <div className="bg-card border border-border rounded-lg p-2 shadow-xl">
                      <p className="text-xs font-medium">{data.category}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(Math.abs(data.amount))} ({data.percentage.toFixed(1)}%)
                      </p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/2 space-y-2.5">
          {feeBreakdown.map((fee) => (
            <div key={fee.category} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: fee.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {fee.category}
                </span>
              </div>
              <span className="text-xs font-medium">
                {formatCurrency(Math.abs(fee.amount))}
              </span>
            </div>
          ))}
          <div className="pt-2 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Net Fees</span>
            <span className="text-sm font-bold text-red-400">
              {formatCurrency(totalFees)}
            </span>
          </div>
        </div>
      </div>
    </ChartContainer>
  );
}
