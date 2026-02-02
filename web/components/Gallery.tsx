"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const IMAGES = [
  { src: "/images/gallery1.png", title: "神奈川沖浪裏", desc: "客製化 Nike Air Force 1" },
  { src: "/images/gallery4.png", title: "武士與櫻", desc: "Nike Dunk Low - 金箔限定版" },
  { src: "/images/gallery2.png", title: "星雲幻夢", desc: "Converse Chuck 70" },
  { src: "/images/gallery6.png", title: "Cyberpunk 2077", desc: "Air Jordan High - 霓虹城市" },
  { src: "/images/gallery3.png", title: "花卉刺繡風", desc: "Vans Old Skool" },
  { src: "/images/gallery5.png", title: "包浩斯幾何", desc: "Vans Slip-On - 美術館系列" },
];

export default function Gallery() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="gallery" ref={ref} className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-amber-500 text-sm tracking-widest uppercase mb-4 block">精選作品</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">極致工藝 獨一無二</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            每一雙鞋都是孤高的傑作，歷經耐心與精準的手繪工藝。我們將鞋履昇華為可穿戴的藝術品。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-md cursor-pointer"
            >
              <motion.div style={{ y }} className="w-full h-full">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <h3 className="text-2xl font-serif text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</h3>
                <p className="text-amber-500 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{img.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
