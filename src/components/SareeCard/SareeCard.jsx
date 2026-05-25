import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquare } from 'lucide-react';

export default function SareeCard({ saree }) {
  if (!saree) return null;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
      }}
      className="group flex flex-col w-full bg-[var(--bg-card)] border border-[var(--border-glow)] rounded-lg p-3.5 shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* 1. Image Container (with top overlays) */}
      <div className="w-full h-[320px] sm:h-[340px] overflow-hidden rounded-md relative bg-[var(--bg-card-inner)]">
        {/* Weaving technique tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[8px] uppercase tracking-[0.2em] font-extrabold px-2.5 py-1.5 rounded-full bg-[var(--bg-card-inner)]/90 backdrop-blur-md border border-[var(--border-glow-intense)] text-gold-accent flex items-center gap-1">
            <Sparkles size={8} className="animate-pulse" />
            {saree.weavingTechnique || 'Handloom'}
          </span>
        </div>

        {/* Main image */}
        <img
          src={saree.image}
          alt={saree.name}
          className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          loading="lazy"
        />

        {/* Hover image overlay grid lines (subtle) */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* 2. Product Details (Underneath Image) */}
      <div className="flex flex-col pt-4 pb-2">
        {/* Material & Color */}
        <div className="flex justify-between items-center text-[8px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
          <span>{saree.material}</span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-gold-accent" /> {saree.color}
          </span>
        </div>

        {/* Title & Price Row */}
        <div className="flex justify-between items-start gap-4 mt-2">
          <h3 className="font-serif text-lg text-[var(--text-main)] font-medium leading-tight line-clamp-1 group-hover:text-gold-accent transition-colors duration-300">
            <Link to={`/saree/${saree.id}`}>{saree.name}</Link>
          </h3>
          <span className="font-sans text-sm font-extrabold text-gold-accent shrink-0">
            {saree.price}
          </span>
        </div>

        {/* Short info description */}
        <p className="text-[10px] text-[var(--text-muted)] font-light leading-relaxed mt-2 line-clamp-2">
          {saree.description}
        </p>

        {/* Actions bar */}
        <div className="flex items-center justify-between border-t border-[var(--border-glow)] pt-3.5 mt-4 gap-4">
          <Link
            to={`/saree/${saree.id}`}
            className="text-[9px] uppercase tracking-widest font-extrabold text-[var(--text-main)] hover:text-gold-accent transition-colors duration-300"
          >
            View Details &rarr;
          </Link>

          <a
            href={`https://wa.me/919876543210?text=Hi! I would like to inquire about purchasing the ${saree.name} (${saree.id}) priced at ${saree.price}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-full text-[9px] uppercase tracking-widest font-extrabold transition-all duration-300 shadow-sm"
          >
            <MessageSquare size={10} className="fill-white" /> Inquire
          </a>
        </div>
      </div>
    </motion.div>
  );
}
