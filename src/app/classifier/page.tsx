'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconUpload, IconScan, IconSparkles, IconCheck, IconAlertCircle } from '@tabler/icons-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ClassifierPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('PLEASE UPLOAD AN IMAGE FILE');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setResults([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const classifyImage = async () => {
    if (!selectedImage || !fileInputRef.current?.files?.[0]) return;

    setIsClassifying(true);

    try {
      // a) Save image as base64 in sessionStorage
      sessionStorage.setItem("uploadedImage", selectedImage);

      // b) Prepare FormData for n8n
      const formData = new FormData();
      formData.append('image', fileInputRef.current.files[0]);

      // c) Wrap fetch in try/catch — don't block if n8n fails
      try {
        const response = await fetch('/api/proxy-n8n', {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          console.warn("Proxy returned error status:", response.status);
          toast.error("PIPELINE START FAILED (404/500)");
        }
      } catch (e) {
        console.warn("n8n push failed:", e);
        toast.error("NETWORK ERROR: PIPELINE UNREACHABLE");
      }

      // e) Redirect to /results
      router.push('/results');
    } catch (error) {
      console.error('Classification error:', error);
      toast.error('AN ERROR OCCURRED');
    } finally {
      setIsClassifying(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full backdrop-blur-xl"
          >
            <IconSparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Experimental AI</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Visual <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent italic">Intelligence</span>
          </h1>
          <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em] max-w-sm mx-auto">
            Connected to n8n Automation Engine
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`relative aspect-square rounded-3xl border-2 border-dashed transition-all duration-500 cursor-pointer overflow-hidden group
                ${selectedImage ? 'border-indigo-500/50 bg-indigo-500/5' : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20'}
              `}
            >
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handleImageSelect} 
              />
              
              {selectedImage ? (
                <img src={selectedImage} alt="Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-indigo-500/50 transition-all duration-300">
                    <IconUpload className="w-8 h-8 text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Drop frame here</p>
                    <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-zinc-600 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              )}
            </div>

            <button
              disabled={!selectedImage || isClassifying}
              onClick={classifyImage}
              className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-xs transition-all
                ${!selectedImage || isClassifying 
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50' 
                  : 'bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-white/10'}
              `}
            >
              {isClassifying ? (
                <>
                  <div className="w-4 h-4 border-2 border-zinc-500 border-t-zinc-200 rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <IconScan className="w-4 h-4" />
                  <span>Push to Pipeline</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex-1 bg-white/[0.02] border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse" />
              </div>

              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 flex items-center gap-2">
                <IconCheck className="w-3 h-3 text-indigo-400" />
                n8n Live Stream
              </h2>

              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  {results.length > 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      {results.map((result, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                            <span className={i === 0 ? 'text-white' : 'text-zinc-500'}>{result.className}</span>
                            <span className={i === 0 ? 'text-indigo-400' : 'text-zinc-600'}>{(result.probability * 100).toFixed(1)}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${result.probability * 100}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className={`h-full rounded-full ${i === 0 ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-white/10'}`}
                            />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-[300px] flex flex-col items-center justify-center text-center space-y-4"
                    >
                      <IconAlertCircle className="w-10 h-10 text-zinc-800" />
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 underline decoration-zinc-800 underline-offset-4">Awaiting Input</p>
                        <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-zinc-700 max-w-[150px]">Select frame to forward output to n8n dashboard</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Technical Metadata */}
              <div className="mt-12 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-600">Webhook_Target</span>
                  <span className="block text-[10px] font-bold text-zinc-400 uppercase truncate">n8n-1wtq.onrender...</span>
                </div>
                <div className="space-y-1">
                  <span className="block text-[8px] font-black uppercase tracking-widest text-zinc-600">Pipeline_Status</span>
                  <span className="block text-[10px] font-bold text-green-400 uppercase">Online</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
