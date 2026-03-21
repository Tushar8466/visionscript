'use client';

import { motion } from 'framer-motion';
import { IconPlayerPlayFilled, IconDownload, IconRefresh } from '@tabler/icons-react';
import { useRef, useState } from 'react';

export default function Workspace({
  onReset,
  videoUrl,
  transcript
}: {
  onReset: () => void;
  videoUrl: string | null;
  transcript: any[];
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);

  // Sync video time to state to drive active caption highlights
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Find the currently spoken chunk
  const activeChunk = transcript.find(
    (chunk) => currentTime >= chunk.timestamp[0] && currentTime <= chunk.timestamp[1]
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full h-[700px]">

      {/* Video Preview Panel */}
      <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 flex flex-col relative overflow-hidden group">
        <div className="flex justify-between items-center mb-6 z-20">
          <h2 className="text-lg font-black text-white tracking-tight">Preview</h2>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">HQ Rendered</span>
          </div>
        </div>

        {/* Video Mockup */}
        <div className="flex-1 bg-black rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center cursor-pointer group-hover:border-white/20 transition-colors z-10">
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-contain"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white z-20 group-hover:scale-110 transition-transform">
                <IconPlayerPlayFilled className="w-6 h-6 ml-1" />
              </div>
            </>
          )}

          {/* Dynamic AI Subtitles Rendered Over Video */}
          <div className="absolute bottom-10 inset-x-0 w-full text-center z-20 px-8 pointer-events-none transition-opacity duration-300">
            {activeChunk && (
              <div className="inline-block bg-black/80 backdrop-blur-lg px-8 py-4 rounded-2xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
                <span className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                  {activeChunk.text}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Editor & Controls Panel */}
      <div className="lg:col-span-5 flex flex-col gap-6">

        {/* Transcript Editor */}
        <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 flex flex-col overflow-hidden">
          <h2 className="text-lg font-black text-white tracking-tight mb-6 shrink-0">AI Transcript</h2>

          <div className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
            {transcript.length > 0 ? transcript.map((chunk, i) => {
              const isActive = currentTime >= chunk.timestamp[0] && currentTime <= chunk.timestamp[1];
              return (
                <div
                  key={i}
                  className={`flex gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${isActive ? 'bg-indigo-500/20 border-indigo-500/50 shadow-inner' : 'hover:bg-white/[0.03] border-transparent hover:border-white/[0.05]'}`}
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = chunk.timestamp[0];
                    }
                  }}
                >
                  <span className={`text-xs font-bold font-mono mt-0.5 ${isActive ? 'text-indigo-300' : 'text-zinc-500'}`}>
                    {formatTime(chunk.timestamp[0])}
                  </span>
                  <p className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                    {chunk.text}
                  </p>
                </div>
              );
            }) : (
              <div className="h-full flex items-center justify-center text-zinc-600 text-sm font-medium italic">
                No speech detected in this video.
              </div>
            )}
          </div>
        </div>

        {/* Actions panel */}
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 flex gap-4 shrink-0">
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

