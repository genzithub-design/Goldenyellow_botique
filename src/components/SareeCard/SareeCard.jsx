import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Plus } from 'lucide-react';

export default function SareeCard({ saree }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 35 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
      }}
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative bg-cream-50/50 border border-gold-200/30 hover:border-gold-accent/60 rounded-sm overflow-hidden flex flex-col h-full hover:shadow-2xl shadow-md transition-all duration-500"
    >
      {/* ── CARD SHIMMER TOP LINE ── */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gold-gradient transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out z-30"></div>

      {/* ── IMAGE WRAPPER ── */}
      <div className="aspect-[3/4] overflow-hidden bg-cream-100 relative">
        {/* Decorative Golden Corner Inner Border Frame */}
        <div className="absolute inset-3 border border-gold-accent/0 group-hover:inset-4 group-hover:border-gold-vintage/70 transition-all duration-500 pointer-events-none z-20"></div>

        {/* Luxury Badge */}
        <div className="absolute top-4 left-4 z-25 flex gap-1 items-center bg-burgundy-900/90 backdrop-blur-md text-gold-light text-[9px] uppercase tracking-widest font-semibold px-2.5 py-1.5 rounded-sm border border-gold-700/30 shadow-md">
          <motion.div
            animate={{ rotate: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <Sparkles size={8} className="text-gold-accent" />
          </motion.div>
          <span>Handcrafted</span>
        </div>

        {/* Product Image */}
        <img
          src={saree.image}
          alt={saree.name}
          className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-108 group-hover:brightness-[0.9]"
          loading="lazy"
        />

        {/* Cinematic Blur Glass Hover Details Reveal */}
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950/80 via-burgundy-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col gap-2"
          >
            <span className="text-[10px] uppercase tracking-widest text-gold-accent font-bold">
              {saree.weavingTechnique || 'Heritage Handloom'}
            </span>
            <p className="text-[11px] text-cream-200 line-clamp-3 font-light leading-relaxed mb-2">
              {saree.description}
            </p>
            <Link
              to={`/saree/${saree.id}`}
              className="btn-gold py-2.5 px-4 text-[9px] tracking-widest w-full flex items-center justify-center gap-1.5 shadow-lg"
            >
              Explore Details <ArrowRight size={12} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── CARD BOTTOM CONTENT ── */}
      <div className="p-5 flex-1 flex flex-col justify-between group-hover:bg-cream-200/10 transition-colors duration-500">
        <div>
          {/* Material Label */}
          <span className="text-[9px] uppercase tracking-widest text-gold-vintage font-bold block mb-1">
            {saree.material}
          </span>
          
          {/* Saree Name */}
          <h3 className="relative font-serif text-lg text-charcoal-800 group-hover:text-burgundy-850 transition-colors duration-300 font-medium leading-snug pb-1 inline-block">
            {saree.name}
            {/* Elegant slide-in underline */}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold-vintage group-hover:w-full transition-all duration-500 ease-out"></span>
          </h3>
          
          {/* Subtle color label */}
          <div className="flex gap-1.5 items-center mt-2.5">
            <div className="w-2 h-2 rounded-full border border-gold-300 bg-gold-vintage/30"></div>
            <span className="text-[9px] uppercase tracking-wider text-muted font-semibold">
              Color: {saree.color}
            </span>
          </div>
        </div>

        {/* Lower Info bar */}
        <div className="border-t border-gold-100/50 mt-5 pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-widest text-muted font-bold">Estimate</span>
            <span className="text-sm font-bold text-burgundy-800 tracking-wider font-sans group-hover:text-gold-accent transition-colors duration-300">
              {saree.price}
            </span>
          </div>
          
          <Link
            to={`/saree/${saree.id}`}
            className="text-[9px] uppercase tracking-wider font-bold text-charcoal-700 group-hover:text-gold-vintage transition-colors duration-300 flex items-center gap-1 bg-cream-50 hover:bg-gold-light/20 border border-gold-200/30 px-3 py-1.5 rounded-sm shadow-sm"
          >
            Inquire <Plus size={10} className="transition-transform duration-500 group-hover:rotate-90 text-gold-accent" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
