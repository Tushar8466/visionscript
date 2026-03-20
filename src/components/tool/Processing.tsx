'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  "Extracting audio track from video...",
  "Running Whisper v3 for speech-to-text...",
  "Running semantic analysis for pacing...",
  "Identifying hooks and emotional peaks...",
  "Applying typography and color styling...",
  "Generating final subtitle render track..."
];

export default function Processing({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Reveal steps dynamically
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev === steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 1500);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [onComplete]);

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

        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500
                ${idx < currentStep ? 'bg-cyan-500' : idx === currentStep ? 'bg-cyan-500/30' : 'bg-white/5'}`}
              >
                {idx < currentStep && (
                   <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                   </svg>
                )}
                {idx === currentStep && (
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </div>
              <p className={`text-sm font-medium transition-colors duration-500
                ${idx < currentStep ? 'text-zinc-400' : idx === currentStep ? 'text-white' : 'text-zinc-700'}`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
