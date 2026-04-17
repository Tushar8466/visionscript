'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tag, Layers } from 'lucide-react';

interface ImageCardProps {
  image: {
    id: string;
    url: string;
    caption: string;
    category: string;
    tags: string[];
  };
}

export default function ImageCard({ image }: ImageCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all hover:bg-zinc-800"
    >
      <Link href={`/captioning/image/${image.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image.url}
            alt={image.caption}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500 rounded-full text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-indigo-500/20">
              <Layers className="w-3 h-3" />
              {image.category}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-zinc-200 text-sm font-medium leading-relaxed line-clamp-2 min-h-[2.5rem] group-hover:text-white transition-colors">
            {image.caption}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {image.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-[10px] font-black text-zinc-500 uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-lg group-hover:bg-white/10 transition-colors border border-white/5"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
