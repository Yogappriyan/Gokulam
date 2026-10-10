import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { HERO_IMAGE, FESTIVE_COLLECTION_IMAGE } from '../data/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ChevronRight } from 'lucide-react';

interface DrapeStyle {
  id: string;
  name: string;
  nameTa: string;
  subtitle: string;
  subtitleTa: string;
  pleatsCount: string;
  palluStyle: string;
  occasion: string;
  description: string;
  descriptionTa: string;
  steps: string[];
  stepsTa: string[];
}

export const DrapeStyleGuide: React.FC = () => {
  const { language } = useStore();
  const [activeDrapeIndex, setActiveDrapeIndex] = useState(0);

  const drapeStyles: DrapeStyle[] = [
    {
      id: 'nivi',
      name: 'Classic Nivi Drape',
      nameTa: 'பாரம்பரிய நிவி உடை முறை',
      subtitle: 'The timeless South Indian wedding and festive drape',
      subtitleTa: 'தென்னிந்திய திருமணங்களின் கம்பீரமான நடைமுறை',
      pleatsCount: '6–7 Front Pleats (Gathered at navel)',
      palluStyle: 'Left Shoulder Pinned (Draped over arm)',
      occasion: 'Bridal Muhurtham, Festivals, Deepavali',
      description: 'The definitive royal silhouette. Accentuates heavy zari borders along the lower hem while creating a magnificent cascading pallu over the left arm.',
      descriptionTa: 'கீழ் விளிம்பில் உள்ள கனமான ஜரிகை பார்டரை வெளிப்படுத்தும் உன்னதமான உடை முறை.',
      steps: [
        'Tuck saree once around the waist starting right to left at the navel.',
        'Measure approximately 1 meter of pallu and throw over left shoulder.',
        'Make 6 to 7 crisp 5-inch pleats in front, gather evenly and tuck into petticoat.',
        'Adjust the pallu across the bust, pin securely with gold brooches.'
      ],
      stepsTa: [
        'தொப்புள் பகுதியில் இருந்து வலமிருந்து இடமாக ஒரு சுற்று சுற்றவும்.',
        'முந்தானை பகுதியை தோள்பட்டைக்கு பின்னால் அளந்து வைக்கவும்.',
        'முன்புறம் 6-7 மடிப்புகளை அழகாக மடித்து சொருகவும்.',
        'தோள்பட்டையில் முந்தானையை நேர்த்தியாக பின் செய்யவும்.'
      ]
    },
    {
      id: 'madisar',
      name: 'Iyer / Iyengar Madisar Drape',
      nameTa: 'பாரம்பரிய மடிசார் உடை முறை (9 கெஜம்)',
      subtitle: '9-Yard (9-Gajam) sacred South Indian temple heritage drape',
      subtitleTa: '9 கஜம் பட்டுக்கான புனித விசேஷ உடை',
      pleatsCount: 'Kacche (Trouser pleat back) + Front pleats',
      palluStyle: 'Wrapped around torso & pinned over right/left shoulder',
      occasion: 'Seemantham, Gruhapravesam, Vedic Ceremonies',
      description: 'A masterpiece of architectural drapery requiring 9 yards of pure silk. Combines trouser comfort with saree elegance for temple rituals.',
      descriptionTa: 'பூஜைகள் மற்றும் குடும்ப விசேஷங்களின் போது அணியப்படும் 9 முழ பட்டு பாரம்பரியம்.',
      steps: [
        'Tie the initial knot firmly at waist, leaving one-third length for kacche.',
        'Pass the bottom drape between legs and tuck firmly into center back waist.',
        'Create front pleats with remaining length.',
        'Wrap the pallu snugly around the waist and bring over shoulder.'
      ],
      stepsTa: [
        'இடுப்பில் முடிச்சிட்டு பின் பக்கமாக கச்சை மடிப்பை செருகவும்.',
        'கால்களுக்கு இடையில் எடுத்து பின்புறம் இழுத்து இறுக்கவும்.',
        'முன்புற மடிப்புகளை அடுக்கி உள்ளே வைக்கவும்.',
        'முந்தானையை உடலைச் சுற்றி தோளில் சுற்றவும்.'
      ]
    },
    {
      id: 'bengali',
      name: 'Royal Box Pleat / Contemporary Drape',
      nameTa: 'மாடர்ன் பாக்ஸ் மடிப்பு உடை முறை',
      subtitle: 'Modern sleek drape showcasing intricate temple borders',
      subtitleTa: 'புதுமைப் பெண்களுக்கான எளிய கம்பீர உடை',
      pleatsCount: 'Broad 8-inch box pleats',
      palluStyle: 'Open free-flowing pallu over arm',
      occasion: 'Receptions, Sangeet, Office Celebrations',
      description: 'Streamlined and effortless. Designed for lightweight tissue silks and art silks where unrestricted movement is desired.',
      descriptionTa: 'டிஷ்யூ சில்க் புடவைகளுக்கு எளிதாக அணியக்கூடிய நவீன முறை.',
      steps: [
        'Tuck standard waist turn.',
        'Create wide box pleats allowing border motif maximum visual canvas.',
        'Let pallu fall open across forearm without tight pleating.'
      ],
      stepsTa: [
        'இடுப்பில் ஒரு சுற்று சுற்றி பாக்ஸ் மடிப்புகளை அகலமாக எடுக்கவும்.',
        'முந்தானையை தோளில் தளர்வாக விழவிடவும்.'
      ]
    }
  ];

  const currentDrape = drapeStyles[activeDrapeIndex];

  return (
    <section className="relative py-24 bg-[#140609] border-t border-[#D4AF37]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Heritage Styling Masterclass' : 'புடவை அணியும் கலை'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6EE] leading-tight">
            {language === 'en' ? 'The Art of the South Indian Drape' : 'பட்டுப் புடவை நேர்த்தி வழிகாட்டி'}
          </h2>
          <p className="text-sm text-[#FAF6EE]/70 font-light mt-2">
            {language === 'en'
              ? 'Discover how to drape your Gokulam silk sarees with ease for weddings, temple pujas, and celebrations.'
              : 'உங்கள் விசேஷங்களுக்கு ஏற்ற அழகிய புடவை உடை முறைகளை அறிந்து கொள்ளுங்கள்.'}
          </p>

          {/* Interactive Drape Selector Tabs */}
          <div className="flex justify-center gap-2 mt-8 p-1.5 bg-[#20080E] rounded-full border border-[#D4AF37]/30 max-w-md mx-auto">
            {drapeStyles.map((style, idx) => (
              <button
                key={style.id}
                onClick={() => setActiveDrapeIndex(idx)}
                className={`flex-1 py-2 px-3 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                  activeDrapeIndex === idx
                    ? 'bg-[#B8860B] text-[#140609] shadow-md'
                    : 'text-[#FAF6EE]/80 hover:text-[#FAF6EE]'
                }`}
              >
                {language === 'en' ? style.name.split(' ')[0] : style.nameTa.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Drape Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#1A070B] border border-[#D4AF37]/30 rounded-sm p-6 sm:p-10 shadow-2xl">
          
          {/* Left: Drape Visual / Silhouette Display (5 cols) */}
          <div className="lg:col-span-5 relative h-[380px] sm:h-[440px] rounded overflow-hidden border border-[#D4AF37]/40 shadow-inner group">
            <img
              src={activeDrapeIndex === 0 ? HERO_IMAGE : FESTIVE_COLLECTION_IMAGE}
              alt={currentDrape.name}
              className="w-full h-full object-cover object-top filter brightness-90 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#140609] via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 bg-[#140609]/90 border border-[#D4AF37]/40 p-4 rounded backdrop-blur-md">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">
                {language === 'en' ? 'Recommended For' : 'பரிந்துரைக்கப்படும் விசேஷம்'}
              </span>
              <span className="text-sm font-serif font-bold text-[#F3E5AB]">
                {currentDrape.occasion}
              </span>
            </div>
          </div>

          {/* Right: Step-by-Step Instructions & Tailor Tips (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                {language === 'en' ? 'Technique Profile' : 'உடை விபரம்'}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF6EE] mt-1">
                {language === 'en' ? currentDrape.name : currentDrape.nameTa}
              </h3>
              <p className="text-xs sm:text-sm text-[#F3E5AB]/90 font-serif italic mt-0.5">
                {language === 'en' ? currentDrape.subtitle : currentDrape.subtitleTa}
              </p>
              <p className="text-xs sm:text-sm text-[#FAF6EE]/80 mt-3 leading-relaxed">
                {language === 'en' ? currentDrape.description : currentDrape.descriptionTa}
              </p>
            </div>

            {/* Quick Specs Strip */}
            <div className="grid grid-cols-2 gap-4 border-y border-[#D4AF37]/20 py-4 text-xs">
              <div>
                <span className="text-[#FAF6EE]/50 uppercase tracking-wider block text-[10px]">
                  Pleat Architecture
                </span>
                <span className="font-semibold text-[#FAF6EE] mt-0.5 block">
                  {currentDrape.pleatsCount}
                </span>
              </div>
              <div>
                <span className="text-[#FAF6EE]/50 uppercase tracking-wider block text-[10px]">
                  Pallu Placement
                </span>
                <span className="font-semibold text-[#FAF6EE] mt-0.5 block">
                  {currentDrape.palluStyle}
                </span>
              </div>
            </div>

            {/* Steps List */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] mb-3">
                {language === 'en' ? 'Step-by-Step Draping Guide' : 'அணியும் படிகள்'}
              </h4>
              <div className="space-y-2.5">
                {(language === 'en' ? currentDrape.steps : currentDrape.stepsTa).map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-3 text-xs sm:text-sm text-[#FAF6EE]/85">
                    <span className="w-5 h-5 rounded-full bg-[#B8860B]/20 text-[#D4AF37] border border-[#D4AF37]/40 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
