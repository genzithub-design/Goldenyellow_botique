import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  // Route transition scroll reset
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  // Track scroll position to show/hide button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        // Only hide if not currently launching
        if (!isLaunching) {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [isLaunching]);

  const scrollToTop = () => {
    setIsLaunching(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Reset launching state and visibility after the scroll finishes
    setTimeout(() => {
      setIsLaunching(false);
      setIsVisible(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="scroll-to-top-container"
          initial={{ opacity: 0, scale: 0.3, rotate: -90, y: 50 }}
          animate={isLaunching ? {
            y: -1000,
            scale: 0.1,
            rotate: 360,
            opacity: 0,
            transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
          } : { 
            opacity: 1, 
            scale: 1, 
            rotate: 0, 
            y: 0,
            transition: { 
              type: "spring",
              stiffness: 260,
              damping: 16
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.3, 
            rotate: 90, 
            y: 35,
            transition: { 
              duration: 0.25, 
              ease: "easeOut" 
            } 
          }}
          className="fixed bottom-6 right-6 z-[99] flex items-center justify-center"
        >
          {/* Neon rocket fire trail during launch */}
          {isLaunching && (
            <motion.div
              initial={{ scaleY: 0, opacity: 1 }}
              animate={{ scaleY: [0, 3, 0], opacity: [0, 1, 0], y: [0, 50, 80] }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="absolute bottom-[-10px] w-[5px] h-[30px] rounded-full bg-gradient-to-b from-gold-accent via-pink-500 to-cyan-400 origin-top blur-[1px]"
            />
          )}

          <motion.button
            onClick={scrollToTop}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--bg-card)] border border-gold-accent/40 text-gold-accent shadow-[0_4px_20px_rgba(212,175,55,0.15)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.35)] hover:bg-gold-accent hover:text-[#08060A] hover:border-gold-accent transition-all duration-300 relative overflow-hidden"
            aria-label="Back to Top"
            whileHover={{ 
              y: -5,
              scale: 1.08,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.92 }}
          >
            {/* Infinite chevron up bounce movement */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
            >
              <ArrowUp size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
