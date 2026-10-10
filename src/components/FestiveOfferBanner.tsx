import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Clock } from 'lucide-react';

export const FestiveOfferBanner: React.FC = () => {
  const { campaigns, language, setActiveCategoryFilter, setCurrentView } = useStore();
  const activeCampaign = campaigns.find(c => c.isActive);

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 14, hours: 8, minutes: 42, seconds: 15 });

  useEffect(() => {
    if (!activeCampaign) return;

    const target = new Date(activeCampaign.targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCampaign]);

  if (!activeCampaign) return null;

  return (
    <section className="relative py-16 bg-gradient-to-r from-[#320810] via-[#4D0D19] to-[#25050A] border-y border-[#D4AF37]/35 overflow-hidden">
      {/* Decorative Gold Filigree Shimmer */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" />
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#D4AF37]/15 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-[#D4AF37]/15 blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        
        {/* Left: Campaign Headline & Description */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A060B] rounded-full border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{language === 'en' ? activeCampaign.badge : activeCampaign.badgeTa}</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#FAF6EE]">
            {language === 'en' ? activeCampaign.title : activeCampaign.titleTa}
          </h3>

          <p className="text-xs sm:text-sm text-[#F3E5AB]/90 font-serif italic mt-1">
            {language === 'en' ? activeCampaign.subtitle : activeCampaign.subtitleTa}
          </p>

          <div className="mt-3 inline-block font-mono text-xs font-bold tracking-wider text-[#D4AF37] bg-[#1E060C] px-3 py-1 rounded border border-[#D4AF37]/30">
            {activeCampaign.discountTag}
          </div>
        </div>

        {/* Right: Live Ticking Countdown Timer */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-1.5 text-xs text-[#FAF6EE]/70 uppercase tracking-widest font-mono">
            <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Offer Ends In</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Days */}
            <div className="flex flex-col items-center bg-[#150407]/90 border border-[#D4AF37]/40 rounded-sm p-3 min-w-[64px] shadow-lg">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#F3E5AB] tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#FAF6EE]/60 mt-1">
                Days
              </span>
            </div>

            <span className="text-[#D4AF37] text-xl font-bold">:</span>

            {/* Hours */}
            <div className="flex flex-col items-center bg-[#150407]/90 border border-[#D4AF37]/40 rounded-sm p-3 min-w-[64px] shadow-lg">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#F3E5AB] tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#FAF6EE]/60 mt-1">
                Hours
              </span>
            </div>

            <span className="text-[#D4AF37] text-xl font-bold">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center bg-[#150407]/90 border border-[#D4AF37]/40 rounded-sm p-3 min-w-[64px] shadow-lg">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#F3E5AB] tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#FAF6EE]/60 mt-1">
                Mins
              </span>
            </div>

            <span className="text-[#D4AF37] text-xl font-bold">:</span>

            {/* Seconds */}
            <div className="flex flex-col items-center bg-[#150407]/90 border border-[#D4AF37]/40 rounded-sm p-3 min-w-[64px] shadow-lg">
              <span className="font-mono text-2xl sm:text-3xl font-bold text-[#D4AF37] tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#FAF6EE]/60 mt-1">
                Secs
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveCategoryFilter('Silk & Tissue Sarees');
              setCurrentView('category');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-2 px-6 py-2.5 bg-[#D4AF37] hover:bg-[#F3E5AB] text-[#140609] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-md"
          >
            {language === 'en' ? 'Shop Festive Collection' : 'ஆஃபர் புடவைகளை காண்க'}
          </button>
        </div>

      </div>
    </section>
  );
};
