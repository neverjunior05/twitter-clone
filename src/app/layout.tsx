import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";

export const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["700", "800"] });
export const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", weight: ["500"] });

export const metadata: Metadata = {
  title: "Chirpline — Live conversations. Real-time signal.",
  description: "An independent demo microblogging platform. NOT affiliated with any existing company. All data is fictional.",
  openGraph: {
    title: "Chirpline",
    description: "Live conversations. Real-time signal. An original demo microblogging project.",
    siteName: "Chirpline",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${jetbrains.variable} dark`}>
      <body className="min-h-screen bg-bg-dark text-text-dark font-sans antialiased selection:bg-signal-soft/20">
        {children}
      </body>
    </html>
  );
}
