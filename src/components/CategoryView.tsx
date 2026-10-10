import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { CATEGORIES_LIST } from '../data/mockData';
import { Eye, ShoppingBag, Phone, Filter, ArrowUpDown, Scissors } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CategoryView: React.FC = () => {
  const {
    products,
    language,
    activeCategoryFilter,
    setActiveCategoryFilter,
    setQuickViewProduct,
    setStitchingProduct,
    addToCart,
    setCurrentView
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');

  const filteredProducts = products.filter(p => {
    if (activeCategoryFilter && p.category !== activeCategoryFilter) {
      return false;
    }
    if (selectedFabric !== 'all' && !p.fabric.toLowerCase().includes(selectedFabric.toLowerCase())) {
      return false;
    }
    return p.isPublished;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.salePrice || a.price;
    const priceB = b.salePrice || b.price;
    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const handleQuickAdd = (product: Product) => {
    if (product.isBlouseStitchingAvailable) {
      setStitchingProduct(product);
    } else {
      addToCart(product, product.colorVariants[0], product.sizeVariants[0]?.name, 1);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#0D0507] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Breadcrumb / Back */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => {
              setActiveCategoryFilter(null);
              setCurrentView('store');
            }}
            className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-mono"
          >
            ← {language === 'en' ? 'Back to Gokulam Home' : 'முகப்பிற்கு திரும்புக'}
          </button>
          <span className="text-xs text-[#FAF6EE]/60 font-mono">
            {sortedProducts.length} {language === 'en' ? 'Handcrafted Pieces' : 'பொருட்கள்'}
          </span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FAF6EE]">
            {activeCategoryFilter
              ? activeCategoryFilter
              : language === 'en'
              ? 'Complete Gokulam Catalog'
              : 'அனைத்து பொருட்கள்'}
          </h1>
          <p className="text-xs sm:text-sm text-[#F3E5AB]/80 font-serif italic mt-1">
            Woraiyur, Trichy · Textiles & Furniture Collection
          </p>
        </div>

        {/* Category Filter Horizontal Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-8 border-b border-[#D4AF37]/20">
          <button
            onClick={() => setActiveCategoryFilter(null)}
            className={`px-4 py-2 text-xs font-semibold rounded-sm whitespace-nowrap transition-colors ${
              activeCategoryFilter === null
                ? 'bg-[#D4AF37] text-[#140609]'
                : 'bg-[#18070B] text-[#FAF6EE]/70 hover:text-[#FAF6EE] border border-[#D4AF37]/20'
            }`}
          >
            All Products
          </button>
          {CATEGORIES_LIST.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategoryFilter(cat.name)}
              className={`px-4 py-2 text-xs font-semibold rounded-sm whitespace-nowrap transition-colors ${
                activeCategoryFilter === cat.name
                  ? 'bg-[#D4AF37] text-[#140609]'
                  : 'bg-[#18070B] text-[#FAF6EE]/70 hover:text-[#FAF6EE] border border-[#D4AF37]/20'
              }`}
            >
              {language === 'en' ? cat.name : cat.nameTa}
            </button>
          ))}
        </div>

        {/* Sort and Secondary Filters Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#140609] p-4 rounded border border-[#D4AF37]/25 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-[#FAF6EE]/60">Fabric / Material:</span>
            <select
              value={selectedFabric}
              onChange={e => setSelectedFabric(e.target.value)}
              className="bg-[#20080E] border border-[#D4AF37]/30 text-[#FAF6EE] rounded px-3 py-1.5 focus:outline-none"
            >
              <option value="all">All Materials</option>
              <option value="silk">Pure Silk</option>
              <option value="cotton">Handloom Cotton</option>
              <option value="teak">Solid Teakwood</option>
              <option value="sheesham">Sheesham Wood</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[#FAF6EE]/60">Sort By:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-[#20080E] border border-[#D4AF37]/30 text-[#FAF6EE] rounded px-3 py-1.5 focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <motion.div
              layout
              key={product.id}
              className="bg-[#140609] border border-[#D4AF37]/25 rounded-sm overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37]/70 hover:shadow-[0_8px_30px_rgba(212,175,55,0.18)] transition-all duration-300"
            >
              {/* Image Frame */}
              <div
                className="relative h-[340px] w-full overflow-hidden bg-[#1E080E] cursor-pointer"
                onClick={() => setQuickViewProduct(product)}
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {product.images[1] && (
                  <img
                    src={product.images[1]}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                  />
                )}

                {product.salePrice && (
                  <div className="absolute top-3 left-3 bg-[#800020] text-[#F3E5AB] text-[10px] tracking-wider uppercase font-semibold px-2 py-0.5 border border-[#D4AF37]/40 shadow-sm">
                    SPECIAL OFFER
                  </div>
                )}

                {/* Quick actions hover */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setQuickViewProduct(product);
                    }}
                    className="flex-1 py-2 bg-[#1A060B]/90 hover:bg-[#25080F] text-[#FAF6EE] text-xs font-medium border border-[#D4AF37]/40 rounded-sm flex items-center justify-center gap-1.5 backdrop-blur-md"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Quick View</span>
                  </button>

                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleQuickAdd(product);
                    }}
                    className="flex-1 py-2 bg-[#B8860B] hover:bg-[#D4AF37] text-[#140609] text-xs font-bold rounded-sm flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{product.isBlouseStitchingAvailable ? 'Add + Stitch' : 'Add to Bag'}</span>
                  </button>
                </div>
              </div>

              {/* Meta */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center gap-2 text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider mb-1">
                    <span>{product.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#FAF6EE]/60 lowercase">{product.fabric.split(' ')[0]}</span>
                  </div>

                  <h3
                    onClick={() => setQuickViewProduct(product)}
                    className="font-serif text-base font-bold text-[#FAF6EE] group-hover:text-[#F3E5AB] transition-colors line-clamp-1 cursor-pointer"
                  >
                    {language === 'en' ? product.name : product.nameTa}
                  </h3>

                  <p className="text-xs text-[#FAF6EE]/70 line-clamp-2 mt-1 leading-relaxed">
                    {language === 'en' ? product.description : product.descriptionTa}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold font-mono text-[#F3E5AB]">
                      ₹{(product.salePrice || product.price).toLocaleString('en-IN')}
                    </span>
                    {product.salePrice && (
                      <span className="text-xs font-mono text-[#FAF6EE]/40 line-through ml-2">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Swatches */}
                  <div className="flex items-center gap-1.5">
                    {product.colorVariants.slice(0, 3).map((col, idx) => (
                      <span
                        key={idx}
                        className="w-3.5 h-3.5 rounded-full border border-[#D4AF37]/50"
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-20 text-[#FAF6EE]/60">
            <p>No products found matching the selected filter.</p>
            <button
              onClick={() => {
                setActiveCategoryFilter(null);
                setSelectedFabric('all');
              }}
              className="mt-3 text-xs text-[#D4AF37] underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Showroom Visit Banner */}
        <div className="mt-16 p-6 rounded-xl bg-[#140609] border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-lg font-bold text-[#F3E5AB]">
              Want to experience our sarees or teakwood furniture in person?
            </h4>
            <p className="text-xs text-[#FAF6EE]/80">
              Visit our Woraiyur showroom: <span className="text-[#FAF6EE] font-medium">65a, Nawab Thottam Main Road, Woraiyur, Tiruchirappalli, Tamil Nadu 620003</span>
            </p>
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=38%2C+Nawab+Thottam+Main+Rd%2C+Woraiyur%2C+Tiruchirappalli%2C+Tamil+Nadu+620003"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-[#B8860B] hover:bg-[#D4AF37] text-[#140609] font-bold text-xs uppercase tracking-wider rounded transition-colors whitespace-nowrap shadow-md shrink-0 cursor-pointer"
          >
            Directions (38, Nawab Thottam Main Rd) →
          </a>
        </div>
      </div>
    </div>
  );
};
