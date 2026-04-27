'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  IconSparkles, 
  IconCheck, 
  IconCopy, 
  IconArrowLeft, 
  IconLoader2, 
  IconAlertCircle,
  IconBriefcase,
  IconMoodSmile,
  IconSearch
} from '@tabler/icons-react';
import { toast } from 'react-hot-toast';

interface PredictionResult {
  Timestamp: string;
  "Image Name": string;
  Category: string;
  Tags: string;
  "Formal Caption": string;
  "Casual Caption": string;
  "SEO Caption": string;
  Confidence: string;
  "Bias Flag": string;
}

export default function ResultsPage() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PredictionResult | null>(null);
  const [pollCount, setPollCount] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // a) Get image from sessionStorage key "uploadedImage"
    const storedImage = sessionStorage.getItem("uploadedImage");
    if (!storedImage) {
      router.push('/classifier');
      return;
    }
    setImage(storedImage);

    // b) Poll /api/results every 2 seconds, max 10 attempts
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch('/api/results');
        const json = await res.json();

        if (json.success && json.result) {
          setData(json.result);
          setLoading(false);
          clearInterval(pollInterval);
        } else {
          setPollCount(prev => {
            if (prev >= 9) {
              clearInterval(pollInterval);
              setLoading(false);
            }
            return prev + 1;
          });
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [router]);

  const copyAllCaptions = () => {
    if (!data) return;
    const allCaptions = `
FORMAL: ${data["Formal Caption"]}
CASUAL: ${data["Casual Caption"]}
SEO: ${data["SEO Caption"]}
    `.trim();
    
    navigator.clipboard.writeText(allCaptions);
    setIsCopied(true);
    toast.success("COPIED!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const clearAndGoBack = () => {
    // f) clears sessionStorage and router.push('/')
    sessionStorage.removeItem("uploadedImage");
    router.push('/');
  };

  const confidenceValue = data ? parseFloat(data.Confidence) : 0;

  const getConfidenceColor = (conf: number) => {
    if (conf > 0.8) return 'text-green-400';
    if (conf > 0.5) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center space-y-8"
        >
          <div className="relative">
            <IconLoader2 className="w-20 h-20 text-indigo-500 animate-spin mx-auto" />
            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-black uppercase tracking-tighter">Generating your captions...</h1>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em]">
              Polling Results Pipeline (Attempt {pollCount + 1}/10)
            </p>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Image and Classification */}
        <div className="lg:col-span-5 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group"
          >
            {image && <img src={image} alt="Analyzed" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6 right-6">
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Analysis Ready</span>
               </div>
               <h2 className={`text-3xl font-black uppercase tracking-tighter leading-none ${getConfidenceColor(confidenceValue)}`}>
                  {data?.Tags.split(',')[0] || data?.Category}
               </h2>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-xl space-y-6"
          >
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Predicted Label</p>
              <h3 className={`text-5xl font-black uppercase tracking-tighter ${getConfidenceColor(confidenceValue)}`}>
                {data?.Tags.split(',')[0] || data?.Category}
              </h3>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                <span>Confidence Score</span>
                <span className={getConfidenceColor(confidenceValue)}>{(confidenceValue * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${confidenceValue * 100}%` }}
                  transition={{ duration: 1 }}
                  className={`h-full rounded-full ${confidenceValue > 0.8 ? 'bg-green-500' : confidenceValue > 0.5 ? 'bg-yellow-500' : 'bg-red-500'}`}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Captions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {/* Formal Caption */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/[0.03] border-2 border-blue-500/30 rounded-[2rem] p-8 backdrop-blur-xl relative group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400">
                  📝
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-blue-400">Formal Caption</h3>
              </div>
              <p className="text-zinc-300 leading-relaxed font-medium">
                {data?.["Formal Caption"]}
              </p>
            </motion.div>

            {/* Casual Caption */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/[0.03] border-2 border-purple-500/30 rounded-[2rem] p-8 backdrop-blur-xl relative group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400">
                  😊
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-purple-400">Casual Caption</h3>
              </div>
              <p className="text-zinc-300 leading-relaxed font-medium">
                {data?.["Casual Caption"]}
              </p>
            </motion.div>

            {/* SEO Caption */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white/[0.03] border-2 border-green-500/30 rounded-[2rem] p-8 backdrop-blur-xl relative group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center text-green-400">
                  🔍
                </div>
                <h3 className="text-sm font-black uppercase tracking-widest text-green-400">SEO Caption</h3>
              </div>
              <p className="text-zinc-300 leading-relaxed font-medium">
                {data?.["SEO Caption"]}
              </p>
            </motion.div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={copyAllCaptions}
              className="flex-1 py-5 bg-white text-black rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-white/10"
            >
              {isCopied ? <IconCheck className="w-4 h-4" /> : <IconCopy className="w-4 h-4" />}
              {isCopied ? "Copied!" : "Copy All Captions"}
            </button>
            <button 
              onClick={clearAndGoBack}
              className="flex-1 py-5 bg-white/5 border border-white/10 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
            >
              <IconArrowLeft className="w-4 h-4" />
              Analyze Another Image
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}
