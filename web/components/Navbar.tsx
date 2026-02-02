"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: string) => {
    e.preventDefault();
    if (pathname !== "/") {
        router.push("/" + (id === "/" ? "" : id));
        return;
    }

    if (id === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }
    const element = document.querySelector(id);
    if (element) {
        // Offset for fixed navbar
        const y = element.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" onClick={(e) => handleScroll(e, "/")} className="flex items-center gap-2">
            <img 
                src="/logo-horizontal.png" 
                alt="Da.Move Studio" 
                className="h-10 w-auto object-contain brightness-0 invert"
            />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-zinc-400">
            <Link href="/" onClick={(e) => handleScroll(e, "/")} className="hover:text-amber-500 transition-colors">首頁</Link>
            <Link href="#gallery" onClick={(e) => handleScroll(e, "#gallery")} className="hover:text-amber-500 transition-colors">作品鑑賞</Link>
            <Link href="#process" onClick={(e) => handleScroll(e, "#process")} className="hover:text-amber-500 transition-colors">訂製流程</Link>
            <Link href="#story" onClick={(e) => handleScroll(e, "#story")} className="hover:text-amber-500 transition-colors">品牌理念</Link>
            {/* <Link href="/admin" className="hover:text-amber-500 transition-colors">後台管理</Link> */}
        </div>

        <Link
            href="/customize"
            className="px-6 py-2 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-full hover:bg-amber-400 transition-colors"
        >
            立即預約
        </Link>
      </div>
    </motion.nav>
  );
}
