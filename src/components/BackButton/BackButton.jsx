import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the back button on the landing page (Home) since there is no internal page to go back to.
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="fixed top-[84px] md:top-28 left-4 md:left-8 z-[50] pointer-events-none">
      <motion.button
        onClick={() => navigate(-1)}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.04, x: -3 }}
        whileTap={{ scale: 0.96 }}
        className="group pointer-events-auto flex items-center gap-2 px-4 py-2 text-[9px] tracking-[0.25em] font-black uppercase text-gold-accent border border-gold-accent/25 hover:border-gold-accent/60 rounded-full bg-black/60 backdrop-blur-md transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] cursor-pointer"
      >
        <ArrowLeft size={11} className="text-gold-accent transition-transform duration-300 group-hover:-translate-x-0.5" />
        <span>Back</span>
      </motion.button>
    </div>
  );
}
