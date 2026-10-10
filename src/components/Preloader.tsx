import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'drawing' | 'curtain' | 'done'>('drawing');

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setPhase('curtain');
    }, 2200);

    const timer2 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 3100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
          {/* Top Curtain */}
          <motion.div
            initial={{ y: 0 }}
            animate={phase === 'curtain' ? { y: '-100%' } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#23050A] border-b border-[#D4AF37]/30 z-20 pointer-events-auto"
          />

          {/* Bottom Curtain */}
          <motion.div
            initial={{ y: 0 }}
            animate={phase === 'curtain' ? { y: '100%' } : { y: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#23050A] border-t border-[#D4AF37]/30 z-20 pointer-events-auto"
          />

          {/* Golden Centerpiece Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={phase === 'curtain' ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-30 flex flex-col items-center justify-center text-center px-6 pointer-events-auto"
          >
            {/* Kolam Geometric Drawing */}
            <svg
              className="w-28 h-28 mb-5 text-[#D4AF37]"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Kolam Dots */}
              <circle cx="50" cy="20" r="2.5" fill="#D4AF37" />
              <circle cx="80" cy="50" r="2.5" fill="#D4AF37" />
              <circle cx="50" cy="80" r="2.5" fill="#D4AF37" />
              <circle cx="20" cy="50" r="2.5" fill="#D4AF37" />
              <circle cx="50" cy="50" r="3.5" fill="#F3E5AB" />

              <circle cx="35" cy="35" r="2" fill="#D4AF37" opacity="0.7" />
              <circle cx="65" cy="35" r="2" fill="#D4AF37" opacity="0.7" />
              <circle cx="35" cy="65" r="2" fill="#D4AF37" opacity="0.7" />
              <circle cx="65" cy="65" r="2" fill="#D4AF37" opacity="0.7" />

              {/* Looped Weave Knot Path */}
              <motion.path
                d="M 50 15 C 65 15 85 35 85 50 C 85 65 65 85 50 85 C 35 85 15 65 15 50 C 15 35 35 15 50 15 Z"
                stroke="#D4AF37"
                strokeWidth="1.5"
                strokeDasharray="300"
                initial={{ strokeDashoffset: 300 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.6, ease: "easeInOut" }}
              />

              <motion.path
                d="M 25 25 Q 50 50 75 75 M 25 75 Q 50 50 75 25"
                stroke="#F3E5AB"
                strokeWidth="1"
                strokeDasharray="140"
                initial={{ strokeDashoffset: 140 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.8, delay: 0.3, ease: "easeInOut" }}
              />
            </svg>

            {/* Tamil Brand Kicker */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-[#D4AF37] font-serif text-xs md:text-sm tracking-[0.3em] uppercase mb-2 font-medium"
            >
              உறையூர் · திருச்சி · 1984
            </motion.p>

            {/* Brand Wordmark with Golden Thread Underline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-3xl md:text-5xl font-serif font-bold text-[#FAF6EE] tracking-tight mb-3"
            >
              GOKULAM
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="text-xs tracking-[0.25em] text-[#E6CA65] uppercase font-light"
            >
              Textiles & Fine Furniture
            </motion.p>

            {/* Golden Thread Drawing across */}
            <div className="w-48 h-[2px] mt-4 relative overflow-hidden bg-[#4A0E17]">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-[#F3E5AB] to-transparent"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
