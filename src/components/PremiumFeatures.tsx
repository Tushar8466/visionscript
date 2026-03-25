"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  IconSignature, 
  IconDeviceMobile, 
  IconChartBar, 
  IconTrendingUp, 
  IconBolt 
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { HoverEffect } from "@/components/ui/card-hover-effect";

// --- Types ---
interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string; // The accent color
}

// --- Data ---
const featureItems: FeatureItem[] = [
  {
    title: "AI Transcription",
    description: "99% accuracy across 50+ languages. No manual typing required.",
    icon: <IconSignature className="w-6 h-6" />,
    color: "20, 184, 166", // Teal
  },
  {
    title: "Multi-Platform",
    description: "Auto-tailored captions for TikTok, Reels, Shorts, and more.",
    icon: <IconDeviceMobile className="w-6 h-6" />,
    color: "168, 85, 247", // Purple
  },
  {
    title: "Quality Score",
    description: "Real-time analysis for clarity, tone, and SEO optimization.",
    icon: <IconChartBar className="h-6 w-6" />,
    color: "34, 197, 94", // Green
  },
  {
    title: "Analytics",
    description: "Track which captions drive the most engagement and clicks.",
    icon: <IconTrendingUp className="h-6 w-6" />,
    color: "249, 115, 22", // Orange
  },
  {
    title: "10x Speed",
    description: "Automate the entire caption workflow and reclaim your time.",
    icon: <IconBolt className="h-6 w-6" />,
    color: "6, 182, 212", // Cyan/Blue
  },
];

// --- Sub-Components ---
const FeatureCard = ({ item }: { item: FeatureItem }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col p-8 rounded-[16px] overflow-hidden transition-all duration-300",
        "bg-[#141414] border border-[#222] hover:border-transparent cursor-default"
      )}
      style={{
        boxShadow: "0 0 0 0 transparent"
      }}
    >
      {/* Glow Border Effect - Appears on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          padding: "1px",
          background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${item.color} 0%, transparent 100%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude"
        }}
      />
      
      {/* Very subtle glow behind the card on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none blur-3xl"
        style={{ backgroundColor: item.color }}
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Icon Badge */}
      <div 
        className="w-12 h-12 rounded-full flex items-center justify-center mb-6 shadow-lg"
        style={{ backgroundColor: item.color }}
      >
        {item.icon}
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-[18px] font-semibold text-white tracking-tight">
          {item.title}
        </h3>
        <p className="text-[14px] text-[#888] leading-[1.6] font-medium">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

// --- Main Component ---
export default function PremiumFeatures() {
  return (
    <section id="features" className="py-24 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Dots Pattern */}
      <div className="absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_100%)] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tightest leading-none">
            Built for the spotlight.
          </h2>
          <p className="text-2xl md:text-3xl font-bold text-zinc-500 tracking-tight">
            Advanced AI tools to help you <span className="text-zinc-200">dominate content.</span>
          </p>
        </motion.div>

        {/* Card Grid */}
        <HoverEffect items={featureItems} />
      </div>

      <style jsx global>{`
        :root {
          --geist-font: 'Inter', system-ui, sans-serif;
        }
        body {
          font-family: var(--geist-font);
        }
      `}</style>
    </section>
  );
}
