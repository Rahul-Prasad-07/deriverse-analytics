import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TradingProvider } from "@/context/trading-context";
import Sidebar from "@/components/layout/sidebar";
import MainContent from "@/components/layout/main-content";
import CommandPalette from "@/components/layout/command-palette";
import KeyboardShortcuts from "@/components/layout/keyboard-shortcuts";
import GlobalKeyboardNav from "@/components/layout/global-keyboard-nav";
import WelcomeToast from "@/components/ui/welcome-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deriverse Analytics | Trading Dashboard & Journal",
  description:
    "Professional trading analytics dashboard with journal and portfolio analysis for Deriverse — the next-gen fully on-chain Solana trading ecosystem.",
  keywords: [
    "Deriverse",
    "Solana",
    "trading",
    "analytics",
    "dashboard",
    "journal",
    "portfolio",
    "DeFi",
    "perpetual futures",
    "spot trading",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <TradingProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <MainContent>
              {children}
            </MainContent>
          </div>
          <CommandPalette />
          <KeyboardShortcuts />
          <GlobalKeyboardNav />
          <WelcomeToast />
        </TradingProvider>
      </body>
    </html>
  );
}
