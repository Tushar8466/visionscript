'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { signIn } from "next-auth/react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function SignInPage() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black overflow-hidden relative selection:bg-white/30 flex flex-col items-center justify-center">
      <BackgroundBeams />

      <div className="relative z-10 flex flex-col items-center justify-center w-full px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Back to Home Navigation */}
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group">
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest">Return to Home</span>
          </Link>

          {/* Sign In Card */}
          <div className="p-12 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-3xl border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
            
            <div className="relative z-10 space-y-10">
              <div className="space-y-4">
                <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">
                  Welcome <br />
                  <span className="text-zinc-500">Back.</span>
                </h1>
                <p className="text-zinc-400 font-medium text-sm leading-relaxed max-w-[240px]">
                  Sign in to continue creating captions that convert.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                {/* Google Sign-In Button */}
                <button 
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full py-5 px-8 rounded-full bg-white text-black font-black flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  )}
                  <span className="text-sm uppercase tracking-widest">
                    {isLoading ? "Signing in..." : "Sign in with Google"}
                  </span>
                </button>

                <div className="relative py-4 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/5"></div>
                  </div>
                  <span className="relative z-10 px-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 bg-[#0c0c0c]">Or</span>
                </div>

                {/* Email Mock */}
                <button className="w-full py-5 rounded-full bg-white/[0.03] border border-white/10 text-white font-black text-sm uppercase tracking-widest hover:bg-white/[0.05] transition-all active:scale-[0.98]">
                  Use Email
                </button>
              </div>

              <p className="text-center text-[10px] uppercase font-bold tracking-widest text-zinc-600">
                By signing in, you agree to our <br />
                <span className="text-zinc-500 cursor-pointer hover:text-white transition-colors">Terms of Service</span> & <span className="text-zinc-500 cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
