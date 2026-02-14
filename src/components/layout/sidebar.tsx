"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTrading } from "@/context/trading-context";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  PieChart,
  BarChart3,
  Shield,
  Settings,
  Wallet,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Activity,
  TrendingUp,
  TrendingDown,
  Command,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/journal", label: "Trading Journal", icon: BookOpen },
  { href: "/portfolio", label: "Portfolio Analysis", icon: PieChart },
  { href: "/performance", label: "Performance", icon: BarChart3 },
  { href: "/risk", label: "Risk Management", icon: Shield },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { wallet, connectWallet, disconnectWallet, sidebarCollapsed: collapsed, setSidebarCollapsed: setCollapsed, overviewMetrics } = useTrading();

  return (
    <motion.aside
      animate={{ width: collapsed ? 68 : 240 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col z-50 max-md:hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--gradient-start)] to-[var(--gradient-end)] flex items-center justify-center flex-shrink-0">
          <Activity className="w-5 h-5 text-black" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold gradient-text tracking-tight">
              Deriverse
            </h1>
            <p className="text-[10px] text-muted-foreground">
              Trading Analytics
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive ? "text-primary" : ""
                )}
              />
              {!collapsed && <span>{item.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Mini P&L indicator */}
      <div className="px-2 pb-2">
        <div
          className={cn(
            "rounded-lg border px-3 py-2.5 transition-colors",
            overviewMetrics.totalPnl >= 0
              ? "bg-emerald-500/5 border-emerald-500/20"
              : "bg-red-500/5 border-red-500/20"
          )}
        >
          <div className="flex items-center gap-2">
            {overviewMetrics.totalPnl >= 0 ? (
              <TrendingUp className={cn("w-4 h-4 text-emerald-400 flex-shrink-0")} />
            ) : (
              <TrendingDown className={cn("w-4 h-4 text-red-400 flex-shrink-0")} />
            )}
            {!collapsed && (
              <div className="overflow-hidden">
                <p className="text-[10px] text-muted-foreground leading-none mb-0.5">Total P&L</p>
                <p className={cn(
                  "text-sm font-bold tabular-nums",
                  overviewMetrics.totalPnl >= 0 ? "text-emerald-400" : "text-red-400"
                )}>
                  {overviewMetrics.totalPnl >= 0 ? "+" : ""}
                  ${Math.abs(overviewMetrics.totalPnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Command palette hint */}
      <div className="px-2 pb-2">
        <button
          onClick={() => {
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
          }}
          className={cn(
            "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-accent transition-colors border border-border",
            collapsed && "justify-center"
          )}
        >
          <Command className="w-3.5 h-3.5 flex-shrink-0" />
          {!collapsed && (
            <>
              <span>Search</span>
              <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-[#1e2028] border border-[#2a2d38]">⌘K</kbd>
            </>
          )}
        </button>
      </div>

      {/* Wallet section */}
      <div className="px-2 pb-2">
        {wallet.connected ? (
          <button
            onClick={disconnectWallet}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-primary/10 border border-primary/20 transition-colors hover:bg-primary/15",
              collapsed && "justify-center"
            )}
          >
            <Wallet className="w-5 h-5 text-primary flex-shrink-0" />
            {!collapsed && (
              <div className="text-left overflow-hidden">
                <div className="text-xs text-primary font-medium truncate">
                  {wallet.address}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  ${wallet.balance.toLocaleString()}
                </div>
              </div>
            )}
          </button>
        ) : (
          <button
            onClick={connectWallet}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm bg-accent text-muted-foreground hover:text-foreground transition-colors",
              collapsed && "justify-center"
            )}
          >
            <Wallet className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Connect Wallet</span>}
          </button>
        )}
      </div>

      {/* Deriverse link */}
      <div className="px-2 pb-2">
        <a
          href="https://deriverse.io"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors",
            collapsed && "justify-center"
          )}
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>deriverse.io</span>}
        </a>
      </div>

      {/* Collapse toggle */}
      <div className="px-2 pb-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </motion.aside>
  );
}
