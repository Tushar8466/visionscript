export default function Features() {
  const features = [
    {
      title: "Smart Auto-Transcription",
      description: "Our AI engine delivers 99% accuracy in over 50 languages. No more manual typing.",
      icon: (
        <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      )
    },
    {
      title: "Dynamic Styles",
      description: "Choose from 100+ templates tailored for TikTok, Reels, and YouTube Shorts.",
      icon: (
        <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      )
    },
    {
      title: "AI Translation",
      description: "Break language barriers. Translate your captions and reach a global audience instantly.",
      icon: (
        <svg className="w-8 h-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5a18.022 18.022 0 01-3.827-5.802M12 9A10.038 10.038 0 019 12.643M11 14a11 11 0 00-2 7m7-7a11 11 0 00-2-7" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 bg-black overflow-hidden selection:bg-white/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Supercharge Your Workflow
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto font-medium tracking-wide">
            Everything you need to create content that stands out, powered by next-generation AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl bg-white/[0.03] border border-white/[0.05] backdrop-blur-3xl hover:bg-white/[0.05] transition-all duration-500 flex flex-col items-center text-center space-y-6"
            >
              <div className="mb-2 p-4 rounded-2xl bg-white/[0.05] w-fit">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {feature.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed font-medium opacity-80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
