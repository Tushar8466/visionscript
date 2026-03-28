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
  link: string;
}

// --- Data ---
const featureItems: FeatureItem[] = [
  {
    title: "AI Transcription",
    description: "99% accuracy across 50+ languages. No manual typing required.",
    icon: <IconSignature className="w-6 h-6" />,
    color: "20, 184, 166", // Teal
    link: "#",
  },
  {
    title: "Multi-Platform",
    description: "Auto-tailored captions for TikTok, Reels, Shorts, and more.",
    icon: <IconDeviceMobile className="w-6 h-6" />,
    color: "168, 85, 247", // Purple
    link: "#",
  },
  {
    title: "Quality Score",
    description: "Real-time analysis for clarity, tone, and SEO optimization.",
    icon: <IconChartBar className="h-6 w-6" />,
    color: "34, 197, 94", // Green
    link: "#",
  },
  {
    title: "Analytics",
    description: "Track which captions drive the most engagement and clicks.",
    icon: <IconTrendingUp className="h-6 w-6" />,
    color: "249, 115, 22", // Orange
    link: "#",
  },
  {
    title: "10x Speed",
    description: "Automate the entire caption workflow and reclaim your time.",
    icon: <IconBolt className="h-6 w-6" />,
    color: "6, 182, 212", // Cyan/Blue
    link: "#",
  },
];

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
