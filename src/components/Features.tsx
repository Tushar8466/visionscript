'use client';

import { motion } from "framer-motion";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

const SkeletonA = () => (
  <div className="flex-1 w-full h-full min-h-[8rem] rounded-xl overflow-hidden bg-gradient-to-br from-neutral-900 to-black flex items-center justify-center p-4">
    <div className="space-y-2 w-full">
      {["✦ Transcribing audio...", "✦ Styling captions...", "✦ Exporting video."].map((t, i) => (
        <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.5, repeat: Infinity, repeatDelay: 2 }} className="text-white/70 text-xs font-mono">{t}</motion.p>
      ))}
    </div>
  </div>
);

const SkeletonB = () => (
  <div className="flex-1 w-full h-full min-h-[8rem] rounded-xl bg-gradient-to-br from-violet-900/30 to-black grid grid-cols-3 gap-2 p-4 items-center">
    {["TikTok", "Reels", "Shorts", "Twitter", "LinkedIn", "Blog"].map((p, i) => (
      <div key={i} className="text-[10px] text-center font-black uppercase tracking-widest text-zinc-500 bg-white/5 rounded-lg py-2 border border-white/[0.05]">{p}</div>
    ))}
  </div>
);

const SkeletonC = () => (
  <div className="flex-1 w-full h-full min-h-[8rem] rounded-xl bg-gradient-to-br from-cyan-900/20 to-black flex flex-col justify-center gap-2 p-4">
    {[["Clarity", 92], ["SEO Score", 88], ["Tone", 95]].map(([label, val]) => (
      <div key={label} className="flex items-center gap-3">
        <span className="text-[9px] text-zinc-600 uppercase font-black w-16 shrink-0">{label as string}</span>
        <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 1.2 }} className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
        </div>
        <span className="text-[9px] text-zinc-600 font-black">{val as number}</span>
      </div>
    ))}
  </div>
);

const SkeletonD = () => (
  <div className="flex-1 w-full h-full min-h-[8rem] rounded-xl bg-gradient-to-br from-rose-900/20 to-black flex items-end p-4 gap-1">
    {[40, 70, 55, 90, 65, 100, 80].map((h, i) => (
      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.1, duration: 0.7 }} className="flex-1 rounded-t-sm bg-gradient-to-t from-rose-500/60 to-rose-400/10" />
    ))}
  </div>
);

const SkeletonE = () => (
  <div className="flex-1 w-full h-full min-h-[8rem] rounded-xl bg-gradient-to-br from-amber-900/20 to-black flex items-center justify-center">
    <div className="text-center">
      <div className="text-5xl font-black text-white tracking-tighter">10x</div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 mt-1">faster</div>
    </div>
  </div>
);

const bentoItems = [
  { title: "AI Transcription", description: "99% accuracy across 50+ languages. No manual typing required.", header: <SkeletonA />, className: "md:col-span-2", icon: "✍️" },
  { title: "Multi-Platform", description: "Auto-tailored captions for TikTok, Reels, Shorts, and more.", header: <SkeletonB />, className: "md:col-span-1", icon: "🌐" },
  { title: "Quality Score", description: "Real-time analysis for clarity, tone, and SEO optimization.", header: <SkeletonC />, className: "md:col-span-1", icon: "📊" },
  { title: "Analytics", description: "Track which captions drive the most engagement and clicks.", header: <SkeletonD />, className: "md:col-span-1", icon: "📈" },
  { title: "10x Speed", description: "Automate the entire caption workflow and reclaim your time.", header: <SkeletonE />, className: "md:col-span-1", icon: "⚡" },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Capabilities</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Everything you need to <br /><span className="text-zinc-500">dominate content.</span></h2>
        </motion.div>
        <BentoGrid>
          {bentoItems.map((item) => (
            <BentoGridItem key={item.title} title={item.title} description={item.description} header={item.header} className={item.className} icon={<span className="text-lg">{item.icon}</span>} />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
