'use client';

import { motion } from 'framer-motion';

export default function Processing({ message }: { message: string }) {
  return (
    <div className="w-full max-w-lg mx-auto bg-white/[0.02] border border-white/[0.05] p-8 rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Scanning laser effect overlay */}
      <motion.div 
        initial={{ top: '-10%' }}
        animate={{ top: '110%' }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.8)] z-0 opacity-50"
      />

      <div className="relative z-10 space-y-10">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-white/10 border-t-cyan-400 animate-spin" />
            <div className="absolute w-8 h-8 bg-cyan-500/20 rounded-full blur-md animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">AI is working</h2>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Processing Video</p>
          </div>
        </div>

        <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <p className="text-sm font-medium text-white">{message}</p>
        </div>
      </div>
    </div>
  );
}

