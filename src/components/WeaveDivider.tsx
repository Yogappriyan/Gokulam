import React from 'react';
import { motion } from 'motion/react';

export const WeaveDivider: React.FC<{ flipped?: boolean }> = ({ flipped = false }) => {
  return (
    <div className={`relative w-full overflow-hidden leading-none py-6 pointer-events-none select-none ${flipped ? 'rotate-180' : ''}`}>
      <svg
        className="w-full h-12 md:h-16 text-[#D4AF37]/40"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Weave warp wave line 1 */}
        <motion.path
          d="M0,40 C150,90 350,10 500,60 C650,110 850,20 1000,70 C1100,100 1180,50 1200,60"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeOpacity="0.5"
          initial={{ pathLength: 0.8 }}
          animate={{
            d: [
              "M0,40 C150,90 350,10 500,60 C650,110 850,20 1000,70 C1100,100 1180,50 1200,60",
              "M0,60 C150,20 350,110 500,50 C650,10 850,100 1000,40 C1100,20 1180,80 1200,50",
              "M0,40 C150,90 350,10 500,60 C650,110 850,20 1000,70 C1100,100 1180,50 1200,60"
            ]
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />

        {/* Weave weft wave line 2 (interlaced) */}
        <motion.path
          d="M0,70 C180,10 320,100 520,40 C720,100 880,10 1020,80 C1120,40 1170,90 1200,65"
          stroke="#F3E5AB"
          strokeWidth="1"
          strokeOpacity="0.4"
          initial={{ pathLength: 0.8 }}
          animate={{
            d: [
              "M0,70 C180,10 320,100 520,40 C720,100 880,10 1020,80 C1120,40 1170,90 1200,65",
              "M0,40 C180,95 320,20 520,80 C720,20 880,95 1020,30 C1120,90 1170,30 1200,55",
              "M0,70 C180,10 320,100 520,40 C720,100 880,10 1020,80 C1120,40 1170,90 1200,65"
            ]
          }}
          transition={{ repeat: Infinity, duration: 8.5, ease: "easeInOut" }}
        />

        {/* Golden thread shuttle accent */}
        <motion.circle
          cx="0"
          cy="0"
          r="3"
          fill="#D4AF37"
          animate={{
            cx: [0, 1200],
            cy: [50, 60]
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        />
      </svg>
    </div>
  );
};

export const KolamDivider: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center py-8 pointer-events-none select-none">
      <div className="flex items-center gap-4 max-w-xl w-full px-6">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
        
        {/* Kolam Central Mandala Motif */}
        <svg className="w-8 h-8 text-[#D4AF37]" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="3" fill="#D4AF37" />
          <path
            d="M 20,4 C 28,12 28,28 20,36 C 12,28 12,12 20,4 Z"
            stroke="#D4AF37"
            strokeWidth="1.2"
          />
          <path
            d="M 4,20 C 12,28 28,28 36,20 C 28,12 12,12 4,20 Z"
            stroke="#D4AF37"
            strokeWidth="1.2"
          />
          <circle cx="10" cy="20" r="1.5" fill="#F3E5AB" />
          <circle cx="30" cy="20" r="1.5" fill="#F3E5AB" />
          <circle cx="20" cy="10" r="1.5" fill="#F3E5AB" />
          <circle cx="20" cy="30" r="1.5" fill="#F3E5AB" />
        </svg>

        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
      </div>
    </div>
  );
};
