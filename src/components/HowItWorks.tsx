'use client';

import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Upload Your Video", description: "Drag & drop any format — MP4, MOV, WebM. We support 4K and all major resolutions.", icon: "📁" },
  { number: "02", title: "AI Does the Work", description: "Our model transcribes, styles, and syncs captions in seconds with 99% accuracy.", icon: "🤖" },
  { number: "03", title: "Export & Publish", description: "Download your video or push directly to your favorite social platforms.", icon: "🚀" },
];

export default function HowItWorks() {
  return (
    <section id="solutions" className="py-24 px-6 bg-black border-y border-white/[0.05]">
      <div className="max-w-7xl mx-auto space-y-20">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Process</p>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
              Simple Process.<br /><span className="text-zinc-600">Complex AI.</span>
            </h2>
          </div>
          <p className="text-zinc-500 max-w-xs text-sm leading-relaxed">We've distilled professional video editing into three frictionless steps.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-1/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="group space-y-5 p-8 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-5xl font-black text-white/[0.04] group-hover:text-white/10 transition-colors select-none">{step.number}</span>
                <span className="text-3xl">{step.icon}</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">{step.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
