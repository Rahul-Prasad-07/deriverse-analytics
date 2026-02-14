"use client";

import { motion } from "framer-motion";
import { useTrading } from "@/context/trading-context";
import { Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const gradeColors: Record<string, string> = {
  "A+": "#00d4aa",
  "A": "#00d4aa",
  "B+": "#22c55e",
  "B": "#22c55e",
  "C+": "#f59e0b",
  "C": "#f59e0b",
  "D": "#ef4444",
  "F": "#dc2626",
};

export function RiskHealthGauge() {
  const { riskHealthScore } = useTrading();
  const { overall, grade, sharpeScore, drawdownScore, consistencyScore, riskRewardScore, warnings, recommendations } = riskHealthScore;

  const gradeColor = gradeColors[grade] || "#6b7280";
  const circumference = 2 * Math.PI * 58;
  const progress = (overall / 100) * circumference;

  const categories = [
    { label: "Sharpe", score: sharpeScore, max: 25 },
    { label: "Drawdown", score: drawdownScore, max: 25 },
    { label: "Consistency", score: consistencyScore, max: 25 },
    { label: "Risk/Reward", score: riskRewardScore, max: 25 },
  ];

  return (
    <div className="rounded-xl border border-[#1e2028] bg-[#0d0e14]/80 p-6">
      <div className="flex items-center gap-2 mb-5">
        <Shield className="w-5 h-5 text-[#00d4aa]" />
        <h3 className="text-sm font-semibold text-white">Risk Health Score</h3>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* Circular gauge */}
        <div className="relative">
          <svg width="140" height="140" viewBox="0 0 140 140">
            {/* Background circle */}
            <circle cx="70" cy="70" r="58" fill="none" stroke="#1e2028" strokeWidth="8" />
            {/* Progress arc */}
            <motion.circle
              cx="70"
              cy="70"
              r="58"
              fill="none"
              stroke={gradeColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              animate={{ strokeDashoffset: circumference - progress }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              transform="rotate(-90 70 70)"
              style={{ filter: `drop-shadow(0 0 6px ${gradeColor}40)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-3xl font-bold font-mono"
              style={{ color: gradeColor }}
            >
              {grade}
            </motion.span>
            <span className="text-xs text-gray-500 font-mono">{overall}/100</span>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="w-full space-y-3">
          {categories.map((cat) => {
            const pct = (cat.score / cat.max) * 100;
            const catColor = pct >= 70 ? "#00d4aa" : pct >= 40 ? "#f59e0b" : "#ef4444";
            return (
              <div key={cat.label}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">{cat.label}</span>
                  <span className="text-xs font-mono" style={{ color: catColor }}>
                    {cat.score}/{cat.max}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-[#1e2028] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: catColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Warnings & Recommendations */}
        {warnings.length > 0 && (
          <div className="w-full space-y-1.5">
            {warnings.map((w, i) => (
              <div key={`w-${i}`} className="flex items-start gap-2 text-xs text-amber-400/80">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{w}</span>
              </div>
            ))}
          </div>
        )}
        {recommendations.length > 0 && (
          <div className="w-full space-y-1.5">
            {recommendations.map((r, i) => (
              <div key={`r-${i}`} className="flex items-start gap-2 text-xs text-blue-400/80">
                <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
