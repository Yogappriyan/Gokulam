import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, ShoppingBag, Phone, Scissors, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    setStitchingProduct,
    language
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');

  if (!quickViewProduct) return null;

  const currentColor = quickViewProduct.colorVariants[selectedColorIndex] || quickViewProduct.colorVariants[0];

  const handleAddBag = () => {
    addToCart(
      quickViewProduct,
      currentColor,
      selectedSize || quickViewProduct.sizeVariants[0]?.name,
      1
    );
    setQuickViewProduct(null);
  };

  const handleStitch = () => {
    const prod = quickViewProduct;
    setQuickViewProduct(null);
    setStitchingProduct(prod);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-[#140609] border border-[#D4AF37]/50 rounded-sm shadow-2xl overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 text-[#FAF6EE]/70 hover:text-[#FAF6EE] bg-[#20080E]/80 rounded-full border border-[#D4AF37]/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Gallery Column (6 cols) */}
            <div className="md:col-span-6 bg-[#18070B] p-6 flex flex-col justify-between">
              <div className="h-[360px] sm:h-[420px] rounded overflow-hidden relative border border-[#D4AF37]/30">
                <img
                  src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {quickViewProduct.salePrice && (
                  <div className="absolute top-3 left-3 bg-[#800020] text-[#F3E5AB] text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 border border-[#D4AF37]/40">
                    FESTIVE SPECIAL
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex gap-2.5 mt-4">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-[#D4AF37]' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img
                        src={img}
                        alt="Thumbnail"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta Column (6 cols) */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-[11px] text-[#D4AF37] font-semibold uppercase tracking-widest">
                  {quickViewProduct.category} · {quickViewProduct.fabric}
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF6EE] mt-1">
                  {language === 'en' ? quickViewProduct.name : quickViewProduct.nameTa}
                </h3>

                <p className="text-xs text-[#FAF6EE]/75 mt-2 leading-relaxed">
                  {language === 'en' ? quickViewProduct.description : quickViewProduct.descriptionTa}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-3 mt-4">
                  <span className="font-mono text-2xl font-bold text-[#F3E5AB]">
                    ₹{(quickViewProduct.salePrice || quickViewProduct.price).toLocaleString('en-IN')}
                  </span>
                  {quickViewProduct.salePrice && (
                    <span className="font-mono text-sm text-[#FAF6EE]/40 line-through">
                      ₹{quickViewProduct.price.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Color Variants */}
                <div className="mt-5">
                  <span className="text-xs text-[#FAF6EE]/70 block mb-2 font-medium">
                    Colour Palette: <span className="text-[#F3E5AB]">{currentColor.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {quickViewProduct.colorVariants.map((col, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`w-6 h-6 rounded-full border-2 transition-transform ${
                          selectedColorIndex === idx
                            ? 'scale-125 border-[#FAF6EE] shadow-md'
                            : 'border-[#D4AF37]/50'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes or Dimensions */}
                {quickViewProduct.dimensions && (
                  <div className="mt-4 text-xs text-[#FAF6EE]/70">
                    <span className="block font-medium text-[#FAF6EE]/50 uppercase tracking-wider text-[10px]">
                      Dimensions / Length
                    </span>
                    <span className="text-[#FAF6EE] mt-0.5 block">{quickViewProduct.dimensions}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-[#D4AF37]/15">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddBag}
                    className="py-3 bg-[#B8860B] hover:bg-[#D4AF37] text-[#140609] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <a
                    href={`https://wa.me/919443182741?text=Hello%20Gokulam%20Textile,%20I%20want%20to%20enquire%20about%20${encodeURIComponent(
                      quickViewProduct.name
                    )}%20(SKU:%20${quickViewProduct.sku})`}
                    target="_blank"
                    rel="noreferrer"
                    className="py-3 bg-[#1F4529] hover:bg-[#285A35] text-white font-bold text-xs uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-1.5 border border-emerald-500/40 text-center"
                  >
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp Us</span>
                  </a>
                </div>

                {quickViewProduct.isBlouseStitchingAvailable && (
                  <button
                    onClick={handleStitch}
                    className="w-full py-2.5 bg-[#25080E] hover:bg-[#340B13] border border-[#D4AF37]/50 text-[#F3E5AB] font-semibold text-xs tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Scissors className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Book Custom Blouse Stitching for this Saree</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
