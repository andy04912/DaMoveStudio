"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* 4-Grid Background with Diagonal Divider Effect */}
      <div className="absolute inset-0 z-0 grid grid-cols-2 grid-rows-2">
        <div className="relative w-full h-full overflow-hidden group">
            <Image src="/images/artist_work_1.png" alt="Artist Work" fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative w-full h-full overflow-hidden group">
            <Image src="/images/artist_work_2.png" alt="Artist Work" fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative w-full h-full overflow-hidden group">
            <Image src="/images/artist_work_3.png" alt="Artist Work" fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative w-full h-full overflow-hidden group">
            <Image src="/images/artist_work_4.png" alt="Artist Work" fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>
      
      {/* Heavy Diagonal Overlay for seamless text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black/80 via-black/50 to-black/80 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 md:px-6 max-w-5xl mx-auto">
        
        {/* Logo - No Tilt, Increased Size, White Filter */}
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
        >
            <Image
                src="/logo-vertical.png"
                alt="Da.Move Studio"
                width={640}
                height={640}
                className="w-96 md:w-128 h-auto drop-shadow-2xl brightness-0 invert"
                priority
            />
        </motion.div>

        {/* Text Content */}
        <motion.div>
            <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-6 tracking-tight uppercase drop-shadow-lg"
            >
            藝術與動態的交匯。 極致手繪客製化鞋履。
            </motion.h1>

            <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-10 font-light tracking-wide leading-relaxed drop-shadow-md"
            >
            
            </motion.p>
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                <Link
                    href="/customize"
                    className="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-black transition-all duration-300 bg-white rounded-full hover:bg-amber-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] focus:outline-none"
                >
                    開始創作
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
            </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
