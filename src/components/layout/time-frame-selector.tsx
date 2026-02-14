"use client";

import React from "react";
import { useTrading } from "@/context/trading-context";
import { cn } from "@/lib/utils";
import { TimeFrame } from "@/types/trading";

const timeFrames: { value: TimeFrame; label: string }[] = [
  { value: "1D", label: "1D" },
  { value: "1W", label: "1W" },
  { value: "1M", label: "1M" },
  { value: "3M", label: "3M" },
  { value: "6M", label: "6M" },
  { value: "1Y", label: "1Y" },
  { value: "ALL", label: "All" },
];

export default function TimeFrameSelector() {
  const { timeFrame, setTimeFrame } = useTrading();

  return (
    <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
      {timeFrames.map((tf) => (
        <button
          key={tf.value}
          onClick={() => setTimeFrame(tf.value)}
          className={cn(
            "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
            timeFrame === tf.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {tf.label}
        </button>
      ))}
    </div>
  );
}
