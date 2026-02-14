"use client";

import ChartContainer from "@/components/ui/chart-container";
import { useTrading } from "@/context/trading-context";
import { useMemo } from "react";

export function CorrelationHeatmap() {
  const { correlations } = useTrading();

  const { symbols, matrix } = useMemo(() => {
    const syms = [...new Set(correlations.flatMap((c) => [c.symbolA, c.symbolB]))];
    const mat: Record<string, Record<string, number>> = {};
    syms.forEach((s) => {
      mat[s] = {};
      syms.forEach((s2) => (mat[s][s2] = s === s2 ? 1 : 0));
    });
    correlations.forEach((c) => {
      mat[c.symbolA][c.symbolB] = c.correlation;
      mat[c.symbolB][c.symbolA] = c.correlation;
    });
    return { symbols: syms, matrix: mat };
  }, [correlations]);

  const getColor = (val: number) => {
    if (val >= 0.7) return "#00d4aa";
    if (val >= 0.3) return "#00d4aa80";
    if (val >= -0.3) return "#6b728040";
    if (val >= -0.7) return "#ef444480";
    return "#ef4444";
  };

  const shortName = (s: string) => s.split("/")[0];

  return (
    <ChartContainer title="Symbol Correlation" subtitle="Daily P&L correlation between trading pairs">
      <div className="overflow-x-auto">
        <div className="min-w-fit p-2">
          {/* Header row */}
          <div className="flex items-center">
            <div className="w-16 h-8 shrink-0" />
            {symbols.map((s) => (
              <div
                key={`h-${s}`}
                className="w-14 h-8 shrink-0 flex items-center justify-center text-[10px] text-gray-400 font-mono"
              >
                {shortName(s)}
              </div>
            ))}
          </div>
          {/* Data rows */}
          {symbols.map((row) => (
            <div key={`r-${row}`} className="flex items-center">
              <div className="w-16 h-12 shrink-0 flex items-center text-[10px] text-gray-400 font-mono truncate pr-1">
                {shortName(row)}
              </div>
              {symbols.map((col) => {
                const val = matrix[row]?.[col] ?? 0;
                return (
                  <div
                    key={`${row}-${col}`}
                    className="w-14 h-12 shrink-0 flex items-center justify-center text-[10px] font-mono rounded-md m-[1px] transition-all hover:scale-110 cursor-default"
                    style={{
                      backgroundColor: getColor(val),
                      color: Math.abs(val) > 0.3 ? "#fff" : "#9ca3af",
                    }}
                    title={`${shortName(row)} × ${shortName(col)}: ${val.toFixed(2)}`}
                  >
                    {val.toFixed(2)}
                  </div>
                );
              })}
            </div>
          ))}
          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 justify-center">
            <span className="text-[10px] text-gray-500">-1.0</span>
            <div className="flex h-3 rounded-full overflow-hidden">
              {["#ef4444", "#ef444480", "#6b728040", "#00d4aa80", "#00d4aa"].map((c, i) => (
                <div key={i} className="w-8 h-full" style={{ backgroundColor: c }} />
              ))}
            </div>
            <span className="text-[10px] text-gray-500">+1.0</span>
          </div>
        </div>
      </div>
    </ChartContainer>
  );
}
