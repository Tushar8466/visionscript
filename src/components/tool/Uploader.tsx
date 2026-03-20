'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconUpload, IconVideo } from '@tabler/icons-react';

interface UploaderProps {
  onUploadComplete: () => void;
}

export default function Uploader({ onUploadComplete }: UploaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsHovered(false);
    startUploadMock();
  };

  const startUploadMock = () => {
    setIsUploading(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          onUploadComplete();
        }, 500);
      } else {
        setProgress(p);
      }
    }, 200);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsHovered(true); }}
      onDragLeave={() => setIsHovered(false)}
      onDrop={handleDrop}
      onClick={() => !isUploading && startUploadMock()}
      className={`relative w-full h-[350px] border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-300
        ${isHovered 
          ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_50px_rgba(99,102,241,0.2)]' 
          : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20'
        }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      {isUploading ? (
        <div className="w-full max-w-xs space-y-6 text-center z-10">
          <IconVideo className="w-12 h-12 text-indigo-400 mx-auto animate-pulse" />
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-zinc-400 tracking-widest uppercase">
              <span>Uploading</span>
              <span className="text-indigo-400">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center space-y-6 z-10">
          <div className="w-20 h-20 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-center mx-auto shadow-xl group hover:scale-110 transition-transform duration-300">
            <IconUpload className={`w-8 h-8 transition-colors duration-300 ${isHovered ? 'text-indigo-400' : 'text-zinc-400'}`} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white tracking-tight">Click or drag video to replace</h3>
            <p className="text-sm font-medium text-zinc-500">MP4, MOV, WebM up to 2GB</p>
          </div>
        </div>
      )}
    </div>
  );
}
