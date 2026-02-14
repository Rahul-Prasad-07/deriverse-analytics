"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: React.ReactNode;
  className?: string;
  glowColor?: "green" | "red" | "blue";
}

export default function MetricCard({
  title,
  value,
  subtitle,
  change,
  changeType = "neutral",
  icon,
  className,
  glowColor,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl p-5 card-hover",
        glowColor === "green" && "glow-green",
        glowColor === "red" && "glow-red",
        glowColor === "blue" && "glow-blue",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
      {change && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              changeType === "positive" &&
                "bg-green-500/10 text-green-400",
              changeType === "negative" &&
                "bg-red-500/10 text-red-400",
              changeType === "neutral" &&
                "bg-blue-500/10 text-blue-400"
            )}
          >
            {change}
          </span>
        </div>
      )}
    </div>
  );
}
