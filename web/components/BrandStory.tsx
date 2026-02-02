"use client";

import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section id="story" className="py-32 bg-zinc-950 text-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-900/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
        >
            <span className="text-amber-500 text-sm tracking-[0.3em] uppercase mb-6 block">品牌哲學</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-12 leading-tight">
                不只是一雙鞋<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 italic">而是您的傳承 (Legacy)</span>
            </h2>
            
            <div className="space-y-8 text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                <p>
                    在 <span className="text-white font-serif">Da.Move Studio</span>，我們深信鞋履是自我表達的極致畫布。
                    在這個大量生產的世界裡，我們堅持獨特、大膽且個人化的精神。
                </p>
                <p>
                    每一筆色彩都由職人親手繪製，確保世上沒有兩雙一模一樣的作品。
                    我們融合傳統藝術技法與現代球鞋文化，創造出訴說您故事的穿戴藝術。
                </p>
                <p>
                    無論是對回憶的致敬、熱情的宣言，或僅僅是渴望與眾不同——我們都將以絕不妥協的品質，實現您的願景。
                </p>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-12">
                <div>
                    <h4 className="text-3xl font-serif text-amber-500 mb-2">500+</h4>
                    <p className="text-xs uppercase tracking-widest text-zinc-500">已創作雙數</p>
                </div>
                <div>
                    <h4 className="text-3xl font-serif text-amber-500 mb-2">100%</h4>
                    <p className="text-xs uppercase tracking-widest text-zinc-500">純手工繪製</p>
                </div>
                <div>
                    <h4 className="text-3xl font-serif text-amber-500 mb-2">Zero</h4>
                    <p className="text-xs uppercase tracking-widest text-zinc-500">零妥協品質</p>
                </div>
            </div>
        </motion.div>
      </div>
    </section>
  );
}
