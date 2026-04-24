'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function JoinPage() {
  return (
    <main className="min-h-screen bg-[#050505] selection:bg-indigo-500/30 flex flex-col items-center justify-center p-6 pt-16 pb-24">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-5xl space-y-12 relative z-10">
        {/* Top Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-start"
        >
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10 hover:border-white/20 shadow-2xl"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header Section */}
        <div className="flex flex-col items-center text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 backdrop-blur-xl shadow-2xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Early Access Program</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
              Apply for <br />
              <span className="bg-gradient-to-r from-indigo-400 via-white to-purple-400 bg-clip-text text-transparent italic">Exclusive</span> Studio Access.
            </h1>
            <p className="text-zinc-500 text-sm md:text-base font-medium max-w-xl mx-auto leading-relaxed uppercase tracking-widest">
              Join the future of AI-powered video storytelling.
            </p>
          </motion.div>
        </div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group max-w-4xl mx-auto w-full"
        >
          {/* Animated Border Gradient */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-indigo-500/50 via-purple-500/20 to-indigo-500/50 rounded-[32px] blur-sm opacity-50 group-hover:opacity-100 transition-all duration-700" />
          
          <div className="relative bg-[#f0f0f0] backdrop-blur-3xl border border-white/10 rounded-[30px] overflow-hidden shadow-2xl">
            {/* Form Header */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-black/5 bg-white/50 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400 border border-black/5" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black/5" />
                  <div className="w-3 h-3 rounded-full bg-green-400 border border-black/5" />
                </div>
                <div className="h-4 w-[1px] bg-black/10" />
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">application_portal</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-black/5 rounded-lg">
                 <ShieldCheck className="w-3 h-3 text-indigo-600" />
                 <span className="text-[8px] font-black text-zinc-800 uppercase tracking-widest">Encrypted</span>
              </div>
            </div>

            {/* Iframe */}
            <div className="w-full bg-white">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSei2h66Us9IxWfpadWnkroKYLxGvp_LH8Vj5M9GRrHygWSSCg/viewform?embedded=true"
                width="100%"
                height="1000"
                className="w-full border-none"
                title="Google Form Application"
              >
                Loading…
              </iframe>
            </div>
          </div>
        </motion.div>

        {/* Fallback & Helper Note */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.3 }}
           className="flex flex-col items-center gap-6"
        >
           <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">Compatibility Note</p>
              <p className="text-zinc-500 text-[11px] font-medium max-w-md leading-relaxed uppercase tracking-wider">
                Google requires a sign-in for forms with file uploads. If the form below is not loading correctly, please use the button below.
              </p>
           </div>
           
           <a 
             href="https://docs.google.com/forms/d/e/1FAIpQLSei2h66Us9IxWfpadWnkroKYLxGvp_LH8Vj5M9GRrHygWSSCg/viewform?embedded=true"
             target="_blank"
             rel="noopener noreferrer"
             className="px-10 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-white/10"
           >
              Open Form in New Window
           </a>
        </motion.div>

        {/* Footer Info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-wrap justify-center gap-12">
             <div className="flex flex-col items-center gap-2">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Processing_Time</span>
                <span className="text-white font-bold text-xs">24-48 Hours</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Support_Availability</span>
                <span className="text-white font-bold text-xs">24/7 Premium Support</span>
             </div>
             <div className="flex flex-col items-center gap-2">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Data_Privacy</span>
                <span className="text-white font-bold text-xs">GDPR Compliant</span>
             </div>
          </div>

        </motion.div>
      </div>
    </main>
  );
}
