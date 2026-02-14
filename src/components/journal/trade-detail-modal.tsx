"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trade } from "@/types/trading";
import { formatCurrency, formatDuration, cn } from "@/lib/utils";
import {
  X,
  TrendingUp,
  TrendingDown,
  Clock,
  Hash,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Tag,
  BarChart2,
  ExternalLink,
  Layers,
  Target,
  ShieldAlert,
  Zap,
} from "lucide-react";

interface TradeDetailModalProps {
  trade: Trade | null;
  onClose: () => void;
}

export default function TradeDetailModal({ trade, onClose }: TradeDetailModalProps) {
  if (!trade) return null;

  const isProfit = trade.pnl >= 0;
  const rr = trade.riskRewardRatio ?? (trade.pnl > 0 ? trade.pnl / Math.abs(trade.pnl) : 0);
  const duration = trade.exitTime
    ? trade.exitTime.getTime() - trade.entryTime.getTime()
    : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-[#111318] border border-[#2a2d38] rounded-2xl shadow-2xl shadow-black/50 w-full max-w-lg max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2028]">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                isProfit ? "bg-emerald-500/10" : "bg-red-500/10"
              )}>
                {isProfit ? (
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{trade.symbol}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    trade.side === "long" ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
                  )}>
                    {trade.side.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">{trade.marketType}</span>
                  <span className="text-xs text-gray-500">·</span>
                  <span className="text-xs text-gray-500">{trade.orderType}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-[#1e2028]">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* P&L Hero */}
          <div className={cn(
            "mx-6 mt-4 rounded-xl p-4 border",
            isProfit ? "bg-emerald-500/5 border-emerald-500/20" : "bg-red-500/5 border-red-500/20"
          )}>
            <p className="text-xs text-gray-500 mb-1">Realized P&L</p>
            <div className="flex items-end justify-between">
              <div>
                <p className={cn(
                  "text-3xl font-bold font-mono tracking-tight",
                  isProfit ? "text-emerald-400" : "text-red-400"
                )}>
                  {isProfit ? "+" : ""}{formatCurrency(trade.pnl)}
                </p>
                <p className={cn(
                  "text-sm font-mono mt-0.5",
                  isProfit ? "text-emerald-400/70" : "text-red-400/70"
                )}>
                  {isProfit ? "+" : ""}{trade.pnlPercent.toFixed(2)}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Duration</p>
                <p className="text-sm font-mono text-gray-300">{formatDuration(duration)}</p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="px-6 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <DetailRow icon={<DollarSign className="w-3.5 h-3.5" />} label="Entry Price" value={`$${trade.entryPrice.toLocaleString(undefined, { maximumFractionDigits: 4 })}`} />
              <DetailRow icon={<DollarSign className="w-3.5 h-3.5" />} label="Exit Price" value={trade.exitPrice ? `$${trade.exitPrice.toLocaleString(undefined, { maximumFractionDigits: 4 })}` : "Open"} />
              <DetailRow icon={<Layers className="w-3.5 h-3.5" />} label="Volume" value={formatCurrency(trade.quantity * trade.entryPrice)} />
              <DetailRow icon={<BarChart2 className="w-3.5 h-3.5" />} label="Leverage" value={`${trade.leverage}x`} />
              <DetailRow icon={<Clock className="w-3.5 h-3.5" />} label="Entry Time" value={trade.entryTime.toLocaleString()} />
              <DetailRow icon={<Clock className="w-3.5 h-3.5" />} label="Exit Time" value={trade.exitTime ? trade.exitTime.toLocaleString() : "Still Open"} />
            </div>

            {/* Strategy & Risk */}
            {(trade.strategy || trade.riskRewardRatio) && (
              <div className="pt-3 border-t border-[#1e2028]">
                <div className="grid grid-cols-2 gap-3">
                  {trade.strategy && (
                    <DetailRow icon={<Zap className="w-3.5 h-3.5" />} label="Strategy" value={trade.strategy} />
                  )}
                  {trade.riskRewardRatio && (
                    <DetailRow icon={<Target className="w-3.5 h-3.5" />} label="R:R Ratio" value={`1:${trade.riskRewardRatio.toFixed(2)}`} />
                  )}
                  {trade.maxAdverseExcursion !== undefined && (
                    <DetailRow icon={<ShieldAlert className="w-3.5 h-3.5" />} label="MAE" value={`${trade.maxAdverseExcursion.toFixed(2)}%`} />
                  )}
                  {trade.maxFavorableExcursion !== undefined && (
                    <DetailRow icon={<ArrowUpRight className="w-3.5 h-3.5" />} label="MFE" value={`${trade.maxFavorableExcursion.toFixed(2)}%`} />
                  )}
                </div>
              </div>
            )}

            {/* Fees */}
            <div className="pt-3 border-t border-[#1e2028]">
              <p className="text-xs text-gray-500 font-medium mb-2">Fee Breakdown</p>
              <div className="grid grid-cols-3 gap-3">
                <DetailRow icon={<Hash className="w-3.5 h-3.5" />} label="Trading Fee" value={formatCurrency(trade.fees.taker + trade.fees.maker)} small />
                <DetailRow icon={<Hash className="w-3.5 h-3.5" />} label="Funding" value={formatCurrency(trade.fees.funding)} small />
                <DetailRow icon={<Hash className="w-3.5 h-3.5" />} label="Total" value={formatCurrency(trade.fees.total)} small />
              </div>
            </div>

            {/* Tags */}
            {trade.tags && trade.tags.length > 0 && (
              <div className="pt-3 border-t border-[#1e2028]">
                <p className="text-xs text-gray-500 font-medium mb-2">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {trade.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-[#1e2028] text-[11px] text-gray-400 border border-[#2a2d38]">
                      <Tag className="w-2.5 h-2.5 inline mr-1" />{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Annotation */}
            {trade.annotation && (
              <div className="pt-3 border-t border-[#1e2028]">
                <p className="text-xs text-gray-500 font-medium mb-2">Notes</p>
                <p className="text-sm text-gray-300 bg-[#0a0b0f] rounded-lg p-3 border border-[#1e2028]">
                  {trade.annotation}
                </p>
              </div>
            )}

            {/* Solana Explorer Link */}
            {trade.txSignature && (
              <div className="pt-3 border-t border-[#1e2028]">
                <a
                  href={`https://solscan.io/tx/${trade.txSignature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-[#00d4aa] hover:text-[#00e4ba] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View on Solscan
                  <span className="text-gray-600 font-mono truncate max-w-[200px]">{trade.txSignature}</span>
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function DetailRow({ icon, label, value, small }: { icon: React.ReactNode; label: string; value: string; small?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-gray-500 mt-0.5 shrink-0">{icon}</div>
      <div>
        <p className={cn("text-gray-500", small ? "text-[10px]" : "text-[11px]")}>{label}</p>
        <p className={cn("font-medium text-gray-200", small ? "text-xs" : "text-sm")}>{value}</p>
      </div>
    </div>
  );
}
