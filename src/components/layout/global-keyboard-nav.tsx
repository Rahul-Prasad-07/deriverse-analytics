"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const routes = ["/", "/journal", "/portfolio", "/performance", "/risk", "/settings"];

export default function GlobalKeyboardNav() {
  const router = useRouter();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= routes.length) {
        e.preventDefault();
        router.push(routes[num - 1]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return null;
}
