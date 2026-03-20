'use client';

export default function Footer() {
  return (
    <footer className="py-16 bg-black border-t border-white/[0.05] selection:bg-white/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="text-2xl font-black text-white tracking-tighter uppercase">
              Captions<span className="text-zinc-500">.</span>
            </div>
            <p className="text-zinc-500 max-w-xs font-medium leading-relaxed">
              Empowering creators with the most advanced AI captioning tool in the market.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Product</h4>
            <ul className="space-y-4 text-zinc-500 font-medium">
              <li className="hover:text-white transition-colors cursor-pointer">Features</li>
              <li className="hover:text-white transition-colors cursor-pointer">Pricing</li>
              <li className="hover:text-white transition-colors cursor-pointer">Styles</li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold text-white uppercase tracking-[0.2em]">Social</h4>
            <ul className="space-y-4 text-zinc-500 font-medium">
              <li className="hover:text-white transition-colors cursor-pointer">Twitter</li>
              <li className="hover:text-white transition-colors cursor-pointer">Instagram</li>
              <li className="hover:text-white transition-colors cursor-pointer">TikTok</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.05] gap-4">
          <p className="text-zinc-600 text-sm font-medium">
            © 2024 Captions AI. All rights reserved.
          </p>
          <div className="flex gap-8 text-zinc-600 text-sm font-medium">
            <span className="hover:text-white transition-colors cursor-pointer whitespace-nowrap">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer whitespace-nowrap">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
