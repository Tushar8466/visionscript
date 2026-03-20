'use client';

import { useState } from 'react';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Uploader from '@/components/tool/Uploader';
import Processing from '@/components/tool/Processing';
import Workspace from '@/components/tool/Workspace';
import { motion, AnimatePresence } from 'framer-motion';

export type ToolState = 'uploading' | 'processing' | 'workspace';

export default function CreateDashboard() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });


  const [toolState, setToolState] = useState<ToolState>('uploading');

  if (status === "loading") {
    return (
      <div className="flex bg-black min-h-screen items-center justify-center">
        <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-24 px-6 relative overflow-hidden flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-900/20 via-purple-900/5 to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col relative z-10 py-12">
        <AnimatePresence mode="wait">
          {toolState === 'uploading' && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full"
            >
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-black text-white tracking-tighter">Create Magic</h1>
                <p className="text-zinc-400 font-medium">Upload a video to let our AI do the heavy lifting.</p>
              </div>
              <Uploader onUploadComplete={() => setToolState('processing')} />
            </motion.div>
          )}

          {toolState === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center w-full"
            >
              <Processing onComplete={() => setToolState('workspace')} />
            </motion.div>
          )}

          {toolState === 'workspace' && (
            <motion.div
              key="workspace"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 w-full flex flex-col"
            >
              <Workspace onReset={() => setToolState('uploading')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
