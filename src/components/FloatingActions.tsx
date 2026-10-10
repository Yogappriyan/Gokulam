import React from 'react';
import { Phone, Navigation, Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { motion } from 'motion/react';

export const FloatingActions: React.FC = () => {
  const { cart, setIsCartOpen, language } = useStore();
  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* WhatsApp & Directions Pill Chip */}
      <div className="flex items-center gap-2 p-1.5 bg-[#140609]/95 backdrop-blur-md rounded-full border border-[#D4AF37]/50 shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/919443182741?text=Hello%20Gokulam%20Textile%20%26%20Furniture%2C%20Woraiyur%2C%20Trichy."
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1F4529] hover:bg-[#2A5E38] text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
          title="Chat with Woraiyur Store on WhatsApp"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-300" />
          <span className="hidden sm:inline">
            {language === 'en' ? 'WhatsApp Us' : 'வாட்ஸ்அப்'}
          </span>
        </a>

        {/* Directions Button */}
        <a
          href="https://www.google.com/maps/dir/?api=1&destination=38%2C+Nawab+Thottam+Main+Rd%2C+Woraiyur%2C+Tiruchirappalli%2C+Tamil+Nadu+620003"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2A0A10] hover:bg-[#3E1019] text-[#F3E5AB] text-xs font-semibold tracking-wide transition-all border border-[#D4AF37]/30"
          title="Get Directions: 38, Nawab Thottam Main Rd, Woraiyur"
        >
          <Navigation className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="hidden sm:inline">
            {language === 'en' ? 'Directions' : 'திசைகள்'}
          </span>
        </a>

        {/* Bag floating shortcut */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 rounded-full bg-[#B8860B] hover:bg-[#D4AF37] text-[#140609] transition-all shadow-md"
          title="Open Bag"
        >
          <ShoppingBag className="w-4 h-4" />
          {totalCount > 0 && (
            <motion.span
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              key={totalCount}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#800020] text-white text-[9px] font-bold flex items-center justify-center border border-[#D4AF37]"
            >
              {totalCount}
            </motion.span>
          )}
        </button>
      </div>
    </div>
  );
};
