import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustStrip } from './components/TrustStrip';
import { WeaveDivider, KolamDivider } from './components/WeaveDivider';
import { HorizontalShowcase } from './components/HorizontalShowcase';
import { EditorialDrapeSection } from './components/EditorialDrapeSection';
import { FurnitureSection } from './components/FurnitureSection';
import { DrapeStyleGuide } from './components/DrapeStyleGuide';
import { FestiveOfferBanner } from './components/FestiveOfferBanner';
import { StoreLocator } from './components/StoreLocator';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { BlouseStitchingModal } from './components/BlouseStitchingModal';
import { FloatingActions } from './components/FloatingActions';
import { CustomCursor } from './components/CustomCursor';
import { CategoryView } from './components/CategoryView';
import { AdminDashboard } from './components/Admin/AdminDashboard';

const MainLayout: React.FC = () => {
  const { currentView } = useStore();
  const [hasLoaded, setHasLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0507] text-[#FAF6EE] relative bg-grain selection:bg-[#B8860B]/40 selection:text-[#FAF6EE]">
      {/* Preloader on initial arrival */}
      {!hasLoaded && <Preloader onComplete={() => setHasLoaded(true)} />}

      {/* Custom Soft Golden Cursor */}
      <CustomCursor />

      {/* Global Top Navbar */}
      <Navbar />

      {/* View Routing */}
      {currentView === 'admin' ? (
        <AdminDashboard />
      ) : currentView === 'category' ? (
        <>
          <CategoryView />
          <Footer />
        </>
      ) : (
        <main>
          {/* 1. Cinematic Fullscreen Hero */}
          <HeroSection />

          {/* 2. Trust Strip & Marquee */}
          <TrustStrip />

          {/* 3. Weave Divider */}
          <WeaveDivider />

          {/* 4. Horizontal Pinned Festive Showcase */}
          <HorizontalShowcase />

          {/* 5. Kolam Divider */}
          <KolamDivider />

          {/* 6. Layered Editorial Drape Section */}
          <EditorialDrapeSection />

          {/* 7. Furniture & Home Section + Room Visualiser Lite */}
          <FurnitureSection />

          {/* 8. Drape & Style Guide */}
          <DrapeStyleGuide />

          {/* 9. Festive Offer Countdown Banner */}
          <FestiveOfferBanner />

          {/* 10. Store Location & Interactive Trichy Map */}
          <StoreLocator />

          {/* 11. Footer */}
          <Footer />
        </main>
      )}

      {/* Modals & Drawers */}
      <CartDrawer />
      <QuickViewModal />
      <BlouseStitchingModal />
      <FloatingActions />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
