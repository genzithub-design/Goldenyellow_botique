import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, MessageSquare } from 'lucide-react';
import GooeyNav from '../GooeyNav/GooeyNav';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Collections', href: '/collections' },
  { label: 'About Us', href: '/about' },
  { label: 'Boutiques', href: '/contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Track scroll position to trigger visual styling changes
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route transition
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Find initial active index based on current path
  const initialActiveIndex = Math.max(NAV_ITEMS.findIndex(item => item.href === location.pathname), 0);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 w-full z-[1000] transition-all duration-500 ${
          scrolled
            ? 'h-16 bg-[#FCFAF6]/92 backdrop-blur-md border-b border-gold-200/20 shadow-sm'
            : 'h-20 bg-transparent'
        }`}
      >
        <div className="max-w-[1440px] mx-auto h-full px-6 sm:px-12 lg:px-16 flex items-center justify-between">

          {/* 1. Left side brand logo */}
          <Link to="/" className="flex flex-col items-start leading-none group shrink-0">
            <span className="font-serif text-lg tracking-[0.15em] font-semibold text-burgundy-800 group-hover:text-gold-accent transition-colors duration-300">
              GOLDEN YELLOW
            </span>
            <span className="text-[7px] uppercase tracking-[0.35em] text-gold-vintage font-bold mt-0.5 group-hover:text-burgundy-900 transition-colors duration-300">
              BOUTIQUE
            </span>
          </Link>

          {/* 2. Center: GooeyNav for desktop */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
            <GooeyNav
              items={NAV_ITEMS}
              initialActiveIndex={initialActiveIndex}
              animationTime={500}
              particleCount={12}
              particleDistances={[70, 8]}
              particleR={80}
              timeVariance={250}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          {/* 3. Right side CTA button for desktop */}
          <div className="hidden md:flex items-center shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-gold-accent/40 hover:border-gold-accent text-gold-vintage hover:text-burgundy-900 px-6 py-2.5 text-[9px] uppercase tracking-[0.2em] font-bold rounded-sm bg-transparent hover:bg-gold-accent transition-all duration-500 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              Book Visit <ArrowRight size={12} />
            </Link>
          </div>

          {/* 4. Hamburger for small screens */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center p-2 text-charcoal-800 hover:text-burgundy-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </motion.header>

      {/* 5. Mobile Full Screen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[999] bg-[#25030a] flex flex-col items-center justify-center text-center overflow-hidden"
          >
            {/* Ambient luxury glows */}
            <div className="absolute top-[10%] left-[-20%] w-[80vw] h-[80vw] bg-gold-accent/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[10%] right-[-20%] w-[70vw] h-[70vw] bg-burgundy-900/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

            <div className="relative z-10 flex flex-col items-center gap-12 max-w-sm px-6">
              <span className="text-[9px] uppercase tracking-[0.35em] text-gold-accent opacity-85">
                Heritage Handlooms
              </span>

              <nav className="flex flex-col gap-6">
                {NAV_ITEMS.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                  >
                    <Link
                      to={link.href}
                      className={`font-serif text-3xl sm:text-4xl transition-colors duration-300 block ${
                        location.pathname === link.href
                          ? 'text-gold-accent'
                          : 'text-cream-100 hover:text-gold-accent'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="w-full flex flex-col gap-4 mt-6 border-t border-gold-800/20 pt-8"
              >
                <Link
                  to="/contact"
                  className="btn-gold py-3 px-6 text-[10px] tracking-widest uppercase font-bold flex items-center justify-center gap-1.5"
                >
                  Book Consultation <ArrowRight size={12} />
                </Link>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-cream-200/20 text-cream-200 hover:text-white px-6 py-3 text-[10px] uppercase tracking-widest font-semibold hover:bg-white/5 transition-all duration-300"
                >
                  <MessageSquare size={14} /> WhatsApp Chat
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
