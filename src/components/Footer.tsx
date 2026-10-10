import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Phone, Mail, MapPin, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language, setActiveCategoryFilter, setCurrentView } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleNav = (cat?: string) => {
    if (cat) {
      setActiveCategoryFilter(cat);
      setCurrentView('category');
    } else {
      setCurrentView('store');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080204] border-t border-[#D4AF37]/25 text-[#FAF6EE] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Newsletter & Wordmark Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#D4AF37]/15">
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="space-y-1">
              <span className="font-serif text-3xl font-bold tracking-tight text-[#FAF6EE] block">
                Gokulam
              </span>
              <span className="text-xs tracking-[0.25em] text-[#D4AF37] uppercase font-light block">
                Textile & Fine Furniture · Woraiyur, Trichy
              </span>
            </div>

            <p className="text-xs text-[#FAF6EE]/75 leading-relaxed font-light max-w-sm">
              {language === 'en'
                ? 'Serving families across Tiruchirappalli with pure Kanjivaram silks, everyday handloom cottons, and heirloom solid teakwood furniture since 1984.'
                : '1984 முதல் திருச்சி உறையூரில் தலைமுறை தலைமுறையாய் குடும்பங்களின் நம்பிக்கையை வென்ற பாரம்பரிய ஜவுளி மற்றும் தேக்கு மர தளவாடங்கள்.'}
            </p>

            <div className="pt-2 text-xs text-[#F3E5AB] font-serif italic">
              பாரம்பரியம் · தரம் · நம்பிக்கை
            </div>

            {/* Store Address Block */}
            <div className="pt-3 border-t border-[#D4AF37]/15 space-y-1 text-xs">
              <div className="flex items-start gap-2 text-[#FAF6EE]/90">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#FAF6EE] block">Woraiyur Showroom:</span>
                  <span className="text-[#FAF6EE]/80 block leading-relaxed">
                    65a, Nawab Thottam Main Road, Woraiyur, Tiruchirappalli, Tamil Nadu 620003
                  </span>
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=38%2C+Nawab+Thottam+Main+Rd%2C+Woraiyur%2C+Tiruchirappalli%2C+Tamil+Nadu+620003"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#D4AF37] hover:underline font-mono inline-flex items-center gap-1 mt-1 font-semibold"
                  >
                    <span>Google Maps Directions: 38, Nawab Thottam Main Rd →</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Categories (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
              Textiles
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF6EE]/70">
              <li>
                <button onClick={() => handleNav('Silk & Tissue Sarees')} className="hover:text-[#F3E5AB]">
                  Silk Sarees
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Cotton & Daily Sarees')} className="hover:text-[#F3E5AB]">
                  Cotton Handlooms
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Chudidars & Designer Wear')} className="hover:text-[#F3E5AB]">
                  Chudidar Sets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Kids & Family Ethnic Wear')} className="hover:text-[#F3E5AB]">
                  Men & Kids Ethnic
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Furniture (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
              Furniture & Home
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF6EE]/70">
              <li>
                <button onClick={() => handleNav('Furniture')} className="hover:text-[#F3E5AB]">
                  Teakwood Cots
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Pooja & Festive Home')} className="hover:text-[#F3E5AB]">
                  Pooja Mandapams
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Furniture')} className="hover:text-[#F3E5AB]">
                  Dining & Sofas
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('Home Furnishings')} className="hover:text-[#F3E5AB]">
                  Bedsheets & Drapes
                </button>
              </li>
            </ul>
          </div>

          {/* Festive Dispatch Newsletter (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
              Woraiyur Festival Dispatch
            </h4>
            <p className="text-xs text-[#FAF6EE]/70">
              Receive alerts for festive wedding arrivals, new loom batches, and in-store clearance.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter email address..."
                className="w-full px-3 py-2 bg-[#160609] border border-[#D4AF37]/30 rounded text-xs text-[#FAF6EE] focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#B8860B] hover:bg-[#D4AF37] text-[#140609] font-bold text-xs uppercase tracking-wider rounded transition-colors"
              >
                Join Store Circle
              </button>
            </form>
            {subscribed && (
              <span className="text-[11px] text-emerald-400 block flex items-center gap-1">
                <Check className="w-3 h-3" /> Subscribed successfully!
              </span>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF6EE]/50">
          <div>
            © 1984–{new Date().getFullYear()} Gokulam Textile & Furniture. Woraiyur, Tiruchirappalli, Tamil Nadu.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                const el = document.getElementById('store-location');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#FAF6EE]"
            >
              Directions
            </button>
            <a
              href="https://wa.me/919443182741"
              target="_blank"
              rel="noreferrer"
              className="text-[#D4AF37] hover:underline"
            >
              WhatsApp (+91 94431 82741)
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
