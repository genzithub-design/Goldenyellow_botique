import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar, Footer, TrueFocus, ScrollToTop } from './components';

// Pages
import Home from './pages/Home';

// Lazy-loaded pages for bundle size optimization and faster loading
const Collections = lazy(() => import('./pages/Collections'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const SareeDetailPage = lazy(() => import('./pages/SareeDetailPage'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    document.body.style.overflow = '';
    
    // Watch pathname changes since Router is inside App
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hasToken = !!localStorage.getItem('gy_admin_token');
      if (hasToken && !path.startsWith('/admin')) {
        window.location.replace('/admin');
      } else {
        setCurrentPath(path);
      }
    };
    
    // Add interval to check path since standard React Router pushState doesn't fire events
    const pathInterval = setInterval(handleLocationChange, 200);

    return () => {
      document.body.style.overflow = '';
      clearInterval(pathInterval);
    };
  }, []);

  const isAdmin = currentPath.startsWith('/admin');

  return (
    <Router>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 w-screen h-screen z-[9999] flex flex-col items-center justify-center bg-[#25030a] text-center overflow-hidden"
          >
            {/* Grain background overlay inside */}
            <div className="absolute inset-0 grain-bg pointer-events-none opacity-40 z-0" />

            {/* Elegant visual backdrop design */}
            <div className="absolute w-[40vw] h-[40vw] rounded-full bg-gold-accent/5 blur-[120px] pointer-events-none z-0" />
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold-accent opacity-80">
                Heritage Handlooms
              </span>
              
              <TrueFocus 
                sentence="Golden Yellow Boutique"
                manualMode={false}
                blurAmount={6}
                borderColor="#D4AF37"
                glowColor="rgba(212, 175, 55, 0.4)"
                animationDuration={0.6}
                pauseBetweenAnimations={0.4}
              />
              
              <div className="w-16 h-[1px] bg-gold-accent/20 mt-2 animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-[var(--bg-primary)] font-sans text-[var(--text-main)] grain-bg relative overflow-x-hidden transition-colors duration-500">
        
        {/* Ambient background glows for all pages */}
        <div className="absolute top-[5vh] left-[-20vw] w-[60vw] h-[60vw] bg-gold-accent/4 rounded-full blur-[130px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '9s' }} />
        <div className="absolute top-[80vh] right-[-20vw] w-[50vw] h-[50vw] bg-burgundy-900/3 rounded-full blur-[110px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '14s' }} />
        <div className="absolute top-[200vh] left-[10vw] w-[55vw] h-[55vw] bg-gold-accent/3 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-[5vh] right-[10vw] w-[40vw] h-[40vw] bg-burgundy-900/4 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '11s' }} />

        {/* Navigation Bar */}
        {!isAdmin && <Navbar />}

        {/* Main Content Area */}
        <main className={`min-h-screen relative z-10 ${isAdmin ? 'pt-0' : 'pt-[68px] sm:pt-[76px]'}`}>
          <Suspense fallback={<div className="min-h-screen bg-[#0E0C10]" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/collections/:category" element={<CategoryPage />} />
              <Route path="/saree/:id" element={<SareeDetailPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              {/* Fallback to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}
