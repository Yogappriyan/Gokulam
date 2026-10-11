import React, { useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { HERO_IMAGE } from '../data/mockData';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { language, setActiveCategoryFilter, setCurrentView } = useStore();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  // Parallax transforms
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleExploreClick = (category?: string) => {
    if (category) {
      setActiveCategoryFilter(category);
      setCurrentView('category');
    } else {
      const el = document.getElementById('horizontal-showcase');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[96vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#0D0507]"
    >
      {/* Background Image with Ken-Burns style slow zoom and scroll parallax */}
      <motion.div
        style={{ scale: imageScale, y: imageY }}
        className="absolute inset-0 z-0 origin-center will-change-transform"
      >
        <img
          src={"https://i.postimg.cc/YSSyZ2tn/Luxurious-Indian-Saree-Boutique-Interior.png"}
          alt="Gokulam Kanjivaram Silk Saree in Golden Light"
          className="w-full h-full object-cover object-[center_35%] filter brightness-[0.72] contrast-[1.08]"
          referrerPolicy="no-referrer"
        />

        {/* Cinematic Multi-layered Vignette & Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0507] via-[#0D0507]/40 to-[#0D0507]/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E050A]/85 via-transparent to-[#1E050A]/70" />
      </motion.div>

      {/* Floating Diya / Golden Bokeh Glow Particles */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-72 h-72 rounded-full bg-[#D4AF37]/15 blur-[90px] diya-glow" />
        <div
          className="absolute bottom-1/3 right-1/5 w-96 h-96 rounded-full bg-[#800020]/25 blur-[120px] diya-glow"
          style={{ animationDelay: '3.5s' }}
        />
      </div>

      {/* Hero Editorial Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 max-w-5xl mx-auto px-6 pt-24 pb-16 text-center flex flex-col items-center"
      >
        {/* Heritage Kicker (Tamil + English) */}
        <div className="inline-flex items-center gap-3 mb-6 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 bg-[#1A060B]/70 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#F3E5AB]" />
          <span className="text-xs md:text-sm font-medium tracking-widest text-[#F3E5AB] uppercase">
            {language === 'en'
              ? 'Woraiyur Heritage · Tiruchirappalli · Est. 1984'
              : 'உறையூர் பாரம்பரியம் · திருச்சி · 1984 முதல்'}
          </span>
          <span className="hidden sm:inline text-xs text-[#D4AF37]">✦</span>
          <span className="hidden sm:inline text-xs text-[#FAF6EE]/80">
            {language === 'en' ? 'Textiles & Furniture' : 'பட்டு & மர தளவாடங்கள்'}
          </span>
        </div>

        {/* Grand Headline with Line-by-line Reveal Mask */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FAF6EE] leading-[1.1] max-w-4xl"
          >
            {language === 'en' ? (
              <>
                Tradition Woven for <span className="zari-shimmer">Every Home</span>.
              </>
            ) : (
              <>
                ஒவ்வொரு இல்லத்திற்கும் <span className="zari-shimmer">பாரம்பரியத்தின் அழகு</span>.
              </>
            )}
          </motion.h1>
        </div>

        {/* Tamil Tagline Line 2 */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-[#F3E5AB]/90 font-serif italic max-w-2xl mb-8"
        >
          {language === 'en'
            ? 'பாரம்பரியம் · தரம் · நம்பிக்கை — Pure silk sarees, daily garments, and handcrafted furniture under one roof in Woraiyur.'
            : 'பாரம்பரியம் · தரம் · நம்பிக்கை — அசல் காஞ்சிபுரம் பட்டுப் புடவைகள் முதல் கைவினை தேக்கு மர தளவாடங்கள் வரை அனைத்தும் ஒரே கூரையின் கீழ்.'}
        </motion.p>

        {/* Magnetic Style CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        >
          {/* Primary CTA */}
          <button
            onClick={() => handleExploreClick('Silk & Tissue Sarees')}
            className="group relative px-8 py-3.5 bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] text-[#140609] font-medium text-sm md:text-base tracking-wider rounded-sm overflow-hidden shadow-[0_4px_24px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_32px_rgba(212,175,55,0.55)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span className="relative z-10 font-bold uppercase tracking-wider">
              {language === 'en' ? 'Explore Deepavali Silk' : 'பட்டு சேலைகளை காண்க'}
            </span>
            <ArrowUpRight className="relative z-10 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            <div className="absolute inset-0 bg-[#F3E5AB] opacity-0 group-hover:opacity-25 transition-opacity duration-300" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => handleExploreClick('Furniture')}
            className="group px-7 py-3.5 bg-[#140609]/80 hover:bg-[#1E080D] text-[#FAF6EE] border border-[#D4AF37]/50 hover:border-[#D4AF37] font-medium text-sm md:text-base tracking-wider rounded-sm transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer"
          >
            <span>{language === 'en' ? 'Handcrafted Furniture' : 'மர தளவாடங்கள்'}</span>
            <span className="text-[#D4AF37] group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </motion.div>

        {/* Editorial Sub-features Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-left border-t border-[#D4AF37]/20 pt-6 max-w-3xl w-full"
        >
          <div>
            <div className="text-[#D4AF37] text-lg font-serif font-bold">100% Pure</div>
            <div className="text-xs text-[#FAF6EE]/70 font-light">
              {language === 'en' ? 'Zari & Mulberry Silk' : 'அசல் ஜரிகை பட்டு'}
            </div>
          </div>
          <div>
            <div className="text-[#D4AF37] text-lg font-serif font-bold">Free Stitching</div>
            <div className="text-xs text-[#FAF6EE]/70 font-light">
              {language === 'en' ? 'Custom Blouse Tailoring' : 'இலவச பிளவுஸ் தைத்தல்'}
            </div>
          </div>
          <div>
            <div className="text-[#D4AF37] text-lg font-serif font-bold">Solid Teak</div>
            <div className="text-xs text-[#FAF6EE]/70 font-light">
              {language === 'en' ? 'Seasoned Nilambur Wood' : 'உயர்தர தேக்கு மரங்கள்'}
            </div>
          </div>
          <div>
            <div className="text-[#D4AF37] text-lg font-serif font-bold">Woraiyur</div>
            <div className="text-xs text-[#FAF6EE]/70 font-light">
              {language === 'en' ? 'Trichy Direct Store' : 'நேரடி ஸ்டோர் விசிட்'}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none opacity-80">
        <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase mb-1">
          SCROLL TO WEAVE
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#D4AF37] to-transparent animate-pulse" />
      </div>
    </section>
  );
};
