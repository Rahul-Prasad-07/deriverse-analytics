"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0b0f] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Glowing 404 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative inline-block mb-6">
            <span className="text-8xl font-black bg-gradient-to-r from-[#00d4aa] to-[#00b4d8] bg-clip-text text-transparent">
              404
            </span>
            <div className="absolute inset-0 text-8xl font-black text-[#00d4aa]/10 blur-2xl">
              404
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <h2 className="text-xl font-semibold text-white mb-2">
            Route Not Found
          </h2>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            This trading pair doesn&apos;t exist in our analytics universe.
            <br />
            Let&apos;s get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 justify-center"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#00d4aa] text-black text-sm font-medium hover:bg-[#00e4ba] transition-colors"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1e2028] text-gray-300 text-sm font-medium hover:bg-[#2a2d38] transition-colors border border-[#2a2d38]"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </motion.div>

        {/* Decorative branding */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-2 text-gray-600"
        >
          <Activity className="w-4 h-4" />
          <span className="text-xs">Deriverse Analytics</span>
        </motion.div>
      </div>
    </div>
  );
}
