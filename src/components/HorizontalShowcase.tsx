import React, { useRef, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { ArrowLeft, ArrowRight, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const HorizontalShowcase: React.FC = () => {
  const { products, language, addToCart, setQuickViewProduct, setStitchingProduct } = useStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Filter curated festive items
  const festiveItems = products.filter(
    p => p.occasion?.includes('Deepavali') || p.category.includes('Silk') || p.isFeatured
  );

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
    }
  };

  const scrollBy = (offset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleQuickAdd = (product: Product) => {
    if (product.isBlouseStitchingAvailable) {
      setStitchingProduct(product);
    } else {
      addToCart(product, product.colorVariants[0], product.sizeVariants[0]?.name, 1);
    }
  };

  return (
    <section id="horizontal-showcase" className="relative py-24 bg-[#0D0507] overflow-hidden">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#800020]/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 blur-[130px] pointer-events-none rounded-full" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 mb-2 text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Curated Festive Edit' : 'தீபாவளி பிரத்யேக கலெக்ஷன்'}</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#FAF6EE] tracking-tight">
            {language === 'en' ? 'The Deepavali Silk Showcase' : 'தீபாவளி பட்டு மாலை'}
          </h2>
          <p className="text-sm md:text-base text-[#FAF6EE]/70 font-light mt-2 max-w-xl">
            {language === 'en'
              ? 'Woven with gold zari, worn with timeless grace. Each drape reflects generations of craftsmanship in Woraiyur.'
              : 'பாரம்பரிய கைத்தறி பட்டுப் புடவைகள் மற்றும் பிரத்யேக திருமண டிசைன்கள்.'}
          </p>
        </div>

        {/* Carousel Controls & Progress */}
        <div className="flex items-center gap-4">
          {/* Progress Indicator */}
          <div className="w-28 h-1 bg-[#23080E] rounded-full overflow-hidden hidden sm:block">
            <div
              className="h-full bg-[#D4AF37] transition-all duration-150"
              style={{ width: `${Math.max(10, scrollProgress)}%` }}
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollBy(-420)}
              aria-label="Previous items"
              className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#140609] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollBy(420)}
              aria-label="Next items"
              className="w-10 h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#140609] transition-all"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="relative">
        {/* Edge Fade Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-8 md:w-16 bg-gradient-to-r from-[#0D0507] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-8 md:w-16 bg-gradient-to-l from-[#0D0507] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-6 md:px-16 pb-8 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {festiveItems.map((product) => (
            <div
              key={product.id}
              className="shrink-0 w-[290px] sm:w-[340px] md:w-[380px] bg-[#140609] border border-[#D4AF37]/25 rounded-sm overflow-hidden flex flex-col justify-between group snap-start transition-all duration-300 hover:border-[#D4AF37]/70 hover:shadow-[0_8px_30px_rgba(212,175,55,0.18)]"
            >
              {/* Product Card Image Container with Dual Image Crossfade */}
              <div
                className="relative h-[380px] w-full overflow-hidden bg-[#1E080E] cursor-pointer"
                data-cursor="view"
                onClick={() => setQuickViewProduct(product)}
              >
                {/* Primary Image */}
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Secondary Image on Hover */}
                {product.images[1] && (
                  <img
                    src={product.images[1]}
                    alt={`${product.name} alternate view`}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                  />
                )}

                {/* Subtle scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#140609] via-transparent to-black/20" />

                {/* Tag */}
                {product.salePrice && (
                  <div className="absolute top-3 left-3 bg-[#800020] text-[#F3E5AB] text-[10px] tracking-wider uppercase font-semibold px-2.5 py-1 border border-[#D4AF37]/40 shadow-md">
                    FESTIVE OFFER
                  </div>
                )}

                {/* Hover Action Bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="flex-1 py-2 bg-[#1A060B]/90 hover:bg-[#25080F] text-[#FAF6EE] text-xs font-medium border border-[#D4AF37]/40 rounded-sm flex items-center justify-center gap-1.5 backdrop-blur-md transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Quick View</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleQuickAdd(product);
                    }}
                    className="flex-1 py-2 bg-[#B8860B] hover:bg-[#D4AF37] text-[#140609] text-xs font-bold rounded-sm flex items-center justify-center gap-1.5 shadow-md transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{product.isBlouseStitchingAvailable ? 'Add + Stitch' : 'Add to Bag'}</span>
                  </button>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-[#D4AF37] font-medium tracking-wider uppercase mb-1">
                    <span>{language === 'en' ? product.category : product.categoryTa}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#FAF6EE]/60 lowercase">{product.fabric.split(' ')[0]}</span>
                  </div>

                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="font-serif text-lg font-bold text-[#FAF6EE] group-hover:text-[#F3E5AB] transition-colors line-clamp-1 cursor-pointer"
                  >
                    {language === 'en' ? product.name : product.nameTa}
                  </h3>

                  <p className="text-xs text-[#FAF6EE]/70 line-clamp-2 mt-1 leading-relaxed">
                    {language === 'en' ? product.description : product.descriptionTa}
                  </p>
                </div>

                {/* Price and Color Swatches */}
                <div className="mt-4 pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold font-mono tabular-nums text-[#F3E5AB]">
                        ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                      </span>
                      {product.salePrice && (
                        <span className="text-xs font-mono tabular-nums text-[#FAF6EE]/40 line-through">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Swatches */}
                  <div className="flex items-center gap-1.5">
                    {product.colorVariants.slice(0, 3).map((col, idx) => (
                      <span
                        key={idx}
                        title={col.name}
                        className="w-3.5 h-3.5 rounded-full border border-[#D4AF37]/50 shadow-inner"
                        style={{ backgroundColor: col.hex }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
