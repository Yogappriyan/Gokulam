import React, { useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { HERO_IMAGE, MACRO_LOOM_IMAGE, FESTIVE_COLLECTION_IMAGE } from '../data/mockData';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const EditorialDrapeSection: React.FC = () => {
  const { language, setActiveCategoryFilter, setCurrentView } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const macroY = useTransform(scrollYProgress, [0, 1], ['12%', '-12%']);
  const cardY = useTransform(scrollYProgress, [0, 1], ['18%', '-10%']);

  return (
    <section
      ref={containerRef}
      className="relative py-28 md:py-36 bg-[#110508] overflow-hidden border-t border-[#D4AF37]/20"
    >
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-[#6A1522]/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-[#D4AF37]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Editorial Narrative (5 cols) */}
          <div className="lg:col-span-5 relative z-20 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'The Art of Zari & Loom' : 'ஜரிகை மற்றும் கைத்தறி கலை'}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6EE] leading-tight">
              {language === 'en' ? (
                <>
                  Gold Threads Woven with <span className="zari-shimmer">Unbroken Devotion</span>.
                </>
              ) : (
                <>
                  தலைமுறை பெருமை பேசும் <span className="zari-shimmer">தூய பட்டு நெசவு</span>.
                </>
              )}
            </h2>

            <p className="text-sm sm:text-base text-[#FAF6EE]/80 leading-relaxed font-light">
              {language === 'en'
                ? 'At Gokulam in Woraiyur, each Kanjivaram saree carries an intricate interlock technique known as Korvai. Our master weavers spend up to 28 days perfecting the heavy gold zari pallu, ensuring each piece is an heirloom worthy of mother-to-daughter remembrance.'
                : 'உறையூர் கோகுலத்தில் ஒவ்வொரு பட்டுப் புடவையும் பாரம்பரிய கோர்வை முறையில் நெய்யப்படுகிறது. தூய வெள்ளி மற்றும் தங்க முலாம் பூசிய ஜரிகை இழைகள் உங்கள் விசேஷங்களுக்கு நிகரற்ற கம்பீரத்தை சேர்க்கிறது.'}
            </p>

            {/* Hallmarks List */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#FAF6EE]/90">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  {language === 'en' ? 'Certified Silk Mark & 3G Zari Testing' : 'அங்கீகரிக்கப்பட்ட சில்க் மார்க் சான்றிதழ்'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#FAF6EE]/90">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  {language === 'en' ? 'Direct Weaver Collaboration — No Middlemen' : 'நேரடி நெசவாளர் கூட்டாண்மை'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#FAF6EE]/90">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>
                  {language === 'en' ? 'Complimentary Blouse Fitting & Custom Latkans' : 'இலவச பிளவுஸ் அளவீடு மற்றும் ஃபினிஷிங்'}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setActiveCategoryFilter('Silk & Tissue Sarees');
                  setCurrentView('category');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#23080E] hover:bg-[#35080E] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#FAF6EE] text-xs font-semibold uppercase tracking-widest rounded-sm transition-all shadow-md"
              >
                {language === 'en' ? 'View Silk Heritage Catalog' : 'பட்டுப் புடவை பட்டியல் காண்க'}
              </button>
            </div>
          </div>

          {/* Right Column: Layered Multi-depth Parallax Image Composition (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[460px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center">
            
            {/* Layer 1: Large Draped Saree Editorial Portrait (Background layer) */}
            <motion.div
              style={{ y: portraitY }}
              className="relative w-4/5 sm:w-3/4 h-[380px] sm:h-[480px] rounded-sm overflow-hidden border border-[#D4AF37]/30 shadow-2xl z-10 mr-auto"
            >
              <img
                src={HERO_IMAGE}
                alt="Editorial draped silk saree"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140609]/80 via-transparent to-transparent" />
            </motion.div>

            {/* Layer 2: Offset Macro Zari-Weave Close-Up (Foreground layer, moves faster) */}
            <motion.div
              style={{ y: macroY }}
              className="absolute right-2 sm:right-6 top-8 w-1/2 sm:w-5/12 h-[220px] sm:h-[280px] rounded-sm overflow-hidden border-2 border-[#D4AF37]/60 shadow-[0_16px_40px_rgba(0,0,0,0.8)] z-20"
            >
              <img
                src={MACRO_LOOM_IMAGE}
                alt="Macro handloom shuttle with gold zari"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute bottom-2 left-2 bg-[#1A060B]/90 px-2.5 py-1 text-[9px] uppercase tracking-wider text-[#F3E5AB] font-semibold border border-[#D4AF37]/40">
                MACRO WEAVE
              </div>
            </motion.div>

            {/* Layer 3: Floating Editorial Quote / Trust Badge Card */}
            <motion.div
              style={{ y: cardY }}
              className="absolute -bottom-4 right-8 sm:right-16 bg-[#1A060B]/95 border border-[#D4AF37]/40 p-5 rounded-sm shadow-2xl backdrop-blur-md max-w-xs z-30"
            >
              <p className="font-serif italic text-xs sm:text-sm text-[#F3E5AB] leading-relaxed">
                “Every weave has a soul. In Woraiyur, we treat every customer like family visiting for wedding shopping.”
              </p>
              <div className="mt-3 pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between text-[11px] text-[#FAF6EE]/70">
                <span className="font-semibold text-[#D4AF37]">Gokulam Family</span>
                <span>Woraiyur, Trichy</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
