"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTrading } from "@/context/trading-context";
import { cn } from "@/lib/utils";
import { Activity, TrendingUp, TrendingDown } from "lucide-react";

interface TickerPrice {
  symbol: string;
  price: number;
  change: number;
  sparkline: number[];
}

function MiniSparkline({ data, positive }: { data: number[]; positive: boolean }) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const h = 16;
  const w = 40;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");

  return (
    <svg width={w} height={h} className="opacity-70">
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#00d4aa" : "#ef4444"}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LiveTicker() {
  const { availableSymbols } = useTrading();
  const [tickers, setTickers] = useState<TickerPrice[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulate live price updates
  useEffect(() => {
    const basePrices: Record<string, number> = {
      "SOL/USDC": 185.42,
      "BTC/USDC": 97250.0,
      "ETH/USDC": 3420.15,
      "RAY/USDC": 4.82,
      "JTO/USDC": 3.15,
      "BONK/USDC": 0.0000218,
      "WIF/USDC": 2.35,
      "JUP/USDC": 1.12,
      "PYTH/USDC": 0.42,
      "RNDR/USDC": 7.85,
    };

    const initialTickers = availableSymbols.map((sym) => ({
      symbol: sym,
      price: basePrices[sym] || 100,
      change: (Math.random() - 0.45) * 4,
      sparkline: Array.from({ length: 20 }, () =>
        (basePrices[sym] || 100) * (1 + (Math.random() - 0.5) * 0.02)
      ),
    }));
    setTickers(initialTickers);

    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((t) => {
          const delta = (Math.random() - 0.48) * 0.003;
          const newPrice = t.price * (1 + delta);
          const newSparkline = [...t.sparkline.slice(1), newPrice];
          return {
            ...t,
            price: newPrice,
            change: t.change + delta * 100,
            sparkline: newSparkline,
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [availableSymbols]);

  if (tickers.length === 0) return null;

  return (
    <div className="bg-[#0d0e13]/80 border-b border-[#1a1c24] overflow-hidden">
      <div className="flex items-center">
        {/* Label */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-[#1a1c24] shrink-0">
          <Activity className="w-3 h-3 text-[#00d4aa]" />
          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Live</span>
        </div>

        {/* Scrolling ticker */}
        <div ref={containerRef} className="flex-1 overflow-hidden">
          <motion.div
            className="flex items-center gap-0"
            animate={{ x: [0, -50 * tickers.length] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: tickers.length * 6,
                ease: "linear",
              },
            }}
          >
            {/* Duplicate for seamless loop */}
            {[...tickers, ...tickers].map((ticker, i) => (
              <div
                key={`${ticker.symbol}-${i}`}
                className="flex items-center gap-2 px-4 py-1.5 shrink-0 border-r border-[#1a1c24]/50"
              >
                <span className="text-[11px] font-medium text-gray-300 whitespace-nowrap">
                  {ticker.symbol.split("/")[0]}
                </span>
                <span className="text-[11px] font-mono text-white whitespace-nowrap">
                  ${ticker.price < 0.01
                    ? ticker.price.toFixed(7)
                    : ticker.price < 10
                      ? ticker.price.toFixed(3)
                      : ticker.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
                <span className={cn(
                  "text-[10px] font-mono whitespace-nowrap",
                  ticker.change >= 0 ? "text-emerald-400" : "text-red-400"
                )}>
                  {ticker.change >= 0 ? "+" : ""}{ticker.change.toFixed(2)}%
                </span>
                <MiniSparkline data={ticker.sparkline} positive={ticker.change >= 0} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
