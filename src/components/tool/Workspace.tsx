'use client';

import { motion } from 'framer-motion';
import { IconPlayerPlayFilled, IconDownload, IconRefresh } from '@tabler/icons-react';

const mockTranscript = [
  { time: "00:00", text: "This is a demonstration of the AI tool." },
  { time: "00:03", text: "You can see how accurately it detects pacing." },
  { time: "00:06", text: "And highlights important keywords instantly." },
  { time: "00:09", text: "Exporting natively to TikTok, Reels, and Shorts." }
];

export default function Workspace({ onReset }: { onReset: () => void }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full h-[700px]">
      
      {/* Video Preview Panel */}
      <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 flex flex-col relative overflow-hidden group">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-black text-white tracking-tight">Preview</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">HQ Rendered</span>
          </div>
        </div>

        {/* Video Mockup */}
        <div className="flex-1 bg-black rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center cursor-pointer group-hover:border-white/20 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
          
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white z-20 group-hover:scale-110 transition-transform">
            <IconPlayerPlayFilled className="w-6 h-6 ml-1" />
          </div>

          <div className="absolute bottom-8 inset-x-0 w-full text-center z-20 px-8">
            <div className="inline-block bg-black/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20">
               <span className="text-3xl font-black text-white uppercase tracking-tighter" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  This is a demonstration of <br/><span className="text-yellow-400">the AI tool.</span>
               </span>
            </div>
          </div>
        </div>
      </div>

      {/* Editor & Controls Panel */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        
        {/* Transcript Editor */}
        <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 flex flex-col">
          <h2 className="text-lg font-black text-white tracking-tight mb-6">Transcript</h2>
          
          <div className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
            {mockTranscript.map((line, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/[0.05] transition-all cursor-text group">
                <span className="text-xs font-bold font-mono text-zinc-500 mt-0.5">{line.time}</span>
                <p className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{line.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions panel */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 flex gap-4">
          <button 
            onClick={onReset}
            className="w-14 h-14 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white transition-all shrink-0"
          >
            <IconRefresh className="w-6 h-6" />
          </button>
          
          <button className="flex-1 rounded-2xl bg-white hover:bg-zinc-200 text-black font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]">
            <IconDownload className="w-5 h-5" />
            Export HD Video
          </button>
        </div>

      </div>
    </div>
  );
}
