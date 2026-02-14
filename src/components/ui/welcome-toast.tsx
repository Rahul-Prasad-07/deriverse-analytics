"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, X, Sparkles } from "lucide-react";

export default function WelcomeToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("deriverse-welcome-dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("deriverse-welcome-dismissed", "true");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-6 right-6 z-[90] max-w-xs"
        >
          <div className="bg-[#111318] border border-[#2a2d38] rounded-xl p-4 shadow-2xl shadow-black/50">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4aa] to-[#00b4d8] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-white mb-1">Welcome to Deriverse Analytics</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Press{" "}
                  <kbd className="px-1 py-0.5 rounded bg-[#1e2028] border border-[#2a2d38] text-[10px] text-gray-300 font-mono">
                    <Command className="w-2.5 h-2.5 inline" />K
                  </kbd>{" "}
                  to search anywhere, or{" "}
                  <kbd className="px-1 py-0.5 rounded bg-[#1e2028] border border-[#2a2d38] text-[10px] text-gray-300 font-mono">
                    <Command className="w-2.5 h-2.5 inline" />/
                  </kbd>{" "}
                  for keyboard shortcuts.
                </p>
              </div>
              <button onClick={dismiss} className="text-gray-500 hover:text-white transition-colors shrink-0">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
