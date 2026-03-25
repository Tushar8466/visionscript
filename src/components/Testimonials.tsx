'use client';

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "VisionScript completely changed my entire content workflow. What used to take me 3 hours now takes exactly 5 minutes.",
    name: "Sarah Jenkins",
    handle: "@sarahcreates",
    role: "Content Creator (2M+ Followers)",
  },
  {
    quote: "The multi-platform AI styling is insane. It knows exactly how to format for TikTok versus LinkedIn. My engagement is up 400%.",
    name: "Marcus Doe",
    handle: "@marcus_growth",
    role: "Social Media Agency Founder",
  },
  {
    quote: "I've tried every AI caption tool on the market. Nothing comes close to the semantic understanding and accuracy of this engine.",
    name: "Emily Chen",
    handle: "@emilytech",
    role: "Tech Reviewer",
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-black border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 relative z-10"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Wall of Love</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Loved by top <br />
            <span className="text-zinc-500">creators worldwide.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-3xl bg-white/2 border border-white/5 flex flex-col justify-between space-y-8 hover:bg-white/4 transition-colors"
            >
              <p className="text-zinc-300 text-lg leading-relaxed font-medium">"{t.quote}"</p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center text-white font-bold text-xs">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="text-white font-bold text-sm tracking-tight">{t.name}</div>
                  <div className="text-zinc-500 text-[10px] uppercase tracking-widest">{t.handle}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
