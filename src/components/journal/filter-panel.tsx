"use client";

import React from "react";
import { useTrading } from "@/context/trading-context";
import { cn } from "@/lib/utils";
import { Filter, X } from "lucide-react";

export default function FilterPanel() {
  const { filters, setFilters, availableSymbols } = useTrading();

  const hasFilters =
    filters.symbols.length > 0 ||
    filters.marketType !== "all" ||
    filters.side !== "all" ||
    filters.orderType !== "all" ||
    filters.status !== "all";

  const clearFilters = () => {
    setFilters({
      symbols: [],
      dateRange: { start: null, end: null },
      marketType: "all",
      side: "all",
      orderType: "all",
      status: "all",
      minPnl: null,
      maxPnl: null,
    });
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Filters</span>
        </div>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Symbol Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            Symbol
          </label>
          <div className="flex flex-wrap gap-1">
            {availableSymbols.map((sym) => (
              <button
                key={sym}
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    symbols: prev.symbols.includes(sym)
                      ? prev.symbols.filter((s) => s !== sym)
                      : [...prev.symbols, sym],
                  }));
                }}
                className={cn(
                  "px-2 py-1 text-[10px] rounded-md border transition-colors",
                  filters.symbols.includes(sym)
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-accent border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {sym.replace("/USDC", "")}
              </button>
            ))}
          </div>
        </div>

        {/* Market Type */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            Market
          </label>
          <div className="flex gap-1">
            {(["all", "spot", "perpetual"] as const).map((mt) => (
              <button
                key={mt}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, marketType: mt }))
                }
                className={cn(
                  "px-2 py-1 text-[10px] rounded-md border capitalize transition-colors",
                  filters.marketType === mt
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-accent border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {mt}
              </button>
            ))}
          </div>
        </div>

        {/* Side */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            Side
          </label>
          <div className="flex gap-1">
            {(["all", "long", "short"] as const).map((side) => (
              <button
                key={side}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, side }))
                }
                className={cn(
                  "px-2 py-1 text-[10px] rounded-md border capitalize transition-colors",
                  filters.side === side
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-accent border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {side}
              </button>
            ))}
          </div>
        </div>

        {/* Order Type */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            Order Type
          </label>
          <div className="flex gap-1">
            {(["all", "market", "limit", "stop", "ioc"] as const).map((ot) => (
              <button
                key={ot}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, orderType: ot }))
                }
                className={cn(
                  "px-2 py-1 text-[10px] rounded-md border uppercase transition-colors",
                  filters.orderType === ot
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-accent border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {ot}
              </button>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
            Status
          </label>
          <div className="flex gap-1">
            {(["all", "closed", "open", "liquidated"] as const).map((st) => (
              <button
                key={st}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, status: st }))
                }
                className={cn(
                  "px-2 py-1 text-[10px] rounded-md border capitalize transition-colors",
                  filters.status === st
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-accent border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
