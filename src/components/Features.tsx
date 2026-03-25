'use client';

import { motion } from "framer-motion";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  IconSignature,
  IconDeviceMobile,
  IconChartBar,
  IconTrendingUp,
  IconBolt
} from "@tabler/icons-react";

const SkeletonA = () => (
  <div className="flex flex-1 w-full h-full min-h-[10rem] rounded-xl overflow-hidden bg-dot-white/[0.2] bg-black border border-white/[0.05] relative flex-col justify-end p-4 shadow-sm group-hover/bento:shadow-xl transition-shadow duration-300">
    <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-900/40 to-transparent z-0" />
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 }}
      className="relative z-10 w-full h-32 bg-white/[0.05] rounded-lg border border-white/[0.1] backdrop-blur-sm p-4 space-y-3"
    >
      <div className="h-4 w-3/4 rounded-sm bg-gradient-to-r from-zinc-500 to-zinc-700 animate-pulse" />
      <div className="h-4 w-full rounded-sm bg-gradient-to-r from-zinc-600 to-zinc-800 animate-pulse" />
      <div className="h-4 w-1/2 rounded-sm bg-gradient-to-r from-zinc-700 to-zinc-900 animate-pulse" />
    </motion.div>
  </div>
);

const SkeletonB = () => (
  <div className="flex flex-1 w-full h-full min-h-[10rem] rounded-xl overflow-hidden bg-gradient-to-br from-indigo-900/40 via-purple-900/20 to-black p-4 items-center justify-center border border-white/[0.05] relative">
    <div className="absolute w-[200px] h-[200px] bg-purple-500/20 rounded-full blur-3xl -top-10 -right-10" />
    <div className="grid grid-cols-2 gap-3 w-full relative z-10">
      {["TikTok", "Reels", "Shorts", "LinkedIn"].map((platform, i) => (
        <motion.div
          key={platform}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className="text-[10px] sm:text-xs font-black text-center text-white/80 uppercase tracking-widest bg-white/10 rounded-xl py-3 border border-white/20 backdrop-blur-md shadow-lg"
        >
          {platform}
        </motion.div>
      ))}
    </div>
  </div>
);

const SkeletonC = () => {
  const scores = [
    { label: "Clarity", val: 92, color: "from-cyan-400 to-cyan-600" },
    { label: "SEO", val: 88, color: "from-blue-400 to-blue-600" },
    { label: "Tone", val: 95, color: "from-teal-400 to-teal-600" }
  ];
  return (
    <div className="flex flex-1 w-full h-full min-h-[10rem] rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-sky-900/20 to-black border border-white/[0.05] p-5 flex-col justify-center space-y-4">
      {scores.map((score, i) => (
        <div key={score.label} className="flex flex-col gap-1 w-full">
          <div className="flex justify-between items-center text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
            <span>{score.label}</span>
            <span className="text-white">{score.val}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score.val}%` }}
              transition={{ delay: i * 0.2, duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${score.color} shadow-[0_0_10px_rgba(34,211,238,0.4)]`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const SkeletonD = () => (
  <div className="flex flex-1 w-full h-full min-h-[10rem] rounded-xl overflow-hidden bg-gradient-to-br from-neutral-900 to-black border border-white/[0.05] p-5 flex items-end gap-2 relative">
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-rose-500/10 to-transparent" />
    <div className="flex items-end justify-between w-full h-[80%] gap-1.5 relative z-10">
      {[40, 65, 50, 85, 95, 75, 100].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          className="flex-1 rounded-t-sm w-full bg-gradient-to-t from-rose-600 to-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.3)]"
        />
      ))}
    </div>
  </div>
);

const SkeletonE = () => (
  <div className="flex flex-1 w-full h-full min-h-[10rem] rounded-xl overflow-hidden bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-black border border-white/[0.05] flex items-center justify-center relative shadow-inner">
    <div className="absolute w-[150px] h-[150px] bg-amber-500/20 rounded-full blur-3xl" />
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="text-center relative z-10"
    >
      <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-amber-200 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
        10x
      </div>
      <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-amber-500 mt-2">
        Faster
      </div>
    </motion.div>
  </div>
);

const bentoItems = [
  {
    title: "AI Transcription",
    description: "99% accuracy across 50+ languages. No manual typing required.",
    header: <SkeletonA />,
    className: "md:col-span-2",
    icon: <IconSignature className="h-5 w-5" />,
    color: "6, 182, 212"
  },
  {
    title: "Multi-Platform",
    description: "Auto-tailored captions for TikTok, Reels, Shorts, and more.",
    header: <SkeletonB />,
    className: "md:col-span-1",
    icon: <IconDeviceMobile className="h-5 w-5" />,
    color: "99, 102, 241"
  },
  {
    title: "Quality Score",
    description: "Real-time analysis for clarity, tone, and SEO optimization.",
    header: <SkeletonC />,
    className: "md:col-span-1",
    icon: <IconChartBar className="h-5 w-5" />,
    color: "16, 185, 129"
  },
  {
    title: "Analytics",
    description: "Track which captions drive the most engagement and clicks.",
    header: <SkeletonD />,
    className: "md:col-span-1",
    icon: <IconTrendingUp className="h-5 w-5" />,
    color: "244, 63, 94"
  },
  {
    title: "10x Speed",
    description: "Automate the entire caption workflow and reclaim your time.",
    header: <SkeletonE />,
    className: "md:col-span-1",
    icon: <IconBolt className="h-5 w-5" />,
    color: "245, 158, 11"
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-black relative">
      <div className="max-w-7xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">
            Capabilities
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Everything you need to <br />
            <span className="text-zinc-500">dominate content.</span>
          </h2>
        </motion.div>

        <HoverEffect items={bentoItems} />
      </div>
    </section>
  );
}
