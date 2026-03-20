'use client';

import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black selection:bg-white/30">
      {/* Spline Background - Full visibility */}
      <div className="absolute inset-0 z-0 opacity-100">
        <Spline
          scene="https://prod.spline.design/mqGZytk9Mwv8X-Gj/scene.splinecode" 
        />
      </div>

      {/* Ultra Subtle Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none" />

      {/* Content Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center text-white">
        <div className="space-y-12 max-w-6xl">
          {/* New Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10 animate-in fade-in slide-in-from-top-4 duration-1000">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
            </span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400">Next-Gen AI Captions v4.0</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <h1 className="text-8xl md:text-[11.5rem] font-black tracking-tighter uppercase leading-[0.8] drop-shadow-[0_0_50px_rgba(255,255,255,0.25)]">
              CAPTIONS <br />
              <span className="bg-gradient-to-r from-zinc-200 via-zinc-500 to-zinc-200 bg-clip-text text-transparent">PERFECTED.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl md:text-2xl font-bold text-zinc-400 tracking-[0.4em] uppercase opacity-90 drop-shadow-md">
              Elevate every frame with AI Magic
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4 animate-in fade-in zoom-in-95 delay-500 duration-1000">
            <button className="group relative px-16 py-7 bg-white text-black font-black text-xl rounded-full overflow-hidden transition-all hover:scale-110 active:scale-95 shadow-[0_40px_80px_rgba(255,255,255,0.2)]">
              <span className="relative z-10 uppercase tracking-tight flex items-center gap-3">
                Get Started
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <button className="px-16 py-7 bg-white/5 backdrop-blur-3xl border border-white/10 text-white font-black text-xl rounded-full hover:bg-white/10 transition-all hover:border-white/40 active:scale-95 shadow-2xl uppercase tracking-widest flex items-center gap-3">
              Watch Demo
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>


    </section>
  );
}
