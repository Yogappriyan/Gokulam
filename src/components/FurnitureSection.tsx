import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FURNITURE_LIVING_IMAGE } from '../data/mockData';
import { Bed, Home, Sparkles, ChevronDown, Check, Calculator, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlacedItem {
  id: string;
  name: string;
  x: number;
  y: number;
  type: string;
}

export const FurnitureSection: React.FC = () => {
  const { language, products, addToCart, setIsCartOpen } = useStore();
  const [selectedFurnitureId, setSelectedFurnitureId] = useState<string>('prod-6');
  const [emiTenure, setEmiTenure] = useState<number>(6);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Room Visualizer State
  const [roomItems, setRoomItems] = useState<PlacedItem[]>([
    { id: '1', name: 'Solid Teak King Bed', x: 20, y: 25, type: 'bed' },
    { id: '2', name: 'Sheesham Pooja Mandapam', x: 70, y: 15, type: 'pooja' },
    { id: '3', name: 'Heritage Teak Sofa', x: 45, y: 65, type: 'sofa' }
  ]);

  const furnitureProducts = products.filter(
    p => p.category === 'Furniture' || p.category === 'Pooja & Festive Home'
  );

  const currentProduct = furnitureProducts.find(p => p.id === selectedFurnitureId) || furnitureProducts[0];

  const calculateEmi = (price: number, months: number) => {
    return Math.round(price / months);
  };

  const handleDragEnd = (id: string, info: { point: { x: number; y: number } }, containerRect?: DOMRect) => {
    // Keep within bounds
    setRoomItems(prev =>
      prev.map(item => (item.id === id ? { ...item } : item))
    );
  };

  const addVisualizerItem = (type: string, name: string) => {
    const newItem: PlacedItem = {
      id: `vis-${Date.now()}`,
      name,
      x: 35 + Math.random() * 20,
      y: 35 + Math.random() * 20,
      type
    };
    setRoomItems(prev => [...prev, newItem]);
  };

  return (
    <section id="furniture-section" className="relative py-28 bg-[#0D0507] overflow-hidden">
      {/* Background Ambient Diya Glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#3E2723]/25 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
            <Home className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Gokulam Fine Furniture' : 'கோகுலம் தேக்குமர தளவாடங்கள்'}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF6EE] leading-tight">
            {language === 'en'
              ? 'Handcrafted Teak & Rosewood for Generations'
              : 'தலைமுறைகள் கடந்து நிலைத்து நிற்கும் தேக்கு மர கட்டில்கள்'}
          </h2>
          <p className="text-sm sm:text-base text-[#FAF6EE]/75 font-light mt-3">
            {language === 'en'
              ? 'Seasoned solid wood crafted by master carpenters in Tiruchirappalli. From grand wedding cots to divine pooja units.'
              : 'திருச்சி கைவினைக் கலைஞர்களால் செய்யப்பட்ட உறுதி வாய்ந்த கட்டில், பீரோ, டைனிங் டேபிள் மற்றும் பூஜை மண்டபங்கள்.'}
          </p>
        </div>

        {/* 2-Column Split: Visualizer on Left, Purchase & EMI Module on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Room Visualiser Lite Canvas (7 cols) */}
          <div className="lg:col-span-7 bg-[#140609] border border-[#D4AF37]/30 rounded-sm p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#D4AF37]/15">
              <div>
                <h3 className="text-sm font-serif font-bold text-[#F3E5AB]">
                  {language === 'en' ? 'Interactive Room Visualiser Lite' : 'அறை தளவாட அலங்கார பலகை'}
                </h3>
                <p className="text-[11px] text-[#FAF6EE]/60">
                  {language === 'en' ? 'Drag furniture pieces to arrange your ideal room layout' : 'உங்கள் விருப்பப்படி கட்டில், சோபாவை நகர்த்தி வையுங்கள்'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Snap Grid</span>
              </div>
            </div>

            {/* Room Canvas Floor Grid */}
            <div
              className="relative w-full h-[360px] sm:h-[420px] bg-[#1A0B0E] rounded border border-[#D4AF37]/20 overflow-hidden shadow-inner flex items-center justify-center"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(212,175,55,0.08) 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            >
              {/* Floor Plan Markings */}
              <div className="absolute top-2 left-3 text-[10px] text-[#FAF6EE]/40 uppercase tracking-widest font-mono">
                Master Suite (14ft × 16ft)
              </div>
              <div className="absolute bottom-2 right-3 text-[10px] text-[#D4AF37]/60 uppercase tracking-widest font-mono">
                Woraiyur Heritage Dimension
              </div>

              {/* Room items draggable */}
              {roomItems.map(item => (
                <motion.div
                  key={item.id}
                  drag
                  dragConstraints={{ left: -140, right: 140, top: -120, bottom: 120 }}
                  dragElastic={0.1}
                  whileDrag={{ scale: 1.08, zIndex: 50 }}
                  className="absolute cursor-grab active:cursor-grabbing p-3 rounded bg-[#2D0D14]/90 border border-[#D4AF37]/60 shadow-[0_8px_20px_rgba(0,0,0,0.6)] backdrop-blur-sm flex flex-col items-center gap-1 select-none"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <Bed className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-[10px] font-bold text-[#F3E5AB] whitespace-nowrap">
                    {item.name}
                  </span>
                  <span className="text-[8px] text-[#FAF6EE]/50 font-mono">Drag to move</span>
                </motion.div>
              ))}
            </div>

            {/* Quick Add Furniture Props into Visualizer */}
            <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 flex flex-wrap items-center gap-2">
              <span className="text-xs text-[#FAF6EE]/70 font-medium">Add to layout:</span>
              <button
                onClick={() => addVisualizerItem('bed', 'King Teak Bed')}
                className="text-xs px-2.5 py-1 bg-[#20080E] hover:bg-[#320C17] text-[#F3E5AB] border border-[#D4AF37]/30 rounded transition-colors"
              >
                + King Cot
              </button>
              <button
                onClick={() => addVisualizerItem('pooja', 'Pooja Unit')}
                className="text-xs px-2.5 py-1 bg-[#20080E] hover:bg-[#320C17] text-[#F3E5AB] border border-[#D4AF37]/30 rounded transition-colors"
              >
                + Pooja Mandapam
              </button>
              <button
                onClick={() => addVisualizerItem('dining', 'Rosewood Dining')}
                className="text-xs px-2.5 py-1 bg-[#20080E] hover:bg-[#320C17] text-[#F3E5AB] border border-[#D4AF37]/30 rounded transition-colors"
              >
                + 6-Seater Dining
              </button>
              <button
                onClick={() => setRoomItems([
                  { id: '1', name: 'Solid Teak King Bed', x: 25, y: 30, type: 'bed' },
                  { id: '2', name: 'Sheesham Pooja Mandapam', x: 75, y: 20, type: 'pooja' }
                ])}
                className="text-xs px-2.5 py-1 text-[#FAF6EE]/50 hover:text-[#FAF6EE] ml-auto transition-colors"
              >
                Reset Layout
              </button>
            </div>
          </div>

          {/* Right Column: Featured Furniture Specs, Price & EMI Accordion (5 cols) */}
          <div className="lg:col-span-5 bg-[#140609] border border-[#D4AF37]/30 rounded-sm p-6 shadow-2xl space-y-6">
            
            {/* Furniture Selector Pills */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold block mb-2">
                {language === 'en' ? 'Select Showroom Piece' : 'மர சாமான்களை தேர்வு செய்க'}
              </span>
              <div className="grid grid-cols-2 gap-2">
                {furnitureProducts.slice(0, 4).map(prod => (
                  <button
                    key={prod.id}
                    onClick={() => setSelectedFurnitureId(prod.id)}
                    className={`p-2.5 rounded text-left border transition-all text-xs flex flex-col gap-1 ${
                      selectedFurnitureId === prod.id
                        ? 'bg-[#2A0A10] border-[#D4AF37] text-[#FAF6EE]'
                        : 'bg-[#18080C] border-[#D4AF37]/20 text-[#FAF6EE]/70 hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <span className="font-serif font-bold line-clamp-1">{prod.name}</span>
                    <span className="text-[#F3E5AB] font-mono font-semibold">
                      ₹{(prod.salePrice || prod.price).toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Product Spotlight Card */}
            {currentProduct && (
              <div className="border-t border-[#D4AF37]/15 pt-5 space-y-4">
                <div className="h-44 rounded overflow-hidden relative border border-[#D4AF37]/25">
                  <img
                    src={currentProduct.images[0] || FURNITURE_LIVING_IMAGE}
                    alt={currentProduct.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#120508]/90 px-2 py-0.5 text-[10px] text-[#D4AF37] font-mono border border-[#D4AF37]/30">
                    {currentProduct.dimensions}
                  </div>
                </div>

                <div>
                  <h4 className="font-serif text-xl font-bold text-[#FAF6EE]">
                    {language === 'en' ? currentProduct.name : currentProduct.nameTa}
                  </h4>
                  <p className="text-xs text-[#FAF6EE]/70 mt-1 leading-relaxed">
                    {language === 'en' ? currentProduct.description : currentProduct.descriptionTa}
                  </p>
                </div>

                <div className="flex items-baseline justify-between pt-2">
                  <div>
                    <div className="text-xs text-[#FAF6EE]/60">Woraiyur Showroom Price</div>
                    <div className="text-2xl font-bold font-mono text-[#F3E5AB]">
                      ₹{(currentProduct.salePrice || currentProduct.price).toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold bg-[#2A080E] px-2 py-1 rounded border border-[#D4AF37]/30">
                      Solid Teak Wood
                    </span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => {
                      addToCart(
                        currentProduct,
                        currentProduct.colorVariants[0],
                        currentProduct.sizeVariants[0]?.name,
                        1
                      );
                      setIsCartOpen(true);
                    }}
                    className="py-3 bg-[#B8860B] hover:bg-[#D4AF37] text-[#140609] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors text-center shadow-md"
                  >
                    {language === 'en' ? 'Order For Delivery' : 'ஆர்டர் செய்க'}
                  </button>

                  <a
                    href={`https://wa.me/919443182741?text=Hello%20Gokulam%20Textile%20%26%20Furniture,%20I%20am%20interested%20in%20${encodeURIComponent(
                      currentProduct.name
                    )}%20(Price:%20Rs.${currentProduct.salePrice || currentProduct.price}).%20Please%20share%20delivery%20details.`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 bg-[#1F4529] hover:bg-[#285A35] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors text-center flex items-center justify-center gap-1.5 border border-emerald-500/40"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>WhatsApp Quote</span>
                  </a>
                </div>

                {/* EMI & Store Finance Accordion */}
                <div className="border border-[#D4AF37]/25 rounded bg-[#1A070B] overflow-hidden">
                  <button
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                    className="w-full p-3.5 flex items-center justify-between text-left text-xs font-semibold text-[#F3E5AB] hover:bg-[#240A10] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-[#D4AF37]" />
                      <span>Woraiyur Easy EMI Options (0% Interest Available)</span>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#D4AF37] transition-transform ${
                        isAccordionOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isAccordionOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-3.5 pb-4 pt-1 border-t border-[#D4AF37]/15 text-xs text-[#FAF6EE]/80 space-y-3"
                      >
                        <div className="flex items-center justify-between text-[11px] text-[#FAF6EE]/60">
                          <span>Select Tenure:</span>
                          <div className="flex gap-2">
                            {[3, 6, 9, 12].map(m => (
                              <button
                                key={m}
                                onClick={() => setEmiTenure(m)}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                  emiTenure === m
                                    ? 'bg-[#D4AF37] text-[#140609] font-bold'
                                    : 'bg-[#280B10] text-[#FAF6EE]/70 hover:text-[#FAF6EE]'
                                }`}
                              >
                                {m} Mos
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="p-2.5 rounded bg-[#2A0E15] border border-[#D4AF37]/30 flex items-center justify-between">
                          <span>Monthly Instalment:</span>
                          <span className="font-mono font-bold text-[#F3E5AB] text-sm">
                            ₹
                            {calculateEmi(
                              currentProduct.salePrice || currentProduct.price,
                              emiTenure
                            ).toLocaleString('en-IN')}{' '}
                            / month
                          </span>
                        </div>

                        <p className="text-[10px] text-[#FAF6EE]/60 leading-normal">
                          ✦ Instant approval with Bajaj Finserv, HDFC, TVS Credit at our Woraiyur showroom. Free home delivery and installation across Trichy.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
