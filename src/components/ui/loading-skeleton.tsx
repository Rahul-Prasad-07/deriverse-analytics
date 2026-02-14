"use client";

import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-gradient-to-r from-[#1e2028] via-[#2a2d38] to-[#1e2028] bg-[length:200%_100%]",
        className
      )}
      style={{ animationDuration: "1.5s" }}
      {...props}
    />
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-[#1e2028] bg-[#0d0e14]/80 p-5">
      <Skeleton className="h-4 w-32 mb-1" />
      <Skeleton className="h-3 w-48 mb-4" />
      <Skeleton className="h-[280px] w-full rounded-lg" />
    </div>
  );
}

export function KPISkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-xl border border-[#1e2028] bg-[#0d0e14]/80 p-4">
          <Skeleton className="h-3 w-16 mb-3" />
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-2 w-20" />
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-xl border border-[#1e2028] bg-[#0d0e14]/80 p-5">
      <Skeleton className="h-4 w-40 mb-4" />
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    </div>
  );
}

export function GaugeSkeleton() {
  return (
    <div className="rounded-xl border border-[#1e2028] bg-[#0d0e14]/80 p-6 flex flex-col items-center">
      <Skeleton className="h-4 w-32 mb-6 self-start" />
      <Skeleton className="w-[140px] h-[140px] rounded-full mb-4" />
      <div className="w-full space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="h-3 w-20 mb-1" />
            <Skeleton className="h-1.5 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
