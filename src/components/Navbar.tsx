'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { name: 'Features', href: '#features' },
  { name: 'Process', href: '#solutions' },
  { name: 'Wall of Love', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
        isScrolled ? 'py-4' : 'py-8'
      )}
    >
      <div className="container mx-auto px-6">
        <div
          className={cn(
            'flex items-center justify-between px-8 py-3 rounded-full transition-all duration-500 border border-transparent',
            isScrolled ? 'bg-black/40 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/50' : 'bg-transparent'
          )}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black text-white tracking-tighter uppercase cursor-pointer"
          >
            Captions<span className="text-zinc-500">.</span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-bold text-zinc-400 hover:text-white transition-all tracking-widest uppercase px-4 py-2 rounded-full hover:bg-white/10"
              >
                {link.name}
              </motion.a>
            ))}
          </div>

          {/* CTA & User Profile */}
          <div className="hidden md:flex items-center gap-6">
            {status === "loading" ? (
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : session?.user ? (
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-3xl border border-white/10 px-4 py-2 rounded-full">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center text-white font-black text-xs border border-white/20 shadow-inner">
                    {session.user.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2) || "U"}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-xs uppercase tracking-wider">{session.user.name}</span>
                    <span className="text-zinc-500 text-[10px] uppercase tracking-widest">{session.user.email}</span>
                  </div>
                </div>
                <div className="w-[1px] h-6 bg-white/10 mx-2" />
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-[10px] font-black text-red-400 hover:text-red-300 transition-colors uppercase tracking-[0.2em]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <motion.a
                  href="/signin"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-sm font-bold text-white hover:text-zinc-300 transition-colors uppercase tracking-widest"
                >
                  Log in
                </motion.a>
                <motion.a
                  href="/signin"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-6 py-3 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
                >
                  Get Started
                </motion.a>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-3xl border-b border-white/10 p-6 md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-bold text-zinc-400 hover:text-white transition-colors tracking-[0.2em] uppercase"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-4">
                <button className="text-sm font-bold text-white uppercase tracking-widest">Log in</button>
                <button className="px-8 py-4 bg-white text-black text-sm font-black uppercase tracking-widest rounded-full">Get Started</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
