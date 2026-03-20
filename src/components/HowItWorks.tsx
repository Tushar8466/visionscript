'use client';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload",
      description: "Drag & drop your video. We support 4K resolution and all major formats."
    },
    {
      number: "02",
      title: "AI Magic",
      description: "Our AI analyzes audio, generates captions, and applies the perfect style."
    },
    {
      number: "03",
      title: "Export",
      description: "Review your video and export in high-quality directly to your socials."
    }
  ];

  return (
    <section className="py-24 bg-black border-y border-white/[0.05] selection:bg-white/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
              Simple Process.<br />
              <span className="text-zinc-600">Complex AI.</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-sm font-medium opacity-80">
            We've simplified the professional editing workflow into three seamless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="space-y-6 relative group">
              <div className="text-6xl font-black text-white/5 group-hover:text-white/10 transition-colors uppercase leading-none select-none">
                {step.number}
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-zinc-500 font-medium leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
