import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for touch screen or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="view"]')) {
        setCursorType('view');
      } else if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('select')
      ) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Golden Glow Circle */}
      <motion.div
        animate={{
          x: position.x - (cursorType === 'view' ? 32 : cursorType === 'hover' ? 24 : 14),
          y: position.y - (cursorType === 'view' ? 32 : cursorType === 'hover' ? 24 : 14),
          width: cursorType === 'view' ? 64 : cursorType === 'hover' ? 48 : 28,
          height: cursorType === 'view' ? 64 : cursorType === 'hover' ? 48 : 28,
          borderColor: cursorType === 'view' ? 'rgba(243, 229, 171, 0.9)' : 'rgba(212, 175, 55, 0.6)',
          backgroundColor: cursorType === 'view' ? 'rgba(74, 14, 23, 0.85)' : 'rgba(212, 175, 55, 0.08)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.2 }}
        className="fixed rounded-full border border-[#D4AF37] flex items-center justify-center backdrop-blur-[2px] transition-colors"
      >
        {cursorType === 'view' && (
          <span className="text-[10px] tracking-widest text-[#F3E5AB] font-serif font-bold uppercase select-none">
            VIEW
          </span>
        )}
      </motion.div>

      {/* Center Golden Point */}
      <motion.div
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          opacity: cursorType === 'view' ? 0 : 1
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600 }}
        className="fixed w-1.5 h-1.5 rounded-full bg-[#F3E5AB] shadow-[0_0_8px_#D4AF37]"
      />
    </div>
  );
};
