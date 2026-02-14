"use client";

import { useState } from "react";
import { useTrading } from "@/context/trading-context";
import { Download, FileSpreadsheet, FileJson, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Trade } from "@/types/trading";

function tradeToCsvRow(t: Trade): string {
  return [
    t.id,
    t.symbol,
    t.marketType,
    t.side,
    t.orderType,
    t.status,
    t.entryPrice.toFixed(6),
    t.exitPrice?.toFixed(6) ?? "",
    t.quantity.toFixed(6),
    t.leverage,
    t.entryTime.toISOString(),
    t.exitTime?.toISOString() ?? "",
    t.pnl.toFixed(4),
    t.pnlPercent.toFixed(4),
    t.fees.total.toFixed(4),
    t.fees.maker.toFixed(4),
    t.fees.taker.toFixed(4),
    t.fees.funding.toFixed(4),
    t.fundingPayments.toFixed(4),
    t.strategy ?? "",
    t.tags.join(";"),
    `"${(t.annotation ?? "").replace(/"/g, '""')}"`,
    t.txSignature,
  ].join(",");
}

const CSV_HEADER = "ID,Symbol,MarketType,Side,OrderType,Status,EntryPrice,ExitPrice,Quantity,Leverage,EntryTime,ExitTime,PnL,PnLPercent,TotalFees,MakerFees,TakerFees,FundingFees,FundingPayments,Strategy,Tags,Annotation,TxSignature";

export function ExportButton() {
  const { filteredTrades } = useTrading();
  const [showMenu, setShowMenu] = useState(false);
  const [exported, setExported] = useState<string | null>(null);

  const downloadFile = (content: string, filename: string, mime: string) => {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const rows = [CSV_HEADER, ...filteredTrades.map(tradeToCsvRow)];
    downloadFile(rows.join("\n"), `deriverse-trades-${new Date().toISOString().split("T")[0]}.csv`, "text/csv");
    setExported("csv");
    setTimeout(() => { setExported(null); setShowMenu(false); }, 1500);
  };

  const exportJSON = () => {
    const data = filteredTrades.map((t) => ({
      ...t,
      entryTime: t.entryTime.toISOString(),
      exitTime: t.exitTime?.toISOString() ?? null,
    }));
    downloadFile(JSON.stringify(data, null, 2), `deriverse-trades-${new Date().toISOString().split("T")[0]}.json`, "application/json");
    setExported("json");
    setTimeout(() => { setExported(null); setShowMenu(false); }, 1500);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1e2028] border border-[#2a2d38] hover:border-[#00d4aa]/50 text-sm text-gray-300 hover:text-white transition-all"
      >
        <Download className="w-4 h-4" />
        Export
      </button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-48 bg-[#13141a] border border-[#1e2028] rounded-xl shadow-xl overflow-hidden z-50"
          >
            <button
              onClick={exportCSV}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300 hover:bg-[#1e2028] transition-colors"
            >
              {exported === "csv" ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              )}
              Export as CSV
            </button>
            <button
              onClick={exportJSON}
              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300 hover:bg-[#1e2028] transition-colors"
            >
              {exported === "json" ? (
                <Check className="w-4 h-4 text-blue-400" />
              ) : (
                <FileJson className="w-4 h-4 text-blue-400" />
              )}
              Export as JSON
            </button>
            <div className="px-4 py-2 border-t border-[#1e2028]">
              <p className="text-[10px] text-gray-500">
                {filteredTrades.length} trades will be exported
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
