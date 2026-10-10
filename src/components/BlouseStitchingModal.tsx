import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, BlouseMeasurements } from '../types';
import { X, Scissors, Check, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const BlouseStitchingModal: React.FC = () => {
  const { stitchingProduct, setStitchingProduct, addToCart, language } = useStore();

  const [measurements, setMeasurements] = useState<BlouseMeasurements>({
    bust: '36',
    length: '14',
    waist: '30',
    sleeveLength: '10.5',
    sleeveType: 'Elbow Length with Zari Border',
    frontNeck: 'U-Neck 6.5"',
    backNeck: 'Deep Pot Neck with Dori & Latkans',
    notes: 'Woraiyur Store master tailoring request'
  });

  const [selectedColor, setSelectedColor] = useState(
    stitchingProduct?.colorVariants[0] || { name: 'Standard', nameTa: 'பொதுவானது', hex: '#800020' }
  );

  const [showGuide, setShowGuide] = useState(false);

  if (!stitchingProduct) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart(
      stitchingProduct,
      selectedColor,
      stitchingProduct.sizeVariants[0]?.name || 'Standard 6.2m',
      1,
      measurements
    );
    setStitchingProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-3xl bg-[#160609] border border-[#D4AF37]/50 shadow-2xl rounded-sm overflow-hidden my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-[#20080E] border-b border-[#D4AF37]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B8860B]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FAF6EE]">
                  {language === 'en' ? 'Book Complimentary Blouse Stitching' : 'இலவச பிளவுஸ் தையல் முன்பதிவு'}
                </h3>
                <p className="text-xs text-[#D4AF37]">
                  {language === 'en'
                    ? 'In-house master tailoring by Woraiyur artisans · Delivered with your saree'
                    : 'உறையூர் தலைமை தையல் கலைஞர்களால் தைக்கப்பட்டு புடவையுடன் அனுப்பப்படும்'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setStitchingProduct(null)}
              className="p-2 text-[#FAF6EE]/60 hover:text-[#FAF6EE] rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Saree Brief Card */}
            <div className="flex items-center gap-4 p-3 bg-[#240A10] border border-[#D4AF37]/20 rounded">
              <img
                src={stitchingProduct.images[0]}
                alt={stitchingProduct.name}
                className="w-16 h-16 object-cover rounded border border-[#D4AF37]/30"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider block font-medium">
                  {stitchingProduct.fabric}
                </span>
                <h4 className="font-serif text-sm font-bold text-[#FAF6EE]">
                  {stitchingProduct.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#FAF6EE]/70">Selected Colorway:</span>
                  <div className="flex items-center gap-1.5">
                    {stitchingProduct.colorVariants.map((col, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setSelectedColor(col)}
                        className={`w-4 h-4 rounded-full border transition-all ${
                          selectedColor.name === col.name
                            ? 'scale-125 border-[#FAF6EE] shadow-sm'
                            : 'border-[#D4AF37]/40'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      />
                    ))}
                    <span className="text-xs text-[#F3E5AB] font-medium ml-1">
                      {selectedColor.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Measurement Guide Toggle Button */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                Enter Body Measurements (Inches)
              </span>
              <button
                type="button"
                onClick={() => setShowGuide(!showGuide)}
                className="text-xs text-[#F3E5AB] hover:underline flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showGuide ? 'Hide Diagram' : 'View Measurement Diagram'}</span>
              </button>
            </div>

            {/* Measurement Diagram SVG */}
            {showGuide && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 bg-[#110406] border border-[#D4AF37]/30 rounded text-center text-xs text-[#FAF6EE]/80 space-y-2"
              >
                <div className="font-serif font-semibold text-[#F3E5AB]">
                  Standard South Indian Blouse Measurement Blueprint
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-2">
                  <div className="p-2 bg-[#20080E] rounded border border-[#D4AF37]/20">
                    <span className="text-[#D4AF37] block font-bold">1. Bust</span>
                    <span>Measure around fullest point</span>
                  </div>
                  <div className="p-2 bg-[#20080E] rounded border border-[#D4AF37]/20">
                    <span className="text-[#D4AF37] block font-bold">2. Length</span>
                    <span>Shoulder to above waist (13-15")</span>
                  </div>
                  <div className="p-2 bg-[#20080E] rounded border border-[#D4AF37]/20">
                    <span className="text-[#D4AF37] block font-bold">3. Sleeve</span>
                    <span>Shoulder to elbow (10-12")</span>
                  </div>
                  <div className="p-2 bg-[#20080E] rounded border border-[#D4AF37]/20">
                    <span className="text-[#D4AF37] block font-bold">4. Back Neck</span>
                    <span>Depth from shoulder seam</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs text-[#FAF6EE]/80 mb-1">
                  Bust (Chest) <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={measurements.bust}
                  onChange={e => setMeasurements({ ...measurements, bust: e.target.value })}
                  placeholder="e.g. 36 inches"
                  className="w-full px-3 py-2 bg-[#20080E] border border-[#D4AF37]/30 rounded text-sm text-[#FAF6EE] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#FAF6EE]/80 mb-1">
                  Blouse Length <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={measurements.length}
                  onChange={e => setMeasurements({ ...measurements, length: e.target.value })}
                  placeholder="e.g. 14 inches"
                  className="w-full px-3 py-2 bg-[#20080E] border border-[#D4AF37]/30 rounded text-sm text-[#FAF6EE] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#FAF6EE]/80 mb-1">
                  Waist <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={measurements.waist}
                  onChange={e => setMeasurements({ ...measurements, waist: e.target.value })}
                  placeholder="e.g. 30 inches"
                  className="w-full px-3 py-2 bg-[#20080E] border border-[#D4AF37]/30 rounded text-sm text-[#FAF6EE] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#FAF6EE]/80 mb-1">
                  Sleeve Length <span className="text-[#D4AF37]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={measurements.sleeveLength}
                  onChange={e => setMeasurements({ ...measurements, sleeveLength: e.target.value })}
                  placeholder="e.g. 11 inches"
                  className="w-full px-3 py-2 bg-[#20080E] border border-[#D4AF37]/30 rounded text-sm text-[#FAF6EE] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Sleeve Type & Neck Design Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-[#FAF6EE]/80 mb-1">Sleeve Style</label>
                <select
                  value={measurements.sleeveType}
                  onChange={e => setMeasurements({ ...measurements, sleeveType: e.target.value })}
                  className="w-full px-3 py-2 bg-[#20080E] border border-[#D4AF37]/30 rounded text-xs text-[#FAF6EE] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Elbow Length with Zari Border">Elbow Length with Zari Border</option>
                  <option value="Short Cap Sleeve (5 inches)">Short Cap Sleeve (5 inches)</option>
                  <option value="Full Sleeve Brocade">Full Sleeve Brocade</option>
                  <option value="Sleeveless with Piping">Sleeveless with Piping</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#FAF6EE]/80 mb-1">Front Neck Style</label>
                <select
                  value={measurements.frontNeck}
                  onChange={e => setMeasurements({ ...measurements, frontNeck: e.target.value })}
                  className="w-full px-3 py-2 bg-[#20080E] border border-[#D4AF37]/30 rounded text-xs text-[#FAF6EE] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="U-Neck 6.5 inches">U-Neck (6.5")</option>
                  <option value="Sweetheart Neck">Sweetheart Neck</option>
                  <option value="V-Neck Deep">V-Neck Deep</option>
                  <option value="Boat Neck High">Boat Neck High</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#FAF6EE]/80 mb-1">Back Neck Style</label>
                <select
                  value={measurements.backNeck}
                  onChange={e => setMeasurements({ ...measurements, backNeck: e.target.value })}
                  className="w-full px-3 py-2 bg-[#20080E] border border-[#D4AF37]/30 rounded text-xs text-[#FAF6EE] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="Deep Pot Neck with Dori & Latkans">Deep Pot Neck with Dori & Latkans</option>
                  <option value="Square Back Neck with Gold Piping">Square Back Neck with Gold Piping</option>
                  <option value="Closed High Neck with Keyhole">Closed High Neck with Keyhole</option>
                  <option value="Temple Arch Cutout">Temple Arch Cutout</option>
                </select>
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="block text-xs text-[#FAF6EE]/80 mb-1">
                Special Instructions for Woraiyur Tailor (Optional)
              </label>
              <input
                type="text"
                value={measurements.notes}
                onChange={e => setMeasurements({ ...measurements, notes: e.target.value })}
                placeholder="e.g. Please add extra margin inside; attach golden tassels"
                className="w-full px-3 py-2 bg-[#20080E] border border-[#D4AF37]/30 rounded text-xs text-[#FAF6EE] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#D4AF37]/20">
              <button
                type="button"
                onClick={() => setStitchingProduct(null)}
                className="px-5 py-2.5 text-xs text-[#FAF6EE]/70 hover:text-[#FAF6EE] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#B8860B] hover:bg-[#D4AF37] text-[#140609] font-bold text-xs uppercase tracking-wider rounded-sm transition-colors shadow-lg flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Confirm & Add to Bag</span>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
