"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerRight?: React.ReactNode;
}

export default function ChartContainer({
  title,
  subtitle,
  children,
  className,
  headerRight,
}: ChartContainerProps) {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-xl card-hover",
        className
      )}
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {headerRight}
      </div>
      <div className="px-5 pb-5">{children}</div>
    </div>
  );
}
