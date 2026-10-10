import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, Search, Shield, User, LogOut, Check, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const {
    language,
    toggleLanguage,
    cart,
    wishlist,
    setIsCartOpen,
    setActiveCategoryFilter,
    setCurrentView,
    currentView,
    currentUser,
    logoutAdmin
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'textiles' | 'furniture' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalDocHeight > 0 ? (currentScrollY / totalDocHeight) * 100 : 0;
      setScrollProgress(progress);

      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (categoryName?: string) => {
    setActiveMegaMenu(null);
    setIsMobileMenuOpen(false);
    if (categoryName) {
      setActiveCategoryFilter(categoryName);
      setCurrentView('category');
    } else {
      setCurrentView('store');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdmin = currentView === 'admin';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isAdmin
            ? 'bg-white border-b border-[#E5E7EB] text-[#1C1917] shadow-sm'
            : isScrolled
            ? 'bg-[#140609]/95 backdrop-blur-md border-b border-[#D4AF37]/20 text-[#FAF6EE] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-gradient-to-b from-[#0D0507]/90 to-transparent text-[#FAF6EE]'
        }`}
      >
        <div className="max-w-[1520px] mx-auto px-6 h-20 flex items-center justify-between gap-6">
          {/* Zone 1: Brand title */}
          <button
            onClick={() => handleNavClick()}
            className="text-left group whitespace-nowrap shrink-0 flex flex-col justify-center cursor-pointer"
          >
            <span
              className={`font-serif text-2xl md:text-3xl font-bold tracking-tight transition-colors ${
                isAdmin ? 'text-[#1C1917]' : 'text-[#FAF6EE] group-hover:text-[#F3E5AB]'
              }`}
            >
              Gokulam Collections
            </span>
            <span
              className={`text-[9px] tracking-[0.28em] uppercase font-light ${
                isAdmin ? 'text-[#8C6D46]' : 'text-[#D4AF37]'
              }`}
            >
              Woraiyur · Tiruchirappalli
            </span>
          </button>

          {/* Zone 2: Navigation Links (matching screenshot layout) */}
          <nav className="hidden xl:flex items-center gap-7 text-xs font-semibold tracking-wider uppercase">
            <button
              onClick={() => handleNavClick()}
              className={`py-2 whitespace-nowrap shrink-0 transition-colors ${
                isAdmin
                  ? 'text-stone-600 hover:text-stone-900'
                  : 'text-[#FAF6EE]/90 hover:text-[#F3E5AB]'
              }`}
            >
              HOME
            </button>

            <button
              onClick={() => {
                if (currentView !== 'store') {
                  setCurrentView('store');
                  setTimeout(() => {
                    const el = document.getElementById('store-location');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                } else {
                  const el = document.getElementById('store-location');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`py-2 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isAdmin ? 'text-stone-600 hover:text-stone-900' : 'text-[#FAF6EE]/90 hover:text-[#F3E5AB]'
              }`}
            >
              ABOUT US
            </button>

            {/* Silk Sarees */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu('textiles')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button
                onClick={() => handleNavClick('Silk & Tissue Sarees')}
                className={`py-2 whitespace-nowrap shrink-0 transition-colors flex items-center gap-1 ${
                  isAdmin ? 'text-stone-600 hover:text-stone-900' : 'text-[#FAF6EE]/90 hover:text-[#F3E5AB]'
                }`}
              >
                <span>SILK SAREES</span>
                <span className="w-1.5 h-1.5 border-r border-b border-current transform rotate-45 inline-block opacity-60"></span>
              </button>

              <AnimatePresence>
                {activeMegaMenu === 'textiles' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 w-80 p-5 bg-white border border-stone-200 shadow-xl rounded-lg text-stone-800"
                  >
                    <h4 className="text-[11px] uppercase tracking-wider text-[#8C6D46] font-bold mb-2 pb-1 border-b border-stone-200">
                      Sarees Collection
                    </h4>
                    <ul className="space-y-2 text-xs">
                      <li>
                        <button
                          onClick={() => handleNavClick('Silk & Tissue Sarees')}
                          className="hover:text-[#8C6D46] text-left block w-full text-stone-700"
                        >
                          Kanjivaram Pure Silk
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('Silk & Tissue Sarees')}
                          className="hover:text-[#8C6D46] text-left block w-full text-stone-700"
                        >
                          Tissue Silk Sarees
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleNavClick('Cotton & Daily Sarees')}
                          className="hover:text-[#8C6D46] text-left block w-full text-stone-700"
                        >
                          Chettinad Cotton Sarees
                        </button>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => handleNavClick('Cotton & Daily Sarees')}
              className={`py-2 whitespace-nowrap shrink-0 transition-colors ${
                isAdmin ? 'text-stone-600 hover:text-stone-900' : 'text-[#FAF6EE]/90 hover:text-[#F3E5AB]'
              }`}
            >
              COTTON SAREES
            </button>

            <button
              onClick={() => handleNavClick('Chudidars & Designer Wear')}
              className={`py-2 whitespace-nowrap shrink-0 transition-colors ${
                isAdmin ? 'text-stone-600 hover:text-stone-900' : 'text-[#FAF6EE]/90 hover:text-[#F3E5AB]'
              }`}
            >
              CHUDIDARS
            </button>

            <button
              onClick={() => handleNavClick('Kids & Family Ethnic Wear')}
              className={`py-2 whitespace-nowrap shrink-0 transition-colors ${
                isAdmin ? 'text-stone-600 hover:text-stone-900' : 'text-[#FAF6EE]/90 hover:text-[#F3E5AB]'
              }`}
            >
              FAMILY ETHNIC
            </button>

            <button
              onClick={() => handleNavClick('Furniture')}
              className={`py-2 whitespace-nowrap shrink-0 transition-colors ${
                isAdmin ? 'text-stone-600 hover:text-stone-900' : 'text-[#FAF6EE]/90 hover:text-[#F3E5AB]'
              }`}
            >
              FURNITURE & HOME
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('store-location');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setCurrentView('store');
              }}
              className={`py-2 whitespace-nowrap shrink-0 transition-colors ${
                isAdmin ? 'text-stone-600 hover:text-stone-900' : 'text-[#FAF6EE]/90 hover:text-[#F3E5AB]'
              }`}
            >
              TRACK ORDER
            </button>
          </nav>

          {/* Zone 3: Top Right End Cluster */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isAdmin
                  ? 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  : 'text-[#FAF6EE] hover:text-[#F3E5AB] hover:bg-white/10'
              }`}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Heart Icon */}
            <button
              onClick={() => {
                setActiveCategoryFilter(null);
                setCurrentView('category');
              }}
              aria-label="Wishlist"
              className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                isAdmin
                  ? 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  : 'text-[#FAF6EE] hover:text-[#F3E5AB] hover:bg-white/10'
              }`}
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8C6D46] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Icon with count badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping bag"
              className={`relative p-2 rounded-full transition-colors cursor-pointer ${
                isAdmin
                  ? 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  : 'text-[#FAF6EE] hover:text-[#F3E5AB] hover:bg-white/10'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8C6D46] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-sm">
                {totalCartCount || 1}
              </span>
            </button>

            {/* User Profile Icon */}
            <button
              onClick={() => {
                if (!isAdmin) setCurrentView('admin');
              }}
              aria-label="User Account"
              className={`hidden sm:flex p-2 rounded-full transition-colors cursor-pointer ${
                isAdmin
                  ? 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  : 'text-[#FAF6EE] hover:text-[#F3E5AB] hover:bg-white/10'
              }`}
              title="Admin Staff"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Logout / Exit Icon (only visible when in Admin mode) */}
            {isAdmin && (
              <button
                onClick={() => {
                  setCurrentView('store');
                }}
                aria-label="Exit Admin"
                className="p-2 rounded-full text-stone-500 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                title="Return to Storefront"
              >
                <LogOut className="w-5 h-5" />
              </button>
            )}

            {/* ADMIN PAGE NAVIGATION BUTTON (AT THE TOP RIGHT END OF THE PAGE) */}
            <button
              onClick={() => {
                setCurrentView(isAdmin ? 'store' : 'admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-full border text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                isAdmin
                  ? 'bg-[#1C1917] border-[#1C1917] text-white hover:bg-stone-800'
                  : 'bg-[#8C6D46] border-[#D4AF37]/50 text-white hover:bg-[#7A5B35] shadow-amber-950/30 ring-1 ring-amber-400/30'
              }`}
              title={isAdmin ? "Switch to Public Storefront" : "Switch to Admin Page"}
            >
              {isAdmin ? (
                <>
                  <Store className="w-3.5 h-3.5 text-amber-300" />
                  <span className="whitespace-nowrap font-semibold">STOREFRONT</span>
                </>
              ) : (
                <>
                  <Shield className="w-3.5 h-3.5 text-amber-300" />
                  <span className="whitespace-nowrap font-semibold">ADMIN PANEL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border-b border-stone-200 px-6 py-4 shadow-lg text-stone-900"
            >
              <div className="max-w-3xl mx-auto flex items-center gap-3">
                <Search className="w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      setIsSearchOpen(false);
                      setActiveCategoryFilter(null);
                      setCurrentView('category');
                    }
                  }}
                  placeholder="Search silk sarees, cotton handlooms, teak beds, pooja units..."
                  className="w-full text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-xs text-stone-500 hover:text-stone-800 uppercase font-semibold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Golden Scroll Progress Line when in Storefront */}
        {!isAdmin && (
          <div className="h-[2px] w-full bg-[#2A080E]/60 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#B8860B] via-[#F3E5AB] to-[#D4AF37] transition-all duration-150 ease-out"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        )}
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-[#140609] pt-28 px-6 lg:hidden flex flex-col justify-between pb-10 border-l border-[#D4AF37]/30"
          >
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-widest text-[#D4AF37]">
                Gokulam Woraiyur, Trichy
              </p>
              <div className="flex flex-col space-y-4 text-lg font-serif">
                <button
                  onClick={() => handleNavClick()}
                  className="text-left text-[#FAF6EE] hover:text-[#F3E5AB]"
                >
                  {language === 'en' ? 'Storefront Home' : 'முகப்பு'}
                </button>
                <button
                  onClick={() => handleNavClick('Silk & Tissue Sarees')}
                  className="text-left text-[#FAF6EE] hover:text-[#F3E5AB]"
                >
                  {language === 'en' ? 'Silk Sarees (Kanjivaram & Tissue)' : 'பட்டுப் புடவைகள்'}
                </button>
                <button
                  onClick={() => handleNavClick('Cotton & Daily Sarees')}
                  className="text-left text-[#FAF6EE] hover:text-[#F3E5AB]"
                >
                  {language === 'en' ? 'Handloom Cotton Sarees' : 'கைத்தறி பருத்தி புடவைகள்'}
                </button>
                <button
                  onClick={() => handleNavClick('Furniture')}
                  className="text-left text-[#FAF6EE] hover:text-[#F3E5AB]"
                >
                  {language === 'en' ? 'Handcrafted Furniture & Beds' : 'தேக்குமர கட்டில்கள் & தளவாடங்கள்'}
                </button>
                <button
                  onClick={() => handleNavClick('Pooja & Festive Home')}
                  className="text-left text-[#FAF6EE] hover:text-[#F3E5AB]"
                >
                  {language === 'en' ? 'Pooja Units & Festive Textiles' : 'பூஜா மண்டபங்கள் & அலங்காரம்'}
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setCurrentView('admin');
                  }}
                  className="text-left text-[#D4AF37] font-sans text-sm flex items-center gap-2 pt-2 border-t border-[#D4AF37]/20"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin Panel</span>
                </button>
              </div>
            </div>

            <div className="border-t border-[#D4AF37]/20 pt-6 text-xs text-[#FAF6EE]/80 space-y-2">
              <p className="font-semibold text-[#FAF6EE]">Gokulam Textile & Furniture</p>
              <p className="text-[#FAF6EE]/70">65a, Nawab Thottam Main Road, Woraiyur, Trichy - 620003</p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=38%2C+Nawab+Thottam+Main+Rd%2C+Woraiyur%2C+Tiruchirappalli%2C+Tamil+Nadu+620003"
                target="_blank"
                rel="noreferrer"
                className="text-[#D4AF37] hover:underline block font-mono text-[11px]"
              >
                Directions (38, Nawab Thottam Main Rd) →
              </a>
              <p className="text-[#D4AF37]">WhatsApp: +91 94431 82741</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
