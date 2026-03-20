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
          scene="https://prod.spline.design/VVfRSvCX81cc0Re7/scene.splinecode" 
        />
      </div>

      {/* Ultra Subtle Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/5 via-transparent to-black/20 pointer-events-none" />
    </section>
  );
}
