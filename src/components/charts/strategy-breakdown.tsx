"use client";

import { motion } from "framer-motion";
import ChartContainer from "@/components/ui/chart-container";
import { useTrading } from "@/context/trading-context";
import { TrendingUp, TrendingDown, Activity, Zap } from "lucide-react";

const strategyIcons = [Activity, Zap, TrendingUp, TrendingDown];
const strategyColors = ["#00d4aa", "#8b5cf6", "#3b82f6", "#f59e0b"];

export function StrategyBreakdown() {
  const { strategyPerformance } = useTrading();

  return (
    <ChartContainer title="Strategy Performance" subtitle="Performance breakdown by trading strategy">
      <div className="space-y-3">
        {strategyPerformance.map((strat, idx) => {
          const Icon = strategyIcons[idx % strategyIcons.length];
          const color = strategyColors[idx % strategyColors.length];
          const isPositive = strat.totalPnl >= 0;

          return (
            <motion.div
              key={strat.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="relative overflow-hidden rounded-xl border border-[#1e2028] bg-[#0d0e14]/80 p-4 hover:border-[#2a2d38] transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{strat.name}</h4>
                    <p className="text-xs text-gray-500">
                      {strat.trades} trades · Avg {(strat.avgDuration / 60).toFixed(1)}h
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold font-mono ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
                    {isPositive ? "+" : ""}${strat.totalPnl.toFixed(2)}
                  </p>
                  <p className={`text-xs font-mono ${isPositive ? "text-emerald-400/70" : "text-red-400/70"}`}>
                    {isPositive ? "+" : ""}{strat.returnPct.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-4 gap-2">
                <StatMini label="Win Rate" value={`${strat.winRate.toFixed(0)}%`} good={strat.winRate > 50} />
                <StatMini label="Sharpe" value={strat.sharpeRatio.toFixed(2)} good={strat.sharpeRatio > 1} />
                <StatMini label="PF" value={strat.profitFactor === Infinity ? "∞" : strat.profitFactor.toFixed(2)} good={strat.profitFactor > 1.5} />
                <StatMini label="MDD" value={`$${Math.abs(strat.maxDrawdown).toFixed(0)}`} good={Math.abs(strat.maxDrawdown) < 500} />
              </div>

              {/* Win rate progress bar */}
              <div className="mt-3">
                <div className="h-1.5 rounded-full bg-[#1e2028] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${strat.winRate}%` }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.8 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </ChartContainer>
  );
}

function StatMini({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="text-center">
      <p className="text-[10px] text-gray-500 mb-0.5">{label}</p>
      <p className={`text-xs font-mono font-semibold ${good ? "text-emerald-400" : "text-amber-400"}`}>
        {value}
      </p>
    </div>
  );
}
