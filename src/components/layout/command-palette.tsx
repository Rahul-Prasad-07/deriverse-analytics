"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTrading } from "@/context/trading-context";
import { formatCurrency } from "@/lib/utils";
import {
  Search,
  LayoutDashboard,
  BookOpen,
  PieChart,
  BarChart3,
  Shield,
  Settings,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Command,
  Hash,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: "navigation" | "symbol" | "action";
  keywords?: string[];
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { availableSymbols, symbolStats, overviewMetrics, setFilters } = useTrading();

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      setOpen(false);
    },
    [router]
  );

  const filterBySymbol = useCallback(
    (symbol: string) => {
      setFilters((prev) => ({ ...prev, symbols: [symbol] }));
      router.push("/journal");
      setOpen(false);
    },
    [setFilters, router]
  );

  const items: CommandItem[] = useMemo(() => {
    const navItems: CommandItem[] = [
      { id: "nav-dashboard", label: "Dashboard", description: "Overview & KPIs", icon: <LayoutDashboard className="w-4 h-4" />, action: () => navigate("/"), category: "navigation", keywords: ["home", "overview", "kpi"] },
      { id: "nav-journal", label: "Trading Journal", description: "Trade history & annotations", icon: <BookOpen className="w-4 h-4" />, action: () => navigate("/journal"), category: "navigation", keywords: ["trades", "history", "table"] },
      { id: "nav-portfolio", label: "Portfolio Analysis", description: "Symbols, strategies & fees", icon: <PieChart className="w-4 h-4" />, action: () => navigate("/portfolio"), category: "navigation", keywords: ["symbols", "strategy", "fees", "capital"] },
      { id: "nav-performance", label: "Performance", description: "Timing, heatmaps & patterns", icon: <BarChart3 className="w-4 h-4" />, action: () => navigate("/performance"), category: "navigation", keywords: ["hourly", "weekday", "session", "calendar", "correlation"] },
      { id: "nav-risk", label: "Risk Management", description: "Health score, VaR & drawdown", icon: <Shield className="w-4 h-4" />, action: () => navigate("/risk"), category: "navigation", keywords: ["sharpe", "sortino", "drawdown", "var", "kelly"] },
      { id: "nav-settings", label: "Settings", description: "Connections & preferences", icon: <Settings className="w-4 h-4" />, action: () => navigate("/settings"), category: "navigation", keywords: ["config", "wallet", "rpc", "api"] },
    ];

    const symbolItems: CommandItem[] = availableSymbols.map((sym) => {
      const stats = symbolStats.find((s) => s.symbol === sym);
      return {
        id: `sym-${sym}`,
        label: sym,
        description: stats
          ? `${stats.totalTrades} trades · ${formatCurrency(stats.totalPnl)} P&L · ${stats.winRate.toFixed(0)}% WR`
          : "No data",
        icon: <Hash className="w-4 h-4" />,
        action: () => filterBySymbol(sym),
        category: "symbol" as const,
        keywords: [sym.toLowerCase(), sym.split("/")[0].toLowerCase()],
      };
    });

    const actionItems: CommandItem[] = [
      {
        id: "action-pnl",
        label: `Total P&L: ${formatCurrency(overviewMetrics.totalPnl)}`,
        description: `${overviewMetrics.totalTrades} trades · ${overviewMetrics.winRate.toFixed(1)}% win rate`,
        icon: overviewMetrics.totalPnl >= 0
          ? <TrendingUp className="w-4 h-4 text-emerald-400" />
          : <TrendingDown className="w-4 h-4 text-red-400" />,
        action: () => navigate("/"),
        category: "action",
      },
    ];

    return [...navItems, ...actionItems, ...symbolItems];
  }, [availableSymbols, symbolStats, overviewMetrics, navigate, filterBySymbol]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.includes(q))
    );
  }, [items, query]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIdx(0);
  }, [filtered.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIdx]) {
      filtered[selectedIdx].action();
    }
  };

  const categoryLabel = (cat: string) => {
    switch (cat) {
      case "navigation": return "Pages";
      case "symbol": return "Symbols";
      case "action": return "Quick Info";
      default: return cat;
    }
  };

  // Group by category
  const grouped = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    filtered.forEach((item) => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }, [filtered]);

  let flatIdx = -1;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => setOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[101]"
          >
            <div className="bg-[#111318] border border-[#2a2d38] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#1e2028]">
                <Search className="w-5 h-5 text-gray-500 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search pages, symbols, metrics..."
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
                />
                <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#1e2028] text-[10px] text-gray-500 border border-[#2a2d38]">
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <div className="max-h-[320px] overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <p className="text-sm text-gray-500">No results found</p>
                    <p className="text-xs text-gray-600 mt-1">Try a different search term</p>
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, catItems]) => (
                    <div key={category}>
                      <div className="px-4 py-1.5">
                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                          {categoryLabel(category)}
                        </p>
                      </div>
                      {catItems.map((item) => {
                        flatIdx++;
                        const idx = flatIdx;
                        const isSelected = idx === selectedIdx;
                        return (
                          <button
                            key={item.id}
                            onClick={item.action}
                            onMouseEnter={() => setSelectedIdx(idx)}
                            className={`flex items-center gap-3 w-full px-4 py-2.5 text-left transition-colors ${
                              isSelected
                                ? "bg-[#00d4aa]/10 text-white"
                                : "text-gray-400 hover:bg-[#1e2028]"
                            }`}
                          >
                            <div className={`shrink-0 ${isSelected ? "text-[#00d4aa]" : "text-gray-500"}`}>
                              {item.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.label}</p>
                              {item.description && (
                                <p className="text-xs text-gray-500 truncate">{item.description}</p>
                              )}
                            </div>
                            {isSelected && (
                              <ArrowRight className="w-3.5 h-3.5 text-[#00d4aa] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-[#1e2028] flex items-center gap-4">
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <kbd className="px-1 py-0.5 rounded bg-[#1e2028] border border-[#2a2d38]">↑↓</kbd>
                  navigate
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <kbd className="px-1 py-0.5 rounded bg-[#1e2028] border border-[#2a2d38]">↵</kbd>
                  select
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-500 ml-auto">
                  <Command className="w-3 h-3" />K to toggle
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
