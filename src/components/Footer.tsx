export default function Footer() {
  return (
    <footer className="py-16 px-6 bg-black border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left space-y-1">
          <div className="text-2xl font-black text-white tracking-tighter uppercase">Captions<span className="text-zinc-600">.</span></div>
          <p className="text-zinc-600 text-xs uppercase tracking-widest font-bold">AI Caption Creator</p>
        </div>
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-zinc-600">
          {["Features", "Pricing", "Blog", "Privacy"].map((l) => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <p className="text-zinc-700 text-[10px] uppercase tracking-widest">© 2025 VisionScript. All rights reserved.</p>
      </div>
    </footer>
  );
}
