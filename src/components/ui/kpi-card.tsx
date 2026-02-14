"use client";

import { motion } from "framer-motion";
import { KPIDefinition } from "@/types/trading";
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Target,
  AlertTriangle,
  Activity,
} from "lucide-react";

const statusColors = {
  good: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", glow: "shadow-emerald-500/20" },
  warning: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", glow: "shadow-amber-500/20" },
  danger: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", glow: "shadow-red-500/20" },
  neutral: { bg: "bg-gray-500/10", border: "border-gray-500/30", text: "text-gray-400", glow: "shadow-gray-500/20" },
};

const typeIcons = {
  performance: Target,
  risk: Shield,
};

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 24;
  const w = 64;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");

  return (
    <svg width={w} height={h} className="opacity-60">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function KPICard({ kpi, index }: { kpi: KPIDefinition; index: number }) {
  const colors = statusColors[kpi.status];
  const Icon = kpi.type === "risk" ? typeIcons.risk : typeIcons.performance;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative overflow-hidden rounded-xl border ${colors.border} ${colors.bg} p-4 backdrop-blur-sm hover:shadow-lg ${colors.glow} transition-all duration-300 group`}
    >
      {/* Status indicator dot */}
      <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${
        kpi.status === "good" ? "bg-emerald-400" :
        kpi.status === "warning" ? "bg-amber-400" :
        kpi.status === "danger" ? "bg-red-400" : "bg-gray-400"
      } animate-pulse`} />

      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`p-1.5 rounded-lg ${colors.bg}`}>
            <Icon className={`w-3.5 h-3.5 ${colors.text}`} />
          </div>
          <span className="text-xs text-gray-400 font-medium">{kpi.name}</span>
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className={`text-xl font-bold ${colors.text} font-mono tracking-tight`}>
            {kpi.formattedValue}
          </p>
          {kpi.change !== undefined && (
            <div className="flex items-center gap-1 mt-1">
              {kpi.change >= 0 ? (
                <TrendingUp className="w-3 h-3 text-emerald-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400" />
              )}
              <span className={`text-[10px] font-mono ${kpi.change >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                {kpi.change >= 0 ? "+" : ""}${Math.abs(kpi.change).toFixed(2)} {kpi.changePeriod}
              </span>
            </div>
          )}
        </div>
        {kpi.sparklineData && (
          <MiniSparkline
            data={kpi.sparklineData}
            color={kpi.status === "good" ? "#00d4aa" : kpi.status === "danger" ? "#ef4444" : "#f59e0b"}
          />
        )}
      </div>

      {kpi.description && (
        <p className="text-[10px] text-gray-500 mt-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
          {kpi.description}
        </p>
      )}
    </motion.div>
  );
}

export function KPIDashboard({ kpis }: { kpis: KPIDefinition[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {kpis.map((kpi, i) => (
        <KPICard key={kpi.key} kpi={kpi} index={i} />
      ))}
    </div>
  );
}
