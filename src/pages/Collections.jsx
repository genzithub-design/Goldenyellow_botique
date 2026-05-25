import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Search, Sparkles } from 'lucide-react';
import { collections, allSareesList } from '../data';
import { SareeCard, Masonry, Footer } from '../components';

export default function Collections() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // Filter sarees if in search mode
  const filteredSarees = searchQuery
    ? allSareesList.filter(
        (saree) =>
          saree.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          saree.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
          saree.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
          saree.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pb-20">
      
      {/* Gen-Z Bold Header */}
      <section className="bg-[var(--bg-secondary)] text-[var(--text-main)] py-24 sm:py-32 relative overflow-hidden border-b border-[var(--border-glow)]">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-gold-accent/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-burgundy-900/10 blur-[100px] pointer-events-none" />
        
        {/* Big ghost text behind */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span className="text-[14vw] font-black uppercase text-[var(--text-main)] opacity-[0.02] tracking-[0.1em] font-sans">
            {searchQuery ? 'SEARCH' : 'CATALOG'}
          </span>
        </div>
 
        <div className="container-main relative z-10 text-center flex flex-col items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.35em] text-gold-accent font-extrabold px-4 py-2 rounded-full bg-[var(--bg-card)] border border-[var(--border-glow)]">
            {searchQuery ? 'Search Showroom' : 'Heritage Catalogs'}
          </span>
          
          <h1 className="font-sans text-5xl sm:text-7xl font-black uppercase tracking-tight text-[var(--text-main)] leading-none">
            {searchQuery ? 'RESULTS.' : 'THE '}
            <span className="text-transparent font-serif italic font-light lowercase text-gold-accent block sm:inline normal-case">
              {searchQuery ? `for "${searchQuery}"` : 'Collections.'}
            </span>
          </h1>
 
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-light max-w-lg leading-relaxed mt-2">
            {searchQuery
              ? `We have curated ${filteredSarees.length} exclusive handloom drapes for you.`
              : 'Explore luxury sarees curated by weave style, silk weight, and heritage embroidery craft.'}
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container-main pt-16">
        {searchQuery ? (
          /* ── SEARCH RESULTS MODE ── */
          <div>
            {filteredSarees.length > 0 ? (
              <Masonry
                items={filteredSarees.map((saree, index) => ({
                  id: saree.id,
                  img: saree.image,
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
          </div>
        ) : (
          /* ── GENERAL COLLECTIONS LIST MODE ── */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {collections.map((col, index) => {
              const isLarge = index === 0 || index === 7; // Highlight Kanchipuram and Bridal as massive featured grid blocks
              return (
                <motion.div
                  key={col.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                  className={`group relative overflow-hidden rounded-lg bg-[var(--bg-card)] border border-[var(--border-glow)] shadow-2xl transition-all duration-700 hover:border-gold-accent/40 ${
                    isLarge ? 'md:col-span-2 h-[450px]' : 'h-[360px]'
                  }`}
                >
                  {/* Subtle interactive grid lines background */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                  {/* Ambient Glows behind specific cards */}
                  <div className="absolute -top-12 -left-12 w-32 h-32 bg-gold-accent/10 rounded-full blur-2xl group-hover:bg-gold-accent/20 transition-all duration-700 pointer-events-none" />

                  {/* Image wrapper */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden">
                    {/* Dark gradient mesh overlay for high contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A080C] via-[#0A080C]/75 to-transparent z-10 transition-colors duration-500 group-hover:via-[#0A080C]/65" />
                    <img
                      src={col.image}
                      alt={col.title}
                      className="w-full h-full object-cover object-center scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </div>

                  {/* Top Header Pill Tags */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
                    <span className="text-[8px] uppercase tracking-[0.25em] font-extrabold px-3 py-1.5 rounded-full bg-[var(--bg-card-inner)]/80 backdrop-blur-md border border-[var(--border-glow)] text-gold-accent">
                      {col.origin}
                    </span>
                    <span className="text-[8px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-sm bg-[var(--bg-card)]/40 border border-[var(--border-glow)] text-[var(--text-sub)]">
                      {col.count} Masterpieces
                    </span>
                  </div>

                  {/* Info / Content Wrapper */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 flex flex-col justify-end h-full">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <span className="text-[200px] font-sans font-black text-white/5 absolute bottom-12 right-0 pointer-events-none leading-none select-none z-0">
                        {index + 1}
                      </span>
                      
                      <h3 className="font-serif text-3xl sm:text-4xl text-white font-light tracking-wide mb-3 relative z-10">
                        {col.title}
                      </h3>
                      
                      <p className="text-xs text-white/60 font-light leading-relaxed max-w-lg mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 relative z-10">
                        {col.description}
                      </p>

                      <div className="flex items-center gap-4 relative z-10">
                        <Link
                          to={`/collections/${col.slug}`}
                          className="btn-gold py-2.5 px-6 text-[9px] tracking-widest uppercase font-bold flex items-center gap-1.5"
                        >
                          Shop Collection <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                        <span className="text-[9px] uppercase tracking-widest text-gold-accent/80 font-semibold border border-gold-accent/20 px-3 py-2 rounded-sm bg-gold-accent/5 backdrop-blur-xs">
                          In Stock
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Golden Hover Line Shimmer */}
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gold-gradient transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out z-30"></div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
