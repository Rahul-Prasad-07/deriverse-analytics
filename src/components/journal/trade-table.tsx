"use client";

import React, { useState, useMemo } from "react";
import { useTrading } from "@/context/trading-context";
import { Trade } from "@/types/trading";
import { cn, formatCurrency, formatDuration } from "@/lib/utils";
import TradeDetailModal from "@/components/journal/trade-detail-modal";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  ExternalLink,
  Tag,
  X,
  Check,
  Edit3,
} from "lucide-react";

type SortField = "entryTime" | "symbol" | "side" | "pnl" | "pnlPercent" | "volume" | "duration";
type SortDir = "asc" | "desc";

export default function TradeTable() {
  const { filteredTrades, updateAnnotation } = useTrading();
  const [sortField, setSortField] = useState<SortField>("entryTime");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [page, setPage] = useState(0);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const pageSize = 20;

  const sortedTrades = useMemo(() => {
    return [...filteredTrades].sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "entryTime":
          cmp = a.entryTime.getTime() - b.entryTime.getTime();
          break;
        case "symbol":
          cmp = a.symbol.localeCompare(b.symbol);
          break;
        case "side":
          cmp = a.side.localeCompare(b.side);
          break;
        case "pnl":
          cmp = a.pnl - b.pnl;
          break;
        case "pnlPercent":
          cmp = a.pnlPercent - b.pnlPercent;
          break;
        case "volume":
          cmp = a.quantity * a.entryPrice - b.quantity * b.entryPrice;
          break;
        case "duration":
          const aDur = a.exitTime ? a.exitTime.getTime() - a.entryTime.getTime() : 0;
          const bDur = b.exitTime ? b.exitTime.getTime() - b.entryTime.getTime() : 0;
          cmp = aDur - bDur;
          break;
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filteredTrades, sortField, sortDir]);

  const pagedTrades = sortedTrades.slice(page * pageSize, (page + 1) * pageSize);
  const totalPages = Math.ceil(sortedTrades.length / pageSize);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const startEdit = (trade: Trade) => {
    setEditingId(trade.id);
    setEditText(trade.annotation || "");
  };

  const saveEdit = () => {
    if (editingId) {
      updateAnnotation(editingId, editText);
      setEditingId(null);
    }
  };

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      onClick={() => handleSort(field)}
    >
      {children}
      {sortField === field ? (
        sortDir === "asc" ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-40" />
      )}
    </button>
  );

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Trade History</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {sortedTrades.length} trades found
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-accent/30">
              <th className="px-4 py-3 text-left">
                <SortHeader field="entryTime">Date</SortHeader>
              </th>
              <th className="px-4 py-3 text-left">
                <SortHeader field="symbol">Pair</SortHeader>
              </th>
              <th className="px-4 py-3 text-left">
                <SortHeader field="side">Side</SortHeader>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-xs font-medium text-muted-foreground">Type</span>
              </th>
              <th className="px-4 py-3 text-right">
                <span className="text-xs font-medium text-muted-foreground">Entry</span>
              </th>
              <th className="px-4 py-3 text-right">
                <span className="text-xs font-medium text-muted-foreground">Exit</span>
              </th>
              <th className="px-4 py-3 text-right">
                <SortHeader field="volume">Volume</SortHeader>
              </th>
              <th className="px-4 py-3 text-right">
                <span className="text-xs font-medium text-muted-foreground">Lev</span>
              </th>
              <th className="px-4 py-3 text-right">
                <SortHeader field="pnl">P&L</SortHeader>
              </th>
              <th className="px-4 py-3 text-right">
                <SortHeader field="pnlPercent">P&L %</SortHeader>
              </th>
              <th className="px-4 py-3 text-right">
                <span className="text-xs font-medium text-muted-foreground">Fees</span>
              </th>
              <th className="px-4 py-3 text-right">
                <SortHeader field="duration">Duration</SortHeader>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-xs font-medium text-muted-foreground">Notes</span>
              </th>
              <th className="px-4 py-3 text-center">
                <span className="text-xs font-medium text-muted-foreground">Tx</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {pagedTrades.map((trade) => {
              const duration = trade.exitTime
                ? (trade.exitTime.getTime() - trade.entryTime.getTime()) / 60000
                : 0;
              const volume = trade.quantity * trade.entryPrice;

              return (
                <tr
                  key={trade.id}
                  className="border-b border-border/50 hover:bg-accent/20 transition-colors cursor-pointer"
                  onClick={() => setSelectedTrade(trade)}
                >
                  {/* Date */}
                  <td className="px-4 py-3">
                    <div className="text-xs">
                      {trade.entryTime.toLocaleDateString()}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {trade.entryTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>

                  {/* Symbol */}
                  <td className="px-4 py-3">
                    <div className="text-xs font-medium">{trade.symbol}</div>
                    <div className="text-[10px] text-muted-foreground capitalize">
                      {trade.marketType}
                    </div>
                  </td>

                  {/* Side */}
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase",
                        trade.side === "long"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-red-500/10 text-red-400"
                      )}
                    >
                      {trade.side}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3">
                    <span className="text-xs text-muted-foreground uppercase">
                      {trade.orderType}
                    </span>
                  </td>

                  {/* Entry Price */}
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs font-mono">
                      ${trade.entryPrice.toFixed(trade.entryPrice < 1 ? 6 : 2)}
                    </span>
                  </td>

                  {/* Exit Price */}
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs font-mono">
                      {trade.exitPrice
                        ? `$${trade.exitPrice.toFixed(trade.exitPrice < 1 ? 6 : 2)}`
                        : "—"}
                    </span>
                  </td>

                  {/* Volume */}
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs font-mono">
                      {formatCurrency(volume)}
                    </span>
                  </td>

                  {/* Leverage */}
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs">
                      {trade.leverage > 1 ? `${trade.leverage}x` : "—"}
                    </span>
                  </td>

                  {/* P&L */}
                  <td className="px-4 py-3 text-right">
                    <span
                      className={cn(
                        "text-xs font-bold font-mono",
                        trade.pnl > 0
                          ? "text-green-400"
                          : trade.pnl < 0
                            ? "text-red-400"
                            : "text-muted-foreground"
                      )}
                    >
                      {trade.pnl > 0 ? "+" : ""}
                      {formatCurrency(trade.pnl)}
                    </span>
                  </td>

                  {/* P&L % */}
                  <td className="px-4 py-3 text-right">
                    <span
                      className={cn(
                        "text-xs font-mono",
                        trade.pnlPercent > 0
                          ? "text-green-400"
                          : trade.pnlPercent < 0
                            ? "text-red-400"
                            : "text-muted-foreground"
                      )}
                    >
                      {trade.pnlPercent > 0 ? "+" : ""}
                      {trade.pnlPercent.toFixed(2)}%
                    </span>
                  </td>

                  {/* Fees */}
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs font-mono text-yellow-400">
                      {formatCurrency(trade.fees.total)}
                    </span>
                  </td>

                  {/* Duration */}
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs text-muted-foreground">
                      {trade.exitTime ? formatDuration(duration) : "Open"}
                    </span>
                  </td>

                  {/* Annotation */}
                  <td className="px-4 py-3 max-w-[200px]">
                    {editingId === trade.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          className="text-xs bg-accent border border-border rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-primary"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                          autoFocus
                        />
                        <button
                          onClick={saveEdit}
                          className="text-green-400 hover:text-green-300"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        {trade.annotation ? (
                          <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">
                            {trade.annotation}
                          </span>
                        ) : null}
                        <button
                          onClick={() => startEdit(trade)}
                          className="text-muted-foreground hover:text-foreground flex-shrink-0"
                        >
                          {trade.annotation ? (
                            <Edit3 className="w-3 h-3" />
                          ) : (
                            <MessageSquare className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    )}
                    {trade.tags.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {trade.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] px-1.5 py-0.5 rounded bg-accent text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>

                  {/* Tx Link */}
                  <td className="px-4 py-3 text-center">
                    <a
                      href={`https://explorer.solana.com/tx/${trade.txSignature}?cluster=devnet`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 mx-auto" />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Trade Detail Modal */}
      <TradeDetailModal trade={selectedTrade} onClose={() => setSelectedTrade(null)} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {page * pageSize + 1}-
            {Math.min((page + 1) * pageSize, sortedTrades.length)} of{" "}
            {sortedTrades.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 text-xs rounded-md bg-accent text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-xs text-muted-foreground">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1.5 text-xs rounded-md bg-accent text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
