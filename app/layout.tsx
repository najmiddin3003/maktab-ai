import { AppThemeProvider } from "@/components/providers/theme-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Maktab AI — To'liq tizim",
    template: "%s — Maktab AI",
  },
  description: "Maktab monitoring, o'quvchilar va xavf tahlili",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="uz" className={`${poppins.variable} min-h-dvh antialiased`} suppressHydrationWarning>
      <body className="min-h-dvh bg-background font-sans text-foreground">
        <AppThemeProvider>{children}</AppThemeProvider>
      </body>
    </html>
  );
}
