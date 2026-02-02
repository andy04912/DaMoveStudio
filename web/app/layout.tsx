import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Da.Move Studio | 極致手繪客製化球鞋",
  description: "極致的手繪工藝，為您的靈魂量身打造的穿戴藝術。",
  openGraph: {
    title: "Da.Move Studio",
    description: "頂級客製化鞋履藝術",
    type: "website",
  }
};

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="dark">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-[#0a0a0a] text-white min-h-screen selection:bg-[#D4AF37] selection:text-black`}>
        <SmoothScroll>
            <Navbar />
            {children}
            <BackToTop />
        </SmoothScroll>
      </body>
    </html>
  );
}
