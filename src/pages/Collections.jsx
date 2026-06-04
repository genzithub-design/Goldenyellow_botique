import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Search, Sparkles, Loader } from 'lucide-react';
import { SareeCard, Masonry, Footer } from '../components';
import { optimizeUnsplashUrl } from '../utils/image';
import { collections, products } from '../data';

export default function Collections() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Map productCount dynamically from static products
  const displayCollections = collections.map(col => {
    const colProducts = products.filter(p => p.collectionSlug === col.slug);
    return {
      ...col,
      productCount: colProducts.length
    };
  });

  // Filter sarees/products if in search mode
  const filteredSarees = searchQuery
    ? products.filter(
        (saree) =>
          (saree.name && saree.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (saree.material && saree.material.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (saree.color && saree.color.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (saree.description && saree.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="bg-[#08060A] min-h-screen flex flex-col justify-between overflow-x-hidden">
      
      {searchQuery ? (
        /* ── SEARCH RESULTS MODE ── */
        <div className="flex-1 pb-20">
          {/* Gen-Z Bold Header */}
          <section className="bg-[var(--bg-secondary)] text-[var(--text-main)] py-24 relative overflow-hidden border-b border-[var(--border-glow)]">
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-gold-accent/5 blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-burgundy-900/10 blur-[100px] pointer-events-none" />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
              <span className="text-[14vw] font-black uppercase text-[var(--text-main)] opacity-[0.02] tracking-[0.1em] font-sans">
                SEARCH
              </span>
            </div>
      
            <div className="container-main relative z-10 text-center flex flex-col items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.35em] text-gold-accent font-extrabold px-4 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-glow)]">
                Search Showroom
              </span>
              <h1 className="font-sans text-5xl sm:text-7xl font-black uppercase tracking-tight text-[var(--text-main)] leading-none">
                RESULTS.
                <span className="text-transparent font-serif italic font-light lowercase text-gold-accent block sm:inline normal-case ml-2">
                  for "{searchQuery}"
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light max-w-lg leading-relaxed mt-2">
                We have curated {filteredSarees.length} exclusive handloom drapes for you.
              </p>
            </div>
          </section>

          <section className="container-main pt-16">
            {filteredSarees.length > 0 ? (
              <Masonry
                items={filteredSarees.map((saree, index) => ({
                  id: saree.id,
                  img: optimizeUnsplashUrl(saree.image, 500),
                  url: `/saree/${saree.id}`,
                  height: [600, 480, 720, 520, 800, 560, 680, 500][index % 8]
                }))}
                ease="power3.out"
                duration={0.6}
                stagger={0.05}
                animateFrom="bottom"
                scaleOnHover={true}
                hoverScale={0.96}
                blurToFocus={true}
                colorShiftOnHover={true}
              />
            ) : (
              <div className="text-center py-20 bg-[var(--bg-card)] border border-[var(--border-glow)] p-8 max-w-xl mx-auto rounded-lg shadow-2xl">
                <Search size={32} className="text-gold-accent mx-auto mb-4 animate-pulse" />
                <h3 className="font-serif text-2xl text-[var(--text-main)] font-light tracking-wide mb-2">No Sarees Found</h3>
                <p className="text-xs text-[var(--text-muted)] font-light leading-relaxed mb-6">
                  We couldn't find any sarees matching "{searchQuery}". Try searching for categories like "Silk", "Cotton", or colors like "Red" or "Green".
                </p>
                <Link to="/collections" className="btn-gold py-2.5 px-6 text-[9px] tracking-widest uppercase font-bold inline-flex">
                  Browse All Collections
                </Link>
              </div>
            )}
          </section>
        </div>
      ) : (
        /* ── LUXURY DUAL SPLIT LOOKBOOK MODE ── */
        <div className="relative w-full h-[calc(100vh-68px)] sm:h-[calc(100vh-76px)] overflow-hidden flex flex-col md:flex-row bg-[#08060A]">
          
          {/* Subtle overlay header */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center flex flex-col items-center gap-1">
            <span className="text-[9px] tracking-[0.55em] uppercase text-gold-accent font-extrabold bg-black/45 backdrop-blur-md px-5 py-2.5 rounded-full border border-gold-accent/15">
              THE CATALOGS
            </span>
          </div>

          {displayCollections.map((col, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;

            // Width transitions: hovered takes 56%, other takes 44%
            let flexClass = 'md:flex-1';
            if (isAnyHovered) {
              flexClass = isHovered ? 'md:flex-[1.28]' : 'md:flex-[0.72]';
            }

            // Blur/Dim transition for non-hovered panel
            const overlayBlurClass = isAnyHovered && !isHovered ? 'blur-[3px] opacity-40 scale-[0.985]' : 'blur-0 opacity-100 scale-100';

            return (
              <Link
                key={col.slug}
                to={`/collections/${col.slug}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative flex flex-col justify-center items-center overflow-hidden h-1/2 md:h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] border-b md:border-b-0 md:border-r last:border-0 border-gold-accent/10 ${flexClass} ${overlayBlurClass}`}
              >
                {/* 1. Background image with scale and overlay */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  {/* Luxury black overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/30 z-10 transition-all duration-[1s] group-hover:via-black/40 group-hover:from-black/90" />
                  
                  <img
                    src={optimizeUnsplashUrl(col.image, 1000)}
                    alt={col.title}
                    className="w-full h-full object-cover object-center scale-100 group-hover:scale-[1.06] transition-transform duration-[2.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </div>

                {/* 2. Luxury frame boundary */}
                <div className="absolute inset-4 sm:inset-6 border border-gold-accent/15 pointer-events-none z-20 group-hover:border-gold-accent/35 transition-colors duration-[1s] ease-out">
                  {/* Decorative corners */}
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-gold-accent/40" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-gold-accent/40" />
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-gold-accent/40" />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-gold-accent/40" />
                </div>

                {/* 3. Concentric Wax Medallion Crest in the center */}
                <div className="relative z-20 flex flex-col items-center text-center justify-center transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  
                  {/* Wax Seal Circle */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-gold-accent/25 bg-black/60 backdrop-blur-md flex items-center justify-center relative shadow-3xl transition-all duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:border-gold-accent/60">
                    {/* Spinning dotted ring */}
                    <div className="absolute inset-1 rounded-full border border-dashed border-gold-accent/20 animate-[spin_40s_linear_infinite]" />
                    <Sparkles className="text-gold-accent w-6 h-6 sm:w-8 sm:h-8 transition-transform duration-700 group-hover:rotate-45" />
                  </div>

                  <span className="text-[8px] uppercase tracking-[0.4em] text-gold-accent/80 font-bold mt-4">
                    Explore
                  </span>
                </div>

                {/* 4. Luxury Details (Bottom Left Corner) */}
                <div className="absolute bottom-10 left-10 right-10 z-20 pointer-events-none flex flex-col justify-end items-start">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-gold-accent font-extrabold mb-1">
                    {col.origin}
                  </span>
                  
                  <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light tracking-wide leading-none mt-1">
                    {col.title}
                  </h2>
                  
                  <div className="w-10 h-[1px] bg-gold-accent/30 my-4 group-hover:w-20 transition-all duration-500" />
                  
                  <p className="text-xs text-white/50 font-light leading-relaxed max-w-sm h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    {col.description}
                  </p>

                  <div className="btn-outline-gold py-2.5 px-6 rounded-full text-[9px] tracking-widest uppercase font-bold flex items-center gap-1.5 mt-4 transition-all duration-500 group-hover:bg-gold-accent group-hover:text-burgundy-950 group-hover:shadow-lg">
                    Shop Collection <ArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* 5. Ghost Index (Bottom Right Corner) */}
                <div className="absolute bottom-10 right-10 z-20 pointer-events-none hidden sm:block">
                  <span className="text-5xl lg:text-6xl font-serif italic text-white/5 group-hover:text-gold-accent/15 transition-colors duration-[1s]">
                    0{index + 1}
                  </span>
                </div>

                {/* Shimmer overlay line */}
                <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gold-gradient transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out z-30"></div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Footer is only rendered if we are scrolling (e.g. search results page) or directly below lookbook */}
      {!searchQuery ? null : <Footer />}
    </div>
  );
}
