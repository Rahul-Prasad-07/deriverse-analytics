"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTrading } from "@/context/trading-context";
import {
  Settings,
  Key,
  Link,
  Globe,
  Shield,
  Bell,
  Palette,
  Monitor,
  Wallet,
  Check,
  ExternalLink,
  AlertCircle,
  Copy,
  ChevronRight,
} from "lucide-react";

import PageTransition from "@/components/ui/page-transition";

interface ConnectionConfig {
  name: string;
  status: "connected" | "disconnected" | "error";
  icon: React.ReactNode;
  endpoint: string;
  description: string;
}

export default function SettingsContent() {
  const { wallet, connectWallet, disconnectWallet } = useTrading();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const connections: ConnectionConfig[] = [
    {
      name: "Deriverse Mainnet",
      status: "connected",
      icon: <Globe className="w-5 h-5" />,
      endpoint: "https://api.mainnet-beta.solana.com",
      description: "Primary Solana RPC endpoint for Deriverse protocol",
    },
    {
      name: "Deriverse Program",
      status: "connected",
      icon: <Link className="w-5 h-5" />,
      endpoint: "Drvrseg8AQLP8B96DBGmHRjFGviFNYTkHueY9g3k27Gu",
      description: "Deriverse on-chain program ID",
    },
    {
      name: "Price Oracle",
      status: "connected",
      icon: <Monitor className="w-5 h-5" />,
      endpoint: "Pyth Network (mainnet)",
      description: "Real-time price feeds via Pyth Network oracle",
    },
    {
      name: "Wallet Connection",
      status: wallet.connected ? "connected" : "disconnected",
      icon: <Wallet className="w-5 h-5" />,
      endpoint: wallet.address || "Not connected",
      description: "Solana wallet for transaction signing",
    },
  ];

  const statusColors = {
    connected: "text-emerald-400 bg-emerald-400/10",
    disconnected: "text-gray-400 bg-gray-400/10",
    error: "text-red-400 bg-red-400/10",
  };

  const statusDot = {
    connected: "bg-emerald-400",
    disconnected: "bg-gray-400",
    error: "bg-red-400",
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <PageTransition>
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-3">
          <Settings className="w-6 h-6 text-primary" />
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Configure connections, preferences, and API integrations
        </p>
      </div>

      {/* Connection Status */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <Link className="w-4 h-4 text-primary" />
          Connections
        </h2>
        <div className="space-y-3">
          {connections.map((conn, idx) => (
            <motion.div
              key={conn.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-xl border border-[#1e2028] bg-[#0d0e14]/80 p-4 hover:border-[#2a2d38] transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#1e2028]">
                    {conn.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-medium text-white">{conn.name}</h3>
                      <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${statusColors[conn.status]}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot[conn.status]} animate-pulse`} />
                        {conn.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{conn.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(conn.endpoint, conn.name)}
                    className="p-1.5 rounded-lg hover:bg-[#1e2028] text-gray-500 hover:text-white transition-colors"
                    title="Copy endpoint"
                  >
                    {copiedField === conn.name ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <code className="text-[11px] text-gray-500 font-mono bg-[#1e2028] px-2 py-1 rounded truncate max-w-md">
                  {conn.endpoint}
                </code>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wallet */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <Wallet className="w-4 h-4 text-primary" />
          Wallet
        </h2>
        <div className="rounded-xl border border-[#1e2028] bg-[#0d0e14]/80 p-5">
          {wallet.connected ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00d4aa] to-[#8b5cf6] flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{wallet.address}</p>
                    <p className="text-xs text-gray-500">
                      Balance: ${wallet.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={disconnectWallet}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium hover:bg-red-500/20 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <Wallet className="w-8 h-8 text-gray-500 mx-auto mb-3" />
              <p className="text-sm text-gray-400 mb-3">No wallet connected</p>
              <button
                onClick={connectWallet}
                className="px-4 py-2 rounded-lg bg-[#00d4aa] text-black text-sm font-semibold hover:bg-[#00d4aa]/90 transition-colors"
              >
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </div>

      {/* API Configuration */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <Key className="w-4 h-4 text-primary" />
          API Configuration
        </h2>
        <div className="rounded-xl border border-[#1e2028] bg-[#0d0e14]/80 p-5 space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">RPC Endpoint</label>
            <div className="flex gap-2">
              <input
                type="text"
                defaultValue="https://api.mainnet-beta.solana.com"
                className="flex-1 px-3 py-2 rounded-lg bg-[#1e2028] border border-[#2a2d38] text-sm text-gray-300 font-mono focus:outline-none focus:border-[#00d4aa]/50"
              />
              <button className="px-3 py-2 rounded-lg bg-[#1e2028] border border-[#2a2d38] hover:border-[#00d4aa]/50 text-xs text-gray-400 hover:text-white transition-colors">
                Test
              </button>
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">WebSocket Endpoint</label>
            <input
              type="text"
              defaultValue="wss://api.mainnet-beta.solana.com"
              className="w-full px-3 py-2 rounded-lg bg-[#1e2028] border border-[#2a2d38] text-sm text-gray-300 font-mono focus:outline-none focus:border-[#00d4aa]/50"
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-300 flex items-center gap-2">
          <Palette className="w-4 h-4 text-primary" />
          Preferences
        </h2>
        <div className="rounded-xl border border-[#1e2028] bg-[#0d0e14]/80 divide-y divide-[#1e2028]">
          {[
            { icon: <Bell className="w-4 h-4" />, label: "Trade Notifications", desc: "Get notified on trade fills and liquidations", defaultOn: true },
            { icon: <Shield className="w-4 h-4" />, label: "Risk Alerts", desc: "Alert when drawdown exceeds threshold", defaultOn: true },
            { icon: <Monitor className="w-4 h-4" />, label: "Auto-refresh Data", desc: "Refresh analytics every 30 seconds", defaultOn: false },
          ].map((pref, idx) => (
            <div key={pref.label} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="text-gray-400">{pref.icon}</div>
                <div>
                  <p className="text-sm text-white">{pref.label}</p>
                  <p className="text-xs text-gray-500">{pref.desc}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={pref.defaultOn} className="sr-only peer" />
                <div className="w-9 h-5 bg-[#1e2028] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gray-500 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00d4aa] peer-checked:after:bg-white" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="rounded-xl border border-[#1e2028] bg-[#0d0e14]/80 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white">Deriverse Analytics</h3>
            <p className="text-xs text-gray-500 mt-0.5">v1.0.0 · Built for Deriverse Protocol</p>
          </div>
          <a
            href="https://deriverse.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#00d4aa] hover:underline"
          >
            deriverse.io <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
