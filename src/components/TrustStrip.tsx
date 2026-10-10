import React from 'react';
import { useStore } from '../context/StoreContext';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Scissors, Award, Clock } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const { language } = useStore();

  const marqueePhrases = [
    'DEEPAVALI OFFERS LIVE IN STORE',
    'FREE CUSTOM BLOUSE STITCHING',
    'HANDLOOM SILK & SOLID TEAKWOOD UNDER ONE ROOF',
    'WORAIYUR MAIN ROAD · TIRUCHIRAPPALLI',
    'GENUINE 3G GOLD ZARI TESTED',
    'SERVING TAMIL FAMILIES SINCE 1984'
  ];

  const marqueePhrasesTa = [
    'தீபாவளி சிறப்பு தள்ளுபடி நேரடி கடையில்',
    'இலவச பிளவுஸ் தையல் சேவை',
    'அசல் பட்டு மற்றும் தேக்குமர தளவாடங்கள் ஒரே இடத்தில்',
    'உறையூர் மெயின் ரோடு · திருச்சி',
    'தலைமுறை தலைமுறையாய் உங்கள் குடும்பத்தின் தேர்வு'
  ];

  const phrases = language === 'en' ? marqueePhrases : marqueePhrasesTa;

  return (
    <div className="relative z-20 bg-[#160609] border-y border-[#D4AF37]/20 py-4 overflow-hidden">
      {/* Subtle Marquee Strip */}
      <div className="flex select-none whitespace-nowrap overflow-hidden">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
          className="flex items-center gap-10 whitespace-nowrap text-xs md:text-sm font-serif tracking-[0.2em] text-[#F3E5AB]/90 font-medium"
        >
          {phrases.concat(phrases).map((phrase, idx) => (
            <div key={idx} className="flex items-center gap-10">
              <span>{phrase}</span>
              <span className="text-[#D4AF37] opacity-60">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Trust Statements Grid */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-start gap-4 p-4 rounded bg-[#20080E]/40 border border-[#D4AF37]/15">
            <Award className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-serif font-bold text-[#FAF6EE]">
                {language === 'en' ? 'Purity & Heritage' : 'அசல் பாரம்பரியம்'}
              </h4>
              <p className="text-xs text-[#FAF6EE]/70 mt-1 leading-relaxed">
                {language === 'en'
                  ? 'Certified silk marks and tested pure silver-gilt zari weaves.'
                  : 'தூய பட்டு முத்திரை மற்றும் சோதிக்கப்பட்ட அசல் வெள்ளி-தங்க ஜரிகை.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded bg-[#20080E]/40 border border-[#D4AF37]/15">
            <Scissors className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-serif font-bold text-[#FAF6EE]">
                {language === 'en' ? 'In-House Master Tailoring' : 'பிரத்யேக தையல் கூடம்'}
              </h4>
              <p className="text-xs text-[#FAF6EE]/70 mt-1 leading-relaxed">
                {language === 'en'
                  ? 'Custom blouse measurements stitched within 48 hours for sarees.'
                  : 'உங்கள் அளவுக்கு ஏற்ப 48 மணி நேரத்தில் கச்சிதமான பிளவுஸ் தையல்.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded bg-[#20080E]/40 border border-[#D4AF37]/15">
            <Sparkles className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-serif font-bold text-[#FAF6EE]">
                {language === 'en' ? 'Furniture & Textiles Together' : 'தளவாடங்கள் & ஜவுளி'}
              </h4>
              <p className="text-xs text-[#FAF6EE]/70 mt-1 leading-relaxed">
                {language === 'en'
                  ? 'Complete home wedding trousseau and solid teak cots under one roof.'
                  : 'திருமண பட்டு முதல் கட்டில், பீரோ வரை அனைத்தும் ஒரே இடத்தில்.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded bg-[#20080E]/40 border border-[#D4AF37]/15">
            <MapPin className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-serif font-bold text-[#FAF6EE]">
                {language === 'en' ? 'Woraiyur Store Experience' : 'உறையூர் நேரடி ஷோரூம்'}
              </h4>
              <p className="text-xs text-[#FAF6EE]/70 mt-1 leading-relaxed">
                {language === 'en'
                  ? 'Spacious multi-floor showroom with dedicated bridal trial rooms.'
                  : 'குடும்பத்துடன் நேரில் வந்து பார்த்து தேர்ந்தெடுக்க விசாலமான ஷோரூம்.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
