"use client";

import { motion } from "framer-motion";
import { Calendar, Palette, Hammer, PackageCheck } from "lucide-react";

const STEPS = [
  {
    icon: Calendar,
    title: "專屬預約",
    desc: "鎖定您的專屬設計檔期。為了確保最高品質，我們每月僅開放限量名額。"
  },
  {
    icon: Palette,
    title: "設計諮詢",
    desc: "與我們的藝術總監一對一討論，將您的靈感轉化為具體的設計方案與材質選擇。"
  },
  {
    icon: Hammer,
    title: "手工創作",
    desc: "進入製作階段，我們將以極致的耐心與精準度手繪您的鞋履。製程約需 2-4 週。"
  },
  {
    icon: PackageCheck,
    title: "完美交付",
    desc: "您的傑作將裝入品牌訂製收藏盒中，並直接配送至您手中。"
  }
];

export default function ProcessTimeline() {
  return (
    <section id="process" className="py-32 bg-black text-white px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-center mb-20"
        >
          <span className="text-amber-500 text-sm tracking-widest uppercase mb-4 block">創作旅程</span>
          <h2 className="text-4xl md:text-5xl font-serif">訂製流程</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-900/50 to-transparent -z-10" />

          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-8 group-hover:border-amber-500/50 transition-colors duration-300 relative z-10 shadow-xl shadow-black">
                <step.icon className="w-10 h-10 text-gray-400 group-hover:text-amber-500 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-serif mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-[200px]">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
