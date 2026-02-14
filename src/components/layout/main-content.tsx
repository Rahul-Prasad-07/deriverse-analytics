"use client";

import React from "react";
import { useTrading } from "@/context/trading-context";
import { motion } from "framer-motion";
import StatusBar from "@/components/layout/status-bar";
import LiveTicker from "@/components/ui/live-ticker";
import { Menu } from "lucide-react";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed, setSidebarCollapsed } = useTrading();

  return (
    <motion.div
      animate={{ marginLeft: sidebarCollapsed ? 68 : 240 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="flex-1 flex flex-col min-h-screen max-md:!ml-0"
    >
      {/* Mobile menu button - only visible on small screens */}
      <button
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        className="md:hidden fixed top-3 left-3 z-[60] w-9 h-9 rounded-lg bg-[#111318] border border-[#2a2d38] flex items-center justify-center text-gray-400 hover:text-white transition-colors"
      >
        <Menu className="w-4 h-4" />
      </button>

      <StatusBar />
      <LiveTicker />
      <main className="flex-1 p-4 md:p-6 max-w-[1600px]">
        {children}
      </main>
    </motion.div>
  );
}
