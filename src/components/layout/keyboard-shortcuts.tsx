"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, X } from "lucide-react";

const shortcuts = [
  { keys: ["⌘", "K"], description: "Open command palette" },
  { keys: ["⌘", "1"], description: "Go to Dashboard" },
  { keys: ["⌘", "2"], description: "Go to Journal" },
  { keys: ["⌘", "3"], description: "Go to Portfolio" },
  { keys: ["⌘", "4"], description: "Go to Performance" },
  { keys: ["⌘", "5"], description: "Go to Risk" },
  { keys: ["Esc"], description: "Close dialogs" },
  { keys: ["↑", "↓"], description: "Navigate results" },
  { keys: ["↵"], description: "Select item" },
];

export default function KeyboardShortcuts() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-sm z-[101]"
          >
            <div className="bg-[#111318] border border-[#2a2d38] rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#1e2028]">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-4 h-4 text-[#00d4aa]" />
                  <h3 className="text-sm font-semibold text-white">Keyboard Shortcuts</h3>
                </div>
                <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3 space-y-1">
                {shortcuts.map((shortcut, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[#1e2028] transition-colors">
                    <span className="text-sm text-gray-400">{shortcut.description}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, j) => (
                        <kbd key={j} className="min-w-[24px] text-center px-1.5 py-0.5 rounded bg-[#1e2028] border border-[#2a2d38] text-[11px] text-gray-400 font-mono">
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-2 border-t border-[#1e2028] text-center">
                <p className="text-[10px] text-gray-500">Press ⌘/ to toggle this panel</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
