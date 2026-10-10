import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Phone, Clock, Navigation, CheckCircle2, Share2, ExternalLink } from 'lucide-react';

export const StoreLocator: React.FC = () => {
  const { language } = useStore();
  const [copied, setCopied] = useState(false);

  const fullAddress = '65a, Nawab Thottam Main Road, Woraiyur, Tiruchirappalli, Tamil Nadu 620003';
  const mapsSearchQuery = '38, Nawab Thottam Main Rd';
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('38, Nawab Thottam Main Rd, Woraiyur, Tiruchirappalli, Tamil Nadu 620003')}`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('38, Nawab Thottam Main Rd, Woraiyur, Tiruchirappalli, Tamil Nadu 620003')}`;
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent('38, Nawab Thottam Main Rd, Woraiyur, Tiruchirappalli')}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`Gokulam Textile & Furniture, ${fullAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="store-location" className="relative py-24 bg-[#0A0305] border-t border-[#D4AF37]/20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'About Our Showroom · Woraiyur' : 'உறையூர் நேரடி ஷோரூம் · முகவரி'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF6EE]">
            {language === 'en'
              ? 'Visit Gokulam in Historic Woraiyur, Trichy'
              : 'வரலாற்றுச் சிறப்புமிக்க உறையூரில் எங்களை சந்தியுங்கள்'}
          </h2>
          <p className="text-sm text-[#FAF6EE]/75 font-light mt-2 leading-relaxed">
            {language === 'en'
              ? 'Conveniently located on Nawab Thottam Main Road, Woraiyur. Explore our multi-floor destination for bridal silks, everyday handlooms, and solid teak furniture.'
              : 'நவாப் தோட்டம் மெயின் ரோடு, உறையூர். திருமண பட்டு மற்றும் மர தளவாடங்களை நேரில் தொட்டுப் பார்த்து தேர்ந்தெடுக்க வாருங்கள்.'}
          </p>
        </div>

        {/* 2-Column Store Info + Interactive Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Contact, Directions, Timings (5 cols) */}
          <div className="lg:col-span-5 bg-[#140609] border border-[#D4AF37]/30 rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                    Showroom Address
                  </h4>
                  <p className="font-serif text-lg font-bold text-[#FAF6EE] mt-0.5">
                    Gokulam Furniture & Textile
                  </p>
                  <p className="text-sm text-[#FAF6EE] mt-1.5 font-medium leading-relaxed">
                    65a, Nawab Thottam Main Road
                  </p>
                  <p className="text-xs text-[#FAF6EE]/80 leading-relaxed">
                    Woraiyur, Tiruchirappalli, Tamil Nadu — 620003
                  </p>

                  <div className="mt-3 flex items-center gap-3">
                    <button
                      onClick={handleCopyAddress}
                      className="text-[11px] text-[#F3E5AB] hover:underline flex items-center gap-1 font-mono cursor-pointer"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>{copied ? '✓ Address Copied!' : 'Copy Full Address'}</span>
                    </button>
                    <span className="text-stone-600">·</span>
                    <a
                      href={googleMapsDirectionsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1 font-mono"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Map Search: {mapsSearchQuery}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4 border-t border-[#D4AF37]/15 pt-5">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                    Showroom Timings
                  </h4>
                  <p className="text-xs text-[#FAF6EE] mt-1">
                    Monday – Sunday: <span className="text-[#F3E5AB] font-mono font-bold">9:30 AM – 9:30 PM</span>
                  </p>
                  <p className="text-[11px] text-[#FAF6EE]/60 mt-0.5">
                    Open all 7 days during wedding seasons & Deepavali
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start gap-4 border-t border-[#D4AF37]/15 pt-5">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">
                    Direct Phone & WhatsApp
                  </h4>
                  <p className="text-sm font-mono font-bold text-[#F3E5AB] mt-1">
                    +91 94431 82741 / 0431 276 1894
                  </p>
                  <p className="text-[11px] text-[#FAF6EE]/60 mt-0.5">
                    Call for custom furniture dimensions or bridal video-call viewing
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-8 border-t border-[#D4AF37]/15 mt-6">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 bg-[#B8860B] hover:bg-[#D4AF37] text-[#140609] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors text-center flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                title="Get Directions on Google Maps"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Get Directions</span>
              </a>

              <a
                href="https://wa.me/919443182741?text=Hello%20Gokulam%20Textile%2C%20I%20would%20like%20to%20visit%20your%20Woraiyur%20showroom%20at%20Nawab%20Thottam%20Main%20Road."
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 bg-[#1F4529] hover:bg-[#285A35] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors text-center flex items-center justify-center gap-1.5 border border-emerald-500/40 shadow-md cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Right: Interactive Styled Google Map View (7 cols) */}
          <div className="lg:col-span-7 bg-[#140609] border border-[#D4AF37]/30 rounded-sm overflow-hidden shadow-2xl relative min-h-[440px] flex flex-col">
            {/* Embedded Live Google Maps Frame */}
            <div className="relative flex-1 w-full min-h-[360px] bg-[#160609]">
              <iframe
                title="Gokulam Textile & Furniture Location"
                src={googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '360px', filter: 'contrast(1.05) saturate(1.1)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[360px]"
              />

              {/* Floating Quick Navigation Chip over Map */}
              <div className="absolute top-4 left-4 z-10 bg-[#160609]/95 border border-[#D4AF37]/60 rounded-md p-3 shadow-xl backdrop-blur-md max-w-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#800020] border border-[#D4AF37] flex items-center justify-center text-[#F3E5AB] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-serif text-xs font-bold text-[#FAF6EE]">
                      Gokulam Textile & Furniture
                    </h5>
                    <p className="text-[10px] text-[#D4AF37] font-mono">
                      65a, Nawab Thottam Main Road
                    </p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between text-[10px]">
                  <span className="text-[#FAF6EE]/70">Directions: 38, Nawab Thottam Main Rd</span>
                  <a
                    href={googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F3E5AB] hover:underline font-bold flex items-center gap-0.5"
                  >
                    <span>Route</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Location Bar */}
            <div className="bg-[#1A060B] p-4 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-[#FAF6EE]/80">
                <span className="font-semibold text-[#D4AF37]">Address:</span>
                <span>65a, Nawab Thottam Main Road, Woraiyur, Trichy - 620003</span>
              </div>
              <a
                href={googleMapsSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#D4AF37] hover:text-[#F3E5AB] font-bold flex items-center gap-1 shrink-0"
              >
                <span>Search: "38, Nawab Thottam Main Rd" →</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
