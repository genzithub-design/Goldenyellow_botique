import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Award, Compass, ShieldCheck } from 'lucide-react';
import { Footer } from '../components';

export default function Contact() {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pb-24 text-[var(--text-main)] overflow-hidden">
      
      {/* 1. HERO HEADER */}
      <section className="bg-[var(--bg-secondary)] text-[var(--text-main)] py-24 sm:py-32 relative overflow-hidden border-b border-[var(--border-glow)]">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-gold-accent/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-burgundy-900/10 blur-[100px] pointer-events-none" />
        
        {/* Big ghost text behind */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span className="text-[14vw] font-black uppercase text-[var(--text-main)] opacity-[0.02] tracking-[0.1em] font-sans">
            CONNECT
          </span>
        </div>

        <div className="container-main relative z-10 text-center flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold-accent font-extrabold px-4 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-glow)]">
            Connect With Us
          </span>
          
          <h1 className="font-sans text-5xl sm:text-7xl font-black uppercase tracking-tight text-[var(--text-main)] leading-none">
            OUR 
            <span className="text-transparent font-serif italic font-light lowercase text-gold-accent block sm:inline normal-case ml-0 sm:ml-4">
              Showroom.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light max-w-lg leading-relaxed mt-2">
            Schedule a high-definition video shopping tour or speak directly with our heritage silk weavers via WhatsApp.
          </p>
        </div>
      </section>

      {/* 2. CENTERED CONTACT CONTENT CARD */}
      <section className="container-main pt-20 pb-12 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-glow-intense)] p-8 sm:p-16 rounded-2xl shadow-[0_15px_60px_rgba(0,0,0,0.12)] relative overflow-hidden flex flex-col gap-8 text-center items-center"
        >
          {/* Subtle Grid overlay inside card */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          
          {/* Glowing Ambient light in the center background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold-accent/5 rounded-full blur-[110px] pointer-events-none" />
          
          {/* Weavers Online Radar Status Indicator */}
          <div className="z-10 flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/20 px-4 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
            </span>
            <span className="text-[9px] uppercase tracking-wider text-[#25D366] font-bold">
              Weavers Online Now
            </span>
          </div>

          <div className="relative z-10 flex flex-col gap-6 max-w-lg items-center">
            
            {/* Header badges */}
            <span className="text-[9px] uppercase tracking-[0.25em] text-gold-accent font-extrabold px-3 py-1.5 rounded-full bg-[var(--bg-card-inner)] border border-[var(--border-glow)] w-fit flex items-center gap-1.5">
              <Sparkles size={8} className="animate-pulse" /> Live Video Consultation
            </span>
            
            <h2 className="font-serif text-4xl sm:text-5xl text-[var(--text-main)] font-light tracking-wide leading-tight">
              Connect Directly on WhatsApp
            </h2>
            
            <p className="text-xs sm:text-sm text-[var(--text-sub)] font-light leading-relaxed mb-4 max-w-md">
              Skip standard forms. Initiate a chat directly with our heritage curators in Kanchipuram to request high-res catalog photos, live weaving videos, or customize wedding saree orders.
            </p>

            {/* Glowing Action Button */}
            <motion.a
              href="https://wa.me/919363745680"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3.5 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white px-12 py-5 lg:px-16 lg:py-6 text-xs lg:text-sm tracking-[0.2em] font-extrabold uppercase rounded-full shadow-[0_12px_35px_rgba(37,211,102,0.35)] hover:shadow-[0_20px_50px_rgba(37,211,102,0.55)] transition-all duration-300 relative overflow-hidden group"
              whileHover={{ 
                y: -5,
                scale: 1.03
              }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button sheen sweep animation overlay */}
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
              
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatDelay: 1 }}
              >
                <MessageSquare size={18} className="fill-white" />
              </motion.div>
              <span>Connect on WhatsApp</span>
            </motion.a>

            {/* Sub-details & Certifications */}
            <div className="grid grid-cols-2 gap-4 mt-8 w-full border-t border-[var(--border-glow)] pt-8">
              <div className="flex flex-col items-center gap-1">
                <Compass size={18} className="text-gold-accent" />
                <span className="text-[9px] uppercase tracking-wider text-[var(--text-main)] font-bold mt-1">Video Tours</span>
                <span className="text-[8px] text-[var(--text-muted)]">Live showroom checks</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={18} className="text-gold-accent" />
                <span className="text-[9px] uppercase tracking-wider text-[var(--text-main)] font-bold mt-1">Silk Mark Checked</span>
                <span className="text-[8px] text-[var(--text-muted)]">100% certified fabrics</span>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-center mt-6 text-[9px] uppercase tracking-wider text-gold-accent font-semibold border border-[var(--border-glow)] px-5 py-2.5 bg-[var(--bg-card-inner)] rounded-sm">
              <Award size={12} className="text-gold-accent animate-pulse" /> Weavers circle responds under 1 hour
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
