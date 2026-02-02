import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import ProcessTimeline from "@/components/ProcessTimeline";
import BrandStory from "@/components/BrandStory";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <BrandStory />
      <Gallery />
      <ProcessTimeline />
      
      {/* Footer Section */}
      <footer className="py-12 bg-zinc-950 border-t border-white/10 text-center">
        <h2 className="text-2xl font-serif text-white mb-6">Da.Move Studio</h2>
        <div className="flex justify-center gap-8 mb-8 text-gray-400">
            <a href="#" className="hover:text-amber-500 transition-colors">Instagram</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Line @damove</a>
            <a href="#" className="hover:text-amber-500 transition-colors">聯絡我們</a>
        </div>
        <p className="text-zinc-600 text-sm">© 2026 Da.Move Studio. All rights reserved.</p>
      </footer>
    </main>
  );
}
